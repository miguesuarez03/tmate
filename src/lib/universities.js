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
export function getDegreeShortName(name) {
  if (!name) return null;
  const m = String(name).match(/\(([^)]{2,12})\)\s*$/);
  return m ? m[1] : String(name);
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
  const languages = [...new Set(rels.map((r) => r.languageRequirement).filter(Boolean).map((l) => clipText(l, 70)))];
  const cost = rels.map((r) => r.monthlyCost).find(Boolean) ?? null;
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
 * Texto de la invitación a elegir universidad. Con una sola universidad en
 * el registro, la nombra; con varias, es genérico.
 * @param {{ count?: number, cityUniversity?: { shortName: string, count: number } | null }} [opts]
 */
export function getInviteText({ cityUniversity = null } = {}, registry = UNIVERSITY_REGISTRY) {
  if (cityUniversity) {
    return {
      title: `${cityUniversity.shortName} tiene ${formatAgreementCount(cityUniversity.count)} aquí.`,
      cta: "Elige tu grado",
    };
  }
  if (registry.length === 1) {
    return { title: `¿Eres de ${registry[0].shortName}?`, cta: "Elige tu grado y ve solo tus destinos" };
  }
  return { title: "¿Tu universidad está en MAbroad?", cta: "Elígela y ve solo tus destinos" };
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
