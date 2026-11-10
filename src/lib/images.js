// ─────────────────────────────────────────────────────────────────────────────
// Imágenes responsive para las fotos remotas (sin servidor de imágenes propio).
//
// Cada foto se describe con un srcset de anchos REALES y un `sizes` que dice
// cuántos píxeles CSS ocupa la foto pintada; el navegador multiplica por la
// densidad de la pantalla (1x, 2x…) y elige. Tres reglas que antes fallaban:
//
// 1. object-fit: cover. Una foto apaisada (3:2) dentro de una tarjeta vertical
//    (4:5) se pinta por su ALTO: sale ~1,9 veces más ancha que la tarjeta. Si
//    `sizes` dice "el ancho de la tarjeta", el navegador elige una versión
//    casi la mitad de grande de lo necesario y la estira → borrosa. Aquí cada
//    hueco declara su proporción y el `sizes` se corrige con la de la foto.
// 2. Nunca más píxeles de los que existen. Wikimedia NO da error si pides una
//    miniatura mayor que el original: la reescala hacia arriba y sirve una
//    foto borrosa que parece de 1920 px. Por eso se usa el tamaño original de
//    src/data/wikimediaSizes.js (npm run images:sizes) como techo.
// 3. Solo anchos estándar de Wikimedia (los demás se limitan con 429/400) y,
//    en pantallas de más de 2x (móviles 3x), se pide como si fueran 2x: a esa
//    densidad el ojo no distingue más y el peso se dispararía.
// ─────────────────────────────────────────────────────────────────────────────
import { WIKIMEDIA_SIZES } from "../data/wikimediaSizes";

