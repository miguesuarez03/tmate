import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getScoreBreakdown, getScoreLevel } from "../lib/cities";
import { getSubscoreIcon } from "../lib/categoryIcons";
import styles from "./ScoreBreakdown.module.css";

const fmt = (n) => n.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const PANEL_W = 380;
const GAP = 10;
const EDGE = 16;
const SHEET_QUERY = "(max-width: 560px)";

// useLayoutEffect avisa en el prerender (renderToString); el panel solo existe
// en el cliente, así que basta con no usarlo en el servidor.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Desglose de la nota MAbroad: envuelve la nota (children) en un botón que,
 * al pasar el ratón, enfocarlo y pulsar o tocarlo, abre las barras de las 8
 * subnotas con su peso (src/lib/scoring.js). Se usa en la ficha y en el
 * comparador.
 *
 * `detail` (opcional, solo en la ficha): una línea por subnota con el dato
 * concreto y su fuente (scoring.detail de la ficha completa).
 * `align`: hacia dónde se abre en escritorio ("center", "start" o "end").
 *
 * El panel va en un portal (document.body) con posición fija junto a la nota,
 * porque la ficha y el comparador recortan su contenido (overflow / backdrop-
 * filter); en móvil sale como hoja fija abajo. Empieza cerrado y no lee nada
 * del navegador al pintar, así que la primera renderización coincide con el
 * HTML prerenderizado.
 */
export default function ScoreBreakdown({ slug, detail = null, align = "center", className = "", children, cityName = "" }) {
  const data = getScoreBreakdown(slug);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null); // null = hoja fija (móvil)
  const hoverOpened = useRef(false);
  const closeTimer = useRef(null);
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const panelId = useId();

  const place = useCallback(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia(SHEET_QUERY).matches) { setPos(null); return; }
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = Math.min(PANEL_W, vw - 2 * EDGE);
    let left = align === "end" ? r.right - w : align === "start" ? r.left : r.left + r.width / 2 - w / 2;
    left = Math.max(EDGE, Math.min(left, vw - w - EDGE));
    const below = vh - r.bottom - GAP - EDGE;
    const above = r.top - GAP - EDGE;
    // Abajo si cabe razonablemente; si no, por el lado con más sitio.
    if (below >= 320 || below >= above) {
      setPos({ left, width: w, top: r.bottom + GAP, maxHeight: Math.max(200, below) });
    } else {
      setPos({ left, width: w, bottom: vh - r.top + GAP, maxHeight: Math.max(200, above) });
    }
  }, [align]);

  useIsoLayoutEffect(() => {
    if (!open) return undefined;
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, { passive: true, capture: true });
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, { capture: true });
    };
  }, [open, place]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e) => {
      if (rootRef.current?.contains(e.target) || panelRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  if (!data) return children;

  const canHover = () => window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
  // Al pasar el ratón de la nota al panel (que está en otro sitio del DOM)
  // hay un instante fuera de los dos: se cierra con un pequeño margen.
  const hoverIn = () => {
    clearTimeout(closeTimer.current);
    if (canHover() && !open) { hoverOpened.current = true; setOpen(true); }
  };
  const hoverOut = () => {
    if (!hoverOpened.current) return;
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => { hoverOpened.current = false; setOpen(false); }, 160);
  };

  const pendingLabels = data.rows.filter((r) => r.score == null).map((r) => r.label.toLowerCase());

  const panel = (
    <div
      ref={panelRef}
      id={panelId}
      className={`${styles.panel} ${pos ? "" : styles.sheet}`}
      style={pos ? { left: pos.left, width: pos.width, top: pos.top, bottom: pos.bottom, maxHeight: pos.maxHeight } : undefined}
      role="group"
      aria-label={`Desglose de la nota${cityName ? ` de ${cityName}` : ""}`}
      onMouseEnter={() => clearTimeout(closeTimer.current)}
      onMouseLeave={hoverOut}
    >
      <div className={styles.head}>
        <p className={styles.title}>Cómo sale la nota{cityName ? ` de ${cityName}` : ""}</p>
        <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Cerrar el desglose">✕</button>
      </div>
      <p className={styles.lead}>Media ponderada de 8 subnotas de 0 a 10, siempre con los mismos pesos.</p>
      <ul className={styles.rows}>
        {data.rows.map((r) => {
          const Icon = getSubscoreIcon(r.id);
          const pending = r.score == null;
          return (
            <li key={r.id} className={styles.row}>
              <span className={styles.rowIcon} aria-hidden="true"><Icon size={18} /></span>
              <span className={styles.rowLabel}>
                {r.label}
                <span className={styles.rowWeight}> · {r.weight} %</span>
                {r.kind === "valoracion" && <span className={styles.rowKind}>valoración MAbroad</span>}
              </span>
              <span className={styles.rowScore}>{pending ? "Pendiente" : fmt(r.score)}</span>
              <span className={styles.bar} aria-hidden="true">
                {!pending && <span style={{ width: `${r.score * 10}%`, background: getScoreLevel(r.score).color }} />}
              </span>
              {detail?.[r.id] && <span className={styles.rowDetail}>{detail[r.id]}</span>}
            </li>
          );
        })}
      </ul>
      {data.provisional && (
        <p className={styles.note}>
          <strong>Nota provisional:</strong> aún no tenemos un dato fiable de {pendingLabels.join(" ni de ")}, así que la nota sale del resto de subnotas.
        </p>
      )}
      <p className={styles.foot}>Criterio y fuentes de cada subnota en «Cómo calculamos estos datos».</p>
    </div>
  );

  return (
    <span ref={rootRef} className={`${styles.root} ${className}`} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={`Nota ${data.overall != null ? fmt(data.overall) : "pendiente"} sobre 10${cityName ? ` de ${cityName}` : ""}${data.provisional ? " (provisional)" : ""}. Ver desglose`}
        onClick={() => {
          clearTimeout(closeTimer.current);
          // Abierto al pasar el ratón: el clic lo deja fijo en vez de cerrarlo.
          if (hoverOpened.current) { hoverOpened.current = false; return; }
          setOpen((o) => !o);
        }}
      >
        {children}
        {data.provisional && <span className={styles.provisionalDot} aria-hidden="true" />}
      </button>
      {open && createPortal(panel, document.body)}
    </span>
  );
}
