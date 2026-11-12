// Destinos que entran en Erasmus+ en un curso concreto: Reino Unido (acuerdo
// cerrado, 2027-28) y Suiza (pendiente). `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getAllCities, isErasmusEligible, getErasmusTransition, getProgramLabel, filterByProgram, getErasmusRanking,
  rankCities,
} from "../src/lib/cities.js";
import { CITY_COORDS } from "../src/lib/cityCoords.js";

const CITIES = getAllCities();
const isUK = (c) => c.country.includes("Reino Unido");
const isCH = (c) => c.country === "Suiza";

test("Reino Unido: Erasmus+ desde 2027-28, con el acuerdo confirmado", () => {
  const uk = CITIES.filter(isUK);
  assert.ok(uk.length >= 7, `solo ${uk.length} ciudades británicas`);
  for (const c of uk) {
    assert.equal(c.programType, "erasmus", c.slug);
    assert.ok(isErasmusEligible(c), c.slug);
    assert.deepEqual(
      { from: c.erasmusFrom, status: c.erasmusStatus },
      { from: "2027-28", status: "confirmed" },
      c.slug,
    );
    assert.equal(getErasmusTransition(c).label, "Erasmus+ desde 2027-28");
    assert.equal(getProgramLabel(c), "Erasmus+ desde 2027-28");
  }
});

test("Suiza: sigue fuera de Erasmus+, con la entrada prevista y pendiente", () => {
  const ch = CITIES.filter(isCH);
  assert.ok(ch.length >= 5, `solo ${ch.length} ciudades suizas`);
  for (const c of ch) {
    assert.equal(c.programType, "switzerland_bilateral", c.slug);
    assert.equal(isErasmusEligible(c), false, c.slug);
    assert.equal(c.erasmusStatus, "pending", c.slug);
    assert.equal(getErasmusTransition(c).label, "Erasmus+ previsto 2027 (pendiente)");
  }
});

test("solo Reino Unido y Suiza están en transición; el resto, sin etiqueta", () => {
  for (const c of CITIES.filter((c) => !isUK(c) && !isCH(c))) {
    assert.equal(getErasmusTransition(c), null, c.slug);
    assert.equal(getProgramLabel(c), isErasmusEligible(c) ? "Erasmus+" : "Bilateral", c.slug);
  }
});

test("Reino Unido entra en los rankings y en el filtro Erasmus+; Suiza no", () => {
  const erasmus = filterByProgram(CITIES, "erasmus");
  const otros = filterByProgram(CITIES, "otros");
  assert.ok(erasmus.some(isUK) && !otros.some(isUK));
  assert.ok(otros.some(isCH) && !erasmus.some(isCH));
  // El ranking completo (sin el corte del top 20) incluye a todas las británicas.
  const all = rankCities("nota", { cities: CITIES.filter(isErasmusEligible) });
  assert.equal(all.filter((r) => isUK(r.city)).length, CITIES.filter(isUK).length);
  for (const id of ["baratas", "ingles", "nota"]) {
    assert.ok(getErasmusRanking(id).every((r) => !isCH(r.city)), id);
  }
});

test("la calculadora de beca tiene coordenadas de todos los destinos Erasmus+", () => {
  const missing = CITIES.filter(isErasmusEligible).filter((c) => !CITY_COORDS[c.slug]).map((c) => c.slug);
  assert.deepEqual(missing, []);
});
