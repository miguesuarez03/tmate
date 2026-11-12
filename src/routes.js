// ─────────────────────────────────────────────────────────────────────────────
// Tabla de rutas — FUENTE ÚNICA para el cliente (App.jsx), el prerender
// (entry-server.jsx) y la hidratación (main.jsx).
//
// Cada ruta dice qué página pinta (`page`, nombre del fichero en src/pages/)
// y, si hace falta, qué datos deben estar YA cargados para pintarla de una
// vez (`data`): el prerender los espera antes de renderToString y main.jsx
// antes de hidratar, así el primer render del navegador es idéntico al HTML.
//
// `urlState`: la página pinta otra cosa según la query o el hash (filtros,
// paso activo, ciudades elegidas…). El HTML prerenderizado es SIEMPRE el
// estado por defecto, así que con esos parámetros no se hidrata: se pinta
// desde cero (ver canHydrate). Si una página empieza a leer la URL al
// renderizar, decláralo aquí o React verá un HTML distinto al hidratar.
// ─────────────────────────────────────────────────────────────────────────────

import { matchPath } from "react-router-dom";
import { loadCityDetail } from "./lib/cities";

const hasParam = (...names) => (url) => names.some((n) => url.searchParams.has(n));

export const ROUTES = [
  // ?region= (useCityFilter: región o vibe), ?ver=todo, ?buscar= (SearchAction).
  { path: "/", page: "HomePage", urlState: hasParam("region", "ver", "buscar") },
  {
    path: "/city/:slug",
    page: "CityDetailPage",
    data: ({ slug }) => loadCityDetail(slug),
    // Chunk de la ficha (para el modulepreload del prerender).
    dataModule: ({ slug }) => `src/data/generated/cities/${slug}.js`,
  },
  { path: "/proceso", page: "ProcesoPage", urlState: (url) => url.hash.length > 1 },
  // ?orden= (chip de orden) y ?programa= (Erasmus+ / fuera) también cambian lo que se pinta.
  { path: "/comparar", page: "ComparePage", urlState: hasParam("cities", "view", "orden", "programa") },
  { path: "/learning-agreement", page: "LearningAgreementPage" },
  { path: "/beca-erasmus", page: "BecaErasmusPage" },
  { path: "/city-match", page: "CityMatchPage", urlState: hasParam("r") },
  { path: "/tipos-de-intercambio", page: "TiposDeIntercambioPage" },
  { path: "/privacidad", page: "PrivacidadPage" },
  // El aviso legal vive dentro de /privacidad (en producción, 308 desde vercel.json).
  { path: "/aviso-legal", redirect: "/privacidad" },
  { path: "/creditos", page: "CreditosPage" },
  { path: "/guias", page: "GuiasPage" },
  { path: "/guias/:slug", page: "GuidePage" },
  // Rankings (src/data/rankings.js): índice y una página por criterio.
  { path: "/ranking", page: "RankingPage" },
  { path: "/ranking/:slug", page: "RankingPage" },
  { path: "*", page: "NotFoundPage" },
];

/** Ruta que corresponde a un pathname, con sus parámetros. */
export function matchRoute(pathname) {
  for (const route of ROUTES) {
    const m = matchPath({ path: route.path, end: true }, pathname);
    if (m) return { route, params: m.params };
  }
  return null;
}

/** Carga los datos que necesita la ruta para pintarse sin suspender. */
export function preloadRouteData(pathname) {
  const m = matchRoute(pathname);
  return m?.route.data ? m.route.data(m.params) : Promise.resolve();
}

/** Quita la barra final (salvo en "/") para comparar rutas. */
export function normalizePath(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

/**
 * ¿Se puede hidratar el HTML prerenderizado de `prerenderedPath` en la URL
 * actual? Solo si es la misma ruta (la 404.html se sirve en cualquier URL
 * que no existe) y la URL no pide un estado distinto del prerenderizado.
 * @param {string | undefined} prerenderedPath  data-path de #root
 * @param {URL} url
 */
export function canHydrate(prerenderedPath, url) {
  if (!prerenderedPath || normalizePath(prerenderedPath) !== normalizePath(url.pathname)) return false;
  const m = matchRoute(url.pathname);
  return Boolean(m && !m.route.redirect && !m.route.urlState?.(url));
}
