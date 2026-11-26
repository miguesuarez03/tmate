// Fecha de revisión de las fichas (src/data/cityReviews.js): cada slug es una
// ciudad que existe, la fecha es real (AAAA-MM-DD válida) y no está en el
// futuro. `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { CITY_REVIEWS } from "../src/data/cityReviews.js";
import { getAllCities, getCityReview } from "../src/lib/cities.js";

const SLUGS = new Set(getAllCities().map((c) => c.slug));

test("cada fecha de revisión es de una ciudad que existe", () => {
  const unknown = Object.keys(CITY_REVIEWS).filter((s) => !SLUGS.has(s));
  assert.deepEqual(unknown, []);
});

test("las fechas de revisión son válidas y no están en el futuro", () => {
  const today = new Date().toISOString().slice(0, 10);
  for (const [slug, iso] of Object.entries(CITY_REVIEWS)) {
    assert.match(iso, /^\d{4}-\d{2}-\d{2}$/, slug);
    const d = new Date(`${iso}T00:00:00Z`);
    assert.equal(d.toISOString().slice(0, 10), iso, `${slug}: fecha imposible`);
    assert.ok(iso <= today, `${slug}: ${iso} está en el futuro`);
  }
});

test("getCityReview da la fecha en español, o null sin revisión", () => {
  assert.deepEqual(getCityReview("trento"), { iso: "2026-11-15", label: "15 de noviembre de 2026" });
  assert.equal(getCityReview("slug-que-no-existe"), null);
});
