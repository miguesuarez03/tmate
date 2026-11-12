import { useId, useState } from "react";
import { getCityExperienceCards } from "../../lib/cities";
import { IconLapiz } from "../icons";
import ExperienceCard from "./ExperienceCard";
import ShareExperienceModal from "./ShareExperienceModal";
import styles from "./Experiences.module.css";

const INITIAL_VISIBLE = 4;

/**
 * «Lo que dicen los que viven allí»: consejos y experiencias reales de
 * estudiantes en la ficha de una ciudad (src/data/cityExperiences.js, solo lo
 * aprobado a mano). En Rosenheim, la del fundador va primera. Sin ninguna, la
 * invitación a contar la suya con el formulario «Comparte tu experiencia».
 */
export default function CityExperiences({ citySlug, cityName }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const titleId = useId();
  const cards = getCityExperienceCards(citySlug);
  const visible = showAll ? cards : cards.slice(0, INITIAL_VISIBLE);

  return (
    <section className={styles.citySection} aria-labelledby={titleId}>
      <div className={styles.cityInner}>
        <div className={styles.cityHeader}>
          <p className={styles.cityEyebrow}>Consejos de estudiantes</p>
          <h2 id={titleId} className={styles.cityHeading}>Lo que dicen los que viven allí</h2>
          <p className={styles.citySub}>
            Consejos reales de estudiantes de intercambio en {cityName}. Los leemos uno a uno antes de publicarlos.
          </p>
        </div>

        {cards.length > 0 ? (
          <>
            <div className={styles.cityGrid}>
              {visible.map((e, i) => (
                <ExperienceCard key={`${e.name}-${i}`} entry={e} variant="wide" />
              ))}
            </div>
            {cards.length > INITIAL_VISIBLE && (
              <button type="button" className={styles.linkBtn} onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
                {showAll ? "Ver menos" : `Ver las ${cards.length} experiencias`}
              </button>
            )}
            <div className={styles.cityShare}>
              <p><strong>¿Estás de Erasmus en {cityName}?</strong> Cuéntanos tus consejos para el siguiente que llegue.</p>
              <button type="button" className={styles.secondaryBtn} onClick={() => setShareOpen(true)}>
                Compartir mis consejos
              </button>
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}><IconLapiz size={44} /></span>
            <p className={styles.emptyTitle}>¿Estás de Erasmus en {cityName}? Cuéntanos tus consejos.</p>
            <p className={styles.emptyText}>
              Transporte, barrios, dónde comprar, sitios baratos… Lo que a ti te habría gustado saber al llegar.
            </p>
            <button type="button" className={styles.primaryBtn} onClick={() => setShareOpen(true)}>
              Compartir mis consejos
            </button>
          </div>
        )}
      </div>

      <ShareExperienceModal open={shareOpen} onClose={() => setShareOpen(false)} initialCity={citySlug} />
    </section>
  );
}
