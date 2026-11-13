// ─────────────────────────────────────────────────────────────────────────────
// Criterios de ranking: FUENTE ÚNICA para los chips de orden del comparador
// (?orden=<id>), las pestañas de rankings de la home y las páginas
// /ranking/<slug> (prerenderizadas y en el sitemap).
//
// Ningún criterio es un dato nuevo: todos salen de lo que ya tiene cada
// ciudad (ver getCriterionValue en src/lib/cities.js):
//   · source.kind "cost"    → el rango «mín–máx€/mes» de costDetail (cities.js)
//   · source.kind "score"   → la nota 0–10 de una de las 8 categorías (insights.js)
//   · source.kind "sub"     → una subnota del desglose (Clima, Nivel de inglés),
//                              que scripts/city-data.mjs copia al índice ligero
//   · source.kind "nota"    → una de las 8 subnotas de la nota MAbroad
//                              (src/lib/scoring.js: vida, seguridad…)
//   · source.kind "overall" → la nota MAbroad (pesos fijos, docs/scoring.md)
// Todo se normaliza a 0–10 (más alto = mejor para un estudiante). Son la
// valoración editorial de MAbroad: nunca presentarlos como datos oficiales.
//
// Si añades un criterio: ponle id (corto, va en la URL del comparador), slug
// (URL del ranking), textos y, si es una subnota nueva, añádela también a
// INDEX_SUBSCORES (src/lib/cityMetrics.js). La página, el sitemap y los chips
// salen solos de esta lista.
// ─────────────────────────────────────────────────────────────────────────────

/** Año que aparece en los títulos de los rankings (curso que se está eligiendo). */
export const RANKING_YEAR = 2027;

/** Cuántas ciudades enseña cada página de ranking. */
export const RANKING_TOP = 20;

