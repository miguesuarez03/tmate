import { sizedImage } from "./images";
import { HOME_FAQS, BECA_FAQS } from "../data/faqs";
// Ojo: este módulo se carga en la portada. No importar aquí src/data/guides.js
// (arrastraría el texto de las guías al bundle inicial): los JSON-LD de guías
// son funciones puras y la constante del índice vive en src/lib/guides.js.

// Dominio canónico: www. El apex (mabroad.com) redirige con 308 a www desde
// la configuración de dominios de Vercel, así que canonical, Open Graph,
// sitemap.xml y robots.txt deben apuntar SIEMPRE a www — si apuntan al apex,
// Google ve un canonical que redirige y lo ignora.
export const SITE_URL = "https://www.mabroad.com";
export const SITE_NAME = "MAbroad";
export const SITE_LOCALE = "es_ES";

// Imagen OG/Twitter por defecto (1200×630, imagen de marca) para páginas sin
// foto propia. Las fichas de ciudad usan su foto (ver getCityOgImage).
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE_ALT = "MAbroad — Descubre y compara tu ciudad Erasmus ideal";

/**
 * Foto de la ciudad para compartir (WhatsApp, redes). Las fotos originales
 * son de 1920px (300-800 kB): WhatsApp no muestra previsualizaciones de
 * imágenes muy pesadas, así que se pide una versión de 1280px a Wikimedia o
 * un recorte 1200×630 a Unsplash.
 */
export function getCityOgImage(city) {
  const src = city?.heroImg || city?.img;
  if (!src) return DEFAULT_OG_IMAGE;
  if (src.includes("images.unsplash.com")) return sizedImage(src, 1200, 630);
  return sizedImage(src, 1280);
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon-512.png`,
      width: 512,
      height: 512,
    },
  };
}

export function getWebsiteJsonLd() {
  // Array (varios nodos @type en un mismo <script type="application/ld+json">)
  // en vez de un solo objeto — válido en JSON-LD y evita tener que elegir
  // entre WebSite y Organization en la home, que necesita las dos.
  return [
    getOrganizationJsonLd(),
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      inLanguage: "es",
      description: "Guía para elegir tu ciudad Erasmus, con scores por categoría, comparador y calculadora de beca.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      // /?buscar=<texto> lleva a la ficha de la ciudad que mejor coincide
      // (ver HomePage). Es el mismo buscador del hero.
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?buscar={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

/**
 * Quita el formato inline ([texto](url) y **negrita**, el que pinta
 * GuideText) y deja solo el texto que se lee en pantalla.
 */
export function plainInline(text = "") {
  return String(text)
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}

/**
 * FAQPage (https://schema.org/FAQPage) a partir de las mismas preguntas que
 * se ven en la página (src/data/faqs.js): el texto del JSON-LD y el visible
 * son siempre idénticos (en el JSON-LD, sin el formato de los enlaces, que
 * en pantalla son <a>). `path` es la ruta canónica de la página.
 */
export function getFaqJsonLd(faqs, path) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path === "/" ? "/" : path}#faq`,
    inLanguage: "es",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: plainInline(a) },
    })),
  };
}

/**
 * JSON-LD completo por página con FAQ. Constantes de módulo (no se recrean en
 * cada render, así useSEO no reescribe el <script> sin motivo). Los usan la
 * página en el cliente y entry-server.jsx en el prerender.
 */
export const HOME_JSON_LD = [...getWebsiteJsonLd(), getFaqJsonLd(HOME_FAQS, "/")];
export const BECA_JSON_LD = getFaqJsonLd(BECA_FAQS, "/beca-erasmus");

/**
 * Article (https://developers.google.com/search/docs/appearance/structured-data/article)
 * para cada guía, con migas de pan Inicio › Guías › Guía. Autor y editor:
 * MAbroad como organización. Imagen: la de marca (1200×630).
 */
export function getGuideJsonLd(guide) {
  const url = `${SITE_URL}/guias/${guide.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: guide.title,
      description: guide.description,
      inLanguage: "es",
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      image: [DEFAULT_OG_IMAGE],
      author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
      publisher: { "@id": `${SITE_URL}/#organization`, "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon-512.png` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE_URL}/guias` },
        { "@type": "ListItem", position: 3, name: guide.title, item: url },
      ],
    },
  ];
}

/** Índice /guias: CollectionPage con la lista de guías. */
export function getGuidesIndexJsonLd(guides) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/guias#page`,
    name: "Guías Erasmus de MAbroad",
    inLanguage: "es",
    url: `${SITE_URL}/guias`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: guides.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/guias/${g.slug}`,
        name: g.title,
      })),
    },
  };
}

/**
 * /ranking/<slug>: ItemList con las ciudades en su orden (enlazan a su ficha)
 * + migas de pan Inicio › Rankings › Ranking. `entries` son las filas de
 * getErasmusRanking (lib/cities.js).
 */
export function getRankingJsonLd(criterion, entries) {
  const url = `${SITE_URL}/ranking/${criterion.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${url}#ranking`,
      name: criterion.title,
      description: criterion.description,
      url,
      inLanguage: "es",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: entries.length,
      itemListElement: entries.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${e.city.name}, ${e.city.country}`,
        url: `${SITE_URL}/city/${e.city.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Rankings", item: `${SITE_URL}/ranking` },
        { "@type": "ListItem", position: 3, name: criterion.title, item: url },
      ],
    },
  ];
}

/** Índice /ranking: CollectionPage con la lista de rankings. */
export function getRankingsIndexJsonLd(criteria) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/ranking#page`,
    name: "Rankings de ciudades Erasmus de MAbroad",
    inLanguage: "es",
    url: `${SITE_URL}/ranking`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: criteria.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/ranking/${c.slug}`,
        name: c.title,
      })),
    },
  };
}

/** Migas de pan (Inicio › Ciudad) para las fichas de destino. */
export function getBreadcrumbJsonLd(city) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: city.name, item: `${SITE_URL}/city/${city.slug}` },
    ],
  };
}

// Nota: se usa "TouristDestination" y NO se incluye aggregateRating —
// no tenemos un número real y verificable de reseñas/puntuaciones de
// usuarios detrás de cada score, así que añadir ese campo sería inventar
// una señal que Google podría mostrar como si fuera un rating verificado.
export function getCityJsonLd(city) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${city.name}, ${city.country}`,
    description: city.phrase || `Guía Erasmus de ${city.name}: coste de vida, vida social, seguridad y más.`,
    url: `${SITE_URL}/city/${city.slug}`,
    ...(city.heroImg || city.img ? { image: getCityOgImage(city) } : {}),
    containedInPlace: {
      "@type": "Country",
      name: city.country,
    },
  };
}
