// ─────────────────────────────────────────────────────────────────────────────
// scripts/check-responsive.mjs — `npm run check:responsive`
//
// Recorre el build (dist/, servido aquí mismo con un servidor estático: sin
// servidor de desarrollo) con Chrome (Playwright) y busca fallos de maquetación:
//   · scroll horizontal y elementos que se salen de la pantalla;
//   · elementos que se solapan en la cabecera (logo, enlaces, chip, botones)
//     y en el buscador de la home (campo, «Tu uni y grado», «Explorar»);
//   · desplegables cortados o tapados («Tu uni y grado» y su hoja de móvil,
//     sugerencias del buscador, menú del chip, la
//     invitación desplegada), con elementFromPoint en su centro y esquinas;
//   · en móvil, campos de texto con letra de menos de 16 px (iOS hace zoom).
// En home, una ficha con convenios, comparador, City Match, beca, proceso y
// Learning Agreement; a 360, 390, 768, 1024, 1280, 1536 y 1920 px; sin
// universidad y con una elegida. Solo imprime los fallos (y una línea final).
//
// Uso:  npm run build && npm run check:responsive
//       npm run check:responsive -- --capturas   (guarda captura de cada fallo
//                                                  en tmp/responsive/)
// Navegador: el Chrome instalado (PW_CHANNEL=chrome por defecto) o
// CHROME_PATH=ruta/al/chrome. No descarga navegadores (playwright-core).
// ─────────────────────────────────────────────────────────────────────────────

