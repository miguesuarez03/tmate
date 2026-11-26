/**
 * CITY_HOUSING_LINKS — MAbroad
 *
 * Enlace de «Búsqueda de alojamiento» por ciudad (pisos y residencias), para
 * la tarjeta del hero de la ficha y su burbuja flotante. Mientras una ciudad
 * no tenga enlace real, la tarjeta no se muestra (igual que el grupo de
 * WhatsApp en cityWhatsappGroups.js).
 *
 * Formato: { slug: { url: "https://…", label: "Residencias de la universidad" } }
 */
export const CITY_HOUSING_LINKS = {};

/** Enlace de alojamiento de una ciudad, o null si aún no hay. */
export function getCityHousingLink(slug) {
  return CITY_HOUSING_LINKS[slug] || null;
}
