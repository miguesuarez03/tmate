import { sizedImage } from "./images";
import { HOME_FAQS, BECA_FAQS } from "../data/faqs";

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
 * FAQPage (https://schema.org/FAQPage) a partir de las mismas preguntas que
 * se ven en la página (src/data/faqs.js): el texto del JSON-LD y el visible
 * son siempre idénticos. `path` es la ruta canónica de la página.
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
      acceptedAnswer: { "@type": "Answer", text: a },
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
