import { useState, useEffect, useMemo, useRef, useId } from "react";
import Flag from "../components/Flag";
import { Link, useSearchParams } from "react-router-dom";
import { CITY_MATCH_QUESTION_IDS, CITY_MATCH_QUESTION_COUNT } from "../data/cityMatch";
import { getAllCities, getScoreMap, getOverallScore, isErasmusEligible, getCitySize, parseMinCost } from "../lib/cities";
import { useSEO } from "../hooks/useSEO";
import { Navbar, Footer } from "../components/Layout";
import JourneySteps from "../components/JourneySteps";
import {
  IconBeca, IconClima, IconIdiomas, IconFiesta, IconEdificio, IconHoja, IconUniversidad,
  IconExperiencia, IconCityMatch, IconMedalla, IconCasa, IconAmigos, IconTransporte,
  IconEmpleo, IconSeguridad, IconComparar, IconProceso, IconLapiz, IconCheck, IconAlerta,
} from "../components/icons";
import ShareButton from "../components/ShareButton";
import ScoreRing from "../components/ScoreRing";
import PhotoCredit from "../components/PhotoCredit";
import styles from "./CityMatchPage.module.css";
import { responsiveImage } from "../lib/images";

const ALL_CITIES = getAllCities();

// Foto de cada resultado: columna de 160px junto al texto (vertical, ~160×210)
// y, en móvil, a todo el ancho con 140px de alto.
const RESULT_PHOTO_SLOTS = [
  ["(max-width: 768px)", "100vw", 2.4],
  [null, "160px", 0.75],
];

/* ─────────────────────────────────────────────────────────────────────────
   City Match — recomendador inteligente.

   Cada pregunta se resuelve contra datos reales que ya existen en la app
   (scores de categoría, idioma, clima, población oficial) en vez de
   inventar métricas nuevas por ciudad. "Naturaleza" es la única dimensión
   heurística: cuenta menciones de palabras relacionadas con naturaleza en
   los textos reales de cada ciudad (highlights/tips/descripción), así que
   es una señal aproximada, no un dato investigado como el resto.

   Puntuación:
   - "No me importa / No lo sé" es NEUTRO: esa pregunta no cuenta, ni suma
     ni resta (antes una pregunta sin responder valía un 50 % y arrastraba
     a todas las ciudades hacia el medio).
   - Preguntas con varias respuestas en orden (máx. 3): la ciudad puntúa por
     la opción que mejor le encaje, ponderada por su puesto — 1º 100 %,
     2º 60 %, 3º 30 % (RANK_WEIGHTS).
   - Prioridades: cada área elegida añade una dimensión más (la nota real
     de la ciudad en esa categoría) con peso 1 / 0,6 / 0,3 según el puesto.
   - El % de match es la media ponderada de todo lo que cuenta.
   - Imprescindibles (MUST_HAVES): en presupuesto, clima, idioma, ambiente y
     tamaño la respuesta se puede marcar como «Imprescindible»; entonces
     además descarta las ciudades que no cumplen su umbral. Si no queda
     ninguna (o quedan menos de 5), se enseñan las que menos condiciones
     incumplen, diciendo cuál falla. Van en el enlace como &imp=a~b.
   ───────────────────────────────────────────────────────────────────────── */

const NEUTRAL = "x";
const MAX_RANKED = 3;
const RANK_WEIGHTS = [1, 0.6, 0.3];
const ORDINALS = ["1º", "2º", "3º"];
const ORDINAL_WORDS = ["primera", "segunda", "tercera"];

/**
 * Clima de la ficha → 0 cálido, 1 templado, 2 frío. Por palabras clave: los
 * datos usan ~50 descripciones distintas ("Continental húmedo / subártico",
 * "Tropical de altura"…) y una tabla cerrada dejaba casi todas en "templado".
 */
function weatherBucket(weather = "") {
  const w = weather.toLowerCase();
  if (/(frío|frio|subártico|subartico|subpolar|alpino|báltico|baltico|lluvioso)/.test(w)) return 2;
  if (/(altura|andino|montaña|templado)/.test(w)) return 1;
  if (/(mediterráneo|mediterraneo|tropical|subtropical|cálido|calido|desértico|semiárido|primavera|primaveral)/.test(w)) return 0;
  return 1;
}

// Naturaleza (0 poca, 1 algo, 2 mucha): precalculada en el índice de
// ciudades (natureLevel en lib/cityMetrics.js) a partir de los highlights,
// tips y descripción, que ya no viajan en el bundle de esta página.
function bucketSimilarity(a, b) {
  const dist = Math.abs(a - b);
  return dist === 0 ? 1 : dist === 1 ? 0.5 : 0.15;
}

const closeness = (score, target) => Math.max(0, 1 - Math.abs(score - target) / 10);

