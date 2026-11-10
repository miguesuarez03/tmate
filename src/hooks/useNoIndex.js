import { useEffect } from "react";

const DEFAULT_ROBOTS = "index, follow";

function setRobots(content) {
  let el = document.querySelector('meta[name="robots"]');
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "robots");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Marca la vista como no indexable (noindex, follow) y quita el canonical
 * mientras esté montada; al desmontarla lo deja todo como estaba.
 * En el HTML prerenderizado ya viene así de serie (ver `noindex` en
 * STATIC_PAGE_META / renderNotFound de entry-server.jsx); esto cubre la
 * navegación dentro de la SPA, donde el <head> es el de la página anterior.
 * Llamarlo DESPUÉS de useSEO (que fija el canonical).
 */
export function useNoIndex() {
  useEffect(() => {
    setRobots("noindex, follow");
    const canonical = document.querySelector('link[rel="canonical"]');
    const canonicalHref = canonical?.getAttribute("href");
    canonical?.remove();
    return () => {
      setRobots(DEFAULT_ROBOTS);
      if (canonical && canonicalHref) {
        canonical.setAttribute("href", canonicalHref);
        document.head.appendChild(canonical);
      }
    };
  }, []);
}
