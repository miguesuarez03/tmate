# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TMate — a React SPA (in Spanish) that helps students pick an Erasmus/study-abroad city: city listings, detail pages, a comparator, a "City Match" quiz, a scholarship (beca) calculator, and Learning Agreement guidance. Content and UI copy are in Spanish; code comments are also largely in Spanish.

There is no backend — everything is static data in `src/data/`, and the "build" step prerenders every route to static HTML for SEO (see below). There is no linter; a few tests run with Node's built-in test runner (`npm test`).

## Commands

```bash
npm run dev            # vite dev server
npm run build:client    # vite build → dist/ (client bundle)
npm run build:ssr        # vite build --ssr src/entry-server.jsx --outDir .ssr-temp (SSR bundle, temp)
npm run prerender        # node scripts/prerender.mjs — renders every route to static HTML in dist/
npm run build             # runs the three steps above in order (this is the real production build)
npm run preview           # vite preview — serve dist/ locally after a build
npm test                  # node --test "tests/**/*.test.mjs" — no dependencies; tests/resolve-hook.mjs lets Node load src/ like Vite does
```

**Run the build from PowerShell, not Git Bash.** From Git Bash the path reaches Vite as `c:/...` (lowercase drive letter) and `vite build` fails with `[vite:html-inline-proxy] Could not load .../index.html?html-proxy&inline-css...`. From PowerShell (`C:\Users\...`) it works. `npm test` works from either.

To verify a change end-to-end (not just `vite dev`), run `npm run build` then `npx serve dist` and check a deep URL like `/city/berlin` — `vite dev` alone does not exercise the prerender/SSG path.

There is no linter. The tests (`tests/*.test.mjs`) cover cost parsing: every `costDetail` must be a range `mín–máx€/mes` (a single figure fails the test), plus cost sorting and the «Asequible» tag (`isAffordable()` in `src/lib/cities.js`).

## Architecture

### SSG-over-SPA for SEO

This is a client-rendered React app, but production builds add a static-site-generation pass so crawlers get real HTML without executing JS:

1. `vite build` produces the normal client bundle (`dist/`).
2. `vite build --ssr src/entry-server.jsx` produces a server bundle (`.ssr-temp/`) purely for prerendering — never shipped to the browser.
3. `scripts/prerender.mjs` imports that SSR bundle, calls `renderPage(route)` for every route in `ALL_ROUTES`, and writes a fully-formed `dist/<route>/index.html` (real `<title>`, meta description, canonical, OG/Twitter tags, JSON-LD, and rendered body). It also (re)generates `dist/sitemap.xml` and `dist/robots.txt` from the same route list, overwriting the static copies in `public/`.

