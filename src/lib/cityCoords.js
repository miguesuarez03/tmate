/**
 * cityCoords.js — MAbroad
 *
 * Coordenadas [lng, lat] de TODOS los destinos (la única fuente): las usan los
 * pines del mapa (WorldMap.jsx) y la calculadora de distancia de la Beca
 * Erasmus+. Si añades una ciudad, añádela aquí (tests/flags.test.mjs falla si
 * falta alguna).
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
  estocolmo:  [18.07, 59.33],
  copenhague: [12.57, 55.68],
  helsinki:   [24.94, 60.17],
  oslo:       [10.75, 59.91],
  reikiavik:  [-21.94, 64.15],
  dublin:     [-6.27, 53.35],
  edimburgo:  [-3.19, 55.95],
  atenas:     [23.73, 37.98],
  zagreb:     [15.98, 45.81],
  liubliana:  [14.51, 46.06],
  tallin:     [24.75, 59.44],
  vilna:      [25.28, 54.69],
  riga:       [24.11, 56.95],
  bratislava: [17.11, 48.15],
  bucarest:   [26.10, 44.43],
  sofia:      [23.32, 42.70],
  ginebra:    [6.14, 46.20],
  florencia:  [11.26, 43.77],
  hamburgo:   [9.99, 53.55],
  gante:      [3.72, 51.05],
  // Resto de destinos Erasmus+ (mismas coordenadas que WorldMap.jsx).
  venecia:      [12.34, 45.44],
  lyon:         [4.84, 45.76],
  colonia:      [6.96, 50.94],
  lovaina:      [4.70, 50.88],
  utrecht:      [5.12, 52.09],
  lund:         [13.19, 55.70],
  innsbruck:    [11.40, 47.27],
  split:        [16.44, 43.51],
  salonica:     [22.94, 40.64],
  napoles:      [14.25, 40.85],
  groningen:    [6.57, 53.22],
  coimbra:      [-8.43, 40.21],
  uppsala:      [17.64, 59.86],
  friburgo:     [7.85, 47.99],
  nantes:       [-1.55, 47.22],
  wroclaw:      [17.03, 51.11],
  "cluj-napoca":[23.60, 46.77],
  galway:       [-9.05, 53.27],
  malmo:        [13.00, 55.60],
  aarhus:       [10.20, 56.16],
  heidelberg:   [8.69, 49.41],
  toulouse:     [1.44, 43.60],
  burdeos:      [-0.58, 44.84],
  palermo:      [13.36, 38.12],
  gdansk:       [18.65, 54.35],
  nicosia:      [33.37, 35.17],
  "la-valeta":  [14.51, 35.90],
  brno:         [16.61, 49.20],
  estrasburgo:  [7.75, 48.58],
  montpellier:  [3.88, 43.61],
  marsella:     [5.37, 43.30],
  lille:        [3.06, 50.63],
  dresde:       [13.74, 51.05],
  leipzig:      [12.37, 51.34],
  tubinga:      [9.06, 48.52],
  poznan:       [16.93, 52.41],
  katowice:     [19.02, 50.26],
  braga:        [-8.43, 41.55],
  bari:         [16.87, 41.12],
  padua:        [11.88, 45.41],
  genova:       [8.93, 44.41],
  perugia:      [12.39, 43.11],
  manchester:   [-2.24, 53.48],
  glasgow:      [-4.25, 55.86],
  bristol:      [-2.59, 51.45],
  estambul:     [28.98, 41.01],
  pisa:         [10.40, 43.72],
  siena:        [11.33, 43.32],
  trieste:      [13.78, 45.65],
  parma:        [10.33, 44.80],
  bergamo:      [9.67, 45.70],
  ferrara:      [11.62, 44.84],
  urbino:       [12.64, 43.73],
  lecce:        [18.17, 40.35],
  catania:      [15.09, 37.50],
  cagliari:     [9.11, 39.22],
  maastricht:   [5.69, 50.85],
  grenoble:     [5.72, 45.19],
  verona:       [10.99, 45.44],
  gotemburgo:   [11.97, 57.71],
  liverpool:    [-2.98, 53.41],
  leeds:        [-1.55, 53.80],
  turku:        [22.27, 60.45],
  rennes:       [-1.68, 48.11],
  pecs:         [18.23, 46.07],
  kaunas:       [23.90, 54.90],
  // Fuera de Erasmus+ (América): solo las usa el mapa.
  lausana:               [6.63, 46.52],
  zurich:                [8.54, 47.37],
  basilea:               [7.59, 47.56],
  berna:                 [7.45, 46.95],
  "nueva-york":          [-74.01, 40.71],
  boston:                [-71.06, 42.36],
  chicago:               [-87.63, 41.88],
  "los-angeles":         [-118.24, 34.05],
  "san-francisco":       [-122.42, 37.77],
  miami:                 [-80.19, 25.76],
  austin:                [-97.74, 30.27],
  seattle:               [-122.33, 47.61],
  washington:            [-77.04, 38.91],
  "nueva-orleans":       [-90.07, 29.95],
  "ann-arbor":           [-83.74, 42.28],
  "san-diego":           [-117.16, 32.72],
  toronto:               [-79.38, 43.65],
  vancouver:             [-123.12, 49.28],
  montreal:              [-73.57, 45.50],
  quebec:                [-71.21, 46.81],
  ottawa:                [-75.70, 45.42],
  "ciudad-de-mexico":    [-99.13, 19.43],
  guadalajara:           [-103.35, 20.68],
  monterrey:             [-100.32, 25.69],
  "buenos-aires":        [-58.38, -34.60],
  "cordoba-argentina":   [-64.18, -31.42],
  "santiago-de-chile":   [-70.65, -33.45],
  bogota:                [-74.08, 4.71],
  medellin:              [-75.57, 6.25],
  "cartagena-de-indias": [-75.51, 10.39],
  lima:                  [-77.03, -12.05],
  cusco:                 [-71.97, -13.53],
  "ciudad-de-panama":    [-79.52, 8.98],
  "san-jose-costa-rica": [-84.09, 9.93],
  montevideo:            [-56.19, -34.90],
  quito:                 [-78.47, -0.18],
  "sao-paulo":           [-46.63, -23.55],
  "rio-de-janeiro":      [-43.21, -22.91],
  florianopolis:         [-48.55, -27.60],
  "la-paz":              [-68.15, -16.50],
  asuncion:              [-57.63, -25.30],
  "ciudad-de-guatemala": [-90.51, 14.63],
  "san-salvador":        [-89.19, 13.69],
  "santo-domingo":       [-69.90, 18.49],
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
