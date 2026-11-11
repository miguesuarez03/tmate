// Uso: node show.cjs slug "regex1|regex2"  → líneas relevantes de la ciudad en los ficheros de datos
const fs = require("fs");
const [slug, pat] = process.argv.slice(2);
// Las claves con guion van entre comillas ("la-haya": {).
const key = /^[a-z]+$/.test(slug) ? slug : `"${slug}"`;
const re = new RegExp(pat || "\\d", "i");
const blocks = [
  ["src/data/cities.js", `slug: "${slug}"`, /^\s+slug: "/],
  ["src/data/insights.js", `  ${key}: {`, /^  [a-z-"]+: \{/],
  ["src/data/comparePhrases.js", `  ${key}: {`, /^  [a-z-"]+: \{/],
  ["src/data/weatherSeasons.js", `  ${key}: [`, /^  [a-z-"]+: \[/],
];
for (const [f, start, next] of blocks) {
  const lines = fs.readFileSync(f, "utf8").split("\n");
  let i = lines.findIndex((l) => l.includes(start));
  if (i < 0) { console.log(f, "SIN BLOQUE"); continue; }
  for (let k = i + 1; k < lines.length && !next.test(lines[k]); k++) {
    const l = lines[k];
    if (re.test(l) || f.includes("cities.js") && /language|costDetail|tips|phrase|description|highlights|universities/.test(l))
      console.log(`${f.split("/").pop()}:${k + 1}: ${l.trim().slice(0, 400)}`);
  }
}
