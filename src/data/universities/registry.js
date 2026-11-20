// ─────────────────────────────────────────────────────────────────────────────
// Registro de universidades del modo «Mi universidad».
//
// Cada universidad tiene su archivo de convenios (<id>.json, extraído de su
// portal de movilidad, con el formato de loyola.json: university, degrees,
// agreementTypes, relations[]) y su mapeo a ciudades de MAbroad
// (<id>.cities.json, generado por `npm run universities:match`).
//
// Los datos solo se descargan cuando alguien elige la universidad (`load`):
// sin universidad elegida la web no carga nada de esto. Este registro sí va
// en el bundle inicial, así que aquí solo hay datos cortos (nombre, campus,
// enlaces oficiales).
// Para añadir otra universidad: su <id>.json con el mismo formato, una
// entrada aquí y `npm run universities:match`. Ningún componente nombra a
// una universidad concreta: todo sale de aquí.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {object} UniversityCampus
 * @property {string} id
 * @property {string} name     cómo se enseña («Sevilla (Dos Hermanas)»)
 * @property {string} origin   ciudad de origen para la calculadora de la beca
 *                             (una de ORIGIN_CITIES de BecaErasmusPage)
 *
 * @typedef {object} UniversityFact
 * @property {string} text
 * @property {string} source   URL oficial donde se dice
 *
 * @typedef {object} UniversityLink
 * @property {string} label
 * @property {string} url
 * @property {string} desc
 *
 * @typedef {object} UniversityEntry
 * @property {string} id         también es el valor de ?uni= en la URL
 * @property {string} name
 * @property {string} shortName
 * @property {string} file       archivo de convenios en esta carpeta
 * @property {string[]} studyAgreementTypes  tipos de convenio que son de
 *   estudios (cuatrimestre o curso). Los demás (p. ej. MAGIS) van aparte, en
 *   «Otros programas», y no cuentan en contadores, mapa, comparador ni City Match.
 * @property {UniversityCampus[]} campuses
 * @property {{ office: string, facts: UniversityFact[], links: UniversityLink[] }} official
 *   Información oficial de movilidad saliente para el bloque «En <universidad>»
 *   de Proceso y Learning Agreement. Solo con fuente oficial.
 * @property {() => Promise<[any, any]>} load  [convenios, mapeo relationId → slug]
 */

const LOYOLA_INTERCAMBIO = "https://www.uloyola.es/servicios/oficina-internacional/intercambio-de-estudios/como-funciona-el-intercambio";
const LOYOLA_OUTGOING = "https://www.uloyola.es/servicios/oficina-internacional/intercambio-de-estudios/estudiantes-de-intercambio";
const LOYOLA_OFICINA = "https://www.uloyola.es/servicios/oficina-internacional";

/** @type {UniversityEntry[]} */
export const UNIVERSITY_REGISTRY = [
  {
    id: "loyola",
    name: "Universidad Loyola Andalucía",
    shortName: "Loyola",
    file: "loyola.json",
    studyAgreementTypes: ["Erasmus-SMS", "Bilateral studies", "SICUE"],
    // https://www.uloyola.es/servicios/infraestructuras/nuestros-campus
    // La página lista también Granada; no se ofrece como origen hasta que
    // Loyola confirme qué grados se cursan allí (ver PROPUESTAS.md).
    campuses: [
      { id: "sevilla", name: "Sevilla (Dos Hermanas)", origin: "Sevilla" },
      { id: "cordoba", name: "Córdoba", origin: "Córdoba" },
    ],
    official: {
      office: "Oficina Internacional",
      facts: [
        { text: "Las solicitudes se presentan en el portal de movilidad de Loyola (MoveOn).", source: LOYOLA_INTERCAMBIO },
        { text: "Hay una convocatoria ordinaria en otoño y una extraordinaria en febrero; en la extraordinaria no se ofrecen todos los destinos.", source: LOYOLA_INTERCAMBIO },
        { text: "Para destinos de países no hispanohablantes se pide como mínimo un B1 acreditado con certificado oficial; cada destino puede exigir un nivel más alto.", source: LOYOLA_INTERCAMBIO },
        { text: "Tras la asignación aceptas el destino en MoveOn y un tutor académico te ayuda a preparar el Learning Agreement.", source: LOYOLA_OUTGOING },
      ],
      links: [
        { label: "Cómo funciona el intercambio", url: LOYOLA_INTERCAMBIO, desc: "Convocatorias, requisitos y baremo" },
        { label: "Estudiantes de intercambio", url: LOYOLA_OUTGOING, desc: "Qué hacer después de la asignación" },
        { label: "Oficina Internacional", url: LOYOLA_OFICINA, desc: "Contacto y cita previa" },
      ],
    },
    // <id>.notes.json: observaciones separadas a mano (ver getRelationNotes()).
    load: () =>
      Promise.all([import("./loyola.json"), import("./loyola.cities.json"), import("./loyola.notes.json")])
        .then(([d, m, n]) => [{ ...d.default, notesOverrides: n.default }, m.default]),
  },
];

/** @param {string | null | undefined} id */
export function getUniversityEntry(id) {
  return UNIVERSITY_REGISTRY.find((u) => u.id === id) ?? null;
}
