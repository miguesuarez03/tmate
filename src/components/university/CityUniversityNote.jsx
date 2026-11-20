import { useUniversity } from "../../hooks/useUniversity";
import { formatAgreementCount } from "../../lib/universities";
import UniversityInvite from "./UniversityInvite";
import styles from "./University.module.css";

/**
 * Tarjeta de la nota de la ficha (hero): qué pasa con tu universidad aquí.
 *  · Sin universidad elegida: invitación «Loyola tiene 4 convenios aquí. Elige
 *    tu grado →», solo si la ciudad tiene convenios de alguna universidad.
 *  · Con universidad: enlace a «Tus convenios desde…» (más abajo) con cuántos
 *    hay para tu grado, o una línea discreta si no hay ninguno.
 * @param {{ slug: string, cityAgreements?: { id: string, count: number }[] | null }} props
 */
export default function CityUniversityNote({ slug, cityAgreements = null }) {
  const uni = useUniversity();
  if (!uni.uniId) {
    return cityAgreements?.length ? <UniversityInvite variant="dark" cityAgreements={cityAgreements} /> : null;
  }
  if (!uni.active) return null;
  const name = uni.entry.shortName;
  const all = uni.allPlacesFor(slug).length;
  const mine = uni.placesFor(slug).length;
  if (!all) return <p className={`${styles.cityNote} ${styles.cityNoteMuted}`}>{name} no tiene convenios de estudios aquí.</p>;
  return (
    <a className={styles.cityNote} href="#tus-convenios">
      {uni.degreeName
        ? mine
          ? `${name}: ${formatAgreementCount(mine)} para tu grado ↓`
          : `${name}: ${formatAgreementCount(all)}, ninguno para tu grado ↓`
        : `${name}: ${formatAgreementCount(all)} aquí ↓`}
    </a>
  );
}
