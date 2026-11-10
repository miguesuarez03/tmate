import { useEffect, useId, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FOUNDER_EXPERIENCE } from "../../data/cityExperiences";
import { getAllExperiences, getFounderEntry, getCityBySlug } from "../../lib/cities";
import { SectionLabel, MASymbol } from "../Layout";
import { IconUniversidad, IconPin } from "../icons";
import ExperienceCard from "./ExperienceCard";
import ShareExperienceModal from "./ShareExperienceModal";
import styles from "./Experiences.module.css";

/**
 * Sección de experiencias de la portada, con dos estados automáticos:
 * - Sin ninguna experiencia real aprobada → «Mi experiencia»: quién está
 *   detrás de MAbroad y por qué, con el botón «Comparte la tuya».
 * - Con al menos una → las experiencias de la gente, y la del fundador queda
 *   como una tarjeta más.
 * Los datos salen de src/data/cityExperiences.js (solo lo aprobado a mano).
 */
export default function HomeExperiences() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [shareOpen, setShareOpen] = useState(false);
  const titleId = useId();
  const experiences = getAllExperiences();

  // El menú lateral enlaza aquí con ?accion=compartir para abrir el
  // formulario directamente.
  useEffect(() => {
    if (searchParams.get("accion") !== "compartir") return;
    setShareOpen(true);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("accion");
      return params;
    }, { replace: true });
  }, [searchParams, setSearchParams]);

  const modal = <ShareExperienceModal open={shareOpen} onClose={() => setShareOpen(false)} />;

  if (experiences.length === 0) {
    return (
      <section className={styles.section} aria-labelledby={titleId}>
        <FounderStory titleId={titleId} onShare={() => setShareOpen(true)} />
        {modal}
      </section>
    );
  }

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={styles.sectionHeader}>
        <SectionLabel color="var(--color-teal)">Experiencias reales</SectionLabel>
        <h2 id={titleId} className="section__title">Erasmus contados por quien los vive.</h2>
        <p className={styles.sectionSub}>
          Las envían estudiantes como tú y las leemos una a una antes de publicarlas.
        </p>
      </div>

      <div className={styles.cardsRow}>
        {experiences.map((e, i) => (
          <ExperienceCard key={`${e.citySlug}-${e.name}-${i}`} entry={e} showCity />
        ))}
        <ExperienceCard entry={getFounderEntry()} showCity />
      </div>

      <div className={styles.ctaBar}>
        <p className={styles.ctaText}>
          <strong>¿Has estado de intercambio?</strong> Tu experiencia es justo lo que le falta al siguiente que se va.
        </p>
        <button type="button" className={styles.primaryBtn} onClick={() => setShareOpen(true)}>
          Comparte la tuya
        </button>
      </div>
      {modal}
    </section>
  );
}

/** «Mi experiencia»: el fundador, su foto (o un hueco de marca) y su porqué. */
function FounderStory({ titleId, onShare }) {
  const f = FOUNDER_EXPERIENCE;
  const city = getCityBySlug(f.citySlug);

  return (
    <div className={styles.founder}>
      <figure className={styles.founderPhoto}>
        {f.photo ? (
          <img src={f.photo} alt={`${f.name}, ${f.role}`} width={800} height={1000} loading="lazy" decoding="async" />
        ) : (
          <div className={styles.founderPlaceholder} aria-hidden="true">
            <span className={styles.founderInitial}>{f.name.charAt(0)}</span>
            <span className={styles.founderMark}><MASymbol size={64} light /></span>
          </div>
        )}
        <figcaption className={styles.founderChip}>
          {city?.emoji} Erasmus en {city?.name || f.hostUniversity}
        </figcaption>
      </figure>

      <div className={styles.founderBody}>
        <SectionLabel color="var(--color-teal)">Mi experiencia</SectionLabel>
        <h2 id={titleId} className={styles.founderTitle}>Hola, soy {f.name}.</h2>
        <div className={styles.founderStory}>
          {f.story.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <ul className={styles.founderFacts}>
          <li><IconUniversidad size={26} /> <span>{f.studies} · {f.homeUniversity}</span></li>
          <li>
            <IconPin size={26} />
            <span>
              Erasmus en la {f.hostUniversity}
              {city && <> · <Link to={`/city/${city.slug}`}>Ver {city.name}</Link></>}
            </span>
          </li>
        </ul>

        <div className={styles.founderActions}>
          <button type="button" className={styles.primaryBtn} onClick={onShare}>Comparte la tuya</button>
          <span className={styles.founderHint}>La leemos antes de publicarla.</span>
        </div>
      </div>
    </div>
  );
}
