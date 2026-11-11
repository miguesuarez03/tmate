// Coste de vida: formato de costDetail, orden por coste y etiqueta «Asequible».
// Ejecutar con `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { CITIES } from "../src/data/cities.js";
import {
  parseMinCost,
  parseMaxCost,
  isAffordable,
  sortCities,
  AFFORDABLE_MAX_COST,
} from "../src/lib/cities.js";

test("parseMinCost/parseMaxCost entienden los miles con punto", () => {
  assert.equal(parseMinCost("600–900€/mes"), 600);
  assert.equal(parseMaxCost("600–900€/mes"), 900);
  assert.equal(parseMinCost("1.200–1.800€/mes"), 1200);
  assert.equal(parseMaxCost("1.200–1.800€/mes"), 1800);
  assert.equal(parseMinCost("950–1.350€/mes"), 950);
  assert.equal(parseMaxCost("950–1.350€/mes"), 1350);
  assert.equal(parseMinCost("2.200–3.600€/mes"), 2200);
  assert.equal(parseMinCost(""), 0);
});

test("todas las fichas tienen el coste como rango «mín–máx€/mes»", () => {
  const RANGE = /^\d{1,3}(?:\.\d{3})?–\d{1,3}(?:\.\d{3})?€\/mes$/;
  for (const c of CITIES) {
    assert.match(c.costDetail, RANGE, `${c.slug}: «${c.costDetail}»`);
    const min = parseMinCost(c.costDetail);
    const max = parseMaxCost(c.costDetail);
    assert.ok(min >= 100 && min < max, `${c.slug}: mínimo ${min}, máximo ${max}`);
  }
});

test("ordenar por coste usa el mínimo real del rango", () => {
  const asc = sortCities(CITIES, "cost_asc").map((c) => parseMinCost(c.costDetail));
  for (let i = 1; i < asc.length; i++) assert.ok(asc[i - 1] <= asc[i], `cost_asc: ${asc[i - 1]} > ${asc[i]}`);
  const desc = sortCities(CITIES, "cost_desc").map((c) => parseMinCost(c.costDetail));
  for (let i = 1; i < desc.length; i++) assert.ok(desc[i - 1] >= desc[i], `cost_desc: ${desc[i - 1]} < ${desc[i]}`);

  const mini = [
    { slug: "a", costDetail: "1.200–1.800€/mes" },
    { slug: "b", costDetail: "450–700€/mes" },
    { slug: "c", costDetail: "950–1.350€/mes" },
  ];
  assert.deepEqual(sortCities(mini, "cost_asc").map((c) => c.slug), ["b", "c", "a"]);
});

test("«Asequible» solo con un mínimo de hasta 500 €/mes", () => {
  assert.equal(isAffordable("350–550€/mes"), true);
  assert.equal(isAffordable("500–750€/mes"), true);
  assert.equal(isAffordable("550–850€/mes"), false);
  // Antes se buscaba «500» o «350» en el texto y estas salían como baratas:
  assert.equal(isAffordable("1.200–1.500€/mes"), false);
  assert.equal(isAffordable("1.100–1.500€/mes"), false);
  assert.equal(isAffordable("1.350–1.850€/mes"), false);
  assert.equal(isAffordable(""), false);
  assert.equal(isAffordable(undefined), false);
  for (const c of CITIES) {
    assert.equal(isAffordable(c.costDetail), parseMinCost(c.costDetail) <= AFFORDABLE_MAX_COST, c.slug);
  }
});
