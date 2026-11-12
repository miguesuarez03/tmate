// ─────────────────────────────────────────────────────────────────────────────
// Cálculos puros sobre los datos completos de una ciudad (sin importar datos).
//
// Los usa scripts/city-data.mjs en el build para precalcular el índice ligero
// (src/data/generated/cityIndex.js): así la nota global, el tamaño y el nivel
// de naturaleza salen siempre de la misma fórmula sin que el navegador tenga
// que descargar insights.js (1,2 MB) ni cities.js completos. lib/cities.js
// expone el resultado; si cambias una fórmula, se regenera sola en el build.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Score global: la media, con el mismo peso, de las 8 notas de categoría que
 * se ven en la ficha. Es lo que explica «Cómo calculamos estos datos»
 * (MethodologyNote): si cambias el cálculo, actualiza también ese texto.
 * @param {{ score: number }[]} scores
 */
export function computeOverallScore(scores = []) {
  const values = scores.map((sc) => sc.score).filter((v) => typeof v === "number");
  return values.length
    ? parseFloat((values.reduce((acc, v) => acc + v, 0) / values.length).toFixed(1))
    : 7.0;
}

/**
 * Subnotas del desglose que viajan en el índice ligero (`subscores`), para los
 * rankings y los chips de orden del comparador (src/data/rankings.js):
 * id → [categoría, etiqueta exacta de la subcategoría en insights.js].
 * Si una ciudad no tiene esa subcategoría, se queda sin dato (no se inventa).
 */
export const INDEX_SUBSCORES = {
  clima: ["estilo_vida", "Clima"],
  ingles: ["integracion", "Nivel de inglés"],
};

/** @param {{ id: string, subcategories?: { label: string, score: number }[] }[]} scores */
export function pickSubscores(scores = []) {
  const out = {};
  for (const [key, [catId, label]] of Object.entries(INDEX_SUBSCORES)) {
    const sub = scores.find((s) => s.id === catId)?.subcategories?.find((x) => x.label === label);
    if (typeof sub?.score === "number") out[key] = sub.score;
  }
  return out;
}

/** Umbrales de población oficial (CITY_POPULATION) para cada tamaño. */
export const CITY_SIZE_LIMITS = { mediana: 300000, grande: 1000000 };

/**
 * 0 pequeña (<300.000 hab.), 1 mediana (300.000 – 1 millón), 2 grande
 * (1 millón o más); null sin dato de población.
 */
export function citySizeFromPopulation(population) {
  if (!population) return null;
  if (population < CITY_SIZE_LIMITS.mediana) return 0;
  if (population < CITY_SIZE_LIMITS.grande) return 1;
  return 2;
}

const NATURE_KEYWORDS = [
  "parque", "playa", "montañ", "lago", "naturaleza", "jardín", "jardin",
  "bosque", "canal", "costa", "río", "rio ", "senderismo", "aire libre",
  "alpes", "mar ",
];

/**
 * Naturaleza para City Match (0 poca, 1 algo, 2 mucha). Es la única señal
 * heurística: cuenta menciones de palabras de naturaleza en los textos reales
 * de la ciudad (highlights, tips y descripción), no un dato investigado.
 */
export function natureLevel(city) {
  const text = [...(city.highlights || []), ...(city.tips || []), city.description || ""]
    .join(" ")
    .toLowerCase();
  const hits = NATURE_KEYWORDS.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
  if (hits === 0) return 0;
  if (hits <= 2) return 1;
  return 2;
}
