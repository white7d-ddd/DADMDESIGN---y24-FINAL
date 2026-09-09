/**
 * Converts image URLs including Synology NAS share links (gofile.me or /sharing/)
 * into direct displayable image/download URLs that work seamlessly on static GitHub Pages
 * as well as full-stack Node server environments.
 */

export function getSynologyCandidates(url: string): string[] {
  if (!url) return [];
  const trimmed = url.trim();

  // If already a data URL, blob, or local path
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:') || trimmed.startsWith('/')) {
    return [trimmed];
  }

  // Handle gofile.me links: e.g. https://gofile.me/7orbX/vCIhTXDdy
  if (trimmed.includes('gofile.me/')) {
    try {
      const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      const parts = parsed.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        const serverId = parts[0];
        const shareId = parts[1].split('?')[0].split('#')[0];
        
        // 1) Fast Image CDN/CORS Proxy via wsrv.nl (Bypasses CORS/Referrer blocks on GitHub Pages)
        const proxyGofileUrl = `https://wsrv.nl/?url=${encodeURIComponent(`gofile.me/${serverId}/${shareId}?dlink=true`)}`;
        
        // 2) Direct gofile.me link with dlink=true
        const dlinkUrl = `https://gofile.me/${serverId}/${shareId}?dlink=true`;
        
        // 3) QuickConnect Direct API via Proxy
        const directQcRaw = `https://${serverId.toLowerCase()}.direct.quickconnect.to/fbsharing/api/download?id=${encodeURIComponent(shareId)}`;
        const proxyQcUrl = `https://wsrv.nl/?url=${encodeURIComponent(directQcRaw)}`;

        // 4) Raw QuickConnect Direct API
        const standardQcUrl = `https://${serverId.toLowerCase()}.quickconnect.to/fbsharing/api/download?id=${encodeURIComponent(shareId)}`;

        return [proxyGofileUrl, dlinkUrl, proxyQcUrl, directQcRaw, standardQcUrl, trimmed];
      }
    } catch {
      // Fallback below
    }
  }

  // Handle /sharing/ links: e.g. https://nas.mydomain.com:5001/sharing/AbCdEf or https://7x9a.quickconnect.to/sharing/AbCdEf
  if (trimmed.includes('/sharing/')) {
    try {
      const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      const parts = parsed.pathname.split('/').filter(Boolean);
      const sharingIndex = parts.indexOf('sharing');
      if (sharingIndex !== -1 && parts[sharingIndex + 1]) {
        const shareId = parts[sharingIndex + 1].split('?')[0].split('#')[0];
        
        const qcParsed = new URL(parsed.toString());
        qcParsed.pathname = '/fbsharing/api/download';
        qcParsed.search = `?id=${encodeURIComponent(shareId)}`;

        const connector = trimmed.includes('?') ? '&' : '?';
        const dlinkUrl = `${trimmed}${connector}dlink=true`;

        const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(dlinkUrl)}`;

        return [proxyUrl, qcParsed.toString(), dlinkUrl, trimmed];
      }
    } catch {
      // Fallback
    }
  }

  return [trimmed];
}

export function convertSynologyToDirectUrl(url: string): string {
  const candidates = getSynologyCandidates(url);
  return candidates[0] || url.trim();
}

export const DEFAULT_PRODUCT_PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" fill="%23f8fafc"><rect width="800" height="600" fill="%23f8fafc"/><rect x="24" y="24" width="752" height="552" rx="12" fill="%23f1f5f9" stroke="%23cbd5e1" stroke-width="2" stroke-dasharray="8 8"/><path d="M370 270h60v60h-60zM355 315l35-35 60 60M415 305l20-20 40 40" stroke="%2394a3b8" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="385" cy="290" r="8" fill="%2394a3b8"/><text x="50%" y="67%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="20" fill="%23475569">사진 등록 준비중</text><text x="50%" y="74%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%2394a3b8">관리자 모드에서 사진을 업로드할 수 있습니다</text></svg>`;

export const DEFAULT_BANNER_PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="800" viewBox="0 0 1600 800" fill="%230f172a"><defs><linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230f172a"/><stop offset="50%" stop-color="%231e293b"/><stop offset="100%" stop-color="%23020617"/></linearGradient></defs><rect width="1600" height="800" fill="url(%23bgGrad)"/><text x="50%" y="46%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="38" letter-spacing="4" fill="%2338bdf8">DADMDESIGN</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%2394a3b8">배너 이미지 등록 대기중 (관리자에서 사진 업로드 가능)</text></svg>`;

export function getDirectImageUrl(url?: string | null, fallback = DEFAULT_PRODUCT_PLACEHOLDER): string {
  if (!url || typeof url !== 'string' || !url.trim()) return fallback;
  const cleanUrl = url.trim();

  if (cleanUrl.startsWith('/') || cleanUrl.startsWith('data:') || cleanUrl.startsWith('blob:')) {
    return cleanUrl;
  }

  // Convert Synology links to direct download/proxy links
  if (cleanUrl.includes('gofile.me/') || cleanUrl.includes('/sharing/')) {
    return convertSynologyToDirectUrl(cleanUrl);
  }

  return cleanUrl;
}

/**
 * Compresses an image file in the browser using canvas to prevent high memory usage,
 * localStorage quota exhaustion, and server payload timeouts / 502 Bad Gateway errors.
 */
export function compressImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1200,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve) => {
    if (!file) {
      resolve('');
      return;
    }

    // Pass SVG straight through
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        resolve('');
        return;
      }

      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // If it's a small PNG with possible transparency, keep png, otherwise compress to JPEG for optimal payload size
        const isPng = file.type === 'image/png';
        const mime = isPng && file.size < 500 * 1024 ? 'image/png' : 'image/jpeg';
        try {
          const compressed = canvas.toDataURL(mime, quality);
          resolve(compressed);
        } catch {
          resolve(dataUrl);
        }
      };

      img.onerror = () => {
        resolve(dataUrl);
      };

      img.src = dataUrl;
    };

    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}




