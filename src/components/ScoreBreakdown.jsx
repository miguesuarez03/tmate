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
 * al pulsarlo (clic, toque o Intro/Espacio), abre las barras de las 8 subnotas
 * con su peso (src/lib/scoring.js). Pasar el ratón no lo abre. Se cierra al
 * pulsar fuera, con Esc (el foco vuelve a la nota) o con la ✕. Se usa en la
 * ficha y en el comparador.
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
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
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
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
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

  // Al abrir, el foco pasa al panel (que va al final de body, en un portal):
  // así Tab llega a la ✕ sin recorrer toda la página.
  useEffect(() => {
    if (open) panelRef.current?.focus({ preventScroll: true });
  }, [open]);

  if (!data) return children;

  const close = () => { setOpen(false); triggerRef.current?.focus(); };
  // Salir del panel con Tab (adelante desde la ✕ o atrás desde el panel) lo
  // cierra y devuelve el foco a la nota, en su sitio de la página.
  const onPanelKeyDown = (e) => {
    if (e.key !== "Tab") return;
    const leavingForward = !e.shiftKey && e.target.closest?.(`.${styles.close}`);
    const leavingBack = e.shiftKey && e.target === panelRef.current;
    if (leavingForward || leavingBack) { e.preventDefault(); close(); }
  };
  const pendingLabels = data.rows.filter((r) => r.score == null).map((r) => r.label.toLowerCase());

  const panel = (
    <div
      ref={panelRef}
      id={panelId}
      className={`${styles.panel} ${pos ? "" : styles.sheet}`}
      style={pos ? { left: pos.left, width: pos.width, top: pos.top, bottom: pos.bottom, maxHeight: pos.maxHeight } : undefined}
      role="group"
      tabIndex={-1}
      onKeyDown={onPanelKeyDown}
      aria-label={`Desglose de la nota${cityName ? ` de ${cityName}` : ""}`}
    >
      <div className={styles.head}>
        <p className={styles.title}>Cómo sale la nota{cityName ? ` de ${cityName}` : ""}</p>
        <button type="button" className={styles.close} onClick={close} aria-label="Cerrar el desglose">
          <span aria-hidden="true">✕</span>
        </button>
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
          <strong>Nota provisional:</strong> aún no tenemos un dato fiable de {pendingLabels.join(" ni de ")}, así que la nota sale del resto de subnotas y la ciudad no entra en los rankings hasta tenerlo.
        </p>
      )}
      {data.extras.length > 0 && (
        <>
          <p className={styles.extraTitle}>No cuenta en la nota</p>
          <ul className={styles.rows}>
            {data.extras.map((r) => {
              const Icon = getSubscoreIcon(r.id);
              return (
                <li key={r.id} className={styles.row}>
                  <span className={styles.rowIcon} aria-hidden="true"><Icon size={18} /></span>
                  <span className={styles.rowLabel}>{r.label}</span>
                  <span className={styles.rowScore}>{r.score == null ? "Sin dato" : fmt(r.score)}</span>
                  <span className={styles.bar} aria-hidden="true">
                    {r.score != null && <span style={{ width: `${r.score * 10}%`, background: "var(--color-slate-light)" }} />}
                  </span>
                  {detail?.[r.id] && <span className={styles.rowDetail}>{detail[r.id]}</span>}
                </li>
              );
            })}
          </ul>
        </>
      )}
      <p className={styles.foot}>Criterio y fuentes de cada subnota en «Cómo calculamos estos datos».</p>
    </div>
  );

  return (
    <span ref={rootRef} className={`${styles.root} ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={`Nota ${data.overall != null ? fmt(data.overall) : "pendiente"} sobre 10${cityName ? ` de ${cityName}` : ""}${data.provisional ? " (provisional)" : ""}. Ver desglose`}
        onClick={() => setOpen((o) => !o)}
      >
        {children}
        {data.provisional && <span className={styles.provisionalDot} aria-hidden="true" />}
      </button>
      {open && createPortal(panel, document.body)}
    </span>
  );
}
