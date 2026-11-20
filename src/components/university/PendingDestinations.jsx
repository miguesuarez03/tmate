import { useState } from "react";
import { useUniversity } from "../../hooks/useUniversity";
import { getPendingCardInfo, formatPlacesBadge } from "../../lib/universities";
import styles from "./University.module.css";

const INITIAL = 8;

/**
 * Destinos de la universidad que todavía no tienen ficha en MAbroad: tarjeta
 * sencilla con ciudad, país, universidades, idioma y coste, y la etiqueta
 * «Ficha en preparación». No enlazan a ninguna página: aún no existe.
 * Los de España (SICUE) van aparte, en un bloque «próximamente» sin tarjetas.
 */
export default function PendingDestinations() {
  const uni = useUniversity();
  if (!uni.filtering) return null;
  return (
    <>
      <AbroadPending groups={uni.view.pending} />
      <DomesticPending groups={uni.view.domestic} />
    </>
  );
}

/**
 * «Destinos en España (SICUE): próximamente». MAbroad aún no tiene fichas en
 * España: solo la ciudad y el número de plazas, sin enlace ni datos del portal.
 */
function DomesticPending({ groups }) {
  if (!groups.length) return null;
  return (
    <div className={styles.domestic}>
      <h3 className={styles.pendingTitle}>
        Destinos en España (SICUE): próximamente <span className={styles.pendingCount}>{groups.length}</span>
      </h3>
      <p className={styles.pendingSub}>Todavía no hay fichas de ciudades españolas en MAbroad.</p>
      <ul className={styles.domesticList}>
        {groups.map((g) => (
          <li key={g.key} className={styles.domesticItem}>
            <span className={styles.domesticCity}>{g.city}</span>
            <span className={styles.domesticPlaces}>{formatPlacesBadge(g.relations)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AbroadPending({ groups }) {
  const uni = useUniversity();
  const [showAll, setShowAll] = useState(false);
  if (!groups.length) return null;
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
