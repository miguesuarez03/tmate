// Clima: rangos por estación y meses extremos (CITY_CLIMATE_EXTREMES) de weatherSeasons.js.
// Ejecutar con `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CITY_SEASONS, CITY_CLIMATE_EXTREMES } from "../src/data/weatherSeasons.js";
import { CITY_COORDS } from "../src/lib/cityCoords.js";

const range = (t) => {
  const m = /^(-?\d+)–(-?\d+)°C$/.exec(t);
  assert.ok(m, `rango mal escrito: «${t}»`);
  return [Number(m[1]), Number(m[2])];
};

test("Viena coincide con la normal publicada de GeoSphere, no con la serie diaria sin homogeneizar", () => {
  // Fuente independiente: klimanormalperiode_19912020.xlsx, Temperatur,
  // Wien_Hohe_Warte (FJ6), mtmin FJ145:FJ156 y mtmax FJ214:FJ225.
  const tn = [-1.3, -0.5, 2.6, 6.7, 10.7, 14.7, 15.9, 15.6, 12, 7.3, 3.7, -0.4];
  const tx = [3.5, 6.5, 10.7, 17.2, 20.7, 25.1, 26.4, 26.1, 21.1, 14.3, 8.8, 4];
  const meses = { spring: [2, 3, 4], summer: [5, 6, 7], autumn: [8, 9, 10], winter: [11, 0, 1] };
  for (const s of CITY_SEASONS.viena) {
    const media = (serie) => Math.round(meses[s.id].reduce((suma, mes) => suma + serie[mes], 0) / 3);
    assert.deepEqual(range(s.temp), [media(tn), media(tx)], s.id);
  }
  const e = CITY_CLIMATE_EXTREMES.viena;
  assert.equal(e.cold.min, Math.min(...tn));
  assert.equal(e.cold.month, tn.indexOf(Math.min(...tn)));
  assert.equal(e.hot.max, Math.max(...tx));
  assert.equal(e.hot.month, tx.indexOf(Math.max(...tx)));
  assert.match(e.source, /GeoSphere Austria, Wien Hohe Warte/);
  assert.equal(e.daysBy, "GeoSphere Austria");
  assert.equal(e.cold.low, -9.32);
  assert.equal(e.hot.high, 33.96);
});

test("el inventario de licencias incluye exactamente las ciudades con clima", () => {
  const doc = readFileSync(new URL("../docs/fuentes-clima.md", import.meta.url), "utf8");
  const filas = doc.split(/\r?\n/).filter((linea) => !linea.startsWith("| Ciudad ") && /^\| [^|]+ \([a-z-]+\) \|/.test(linea));
  const slugs = filas.map((linea) => /^\| [^|]+ \(([a-z-]+)\) \|/.exec(linea)[1]);
  assert.deepEqual(slugs.sort(), Object.keys(CITY_SEASONS).sort());
  for (const fila of filas) {
    assert.match(fila, /\| (Sí|\*\*No\*\*|Sin confirmar) \|$/);
    assert.match(fila, /https:\/\//);
  }
});

test("cada estación tiene un rango «mín–máx°C» con la mínima por debajo de la máxima", () => {
  for (const [slug, seasons] of Object.entries(CITY_SEASONS)) {
    assert.deepEqual(seasons.map((s) => s.id).sort(), ["autumn", "spring", "summer", "winter"], slug);
    for (const s of seasons) {
      const [lo, hi] = range(s.temp);
      assert.ok(lo < hi, `${slug} ${s.id}: ${s.temp}`);
    }
  }
});

test("el icono de cada estación va con su nombre (en el hemisferio sur, «Verano» en Dic–Feb lleva el sol)", () => {
  const ICON = { Primavera: "🌸", Verano: "☀️", "Otoño": "🍂", Invierno: "❄️" };
  for (const [slug, seasons] of Object.entries(CITY_SEASONS)) {
    for (const s of seasons) {
      if (ICON[s.label]) assert.equal(s.emoji, ICON[s.label], `${slug} ${s.id}: «${s.label}» con ${s.emoji}`);
    }
  }
});

test("los meses extremos solo existen para ciudades con bloque de clima y cuadran con sus estaciones", () => {
  for (const [slug, e] of Object.entries(CITY_CLIMATE_EXTREMES)) {
    const seasons = CITY_SEASONS[slug];
    assert.ok(seasons, `${slug}: meses extremos sin bloque de estaciones`);
    assert.ok(Number.isInteger(e.cold.month) && e.cold.month >= 0 && e.cold.month <= 11, `${slug}: mes frío`);
    assert.ok(Number.isInteger(e.hot.month) && e.hot.month >= 0 && e.hot.month <= 11, `${slug}: mes cálido`);
    assert.ok(typeof e.source === "string" && e.source.length > 3, `${slug}: sin fuente`);
    assert.ok(e.cold.min < e.hot.max, slug);
    if (e.cold.low != null) assert.ok(e.cold.low < e.cold.min, `${slug}: «días de hasta» más alto que la media`);
    if (e.hot.high != null) assert.ok(e.hot.high > e.hot.max, `${slug}: «días de hasta» más bajo que la media`);
    // El mes más frío no puede ser más templado que la estación más fría (y al revés).
    // Margen de 1 °C: algunas estaciones salen de la serie del servicio nacional y el mes, de la OMM.
    const lows = seasons.map((s) => range(s.temp)[0]);
    const highs = seasons.map((s) => range(s.temp)[1]);
    assert.ok(Math.round(e.cold.min) <= Math.min(...lows) + 1, `${slug}: mes frío ${e.cold.min} frente a ${Math.min(...lows)}`);
    assert.ok(Math.round(e.hot.max) >= Math.max(...highs) - 1, `${slug}: mes cálido ${e.hot.max} frente a ${Math.max(...highs)}`);
    // Invierno en el mes frío y verano en el cálido. En el hemisferio sur van al revés; entre los
    // trópicos no se exige (el mes más cálido puede ser el de antes de las lluvias, p. ej. mayo en León).
    const lat = CITY_COORDS[slug]?.[1];
    assert.ok(lat != null, `${slug}: sin coordenadas`);
    if (Math.abs(lat) < 23.5) continue;
    const [winter, summer] = lat < 0 ? [[5, 6, 7], [11, 0, 1]] : [[11, 0, 1], [5, 6, 7]];
    assert.ok(winter.includes(e.cold.month), `${slug}: el mes más frío no es de invierno`);
    assert.ok(summer.includes(e.hot.month), `${slug}: el mes más cálido no es de verano`);
  }
});
