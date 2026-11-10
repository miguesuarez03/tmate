/**
 * cityExperiences.js — MAbroad
 *
 * EXPERIENCIAS REALES de estudiantes, por ciudad. Solo entra aquí lo que
 * llega por el formulario «Comparte tu experiencia» (Web3Forms → tu correo)
 * y has REVISADO Y APROBADO a mano. Nada inventado ni de relleno.
 *
 * Cómo añadir una:
 *   1. El correo de Web3Forms trae un bloque «para_publicar» ya formateado.
 *   2. Pégalo dentro del array de su ciudad (la clave es el slug de la ficha,
 *      el mismo de la URL: /city/rosenheim → rosenheim).
 *   3. NUNCA copies el email de la persona: no se publica.
 *
 * Campos de cada experiencia:
 *   name            Nombre o alias que eligió la persona (se publica tal cual)
 *   year            Año del intercambio (número)
 *   homeUniversity  Universidad de origen
 *   text            Su texto (puedes corregir erratas, no cambiar el sentido)
 *   rating          Valoración de 1 a 5 — opcional, omítela si no la dio
 *
 * Ejemplo (NO es real, solo el formato):
 *   rosenheim: [
 *     { name: "Laura", year: 2026, homeUniversity: "Universidad de Granada", text: "…", rating: 5 },
 *   ],
 *
 * En cuanto haya al menos una, la portada deja de mostrar «Mi experiencia» y
 * pasa a mostrar las experiencias de la gente, y la ficha de esa ciudad las
 * enseña en lugar del «Todavía no hay experiencias…».
 *
 * @typedef {import('../types').CityExperience} CityExperience
 * @type {Record<string, CityExperience[]>}
 */
export const CITY_EXPERIENCES = {};

/**
 * Tu experiencia como fundador. Es real, pero va aparte para que NO cuente
 * como «opinión de la gente»: la portada sigue en el estado «Mi experiencia»
 * hasta que llegue la primera experiencia real de otra persona.
 *
 * - `story`: los párrafos de la portada, bajo el titular «Hola, soy Miguel.».
 *   Edítalos con tus palabras.
 * - `short`: la versión corta de las tarjetas (ficha de Rosenheim y, cuando
 *   haya opiniones, la tarjeta de la portada).
 * - `photo`: retrato de la portada, dentro de /public. Vertical 4:5 (640 × 800
 *   px o más), con la cara en el tercio superior. Si es null, se ve un hueco
 *   de marca con tu inicial.
 * - `avatar`: la misma foto recortada en cuadrado sobre la cara (160 × 160),
 *   para el círculo pequeño de las tarjetas.
 *
 * @type {import('../types').FounderExperience}
 */
export const FOUNDER_EXPERIENCE = {
  name: "Miguel",
  role: "Fundador de MAbroad",
  studies: "Ingeniería Industrial",
  homeUniversity: "Universidad Loyola (Sevilla)",
  hostUniversity: "TH Rosenheim",
  citySlug: "rosenheim",
  photo: "/equipo/miguel.jpg",
  avatar: "/equipo/miguel-avatar.jpg",
  story: [
    "Estudio Ingeniería Industrial en la Universidad Loyola, en Sevilla, y ahora mismo estoy de Erasmus en la TH Rosenheim.",
    "Hago MAbroad para que el siguiente que se vaya lo tenga más claro que yo: qué ciudad le encaja, cuánto va a cobrar de beca y cómo sacar adelante el Learning Agreement sin perderse por el camino.",
    "Y aquí entras tú. Si ya has vuelto de tu intercambio, o estás fuera ahora, cuéntalo: tu experiencia es justo lo que le falta al siguiente que se va.",
  ],
  short:
    "Estudio Ingeniería Industrial en la Universidad Loyola (Sevilla) y estoy de Erasmus aquí, en la TH Rosenheim. Hago MAbroad para que el siguiente que se vaya lo tenga más claro que yo.",
};
