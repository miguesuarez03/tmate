import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollRestoration from "./components/ScrollRestoration";
import RouteLoader from "./components/RouteLoader";
import FeedbackWidget from "./components/FeedbackWidget";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
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
const NotFoundPage          = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  return (
    <BrowserRouter>
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <FeedbackWidget />
      {/* Vercel Web Analytics + Speed Insights: sin cookies, datos anónimos.
          App es la raíz en cliente para TODAS las rutas (también las
          prerenderizadas, que se montan con createRoot), y el script detecta
          solo los cambios de ruta de react-router. */}
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
