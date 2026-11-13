// Modo «Mi universidad»: mapeo de plazas a ciudades y filtrado por grado.
// Ejecutar con `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CITIES } from "../src/data/cities.js";
import { UNIVERSITY_REGISTRY } from "../src/data/universities/registry.js";
import { matchRelation } from "../scripts/match-university-cities.mjs";
import {
  buildUniversityView,
  relationMatchesDegree,
  formatPlacesBadge,
  getAgreementLabel,
  getUniversityShareUrl,
} from "../src/lib/universities.js";

const SLUGS = new Set(CITIES.map((c) => c.slug));
const readJson = (file) => JSON.parse(readFileSync(new URL(`../src/data/universities/${file}`, import.meta.url), "utf8"));

for (const entry of UNIVERSITY_REGISTRY) {
  const data = readJson(entry.file);
  const mapping = readJson(`${entry.id}.cities.json`);

  test(`${entry.id}: el mapeo está al día (npm run universities:match) y solo apunta a fichas que existen`, () => {
    assert.equal(data.university.id, entry.id);
    for (const rel of data.relations) {
      assert.ok(rel.relationId in mapping, `falta la plaza ${rel.relationId} en ${entry.id}.cities.json`);
      const slug = mapping[rel.relationId];
      if (slug) assert.ok(SLUGS.has(slug), `${rel.relationId} → ${slug} no es una ficha`);
      assert.equal(slug, matchRelation(rel), `${rel.relationId} (${rel.city}): mapeo desactualizado`);
    }
  });

  test(`${entry.id}: con un grado solo quedan sus plazas y las de titulación sin especificar`, () => {
    const degree = data.degrees[0].id;
    const view = buildUniversityView(data, mapping, degree);
    const all = [...view.bySlug.values()].flat().concat(view.pending.flatMap((g) => g.relations));
    assert.ok(all.length > 0);
    for (const rel of all) assert.ok(rel.degreesUnspecified || rel.degreeIds.includes(degree), rel.relationId);
    // Las ciudades sin ficha no aparecen en bySlug y viceversa.
    for (const g of view.pending) for (const rel of g.relations) assert.equal(mapping[rel.relationId], null);
    // Sin grado, todas las plazas.
    const full = buildUniversityView(data, mapping, null);
    const total = [...full.bySlug.values()].flat().length + full.pending.reduce((n, g) => n + g.relations.length, 0);
    assert.equal(total, data.relations.length);
  });
}

test("relationMatchesDegree y textos del distintivo", () => {
  const rel = { degreeIds: ["ade"], degreesUnspecified: false, agreementType: "Erasmus-SMS" };
  assert.equal(relationMatchesDegree(rel, null), true);
  assert.equal(relationMatchesDegree(rel, "ade"), true);
  assert.equal(relationMatchesDegree(rel, "giti"), false);
  assert.equal(relationMatchesDegree({ degreeIds: [], degreesUnspecified: true }, "giti"), true);
  assert.equal(getAgreementLabel("Bilateral studies"), "Bilateral");
  assert.equal(formatPlacesBadge([rel]), "1 plaza · Erasmus+");
  assert.equal(formatPlacesBadge([rel, { ...rel, agreementType: "SICUE" }]), "2 plazas · Erasmus+ · SICUE");
  assert.equal(formatPlacesBadge([]), "");
  assert.equal(getUniversityShareUrl("https://x.com", "loyola", "giti"), "https://x.com/?uni=loyola&grado=giti");
});
