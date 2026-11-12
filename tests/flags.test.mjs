// Banderas y mapa: cada país con destinos tiene bandera SVG (no emoji, que
// Windows pinta como dos letras) y su rótulo en el mapa. `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";
import { getAllCities, getMapCountries } from "../src/lib/cities.js";
import { CITY_COORDS } from "../src/lib/cityCoords.js";
import { FLAG_CODES } from "../src/data/flagSprite.js";
import { flagEmojiToCode } from "../src/lib/flags.js";

const CITIES = getAllCities();
const SPRITE = readFileSync(new URL("../src/assets/flags.svg", import.meta.url), "utf8");
const SPRITE_IDS = new Set([...SPRITE.matchAll(/<symbol id="([a-z-]+)"/g)].map((m) => m[1]));

test("cada ciudad tiene una bandera que está en el sprite SVG", () => {
  for (const c of CITIES) {
    const code = flagEmojiToCode(c.emoji);
    assert.ok(code, `${c.slug}: «${c.emoji}» no es un emoji de bandera`);
    assert.ok(FLAG_CODES.has(code), `${c.slug}: falta «${code}» en flagSprite.js (npm run flags:sprite)`);
    assert.ok(SPRITE_IDS.has(code), `${c.slug}: falta el símbolo «${code}» en src/assets/flags.svg`);
  }
});

test("cada país con destinos tiene rótulo en el mapa, con bandera SVG", () => {
  const countries = getMapCountries();
  assert.ok(countries.length >= 40, `solo ${countries.length} países`);
  for (const c of countries) {
    assert.ok(c.position, `«${c.name}» no está en src/data/mapCountries.js`);
    for (const key of ["label", "center"]) {
      const [lng, lat] = c.position[key] || [];
      assert.ok(Math.abs(lng) <= 180 && Math.abs(lat) <= 90, `${c.name}: ${key} no válido`);
    }
    assert.ok(c.position.zoom > 0, `${c.name}: sin zoom`);
    assert.ok(SPRITE_IDS.has(flagEmojiToCode(c.flag)), `${c.name}: su bandera no está en el sprite`);
  }
  // Las ciudades escocesas se agrupan con Reino Unido, que lleva la británica.
  const uk = countries.find((c) => c.name === "Reino Unido");
  assert.equal(flagEmojiToCode(uk.flag), "gb");
  assert.ok(!countries.some((c) => c.name.includes("(")), "país con paréntesis en el mapa");
});

test("cada ciudad tiene coordenadas para su pin del mapa", () => {
  for (const c of CITIES) {
    const [lng, lat] = CITY_COORDS[c.slug] || [];
    assert.ok(Math.abs(lng) <= 180 && Math.abs(lat) <= 90, `${c.slug} sin coordenadas en cityCoords.js`);
  }
});

test("la UI no pinta emojis de bandera sueltos (siempre con <Flag>)", () => {
  // Una bandera emoji dentro de llaves JSX ({city.flag}, {c.emoji}) se vería
  // como dos letras en Windows. Se busca el patrón de pintarlas como texto.
  const offenders = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (extname(e.name) === ".jsx" && !full.endsWith("Flag.jsx")) {
        const src = readFileSync(full, "utf8");
        // {x.flag}, {x.cityEmoji} o {city.emoji}/{c.emoji}… (no {s.emoji} del clima).
        // La llave detrás de «=» es una prop (emoji={city.emoji}): eso está bien.
        const raw = /(?<!=)\{\s*[\w.?]*\.(?:flag|cityEmoji)\s*\}|(?<!=)\{\s*[\w.?]*\b(?:city|c|opt|dest\w*)\??\.emoji\s*\}/;
        if (raw.test(src)) offenders.push(full);
      }
    }
  };
  walk(new URL("../src", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
  assert.deepEqual(offenders, []);
});
