// ─────────────────────────────────────────────────────────────────────────────
// scripts/match-university-cities.mjs — casa los convenios de una universidad
// (src/data/universities/<id>.json) con las ciudades que ya tienen ficha en
// MAbroad.
//
// Una relación casa con una ciudad de MAbroad si es del MISMO país y:
//   · su ciudad coincide por nombre (name, nameEn o un alias de ALIASES; los
//     nombres de la universidad vienen en español: «Ratisbona», «Groninga»…), o
//   · la universidad está a ≤ 15 km (Haversine) de la ciudad, salvo las
//     parejas de NOT_NEAR (ciudades distintas que caen dentro del radio).
// Si hay varias candidatas gana la coincidencia de nombre y, si no, la más
// cercana.
//
// Escribe:
//   · src/data/universities/<id>.cities.json  { relationId: citySlug | null }
//   · docs/destinos-pendientes-<id>.md         ciudades SIN ficha, ordenadas
//                                              por número de convenios (la cola
//                                              de trabajo para añadir fichas)
//
// Uso: npm run universities:match            (todas las del registro)
//      node --import ./tests/resolve-hook.mjs scripts/match-university-cities.mjs loyola
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { CITIES } from "../src/data/cities.js";
import { CITY_COORDS } from "../src/lib/cityCoords.js";
import { UNIVERSITY_REGISTRY } from "../src/data/universities/registry.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MAX_KM = 15;

/** Nombre de ciudad de la universidad → slug de MAbroad, cuando no coinciden. */
const ALIASES = {
  groninga: "groningen",
  roterdam: "rotterdam",
  // Solo se aplican dentro del mismo país (Santiago de Compostela no se ve afectado).
  santiago: "santiago-de-chile",
  upsala: "uppsala",
};

/** Ciudad de la universidad → slugs con los que NO debe casar por distancia
 *  aunque esté a ≤ MAX_KM: es otra ciudad y va a destinos pendientes. */
const NOT_NEAR = {
  bradford: ["leeds"],
};

const norm = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** «Escocia (Reino Unido)» → «Reino Unido», como getStateCountry(). */
const stateCountry = (country) => country?.match(/\(([^)]+)\)$/)?.[1] ?? country;

function haversineKm([lng1, lat1], [lng2, lat2]) {
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(a));
}

const MABROAD = CITIES.map((c) => ({
  slug: c.slug,
  name: c.name,
  country: norm(stateCountry(c.country)),
  names: new Set([norm(c.name), norm(c.nameEn), norm(c.slug.replace(/-/g, " "))]),
  coords: CITY_COORDS[c.slug] ?? null,
}));

/** Ciudad de MAbroad para una relación, o null. */
export function matchRelation(rel) {
  const country = norm(rel.country);
  const cityName = norm(rel.city);
  const alias = ALIASES[cityName];
  const sameCountry = MABROAD.filter((c) => c.country === country);
  const byName = sameCountry.find((c) => c.names.has(cityName) || (alias && c.slug === alias));
  if (byName) return byName.slug;
  if (typeof rel.lat !== "number" || typeof rel.lng !== "number") return null;
  let best = null;
  for (const c of sameCountry) {
    if (!c.coords || NOT_NEAR[cityName]?.includes(c.slug)) continue;
    const km = haversineKm(c.coords, [rel.lng, rel.lat]);
    if (km <= MAX_KM && (!best || km < best.km)) best = { slug: c.slug, km };
  }
  return best?.slug ?? null;
}

