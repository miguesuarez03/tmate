import { useEffect, useState } from "react";

/**
 * ¿Pantalla de móvil (<768 px)? false en el primer render (igual que el HTML
 * prerenderizado) y el valor real tras montar; se actualiza al girar o
 * redimensionar. Para lo que solo se pinta tras una interacción (desplegables).
 */
export function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

/** Sugerencias como máximo en los desplegables: 3 en móvil, 5 en escritorio. */
export const MAX_SUGGESTIONS = { mobile: 3, desktop: 5 };
