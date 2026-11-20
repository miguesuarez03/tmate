// ─────────────────────────────────────────────────────────────────────────────
// Lógica del modo «Mi universidad»: qué convenios de una universidad valen
// para un grado, a qué ciudad de MAbroad pertenece cada uno y cómo se resumen
// en tarjetas y fichas. Los datos (convenios + mapeo a ciudades) viven en
// src/data/universities/ y se cargan bajo demanda (ver registry.js); el estado
// (universidad, grado y campus elegidos) en src/hooks/useUniversity.jsx.
//
// Se habla de «convenios», no de «plazas»: el portal da cada acuerdo con una
// universidad de destino, pero no cuántas plazas tiene cada uno.
// ─────────────────────────────────────────────────────────────────────────────

import { UNIVERSITY_REGISTRY } from "../data/universities/registry.js";

/** Etiqueta corta de cada tipo de convenio (las tarjetas no caben más). */
const SHORT_AGREEMENT = {
  "Erasmus-SMS": "Erasmus+",
  "Bilateral studies": "Bilateral",
  SICUE: "SICUE",
  "MAGIS exchange": "MAGIS",
};

/** @param {string} type  agreementType de un convenio */
export function getAgreementLabel(type) {
  return SHORT_AGREEMENT[type] ?? type;
}

/**
 * ¿Es un convenio de estudios (cuatrimestre o curso)? Lo decide el registro
 * de cada universidad (`studyAgreementTypes`); sin lista, todos lo son.
 * @param {any} rel
 * @param {{ studyAgreementTypes?: string[] } | null | undefined} entry
 */
export function isStudyRelation(rel, entry) {
  const types = entry?.studyAgreementTypes;
  return !types || types.includes(rel.agreementType);
}

/**
 * ¿El convenio vale para ese grado? Sin grado elegido, todos. Los que no dicen
 * para qué titulaciones son (degreesUnspecified) se enseñan siempre, con la
 * etiqueta «Consulta en tu oficina de RRII».
 */
export function relationMatchesDegree(rel, degreeId) {
  if (!degreeId) return true;
  return Boolean(rel.degreesUnspecified) || (rel.degreeIds ?? []).includes(degreeId);
}

/** Nombre del grado (o null si no existe en los datos de la universidad). */
export function getDegreeName(data, degreeId) {
  return data?.degrees?.find((d) => d.id === degreeId)?.name ?? null;
}

/**
 * Nombre corto del grado para el chip de la cabecera: la sigla entre
 * paréntesis si la hay («… (ADE)» → «ADE»), si no el nombre entero (el chip
 * lo recorta con puntos suspensivos).
 */
export function getDegreeShortName(name, id = null) {
  if (!name) return null;
  const m = String(name).match(/\(([^)]{2,12})\)\s*$/);
  if (m) return m[1];
  // Ids que ya son siglas (giti, rrii, cadv…): en mayúsculas. No lo son los
  // que forman parte del nombre («datos», «musica» en «Musical»…).
  const folded = String(name).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  if (id && /^[a-z]{2,6}$/.test(id) && !folded.includes(id)) return id.toUpperCase();
  return String(name);
}

const fold = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/** ¿Cada palabra de `query` está en alguno de los textos? (sin tildes ni mayúsculas) */
function matchesWords(query, ...texts) {
  const words = fold(query).split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const hay = fold(texts.join(" "));
  return words.every((w) => hay.includes(w));
}

/**
 * Paso 1 del buscador «Tu uni y grado»: universidades que coinciden con lo
 * escrito (nombre, nombre corto o id). Sin texto, todas, por nombre.
 * @returns {import("../data/universities/registry.js").UniversityEntry[]}
 */
