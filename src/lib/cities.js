// ─────────────────────────────────────────────────────────────────────────────
// TMATE — Core utilities library
// Todas las operaciones sobre ciudades viven aquí.
// Añadir features nuevas = añadir funciones aquí, no tocar páginas.
// ─────────────────────────────────────────────────────────────────────────────

import { CITIES } from '../data/cities';
import { CITY_INSIGHTS, DEFAULT_INSIGHTS } from '../data/insights';
import { CITY_EXPERIENCES, FOUNDER_EXPERIENCE } from '../data/cityExperiences';
import { DEFAULT_OG_IMAGE, getCityOgImage } from './seo';

/** @typedef {import('../types').City} City */
/** @typedef {import('../types').CityFilters} CityFilters */
/** @typedef {import('../types').CitySortKey} CitySortKey */
/** @typedef {import('../types').CityInsights} CityInsights */

// ─── LOOKUP ───────────────────────────────────────────────────────────────────

/** Devuelve una ciudad por slug. Lanza si no existe y throwIfMissing=true. */
export function getCityBySlug(slug, throwIfMissing = false) {
  const city = CITIES.find(c => c.slug === slug);
  if (!city && throwIfMissing) throw new Error(`City not found: "${slug}"`);
  return city ?? null;
}

/** Devuelve insights de una ciudad. Siempre devuelve un objeto válido. */
export function getCityInsights(slug) {
  const city = getCityBySlug(slug);
  const raw  = CITY_INSIGHTS[slug];
  return raw ? raw : DEFAULT_INSIGHTS(city);
}

/** Devuelve true si la ciudad es elegible para Erasmus+ (no es un intercambio bilateral). */
export function isErasmusEligible(city) {
  return city.programType === 'erasmus';
}

/**
 * Score global de una ciudad: la media, con el mismo peso, de las 8 notas de
 * categoría que se ven en su ficha (CITY_INSIGHTS). Es lo que explica la nota
 * «Cómo calculamos estos datos» (MethodologyNote): si cambias el cálculo,
 * actualiza también ese texto. userRatings queda preparado para combinar
 * valoraciones reales de usuarios (50 %) cuando existan.
 */
export function getOverallScore(slug, userRatings = null) {
  const scores = (getCityInsights(slug)?.scores ?? []).map((sc) => sc.score).filter((v) => typeof v === "number");
  const base = scores.length
    ? parseFloat((scores.reduce((acc, v) => acc + v, 0) / scores.length).toFixed(1))
    : 7.0;
  if (!userRatings || userRatings.length === 0) return base;
  const userAvg = parseFloat((userRatings.reduce((a, b) => a + b, 0) / userRatings.length).toFixed(1));
  return parseFloat(((base + userAvg) / 2).toFixed(1));
}

const SCORE_CATEGORY_IDS = [
  "coste", "alojamiento", "vida_social", "integracion",
  "movilidad", "estilo_vida", "empleo", "seguridad",
];

/**
 * Devuelve un mapa { [categoriaId]: scoreObj } para una ciudad, usando los
 * insights reales. Se usa en el comparador y en City Match — vive aquí para
 * no duplicar la misma lógica en varias páginas.
 */
export function getScoreMap(slug) {
  const insights = getCityInsights(slug);
  const map = {};
  SCORE_CATEGORY_IDS.forEach((id) => {
    map[id] = insights.scores.find((s) => s.id === id) ?? null;
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

    case 'cost_asc': {
      // Extrae el primer número del rango "600–900€/mes"
      const minCost = c => parseInt(c.costDetail.replace(/[^\d]/g, '').slice(0, 3) || '999');
      return sorted.sort((a, b) => minCost(a) - minCost(b));
    }

    case 'cost_desc': {
      const minCost = c => parseInt(c.costDetail.replace(/[^\d]/g, '').slice(0, 3) || '999');
      return sorted.sort((a, b) => minCost(b) - minCost(a));
    }

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

/**
 * Ciudades relacionadas con una ciudad dada.
 * Prioriza mismo país, luego misma región.
 * @param {City} city
 * @param {number} limit
 * @returns {City[]}
 */
export function getRelatedCities(city, limit = 3) {
  const sameCountry = CITIES.filter(
    c => c.country === city.country && c.slug !== city.slug
  );
  if (sameCountry.length >= limit) return sameCountry.slice(0, limit);

  const sameRegion = CITIES.filter(
    c => c.region === city.region && c.slug !== city.slug && c.country !== city.country
  );
  return [...sameCountry, ...sameRegion].slice(0, limit);
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
