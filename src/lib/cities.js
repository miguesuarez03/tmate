// ─────────────────────────────────────────────────────────────────────────────
// TMATE — Core utilities library
// Todas las operaciones sobre ciudades viven aquí.
// Añadir features nuevas = añadir funciones aquí, no tocar páginas.
//
// Datos: el navegador NO descarga src/data/cities.js ni insights.js. Trabaja
// con el índice ligero que genera scripts/city-data.mjs en el build
// (CITY_INDEX: lo justo para tarjetas, buscador, rankings, mapa, City Match y
// Comparar) y pide la ficha completa de una ciudad con loadCityDetail(slug)
// solo cuando hace falta (página de la ciudad, desglose del coste en Beca…).
// ─────────────────────────────────────────────────────────────────────────────

import { CITY_INDEX } from '../data/generated/cityIndex';
import { SCORE_CATEGORIES } from '../data/scoreCategories';
import { CITY_EXPERIENCES, FOUNDER_EXPERIENCE } from '../data/cityExperiences';
import { CITY_SIZE_LIMITS } from './cityMetrics';
import { DEFAULT_OG_IMAGE, getCityOgImage } from './seo';

/** @typedef {import('../types').City} City */
/** @typedef {import('../types').CityIndexEntry} CityIndexEntry */
/** @typedef {import('../types').CityDetail} CityDetail */
/** @typedef {import('../types').CityFilters} CityFilters */
/** @typedef {import('../types').CitySortKey} CitySortKey */
/** @typedef {import('../types').CityInsights} CityInsights */

// Alias interno: el resto del módulo trabaja con las entradas del índice.
const CITIES = CITY_INDEX;
const BY_SLUG = new Map(CITY_INDEX.map((c) => [c.slug, c]));

// ─── LOOKUP ───────────────────────────────────────────────────────────────────

/** Todas las ciudades (entradas del índice ligero), en el orden de cities.js. */
export function getAllCities() {
  return CITY_INDEX;
}

/** Devuelve una ciudad (entrada del índice) por slug. Lanza si no existe y throwIfMissing=true. */
export function getCityBySlug(slug, throwIfMissing = false) {
  const city = BY_SLUG.get(slug);
  if (!city && throwIfMissing) throw new Error(`City not found: "${slug}"`);
  return city ?? null;
}

// ─── FICHA COMPLETA (bajo demanda) ───────────────────────────────────────────
// Un chunk por ciudad (src/data/generated/cities/<slug>.js): datos completos
// de cities.js + sus insights. Se guardan en memoria una vez cargados, así que
// el prerender, la hidratación (main.jsx los pide antes de hidratar) y las
// visitas repetidas los leen de forma síncrona con getLoadedCityDetail.

/** @type {Map<string, { promise: Promise<CityDetail>, value?: CityDetail, error?: unknown }>} */
const detailCache = new Map();

/**
 * Carga la ficha completa de una ciudad. Devuelve null si el slug no existe.
 * @param {string} slug
 * @returns {Promise<CityDetail | null>}
 */
export function loadCityDetail(slug) {
  if (!BY_SLUG.has(slug)) return Promise.resolve(null);
  let entry = detailCache.get(slug);
  if (!entry || entry.error) {
    entry = {};
    entry.promise = import(`../data/generated/cities/${slug}.js`).then(
      (mod) => (entry.value = mod.default),
      (err) => { entry.error = err; throw err; }
    );
    detailCache.set(slug, entry);
  }
  return entry.promise;
}

/** Ficha completa ya cargada, o null si aún no se ha pedido / no ha llegado. */
export function getLoadedCityDetail(slug) {
  return detailCache.get(slug)?.value ?? null;
}

/** Error de la última carga fallida de esa ficha (p. ej. sin conexión), o null. */
export function getCityDetailError(slug) {
  return detailCache.get(slug)?.error ?? null;
}

/** Devuelve true si la ciudad es elegible para Erasmus+ (no es un intercambio bilateral). */
export function isErasmusEligible(city) {
  return city.programType === 'erasmus';
}

// ─── TAMAÑO DE CIUDAD ─────────────────────────────────────────────────────────

