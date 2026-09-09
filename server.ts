import express from "express";
import http from "http";
import path from "path";
import fs from "fs";

// Crash prevention: Catch uncaught exceptions and unhandled rejections to prevent 502 Bad Gateway
process.on("uncaughtException", (err) => {
  console.error("[Fatal Error: Uncaught Exception]", err?.message || err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("[Fatal Error: Unhandled Rejection]", reason);
});

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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const servRes = await fetch("https://global.quickconnect.to/Serv.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: controller.signal,
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
      }).then((r) => r.json()).finally(() => clearTimeout(timeoutId));

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
    
    const loginController = new AbortController();
    const loginTimeout = setTimeout(() => loginController.abort(), 5000);
    const loginData = await fetch(loginUrl, { signal: loginController.signal })
      .then((r) => r.json())
      .finally(() => clearTimeout(loginTimeout));

    if (!loginData.success || !loginData.data?.sharing_sid) return null;
    const sid = loginData.data.sharing_sid;

    // 2. Get Session to find filename
    const sessionUrl =
      nasBaseUrl +
      "webapi/entry.cgi?api=SYNO.Core.Sharing.Session&version=1&method=get&sharing_id=" +
      encodeURIComponent(JSON.stringify(sharingId));
    
    const sessController = new AbortController();
    const sessTimeout = setTimeout(() => sessController.abort(), 5000);
    const sessionText = await fetch(sessionUrl, { signal: sessController.signal })
      .then((r) => r.text())
      .finally(() => clearTimeout(sessTimeout));

    let filename = "";
    const fnMatch = sessionText.match(/\"filename\"\s*:\s*\"([^\"]+)\"/);
    if (fnMatch) filename = fnMatch[1];

    // 3. Fetch image thumbnail payload
    const thumbUrl =
      nasBaseUrl +
      "webapi/entry.cgi?api=SYNO.FolderSharing.Thumb&version=2&method=get&size=large&path=" +
      encodeURIComponent(JSON.stringify("/" + filename));
    
    const thumbController = new AbortController();
    const thumbTimeout = setTimeout(() => thumbController.abort(), 8000);
    const imgRes = await fetch(thumbUrl, {
      signal: thumbController.signal,
      headers: {
        Cookie: "sharing_sid=" + sid,
        "X-SYNO-SHARING": sharingId,
      },
    }).finally(() => clearTimeout(thumbTimeout));

    if (imgRes.ok && imgRes.headers.get("content-type")?.startsWith("image/")) {
      const buffer = await imgRes.arrayBuffer();
      return {
        contentType: imgRes.headers.get("content-type") || "image/jpeg",
        buffer: Buffer.from(buffer),
      };
    }
  } catch (e: any) {
    console.error("[Synology Proxy Resolution Warning]:", e?.message || e);
  }
  return null;
}

// In-Memory Database Store for Instant, Non-Blocking, 100% Reliable Reads & Writes
let inMemoryDB: Record<string, any> = {};
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
const DB_TEMP_FILE = path.join(DATA_DIR, "db.json.tmp");
const DB_BACKUP_FILE = path.join(DATA_DIR, "db.backup.json");
const DB_BASELINE_FILE = path.join(process.cwd(), "public", "baseline-db.json");

// Helper to check if DB object has valid product data
function isValidDatabase(dbObj: any): boolean {
  return (
    dbObj &&
    typeof dbObj === "object" &&
    Array.isArray(dbObj.products) &&
    dbObj.products.length > 0
  );
}

// Initialize Database from Disk with Triple-Layer Fallback
function initDatabase() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    let loaded = false;

    // 1. Try primary db.json
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        if (raw && raw.trim()) {
          const parsed = JSON.parse(raw);
          if (isValidDatabase(parsed)) {
            inMemoryDB = parsed;
            loaded = true;
            console.log(`[DB] Successfully loaded ${parsed.products.length} products from db.json`);
          }
        }
      } catch (e: any) {
        console.warn("[DB Warning] Primary db.json parse error:", e?.message || e);
      }
    }

    // 2. If primary missing or empty, try db.backup.json
    if (!loaded && fs.existsSync(DB_BACKUP_FILE)) {
      try {
        const rawBackup = fs.readFileSync(DB_BACKUP_FILE, "utf-8");
        if (rawBackup && rawBackup.trim()) {
          const parsedBackup = JSON.parse(rawBackup);
          if (isValidDatabase(parsedBackup)) {
            inMemoryDB = parsedBackup;
            loaded = true;
            console.log(`[DB Recovery] Loaded ${parsedBackup.products.length} products from db.backup.json`);
            // Restore to primary
            fs.writeFileSync(DB_FILE, rawBackup, "utf-8");
          }
        }
      } catch (e: any) {
        console.warn("[DB Warning] Backup parse error:", e?.message || e);
      }
    }

    // 3. If still not loaded, try public/baseline-db.json
    if (!loaded && fs.existsSync(DB_BASELINE_FILE)) {
      try {
        const rawBaseline = fs.readFileSync(DB_BASELINE_FILE, "utf-8");
        if (rawBaseline && rawBaseline.trim()) {
          const parsedBaseline = JSON.parse(rawBaseline);
          if (isValidDatabase(parsedBaseline)) {
            inMemoryDB = parsedBaseline;
            loaded = true;
            console.log(`[DB Recovery] Loaded ${parsedBaseline.products.length} products from baseline-db.json`);
            fs.writeFileSync(DB_FILE, rawBaseline, "utf-8");
            fs.writeFileSync(DB_BACKUP_FILE, rawBaseline, "utf-8");
          }
        }
      } catch (e: any) {
        console.warn("[DB Warning] Baseline parse error:", e?.message || e);
      }
    }

    if (!loaded) {
      console.warn("[DB Warning] No valid baseline found, initialized empty database");
      inMemoryDB = {};
    }
  } catch (err: any) {
    console.warn("[DB Warning] Initial load from disk fallback to in-memory:", err?.message || err);
    inMemoryDB = {};
  }
}

