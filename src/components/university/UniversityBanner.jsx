import { useUniversity } from "../../hooks/useUniversity";
import styles from "./University.module.css";

/**
 * «Mostrando X destinos para [grado] en Loyola · Ver todos los destinos».
 * Solo con el modo universidad activo; «Ver todos» pausa el filtro sin
 * quitar la universidad (las tarjetas siguen con su distintivo de plazas).
 * @param {{ count: number }} props  destinos que se están enseñando
 */
export default function UniversityBanner({ count }) {
  const uni = useUniversity();
  if (!uni.active) return null;
  const name = uni.entry.shortName;
  const who = uni.degreeName ? `para ${uni.degreeName} en ${name}` : `con plazas de ${name}`;
  return (
    <div className={styles.banner} role="status">
      {uni.showAll ? (
        <span>
          Mostrando todos los destinos ·{" "}
          <button type="button" className={styles.linkBtn} onClick={() => uni.setShowAll(false)}>
            Ver solo los de {name}
          </button>
        </span>
      ) : (
        <span>
          Mostrando <strong>{count}</strong> destino{count === 1 ? "" : "s"} {who} ·{" "}
          <button type="button" className={styles.linkBtn} onClick={() => uni.setShowAll(true)}>
            Ver todos los destinos
          </button>
        </span>
      )}
    </div>
  );
}
