import {
  IconBeca,
  IconCasa,
  IconFiesta,
  IconIntegracion,
  IconMovilidad,
  IconEstiloVida,
  IconEmpleo,
  IconSeguridad,
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
