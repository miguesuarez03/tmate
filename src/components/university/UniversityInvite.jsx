import { useEffect, useRef, useState } from "react";
import { IconUniversidad } from "../icons";
import { useUniversity } from "../../hooks/useUniversity";
import { getUniversityEntry } from "../../data/universities/registry";
import { getInviteText } from "../../lib/universities";
import UniversityPicker from "./UniversityPicker";
import styles from "./University.module.css";

/**
 * Invitación discreta a elegir universidad: «Elige tu universidad y tu grado
 * y ve solo tus destinos →», con ✕ para cerrarla el resto de la sesión. Una
 * por página. Al pulsarla se despliega ahí mismo el buscador «Tu uni y grado»
 * (UniversityPicker, el mismo que el de la home); con universidad elegida no
 * se enseña (manda el chip de la cabecera).
 *
 * El HTML prerenderizado la trae siempre; quien ya eligió o la cerró no la ve
 * parpadear gracias a <html data-uni-invite="off"> (script de index.html) y
 * el atributo data-uni-invite-el, que solo lleva la invitación plegada.
 *
 * @param {{
 *   variant?: "dark" | "light",   dark: sobre foto o fondo oscuro (heroes)
 *   cityAgreements?: { id: string, count: number }[] | null,
 *     ficha de ciudad: convenios de cada universidad aquí. Sin ninguno, no se
 *     enseña; con alguno, dice «Loyola tiene 4 convenios aquí».
 *   className?: string,
 *   onExpandedChange?: (expanded: boolean) => void,
 * }} props
 */
/** Invitación desplegada: botón «Cerrar» visible y cierre con un clic fuera. */
function ExpandedInvite({ className, onClose, children }) {
  const ref = useRef(null);
  // Al abrirse, que se vea entero (la lista de grados queda debajo).
  useEffect(() => {
    ref.current?.scrollIntoView({ block: "center", behavior: "instant" });
  }, []);
  useEffect(() => {
    const onDown = (e) => {
      if (!ref.current?.contains(e.target)) onClose();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [onClose]);
  return (
    <div className={className} ref={ref}>
      <button type="button" className={styles.inviteCloseExpanded} onClick={onClose} aria-label="Cerrar el buscador de universidad">
        <span aria-hidden="true">✕</span>
      </button>
      {children}
    </div>
  );
}

export default function UniversityInvite({ variant = "light", cityAgreements = null, className = "", onExpandedChange = null }) {
  const uni = useUniversity();
  const [expanded, setExpandedState] = useState(false);
  const mainRef = useRef(null);
  const setExpanded = (v) => {
    setExpandedState(v);
    onExpandedChange?.(v);
  };
  // Al plegar, el buscador (con el foco) desaparece: el foco vuelve a la
  // invitación o, si ya hay universidad elegida, al chip de la cabecera.
  const collapse = () => {
    setExpanded(false);
    requestAnimationFrame(() => (mainRef.current ?? document.querySelector(".uni-chip__btn"))?.focus());
  };

  // En la ficha, la universidad con más convenios en la ciudad.
  const top = cityAgreements ? [...cityAgreements].sort((a, b) => b.count - a.count)[0] : null;
  const topEntry = top ? getUniversityEntry(top.id) : null;
  if (cityAgreements && !topEntry) return null;

  const cls = `${styles.invite} ${variant === "dark" ? styles.inviteDark : styles.inviteLight} ${className}`;

  // Abierta: el buscador, aunque ya se haya elegido universidad (se pliega al
  // elegir; así no desaparece a mitad).
  if (expanded) {
    return (
      <ExpandedInvite className={`${cls} ${styles.inviteExpanded}`} onClose={collapse}>
        <UniversityPicker autoFocus uniId={topEntry?.id ?? null} onDone={collapse} />
      </ExpandedInvite>
    );
  }
  if (uni.uniId || uni.inviteDismissed) return null;

  const text = getInviteText({ cityUniversity: topEntry ? { shortName: topEntry.shortName, count: top.count } : null });
  return (
    <div className={`${cls} uni-invite`} data-uni-invite-el="">
      <button type="button" ref={mainRef} className={styles.inviteMain} onClick={() => setExpanded(true)} aria-expanded="false">
        <span className={styles.inviteIcon} aria-hidden="true"><IconUniversidad size={18} /></span>
        <span className={styles.inviteText}>
          {text.title && <><strong>{text.title}</strong>{" "}</>}
          <span className={styles.inviteCta}>{text.cta} →</span>
        </span>
      </button>
      <button type="button" className={styles.inviteClose} onClick={uni.dismissInvite} aria-label="Cerrar la invitación «Mi universidad»">
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
}
