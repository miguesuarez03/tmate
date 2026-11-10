import styles from "./WeatherTimeline.module.css";
import { CITY_SEASONS } from "../../data/weatherSeasons";

export default function WeatherTimeline({ cityName, citySlug }) {
  // Solo ciudades con datos climáticos reales (normales 1991–2020): sin datos,
  // la sección no se muestra (antes caía en unas temperaturas genéricas inventadas).
  const seasons = CITY_SEASONS[citySlug];
  if (!seasons) return null;

  return (
    <section className={styles.weather}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Clima anual</p>
        <h2 className={styles.title}>Las cuatro estaciones en {cityName}</h2>
        <p className={styles.sub}>Primavera y otoño son los momentos estrella del Erasmus</p>
      </div>
      <div className={styles.grid}>
        {seasons.map(s => (
          <div key={s.id} className={`${styles.card} ${s.highlight ? styles.cardHighlight : ""}`} style={{ "--sbg": s.bg, "--sacc": s.accent, "--slight": s.light }}>
            {s.highlight && <div className={styles.bestBadge} style={{ background: s.accent }}>✨ Mejor época</div>}
            <div className={styles.cardTop}>
              <span className={styles.cardEmoji}>{s.emoji}</span>
              <div>
                <h3 className={styles.cardLabel} style={{ color: s.accent }}>{s.label}</h3>
                <p className={styles.cardMonths}>{s.months}</p>
              </div>
            </div>
            <p className={styles.cardTemp} style={{ color: s.accent }}>{s.temp}</p>
            <p className={styles.cardSummary}>{s.summary}</p>
            <div className={styles.cardTags}>
              {s.tags.map((t, i) => (
                <span key={i} className={styles.cardTag} style={{ background: `${s.light}80`, color: s.accent }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
