import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { IconUniversidad } from "../icons";
import { useUniversity } from "../../hooks/useUniversity";
import { useFloatingBelow } from "../../hooks/useFloatingBelow";
import { getDegreeShortName } from "../../lib/universities";
import UniversityPicker from "./UniversityPicker";
import UniversitySheet, { isMobileViewport } from "./UniversitySheet";

/**
 * Segmento «Tu uni y grado» dentro del buscador de destinos de la home
 * (SearchBar). Sin nada elegido es un botón; con universidad elegida, un chip
 * «Loyola · GITI» con ✕ para quitarla. El enlace del menú (/#mi-universidad)
 * lo abre. Estilos en global.css («search-bar__uni»).
 *  · Escritorio: UniversityPicker en un desplegable bajo la barra, en un
 *    portal (el hero lo recortaría) y con posición fija (useFloatingBelow).
 *  · Móvil (<768 px): hoja a pantalla completa desde abajo (UniversitySheet);
 *    la página no salta ni se mueve.
 * El primer render es siempre el botón (igual que el HTML prerenderizado).
 */
export default function UniversitySearchSegment() {
  const uni = useUniversity();
  const { hash, key: locationKey } = useLocation();
  const [open, setOpen] = useState(null); // null | "panel" | "sheet"
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const anchorRef = useRef(null);
  useEffect(() => {
    anchorRef.current = rootRef.current?.closest(".search-bar") ?? rootRef.current;
  }, []);

  const openIt = () => {
    if (isMobileViewport()) {
      setOpen("sheet");
      return;
    }
    // Escritorio: si debajo del buscador no caben ~320 px, la página sube
    // (bajo la cabecera fija) para que el desplegable se vea entero.
    const r = anchorRef.current?.getBoundingClientRect();
    if (r && window.innerHeight - r.bottom < 320) window.scrollBy({ top: r.top - 76, behavior: "instant" });
    setOpen("panel");
  };

  // Enlace del menú lateral: abre el buscador en cada clic.
  useEffect(() => {
    if (hash !== "#mi-universidad") return;
    if (!isMobileViewport()) rootRef.current?.scrollIntoView({ behavior: "instant", block: "center" });
    openIt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, locationKey]);

  useEffect(() => {
    if (open !== "panel") return undefined;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target) && !panelRef.current?.contains(e.target)) setOpen(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const pos = useFloatingBelow(anchorRef, open === "panel");

  const close = () => {
    setOpen(null);
    requestAnimationFrame(() => buttonRef.current?.focus({ preventScroll: true }));
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
          aria-expanded={Boolean(open)}
          aria-haspopup="dialog"
          title={chosen ? `${uni.entry.name}${uni.degreeName ? ` · ${uni.degreeName}` : ""}` : "Elige tu universidad y tu grado y ve solo tus destinos"}
          onClick={() => (open ? setOpen(null) : openIt())}
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
      {open === "panel" && pos && createPortal(
        <div
          ref={panelRef}
          className="search-bar__uni-panel"
          style={{ top: pos.top, left: pos.left, width: pos.width, maxHeight: pos.maxHeight, "--picker-max": `${Math.max(140, pos.maxHeight - 150)}px` }}
        >
          <p className="search-bar__uni-hint">Elige tu universidad y tu grado y ve solo tus destinos</p>
          <UniversityPicker autoFocus uniId={uni.uniId} onDone={close} />
        </div>,
        document.body
      )}
      {open === "sheet" && <UniversitySheet uniId={uni.uniId} onClose={close} />}
    </div>
  );
}
