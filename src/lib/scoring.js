// ─────────────────────────────────────────────────────────────────────────────
// NOTA MAbroad — FUENTE ÚNICA del cálculo (criterio completo: docs/scoring.md)
//
// La nota de cada ciudad no se escribe a mano: es la media ponderada, con
// PESOS FIJOS, de 8 subnotas de 0 a 10. Cada subnota sale de un dato con
// fuente o de una valoración editorial con criterio escrito:
//
//   coste          20 %  Punto medio de costDetail en una escala fija en euros
//   vida           20 %  Comunidad (secciones ESN + estudiantes internacionales
//                        de THE) y ambiente (valoración MAbroad), a medias
//   seguridad      15 %  Mitad tasa de homicidios del país (UNODC), mitad
//                        valoración MAbroad de la ciudad
//   salidas        10 %  Mitad tasa NEET 15–24 de la región o el país
//                        (Eurostat / OIT), mitad valoración MAbroad de empleo
//   academico      10 %  Mejor puesto THE de las universidades de la ciudad
//   alojamiento    10 %  Valoración MAbroad (categoría «Alojamiento»)
//   calidad        10 %  Valoración MAbroad: subnotas «Clima» y «Calidad de vida»
//   conectividad    5 %  Valoración MAbroad: escapadas y conexiones
//
// El idioma (cuánto se puede vivir en inglés o en español) NO cuenta: es una
// preferencia personal. Se calcula igual (dato aparte en el desglose y el
// comparador) y City Match lo pregunta.
//
// Si a una subnota le falta el dato, queda PENDIENTE (null) en vez de
// inventarla: la nota se calcula con los pesos que quedan y se marca como
// provisional; si falta más del 30 % del peso, no hay nota.
//
// Este módulo es puro (no importa datos): lo usan scripts/city-data.mjs para
// precalcular el índice y el cliente para pintar el desglose. Si cambias un
// peso o una fórmula, actualiza docs/scoring.md y MethodologyNote.jsx.
// ─────────────────────────────────────────────────────────────────────────────

/** Pesos fijos (suman 100). */
export const SCORING_WEIGHTS = Object.freeze({
  coste: 20,
  vida: 20,
  seguridad: 15,
  salidas: 10,
  academico: 10,
  alojamiento: 10,
  calidad: 10,
  conectividad: 5,
});

/** Por debajo de esta parte del peso con dato, la ciudad se queda sin nota. */
export const MIN_COVERAGE = 0.7;

/**
 * Subnotas en el orden en que se enseñan (icono: getSubscoreIcon en
 * lib/categoryIcons.js). `kind`: "dato" (fuente externa), "mixto" o
 * "valoracion" (valoración editorial de MAbroad con criterio escrito).
 */
export const SUBSCORES = [
  { id: "coste", label: "Coste de vida", kind: "dato",
    source: "Coste mensual de la ficha (fuente oficial o estimación MAbroad)" },
  { id: "vida", label: "Vida estudiantil", kind: "mixto",
    source: "Secciones de Erasmus Student Network, estudiantes internacionales (THE) y ambiente (MAbroad)" },
  { id: "seguridad", label: "Seguridad", kind: "mixto",
    source: "Tasa de homicidios del país (UNODC) y valoración MAbroad de la ciudad" },
  { id: "salidas", label: "Salidas profesionales", kind: "mixto",
    source: "Jóvenes que ni trabajan ni estudian (Eurostat / OIT) y valoración MAbroad de empleo y prácticas" },
  { id: "academico", label: "Nivel académico", kind: "dato",
    source: "Times Higher Education World University Rankings" },
  { id: "alojamiento", label: "Alojamiento", kind: "valoracion",
    source: "Valoración MAbroad: disponibilidad, precio y residencias" },
  { id: "calidad", label: "Calidad de vida y clima", kind: "valoracion",
    source: "Valoración MAbroad: clima y calidad de vida" },
  { id: "conectividad", label: "Conectividad para viajar", kind: "valoracion",
    source: "Valoración MAbroad: escapadas y conexiones" },
].map((s) => ({ ...s, weight: SCORING_WEIGHTS[s.id] }));

export const SUBSCORE_IDS = SUBSCORES.map((s) => s.id);

/** Datos que se enseñan junto al desglose pero NO cuentan en la nota. */
export const EXTRA_SCORES = [
  { id: "idioma", label: "Idioma (inglés o español)", kind: "dato",
    source: "Eurobarómetro 540 (UE) o lengua oficial inglesa/española" },
];

