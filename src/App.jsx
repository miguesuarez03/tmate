import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import AppShell from "./AppShell";
import { lazyPage } from "./lib/lazyPage";
import { markFirstRenderDone } from "./lib/firstRender";
import "./styles/global.css";

// Code-splitting por ruta: cada página se descarga bajo demanda en vez de
// ir todas en el bundle inicial. HomePage se mantiene como import normal
// (no lazy) porque es la primera pantalla que ve todo el mundo — lazy-cargarla
// solo añadiría una espera innecesaria justo al entrar a la web.
// lazyPage (no React.lazy): main.jsx precarga la página de la URL actual
// antes de hidratar (PAGES[...].preload()). Las claves son los `page` de
// src/routes.js.
import HomePage from "./pages/HomePage";

export const PAGES = {
  HomePage,
  CityDetailPage:         lazyPage(() => import("./pages/CityDetailPage")),
  ProcesoPage:            lazyPage(() => import("./pages/ProcesoPage")),
  ComparePage:            lazyPage(() => import("./pages/ComparePage")),
  LearningAgreementPage:  lazyPage(() => import("./pages/LearningAgreementPage")),
  BecaErasmusPage:        lazyPage(() => import("./pages/BecaErasmusPage")),
  CityMatchPage:          lazyPage(() => import("./pages/CityMatchPage")),
  TiposDeIntercambioPage: lazyPage(() => import("./pages/TiposDeIntercambioPage")),
  PrivacidadPage:         lazyPage(() => import("./pages/PrivacidadPage")),
  CreditosPage:           lazyPage(() => import("./pages/CreditosPage")),
  GuiasPage:              lazyPage(() => import("./pages/GuiasPage")),
  GuidePage:              lazyPage(() => import("./pages/GuidePage")),
  NotFoundPage:           lazyPage(() => import("./pages/NotFoundPage")),
};

// El botón flotante «¿Qué te falta?» no hace falta para pintar la página:
// su código (formulario, envío, estilos) sale del bundle inicial y se pide
// cuando el navegador queda libre tras la carga.
const FeedbackWidget = lazy(() => import("./components/FeedbackWidget"));

function useIdleReady(timeout = 3000) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setReady(true), 1500); // Safari: sin requestIdleCallback
    return () => clearTimeout(id);
  }, [timeout]);
  return ready;
}

export default function App() {
  // <html class="js">: activa los estados "oculto hasta entrar en pantalla"
  // (p. ej. .city-card en global.css). Se pone DESPUÉS del primer render: los
  // efectos de los hijos van antes que este, así que las tarjetas que ya
  // estaban a la vista se han marcado y no llegan a ocultarse.
  useEffect(() => {
    document.documentElement.classList.add("js");
    markFirstRenderDone();
  }, []);
  const idle = useIdleReady();

  // v7_startTransition: al navegar, la página anterior se queda a la vista
  // hasta que la nueva (su chunk y, en una ciudad, su ficha) está lista, en
  // vez de cambiarla por un fallback vacío. Mientras, NavigationProgress
  // enseña la barra de carga.
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AppShell pages={PAGES} />
      {idle && (
        <Suspense fallback={null}>
          <FeedbackWidget />
        </Suspense>
      )}
      {/* Vercel Web Analytics + Speed Insights: sin cookies, datos anónimos.
          No pintan nada (inyectan su script en un efecto), así que no
          alteran el árbol que se hidrata; detectan solos los cambios de ruta. */}
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
