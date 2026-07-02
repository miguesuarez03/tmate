import { useState } from "react";
import { X } from "lucide-react";
import styles from "./BentoHighlights.module.css";

// Generic Unsplash photos for cards 2-4
const FALLBACK_PHOTOS = [
  null,
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
  "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200&q=80",
];

const ACCENTS = ["#0EA5E9", "#22C55E", "#F97316", "#A855F7"];

// Generate a slightly longer description from the short highlight text
function getDetail(text, cityName) {
  return `${text}. Una de las razones clave por las que estudiantes Erasmus eligen ${cityName} año tras año — algo que difícilmente encontrarás en otra ciudad europea.`;
}

export default function BentoHighlights({ highlights = [], cityName, cityImg }) {
  const [active, setActive] = useState(null);
  const items = [...highlights, ...Array(Math.max(0, 4 - highlights.length)).fill("Destacado")].slice(0, 4);

  const handleOpen = (i) => setActive(i);
  const handleClose = () => setActive(null);

  const activeItem = active !== null ? items[active] : null;
  const activePhoto = active !== null ? (active === 0 ? cityImg : FALLBACK_PHOTOS[active]) : null;

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
            <button
              key={i}
              type="button"
              className={`${styles.card} ${i === 0 ? styles.cardLarge : ""}`}
              onClick={() => handleOpen(i)}
              aria-label={`Ver más sobre: ${text}`}
            >
              {photo && (
                <img src={photo} alt={text} className={styles.cardImg} loading="lazy" />
              )}
              <div className={styles.cardOverlay} />
              <div className={styles.cardContent}>
                <span className={styles.cardNum} style={{ color: ACCENTS[i] }}>0{i + 1}</span>
                <p className={styles.cardText}>{text}</p>
                <span className={styles.cardHint}>Toca para saber más →</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal */}
      {active !== null && activeItem && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={handleClose}
              aria-label="Cerrar"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
            <div className={styles.modalImg}>
              {activePhoto && <img src={activePhoto} alt={activeItem} />}
              <div className={styles.cardOverlay} />
              <div className={styles.modalImgContent}>
                <span className={styles.cardNum} style={{ color: ACCENTS[active], fontSize: "0.7rem" }}>0{active + 1}</span>
                <p className={styles.modalTitle}>{activeItem}</p>
              </div>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.modalText}>{getDetail(activeItem, cityName)}</p>
              <span className={styles.modalTag} style={{ background: ACCENTS[active] + "1a", color: ACCENTS[active] }}>
                {cityName} · Por qué eligen esta ciudad
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
