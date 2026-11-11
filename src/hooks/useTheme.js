import { useEffect, useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "tmate-theme";
const isBrowser = typeof window !== "undefined";
// Mismos valores que los <meta name="theme-color"> de index.html.
const THEME_COLOR = { light: "#2F5073", dark: "#0F1E2D" };

function getStoredTheme() {
  if (!isBrowser) return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function getSystemTheme() {
  if (!isBrowser || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// ─── Store: el tema vive en <html data-theme> ────────────────────────────────
// Lo fija el script inline de index.html antes del primer paint. Todos los
// interruptores (navbar y menú) leen y escriben ese mismo atributo, así que
// siempre están de acuerdo.
const listeners = new Set();

function readTheme() {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return getStoredTheme() ?? getSystemTheme();
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  // Color de la barra del navegador móvil: sigue al tema ELEGIDO en la web
  // (index.html trae dos <meta theme-color> según el tema del sistema; aquí
  // se igualan los dos para que mande el interruptor manual).
  const color = THEME_COLOR[theme];
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", color));
  listeners.forEach((fn) => fn());
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// El HTML prerenderizado se genera sin saber el tema del visitante: se pinta
// como "light". Al hidratar, React usa este mismo valor y justo después pasa
// al tema real (useSyncExternalStore), sin descuadrar la hidratación.
const getServerTheme = () => "light";

/**
 * useTheme
 * Tema claro/oscuro con persistencia en localStorage y, si el usuario no ha
 * elegido nunca manualmente, sincronización en vivo con prefers-color-scheme.
 * El <html data-theme="..."> ya lo fija un script inline en index.html antes
 * del primer paint (evita el parpadeo); este hook solo mantiene React al día.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerTheme);

  useEffect(() => {
    // Igualar las <meta theme-color> al tema actual al montar.
    applyTheme(readTheme());
    if (!window.matchMedia || getStoredTheme() !== null) return undefined;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      if (getStoredTheme() === null) applyTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((next) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(readTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