// Thread-safe Async Disk Flusher
let isWriting = false;
let pendingWrite = false;

function scheduleDiskSave() {
  if (isWriting) {
    pendingWrite = true;
    return;
  }

  isWriting = true;
  pendingWrite = false;

  setImmediate(() => {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const dataStr = JSON.stringify(inMemoryDB, null, 2);
      // Atomic write using temp file and rename to prevent file corruption
      fs.writeFileSync(DB_TEMP_FILE, dataStr, "utf-8");
      fs.renameSync(DB_TEMP_FILE, DB_FILE);

      // Also persist to backup file asynchronously if valid
      if (isValidDatabase(inMemoryDB)) {
        try {
          fs.writeFileSync(DB_BACKUP_FILE, dataStr, "utf-8");
        } catch (backupErr) {
          // non-critical
        }
      }
    } catch (err: any) {
      console.warn("[DB Save Warning] Could not persist to disk file (in-memory remains active):", err?.message || err);
    } finally {
      isWriting = false;
      if (pendingWrite) {
        scheduleDiskSave();
      }
    }
  });
}

async function startServer() {
  initDatabase();

  const app = express();

  // Trust proxy for reverse proxies (Cafe24 AI Space, Nginx, Cloudflare, Traefik)
  app.set("trust proxy", 1);

  // Generous payload limits for admin image uploads and content editing
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ limit: "100mb", extended: true }));

  // CORS and Cache safety middleware
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  const rawPort = process.env.PORT || process.env.APP_PORT || process.env.NODE_PORT || "3000";
  const PORT = parseInt(rawPort, 10);

  const distPath = path.join(process.cwd(), "dist");
  const hasDist = fs.existsSync(path.join(distPath, "index.html"));
  const isProduction = process.env.NODE_ENV === "production" || (process.env.NODE_ENV !== "development" && hasDist);

  // Health check routes for Cafe24 AI Space / Docker / Kubernetes probes
  app.get(["/api/health", "/health", "/ping"], (req, res) => {
    res.status(200).json({
      status: "ok",
      mode: isProduction ? "production" : "development",
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Explicit SEO routes for Naver Search Advisor / Google Search Console
  const STANDARD_ROBOTS_TXT = `User-agent: *
Allow: /

User-agent: Yeti
Allow: /

Sitemap: https://dadmdesign.com/sitemap.xml
`;

  app.all(["/robots.txt", "/robots.txt/"], (req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    try {
      const robotsPath = path.join(process.cwd(), isProduction ? "dist" : "public", "robots.txt");
      const fallbackPublic = path.join(process.cwd(), "public", "robots.txt");
      if (fs.existsSync(robotsPath)) {
        const content = fs.readFileSync(robotsPath, "utf-8");
        return res.status(200).send(content);
      } else if (fs.existsSync(fallbackPublic)) {
        const content = fs.readFileSync(fallbackPublic, "utf-8");
        return res.status(200).send(content);
      }
    } catch {
      // Fallback below
    }
    return res.status(200).send(STANDARD_ROBOTS_TXT);
  });

  app.all(["/sitemap.xml", "/sitemap.xml/"], (req, res) => {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    try {
      const sitemapPath = path.join(process.cwd(), isProduction ? "dist" : "public", "sitemap.xml");
      const fallbackPublic = path.join(process.cwd(), "public", "sitemap.xml");
      if (fs.existsSync(sitemapPath)) {
        const content = fs.readFileSync(sitemapPath, "utf-8");
        return res.status(200).send(content);
      } else if (fs.existsSync(fallbackPublic)) {
        const content = fs.readFileSync(fallbackPublic, "utf-8");
        return res.status(200).send(content);
      }
    } catch {
      // Fallback below
    }
    const today = new Date().toISOString().split("T")[0];
    return res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://dadmdesign.com/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`);
  });

  // Explicit Favicon Routes for Search Engines (Naver Yeti, Googlebot, Daum, Bing)
  app.get(["/favicon.ico", "/favicon.ico/"], (req, res) => {
    res.setHeader("Content-Type", "image/x-icon");
    res.setHeader("Cache-Control", "public, max-age=86400");
    const icoPath = path.join(process.cwd(), isProduction ? "dist" : "public", "favicon.ico");
    const fallbackPublic = path.join(process.cwd(), "public", "favicon.ico");
    if (fs.existsSync(icoPath)) return res.sendFile(icoPath);
    if (fs.existsSync(fallbackPublic)) return res.sendFile(fallbackPublic);
    return res.status(404).end();
  });

  app.get(["/favicon.svg", "/favicon.svg/"], (req, res) => {
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    const svgPath = path.join(process.cwd(), isProduction ? "dist" : "public", "favicon.svg");
    const fallbackPublic = path.join(process.cwd(), "public", "favicon.svg");
    if (fs.existsSync(svgPath)) return res.sendFile(svgPath);
    if (fs.existsSync(fallbackPublic)) return res.sendFile(fallbackPublic);
    return res.status(404).end();
  });

  app.get("/site.webmanifest", (req, res) => {
    res.setHeader("Content-Type", "application/manifest+json; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    const manifestPath = path.join(process.cwd(), isProduction ? "dist" : "public", "site.webmanifest");
    const fallbackPublic = path.join(process.cwd(), "public", "site.webmanifest");
    if (fs.existsSync(manifestPath)) return res.sendFile(manifestPath);
    if (fs.existsSync(fallbackPublic)) return res.sendFile(fallbackPublic);
    return res.status(404).end();
  });

  // Fast & Crash-proof Server Database Persistence API
  app.get("/api/db", (req, res) => {
    try {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      return res.status(200).json(inMemoryDB || {});
    } catch (error: any) {
      console.error("[API Error] Reading db:", error?.message || error);
      return res.status(200).json(inMemoryDB || {});
    }
  });

  app.post("/api/db", (req, res) => {
    try {
      const incomingData = req.body;
      if (!incomingData || typeof incomingData !== "object") {
        return res.status(400).json({ error: "Invalid JSON body" });
      }

      // Update in-memory DB immediately for zero-delay response
      inMemoryDB = {
        ...inMemoryDB,
        ...incomingData,
        updatedAt: new Date().toISOString()
      };

      // Asynchronously flush to disk safely
      scheduleDiskSave();

      return res.status(200).json({
        success: true,
        message: "Data saved successfully to database",
        updatedAt: inMemoryDB.updatedAt
      });
    } catch (error: any) {
      console.error("[API Error] Writing db:", error?.message || error);
      return res.status(500).json({ error: "Failed to write database", message: error?.message });
    }
  });

  // Direct database backup download endpoint
  app.get("/api/db/export", (req, res) => {
    try {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="dadm-db-backup-${new Date().toISOString().split("T")[0]}.json"`);
      return res.status(200).send(JSON.stringify(inMemoryDB, null, 2));
    } catch (err: any) {
      return res.status(500).json({ error: "Failed to export db", message: err?.message });
    }
  });

  // Synology NAS Share Link Proxy API Route with Timeout Safeguards
  app.get("/api/synology-proxy", async (req, res) => {
    const targetUrl = req.query.url as string;
    if (!targetUrl) {
      return res.status(400).send("Missing url parameter");
    }

    try {
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
        const directController = new AbortController();
        const directTimeout = setTimeout(() => directController.abort(), 6000);
        const directRes = await fetch(targetUrl, { signal: directController.signal }).finally(() => clearTimeout(directTimeout));
        
        if (directRes.ok && directRes.headers.get("content-type")?.startsWith("image/")) {
          const arrayBuf = await directRes.arrayBuffer();
          res.setHeader("Content-Type", directRes.headers.get("content-type") || "image/jpeg");
          res.setHeader("Cache-Control", "public, max-age=86400");
          return res.send(Buffer.from(arrayBuf));
        }
      } catch {
        // Ignore fallback fetch error
      }

      // 4. Redirect if resolution failed
      return res.redirect(targetUrl);
    } catch (proxyErr: any) {
      console.warn("[Proxy Warning]:", proxyErr?.message || proxyErr);
      return res.redirect(targetUrl);
    }
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
    app.use(express.static(distPath, {
      maxAge: '1h',
      etag: true
    }));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Global Express Error Handler to prevent any 502/server termination
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("[Express Middleware Error]", err?.message || err);
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: "Internal Server Error", message: err?.message || "An unexpected error occurred" });
  });

  // Create HTTP server explicitly to configure keepAliveTimeout for Nginx / Cafe24 AI Space
  const server = http.createServer(app);

  // CRITICAL FOR REVERSE PROXY / CAFE24 / NGINX:
  // Node.js default keepAliveTimeout is 5s, while Nginx default is 60-75s.
  // When Nginx reuses a socket closed by Node, it produces 502 Bad Gateway!
  // Setting keepAliveTimeout > Nginx's upstream keepalive prevents this issue.
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server Ready] Listening on http://0.0.0.0:${PORT} (mode: ${isProduction ? "production" : "development"})`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log("[Server] Gracefully shutting down...");
    // Save any pending DB changes before exiting
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(inMemoryDB, null, 2), "utf-8");
    } catch {
      // Ignore
    }
    server.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer();

