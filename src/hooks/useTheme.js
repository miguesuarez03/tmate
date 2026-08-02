import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "tmate-theme";
const isBrowser = typeof window !== "undefined";

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

function getInitialTheme() {
  if (!isBrowser) return "light"; // prerender (Node/SSR): sin acceso a window
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return getStoredTheme() ?? getSystemTheme();
}

/**
 * useTheme
 * Tema claro/oscuro con persistencia en localStorage y, si el usuario no ha
 * elegido nunca manualmente, sincronización en vivo con prefers-color-scheme.
 * El <html data-theme="..."> ya lo fija un script inline en index.html antes
 * del primer paint (evita el parpadeo); este hook solo mantiene React al día.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isBrowser || !window.matchMedia || getStoredTheme() !== null) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setThemeState(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
