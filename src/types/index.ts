// ─────────────────────────────────────────────────────────────────────────────
// TMATE — Central Type Definitions
// Añadir nuevos campos aquí los propaga automáticamente a toda la app.
// ─────────────────────────────────────────────────────────────────────────────

// ── Precio de barrio ─────────────────────────────────────────────────────────
export type PriceLevel = '€' | '€€' | '€€€' | '€€€€';

// ── Tipos de programa Erasmus ─────────────────────────────────────────────────
export type ExperienceType = 'erasmus' | 'internship' | 'work-travel' | 'volunteering';

// ── Tipo de programa de intercambio (Erasmus+ vs. bilateral) ──────────────────
export type ProgramType = 'erasmus' | 'uk_bilateral' | 'switzerland_bilateral' | 'study_abroad_usa_canada' | 'study_abroad_latam';

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
  students: string;           // ej: "100.000+"
  img: string;                // imagen para cards (800px)
  heroImg: string;            // imagen hero (1400px)
  experiences: ExperienceType[];
  programType: ProgramType;
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

/** Experiencia enviada por el formulario y aprobada a mano. Nunca lleva email. */
export interface CityExperience {
  name: string;               // nombre o alias elegido por la persona
  year: number;               // año del intercambio
  homeUniversity: string;     // universidad de origen
  text: string;
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
  photo: string | null;       // retrato en /public (vertical 4:5, 640×800)
  avatar?: string | null;     // recorte cuadrado de la cara (160×160)
  story: string[];            // párrafos de la portada
  short: string;              // versión corta para tarjetas
}

/** Experiencia lista para pintar: con su ciudad resuelta. */
export interface ExperienceEntry extends CityExperience {
  citySlug: string;
  cityName: string;
  cityEmoji: string;
  founder?: boolean;
}

export interface CityInsights {
  heroImg?: string;
  tagline?: string;
  atmosphere?: string;
  scores: ScoreItem[];
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
// Preparado para la feature de rankings

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
