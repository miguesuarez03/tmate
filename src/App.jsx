import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollRestoration from "./components/ScrollRestoration";
import RouteLoader from "./components/RouteLoader";
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
