import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { IconUniversidad } from "../icons";
import { useUniversity } from "../../hooks/useUniversity";
import { useFloatingBelow, useScrollLock } from "../../hooks/useFloatingBelow";
import { useIsMobile, MAX_SUGGESTIONS } from "../../hooks/useIsMobile";
import { getDegreeShortName } from "../../lib/universities";
import UniversityPicker from "./UniversityPicker";

/**
 * Segmento «Tu uni y grado» dentro del buscador de destinos de la home
 * (SearchBar). Sin nada elegido es un botón; con universidad elegida, un chip
 * «Loyola · GITI» con ✕ para quitarla. El enlace del menú (/#mi-universidad)
 * lo abre. Estilos en global.css («search-bar__uni»).
 *
 * Funciona EXACTAMENTE como las sugerencias del buscador de destinos, en
 * móvil y escritorio: desplegable justo debajo de la barra (mismo contenedor
 * search-bar__dropdown y misma lista), en un portal, pegado a la barra al
 * deslizar y, en móvil, con la página quieta mientras está abierto.
 * El primer render es siempre el botón (igual que el HTML prerenderizado).
 */
export default function UniversitySearchSegment() {
  const uni = useUniversity();
  const { hash, key: locationKey } = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const anchorRef = useRef(null);
  const mobile = useIsMobile();
  useEffect(() => {
    anchorRef.current = rootRef.current?.closest(".search-bar") ?? rootRef.current;
  }, []);

  // Enlace del menú lateral: baja hasta el buscador y lo abre, en cada clic.
  useEffect(() => {
    if (hash !== "#mi-universidad") return;
    rootRef.current?.scrollIntoView({ behavior: "instant", block: "center" });
    setOpen(true);
  }, [hash, locationKey]);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target) && !panelRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const pos = useFloatingBelow(anchorRef, open);
  // Móvil: si el desplegable no cabe bajo la barra, la página sube con
  // suavidad hasta dejar la barra bajo la cabecera; cuando termina, se
  // bloquea el scroll (y si cabe, se bloquea ya, sin moverse nada).
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!open || !mobile) {
      setSettled(false);
      return undefined;
    }
    const r = anchorRef.current?.getBoundingClientRect();
    const need = 330; // campo + «Todos los grados» + 3 sugerencias
    const vh = window.visualViewport?.height ?? window.innerHeight;
    if (!r || vh - r.bottom >= need) {
      setSettled(true);
      return undefined;
    }
    window.scrollTo({ top: window.scrollY + r.top - 76, behavior: "smooth" });
    // Se bloquea cuando la subida termina (scrollend); si el navegador no lo
    // avisa, como mucho a los 600 ms.
    const done = () => setSettled(true);
    window.addEventListener("scrollend", done, { once: true });
    const t = setTimeout(done, 600);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scrollend", done);
    };
  }, [open, mobile]);
  useScrollLock(open && mobile && settled);
  // Mientras está abierto, fuera los botones flotantes (taparían la lista).
  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add("uni-picker-open");
    return () => document.body.classList.remove("uni-picker-open");
  }, [open]);
  // En escritorio, si el desplegable no cabe por abajo, la página baja lo
  // justo («nearest»: sin saltos si ya se ve entero). En móvil, la página
  // no se mueve.
  useEffect(() => {
    if (open && pos && !mobile) panelRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [open, pos, mobile]);

  const close = () => {
    setOpen(false);
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
        <div ref={panelRef} className="search-bar__dropdown search-bar__uni-panel" style={{ top: pos.top, left: pos.left, width: pos.width, maxHeight: pos.maxHeight }}>
          <UniversityPicker
            autoFocus
            uniId={uni.uniId}
            max={mobile ? MAX_SUGGESTIONS.mobile : MAX_SUGGESTIONS.desktop}
            onDone={close}
          />
        </div>,
        document.body
      )}
    </div>
  );
}