/* ─── Preguntas (copy + opciones) ─────────────────────────────────────── */
// Valores cortos y sin "." ni "~": se usan tal cual en el enlace compartible.
const QUESTION_DEFS = [
  {
    id: "destino",
    title: "¿Dónde te gustaría hacer tu intercambio?",
    subtitle: "La beca Erasmus+ cubre la UE, los países asociados y Reino Unido (desde el curso 2027-28); Suiza, de momento, va por otros convenios",
    options: [
      { value: "erasmus", label: "Solo destinos con beca Erasmus+", desc: "Europa, con Reino Unido desde 2027-28" },
      { value: "europa", label: "Toda Europa", desc: "También Suiza, con otros convenios" },
      { value: "mundo", label: "Europa y fuera de Europa", desc: "También América" },
      { value: NEUTRAL, label: "Me da igual" },
    ],
  },
  {
    id: "presupuesto",
    title: "¿Cuál es tu presupuesto mensual?",
    subtitle: "Alojamiento, comida y ocio incluidos",
    options: [
      { value: "bajo", label: "Ajustado", desc: "Hasta 600€/mes" },
      { value: "medio", label: "Medio", desc: "600–900€/mes" },
      { value: "alto", label: "Flexible", desc: "900€+ sin problema" },
      { value: NEUTRAL, label: "No lo sé todavía" },
    ],
  },
  {
    id: "clima",
    multi: true,
    title: "¿Qué clima prefieres?",
    subtitle: "Piensa en cómo vas a vivir el otoño y el invierno",
    options: [
      { value: "calido", label: "Cálido", desc: "Mediterráneo, veranos largos" },
      { value: "templado", label: "Templado", desc: "Estaciones marcadas, sin extremos" },
      { value: "frio", label: "Frío de verdad", desc: "Inviernos duros, me gusta el frío" },
      { value: NEUTRAL, label: "No me importa" },
    ],
  },
  {
    id: "idioma",
    multi: true,
    title: "¿Qué idioma te gustaría tener cerca?",
    subtitle: "El inglés suele funcionar en todas partes, pero esto ayuda a afinar",
    options: [
      { value: "en", label: "Inglés", match: ["inglés"] },
      { value: "es", label: "Español", match: ["español"] },
      { value: "fr", label: "Francés", match: ["francés"] },
      { value: "de", label: "Alemán", match: ["alemán"] },
      { value: "it", label: "Italiano", match: ["italiano"] },
      { value: "pt", label: "Portugués", match: ["portugués"] },
      { value: "nl", label: "Neerlandés", match: ["neerlandés"] },
      { value: "nordico", label: "Nórdicos", desc: "Sueco, danés, noruego, finés…", match: ["sueco", "danés", "noruego", "finés", "finlandés", "islandés"] },
      { value: "pl", label: "Polaco", match: ["polaco"] },
      { value: "cs", label: "Checo", match: ["checo"] },
      { value: "hu", label: "Húngaro", match: ["húngaro"] },
      { value: NEUTRAL, label: "Me da igual / quiero aprender uno nuevo" },
    ],
  },
  {
    id: "fiesta",
    title: "¿Cuánta marcha quieres que tenga tu ciudad?",
    subtitle: "Vida social, ambiente estudiantil y fiesta",
    options: [
      { value: "tranquila", label: "Tranquila", desc: "Prefiero planes tranquilos" },
      { value: "equilibrada", label: "Equilibrada", desc: "Un poco de todo" },
      { value: "intensa", label: "Intensa", desc: "Quiero fiesta y mucha vida social" },
      { value: NEUTRAL, label: "No me importa" },
    ],
  },
  {
    id: "tamano",
    multi: true,
    title: "¿Qué tipo de ciudad prefieres?",
    subtitle: "Piensa en el ambiente que te gustaría sentir cada día",
    options: [
      { value: "pequena", label: "Pequeña y manejable", desc: "Menos de 300.000 habitantes" },
      { value: "mediana", label: "Mediana", desc: "De 300.000 a 1 millón de habitantes" },
      { value: "grande", label: "Gran ciudad", desc: "1 millón de habitantes o más" },
      { value: NEUTRAL, label: "No me importa" },
    ],
  },
  {
    id: "naturaleza",
    title: "¿Cuánto te importa tener naturaleza cerca?",
    subtitle: "Parques, playa, montaña o naturaleza accesible desde la ciudad",
    options: [
      { value: "poca", label: "Poca falta me hace", desc: "Prefiero todo urbano" },
      { value: "algo", label: "Algo estaría bien", desc: "Sin que sea lo principal" },
      { value: "mucha", label: "Es fundamental para mí", desc: "Necesito desconectar en naturaleza" },
      { value: NEUTRAL, label: "No me importa" },
    ],
  },
  {
    id: "universidad",
    title: "¿Qué priorizas en lo académico?",
    subtitle: "Prestigio, salidas profesionales o simplemente vivir la experiencia",
    options: [
      { value: "prestigio", label: "Prestigio y salidas laborales", desc: "Quiero que pese en el CV" },
      { value: "equilibrio", label: "Buen equilibrio", desc: "Ni lo más top ni lo más flojo" },
      { value: "secundario", label: "Es secundario", desc: "Prioriza la experiencia sobre lo académico" },
      { value: NEUTRAL, label: "No lo sé" },
    ],
  },
  {
    id: "estilo",
    title: "¿Cuánto te importa la calidad de vida diaria?",
    subtitle: "Gastronomía, ocio, bienestar y ritmo de vida en general",
    options: [
      { value: "top", label: "Es lo que más me importa", desc: "Quiero vivir muy bien cada día" },
      { value: "media", label: "Me importa, pero no es lo principal" },
      { value: "noprio", label: "No es una prioridad" },
      { value: NEUTRAL, label: "No lo sé" },
    ],
  },
  {
    id: "prioridades",
    multi: true,
    title: "¿Qué es lo que más pesa en tu decisión?",
    subtitle: "Lo que elijas primero contará más en tu resultado",
    options: [
      { value: "coste", label: "Que salga barato", category: "coste", Icon: IconBeca, reason: "destaca en lo que más te importa: que salga barato" },
      { value: "alojamiento", label: "Encontrar piso fácil", category: "alojamiento", Icon: IconCasa, reason: "destaca en lo que más te importa: encontrar alojamiento" },
      { value: "social", label: "Vida social", category: "vida_social", Icon: IconFiesta, reason: "destaca en lo que más te importa: la vida social" },
      { value: "integracion", label: "Integrarme con locales", category: "integracion", Icon: IconAmigos, reason: "destaca en lo que más te importa: integrarte" },
      { value: "movilidad", label: "Moverme fácil", desc: "Transporte y viajes", category: "movilidad", Icon: IconTransporte, reason: "destaca en lo que más te importa: moverte fácil" },
      { value: "vida", label: "Calidad de vida", category: "estilo_vida", Icon: IconExperiencia, reason: "destaca en lo que más te importa: la calidad de vida" },
      { value: "empleo", label: "Salidas profesionales", category: "empleo", Icon: IconEmpleo, reason: "destaca en lo que más te importa: las salidas profesionales" },
      { value: "seguridad", label: "Seguridad", category: "seguridad", Icon: IconSeguridad, reason: "destaca en lo que más te importa: la seguridad" },
      { value: NEUTRAL, label: "Nada en especial" },
    ],
  },
];

// El test se monta en el orden de CITY_MATCH_QUESTION_IDS (src/data/cityMatch.js),
// que es de donde sale el «10 preguntas» del menú y de la descripción SEO.
// Si la lista y las definiciones no coinciden, mejor fallar aquí que enseñar
// un número que no es.
const QUESTIONS = CITY_MATCH_QUESTION_IDS.map((id) => {
  const def = QUESTION_DEFS.find((q) => q.id === id);
  if (!def) throw new Error(`City Match: falta la definición de la pregunta «${id}» (QUESTION_DEFS).`);
  return def;
});
if (QUESTION_DEFS.length !== QUESTIONS.length) {
  const missing = QUESTION_DEFS.filter((q) => !CITY_MATCH_QUESTION_IDS.includes(q.id)).map((q) => q.id);
  throw new Error(`City Match: preguntas definidas pero no listadas en src/data/cityMatch.js: ${missing.join(", ")}.`);
}

const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));
const optionOf = (qId, value) => QUESTION_BY_ID[qId].options.find((o) => o.value === value);

/* ─── Dimensiones: cada una resuelve una pregunta contra datos reales ──────
   similarity() devuelve 0-1, o null si esa respuesta no discrimina entre
   ciudades (p. ej. presupuesto "Flexible"): entonces la pregunta no cuenta.
   reason  = por qué encaja (se lee tras el nombre de la ciudad).
   caveat  = en qué encaja poco, dicho con su nombre: es el «Ten en cuenta»
             del resultado, que antes no decía a qué se refería. */
