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

export function getDirectImageUrl(url: string): string {
  if (!url) return '';
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




