import { useEffect, useLayoutEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Paneles flotantes bajo una barra (sugerencias del buscador de destinos,
// desplegable «Tu uni y grado»), pintados en un portal en <body>, fuera del
// hero (que recorta lo que se sale y queda tapado por la sección siguiente).
//
// useFloatingBelow: { top, left, width } en coordenadas del <body>
// (position: absolute). Así el panel se mueve con la página y queda siempre
// pegado justo debajo de su barra al deslizar, sin ir a saltos detrás del
// scroll. Se recalcula al abrir y al cambiar el tamaño (también el
// visualViewport: teclado del móvil).
//
// useScrollLock: bloquea el scroll de la página mientras `active` (en móvil,
// con un desplegable abierto), también en iOS: <body> fijo en su sitio y de
// vuelta al cerrar. Lo único que se desliza es la lista, si hace falta.
// ─────────────────────────────────────────────────────────────────────────────

export function useFloatingBelow(anchorRef, open, { gap = 8 } = {}) {
  const [pos, setPos] = useState(null);

  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return undefined;
    }
    const place = () => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Relativo al <body>: vale igual con el scroll bloqueado (body fijo).
      const b = document.body.getBoundingClientRect();
      // Altura que cabe a la vista bajo la barra (visualViewport: con el
      // teclado del móvil abierto es menos): el panel se limita a ella y, si
      // no cabe todo, se desliza por dentro.
      const vv = window.visualViewport;
      const visibleBottom = (vv?.offsetTop ?? 0) + (vv?.height ?? window.innerHeight);
      const maxHeight = Math.max(120, visibleBottom - (r.bottom + gap) - 8);
      setPos({ top: r.bottom - b.top + gap, left: r.left - b.left, width: r.width, maxHeight });
    };
    place();
    // Otra vez en el siguiente fotograma: si en móvil se acaba de bloquear el
    // scroll (body fijo), las coordenadas del body cambian.
    const raf = requestAnimationFrame(place);
    const vv = window.visualViewport;
    // Al deslizar, la posición no cambia (va en el documento), pero sí lo que
    // cabe a la vista: se recalcula la altura.
    vv?.addEventListener("scroll", place);
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    vv?.addEventListener("resize", place);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", place);
      vv?.removeEventListener("resize", place);
      vv?.removeEventListener("scroll", place);
      window.removeEventListener("scroll", place);
    };
  }, [anchorRef, open, gap]);

  return pos;
}

let locks = 0;
let saved = null;

export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    const { body } = document;
    if (locks++ === 0) {
      const y = window.scrollY;
      saved = { y, position: body.style.position, top: body.style.top, width: body.style.width };
      body.style.position = "fixed";
      body.style.top = `-${y}px`;
      body.style.width = "100%";
    }
    return () => {
      if (--locks === 0 && saved) {
        const { y, ...prev } = saved;
        Object.assign(body.style, prev);
        window.scrollTo({ top: y, left: 0, behavior: "instant" });
        saved = null;
      }
    };
  }, [active]);
}