const DIMENSIONS = {
  presupuesto: {
    Icon: IconBeca,
    reason: "se ajusta a tu presupuesto",
    caveat: "el coste de vida encaja poco con tu presupuesto",
    similarity: (city, scoreMap, value) => {
      if (value === "alto") return null;
      return closeness(scoreMap.coste?.score ?? 5, value === "bajo" ? 9.5 : 6.5);
    },
  },
  clima: {
    Icon: IconClima,
    reason: "tiene el clima que buscas",
    caveat: "el clima no es el que prefieres",
    similarity: (city, _sm, value) => {
      const target = { calido: 0, templado: 1, frio: 2 }[value];
      return weatherBucket(city.weather) === target ? 1 : 0.3;
    },
  },
  idioma: {
    Icon: IconIdiomas,
    reason: "encaja con tu idioma preferido",
    caveat: "el idioma local no es de los que querías tener cerca",
    similarity: (city, _sm, value) => {
      const langs = optionOf("idioma", value)?.match || [];
      const cityLang = city.language.toLowerCase();
      return langs.some((l) => cityLang.includes(l)) ? 1 : 0.35;
    },
  },
  fiesta: {
    Icon: IconFiesta,
    reason: "tiene el nivel de vida social que buscas",
    caveat: "el nivel de vida social no es el que buscas",
    similarity: (city, scoreMap, value) =>
      closeness(scoreMap.vida_social?.score ?? 5, { tranquila: 5, equilibrada: 7.5, intensa: 9.5 }[value]),
  },
  tamano: {
    Icon: IconEdificio,
    reason: "tiene el tamaño de ciudad que encaja contigo",
    caveat: "el tamaño de la ciudad no es el que prefieres",
    similarity: (city, _sm, value) => {
      const size = getCitySize(city);
      if (size == null) return null; // sin dato oficial: la pregunta no cuenta para esa ciudad
      return bucketSimilarity(size, { pequena: 0, mediana: 1, grande: 2 }[value]);
    },
  },
  naturaleza: {
    Icon: IconHoja,
    reason: "ofrece el contacto con naturaleza que valoras",
    caveat: "el contacto con la naturaleza no es el que buscas",
    similarity: (city, _sm, value) =>
      bucketSimilarity(city.nature ?? 1, { poca: 0, algo: 1, mucha: 2 }[value]),
  },
  universidad: {
    Icon: IconUniversidad,
    reason: "tiene buena proyección académica y laboral",
    caveat: "la proyección académica y laboral encaja poco con lo que priorizas",
    similarity: (city, scoreMap, value) => {
      if (value === "secundario") return null;
      return closeness(scoreMap.empleo?.score ?? 5, value === "prestigio" ? 9 : 7);
    },
  },
  estilo: {
    Icon: IconExperiencia,
    reason: "tiene una calidad de vida diaria muy alta",
    caveat: "la calidad de vida diaria queda por debajo de lo que pides",
    similarity: (city, scoreMap, value) => {
      if (value === "noprio") return null;
      return closeness(scoreMap.estilo_vida?.score ?? 5, value === "top" ? 9.5 : 7.5);
    },
  },
};

const picksOf = (answer) => (Array.isArray(answer) ? answer : []);
const isAnswered = (answer) => answer != null && answer !== NEUTRAL && !(Array.isArray(answer) && answer.length === 0);

/* ─── Imprescindibles (filtro duro) ────────────────────────────────────────
   En las preguntas clave cada respuesta se puede marcar como «Imprescindible»:
   entonces deja de solo ponderar y DESCARTA las ciudades que no cumplen el
   umbral de abajo (con los mismos datos que la puntuación). «Me gustaría» (lo
   normal) solo pondera. check() devuelve null si cumple, o el motivo por el
   que no, dicho con el dato real de la ciudad. Si una respuesta no filtra
   nada (presupuesto «Flexible»), no se puede marcar como imprescindible. */
const BUDGET_CAP = { bajo: 600, medio: 900 };
const PARTY_RANGE = { tranquila: [0, 7.5], equilibrada: [7, 9], intensa: [8.5, 10] };
const SIZE_VALUE = { pequena: 0, mediana: 1, grande: 2 };
const SIZE_NAME = ["pequeña", "mediana", "grande"];
const CLIMATE_VALUE = { calido: 0, templado: 1, frio: 2 };
const CLIMATE_NAME = ["cálido", "templado", "frío"];
const fmtScore = (n) => n.toFixed(1);

function partyRangeText([min, max]) {
  if (min === 0) return `hasta ${fmtScore(max)}`;
  if (max === 10) return `${fmtScore(min)} o más`;
  return `entre ${fmtScore(min)} y ${fmtScore(max)}`;
}

const MUST_HAVES = {
  presupuesto: {
    label: "Presupuesto",
    applies: (value) => value in BUDGET_CAP,
    rule: (value) => `que el coste mínimo de vivir allí sea de ${BUDGET_CAP[value]}€/mes o menos`,
    check: (city, value) => {
      const min = parseMinCost(city.costDetail || "");
      return min && min <= BUDGET_CAP[value] ? null : `cuesta desde ${min}€/mes y tu tope es ${BUDGET_CAP[value]}€/mes`;
    },
  },
  clima: {
    label: "Clima",
    applies: (picks) => picksOf(picks).length > 0,
    rule: (picks) => `clima ${picksOf(picks).map((v) => CLIMATE_NAME[CLIMATE_VALUE[v]]).join(" o ")}`,
    check: (city, picks) => {
      const bucket = weatherBucket(city.weather);
      return picksOf(picks).some((v) => CLIMATE_VALUE[v] === bucket)
        ? null
        : `su clima es ${CLIMATE_NAME[bucket]} (${city.weather.toLowerCase()})`;
    },
  },
  idioma: {
    label: "Idioma",
    applies: (picks) => picksOf(picks).length > 0,
    rule: (picks) => `que se hable ${picksOf(picks).map((v) => (v === "nordico" ? "un idioma nórdico" : optionOf("idioma", v)?.label.toLowerCase())).join(" o ")}`,
    check: (city, picks) => {
      const cityLang = city.language.toLowerCase();
      return picksOf(picks).some((v) => (optionOf("idioma", v)?.match || []).some((l) => cityLang.includes(l)))
        ? null
        : `allí se habla ${cityLang}`;
    },
  },
  fiesta: {
    label: "Ambiente",
    applies: (value) => value in PARTY_RANGE,
    rule: (value) => `vida social ${partyRangeText(PARTY_RANGE[value])} sobre 10`,
    check: (city, value) => {
      const score = getScoreMap(city.slug).vida_social?.score;
      const [min, max] = PARTY_RANGE[value];
      if (typeof score !== "number") return "no tiene nota de vida social";
      return score >= min && score <= max
        ? null
        : `su vida social es ${fmtScore(score)}/10 y pedías ${partyRangeText([min, max])}`;
    },
  },
  tamano: {
    label: "Tamaño",
    applies: (picks) => picksOf(picks).length > 0,
    rule: (picks) => `ciudad ${picksOf(picks).map((v) => SIZE_NAME[SIZE_VALUE[v]]).join(" o ")}`,
    check: (city, picks) => {
      const size = getCitySize(city);
      if (size == null) return "no tenemos su población oficial";
      return picksOf(picks).some((v) => SIZE_VALUE[v] === size) ? null : `es una ciudad ${SIZE_NAME[size]}`;
    },
  },
};