/** Umbrales de población oficial (CITY_POPULATION) para cada tamaño. */
export { CITY_SIZE_LIMITS };

/**
 * Tamaño de la ciudad según su población oficial: 0 pequeña (<300.000 hab.),
 * 1 mediana (300.000 – 1 millón), 2 grande (1 millón o más).
 * Devuelve null si la ciudad no tiene dato de población. Precalculado en el
 * índice (citySizeFromPopulation en lib/cityMetrics.js).
 */
export function getCitySize(city) {
  return BY_SLUG.get(city.slug)?.size ?? null;
}

/**
 * Score global de una ciudad: la media, con el mismo peso, de las 8 notas de
 * categoría que se ven en su ficha (CITY_INSIGHTS), precalculada en el índice
 * con computeOverallScore (lib/cityMetrics.js). Es lo que explica la nota
 * «Cómo calculamos estos datos» (MethodologyNote): si cambias el cálculo,
 * actualiza también ese texto. userRatings queda preparado para combinar
 * valoraciones reales de usuarios (50 %) cuando existan.
 */
export function getOverallScore(slug, userRatings = null) {
  const base = BY_SLUG.get(slug)?.overall ?? 7.0;
  if (!userRatings || userRatings.length === 0) return base;
  const userAvg = parseFloat((userRatings.reduce((a, b) => a + b, 0) / userRatings.length).toFixed(1));
  return parseFloat(((base + userAvg) / 2).toFixed(1));
}

const SCORE_CATEGORY_IDS = SCORE_CATEGORIES.map((c) => c.id);

/**
 * Devuelve un mapa { [categoriaId]: { id, label, icon, color, score } } para
 * una ciudad, con las notas del índice. Se usa en la home, el mapa, el
 * comparador y City Match — vive aquí para no duplicar la misma lógica en
 * varias páginas. El resumen y el desglose de cada categoría solo están en la
 * ficha completa (loadCityDetail).
 */
export function getScoreMap(slug) {
  const scores = BY_SLUG.get(slug)?.scores ?? {};
  const map = {};
  SCORE_CATEGORIES.forEach((cat) => {
    map[cat.id] = typeof scores[cat.id] === "number" ? { ...cat, score: scores[cat.id] } : null;
  });
  return map;
}

// ─── FILTROS ──────────────────────────────────────────────────────────────────

/**
 * Filtra y ordena ciudades.
 * @param {CityFilters} filters
 * @param {CitySortKey} sortKey
 * @returns {City[]}
 */
export function filterCities(filters = {}, sortKey = 'name') {
  let result = [...CITIES];

  // Filtro por región
  if (filters.region && filters.region !== 'Todos') {
    result = result.filter(c => c.region === filters.region);
  }

  // Filtro por búsqueda de texto
  if (filters.query && filters.query.trim()) {
    const q = filters.query.trim().toLowerCase();
    result = result.filter(c =>
      c.name.toLowerCase().includes(q)    ||
      c.nameEn.toLowerCase().includes(q)  ||
      c.country.toLowerCase().includes(q) ||
      c.tag.toLowerCase().includes(q)     ||
      c.phrase.toLowerCase().includes(q)
    );
  }

  // Filtro por tipos de experiencia
  if (filters.experiences?.length) {
    result = result.filter(c =>
      filters.experiences.some(exp => c.experiences.includes(exp))
    );
  }

  // Filtro por tipo de programa
  if (filters.programType?.length) {
    result = result.filter(c => filters.programType.includes(c.programType));
  }

  // Filtro por score mínimo Erasmus
  if (filters.minErasmusScore != null) {
    result = result.filter(c => c.erasmus >= filters.minErasmusScore);
  }

  // Ordenación
  return sortCities(result, sortKey);
}

/**
 * Ordena un array de ciudades por criterio.
 * @param {City[]} cities
 * @param {CitySortKey} key
 * @returns {City[]}
 */
