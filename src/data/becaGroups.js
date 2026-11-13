// ─────────────────────────────────────────────────────────────────────────────
// Grupos de países e importes de la beca de movilidad (FUENTE ÚNICA para la
// calculadora /beca-erasmus y el dato «Te faltan ~X €/mes tras la beca» de
// la ficha y el comparador, ver getBecaGap en src/lib/scoring.js).
//
// Grupos y tarifas base según la convocatoria 2026 del SEPIE (KA131) y la Guía
// del Programa Erasmus+. Última verificación contra fuentes oficiales: agosto
// de 2026 (vigente para el curso 2026-2027).
// ─────────────────────────────────────────────────────────────────────────────

export const GROUP1 = [
  "Alemania", "Austria", "Bélgica", "Dinamarca", "Finlandia",
  "Francia", "Irlanda", "Islandia", "Italia", "Liechtenstein",
  "Luxemburgo", "Noruega", "Países Bajos", "Suecia",
];
export const GROUP2 = [
  "Chipre", "Chequia", "Eslovaquia", "Eslovenia", "España",
  "Estonia", "Grecia", "Letonia", "Malta", "Portugal",
];
export const GROUP3 = [
  "Bulgaria", "Croacia", "Hungría", "Lituania", "Macedonia del Norte",
  "Polonia", "Rumanía", "Serbia", "Turquía",
];

/** Mínimo mensual del SEPIE por grupo (cada universidad fija su importe dentro del rango). */
export const SEPIE_MIN_MONTHLY = { 1: 350, 2: 300, 3: 250 };

// Países que entran en Erasmus+ en el curso 2027-28 (erasmusStatus «confirmed»
// en cities.js): su grupo aún no lo fija ninguna convocatoria. Reino Unido sale
// en el grupo 1 de la tabla de 2026 del SEPIE como país no asociado, así que se
// usa ese grupo como ESTIMACIÓN hasta que se publique la convocatoria 2027.
export const ESTIMATED_GROUPS = { "Reino Unido": 1 };

// Nombre del país en la tabla del SEPIE cuando cities.js usa otro.
export const SEPIE_NAMES = { "República Checa": "Chequia" };

/**
 * Suiza (programa suizo SEMP, no Erasmus+): la beca la paga la universidad
 * suiza de acogida con fondos de la Confederación. Para estudiantes de una
 * universidad española, 440 CHF al mes (2.200 CHF por semestre) según la
 * tabla de la Universidad de Berna para el curso 2025/26; en euros, al cambio
 * de referencia del BCE del 13-11-2026 (1 € = 0,9266 CHF).
 */
export const SEMP_MONTHLY = {
  chf: 440,
  eur: 475,
  source: "Universidad de Berna, importes SEMP 2025/26",
  url: "https://www.unibe.ch/studies/mobility/incoming/from_europe/semp_erasmus_studies/grants/index_eng.html",
};
