// Rankings y chips de orden (src/data/rankings.js + lib/cities.js). `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getAllCities, getRankingCriteria, getCriterion, getCriterionBySlug, getCriterionValue, rankCities,
  getErasmusRanking, filterByProgram, isErasmusEligible, getCostMidpoint, formatCriterionValue, RANKING_TOP,
} from "../src/lib/cities.js";

const CITIES = getAllCities();
const CRITERIA = getRankingCriteria();

test("cada criterio tiene id y slug únicos y metadatos que caben en Google", () => {
  assert.ok(CRITERIA.length >= 5 && CRITERIA.length <= 8);
  assert.equal(new Set(CRITERIA.map((c) => c.id)).size, CRITERIA.length);
  assert.equal(new Set(CRITERIA.map((c) => c.slug)).size, CRITERIA.length);
  for (const c of CRITERIA) {
    assert.match(c.id, /^[a-z-]+$/, c.id);
    assert.match(c.slug, /^[a-z-]+$/, c.slug);
    assert.ok(c.seoTitle.length <= 60, `${c.slug}: title de ${c.seoTitle.length} caracteres`);
    assert.ok(c.description.length <= 165, `${c.slug}: description de ${c.description.length} caracteres`);
    assert.equal(getCriterion(c.id), c);
    assert.equal(getCriterionBySlug(c.slug), c);
  }
  assert.equal(getCriterion("no-existe"), null);
});

test("todos los valores están entre 0 y 10 (o sin dato)", () => {
  for (const c of CRITERIA) {
    for (const city of CITIES) {
      const v = getCriterionValue(city, c.id);
      if (v == null) continue;
      assert.ok(v >= 0 && v <= 10, `${city.slug}/${c.id}: ${v}`);
    }
  }
});

test("todas las ciudades Erasmus+ tienen dato en todos los criterios (rankings completos)", () => {
  for (const c of CRITERIA) {
    const missing = CITIES.filter(isErasmusEligible).filter((city) => getCriterionValue(city, c.id) == null);
    assert.deepEqual(missing.map((m) => m.slug), [], c.id);
  }
});

test("los rankings van de mejor a peor y solo con destinos Erasmus+", () => {
  for (const c of CRITERIA) {
    const top = getErasmusRanking(c.id);
    assert.equal(top.length, RANKING_TOP);
    assert.ok(top.every((r) => isErasmusEligible(r.city)));
    top.forEach((r, i) => assert.equal(r.rank, i + 1));
    for (let i = 1; i < top.length; i++) {
      if (c.source.kind === "cost") {
        assert.ok(getCostMidpoint(top[i - 1].city.costDetail) <= getCostMidpoint(top[i].city.costDetail), c.id);
      } else {
        assert.ok(top[i - 1].value >= top[i].value, `${c.id}: ${top[i - 1].city.slug} < ${top[i].city.slug}`);
      }
    }
  }
});

test("más baratas: 10 es la más barata y se enseña el rango en euros", () => {
  const all = rankCities("baratas");
  assert.equal(all[0].value, 10);
  assert.equal(all.at(-1).value, 0);
  assert.equal(formatCriterionValue(all[0].city, "baratas"), all[0].city.costDetail);
});

test("sin dato: al final y sin puesto", () => {
  const all = rankCities("ingles");
  const firstMissing = all.findIndex((r) => r.value == null);
  if (firstMissing === -1) return;
  assert.ok(all.slice(firstMissing).every((r) => r.value == null && r.rank == null));
  assert.ok(all.slice(0, firstMissing).every((r) => r.rank != null));
});

test("filterByProgram reparte las ciudades entre Erasmus+ y fuera", () => {
  const er = filterByProgram(CITIES, "erasmus");
  const otros = filterByProgram(CITIES, "otros");
  assert.equal(er.length + otros.length, CITIES.length);
  assert.ok(er.every(isErasmusEligible));
  assert.ok(otros.every((c) => !isErasmusEligible(c)));
  assert.equal(filterByProgram(CITIES, "todos").length, CITIES.length);
});
