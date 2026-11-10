// ─────────────────────────────────────────────────────────────────────────────
// Genera src/data/wikimediaPhotos.js: la FUENTE ÚNICA de datos de cada foto de
// Wikimedia Commons que aparece en src/data/*.js —
//   [ancho original, alto original, bytes, autor, licencia]
//
// - Tamaño y peso: src/lib/images.js nunca pide más píxeles de los que existen
//   (Wikimedia NO da error si pides una miniatura mayor que el original: la
//   reescala hacia arriba y sirve una foto borrosa) y calcula bien el srcset.
// - Autor y licencia: los créditos de cada foto (icono ⓘ sobre la foto y la
//   página /creditos) salen de aquí. Al cambiar una foto y volver a ejecutar
//   el script, todo se actualiza solo.
//
// Uso:  npm run photos:meta   (tras añadir o cambiar fotos de Wikimedia)
// Hace 1 petición a la API de Commons por cada 50 ficheros. No se ejecuta en
// el build, que así no depende de la red; si falta una foto en la tabla,
// images.js se limita al ancho que ya trae su URL y no se muestra crédito.
// ─────────────────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = path.join(ROOT, "src", "data");
const OUT = path.join(DATA_DIR, "wikimediaPhotos.js");
const UA = "MAbroad-photo-metadata/1.0 (https://www.mabroad.com; build-time metadata script)";
const WIKI_RE = /https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/(?:thumb\/)?([0-9a-f]\/[0-9a-f]{2})\/([^/"'?#\s)]+)/g;

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
/** El campo Artist de Commons es HTML (enlaces, spans…): se deja en texto plano. */
function plainText(html = "") {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
      if (e[0] === "#") return String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
      return ENTITIES[e.toLowerCase()] ?? m;
    })
    .replace(/\s+/g, " ")
    .trim();
}

// Autores cuyo campo en Commons es un párrafo de texto libre: nombre corto a mano.
const AUTHOR_OVERRIDES = {
  "8/8a/Malm%C3%B6%E2%80%93flygbild_06_september_2014.jpg": "David Castor",
};

/** Nombre de autor breve: sin "Photograph by …", sin URLs entre paréntesis, ≤70 caracteres. */
function shortAuthor(text) {
  let t = text
    .replace(/^(photograph|photo|picture|image|foto)\s+(by|de|por)\s+/i, "")
    .replace(/\s*\((www\.|https?:)[^)]*\)/gi, "")
    .replace(/\.$/, "")
    .trim();
  if (t.length > 70) t = t.split(/[.;]/)[0].trim();
  if (t.length > 70) t = `${t.slice(0, 67).trimEnd()}…`;
  return t;
}

const keys = new Map(); // "d/dd/Fichero.jpg" → "Fichero.jpg" (sin codificar)
for (const file of fs.readdirSync(DATA_DIR)) {
  if (!file.endsWith(".js") || path.join(DATA_DIR, file) === OUT) continue;
  const src = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
  for (const m of src.matchAll(WIKI_RE)) keys.set(`${m[1]}/${m[2]}`, decodeURIComponent(m[2]));
}

const entries = [...keys.entries()].sort(([a], [b]) => a.localeCompare(b));
const photos = {};
const missing = [];
for (let i = 0; i < entries.length; i += 50) {
  const chunk = entries.slice(i, i + 50);
  const titles = chunk.map(([, name]) => `File:${name.replace(/_/g, " ")}`);
  const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2"
    + "&prop=imageinfo&iiprop=size|extmetadata&iiextmetadatafilter=Artist|LicenseShortName"
    + "&titles=" + encodeURIComponent(titles.join("|"));
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`API de Commons: HTTP ${res.status}`);
  const { query } = await res.json();
  const normalized = new Map((query.normalized || []).map((n) => [n.to, n.from]));
  for (const [key, name] of chunk) {
    const title = `File:${name.replace(/_/g, " ")}`;
    const page = query.pages.find((p) => p.title === title || normalized.get(p.title) === title);
    const info = page?.imageinfo?.[0];
    if (!info?.width || !info?.height) { missing.push(key); continue; }
    const meta = info.extmetadata || {};
    photos[key] = [
      info.width, info.height, info.size,
      AUTHOR_OVERRIDES[key] || shortAuthor(plainText(meta.Artist?.value)) || "Autor desconocido",
      plainText(meta.LicenseShortName?.value) || "Ver en Commons",
    ];
  }
  if (i + 50 < entries.length) await new Promise((r) => setTimeout(r, 1000));
}

const body = Object.entries(photos).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n");
fs.writeFileSync(OUT, `// GENERADO por scripts/wikimedia-photos.mjs (npm run photos:meta) — no editar a mano.
// Fuente única de cada foto de Wikimedia Commons usada en src/data:
//   [ancho original, alto original, bytes, autor, licencia]
// Clave: "<hash>/<fichero tal y como aparece en la URL>".
export const WIKIMEDIA_PHOTOS = {
${body}
};
`);

const small = Object.entries(photos).filter(([, [w, h]]) => w < 1920 || h < 1080);
console.log(`✓ ${Object.keys(photos).length} fotos → ${path.relative(ROOT, OUT)}`);
if (missing.length) console.warn(`⚠ Sin datos en Commons (¿fichero renombrado o borrado?):\n  ${missing.join("\n  ")}`);
if (small.length) console.warn(`⚠ Originales por debajo de 1920×1080 (se verán blandos en cabeceras grandes):\n  ${small.map(([k, [w, h]]) => `${k} ${w}×${h}`).join("\n  ")}`);
const licenses = {};
for (const v of Object.values(photos)) licenses[v[4]] = (licenses[v[4]] || 0) + 1;
console.log("Licencias:", Object.entries(licenses).map(([l, n]) => `${l} (${n})`).join(", "));
