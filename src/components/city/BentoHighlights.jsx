import styles from "./BentoHighlights.module.css";

const ICONS = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
];

const THEMES = [
  { bg: "#EFF6FF", accent: "#3B82F6", text: "#1E3A8A" },
  { bg: "#F0FDF4", accent: "#22C55E", text: "#14532D" },
  { bg: "#FFF7ED", accent: "#F97316", text: "#7C2D12" },
  { bg: "#FAF5FF", accent: "#A855F7", text: "#581C87" },
];

export default function BentoHighlights({ highlights = [], cityName }) {
  const items = [...highlights, ...Array(Math.max(0, 4 - highlights.length)).fill("Destacado")].slice(0, 4);

  return (
    <section className={styles.bento}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Lo mejor de {cityName}</p>
        <h2 className={styles.title}>Por qué eligen esta ciudad</h2>
      </div>
      <div className={styles.grid}>
        {items.map((text, i) => {
          const t = THEMES[i];
          return (
            <div
              key={i}
              className={`${styles.card} ${i === 0 ? styles.cardLarge : ""}`}
              style={{ "--bg": t.bg, "--accent": t.accent, "--text": t.text }}
            >
              <div className={styles.cardIcon}>{ICONS[i]}</div>
              <div className={styles.cardBody}>
                <span className={styles.cardNum}>0{i + 1}</span>
                <p className={styles.cardText}>{text}</p>
              </div>
              <div className={styles.cardBlob} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
