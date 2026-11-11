import { Link } from "react-router-dom";
import Flag from "../Flag";
import styles from "./RelatedCities.module.css";
import { IconComparar } from "../icons";
import { responsiveImage } from "../../lib/images";
import PhotoCredit from "../PhotoCredit";

// Tarjetas apaisadas de 220px de alto: 4 columnas (~300px), 2 hasta 1100px
// y 1 en móvil. Son más apaisadas que la foto, así que se pinta por el ancho.
const RELATED_PHOTO_SLOTS = [
  ["(max-width: 540px)", "100vw", 1.6],
  ["(max-width: 1100px)", "50vw", 2],
  [null, "330px", 1.4],
];

// Enlaces reales (<Link> → <a href>) y no divs con onClick: así cada ficha
// enlaza de forma rastreable a sus ciudades parecidas y al comparador.
function RelatedCard({ city }) {
  return (
    <Link to={`/city/${city.slug}`} className={styles.card}>
      <img
        {...responsiveImage(city.img, { slots: RELATED_PHOTO_SLOTS })}
        width={800}
        height={600}
        alt={`${city.name}, ${city.country}`}
        className={styles.cardImg}
        loading="lazy"
        decoding="async"
      />
      <div className={styles.cardOverlay} />
      <PhotoCredit src={city.img} corner="bottom-right" nested />
      <div className={styles.cardContent}>
        <span className={styles.cardFlag}><Flag emoji={city.emoji} /></span>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardName}>{city.name}</h3>
          <p className={styles.cardCountry}>{city.country}</p>
        </div>
        <span className={styles.cardArrow} aria-hidden="true">→</span>
      </div>
      <span className={styles.cardTag}>{city.tag}</span>
    </Link>
  );
}

export default function RelatedCities({ relatedCities = [], currentCity }) {
  if (!currentCity) return null;
  return (
    <section className={styles.section}>
      {relatedCities.length > 0 && (
        <div className={styles.relBlock}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Destinos parecidos a {currentCity.name}</p>
            <h2 className={styles.title}>Otros destinos que te pueden gustar</h2>
          </div>
          <div className={styles.grid}>
            {relatedCities.slice(0, 4).map((c) => <RelatedCard key={c.slug} city={c} />)}
          </div>
        </div>
      )}

      {/* Conversion block */}
      <div className={styles.conv}>
        <div className={styles.convInner}>
          <div className={styles.convLeft}>
            <span className={styles.convEmoji} aria-hidden="true"><IconComparar size={32} /></span>
            <div>
              <h2 className={styles.convTitle}>¿Esta es tu ciudad?</h2>
              <p className={styles.convSub}>Compárala con otros destinos y toma la mejor decisión para tu Erasmus</p>
            </div>
          </div>
          <div className={styles.convActions}>
            {/* El comparador abre con esta ciudad ya elegida (?cities=slug). */}
            <Link to={`/comparar?cities=${currentCity.slug}`} className={styles.convPrimary}>
              Comparar {currentCity.name} con… →
            </Link>
            <Link to="/" className={styles.convSecondary}>
              Ver todos los destinos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
