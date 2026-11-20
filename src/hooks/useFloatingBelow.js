import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Posición de un panel flotante (sugerencias del buscador, desplegable
// «Tu uni y grado») que se pinta en un portal en <body>, fuera del hero (que
// recorta lo que se sale y queda tapado por la sección siguiente).
//
// Devuelve { top, left, width, maxHeight } en coordenadas de la ventana
// (position: fixed) bajo el elemento `anchorRef`, recalculadas al hacer scroll,
// al cambiar el tamaño y con el visualViewport (teclado del móvil, zoom). Nunca
// invade la cabecera fija (64 px) ni se sale por abajo. Solo con `open`.
// ─────────────────────────────────────────────────────────────────────────────

const HEADER = 64 + 8;

export function useFloatingBelow(anchorRef, open, { gap = 8, minHeight = 160 } = {}) {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    if (!open) {
      setPos(null);
      return undefined;
    }
    const place = () => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vv = window.visualViewport;
      const viewTop = vv?.offsetTop ?? 0;
      const viewHeight = vv?.height ?? window.innerHeight;
      const maxBottom = viewTop + viewHeight - 12;
      const minTop = viewTop + HEADER;
      // El mínimo nunca puede ser mayor que lo que cabe bajo la cabecera: con
      // poca altura (teclado abierto) el panel se encoge, sin invadirla.
      const min = Math.min(minHeight, Math.max(0, maxBottom - minTop));
      const top = Math.max(Math.min(r.bottom + gap, maxBottom - min), minTop);
      setPos({ top, left: r.left, width: r.width, maxHeight: Math.max(min, maxBottom - top) });
    };
    place();
    const vv = window.visualViewport;
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    vv?.addEventListener("resize", place);
    vv?.addEventListener("scroll", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
      vv?.removeEventListener("resize", place);
      vv?.removeEventListener("scroll", place);
    };
  }, [anchorRef, open, gap, minHeight]);

  return pos;
}