const clamp10 = (n) => Math.max(0, Math.min(10, n));
const round1 = (n) => Math.round(n * 10) / 10;
const isNum = (v) => typeof v === "number" && Number.isFinite(v);

// ─── Escalas: dato → 0–10 ────────────────────────────────────────────────────

/** Escala del coste: 400 €/mes o menos = 10; cada 200 € más resta 1 punto; 2.400 € o más = 0. */
export const COST_SCALE = Object.freeze({ best: 400, worst: 2400 });

/**
 * Punto medio de «600–900€/mes» o «1.200–1.800€/mes» (los puntos son miles).
 * Mismo resultado que getCostMidpoint de lib/cities.js (lo comprueba
 * tests/scoring.test.mjs), pero sin depender del índice generado.
 */
export function parseCostMidpoint(costDetail) {
  const m = /([\d.]+)\s*[–-]\s*([\d.]+)/.exec(costDetail || "");
  if (!m) return null;
  const n = (s) => Number(s.replace(/\./g, ""));
  return (n(m[1]) + n(m[2])) / 2;
}

/** @param {number} monthlyMid punto medio del rango «mín–máx€/mes» */
export function costToScore(monthlyMid) {
  if (!isNum(monthlyMid) || monthlyMid <= 0) return null;
  const { best, worst } = COST_SCALE;
  return round1(clamp10((10 * (worst - monthlyMid)) / (worst - best)));
}

/**
 * Escala logarítmica de la tasa de homicidios (por 100.000 hab.): 0,5 o
 * menos = 10, 40 o más = 0. Cada vez que la tasa se duplica, baja ~1,6 puntos.
 */
export const HOMICIDE_SCALE = Object.freeze({ best: 0.5, worst: 40 });

export function homicideToScore(rate) {
  if (!isNum(rate) || rate < 0) return null;
  const { best, worst } = HOMICIDE_SCALE;
  if (rate <= best) return 10;
  return round1(clamp10((10 * Math.log(worst / rate)) / Math.log(worst / best)));
}

/**
 * Escala de la tasa NEET 15–24 (% de jóvenes que ni trabajan ni estudian ni
 * se forman): 4 % o menos = 10; cada 2 puntos más restan 1; 24 % o más = 0.
 */
export const NEET_SCALE = Object.freeze({ best: 4, worst: 24 });

export function neetToScore(rate) {
  if (!isNum(rate) || rate < 0) return null;
  const { best, worst } = NEET_SCALE;
  return round1(clamp10((10 * (worst - rate)) / (worst - best)));
}

/** Tramos del puesto THE → nota (el número es el inicio del tramo que publica THE). */
export const THE_BANDS = Object.freeze([
  [50, 10], [100, 9], [200, 8], [300, 7], [500, 6], [1000, 5], [Infinity, 4.5],
]);
/** Ninguna universidad de la ciudad está clasificada en THE. */
export const THE_UNRANKED_SCORE = 4;

/** «=111» → 111, «301–325» → 301, «2001+» → 2001, «Reporter» → null. */
export function parseTheRank(rank) {
  const m = /(\d+)/.exec(String(rank ?? ""));
  return m ? Number(m[1]) : null;
}

export function theRankToScore(rank) {
  const n = typeof rank === "number" ? rank : parseTheRank(rank);
  if (n == null) return THE_UNRANKED_SCORE;
  return THE_BANDS.find(([max]) => n <= max)[1];
}

/** Secciones ESN activas → puntos de comunidad (0–4). */
export function esnPoints(sections) {
  if (!isNum(sections) || sections <= 0) return 0;
  return sections === 1 ? 3 : 4;
}

/** Estudiantes internacionales (THE) → puntos de comunidad (0–6). */
export const INTL_STUDENT_TIERS = Object.freeze([
  [20000, 6], [10000, 5], [5000, 4], [2500, 3], [1000, 2], [250, 1],
]);
export function intlStudentPoints(count) {
  if (!isNum(count)) return null;
  return INTL_STUDENT_TIERS.find(([min]) => count >= min)?.[1] ?? 0;
}

/** % de la población que puede conversar en inglés → 0–10. */
export function englishShareToScore(pct) {
  return isNum(pct) ? round1(clamp10(pct / 10)) : null;
}

// ─── Nota final ─────────────────────────────────────────────────────────────

/**
 * Media ponderada de las subnotas con dato. Las que faltan (null) quedan
 * fuera y su peso se reparte entre el resto; si el peso con dato no llega a
 * MIN_COVERAGE, no hay nota (overall null).
 * @param {Record<string, number | null>} subs
 * @param {Record<string, number>} [weights]
 * `exact` es la misma nota sin redondear: los rankings ordenan por ella (se
 * enseña con un decimal, pero dos 7,8 no tienen por qué empatar).
 * @returns {{ overall: number | null, exact: number | null, coverage: number, pending: string[] }}
 */
