// ⚠️ IMPORTANTE: confirma que este es el dominio real donde está desplegado
// MAbroad (Vercel puede darte una URL distinta a menos que hayas conectado un
// dominio propio). Se usa para canonical URLs, Open Graph, sitemap.xml y
// robots.txt — si está mal, ayuda menos que no tenerlo, así que revísalo
// antes de publicar.
export const SITE_URL = "https://mabroad.com";
export const SITE_NAME = "MAbroad";

// Imagen OG/Twitter por defecto para páginas sin foto propia (home, comparador,
// City Match, beca, Learning Agreement). Las fichas de ciudad usan su heroImg.
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-512.png`,
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
      name: SITE_NAME,
      url: SITE_URL,
      description: "La guía definitiva para elegir tu ciudad Erasmus, con scores reales, comparador y calculadora de beca.",
    },
  ];
}

/** Migas de pan (Inicio › Ciudad) para las fichas de destino. */
export function getBreadcrumbJsonLd(city) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
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
    ...(city.heroImg ? { image: city.heroImg } : {}),
    containedInPlace: {
      "@type": "Country",
      name: city.country,
    },
  };
}
