// ─────────────────────────────────────────────────────────────────────────────
// TMATE — Central Type Definitions
// Añadir nuevos campos aquí los propaga automáticamente a toda la app.
// ─────────────────────────────────────────────────────────────────────────────

// ── Precio de barrio ─────────────────────────────────────────────────────────
export type PriceLevel = '€' | '€€' | '€€€' | '€€€€';

// ── Tipos de programa Erasmus ─────────────────────────────────────────────────
export type ExperienceType = 'erasmus' | 'internship' | 'work-travel' | 'volunteering';

// ── Tipo de programa de intercambio (Erasmus+ vs. bilateral) ──────────────────
// Reino Unido es 'erasmus' (con erasmusFrom "2027-28", erasmusStatus confirmed);
// Suiza sigue 'switzerland_bilateral' con erasmusStatus pending.
export type ErasmusStatus = 'confirmed' | 'pending';
export type ProgramType = 'erasmus' | 'switzerland_bilateral' | 'study_abroad_usa_canada' | 'study_abroad_latam';

// ── Región geográfica ─────────────────────────────────────────────────────────
export type Region =
  | 'Europa del Sur'
  | 'Europa del Norte'
  | 'Europa del Este'
  | 'Europa Central'
  | 'Europa del Oeste'
  | 'Norteamérica'
  | 'Latinoamérica';

// ── Barrio ────────────────────────────────────────────────────────────────────
export interface Neighborhood {
  name: string;
  vibe: string;
  price: PriceLevel;
}

// ── Ciudad base (lo mínimo para cards y listados) ─────────────────────────────
export interface CityBase {
  slug: string;
  name: string;
  nameEn: string;
  country: string;
  emoji: string;
  region: Region;
  tag: string;
  phrase: string;
  costDetail: string;         // ej: "600–900€/mes"
  vibe: string;
  erasmus: number;            // score global 0-100
  weather: string;
  language: string;
  img: string;                // imagen para cards (800px)
  heroImg: string;            // imagen hero (1400px)
  experiences: ExperienceType[];
  programType: ProgramType;
  /** Curso desde el que el destino entra (o prevé entrar) en Erasmus+, p. ej. "2027-28". */
  erasmusFrom?: string;
  /** confirmed: acuerdo cerrado (ya cuenta como Erasmus+); pending: falta aprobación (no cuenta aún). */
  erasmusStatus?: ErasmusStatus;
}

// ── Ciudad completa (detalle de página) ──────────────────────────────────────
export interface City extends CityBase {
  description: string;
  highlights: string[];
  universities: string[];
  neighborhoods: Neighborhood[];
  tips: string[];
}

// ─── Scores e Insights ───────────────────────────────────────────────────────

export interface ScoreSubcategory {
  label: string;
  score: number;              // 0-10
  desc: string;
}

export interface ScoreItem {
  id: string;                 // identificador único: "coste", "fiesta", etc.
  label: string;
  icon: string;               // emoji
  score: number;              // 0-10
  summary: string;
  color: string;              // hex color para UI
  subcategories: ScoreSubcategory[];
}

// ─── Experiencias reales (src/data/cityExperiences.js) ───────────────────────

/** Tema de un consejo (claves de EXPERIENCE_TOPICS en cityExperiences.js). */
export type ExperienceTopic =
  | 'transporte' | 'alojamiento' | 'ocio' | 'compras' | 'apps' | 'universidad' | 'otros';

/** Un consejo concreto de un estudiante. */
export interface ExperienceTip {
  topic: ExperienceTopic;
  text: string;
}

/**
 * Experiencia real de un estudiante, aprobada a mano. Nunca lleva email.
 * Necesita `text`, `tips` o las dos cosas.
 */
export interface CityExperience {
  name: string;               // nombre o alias elegido por la persona
  anonymous?: boolean;        // true → se publica sin nombre («Estudiante de …»)
  homeUniversity: string;     // universidad de origen
  hostUniversity?: string;    // universidad de destino, si la dio
  course: string;             // curso del intercambio: "2026-27"
  text?: string;              // su experiencia, con sus palabras
  tips?: ExperienceTip[];     // sus consejos, por tema
  rating?: number;            // 1-5, opcional
}

/** Experiencia del fundador: real, pero no cuenta como opinión de la gente. */
export interface FounderExperience {
  name: string;
  role: string;
  studies: string;
  homeUniversity: string;
  hostUniversity: string;
  citySlug: string;
  course: string;             // curso del intercambio: "2026-27"
  photo: string | null;       // retrato en /public (vertical 4:5, 640×800)
  avatar?: string | null;     // recorte cuadrado de la cara (160×160)
  story: string[];            // párrafos de la portada
  short: string;              // versión corta para tarjetas
  tips?: ExperienceTip[];     // sus consejos de la ciudad, por tema
}

