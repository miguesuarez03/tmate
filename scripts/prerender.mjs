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

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const SSR_BUNDLE = join(ROOT, ".ssr-temp", "entry-server.mjs");

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
  tags.push(`<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`);
  tags.push(`<meta property="og:type" content="${escapeHtml(meta.ogType)}" />`);
  tags.push(`<meta property="og:site_name" content="TMate" />`);
  tags.push(`<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  tags.push(`<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  tags.push(`<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`);
  if (meta.ogImage) tags.push(`<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`);
  tags.push(`<meta name="twitter:card" content="${meta.ogImage ? "summary_large_image" : "summary"}" />`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
  if (meta.ogImage) tags.push(`<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />`);
  if (meta.jsonLd)
    tags.push(`<script type="application/ld+json">${safeJsonLd(meta.jsonLd)}</script>`);
  return tags.map((t) => "    " + t).join("\n");
}

// ─── Transforma la plantilla para una ruta concreta ──────────────────────────
function renderTemplate(template, appHtml, meta) {
  let html = template;

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
    .replace(/\s*<meta\s+name="twitter:card"[^>]*>/g, "");

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

  const { renderPage, ALL_ROUTES, SITE_URL } = await import(pathToFileURL(SSR_BUNDLE).href);
  const template = readFileSync(join(DIST, "index.html"), "utf-8");

  let ok = 0;
  const failed = [];

  for (const route of ALL_ROUTES) {
    try {
      const { appHtml, meta } = renderPage(route.path);
      const html = renderTemplate(template, appHtml, meta);
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

  // sitemap.xml + robots.txt (dinámicos, sobrescriben los estáticos copiados)
  writeFileSync(join(DIST, "sitemap.xml"), buildSitemap(ALL_ROUTES, SITE_URL), "utf-8");
  writeFileSync(join(DIST, "robots.txt"), buildRobots(SITE_URL), "utf-8");
  console.log(`  ✓ sitemap.xml (${ALL_ROUTES.length} URLs) + robots.txt generados`);

  console.log(`\n  Prerender completado: ${ok}/${ALL_ROUTES.length} páginas.`);
  if (failed.length) {
    console.error(`  ⚠ ${failed.length} páginas fallaron:`, failed);
    // Si falló la home, el build no sirve.
    if (failed.some((f) => f.path === "/")) process.exit(1);
  }
}

main();
