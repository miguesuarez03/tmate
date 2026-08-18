import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconFuego } from "./icons";
import { isErasmusEligible, getOverallScore } from "../lib/cities";
import ScoreRing from "./ScoreRing";

export default function CityCard({ city }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const overall = getOverallScore(city.slug);

  return (
    <div
      className="city-card"
      onClick={() => navigate(`/city/${city.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/city/${city.slug}`)}
      aria-label={`Ver ${city.name}`}
    >
      {/* Image — position absolute fills entire card */}
      <img
        className="city-card__img"
        src={city.img}
        alt={city.name}
        loading="lazy"
        onError={(e) => { e.currentTarget.style.opacity = 0; }}
      />

      {/* Gradient overlay — always on top of image */}
      <div className="city-card__overlay" />

      {/* Tag pill */}
      <span className="city-card__tag" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
        {city.tag === "Trending" && <IconFuego size={16} />} {city.tag}
      </span>

      {/* Program type pill — solo se muestra para destinos no-Erasmus */}
      {!isErasmusEligible(city) && (
        <span className="city-card__tag city-card__tag--program">🌍 No Erasmus</span>
      )}

      {/* Bottom content */}
      <div className="city-card__content">
        <div className="city-card__contentTop">
          <div>
            <p className="city-card__name">{city.name}</p>
            <p className="city-card__country">{city.emoji} {city.country}</p>
          </div>
          <ScoreRing score={overall} size={44} showLabel={false} animate={false} />
        </div>

        {/* Phrase — always visible */}
        <p className="city-card__phrase">{city.phrase}</p>
      </div>
    </div>
  );
}
