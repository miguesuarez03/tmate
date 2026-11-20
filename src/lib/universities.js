// ─────────────────────────────────────────────────────────────────────────────
// Lógica del modo «Mi universidad»: qué plazas de una universidad valen para
// un grado, a qué ciudad de MAbroad pertenece cada una y cómo se resumen en
// tarjetas y fichas. Los datos (plazas + mapeo a ciudades) viven en
// src/data/universities/ y se cargan bajo demanda (ver registry.js); el estado
// (universidad y grado elegidos) en src/hooks/useUniversity.jsx.
// ─────────────────────────────────────────────────────────────────────────────

/** Etiqueta corta de cada tipo de convenio (las tarjetas no caben más). */
const SHORT_AGREEMENT = {
  "Erasmus-SMS": "Erasmus+",
  "Bilateral studies": "Bilateral",
  SICUE: "SICUE",
  "MAGIS exchange": "MAGIS",
};

/** @param {string} type  agreementType de una relación */
export function getAgreementLabel(type) {
  return SHORT_AGREEMENT[type] ?? type;
}

/**
 * ¿La plaza vale para ese grado? Sin grado elegido, todas. Las que no dicen
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
 * Plazas de la universidad que valen para el grado, repartidas entre ciudades
 * con ficha (`bySlug`) y ciudades que aún no la tienen (`pending`, agrupadas
 * por país + ciudad y ordenadas por número de plazas).
 * @param {any} data      <id>.json
 * @param {Record<string, string | null>} mapping  relationId → slug
 * @param {string | null} degreeId
 */
export function buildUniversityView(data, mapping, degreeId) {
  const bySlug = new Map();
  const pendingByKey = new Map();
  for (const rel of data?.relations ?? []) {
    if (!relationMatchesDegree(rel, degreeId)) continue;
    const slug = mapping?.[rel.relationId] ?? null;
    if (slug) {
      if (!bySlug.has(slug)) bySlug.set(slug, []);
      bySlug.get(slug).push(rel);
    } else {
      const key = `${rel.countryCode}|${rel.city}`;
      if (!pendingByKey.has(key)) pendingByKey.set(key, { key, city: rel.city, country: rel.country, relations: [] });
      pendingByKey.get(key).relations.push(rel);
    }
  }
  const groups = [...pendingByKey.values()].sort(
    (a, b) => b.relations.length - a.relations.length || a.city.localeCompare(b.city, "es")
  );
  // España (sobre todo SICUE) queda fuera de MAbroad por ahora: no son
  // «fichas en preparación», sino un bloque aparte «próximamente».
  const pending = groups.filter((g) => !isDomesticGroup(g));
  const domestic = groups.filter(isDomesticGroup);
  return { bySlug, slugs: new Set(bySlug.keys()), pending, domestic };
}

/** País de los destinos nacionales (SICUE): MAbroad todavía no tiene fichas en España. */
export const DOMESTIC_COUNTRY_CODE = "ES";

/** ¿El grupo de plazas es de una ciudad española? */
export function isDomesticGroup(group) {
  return group.relations.some((r) => r.countryCode === DOMESTIC_COUNTRY_CODE);
}

/** Resumen para el distintivo de una tarjeta: nº de plazas y tipos de convenio. */
export function summarizeRelations(relations = []) {
  const types = [...new Set(relations.map((r) => getAgreementLabel(r.agreementType)))];
  return { count: relations.length, types };
}

/** Texto del distintivo: «3 plazas · Erasmus+ · Bilateral». */
export function formatPlacesBadge(relations = []) {
  const { count, types } = summarizeRelations(relations);
  if (!count) return "";
  return [`${count} plaza${count === 1 ? "" : "s"}`, ...types].join(" · ");
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
