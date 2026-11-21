import { useEffect, useId, useRef, useState } from "react";
import { IconUniversidad } from "../icons";
import { useUniversity } from "../../hooks/useUniversity";
import { getDegreeShortName, getUniversityShareUrl } from "../../lib/universities";
import UniversityPicker from "./UniversityPicker";
import { readSessionCompareCities } from "../../hooks/useSessionMemory";

/**
 * Chip fijo de la cabecera con la universidad elegida: «Loyola · GITI ▾». Abre
 * un menú pequeño con el buscador «Tu uni y grado» (para cambiar de grado o
 * de universidad), «Ver todos los destinos» (sin perder la universidad),
 * «Copiar enlace» y «Quitar». Sin universidad elegida se pinta igual, solo con
 * el birrete, en todas las páginas y anchos: abre el buscador «Tu uni y grado».
 * Nunca tapa la navegación: el texto solo se ve donde cabe (ver «UNIVERSITY
 * CHIP» en global.css); si no, solo el icono.
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

  if (!uni.uniId) {
    // Sin universidad: el birrete solo. El servidor pinta siempre este estado
    // (la universidad guardada se aplica al hidratar, en useUniversity).
    return (
      <div className={`uni-chip uni-chip--empty${isDark ? " uni-chip--dark" : ""}`} ref={rootRef}>
        <button
          type="button"
          ref={buttonRef}
          className="uni-chip__btn"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Elige tu universidad y grado"
          title="Elige tu universidad y grado"
          onClick={() => setOpen((v) => !v)}
        >
          <IconUniversidad size={18} />
        </button>
        {open && (
          <div className="uni-chip__menu" id={menuId} role="group" aria-label="Tu universidad y grado">
            <p className="uni-chip__title">Tu universidad y grado</p>
            <p className="uni-chip__current">Verás solo los destinos con convenio para tu grado.</p>
            <UniversityPicker autoFocus max={3} onDone={() => { setOpen(false); buttonRef.current?.focus(); }} />
          </div>
        )}
      </div>
    );
  }
  const name = uni.entry.shortName;
  const degree = getDegreeShortName(uni.degreeName, uni.degreeId);
  const label = degree ? `${name} · ${degree}` : name;

  async function copyLink() {
    const url = getUniversityShareUrl(window.location.origin, uni.uniId, uni.degreeId, readSessionCompareCities());
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
          {/* Menú compacto: como mucho 3 sugerencias. */}
          <UniversityPicker uniId={uni.uniId} max={3} onDone={() => buttonRef.current?.focus()} />
          {uni.loadError && (
            <button type="button" className="uni-chip__action" onClick={uni.retry}>Reintentar la carga</button>
          )}
          {uni.active && (
            <button type="button" className="uni-chip__action" onClick={() => uni.setShowAll(!uni.showAll)}>
              {uni.showAll ? `Ver solo mis destinos de ${name}` : "Ver todos los destinos"}
            </button>
          )}
          <button type="button" className="uni-chip__action" onClick={copyLink}>
            {copied ? "¡Enlace copiado!" : "Copiar enlace (universidad, grado y comparador)"}
          </button>
          <button
            type="button"
            className="uni-chip__action uni-chip__action--muted"
            onClick={() => {
              setOpen(false);
              uni.clear();
              // El chip se queda solo con el birrete: el foco vuelve a él.
              requestAnimationFrame(() => buttonRef.current?.focus());
            }}
          >
            Quitar mi universidad
          </button>
        </div>
      )}
    </div>
  );
}