export const RANKING_CRITERIA = [
  {
    id: "baratas",
    slug: "mas-baratas",
    chip: "Más baratas",
    label: "Coste de vida",
    icon: "coste",
    source: { kind: "cost" },
    title: `Las ciudades Erasmus más baratas en ${RANKING_YEAR}`,
    seoTitle: `Las ciudades Erasmus más baratas en ${RANKING_YEAR} | MAbroad`,
    description: `Top ${RANKING_TOP} de ciudades Erasmus+ más baratas para estudiar: coste mensual estimado (alojamiento, comida, transporte y ocio) de cada destino, de menor a mayor.`,
    intro: "Si la beca tiene que llegar para casi todo, el coste mensual del destino pesa más que cualquier otra cosa. Estas son las ciudades con beca Erasmus+ en las que vivir sale más barato.",
    method: "Ordenamos por el coste mensual estimado de cada ficha (alojamiento, comida, transporte y ocio): el punto medio del rango «mínimo–máximo €/mes». Si dos ciudades empatan, va primero la de mínimo más bajo. Son precios orientativos, no oficiales: compruébalos antes de decidir.",
  },
  {
    id: "vida-social",
    slug: "mas-vida-social",
    chip: "Más vida social",
    label: "Vida social",
    icon: "vida_social",
    source: { kind: "nota", id: "vida" },
    title: `Las ciudades Erasmus con más vida social en ${RANKING_YEAR}`,
    seoTitle: `Ciudades Erasmus con más vida social en ${RANKING_YEAR} | MAbroad`,
    description: `Top ${RANKING_TOP} de ciudades Erasmus+ con más vida estudiantil: secciones de ESN, estudiantes internacionales, fiesta y eventos. Ranking de MAbroad.`,
    intro: "Comunidad Erasmus grande, planes cada semana y noches largas: las ciudades con beca Erasmus+ donde más fácil es tener vida social desde el primer día.",
    method: "Ordenamos por la subnota «Vida estudiantil» de la nota MAbroad (0–10): la mitad es la comunidad (cuántas secciones de Erasmus Student Network hay en la ciudad y cuántos estudiantes internacionales tienen sus universidades según Times Higher Education) y la otra mitad, el ambiente (fiesta, vida nocturna y eventos, valoración de MAbroad). Si dos ciudades empatan, va primero la de mejor nota global.",
  },
  {
    id: "clima",
    slug: "mejor-clima",
    chip: "Mejor clima",
    label: "Clima",
    icon: "clima",
    source: { kind: "sub", id: "clima" },
    title: `Las ciudades Erasmus con mejor clima en ${RANKING_YEAR}`,
    seoTitle: `Ciudades Erasmus con mejor clima en ${RANKING_YEAR} | MAbroad`,
    description: `Top ${RANKING_TOP} de ciudades Erasmus+ con mejor clima para vivir el curso: inviernos suaves, más horas de sol y menos lluvia. Ranking con la nota de clima de MAbroad.`,
    intro: "El otoño y el invierno son la mayor parte del curso. Estas son las ciudades con beca Erasmus+ donde el clima acompaña más durante esos meses.",
    method: "Ordenamos por la subnota «Clima» de la categoría Estilo de vida (0–10), que valora lo llevadero que es el clima durante el curso según el desglose de cada ficha (temperaturas, lluvia, horas de luz). Si dos ciudades empatan, va primero la de mejor nota global.",
  },
  {
    id: "seguras",
    slug: "mas-seguras",
    chip: "Más seguras",
    label: "Seguridad",
    icon: "seguridad",
    source: { kind: "score", id: "seguridad" },
    title: `Las ciudades Erasmus más seguras en ${RANKING_YEAR}`,
    seoTitle: `Las ciudades Erasmus más seguras en ${RANKING_YEAR} | MAbroad`,
    description: `Top ${RANKING_TOP} de ciudades Erasmus+ más seguras para estudiantes: seguridad de día, de noche y ambiente de la ciudad, según la nota de seguridad de MAbroad.`,
    intro: "Volver a casa andando de noche sin pensarlo dos veces también cuenta. Estas son las ciudades con beca Erasmus+ que mejor nota de seguridad tienen.",
    method: "Ordenamos por la nota de «Seguridad» de cada ficha (0–10): seguridad general, seguridad nocturna y ambiente de la ciudad. Es una valoración editorial de MAbroad de cada ciudad, no una estadística oficial de criminalidad. La subnota de seguridad de la nota global usa otro dato, la tasa de homicidios del país (UNODC), que no distingue entre ciudades del mismo país. Si dos ciudades empatan, va primero la de mejor nota global.",
  },
  {
    id: "ingles",
    slug: "se-vive-en-ingles",
    chip: "Se vive en inglés",
    label: "Nivel de inglés",
    icon: "ingles",
    source: { kind: "sub", id: "ingles" },
    title: `Ciudades Erasmus donde se vive en inglés en ${RANKING_YEAR}`,
    seoTitle: `Ciudades Erasmus donde se vive en inglés (${RANKING_YEAR}) | MAbroad`,
    description: `Top ${RANKING_TOP} de ciudades Erasmus+ donde puedes hacer la vida diaria en inglés: universidad, trámites, tiendas y vida social. Ranking con la nota de inglés de MAbroad.`,
    intro: "Si no hablas el idioma local (o no quieres depender de él), estas son las ciudades con beca Erasmus+ donde el día a día funciona mejor en inglés.",
    method: "Ordenamos por la subnota «Nivel de inglés» de la categoría Integración internacional (0–10): lo fácil que es manejarse en inglés fuera de la universidad. Si dos ciudades empatan, va primero la de mejor nota global.",
  },
  {
    id: "alojamiento",
    slug: "alojamiento-mas-facil",
    chip: "Piso más fácil",
    label: "Alojamiento",
    icon: "alojamiento",
    source: { kind: "score", id: "alojamiento" },
    title: `Ciudades Erasmus donde es más fácil encontrar piso en ${RANKING_YEAR}`,
    seoTitle: `Erasmus ${RANKING_YEAR}: dónde es más fácil encontrar piso | MAbroad`,
    description: `Top ${RANKING_TOP} de ciudades Erasmus+ donde es más fácil encontrar alojamiento: disponibilidad, precio, facilidad de búsqueda y residencias universitarias.`,
    intro: "Encontrar habitación es el primer dolor de cabeza de muchos Erasmus. Estas son las ciudades con beca Erasmus+ donde menos cuesta conseguir sitio a un precio razonable.",
    method: "Ordenamos por la nota de «Alojamiento» de cada ficha (0–10): disponibilidad, precio, facilidad de búsqueda y residencias universitarias. Si dos ciudades empatan, va primero la de mejor nota global.",
  },
  {
    id: "empleo",
    slug: "mas-practicas-y-empleo",
    chip: "Más prácticas",
    label: "Empleo y prácticas",
    icon: "empleo",
    source: { kind: "score", id: "empleo" },
    title: `Las mejores ciudades Erasmus para prácticas y empleo en ${RANKING_YEAR}`,
    seoTitle: `Mejores ciudades Erasmus para prácticas en ${RANKING_YEAR} | MAbroad`,
    description: `Top ${RANKING_TOP} de ciudades Erasmus+ con más salidas: mercado laboral, prácticas, empresas relevantes y oportunidades para estudiantes, según la nota de empleo de MAbroad.`,
    intro: "Si quieres que el Erasmus también sume en el CV (o te planteas unas prácticas Erasmus+), estas son las ciudades con beca Erasmus+ con más oportunidades profesionales.",
    method: "Ordenamos por la nota de «Empleo y oportunidades» de cada ficha (0–10): mercado laboral, prácticas, empresas relevantes y oportunidades para estudiantes. Si dos ciudades empatan, va primero la de mejor nota global.",
  },
  {
    id: "nota",
    slug: "mejor-valoradas",
    chip: "Mejor nota global",
    label: "Nota global",
    icon: "overall",
    source: { kind: "overall" },
    title: `Las mejores ciudades Erasmus en ${RANKING_YEAR}`,
    seoTitle: `Las mejores ciudades Erasmus en ${RANKING_YEAR}: ranking | MAbroad`,
    description: `Top ${RANKING_TOP} de ciudades Erasmus+ con mejor nota MAbroad: coste, vida estudiantil, seguridad, nivel académico, alojamiento, clima, idioma y conexiones.`,
    intro: "Las ciudades con beca Erasmus+ que mejor salen cuando se mira todo a la vez: coste, vida estudiantil, seguridad, universidades, alojamiento, calidad de vida, idioma y conexiones para viajar.",
    method: "Ordenamos por la nota MAbroad: la media ponderada, con pesos fijos, de 8 subnotas (coste de vida 20 %, vida estudiantil 20 %, seguridad 15 %, nivel académico 10 %, alojamiento 10 %, calidad de vida y clima 10 %, idioma 10 % y conectividad 5 %). Cada subnota sale de un dato con fuente (coste mensual, secciones de ESN y estudiantes internacionales, tasa de homicidios de UNODC, ranking de Times Higher Education, Eurobarómetro) o de una valoración de MAbroad con criterio publicado. Si a una ciudad le falta un dato, su nota es provisional y se calcula con el resto. Si dos ciudades empatan, va primero la de nombre anterior en orden alfabético.",
  },
];

/** Metadatos del índice /ranking (mismos en cliente y prerender). */
export const RANKINGS_INDEX_META = {
  title: `Rankings de ciudades Erasmus ${RANKING_YEAR} | MAbroad`,
  description: `Las ciudades Erasmus+ más baratas, con más vida social, mejor clima, más seguras, donde se vive en inglés y más: ${RANKING_CRITERIA.length} rankings con el top ${RANKING_TOP} de cada uno.`,
};
