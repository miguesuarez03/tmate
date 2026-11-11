// ─────────────────────────────────────────────────────────────────────────────
// ¿Estamos en el PRIMER render del cliente sobre una página prerenderizada?
//
// En producción cada ruta llega como HTML ya pintado (scripts/prerender.mjs) y
// después React lo vuelve a montar. Lo que el usuario ya está viendo no debe
// "reiniciarse" en ese momento (p. ej. el contador de destinos del hero, que
// si no pasaría de 150 a 0 y vuelta a contar). En navegaciones posteriores
// dentro de la SPA, o en `vite dev` (sin HTML previo), devuelve false.
//
// Se evalúa al importar el módulo, antes de que React toque #root; App.jsx
// llama a markFirstRenderDone() tras el primer render.
// ─────────────────────────────────────────────────────────────────────────────
let prerenderedFirstRender =
  typeof document !== "undefined" && Boolean(document.getElementById("root")?.firstElementChild);

export function isPrerenderedFirstRender() {
  return prerenderedFirstRender;
}

export function markFirstRenderDone() {
  prerenderedFirstRender = false;
}
