import { Link } from "react-router-dom";
import { IconProceso, IconCityMatch, IconComparar, IconBeca, IconLearningAgreement, IconDocumento } from "./icons";
import styles from "./JourneySteps.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// «Tu recorrido»: el camino completo de quien prepara su Erasmus, al pie de
// las herramientas (Proceso, City Match, Comparar, Beca y Learning Agreement).
// Marca dónde estás y resalta el siguiente paso con un botón para ir. Tras el
// último (Learning Agreement), el siguiente son las guías a fondo.
// ─────────────────────────────────────────────────────────────────────────────

export const JOURNEY = [
  { id: "proceso", to: "/proceso", Icon: IconProceso, label: "Entiende el proceso", phrase: "entiende el proceso", desc: "El Erasmus paso a paso, de la solicitud a la vuelta" },
  { id: "city-match", to: "/city-match", Icon: IconCityMatch, label: "Encuentra tu ciudad", phrase: "encuentra tu ciudad", desc: "City Match: las ciudades que encajan contigo" },
  { id: "comparar", to: "/comparar", Icon: IconComparar, label: "Compara destinos", phrase: "compara destinos", desc: "Coste y notas de tus candidatas, lado a lado" },
  { id: "beca", to: "/beca-erasmus", Icon: IconBeca, label: "Calcula tu beca", phrase: "calcula tu beca", desc: "Cuánto cobrarías al mes y cuánto pondrías tú" },
  { id: "learning-agreement", to: "/learning-agreement", Icon: IconLearningAgreement, label: "Prepara tu Learning Agreement", phrase: "prepara tu Learning Agreement", desc: "Qué asignaturas cursas y cómo se convalidan" },
];

const AFTER_JOURNEY = {
  id: "guias", to: "/guias", Icon: IconDocumento, label: "Guías Erasmus", phrase: "las guías a fondo",
  desc: "Beca, Learning Agreement, destino y papeles, explicados a fondo",
};

/**
 * @param {{
 *   current: string,      // id del paso de esta página (ver JOURNEY)
 *   nextTo?: string,      // destino del botón si el siguiente paso puede ir
 *                         // ya personalizado (p. ej. Comparar con tu top 3)
 *   nextDesc?: string,    // texto del siguiente paso personalizado
 * }} props
 */
export default function JourneySteps({ current, nextTo, nextDesc }) {
  const index = JOURNEY.findIndex((s) => s.id === current);
  const next = JOURNEY[index + 1] ?? AFTER_JOURNEY;
  const isLast = index === JOURNEY.length - 1;
  const titleId = `recorrido-${current}`;

  return (
    <section className={styles.journey} aria-labelledby={titleId}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Tu recorrido</span>
        <h2 id={titleId} className={styles.title}>
          {isLast ? "Has llegado al último paso" : <>Siguiente paso: <span className={styles.titleAccent}>{next.phrase}</span></>}
        </h2>

        <ol className={styles.steps}>
          {JOURNEY.map((step, i) => {
            const state = i === index ? "current" : step.id === next.id ? "next" : i < index ? "past" : "later";
            const content = (
              <>
                <span className={styles.num} aria-hidden="true">{i + 1}</span>
                <span className={styles.icon} aria-hidden="true"><step.Icon size={30} /></span>
                <span className={styles.text}>
                  <span className={styles.label}>{step.label}</span>
                  {state === "current" && <span className={styles.tag}>Estás aquí</span>}
                  {state === "next" && <span className={`${styles.tag} ${styles.tagNext}`}>Siguiente</span>}
                </span>
              </>
            );
            return (
              <li key={step.id} className={`${styles.step} ${styles[state]}`}>
                {state === "current" ? (
                  <span className={styles.stepBox} aria-current="step">{content}</span>
                ) : (
                  <Link className={styles.stepBox} to={state === "next" && nextTo ? nextTo : step.to}>{content}</Link>
                )}
              </li>
            );
          })}
        </ol>

        <Link className={styles.cta} to={nextTo ?? next.to}>
          <span className={styles.ctaIcon} aria-hidden="true"><next.Icon size={34} /></span>
          <span className={styles.ctaText}>
            <span className={styles.ctaLabel}>{isLast ? "Sigue con las guías" : next.label}</span>
            <span className={styles.ctaDesc}>{nextDesc ?? next.desc}</span>
          </span>
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