`src/entry-server.jsx` renders the same tree as the client (`src/AppShell.jsx`: skip link, ScrollRestoration, error boundary, `<Suspense>`, and the routes from `src/routes.js`) but with every page imported eagerly (no `lazy()`) — `renderToString` can't wait on Suspense, so a lazy page would prerender as just the loading fallback. Before rendering it awaits the route's `data` (the city's full data chunk). `App.jsx` is the real client entry and lazy-loads every page except `HomePage` with `lazyPage()` (`src/lib/lazyPage.js`, preloadable).

**Hydration**: `src/main.jsx` *hydrates* the prerendered HTML (`hydrateRoot`) instead of wiping and repainting it, so hero animations don't replay and lazy routes never flash empty. Before hydrating it awaits the current page's chunk and data (the prerender adds `<link rel="modulepreload">` for them plus the page's CSS, from Vite's manifest, and `data-path` on `#root`). It falls back to `createRoot` when `data-path` ≠ the URL (404.html) or the URL carries state the prerender doesn't know (`urlState` in `src/routes.js`: `?region`/`?ver`/`?buscar` on home, `?cities`/`?view` on /comparar, `?r` on /city-match, a hash on /proceso). **The first client render must equal the server HTML**: never read `localStorage`, `window`, `matchMedia`, the query/hash or the current time in a render or `useState` initializer — read them in an effect (`useStoredState` for persisted state, `useSyncExternalStore` with a server snapshot as in `useTheme`), or declare the query param in `urlState`. A mismatch logs `[hidratación]` in the console. Client navigations use react-router's `v7_startTransition`: the old page stays until the new one is ready, with the thin `RouteLoader` bar (`NavigationProgress`) after 150 ms.

**Route/meta sync point**: `entry-server.jsx`'s `STATIC_PAGE_META` object hand-duplicates the title/description each static page passes to `useSEO()`. If you add a page or change its `useSEO()` call, update `STATIC_PAGE_META` (and `ALL_ROUTES`) too, or the prerendered HTML and sitemap will silently drift from what the client renders.

### Data / logic / UI layering

The project enforces a strict separation (stated in `ARCHITECTURE.md`):

- **Data** only in `src/data/` — `cities.js` (base fields for all cities: name, region, cost, images, neighborhoods, tips, etc.), `insights.js` (`CITY_INSIGHTS`: detailed per-category scores and subcategories — falls back to `DEFAULT_INSIGHTS(city)` when a city has no entry), `cityExperiences.js` (`CITY_EXPERIENCES`: **only real student experiences** received through the «Comparte tu experiencia» form and approved by hand — never invent or generate opinions/testimonials; plus `FOUNDER_EXPERIENCE`, which never counts as a user opinion), `cityPopulation.js` (`CITY_POPULATION`: official municipal population + year + national statistics office per city; `getCitySize()` buckets it for City Match's size question), plus smaller fixture files (`cityWhatsappGroups.js`, `universityErasmusLinks.js`, `weatherSeasons.js`, `comparePhrases.js`).
- **Generated city data** (`src/data/generated/`, gitignored): `scripts/city-data.mjs` builds it from `cities.js` + `insights.js` + `cityPopulation.js` at the start of every `vite build`/`vite dev` (plugin in `vite.config.js`) and before `npm test` (`pretest`). `cityIndex.js` is the light index of all cities (card/search/filter fields, the 8 category scores, `overall`, `size`, `nature`) that ships in the entry bundle; `cities/<slug>.js` is one city's full data + insights, loaded with `import()` only when needed. **Client code must never import `data/cities` or `data/insights`** (that put 1.5 MB in the entry bundle); only `entry-server.jsx` (SSR, never shipped), `CreditosPage` (lazy, noindex) and the scripts/tests do. Category labels/icons/colors live once in `src/data/scoreCategories.js` (the generator fails the build if a city's differ).
- **Logic** only in `src/lib/cities.js` — the single place that exposes the index (`getAllCities`, `getCityBySlug`, `getScoreMap`, `getOverallScore`), loads full city data (`loadCityDetail`/`getLoadedCityDetail`; hooks `useCityDetail` (suspends) and `useCityDetails` (doesn't) in `src/hooks/useCityDetail.js`), filters/sorts, rankings, related cities, favorites/compare persistence (localStorage/sessionStorage), and SEO meta objects. Pure formulas the generator precomputes (overall score, size buckets, City Match's nature level) live in `src/lib/cityMetrics.js`. Add new city-related behavior here, not in components/pages.
- **Reactive state** only in `src/hooks/` — `useCityFilter`, `useFavorites`, `useSEO`.
- **Types** only in `src/types/index.ts` — plain TypeScript interfaces used as JSDoc `@typedef` imports in `.js` files (the project is JS + TS types, not full TS; `tsconfig.json` has `checkJs: false`, `noEmit: true` — TS is type-checking-only, not compiled).
- **UI** in `src/components/` (shared) and `src/components/city/` (city-detail-page-specific sections: hero, bento highlights, weather timeline, neighborhoods, tips, related cities), pages in `src/pages/`.

Scores have a single source: the 8 per-category 0–10 scores in `CITY_INSIGHTS` (`src/data/insights.js`). `getScoreMap()` exposes them per category and `getOverallScore()` is their equal-weight mean (`computeOverallScore` in `src/lib/cityMetrics.js`, precomputed into the index), so the global score always matches the categories shown on the city page and in the world map. The public explanation lives in `src/components/MethodologyNote.jsx` (and the home FAQ): if you change the calculation, update those texts too. Scores are MAbroad's own editorial assessment — never present them as official data or as student opinions.

### Adding a new city

Documented in detail in `ARCHITECTURE.md`. Short version: add an entry to `CITIES` in `src/data/cities.js` (required — drives the grid, search, filters, rankings), optionally add coordinates in `WorldMap.jsx`'s coordinate map for the interactive map, and optionally add a `CITY_INSIGHTS` entry in `src/data/insights.js` for detailed scores (otherwise defaults are used).

**Flags:** the data keeps each country flag as an emoji (`emoji: "🇮🇹"`), but Windows renders flag emojis as two letters, so the UI never prints them directly: render `<Flag emoji={city.emoji} />` (`src/components/Flag.jsx`; `SvgFlag` inside the map SVG), which draws the matching symbol from the `src/assets/flags.svg` sprite (imported with `?url`, so it ships as a hashed, immutable asset) and falls back to the emoji if the sprite lacks it. After adding a city from a country that was not there yet, run `npm run flags:sprite` (`scripts/build-flags.mjs`: scans `src/` for flag emojis and rebuilds the sprite plus `src/data/flagSprite.js` from the MIT `country-flag-icons` package) and commit both files.

**City photos:** use a Wikimedia Commons file whose original is at least 1920×1080 (Wikimedia silently *upscales* thumbnails larger than the original, so a small original looks blurry even at "1920px"). After adding or changing any Wikimedia URL in `src/data/`, run `npm run photos:meta` to refresh `src/data/wikimediaPhotos.js` — the single source per photo: original width/height/bytes **plus author and license**. The photo credits (the ⓘ `PhotoCredit` badge on each photo and the noindex `/creditos` page, via `src/lib/photoCredits.js`) read from it, so they update automatically. `src/lib/images.js` uses that table to build `srcset`s that only ask for standard thumbnail widths (120/250/330/500/960/1280/1920/3840; other widths get rate-limited) and never exceed the original. Render photos with `responsiveImage(url, { slots })` or `heroImage(url)`, not a bare `src`, and add `<PhotoCredit src={url} corner=… />` (with `nested` when the photo sits inside a clickable card/button, so no interactive element is nested). `slots` gives each breakpoint's box width *and* aspect ratio, because with `object-fit: cover` a landscape photo in a portrait card is drawn much wider than the card.

### Routing

`react-router-dom` v6, routes defined once in `src/routes.js` (`ROUTES`: path → page name, optional `data`/`dataModule`/`urlState`/`redirect`), used by the client (`App.jsx`'s `PAGES` map), the prerender (`entry-server.jsx`'s `PAGES` map) and `main.jsx`: `/`, `/city/:slug`, `/proceso`, `/comparar`, `/learning-agreement`, `/beca-erasmus`, `/city-match`, `/tipos-de-intercambio`, `/privacidad` (aviso legal + política de privacidad; `/aviso-legal` redirects there via `vercel.json` and a `<Navigate>` route), `/creditos`, `/guias` and `/guias/:slug`. Guides are data in `src/data/guides.js` (inline `[text](url)` links, typed blocks, official source next to each fact, hypothetical examples labelled as such); `src/lib/guides.js` holds their logic/meta and `getGuideJsonLd` (Article) lives in `src/lib/seo.js`. Adding a guide to `GUIDES` adds its route to `ALL_ROUTES`, the sitemap and the `/guias` index automatically. A `STATIC_PAGE_META` entry with `noindex: true` is prerendered with `<meta name="robots" content="noindex">`, no canonical, and is left out of the sitemap. When adding a page: add it to `ROUTES`, to both `PAGES` maps (lazy in `App.jsx`, eager in `entry-server.jsx`), and to `ALL_ROUTES`/`STATIC_PAGE_META` in `entry-server.jsx` for prerendering + sitemap generation.

### Styling

Mix of a global stylesheet (`src/styles/global.css`, CSS variables) and CSS Modules (`ComponentName.module.css`) for individual components/pages — check which pattern a neighboring file uses before adding new styles.

**Reduced motion is tiered** (see "MOVIMIENTO REDUCIDO POR NIVELES" in `global.css`): under `prefers-reduced-motion: reduce` a global net cuts every animation/transition to ~0 by default. Small, slow, in-place, user-initiated effects (photo hover zoom inside its frame, opacity fades) opt out by declaring `--motion-safe-duration` next to their `transition`. The hero video keeps playing (it has a pause button; only `saveData` drops it to the poster). Don't gate hover zoom on `prefers-reduced-motion: no-preference` — the `--hover-*` tokens already soften it (1.07/650ms/6px lift normally; 1.04/800ms/no lift with reduced motion).

### Icons

`src/components/icons/` holds one hand-authored SVG React component per icon (`IconX.jsx`), re-exported through `src/components/icons/index.js`. Add new icons following that same one-file-per-icon + barrel-export pattern rather than inlining SVG in page/component files.

### Deployment

Deployed on Vercel (`vercel.json`): `buildCommand` runs the full `npm run build` (client + SSR + prerender) and serves `dist/`. Security headers and a report-only CSP are set there — `connect-src`/`img-src`/etc. allowlists need updating in `vercel.json` if new external hosts (fonts, APIs, image CDNs) are introduced. `src/lib/seo.js` defines `SITE_URL` used for canonical URLs, OG tags, sitemap, and robots.txt — verify it matches the actual deployed domain before relying on generated SEO output.

**IndexNow (Bing)**: the public key lives in `public/<key>.txt` and `scripts/indexnow-config.mjs`. In production builds (`VERCEL_ENV=production`) the prerender compares a per-URL content hash against the live `indexnow-manifest.json` and publishes `indexnow-changed.json` (new/changed/deleted canonical URLs); if the previous manifest is missing or unreadable it lists every indexable URL (so no change is lost), and it never fails the build. After a successful production deploy, Vercel's `repository_dispatch` event `vercel.deployment.success` triggers `.github/workflows/indexnow.yml` → `scripts/indexnow-notify.mjs`, which waits until `www.mabroad.com` serves that commit, checks the key file is published, and only then POSTs to Bing (retrying network errors, 5xx and 429; if it still fails the job exits 1 so it can be re-run). Previews never notify. `SITE_URL` is duplicated in `indexnow-notify.mjs` — keep it in sync with `src/lib/seo.js`.

**FAQ**: `src/data/faqs.js` is the single source for the visible FAQ (home, `/beca-erasmus`) and their `FAQPage` JSON-LD (`HOME_JSON_LD`/`BECA_JSON_LD` in `src/lib/seo.js`, used by the pages and by `entry-server.jsx`). Answers stay in the HTML with `hidden` when collapsed.

## Reglas de flujo de trabajo

- Nunca pruebes ni navegues la web tras hacer cambios (no levantes el servidor para comprobar visualmente) — solo revisa el código si quieres verificar que está bien. Las pruebas visuales las hace el usuario.
- Nunca pidas permiso antes de avanzar. Actúa siempre según tu propio criterio y hazlo, salvo que el usuario indique explícitamente una excepción para ese caso concreto.

## Trabajo con Codex

En este repo también trabaja Codex (plugin `codex@openai-codex`). Las normas comunes están en `AGENTS.md`:

@AGENTS.md

### Flujo de cada tarea (Claude + Codex, sin Miguel de puente)

1. **Claude Code hace la tarea.**
2. **Revisión de Codex antes del push**: al terminar, Claude le pide a Codex que revise el diff y verifique los datos contra fuentes oficiales, siempre en modo solo lectura:
   ```powershell
   Get-Content prompt.txt -Raw -Encoding utf8 | codex exec -s read-only --ephemeral --color never -c 'web_search="live"' -o respuesta.txt -
   ```
   (prompt y respuesta en el scratchpad, no en el repo; no cortar la salida con `Select-Object -First`, que mata el proceso).
3. **Si Codex encuentra fallos**, Claude los corrige y vuelve a pedir revisión: **máximo 2 rondas**. Si siguen sin estar de acuerdo, Claude decide con su criterio y lo apunta en el resumen.
4. **Después**: `npm test` y `npm run build` (desde PowerShell) sin errores, commit y `git push` a `main` **sin preguntar** a Miguel.
5. **Resumen final**: incluye una línea con lo que encontró Codex.

`vercel --prod` sigue necesitando que Miguel lo pida (el push a `main` ya despliega solo en Vercel).
