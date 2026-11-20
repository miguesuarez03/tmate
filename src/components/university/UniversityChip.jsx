import { useEffect, useId, useRef, useState } from "react";
import { IconUniversidad } from "../icons";
import { useUniversity } from "../../hooks/useUniversity";
import { getDegreeShortName, getUniversityShareUrl } from "../../lib/universities";
import UniversityPicker from "./UniversityPicker";

/**
 * Chip fijo de la cabecera con la universidad elegida: «Loyola · GITI ▾». Abre
 * un menú pequeño con el buscador «Tu uni y grado» (para cambiar de grado o
 * de universidad), «Ver todos los destinos» (sin perder la universidad),
 * «Copiar enlace» y «Quitar». Sin universidad elegida no se pinta (manda la
 * invitación de cada página). Nunca tapa la navegación: el texto solo se ve
 * donde cabe (ver «UNIVERSITY CHIP» en global.css); si no, solo el icono.
 * @param {{ isDark?: boolean }} props  isDark: navbar transparente sobre foto
 */
export default function UniversityChip({ isDark = false }) {
  const uni = useUniversity();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  if (!uni.uniId) return null;
  const name = uni.entry.shortName;
  const degree = getDegreeShortName(uni.degreeName, uni.degreeId);
  const label = degree ? `${name} · ${degree}` : name;

  async function copyLink() {
    const url = getUniversityShareUrl(window.location.origin, uni.uniId, uni.degreeId);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copia este enlace:", url);
    }
  }

  return (
    <div className={`uni-chip${isDark ? " uni-chip--dark" : ""}`} ref={rootRef}>
      <button
        type="button"
        ref={buttonRef}
        className="uni-chip__btn"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Mi universidad: ${uni.degreeName ? `${name}, ${uni.degreeName}` : name}`}
        title={uni.degreeName ? `${uni.entry.name} · ${uni.degreeName}` : uni.entry.name}
        onClick={() => setOpen((v) => !v)}
      >
        <IconUniversidad size={18} />
        <span className="uni-chip__label">{label}</span>
        <span className="uni-chip__caret" aria-hidden="true">▾</span>
        {uni.filtering && <span className="uni-chip__dot" aria-hidden="true" />}
      </button>

      {open && (
        <div className="uni-chip__menu" id={menuId} role="group" aria-label="Mi universidad">
          <p className="uni-chip__title">{uni.entry.name}</p>
          <p className="uni-chip__current">{uni.degreeName ?? "Todos los grados"}</p>
          <UniversityPicker uniId={uni.uniId} onDone={() => buttonRef.current?.focus()} />
          {uni.loadError && (
            <button type="button" className="uni-chip__action" onClick={uni.retry}>Reintentar la carga</button>
          )}
          {uni.active && (
            <button type="button" className="uni-chip__action" onClick={() => uni.setShowAll(!uni.showAll)}>
              {uni.showAll ? `Ver solo mis destinos de ${name}` : "Ver todos los destinos"}
            </button>
          )}
          <button type="button" className="uni-chip__action" onClick={copyLink}>
            {copied ? "¡Enlace copiado!" : "Copiar enlace a mis destinos"}
          </button>
          <button
            type="button"
            className="uni-chip__action uni-chip__action--muted"
            onClick={() => {
              setOpen(false);
              uni.clear();
              // El chip desaparece: el foco pasa a la invitación de la página (si
              // la hay) o al primer control de la cabecera (el logo, siempre visible).
              requestAnimationFrame(() =>
                (document.querySelector("[data-uni-invite-el] button, .search-bar__uni-btn") ?? document.querySelector(".navbar a[href], .navbar button"))?.focus()
              );
            }}
          >
            Quitar mi universidad
          </button>
        </div>
      )}
    </div>
  );
}
