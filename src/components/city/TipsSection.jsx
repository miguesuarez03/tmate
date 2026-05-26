import styles from "./TipsSection.module.css";

export default function TipsSection({ tips = [], cityName }) {
  if (!tips.length) return null;
  return (
    <section className={styles.tips}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Consejos locales</p>
        <h2 className={styles.title}>Tips insider para {cityName}</h2>
        <p className={styles.sub}>Lo que los estudiantes desearían haber sabido antes de llegar</p>
      </div>
      <div className={styles.grid}>
        {tips.map((tip, i) => (
          <div key={i} className={styles.card}>
            <span className={styles.num}>0{i + 1}</span>
            <div className={styles.icon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/>
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
              </svg>
            </div>
            <p className={styles.text}>{tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
