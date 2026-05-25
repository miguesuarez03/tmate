import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CityCard({ city }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

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
      <span className="city-card__tag">{city.tag}</span>

      {/* Bottom content */}
      <div className="city-card__content">
        {/* Name + country row */}
        <p className="city-card__name">{city.name}</p>
        <p className="city-card__country">{city.emoji} {city.country}</p>

        {/* Phrase — always visible */}
        <p className="city-card__phrase">{city.phrase}</p>
      </div>
    </div>
  );
}
