import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import UniversityPicker from "./UniversityPicker";
import styles from "./University.module.css";

/** ¿Pantalla de móvil? (<768 px). Solo en eventos o efectos, nunca en render. */
export function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
}

const FOCUSABLE = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

/**
 * Hoja de móvil para elegir universidad y grado: pantalla completa, sube
 * desde abajo (200 ms), con el buscador arriba (foco puesto), la lista debajo
 * y un botón de cerrar. En escritorio no se usa: allí el buscador se despliega
 * bajo el campo o la invitación.
 *  · La página de fondo no se mueve: se fija el <body> en su sitio (también
 *    en iOS, donde overflow:hidden no basta) y se devuelve al cerrar.
 *  · Ocupa lo que se ve de verdad (visualViewport): con el teclado abierto,
 *    la lista acaba encima del teclado.
 *  · Diálogo modal: el resto de la página queda inerte, Tab no sale de la
 *    hoja y Escape la cierra desde cualquier sitio.
 * @param {{ onClose: () => void, uniId?: string | null }} props
 */
export default function UniversitySheet({ onClose, uniId = null }) {
  const ref = useRef(null);
  const [view, setView] = useState(null); // { top, height } del visualViewport

  // Fondo quieto: body fijo en la posición actual; al cerrar, vuelve.
  useEffect(() => {
    const { body } = document;
    const root = document.getElementById("root");
    const y = window.scrollY;
    const prev = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow };
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (root) root.inert = true;
    return () => {
      Object.assign(body.style, prev);
      if (root) root.inert = false;
      window.scrollTo({ top: y, left: 0, behavior: "instant" });
    };
  }, []);

  // Altura visible (teclado del móvil, zoom).
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return undefined;
    const fit = () => setView({ top: vv.offsetTop, height: vv.height });
    fit();
    vv.addEventListener("resize", fit);
    vv.addEventListener("scroll", fit);
    return () => {
      vv.removeEventListener("resize", fit);
      vv.removeEventListener("scroll", fit);
    };
  }, []);

  // Escape desde cualquier sitio de la hoja y Tab sin salir de ella.
  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      // Desde el buscador ya lo cierra el propio buscador (onDone).
      if (!e.defaultPrevented) {
        e.preventDefault();
        onClose();
      }
      return;
    }
    if (e.key !== "Tab") return;
    const items = [...(ref.current?.querySelectorAll(FOCUSABLE) ?? [])].filter((el) => !el.disabled);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div
      ref={ref}
      className={styles.sheet}
      role="dialog"
      aria-modal="true"
      aria-labelledby="uni-sheet-title"
      onKeyDown={onKeyDown}
      style={view ? { top: view.top, height: view.height, bottom: "auto" } : undefined}
    >
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
