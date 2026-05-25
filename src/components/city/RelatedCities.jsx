import { useNavigate } from "react-router-dom";
import styles from "./RelatedCities.module.css";

// ─── ICONS ────────────────────────────────────────────────────────────────────

const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

// ─── RELATED CITY CARD ───────────────────────────────────────────────────────

function RelatedCityCard({ city }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.relCard}
      onClick={() => navigate(`/city/${city.slug}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/city/${city.slug}`)}
    >
      {/* Background image */}
      <img
        src={city.img}
        alt={city.name}
        className={styles.relCardImg}
        loading="lazy"
        onError={(e) => { e.currentTarget.style.opacity = 0; }}
      />
      <div className={styles.relCardOverlay} />

      {/* Content */}
      <div className={styles.relCardContent}>
        <span className={styles.relCardEmojiFlag}>{city.emoji}</span>
        <div>
          <h3 className={styles.relCardName}>{city.name}</h3>
          <p className={styles.relCardCountry}>{city.country}</p>
        </div>
        <div className={styles.relCardArrow}>
          <IconArrow />
        </div>
      </div>

      {/* Tag */}
      <span className={styles.relCardTag}>{city.tag}</span>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function RelatedCities({ relatedCities = [], currentCity }) {
  const navigate = useNavigate();

  if (relatedCities.length === 0) return null;

  const countryLabel = currentCity?.country ?? "Europa";

  return (
    <section className={styles.related}>
      {/* ── Related cities ── */}
      <div className={styles.relBlock}>
        <div className={styles.relHeader}>
          <p className={styles.relEyebrow}>También en {countryLabel}</p>
          <h2 className={styles.relTitle}>Otros destinos que te pueden gustar</h2>
        </div>
        <div className={styles.relGrid}>
          {relatedCities.slice(0, 3).map((city) => (
            <RelatedCityCard key={city.slug} city={city} />
          ))}
        </div>
      </div>

      {/* ── Conversion footer ── */}
      <div className={styles.convBlock}>
        <div className={styles.convInner}>
          <div className={styles.convLeft}>
            <div className={styles.convIcon}>
              <IconHeart />
            </div>
            <div>
              <h2 className={styles.convTitle}>¿Esta es tu ciudad?</h2>
              <p className={styles.convSub}>
                Compara con otros destinos y toma la mejor decisión para tu Erasmus
              </p>
            </div>
          </div>
          <div className={styles.convActions}>
            <button
              className={styles.convBtnPrimary}
              onClick={() => navigate("/")}
            >
              Ver todos los destinos
              <IconArrow />
            </button>
            <button
              className={styles.convBtnSecondary}
              onClick={() => navigate("/")}
            >
              Comparar ciudades
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
