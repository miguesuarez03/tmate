// SEO de «Mi universidad»: /universidades/<id> y el bloque de convenios de
// cada ficha (datos generados por scripts/city-data.mjs). `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildCityData } from "../scripts/city-data.mjs";
import { UNIVERSITY_REGISTRY } from "../src/data/universities/registry.js";
import {
  buildUniversityPageView, getDegreeSummaries, getUniversityFaqs, getUniversityPageMeta, getUniversityPageJsonLd,
  isStudyRelation, relationMatchesDegree, countryAnchor, DOMESTIC_COUNTRY_CODE,
} from "../src/lib/universities.js";

const { details, universityPages } = buildCityData();
const readJson = (file) => JSON.parse(readFileSync(new URL(`../src/data/universities/${file}`, import.meta.url), "utf8"));

for (const entry of UNIVERSITY_REGISTRY) {
  const data = readJson(entry.file);
  const mapping = readJson(`${entry.id}.cities.json`);
  const page = universityPages[entry.id];
  const abroad = data.relations.filter((r) => r.countryCode !== DOMESTIC_COUNTRY_CODE);

  test(`${entry.id}: la página tiene todos los convenios fuera de España y ninguno de España (SICUE)`, () => {
    assert.equal(page.relations.length, abroad.length);
    assert.ok(page.relations.every((r) => r.countryCode !== DOMESTIC_COUNTRY_CODE));
    const study = abroad.filter((r) => isStudyRelation(r, entry));
    assert.equal(page.totals.agreements, study.length);
    assert.equal(page.totals.countries, new Set(study.map((r) => r.countryCode)).size);
    // Los de otros programas (MAGIS…) van aparte.
    const view = buildUniversityPageView(page);
    assert.equal(view.other.reduce((n, o) => n + o.count, 0), abroad.length - study.length);
    assert.equal(view.countries.reduce((n, c) => n + c.count, 0), study.length);
  });

  test(`${entry.id}: filtrar por grado da los mismos convenios que el modo «Mi universidad»`, () => {
    for (const d of entry.degrees.slice(0, 6)) {
      const expected = abroad.filter((r) => isStudyRelation(r, entry) && relationMatchesDegree(r, d.id)).length;
      assert.equal(buildUniversityPageView(page, d.id).totals.agreements, expected, d.id);
    }
    const summaries = getDegreeSummaries(entry, page);
    assert.ok(summaries.length > 0);
    // Las anclas de grado y de país no chocan entre sí ni con las de la página.
    const ids = [...summaries.map((s) => s.id), ...buildUniversityPageView(page).countries.map((c) => c.anchor), "destinos", "grados", "faq"];
    assert.equal(new Set(ids).size, ids.length);
  });

  test(`${entry.id}: cada ficha lleva sus convenios en su chunk, con las observaciones ya separadas`, () => {
    const bySlug = {};
    for (const r of abroad) if (mapping[r.relationId]) (bySlug[mapping[r.relationId]] ??= []).push(r);
    for (const [slug, rels] of Object.entries(bySlug)) {
      const a = details[slug].universityAgreements?.find((x) => x.id === entry.id);
      assert.ok(a, `${slug} sin convenios en su chunk`);
      assert.equal(a.study.length + a.other.length, rels.length, slug);
      assert.equal(a.count, a.study.length);
      for (const r of [...a.study, ...a.other]) {
        assert.equal(r.notes, undefined, "el texto crudo no viaja: solo noteParts");
        for (const p of r.noteParts ?? []) if (p.kind === "student") assert.doesNotMatch(p.text, /@[\w-]+\./);
      }
    }
  });

  test(`${entry.id}: meta, FAQ y JSON-LD (ItemList, BreadcrumbList, FAQPage) con «convenios», nunca «plazas» como cifra`, () => {
    const meta = getUniversityPageMeta(entry, page);
    assert.ok(meta.title.length <= 70, meta.title);
    assert.ok(meta.description.length <= 200, meta.description);
    assert.match(meta.description, /convenios/);
    assert.doesNotMatch(`${meta.title} ${meta.description}`, /plazas/i);
    const faqs = getUniversityFaqs(entry, page);
    assert.ok(faqs.length >= 3);
    for (const f of faqs) assert.match(f.source, /^https:\/\//, f.q);
    const ld = getUniversityPageJsonLd(entry, page);
    assert.deepEqual(ld.map((x) => x["@type"]), ["ItemList", "BreadcrumbList", "FAQPage"]);
    assert.equal(ld[2].mainEntity.length, faqs.length);
    assert.ok(ld[0].itemListElement.every((i) => i.url.includes("/city/")));
    assert.equal(ld[1].itemListElement.at(-1).item, `https://www.mabroad.com/universidades/${entry.id}`);
  });
}

test("ancla de país: sin tildes ni espacios", () => {
  assert.equal(countryAnchor("Reino Unido"), "pais-reino-unido");
  assert.equal(countryAnchor("Bélgica"), "pais-belgica");
});
