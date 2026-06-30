/**
 * cityCoords.js — TMate
 *
 * Coordenadas [lng, lat] de las 20 ciudades destino (mismas que usa WorldMap.jsx
 * para los pines del mapa). Se reutilizan aquí para la calculadora de distancia
 * de la Beca Erasmus+ (punto 12), evitando duplicar datos.
 */

export const CITY_COORDS = {
  bolonia:    [11.34, 44.49],
  milan:      [9.19, 45.46],
  roma:       [12.49, 41.90],
  turin:      [7.68, 45.07],
  cracovia:   [19.94, 50.06],
  varsovia:   [21.01, 52.23],
  budapest:   [19.04, 47.50],
  praga:      [14.42, 50.08],
  "la-haya":  [4.30, 52.07],
  rotterdam:  [4.48, 51.92],
  munich:     [11.58, 48.14],
  berlin:     [13.40, 52.52],
  lisboa:     [-9.14, 38.71],
  oporto:     [-8.61, 41.15],
  paris:      [2.35, 48.85],
  londres:    [-0.12, 51.51],
  amsterdam:  [4.90, 52.37],
  viena:      [16.37, 48.21],
  rosenheim:  [12.12, 47.85],
  bruselas:   [4.35, 50.85],
};

/**
 * Distancia en línea recta (km) entre dos puntos [lng, lat] usando la fórmula
 * de Haversine. Cálculo matemático puro, sin depender de ningún servicio externo.
 */
export function haversineDistanceKm([lng1, lat1], [lng2, lat2]) {
  const R = 6371; // radio medio de la Tierra en km
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convierte una distancia en km a la banda de distancia que usa la tabla
 * oficial de ayuda de viaje Erasmus+ (mismas bandas que TRAVEL_AID en
 * BecaErasmusPage.jsx).
 */
export function distanceToRange(km) {
  if (km < 100) return "10 – 99 km";
  if (km < 500) return "100 – 499 km";
  if (km < 2000) return "500 – 1.999 km";
  if (km < 3000) return "2.000 – 2.999 km";
  if (km < 4000) return "3.000 – 3.999 km";
  if (km < 8000) return "4.000 – 7.999 km";
  return "8.000 km o más";
}

/**
 * Geocodifica una ciudad de origen (texto libre) a coordenadas [lng, lat]
 * usando Nominatim (OpenStreetMap), que es gratuito y no requiere API key.
 * Lanza un error legible si no se encuentra la ciudad.
 *
 * Nota técnica: los navegadores no permiten establecer manualmente la
 * cabecera User-Agent en fetch() (la gestiona el propio navegador), así que
 * en su lugar respetamos la política de uso de Nominatim limitando peticiones
 * mediante un caché en memoria — evita golpear su API si el usuario repite la
 * búsqueda con el mismo texto (ej. pulsa el botón varias veces sin querer).
 */
const geocodeCache = new Map();

export async function geocodeCity(query) {
  const key = query.trim().toLowerCase();
  if (geocodeCache.has(key)) return geocodeCache.get(key);

  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
  let res;
  try {
    res = await fetch(url, { headers: { "Accept-Language": "es" } });
  } catch {
    throw new Error("No se ha podido contactar con el servicio de geocodificación. Comprueba tu conexión e inténtalo de nuevo.");
  }
  if (res.status === 429) {
    throw new Error("El servicio de geocodificación está saturado ahora mismo. Espera unos segundos e inténtalo de nuevo.");
  }
  if (!res.ok) throw new Error("No se ha podido contactar con el servicio de geocodificación.");
  const data = await res.json();
  if (!data.length) throw new Error("No se ha encontrado esa ciudad. Prueba a escribirla de otra forma (ej. añade el país).");
  const { lon, lat, display_name } = data[0];
  const result = { coords: [parseFloat(lon), parseFloat(lat)], label: display_name };
  geocodeCache.set(key, result);
  return result;
}
