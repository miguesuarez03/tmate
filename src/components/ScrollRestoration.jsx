import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * ScrollRestoration
 *
 * React Router (BrowserRouter) no restaura el scroll por defecto al navegar
 * con el botón "atrás" del navegador — cada cambio de ruta se queda en la
 * posición de scroll donde estaba la página anterior, o en 0 si el componente
 * fuerza window.scrollTo(0,0) en un useEffect (como hacía CityDetailPage).
 *
 * Este componente implementa el comportamiento esperado:
 * - Navegación tipo "PUSH" (click en un link/botón) → sube arriba del todo.
 * - Navegación tipo "POP" (atrás/adelante del navegador) → restaura el
 *   scroll exacto que tenía esa página la última vez que se visitó.
 *
 * Se guarda un mapa en memoria (sessionStorage) de key de historial → scrollY,
 * que es el mismo enfoque que usa <ScrollRestoration /> de React Router (Data
 * Router) pero adaptado para funcionar también con <BrowserRouter /> clásico.
 */

const STORAGE_KEY = "tmate:scroll-positions";

function readPositions() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writePositions(positions) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // sessionStorage puede no estar disponible (modo privado, cuotas, etc.)
    // En ese caso simplemente no persistimos — no es un error crítico.
  }
}

export default function ScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType(); // "POP" | "PUSH" | "REPLACE"
  const positionsRef = useRef(readPositions());

  // Clave estable por entrada de historial: pathname+search (sin hash),
  // así cada "ciudad" o "filtro" en la URL tiene su propia posición guardada.
  const key = location.pathname + location.search;

  // Guardamos el scroll de la página ANTERIOR justo antes de pintar la nueva,
  // usando beforeunload-like timing vía el evento popstate/click es complejo;
  // en vez de eso, persistimos continuamente con throttling ligero mientras
  // el usuario scrollea, así siempre hay un valor fresco guardado.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        positionsRef.current[key] = window.scrollY;
        writePositions(positionsRef.current);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [key]);

  // Al cambiar de ruta: restaurar si es navegación "atrás/adelante",
  // o subir arriba si es una navegación nueva (clic en un enlace).
  useLayoutEffect(() => {
    if (navigationType === "POP") {
      const saved = positionsRef.current[key];
      if (typeof saved === "number") {
        // Esperamos al siguiente frame para que el DOM de la página ya
        // montada tenga su altura real (imágenes, listas, etc.)
        requestAnimationFrame(() => {
          window.scrollTo({ top: saved, left: 0, behavior: "instant" in window ? "instant" : "auto" });
        });
        return;
      }
    }
    // PUSH / REPLACE / sin posición guardada → empezamos arriba
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return null;
}
