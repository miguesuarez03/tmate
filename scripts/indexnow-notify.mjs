// ─────────────────────────────────────────────────────────────────────────────
// scripts/indexnow-notify.mjs — avisa a Bing (IndexNow) de las URLs cambiadas
// en el último deploy de PRODUCCIÓN. Lo lanza .github/workflows/indexnow.yml
// tras el evento «vercel.deployment.success» (ver indexnow-config.mjs).
//
// No afecta al build ni al deploy (corre después, en GitHub Actions). Si el
// aviso no se puede completar, el job termina en ERROR (exit 1) para que se
// vea en Actions y se pueda relanzar con «Re-run jobs»: la lista de URLs
// sigue publicada en el deploy. Pasos:
//  1. Solo si DEPLOY_ENVIRONMENT === "production" (nunca previews).
//  2. Espera a que el dominio canónico (SITE_URL) sirva indexnow-changed.json
//     de ESTE commit (EXPECTED_SHA): así se avisa cuando las páginas nuevas ya
//     están en www.mabroad.com, no en la URL del deploy.
//  3. Comprueba que /<clave>.txt está publicada y contiene la clave.
//  4. POST JSON a Bing con host, key, keyLocation y urlList (solo URLs del
//     dominio canónico), en lotes de 10.000. 200/202 = correcto; errores de
//     red, 5xx y 429 se reintentan (429 respetando Retry-After); 400/403/422
//     no se reintentan (son de formato/clave) y dejan el job en error.
//
// Uso local de prueba (no envía nada sin DEPLOY_ENVIRONMENT=production):
//   node scripts/indexnow-notify.mjs
// ─────────────────────────────────────────────────────────────────────────────

import { INDEXNOW_KEY, INDEXNOW_ENDPOINT, CHANGED_FILE, MAX_URLS_PER_REQUEST } from "./indexnow-config.mjs";

// Mismo dominio canónico que src/lib/seo.js (SITE_URL).
const SITE_URL = "https://www.mabroad.com";
const HOST = new URL(SITE_URL).host;
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

const ENVIRONMENT = process.env.DEPLOY_ENVIRONMENT || "";
const EXPECTED_SHA = process.env.EXPECTED_SHA || "";
const WAIT_ATTEMPTS = Number(process.env.INDEXNOW_WAIT_ATTEMPTS || 20);
const WAIT_MS = Number(process.env.INDEXNOW_WAIT_MS || 15000);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// En GitHub Actions, ::warning:: aparece como anotación en el resumen.
const warn = (msg) => console.log(process.env.GITHUB_ACTIONS ? `::warning::${msg}` : `⚠ ${msg}`);

async function fetchNoCache(url) {
  const sep = url.includes("?") ? "&" : "?";
  return fetch(`${url}${sep}t=${Date.now()}`, {
    signal: AbortSignal.timeout(10000),
    headers: { "Cache-Control": "no-cache" },
  });
}

async function waitForDeployedChanges() {
  for (let i = 1; i <= WAIT_ATTEMPTS; i++) {
    try {
      const res = await fetchNoCache(`${SITE_URL}/${CHANGED_FILE}`);
      if (res.ok) {
        const data = await res.json();
        if (!EXPECTED_SHA || data.commit === EXPECTED_SHA) return data;
        console.log(`  (${i}/${WAIT_ATTEMPTS}) ${HOST} aún sirve el commit ${String(data.commit).slice(0, 7)}; esperando…`);
      } else {
        console.log(`  (${i}/${WAIT_ATTEMPTS}) ${CHANGED_FILE} → HTTP ${res.status}; esperando…`);
      }
    } catch (err) {
      console.log(`  (${i}/${WAIT_ATTEMPTS}) error leyendo ${CHANGED_FILE}: ${err.message}`);
    }
    if (i < WAIT_ATTEMPTS) await sleep(WAIT_MS);
  }
  return null;
}