import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { dirname, extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SHOTS = join(ROOT, "tmp", "responsive");
const WANT_SHOTS = process.argv.includes("--capturas");

const PAGES = [
  { name: "home", path: "/" },
  { name: "ficha (Trento)", path: "/city/trento" },
  { name: "comparador", path: "/comparar" },
  { name: "City Match", path: "/city-match" },
  { name: "beca", path: "/beca-erasmus" },
  { name: "proceso", path: "/proceso" },
  { name: "Learning Agreement", path: "/learning-agreement" },
];
const WIDTHS = [360, 390, 768, 1024, 1280, 1536, 1920];
const STATES = [
  { name: "sin universidad", saved: null },
  { name: "con universidad", saved: { uni: "loyola", grado: "ade", campus: null } },
];

// ─── Servidor estático de dist/ ──────────────────────────────────────────────
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".woff2": "font/woff2", ".mp4": "video/mp4", ".webm": "video/webm", ".ico": "image/x-icon", ".txt": "text/plain",
};
function serve() {
  const root = realpathSync(DIST);
  const inside = (p) => p === root || p.startsWith(root + sep);
  const server = createServer((req, res) => {
    try {
      const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
      let file = join(root, normalize(url));
      if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
      // Nunca fuera de dist/ (ni con «../» ni con enlaces simbólicos).
      if (!existsSync(file) || !inside(realpathSync(file))) file = join(root, "404.html");
      res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
      res.end(readFileSync(file));
    } catch {
      res.writeHead(400);
      res.end();
    }
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

// ─── Comprobaciones dentro de la página ──────────────────────────────────────
// Se pasan como texto a page.evaluate: todo lo que usan va dentro.
function layoutChecks() {
  const vw = window.innerWidth;
  const problems = [];
  const desc = (el) => {
    const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).slice(0, 2).join(".") : "";
    const text = (el.innerText || el.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 30);
    return `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${cls ? `.${cls}` : ""}${text ? ` «${text}»` : ""}`;
  };
  const visible = (el) => {
    if (el.closest("[inert], [aria-hidden='true'], .skip-link, .sr-only")) return false;
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden" || Number(s.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1;
  };
  // ¿Lo recorta (a propósito) un contenedor con overflow? Carruseles, etc.
  const clipped = (el) => {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const s = getComputedStyle(a);
      if (s.overflowX !== "visible" || s.overflow === "hidden" || s.overflow === "clip") return true;
      if (s.position === "fixed") return false;
    }
    return false;
  };

  // 1. Scroll horizontal / elementos fuera de la pantalla.
  const sw = document.documentElement.scrollWidth;
  const out = [];
  for (const el of document.body.querySelectorAll("*")) {
    if (!visible(el) || clipped(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 || r.left < -1) out.push(el);
  }
  // Solo los más externos (si se sale un padre, no se repiten sus hijos).
  const outer = out.filter((el) => !out.some((o) => o !== el && o.contains(el)));
  if (sw > vw + 1) problems.push(`scroll horizontal: el documento mide ${sw}px de ancho (pantalla ${vw}px)`);
  for (const el of outer.slice(0, 6)) {
    const r = el.getBoundingClientRect();
    problems.push(`se sale de la pantalla: ${desc(el)} (de ${Math.round(r.left)} a ${Math.round(r.right)}px)`);
  }

  // 2. Solapes en la cabecera y en el buscador de la home.
  const overlaps = (scope, selector, label) => {
    const root = document.querySelector(scope);
    if (!root) return;
    const els = [...root.querySelectorAll(selector)].filter(visible).filter((el, i, arr) => !arr.some((o) => o !== el && o.contains(el)));
    for (let i = 0; i < els.length; i++) {
      for (let j = i + 1; j < els.length; j++) {
        const a = els[i].getBoundingClientRect();
        const b = els[j].getBoundingClientRect();
        const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (w > 2 && h > 2) problems.push(`solape en ${label}: ${desc(els[i])} y ${desc(els[j])} (${Math.round(w)}×${Math.round(h)}px)`);
      }
    }
  };
  overlaps(".navbar", "a, button, .uni-chip, .navbar__city-breadcrumb", "la cabecera");
  overlaps(".search-bar__inner", ".search-bar__input, .search-bar__uni-chip, .search-bar__btn, .search-bar__icon", "el buscador");
  return problems;
}

// En móvil, ningún campo de texto con la letra por debajo de 16 px (iOS amplía
// la página al enfocarlo).
function smallInputs() {
  const out = [];
  for (const el of document.querySelectorAll("input, select, textarea")) {
    if (["checkbox", "radio", "range", "button", "submit", "hidden"].includes(el.type)) continue;
    const s = getComputedStyle(el);
    if (s.display === "none" || s.visibility === "hidden" || el.closest("[inert]")) continue;
    const size = parseFloat(s.fontSize);
    if (size < 16) {
      const name = el.getAttribute("aria-label") || el.getAttribute("placeholder") || el.name || el.className;
      out.push(`campo con letra de ${size}px (mínimo 16 en móvil): ${el.tagName.toLowerCase()} «${String(name).slice(0, 40)}»`);
    }
  }
  return out;
}

// No más sugerencias de las permitidas (3 en móvil, 5 en escritorio).
function countCheck({ selector, max, label }) {
  const n = document.querySelectorAll(selector).length;
  return n > max ? [`${label}: ${n} sugerencias (máximo ${max} en este ancho)`] : [];
}

// Con el desplegable abierto, deslizar 300 px: tiene que seguir pegado justo
// debajo de su barra (en móvil la página está bloqueada y no se mueve).
async function scrollStick(page, barSelector, panelSelector, label) {
  const gap = () => page.evaluate(({ bar, panel }) => {
    const b = document.querySelector(bar)?.getBoundingClientRect();
    const p = document.querySelector(panel)?.getBoundingClientRect();
    return b && p ? Math.round(p.top - b.bottom) : null;
  }, { bar: barSelector, panel: panelSelector });
  const before = await gap();
  await page.mouse.move(10, 300);
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(250);
  const after = await gap();
  if (before == null || after == null) return [`${label}: se cierra al deslizar`];
  return Math.abs(after - before) > 2 || after < 0 || after > 16
    ? [`${label} se despega de su barra al deslizar (de ${before} a ${after}px)`]
    : [];
}

// Un desplegable abierto: dentro de la pantalla y por encima de todo.
function dropdownCheck({ selector, label, ignoreHeader = false }) {
  const el = document.querySelector(selector);
  if (!el) return [`${label}: no se ha abierto`];
  const r = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const problems = [];
  if (r.left < -1 || r.right > vw + 1) problems.push(`${label} se sale por los lados (de ${Math.round(r.left)} a ${Math.round(r.right)}px, pantalla ${vw}px)`);
  if (r.bottom > vh + 1) problems.push(`${label} queda cortado por abajo (llega a ${Math.round(r.bottom)}px, pantalla ${vh}px)`);
  if (r.top < -1) problems.push(`${label} queda cortado por arriba (empieza en ${Math.round(r.top)}px)`);
  // Debajo de la cabecera fija (si no es parte de ella).
  const header = document.querySelector(".navbar");
  const hb = header && !header.contains(el) ? header.getBoundingClientRect().bottom : 0;
  if (!ignoreHeader && hb && r.top < hb - 1) problems.push(`${label} queda debajo de la cabecera (empieza en ${Math.round(r.top)}px, la cabecera acaba en ${Math.round(hb)}px)`);
  // Lo que se ve en varios puntos del desplegable tiene que ser el desplegable.
  // Centro y las cuatro esquinas (6 px hacia dentro).
  const bottom = Math.min(r.bottom, vh);
  const right = Math.min(r.right, vw);
  const points = [
    [r.left + r.width / 2, r.top + (bottom - r.top) / 2],
    [r.left + 6, r.top + 6],
    [right - 6, r.top + 6],
    [r.left + 6, bottom - 6],
    [right - 6, bottom - 6],
  ];
  for (const [x, y] of points) {
    if (x < 0 || y < 0 || x > vw || y > vh) continue;
    const top = document.elementFromPoint(x, y);
    if (top && !el.contains(top)) {
      problems.push(`${label} queda tapado en (${Math.round(x)}, ${Math.round(y)}) por ${top.tagName.toLowerCase()}.${(top.getAttribute("class") || "").split(/\s+/)[0]}`);
      break;
    }
  }
  return problems;
}

// ─── Recorrido ──────────────────────────────────────────────────────────────
async function launch() {
  const opts = { headless: true };
  if (process.env.CHROME_PATH) return chromium.launch({ ...opts, executablePath: process.env.CHROME_PATH });
  return chromium.launch({ ...opts, channel: process.env.PW_CHANNEL ?? "chrome" });
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("✖ No hay build: ejecuta antes `npm run build`.");
    process.exit(2);
  }
  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await launch();
  const failures = [];
  let checks = 0;

  for (const state of STATES) {
    for (const width of WIDTHS) {
      const height = width < 768 ? 780 : 900;
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce", deviceScaleFactor: 1 });
      await context.addInitScript((saved) => {
        try {
          sessionStorage.clear();
          if (saved) localStorage.setItem("mabroad:universidad", JSON.stringify(saved));
          else localStorage.removeItem("mabroad:universidad");
        } catch {}
      }, state.saved);
      // Solo el propio sitio: las fotos externas no cambian la maquetación y
      // así el recorrido no depende de la red.
      await context.route("**/*", (route) => (route.request().url().startsWith(base) ? route.continue() : route.abort()));
      const page = await context.newPage();

      for (const p of PAGES) {
        const where = `${p.name} · ${width}px · ${state.name}`;
        const found = [];
        try {
          await page.goto(base + p.path, { waitUntil: "load" });
          if (state.saved) await page.waitForSelector(".uni-chip__btn", { timeout: 5000 }).catch(() => found.push("no aparece el chip de la universidad"));
          await page.waitForTimeout(400);
          found.push(...(await page.evaluate(layoutChecks)));
          if (width < 768) found.push(...(await page.evaluate(smallInputs)));
          checks++;

          // Desplegables.
          const maxSuggestions = width < 768 ? 3 : 5;
          if (p.path === "/") {
            // Sugerencias del buscador de destinos: por encima de todo, como
            // mucho 3/5 y pegadas a la barra al deslizar.
            await page.click(".search-bar__input");
            await page.keyboard.type("r");
            await page.waitForTimeout(250);
            found.push(...(await page.evaluate(dropdownCheck, { selector: ".search-bar__dropdown", label: "las sugerencias del buscador" })));
            found.push(...(await page.evaluate(countCheck, { selector: ".search-bar__dropdown [role='option']", max: maxSuggestions, label: "las sugerencias del buscador" })));
            found.push(...(await scrollStick(page, ".search-bar", ".search-bar__dropdown", "las sugerencias del buscador")));
            await page.keyboard.press("Escape");
            await page.waitForTimeout(200);
            checks += 3;

            // «Tu uni y grado»: el mismo desplegable, en móvil y escritorio.
            await page.click(".search-bar__uni-btn");
            await page.waitForTimeout(700); // en móvil puede subir la página con suavidad
            found.push(...(await page.evaluate(dropdownCheck, { selector: ".search-bar__uni-panel", label: "el desplegable «Tu uni y grado»" })));
            found.push(...(await page.evaluate(countCheck, { selector: ".search-bar__uni-panel [role='option']", max: maxSuggestions, label: "el desplegable «Tu uni y grado»" })));
            if (width < 768) found.push(...(await page.evaluate(smallInputs)));
            found.push(...(await page.evaluate(layoutChecks)).filter((x) => x.startsWith("scroll horizontal")));
            found.push(...(await scrollStick(page, ".search-bar", ".search-bar__uni-panel", "el desplegable «Tu uni y grado»")));
            await page.keyboard.press("Escape");
            await page.waitForTimeout(150);
            if (await page.$(".search-bar__uni-panel")) found.push("Escape no cierra el desplegable «Tu uni y grado»");
            checks += 3;
          }
          if (state.saved) {
            await page.click(".uni-chip__btn");
            await page.waitForTimeout(200);
            found.push(...(await page.evaluate(dropdownCheck, { selector: ".uni-chip__menu", label: "el menú del chip" })));
            found.push(...(await page.evaluate(countCheck, { selector: ".uni-chip__menu [role='option']", max: 3, label: "el menú del chip" })));
            await page.keyboard.press("Escape");
            await page.waitForTimeout(100);
            if (await page.$(".uni-chip__menu")) found.push("Escape no cierra el menú del chip");
            checks++;
          } else if (p.path !== "/") {
            const invite = await page.$("[data-uni-invite-el] button");
            if (invite && (await invite.isVisible())) {
              await invite.scrollIntoViewIfNeeded();
              await invite.click();
              await page.waitForTimeout(350);
              found.push(...(await page.evaluate(dropdownCheck, { selector: "[class*='inviteExpanded']", label: "la invitación desplegada" })));
              found.push(...(await page.evaluate(countCheck, { selector: "[class*='inviteExpanded'] [role='option']", max: maxSuggestions, label: "la invitación desplegada" })));
              found.push(...(await page.evaluate(layoutChecks)).filter((x) => x.startsWith("scroll horizontal")));
              checks++;
            }
          }
        } catch (err) {
          found.push(`error al comprobar: ${err.message.split("\n")[0]}`);
        }
        if (found.length) {
          failures.push({ where, found: [...new Set(found)] });
          if (WANT_SHOTS) {
            mkdirSync(SHOTS, { recursive: true });
            const file = join(SHOTS, `${p.name.replace(/\W+/g, "-")}-${width}-${state.saved ? "uni" : "sin"}.png`);
            await page.screenshot({ path: file, fullPage: false }).catch(() => {});
          }
        }
      }
      await context.close();
    }
  }

  await browser.close();
  server.close();

  for (const f of failures) {
    console.log(`✖ ${f.where}`);
    for (const x of f.found) console.log(`    · ${x}`);
  }
  if (failures.length) {
    console.log(`\n${failures.length} combinaciones con fallos (de ${PAGES.length * WIDTHS.length * STATES.length}).${WANT_SHOTS ? ` Capturas en ${SHOTS}` : ""}`);
    process.exit(1);
  }
  console.log(`✓ Responsive limpio: ${checks} comprobaciones en ${PAGES.length} páginas × ${WIDTHS.length} anchos × ${STATES.length} estados.`);
}

main().catch((err) => {
  console.error(`✖ ${err.message}`);
  process.exit(2);
});
