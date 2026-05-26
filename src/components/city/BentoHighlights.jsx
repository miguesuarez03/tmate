import styles from "./BentoHighlights.module.css";

// Generic Unsplash photos for cards 2-4 (city architecture, food, nightlife)
const FALLBACK_PHOTOS = [
  null, // card 01 uses city's own photo
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=75",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=75",
  "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&q=75",
];

const ACCENTS = ["#0EA5E9", "#22C55E", "#F97316", "#A855F7"];

export default function BentoHighlights({ highlights = [], cityName, cityImg }) {
  const items = [...highlights, ...Array(Math.max(0, 4 - highlights.length)).fill("Destacado")].slice(0, 4);

  return (
    <section className={styles.bento}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Lo mejor de {cityName}</p>
        <h2 className={styles.title}>Por qué eligen esta ciudad</h2>
      </div>
      <div className={styles.grid}>
        {items.map((text, i) => {
          const photo = i === 0 ? cityImg : FALLBACK_PHOTOS[i];
          return (
            <div
              key={i}
              className={`${styles.card} ${i === 0 ? styles.cardLarge : ""}`}
            >
              {photo && (
                <img src={photo} alt={text} className={styles.cardImg} loading="lazy" />
              )}
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <span className={styles.cardNum} style={{ color: ACCENTS[i] }}>0{i + 1}</span>
                <p className={styles.cardText}>{text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