export function sortCities(cities, key = 'name') {
  const sorted = [...cities];

  switch (key) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'es'));

    case 'erasmus':
      return sorted.sort((a, b) => b.erasmus - a.erasmus);

    case 'overall':
      return sorted.sort((a, b) => getOverallScore(b.slug) - getOverallScore(a.slug));

    // Ordena por el mínimo del rango "600–900€/mes". parseMinCost entiende los
    // miles: "1.200–1.800€" es 1200, no 120.
    case 'cost_asc':
      return sorted.sort((a, b) => parseMinCost(a.costDetail) - parseMinCost(b.costDetail));

    case 'cost_desc':
      return sorted.sort((a, b) => parseMinCost(b.costDetail) - parseMinCost(a.costDetail));

    default:
      return sorted;
  }
}

// ─── RANKINGS ─────────────────────────────────────────────────────────────────

/**
 * Devuelve todas las ciudades rankeadas por overallScore.
 * Listo para una página /rankings futura.
 * @returns {Array<City & { rank: number, overallScore: number }>}
 */
export function getRankedCities() {
  return CITIES
    .map(city => ({
      ...city,
      overallScore: getOverallScore(city.slug),
    }))
    .sort((a, b) => b.overallScore - a.overallScore)
    .map((city, i) => ({ ...city, rank: i + 1 }));
}

/**
 * Top N ciudades por score Erasmus.
 * @param {number} n
 * @returns {City[]}
 */
export function getTopCities(n = 5) {
  return [...CITIES]
    .sort((a, b) => b.erasmus - a.erasmus)
    .slice(0, n);
}

// ─── REGIÓN ───────────────────────────────────────────────────────────────────

/** Devuelve las regiones únicas disponibles (+ "Todos"). */
export function getRegions() {
  const regions = Array.from(new Set(CITIES.map(c => c.region))).sort();
  return ['Todos', ...regions];
}

/** Ciudades de la misma región, excluyendo la actual. */
export function getCitiesByRegion(region, excludeSlug = null) {
  return CITIES.filter(c => c.region === region && c.slug !== excludeSlug);
}

// ─── CIUDADES RELACIONADAS ────────────────────────────────────────────────────

/** Máximo de ciudades del mismo país entre las similares (para variar). */
const SIMILAR_MAX_PER_COUNTRY = 2;

/**
 * Ciudades parecidas a una dada, para los enlaces internos de su ficha
 * («Otros destinos que te pueden gustar»). Puntúa cada ciudad por:
 *  - mismo tipo de programa (Erasmus+, UK, Suiza, América…) y misma región,
 *  - presupuesto mensual mínimo parecido (costDetail),
 *  - nota global parecida (getOverallScore) y mismo tamaño (getCitySize),
 *  - tipos de experiencia y etiqueta en común.
 * Como mucho 2 del mismo país, para que no salgan siempre las mismas: antes
 * se devolvían las primeras del país por orden del fichero, y la mayoría de
 * fichas (p. ej. casi todas las italianas) no recibían ningún enlace.
 * Determinista (mismo resultado en el prerender y en el cliente).
 * @param {City} city
 * @param {number} limit
 * @returns {City[]}
 */
export function getRelatedCities(city, limit = 4) {
  const baseCost = parseMinCost(city.costDetail || "");
  const baseOverall = getOverallScore(city.slug);
  const baseSize = getCitySize(city);
  const baseExperiences = city.experiences || [];

  const scored = CITIES
    .filter((c) => c.slug !== city.slug)
    .map((c) => {
      let score = 0;
      if (c.programType === city.programType) score += 4;
      if (c.region === city.region) score += 3;
      if (c.country === city.country) score += 1;
      const cost = parseMinCost(c.costDetail || "");
      if (baseCost && cost) score += Math.max(0, 3 - Math.abs(cost - baseCost) / 150);
      score += Math.max(0, 2 - Math.abs(getOverallScore(c.slug) - baseOverall));
      const size = getCitySize(c);
      if (size != null && size === baseSize) score += 1;
      const shared = (c.experiences || []).filter((e) => baseExperiences.includes(e)).length;
      score += Math.min(shared, 2) * 0.5;
      if (c.tag && c.tag === city.tag) score += 0.5;
      return { c, score };
    })
    .sort((a, b) => b.score - a.score || a.c.name.localeCompare(b.c.name, "es"));

  const result = [];
  const perCountry = {};
  for (const { c } of scored) {
    if ((perCountry[c.country] ?? 0) >= SIMILAR_MAX_PER_COUNTRY) continue;
    result.push(c);
    perCountry[c.country] = (perCountry[c.country] ?? 0) + 1;
    if (result.length === limit) break;
  }
  return result;
}

