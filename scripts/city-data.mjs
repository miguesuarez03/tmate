// ─────────────────────────────────────────────────────────────────────────────
// scripts/city-data.mjs — genera los datos de ciudad que descarga el navegador
//
// Las fuentes que se editan a mano siguen siendo src/data/cities.js e
// insights.js. A partir de ellas se generan (en src/data/generated/, fuera
// de git):
//
//   · cityIndex.js       Índice ligero de TODAS las ciudades: lo justo para
//                        tarjetas, buscador, filtros, rankings, mapa, City
//                        Match y Comparar (nombre, foto, tag, coste, las 8
//                        notas, nota global, tamaño…). Va en el bundle inicial.
//   · cities/<slug>.js   Ficha completa de UNA ciudad (datos + insights). Se
//                        carga con import() solo al abrir esa ciudad.
//
// Lo ejecuta el plugin de vite.config.js al empezar cada build y `vite dev`
// (y `npm test` a través de pretest). Solo reescribe los ficheros que cambian.
//   node --import ./tests/resolve-hook.mjs scripts/city-data.mjs
// ─────────────────────────────────────────────────────────────────────────────

import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { CITIES } from "../src/data/cities.js";
import { CITY_INSIGHTS, DEFAULT_INSIGHTS } from "../src/data/insights.js";
import { CITY_POPULATION } from "../src/data/cityPopulation.js";
import { SCORE_CATEGORIES } from "../src/data/scoreCategories.js";
import { computeOverallScore, citySizeFromPopulation, natureLevel } from "../src/lib/cityMetrics.js";

const HEADER = "// Generado por scripts/city-data.mjs a partir de src/data/ — no editar a mano.\n";

/** Campos de cities.js que viajan en el índice (el resto, solo en la ficha). */
const INDEX_FIELDS = [
  "slug", "name", "nameEn", "country", "emoji", "programType", "region", "tag",
  "phrase", "costDetail", "vibe", "erasmus", "weather", "language", "img", "experiences",
];

function insightsFor(city) {
  return CITY_INSIGHTS[city.slug] ?? DEFAULT_INSIGHTS(city);
}

/** Comprueba que cada ciudad trae sus 8 categorías con las etiquetas comunes. */
function checkScores(city, scores) {
  const problems = [];
  for (const cat of SCORE_CATEGORIES) {
    const s = scores.find((x) => x.id === cat.id);
    if (!s) problems.push(`falta la categoría «${cat.id}»`);
    else if (s.label !== cat.label || s.icon !== cat.icon || s.color !== cat.color) {
      problems.push(`«${cat.id}» no coincide con src/data/scoreCategories.js`);
    }
  }
  if (problems.length) throw new Error(`city-data: ${city.slug}: ${problems.join("; ")}`);
}

export function buildCityData() {
  const index = [];
  const details = {};
  for (const city of CITIES) {
    const insights = insightsFor(city);
    checkScores(city, insights.scores);
    const entry = {};
    for (const f of INDEX_FIELDS) if (city[f] !== undefined) entry[f] = city[f];
    entry.scores = Object.fromEntries(insights.scores.map((s) => [s.id, s.score]));
    entry.overall = computeOverallScore(insights.scores);
    entry.size = citySizeFromPopulation(CITY_POPULATION[city.slug]?.population);
    entry.nature = natureLevel(city);
    index.push(entry);
    details[city.slug] = { city, insights };
  }
  return { index, details };
}

function writeIfChanged(file, content) {
  if (existsSync(file) && readFileSync(file, "utf-8") === content) return false;
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content, "utf-8");
  return true;
}

/** Escribe src/data/generated/. Devuelve cuántos ficheros cambiaron. */
export function writeCityData(root = join(dirname(fileURLToPath(import.meta.url)), "..")) {
  const outDir = join(root, "src", "data", "generated");
  const citiesDir = join(outDir, "cities");
  const { index, details } = buildCityData();
  let changed = 0;

  changed += writeIfChanged(
    join(outDir, "cityIndex.js"),
    `${HEADER}/** @type {import('../../types').CityIndexEntry[]} */\nexport const CITY_INDEX = ${JSON.stringify(index)};\n`
  );
  for (const [slug, detail] of Object.entries(details)) {
    changed += writeIfChanged(join(citiesDir, `${slug}.js`), `${HEADER}export default ${JSON.stringify(detail)};\n`);
  }
  // Fichas de ciudades que ya no existen.
  for (const file of existsSync(citiesDir) ? readdirSync(citiesDir) : []) {
    if (!details[file.replace(/\.js$/, "")]) {
      rmSync(join(citiesDir, file));
      changed++;
    }
  }
  return changed;
}

// Ejecutado directamente (pretest): genera y avisa.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const n = writeCityData();
  console.log(`city-data: ${n} ficheros actualizados en src/data/generated/`);
}
