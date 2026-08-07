import express from "express";
import path from "path";
import fs from "fs";

// Cache resolved image buffers in memory (10 minutes TTL)
const imageCache = new Map<string, { contentType: string; buffer: Buffer; expiresAt: number }>();

async function resolveSynologyImage(url: string): Promise<{ contentType: string; buffer: Buffer } | null> {
  try {
    const cleanUrl = url.trim();
    let nasBaseUrl = "";
    let sharingId = "";

    if (cleanUrl.includes("gofile.me/")) {
      const urlObj = new URL(cleanUrl);
      const parts = urlObj.pathname.split("/").filter(Boolean);
      if (parts.length < 2) return null;

      const serverID = parts[0];
      sharingId = parts[1];

      const servRes = await fetch("https://global.quickconnect.to/Serv.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify([
          {
            version: 1,
            command: "request_tunnel",
            stop_when_error: false,
            stop_when_success: true,
            id: "file_sharing_https",
            serverID: serverID,
            is_gofile: true,
            path: "/" + serverID + "/" + sharingId,
          },
        ]),
      }).then((r) => r.json());

      if (!servRes || !servRes[0] || servRes[0].errno !== 0) return null;

      const host =
        servRes[0].smartdns?.host ||
        servRes[0].service?.relay_dn ||
        servRes[0].server?.ddns;
      if (!host) return null;

      nasBaseUrl = "https://" + host + ":5001/sharing/";
    } else if (cleanUrl.includes("/sharing/")) {
      const parts = cleanUrl.split("/sharing/");
      const origin = parts[0];
      sharingId = parts[1].split("?")[0].split("#")[0];
      nasBaseUrl = origin + "/sharing/";
    } else {
      return null;
    }

    // 1. Login to get sharing_sid
    const loginUrl =
      nasBaseUrl +
      "webapi/entry.cgi?api=SYNO.Core.Sharing.Login&version=1&method=login&sharing_id=" +
      encodeURIComponent(JSON.stringify(sharingId));
    const loginData = await fetch(loginUrl).then((r) => r.json());
    if (!loginData.success || !loginData.data?.sharing_sid) return null;

    const sid = loginData.data.sharing_sid;

    // 2. Get Session to find filename
    const sessionUrl =
      nasBaseUrl +
      "webapi/entry.cgi?api=SYNO.Core.Sharing.Session&version=1&method=get&sharing_id=" +
      encodeURIComponent(JSON.stringify(sharingId));
    const sessionText = await fetch(sessionUrl).then((r) => r.text());

    let filename = "";
    const fnMatch = sessionText.match(/\"filename\"\s*:\s*\"([^\"]+)\"/);
    if (fnMatch) filename = fnMatch[1];

    // 3. Fetch image thumbnail payload
    const thumbUrl =
      nasBaseUrl +
      "webapi/entry.cgi?api=SYNO.FolderSharing.Thumb&version=2&method=get&size=large&path=" +
      encodeURIComponent(JSON.stringify("/" + filename));
    const imgRes = await fetch(thumbUrl, {
      headers: {
        Cookie: "sharing_sid=" + sid,
        "X-SYNO-SHARING": sharingId,
      },
    });

    if (imgRes.ok && imgRes.headers.get("content-type")?.startsWith("image/")) {
      const buffer = await imgRes.arrayBuffer();
      return {
        contentType: imgRes.headers.get("content-type") || "image/jpeg",
        buffer: Buffer.from(buffer),
      };
    }
  } catch (e: any) {
    console.error("Synology proxy resolution error:", e?.message || e);
  }
  return null;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  const rawPort = process.env.PORT || process.env.APP_PORT || "3000";
  const PORT = parseInt(rawPort, 10);

  const distPath = path.join(process.cwd(), "dist");
  const hasDist = fs.existsSync(path.join(distPath, "index.html"));
  const isProduction = process.env.NODE_ENV === "production" || (process.env.NODE_ENV !== "development" && hasDist);

  const DB_FILE = path.join(process.cwd(), "data", "db.json");

  // Server-side JSON Database Persistence API Routes
  app.get("/api/db", (req, res) => {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, "utf-8");
        const parsed = JSON.parse(fileContent);
        return res.json(parsed);
      }
      return res.json({});
    } catch (error: any) {
      console.error("Error reading db.json:", error?.message || error);
      return res.status(500).json({ error: "Failed to read database file" });
    }
  });

  app.post("/api/db", (req, res) => {
    try {
      const incomingData = req.body;
      let existingData = {};
      if (fs.existsSync(DB_FILE)) {
        try {
          existingData = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
        } catch {
          existingData = {};
        }
      } else {
        const dir = path.dirname(DB_FILE);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      }

      const updatedData = { ...existingData, ...incomingData, updatedAt: new Date().toISOString() };
      fs.writeFileSync(DB_FILE, JSON.stringify(updatedData, null, 2), "utf-8");
      return res.json({ success: true, message: "Data saved successfully" });
    } catch (error: any) {
      console.error("Error writing db.json:", error?.message || error);
      return res.status(500).json({ error: "Failed to write database file" });
    }
  });

  // Synology NAS Share Link Proxy API Route
  app.get("/api/synology-proxy", async (req, res) => {
    const targetUrl = req.query.url as string;
    if (!targetUrl) {
      return res.status(400).send("Missing url parameter");
    }

    // 1. Check in-memory cache
    const cached = imageCache.get(targetUrl);
    if (cached && cached.expiresAt > Date.now()) {
      res.setHeader("Content-Type", cached.contentType);
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.send(cached.buffer);
    }

    // 2. Resolve via Synology API
    const resolved = await resolveSynologyImage(targetUrl);
    if (resolved) {
      imageCache.set(targetUrl, {
        contentType: resolved.contentType,
        buffer: resolved.buffer,
        expiresAt: Date.now() + 10 * 60 * 1000,
      });

      res.setHeader("Content-Type", resolved.contentType);
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.send(resolved.buffer);
    }

    // 3. Fallback: try direct fetch
    try {
      const directRes = await fetch(targetUrl);
      if (directRes.ok && directRes.headers.get("content-type")?.startsWith("image/")) {
        const arrayBuf = await directRes.arrayBuffer();
        res.setHeader("Content-Type", directRes.headers.get("content-type") || "image/jpeg");
        res.setHeader("Cache-Control", "public, max-age=86400");
        return res.send(Buffer.from(arrayBuf));
      }
    } catch {
      // Ignore
    }

    // 4. Redirect if resolution failed
    return res.redirect(targetUrl);
  });

  // Serve static files in production or mount Vite middleware in development
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (mode: ${isProduction ? "production" : "development"})`);
  });
}

startServer();
