import styles from "./WeatherTimeline.module.css";
import { CITY_SEASONS, CITY_CLIMATE_EXTREMES } from "../../data/weatherSeasons";

// Licencia de los datos diarios con que MAbroad calcula «días de hasta…» (daysBy).
const DAYS_LICENSE = {
  DWD: ["CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/"],
  KNMI: ["CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/"],
  "Météo-France": ["Licence Ouverte 2.0", "https://www.etalab.gouv.fr/licence-ouverte-open-licence/"],
  "GeoSphere Austria": ["CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/"],
  SMHI: ["CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/"],
  FMI: ["CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/"],
  MeteoSwiss: ["CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/"],
};

const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
// Grados enteros, como los rangos por estación. Los ,5 se redondean alejándose
// de cero (-2,5 → -3, no -2) y nunca sale «-0».
const deg = (n) => {
  const r = Math.sign(n) * Math.round(Math.abs(n));
  return `${r === 0 ? 0 : r} °C`;
};

export default function WeatherTimeline({ cityName, citySlug }) {
  // Solo ciudades con datos climáticos reales (normales 1991–2020): sin datos,
  // la sección no se muestra (antes caía en unas temperaturas genéricas inventadas).
  const seasons = CITY_SEASONS[citySlug];
  if (!seasons) return null;
  const extremes = CITY_CLIMATE_EXTREMES[citySlug];

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

      {extremes && (
        <div className={styles.extremes}>
          <p className={styles.extremesNote}>
            <strong>Rangos medios: habrá días más fríos y más calurosos.</strong> Estos son los meses extremos:
          </p>
          <div className={styles.extremesGrid}>
            <div className={`${styles.extreme} ${styles.extremeCold}`}>
              <span className={styles.extremeEmoji} aria-hidden="true">🥶</span>
              <div>
                <p className={styles.extremeLabel}>Mes más frío: {MONTHS[extremes.cold.month]}</p>
                <p className={styles.extremeValue}>Mínimas de {deg(extremes.cold.min)} de media</p>
                {extremes.cold.low != null && (
                  <p className={styles.extremeSub}>y días de hasta {deg(extremes.cold.low)}</p>
                )}
              </div>
            </div>
            <div className={`${styles.extreme} ${styles.extremeHot}`}>
              <span className={styles.extremeEmoji} aria-hidden="true">🥵</span>
              <div>
                <p className={styles.extremeLabel}>Mes más cálido: {MONTHS[extremes.hot.month]}</p>
                <p className={styles.extremeValue}>Máximas de {deg(extremes.hot.max)} de media</p>
                {extremes.hot.high != null && (
                  <p className={styles.extremeSub}>y días de hasta {deg(extremes.hot.high)}</p>
                )}
              </div>
            </div>
          </div>
          <p className={styles.extremesSource}>
            Normales climatológicas {extremes.period ?? "1991–2020"} · {extremes.source}
            {extremes.daysBy && (
              <>
                {" · «Días de hasta»: cálculo de MAbroad (media de la temperatura más baja o más alta de ese mes en cada año) con datos de "}
                {extremes.daysBy}
                {DAYS_LICENSE[extremes.daysBy] && (
                  <> (<a href={DAYS_LICENSE[extremes.daysBy][1]} target="_blank" rel="noopener noreferrer">{DAYS_LICENSE[extremes.daysBy][0]}</a>)</>
                )}
              </>
            )}
          </p>
        </div>
      )}
    </section>
  );
}
