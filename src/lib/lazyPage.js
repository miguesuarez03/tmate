import { createElement, lazy } from "react";
import { trackLoad } from "./pendingLoads";

/**
 * Página con code-splitting que además se puede PRECARGAR (Page.preload()).
 *
 * Con React.lazy a secas, el primer render siempre suspende aunque el chunk
 * ya esté descargado: al hidratar, React dejaría esa parte sin hidratar hasta
 * el siguiente tick. Aquí, una vez cargado el módulo, se pinta el componente
 * real de forma síncrona: main.jsx llama a preload() de la ruta actual antes
 * de hydrateRoot y la hidratación se hace de una vez. Si aún no está
 * cargado (navegación a una página nueva), se comporta como React.lazy.
 * @param {() => Promise<{ default: import('react').ComponentType<any> }>} load
 */
export function lazyPage(load) {
  let Loaded = null;
  let promise = null;
  const preload = () => {
    promise ??= trackLoad(
      load().then((mod) => {
        Loaded = mod.default;
        return mod;
      }, (err) => {
        promise = null; // un fallo de red no se queda cacheado
        throw err;
      })
    );
    return promise;
  };
  const Lazy = lazy(preload);
  function Page(props) {
    return createElement(Loaded ?? Lazy, props);
  }
  Page.preload = preload;
  return Page;
}