export function computeScore(subs, weights = SCORING_WEIGHTS) {
  let sum = 0;
  let wWith = 0;
  let wAll = 0;
  const pending = [];
  for (const id of SUBSCORE_IDS) {
    const w = weights[id] ?? 0;
    if (w <= 0) continue;
    wAll += w;
    if (isNum(subs?.[id])) {
      sum += w * subs[id];
      wWith += w;
    } else {
      pending.push(id);
    }
  }
  const coverage = wAll ? wWith / wAll : 0;
  return {
    overall: coverage >= MIN_COVERAGE && wWith ? round1(sum / wWith) : null,
    exact: coverage >= MIN_COVERAGE && wWith ? Math.round((sum / wWith) * 10000) / 10000 : null,
    coverage: Math.round(coverage * 100) / 100,
    pending,
  };
}

// ─── Lo que falta tras la beca (dato aparte, no cuenta en la nota) ───────────

/**
 * Beca mensual de referencia y lo que falta para cubrir el coste medio.
 * Erasmus+: mínimo del SEPIE del grupo del país (Reino Unido: grupo estimado).
 * Suiza: SEMP. Resto (América): 0 €, porque no hay beca común.
 * @param {{ programType: string, country: string }} city
 * @param {number} monthlyMid
 * @param {{ GROUP1: string[], GROUP2: string[], GROUP3: string[], ESTIMATED_GROUPS: object, SEPIE_NAMES: object, SEPIE_MIN_MONTHLY: object, SEMP_MONTHLY: { eur: number } }} becaData
 * @returns {{ beca: number, gap: number, kind: "erasmus" | "semp" | "none", group?: number, estimated?: boolean } | null}
 */
export function getBecaGap(city, monthlyMid, becaData) {
  if (!isNum(monthlyMid) || monthlyMid <= 0) return null;
  const { GROUP1, GROUP2, GROUP3, ESTIMATED_GROUPS, SEPIE_NAMES, SEPIE_MIN_MONTHLY, SEMP_MONTHLY } = becaData;
  const gap = (beca) => Math.max(0, Math.round(monthlyMid - beca));
  if (city.programType === "erasmus") {
    const state = getStateCountry(city.country);
    const name = SEPIE_NAMES[state] ?? state;
    const official = GROUP1.includes(name) ? 1 : GROUP2.includes(name) ? 2 : GROUP3.includes(name) ? 3 : null;
    const group = official ?? ESTIMATED_GROUPS[name] ?? null;
    if (group) {
      const beca = SEPIE_MIN_MONTHLY[group];
      return { beca, gap: gap(beca), kind: "erasmus", group, estimated: official == null };
    }
  }
  if (city.programType === "switzerland_bilateral") {
    return { beca: SEMP_MONTHLY.eur, gap: gap(SEMP_MONTHLY.eur), kind: "semp" };
  }
  return { beca: 0, gap: gap(0), kind: "none" };
}

/** «Escocia (Reino Unido)» → «Reino Unido». (Mismo criterio que lib/cities.js.) */
export function getStateCountry(country) {
  return country?.match(/\(([^)]+)\)$/)?.[1] ?? country;
}

// ─── Subnotas de una ciudad (lo usa el generador, con los datos de src/data) ──

const avg = (arr) => {
  const v = arr.filter(isNum);
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
};
const fmt1 = (n) => n.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fmtInt = (n) => Math.round(n).toLocaleString("es-ES");

/** Media de las subcategorías de una categoría de insights cuyo nombre cumple `test`. */
function subcatAvg(scores, catId, test) {
  const cat = scores.find((s) => s.id === catId);
  const vals = (cat?.subcategories ?? []).filter((x) => test(x.label)).map((x) => x.score);
  return { value: avg(vals), cat };
}

/**
 * Calcula las 8 subnotas de una ciudad (y el dato de idioma, que no cuenta)
 * con una línea de detalle de cada una.
 * Solo lo llama scripts/city-data.mjs (el cliente recibe el resultado).
 * @param {object} p
 * @param {object} p.city              entrada de CITIES
 * @param {object[]} p.scores          insights.scores (8 categorías editoriales)
 * @param {number} p.costMid           punto medio de costDetail
 * @param {string} p.costSourceLabel   «Fuente: …» o «Estimación MAbroad»
 * @param {object[]} p.universities    CITY_UNIVERSITIES[slug]
 * @param {number} p.theEdition        edición actual de THE
 * @param {string[]} p.esnSections     CITY_ESN_SECTIONS[slug]
 * @param {Record<string, number>} p.homicides  COUNTRY_HOMICIDE_RATES[país]
 * @param {object | null} p.neet               CITY_NEET[slug]
 * @param {object | undefined} p.language       COUNTRY_LANGUAGE[país]
 * @param {string | undefined} p.languagePending CITY_LANGUAGE_PENDING[slug]
 */
