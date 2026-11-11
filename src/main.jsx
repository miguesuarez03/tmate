import React from "react";
import ReactDOM from "react-dom/client";
import App, { PAGES } from "./App.jsx";
import { matchRoute, preloadRouteData, canHydrate } from "./routes";
// Tipografías servidas desde el propio dominio (Fontsource, licencia OFL), en
// vez de Google Fonts: mismo aspecto y la IP del visitante no sale a Google.
// Bricolage Grotesque variable con ejes opsz + wght (200–800); Fraunces solo
// en los pesos que usan los titulares editoriales.
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/fraunces/800.css";
import "@fontsource/fraunces/900.css";
import "@fontsource/fraunces/700-italic.css";

const rootEl = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Cada URL llega con su HTML ya pintado (scripts/prerender.mjs). En vez de
// borrarlo y volver a pintarlo (lo que repetía las animaciones de entrada y
// dejaba un instante en blanco en las páginas lazy), React lo HIDRATA: reutiliza
// esos nodos y solo les engancha los eventos. Para que el primer render del
// navegador sea idéntico al HTML, antes se descargan el chunk de la página y
// sus datos (la ficha de la ciudad); el prerender ya los anuncia con
// modulepreload, así que suelen estar en caché.
//
// Se pinta desde cero (createRoot) cuando el HTML no corresponde a lo que
// hay que enseñar: `vite dev` (sin HTML), la 404.html servida en otra URL o
// una URL con filtros/estado que el prerender no conoce (ver canHydrate).
// En ambos casos se precarga antes la página y sus datos: así tampoco el
// render desde cero pasa por el fallback vacío de <Suspense>.
const url = new URL(window.location.href);
const hydrate = Boolean(rootEl.firstElementChild) && canHydrate(rootEl.dataset.path, url);
const page = PAGES[matchRoute(url.pathname)?.route.page];

function start() {
  if (hydrate) {
    ReactDOM.hydrateRoot(rootEl, app, {
      // Si aun así algo no coincide, React vuelve a pintar esa parte: se
      // avisa en consola para poder corregirlo (no rompe la página).
      onRecoverableError(error) {
        console.warn("[hidratación]", error);
      },
    });
  } else {
    ReactDOM.createRoot(rootEl).render(app);
  }
}

// Sin red para el chunk o los datos se arranca igual: la página suspenderá
// y, si sigue fallando, RouteErrorBoundary ofrece recargar (hidratar con
// algo sin cargar también funciona: React lo completa al llegar).
Promise.all([page?.preload?.(), preloadRouteData(url.pathname)]).then(start, start);
