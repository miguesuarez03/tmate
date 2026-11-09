// ─────────────────────────────────────────────────────────────────────────────
// Redimensionado de imágenes remotas por URL (sin servidor de imágenes propio).
//
// - Wikimedia: las miniaturas viven en /thumb/.../<N>px-<fichero>. Cambiar <N>
//   devuelve otra miniatura. Se usan solo los anchos estándar de Wikimedia
//   (los no estándar se generan bajo demanda y pueden limitarse).
// - Unsplash: acepta ?w=&h=&fit=crop y auto=format, que sirve WebP/AVIF a los
//   navegadores que lo soportan (formato moderno, mucho más ligero).
//
// Las fotos de las ciudades están guardadas a 1920px. Pintarlas a ese tamaño
// en tarjetas de ~400px descargaba 5-10 veces más de lo necesario.
// ─────────────────────────────────────────────────────────────────────────────

const WIKIMEDIA_WIDTHS = [250, 330, 500, 960, 1280, 1920];
const WIKI_THUMB_RE = /^(https:\/\/upload\.wikimedia\.org\/wikipedia\/[^?#]*\/thumb\/[^?#]*\/)(\d+)px-([^/?#]+)$/;

function nearestWikiWidth(width) {
  return WIKIMEDIA_WIDTHS.find((w) => w >= width) || WIKIMEDIA_WIDTHS[WIKIMEDIA_WIDTHS.length - 1];
}

/**
 * Devuelve la URL de la imagen a (aprox.) `width` px de ancho.
 * Si la URL no es de un proveedor conocido, la devuelve tal cual.
 */
export function sizedImage(url, width, height) {
  if (!url || typeof url !== "string") return url;

  const wiki = url.match(WIKI_THUMB_RE);
  if (wiki) {
    const current = parseInt(wiki[2], 10);
    const target = nearestWikiWidth(width);
    // Nunca pedir más grande que la miniatura original guardada (podría no
    // existir si la foto original es más pequeña).
    if (target >= current) return url;
    return `${wiki[1]}${target}px-${wiki[3]}`;
  }

  if (url.startsWith("https://images.unsplash.com/")) {
    try {
      const u = new URL(url);
      u.searchParams.set("w", String(width));
      if (height) u.searchParams.set("h", String(height));
      u.searchParams.set("fit", "crop");
      u.searchParams.set("auto", "format");
      if (!u.searchParams.has("q")) u.searchParams.set("q", "75");
      return u.toString();
    } catch {
      return url;
    }
  }

  return url;
}

/** srcSet para imágenes responsive, o undefined si no se puede redimensionar. */
export function imageSrcSet(url, widths) {
  if (!url || typeof url !== "string") return undefined;
  const resizable = WIKI_THUMB_RE.test(url) || url.startsWith("https://images.unsplash.com/");
  if (!resizable) return undefined;
  const seen = new Set();
  const parts = [];
  for (const w of widths) {
    const src = sizedImage(url, w);
    if (seen.has(src)) continue;
    seen.add(src);
    const realW = WIKI_THUMB_RE.test(src) ? parseInt(src.match(WIKI_THUMB_RE)[2], 10) : w;
    parts.push(`${src} ${realW}w`);
  }
  return parts.length > 1 ? parts.join(", ") : undefined;
}