/** Experiencia lista para pintar: con su ciudad resuelta. */
export interface ExperienceEntry {
  name: string;               // ya resuelto: el alias o «Estudiante de …» si es anónima
  homeUniversity: string;
  hostUniversity: string;
  course: string;
  text: string;               // '' si solo dejó consejos
  tips: (ExperienceTip & { topicLabel: string })[];
  rating?: number;
  citySlug: string;
  cityName: string;
  cityEmoji: string;
  stayLabel: string;          // «Erasmus en Roma»
  founder?: boolean;
  role?: string;
  photo?: string | null;
}

export interface CityInsights {
  heroImg?: string;
  tagline?: string;
  atmosphere?: string;
  scores: ScoreItem[];
}

// ─── Índice ligero y ficha completa ──────────────────────────────────────────
// Generados en el build por scripts/city-data.mjs (src/data/generated/).

/** Lo que el navegador tiene de TODAS las ciudades desde el primer momento. */
export interface CityIndexEntry extends Pick<City,
  'slug' | 'name' | 'nameEn' | 'country' | 'emoji' | 'programType' | 'region' | 'tag' |
  'phrase' | 'costDetail' | 'vibe' | 'erasmus' | 'weather' | 'language' | 'img' | 'experiences' |
  'erasmusFrom' | 'erasmusStatus'> {
  /** Nota 0–10 de cada categoría (id de SCORE_CATEGORIES → nota). */
  scores: Record<string, number>;
  /** Media de las 8 notas (computeOverallScore). */
  overall: number;
  /** Subnotas 0–10 para rankings (INDEX_SUBSCORES); falta la clave si la ciudad no tiene ese dato. */
  subscores: { clima?: number; ingles?: number };
  /** 0 pequeña, 1 mediana, 2 grande; null sin dato de población. */
  size: 0 | 1 | 2 | null;
  /** Naturaleza para City Match: 0 poca, 1 algo, 2 mucha (heurística). */
  nature: 0 | 1 | 2;
}

/** Ficha completa de una ciudad, cargada bajo demanda (loadCityDetail). */
export interface CityDetail {
  city: City;
  insights: CityInsights;
}

// ─── Filtros y búsqueda ───────────────────────────────────────────────────────
// Preparado para la feature de filtros avanzados

export interface CityFilters {
  region?: Region | 'Todos';
  maxCost?: number;           // presupuesto máximo €/mes
  minErasmusScore?: number;   // score mínimo Erasmus 0-100
  experiences?: ExperienceType[];
  programType?: ProgramType[];
  query?: string;             // búsqueda por texto
}

export type CitySortKey =
  | 'name'
  | 'erasmus'
  | 'cost_asc'
  | 'cost_desc'
  | 'overall';                // score calculado de insights

// ─── Rankings ─────────────────────────────────────────────────────────────────
// Criterios de src/data/rankings.js (chips del comparador y /ranking/<slug>).

export type RankingSource =
  | { kind: 'cost' }
  | { kind: 'score'; id: string }
  | { kind: 'sub'; id: 'clima' | 'ingles' }
  | { kind: 'overall' };

export interface RankingCriterion {
  id: string;            // ?orden=<id> en /comparar
  slug: string;          // /ranking/<slug>
  chip: string;          // texto del chip
  label: string;         // nombre corto del dato («Vida social»)
  icon: string;          // clave de CRITERION_ICONS (lib/categoryIcons.js)
  source: RankingSource;
  title: string;         // H1
  seoTitle: string;
  description: string;
  intro: string;
  method: string;        // «Cómo lo calculamos»
}

/** Una ciudad dentro de un ranking: value 0–10, o null si le falta el dato. */
export interface RankedEntry {
  city: CityIndexEntry;
  value: number | null;
  rank: number | null;
}

/** Filtro por programa del comparador (?programa=). */
export type ProgramFilter = 'todos' | 'erasmus' | 'otros';

export interface RankedCity extends City {
  rank: number;
  overallScore: number;       // calculado desde insights.scores
}

// ─── Favoritos ────────────────────────────────────────────────────────────────
// Preparado para la feature de favoritos (localStorage)

export interface FavoritesState {
  slugs: string[];
}

// ─── Comparativa ─────────────────────────────────────────────────────────────
// Preparado para comparar 2-3 ciudades lado a lado

export interface ComparisonState {
  slugs: string[];            // máx 3 ciudades
}

// ─── Guías (/guias) ─────────────────────────────────────────────────────────
// Texto con formato inline: "[texto](url)" = enlace, "**texto**" = negrita.

export type GuideBlock =
  | { type: "p" | "note"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "checklist"; items: string[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "example"; title: string; text?: string; items?: string[] };

export interface GuideSection {
  id: string;
  heading: string;
  blocks: GuideBlock[];
}

export interface Guide {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  summary: string;
  datePublished: string; // AAAA-MM-DD
  dateModified: string;  // AAAA-MM-DD
  intro: string;
  sections: GuideSection[];
  sources: { label: string; url: string }[];
  related: { to: string; label: string }[];
}