export function searchUniversities(query, registry = UNIVERSITY_REGISTRY) {
  return registry
    .filter((u) => matchesWords(query, u.name, u.shortName, u.id))
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

/**
 * Paso 2: grados de una universidad que coinciden con lo escrito (nombre,
 * sigla o id: «ADE», «ingenieria»…), en el orden de la universidad.
 * @returns {{ id: string, name: string, short: string }[]}
 */
export function searchDegrees(entry, query) {
  return (entry?.degrees ?? [])
    .map((d) => ({ id: d.id, name: d.name, short: getDegreeShortName(d.name, d.id) }))
    .filter((d) => matchesWords(query, d.name, d.id, d.short));
}

const groupKey = (rel) => `${rel.countryCode}|${rel.city}`;

function groupByCity(relations) {
  const byKey = new Map();
  for (const rel of relations) {
    const key = groupKey(rel);
    if (!byKey.has(key)) byKey.set(key, { key, city: rel.city, country: rel.country, relations: [] });
    byKey.get(key).relations.push(rel);
  }
  return [...byKey.values()].sort(
    (a, b) => b.relations.length - a.relations.length || a.city.localeCompare(b.city, "es")
  );
}

/**
 * Convenios de la universidad que valen para el grado:
 *   · bySlug    convenios de estudios en ciudades con ficha
 *   · pending   de estudios, fuera de España, en ciudades sin ficha
 *   · domestic  de estudios en España (SICUE): «próximamente», sin ficha
 *   · other     de programas que no son de estudios (MAGIS…), agrupados por
 *               tipo; no cuentan en contadores, mapa, comparador ni City Match
 * @param {any} data      <id>.json
 * @param {Record<string, string | null>} mapping  relationId → slug
 * @param {string | null} degreeId
 * @param {{ studyAgreementTypes?: string[] } | null} [entry]  registro de la universidad
 */
export function buildUniversityView(data, mapping, degreeId, entry = null) {
  const bySlug = new Map();
  const unmatched = [];
  const otherByType = new Map();
  for (const rel of data?.relations ?? []) {
    if (!relationMatchesDegree(rel, degreeId)) continue;
    if (!isStudyRelation(rel, entry)) {
      if (!otherByType.has(rel.agreementType)) otherByType.set(rel.agreementType, []);
      otherByType.get(rel.agreementType).push(rel);
      continue;
    }
    const slug = mapping?.[rel.relationId] ?? null;
    if (slug) {
      if (!bySlug.has(slug)) bySlug.set(slug, []);
      bySlug.get(slug).push(rel);
    } else {
      unmatched.push(rel);
    }
  }
  const groups = groupByCity(unmatched);
  // España (sobre todo SICUE) queda fuera de MAbroad por ahora: no son
  // «fichas en preparación», sino un bloque aparte «próximamente».
  const pending = groups.filter((g) => !isDomesticGroup(g));
  const domestic = groups.filter(isDomesticGroup);
  const other = [...otherByType.entries()].map(([type, relations]) => ({
    type,
    label: getAgreementLabel(type),
    name: data?.agreementTypes?.[type] ?? getAgreementLabel(type),
    relations,
    groups: groupByCity(relations),
  }));
  return { bySlug, slugs: new Set(bySlug.keys()), pending, domestic, other };
}

/** País de los destinos nacionales (SICUE): MAbroad todavía no tiene fichas en España. */
export const DOMESTIC_COUNTRY_CODE = "ES";

/** ¿El grupo de convenios es de una ciudad española? */
export function isDomesticGroup(group) {
  return group.relations.some((r) => r.countryCode === DOMESTIC_COUNTRY_CODE);
}

/** Resumen para el distintivo de una tarjeta: nº de convenios y tipos. */
export function summarizeRelations(relations = []) {
  const types = [...new Set(relations.map((r) => getAgreementLabel(r.agreementType)))];
  return { count: relations.length, types };
}

/** «1 convenio» / «4 convenios». */
export function formatAgreementCount(n) {
  return `${n} convenio${n === 1 ? "" : "s"}`;
}

/** Texto del distintivo: «3 convenios · Erasmus+ · Bilateral». */
export function formatPlacesBadge(relations = []) {
  const { count, types } = summarizeRelations(relations);
  if (!count) return "";
  return [formatAgreementCount(count), ...types].join(" · ");
}

// ─── Textos del portal: limpieza sin tocar los datos ────────────────────────
// El portal mezcla español e inglés, separa con «||» y trae alguna errata.
// Aquí solo se ordena y se traduce la etiqueta; las cifras y lo que dicen
// no cambian.

/** Erratas y etiquetas del portal → forma limpia (mismo dato). */
const PORTAL_FIXES = [
  [/\bagaingst\b|\bagainsgt\b/gi, "against"],
  [/\baccomodation\b/gi, "accommodation"],
  [/^see factsheet\.?$/i, "Más detalles en el factsheet de la universidad"],
  [/\bsee factsheet\b/gi, "más detalles en el factsheet de la universidad"],
  [/\bper month\b/gi, "al mes"],
  [/\bEuros?\b/gi, "€"],
  [/\bIngles\b/g, "Inglés"],
  [/\bAleman\b/g, "Alemán"],
  [/\bitaliano\b/g, "italiano"],
  [/\bredidencias\b/g, "residencias"],
  [/\basigntauras\b/g, "asignaturas"],
  [/\bEUR\b/g, "€"],
  [/(\d)\s*€/g, "$1 €"],
  [/\baprox\.?\s*/gi, "aprox. "],
  [/\bca\.\s*/g, "aprox. "],
  [/\s*--\s*/g, ". "],
];

/** Texto del portal ordenado: sin «||» sueltos, espacios dobles ni erratas conocidas. */
const URL_RE = /https?:\/\/[^\s]+/g;

export function cleanPortalText(text) {
  const raw = String(text ?? "").replace(/\s+/g, " ").trim();
  if (!raw || /^(not applicable|n\/a|-|refer to (the )?link below\.?)$/i.test(raw)) return null;
  // Las URL no se tocan: se apartan, se limpia el texto y se vuelven a poner.
  const urls = [];
  let t = raw.replace(URL_RE, (u) => `\u0000${urls.push(u) - 1}\u0000`);
  for (const [re, to] of PORTAL_FIXES) t = t.replace(re, to);
  t = t.replace(/\s*\|\|\s*/g, ". ").replace(/\.\s*\./g, ".").replace(/\s+([.,;:])/g, "$1").replace(/\s{2,}/g, " ").trim();
  // «Inglés B2 or Alemán B1» → «o» entre dos requisitos de idioma.
  t = t.replace(/([A-C][12])\s+or\s+(?=[A-ZÁÉÍÓÚ])/g, "$1 o ");
  // Mayúscula al empezar cada frase.
  t = t.replace(/(^|[.!?]\s+)([a-záéíóúñ])/g, (m, p, c) => p + c.toUpperCase());
  return t.replace(/\u0000(\d+)\u0000/g, (m, i) => urls[Number(i)]);
}

// Un trozo es de alojamiento si empieza por la etiqueta («Accomodation: …»,
// «For accomodation …», «Rent …») o dice «… en alojamiento». Un total que
// «incluye la residencia» sigue siendo coste de vida.
const HOUSING = /^(?:for\s+)?(?:alojamiento|accom+odation|housing|rent\b|alquiler)|\ben alojamiento\b/i;
const HOUSING_LABEL = /^(?:for\s+|en\s+)?(?:alojamiento|accom+odation)\s*:?\s*/i;

/**
 * Coste de vida y alojamiento de un convenio, por separado. El portal los
 * mezcla en `monthlyCost` («Aprox. 800€ || Accomodation: aprox. 350€») y a
 * veces da el alquiler aparte (`rentPrice`).
 * @returns {{ living: string | null, housing: string | null }}
 */
export function splitPortalCosts(rel) {
  const parts = String(rel?.monthlyCost ?? "")
    .split(/\s*\|\|\s*|(?<=€)\.\s+|(?<=\d)\.\s+(?=[A-ZÁÉÍÓÚ])/)
    .map((p) => p.trim())
    .filter(Boolean);
  const living = parts.filter((p) => !HOUSING.test(p));
  const fromCost = parts.filter((p) => HOUSING.test(p)).map((p) => cleanPortalText(p.replace(HOUSING_LABEL, "")));
  // El alquiler que da el portal aparte, más lo que dice el coste sobre el
  // alojamiento, sin repetir.
  const housing = [...new Set([cleanPortalText(rel?.rentPrice), ...fromCost].filter(Boolean))].join(" · ") || null;
  return { living: cleanPortalText(living.join(". ")), housing };
}

/** Partes de un texto con enlaces: [{ text } | { url }] (las URL del portal, como enlace). */
export function linkifyParts(text) {
  const out = [];
  let last = 0;
  for (const m of String(text ?? "").matchAll(URL_RE)) {
    if (m.index > last) out.push({ text: text.slice(last, m.index) });
    // La puntuación final (y un «)» sin su «(») no es parte del enlace: se
    // queda como texto.
    let url = m[0];
    let tail = "";
    for (;;) {
      const strip = /[.,;:!?]$/.test(url) || (url.endsWith(")") && !url.includes("("));
      if (!strip) break;
      tail = url.slice(-1) + tail;
      url = url.slice(0, -1);
    }
    out.push({ url });
    if (tail) out.push({ text: tail });
    last = m.index + m[0].length;
  }
  if (last < String(text ?? "").length) out.push({ text: text.slice(last) });
  return out;
}

/** Recorta un texto largo del portal a una línea legible. */
export function clipText(text, max = 90) {
  const t = String(text ?? "").replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
}

/**
 * Datos de la tarjeta «Ficha en preparación» de una ciudad sin ficha:
 * universidades (sin repetir), idioma requerido y coste que da el portal.
 */
export function getPendingCardInfo(group) {
  const rels = group.relations;
  const universities = [...new Set(rels.map((r) => r.university))];
  const languages = [...new Set(rels.map((r) => cleanPortalText(r.languageRequirement)).filter(Boolean).map((l) => clipText(l, 70)))];
  const cost = rels.map((r) => splitPortalCosts(r).living).find(Boolean) ?? null;
  return {
    universities,
    language: languages[0] ?? null,
    moreLanguages: Math.max(0, languages.length - 1),
    cost: cost ? clipText(cost, 80) : null,
    ...summarizeRelations(rels),
  };
}

// ─── Observaciones: notas de la universidad y opiniones de alumnos ──────────
// El portal mezcla en un mismo campo observaciones de la universidad
// («Algunas asignaturas en alemán») y opiniones de antiguos alumnos
// («Un alumno dice: ¨…¨»). Se separan para que se vea qué es cada cosa: las
// opiniones se publican (con permiso de la universidad), siempre como de
// alumnos y nunca como de la universidad, y sin nombres ni datos de contacto.

// «Un alumno que hizo Erasmus aquí comenta:», «Estudiantes de otros años
// recomiendan:», «Sobre el alojamiento, estudiante dice:»… Sin comas ni puntos
// entre el sujeto y el verbo, y nunca «se recomienda» (impersonal: es de la
// universidad).
// También «Alumno que hizo movilidad en esa institución: "…"» (sin verbo, pero
// con dos puntos y la opinión entre comillas).
// Con «Sobre alojamiento, …» delante, el tema se queda en la opinión.
const STUDENT_INTRO =
  /(?:\b(?:(?:y|también)\s+)?sobres?\s+(?<topic>[^.,:;¨"“”\n]{1,60}?)[,:]?\s+)?(?:\b(?:un|una|el|la|los|las|múltiples|varios|varias|algunos|algunas)\s+)?\b(?:alumn[oa]s?|estudiantes?)\b(?:[^.,:;¨"“”\n]{0,80}?(?<!\bse\s)\b(?:dice|dicen|comenta|comentan|recomienda|recomiendan|opina|opinan|cuenta|cuentan|afirma|afirman|menciona|mencionan)\b\s*[:.]?|[^.,:;¨"“”\n]{0,80}?:(?=\s*[¨"“«]))\s*/giu;
const OPEN_QUOTES = new Set(["¨", '"', "“", "«"]);
// El portal mezcla comillas (abre con ¨ y cierra con "): vale cualquiera.
const CLOSE_QUOTES = ["¨", '"', "”", "»"];
// Tras una cita, otra cita seguida es de los mismos alumnos:
// «"…" y también "…"», «¨…¨. ¨…¨», «"…" "…"».
const NEXT_QUOTE = /^\s*[.,;]?\s*(?:y\s+(?:también\s+)?)?(?=[¨"“«])/u;

/** Posición de la comilla que cierra una cita que empieza en `start` (o -1). */
function closingQuote(src, start) {
  const found = CLOSE_QUOTES.map((c) => src.indexOf(c, start)).filter((i) => i >= 0);
  return found.length ? Math.min(...found) : -1;
}

/** Quita correos, teléfonos y URLs de una opinión (datos de contacto personales). */
export function scrubPersonalData(text) {
  return String(text)
    .replace(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, "[dato personal eliminado]")
    .replace(/(?:\+\d{1,3}[\s-]?)?(?:\d[\s-]?){8,}\d/g, "[dato personal eliminado]");
}

const clean = (s) => String(s).replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, "\n").trim();

/**
 * Parte unas observaciones en trozos de la universidad y opiniones de alumnos.
 * Los casos que la regla no puede separar (p. ej. un párrafo de un alumno en
 * primera persona sin «alumno dice:») van a mano en `overrides`
 * (<id>.notes.json: { relationId: [{ kind, text }] }), ver getRelationNotes().
 * @param {string | null | undefined} text
 * @returns {{ kind: "university" | "student", text: string }[]}
 */
export function splitNotes(text) {
  const src = String(text ?? "");
  const parts = [];
  const push = (kind, t) => {
    const c = clean(kind === "student" ? scrubPersonalData(t) : t).replace(/^[\s.,;:]+|[\s,;:]+$/g, "");
    if (c) parts.push({ kind, text: c });
  };
  let pos = 0;
  STUDENT_INTRO.lastIndex = 0;
  let m;
  while ((m = STUDENT_INTRO.exec(src))) {
    push("university", src.slice(pos, m.index));
    const start = m.index + m[0].length;
    // «Sobre alojamiento, estudiante dice: …» → «Sobre alojamiento: …».
    let topic = m.groups?.topic ? `Sobre ${m.groups.topic.trim()}: ` : "";
    const pushStudent = (s) => {
      push("student", topic + s);
      topic = "";
    };
    if (OPEN_QUOTES.has(src[start])) {
      // Opinión entre comillas: hasta la comilla de cierre, y las citas que
      // vengan justo detrás («"…" y también "…"») también son de alumnos.
      let q = start;
      for (;;) {
        // «¨"…"¨»: varias comillas de apertura seguidas cuentan como una.
        while (OPEN_QUOTES.has(src[q + 1])) q += 1;
        const close = closingQuote(src, q + 1);
        pushStudent(src.slice(q + 1, close < 0 ? src.length : close));
        pos = close < 0 ? src.length : close + 1;
        const next = NEXT_QUOTE.exec(src.slice(pos));
        if (close < 0 || !next) break;
        q = pos + next[0].length;
      }
    } else {
      // Sin comillas: hasta la siguiente opinión o el final.
      STUDENT_INTRO.lastIndex = start;
      const next = STUDENT_INTRO.exec(src);
      const end = next ? next.index : src.length;
      pushStudent(src.slice(start, end));
      pos = end;
    }
    STUDENT_INTRO.lastIndex = pos;
  }
  push("university", src.slice(pos));
  return parts;
}

/**
 * Observaciones de un convenio ya separadas: las de `overrides` (a mano) si
 * las hay, si no las de splitNotes().
 * @param {{ relationId: string, notes?: string | null }} rel
 * @param {Record<string, { kind: "university" | "student", text: string }[]> | null} [overrides]
 */
export function getRelationNotes(rel, overrides = null) {
  const manual = overrides?.[rel.relationId];
  if (manual) return manual.map((p) => ({ kind: p.kind, text: p.kind === "student" ? scrubPersonalData(p.text) : p.text }));
  return splitNotes(rel.notes);
}

/** Etiqueta de las opiniones de alumnos. */
export function studentQuoteLabel(shortName) {
  return `Antiguo alumno de ${shortName} en este destino`;
}

// ─── Invitación y campus ─────────────────────────────────────────────────────

/**
 * Texto de la invitación a elegir universidad. Genérico siempre, salvo en la
 * ficha, donde da el dato («Loyola tiene 4 convenios aquí»).
 * @param {{ cityUniversity?: { shortName: string, count: number } | null }} [opts]
 */
export function getInviteText({ cityUniversity = null } = {}) {
  if (cityUniversity) {
    return {
      title: `${cityUniversity.shortName} tiene ${formatAgreementCount(cityUniversity.count)} aquí.`,
      cta: "Elige tu grado",
    };
  }
  return { title: "", cta: "Elige tu universidad y tu grado y ve solo tus destinos" };
}

/** Campus de una universidad por id (o null). */
export function getCampus(entry, campusId) {
  return entry?.campuses?.find((c) => c.id === campusId) ?? null;
}

/** Enlace para compartir el modo universidad: /?uni=loyola&grado=giti */
export function getUniversityShareUrl(origin, uniId, degreeId) {
  const params = new URLSearchParams({ uni: uniId });
  if (degreeId) params.set("grado", degreeId);
  return `${origin}/?${params.toString()}`;
}

/** «13/11/2026» a partir de «2026-11-13». */
export function formatExtractedAt(iso) {
  const m = String(iso ?? "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : String(iso ?? "");
}
