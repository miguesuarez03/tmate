// ─────────────────────────────────────────────────────────────────────────────
// Idioma: cuánto se puede vivir en inglés o en español en cada país (subnota
// «Idioma» de la nota MAbroad, ver src/lib/scoring.js y docs/scoring.md).
//
//   · english: % de la población que dice hablar inglés lo bastante bien como
//     para mantener una conversación (lengua materna incluida). Fuente:
//     Eurobarómetro Especial 540 «Europeans and their languages» (Comisión
//     Europea, trabajo de campo septiembre–octubre de 2023, publicado en 2024),
//     tabla D48.alllang, fila «English», del Volumen A:
//     https://data.europa.eu/data/datasets/s2979_100_1_sp540_eng
//     El Eurobarómetro solo cubre los 27 países de la UE.
//   · native: el inglés o el español es la lengua oficial y mayoritaria del
//     país (para un estudiante español, se vive en su idioma o en inglés).
//
// Un país que no está aquí (Suiza, Noruega, Islandia, Turquía, Brasil, Macedonia
// del Norte y los de Asia, África y Oceanía; en India y Filipinas el inglés es
// oficial pero no mayoritario, y Australia no tiene lengua oficial de iure) no
// tiene dato comparable de la misma fuente: la subnota queda PENDIENTE.
// Montreal y Quebec (francófonas) también: CITY_LANGUAGE_PENDING.
// ─────────────────────────────────────────────────────────────────────────────

export const LANGUAGE_SOURCE = {
  name: "Eurobarómetro Especial 540 (Comisión Europea, 2024)",
  url: "https://data.europa.eu/data/datasets/s2979_100_1_sp540_eng",
};

/** país (como en cities.js) → { english: % } o { native: "inglés" | "español" } */
export const COUNTRY_LANGUAGE = {
  // UE — Eurobarómetro 540, D48.alllang (English)
  "Bélgica": { english: 61 },
  "Bulgaria": { english: 30 },
  "República Checa": { english: 43 },
  "Dinamarca": { english: 90 },
  "Alemania": { english: 66 },
  "Estonia": { english: 59 },
  "Irlanda": { english: 97 },
  "Grecia": { english: 52 },
  "Francia": { english: 42 },
  "Croacia": { english: 45 },
  "Italia": { english: 34 },
  "Chipre": { english: 80 },
  "Letonia": { english: 55 },
  "Lituania": { english: 45 },
  "Hungría": { english: 31 },
  "Malta": { english: 91 },
  "Países Bajos": { english: 95 },
  "Austria": { english: 59 },
  "Polonia": { english: 31 },
  "Portugal": { english: 42 },
  "Rumanía": { english: 27 },
  "Eslovenia": { english: 62 },
  "Eslovaquia": { english: 40 },
  "Finlandia": { english: 82 },
  "Suecia": { english: 91 },
  // Lengua oficial y mayoritaria inglesa
  "Reino Unido": { native: "inglés" },
  "Escocia (Reino Unido)": { native: "inglés" },
  "Estados Unidos": { native: "inglés" },
  "Canadá": { native: "inglés" },
  // Lengua oficial y mayoritaria española
  "México": { native: "español" },
  "Colombia": { native: "español" },
  "Perú": { native: "español" },
  "Argentina": { native: "español" },
  "Uruguay": { native: "español" },
  "República Dominicana": { native: "español" },
  "Paraguay": { native: "español" },
  "Panamá": { native: "español" },
  "Guatemala": { native: "español" },
  "El Salvador": { native: "español" },
  "Ecuador": { native: "español" },
  "Costa Rica": { native: "español" },
  "Chile": { native: "español" },
  "Bolivia": { native: "español" },
  // Constitución de Honduras, art. 6 («El idioma oficial de Honduras es el español») y de Venezuela,
  // art. 9 («El idioma oficial es el castellano»).
  "Honduras": { native: "español" },
  "Venezuela": { native: "español" },
};

/**
 * Ciudades de un país con dato que no se le puede aplicar: Montreal y Quebec
 * están en la provincia francófona de Canadá (el francés es la lengua oficial
 * y mayoritaria allí). Pendiente del dato del censo de Statistics Canada.
 */
export const CITY_LANGUAGE_PENDING = {
  montreal: "Ciudad francófona: pendiente del dato del censo de Canadá sobre conocimiento del inglés.",
  quebec: "Ciudad francófona: pendiente del dato del censo de Canadá sobre conocimiento del inglés.",
};