const MUST_HAVE_IDS = Object.keys(MUST_HAVES);

/** Imprescindibles que cuentan de verdad: marcados, respondidos y que filtran algo. */
function activeMustHaves(answers, must) {
  return must.filter((id) => MUST_HAVES[id] && isAnswered(answers[id]) && MUST_HAVES[id].applies(answers[id]));
}

/** Condiciones imprescindibles que la ciudad NO cumple: [{ id, label, text }]. */
function failedMustHaves(city, answers, mustIds) {
  return mustIds
    .map((id) => {
      const text = MUST_HAVES[id].check(city, answers[id]);
      return text ? { id, label: MUST_HAVES[id].label, text } : null;
    })
    .filter(Boolean);
}

function computeMatch(city, answers) {
  const scoreMap = getScoreMap(city.slug);
  const results = [];

  for (const q of QUESTIONS) {
    const answer = answers[q.id];
    if (!isAnswered(answer)) continue;

    if (q.id === "prioridades") {
      picksOf(answer).forEach((value, i) => {
        const opt = optionOf(q.id, value);
        if (!opt) return;
        const score = scoreMap[opt.category]?.score ?? 5;
        results.push({
          id: `prioridad-${value}`, sim: Math.min(1, score / 10), weight: RANK_WEIGHTS[i], Icon: opt.Icon, reason: opt.reason,
          caveat: `flojea en una de tus prioridades: ${opt.label.toLowerCase()}`,
        });
      });
      continue;
    }

    const dim = DIMENSIONS[q.id];
    if (!dim) continue; // "destino" es un filtro, no una dimensión

    let sim = null;
    if (q.multi) {
      // La opción que mejor encaje, ponderada por su puesto (1º 100 %, 2º 60 %, 3º 30 %).
      picksOf(answer).forEach((value, i) => {
        const s = dim.similarity(city, scoreMap, value);
        if (s != null) sim = Math.max(sim ?? 0, s * RANK_WEIGHTS[i]);
      });
    } else {
      sim = dim.similarity(city, scoreMap, answer);
    }
    if (sim != null) results.push({ id: q.id, sim, weight: 1, Icon: dim.Icon, reason: dim.reason, caveat: dim.caveat });
  }

  const overall = Number(getOverallScore(city.slug)) || 7;
  const totalWeight = results.reduce((a, r) => a + r.weight, 0);
  const percent = totalWeight
    ? Math.round((results.reduce((a, r) => a + r.sim * r.weight, 0) / totalWeight) * 100)
    : Math.round(overall * 10); // sin preferencias: manda la valoración general
  return { city, percent, overall, results };
}

function cityPool(destino) {
  if (destino === "erasmus") return ALL_CITIES.filter(isErasmusEligible);
  if (destino === "europa") return ALL_CITIES.filter((c) => c.region.startsWith("Europa"));
  return ALL_CITIES; // "mundo" y "me da igual"
}

/* ─── Enlace compartible: ?r=resp1.resp2.… (varias en orden: a~b~c) ────── */
function encodeAnswers(answers) {
  return QUESTIONS.map((q) => {
    const a = answers[q.id];
    if (!isAnswered(a)) return NEUTRAL;
    return Array.isArray(a) ? a.join("~") : a;
  }).join(".");
}

function decodeAnswers(encoded) {
  const parts = String(encoded).split(".");
  if (parts.length !== QUESTIONS.length) return null; // enlace de una versión anterior del test
  const out = {};
  QUESTIONS.forEach((q, i) => {
    const valid = new Set(q.options.map((o) => o.value).filter((v) => v !== NEUTRAL));
    if (q.multi) {
      const picks = [...new Set(parts[i].split("~"))].filter((v) => valid.has(v)).slice(0, MAX_RANKED);
      out[q.id] = picks.length ? picks : NEUTRAL;
    } else {
      out[q.id] = valid.has(parts[i]) ? parts[i] : NEUTRAL;
    }
  });
  return out;
}

/* Imprescindibles en el enlace: &imp=presupuesto~clima (aparte de ?r=, así los
   enlaces de antes siguen funcionando igual). */
function encodeMust(must) {
  return MUST_HAVE_IDS.filter((id) => must.includes(id)).join("~");
}

function decodeMust(encoded) {
  return [...new Set(String(encoded || "").split("~"))].filter((id) => MUST_HAVE_IDS.includes(id));
}

/** Parámetros de la URL de resultados (y del enlace para compartir). */
function resultParams(answers, must) {
  const imp = encodeMust(must);
  return imp ? { r: encodeAnswers(answers), imp } : { r: encodeAnswers(answers) };
}

/**
 * ¿Imprescindible o me gustaría? Dos botones, con lo que implica cada uno.
 * `answer` (si ya hay respuesta) sirve para decir exactamente qué se descarta.
 */
function ImportanceToggle({ qId, answer, isMust, onChange }) {
  const labelId = useId();
  const def = MUST_HAVES[qId];
  const answered = isAnswered(answer);
  let note;
  if (!isMust) note = "Solo pondera: las ciudades que no encajen bajan en el resultado, pero siguen.";
  else if (answered && !def.applies(answer)) note = "Con esta respuesta no se descarta ninguna ciudad.";
  else if (answered) note = `Descartamos las ciudades que no cumplan: ${def.rule(answer)}.`;
  else note = "Descartamos las ciudades que no cumplan lo que elijas.";

  return (
    <div className={styles.importance}>
      <span className={styles.importanceLabel} id={labelId}>Para ti esto es…</span>
      <div className={styles.importanceToggle} role="group" aria-labelledby={labelId}>
        <button
          type="button"
          aria-pressed={!isMust}
          className={`${styles.importanceBtn}${!isMust ? ` ${styles.importanceBtnActive}` : ""}`}
          onClick={() => onChange(false)}
        >
          Me gustaría
        </button>
        <button
          type="button"
          aria-pressed={isMust}
          className={`${styles.importanceBtn} ${styles.importanceBtnMust}${isMust ? ` ${styles.importanceBtnMustActive}` : ""}`}
          onClick={() => onChange(true)}
        >
          Imprescindible
        </button>
      </div>
      <p className={styles.importanceNote} aria-live="polite">{note}</p>
    </div>
  );
}

