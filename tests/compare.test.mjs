// Comparador: quién va por delante y veredicto. Ejecutar con `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { getCompareLeader, COMPARE_MIN_LEAD } from "../src/lib/cities.js";

test("una décima de diferencia no corona a nadie: empate técnico", () => {
  assert.deepEqual(getCompareLeader([7.6, 7.5]), { winnerIdx: -1, tiedIdx: [0, 1] });
  assert.deepEqual(getCompareLeader([8.0, 8.0, 7.9]), { winnerIdx: -1, tiedIdx: [0, 1, 2] });
});

test("con ventaja suficiente hay una mejor puntuación clara", () => {
  assert.equal(COMPARE_MIN_LEAD, 0.3);
  assert.deepEqual(getCompareLeader([7.6, 7.3]), { winnerIdx: 0, tiedIdx: [] });
  assert.deepEqual(getCompareLeader([6.9, 8.1, 7.5]), { winnerIdx: 1, tiedIdx: [] });
});

test("en un empate técnico solo entran las que están cerca de la mejor", () => {
  // 8.1 y 8.0 empatan; 7.2 queda fuera del empate.
  assert.deepEqual(getCompareLeader([8.1, 7.2, 8.0]), { winnerIdx: -1, tiedIdx: [0, 2] });
});

// ─── Veredicto ───────────────────────────────────────────────────────────────
import { CITIES } from "../src/data/cities.js";
import {
  buildCompareVerdict, getCostMidpoint, getScoreMap, COMPARE_MIN_CATEGORY_GAP,
} from "../src/lib/cities.js";

test("getCostMidpoint devuelve el punto medio del rango", () => {
  assert.equal(getCostMidpoint("600–900€/mes"), 750);
  assert.equal(getCostMidpoint("750–1.100€/mes"), 925);
  assert.equal(getCostMidpoint(""), 0);
});

test("el veredicto sale de los datos de las fichas: coste y puntos fuertes", () => {
  const pick = (slug) => CITIES.find((c) => c.slug === slug);
  const cities = [pick("bolonia"), pick("milan"), pick("lisboa")];
  const v = buildCompareVerdict(cities);

  // Coste: más barata / más cara según el punto medio, diferencia a múltiplos de 5.
  const mids = cities.map((c) => getCostMidpoint(c.costDetail));
  v.cost.cheapestIdx.forEach((i) => assert.equal(mids[i], Math.min(...mids)));
  v.cost.priciestIdx.forEach((i) => assert.equal(mids[i], Math.max(...mids)));
  v.cost.middleIdx.forEach((i) => assert.ok(mids[i] > Math.min(...mids) && mids[i] < Math.max(...mids)));
  assert.ok(v.cost.cheapestIdx.length >= 1 && v.cost.priciestIdx.length >= 1);
  assert.equal(v.cost.diff % 5, 0);
  assert.ok(Math.abs(v.cost.diff - (Math.max(...mids) - Math.min(...mids))) <= 2.5);

  // Puntos fuertes: como mucho 2 por ciudad, nunca el coste, y siempre con
  // ventaja real sobre TODAS las demás.
  v.strengths.forEach((list, i) => {
    assert.ok(list.length <= 2);
    for (const s of list) {
      assert.notEqual(s.id, "coste");
      assert.ok(s.gap >= COMPARE_MIN_CATEGORY_GAP);
      const own = getScoreMap(cities[i].slug)[s.id].score;
      cities.forEach((c, j) => {
        if (j !== i) assert.ok(own - getScoreMap(c.slug)[s.id].score >= COMPARE_MIN_CATEGORY_GAP - 1e-9);
      });
    }
  });
});

test("dos ciudades con el mismo rango de coste empatan: ninguna queda «entre medias»", () => {
  const base = CITIES.find((c) => c.slug === "bolonia");
  const twin = { ...CITIES.find((c) => c.slug === "lisboa"), costDetail: base.costDetail };
  const pricey = { ...CITIES.find((c) => c.slug === "milan"), costDetail: "1.000–1.400€/mes" };
  const v = buildCompareVerdict([base, twin, pricey]);
  assert.deepEqual(v.cost.cheapestIdx, [0, 1]);
  assert.deepEqual(v.cost.priciestIdx, [2]);
  assert.deepEqual(v.cost.middleIdx, []);
});
