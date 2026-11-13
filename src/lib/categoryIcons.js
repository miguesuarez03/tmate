import {
  IconBeca,
  IconCasa,
  IconFiesta,
  IconIntegracion,
  IconMovilidad,
  IconEstiloVida,
  IconEmpleo,
  IconSeguridad,
  IconClima,
  IconIdiomas,
  IconRanking,
  IconUniversidad,
} from "../components/icons";

/**
 * Icono ilustrado por categoría de score. Las 8 categorías son fijas
 * (ver SCORE_CATEGORY_IDS en lib/cities.js) y el emoji que llevaba cada
 * una en data/insights.js era siempre el mismo, repetido en las ~35
 * ciudades — por eso vive aquí una única vez en vez de en el dato.
 */
export const CATEGORY_ICONS = {
  coste: IconBeca,
  alojamiento: IconCasa,
  vida_social: IconFiesta,
  integracion: IconIntegracion,
  movilidad: IconMovilidad,
  estilo_vida: IconEstiloVida,
  empleo: IconEmpleo,
  seguridad: IconSeguridad,
};

export function getCategoryIcon(id) {
  return CATEGORY_ICONS[id] || IconBeca;
}

/** Icono de cada subnota de la nota MAbroad (SUBSCORES en lib/scoring.js). */
const SUBSCORE_ICONS = {
  coste: IconBeca,
  vida: IconFiesta,
  seguridad: IconSeguridad,
  academico: IconUniversidad,
  alojamiento: IconCasa,
  calidad: IconClima,
  idioma: IconIdiomas,
  conectividad: IconMovilidad,
};

export function getSubscoreIcon(id) {
  return SUBSCORE_ICONS[id] || IconRanking;
}

/** Icono de cada criterio de ranking (campo `icon` de src/data/rankings.js). */
const CRITERION_ICONS = {
  ...CATEGORY_ICONS,
  clima: IconClima,
  ingles: IconIdiomas,
  overall: IconRanking,
};

export function getCriterionIcon(criterion) {
  return CRITERION_ICONS[criterion?.icon] || IconRanking;
}
