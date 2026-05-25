import { useRef } from "react";
import styles from "./NeighborhoodSlider.module.css";

// ─── ICONS ────────────────────────────────────────────────────────────────────

const IconArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const IconArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const IconMapPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconBuilding = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 22V12h6v10M3 9h18M3 15h18"/>
  </svg>
);

const IconExternalLink = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// ─── PRICE STYLES ─────────────────────────────────────────────────────────────

const PRICE_META = {
  "€":    { label: "Económico",     bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
  "€€":   { label: "Moderado",      bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  "€€€":  { label: "Caro",          bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  "€€€€": { label: "Muy caro",      bg: "#FFF1F2", text: "#BE123C", border: "#FECDD3" },
};

// ─── NEIGHBORHOOD CARD ────────────────────────────────────────────────────────

function NeighborhoodCard({ hood }) {
  const price = PRICE_META[hood.price] || PRICE_META["€€"];

  return (
    <div className={styles.hoodCard}>
      <div className={styles.hoodCardTop}>
        <div className={styles.hoodPricePill} style={{ background: price.bg, color: price.text, borderColor: price.border }}>
          <span className={styles.hoodPriceSymbol}>{hood.price}</span>
          <span className={styles.hoodPriceLabel}>{price.label}</span>
        </div>
      </div>
      <div className={styles.hoodCardBody}>
        <div className={styles.hoodPin}>
          <IconMapPin />
        </div>
        <h3 className={styles.hoodName}>{hood.name}</h3>
        <p className={styles.hoodVibe}>{hood.vibe}</p>
      </div>
      <div className={styles.hoodCardFooter}>
        <div className={styles.hoodDivider} />
        <span className={styles.hoodExplore}>
          Explorar zona <IconExternalLink />
        </span>
      </div>
    </div>
  );
}

// ─── UNIVERSITY CARD ──────────────────────────────────────────────────────────

function UniversityCard({ name }) {
  return (
    <div className={styles.uniCard}>
      <div className={styles.uniIcon}>
        <IconBuilding />
      </div>
      <div className={styles.uniBody}>
        <p className={styles.uniName}>{name}</p>
        <span className={styles.uniLink}>Ver convenios <IconArrowRight /></span>
      </div>
    </div>
  );
}

// ─── SLIDER SHELL ─────────────────────────────────────────────────────────────

function HorizontalSlider({ children, scrollRef }) {
  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };
  return (
    <div className={styles.sliderWrapper}>
      <button className={`${styles.sliderBtn} ${styles.sliderBtnLeft}`} onClick={() => scroll(-1)} aria-label="Anterior">
        <IconArrowLeft />
      </button>
      <div className={styles.sliderTrack} ref={scrollRef}>
        {children}
      </div>
      <button className={`${styles.sliderBtn} ${styles.sliderBtnRight}`} onClick={() => scroll(1)} aria-label="Siguiente">
        <IconArrowRight />
      </button>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function NeighborhoodSlider({ neighborhoods = [], universities = [] }) {
  const hoodRef = useRef(null);
  const uniRef  = useRef(null);

  return (
    <section className={styles.section}>
      {/* ─── Neighborhoods ─── */}
      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <div>
            <p className={styles.eyebrow}>Dónde vivir</p>
            <h2 className={styles.title}>Barrios recomendados</h2>
          </div>
        </div>
        <HorizontalSlider scrollRef={hoodRef}>
          {neighborhoods.map((hood, i) => (
            <NeighborhoodCard key={i} hood={hood} />
          ))}
          {/* Empty state if none */}
          {neighborhoods.length === 0 && (
            <p className={styles.empty}>No hay barrios registrados aún.</p>
          )}
        </HorizontalSlider>
      </div>

      {/* ─── Universities ─── */}
      <div className={styles.block}>
        <div className={styles.blockHeader}>
          <div>
            <p className={styles.eyebrow}>Dónde estudiar</p>
            <h2 className={styles.title}>Universidades</h2>
          </div>
        </div>
        <HorizontalSlider scrollRef={uniRef}>
          {universities.map((name, i) => (
            <UniversityCard key={i} name={name} />
          ))}
          {universities.length === 0 && (
            <p className={styles.empty}>No hay universidades registradas.</p>
          )}
        </HorizontalSlider>
      </div>
    </section>
  );
}
