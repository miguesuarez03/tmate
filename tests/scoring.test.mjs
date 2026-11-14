// Nota MAbroad (src/lib/scoring.js + datos de src/data/scoring/). `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  SCORING_WEIGHTS, SUBSCORES, SUBSCORE_IDS, MIN_COVERAGE, costToScore, homicideToScore, theRankToScore,
  parseTheRank, computeScore, parseCostMidpoint, weightsFromMatch, esnPoints, intlStudentPoints,
  englishShareToScore, THE_UNRANKED_SCORE, neetToScore, EXTRA_SCORES, computeCitySubscores,
} from "../src/lib/scoring.js";
import {
  getAllCities, getCostMidpoint, getOverallScore, getScoreBreakdown, getBecaGapForCity, getCriterionValue,
  formatCriterionValue, getErasmusRanking, getScoreLevel, rankCities,
} from "../src/lib/cities.js";
import { CITY_NEET } from "../src/data/scoring/neet.js";
import { CITIES } from "../src/data/cities.js";
import { CITY_UNIVERSITIES } from "../src/data/scoring/universities.js";
import { CITY_ESN_SECTIONS } from "../src/data/scoring/esn.js";
import { COUNTRY_HOMICIDE_RATES } from "../src/data/scoring/homicides.js";
import { COUNTRY_LANGUAGE, CITY_LANGUAGE_PENDING } from "../src/data/scoring/languages.js";
import { SEPIE_MIN_MONTHLY, SEMP_MONTHLY } from "../src/data/becaGroups.js";

const INDEX = getAllCities();

test("THE sin cifras no equivale a cero internacionales; un cero publicado sí es dato", () => {
  const p = { city: {}, scores: [{ id: "vida_social", score: 8 }], costSourceLabel: "" };
  assert.equal(computeCitySubscores({ ...p, universities: [{ students: null, intlPct: null }] }).subs.vida, null);
  assert.equal(computeCitySubscores({ ...p, universities: [{ students: 1000, intlPct: 0 }] }).subs.vida, 4);
  assert.equal(computeCitySubscores({ ...p, universities: [{ students: null, intlPct: null }, { students: 1000, intlPct: 25 }] }).subs.vida, 4.5);
});

test("calidad usa la categoría completa si falta clima o calidad de vida", () => {
  const p = { city: {}, costSourceLabel: "", scores: [{ id: "estilo_vida", score: 6, subcategories: [{ label: "Clima", score: 9 }] }] };
  assert.equal(computeCitySubscores(p).subs.calidad, 6);
  p.scores[0].subcategories.push({ label: "Calidad de vida", score: 7 });
  assert.equal(computeCitySubscores(p).subs.calidad, 8);
});

test("seguridad y NEET solo promedian los tres últimos años con dato", () => {
  const p = { city: {}, costSourceLabel: "", scores: [{ id: "seguridad", score: 8 }, { id: "empleo", score: 8 }],
    homicides: { 2020: 40, 2021: 0.5, 2022: 0.5, 2023: 0.5, 2024: null },
    neet: { source: "ilo", scope: "country", years: { 2020: 24, 2021: 4, 2022: 4, 2023: 4, 2024: null } } };
  const { subs } = computeCitySubscores(p);
  assert.equal(subs.seguridad, 9);
  assert.equal(subs.salidas, 9);
});

test("los pesos suman 100 y cada subnota tiene peso, etiqueta y fuente", () => {
  assert.equal(Object.values(SCORING_WEIGHTS).reduce((a, b) => a + b, 0), 100);
  assert.deepEqual(SCORING_WEIGHTS, {
    coste: 20, vida: 20, seguridad: 15, salidas: 10, academico: 10, alojamiento: 10, calidad: 10, conectividad: 5,
  });
  // El idioma es una preferencia personal: dato aparte, sin peso.
  assert.ok(!("idioma" in SCORING_WEIGHTS));
  assert.deepEqual(EXTRA_SCORES.map((e) => e.id), ["idioma"]);
  assert.deepEqual([...SUBSCORE_IDS].sort(), Object.keys(SCORING_WEIGHTS).sort());
  for (const s of SUBSCORES) {
    assert.ok(s.weight > 0 && s.label && s.source, s.id);
    assert.ok(["dato", "mixto", "valoracion"].includes(s.kind), s.id);
  }
});

test("coste: 400 €/mes = 10, cada 200 € resta un punto, 2.400 € o más = 0", () => {
  assert.equal(costToScore(300), 10);
  assert.equal(costToScore(400), 10);
  assert.equal(costToScore(600), 9);
  assert.equal(costToScore(1400), 5);
  assert.equal(costToScore(2400), 0);
  assert.equal(costToScore(2900), 0);
  assert.equal(costToScore(null), null);
});

test("seguridad: escala logarítmica de 0,5 (10) a 40 homicidios (0), decreciente", () => {
  assert.equal(homicideToScore(0.3), 10);
  assert.equal(homicideToScore(0.5), 10);
  assert.equal(homicideToScore(40), 0);
  assert.equal(homicideToScore(60), 0);
  let prev = 11;
  for (const r of [0.5, 0.8, 1, 2, 5, 10, 20, 40]) {
    const s = homicideToScore(r);
    assert.ok(s < prev || r === 0.5, `${r}: ${s}`);
    prev = s;
  }
});

