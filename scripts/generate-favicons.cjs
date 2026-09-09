const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

function generateFaviconSVG() {
  const theta_deg = 23.0;
  const theta = (theta_deg * Math.PI) / 180;
  const cos_t = Math.cos(theta);
  const sin_t = Math.sin(theta);

  const u_top = [cos_t, sin_t];
  const u_leg = [-sin_t, cos_t];

  const leg_len = 380.0;
  const span = 295.0;
  const T = 52.0;
  const gap = 14.0;

  const shift = T + gap;
  const dx = shift * u_top[0] + shift * u_leg[0];
  const dy = shift * u_top[1] + shift * u_leg[1];

  const Y_BASE = 500.0;
  const O1 = [220.0, Y_BASE - leg_len * cos_t];

  // Colors matching the uploaded corporate identity logo
  const colors = ['#333333', '#5E5E5E', '#919191'];

  const frames = [];
  for (let i = 0; i < 3; i++) {
    const Ox = O1[0] + i * dx;
    const Oy = O1[1] + i * dy;
    const Rx = Ox + span * cos_t;
    const Ry = Oy + span * sin_t;

    const s_OL = (Y_BASE - Oy) / cos_t;
    const OLx = Ox + s_OL * -sin_t;
    const OLy = Y_BASE;

    const s_OR = (Y_BASE - Ry) / cos_t;
    const ORx = Rx + s_OR * -sin_t;
    const ORy = Y_BASE;

    const Oix = Ox + T * cos_t + T * -sin_t;
    const Oiy = Oy + T * sin_t + T * cos_t;

    const Rix = Rx - T * cos_t + T * -sin_t;
    const Riy = Ry - T * sin_t + T * cos_t;

    const s_IL = (Y_BASE - Oiy) / cos_t;
    const ILx = Oix + s_IL * -sin_t;
    const ILy = Y_BASE;

    const s_IR = (Y_BASE - Riy) / cos_t;
    const IRx = Rix + s_IR * -sin_t;
    const IRy = Y_BASE;

    const pts = [
      [OLx, OLy],
      [Ox, Oy],
      [Rx, Ry],
      [ORx, ORy],
      [IRx, IRy],
      [Rix, Riy],
      [Oix, Oiy],
      [ILx, ILy]
    ];
    frames.push({ pts, color: colors[i] });
  }

  const all_x = frames.flatMap(f => f.pts.map(p => p[0]));
  const all_y = frames.flatMap(f => f.pts.map(p => p[1]));
  const min_x = Math.min(...all_x);
  const max_x = Math.max(...all_x);
  const min_y = Math.min(...all_y);
  const max_y = Math.max(...all_y);

  const w = max_x - min_x;
  const h = max_y - min_y;

  // 12% padding ensuring the logo is never clipped by circular or rounded search engine masks
  const pad = Math.max(w, h) * 0.12;
  const dim = Math.max(w, h) + 2 * pad;
  const vb_x = min_x - (dim - w) / 2;
  const vb_y = min_y - (dim - h) / 2;

  const lines = [];
  lines.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb_x.toFixed(2)} ${vb_y.toFixed(2)} ${dim.toFixed(2)} ${dim.toFixed(2)}" width="512" height="512">`);
  lines.push('  <defs>');
  lines.push(`    <clipPath id="baseline-cut">`);
  lines.push(`      <rect x="${(vb_x - 100).toFixed(1)}" y="${(vb_y - 100).toFixed(1)}" width="${(dim + 200).toFixed(1)}" height="${(Y_BASE - vb_y + 100).toFixed(2)}" />`);
  lines.push('    </clipPath>');
  lines.push('  </defs>');
  lines.push(`  <rect x="${vb_x.toFixed(2)}" y="${vb_y.toFixed(2)}" width="${dim.toFixed(2)}" height="${dim.toFixed(2)}" fill="#FFFFFF" />`);
  lines.push('  <g clip-path="url(#baseline-cut)">');

  frames.forEach((f, i) => {
    const pts_str = f.pts.map(p => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ');
    if (i > 0) {
      lines.push(`    <polygon points="${pts_str}" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="${(gap * 2).toFixed(2)}" stroke-linejoin="miter" stroke-miterlimit="10" />`);
    }
    lines.push(`    <polygon points="${pts_str}" fill="${f.color}" />`);
  });

  lines.push('  </g>');
  lines.push('</svg>');

  return lines.join('\n');
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Generate SVG
  const svgContent = generateFaviconSVG();
  const svgPath = path.join(publicDir, 'favicon.svg');
  fs.writeFileSync(svgPath, svgContent, 'utf8');
  console.log('Saved favicon.svg');

  // 2. Generate PNG sizes
  const sizes = [16, 32, 48, 96, 120, 144, 180, 192, 512];
  for (const size of sizes) {
    const outputPath = path.join(publicDir, `favicon-${size}x${size}.png`);
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outputPath);
    console.log(`Generated favicon-${size}x${size}.png`);
  }

  // apple-touch-icon.png (180x180)
  fs.copyFileSync(
    path.join(publicDir, 'favicon-180x180.png'),
    path.join(publicDir, 'apple-touch-icon.png')
  );
  console.log('Generated apple-touch-icon.png');

  // 3. Generate multi-resolution favicon.ico (16, 32, 48) using ImageMagick
  try {
    const p16 = path.join(publicDir, 'favicon-16x16.png');
    const p32 = path.join(publicDir, 'favicon-32x32.png');
    const p48 = path.join(publicDir, 'favicon-48x48.png');
    const icoPath = path.join(publicDir, 'favicon.ico');
    execSync(`convert "${p16}" "${p32}" "${p48}" "${icoPath}"`);
    console.log('Generated multi-resolution favicon.ico');
  } catch (err) {
    console.error('Error creating favicon.ico with convert:', err.message);
  }

  // 4. Generate site.webmanifest
  const manifest = {
    name: "다듬디자인 - DADMDESIGN",
    short_name: "다듬디자인",
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/"
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Generated site.webmanifest');
}

main().catch(console.error);
