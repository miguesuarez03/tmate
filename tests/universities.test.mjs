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
    const all = [...view.bySlug.values()].flat()
      .concat(view.pending.flatMap((g) => g.relations), view.domestic.flatMap((g) => g.relations));
    assert.ok(all.length > 0);
    for (const rel of all) assert.ok(rel.degreesUnspecified || rel.degreeIds.includes(degree), rel.relationId);
    // Las ciudades sin ficha no aparecen en bySlug y viceversa.
    for (const g of view.pending) for (const rel of g.relations) assert.equal(mapping[rel.relationId], null);
    // Sin grado, todas las plazas.
    const full = buildUniversityView(data, mapping, null);
    const count = (groups) => groups.reduce((n, g) => n + g.relations.length, 0);
    const total = [...full.bySlug.values()].flat().length + count(full.pending) + count(full.domestic);
    assert.equal(total, data.relations.length);
    // España (SICUE) va aparte, nunca como «ficha en preparación».
    for (const g of full.pending) assert.ok(g.relations.every((r) => r.countryCode !== "ES"), g.city);
    for (const g of full.domestic) assert.ok(g.relations.every((r) => r.countryCode === "ES"), g.city);
  });
}

test("relationMatchesDegree y textos del distintivo", () => {
  const rel = { degreeIds: ["ade"], degreesUnspecified: false, agreementType: "Erasmus-SMS" };
  assert.equal(relationMatchesDegree(rel, null), true);
  assert.equal(relationMatchesDegree(rel, "ade"), true);
  assert.equal(relationMatchesDegree(rel, "giti"), false);
  assert.equal(relationMatchesDegree({ degreeIds: [], degreesUnspecified: true }, "giti"), true);
  assert.equal(getAgreementLabel("Bilateral studies"), "Bilateral");
  assert.equal(formatPlacesBadge([rel]), "1 convenio · Erasmus+");
  assert.equal(formatPlacesBadge([rel, { ...rel, agreementType: "SICUE" }]), "2 convenios · Erasmus+ · SICUE");
  assert.equal(formatPlacesBadge([]), "");
  assert.equal(getUniversityShareUrl("https://x.com", "loyola", "giti"), "https://x.com/?uni=loyola&grado=giti");
});

// ─── Parte A: programas, observaciones, invitación ──────────────────────────
import { readdirSync } from "node:fs";
import {
  isStudyRelation,
  splitNotes,
  scrubPersonalData,
  getInviteText,
  getDegreeShortName,
  formatAgreementCount,
} from "../src/lib/universities.js";

for (const entry of UNIVERSITY_REGISTRY) {
  test(`${entry.id}: los programas que no son de estudios van aparte y no cuentan`, () => {
    const data = readJson(entry.file);
    const mapping = readJson(`${entry.id}.cities.json`);
    const view = buildUniversityView(data, mapping, null, entry);
    const counted = [...view.bySlug.values()].flat()
      .concat(view.pending.flatMap((g) => g.relations), view.domestic.flatMap((g) => g.relations));
    for (const rel of counted) assert.ok(isStudyRelation(rel, entry), `${rel.relationId} (${rel.agreementType}) cuenta y no es de estudios`);
    const other = view.other.flatMap((o) => o.relations);
    for (const rel of other) assert.ok(!isStudyRelation(rel, entry), rel.relationId);
    assert.equal(counted.length + other.length, data.relations.length);
    // Una ciudad que solo tiene convenios de otros programas no entra en el filtro.
    for (const slug of view.slugs) assert.ok(view.bySlug.get(slug).every((r) => isStudyRelation(r, entry)), slug);
  });

  test(`${entry.id}: las opiniones de alumnos se separan y no llevan datos de contacto`, () => {
    const data = readJson(entry.file);
    for (const rel of data.relations) {
      for (const part of splitNotes(rel.notes)) {
        if (part.kind !== "student") continue;
        assert.doesNotMatch(part.text, /[\w.+-]+@[\w-]+\.[\w.-]+/, `${rel.relationId}: correo en una opinión`);
        assert.doesNotMatch(part.text, /(?:\d[\s-]?){9,}/, `${rel.relationId}: teléfono en una opinión`);
      }
    }
  });
}

test("splitNotes: notas de la universidad frente a opiniones de alumnos", () => {
  assert.deepEqual(splitNotes("Para GMA asignaturas de ingeniería\nUn alumno que hizo Erasmus en este destino comenta: \"La residencia es obligatoria\""), [
    { kind: "university", text: "Para GMA asignaturas de ingeniería" },
    { kind: "student", text: "La residencia es obligatoria" },
  ]);
  assert.deepEqual(splitNotes("Algunas asignaturas en alemán. Alumno dice: ¨Ve con la mente abierta¨ Se recomienda el segundo semestre."), [
    { kind: "university", text: "Algunas asignaturas en alemán." },
    { kind: "student", text: "Ve con la mente abierta" },
    { kind: "university", text: "Se recomienda el segundo semestre." },
  ]);
  // «se recomienda» (impersonal) es de la universidad, no de un alumno.
  assert.deepEqual(splitNotes("Para estudiantes de educación se recomienda solo el grado simple."), [
    { kind: "university", text: "Para estudiantes de educación se recomienda solo el grado simple." },
  ]);
  assert.deepEqual(splitNotes(null), []);
  assert.equal(scrubPersonalData("Escríbeme a ana.perez@uni.es o al 600 123 456"), "Escríbeme a [dato personal eliminado] o al [dato personal eliminado]");
});

