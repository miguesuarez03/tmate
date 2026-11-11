// ─────────────────────────────────────────────────────────────────────────────
// Cargas en curso que bloquean una navegación (chunk de una página, ficha de
// una ciudad). Al navegar, React Router usa startTransition: la página
// anterior se queda a la vista hasta que la nueva está lista, en vez de un
// fallback en blanco. Este contador permite enseñar mientras tanto la barra
// fina de RouteLoader (ver NavigationProgress en AppShell.jsx).
// ─────────────────────────────────────────────────────────────────────────────

let pending = 0;
const listeners = new Set();

function emit() {
  listeners.forEach((fn) => fn());
}

/** Cuenta `promise` como carga en curso hasta que se resuelva o falle. */
export function trackLoad(promise) {
  pending++;
  emit();
  const done = () => {
    pending--;
    emit();
  };
  promise.then(done, done);
  return promise;
}

export function subscribePendingLoads(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function hasPendingLoads() {
  return pending > 0;
}
