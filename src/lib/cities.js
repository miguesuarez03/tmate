// ─────────────────────────────────────────────────────────────────────────────
// TMATE — Core utilities library
// Todas las operaciones sobre ciudades viven aquí.
// Añadir features nuevas = añadir funciones aquí, no tocar páginas.
// ─────────────────────────────────────────────────────────────────────────────

import { CITIES } from '../data/cities';
import { CITY_INSIGHTS, DEFAULT_INSIGHTS } from '../data/insights';

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

// ─── BASE SCORES por ciudad (investigados) ───────────────────────────────────
const CITY_BASE_SCORES = {
  bolonia:   { coste:6.5, alojamiento:5.0, vida_social:9.2, integracion:8.5, movilidad:8.0, estilo_vida:8.0, empleo:7.0, seguridad:8.5 },
  milan:     { coste:4.5, alojamiento:4.0, vida_social:8.0, integracion:7.5, movilidad:8.5, estilo_vida:7.0, empleo:9.5, seguridad:7.5 },
  roma:      { coste:5.5, alojamiento:5.0, vida_social:8.0, integracion:7.5, movilidad:6.5, estilo_vida:8.3, empleo:7.5, seguridad:7.0 },
  turin:     { coste:7.5, alojamiento:7.0, vida_social:7.0, integracion:7.5, movilidad:7.5, estilo_vida:7.3, empleo:7.5, seguridad:8.0 },
  cracovia:  { coste:9.5, alojamiento:8.5, vida_social:9.5, integracion:8.5, movilidad:8.5, estilo_vida:7.5, empleo:6.5, seguridad:8.5 },
  varsovia:  { coste:8.5, alojamiento:7.5, vida_social:8.0, integracion:7.5, movilidad:8.5, estilo_vida:6.8, empleo:7.5, seguridad:8.0 },
  budapest:  { coste:9.0, alojamiento:8.0, vida_social:9.3, integracion:8.0, movilidad:8.5, estilo_vida:7.8, empleo:6.5, seguridad:7.5 },
  praga:     { coste:8.0, alojamiento:7.0, vida_social:9.0, integracion:7.5, movilidad:9.0, estilo_vida:7.5, empleo:7.0, seguridad:8.5 },
  "la-haya": { coste:5.0, alojamiento:5.5, vida_social:7.3, integracion:9.0, movilidad:8.5, estilo_vida:7.0, empleo:8.5, seguridad:8.8 },
  rotterdam: { coste:5.0, alojamiento:5.5, vida_social:7.5, integracion:9.0, movilidad:8.5, estilo_vida:6.8, empleo:8.0, seguridad:7.0 },
  munich:    { coste:4.0, alojamiento:3.5, vida_social:8.5, integracion:8.2, movilidad:9.0, estilo_vida:8.2, empleo:9.0, seguridad:9.5 },
  berlin:    { coste:6.5, alojamiento:5.5, vida_social:9.4, integracion:8.8, movilidad:9.4, estilo_vida:7.5, empleo:9.0, seguridad:7.5 },
  lisboa:    { coste:5.5, alojamiento:4.0, vida_social:8.8, integracion:9.5, movilidad:7.5, estilo_vida:8.5, empleo:7.5, seguridad:8.5 },
  oporto:    { coste:7.0, alojamiento:6.5, vida_social:8.8, integracion:9.5, movilidad:7.0, estilo_vida:8.6, empleo:7.0, seguridad:9.0 },
  paris:     { coste:3.5, alojamiento:3.0, vida_social:9.0, integracion:7.0, movilidad:9.5, estilo_vida:8.0, empleo:9.0, seguridad:7.0 },
  londres:   { coste:2.5, alojamiento:2.5, vida_social:8.7, integracion:9.5, movilidad:8.5, estilo_vida:7.0, empleo:9.5, seguridad:7.2 },
  amsterdam: { coste:4.5, alojamiento:3.5, vida_social:9.0, integracion:9.5, movilidad:9.0, estilo_vida:7.5, empleo:8.5, seguridad:7.5 },
  viena:     { coste:5.5, alojamiento:6.0, vida_social:7.8, integracion:7.5, movilidad:9.5, estilo_vida:8.5, empleo:7.5, seguridad:9.5 },
  rosenheim: { coste:6.0, alojamiento:6.5, vida_social:6.3, integracion:6.5, movilidad:7.0, estilo_vida:8.8, empleo:7.0, seguridad:9.5 },
  bruselas:  { coste:5.5, alojamiento:6.0, vida_social:8.2, integracion:8.5, movilidad:8.0, estilo_vida:6.8, empleo:8.5, seguridad:7.2 },
};

/**
 * Score global de una ciudad.
 * Combina el score base investigado (50%) con la media de valoraciones
 * de usuarios (50%) cuando existan. Si no hay valoraciones, devuelve
 * el score base directamente. Es la única función que calcula scores.
 */
export function getOverallScore(slug, userRatings = null) {
  const cats = CITY_BASE_SCORES[slug];
  const base = cats
    ? parseFloat((Object.values(cats).reduce((s, v) => s + v, 0) / Object.values(cats).length).toFixed(1))
    : 7.0;
  if (!userRatings || userRatings.length === 0) return base;
  const userAvg = parseFloat((userRatings.reduce((a, b) => a + b, 0) / userRatings.length).toFixed(1));
  return parseFloat(((base + userAvg) / 2).toFixed(1));
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
