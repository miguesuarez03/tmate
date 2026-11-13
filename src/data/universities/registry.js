// ─────────────────────────────────────────────────────────────────────────────
// Registro de universidades del modo «Mi universidad».
//
// Cada universidad tiene su archivo de plazas (<id>.json, extraído de su
// portal de movilidad, con el formato de loyola.json: university, degrees,
// agreementTypes, relations[]) y su mapeo a ciudades de MAbroad
// (<id>.cities.json, generado por `npm run universities:match`).
//
// Los datos solo se descargan cuando alguien elige la universidad (`load`):
// sin universidad elegida la web no carga nada de esto.
// Para añadir otra universidad: su <id>.json con el mismo formato, una
// entrada aquí y `npm run universities:match`.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {object} UniversityEntry
 * @property {string} id         también es el valor de ?uni= en la URL
 * @property {string} name
 * @property {string} shortName
 * @property {string} file       archivo de plazas en esta carpeta
 * @property {() => Promise<[any, any]>} load  [plazas, mapeo relationId → slug]
 */

/** @type {UniversityEntry[]} */
export const UNIVERSITY_REGISTRY = [
  {
    id: "loyola",
    name: "Universidad Loyola Andalucía",
    shortName: "Loyola",
    file: "loyola.json",
    load: () => Promise.all([import("./loyola.json"), import("./loyola.cities.json")]).then(([d, m]) => [d.default, m.default]),
  },
];

/** @param {string | null | undefined} id */
export function getUniversityEntry(id) {
  return UNIVERSITY_REGISTRY.find((u) => u.id === id) ?? null;
}
