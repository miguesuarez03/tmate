import { useState } from "react";
import styles from "./BentoHighlights.module.css";
import { responsiveImage } from "../../lib/images";

// Huecos de las fotos del bento (ver BentoHighlights.module.css). Escritorio:
// rejilla 1.4fr 1fr 1fr de hasta 1320px; la 01 ocupa 2 filas (~480×440) y la
// 04 dos columnas (~700×212). Hasta 860px, 2 columnas (la 01 a todo el ancho)
// y hasta 540px, 2 columnas de tarjetas bajas (150px).
const BENTO_LARGE_SLOTS = [
  ["(max-width: 540px)", "50vw", 1.15],
  ["(max-width: 860px)", "100vw", 1.2],
  ["(min-width: 1320px)", "480px", 1.08],
  [null, "36vw", 1.08],
];
const BENTO_SMALL_SLOTS = [
  ["(max-width: 540px)", "50vw", 1.15],
  ["(max-width: 860px)", "50vw", 1.3],
  ["(min-width: 1320px)", "345px", 1.6],
  [null, "26vw", 1.6],
];
const BENTO_WIDE_SLOTS = [
  ["(max-width: 540px)", "50vw", 1.15],
  ["(max-width: 860px)", "50vw", 1.3],
  ["(min-width: 1320px)", "700px", 3.3],
  [null, "53vw", 3.3],
];
const BENTO_MODAL_SLOTS = [
  ["(max-width: 540px)", "100vw", 1.5],
  [null, "500px", 1.92],
];
const bentoSlots = (i) => (i === 0 ? BENTO_LARGE_SLOTS : i === 3 ? BENTO_WIDE_SLOTS : BENTO_SMALL_SLOTS);

// Generic Unsplash photos for cards 2-4
const FALLBACK_PHOTOS = [
  null,
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
  "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=1200&q=80",
];

const ACCENTS = ["#3F7A7D", "#22C55E", "#F97316", "#A855F7"];

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
                <img {...responsiveImage(photo, { slots: bentoSlots(i) })} alt={text} className={styles.cardImg} width={800} height={600} loading="lazy" decoding="async" />
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
              ✕
            </button>
            <div className={styles.modalImg}>
              {activePhoto && <img {...responsiveImage(activePhoto, { slots: BENTO_MODAL_SLOTS })} alt={activeItem} width={800} height={450} decoding="async" />}
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
