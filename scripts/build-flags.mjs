// ─────────────────────────────────────────────────────────────────────────────
// scripts/build-flags.mjs  →  npm run flags:sprite
//
// Genera el sprite de banderas (src/assets/flags.svg) y la lista de códigos que
// contiene (src/data/flagSprite.js).
//
// Por qué: los datos guardan la bandera de cada país como emoji (🇮🇹), y
// Windows no trae banderas en su fuente de emoji: en Chrome/Edge se ven como
// dos letras ("IT"). El componente <Flag> (src/components/Flag.jsx) pinta en
// su lugar el símbolo SVG de este sprite, igual en todos los sistemas.
//
// Qué hace: busca todas las banderas emoji que aparecen en src/, las pasa a
// su código ISO (misma función que usa el cliente, src/lib/flags.js) y copia
// el SVG 3:2 de `country-flag-icons` (MIT) como <symbol id="código">. Solo
// entran las banderas que se usan (~50, unos 30 kB sin comprimir).
//
// Cuándo relanzarlo: al añadir una ciudad de un país que aún no estaba. Si
// falta, <Flag> no rompe: vuelve al emoji. El sprite y la lista se commitean
// (el build de Vercel no los regenera).
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { flagEmojiToCode } from "../src/lib/flags.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const ICONS = join(ROOT, "node_modules", "country-flag-icons", "3x2");
const SPRITE_OUT = join(SRC, "assets", "flags.svg");
const CODES_OUT = join(SRC, "data", "flagSprite.js");

// Bandera de país (dos indicadores regionales) o de subdivisión (bandera
// negra + etiquetas + cierre, p. ej. Escocia).
const FLAG_RE = /[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]+\u{E007F}/gu;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [".js", ".jsx"].includes(extname(entry.name)) ? [full] : [];
  });
}

if (!existsSync(ICONS)) {
  console.error("✖ Falta node_modules/country-flag-icons. Ejecuta `npm install`.");
  process.exit(1);
}

const codes = new Set();
for (const file of walk(SRC)) {
  if (file === CODES_OUT) continue;
  for (const emoji of readFileSync(file, "utf8").match(FLAG_RE) ?? []) {
    const code = flagEmojiToCode(emoji);
    if (code) codes.add(code);
  }
}

const symbols = [];
const included = [];
const missing = [];
for (const code of [...codes].sort()) {
  const file = join(ICONS, `${code.toUpperCase()}.svg`);
  if (!existsSync(file)) { missing.push(code); continue; }
  const svg = readFileSync(file, "utf8");
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1];
  let inner = /<svg[^>]*>([\s\S]*)<\/svg>/.exec(svg)?.[1]?.trim();
  if (!viewBox || !inner) { missing.push(code); continue; }
  // Los id internos (degradados, recortes) se prefijan con el código: dentro
  // del sprite tienen que ser únicos entre todas las banderas.
  if (/\sid="/.test(inner)) {
    inner = inner
      .replace(/\sid="([^"]+)"/g, ` id="${code}-$1"`)
      .replace(/url\(#([^)]+)\)/g, `url(#${code}-$1)`)
      .replace(/href="#([^"]+)"/g, `href="#${code}-$1"`);
  }
  symbols.push(`<symbol id="${code}" viewBox="${viewBox}">${inner}</symbol>`);
  included.push(code);
}

const sprite =
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n` +
  `<!-- Generado por scripts/build-flags.mjs (npm run flags:sprite). Banderas: country-flag-icons, licencia MIT. -->\n` +
  symbols.join("\n") + `\n</svg>\n`;
writeFileSync(SPRITE_OUT, sprite, "utf8");

writeFileSync(
  CODES_OUT,
  `// GENERADO por scripts/build-flags.mjs (npm run flags:sprite) — no editar a mano.\n` +
  `// Códigos de las banderas que contiene src/assets/flags.svg. <Flag> solo pinta\n` +
  `// el SVG si el código está aquí; si no, deja el emoji.\n` +
  `export const FLAG_CODES = new Set(${JSON.stringify(included)});\n`,
  "utf8"
);

console.log(`✓ src/assets/flags.svg: ${included.length} banderas, ${(sprite.length / 1024).toFixed(1)} kB`);
if (missing.length) console.warn(`⚠ Sin SVG en country-flag-icons (se quedan en emoji): ${missing.join(", ")}`);
