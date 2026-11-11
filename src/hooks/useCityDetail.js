import { useEffect, useState } from "react";
import { loadCityDetail, getLoadedCityDetail, getCityDetailError, getCityBySlug } from "../lib/cities";
import { trackLoad } from "../lib/pendingLoads";

/** @typedef {import('../types').CityDetail} CityDetail */

/**
 * Ficha completa de una ciudad para pintar su página. Se integra con
 * <Suspense>: si aún no ha llegado, suspende el render hasta que llegue (al
 * navegar, la página anterior se queda a la vista mientras tanto; en el
 * prerender y al hidratar ya está cargada, así que no suspende). Devuelve
 * null si el slug no existe. Si la carga falla, lanza el error para que lo
 * recoja el ErrorBoundary de las rutas.
 * @param {string} slug
 * @returns {CityDetail | null}
 */
export function useCityDetail(slug) {
  if (!getCityBySlug(slug)) return null;
  const loaded = getLoadedCityDetail(slug);
  if (loaded) return loaded;
  const error = getCityDetailError(slug);
  if (error) throw error;
  throw trackOnce(loadCityDetail(slug)).catch(() => {}); // reintenta el render al terminar
}

// Al navegar de una ciudad a otra, la página anterior sigue a la vista
// mientras llega la ficha nueva: se cuenta como carga en curso para que
// salga la barra de NavigationProgress. Una vez por descarga, aunque el
// render suspenda varias veces.
const tracked = new WeakSet();
function trackOnce(promise) {
  if (!tracked.has(promise)) {
    tracked.add(promise);
    trackLoad(promise);
  }
  return promise;
}

/**
 * Fichas completas de varias ciudades SIN suspender: devuelve las que ya
 * están cargadas ({ [slug]: CityDetail }) y pide el resto; al llegar, vuelve
 * a pintar. Para detalles secundarios (listas del comparador, desglose del
 * coste en Beca) que no deben bloquear la página.
 * @param {string[]} slugs
 * @returns {Record<string, CityDetail>}
 */
export function useCityDetails(slugs) {
  const [, setVersion] = useState(0);
  const key = slugs.join(",");

  useEffect(() => {
    let alive = true;
    const missing = slugs.filter((s) => s && !getLoadedCityDetail(s));
    if (missing.length) {
      Promise.allSettled(missing.map(loadCityDetail)).then(() => {
        if (alive) setVersion((v) => v + 1);
      });
    }
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const out = {};
  for (const s of slugs) {
    const d = s && getLoadedCityDetail(s);
    if (d) out[s] = d;
  }
  return out;
}
