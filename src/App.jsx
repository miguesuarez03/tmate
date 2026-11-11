import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollRestoration from "./components/ScrollRestoration";
import RouteLoader from "./components/RouteLoader";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { markFirstRenderDone } from "./lib/firstRender";
import "./styles/global.css";

// Code-splitting por ruta: cada página se descarga bajo demanda en vez de
// ir todas en el bundle inicial. HomePage se mantiene como import normal
// (no lazy) porque es la primera pantalla que ve todo el mundo — lazy-cargarla
// solo añadiría una espera innecesaria justo al entrar a la web.
import HomePage from "./pages/HomePage";

const CityDetailPage        = lazy(() => import("./pages/CityDetailPage"));
const ProcesoPage           = lazy(() => import("./pages/ProcesoPage"));
const ComparePage           = lazy(() => import("./pages/ComparePage"));
const LearningAgreementPage = lazy(() => import("./pages/LearningAgreementPage"));
const BecaErasmusPage       = lazy(() => import("./pages/BecaErasmusPage"));
const CityMatchPage         = lazy(() => import("./pages/CityMatchPage"));
const TiposDeIntercambioPage = lazy(() => import("./pages/TiposDeIntercambioPage"));
const PrivacidadPage        = lazy(() => import("./pages/PrivacidadPage"));
const CreditosPage          = lazy(() => import("./pages/CreditosPage"));
const GuiasPage             = lazy(() => import("./pages/GuiasPage"));
const GuidePage             = lazy(() => import("./pages/GuidePage"));
const NotFoundPage          = lazy(() => import("./pages/NotFoundPage"));

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

// «Saltar al contenido»: lleva el foco al <main> de la página o, si no lo
// tiene, a su <h1> — así el teclado no recorre el menú entero en cada página.
function skipToContent(e) {
  e.preventDefault();
  const target = document.querySelector("main") || document.querySelector("h1");
  if (!target) return;
  target.setAttribute("tabindex", "-1");
  target.setAttribute("data-skip-target", "");
  target.focus();
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

  return (
    <BrowserRouter>
      <a className="skip-link" href="#contenido" onClick={skipToContent}>Saltar al contenido</a>
      <ScrollRestoration />
      <Suspense fallback={<RouteLoader />}>
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
          {/* El aviso legal vive dentro de /privacidad (en producción, 308 desde vercel.json). */}
          <Route path="/aviso-legal" element={<Navigate to="/privacidad" replace />} />
          <Route path="/creditos" element={<CreditosPage />} />
          <Route path="/guias" element={<GuiasPage />} />
          <Route path="/guias/:slug" element={<GuidePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      {idle && (
        <Suspense fallback={null}>
          <FeedbackWidget />
        </Suspense>
      )}
      {/* Vercel Web Analytics + Speed Insights: sin cookies, datos anónimos.
          App es la raíz en cliente para TODAS las rutas (también las
          prerenderizadas, que se montan con createRoot), y el script detecta
          solo los cambios de ruta de react-router. */}
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
