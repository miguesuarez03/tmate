/**
 * SCORES BASE — TMate
 *
 * Puntuaciones base por ciudad y categoría, elaboradas a partir de:
 * - Rankings de The Campus Advisor (17.000 valoraciones estudiantes 2024)
 * - ESN Erasmus Destination of the Year 2024
 * - Datos de coste de vida Numbeo 2024
 * - Informes Erasmus+ Student Network
 *
 * Escala 0–10. Estas puntuaciones representan el 50% del score final.
 * El otro 50% vendrá de las valoraciones de usuarios cuando esté disponible.
 *
 * Categorías:
 *   coste            → facilidad económica (10 = muy barato)
 *   fiesta           → vida nocturna y social
 *   extranjeros      → amabilidad y facilidad de integración
 *   transporte       → calidad del transporte público
 *   piso             → facilidad para encontrar alojamiento
 *   erasmus_community→ tamaño y actividad de la comunidad Erasmus
 *   seguridad        → percepción de seguridad
 *   clima            → agradabilidad del clima para estudiantes
 *   calidad_vida     → calidad de vida general
 *   internships      → oportunidades de prácticas/trabajo
 */

export const CITY_BASE_SCORES = {
  bolonia: {
    coste: 6.5,
    fiesta: 9.0,
    extranjeros: 8.5,
    transporte: 8.0,
    piso: 5.0,
    erasmus_community: 9.0,
    seguridad: 8.5,
    clima: 7.0,
    calidad_vida: 8.5,
    internships: 7.0,
  },
  milan: {
    coste: 4.5,
    fiesta: 7.5,
    extranjeros: 7.5,
    transporte: 8.5,
    piso: 4.0,
    erasmus_community: 8.5,
    seguridad: 7.5,
    clima: 6.5,
    calidad_vida: 7.5,
    internships: 9.5,
  },
  roma: {
    coste: 5.5,
    fiesta: 7.5,
    extranjeros: 7.5,
    transporte: 6.5,
    piso: 5.0,
    erasmus_community: 8.5,
    seguridad: 7.0,
    clima: 8.5,
    calidad_vida: 8.0,
    internships: 7.5,
  },
  turin: {
    coste: 7.5,
    fiesta: 6.5,
    extranjeros: 7.5,
    transporte: 7.5,
    piso: 7.0,
    erasmus_community: 7.5,
    seguridad: 8.0,
    clima: 6.5,
    calidad_vida: 8.0,
    internships: 7.5,
  },
  cracovia: {
    coste: 9.5,
    fiesta: 9.5,
    extranjeros: 8.5,
    transporte: 8.5,
    piso: 8.5,
    erasmus_community: 9.5,
    seguridad: 8.5,
    clima: 6.5,
    calidad_vida: 8.5,
    internships: 6.5,
  },
  varsovia: {
    coste: 8.5,
    fiesta: 8.0,
    extranjeros: 7.5,
    transporte: 8.5,
    piso: 7.5,
    erasmus_community: 8.0,
    seguridad: 8.0,
    clima: 5.5,
    calidad_vida: 8.0,
    internships: 7.5,
  },
  budapest: {
    coste: 9.0,
    fiesta: 9.5,
    extranjeros: 8.0,
    transporte: 8.5,
    piso: 8.0,
    erasmus_community: 9.0,
    seguridad: 7.5,
    clima: 7.0,
    calidad_vida: 8.5,
    internships: 6.5,
  },
  praga: {
    coste: 8.0,
    fiesta: 9.0,
    extranjeros: 7.5,
    transporte: 9.0,
    piso: 7.0,
    erasmus_community: 9.0,
    seguridad: 8.5,
    clima: 6.5,
    calidad_vida: 8.5,
    internships: 7.0,
  },
  "la-haya": {
    coste: 5.0,
    fiesta: 6.5,
    extranjeros: 9.0,
    transporte: 8.5,
    piso: 5.0,
    erasmus_community: 7.5,
    seguridad: 8.0,
    clima: 5.5,
    calidad_vida: 8.0,
    internships: 8.5,
  },
  rotterdam: {
    coste: 5.0,
    fiesta: 7.0,
    extranjeros: 9.0,
    transporte: 8.5,
    piso: 5.5,
    erasmus_community: 7.5,
    seguridad: 7.0,
    clima: 5.5,
    calidad_vida: 7.5,
    internships: 8.0,
  },
  munich: {
    coste: 4.0,
    fiesta: 8.0,
    extranjeros: 7.5,
    transporte: 9.0,
    piso: 3.5,
    erasmus_community: 8.0,
    seguridad: 9.5,
    clima: 6.5,
    calidad_vida: 8.5,
    internships: 9.0,
  },
  berlin: {
    coste: 6.5,
    fiesta: 10.0,
    extranjeros: 9.5,
    transporte: 9.0,
    piso: 5.5,
    erasmus_community: 9.0,
    seguridad: 7.5,
    clima: 5.5,
    calidad_vida: 8.5,
    internships: 9.0,
  },
  lisboa: {
    coste: 5.5,
    fiesta: 8.5,
    extranjeros: 9.5,
    transporte: 7.5,
    piso: 4.0,
    erasmus_community: 8.5,
    seguridad: 8.5,
    clima: 9.0,
    calidad_vida: 8.0,
    internships: 7.5,
  },
  oporto: {
    coste: 7.0,
    fiesta: 8.5,
    extranjeros: 9.5,
    transporte: 7.0,
    piso: 6.5,
    erasmus_community: 9.5,
    seguridad: 9.0,
    clima: 8.0,
    calidad_vida: 8.5,
    internships: 7.0,
  },
  paris: {
    coste: 3.5,
    fiesta: 8.0,
    extranjeros: 7.0,
    transporte: 9.5,
    piso: 3.0,
    erasmus_community: 8.5,
    seguridad: 7.0,
    clima: 7.0,
    calidad_vida: 8.0,
    internships: 9.0,
  },
  londres: {
    coste: 2.5,
    fiesta: 8.5,
    extranjeros: 9.5,
    transporte: 8.5,
    piso: 2.5,
    erasmus_community: 8.5,
    seguridad: 7.0,
    clima: 5.0,
    calidad_vida: 7.5,
    internships: 9.5,
  },
  amsterdam: {
    coste: 4.5,
    fiesta: 9.0,
    extranjeros: 9.5,
    transporte: 9.0,
    piso: 3.5,
    erasmus_community: 8.5,
    seguridad: 7.5,
    clima: 5.5,
    calidad_vida: 8.0,
    internships: 8.5,
  },
  viena: {
    coste: 5.5,
    fiesta: 7.5,
    extranjeros: 7.5,
    transporte: 9.5,
    piso: 6.0,
    erasmus_community: 8.0,
    seguridad: 9.5,
    clima: 6.5,
    calidad_vida: 9.0,
    internships: 7.5,
  },
  rosenheim: {
    coste: 6.0,
    fiesta: 5.0,
    extranjeros: 6.5,
    transporte: 7.0,
    piso: 6.5,
    erasmus_community: 5.5,
    seguridad: 9.5,
    clima: 6.5,
    calidad_vida: 8.0,
    internships: 7.0,
  },
  bruselas: {
    coste: 5.5,
    fiesta: 7.0,
    extranjeros: 8.5,
    transporte: 8.0,
    piso: 6.0,
    erasmus_community: 7.5,
    seguridad: 6.5,
    clima: 5.5,
    calidad_vida: 7.5,
    internships: 8.5,
  },
};

/**
 * Calcula el score base de una ciudad como media de todas sus categorías.
 * @param {string} slug
 * @returns {number} score base 0–10
 */
export function getCityBaseScore(slug) {
  const scores = CITY_BASE_SCORES[slug];
  if (!scores) return 7.0; // fallback neutro
  const values = Object.values(scores);
  const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
  return parseFloat(avg.toFixed(1));
}

/**
 * Calcula el score final combinando base (50%) + media de usuarios (50%).
 * Cuando no hay valoraciones de usuarios, devuelve solo el score base.
 * @param {string} slug
 * @param {number|null} userAvg  — media de valoraciones de usuarios (0–10), o null si no hay
 * @returns {number} score final 0–10
 */
export function getFinalScore(slug, userAvg = null) {
  const base = getCityBaseScore(slug);
  if (userAvg === null) return base;
  return parseFloat(((base + userAvg) / 2).toFixed(1));
}
