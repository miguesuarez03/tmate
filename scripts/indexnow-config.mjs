// ─────────────────────────────────────────────────────────────────────────────
// Configuración de IndexNow (https://www.indexnow.org/documentation).
//
// La clave es PÚBLICA por diseño: demuestra que el dominio es nuestro porque
// está servida en la raíz como /<clave>.txt (public/<clave>.txt, UTF-8, solo la
// clave). No es un secreto. Si la cambias, renombra también ese fichero.
//
// Flujo (ver scripts/prerender.mjs e scripts/indexnow-notify.mjs):
//  1. Build (prerender): calcula un hash del contenido de cada URL indexable y
//     lo compara con el manifiesto que sirve AHORA producción. Publica en el
//     propio deploy dist/indexnow-manifest.json (hashes) y
//     dist/indexnow-changed.json (URLs nuevas, cambiadas o borradas). Nunca
//     rompe el build si falla la red.
//  2. Tras un deploy de PRODUCCIÓN correcto, Vercel manda a GitHub el evento
//     repository_dispatch «vercel.deployment.success»
//     (https://vercel.com/docs/git/vercel-for-github#repository-dispatch-events)
//     y .github/workflows/indexnow.yml ejecuta indexnow-notify.mjs, que espera
//     a que el dominio canónico sirva ESTE commit, comprueba que la clave está
//     publicada y solo entonces avisa a Bing con las URLs cambiadas.
// ─────────────────────────────────────────────────────────────────────────────

export const INDEXNOW_KEY = "97dcf0c6f1279b7ef1bb6330c0f5e05b";

// Bing (comparte los avisos con el resto de buscadores de IndexNow).
export const INDEXNOW_ENDPOINT = "https://www.bing.com/indexnow";

export const MANIFEST_FILE = "indexnow-manifest.json";
export const CHANGED_FILE = "indexnow-changed.json";

// Límite de la API: 10.000 URLs por petición.
export const MAX_URLS_PER_REQUEST = 10000;
