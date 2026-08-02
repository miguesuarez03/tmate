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
export const CITY_BASE_SCORES = {
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
  estocolmo: { coste:3.2, alojamiento:2.8, vida_social:7.5, integracion:7.5, movilidad:8.8, estilo_vida:8.7, empleo:8.7, seguridad:8.8 },
  copenhague:{ coste:3.0, alojamiento:3.2, vida_social:7.8, integracion:7.8, movilidad:9.2, estilo_vida:8.8, empleo:8.3, seguridad:8.9 },
  helsinki:  { coste:4.5, alojamiento:4.5, vida_social:6.5, integracion:7.5, movilidad:8.5, estilo_vida:8.5, empleo:7.8, seguridad:9.2 },
  oslo:      { coste:2.5, alojamiento:3.5, vida_social:6.8, integracion:7.2, movilidad:8.5, estilo_vida:9.0, empleo:8.0, seguridad:8.8 },
  reikiavik: { coste:3.0, alojamiento:4.5, vida_social:5.8, integracion:6.8, movilidad:6.0, estilo_vida:9.5, empleo:6.5, seguridad:9.8 },
  dublin:    { coste:2.8, alojamiento:2.5, vida_social:8.5, integracion:8.5, movilidad:6.5, estilo_vida:7.5, empleo:9.0, seguridad:7.8 },
  edimburgo: { coste:2.8, alojamiento:3.0, vida_social:8.0, integracion:8.0, movilidad:7.5, estilo_vida:8.5, empleo:7.5, seguridad:8.5 },
  atenas:    { coste:8.0, alojamiento:6.5, vida_social:8.5, integracion:7.0, movilidad:6.5, estilo_vida:8.5, empleo:5.5, seguridad:6.5 },
  zagreb:    { coste:7.5, alojamiento:7.0, vida_social:7.0, integracion:7.0, movilidad:7.0, estilo_vida:7.5, empleo:6.0, seguridad:8.0 },
  liubliana: { coste:7.0, alojamiento:7.0, vida_social:6.5, integracion:7.0, movilidad:7.0, estilo_vida:9.0, empleo:6.0, seguridad:9.0 },
  tallin:    { coste:6.5, alojamiento:6.5, vida_social:6.5, integracion:7.0, movilidad:7.5, estilo_vida:7.5, empleo:7.0, seguridad:8.5 },
  vilna:     { coste:7.0, alojamiento:7.0, vida_social:6.8, integracion:6.8, movilidad:7.0, estilo_vida:7.8, empleo:6.5, seguridad:8.5 },
  riga:      { coste:7.0, alojamiento:7.0, vida_social:6.5, integracion:6.8, movilidad:7.0, estilo_vida:7.5, empleo:6.5, seguridad:8.0 },
  bratislava:{ coste:7.0, alojamiento:6.8, vida_social:7.5, integracion:7.0, movilidad:8.5, estilo_vida:7.5, empleo:7.0, seguridad:8.0 },
  bucarest:  { coste:8.5, alojamiento:7.5, vida_social:8.0, integracion:6.5, movilidad:6.5, estilo_vida:6.8, empleo:7.0, seguridad:6.5 },
  sofia:     { coste:8.7, alojamiento:7.5, vida_social:6.5, integracion:6.5, movilidad:7.0, estilo_vida:7.5, empleo:6.5, seguridad:7.0 },
  ginebra:   { coste:1.5, alojamiento:2.5, vida_social:6.5, integracion:9.0, movilidad:9.0, estilo_vida:8.5, empleo:8.5, seguridad:9.3 },
  florencia: { coste:6.0, alojamiento:5.0, vida_social:8.3, integracion:8.0, movilidad:7.5, estilo_vida:9.0, empleo:6.5, seguridad:8.3 },
  hamburgo:  { coste:5.5, alojamiento:5.0, vida_social:8.0, integracion:8.0, movilidad:8.8, estilo_vida:7.8, empleo:8.3, seguridad:8.3 },
  gante:     { coste:7.0, alojamiento:6.5, vida_social:8.8, integracion:8.5, movilidad:8.0, estilo_vida:8.3, empleo:7.0, seguridad:8.5 },
  venecia:   { coste:4.0, alojamiento:3.5, vida_social:6.0, integracion:7.0, movilidad:6.5, estilo_vida:9.3, empleo:5.5, seguridad:8.7 },
  lyon:      { coste:6.5, alojamiento:6.0, vida_social:8.3, integracion:7.8, movilidad:8.8, estilo_vida:8.3, empleo:8.0, seguridad:7.5 },
  colonia:   { coste:6.3, alojamiento:5.5, vida_social:8.5, integracion:8.0, movilidad:8.7, estilo_vida:7.8, empleo:8.0, seguridad:8.0 },
  lovaina:   { coste:7.3, alojamiento:6.5, vida_social:9.0, integracion:8.3, movilidad:8.0, estilo_vida:7.5, empleo:7.0, seguridad:8.7 },
  utrecht:   { coste:4.7, alojamiento:4.0, vida_social:8.3, integracion:8.7, movilidad:9.0, estilo_vida:8.3, empleo:8.0, seguridad:8.5 },
  lund:      { coste:5.5, alojamiento:5.0, vida_social:8.8, integracion:7.8, movilidad:8.3, estilo_vida:8.0, empleo:7.0, seguridad:8.8 },
  innsbruck: { coste:5.8, alojamiento:5.5, vida_social:7.0, integracion:7.0, movilidad:7.5, estilo_vida:9.3, empleo:7.3, seguridad:9.3 },
  split:     { coste:7.3, alojamiento:6.5, vida_social:7.5, integracion:6.8, movilidad:6.5, estilo_vida:8.8, empleo:5.8, seguridad:8.3 },
  salonica:  { coste:8.5, alojamiento:7.5, vida_social:9.0, integracion:7.0, movilidad:6.8, estilo_vida:8.0, empleo:5.5, seguridad:7.0 },
  napoles:   { coste:7.5, alojamiento:6.3, vida_social:8.5, integracion:7.0, movilidad:5.8, estilo_vida:8.5, empleo:5.8, seguridad:6.0 },
  groningen: { coste:5.8, alojamiento:5.5, vida_social:9.0, integracion:8.5, movilidad:8.0, estilo_vida:7.5, empleo:6.5, seguridad:8.7 },
  coimbra:   { coste:9.0, alojamiento:8.0, vida_social:7.5, integracion:7.0, movilidad:6.5, estilo_vida:8.3, empleo:5.0, seguridad:8.8 },
  uppsala:   { coste:5.5, alojamiento:4.5, vida_social:8.8, integracion:7.8, movilidad:8.0, estilo_vida:8.0, empleo:6.5, seguridad:8.8 },
  friburgo:  { coste:5.8, alojamiento:5.5, vida_social:7.8, integracion:7.5, movilidad:8.0, estilo_vida:9.0, empleo:7.0, seguridad:9.0 },
  nantes:    { coste:6.8, alojamiento:6.3, vida_social:8.3, integracion:7.8, movilidad:7.5, estilo_vida:8.5, empleo:7.0, seguridad:8.0 },
  wroclaw:   { coste:8.8, alojamiento:7.8, vida_social:8.3, integracion:6.8, movilidad:7.0, estilo_vida:8.3, empleo:6.0, seguridad:8.0 },
  "cluj-napoca": { coste:9.0, alojamiento:7.8, vida_social:8.8, integracion:6.5, movilidad:6.0, estilo_vida:7.0, empleo:6.8, seguridad:7.5 },
  galway:    { coste:4.5, alojamiento:4.0, vida_social:8.0, integracion:7.5, movilidad:6.0, estilo_vida:8.5, empleo:6.0, seguridad:8.3 },
  lausana:   { coste:2.5, alojamiento:3.5, vida_social:6.8, integracion:7.5, movilidad:8.5, estilo_vida:9.0, empleo:8.0, seguridad:9.0 },
  malmo:     { coste:5.8, alojamiento:5.3, vida_social:8.0, integracion:8.3, movilidad:8.5, estilo_vida:7.8, empleo:6.8, seguridad:7.3 },
  aarhus:    { coste:4.3, alojamiento:4.0, vida_social:8.3, integracion:8.5, movilidad:8.5, estilo_vida:8.3, empleo:7.0, seguridad:9.0 },
  heidelberg:{ coste:5.5, alojamiento:5.0, vida_social:7.5, integracion:7.5, movilidad:8.0, estilo_vida:9.0, empleo:7.0, seguridad:9.0 },
  toulouse:  { coste:6.8, alojamiento:6.0, vida_social:8.5, integracion:7.8, movilidad:7.5, estilo_vida:8.3, empleo:8.0, seguridad:7.8 },
  burdeos:   { coste:6.0, alojamiento:5.3, vida_social:8.3, integracion:7.8, movilidad:7.8, estilo_vida:8.8, empleo:7.3, seguridad:8.0 },
  palermo:   { coste:8.3, alojamiento:7.5, vida_social:8.3, integracion:6.8, movilidad:5.5, estilo_vida:8.8, empleo:4.8, seguridad:6.3 },
  gdansk:    { coste:8.5, alojamiento:7.5, vida_social:8.0, integracion:7.0, movilidad:7.3, estilo_vida:8.5, empleo:6.5, seguridad:8.3 },
  nicosia:   { coste:6.5, alojamiento:6.0, vida_social:6.8, integracion:6.5, movilidad:5.5, estilo_vida:7.5, empleo:6.0, seguridad:8.0 },
  "la-valeta": { coste:4.3, alojamiento:3.8, vida_social:7.5, integracion:8.0, movilidad:6.0, estilo_vida:8.5, empleo:6.8, seguridad:8.5 },
  zurich:    { coste:1.0, alojamiento:2.0, vida_social:6.5, integracion:8.0, movilidad:9.3, estilo_vida:9.3, empleo:9.3, seguridad:9.5 },
  brno:      { coste:9.2, alojamiento:8.3, vida_social:8.5, integracion:7.0, movilidad:8.0, estilo_vida:7.8, empleo:6.8, seguridad:8.5 },
  estrasburgo: { coste:6.3, alojamiento:5.8, vida_social:8.3, integracion:8.5, movilidad:8.5, estilo_vida:8.3, empleo:7.3, seguridad:7.8 },
  montpellier: { coste:7.0, alojamiento:6.0, vida_social:8.8, integracion:8.0, movilidad:7.5, estilo_vida:8.8, empleo:6.8, seguridad:7.5 },
  marsella:    { coste:7.0, alojamiento:6.3, vida_social:8.3, integracion:7.5, movilidad:7.0, estilo_vida:8.8, empleo:6.5, seguridad:6.3 },
  lille:       { coste:7.2, alojamiento:6.3, vida_social:8.8, integracion:8.0, movilidad:9.0, estilo_vida:7.5, empleo:7.5, seguridad:7.5 },
  dresde:      { coste:7.5, alojamiento:6.8, vida_social:7.8, integracion:7.0, movilidad:7.8, estilo_vida:8.8, empleo:6.8, seguridad:8.3 },
  leipzig:     { coste:7.3, alojamiento:6.3, vida_social:8.8, integracion:7.5, movilidad:8.0, estilo_vida:8.3, empleo:7.0, seguridad:7.8 },
  tubinga:     { coste:5.5, alojamiento:5.0, vida_social:8.0, integracion:7.3, movilidad:7.3, estilo_vida:9.0, empleo:6.8, seguridad:9.0 },
  poznan:      { coste:8.8, alojamiento:7.8, vida_social:9.0, integracion:7.5, movilidad:7.5, estilo_vida:7.8, empleo:6.3, seguridad:8.3 },
  katowice:    { coste:9.0, alojamiento:8.0, vida_social:7.8, integracion:6.8, movilidad:7.5, estilo_vida:6.8, empleo:7.0, seguridad:8.0 },
  braga:       { coste:8.8, alojamiento:8.0, vida_social:8.3, integracion:7.3, movilidad:6.5, estilo_vida:7.8, empleo:5.5, seguridad:8.8 },
  bari:        { coste:8.0, alojamiento:7.3, vida_social:8.0, integracion:6.5, movilidad:6.0, estilo_vida:8.3, empleo:5.0, seguridad:6.8 },
  padua:       { coste:7.3, alojamiento:6.3, vida_social:8.3, integracion:7.8, movilidad:8.3, estilo_vida:8.0, empleo:6.8, seguridad:8.3 },
  genova:      { coste:7.3, alojamiento:6.5, vida_social:7.5, integracion:7.0, movilidad:7.3, estilo_vida:8.3, empleo:6.3, seguridad:7.5 },
  perugia:     { coste:7.8, alojamiento:7.0, vida_social:8.3, integracion:8.3, movilidad:6.5, estilo_vida:8.5, empleo:5.5, seguridad:8.5 },
  manchester:  { coste:4.0, alojamiento:3.8, vida_social:9.0, integracion:8.8, movilidad:7.8, estilo_vida:7.5, empleo:8.5, seguridad:7.0 },
  glasgow:     { coste:4.5, alojamiento:4.3, vida_social:8.8, integracion:8.0, movilidad:7.0, estilo_vida:8.0, empleo:7.5, seguridad:7.0 },
  bristol:     { coste:3.8, alojamiento:3.5, vida_social:8.3, integracion:8.0, movilidad:6.8, estilo_vida:8.3, empleo:7.8, seguridad:7.3 },
  basilea:     { coste:1.3, alojamiento:2.3, vida_social:6.5, integracion:8.3, movilidad:9.3, estilo_vida:8.3, empleo:9.0, seguridad:9.3 },
  berna:       { coste:2.0, alojamiento:3.0, vida_social:6.3, integracion:7.5, movilidad:8.8, estilo_vida:8.8, empleo:8.0, seguridad:9.3 },
  estambul:    { coste:9.5, alojamiento:8.5, vida_social:9.0, integracion:6.5, movilidad:6.5, estilo_vida:9.0, empleo:6.0, seguridad:6.0 },
  pisa:        { coste:7.8, alojamiento:7.0, vida_social:8.3, integracion:7.8, movilidad:7.5, estilo_vida:8.5, empleo:6.0, seguridad:8.5 },
  siena:       { coste:7.3, alojamiento:6.5, vida_social:7.5, integracion:7.3, movilidad:6.0, estilo_vida:9.0, empleo:5.3, seguridad:8.8 },
  trieste:     { coste:7.8, alojamiento:7.0, vida_social:7.0, integracion:7.5, movilidad:6.8, estilo_vida:8.5, empleo:6.3, seguridad:8.3 },
  parma:       { coste:7.3, alojamiento:6.5, vida_social:7.8, integracion:7.3, movilidad:7.0, estilo_vida:8.3, empleo:6.5, seguridad:8.3 },
  bergamo:     { coste:7.3, alojamiento:6.5, vida_social:7.3, integracion:7.0, movilidad:7.5, estilo_vida:8.3, empleo:6.8, seguridad:8.3 },
  ferrara:     { coste:7.8, alojamiento:7.3, vida_social:7.5, integracion:7.0, movilidad:7.0, estilo_vida:8.3, empleo:5.5, seguridad:8.5 },
  urbino:      { coste:8.3, alojamiento:7.5, vida_social:7.0, integracion:6.8, movilidad:5.0, estilo_vida:8.8, empleo:4.5, seguridad:9.0 },
  lecce:       { coste:8.3, alojamiento:7.5, vida_social:8.0, integracion:6.5, movilidad:5.5, estilo_vida:8.8, empleo:4.8, seguridad:7.5 },
  catania:     { coste:8.3, alojamiento:7.5, vida_social:8.5, integracion:6.8, movilidad:5.8, estilo_vida:8.8, empleo:4.8, seguridad:6.3 },
  cagliari:    { coste:7.8, alojamiento:6.8, vida_social:7.5, integracion:6.8, movilidad:5.5, estilo_vida:9.0, empleo:5.3, seguridad:8.0 },
  maastricht:  { coste:4.3, alojamiento:3.8, vida_social:8.5, integracion:9.3, movilidad:8.5, estilo_vida:8.3, empleo:7.5, seguridad:8.7 },
  grenoble:    { coste:6.8, alojamiento:6.0, vida_social:8.3, integracion:8.0, movilidad:8.0, estilo_vida:9.0, empleo:8.0, seguridad:7.8 },
  verona:      { coste:6.8, alojamiento:6.0, vida_social:8.0, integracion:7.5, movilidad:8.3, estilo_vida:8.5, empleo:6.8, seguridad:8.3 },
  gotemburgo:  { coste:4.3, alojamiento:3.8, vida_social:8.0, integracion:7.8, movilidad:8.5, estilo_vida:8.3, empleo:8.0, seguridad:8.0 },
  liverpool:   { coste:5.3, alojamiento:4.8, vida_social:9.0, integracion:8.0, movilidad:7.0, estilo_vida:7.8, empleo:7.0, seguridad:6.8 },
  leeds:       { coste:4.8, alojamiento:4.3, vida_social:9.0, integracion:8.0, movilidad:7.0, estilo_vida:7.3, empleo:7.5, seguridad:7.0 },
  turku:       { coste:5.0, alojamiento:4.5, vida_social:8.0, integracion:7.5, movilidad:7.0, estilo_vida:8.0, empleo:6.5, seguridad:9.0 },
  rennes:      { coste:7.5, alojamiento:6.8, vida_social:9.0, integracion:8.0, movilidad:7.5, estilo_vida:7.8, empleo:7.0, seguridad:8.0 },
  pecs:        { coste:9.3, alojamiento:8.3, vida_social:8.3, integracion:7.0, movilidad:6.0, estilo_vida:8.0, empleo:5.3, seguridad:8.5 },
  kaunas:      { coste:8.5, alojamiento:7.8, vida_social:7.5, integracion:6.8, movilidad:6.8, estilo_vida:7.8, empleo:6.3, seguridad:8.5 },
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
  if (score >= 7)   return { label: 'Bueno',     color: '#0EA5E9' };
  if (score >= 5.5) return { label: 'Regular',   color: '#F59E0B' };
  return               { label: 'Difícil',   color: '#EF4444' };
}

/** Total de ciudades. */
export const CITY_COUNT = CITIES.length;