export function computeCitySubscores(p) {
  const { city, scores, costMid, costSourceLabel, universities = [], theEdition, esnSections = [], homicides = {}, neet = null, language, languagePending } = p;
  const subs = {};
  const extras = {};
  const detail = {};
  const catScore = (id) => scores.find((s) => s.id === id)?.score;

  // Coste
  subs.coste = costToScore(costMid);
  detail.coste = subs.coste == null ? "Sin coste mensual en la ficha."
    : `${fmtInt(costMid)} €/mes de media (${city.costDetail}; ${costSourceLabel.replace(/^Fuente: /, "fuente: ")}).`;

  // Vida estudiantil: comunidad (dato) + ambiente (valoración)
  const fiesta = subcatAvg(scores, "vida_social", (l) => /^(Fiesta|Eventos)/.test(l));
  const ambiente = fiesta.value ?? fiesta.cat?.score ?? null;
  const withIntlData = universities.filter((u) => isNum(u.students) && isNum(u.intlPct));
  const intl = withIntlData.length
    ? withIntlData.reduce((acc, u) => acc + (u.students * u.intlPct) / 100, 0)
    : null;
  const intlPts = intl == null ? null : intlStudentPoints(intl);
  const esn = esnPoints(esnSections.length);
  if (intlPts == null || ambiente == null) {
    subs.vida = null;
    detail.vida = "Pendiente: ninguna universidad de la ciudad publica sus datos en THE, así que no sabemos cuántos estudiantes internacionales tiene.";
  } else {
    const comunidad = esn + intlPts;
    subs.vida = round1((comunidad + ambiente) / 2);
    const esnTxt = esnSections.length === 0 ? "sin sección de ESN"
      : esnSections.length === 1 ? "1 sección de ESN" : `${esnSections.length} secciones de ESN`;
    detail.vida = `Comunidad ${comunidad}/10 (${esnTxt}; unos ${fmtInt(Math.round(intl / 100) * 100)} estudiantes internacionales en sus universidades de THE) y ambiente ${fmt1(ambiente)}/10 (valoración MAbroad).`;
  }

  // Seguridad: mitad país (UNODC), mitad ciudad (valoración MAbroad)
  const years = Object.keys(homicides).filter((y) => isNum(homicides[y])).sort().slice(-3);
  const rate = years.length ? avg(years.map((y) => homicides[y])) : null;
  const segPais = homicideToScore(rate);
  const segCiudad = catScore("seguridad");
  subs.seguridad = isNum(segPais) && isNum(segCiudad) ? round1((segPais + segCiudad) / 2) : null;
  detail.seguridad = subs.seguridad == null ? "Pendiente: sin dato de UNODC para el país."
    : `País ${fmt1(segPais)}/10 (${fmt1(rate)} homicidios por 100.000 habitantes en ${getStateCountry(city.country)}, media ${years[0]}–${years.at(-1)}, UNODC) y ciudad ${fmt1(segCiudad)}/10 (valoración MAbroad de día, de noche y del ambiente).`;

  // Salidas profesionales: mitad NEET de la región o el país, mitad valoración de empleo
  const neetYears = neet ? Object.keys(neet.years).filter((y) => isNum(neet.years[y])).sort().slice(-3) : [];
  const neetRate = neetYears.length ? avg(neetYears.map((y) => neet.years[y])) : null;
  const salNeet = neetToScore(neetRate);
  const salCiudad = catScore("empleo");
  subs.salidas = isNum(salNeet) && isNum(salCiudad) ? round1((salNeet + salCiudad) / 2) : null;
  if (subs.salidas == null) {
    detail.salidas = "Pendiente: sin dato de jóvenes que ni trabajan ni estudian para la región ni el país.";
  } else {
    const donde = neet.scope === "region" ? `la región ${neet.name}` : getStateCountry(city.country);
    const fuente = neet.source === "eurostat" ? "Eurostat" : "OIT";
    const periodo = neetYears.length > 1 ? `media ${neetYears[0]}–${neetYears.at(-1)}` : neetYears[0];
    detail.salidas = `Región o país ${fmt1(salNeet)}/10 (el ${fmt1(neetRate)} % de los jóvenes de 15 a 24 años ni trabaja ni estudia en ${donde}, ${periodo}, ${fuente}) y ciudad ${fmt1(salCiudad)}/10 (valoración MAbroad de mercado laboral, prácticas y empresas).`;
  }

  // Nivel académico
  const ranked = universities
    .map((u) => ({ ...u, n: parseTheRank(u.rank) }))
    .filter((u) => u.n != null)
    .sort((a, b) => a.n - b.n);
  const best = ranked[0];
  subs.academico = best ? theRankToScore(best.n) : THE_UNRANKED_SCORE;
  detail.academico = best
    ? `${best.name}: puesto ${best.rank.replace(/^=/, "")} en THE ${best.edition}${best.edition !== theEdition ? ` (última edición en la que participa)` : ""}.`
    : `Ninguna universidad de la ciudad está clasificada en THE ${theEdition}.`;

  // Alojamiento (valoración)
  const aloj = scores.find((s) => s.id === "alojamiento")?.score;
  subs.alojamiento = isNum(aloj) ? aloj : null;
  detail.alojamiento = "Valoración MAbroad: disponibilidad, precio, facilidad de búsqueda y residencias.";

  // Calidad de vida y clima (valoración)
  const clima = subcatAvg(scores, "estilo_vida", (l) => l === "Clima").value;
  const calidad = subcatAvg(scores, "estilo_vida", (l) => l === "Calidad de vida").value;
  const cal = isNum(clima) && isNum(calidad)
    ? avg([clima, calidad]) : scores.find((s) => s.id === "estilo_vida")?.score ?? null;
  subs.calidad = isNum(cal) ? round1(cal) : null;
  detail.calidad = isNum(clima) && isNum(calidad)
    ? `Clima ${fmt1(clima)} y calidad de vida ${fmt1(calidad)} (valoración MAbroad).`
    : "Valoración MAbroad del estilo de vida.";

  // Idioma: dato aparte, NO cuenta en la nota
  if (languagePending) {
    extras.idioma = null;
    detail.idioma = `Sin dato. ${languagePending}`;
  } else if (language?.native) {
    extras.idioma = 10;
    detail.idioma = `El ${language.native} es la lengua oficial y mayoritaria.`;
  } else if (isNum(language?.english)) {
    extras.idioma = englishShareToScore(language.english);
    detail.idioma = `El ${language.english} % de la población puede mantener una conversación en inglés (Eurobarómetro 540, 2024).`;
  } else {
    extras.idioma = null;
    detail.idioma = "Sin dato: el Eurobarómetro solo cubre la UE y aún no tenemos un dato comparable para este país.";
  }

  // Conectividad (valoración)
  const con = subcatAvg(scores, "movilidad", (l) => /^(Escapadas|Conexiones)/.test(l)).value
    ?? scores.find((s) => s.id === "movilidad")?.score ?? null;
  subs.conectividad = isNum(con) ? round1(con) : null;
  detail.conectividad = "Valoración MAbroad: escapadas de fin de semana y conexiones nacionales e internacionales.";

  return { subs, extras, detail };
}

