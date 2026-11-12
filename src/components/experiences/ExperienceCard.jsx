import { useState } from "react";
import { Link } from "react-router-dom";
import Flag from "../Flag";
import styles from "./Experiences.module.css";

/** @typedef {import('../../types').ExperienceEntry} ExperienceEntry */

// A partir de esta longitud el texto se recorta y aparece «Leer más».
const CLAMP_FROM = { row: 280, compact: 360, wide: 520 };
// En la portada (fila de tarjetas) solo caben unos pocos consejos: el resto,
// en la ficha de la ciudad.
const MAX_TIPS = { row: 3, compact: Infinity, wide: Infinity };

/** Valoración de 1 a 5 en estrellas (solo lectura). */
export function Stars({ value }) {
  return (
    <span className={styles.stars}>
      <span aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={n <= value ? styles.starOn : styles.starOff}>★</span>
        ))}
      </span>
      <span className="sr-only">Valoración: {value} de 5</span>
    </span>
  );
}

/**
 * Avatar: la foto (solo la del fundador, que es la única que tenemos con
 * permiso) o la inicial sobre un degradado de marca.
 */
export function Avatar({ name, photo, size = 44 }) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.42) };
  if (photo) {
    return <img className={styles.avatar} src={photo} alt="" width={size} height={size} loading="lazy" decoding="async" style={style} />;
  }
  return (
    <span className={styles.avatar} style={style} aria-hidden="true">
      {(name || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}

/**
 * Tarjeta de una experiencia real (o la del fundador, con su distintivo).
 * - variant "row": tarjeta de la portada (en una fila con scroll).
 * - variant "compact": tarjeta estrecha.
 * - variant "wide": sección «Lo que dicen los que viven allí» de la ficha.
 * - showCity: enlace a la ficha de la ciudad (en la portada).
 * @param {{ entry: ExperienceEntry & { role?: string, photo?: string|null }, variant?: "row"|"compact"|"wide", showCity?: boolean }} props
 */
export default function ExperienceCard({ entry, variant = "row", showCity = false }) {
  const [expanded, setExpanded] = useState(false);
  const text = entry.text || "";
  const allTips = entry.tips || [];
  const tips = allTips.slice(0, MAX_TIPS[variant]);
  const hiddenTips = allTips.length - tips.length;
  const long = text.length > CLAMP_FROM[variant];

  const meta = [entry.stayLabel, entry.course && `curso ${entry.course}`].filter(Boolean).join(" · ");
  const unis = [
    entry.homeUniversity && `Desde ${entry.homeUniversity}`,
    entry.hostUniversity && !entry.founder && `en ${entry.hostUniversity}`,
  ].filter(Boolean).join(" ");

  return (
    <article className={`${styles.card} ${styles[variant]}${entry.founder ? ` ${styles.founderCard}` : ""}`}>
      <div className={styles.cardTop}>
        {text
          ? <span className={styles.quoteMark} aria-hidden="true">“</span>
          : <span className={styles.tipsLabel}>Sus consejos</span>}
        {entry.founder
          ? <span className={styles.founderBadge}>{entry.role || "Fundador de MAbroad"}</span>
          : entry.rating ? <Stars value={entry.rating} /> : null}
      </div>

      {text && <p className={`${styles.cardText}${long && !expanded ? ` ${styles.clamped}` : ""}`}>{text}</p>}
      {text && long && (
        <button type="button" className={styles.moreBtn} onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
          {expanded ? "Leer menos" : "Leer más"}
        </button>
      )}

      {tips.length > 0 && (
        <ul className={styles.tipList}>
          {tips.map((t, i) => (
            <li key={i} className={styles.tip}>
              <span className={styles.tipTopic}>{t.topicLabel}</span>
              <span className={styles.tipText}>{t.text}</span>
            </li>
          ))}
        </ul>
      )}
      {hiddenTips > 0 && (
        <p className={styles.moreTips}>
          {hiddenTips === 1 ? "Y 1 consejo más" : `Y ${hiddenTips} consejos más`} en la ficha de {entry.cityName}.
        </p>
      )}

      <footer className={styles.author}>
        <Avatar name={entry.name} photo={entry.photo} />
        <div className={styles.authorText}>
          <p className={styles.authorName}>{entry.name}</p>
          <p className={styles.authorMeta}><Flag emoji={entry.cityEmoji} /> {meta}</p>
          {unis && <p className={styles.authorMeta}>{unis}</p>}
        </div>
      </footer>

      {showCity && (
        <Link to={`/city/${entry.citySlug}`} className={styles.cityLink}>
          Ver {entry.cityName} <span aria-hidden="true">→</span>
        </Link>
      )}
    </article>
  );
}