/**
 * Todas las ciudades agrupadas por región (orden alfabético dentro de cada
 * una), para el directorio «Todos los destinos» de la home: garantiza que
 * cada ficha tenga al menos un enlace interno rastreable.
 * @returns {Array<{ region: string, cities: City[] }>}
 */
export function getCitiesGroupedByRegion() {
  const groups = {};
  for (const c of CITIES) (groups[c.region] ??= []).push(c);
  return Object.keys(groups)
    .sort((a, b) => a.localeCompare(b, "es"))
    .map((region) => ({
      region,
      cities: groups[region].sort((a, b) => a.name.localeCompare(b.name, "es")),
    }));
}

// ─── FAVORITOS ────────────────────────────────────────────────────────────────
// Persistencia en localStorage. Preparado para conectar a un backend futuro.

const FAVORITES_KEY = 'tmate:favorites';

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
  } catch {
    return [];
  }
}

export function toggleFavorite(slug) {
  const favs = getFavorites();
  const next = favs.includes(slug)
    ? favs.filter(s => s !== slug)
    : [...favs, slug];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  return next;
}

export function isFavorite(slug) {
  return getFavorites().includes(slug);
}

export function getFavoriteCities() {
  const slugs = getFavorites();
  return slugs.map(s => getCityBySlug(s)).filter(Boolean);
}

// ─── COMPARATIVA ─────────────────────────────────────────────────────────────
// Preparado para la feature /compare?cities=berlin,lisboa

const COMPARE_KEY = 'tmate:compare';
const MAX_COMPARE = 3;

