import styles from "./TipsSection.module.css";

const TIP_COLORS = [
  { bg: "#0F172A", accent: "#00BFA5", icon: "💡" },
  { bg: "#1A1035", accent: "#A855F7", icon: "🗺️" },
  { bg: "#0C1F12", accent: "#22C55E", icon: "💸" },
  { bg: "#1F0F0A", accent: "#F97316", icon: "🏠" },
  { bg: "#0A1520", accent: "#0EA5E9", icon: "🚲" },
  { bg: "#1A0F1A", accent: "#EC4899", icon: "🎉" },
];

export default function TipsSection({ tips = [], cityName }) {
  if (!tips.length) return null;
  return (
    <section className={styles.tips}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Consejos exclusivos</p>
          <h2 className={styles.title}>Tips insider para {cityName}</h2>
          <p className={styles.sub}>Lo que los Erasmus desearían haber sabido antes de llegar</p>
        </div>

        <div className={styles.grid}>
          {tips.map((tip, i) => {
            const theme = TIP_COLORS[i % TIP_COLORS.length];
            return (
              <div
                key={i}
                className={styles.card}
                style={{ "--card-bg": theme.bg, "--card-accent": theme.accent }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardIcon}>{theme.icon}</span>
                  <span className={styles.cardNum}>0{i + 1}</span>
                </div>
                <p className={styles.cardText}>{tip}</p>
                <div className={styles.cardGlow} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
