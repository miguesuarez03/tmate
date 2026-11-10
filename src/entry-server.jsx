// ─────────────────────────────────────────────────────────────────────────────
// entry-server.jsx — Punto de entrada de RENDERIZADO EN SERVIDOR (SSG)
//
// Este fichero NO forma parte del bundle de cliente. Lo usa solo el script
// scripts/prerender.mjs en tiempo de BUILD para generar un index.html real
// (con contenido y metadatos) por cada ruta.
//
// Idea clave: los <head> por página (title/description/canonical/JSON-LD) se
// calculan aquí con las MISMAS funciones puras que usa el cliente
// (getCityMeta, getHomeMeta, getCityJsonLd, getWebsiteJsonLd). Así el HTML
// estático y el runtime del cliente siempre coinciden, y Google recibe los
// metadatos correctos sin ejecutar JavaScript.
//
// Los componentes NO se tocan: se renderizan tal cual con renderToString.
// Los efectos (useEffect) no se ejecutan en servidor, por eso todo el acceso
// a window/document/localStorage (que vive en efectos) es inofensivo aquí.
// ─────────────────────────────────────────────────────────────────────────────

import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { renderToString } from "react-dom/server";

// Páginas importadas de forma EAGER (no lazy): con renderToString, un
// componente lazy sin resolver haría que Suspense pintara el fallback en vez
// del contenido. Importándolas directas garantizamos HTML completo.
import HomePage from "./pages/HomePage";
import CityDetailPage from "./pages/CityDetailPage";
import ProcesoPage from "./pages/ProcesoPage";
import ComparePage from "./pages/ComparePage";
import LearningAgreementPage from "./pages/LearningAgreementPage";
import BecaErasmusPage from "./pages/BecaErasmusPage";
import CityMatchPage from "./pages/CityMatchPage";
import TiposDeIntercambioPage from "./pages/TiposDeIntercambioPage";
import PrivacidadPage from "./pages/PrivacidadPage";
import CreditosPage from "./pages/CreditosPage";
import NotFoundPage from "./pages/NotFoundPage";

import { CITIES } from "./data/cities";
import { getCityBySlug, getOverallScore, getCityMeta, getHomeMeta } from "./lib/cities";
import {
  getCityJsonLd, getBreadcrumbJsonLd, getWebsiteJsonLd,
  SITE_URL, SITE_NAME, SITE_LOCALE,
  DEFAULT_OG_IMAGE, DEFAULT_OG_IMAGE_WIDTH, DEFAULT_OG_IMAGE_HEIGHT, DEFAULT_OG_IMAGE_ALT,
} from "./lib/seo";

// Imagen de marca por defecto (1200×630) con sus dimensiones y alt, para que
// WhatsApp/redes la pinten en grande sin tener que descargarla primero.
const DEFAULT_OG = {
  ogImage: DEFAULT_OG_IMAGE,
  ogImageWidth: DEFAULT_OG_IMAGE_WIDTH,
  ogImageHeight: DEFAULT_OG_IMAGE_HEIGHT,
  ogImageAlt: DEFAULT_OG_IMAGE_ALT,
};

const DEFAULT_TITLE = "MAbroad — Descubre y compara tu ciudad Erasmus ideal";

// ─── Metadatos por ruta estática (idénticos a los que cada página pasa a
//     useSEO). Fuente única de verdad para el prerender. ───────────────────────
const STATIC_PAGE_META = {
  "/proceso": {
    title: "¿Cómo funciona el Erasmus? Guía paso a paso | MAbroad",
    description:
      "Todo el proceso Erasmus explicado en 8 pasos: desde elegir destino hasta volver a casa. Guía práctica, honesta y sin rodeos para estudiantes.",
    changefreq: "weekly",
    priority: 0.8,
  },
  "/comparar": {
    title: "Comparador de ciudades Erasmus lado a lado | MAbroad",
    description:
      "Compara hasta 3 ciudades Erasmus a la vez: coste de vida, vida social, seguridad, empleo y más. Radar comparativo, diferencias destacadas y resumen automático.",
    changefreq: "weekly",
    priority: 0.8,
  },
  "/city-match": {
    title: "City Match — Encuentra tu ciudad Erasmus ideal | MAbroad",
    description:
      "Responde 10 preguntas sobre tu presupuesto, clima ideal, idioma y estilo de vida, y descubre en segundos qué ciudad Erasmus encaja mejor contigo.",
    changefreq: "weekly",
    priority: 0.8,
  },
  "/learning-agreement": {
    title: "Learning Agreement Erasmus: la guía completa | MAbroad",
    description:
      "Cómo preparar el Learning Agreement paso a paso: histórico de convalidaciones, OLA digital, cambios durante la estancia y consejos reales de estudiantes.",
    changefreq: "weekly",
    priority: 0.8,
  },
  "/beca-erasmus": {
    title: "Beca Erasmus+: cuánto se cobra y cómo funciona | MAbroad",
    description:
      "Guía completa de la beca Erasmus+ para estudiantes españoles: importes por país, complementos, compatibilidad con MEC y estimador de cuánto cobrarías.",
    changefreq: "weekly",
    priority: 0.8,
  },
  "/tipos-de-intercambio": {
    title: "Tipos de intercambio: Erasmus+, UK y Suiza | MAbroad",
    description:
      "Erasmus+, Reino Unido y Suiza explicados con detalle: qué es cada programa, si necesitas visado y cómo funciona la financiación en cada caso.",
    changefreq: "monthly",
    priority: 0.6,
  },
  "/privacidad": {
    title: "Privacidad y cookies | MAbroad",
    description:
      "Qué datos trata MAbroad y para qué: analítica anónima sin cookies (Vercel Web Analytics), formulario de feedback y preferencias guardadas en tu navegador.",
    changefreq: "yearly",
    priority: 0.2,
  },
  // noindex: se prerenderiza (con <meta robots noindex>, sin canonical) pero
  // no entra en el sitemap.
  "/creditos": {
    title: "Créditos de las fotos | MAbroad",
    description: "Autores y licencias de las fotos de las ciudades de MAbroad, de Wikimedia Commons.",
    changefreq: "yearly",
    priority: 0.1,
    noindex: true,
  },
};

