import styles from "./NeighborhoodSlider.module.css";
import { getUniversityErasmusLink } from "../../data/universityErasmusLinks";

function UniCard({ name, index }) {
  const colors = ["#0EA5E9", "#00BFA5", "#A855F7", "#F97316", "#22C55E"];
  const color = colors[index % colors.length];
  const href = getUniversityErasmusLink(name);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.uniCard}
      style={{ "--uni-color": color }}
    >
      <div className={styles.uniIconWrap}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      </div>
      <div className={styles.uniBody}>
        <p className={styles.uniName}>{name}</p>
        <span className={styles.uniLink}>Ver convenios Erasmus →</span>
      </div>
      <div className={styles.uniArrow}>→</div>
    </a>
  );
}

export default function NeighborhoodSlider({ universities = [] }) {
  if (!universities.length) return null;
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Dónde estudiar</p>
        <h2 className={styles.title}>Universidades con convenio Erasmus</h2>
        <p className={styles.sub}>Centros donde puedes realizar tu intercambio</p>
      </div>
      <div className={styles.grid}>
        {universities.map((name, i) => <UniCard key={i} name={name} index={i} />)}
      </div>
    </section>
  );
}
