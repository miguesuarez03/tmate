// ─────────────────────────────────────────────────────────────────────────────
// scripts/prerender.mjs
//
// Se ejecuta DESPUÉS de `vite build` (cliente) y de `vite build --ssr`.
// Para cada ruta:
//   1. Renderiza el body real con renderToString (contenido para Google).
//   2. Calcula el <head> único (title, description, canonical, OG, JSON-LD).
//   3. Inyecta ambos en la plantilla dist/index.html.
//   4. Escribe dist/<ruta>/index.html.
// Al final genera dist/sitemap.xml dinámicamente desde la misma lista de rutas.
//
// Resultado: cada URL de TMate devuelve HTML completo y con metadatos sin
// depender de que Google ejecute JavaScript. Cero navegador headless, cero
// Next.js. Compila igual en local y en Vercel.
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import { INDEXNOW_KEY, MANIFEST_FILE, CHANGED_FILE } from "./indexnow-config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const SSR_BUNDLE = join(ROOT, ".ssr-temp", "entry-server.mjs");

// Se rellena en main() con el SITE_NAME real exportado por entry-server.jsx
// (que a su vez viene de src/lib/seo.js) — así og:site_name nunca queda
// desincronizado del nombre de marca real.
let SITE_NAME = "MAbroad";
let SITE_LOCALE = "es_ES";

