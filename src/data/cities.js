// ─────────────────────────────────────────────────────────────────────────────
// TMATE — Core utilities library
// Todas las operaciones sobre ciudades viven aquí.
// Añadir features nuevas = añadir funciones aquí, no tocar páginas.
// ─────────────────────────────────────────────────────────────────────────────

import { CITIES } from '../data/cities';
import { CITY_INSIGHTS, DEFAULT_INSIGHTS } from '../data/insights';
import { getFinalScore } from '../data/cityBaseScores';

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

/**
 * Score global de una ciudad.
 * Combina el score base investigado (50%) con la media de valoraciones
 * de usuarios (50%) cuando existan. Si no hay valoraciones, devuelve
 * el score base directamente.
 * Esta es la única función que calcula scores — se usa en toda la web.
 */
export function getOverallScore(slug, userRatings = null) {
  // userRatings: array de números 0-10 aportados por usuarios, o null
  const userAvg = userRatings && userRatings.length > 0
    ? parseFloat((userRatings.reduce((a, b) => a + b, 0) / userRatings.length).toFixed(1))
    : null;
  return getFinalScore(slug, userAvg);
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

// ─── SEO HELPERS ─────────────────────────────────────────────────────────────

/**
 * Genera meta tags para una ciudad.
 * Usar en un futuro hook useSEO() o con react-helmet.
 * @param {City} city
 * @param {number} overallScore
 */
export function getCityMeta(city, overallScore) {
  return {
    title: `${city.name} Erasmus — Guía completa ${city.country} | TMate`,
    description: `Todo sobre el Erasmus en ${city.name}: coste de vida ${city.costDetail}, scores reales, barrios, universidades y tips de estudiantes. Puntuación TMate: ${overallScore}/10.`,
    keywords: `Erasmus ${city.name}, ${city.nameEn} Erasmus, estudiar en ${city.country}, ${city.tag}`,
    ogImage: city.heroImg,
  };
}

/**
 * Genera meta tags para la homepage.
 */
export function getHomeMeta() {
  return {
    title: 'TMate — Descubre tu próximo Erasmus',
    description: `La guía definitiva para elegir tu ciudad Erasmus. ${CITIES.length} destinos con scores reales, opiniones de estudiantes y guías locales. Gratis siempre.`,
    keywords: 'Erasmus ciudades, mejores destinos Erasmus, guía Erasmus Europa, TMate',
  };
}

// ─── UTILS ────────────────────────────────────────────────────────────────────

/** Parsea el coste mínimo mensual de un string tipo "600–900€/mes". */
export function parseMinCost(costDetail) {
  const match = costDetail.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

/** Parsea el coste máximo mensual. */
export function parseMaxCost(costDetail) {
  const matches = costDetail.match(/\d+/g);
  return matches ? parseInt(matches[matches.length - 1]) : 0;
}

/** Formatea un score de 0-10 con color semántico. */
export function getScoreLevel(score) {
  if (score >= 8.5) return { label: 'Excelente', color: '#22C55E' };
  if (score >= 7)   return { label: 'Bueno',     color: '#0EA5E9' };
  if (score >= 5.5) return { label: 'Regular',   color: '#F59E0B' };
  return               { label: 'Difícil',   color: '#EF4444' };
}

/** Total de ciudades. */
export const CITY_COUNT = CITIES.length;
