import { useId, useState } from "react";
import { getCityExperienceCards } from "../../lib/cities";
import { IconLapiz } from "../icons";
import ExperienceCard from "./ExperienceCard";
import ShareExperienceModal from "./ShareExperienceModal";
import styles from "./Experiences.module.css";

const INITIAL_VISIBLE = 3;

/**
 * Experiencias de una ciudad en su ficha (columna derecha del análisis).
 * En Rosenheim, la del fundador va primera; en el resto, solo las reales
 * aprobadas o, si no hay, la invitación a ser el primero en contarla.
 */
export default function CityExperiences({ citySlug, cityName }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const titleId = useId();
  const cards = getCityExperienceCards(citySlug);
  const visible = showAll ? cards : cards.slice(0, INITIAL_VISIBLE);

  return (
    <aside className={styles.cityBlock} aria-labelledby={titleId}>
      <h3 id={titleId} className={styles.cityTitle}>Experiencias en {cityName}</h3>

      {cards.length > 0 ? (
        <>
          <div className={styles.cityList}>
            {visible.map((e, i) => (
              <ExperienceCard key={`${e.name}-${i}`} entry={e} variant="compact" />
            ))}
          </div>
          {cards.length > INITIAL_VISIBLE && (
            <button type="button" className={styles.linkBtn} onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
              {showAll ? "Ver menos" : `Ver las ${cards.length} experiencias`}
            </button>
          )}
          <div className={styles.cityShare}>
            <p>¿Has estado en {cityName}? Cuéntalo tú también.</p>
            <button type="button" className={styles.secondaryBtn} onClick={() => setShareOpen(true)}>
              Compartir mi experiencia
            </button>
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}><IconLapiz size={44} /></span>
          <p className={styles.emptyTitle}>Todavía no hay experiencias de {cityName}.</p>
          <p className={styles.emptyText}>¿Has estado? Sé el primero en contarla.</p>
          <button type="button" className={styles.primaryBtn} onClick={() => setShareOpen(true)}>
            Compartir mi experiencia
          </button>
        </div>
      )}

      <ShareExperienceModal open={shareOpen} onClose={() => setShareOpen(false)} initialCity={citySlug} />
    </aside>
  );
}
