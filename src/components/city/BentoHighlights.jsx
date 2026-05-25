import styles from "./BentoHighlights.module.css";

// ─── ICON MAP ─────────────────────────────────────────────────────────────────
const HIGHLIGHT_ICONS = {
  0: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5Z"/>
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  1: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  2: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/>
      <line x1="10" y1="1" x2="10" y2="4"/>
      <line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  ),
  3: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  ),
};

// Pastel palettes per highlight card
const CARD_THEMES = [
  { bg: "#F0F7FF", accent: "#0EA5E9", text: "#0C4A6E", tag: "#DBEAFE" },
  { bg: "#FFF7ED", accent: "#F97316", text: "#7C2D12", tag: "#FFEDD5" },
  { bg: "#F0FDF4", accent: "#22C55E", text: "#14532D", tag: "#DCFCE7" },
  { bg: "#FAF5FF", accent: "#A855F7", text: "#581C87", tag: "#F3E8FF" },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function BentoHighlights({ highlights = [], cityName }) {
  // Fallback if fewer than 4 highlights
  const items = [
    ...highlights,
    ...Array(Math.max(0, 4 - highlights.length)).fill("Destacado"),
  ].slice(0, 4);

  return (
    <section className={styles.bento}>
      <div className={styles.bentoHeader}>
        <p className={styles.bentoEyebrow}>Lo mejor de {cityName}</p>
        <h2 className={styles.bentoTitle}>Por qué eligen esta ciudad</h2>
      </div>

      <div className={styles.bentoGrid}>
        {items.map((highlight, i) => {
          const theme = CARD_THEMES[i];
          const Icon = HIGHLIGHT_ICONS[i];
          const isLarge = i === 0; // first card spans 2 rows

          return (
            <div
              key={i}
              className={`${styles.bentoCard} ${isLarge ? styles.bentoCardLarge : ""}`}
              style={{
                "--card-bg": theme.bg,
                "--card-accent": theme.accent,
                "--card-text": theme.text,
                "--card-tag": theme.tag,
              }}
            >
              <div className={styles.bentoCardIcon}>
                <Icon />
              </div>
              <div className={styles.bentoCardBody}>
                <span className={styles.bentoCardNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className={styles.bentoCardText}>{highlight}</p>
              </div>
              {/* Decorative blob */}
              <div className={styles.bentoCardBlob} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
