// Coste de vida: formato de costDetail, orden por coste, etiqueta «Asequible»
// (solo con fuente oficial, `costSource`) y «Estimación MAbroad».
// Ejecutar con `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { CITIES } from "../src/data/cities.js";
import {
  parseMinCost,
  parseMaxCost,
  isAffordable,
  hasOfficialCost,
  getCostSourceLabel,
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
  const oficial = (costDetail) => ({ costDetail, costSource: "Universidad X" });
  assert.equal(isAffordable(oficial("350–550€/mes")), true);
  assert.equal(isAffordable(oficial("500–750€/mes")), true);
  assert.equal(isAffordable(oficial("550–850€/mes")), false);
  // Antes se buscaba «500» o «350» en el texto y estas salían como baratas:
  assert.equal(isAffordable(oficial("1.200–1.500€/mes")), false);
  assert.equal(isAffordable(oficial("1.100–1.500€/mes")), false);
  assert.equal(isAffordable(oficial("1.350–1.850€/mes")), false);
  assert.equal(isAffordable(oficial("")), false);
  assert.equal(isAffordable(undefined), false);
});

test("«Asequible» solo si el coste tiene fuente oficial; si no, «Estimación MAbroad»", () => {
  // Mismo rango barato: sin costSource es estimación de MAbroad y no lleva la etiqueta.
  assert.equal(isAffordable({ costDetail: "450–700€/mes" }), false);
  assert.equal(isAffordable({ costDetail: "450–700€/mes", costSource: "  " }), false);
  assert.equal(getCostSourceLabel({ costDetail: "450–700€/mes" }), "Estimación MAbroad");
  assert.equal(getCostSourceLabel({ costDetail: "450–700€/mes", costSource: "Universidad X" }), "Fuente: Universidad X");
  // Ciudades con coste estimado por MAbroad (pendiente de fuente, ver VERIFICACION.md).
  for (const slug of ["parma", "bergamo", "ferrara", "genova", "grenoble", "venecia", "coimbra", "dresde", "tubinga", "catania", "palermo", "cagliari"]) {
    const c = CITIES.find((x) => x.slug === slug);
    assert.ok(c, slug);
    assert.equal(hasOfficialCost(c), false, `${slug} no debería tener costSource`);
    assert.equal(isAffordable(c), false, slug);
    assert.equal(getCostSourceLabel(c), "Estimación MAbroad", slug);
  }
  for (const c of CITIES) {
    if (c.costSource !== undefined) assert.ok(typeof c.costSource === "string" && c.costSource.trim(), `${c.slug}: costSource vacío`);
    assert.equal(isAffordable(c), hasOfficialCost(c) && parseMinCost(c.costDetail) <= AFFORDABLE_MAX_COST, c.slug);
    if (isAffordable(c)) assert.ok(hasOfficialCost(c), `${c.slug}: «Asequible» sin fuente oficial`);
  }
});