// ─── Utilidades de escape ────────────────────────────────────────────────────
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
// Evita que un "</script>" dentro del JSON-LD rompa la página.
function safeJsonLd(obj) {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

// ─── Construcción del <head> por página ──────────────────────────────────────
function buildHeadTags(meta) {
  const tags = [];
  // La 404 no lleva canonical (no es una URL que deba indexarse).
  if (!meta.noindex) tags.push(`<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`);
  tags.push(`<meta property="og:type" content="${escapeHtml(meta.ogType)}" />`);
  tags.push(`<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`);
  tags.push(`<meta property="og:locale" content="${escapeHtml(SITE_LOCALE)}" />`);
  tags.push(`<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  tags.push(`<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  if (!meta.noindex) tags.push(`<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`);
  if (meta.ogImage) {
    tags.push(`<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`);
    tags.push(`<meta property="og:image:secure_url" content="${escapeHtml(meta.ogImage)}" />`);
    if (meta.ogImageWidth && meta.ogImageHeight) {
      tags.push(`<meta property="og:image:width" content="${meta.ogImageWidth}" />`);
      tags.push(`<meta property="og:image:height" content="${meta.ogImageHeight}" />`);
    }
    if (meta.ogImageAlt) tags.push(`<meta property="og:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />`);
  }
  tags.push(`<meta name="twitter:card" content="${meta.ogImage ? "summary_large_image" : "summary"}" />`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
  if (meta.ogImage) tags.push(`<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />`);
  if (meta.ogImage && meta.ogImageAlt)
    tags.push(`<meta name="twitter:image:alt" content="${escapeHtml(meta.ogImageAlt)}" />`);
  // data-tmate-jsonld: el hook useSEO del cliente reutiliza este mismo
  // <script> en vez de añadir un segundo bloque duplicado.
  if (meta.jsonLd)
    tags.push(`<script type="application/ld+json" data-tmate-jsonld="true">${safeJsonLd(meta.jsonLd)}</script>`);
  return tags.map((t) => "    " + t).join("\n");
}

// ─── Preload de tipografías ──────────────────────────────────────────────────
// Sin preload, el navegador no descubre los .woff2 hasta haber descargado y
// procesado el CSS: el texto se pinta con la fuente de respaldo y salta al
// llegar la buena. Se precargan solo las que se ven en el primer pantallazo:
//   · Bricolage Grotesque (latin): cuerpo y UI de TODAS las páginas.
//   · Fraunces 800 (latin): el titular del hero, solo en la home.
// Los nombres llevan el hash que les pone Vite, así que se buscan en
// dist/assets en cada build. Si alguno no aparece (cambio de fuente o de
// versión de Fontsource) se avisa y esa página sale sin preload: no rompe.
const FONT_PRELOADS = [
  { pattern: /^bricolage-grotesque-latin-opsz-normal-[\w-]+\.woff2$/, routes: null },
  { pattern: /^fraunces-latin-800-normal-[\w-]+\.woff2$/, routes: ["/"] },
];

function findFontPreloads() {
  const assetsDir = join(DIST, "assets");
  const files = existsSync(assetsDir) ? readdirSync(assetsDir) : [];
  return FONT_PRELOADS.map(({ pattern, routes }) => {
    const file = files.find((f) => pattern.test(f));
    if (!file) console.warn(`  ⚠ Preload de fuentes: no hay ningún fichero que cumpla ${pattern} en dist/assets.`);
    return file ? { href: `/assets/${file}`, routes } : null;
  }).filter(Boolean);
}

function fontPreloadTags(fonts, routePath) {
  return fonts
    .filter((f) => !f.routes || f.routes.includes(routePath))
    .map((f) => `<link rel="preload" href="${f.href}" as="font" type="font/woff2" crossorigin />`)
    .join("\n    ");
}

// ─── Transforma la plantilla para una ruta concreta ──────────────────────────
function renderTemplate(template, appHtml, meta, preloadTags = "") {
  let html = template;

  // 0) Preload de fuentes, justo antes del bundle (lo primero que pide el head)
  if (preloadTags) {
    html = html.replace(/<script type="module"/, `${preloadTags}\n    <script type="module"`);
  }

  // 1) title
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);

  // 2) meta description por defecto → la de la página
  html = html.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`
  );

  // 3) Elimina los OG/twitter por defecto de la plantilla para no duplicarlos
  html = html
    .replace(/\s*<meta\s+property="og:type"[^>]*>/g, "")
    .replace(/\s*<meta\s+property="og:site_name"[^>]*>/g, "")
    .replace(/\s*<meta\s+property="og:image"[^>]*>/g, "")
    .replace(/\s*<meta\s+name="twitter:card"[^>]*>/g, "")
    .replace(/\s*<meta\s+name="twitter:image"[^>]*>/g, "")
    .replace(/\s*<meta\s+property="og:locale"[^>]*>/g, "")
    .replace(/\s*<meta\s+property="og:image:[a-z_]+"[^>]*>/g, "")
    .replace(/\s*<meta\s+name="twitter:image:alt"[^>]*>/g, "");

  // 3b) robots: la 404 no se indexa.
  if (meta.noindex) {
    html = html.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
      `<meta name="robots" content="noindex, follow" />`
    );
  }

  // 4) Inyecta el head por página justo antes de </head>
  html = html.replace(/<\/head>/, `${buildHeadTags(meta)}\n  </head>`);

  // 5) Inyecta el contenido renderizado dentro de #root
  html = html.replace(
    /<div id="root">\s*<\/div>/,
    `<div id="root">${appHtml}</div>`
  );

  return html;
}

// ─── Escritura de fichero por ruta ───────────────────────────────────────────
function outPathFor(route) {
  if (route === "/") return join(DIST, "index.html");
  const clean = route.replace(/^\/+|\/+$/g, "");
  return join(DIST, clean, "index.html");
}

// ─── Sitemap ─────────────────────────────────────────────────────────────────
function buildSitemap(routes, siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .filter((r) => !r.noindex) // páginas noindex (p. ej. /creditos): fuera del sitemap
    .map(
      (r) => `  <url>
    <loc>${siteUrl}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots(siteUrl) {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

// ─── Comprobación de la CSP ──────────────────────────────────────────────────
// La Content-Security-Policy de vercel.json solo permite scripts inline cuyo
// hash sha256 figure en script-src (p.ej. el script del tema en index.html).
// Si alguien edita ese script y no actualiza el hash, el navegador lo
// bloquearía en silencio: aquí se para el build con el hash correcto.
function checkCspHashes(template) {
  const vercelPath = join(ROOT, "vercel.json");
  if (!existsSync(vercelPath)) return;
  const vercel = JSON.parse(readFileSync(vercelPath, "utf-8"));
  const csp = (vercel.headers || [])
    .flatMap((h) => h.headers || [])
    .find((h) => h.key.toLowerCase() === "content-security-policy")?.value;
  if (!csp) return;
  const inline = [...template.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)];
  const missing = inline
    .map((m) => `sha256-${createHash("sha256").update(m[1], "utf8").digest("base64")}`)
    .filter((hash) => !csp.includes(`'${hash}'`));
  if (missing.length) {
    console.error("✖ Hay scripts inline en index.html cuyo hash no está en la CSP de vercel.json.");
    console.error(`  Añade a script-src: ${missing.map((h) => `'${h}'`).join(" ")}`);
    process.exit(1);
  }
}

// ─── IndexNow (ver scripts/indexnow-config.mjs) ──────────────────────────────
// Hash del contenido que importa a un buscador (head SEO + body renderizado),
// sin la plantilla: los nombres de los bundles cambian en cada build y harían
// que todas las URLs parecieran «cambiadas».
function contentHash(appHtml, meta) {
  const payload = JSON.stringify({
    title: meta.title, description: meta.description, canonical: meta.canonical,
    noindex: Boolean(meta.noindex), jsonLd: meta.jsonLd ?? null, appHtml,
  });
  return createHash("sha256").update(payload, "utf8").digest("hex").slice(0, 32);
}

// La clave tiene que estar publicada en la raíz del deploy (public/<clave>.txt
// → dist/<clave>.txt). Si falta o no coincide, se repara y se avisa.
function ensureIndexNowKeyFile() {
  const keyPath = join(DIST, `${INDEXNOW_KEY}.txt`);
  const current = existsSync(keyPath) ? readFileSync(keyPath, "utf-8").trim() : null;
  if (current !== INDEXNOW_KEY) {
    writeFileSync(keyPath, INDEXNOW_KEY, "utf-8");
    console.warn(`  ⚠ IndexNow: faltaba public/${INDEXNOW_KEY}.txt (o no coincidía); escrito en dist/.`);
  }
}

// Compara con el manifiesto que sirve ahora producción y escribe la lista de
// URLs nuevas, cambiadas o borradas. Solo en builds de producción de Vercel.
// Si el manifiesto anterior no se puede leer (red, HTTP ≠ 200, JSON roto), se
// avisan TODAS las URLs indexables actuales: este deploy publica hashes
// nuevos, así que una lista vacía perdería para siempre el aviso de lo que
// haya cambiado. Nunca rompe el build.
async function writeIndexNowFiles(pages, siteUrl) {
  const commit = process.env.VERCEL_GIT_COMMIT_SHA || null;
  const isProduction = process.env.VERCEL_ENV === "production";
  writeFileSync(
    join(DIST, MANIFEST_FILE),
    JSON.stringify({ commit, pages }, null, 0) + "\n",
    "utf-8"
  );

  let urls = [];
  let reason;
  const allCurrent = (why) => {
    urls = Object.keys(pages);
    reason = `${why}: se avisan todas las URLs indexables`;
  };
  if (!isProduction) {
    reason = "no es un build de producción: no se avisa";
  } else {
    try {
      const res = await fetch(`${siteUrl}/${MANIFEST_FILE}`, {
        signal: AbortSignal.timeout(8000),
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.status === 404) {
        allCurrent("no hay manifiesto anterior (primer deploy)");
      } else if (!res.ok) {
        allCurrent(`manifiesto anterior ilegible (HTTP ${res.status})`);
      } else {
        let prev = null;
        try { prev = (await res.json())?.pages; } catch { /* JSON roto */ }
        if (!prev || typeof prev !== "object" || Array.isArray(prev)) {
          allCurrent("manifiesto anterior con formato no válido");
        } else {
          const changed = Object.keys(pages).filter((u) => prev[u] !== pages[u]);
          const removed = Object.keys(prev).filter((u) => !(u in pages));
          urls = [...changed, ...removed];
          reason = `${changed.length} nuevas/cambiadas, ${removed.length} borradas`;
        }
      }
    } catch (err) {
      allCurrent(`manifiesto anterior ilegible (${err.name}: ${err.message})`);
    }
  }
  // Solo URLs del dominio canónico.
  urls = [...new Set(urls)].filter((u) => u === `${siteUrl}/` || u.startsWith(`${siteUrl}/`));
  writeFileSync(
    join(DIST, CHANGED_FILE),
    JSON.stringify({ commit, production: isProduction, urls }, null, 2) + "\n",
    "utf-8"
  );
  console.log(`  ✓ IndexNow: ${urls.length} URLs para avisar (${reason})`);
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("✖ No se encuentra dist/index.html. ¿Has ejecutado `vite build` antes?");
    process.exit(1);
  }
  if (!existsSync(SSR_BUNDLE)) {
    console.error("✖ No se encuentra el bundle SSR (.ssr-temp/entry-server.mjs).");
    console.error("  Ejecuta: vite build --ssr src/entry-server.jsx --outDir .ssr-temp");
    process.exit(1);
  }

  const { renderPage, renderNotFound, ALL_ROUTES, SITE_URL, SITE_NAME: siteName, SITE_LOCALE: siteLocale } =
    await import(pathToFileURL(SSR_BUNDLE).href);
  if (siteName) SITE_NAME = siteName;
  if (siteLocale) SITE_LOCALE = siteLocale;
  // La home se escribe ENCIMA de dist/index.html (la plantilla). Para que
  // relanzar `npm run prerender` sin rehacer el build de cliente no use como
  // plantilla una home ya prerenderizada (duplicaría canonical/OG/JSON-LD),
  // se guarda una copia limpia en .ssr-temp y se reutiliza.
  const TEMPLATE_COPY = join(ROOT, ".ssr-temp", "index.template.html");
  let template = readFileSync(join(DIST, "index.html"), "utf-8");
  const isPristine = (t) => /<div id="root">\s*<\/div>/.test(t) && !t.includes('rel="canonical"');
  if (isPristine(template)) {
    writeFileSync(TEMPLATE_COPY, template, "utf-8");
  } else if (existsSync(TEMPLATE_COPY) && isPristine(readFileSync(TEMPLATE_COPY, "utf-8"))) {
    template = readFileSync(TEMPLATE_COPY, "utf-8");
  } else {
    console.error("✖ dist/index.html ya está prerenderizada y no hay plantilla limpia. Ejecuta `npm run build`.");
    process.exit(1);
  }
  checkCspHashes(template);

  const fonts = findFontPreloads();

  let ok = 0;
  const failed = [];
  const indexNowPages = {}; // URL canónica → hash del contenido (solo indexables)

  for (const route of ALL_ROUTES) {
    try {
      const { appHtml, meta } = await renderPage(route.path);
      const html = renderTemplate(template, appHtml, meta, fontPreloadTags(fonts, route.path));
      if (!meta.noindex) indexNowPages[meta.canonical] = contentHash(appHtml, meta);
      const out = outPathFor(route.path);
      mkdirSync(dirname(out), { recursive: true });
      writeFileSync(out, html, "utf-8");
      ok++;
      console.log(`  ✓ ${route.path.padEnd(28)} → ${out.replace(ROOT + "/", "")}  (${(html.length / 1024).toFixed(0)} kB)`);
    } catch (err) {
      failed.push({ path: route.path, error: err.message.split("\n")[0] });
      console.error(`  ✖ ${route.path}  →  ${err.message.split("\n")[0]}`);
    }
  }

  // 404.html: Vercel la sirve (con estado HTTP 404) para cualquier URL que no
  // exista en dist/. Lleva noindex y no aparece en el sitemap.
  try {
    const { appHtml, meta } = renderNotFound();
    writeFileSync(join(DIST, "404.html"), renderTemplate(template, appHtml, meta, fontPreloadTags(fonts, "/404")), "utf-8");
    console.log("  ✓ 404.html (noindex)");
  } catch (err) {
    console.error("  ✖ 404.html →", err.message.split("\n")[0]);
    process.exit(1);
  }

  // sitemap.xml + robots.txt (dinámicos, sobrescriben los estáticos copiados)
  writeFileSync(join(DIST, "sitemap.xml"), buildSitemap(ALL_ROUTES, SITE_URL), "utf-8");
  writeFileSync(join(DIST, "robots.txt"), buildRobots(SITE_URL), "utf-8");
  console.log(`  ✓ sitemap.xml (${ALL_ROUTES.filter((r) => !r.noindex).length} URLs) + robots.txt generados`);

  // IndexNow: clave publicada + manifiesto/lista de cambios. Nada de esto
  // puede romper el build.
  try {
    ensureIndexNowKeyFile();
    await writeIndexNowFiles(indexNowPages, SITE_URL);
  } catch (err) {
    console.warn("  ⚠ IndexNow: no se generaron los ficheros de aviso →", err.message);
  }

  console.log(`\n  Prerender completado: ${ok}/${ALL_ROUTES.length} páginas.`);
  if (failed.length) {
    console.error(`  ⚠ ${failed.length} páginas fallaron:`, failed);
    // Si falló la home, el build no sirve.
    if (failed.some((f) => f.path === "/")) process.exit(1);
  }
}

main();
