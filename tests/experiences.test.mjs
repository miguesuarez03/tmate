// «Lo que dicen los que viven allí»: estructura de src/data/cityExperiences.js.
import { test } from "node:test";
import assert from "node:assert/strict";
import { CITY_EXPERIENCES, FOUNDER_EXPERIENCE, EXPERIENCE_TOPICS } from "../src/data/cityExperiences.js";
import { getCityBySlug, getCityExperiences, getCityExperienceCards, getAllExperiences } from "../src/lib/cities.js";

test("cada experiencia es de una ciudad que existe y está completa", () => {
  for (const [slug, list] of Object.entries(CITY_EXPERIENCES)) {
    assert.ok(getCityBySlug(slug), `ciudad «${slug}» no existe`);
    for (const exp of list) {
      assert.ok(exp.name?.trim(), `${slug}: sin nombre`);
      assert.ok(exp.homeUniversity?.trim(), `${slug}/${exp.name}: sin universidad de origen`);
      assert.match(exp.course, /^\d{4}-\d{2}$/, `${slug}/${exp.name}: curso «${exp.course}» (formato 2026-27)`);
      assert.ok(exp.text?.trim() || exp.tips?.length, `${slug}/${exp.name}: sin texto ni consejos`);
      assert.ok(!("email" in exp), `${slug}/${exp.name}: el email no se publica`);
      for (const t of exp.tips || []) {
        assert.ok(EXPERIENCE_TOPICS[t.topic], `${slug}/${exp.name}: tema «${t.topic}» desconocido`);
        assert.ok(t.text?.trim(), `${slug}/${exp.name}: consejo vacío`);
      }
    }
    // Ninguna se pierde al pasarla a tarjeta.
    assert.equal(getCityExperiences(slug).length, list.length, slug);
  }
  for (const t of FOUNDER_EXPERIENCE.tips || []) assert.ok(EXPERIENCE_TOPICS[t.topic], `fundador: tema «${t.topic}»`);
});

test("las tarjetas llevan curso y consejos con su etiqueta; la del fundador va primera en su ciudad", () => {
  const [roma] = getCityExperiences("roma");
  assert.ok(roma, "Roma sin experiencias");
  assert.equal(roma.stayLabel, "Erasmus en Roma");
  assert.ok(roma.tips.every((t) => t.topicLabel));

  const cards = getCityExperienceCards(FOUNDER_EXPERIENCE.citySlug);
  assert.equal(cards[0].founder, true);
  assert.equal(cards[0].course, "2026-27");
  // El fundador nunca cuenta como opinión de la gente.
  assert.ok(getAllExperiences().every((e) => !e.founder));
});

test("anonymous: true publica «Estudiante de <universidad>» y nunca el nombre", async () => {
  const slug = "roma";
  const saved = CITY_EXPERIENCES[slug];
  try {
    CITY_EXPERIENCES[slug] = [{ ...saved[0], name: "Nombre Real", anonymous: true }];
    const [e] = getCityExperiences(slug);
    assert.equal(e.name, `Estudiante de ${saved[0].homeUniversity}`);
    assert.ok(!JSON.stringify(e).includes("Nombre Real"));
    // Entradas incompletas o con temas desconocidos se descartan, no rompen.
    CITY_EXPERIENCES[slug] = [{ name: "X", homeUniversity: "U", course: "2026-27", tips: [{ topic: "nope", text: "a" }] }];
    assert.equal(getCityExperiences(slug).length, 0);
  } finally {
    CITY_EXPERIENCES[slug] = saved;
  }
});
