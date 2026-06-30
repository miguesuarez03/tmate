import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCityBySlug, getCityInsights, getRelatedCities, getOverallScore } from "../lib/cities";
import { NavbarCity, Footer } from "../components/Layout";
import HeroSection        from "../components/city/HeroSection";
import BentoHighlights    from "../components/city/BentoHighlights";
import InsightDashboard   from "../components/city/InsightDashboard";
import NeighborhoodSlider from "../components/city/NeighborhoodSlider";
import WeatherTimeline    from "../components/city/WeatherTimeline";
import TipsSection        from "../components/city/TipsSection";
import RelatedCities      from "../components/city/RelatedCities";
import "../styles/cityDetailPage.css";

export default function CityDetailPage() {
  const { slug }  = useParams();
  const navigate  = useNavigate();
  const city          = getCityBySlug(slug);
  const insights      = getCityInsights(slug);
  const overallScore  = getOverallScore(slug);
  const relatedCities = city ? getRelatedCities(city, 3) : [];

  useEffect(() => {
    if (!city) navigate("/", { replace: true });
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!city) return;
    document.title = `${city.name} Erasmus — Guía completa | TMate`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content",
      `Todo sobre el Erasmus en ${city.name}: coste ${city.costDetail}, scores reales. Puntuación TMate: ${overallScore}/10.`
    );
  }, [city, overallScore]);

  if (!city) return null;

  return (
    <div className="cdp-root">
      <NavbarCity cityName={city.name} overall={overallScore} />

      {/* 1. Hero */}
      <HeroSection city={city} overallScore={overallScore} insights={insights} />

      {/* 2. Bento highlights — with photos */}
      <BentoHighlights highlights={city.highlights} cityName={city.name} cityImg={city.heroImg || city.img} />

      <div className="cdp-divider" />

      {/* 3. Insight dashboard */}
      <InsightDashboard scores={insights?.scores ?? []} overallScore={overallScore} citySlug={slug} cityName={city.name} />

      <div className="cdp-divider" />

      {/* 4. Weather — right after insights */}
      <WeatherTimeline cityName={city.name} citySlug={slug} />

      <div className="cdp-divider" />

      {/* 5. Tips insider — premium dark section */}
      <TipsSection tips={city.tips} cityName={city.name} />

      {/* 6. Universities */}
      <NeighborhoodSlider universities={city.universities} />

      {/* 7. Related cities + CTA */}
      <RelatedCities relatedCities={relatedCities} currentCity={city} />

      <Footer />
    </div>
  );
}
