// FAQ (src/data/faqs.js): el JSON-LD FAQPage lleva el mismo texto que se ve,
// sin el formato [texto](url), y los enlaces internos apuntan a rutas reales.
// `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { HOME_FAQS, BECA_FAQS } from "../src/data/faqs.js";
import { HOME_JSON_LD, BECA_JSON_LD, plainInline } from "../src/lib/seo.js";
import { ROUTES } from "../src/routes.js";
import { matchPath } from "react-router-dom";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const HOME_ANCHORS = new Set(["#destinos"]);

function faqPage(jsonLd) {
  return [jsonLd].flat().find((n) => n["@type"] === "FAQPage");
}

for (const [name, faqs, jsonLd] of [
  ["home", HOME_FAQS, HOME_JSON_LD],
  ["beca", BECA_FAQS, BECA_JSON_LD],
]) {
  test(`FAQ ${name}: el JSON-LD repite las preguntas y respuestas visibles, en texto plano`, () => {
    const page = faqPage(jsonLd);
    assert.ok(page, "falta el nodo FAQPage");
    assert.equal(page.mainEntity.length, faqs.length);
    page.mainEntity.forEach((entry, i) => {
      assert.equal(entry.name, faqs[i].q);
      assert.equal(entry.acceptedAnswer.text, plainInline(faqs[i].a));
      assert.doesNotMatch(entry.acceptedAnswer.text, /\]\(|\*\*/, `formato sin quitar en «${faqs[i].q}»`);
    });
  });

  test(`FAQ ${name}: los enlaces internos van a rutas que existen`, () => {
    for (const { q, a } of faqs) {
      for (const [, , href] of a.matchAll(LINK)) {
        if (href.startsWith("#")) {
          assert.ok(name === "home" && HOME_ANCHORS.has(href), `ancla desconocida ${href} en «${q}»`);
          continue;
        }
        if (!href.startsWith("/")) continue;
        const path = href.split(/[?#]/)[0];
        const route = ROUTES.find((r) => r.path !== "*" && !r.redirect && matchPath({ path: r.path, end: true }, path));
        assert.ok(route, `ruta inexistente ${href} en «${q}»`);
      }
    }
  });
}
