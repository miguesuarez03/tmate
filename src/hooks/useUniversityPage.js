import { getUniversityEntry } from "../data/universities/registry";
import { loadUniversityPage, getLoadedUniversityPage, getUniversityPageError } from "../lib/universityPages";
import { trackLoad } from "../lib/pendingLoads";

/**
 * Datos de /universidades/<id> (convenios en versión ligera). Como
 * useCityDetail: suspende hasta que llegan (en el prerender y al hidratar ya
 * están cargados), devuelve null si la universidad no existe y, si la carga
 * falla, lanza el error para el ErrorBoundary de las rutas.
 * @param {string} id
 */
export function useUniversityPage(id) {
  if (!getUniversityEntry(id)) return null;
  const loaded = getLoadedUniversityPage(id);
  if (loaded) return loaded;
  const error = getUniversityPageError(id);
  if (error) throw error;
  throw trackOnce(loadUniversityPage(id)).catch(() => {});
}

const tracked = new WeakSet();
function trackOnce(promise) {
  if (!tracked.has(promise)) {
    tracked.add(promise);
    trackLoad(promise);
  }
  return promise;
}
