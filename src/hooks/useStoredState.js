import { useCallback, useEffect, useRef, useState } from "react";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";

/**
 * useState que se guarda en localStorage (JSON) y se recupera al volver.
 *
 * El primer render usa SIEMPRE `initial`, igual que el HTML prerenderizado
 * (en el servidor no hay localStorage): así la página se puede hidratar sin
 * desajustes. Lo guardado se aplica justo después, antes de pintar (layout
 * effect). Solo se escribe cuando el usuario cambia algo, nunca para guardar
 * los valores por defecto encima de lo que había.
 * Sin almacenamiento (modo privado estricto) funciona igual, sin recordar.
 * @template T
 * @param {string} key
 * @param {T} initial
 * @param {(saved: any) => T} [revive]  adapta lo guardado (p. ej. mezclarlo con valores por defecto)
 * @returns {[T, (next: T | ((prev: T) => T)) => void]}
 */
export function useStoredState(key, initial, revive = (saved) => saved) {
  const [value, setValue] = useState(initial);
  const dirty = useRef(false);

  useIsoLayoutEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setValue(revive(JSON.parse(raw)));
    } catch {
      // JSON roto o sin almacenamiento: se queda con los valores por defecto.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!dirty.current) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Sin almacenamiento: no se recuerda, pero todo sigue funcionando.
    }
  }, [key, value]);

  const set = useCallback((next) => {
    dirty.current = true;
    setValue(next);
  }, []);

  return [value, set];
}
