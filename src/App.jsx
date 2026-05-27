import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CityDetailPage from "./pages/CityDetailPage";
import ProcesoPage from "./pages/ProcesoPage";
import ComparePage from "./pages/ComparePage";
import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/city/:slug" element={<CityDetailPage />} />
        <Route path="/proceso" element={<ProcesoPage />} />
        <Route path="/comparar" element={<ComparePage />} />
      </Routes>
    </BrowserRouter>
  );
}
