import { useRef } from "react";
import styles from "./NeighborhoodSlider.module.css";

const PRICE_META = {
  "€":    { label: "Económico",  bg: "#F0FDF4", color: "#16A34A" },
  "€€":   { label: "Moderado",   bg: "#EFF6FF", color: "#2563EB" },
  "€€€":  { label: "Caro",       bg: "#FFF7ED", color: "#EA580C" },
  "€€€€": { label: "Muy caro",   bg: "#FFF1F2", color: "#BE123C" },
};

function HoodCard({ hood }) {
  const p = PRICE_META[hood.price] || PRICE_META["€€"];
  return (
    <div className={styles.hoodCard}>
      <div className={styles.hoodCardTop}>
        <span className={styles.hoodPricePill} style={{ background: p.bg, color: p.color }}>
          {hood.price} · {p.label}
        </span>
      </div>
      <h3 className={styles.hoodName}>{hood.name}</h3>
      <p className={styles.hoodVibe}>{hood.vibe}</p>
      <span className={styles.hoodExplore}>Explorar zona →</span>
    </div>
  );
}

function UniCard({ name }) {
  return (
    <div className={styles.uniCard}>
      <div className={styles.uniIcon}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 22V12h6v10M3 9h18M3 15h18"/>
        </svg>
      </div>
      <div className={styles.uniBody}>
        <p className={styles.uniName}>{name}</p>
        <span className={styles.uniLink}>Ver convenios →</span>
      </div>
    </div>
  );
}

function Slider({ children, label, eyebrow }) {
  const ref = useRef(null);
  const scroll = d => ref.current?.scrollBy({ left: d * 280, behavior: "smooth" });
  return (
    <div className={styles.sliderBlock}>
      <div className={styles.sliderHeader}>
        <div>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.title}>{label}</h2>
        </div>
        <div className={styles.sliderBtns}>
          <button className={styles.sliderBtn} onClick={() => scroll(-1)} aria-label="Anterior">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <button className={styles.sliderBtn} onClick={() => scroll(1)} aria-label="Siguiente">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      <div className={styles.track} ref={ref}>{children}</div>
    </div>
  );
}

export default function NeighborhoodSlider({ neighborhoods = [], universities = [] }) {
  return (
    <section className={styles.section}>
      <Slider eyebrow="Dónde vivir" label="Barrios recomendados">
        {neighborhoods.map((h, i) => <HoodCard key={i} hood={h} />)}
      </Slider>
      <Slider eyebrow="Dónde estudiar" label="Universidades">
        {universities.map((n, i) => <UniCard key={i} name={n} />)}
      </Slider>
    </section>
  );
}