/* ─── Tus respuestas en chips editables (sobre los resultados) ─────────── */
// Nombre corto de cada pregunta para el chip («Presupuesto: Ajustado»).
const CHIP_NAMES = {
  destino: "Destino", presupuesto: "Presupuesto", clima: "Clima", idioma: "Idioma",
  fiesta: "Ambiente", tamano: "Tamaño", naturaleza: "Naturaleza",
  universidad: "Lo académico", estilo: "Calidad de vida", prioridades: "Prioridades",
};

function answerText(q, answer) {
  if (!isAnswered(answer)) return "me da igual";
  if (!q.multi) return optionOf(q.id, answer)?.label ?? "";
  const picks = picksOf(answer);
  return picks.map((v, i) => `${picks.length > 1 ? `${ORDINALS[i]} ` : ""}${optionOf(q.id, v)?.label}`).join(" · ");
}

/**
 * Cada respuesta es un chip; al tocarlo se abre debajo esa pregunta con sus
 * opciones y, al cambiarla, los resultados (y el enlace ?r=) se recalculan al
 * momento, sin repetir el test entero.
 */
function AnswerChips({ answers, must, onChange, onMustChange }) {
  const [editing, setEditing] = useState(null);
  const editorId = useId();
  const chipRefs = useRef({});
  const q = editing ? QUESTION_BY_ID[editing] : null;
  const picks = q?.multi ? picksOf(answers[q.id]) : [];

  // Al cerrar el editor, el foco vuelve a su chip (el botón que se pulsó
  // desaparece y el teclado/lector no debe perder el sitio).
  const returnFocusTo = useRef(null);
  function close() {
    returnFocusTo.current = editing;
    setEditing(null);
  }
  useEffect(() => {
    if (editing !== null || !returnFocusTo.current) return;
    chipRefs.current[returnFocusTo.current]?.focus();
    returnFocusTo.current = null;
  }, [editing]);

  function choose(value) {
    if (!q.multi || value === NEUTRAL) {
      onChange(q.id, value);
      close();
      return;
    }
    const next = picks.includes(value)
      ? picks.filter((v) => v !== value)
      : picks.length < MAX_RANKED ? [...picks, value] : picks;
    onChange(q.id, next.length ? next : NEUTRAL);
  }

  const editor = q && (
    <div className={styles.chipEditor} id={editorId}>
      <p className={styles.chipEditorTitle}>{q.title}</p>
      {MUST_HAVES[q.id] && (
        <ImportanceToggle
          qId={q.id}
          answer={answers[q.id]}
          isMust={must.includes(q.id)}
          onChange={(isMust) => onMustChange(q.id, isMust)}
        />
      )}
      {q.multi && <p className={styles.chipEditorHint}>Hasta 3, en orden de preferencia: tócalas por orden.</p>}
      <div className={styles.chipEditorOptions} role="group" aria-label={q.title}>
        {q.options.map((opt) => {
          const rank = picks.indexOf(opt.value);
          const neutralActive = opt.value === NEUTRAL && !isAnswered(answers[q.id]);
          const active = neutralActive || (q.multi ? rank >= 0 : answers[q.id] === opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              className={`${styles.chipOption}${active ? ` ${styles.chipOptionActive}` : ""}`}
              onClick={() => choose(opt.value)}
            >
              {q.multi && rank >= 0 && <span className={styles.chipOptionRank} aria-hidden="true">{ORDINALS[rank]}</span>}
              {opt.label}
              {q.multi && rank >= 0 && <span className="sr-only">, tu {ORDINAL_WORDS[rank]} opción</span>}
            </button>
          );
        })}
      </div>
      <button type="button" className={styles.chipEditorDone} onClick={close}>Listo</button>
    </div>
  );

  return (
    <section className={styles.answers} aria-label="Tus respuestas">
      <div className={styles.answersHead}>
        <h2 className={styles.answersTitle}>Tus respuestas</h2>
        <span className={styles.answersHint}>Toca una para cambiarla: los resultados se actualizan al momento.</span>
      </div>
      <ul className={styles.chips}>
        {QUESTIONS.flatMap((question) => {
          const answered = isAnswered(answers[question.id]);
          const open = editing === question.id;
          const isMust = activeMustHaves(answers, must).includes(question.id);
          const chip = (
            <li key={question.id}>
              <button
                type="button"
                ref={(el) => { chipRefs.current[question.id] = el; }}
                className={`${styles.chip}${answered ? "" : ` ${styles.chipNeutral}`}${open ? ` ${styles.chipOpen}` : ""}${isMust ? ` ${styles.chipMust}` : ""}`}
                aria-expanded={open}
                aria-controls={open ? editorId : undefined}
                onClick={() => setEditing(open ? null : question.id)}
              >
                <span className={styles.chipName}>{CHIP_NAMES[question.id] ?? question.id}:</span>{" "}
                {answerText(question, answers[question.id])}
                {isMust && <span className={styles.chipMustBadge}>Imprescindible</span>}
                <span className={styles.chipEdit} aria-hidden="true"><IconLapiz size={16} /></span>
              </button>
            </li>
          );
          // El editor va justo debajo del chip que se toca, a todo el ancho.
          return open
            ? [chip, <li key={`${question.id}-editor`} className={styles.chipEditorItem}>{editor}</li>]
            : [chip];
        })}
      </ul>
    </section>
  );
}

