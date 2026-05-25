import styles from "./WeatherTimeline.module.css";

// ─── SEASON CONFIG ────────────────────────────────────────────────────────────

const SEASONS = [
  {
    id: "spring",
    label: "Primavera",
    months: "Mar — May",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V13"/>
        <path d="M9 6c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3"/>
        <path d="M6 13c-2.2 0-4-1.8-4-4s1.8-4 4-4c.4 0 .9.1 1.3.2"/>
        <path d="M18 13c2.2 0 4-1.8 4-4s-1.8-4-4-4c-.4 0-.9.1-1.3.2"/>
        <path d="M6 13h12"/>
      </svg>
    ),
    bg: "linear-gradient(145deg, #F0FDF4 0%, #DCFCE7 60%, #BBF7D0 100%)",
    accent: "#16A34A",
    accentLight: "#4ADE80",
    tempRange: "14–22°C",
    summary: "Época ideal. Pórticos en flor, terrazas llenas, temperatura perfecta para explorar.",
    tags: ["Ideal para llegar", "Terrazas abiertas", "Lluvias puntuales"],
  },
  {
    id: "summer",
    label: "Verano",
    months: "Jun — Ago",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    ),
    bg: "linear-gradient(145deg, #FFFBEB 0%, #FEF3C7 60%, #FDE68A 100%)",
    accent: "#D97706",
    accentLight: "#FBBF24",
    tempRange: "28–38°C",
    summary: "Calor intenso. La ciudad se vacía de universitarios. Turismo y festivales de verano.",
    tags: ["Calor extremo", "Ciudad menos llena", "Festivales nocturnos"],
  },
  {
    id: "autumn",
    label: "Otoño",
    months: "Sep — Nov",
    months_highlight: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8c.8 0 1.4.3 2 .8M7 8c-.8 0-1.4.3-2 .8"/>
        <path d="M12 3C8 3 5 6 5 10c0 2 .8 3.8 2 5l5 6 5-6c1.2-1.2 2-3 2-5 0-4-3-7-7-7z"/>
      </svg>
    ),
    bg: "linear-gradient(145deg, #FFF7ED 0%, #FFEDD5 60%, #FED7AA 100%)",
    accent: "#C2410C",
    accentLight: "#FB923C",
    tempRange: "12–24°C",
    summary: "La mejor temporada. Los Erasmus llegan, la ciudad vuelve a la vida. Colores espectaculares.",
    tags: ["Mejor momento", "Inicio Erasmus", "Colores únicos"],
    highlight: true,
  },
  {
    id: "winter",
    label: "Invierno",
    months: "Dic — Feb",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22"/>
        <path d="M17 7l-5-5-5 5M17 17l-5 5-5-5M4 9l4 3-4 3M20 9l-4 3 4 3"/>
      </svg>
    ),
    bg: "linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 60%, #BFDBFE 100%)",
    accent: "#1D4ED8",
    accentLight: "#60A5FA",
    tempRange: "2–10°C",
    summary: "Frío y niebla. Los pórticos se convierten en refugio. La vida universitaria compensa.",
    tags: ["Niebla frecuente", "Pórticos vitales", "Muy social"],
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function WeatherTimeline({ weatherData, cityName }) {
  return (
    <section className={styles.weather}>
      <div className={styles.weatherHeader}>
        <p className={styles.weatherEyebrow}>Clima anual</p>
        <h2 className={styles.weatherTitle}>Las cuatro estaciones en {cityName || "la ciudad"}</h2>
        <p className={styles.weatherSubtitle}>
          Clima continental húmedo — Primavera y otoño son los momentos estrella
        </p>
      </div>

      <div className={styles.weatherGrid}>
        {SEASONS.map((season) => (
          <div
            key={season.id}
            className={`${styles.seasonCard} ${season.highlight ? styles.seasonCardHighlight : ""}`}
            style={{ background: season.bg }}
          >
            {season.highlight && (
              <div className={styles.seasonBestBadge} style={{ background: season.accent }}>
                Mejor época
              </div>
            )}

            {/* Icon */}
            <div className={styles.seasonIcon} style={{ color: season.accent }}>
              {season.icon}
            </div>

            {/* Season name & months */}
            <div className={styles.seasonMeta}>
              <h3 className={styles.seasonLabel} style={{ color: season.accent }}>
                {season.label}
              </h3>
              <p className={styles.seasonMonths}>{season.months}</p>
            </div>

            {/* Temperature */}
            <div className={styles.seasonTemp} style={{ color: season.accent }}>
              <span className={styles.seasonTempNum}>{season.tempRange}</span>
            </div>

            {/* Summary */}
            <p className={styles.seasonSummary}>{season.summary}</p>

            {/* Tags */}
            <div className={styles.seasonTags}>
              {season.tags.map((tag, i) => (
                <span
                  key={i}
                  className={styles.seasonTag}
                  style={{
                    background: `${season.accentLight}22`,
                    color: season.accent,
                    borderColor: `${season.accentLight}44`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Decorative gradient circle */}
            <div
              className={styles.seasonGlow}
              style={{ background: `radial-gradient(circle, ${season.accentLight}30 0%, transparent 70%)` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
