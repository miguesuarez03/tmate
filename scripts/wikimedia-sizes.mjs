// ─────────────────────────────────────────────────────────────────────────────
// Genera src/data/wikimediaSizes.js: el tamaño ORIGINAL (ancho × alto, y peso
// en bytes) de cada foto de Wikimedia Commons que aparece en src/data/*.js.
//
// Por qué hace falta: Wikimedia NO da error si pides una miniatura más grande
// que el original — la reescala hacia arriba y sirve una foto borrosa con
// aspecto de "1920px". Sabiendo el tamaño real, src/lib/images.js nunca pide
// más píxeles de los que existen y calcula bien el srcset (incluido cuánto se
// recorta con object-fit: cover según la proporción de la foto).
//
// Uso:  npm run images:sizes   (tras añadir o cambiar fotos de Wikimedia)
// Hace 1 petición a la API de Commons por cada 50 ficheros. No se ejecuta en
// el build, que así no depende de la red; si falta una foto en la tabla,
// images.js se limita al ancho que ya trae su URL (comportamiento seguro).
// ─────────────────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = path.join(ROOT, "src", "data");
const OUT = path.join(DATA_DIR, "wikimediaSizes.js");
const UA = "MAbroad-image-sizes/1.0 (https://www.mabroad.com; build-time metadata script)";
const WIKI_RE = /https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/(?:thumb\/)?([0-9a-f]\/[0-9a-f]{2})\/([^/"'?#\s)]+)/g;

const keys = new Map(); // "d/dd/Fichero.jpg" → "Fichero.jpg" (sin codificar)
for (const file of fs.readdirSync(DATA_DIR)) {
  if (!file.endsWith(".js") || path.join(DATA_DIR, file) === OUT) continue;
  const src = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
  for (const m of src.matchAll(WIKI_RE)) keys.set(`${m[1]}/${m[2]}`, decodeURIComponent(m[2]));
}

const entries = [...keys.entries()].sort(([a], [b]) => a.localeCompare(b));
const sizes = {};
const missing = [];
for (let i = 0; i < entries.length; i += 50) {
  const chunk = entries.slice(i, i + 50);
  const titles = chunk.map(([, name]) => `File:${name.replace(/_/g, " ")}`);
  const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2"
    + "&prop=imageinfo&iiprop=size&titles=" + encodeURIComponent(titles.join("|"));
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`API de Commons: HTTP ${res.status}`);
  const { query } = await res.json();
  const normalized = new Map((query.normalized || []).map((n) => [n.to, n.from]));
  for (const [key, name] of chunk) {
    const title = `File:${name.replace(/_/g, " ")}`;
    const page = query.pages.find((p) => p.title === title || normalized.get(p.title) === title);
    const info = page?.imageinfo?.[0];
    if (info?.width && info?.height) sizes[key] = [info.width, info.height, info.size];
    else missing.push(key);
  }
  if (i + 50 < entries.length) await new Promise((r) => setTimeout(r, 1000));
}

const body = Object.entries(sizes).map(([k, [w, h, b]]) => `  ${JSON.stringify(k)}: [${w}, ${h}, ${b}],`).join("\n");
fs.writeFileSync(OUT, `// GENERADO por scripts/wikimedia-sizes.mjs (npm run images:sizes) — no editar a mano.
// Original de cada foto de Wikimedia Commons usada en src/data: [ancho, alto, bytes].
// Clave: "<hash>/<fichero tal y como aparece en la URL>".
export const WIKIMEDIA_SIZES = {
${body}
};
`);

const small = Object.entries(sizes).filter(([, [w, h]]) => w < 1920 || h < 1080);
console.log(`✓ ${Object.keys(sizes).length} fotos → ${path.relative(ROOT, OUT)}`);
if (missing.length) console.warn(`⚠ Sin datos en Commons (¿fichero renombrado o borrado?):\n  ${missing.join("\n  ")}`);
if (small.length) console.warn(`⚠ Originales por debajo de 1920×1080 (se verán blandos en cabeceras grandes):\n  ${small.map(([k, [w, h]]) => `${k} ${w}×${h}`).join("\n  ")}`);
