import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IconFuego } from "./icons";
import { isErasmusEligible, getOverallScore } from "../lib/cities";
import ScoreRing from "./ScoreRing";
import PhotoCredit from "./PhotoCredit";
import Flag from "./Flag";
import { responsiveImage } from "../lib/images";
import { useIsoLayoutEffect } from "../hooks/useIsoLayoutEffect";

// Huecos de la foto de la tarjeta (ver .cities-grid en global.css): 4
// columnas de ~280px, 3 hasta 1100px y 2 en móvil; la tarjeta es vertical
// (4:5, y 3:4 en móvil), así que la foto apaisada se pinta por su alto.
const CARD_PHOTO_SLOTS = [
  ["(max-width: 768px)", "50vw", 3 / 4],
  ["(max-width: 1100px)", "33vw", 4 / 5],
  [null, "290px", 4 / 5],
];

// Letras de la palabra más larga del nombre ("Maastricht" → 10). El CSS la
// usa para encoger el nombre lo justo cuando esa palabra no cabe junto al
// anillo de score en las tarjetas estrechas (ver .city-card__name).
function longestWord(name) {
  return Math.max(...name.split(/[\s-]+/).map((w) => w.length));
}

export default function CityCard({ city }) {
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);
  const overall = getOverallScore(city.slug);

  // Entrada suave al hacer scroll — una sola vez, con IntersectionObserver
  // en vez de un listener de scroll propio. prefers-reduced-motion ya se
  // gestiona globalmente (ver global.css), así que aquí no hace falta
  // duplicar esa comprobación: la transición simplemente se acorta a
  // instantánea si el usuario lo tiene activado.
  //
  // El estado oculto solo existe con <html class="js"> (lo pone App.jsx tras
  // el primer render): el HTML prerenderizado enseña las tarjetas sin esperar
  // al JS. Y las que YA están en pantalla al montar se marcan antes de pintar
  // (layout effect), para que al llegar el JS no parpadeen.
  useIsoLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) { setInView(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // <Link> (un <a href> real) y no un div con onClick: así Google y el HTML
  // prerenderizado tienen un enlace rastreable a cada ficha de ciudad.
  return (
    <Link
      ref={cardRef}
      to={`/city/${city.slug}`}
      className={`city-card${inView ? " city-card--in-view" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Ver ${city.name}`}
    >
      {/* Image — position absolute fills entire card */}
      <img
        className="city-card__img"
        {...responsiveImage(city.img, { slots: CARD_PHOTO_SLOTS })}
        width={800}
        height={600}
        alt={`${city.name}, ${city.country}`}
        loading="lazy"
        decoding="async"
        onError={(e) => { e.currentTarget.style.opacity = 0; }}
      />

      {/* Gradient overlay — always on top of image */}
      <div className="city-card__overlay" />

      {/* Tag pill */}
      <span className="city-card__tag">
        {city.tag === "Trending" && <IconFuego size={16} />} {city.tag}
      </span>

      {/* Program type pill — solo se muestra para destinos no-Erasmus */}
      {!isErasmusEligible(city) && (
        <span className="city-card__tag city-card__tag--program">🌍 No Erasmus</span>
      )}

      {/* Crédito de la foto: esquina inferior derecha (la frase le deja hueco) */}
      <PhotoCredit src={city.img} corner="bottom-right" nested />

      {/* Bottom content */}
      <div className="city-card__content">
        <div className="city-card__contentTop">
          <div>
            <p className="city-card__name" style={{ "--name-len": longestWord(city.name) }}>{city.name}</p>
            <p className="city-card__country"><Flag emoji={city.emoji} /> {city.country}</p>
          </div>
          <ScoreRing score={overall} size={44} showLabel={false} animate={false} />
        </div>

        {/* Phrase — always visible */}
        <p className="city-card__phrase">{city.phrase}</p>
      </div>
    </Link>
  );
}
