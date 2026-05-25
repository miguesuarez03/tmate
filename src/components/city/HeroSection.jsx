import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.css";

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconWallet = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/>
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>
    <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/>
  </svg>
);

const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function HeroSection({ city, overallScore }) {
  const navigate = useNavigate();

  const scoreColor =
    overallScore >= 8.5 ? "#22C55E" :
    overallScore >= 7   ? "#0EA5E9" :
    overallScore >= 5.5 ? "#F59E0B" : "#EF4444";

  const scoreLabel =
    overallScore >= 8.5 ? "Excelente" :
    overallScore >= 7   ? "Muy bueno" :
    overallScore >= 5.5 ? "Regular"   : "Difícil";

  return (
    <section className={styles.hero}>
      {/* Background image */}
      <div className={styles.heroBg}>
        <img
          src={city.heroImg || city.img}
          alt={city.name}
          className={styles.heroBgImg}
        />
        <div className={styles.heroBgOverlay} />
      </div>

      {/* Content */}
      <div className={styles.heroContent}>
        {/* Left — city identity */}
        <div className={styles.heroLeft}>
          <div className={styles.heroBreadcrumb}>
            <IconMapPin />
            <span>{city.country}</span>
            <span className={styles.heroDot} />
            <span>{city.region}</span>
          </div>

          <h1 className={styles.heroTitle}>{city.name}</h1>

          <blockquote className={styles.heroQuote}>
            "{city.phrase}"
          </blockquote>

          <div className={styles.heroMeta}>
            <div className={styles.heroMetaBadge}>
              <IconUsers />
              <span>{city.students} estudiantes</span>
            </div>
            <div className={styles.heroMetaBadge}>
              <span className={styles.heroLang}>{city.language}</span>
            </div>
            <div className={styles.heroMetaBadge}>
              <span>{city.vibe}</span>
            </div>
          </div>
        </div>

        {/* Right — glassmorphic card */}
        <div className={styles.heroCard}>
          <div className={styles.heroCardHeader}>
            <span className={styles.heroCardEmojiFlag}>{city.emoji}</span>
            <div>
              <p className={styles.heroCardCitySmall}>{city.name}</p>
              <p className={styles.heroCardTag}>{city.tag}</p>
            </div>
          </div>

          {/* Score ring */}
          <div className={styles.heroScoreRing}>
            <svg viewBox="0 0 120 120" className={styles.heroRingsvg}>
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8"/>
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke={scoreColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - overallScore / 10)}`}
                transform="rotate(-90 60 60)"
                className={styles.heroRingProgress}
              />
            </svg>
            <div className={styles.heroScoreCenter}>
              <span className={styles.heroScoreNum} style={{ color: scoreColor }}>{overallScore}</span>
              <span className={styles.heroScoreDen}>/10</span>
              <span className={styles.heroScoreLabel} style={{ color: scoreColor }}>{scoreLabel}</span>
            </div>
          </div>

          {/* Stats row */}
          <div className={styles.heroCardStats}>
            <div className={styles.heroCardStat}>
              <IconWallet />
              <div>
                <p className={styles.heroStatVal}>{city.costDetail}</p>
                <p className={styles.heroStatKey}>presupuesto/mes</p>
              </div>
            </div>
            <div className={styles.heroCardStatDivider} />
            <div className={styles.heroCardStat}>
              <IconStar />
              <div>
                <p className={styles.heroStatVal}>{city.erasmus}/100</p>
                <p className={styles.heroStatKey}>índice Erasmus</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            className={styles.heroCta}
            onClick={() => navigate(`/city/${city.slug}`)}
          >
            <span>Explorar programas</span>
            <IconArrow />
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={styles.heroScroll}>
        <div className={styles.heroScrollLine} />
        <span>Desliza para explorar</span>
      </div>
    </section>
  );
}