// ─── City Match (preparado, sin activar) ─────────────────────────────────────

/**
 * Pesos ajustados a las respuestas de City Match. NO SE USA TODAVÍA: la nota
 * pública siempre usa SCORING_WEIGHTS. Cuando se active, City Match podrá
 * ordenar con computeScore(subs, weightsFromMatch(respuestas)).
 *
 * Regla: cada subnota que el estudiante marca como prioridad suma +50 % de
 * su peso base (1.ª prioridad), +30 % (2.ª) o +15 % (3.ª); el presupuesto
 * ajustado sube el coste un 50 % más. Después se renormaliza a 100. El idioma
 * no tiene peso: City Match lo usa como pregunta/filtro, no en la nota.
 * @param {{ priorities?: string[], tightBudget?: boolean }} answers
 *        priorities: ids de SUBSCORES por orden de importancia
 */
export function weightsFromMatch({ priorities = [], tightBudget = false } = {}) {
  const boost = [0.5, 0.3, 0.15];
  const w = { ...SCORING_WEIGHTS };
  priorities.slice(0, 3).forEach((id, i) => {
    if (id in w) w[id] = w[id] * (1 + boost[i]);
  });
  if (tightBudget) w.coste *= 1.5;
  const total = Object.values(w).reduce((a, b) => a + b, 0);
  return Object.fromEntries(Object.entries(w).map(([k, v]) => [k, Math.round((v * 1000) / total) / 10]));
}