/**
 * Lista completa de rutas a prerenderizar, con sus metadatos de sitemap.
 * Fuente única de verdad — la usan tanto el prerender como el sitemap.
 */
export const ALL_ROUTES = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  ...Object.entries(STATIC_PAGE_META).map(([path, m]) => ({
    path,
    changefreq: m.changefreq,
    priority: m.priority,
    noindex: Boolean(m.noindex),
  })),
  ...CITIES.map((c) => ({
    path: `/city/${c.slug}`,
    changefreq: "monthly",
    priority: 0.6,
  })),
];

/**
 * Devuelve los metadatos SEO de una ruta concreta (title, description,
 * canonical, JSON-LD, Open Graph). Reutiliza las funciones puras existentes.
 */
export function getMetaForPath(pathname) {
  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;

  // Home
  if (pathname === "/") {
    const m = getHomeMeta();
    return {
      title: m.title || DEFAULT_TITLE,
      description: m.description,
      canonical,
      ogType: "website",
      ...DEFAULT_OG,
      jsonLd: getWebsiteJsonLd(),
    };
  }

  // Ficha de ciudad
  if (pathname.startsWith("/city/")) {
    const slug = pathname.replace("/city/", "").replace(/\/$/, "");
    const city = getCityBySlug(slug);
    if (city) {
      const overall = getOverallScore(slug);
      const m = getCityMeta(city, overall);
      return {
        title: m.title || DEFAULT_TITLE,
        description: m.description,
        canonical,
        ogType: "article",
        ogImage: m.ogImage || DEFAULT_OG_IMAGE,
        ogImageAlt: `Vista de ${city.name}, ${city.country}`,
        jsonLd: [getCityJsonLd(city), getBreadcrumbJsonLd(city)],
      };
    }
  }

  // Páginas estáticas
  const m = STATIC_PAGE_META[pathname];
  if (m) {
    return {
      title: m.title,
      description: m.description,
      canonical,
      ogType: "website",
      ...DEFAULT_OG,
      jsonLd: null,
      noindex: Boolean(m.noindex),
    };
  }

  // Fallback
  return {
    title: DEFAULT_TITLE,
    description:
      "La guía definitiva para elegir tu ciudad Erasmus, con scores reales, comparador y calculadora de beca.",
    canonical,
    ogType: "website",
    ...DEFAULT_OG,
    jsonLd: null,
  };
}

function App({ url }) {
  return (
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/city/:slug" element={<CityDetailPage />} />
        <Route path="/proceso" element={<ProcesoPage />} />
        <Route path="/comparar" element={<ComparePage />} />
        <Route path="/learning-agreement" element={<LearningAgreementPage />} />
        <Route path="/beca-erasmus" element={<BecaErasmusPage />} />
        <Route path="/city-match" element={<CityMatchPage />} />
        <Route path="/tipos-de-intercambio" element={<TiposDeIntercambioPage />} />
        <Route path="/privacidad" element={<PrivacidadPage />} />
        <Route path="/creditos" element={<CreditosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </StaticRouter>
  );
}

/**
 * Renderiza una ruta a HTML de body + devuelve sus metadatos.
 * @param {string} url  ruta absoluta, p.ej. "/city/berlin"
 * @returns {{ appHtml: string, meta: object }}
 */
export function renderPage(url) {
  const appHtml = renderToString(<App url={url} />);
  const meta = getMetaForPath(url);
  return { appHtml, meta };
}

/**
 * Renderiza la página 404 (dist/404.html). noindex y sin canonical.
 */
export function renderNotFound() {
  const appHtml = renderToString(<App url="/404" />);
  return {
    appHtml,
    meta: {
      title: "Página no encontrada | MAbroad",
      description: "Esta página no existe o se ha movido. Vuelve al inicio para explorar las ciudades Erasmus de MAbroad.",
      canonical: `${SITE_URL}/`,
      ogType: "website",
      ...DEFAULT_OG,
      jsonLd: null,
      noindex: true,
    },
  };
}

export { SITE_URL, SITE_NAME, SITE_LOCALE };
