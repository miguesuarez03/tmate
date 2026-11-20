import { useEffect } from "react";
import { createPortal } from "react-dom";
import UniversityPicker from "./UniversityPicker";
import styles from "./University.module.css";

/** ¿Pantalla de móvil? (<768 px). Solo en eventos o efectos, nunca en render. */
export function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
}

/**
 * Hoja de móvil para elegir universidad y grado: pantalla completa, sube
 * desde abajo (200 ms), con el buscador arriba (foco puesto), la lista debajo
 * y un botón de cerrar. La página de fondo no se mueve (scroll bloqueado
 * mientras está abierta). En escritorio no se usa: allí el buscador se
 * despliega bajo el campo o la invitación.
 * @param {{ onClose: () => void, uniId?: string | null }} props
 */
export default function UniversitySheet({ onClose, uniId = null }) {
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  return createPortal(
    <div className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="uni-sheet-title">
      <div className={styles.sheetHead}>
        <h2 id="uni-sheet-title" className={styles.sheetTitle}>Tu universidad y tu grado</h2>
        <button type="button" className={styles.sheetClose} onClick={onClose} aria-label="Cerrar">
          <span aria-hidden="true">✕</span>
        </button>
      </div>
      <UniversityPicker autoFocus uniId={uniId} onDone={onClose} />
    </div>,
    document.body
  );
}