test("salidas: NEET 4 % o menos = 10, cada 2 puntos resta 1, 24 % o más = 0", () => {
  assert.equal(neetToScore(3), 10);
  assert.equal(neetToScore(4), 10);
  assert.equal(neetToScore(10), 7);
  assert.equal(neetToScore(14), 5);
  assert.equal(neetToScore(24), 0);
  assert.equal(neetToScore(30), 0);
  assert.equal(neetToScore(null), null);
});

test("seguridad y salidas: mitad dato (país o región) y mitad valoración de la ciudad", () => {
  for (const c of INDEX) {
    const b = getScoreBreakdown(c.slug);
    const seg = b.rows.find((r) => r.id === "seguridad").score;
    const sal = b.rows.find((r) => r.id === "salidas").score;
    assert.ok(seg != null, `${c.slug}: seguridad`);
    assert.ok(sal != null || !CITY_NEET[c.slug], `${c.slug}: salidas`);
    // La mitad de la ciudad pesa: con la misma valoración que el dato, sale igual.
    assert.ok(seg >= Math.min(c.scores.seguridad, 10) / 2, c.slug);
  }
  // Mismo país, distinta valoración de la ciudad → distinta seguridad.
  const nap = getScoreBreakdown("napoles").rows.find((r) => r.id === "seguridad").score;
  const bol = getScoreBreakdown("bolonia").rows.find((r) => r.id === "seguridad").score;
  assert.notEqual(nap, bol);
});

test("académico: tramos de THE y 4 si ninguna universidad está clasificada", () => {
  assert.equal(parseTheRank("=111"), 111);
  assert.equal(parseTheRank("301–325"), 301);
  assert.equal(parseTheRank("2001+"), 2001);
  assert.equal(parseTheRank("Reporter"), null);
  assert.equal(theRankToScore(12), 10);
  assert.equal(theRankToScore("=50"), 10);
  assert.equal(theRankToScore(51), 9);
  assert.equal(theRankToScore("=147"), 8);
  assert.equal(theRankToScore("301–325"), 6);
  assert.equal(theRankToScore("801–1000"), 5);
  assert.equal(theRankToScore("2001+"), 4.5);
  assert.equal(theRankToScore("Reporter"), THE_UNRANKED_SCORE);
  assert.equal(THE_UNRANKED_SCORE, 4);
});

test("vida estudiantil: puntos de ESN (0–4) y de estudiantes internacionales (0–6)", () => {
  assert.deepEqual([0, 1, 2, 9].map(esnPoints), [0, 3, 4, 4]);
  assert.deepEqual([0, 249, 250, 1000, 2500, 5000, 10000, 20000, 80000].map(intlStudentPoints), [0, 0, 1, 2, 3, 4, 5, 6, 6]);
  assert.equal(intlStudentPoints(null), null);
  assert.equal(englishShareToScore(34), 3.4);
});

test("nota: media ponderada; lo pendiente se reparte y sin el 70 % del peso no hay nota", () => {
  const all = Object.fromEntries(SUBSCORE_IDS.map((id) => [id, 8]));
  assert.deepEqual(computeScore(all), { overall: 8, exact: 8, coverage: 1, pending: [] });
  const sinSalidas = { ...all, salidas: null, coste: 10 };
  const r = computeScore(sinSalidas);
  assert.deepEqual(r.pending, ["salidas"]);
  assert.equal(r.coverage, 0.9);
  assert.equal(r.overall, Math.round(((10 * 20 + 8 * 70) / 90) * 10) / 10);
  const casiNada = Object.fromEntries(SUBSCORE_IDS.map((id) => [id, null]));
  casiNada.coste = 9;
  casiNada.vida = 9;
  assert.equal(computeScore(casiNada).overall, null);
  assert.ok(MIN_COVERAGE === 0.7);
});

test("City Match (preparado): sin respuestas, los pesos de siempre; con prioridades, suman 100", () => {
  assert.deepEqual(weightsFromMatch({}), { ...SCORING_WEIGHTS });
  const w = weightsFromMatch({ priorities: ["academico", "salidas", "vida"], tightBudget: true });
  assert.ok(Math.abs(Object.values(w).reduce((a, b) => a + b, 0) - 100) < 0.5);
  assert.ok(w.academico > SCORING_WEIGHTS.academico && w.coste > SCORING_WEIGHTS.coste);
});

test("parseCostMidpoint da lo mismo que getCostMidpoint en todas las ciudades", () => {
  assert.equal(parseCostMidpoint("~700 €/mes"), 700);
  assert.equal(costToScore(parseCostMidpoint("~700 €/mes")), 8.5);
  for (const c of INDEX) assert.equal(parseCostMidpoint(c.costDetail), getCostMidpoint(c.costDetail), c.slug);
});