test("invitación y chip: textos genéricos, sin universidad escrita a mano", () => {
  assert.deepEqual(getInviteText({}, [{ shortName: "Uni A" }]), { title: "¿Eres de Uni A?", cta: "Elige tu grado y ve solo tus destinos" });
  assert.equal(getInviteText({}, [{ shortName: "A" }, { shortName: "B" }]).title, "¿Tu universidad está en MAbroad?");
  assert.equal(getInviteText({ cityUniversity: { shortName: "Uni A", count: 1 } }).title, "Uni A tiene 1 convenio aquí.");
  assert.equal(getDegreeShortName("Administración y Dirección de Empresas (ADE)"), "ADE");
  assert.equal(getDegreeShortName("Psicología"), "Psicología");
  assert.equal(formatAgreementCount(4), "4 convenios");
});

test("ningún componente, página ni hook nombra a una universidad concreta (todo sale del registro)", () => {
  const names = UNIVERSITY_REGISTRY.flatMap((u) => [u.id, u.shortName, u.name]);
  const dirs = ["../src/components", "../src/pages", "../src/hooks"];
  const files = [];
  const walk = (url) => {
    for (const ent of readdirSync(url, { withFileTypes: true })) {
      const child = new URL(`${ent.name}${ent.isDirectory() ? "/" : ""}`, url);
      if (ent.isDirectory()) walk(child);
      else if (/\.(jsx?|tsx?)$/.test(ent.name)) files.push(child);
    }
  };
  for (const d of dirs) walk(new URL(`${d}/`, import.meta.url));
  for (const file of files) {
    // Sin comentarios: en ellos sí se puede poner Loyola como ejemplo.
    const code = readFileSync(file, "utf8")
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
    for (const n of names) {
      assert.ok(!new RegExp(`\\b${n}\\b`, "i").test(code), `${file.pathname.split("/src/")[1]} nombra «${n}»`);
    }
  }
});

test("splitNotes: casos reales de Loyola (varias citas seguidas, temas, comillas mezcladas)", async () => {
  const { getRelationNotes } = await import("../src/lib/universities.js");
  const data = readJson("loyola.json");
  const notes = (id) => getRelationNotes(data.relations.find((r) => r.relationId === id), readJson("loyola.notes.json"));
  const kinds = (id) => notes(id).map((p) => p.kind);
  // Praga: «"…" y también "…"» son dos opiniones; el límite de créditos es de la universidad.
  assert.deepEqual(kinds("78"), ["university", "student", "student", "university"]);
  // Roskilde: «Sobre alojamiento, estudiantes dicen:» no deja un «Sobre alojamiento» suelto.
  assert.ok(notes("1322").every((p) => p.kind === "student"));
  assert.ok(notes("1322").some((p) => p.text.startsWith("Sobre alojamiento: ")));
  // Seúl: abre con ¨ y cierra con ": no se come el resto.
  const seul = notes("1096");
  assert.equal(seul[0].kind, "university");
  assert.ok(seul.slice(1).every((p) => p.kind === "student"));
  assert.ok(seul.some((p) => p.text.startsWith("Sobre lo académico: ")));
  // Würzburg: párrafo de alumno en primera persona, separado a mano (loyola.notes.json).
  for (const id of ["203", "208"]) {
    const parts = notes(id);
    assert.deepEqual(parts[0], { kind: "university", text: "Algunas asignaturas en alemán" });
    assert.ok(parts.some((p) => p.kind === "student" && p.text.includes("nos queda por cursar")), id);
  }
});

test("las observaciones separadas a mano son de convenios que existen y copian su texto", () => {
  for (const entry of UNIVERSITY_REGISTRY) {
    let overrides;
    try {
      overrides = readJson(`${entry.id}.notes.json`);
    } catch {
      continue;
    }
    const data = readJson(entry.file);
    const squash = (s) => String(s).replace(/[\s¨"“”«»]+/g, " ").toLowerCase().trim();
    for (const [id, parts] of Object.entries(overrides)) {
      if (id.startsWith("_")) continue;
      const rel = data.relations.find((r) => r.relationId === id);
      assert.ok(rel, `${entry.id}.notes.json: no existe el convenio ${id}`);
      for (const p of parts) assert.ok(squash(rel.notes).includes(squash(p.text)), `${id}: «${p.text.slice(0, 40)}…» no está en sus observaciones`);
    }
  }
});
