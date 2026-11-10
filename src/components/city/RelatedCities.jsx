import { useNavigate } from "react-router-dom";
import styles from "./RelatedCities.module.css";
import { IconComparar } from "../icons";
import { getScoreLevel } from "../../lib/cities";
import { responsiveImage } from "../../lib/images";

// Tarjetas apaisadas de 220px de alto: 3 columnas (~400px), 2 hasta 820px y
// 1 en móvil. Son más apaisadas que la foto, así que se pinta por el ancho.
const relatedPhotoSlots = (fullRow) => [
  ["(max-width: 540px)", "100vw", 1.6],
  ["(max-width: 820px)", fullRow ? "100vw" : "50vw", 1.6], // la última ocupa las 2 columnas
  [null, "420px", 1.75],
];

const scoreColor = (s) => getScoreLevel(s).color;

function RelatedCard({ city, fullRow }) {
  const navigate = useNavigate();
  return (
    <div className={styles.card} onClick={() => navigate(`/city/${city.slug}`)}>
      <img
        {...responsiveImage(city.img, { slots: relatedPhotoSlots(fullRow) })}
        width={800}
        height={600}
        alt={`${city.name}, ${city.country}`}
        className={styles.cardImg}
        loading="lazy"
        decoding="async"
      />
      <div className={styles.cardOverlay} />
      <div className={styles.cardContent}>
        <span className={styles.cardFlag}>{city.emoji}</span>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardName}>{city.name}</h3>
          <p className={styles.cardCountry}>{city.country}</p>
        </div>
        <span className={styles.cardArrow}>→</span>
      </div>
      <span className={styles.cardTag}>{city.tag}</span>
    </div>
  );
}

export default function RelatedCities({ relatedCities = [], currentCity }) {
  const navigate = useNavigate();
  if (!relatedCities.length) return null;
  return (
    <section className={styles.section}>
      <div className={styles.relBlock}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>También en {currentCity?.country ?? "Europa"}</p>
          <h2 className={styles.title}>Otros destinos que te pueden gustar</h2>
        </div>
        <div className={styles.grid}>
          {relatedCities.slice(0, 3).map((c, i, list) => <RelatedCard key={c.slug} city={c} fullRow={i === list.length - 1} />)}
        </div>
      </div>

      {/* Conversion block */}
      <div className={styles.conv}>
        <div className={styles.convInner}>
          <div className={styles.convLeft}>
            <span className={styles.convEmoji}><IconComparar size={32} /></span>
            <div>
              <h2 className={styles.convTitle}>¿Esta es tu ciudad?</h2>
              <p className={styles.convSub}>Compara con otros destinos y toma la mejor decisión para tu Erasmus</p>
            </div>
          </div>
          <div className={styles.convActions}>
            <button className={styles.convPrimary} onClick={() => navigate("/")}>
              Ver todos los destinos →
            </button>
            <button className={styles.convSecondary} onClick={() => navigate("/")}>
              Comparar ciudades
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
