import { useEffect, useId, useRef, useState } from "react";
import { photoCredit } from "../lib/photoCredits";
import { IconInfo } from "./icons";
import styles from "./PhotoCredit.module.css";

const CORNERS = {
  "top-left": styles.topLeft,
  "top-right": styles.topRight,
  "bottom-left": styles.bottomLeft,
  "bottom-right": styles.bottomRight,
};

/**
 * Crédito de una foto de Wikimedia Commons: icono ⓘ pequeño y semitransparente
 * en una esquina que, al pasar el ratón, enfocarlo o tocarlo, muestra
 * «Foto: autor · licencia» enlazado a Commons. Los datos salen de
 * src/lib/photoCredits.js (fuente única). Si la foto no es de Commons (o es de
 * dominio público, que no exige atribución) no pinta nada.
 *
 * - Por defecto es un botón accesible (teclado y lector de pantalla); el texto
 *   lleva enlaces a la ficha de Commons y a la licencia.
 * - `nested`: para fotos DENTRO de una tarjeta que ya es enlace/botón, donde
 *   no se puede anidar otro control interactivo. Entonces es solo para puntero
 *   y queda oculto a la accesibilidad (esos créditos están en /creditos):
 *   con ratón, el hover lo muestra y el clic abre Commons; en táctil, el
 *   primer toque lo muestra y el segundo abre Commons. El clic nunca activa
 *   la tarjeta.
 */
export default function PhotoCredit({ src, corner = "bottom-right", nested = false, style }) {
  const credit = photoCredit(src);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const pointerType = useRef("mouse");
  const tipId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => { if (!rootRef.current?.contains(e.target)) setOpen(false); };
    const onKeyDown = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!credit?.requiresCredit) return null;
  const className = `${styles.credit} ${CORNERS[corner] || styles.bottomRight}${open ? ` ${styles.open}` : ""}`;

  if (nested) {
    const onClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (pointerType.current === "mouse" || open) window.open(credit.sourceUrl, "_blank", "noopener,noreferrer");
      else setOpen(true);
    };
    return (
      <span ref={rootRef} className={className} style={style} aria-hidden="true">
        <span
          className={styles.icon}
          onPointerDown={(e) => { pointerType.current = e.pointerType; }}
          onClick={onClick}
        >
          <IconInfo size={13} />
        </span>
        <span className={styles.tip} onClick={onClick}>
          Foto: {credit.author} · {credit.license}
        </span>
      </span>
    );
  }

  return (
    <span ref={rootRef} className={className} style={style}>
      <button
        type="button"
        className={styles.icon}
        aria-label="Créditos de la foto"
        aria-expanded={open}
        aria-controls={tipId}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
      >
        <IconInfo size={13} />
      </button>
      <span id={tipId} className={styles.tip}>
        Foto:{" "}
        <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer">{credit.author}</a>
        {" · "}
        {credit.licenseUrl
          ? <a href={credit.licenseUrl} target="_blank" rel="license noopener noreferrer">{credit.license}</a>
          : credit.license}
      </span>
    </span>
  );
}
