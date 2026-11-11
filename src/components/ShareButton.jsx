import { useEffect, useRef, useState } from "react";
import { IconCompartir } from "./icons";

/**
 * Comparte la URL de la página (o `path`): con el menú nativo del sistema
 * si existe (móvil, Chrome/Edge en Windows, Safari) y, si no, copiando el
 * enlace al portapapeles con un aviso «Enlace copiado». Si tampoco se puede
 * copiar, enseña el enlace seleccionable para copiarlo a mano.
 * @param {{
 *   path?: string,       // ruta a compartir; por defecto, la URL actual
 *   title: string,       // título para el menú nativo
 *   text?: string,       // texto que acompaña al enlace
 *   className?: string,
 *   iconSize?: number,
 *   children?: import('react').ReactNode,
 * }} props
 */
export default function ShareButton({ path, title, text, className = "", iconSize = 20, children = "Compartir" }) {
  const [status, setStatus] = useState(null); // null | "copied" | { failedUrl }
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function onClick() {
    const url = new URL(path ?? `${window.location.pathname}${window.location.search}`, window.location.origin).href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        if (err?.name === "AbortError") return; // lo cerró el usuario
        // Cualquier otro fallo (p. ej. sin permiso): se copia el enlace.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus(null), 2500);
    } catch {
      setStatus({ failedUrl: url });
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={onClick}>
        <IconCompartir size={iconSize} />
        <span>{status === "copied" ? "Enlace copiado" : children}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {status === "copied" ? "Enlace copiado al portapapeles" : ""}
      </span>
      {status?.failedUrl && (
        <label className="share-fallback">
          <span>Copia este enlace:</span>
          <input type="text" readOnly value={status.failedUrl} onFocus={(e) => e.currentTarget.select()} autoFocus />
        </label>
      )}
    </>
  );
}
