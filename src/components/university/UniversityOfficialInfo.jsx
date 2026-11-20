import { IconUniversidad } from "../icons";
import { useUniversity } from "../../hooks/useUniversity";
import styles from "./University.module.css";

/**
 * Bloque «En <universidad>» de Proceso y Learning Agreement: lo que la propia
 * universidad publica sobre su movilidad saliente (registry.js → official),
 * cada dato con su fuente oficial. Solo con universidad elegida; si la
 * universidad no tiene información oficial en el registro, no se pinta nada.
 * @param {{ context?: string }} props  frase de contexto bajo el título
 */
export default function UniversityOfficialInfo({ context = null }) {
  const uni = useUniversity();
  const info = uni.entry?.official;
  if (!info || (!info.facts?.length && !info.links?.length)) return null;
  const name = uni.entry.shortName;

  return (
    <section className={styles.official} aria-labelledby="en-mi-universidad">
      <div className={styles.officialInner}>
        <p className={styles.placesEyebrow}><IconUniversidad size={16} /> Mi universidad</p>
        <h2 id="en-mi-universidad" className={styles.officialTitle}>En {name}</h2>
        {context && <p className={styles.placesSub}>{context}</p>}

        {info.facts?.length > 0 && (
          <ul className={styles.officialFacts}>
            {info.facts.map((f) => (
              <li key={f.text}>
                {f.text}{" "}
                <a href={f.source} target="_blank" rel="noopener noreferrer" className={styles.officialSource}>
                  Fuente ↗
                </a>
              </li>
            ))}
          </ul>
        )}

        {info.links?.length > 0 && (
          <ul className={styles.officialLinks}>
            {info.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noopener noreferrer" className={styles.officialLink}>
                  <span className={styles.officialLinkLabel}>{l.label} ↗</span>
                  <span className={styles.officialLinkDesc}>{l.desc}</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className={styles.placesFoot}>
          Fuente: {uni.entry.name} ({info.office}). Las fechas y requisitos de cada convocatoria los fija la
          universidad: confírmalos siempre en sus bases.
        </p>
      </div>
    </section>
  );
}
