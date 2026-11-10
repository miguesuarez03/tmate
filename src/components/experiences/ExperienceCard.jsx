import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Experiences.module.css";

/** @typedef {import('../../types').ExperienceEntry} ExperienceEntry */

// A partir de esta longitud el texto se recorta y aparece «Leer más».
const CLAMP_FROM = { row: 280, compact: 360 };

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
 * - variant "compact": columna de la ficha de ciudad.
 * - showCity: enlace a la ficha de la ciudad (en la portada).
 * @param {{ entry: ExperienceEntry & { role?: string, photo?: string|null }, variant?: "row"|"compact", showCity?: boolean }} props
 */
export default function ExperienceCard({ entry, variant = "row", showCity = false }) {
  const [expanded, setExpanded] = useState(false);
  const long = entry.text.length > CLAMP_FROM[variant];

  const meta = [entry.stayLabel, entry.year].filter(Boolean).join(" · ");

  return (
    <article className={`${styles.card} ${styles[variant]}${entry.founder ? ` ${styles.founderCard}` : ""}`}>
      <div className={styles.cardTop}>
        <span className={styles.quoteMark} aria-hidden="true">“</span>
        {entry.founder
          ? <span className={styles.founderBadge}>{entry.role || "Fundador de MAbroad"}</span>
          : entry.rating ? <Stars value={entry.rating} /> : null}
      </div>

      <p className={`${styles.cardText}${long && !expanded ? ` ${styles.clamped}` : ""}`}>{entry.text}</p>
      {long && (
        <button type="button" className={styles.moreBtn} onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
          {expanded ? "Leer menos" : "Leer más"}
        </button>
      )}

      <footer className={styles.author}>
        <Avatar name={entry.name} photo={entry.photo} />
        <div className={styles.authorText}>
          <p className={styles.authorName}>{entry.name}</p>
          <p className={styles.authorMeta}>{entry.cityEmoji} {meta}</p>
          {entry.homeUniversity && <p className={styles.authorMeta}>Desde {entry.homeUniversity}</p>}
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