export function getCompareCities() {
  try {
    return JSON.parse(sessionStorage.getItem(COMPARE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function toggleCompare(slug) {
  const current = getCompareCities();
  const next = current.includes(slug)
    ? current.filter(s => s !== slug)
    : current.length < MAX_COMPARE
      ? [...current, slug]
      : current; // silently ignore if at max
  sessionStorage.setItem(COMPARE_KEY, JSON.stringify(next));
  return next;
}

export function clearCompare() {
  sessionStorage.removeItem(COMPARE_KEY);
}

// ─── EXPERIENCIAS REALES ─────────────────────────────────────────────────────
// Solo lo aprobado a mano en src/data/cityExperiences.js. El fichero se edita
// a mano, así que aquí se descarta cualquier entrada incompleta o de una
// ciudad que no existe en vez de romper la página.

/** @typedef {import('../types').ExperienceEntry} ExperienceEntry */

function toEntry(slug, exp) {
  const city = getCityBySlug(slug);
  if (!city || !exp || !String(exp.name || '').trim() || !String(exp.text || '').trim()) return null;
  const rating = Number(exp.rating);
  return {
    name: String(exp.name).trim(),
    year: Number(exp.year) || null,
    homeUniversity: String(exp.homeUniversity || '').trim(),
    text: String(exp.text).trim(),
    ...(rating >= 1 && rating <= 5 ? { rating: Math.round(rating) } : {}),
    citySlug: slug,
    cityName: city.name,
    cityEmoji: city.emoji,
    stayLabel: `${isErasmusEligible(city) ? 'Erasmus' : 'Intercambio'} en ${city.name}`,
  };
}

/** Experiencias reales de una ciudad (sin la del fundador), la más reciente primero. */
export function getCityExperiences(slug) {
  return (CITY_EXPERIENCES[slug] || [])
    .map(exp => toEntry(slug, exp))
    .filter(Boolean)
    .sort((a, b) => (b.year || 0) - (a.year || 0));
}

/** Todas las experiencias reales de todas las ciudades, la más reciente primero. */
export function getAllExperiences() {
  return Object.keys(CITY_EXPERIENCES)
    .flatMap(slug => getCityExperiences(slug))
    .sort((a, b) => (b.year || 0) - (a.year || 0));
}

/** La experiencia del fundador como tarjeta (versión corta), con su ciudad. */
export function getFounderEntry() {
  const f = FOUNDER_EXPERIENCE;
  const city = getCityBySlug(f.citySlug);
  return {
    name: f.name,
    year: null,
    homeUniversity: f.homeUniversity,
    text: f.short,
    citySlug: f.citySlug,
    cityName: city?.name || f.hostUniversity,
    cityEmoji: city?.emoji || '',
    stayLabel: `Erasmus en ${f.hostUniversity}`,
    founder: true,
    role: f.role,
    photo: f.avatar || f.photo,
  };
}

/**
 * Lo que enseña la ficha de una ciudad: en la ciudad del fundador, su
 * experiencia va primera; después, las reales.
 */
export function getCityExperienceCards(slug) {
  const real = getCityExperiences(slug);
  return slug === FOUNDER_EXPERIENCE.citySlug ? [getFounderEntry(), ...real] : real;
}

// ─── SEO HELPERS ─────────────────────────────────────────────────────────────

/**
 * Genera meta tags para una ciudad.
 * Usar en un futuro hook useSEO() o con react-helmet.
 * @param {City} city
 * @param {number} overallScore
 */
// Genera el <title> de una ficha de ciudad con un presupuesto de 60 caracteres:
// intenta la versión más completa (con país) y va recortando hasta que quepa.
// Nombres de ciudad muy largos (p. ej. "Cartagena de Indias") o países largos
// ("República Dominicana") harían que una plantilla fija se pasara de 60
// caracteres y Google la truncara en el buscador — por eso el fallback en capas
// en vez de una única plantilla.
function buildCityTitle(city, type) {
  const withCountry = `${city.name} ${type}: guía, coste y vida en ${city.country} | MAbroad`;
  if (withCountry.length <= 60) return withCountry;
  const noCountry = `${city.name} ${type}: guía, coste y vida | MAbroad`;
  if (noCountry.length <= 60) return noCountry;
  const short = `${city.name} ${type}: guía completa | MAbroad`;
  if (short.length <= 60) return short;
  return `${city.name} ${type} | MAbroad`;
}

export function getCityMeta(city, overallScore) {
  const eligible = isErasmusEligible(city);
  const type = eligible ? 'Erasmus' : 'Intercambio';
  return {
    title: buildCityTitle(city, type),
    description: `Todo sobre ${eligible ? 'el Erasmus' : 'estudiar'} en ${city.name}: coste de vida ${city.costDetail}, scores por categoría, barrios, universidades y consejos. Puntuación MAbroad: ${overallScore}/10.`,
    keywords: eligible
      ? `Erasmus ${city.name}, ${city.nameEn} Erasmus, estudiar en ${city.country}, ${city.tag}`
      : `Estudiar en ${city.name}, ${city.nameEn} intercambio, estudiar en ${city.country}, ${city.tag}`,
    ogImage: getCityOgImage(city),
  };
}

/**
 * Genera meta tags para la homepage.
 */
export function getHomeMeta() {
  return {
    title: 'MAbroad — Descubre y compara tu ciudad Erasmus ideal',
    description: `Tu guía para elegir ciudad Erasmus: ${CITIES.length} destinos con scores por categoría, comparador y guías locales. Gratis.`,
    keywords: 'Erasmus ciudades, mejores destinos Erasmus, guía Erasmus Europa, MAbroad',
    ogImage: DEFAULT_OG_IMAGE,
  };
}

// ─── UTILS ────────────────────────────────────────────────────────────────────

/** Parsea el coste mínimo mensual de un string tipo "600–900€/mes". */
export function parseMinCost(costDetail) {
  const match = costDetail.match(/\d{1,3}(?:\.\d{3})*/);
  return match ? parseInt(match[0].replace(/\./g, ""), 10) : 0;
}

/** Parsea el coste máximo mensual. */
export function parseMaxCost(costDetail) {
  const matches = costDetail.match(/\d{1,3}(?:\.\d{3})*/g);
  return matches ? parseInt(matches[matches.length - 1].replace(/\./g, ""), 10) : 0;
}

/** Presupuesto mínimo (€/mes) hasta el que una ciudad se etiqueta como «Asequible». */
export const AFFORDABLE_MAX_COST = 500;

/** ¿Es asequible? Mira el mínimo del rango de costDetail (entiende los miles). */
export function isAffordable(costDetail) {
  const min = parseMinCost(costDetail || "");
  return min > 0 && min <= AFFORDABLE_MAX_COST;
}

/** Formatea un score de 0-10 con color semántico. */
export function getScoreLevel(score) {
  if (score >= 8.5) return { label: 'Excelente', color: '#22C55E' };
  if (score >= 7)   return { label: 'Bueno',     color: '#3F7A7D' };
  if (score >= 5.5) return { label: 'Regular',   color: '#F59E0B' };
  return               { label: 'Difícil',   color: '#EF4444' };
}

/** Total de ciudades. */
export const CITY_COUNT = CITIES.length;

// ─── BÚSQUEDA FUZZY ─────────────────────────────────────────────────────────
// Sin librería externa: con ~150 ciudades, normalizar tildes/mayúsculas +
// distancia de Levenshtein es más que suficiente y no añade peso al bundle
// (una alternativa tipo fuse.js aporta indexado avanzado que aquí no hace
// falta, para un dataset de este tamaño la búsqueda es instantánea).

/** Quita tildes/diacríticos y normaliza mayúsculas para comparar sin errores
 *  de ortografía tipo "Munchen" vs "Múnich". */
function normalizeForSearch(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

/** Distancia de edición (Levenshtein) entre dos strings. */
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const curr = [i];
    for (let j = 1; j <= n; j++) {
      curr[j] = a[i - 1] === b[j - 1]
        ? prev[j - 1]
        : 1 + Math.min(prev[j - 1], prev[j], curr[j - 1]);
    }
    prev = curr;
  }
  return prev[n];
}

/**
 * Busca ciudades por nombre tolerando tildes/mayúsculas y errores
 * tipográficos (ej. "rama" encuentra "Roma"). Prioriza, en orden:
 * coincidencia exacta > empieza por > contiene > distancia de edición corta.
 * @param {string} query
 * @param {number} limit
 * @returns {City[]}
 */
export function searchCities(query, limit = 6) {
  const q = normalizeForSearch(query);
  if (!q) return [];

  const threshold = q.length <= 3 ? 1 : q.length <= 6 ? 2 : 3;
  const scored = [];

  for (const city of CITIES) {
    const name = normalizeForSearch(city.name);
    let score;
    if (name === q) score = 0;
    else if (name.startsWith(q)) score = 1;
    else if (name.includes(q)) score = 2;
    else {
      const dist = levenshtein(q, name);
      if (dist > threshold) continue;
      score = 3 + dist;
    }
    scored.push({ city, score });
  }

  scored.sort((a, b) => a.score - b.score || a.city.name.length - b.city.name.length);
  return scored.slice(0, limit).map(s => s.city);
}

/** Coincidencia única "más probable" para navegación directa (Enter / botón
 *  buscar) — exacta si existe, si no la mejor coincidencia fuzzy. */
export function findBestCityMatch(query) {
  return searchCities(query, 1)[0] ?? null;
}

// ─── COMPARADOR ─────────────────────────────────────────────────────────────

/**
 * Ventaja mínima en la nota global (tal como se muestra, con un decimal) para
 * decir que una ciudad tiene la «mejor puntuación». Por debajo es un empate
 * técnico: las notas son una valoración editorial y una o dos décimas no
 * distinguen de verdad dos ciudades.
 */
export const COMPARE_MIN_LEAD = 0.3;

/**
 * ¿Quién va por delante en una comparativa?
 * @param {number[]} overallScores  nota global de cada ciudad comparada
 * @returns {{ winnerIdx: number, tiedIdx: number[] }}
 *   winnerIdx: índice de la ganadora clara, o -1 si no la hay.
 *   tiedIdx:   si no hay ganadora, las que quedan a menos de minLead de la
 *              mejor (empate técnico); vacío si hay ganadora.
 */
export function getCompareLeader(overallScores, minLead = COMPARE_MIN_LEAD) {
  const shown = overallScores.map((s) => Math.round(s * 10) / 10);
  if (shown.length < 2) return { winnerIdx: shown.length - 1, tiedIdx: [] };
  const max = Math.max(...shown);
  const gapTo = (s) => Math.round((max - s) * 10) / 10; // sin ruido de coma flotante
  const leaders = shown.filter((s) => s === max).length;
  const second = Math.max(...shown.filter((s) => s !== max), -Infinity);
  if (leaders === 1 && gapTo(second) >= minLead) return { winnerIdx: shown.indexOf(max), tiedIdx: [] };
  return {
    winnerIdx: -1,
    tiedIdx: shown.map((s, i) => (gapTo(s) < minLead ? i : -1)).filter((i) => i !== -1),
  };
}

/** Punto medio (€/mes) del rango de coste de una ficha: «600–900€/mes» → 750. */
export function getCostMidpoint(costDetail) {
  const min = parseMinCost(costDetail || "");
  const max = parseMaxCost(costDetail || "");
  return min && max ? (min + max) / 2 : min || max;
}

/** Ventaja mínima en una categoría para citarla como punto fuerte en el veredicto. */
export const COMPARE_MIN_CATEGORY_GAP = 0.5;

/**
 * Veredicto de una comparativa: lo que se dice arriba del todo, antes de los
 * datos. No inventa nada: sale de las mismas notas y rangos de coste que se
 * ven debajo.
 * @param {City[]} cities  2 o 3 ciudades, en el orden en que se comparan
 * @returns {{
 *   overall: number[],
 *   winnerIdx: number, tiedIdx: number[],
 *   cost: { cheapestIdx: number[], priciestIdx: number[], middleIdx: number[], diff: number },
 *   strengths: { id: string, label: string, gap: number }[][],
 * }}
 *   cost.diff: diferencia entre los puntos medios de los rangos de la más
 *              barata y la más cara, redondeada a 5 €. cheapestIdx/priciestIdx
 *              son listas porque puede haber empate (dos ciudades con el mismo
 *              punto medio); middleIdx, las que quedan ESTRICTAMENTE entre ambas.
 *   strengths[i]: hasta 2 categorías (sin contar el coste, que ya va en euros)
 *              en las que la ciudad i supera a TODAS las demás por al menos
 *              COMPARE_MIN_CATEGORY_GAP, de mayor a menor ventaja.
 */
export function buildCompareVerdict(cities) {
  const overall = cities.map((c) => getOverallScore(c.slug));
  const maps = cities.map((c) => getScoreMap(c.slug));

  const mids = cities.map((c) => getCostMidpoint(c.costDetail));
  const minMid = Math.min(...mids);
  const maxMid = Math.max(...mids);
  const idxWhere = (test) => mids.map((m, i) => (test(m) ? i : -1)).filter((i) => i !== -1);
  const cheapestIdx = idxWhere((m) => m === minMid);
  const priciestIdx = idxWhere((m) => m === maxMid);
  const middleIdx = idxWhere((m) => m > minMid && m < maxMid);
  const diff = Math.round((maxMid - minMid) / 5) * 5;

  const strengths = cities.map((_, i) =>
    SCORE_CATEGORY_IDS
      .filter((id) => id !== "coste")
      .map((id) => {
        const own = maps[i][id]?.score;
        if (typeof own !== "number") return null;
        const best = Math.max(...maps.filter((_, j) => j !== i).map((m) => m[id]?.score ?? 0));
        const gap = Math.round((own - best) * 10) / 10;
        return gap >= COMPARE_MIN_CATEGORY_GAP ? { id, label: maps[i][id].label, gap } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 2)
  );

  return { overall, ...getCompareLeader(overall), cost: { cheapestIdx, priciestIdx, middleIdx, diff }, strengths };
}
