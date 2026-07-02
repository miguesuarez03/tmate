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

import { CITIES } from "./data/cities";
import { getCityBySlug, getOverallScore, getCityMeta, getHomeMeta } from "./lib/cities";
import { getCityJsonLd, getWebsiteJsonLd, SITE_URL, SITE_NAME } from "./lib/seo";

const DEFAULT_TITLE = "TMate — Descubre tu próximo Erasmus";

// ─── Metadatos por ruta estática (idénticos a los que cada página pasa a
//     useSEO). Fuente única de verdad para el prerender. ───────────────────────
const STATIC_PAGE_META = {
  "/proceso": {
    title: "¿Cómo funciona el Erasmus? — Guía completa paso a paso | TMate",
    description:
      "Todo el proceso Erasmus explicado en 8 pasos: desde elegir destino hasta volver a casa. Guía práctica y honesta para estudiantes.",
    changefreq: "monthly",
    priority: 0.7,
  },
  "/comparar": {
    title: "Comparador de ciudades Erasmus — Pon tus destinos lado a lado | TMate",
    description:
      "Compara hasta 3 ciudades Erasmus a la vez: coste de vida, vida social, seguridad, empleo y más. Radar comparativo, diferencias destacadas y resumen automático.",
    changefreq: "monthly",
    priority: 0.8,
  },
  "/city-match": {
    title: "City Match — Encuentra tu ciudad Erasmus ideal | TMate",
    description:
      "Responde 8 preguntas sobre presupuesto, clima, idioma y estilo de vida, y descubre qué ciudades Erasmus encajan mejor contigo.",
    changefreq: "monthly",
    priority: 0.8,
  },
  "/learning-agreement": {
    title: "Learning Agreement Erasmus — Guía completa para convalidar todo | TMate",
    description:
      "Cómo preparar el Learning Agreement paso a paso: histórico de convalidaciones, OLA digital, cambios durante la estancia y consejos reales de estudiantes.",
    changefreq: "monthly",
    priority: 0.7,
  },
  "/beca-erasmus": {
    title: "Beca Erasmus+: cuánto se cobra y cómo funciona | TMate",
    description:
      "Guía completa de la beca Erasmus+ para estudiantes españoles: importes por país, complementos, compatibilidad con MEC y estimador de cuánto cobrarías.",
    changefreq: "monthly",
    priority: 0.7,
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
  })),
  ...CITIES.map((c) => ({
    path: `/city/${c.slug}`,
    changefreq: "monthly",
    priority: 0.9,
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
      ogImage: null,
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
        ogImage: m.ogImage || null,
        jsonLd: getCityJsonLd(city),
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
      ogImage: null,
      jsonLd: null,
    };
  }

  // Fallback
  return {
    title: DEFAULT_TITLE,
    description:
      "La guía definitiva para elegir tu ciudad Erasmus, con scores reales, comparador y calculadora de beca.",
    canonical,
    ogType: "website",
    ogImage: null,
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

export { SITE_URL, SITE_NAME };
