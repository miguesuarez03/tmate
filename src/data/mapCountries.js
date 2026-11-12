/**
 * mapCountries.js — MAbroad
 *
 * Posición de cada país en el mapa de la portada (WorldMap.jsx): dónde va su
 * rótulo (bandera + nombre) y a qué centro y zoom salta al elegirlo en el
 * filtro «País». Coordenadas [lng, lat].
 *
 * La clave es el país tal como lo agrupa getMapCountry() en lib/cities.js: el
 * `country` de cities.js, con «Escocia (Reino Unido)» dentro de «Reino Unido».
 * La bandera del rótulo NO va aquí: sale de las ciudades de ese país, así que
 * nunca se desfasa. `short` es el nombre corto del rótulo, si hace falta.
 *
 * Si añades una ciudad de un país nuevo, añade aquí su entrada:
 * tests/flags.test.mjs falla si un país con destinos no tiene rótulo o bandera.
 */

/** Vista inicial («Todos»): el mundo entero. */
export const MAP_ALL_VIEW = { center: [-44.9, 22.9], zoom: 0.29 };

export const MAP_COUNTRIES = {
  // ── Europa ──
  "Alemania":        { label: [10.5, 51.2],  center: [10.5, 51],    zoom: 3.2 },
  "Austria":         { label: [14.0, 47.5],  center: [14, 47.5],    zoom: 4.5 },
  "Bélgica":         { label: [4.5, 50.5],   center: [4.5, 50.5],   zoom: 5.5 },
  "Bulgaria":        { label: [25.3, 42.6],  center: [25.3, 42.7],  zoom: 4.5 },
  "Chipre":          { label: [33.2, 35.0],  center: [33.2, 35.1],  zoom: 6.0 },
  "Croacia":         { label: [15.4, 44.7],  center: [16, 44.8],    zoom: 4.5 },
  "Dinamarca":       { label: [9.3, 56.0],   center: [10.5, 56],    zoom: 4.5 },
  "Eslovaquia":      { label: [19.5, 48.7],  center: [19.5, 48.7],  zoom: 5.0 },
  "Eslovenia":       { label: [14.8, 46.2],  center: [14.8, 46.1],  zoom: 6.0 },
  "Estonia":         { label: [25.8, 58.7],  center: [25.5, 58.7],  zoom: 5.0 },
  "Finlandia":       { label: [26.0, 62.8],  center: [25, 62],      zoom: 3.0 },
  "Francia":         { label: [2.5, 46.5],   center: [2.5, 46],     zoom: 3.2 },
  "Grecia":          { label: [22.0, 39.3],  center: [23, 39],      zoom: 4.0 },
  "Hungría":         { label: [19.0, 47.2],  center: [19, 47],      zoom: 4.5 },
  "Irlanda":         { label: [-8.0, 53.0],  center: [-8, 53.3],    zoom: 4.5 },
  "Islandia":        { label: [-18.5, 64.9], center: [-19, 64.9],   zoom: 4.5 },
  "Italia":          { label: [12.5, 42.5],  center: [12.5, 42],    zoom: 3.0 },
  "Letonia":         { label: [25.5, 56.8],  center: [24.8, 56.9],  zoom: 5.0 },
  "Lituania":        { label: [23.9, 55.4],  center: [23.9, 55.2],  zoom: 5.0 },
  "Malta":           { label: [14.4, 35.7],  center: [14.45, 35.9], zoom: 8.0 },
  "Noruega":         { label: [8.5, 61.0],   center: [10, 61],      zoom: 3.0 },
  "Países Bajos":    { label: [5.3, 52.3],   center: [5, 52.3],     zoom: 4.5 },
  "Polonia":         { label: [19.5, 52.0],  center: [20, 52],      zoom: 3.5 },
  "Portugal":        { label: [-8.0, 39.5],  center: [-8.5, 39],    zoom: 3.8 },
  "Reino Unido":     { label: [-2.0, 53.5],  center: [-2.5, 54],    zoom: 3.2 },
  "República Checa": { label: [15.5, 49.8],  center: [15.5, 49.8],  zoom: 4.5, short: "Rep. Checa" },
  "Rumanía":         { label: [25.0, 45.9],  center: [25, 45.9],    zoom: 4.0 },
  "Suecia":          { label: [15.5, 62.5],  center: [15.5, 59],    zoom: 2.6 },
  "Suiza":           { label: [8.2, 46.8],   center: [8.2, 46.8],   zoom: 4.0 },
  "Turquía":         { label: [33.0, 39.0],  center: [32, 39.5],    zoom: 3.0 },
  // ── América ──
  "Argentina":            { label: [-61, -35],        center: [-61, -33],        zoom: 2.5 },
  "Bolivia":              { label: [-68.15, -16.50],  center: [-68.15, -16.50],  zoom: 4.0 },
  "Brasil":               { label: [-48, -20],        center: [-46, -25],        zoom: 2.5 },
  "Canadá":               { label: [-90, 55],         center: [-90, 46],         zoom: 1.4 },
  "Chile":                { label: [-70.65, -33.45],  center: [-70.65, -33.45],  zoom: 4.0 },
  "Colombia":             { label: [-75, 5.5],        center: [-75, 5.5],        zoom: 3.0 },
  "Costa Rica":           { label: [-84.09, 9.93],    center: [-84.09, 9.93],    zoom: 5.0 },
  "Ecuador":              { label: [-78.47, -0.18],   center: [-78.47, -0.18],   zoom: 4.5 },
  "El Salvador":          { label: [-89.19, 13.69],   center: [-89.19, 13.69],   zoom: 5.5 },
  "Estados Unidos":       { label: [-96, 38],         center: [-96, 38],         zoom: 1.2 },
  "Guatemala":            { label: [-90.51, 14.63],   center: [-90.51, 14.63],   zoom: 5.0 },
  "México":               { label: [-101, 22],        center: [-101, 22],        zoom: 2.2 },
  "Panamá":               { label: [-79.52, 8.98],    center: [-79.52, 8.98],    zoom: 4.5 },
  "Paraguay":             { label: [-57.63, -25.30],  center: [-57.63, -25.30],  zoom: 4.5 },
  "Perú":                 { label: [-75, -10],        center: [-75, -12.5],      zoom: 2.8 },
  "República Dominicana": { label: [-69.90, 18.49],   center: [-69.90, 18.49],   zoom: 5.0 },
  "Uruguay":              { label: [-56.19, -34.90],  center: [-56.19, -34.90],  zoom: 4.5 },
};
