// ─────────────────────────────────────────────────────────────────────────────
// Lógica de las guías (/guias). Los datos viven en src/data/guides.js.
// ─────────────────────────────────────────────────────────────────────────────

// Solo lo importan las páginas de guías (lazy) y el prerender: así el texto de
// las guías va en su propio chunk y no en el bundle inicial.
import { GUIDES } from "../data/guides";
import { getGuidesIndexJsonLd, plainInline as plain } from "./seo";

/** @typedef {import('../types').Guide} Guide */

export const GUIDES_PATH = "/guias";

/** @returns {Guide[]} */
export function getGuides() {
  return GUIDES;
}

/** @returns {Guide | null} */
export function getGuideBySlug(slug) {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}

export function getGuidePath(guide) {
  return `${GUIDES_PATH}/${guide.slug}`;
}


function blockTexts(block) {
  switch (block.type) {
    case "p":
    case "note":
      return [block.text];
    case "list":
    case "checklist":
      return block.items;
    case "example":
      return [block.title, block.text, ...(block.items || [])].filter(Boolean);
    case "table":
      return [block.caption, ...(block.head || []), ...block.rows.flat()].filter(Boolean);
    default:
      return [];
  }
}

/** Palabras del cuerpo de la guía (intro + secciones). */
export function getGuideWordCount(guide) {
  const texts = [guide.intro, ...guide.sections.flatMap((s) => [s.heading, ...s.blocks.flatMap(blockTexts)])];
  return texts.map(plain).join(" ").split(/\s+/).filter(Boolean).length;
}

/** Minutos de lectura (≈ 200 palabras por minuto). */
export function getGuideReadingMinutes(guide) {
  return Math.max(1, Math.round(getGuideWordCount(guide) / 200));
}

/** Otras guías para enlazar al final de una guía. */
export function getOtherGuides(guide) {
  return GUIDES.filter((g) => g.slug !== guide.slug);
}

/** Fecha ISO (AAAA-MM-DD) → «10 de noviembre de 2026». */
export function formatGuideDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  return `${d} de ${months[m - 1]} de ${y}`;
}

/** Metadatos SEO de las páginas de guías (mismos en cliente y prerender). */
export const GUIDES_INDEX_META = {
  title: "Guías Erasmus: beca, Learning Agreement y trámites | MAbroad",
  description:
    "Guías prácticas para tu Erasmus con fuentes oficiales: cuánto se cobra de beca, Learning Agreement paso a paso, cómo elegir destino, papeles antes de irte y opciones fuera de Europa.",
};

/** JSON-LD del índice /guias (constante: la usan GuiasPage y el prerender). */
export const GUIDES_INDEX_JSON_LD = getGuidesIndexJsonLd(GUIDES);

export function getGuideMeta(guide) {
  return { title: guide.seoTitle, description: guide.description };
}
