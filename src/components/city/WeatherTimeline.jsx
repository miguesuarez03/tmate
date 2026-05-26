import styles from "./WeatherTimeline.module.css";

const SEASONS = [
  { id: "spring", label: "Primavera", months: "Mar–May", temp: "14–22°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Época perfecta. Ciudad en flor, terrazas abiertas y clima ideal para explorar.", tags: ["Ideal para llegar", "Terrazas", "Lluvias puntuales"] },
  { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "28–38°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor intenso. La ciudad se vacía de universitarios, llega el turismo y los festivales.", tags: ["Calor extremo", "Festivales", "Ciudad tranquila"] },
  { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "12–24°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor temporada. Los Erasmus llegan, la ciudad vuelve a la vida con colores épicos.", tags: ["Mejor época", "Inicio Erasmus", "Colores únicos"], highlight: true },
  { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "2–10°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío y niebla. Los pórticos son refugio. La vida universitaria lo compensa todo.", tags: ["Niebla frecuente", "Muy social", "Ambiente acogedor"] },
];

export default function WeatherTimeline({ cityName }) {
  return (
    <section className={styles.weather}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Clima anual</p>
        <h2 className={styles.title}>Las cuatro estaciones en {cityName}</h2>
        <p className={styles.sub}>Primavera y otoño son los momentos estrella del Erasmus</p>
      </div>
      <div className={styles.grid}>
        {SEASONS.map(s => (
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