/* ─── Componente principal ────────────────────────────────────────────── */
export default function CityMatchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  // Preguntas clave marcadas como «Imprescindible» (filtro duro); el resto, «Me gustaría».
  const [must, setMust] = useState([]);
  const [limitNotice, setLimitNotice] = useState(false);
  // Portada: antes de la primera pregunta se explica qué es el test y cuánto
  // dura. Un enlace con resultados (?r=…) se la salta.
  const [started, setStarted] = useState(false);
  const headingRef = useRef(null);
  const resultsTitleRef = useRef(null);
  const firstRender = useRef(true);
  const titleId = useId();
  const hintId = useId();

  useSEO({
    title: "City Match — Encuentra tu ciudad Erasmus ideal | MAbroad",
    description: `Responde ${CITY_MATCH_QUESTION_COUNT} preguntas sobre tu presupuesto, clima ideal, idioma y estilo de vida, y descubre en segundos qué ciudad Erasmus encaja mejor contigo.`,
  });

  // Si la URL trae respuestas guardadas (?r=…), restaura directamente la
  // pantalla de resultados — permite compartir/guardar el enlace.
  useEffect(() => {
    const encoded = searchParams.get("r");
    if (!encoded) return;
    const restored = decodeAnswers(encoded);
    if (!restored) return;
    setAnswers(restored);
    setMust(decodeMust(searchParams.get("imp")));
    setStep(QUESTIONS.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showResults = step >= QUESTIONS.length;

  // Al cambiar de pregunta (o llegar a resultados) el foco va al título:
  // quien usa teclado o lector de pantalla oye la pregunta nueva.
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    (showResults ? resultsTitleRef : headingRef).current?.focus({ preventScroll: false });
    setLimitNotice(false);
  }, [step, showResults, started]);

  function goTo(nextAnswers, nextStep) {
    if (nextStep >= QUESTIONS.length) {
      setSearchParams(resultParams(nextAnswers, must), { replace: true });
      window.scrollTo(0, 0);
    }
    setStep(nextStep);
  }

  function chooseSingle(q, value) {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    goTo(next, step + 1);
  }

  /** Elegir en orden: toca para numerar (1º, 2º, 3º); vuelve a tocar para quitar y las demás se reordenan. */
  function toggleRanked(q, value) {
    // Actualización funcional: dos toques muy seguidos nunca pisan el estado.
    setAnswers((prev) => {
      const current = picksOf(prev[q.id]);
      if (current.includes(value)) return { ...prev, [q.id]: current.filter((v) => v !== value) };
      if (current.length >= MAX_RANKED) return prev;
      return { ...prev, [q.id]: [...current, value] };
    });
    const current = picksOf(answers[q.id]);
    setLimitNotice(!current.includes(value) && current.length >= MAX_RANKED);
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  // Cambiar una respuesta desde los chips de resultados: se recalcula y el
  // enlace compartible (?r=) refleja lo nuevo.
  function updateAnswer(qId, value) {
    const next = { ...answers, [qId]: value };
    setAnswers(next);
    setSearchParams(resultParams(next, must), { replace: true });
  }

  /** Marca/desmarca una pregunta clave como imprescindible (en el test o en los chips). */
  function setMustFor(qId, isMust) {
    const next = isMust ? [...new Set([...must, qId])] : must.filter((id) => id !== qId);
    setMust(next);
    if (step >= QUESTIONS.length) setSearchParams(resultParams(answers, next), { replace: true });
  }

  function restart() {
    setMust([]);
    setAnswers({});
    setStep(0);
    setStarted(true); // repetir el test va directo a la primera pregunta, sin portada
    setSearchParams({}, { replace: true });
  }

  // Imprescindibles que filtran de verdad (marcados y con una respuesta que descarta algo).
  const mustIds = useMemo(() => activeMustHaves(answers, must), [answers, must]);

  const matches = useMemo(() => {
    if (!showResults) return [];
    return cityPool(answers.destino)
      .map((c) => ({ ...computeMatch(c, answers), failed: failedMustHaves(c, answers, mustIds) }))
      .sort((a, b) => b.percent - a.percent || b.overall - a.overall);
  }, [showResults, answers, mustIds]);

  // Las que cumplen TODOS los imprescindibles, por % de match.
  const top = useMemo(() => matches.filter((m) => m.failed.length === 0).slice(0, 5), [matches]);
  // Si quedan menos de 5 (o ninguna), las que más se acercan: menos
  // condiciones incumplidas primero y, a igualdad, mejor match. Cada una dice
  // qué imprescindible no cumple.
  const near = useMemo(() => {
    if (!mustIds.length || top.length >= 5) return [];
    return matches
      .filter((m) => m.failed.length > 0)
      .sort((a, b) => a.failed.length - b.failed.length || b.percent - a.percent || b.overall - a.overall)
      .slice(0, 5 - top.length);
  }, [matches, mustIds, top]);
  const shown = [...top, ...near];

  /* ─── RESULTADOS ────────────────────────────────────────────────────── */
  if (showResults) {
    // Top 3 para comparar/compartir: lo que se enseña (las que cumplen y, si
    // faltan, las que más se acercan).
    const lead = shown.slice(0, 3);
    const compareSlugs = lead.map((m) => m.city.slug).join(",");
    const answeredCount = QUESTIONS.filter((q) => isAnswered(answers[q.id])).length;
    const mustLabels = mustIds.map((id) => MUST_HAVES[id].label.toLowerCase());
    const sharePath = `/city-match?${new URLSearchParams(resultParams(answers, must)).toString()}`;

    let subtitle;
    if (answeredCount === 0) subtitle = "No marcaste preferencias: te mostramos los destinos mejor valorados.";
    else {
      subtitle = `Calculado a partir de tus ${answeredCount} ${answeredCount === 1 ? "preferencia" : "preferencias"} y los datos de cada destino.`;
      if (mustIds.length) {
        subtitle += ` ${mustIds.length === 1 ? "Imprescindible" : "Imprescindibles"}: ${mustLabels.join(", ")}.`;
      }
    }

    const renderCard = (m, i, isNear) => {
      // Lo que incumple un imprescindible ya sale en «No cumple»: ni motivo
      // positivo ni «Ten en cuenta». Y un motivo positivo solo si encaja de verdad.
      const failedIds = new Set(m.failed.map((f) => f.id));
      const own = m.results.filter((r) => !failedIds.has(r.id));
      const bestReasons = own.filter((r) => r.sim >= 0.5).sort((a, b) => b.sim * b.weight - a.sim * a.weight).slice(0, 2);
      const weakest = own.filter((r) => r.weight === 1).sort((a, b) => a.sim - b.sim)[0];
      const podium = !isNear && i < 3;

      return (
        <div key={m.city.slug} className={`${styles.resultCard}${!isNear && i === 0 ? ` ${styles.resultCardTop}` : ""}${isNear ? ` ${styles.resultCardNear}` : ""}`}>
          <div className={styles.resultRank}>{podium ? <IconMedalla size={28} tone={i === 0 ? "gold" : i === 1 ? "silver" : "bronze"} /> : `#${i + 1}`}</div>

          <div className={styles.resultImg}>
            <img className={styles.resultImgPhoto} {...responsiveImage(m.city.img, { slots: RESULT_PHOTO_SLOTS })} alt="" width={320} height={400} loading="lazy" decoding="async" />
            <div className={styles.resultImgOverlay} />
            <PhotoCredit src={m.city.img} corner="bottom-right" />
          </div>

          <div className={styles.resultBody}>
            <div className={styles.resultHead}>
              <div>
                <h2 className={styles.resultName}><Flag emoji={m.city.emoji} /> {m.city.name}</h2>
                <span className={styles.resultCountry}>{m.city.country}</span>
              </div>
              <div className={styles.resultHeadRight}>
                <ScoreRing score={m.overall} size={48} showLabel={false} animate={false} />
                <div className={styles.matchBadge}>
                  <span className={styles.matchPercent}>{m.percent}%</span>
                  <span className={styles.matchLabel}>match</span>
                </div>
              </div>
            </div>

            <div className={styles.matchBar}>
              <div className={styles.matchBarFill} style={{ width: `${m.percent}%` }} />
            </div>

            {isNear && (
              <div className={styles.mustFail}>
                <p className={styles.mustFailTitle}><IconAlerta size={18} /> No cumple {m.failed.length === 1 ? "este imprescindible" : "estos imprescindibles"}:</p>
                <ul className={styles.mustFailList}>
                  {m.failed.map((f) => (
                    <li key={f.id}><strong>{f.label}:</strong> {f.text}.</li>
                  ))}
                </ul>
              </div>
            )}

            <ul className={styles.reasonList}>
              {!isNear && mustIds.length > 0 && (
                <li className={styles.reasonMust} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <IconCheck size={18} /> Cumple {mustIds.length === 1 ? "tu imprescindible" : `tus ${mustIds.length} imprescindibles`}: {mustLabels.join(", ")}
                </li>
              )}
              {bestReasons.map((r) => (
                <li key={r.id} style={{ display: "flex", alignItems: "center", gap: 6 }}><r.Icon size={18} /> {m.city.name} {r.reason}</li>
              ))}
              {weakest && weakest.sim < 0.4 && (
                <li className={styles.reasonCaveat} style={{ display: "flex", alignItems: "center", gap: 6 }}><weakest.Icon size={18} /> Ten en cuenta: {weakest.caveat || "aquí es donde menos encaja con lo que buscas"}</li>
              )}
            </ul>

            <Link className={`${styles.resultBtn} link-btn`} to={`/city/${m.city.slug}`}>
              Ver guía completa →
            </Link>
          </div>
        </div>
      );
    };

    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.resultsMain}>
          <div className={styles.resultsHero}>
            <div className={styles.resultsHeroBg} />
            <div className={styles.resultsHeroContent}>
              <span className={styles.badge} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IconCityMatch size={18} /> Tu City Match</span>
              <h1 className={styles.resultsTitle} ref={resultsTitleRef} tabIndex={-1}>
                {top.length > 0 ? "Estas son tus ciudades ideales" : "Ninguna ciudad cumple todo lo imprescindible"}
              </h1>
              <p className={styles.resultsSubtitle}>{subtitle}</p>
              <div className={styles.resultsActions}>
                <button className={styles.secondaryBtn} onClick={restart}>↺ Volver a hacer el test</button>
                {shown.length > 0 && (
                  <ShareButton
                    className={`${styles.secondaryBtn} ${styles.shareBtn}`}
                    path={sharePath}
                    title="Mi City Match en MAbroad"
                    text={`Mis ciudades Erasmus ideales según City Match: ${lead.map((m, i) => `${i + 1}. ${m.city.name} (${m.percent}%)`).join(", ")}.`}
                  >
                    Compartir resultado
                  </ShareButton>
                )}
                {compareSlugs && (
                  <Link className={`${styles.primaryBtn} link-btn`} to={`/comparar?cities=${compareSlugs}`}>
                    Comparar tu top {lead.length} →
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className={styles.resultsBody}>
            <AnswerChips answers={answers} must={must} onChange={updateAnswer} onMustChange={setMustFor} />

            {top.map((m, i) => renderCard(m, i, false))}

            {/* Imprescindibles demasiado estrictos: las que más se acercan, con
                lo que no cumplen dicho con su dato. */}
            {near.length > 0 && (
              <section className={styles.nearSection} aria-labelledby="city-match-near">
                <h2 id="city-match-near" className={styles.nearTitle}>
                  {top.length === 0 ? "Las que más se acercan" : "Casi encajan"}
                </h2>
                <p className={styles.nearText}>
                  {top.length === 0
                    ? "Ningún destino cumple a la vez todos tus imprescindibles. Estas son las ciudades que fallan en menos condiciones; cada una te dice cuál no cumple. Si quitas un imprescindible (toca su respuesta arriba), los resultados se recalculan."
                    : `Solo ${top.length === 1 ? "1 ciudad cumple" : `${top.length} ciudades cumplen`} todos tus imprescindibles. Estas se quedan cerca, pero fallan en alguno:`}
                </p>
                {near.map((m, i) => renderCard(m, top.length + i, true))}
              </section>
            )}

            {/* ¿Y ahora? — el resultado no es el final: tres siguientes pasos
                con lo que ya sabemos (tu top 3 y tu ciudad nº 1). */}
            {shown.length > 0 && (
              <section className={styles.nextSteps} aria-labelledby="city-match-next">
                <h2 id="city-match-next" className={styles.nextTitle}>¿Y ahora?</h2>
                <div className={styles.nextGrid}>
                  {lead.length >= 2 && (
                    <Link className={styles.nextCard} to={`/comparar?cities=${compareSlugs}&view=compare`}>
                      <span className={styles.nextIcon}><IconComparar size={34} /></span>
                      <span className={styles.nextCardTitle}>Compara tu top {lead.length}</span>
                      <span className={styles.nextCardDesc}>
                        {lead.map((m) => m.city.name).join(", ")}: coste en euros, notas y diferencias, lado a lado.
                      </span>
                      <span className={styles.nextArrow} aria-hidden="true">→</span>
                    </Link>
                  )}
                  <Link className={styles.nextCard} to="/beca-erasmus">
                    <span className={styles.nextIcon}><IconBeca size={34} /></span>
                    <span className={styles.nextCardTitle}>Calcula tu beca</span>
                    <span className={styles.nextCardDesc}>
                      {isErasmusEligible(shown[0].city)
                        ? `Cuánto cobrarías al mes en ${shown[0].city.name} y cuánto tendrías que poner tú.`
                        : "Cuánto cobrarías al mes con Erasmus+ y cuánto tendrías que poner tú."}
                    </span>
                    <span className={styles.nextArrow} aria-hidden="true">→</span>
                  </Link>
                  <Link className={styles.nextCard} to="/proceso">
                    <span className={styles.nextIcon}><IconProceso size={34} /></span>
                    <span className={styles.nextCardTitle}>Mira cómo es el proceso</span>
                    <span className={styles.nextCardDesc}>El Erasmus paso a paso, desde elegir destino hasta la vuelta.</span>
                    <span className={styles.nextArrow} aria-hidden="true">→</span>
                  </Link>
                </div>
              </section>
            )}
          </div>
        </main>
        {/* El siguiente paso ya va con tu top 3. */}
        <JourneySteps
          current="city-match"
          nextTo={lead.length >= 2 ? `/comparar?cities=${compareSlugs}&view=compare` : undefined}
          nextDesc={lead.length >= 2 ? `${lead.map((m) => m.city.name).join(", ")}, lado a lado.` : undefined}
        />
        <Footer />
      </div>
    );
  }

  /* ─── PORTADA ───────────────────────────────────────────────────────── */
  if (!started) {
    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.quizMain}>
          <div className={styles.quizBgBlur} aria-hidden="true" />
          <div className={styles.quizWrap}>
            <div className={`${styles.questionCard} ${styles.introCard}`}>
              <div className={styles.quizBrand}>
                <IconCityMatch size={26} />
                <span>City Match</span>
              </div>
              <h1 className={styles.introTitle}>Encuentra tu ciudad Erasmus ideal</h1>
              <p className={styles.introText}>
                Dinos qué buscas —presupuesto, clima, idioma, ambiente— y te enseñamos las cinco ciudades que mejor encajan contigo, con el porqué de cada una.
              </p>
              <ul className={styles.introFacts}>
                <li><strong>{CITY_MATCH_QUESTION_COUNT}</strong><span>preguntas</span></li>
                <li><strong>~2</strong><span>minutos</span></li>
                <li><strong>{ALL_CITIES.length}</strong><span>destinos</span></li>
              </ul>
              <button type="button" className={`${styles.continueBtn} ${styles.introStart}`} onClick={() => setStarted(true)}>
                Empezar →
              </button>
              <p className={styles.introNote}>
                Sin registro. Si una pregunta te da igual, puedes decirlo: no cuenta en el resultado. Y lo que no
                negocias (presupuesto, clima, idioma, ambiente o tamaño) lo puedes marcar como imprescindible.
              </p>
            </div>
          </div>
        </main>
        <JourneySteps current="city-match" />
        <Footer />
      </div>
    );
  }

  /* ─── CUESTIONARIO ──────────────────────────────────────────────────── */
  const q = QUESTIONS[step];
  const progress = (step / QUESTIONS.length) * 100;
  const picks = q.multi ? picksOf(answers[q.id]) : [];
  const neutralActive = answers[q.id] === NEUTRAL;
  const realOptions = q.options.filter((o) => o.value !== NEUTRAL);
  const neutralOption = q.options.find((o) => o.value === NEUTRAL);

  const rankedSummary = picks.map((v, i) => `${ORDINALS[i]} ${optionOf(q.id, v)?.label}`).join(" · ");

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.quizMain}>
        <div className={styles.quizBgBlur} aria-hidden="true" />
        <div className={styles.quizWrap}>
          <div className={styles.quizBrand}>
            <IconCityMatch size={26} />
            <span>City Match</span>
          </div>

          <div className={styles.progressTrack} aria-hidden="true">
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressLabel}>Pregunta {step + 1} de {QUESTIONS.length}</span>

          <div className={styles.questionCard} key={q.id}>
            <h1 className={styles.questionTitle} id={titleId} ref={headingRef} tabIndex={-1}>{q.title}</h1>
            {q.subtitle && <p className={styles.questionSubtitle}>{q.subtitle}</p>}

            {/* Preguntas clave: antes de responder se elige si es un filtro duro
                (las de respuesta única avanzan al tocar una opción). */}
            {MUST_HAVES[q.id] && (
              <ImportanceToggle
                qId={q.id}
                answer={answers[q.id]}
                isMust={must.includes(q.id)}
                onChange={(isMust) => setMustFor(q.id, isMust)}
              />
            )}

            {q.multi && (
              <p className={styles.rankHint} id={hintId} aria-live="polite">
                {limitNotice
                  ? "Máximo 3. Toca una de las elegidas para quitarla."
                  : picks.length
                    ? <>Tu orden: <strong>{rankedSummary}</strong></>
                    : "Puedes elegir hasta 3, en orden de preferencia: tócalas por orden."}
              </p>
            )}

            <div
              role="group"
              aria-labelledby={titleId}
              aria-describedby={q.multi ? hintId : undefined}
              className={`${styles.optionsGrid}${realOptions.length > 4 ? ` ${styles.optionsGridCompact}` : ""}`}
            >
              {realOptions.map((opt) => {
                if (!q.multi) {
                  const active = answers[q.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={active}
                      className={`${styles.optionBtn}${active ? ` ${styles.optionBtnActive}` : ""}`}
                      onClick={() => chooseSingle(q, opt.value)}
                    >
                      <span className={styles.optionBtnGlow} />
                      <span className={styles.optionLabel}>{opt.label}</span>
                      {opt.desc && <span className={styles.optionDesc}>{opt.desc}</span>}
                    </button>
                  );
                }
                const rank = picks.indexOf(opt.value);
                const ranked = rank >= 0;
                const full = !ranked && picks.length >= MAX_RANKED;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={ranked}
                    aria-disabled={full || undefined}
                    className={`${styles.optionBtn}${ranked ? ` ${styles.optionBtnActive} ${styles.optionBtnRanked}` : ""}${full ? ` ${styles.optionBtnFull}` : ""}`}
                    onClick={() => toggleRanked(q, opt.value)}
                  >
                    <span className={styles.optionBtnGlow} />
                    <span className={styles.optionLabel}>
                      {opt.label}
                      {ranked && <span className="sr-only">, tu {ORDINAL_WORDS[rank]} opción</span>}
                    </span>
                    {opt.desc && <span className={styles.optionDesc}>{opt.desc}</span>}
                    {ranked && <span className={styles.rankBadge} aria-hidden="true">{ORDINALS[rank]}</span>}
                  </button>
                );
              })}

              {neutralOption && (
                <button
                  type="button"
                  aria-pressed={neutralActive}
                  className={`${styles.optionBtn} ${styles.optionNeutral}${neutralActive ? ` ${styles.optionBtnActive}` : ""}`}
                  onClick={() => chooseSingle(q, NEUTRAL)}
                >
                  <span className={styles.optionLabel}>{neutralOption.label}</span>
                  <span className={styles.optionDesc}>No suma ni resta en tu resultado</span>
                </button>
              )}
            </div>

            <div className={styles.quizNav}>
              {step > 0 ? (
                <button type="button" className={styles.backLink} onClick={goBack}>← Anterior</button>
              ) : <span />}
              {q.multi && (
                <button
                  type="button"
                  className={styles.continueBtn}
                  disabled={!picks.length}
                  onClick={() => goTo(answers, step + 1)}
                >
                  {step === QUESTIONS.length - 1 ? "Ver mis ciudades →" : "Continuar →"}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
