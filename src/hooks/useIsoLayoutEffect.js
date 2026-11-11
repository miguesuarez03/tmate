import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect en el navegador y useEffect en el prerender (Node), donde
 * no hay layout y React avisaría de que el layout effect no hace nada.
 * Para lo que debe decidirse ANTES de pintar (medir, evitar un parpadeo).
 */
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
