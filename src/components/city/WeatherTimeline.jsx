import { Sparkles } from "lucide-react";
import styles from "./WeatherTimeline.module.css";
import { CITY_SEASONS } from "../../data/weatherSeasons";

const FALLBACK_SEASONS = [
  { id: "spring", label: "Primavera", months: "Mar–May", temp: "10–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera agradable. Buen momento para llegar y explorar la ciudad.", tags: ["Buen clima", "Terrazas", "Activa"] },
  { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "22–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano con calor. La actividad universitaria baja pero la ciudad sigue viva.", tags: ["Calor", "Festivales", "Tranquila"] },
  { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "10–20°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para el Erasmus. Arranque de curso con toda la energía.", tags: ["Mejor época", "Inicio Erasmus", "Agradable"], highlight: true },
  { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "2–8°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío. La vida universitaria e interior lo compensa todo.", tags: ["Frío", "Vida social", "Acogedor"] },
];

export default function WeatherTimeline({ cityName, citySlug }) {
  const seasons = CITY_SEASONS[citySlug] || FALLBACK_SEASONS;

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
            {s.highlight && <div className={styles.bestBadge} style={{ background: s.accent }}><Sparkles size={13} strokeWidth={1.75} /> Mejor época</div>}
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
