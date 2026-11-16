// Clima: rangos por estación y meses extremos (CITY_CLIMATE_EXTREMES) de weatherSeasons.js.
// Ejecutar con `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { CITY_SEASONS, CITY_CLIMATE_EXTREMES } from "../src/data/weatherSeasons.js";

const range = (t) => {
  const m = /^(-?\d+)–(-?\d+)°C$/.exec(t);
  assert.ok(m, `rango mal escrito: «${t}»`);
  return [Number(m[1]), Number(m[2])];
};

test("cada estación tiene un rango «mín–máx°C» con la mínima por debajo de la máxima", () => {
  for (const [slug, seasons] of Object.entries(CITY_SEASONS)) {
    assert.deepEqual(seasons.map((s) => s.id).sort(), ["autumn", "spring", "summer", "winter"], slug);
    for (const s of seasons) {
      const [lo, hi] = range(s.temp);
      assert.ok(lo < hi, `${slug} ${s.id}: ${s.temp}`);
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
    // Invierno en el mes frío y verano en el cálido (todas las ciudades con clima son europeas).
    assert.ok([11, 0, 1].includes(e.cold.month), `${slug}: el mes más frío no es de invierno`);
    assert.ok([5, 6, 7].includes(e.hot.month), `${slug}: el mes más cálido no es de verano`);
  }
});
