import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { IconUniversidad } from "../icons";
import { useUniversity } from "../../hooks/useUniversity";
import { getDegreeShortName } from "../../lib/universities";
import UniversityPicker from "./UniversityPicker";

/**
 * Segmento «Tu uni y grado» dentro del buscador de destinos de la home
 * (SearchBar). Sin nada elegido es un botón; con universidad elegida, un chip
 * «Loyola · GITI» con ✕ para quitarla. Abre UniversityPicker en un
 * desplegable bajo la barra. El enlace del menú (/#mi-universidad) lo abre.
 * Estilos en global.css («search-bar__uni»), junto a los del buscador.
 * El primer render es siempre el botón (igual que el HTML prerenderizado).
 */
export default function UniversitySearchSegment() {
  const uni = useUniversity();
  const { hash, key: locationKey } = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);

  // Enlace del menú lateral: abre el buscador en cada clic.
  useEffect(() => {
    if (hash !== "#mi-universidad") return;
    setOpen(true);
    requestAnimationFrame(() => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }, [hash, locationKey]);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target) && !panelRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // El desplegable va en un portal (fuera del hero, que recorta lo que se sale
  // y queda tapado por la sección siguiente), con posición fija bajo el
  // buscador y la altura que quepa en la pantalla.
  const panelRef = useRef(null);
  const [pos, setPos] = useState(null);
  useEffect(() => {
    if (!open) return undefined;
    const place = () => {
      const bar = rootRef.current?.closest(".search-bar") ?? rootRef.current;
      if (!bar) return;
      const r = bar.getBoundingClientRect();
      const top = r.bottom + 8;
      setPos({ top, left: r.left, width: r.width, maxHeight: Math.max(220, window.innerHeight - top - 12) });
    };
    // Si debajo del buscador no caben ~320 px, se sube la página (bajo la
    // cabecera fija, 64 px) para que el desplegable se vea entero.
    const bar = rootRef.current?.closest(".search-bar") ?? rootRef.current;
    const r = bar?.getBoundingClientRect();
    if (r && window.innerHeight - r.bottom < 320) window.scrollBy({ top: r.top - 76, behavior: "instant" });
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  };

  const chosen = Boolean(uni.uniId);
  const degree = getDegreeShortName(uni.degreeName, uni.degreeId);
  const label = chosen ? (degree ? `${uni.entry.shortName} · ${degree}` : uni.entry.shortName) : "Tu uni y grado";

  return (
    <div className="search-bar__uni" id="mi-universidad" ref={rootRef}>
      <div className={`search-bar__uni-chip${chosen ? " search-bar__uni-chip--on" : ""}`}>
        <button
          type="button"
          ref={buttonRef}
          className="search-bar__uni-btn"
          aria-expanded={open}
          aria-haspopup="listbox"
          title={chosen ? `${uni.entry.name}${uni.degreeName ? ` · ${uni.degreeName}` : ""}` : "Elige tu universidad y tu grado y ve solo tus destinos"}
          onClick={() => setOpen((v) => !v)}
        >
          <IconUniversidad size={17} />
          <span className="search-bar__uni-label">{label}</span>
        </button>
        {chosen && (
          <button type="button" className="search-bar__uni-clear" aria-label="Quitar mi universidad" onClick={() => { uni.clear(); buttonRef.current?.focus(); }}>
            <span aria-hidden="true">✕</span>
          </button>
        )}
      </div>
      {open && pos && createPortal(
        <div
          ref={panelRef}
          className="search-bar__uni-panel"
          style={{ top: pos.top, left: pos.left, width: pos.width, maxHeight: pos.maxHeight, "--picker-max": `${Math.max(140, pos.maxHeight - 130)}px` }}
        >
          <p className="search-bar__uni-hint">Elige tu universidad y tu grado y ve solo tus destinos</p>
          <UniversityPicker autoFocus onDone={close} />
        </div>,
        document.body
      )}
    </div>
  );
}
