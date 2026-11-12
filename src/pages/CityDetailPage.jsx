import { useParams } from "react-router-dom";
import { getCityBySlug, getRelatedCities, getOverallScore } from "../lib/cities";
import { useCityDetail } from "../hooks/useCityDetail";
import { getCityJsonLd, getBreadcrumbJsonLd } from "../lib/seo";
import { useSEO } from "../hooks/useSEO";
import { NavbarCity, Footer } from "../components/Layout";
import HeroSection        from "../components/city/HeroSection";
import BentoHighlights    from "../components/city/BentoHighlights";
import InsightDashboard   from "../components/city/InsightDashboard";
import NeighborhoodSlider from "../components/city/NeighborhoodSlider";
import WeatherTimeline    from "../components/city/WeatherTimeline";
import TipsSection        from "../components/city/TipsSection";
import CityExperiences    from "../components/experiences/CityExperiences";
import RelatedCities      from "../components/city/RelatedCities";
import MethodologyNote    from "../components/MethodologyNote";
import NotFoundPage       from "./NotFoundPage";
import "../styles/cityDetailPage.css";

export default function CityDetailPage() {
  const { slug }  = useParams();
  // Ficha completa (datos + insights) bajo demanda: un chunk por ciudad. Si
  // aún no ha llegado, la página suspende (ver useCityDetail).
  const detail        = useCityDetail(slug);
  const city          = detail?.city ?? null;
  const insights      = detail?.insights ?? null;
  const overallScore  = getOverallScore(slug);
  const relatedCities = city ? getRelatedCities(getCityBySlug(slug), 4) : [];

  // Nota: el scroll (subir arriba al entrar / restaurar al volver atrás)
  // lo gestiona <ScrollRestoration /> de forma global, así que aquí no
  // forzamos window.scrollTo — si lo hiciéramos, pisaríamos la posición
  // restaurada al pulsar "atrás" desde el navegador.

  useSEO(city ? { city, overallScore, jsonLd: [getCityJsonLd(city), getBreadcrumbJsonLd(city)] } : {});

  // Slug inexistente: página 404 (noindex) en vez de redirigir a la home,
  // que Google trataría como un "soft 404".
  if (!city) return <NotFoundPage />;

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

      <div className="trust-note-wrap">
        <MethodologyNote compact />
      </div>

      <div className="cdp-divider" />

      {/* 4. Weather — right after insights */}
      <WeatherTimeline cityName={city.name} citySlug={slug} />

      <div className="cdp-divider" />

      {/* 5. Tips insider — premium dark section */}
      <TipsSection tips={city.tips} cityName={city.name} />

      {/* 6. Lo que dicen los que viven allí — consejos reales de estudiantes */}
      <CityExperiences citySlug={slug} cityName={city.name} />

      {/* 7. Universities */}
      <NeighborhoodSlider universities={city.universities} />

      {/* 8. Related cities + CTA */}
      <RelatedCities relatedCities={relatedCities} currentCity={city} />

      <Footer />
    </div>
  );
}
