/**
 * cityExperiences.js — MAbroad
 *
 * EXPERIENCIAS Y CONSEJOS REALES de estudiantes, por ciudad: la sección «Lo que
 * dicen los que viven allí» de cada ficha. Solo entra aquí lo que una persona
 * real te ha contado (por el formulario «Comparte tu experiencia», que llega a
 * tu correo con Web3Forms, o directamente a ti) y has REVISADO Y APROBADO a
 * mano, con su permiso para publicarlo. Nada inventado ni de relleno.
 *
 * Cómo añadir una:
 *   1. El correo de Web3Forms trae un bloque «para_publicar» ya formateado.
 *   2. Pégalo dentro del array de su ciudad (la clave es el slug de la ficha,
 *      el mismo de la URL: /city/rosenheim → rosenheim).
 *   3. Si quieres, pasa sus consejos concretos a `tips`, uno por tema.
 *   4. NUNCA copies el email de la persona: no se publica.
 *
 * Campos de cada experiencia (hace falta `text`, `tips` o los dos):
 *   name            Nombre o alias que eligió la persona
 *   anonymous       true → no se publica el nombre: sale «Estudiante de
 *                   <homeUniversity>». Cámbialo aquí si alguien lo pide.
 *   homeUniversity  Universidad de origen
 *   hostUniversity  Universidad de destino — opcional
 *   course          Curso del intercambio: "2026-27"
 *   text            Su experiencia con sus palabras (corrige erratas, no el sentido)
 *   tips            Sus consejos: [{ topic, text }], con `topic` una clave de
 *                   EXPERIENCE_TOPICS (abajo). Los datos (precios, nombres)
 *                   se verifican antes de publicarlos.
 *   rating          Valoración de 1 a 5 — opcional, omítela si no la dio
 *
 * Ejemplo (NO es real, solo el formato):
 *   granada: [
 *     {
 *       name: "Laura", anonymous: false,
 *       homeUniversity: "Universidad de Sevilla", hostUniversity: "Universidad de Granada",
 *       course: "2026-27",
 *       tips: [{ topic: "transporte", text: "…" }, { topic: "ocio", text: "…" }],
 *       rating: 5,
 *     },
 *   ],
 *
 * En la portada: con la primera, las tarjetas aparecen como sección aparte
 * debajo de «Hola, soy Miguel»; a partir de HOME_EXPERIENCES_REPLACE_FOUNDER_AT
 * (abajo), sustituyen a ese bloque. La ficha de cada ciudad las enseña en
 * lugar de la invitación «¿Estás de Erasmus aquí?».
 *
 * @typedef {import('../types').CityExperience} CityExperience
 * @type {Record<string, CityExperience[]>}
 */
export const CITY_EXPERIENCES = {
  roma: [
    {
      // Consejos que Lucía le pasó a Miguel (noviembre de 2026). Si prefiere
      // salir sin nombre, cambia `anonymous` a true.
      name: "Lucía",
      anonymous: false,
      homeUniversity: "Universidad Loyola",
      course: "2026-27",
      tips: [
        {
          topic: "transporte",
          text: "Si te quedas el curso entero, coge el abono anual de Metrebus (250 €, vale 365 días desde que lo recargas) en vez del mensual de 35 €: es el que coge la mayoría.",
        },
        {
          topic: "alojamiento",
          text: "Si estudias en La Sapienza, busca en Piazza Bologna, San Giovanni o San Lorenzo. San Lorenzo está pegado al campus, es más barato para salir y tiene muchísima vida; de noche, como cualquier zona de fiesta, mejor ir atento y volver acompañado.",
        },
        {
          topic: "ocio",
          text: "Para salir barato, Bar San Calisto, en Trastevere: la Peroni grande (66 cl) está a unos 2,50 €.",
        },
      ],
    },
  ],
};

/**
 * Cuántos testimonios publicados (de todas las ciudades, sin contar el del
 * fundador) hacen falta para que las tarjetas de la portada sustituyan al
 * bloque «Hola, soy Miguel». Por debajo, salen las dos cosas: el bloque y,
 * debajo, las tarjetas.
 */
export const HOME_EXPERIENCES_REPLACE_FOUNDER_AT = 6;

/**
 * Temas de los consejos (`tips[].topic`) y su etiqueta en la tarjeta.
 * @type {Record<import('../types').ExperienceTopic, string>}
 */
export const EXPERIENCE_TOPICS = {
  transporte: "Transporte",
  alojamiento: "Dónde vivir",
  ocio: "Ocio barato",
  compras: "Supermercados",
  apps: "Apps útiles",
  universidad: "Universidad",
  otros: "Otros consejos",
};

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
  course: "2026-27",
  photo: "/equipo/miguel.jpg",
  avatar: "/equipo/miguel-avatar.jpg",
  story: [
    "Estudio Ingeniería Industrial en la Universidad Loyola, en Sevilla, y ahora mismo estoy de Erasmus en la TH Rosenheim.",
    "Hago MAbroad para que el siguiente que se vaya lo tenga más claro que yo: qué ciudad le encaja, cuánto va a cobrar de beca y cómo sacar adelante el Learning Agreement sin perderse por el camino.",
    "Y aquí entras tú. Si ya has vuelto de tu intercambio, o estás fuera ahora, cuéntalo: tu experiencia es justo lo que le falta al siguiente que se va.",
  ],
  short:
    "Estudio Ingeniería Industrial en la Universidad Loyola (Sevilla) y estoy de Erasmus aquí, en la TH Rosenheim. Hago MAbroad para que el siguiente que se vaya lo tenga más claro que yo.",
  // Consejos de Rosenheim (ficha de la ciudad). Más adelante: universidad y alojamiento.
  tips: [
    {
      topic: "transporte",
      text: "Pide el Deutschland-Ticket rebajado para estudiantes en Baviera: con el certificado de matrícula de la TH, la MVG te lo deja en 43 €/mes en vez de 63 € (46,80 € desde enero de 2027). Vale para todo el transporte regional y urbano de Alemania.",
    },
    {
      topic: "apps",
      text: "DB Navigator para los trenes de toda Alemania y la MVV-App para el bus de Rosenheim. En Múnich, MVGO.",
    },
    {
      topic: "compras",
      text: "Casi todos los Erasmus compramos en Lidl: es de lo más barato y el surtido se parece al de Mercadona o al Lidl de España. Aldi también es barato.",
    },
  ],
};