test("cada ciudad tiene sus datos de puntuación (aunque sea una lista vacía)", () => {
  for (const c of CITIES) {
    assert.ok(Array.isArray(CITY_UNIVERSITIES[c.slug]), `universidades: ${c.slug}`);
    assert.ok(Array.isArray(CITY_ESN_SECTIONS[c.slug]), `ESN: ${c.slug}`);
    assert.ok(Object.keys(COUNTRY_HOMICIDE_RATES[c.country] ?? {}).length > 0, `homicidios: ${c.country}`);
    for (const u of CITY_UNIVERSITIES[c.slug]) assert.ok(u.name && u.edition >= 2023 && u.rank, `${c.slug}: ${u.name}`);
  }
});

test("idioma (no cuenta): Eurobarómetro en %, lengua nativa o sin dato, nunca un número inventado", () => {
  for (const [country, v] of Object.entries(COUNTRY_LANGUAGE)) {
    if ("native" in v) assert.ok(["inglés", "español"].includes(v.native), country);
    else assert.ok(v.english > 0 && v.english <= 100, country);
  }
  for (const c of INDEX) {
    const b = getScoreBreakdown(c.slug);
    assert.ok(!b.rows.some((r) => r.id === "idioma"), c.slug);
    const idioma = b.extras.find((r) => r.id === "idioma").score;
    const expected = CITY_LANGUAGE_PENDING[c.slug] ? null
      : COUNTRY_LANGUAGE[c.country]?.native ? 10
        : COUNTRY_LANGUAGE[c.country] ? englishShareToScore(COUNTRY_LANGUAGE[c.country].english) : null;
    assert.equal(idioma, expected, c.slug);
  }
});

test("todas las ciudades tienen nota, subnotas entre 0 y 10 (o pendientes) y la nota cuadra", () => {
  for (const c of INDEX) {
    const b = getScoreBreakdown(c.slug);
    assert.ok(b, c.slug);
    assert.equal(b.rows.length, SUBSCORE_IDS.length);
    const subs = Object.fromEntries(b.rows.map((r) => [r.id, r.score]));
    for (const [id, v] of Object.entries(subs)) assert.ok(v === null || (v >= 0 && v <= 10), `${c.slug}/${id}: ${v}`);
    const { overall, pending } = computeScore(subs);
    assert.equal(getOverallScore(c.slug), overall, c.slug);
    assert.equal(typeof overall, "number", `${c.slug} sin nota`);
    assert.deepEqual(b.pending, pending, c.slug);
    assert.equal(b.provisional, pending.length > 0);
    // Coste y seguridad salen siempre de un dato: nunca pendientes.
    assert.ok(subs.coste != null && subs.seguridad != null && subs.academico != null, c.slug);
  }
});

test("las notas provisionales no entran en los rankings", () => {
  for (const c of INDEX) {
    const provisional = getScoreBreakdown(c.slug).provisional;
    assert.equal(getCriterionValue(c, "nota") == null, provisional, c.slug);
    if (provisional) assert.equal(formatCriterionValue(c, "nota"), "Nota provisional");
  }
  assert.ok(getErasmusRanking("nota").every((r) => !getScoreBreakdown(r.city.slug).provisional));
});

test("te faltan tras la beca: SEPIE en Erasmus+, SEMP en Suiza y 0 € en América", () => {
  for (const c of INDEX) {
    const g = getBecaGapForCity(c.slug);
    assert.ok(g, c.slug);
    assert.equal(g.gap, Math.max(0, Math.round(getCostMidpoint(c.costDetail) - g.beca)), c.slug);
    if (c.programType === "erasmus") {
      assert.equal(g.kind, "erasmus", c.slug);
      assert.equal(g.beca, SEPIE_MIN_MONTHLY[g.group], c.slug);
    } else if (c.programType === "switzerland_bilateral") {
      assert.deepEqual([g.kind, g.beca], ["semp", SEMP_MONTHLY.eur], c.slug);
    } else {
      assert.deepEqual([g.kind, g.beca], ["none", 0], c.slug);
    }
  }
  const uk = INDEX.find((c) => c.slug === "londres");
  assert.equal(getBecaGapForCity(uk.slug).estimated, true);
});

test("niveles: Excelente desde 8,0, Muy buena desde 7,0, Buena desde 6,0 y Mejorable por debajo", () => {
  const label = (s) => getScoreLevel(s).label;
  assert.deepEqual([9.2, 8, 7.95, 7.9, 7, 6.9, 6, 5.94, 3].map(label),
    ["Excelente", "Excelente", "Excelente", "Muy buena", "Muy buena", "Buena", "Buena", "Mejorable", "Mejorable"]);
});

test("rankings de nota: ordenan por la nota sin redondear, no por el nombre", () => {
  const all = rankCities("nota").filter((r) => r.rank != null);
  for (let i = 1; i < all.length; i++) {
    assert.ok(all[i - 1].city.overallExact >= all[i].city.overallExact, `${all[i - 1].city.slug} / ${all[i].city.slug}`);
  }
  for (const c of INDEX) if (c.overall != null) assert.equal(Math.round(c.overallExact * 10) / 10, c.overall, c.slug);
});
