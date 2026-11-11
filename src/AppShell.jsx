import { Suspense, createElement, useEffect, useState, useSyncExternalStore } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollRestoration from "./components/ScrollRestoration";
import RouteLoader from "./components/RouteLoader";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import { ROUTES } from "./routes";
import { subscribePendingLoads, hasPendingLoads } from "./lib/pendingLoads";

// ─────────────────────────────────────────────────────────────────────────────
// Estructura común de TODAS las páginas, igual en el cliente (App.jsx, con
// páginas lazy) y en el prerender (entry-server.jsx, con páginas importadas
// directamente). Que sea el mismo árbol es lo que permite hidratar el HTML
// prerenderizado en vez de borrarlo y volver a pintarlo.
// ─────────────────────────────────────────────────────────────────────────────

// «Saltar al contenido»: lleva el foco al <main> de la página o, si no lo
// tiene, a su <h1> — así el teclado no recorre el menú entero en cada página.
function skipToContent(e) {
  e.preventDefault();
  const target = document.querySelector("main") || document.querySelector("h1");
  if (!target) return;
  target.setAttribute("tabindex", "-1");
  target.setAttribute("data-skip-target", "");
  target.focus();
}

/**
 * Barra fina de carga mientras se descarga la página o la ficha de ciudad a
 * la que se navega (la anterior sigue a la vista: ver lib/pendingLoads.js).
 * Solo aparece si tarda más de 150 ms, para no parpadear con buena conexión.
 */
function NavigationProgress() {
  const pending = useSyncExternalStore(subscribePendingLoads, hasPendingLoads, () => false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!pending) {
      setVisible(false);
      return undefined;
    }
    const id = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(id);
  }, [pending]);
  return visible ? <RouteLoader /> : null;
}

/** @param {{ pages: Record<string, import('react').ComponentType> }} props */
function AppRoutes({ pages }) {
  return (
    <Routes>
      {ROUTES.map((r) => (
        <Route
          key={r.path}
          path={r.path}
          element={r.redirect ? <Navigate to={r.redirect} replace /> : createElement(pages[r.page])}
        />
      ))}
    </Routes>
  );
}

/** @param {{ pages: Record<string, import('react').ComponentType> }} props */
export default function AppShell({ pages }) {
  const { pathname } = useLocation();
  return (
    <>
      <a className="skip-link" href="#contenido" onClick={skipToContent}>Saltar al contenido</a>
      <ScrollRestoration />
      <NavigationProgress />
      <RouteErrorBoundary resetKey={pathname}>
        {/* Solo se ve si una página se pinta sin transición (p. ej. la
            primera carga sin HTML prerenderizado, en `vite dev`). */}
        <Suspense fallback={<RouteLoader />}>
          <AppRoutes pages={pages} />
        </Suspense>
      </RouteErrorBoundary>
    </>
  );
}
