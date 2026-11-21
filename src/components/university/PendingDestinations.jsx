import { Link } from "react-router-dom";
import { useUniversity } from "../../hooks/useUniversity";
import { formatPlacesBadge, formatAgreementCount, getUniversityPath } from "../../lib/universities";
import styles from "./University.module.css";

/**
 * Lo que la universidad tiene y MAbroad aún no enseña como ficha, en poco
 * espacio debajo de las tarjetas (pronto todos los destinos tendrán ficha):
 *  · Destinos fuera de España sin ficha: una línea con enlace a la página de
 *    la universidad (/universidades/<id>), que los lista todos por país.
 *  · España (SICUE): «próximamente», plegado en una línea.
 *  · Programas que no son de estudios (MAGIS…): plegados, al final.
 */
export default function PendingDestinations() {
  const uni = useUniversity();
  if (!uni.filtering) return null;
  const { pending, domestic, other } = uni.view;
  if (!pending.length && !domestic.length && !other.length) return null;
  return (
    <div className={styles.extraDest}>
      {pending.length > 0 && (
        <p className={styles.extraLine}>
          Y {pending.length === 1 ? "1 destino más" : `${pending.length} destinos más`} de {uni.entry.shortName} que aún no tienen ficha.{" "}
          <Link to={getUniversityPath(uni.entry.id)}>Verlos por país →</Link>
        </p>
      )}
      <DomesticPending groups={domestic} />
      <OtherPrograms other={other} />
    </div>
  );
}

/**
 * «Otros programas: MAGIS»: plegado y discreto. No son intercambios de
 * estudios de un cuatrimestre o un curso, así que no cuentan en ningún
 * contador ni filtro; solo se listan por ciudad.
 */
function OtherPrograms({ other }) {
  if (!other.length) return null;
  const total = other.reduce((n, o) => n + o.relations.length, 0);
  return (
    <details className={styles.extraFold}>
      <summary>
        Otros programas: {other.map((o) => o.label).join(", ")} ({formatAgreementCount(total)})
      </summary>
      <p className={styles.extraNote}>No son intercambios de estudios de un cuatrimestre o un curso.</p>
      {other.map((o) => (
        <div key={o.type}>
          <p className={styles.otherName}>{o.name}</p>
          <ul className={styles.domesticList}>
            {o.groups.map((g) => (
              <li key={g.key} className={styles.domesticItem}>
                <span className={styles.domesticCity}>{g.city}</span>
                <span className={styles.domesticPlaces}>{g.country} · {formatAgreementCount(g.relations.length)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </details>
  );
}

/**
 * «España (SICUE): próximamente», plegado. MAbroad aún no tiene fichas en
 * España: solo la ciudad y el número de convenios, sin enlace ni datos del portal.
 */
function DomesticPending({ groups }) {
  if (!groups.length) return null;
  return (
    <details className={styles.extraFold}>
      <summary>
        España (SICUE): {groups.length === 1 ? "1 destino" : `${groups.length} destinos`}, próximamente
      </summary>
      <p className={styles.extraNote}>Todavía no hay fichas de ciudades españolas en MAbroad.</p>
      <ul className={styles.domesticList}>
        {groups.map((g) => (
          <li key={g.key} className={styles.domesticItem}>
            <span className={styles.domesticCity}>{g.city}</span>
            <span className={styles.domesticPlaces}>{formatPlacesBadge(g.relations)}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
