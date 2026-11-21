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
//                        notas, nota global, subnotas de clima e inglés,
//                        tamaño…). Va en el bundle inicial.
//   · cities/<slug>.js   Ficha completa de UNA ciudad (datos + insights + los
//                        convenios de cada universidad del registro allí). Se
//                        carga con import() solo al abrir esa ciudad.
//   · universities/<id>.js  Convenios de una universidad fuera de España, en
//                        versión ligera, para /universidades/<id>.
//   · universityIndex.js Cifras de cada universidad, para /universidades.
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
import { citySizeFromPopulation, natureLevel, pickSubscores } from "../src/lib/cityMetrics.js";
import { computeCitySubscores, computeScore, getBecaGap, parseCostMidpoint } from "../src/lib/scoring.js";
import { CITY_UNIVERSITIES, THE_EDITION } from "../src/data/scoring/universities.js";
import { CITY_ESN_SECTIONS } from "../src/data/scoring/esn.js";
import { COUNTRY_HOMICIDE_RATES } from "../src/data/scoring/homicides.js";
import { CITY_NEET } from "../src/data/scoring/neet.js";
import { COUNTRY_LANGUAGE, CITY_LANGUAGE_PENDING } from "../src/data/scoring/languages.js";
import * as BECA_DATA from "../src/data/becaGroups.js";
import { UNIVERSITY_REGISTRY } from "../src/data/universities/registry.js";
import { buildCityAgreements, buildUniversityPageData } from "../src/lib/universities.js";

const HEADER = "// Generado por scripts/city-data.mjs a partir de src/data/ — no editar a mano.\n";

/** Campos de cities.js que viajan en el índice (el resto, solo en la ficha). */
const INDEX_FIELDS = [
  "slug", "name", "nameEn", "country", "emoji", "programType", "region", "tag",
  "phrase", "costDetail", "vibe", "erasmus", "weather", "language", "img", "experiences",
  "erasmusFrom", "erasmusStatus",
];

/** Convenios, mapeo (relationId → slug) y observaciones a mano de cada universidad del registro. */
function readUniversities() {
  const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "universities");
  const read = (f) => JSON.parse(readFileSync(join(dir, f), "utf-8"));
  return UNIVERSITY_REGISTRY.map((entry) => ({
    entry,
    data: read(entry.file),
    mapping: read(`${entry.id}.cities.json`),
    notes: existsSync(join(dir, `${entry.id}.notes.json`)) ? read(`${entry.id}.notes.json`) : null,
  }));
}

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
  const universities = readUniversities();
  const cityNames = Object.fromEntries(CITIES.map((c) => [c.slug, c.name]));
  // Convenios de cada universidad en cada ciudad (con lo que pinta la tarjeta):
  // van en la ficha, así el bloque de convenios sale en el HTML prerenderizado.
  const agreements = buildCityAgreements(universities);
  for (const city of CITIES) {
    const insights = insightsFor(city);
    checkScores(city, insights.scores);
    const entry = {};
    for (const f of INDEX_FIELDS) if (city[f] !== undefined) entry[f] = city[f];
    entry.scores = Object.fromEntries(insights.scores.map((s) => [s.id, s.score]));
    // Nota MAbroad: 8 subnotas con fuente y pesos fijos (src/lib/scoring.js).
    const costMid = parseCostMidpoint(city.costDetail);
    const { subs, extras, detail } = computeCitySubscores({
      city,
      scores: insights.scores,
      costMid,
      costSourceLabel: city.costSource ? `Fuente: ${city.costSource}` : "Estimación MAbroad",
      universities: CITY_UNIVERSITIES[city.slug],
      theEdition: THE_EDITION,
      esnSections: CITY_ESN_SECTIONS[city.slug],
      homicides: COUNTRY_HOMICIDE_RATES[city.country],
      neet: CITY_NEET[city.slug],
      language: COUNTRY_LANGUAGE[city.country],
      languagePending: CITY_LANGUAGE_PENDING[city.slug],
    });
    const { overall, exact, pending } = computeScore(subs);
    entry.overall = overall;
    // Sin redondear (4 decimales): los rankings ordenan por aquí.
    entry.overallExact = exact;
    entry.nota = { subs, pending, extras };
    entry.beca = getBecaGap(city, costMid, BECA_DATA);
    // Subnotas para rankings/comparador (Clima, Nivel de inglés): sin dato, no van.
    entry.subscores = pickSubscores(insights.scores);
    entry.size = citySizeFromPopulation(CITY_POPULATION[city.slug]?.population);
    entry.nature = natureLevel(city);
    index.push(entry);
    details[city.slug] = { city, insights, scoring: { detail } };
    if (agreements[city.slug]) details[city.slug].universityAgreements = agreements[city.slug];
  }
  const universityPages = Object.fromEntries(universities.map((u) => [u.entry.id, buildUniversityPageData(u, cityNames)]));
  return { index, details, universityPages };
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
  const { index, details, universityPages } = buildCityData();
  let changed = 0;

  changed += writeIfChanged(
    join(outDir, "cityIndex.js"),
    `${HEADER}/** @type {import('../../types').CityIndexEntry[]} */\nexport const CITY_INDEX = ${JSON.stringify(index)};\n`
  );
  for (const [slug, detail] of Object.entries(details)) {
    changed += writeIfChanged(join(citiesDir, `${slug}.js`), `${HEADER}export default ${JSON.stringify(detail)};\n`);
  }
  // Página de cada universidad (/universidades/<id>): sus convenios en versión
  // ligera (sin observaciones ni costes, que van en la ficha de cada ciudad).
  const uniDir = join(outDir, "universities");
  for (const [id, page] of Object.entries(universityPages)) {
    changed += writeIfChanged(join(uniDir, `${id}.js`), `${HEADER}export default ${JSON.stringify(page)};
`);
  }
  for (const file of existsSync(uniDir) ? readdirSync(uniDir) : []) {
    if (!universityPages[file.replace(/.js$/, "")]) {
      rmSync(join(uniDir, file));
      changed++;
    }
  }
  // Índice /universidades: solo las cifras de cada una.
  const uniIndex = Object.values(universityPages).map((p) => ({ id: p.id, totals: p.totals, extractedAt: p.extractedAt }));
  changed += writeIfChanged(join(outDir, "universityIndex.js"), `${HEADER}export const UNIVERSITY_INDEX = ${JSON.stringify(uniIndex)};
`);
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