async function keyIsPublished() {
  try {
    const res = await fetchNoCache(KEY_LOCATION);
    if (!res.ok) { warn(`La clave no está publicada (${KEY_LOCATION} → HTTP ${res.status}).`); return false; }
    const text = (await res.text()).trim();
    if (text !== INDEXNOW_KEY) { warn(`${KEY_LOCATION} no contiene la clave esperada.`); return false; }
    return true;
  } catch (err) {
    warn(`No se pudo comprobar la clave (${err.message}).`);
    return false;
  }
}

const RESPONSES = {
  200: "recibidas",
  202: "recibidas; validación de la clave pendiente",
  400: "formato no válido",
  403: "clave no válida o no encontrada",
  422: "URLs que no son del host o clave que no coincide",
  429: "demasiadas peticiones",
};

const SUBMIT_ATTEMPTS = 4;

async function submit(urlList) {
  const body = JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: KEY_LOCATION, urlList });
  for (let attempt = 1; attempt <= SUBMIT_ATTEMPTS; attempt++) {
    const last = attempt === SUBMIT_ATTEMPTS;
    const backoff = 15 * 2 ** (attempt - 1); // 15, 30, 60 s
    let res;
    try {
      res = await fetch(INDEXNOW_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body,
        signal: AbortSignal.timeout(20000),
      });
    } catch (err) {
      // Error de red / timeout: transitorio → reintento.
      if (last) { warn(`IndexNow: error de red tras ${attempt} intentos (${err.message}).`); return false; }
      console.log(`  IndexNow: error de red (${err.message}); reintento ${attempt + 1}/${SUBMIT_ATTEMPTS} en ${backoff}s.`);
      await sleep(backoff * 1000);
      continue;
    }
    const label = RESPONSES[res.status] || "respuesta inesperada";
    if (res.status === 200 || res.status === 202) {
      console.log(`  ✓ IndexNow ${res.status}: ${urlList.length} URLs ${label}.`);
      return true;
    }
    // 429 (respetando Retry-After, máx. 2 min) y 5xx: transitorios.
    if ((res.status === 429 || res.status >= 500) && !last) {
      const retryAfter = Number(res.headers.get("retry-after"));
      const wait = res.status === 429 ? Math.min(retryAfter || 60, 120) : backoff;
      console.log(`  IndexNow ${res.status} (${label}); reintento ${attempt + 1}/${SUBMIT_ATTEMPTS} en ${wait}s.`);
      await sleep(wait * 1000);
      continue;
    }
    const detail = (await res.text().catch(() => "")).slice(0, 300);
    warn(`IndexNow ${res.status}: ${label}. ${detail}`);
    return false;
  }
  return false;
}

async function main() {
  if (ENVIRONMENT !== "production") {
    console.log(`IndexNow: entorno «${ENVIRONMENT || "sin definir"}», no es producción → no se avisa.`);
    return;
  }
  const changes = await waitForDeployedChanges();
  if (!changes) {
    warn(`${HOST} no llegó a servir el commit ${EXPECTED_SHA.slice(0, 7)}; no se avisa (relanza el job más tarde).`);
    process.exitCode = 1;
    return;
  }
  if (!changes.production) { console.log("IndexNow: la lista no viene de un build de producción → no se avisa."); return; }

  const urls = [...new Set(changes.urls || [])].filter((u) => u === `${SITE_URL}/` || u.startsWith(`${SITE_URL}/`));
  if (!urls.length) { console.log("IndexNow: ninguna URL nueva, cambiada o borrada → no se avisa."); return; }
  if (!(await keyIsPublished())) { process.exitCode = 1; return; }

  console.log(`IndexNow: avisando a ${INDEXNOW_ENDPOINT} de ${urls.length} URLs…`);
  let failed = 0;
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_REQUEST) {
    if (!(await submit(urls.slice(i, i + MAX_URLS_PER_REQUEST)))) failed++;
  }
  if (failed) {
    warn(`IndexNow: ${failed} lote(s) sin enviar; relanza el job («Re-run jobs»).`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  warn(`IndexNow: error inesperado (${err.message}).`);
  process.exitCode = 1;
});
