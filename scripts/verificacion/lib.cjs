// Utilidades para aplicar correcciones por ciudad (reemplazos exactos, acotados al bloque de la ciudad).
const fs = require("fs");
const FILES = {
  C: ["src/data/cities.js", (s) => `slug: "${s}"`, /^\s+slug: "/],
  I: ["src/data/insights.js", (s) => `  ${s}: {`, /^  [a-z-"]+: \{/],
  P: ["src/data/comparePhrases.js", (s) => `  ${s}: {`, /^  [a-z-"]+: \{/],
  W: ["src/data/weatherSeasons.js", (s) => `  ${s}: [`, /^  [a-z-"]+: \[/],
};
function block(lines, start, next) {
  const i = lines.findIndex((l) => l.includes(start));
  if (i < 0) throw new Error("sin bloque " + start);
  let j = i + 1;
  while (j < lines.length && !next.test(lines[j])) j++;
  return [i, j];
}
/** Reemplazos dentro del bloque de una ciudad: city(slug, { C: [[a,b],...], I: [...], P: [...] }) */
function city(slug, spec) {
  for (const [k, pairs] of Object.entries(spec)) {
    const [file, start, next] = FILES[k];
    const lines = fs.readFileSync(file, "utf8").split("\n");
    const [i, j] = block(lines, start(slug), next);
    let t = lines.slice(i, j).join("\n");
    for (const [a, b] of pairs) {
      const n = t.split(a).length - 1;
      if (n !== 1) throw new Error(`${slug} ${k}: ${n} coincidencias para «${a.slice(0, 80)}»`);
      t = t.replace(a, () => b);
    }
    fs.writeFileSync(file, [...lines.slice(0, i), ...t.split("\n"), ...lines.slice(j)].join("\n"));
  }
}
/** Temperaturas por estación: temps(slug, { spring, summer, autumn, winter }) */
function temps(slug, t) {
  const [file] = FILES.W;
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const k = lines.findIndex((l) => l.startsWith(`  ${slug}: [`));
  if (k < 0) throw new Error("clima " + slug);
  for (let x = k + 1; x <= k + 4; x++) {
    const id = lines[x].match(/id: "(\w+)"/)[1];
    lines[x] = lines[x].replace(/temp: "[^"]*"/, `temp: "${t[id]}"`);
  }
  fs.writeFileSync(file, lines.join("\n"));
}
/** Reemplazos exactos en un fichero completo (cada uno debe aparecer una sola vez). */
function file(f, pairs) {
  let t = fs.readFileSync(f, "utf8");
  for (const [a, b] of pairs) {
    const n = t.split(a).length - 1;
    if (n !== 1) throw new Error(`${f}: ${n} coincidencias para «${a.slice(0, 80)}»`);
    t = t.replace(a, () => b);
  }
  fs.writeFileSync(f, t);
}
/** Cambia la puntuación de una categoría (id) de una ciudad en insights.js. */
function score(slug, id, from, to) {
  city(slug, { I: [[`id: "${id}",\n        label:`, `id: "${id}",\n        label:`]] }); // comprueba que existe
  const f = FILES.I[0];
  const lines = fs.readFileSync(f, "utf8").split("\n");
  const [i, j] = block(lines, FILES.I[1](slug), FILES.I[2]);
  const k = lines.findIndex((l, n) => n > i && n < j && l.includes(`id: "${id}"`));
  const s = lines.findIndex((l, n) => n > k && n < k + 6 && /^\s+score: /.test(l));
  if (!lines[s].includes(`score: ${from},`)) throw new Error(`${slug} ${id}: score no es ${from}: ${lines[s]}`);
  lines[s] = lines[s].replace(`score: ${from},`, `score: ${to},`);
  fs.writeFileSync(f, lines.join("\n"));
}
module.exports = { city, temps, file, score };