function pendingMarkdown(data, mapping) {
  const groups = new Map();
  for (const rel of data.relations) {
    if (mapping[rel.relationId]) continue;
    const key = `${rel.countryCode}|${rel.city}`;
    if (!groups.has(key)) groups.set(key, { city: rel.city, country: rel.country, domestic: rel.countryCode === "ES", coords: [], universities: new Map(), count: 0 });
    const g = groups.get(key);
    g.count += 1;
    if (typeof rel.lat === "number") g.coords.push([rel.lat, rel.lng]);
    g.universities.set(rel.university, (g.universities.get(rel.university) ?? 0) + 1);
  }
  const sorted = [...groups.values()].sort((a, b) => b.count - a.count || a.country.localeCompare(b.country, "es") || a.city.localeCompare(b.city, "es"));
  // España (SICUE) queda fuera de MAbroad por ahora: va en su propia lista,
  // no en la cola de fichas (igual que en la web, ver lib/universities.js).
  const rows = sorted.filter((r) => !r.domestic);
  const domestic = sorted.filter((r) => r.domestic);
  const total = rows.reduce((n, r) => n + r.count, 0);
  const domesticTotal = domestic.reduce((n, r) => n + r.count, 0);
  const fmt = (n) => n.toFixed(4);
  const lines = [
    `# Destinos de ${data.university.name} sin ficha en MAbroad`,
    "",
    `Generado por \`scripts/match-university-cities.mjs\` a partir de \`src/data/universities/${data.university.id}.json\` (portal de movilidad, extraído el ${data.university.extractedAt}). No editar a mano: vuelve a lanzar \`npm run universities:match\`.`,
    "",
    `Es la cola de trabajo para añadir fichas: ${rows.length} ciudades con ${total} convenios (de ${data.relations.length}) fuera de España que todavía no casan con ninguna ciudad de MAbroad (mismo país y nombre/alias, o universidad a ≤ ${MAX_KM} km). Ordenadas por número de convenios. Las coordenadas son las de la primera universidad de cada ciudad en el portal (algunas son aproximadas).`,
    "",
    "| # | Ciudad | País | Convenios | Coordenadas (lat, lng) | Universidades |",
    "|---|---|---|---|---|---|",
    ...rows.map((r, i) => {
      const unis = [...r.universities.entries()].map(([u, n]) => (n > 1 ? `${u} (${n})` : u)).join("; ");
      const c = r.coords[0];
      return `| ${i + 1} | ${r.city} | ${r.country} | ${r.count} | ${c ? `${fmt(c[0])}, ${fmt(c[1])}` : "—"} | ${unis.replace(/\|/g, "/")} |`;
    }),
    "",
  ];
  if (domestic.length) {
    lines.push(
      "## Destinos en España (SICUE): fuera por ahora",
      "",
      `MAbroad todavía no tiene fichas de ciudades españolas. En «Mi universidad» salen agrupados como «Destinos en España (SICUE): próximamente», sin ficha: ${domestic.length} ciudades con ${domesticTotal} convenios.`,
      "",
      "| Ciudad | Convenios | Universidades |",
      "|---|---|---|",
      ...domestic.map((r) => {
        const unis = [...r.universities.entries()].map(([u, n]) => (n > 1 ? `${u} (${n})` : u)).join("; ");
        return `| ${r.city} | ${r.count} | ${unis.replace(/\|/g, "/")} |`;
      }),
      "",
    );
  }
  return { md: lines.join("\n"), cities: rows.length, relations: total, domesticCities: domestic.length, domesticRelations: domesticTotal };
}

function run(id) {
  const entry = UNIVERSITY_REGISTRY.find((u) => u.id === id);
  if (!entry) throw new Error(`Universidad desconocida: ${id}`);
  const data = JSON.parse(readFileSync(join(ROOT, "src/data/universities", entry.file), "utf8"));
  const mapping = {};
  for (const rel of data.relations) mapping[rel.relationId] = matchRelation(rel);
  writeFileSync(join(ROOT, "src/data/universities", `${id}.cities.json`), `${JSON.stringify(mapping, null, 1)}\n`);
  // Lista ligera de grados (id + nombre) para el buscador «Tu uni y grado»:
  // va en el bundle inicial (registry.js), sin descargar los convenios.
  const degrees = data.degrees.map((d) => ({ id: d.id, name: d.name }));
  writeFileSync(
    join(ROOT, "src/data/universities", `${id}.degrees.js`),
    `// Generado por scripts/match-university-cities.mjs a partir de ${entry.file} — no editar a mano.\nexport default ${JSON.stringify(degrees, null, 1)};\n`
  );
  const { md, cities, relations, domesticCities, domesticRelations } = pendingMarkdown(data, mapping);
  mkdirSync(join(ROOT, "docs"), { recursive: true });
  writeFileSync(join(ROOT, "docs", `destinos-pendientes-${id}.md`), md);
  const matched = Object.values(mapping).filter(Boolean);
  console.log(
    `${id}: ${matched.length}/${data.relations.length} convenios casan con ${new Set(matched).size} ciudades de MAbroad; ` +
      `quedan ${relations} convenios en ${cities} ciudades sin ficha y ${domesticRelations} en ${domesticCities} ciudades de España (SICUE) ` +
      `(docs/destinos-pendientes-${id}.md).`
  );
}

// Solo al lanzarlo como script (los tests importan matchRelation sin escribir nada).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const ids = process.argv.slice(2);
  for (const id of ids.length ? ids : UNIVERSITY_REGISTRY.map((u) => u.id)) run(id);
}
