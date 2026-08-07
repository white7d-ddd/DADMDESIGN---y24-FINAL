import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { execSync } from 'child_process';

const distServer = path.join(process.cwd(), 'dist', 'server.cjs');

if (!fs.existsSync(distServer)) {
  console.log("dist/server.cjs missing. Executing build process...");
  try {
    execSync('npm run build', { stdio: 'inherit' });
  } catch (err) {
    console.error("Auto build failed:", err);
  }
}

if (fs.existsSync(distServer)) {
  import(pathToFileURL(distServer).href);
} else {
  console.log("Starting server with tsx runner...");
  try {
    execSync('npx tsx server.ts', { stdio: 'inherit' });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}


