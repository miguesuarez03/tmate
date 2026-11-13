import { useState } from "react";
import { useUniversity } from "../../hooks/useUniversity";
import { getPendingCardInfo, formatPlacesBadge } from "../../lib/universities";
import styles from "./University.module.css";

const INITIAL = 8;

/**
 * Destinos de la universidad que todavía no tienen ficha en MAbroad (también
 * los SICUE, en España): tarjeta sencilla con ciudad, país, universidades,
 * idioma y coste, y la etiqueta «Ficha en preparación». No enlazan a ninguna
 * página: aún no existe.
 */
export default function PendingDestinations() {
  const uni = useUniversity();
  const [showAll, setShowAll] = useState(false);
  if (!uni.filtering || !uni.view.pending.length) return null;
  const groups = uni.view.pending;
  const shown = showAll ? groups : groups.slice(0, INITIAL);

  return (
    <div className={styles.pending}>
      <h3 className={styles.pendingTitle}>
        Más destinos de {uni.entry.shortName} <span className={styles.pendingCount}>{groups.length}</span>
      </h3>
      <p className={styles.pendingSub}>Todavía no tienen ficha en MAbroad: te contamos lo que dice el portal de tu universidad.</p>
      <ul className={styles.pendingGrid}>
        {shown.map((g) => {
          const info = getPendingCardInfo(g);
          const unspecified = uni.degreeId && g.relations.every((r) => r.degreesUnspecified);
          return (
            <li key={g.key} className={styles.pendingCard}>
              <span className={styles.prepTag}>Ficha en preparación</span>
              <p className={styles.pendingCity}>{g.city}</p>
              <p className={styles.pendingCountry}>{g.country}</p>
              <p className={styles.placesBadge}>{formatPlacesBadge(g.relations)}</p>
              {unspecified && <p className={styles.rriTag}>Consulta en tu oficina de RRII</p>}
              <dl className={styles.pendingFacts}>
                <dt>Universidad{info.universities.length > 1 ? "es" : ""}</dt>
                <dd>
                  {info.universities.slice(0, 3).join(" · ")}
                  {info.universities.length > 3 ? ` y ${info.universities.length - 3} más` : ""}
                </dd>
                {info.language && (
                  <>
                    <dt>Idioma</dt>
                    <dd>{info.language}{info.moreLanguages ? ` (y ${info.moreLanguages} más)` : ""}</dd>
                  </>
                )}
                {info.cost && (
                  <>
                    <dt>Coste</dt>
                    <dd>{info.cost}</dd>
                  </>
                )}
              </dl>
            </li>
          );
        })}
      </ul>
      {groups.length > INITIAL && (
        <div className="show-more-wrap">
          <button type="button" className="show-more-btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "← Mostrar menos" : `Ver los ${groups.length - INITIAL} restantes →`}
          </button>
        </div>
      )}
    </div>
  );
}
