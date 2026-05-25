// ─────────────────────────────────────────────────────────────────────────────
// CityDetailPage.jsx — Rediseño v5 (Arquitectura Modular)
// Orquesta los mini-componentes de ciudad. No contiene lógica de UI propia.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ─── Data & lib ───────────────────────────────────────────────────────────────
import {
  getCityBySlug,
  getCityInsights,
  getRelatedCities,
  getOverallScore,
} from "../lib/cities";

// ─── Layout ───────────────────────────────────────────────────────────────────
import { NavbarCity, Footer } from "../components/Layout";

// ─── City mini-components ─────────────────────────────────────────────────────
import HeroSection        from "../components/city/HeroSection";
import BentoHighlights    from "../components/city/BentoHighlights";
import InsightDashboard   from "../components/city/InsightDashboard";
import NeighborhoodSlider from "../components/city/NeighborhoodSlider";
import WeatherTimeline    from "../components/city/WeatherTimeline";
import TipsSection        from "../components/city/TipsSection";
import RelatedCities      from "../components/city/RelatedCities";

// ─── Page styles (reset + font imports only) ──────────────────────────────────
import "../styles/cityDetailPage.css";

// ─────────────────────────────────────────────────────────────────────────────

export default function CityDetailPage() {
  const { slug }   = useParams();
  const navigate   = useNavigate();

  const city         = getCityBySlug(slug);
  const insights     = getCityInsights(slug);
  const overallScore = getOverallScore(slug);
  const relatedCities = city ? getRelatedCities(city, 3) : [];

  // ── 404 redirect ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!city) navigate("/", { replace: true });
  }, [city, navigate]);

  // ── SEO ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!city) return;
    document.title = `${city.name} Erasmus — Guía completa | TMate`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        `Todo sobre el Erasmus en ${city.name}: coste de vida ${city.costDetail}, scores reales, barrios y tips. Puntuación TMate: ${overallScore}/10.`
      );
    }
  }, [city, overallScore]);

  if (!city) return null;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="cdp-root">
      {/* ── Navbar (sticky, ciudad-específica) ───────────────────────────── */}
      <NavbarCity city={city} overallScore={overallScore} />

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <HeroSection city={city} overallScore={overallScore} />

      {/* ── 2. Bento highlights ─────────────────────────────────────────── */}
      <BentoHighlights
        highlights={city.highlights}
        cityName={city.name}
      />

      {/* ── Divider ─────────────────────────────────────────────────────── */}
      <div className="cdp-divider" />

      {/* ── 3. Insight dashboard ────────────────────────────────────────── */}
      <InsightDashboard
        scores={insights.scores}
        overallScore={overallScore}
      />

      {/* ── Divider ─────────────────────────────────────────────────────── */}
      <div className="cdp-divider" />

      {/* ── 4. Neighborhood + University sliders ────────────────────────── */}
      <NeighborhoodSlider
        neighborhoods={city.neighborhoods}
        universities={city.universities}
      />

      {/* ── 5. Weather timeline ─────────────────────────────────────────── */}
      <WeatherTimeline cityName={city.name} />

      {/* ── Divider ─────────────────────────────────────────────────────── */}
      <div className="cdp-divider" />

      {/* ── 6. Insider tips ─────────────────────────────────────────────── */}
      <div className="cdp-tips-wrapper">
        <TipsSection tips={city.tips} cityName={city.name} />
      </div>

      {/* ── 7. Related cities + conversion footer ───────────────────────── */}
      <RelatedCities
        relatedCities={relatedCities}
        currentCity={city}
      />

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
