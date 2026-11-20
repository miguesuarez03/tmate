import { useEffect, useId, useRef, useState } from "react";
import { IconUniversidad } from "../icons";
import { useUniversity } from "../../hooks/useUniversity";
import { getDegreeShortName } from "../../lib/universities";

/**
 * Chip fijo de la cabecera con la universidad elegida: «Loyola · ADE ▾». Abre
 * un menú pequeño para cambiar de grado, ver todos los destinos (sin perder la
 * universidad) o quitarla, desde cualquier página. Sin universidad elegida no
 * se pinta (manda la invitación de cada página). En pantallas estrechas queda
 * solo el icono con un punto naranja; el texto va dentro del menú.
 * Estilos en global.css («UNIVERSITY CHIP»), junto a los del navbar.
 * @param {{ isDark?: boolean }} props  isDark: navbar transparente sobre foto
 */
export default function UniversityChip({ isDark = false }) {
  const uni = useUniversity();
  const [open, setOpen] = useState(false);
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

  if (!uni.uniId) return null;
  const name = uni.entry.shortName;
  const degree = getDegreeShortName(uni.degreeName);
  const label = degree ? `${name} · ${degree}` : name;

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
          <label className="uni-chip__field">
            <span>Grado</span>
            <select
              value={uni.degreeId ?? ""}
              disabled={!uni.data}
              onChange={(e) => uni.setDegree(e.target.value || null)}
            >
              <option value="">{uni.data ? "Todos los grados" : uni.loadError ? "No se han podido cargar" : "Cargando grados…"}</option>
              {(uni.data?.degrees ?? []).map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </label>
          {uni.loadError && (
            <button type="button" className="uni-chip__action" onClick={uni.retry}>Reintentar la carga</button>
          )}
          {uni.active && (
            <button type="button" className="uni-chip__action" onClick={() => uni.setShowAll(!uni.showAll)}>
              {uni.showAll ? `Ver solo mis destinos de ${name}` : "Ver todos los destinos"}
            </button>
          )}
          <button
            type="button"
            className="uni-chip__action uni-chip__action--muted"
            onClick={() => {
              setOpen(false);
              uni.clear();
              // El chip desaparece: el foco pasa a la invitación de la página (si
              // la hay) o al primer control de la cabecera (el logo, siempre visible).
              requestAnimationFrame(() =>
                (document.querySelector("[data-uni-invite-el] button") ?? document.querySelector(".navbar a[href], .navbar button"))?.focus()
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
