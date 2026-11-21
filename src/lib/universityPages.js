// ─────────────────────────────────────────────────────────────────────────────
// Carga de los datos de /universidades/<id> (src/data/generated/universities/,
// de scripts/city-data.mjs). Va aparte de universities.js porque vite.config.js
// importa el generador, y este a universities.js, ANTES de que exista
// src/data/generated/: un import() de esa carpeta ahí rompe el build en limpio.
// ─────────────────────────────────────────────────────────────────────────────

import { UNIVERSITY_REGISTRY } from "../data/universities/registry.js";

// Datos de /universidades/<id>: un chunk por universidad, bajo demanda (el
// prerender y main.jsx los esperan antes de pintar; ver src/routes.js).
const pageCache = new Map();

/** Carga los datos de la página de una universidad (null si no existe). */
export function loadUniversityPage(id) {
  if (!UNIVERSITY_REGISTRY.some((u) => u.id === id)) return Promise.resolve(null);
  let entry = pageCache.get(id);
  if (!entry || entry.error) {
    entry = {};
    entry.promise = import(`../data/generated/universities/${id}.js`).then(
      (mod) => (entry.value = mod.default),
      (err) => { entry.error = err; throw err; }
    );
    pageCache.set(id, entry);
  }
  return entry.promise;
}

/** Datos ya cargados de la página de una universidad, o null. */
export function getLoadedUniversityPage(id) {
  return pageCache.get(id)?.value ?? null;
}

/** Error de la última carga fallida, o null. */
export function getUniversityPageError(id) {
  return pageCache.get(id)?.error ?? null;
}

