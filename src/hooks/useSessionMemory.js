import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

// ─────────────────────────────────────────────────────────────────────────────
// Tu selección se mantiene mientras usas la web (sessionStorage: dura lo que
// la pestaña). Todo con la clave «mabroad:sesion:<nombre>»; lo explica
// /privacidad. El primer render es SIEMPRE el de por defecto (igual que el
// HTML prerenderizado) y lo guardado se aplica justo después.
//
//  · useSessionUrlParams: parámetros de la URL de una página (destinos del
//    comparador, filtros del listado, resultado de City Match). Si entras sin
//    ellos, se recuperan los de la última vez; si los cambias (o los quitas),
//    se guarda tal cual. Si la URL ya trae alguno, manda la URL.
//  · useSessionState: un estado cualquiera (filtros del mapa, beca).
//  · rememberViewedCity / readViewedCities: últimos destinos vistos.
// ─────────────────────────────────────────────────────────────────────────────

const PREFIX = "mabroad:sesion:";

export function readSession(name, fallback = null) {
  try {
    const raw = sessionStorage.getItem(PREFIX + name);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeSession(name, value) {
  try {
    sessionStorage.setItem(PREFIX + name, JSON.stringify(value));
  } catch {
    // Sin almacenamiento: no se recuerda, pero todo sigue funcionando.
  }
}

/**
 * @param {string} name     p. ej. "comparar"
 * @param {string[]} keys   parámetros de la URL que se recuerdan
 */
export function useSessionUrlParams(name, keys) {
  const [params, setParams] = useSearchParams();
  const restored = useRef(false);
  const storeName = `url:${name}`;

  // Al entrar: si la URL no trae ninguno, los de la última vez.
  useEffect(() => {
    const saved = readSession(storeName);
    const hasAny = keys.some((k) => params.has(k));
    if (!hasAny && saved && Object.keys(saved).length) {
      setParams((prev) => {
        const next = new URLSearchParams(prev);
        for (const [k, v] of Object.entries(saved)) if (keys.includes(k) && v) next.set(k, v);
        return next;
      }, { replace: true });
    }
    restored.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cada cambio (también quitarlos) se guarda.
  const snapshot = keys.map((k) => `${k}=${params.get(k) ?? ""}`).join("&");
  useEffect(() => {
    if (!restored.current) return;
    const value = {};
    for (const k of keys) if (params.get(k)) value[k] = params.get(k);
    writeSession(storeName, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot]);
}

/**
 * useState que dura la sesión (sessionStorage).
 * @template T
 * @returns {[T, (next: T | ((prev: T) => T)) => void]}
 */
export function useSessionState(name, initial) {
  const [value, setValue] = useState(initial);
  const dirty = useRef(false);
  useIsoLayoutEffect(() => {
    const saved = readSession(name);
    if (saved != null) setValue(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  useEffect(() => {
    if (dirty.current) writeSession(name, value);
  }, [name, value]);
  const set = useCallback((next) => {
    dirty.current = true;
    setValue(next);
  }, []);
  return [value, set];
}

const VIEWED = "vistos";
const VIEWED_MAX = 8;

/** Apunta una ficha vista (la más reciente primero, sin repetir). */
export function rememberViewedCity(slug) {
  const list = readSession(VIEWED, []).filter((s) => s !== slug);
  writeSession(VIEWED, [slug, ...list].slice(0, VIEWED_MAX));
}

/** Últimas fichas vistas en la sesión (solo en efectos o eventos). */
export function readViewedCities() {
  const list = readSession(VIEWED, []);
  return Array.isArray(list) ? list : [];
}

/** Destinos del comparador guardados en la sesión (para el enlace del chip). */
export function readSessionCompareCities() {
  const saved = readSession("url:comparar", {});
  return String(saved?.cities ?? "").split(",").filter(Boolean);
}