const WIKI_BASE = "https://upload.wikimedia.org/wikipedia/commons/";
const WIKI_RE = /^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/(?:thumb\/)?([0-9a-f]\/[0-9a-f]{2})\/([^/?#]+)(?:\/(\d+)px-[^/?#]+)?$/;
/** Anchos estándar de miniatura de Wikimedia (https://w.wiki/GHai). */
const WIKI_WIDTHS = [120, 250, 330, 500, 960, 1280, 1920, 3840];
/** El original se ofrece como mayor candidato solo si es ligero: los hay de 7 MB. */
const ORIGINAL_MAX_BYTES = 1_500_000;
const UNSPLASH_WIDTHS = [400, 640, 960, 1280, 1920, 2560, 3840];
/** Proporción supuesta cuando no se conoce la de la foto (la típica de cámara). */
const DEFAULT_PHOTO_ASPECT = 1.5;
/** Pantallas de 3x se tratan como 2x (ver regla 3). */
const HIGH_DPR = "(min-resolution: 2.5dppx)";
const HIGH_DPR_SCALE = 2 / 3;

/** Candidatos [url, ancho real] de una foto de Wikimedia, o null si no lo es. */
function wikimediaCandidates(url) {
  const m = WIKI_RE.exec(url);
  if (!m) return null;
  const [, hash, file, urlWidth] = m;
  // tif/svg/webp generan miniaturas con otra extensión: se dejan tal cual.
  if (!/\.(jpe?g|png)$/i.test(file)) return null;
  const original = WIKIMEDIA_SIZES[`${hash}/${file}`];
  const maxWidth = original ? original[0] : Number(urlWidth) || 0;
  if (!maxWidth) return null;

  const thumb = (w) => `${WIKI_BASE}thumb/${hash}/${file}/${w}px-${file}`;
  const candidates = WIKI_WIDTHS.filter((w) => w < maxWidth).map((w) => [thumb(w), w]);
  if (original) {
    if (maxWidth <= 3840 && original[2] <= ORIGINAL_MAX_BYTES) candidates.push([`${WIKI_BASE}${hash}/${file}`, maxWidth]);
  } else {
    // Sin datos del original: como mucho, el ancho que ya trae la URL.
    candidates.push([thumb(maxWidth), maxWidth]);
  }
  return { candidates, aspect: original ? original[0] / original[1] : DEFAULT_PHOTO_ASPECT };
}

function unsplashUrl(url, width, height) {
  try {
    const u = new URL(url);
    u.searchParams.set("w", String(width));
    if (height) {
      u.searchParams.set("h", String(height));
      u.searchParams.set("fit", "crop");
    } else {
      u.searchParams.delete("h");
    }
    u.searchParams.set("auto", "format"); // WebP/AVIF si el navegador lo admite
    u.searchParams.set("q", "80");
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * Candidatos de Unsplash (redimensiona a cualquier ancho). Con `crop` se pide
 * ya recortada a esa proporción: así coincide con su hueco y no se descargan
 * píxeles que object-fit: cover iba a tirar.
 */
function unsplashCandidates(url, crop) {
  if (!url.startsWith("https://images.unsplash.com/")) return null;
  return {
    candidates: UNSPLASH_WIDTHS.map((w) => [unsplashUrl(url, w, crop ? Math.round(w / crop) : undefined), w]),
    aspect: crop || DEFAULT_PHOTO_ASPECT,
  };
}

function describe(url, crop) {
  if (!url || typeof url !== "string") return null;
  return wikimediaCandidates(url) || unsplashCandidates(url, crop);
}

/** El candidato más pequeño que cubre `width`, o el mayor que haya. */
function pick(candidates, width) {
  const hit = candidates.find(([, w]) => w >= width);
  return (hit || candidates[candidates.length - 1])[0];
}

/** srcset a partir de `min` px (siempre queda al menos el mayor candidato). */
function toSrcSet(candidates, min) {
  const list = candidates.filter(([, w]) => w >= min);
  return (list.length ? list : candidates.slice(-1)).map(([u, w]) => `${u} ${w}w`).join(", ");
}

const fmt = (n) => String(Math.round(n * 100) / 100);
const scaled = (length, k) => (Math.abs(k - 1) < 0.01 ? length : `calc(${length} * ${fmt(k)})`);

/**
 * Construye `sizes` a partir de los huecos de la foto.
 * @param {Array<[string|null, string, number]>} slots  [media query (null = por defecto), ancho CSS del hueco, proporción ancho/alto del hueco]
 * @param {number} photoAspect  proporción ancho/alto de la foto
 */
function buildSizes(slots, photoAspect) {
  const parts = [];
  for (const [media, width, boxAspect] of slots) {
    // object-fit: cover → si la foto es más apaisada que su hueco, se pinta por el alto.
    const k = boxAspect ? Math.max(1, photoAspect / boxAspect) : 1;
    parts.push(`${media ? `${media} and ` : ""}${HIGH_DPR} ${scaled(width, k * HIGH_DPR_SCALE)}`);
    parts.push(`${media ? `${media} ` : ""}${scaled(width, k)}`);
  }
  return parts.join(", ");
}

/**
 * Atributos { src, srcSet, sizes } para una foto que rellena su hueco con
 * object-fit: cover (tarjetas, miniaturas, modales…).
 * @param {string} url
 * @param {object} options
 * @param {Array<[string|null, string, number]>} options.slots  ver buildSizes
 * @param {number} [options.crop]  Unsplash: recortar en origen a esta proporción
 * @param {number} [options.fallback=960]  ancho del `src` (navegadores sin srcset y HTML prerenderizado)
 * @param {number} [options.min=330]  candidatos más pequeños no se listan (HTML más ligero)
 */
export function responsiveImage(url, { slots, crop, fallback = 960, min = 330 }) {
  const info = describe(url, crop);
  if (!info) return { src: url };
  return {
    src: pick(info.candidates, fallback),
    srcSet: toSrcSet(info.candidates, min),
    sizes: buildSizes(slots, info.aspect),
  };
}

/**
 * Atributos { src, srcSet, sizes } para una foto de cabecera a sangre
 * (100% de ancho y ~100% del alto de la ventana, object-fit: cover).
 * - Escritorio apaisado: la foto ocupa el ancho de la ventana (100vw) — o,
 *   si la ventana es menos apaisada que la foto, se pinta por el alto
 *   (100vh × proporción). Hasta 3840 px en pantallas grandes o retina.
 * - Móvil (≤768px): se pinta por el alto y saldría a casi 4K en un 3x; se
 *   limita a ~1920 px de foto, nítida a la distancia de un móvil y ligera.
 */
export function heroImage(url) {
  const info = describe(url);
  if (!info) return { src: url };
  const r = info.aspect;
  const sizes = [
    `(max-width: 768px) and ${HIGH_DPR} 640px`,
    "(max-width: 768px) 960px",
    `(max-aspect-ratio: ${Math.round(r * 1000)}/1000) calc(100vh * ${fmt(r)})`,
    "100vw",
  ].join(", ");
  return {
    src: pick(info.candidates, 1920),
    srcSet: toSrcSet(info.candidates, 960),
    sizes,
  };
}

/**
 * Una sola URL a (al menos) `width` px — para metadatos (og:image) y usos sin
 * srcset. Con `height`, las de Unsplash se recortan a esa proporción.
 */
export function sizedImage(url, width, height) {
  if (!url || typeof url !== "string") return url;
  const wiki = wikimediaCandidates(url);
  if (wiki) return pick(wiki.candidates, width);
  if (url.startsWith("https://images.unsplash.com/")) return unsplashUrl(url, width, height);
  return url;
}
