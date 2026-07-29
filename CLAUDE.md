# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TMate — a React SPA (in Spanish) that helps students pick an Erasmus/study-abroad city: city listings, detail pages, a comparator, a "City Match" quiz, a scholarship (beca) calculator, and Learning Agreement guidance. Content and UI copy are in Spanish; code comments are also largely in Spanish.

There is no backend — everything is static data in `src/data/`, and the "build" step prerenders every route to static HTML for SEO (see below). No test framework or linter is configured in this repo.

## Commands

```bash
npm run dev            # vite dev server
npm run build:client    # vite build → dist/ (client bundle)
npm run build:ssr        # vite build --ssr src/entry-server.jsx --outDir .ssr-temp (SSR bundle, temp)
npm run prerender        # node scripts/prerender.mjs — renders every route to static HTML in dist/
npm run build             # runs the three steps above in order (this is the real production build)
npm run preview           # vite preview — serve dist/ locally after a build
```

To verify a change end-to-end (not just `vite dev`), run `npm run build` then `npx serve dist` and check a deep URL like `/city/berlin` — `vite dev` alone does not exercise the prerender/SSG path.

There are no lint or test scripts configured.

## Architecture

### SSG-over-SPA for SEO

This is a client-rendered React app, but production builds add a static-site-generation pass so crawlers get real HTML without executing JS:

1. `vite build` produces the normal client bundle (`dist/`).
2. `vite build --ssr src/entry-server.jsx` produces a server bundle (`.ssr-temp/`) purely for prerendering — never shipped to the browser.
3. `scripts/prerender.mjs` imports that SSR bundle, calls `renderPage(route)` for every route in `ALL_ROUTES`, and writes a fully-formed `dist/<route>/index.html` (real `<title>`, meta description, canonical, OG/Twitter tags, JSON-LD, and rendered body). It also (re)generates `dist/sitemap.xml` and `dist/robots.txt` from the same route list, overwriting the static copies in `public/`.

`src/entry-server.jsx` mirrors the routes in `src/App.jsx` but imports every page eagerly (no `lazy()`) — `renderToString` can't wait on Suspense, so a lazy page would prerender as just the loading fallback. `App.jsx` is the real client entry and *does* lazy-load everything except `HomePage`.

**Route/meta sync point**: `entry-server.jsx`'s `STATIC_PAGE_META` object hand-duplicates the title/description each static page passes to `useSEO()`. If you add a page or change its `useSEO()` call, update `STATIC_PAGE_META` (and `ALL_ROUTES`) too, or the prerendered HTML and sitemap will silently drift from what the client renders.

### Data / logic / UI layering

The project enforces a strict separation (stated in `ARCHITECTURE.md`):

- **Data** only in `src/data/` — `cities.js` (base fields for all cities: name, region, cost, images, neighborhoods, tips, etc.), `insights.js` (`CITY_INSIGHTS`: detailed per-category scores, subcategories, reviews — falls back to `DEFAULT_INSIGHTS(city)` when a city has no entry), plus smaller fixture files (`cityBaseScores.js`, `cityWhatsappGroups.js`, `universityErasmusLinks.js`, `weatherSeasons.js`, `comparePhrases.js`).
- **Logic** only in `src/lib/cities.js` — the single place that computes overall scores, filters/sorts, rankings, related cities, favorites/compare persistence (localStorage/sessionStorage), and SEO meta objects. Add new city-related behavior here, not in components/pages.
- **Reactive state** only in `src/hooks/` — `useCityFilter`, `useFavorites`, `useSEO`.
- **Types** only in `src/types/index.ts` — plain TypeScript interfaces used as JSDoc `@typedef` imports in `.js` files (the project is JS + TS types, not full TS; `tsconfig.json` has `checkJs: false`, `noEmit: true` — TS is type-checking-only, not compiled).
- **UI** in `src/components/` (shared) and `src/components/city/` (city-detail-page-specific sections: hero, bento highlights, weather timeline, neighborhoods, tips, related cities), pages in `src/pages/`.

Note there are two score sources that must stay conceptually aligned: `CITY_BASE_SCORES` in `src/lib/cities.js` (per-category 0–10 "researched" baseline used by `getOverallScore`) and `CITY_INSIGHTS` in `src/data/insights.js` (the richer per-category breakdown with subcategories/reviews shown in the UI). `getScoreMap()` reads categories from insights; `getOverallScore()` reads the separate `CITY_BASE_SCORES` table.

### Adding a new city

Documented in detail in `ARCHITECTURE.md`. Short version: add an entry to `CITIES` in `src/data/cities.js` (required — drives the grid, search, filters, rankings), optionally add coordinates in `WorldMap.jsx`'s coordinate map for the interactive map, and optionally add a `CITY_INSIGHTS` entry in `src/data/insights.js` for detailed scores (otherwise defaults are used).

### Routing

`react-router-dom` v6, routes defined in `src/App.jsx` (client) and mirrored in `src/entry-server.jsx` (SSR/prerender): `/`, `/city/:slug`, `/proceso`, `/comparar`, `/learning-agreement`, `/beca-erasmus`, `/city-match`. Keep both files' `<Routes>` in sync when adding/removing a route, and update `ALL_ROUTES`/`STATIC_PAGE_META` in `entry-server.jsx` for prerendering + sitemap generation.

### Styling

Mix of a global stylesheet (`src/styles/global.css`, CSS variables) and CSS Modules (`ComponentName.module.css`) for individual components/pages — check which pattern a neighboring file uses before adding new styles.

### Icons

`src/components/icons/` holds one hand-authored SVG React component per icon (`IconX.jsx`), re-exported through `src/components/icons/index.js`. Add new icons following that same one-file-per-icon + barrel-export pattern rather than inlining SVG in page/component files.

### Deployment

Deployed on Vercel (`vercel.json`): `buildCommand` runs the full `npm run build` (client + SSR + prerender) and serves `dist/`. Security headers and a report-only CSP are set there — `connect-src`/`img-src`/etc. allowlists need updating in `vercel.json` if new external hosts (fonts, APIs, image CDNs) are introduced. `src/lib/seo.js` defines `SITE_URL` used for canonical URLs, OG tags, sitemap, and robots.txt — verify it matches the actual deployed domain before relying on generated SEO output.
