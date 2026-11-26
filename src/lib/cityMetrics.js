// ─────────────────────────────────────────────────────────────────────────────
// Cálculos puros sobre los datos completos de una ciudad (sin importar datos).
//
// Los usa scripts/city-data.mjs en el build para precalcular el índice ligero
// (src/data/generated/cityIndex.js): así el tamaño, el nivel de naturaleza y
// las subnotas de los rankings salen siempre de la misma fórmula sin que el navegador tenga
// que descargar insights.js (1,2 MB) ni cities.js completos. lib/cities.js
// expone el resultado; si cambias una fórmula, se regenera sola en el build.
// ─────────────────────────────────────────────────────────────────────────────

// La nota global (nota MAbroad) ya no sale de aquí: la calcula src/lib/scoring.js
// con 8 subnotas con fuente y pesos fijos (ver docs/scoring.md).

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
/**
 * Procedencia del coste de la ficha: la fuente oficial (`costSource`), la cifra
 * del portal de la Universidad Loyola (`costBy: "loyola"`, cuando no coincide con
 * la universidad de destino se muestra la de Loyola) o la estimación de MAbroad.
 * Solo `costSource` es fuente oficial (y la única que permite «Asequible»).
 */
export function costSourceLabel(city) {
  // La cifra de Loyola manda aunque la ficha conserve un costSource: nunca cuenta como oficial.
  if (city?.costBy === "loyola") return "Según la Universidad Loyola";
  if (typeof city?.costSource === "string" && city.costSource.trim() !== "") return `Fuente: ${city.costSource}`;
  return "Estimación MAbroad";
}

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
