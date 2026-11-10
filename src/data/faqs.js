// ─────────────────────────────────────────────────────────────────────────────
// Preguntas frecuentes — FUENTE ÚNICA.
// De aquí salen tanto el texto visible (HomePage, BecaErasmusPage) como el
// JSON-LD FAQPage (getFaqJsonLd en src/lib/seo.js), en el cliente y en el
// prerender (entry-server.jsx). Si cambias una respuesta, cambia aquí y las
// dos versiones siguen idénticas, como exige el marcado FAQPage.
// Solo texto plano (sin JSX) para que sirva también al JSON-LD.
// ─────────────────────────────────────────────────────────────────────────────

import { CITIES } from "./cities";

/** FAQ de la home. */
export const HOME_FAQS = [
  {
    q: "¿Es gratis usar MAbroad?",
    a: "Sí. Puedes explorar todos los destinos, comparar ciudades, hacer el City Match y pedirnos ayuda con tu propuesta de Learning Agreement sin pagar nada y sin registrarte.",
  },
  {
    q: "¿Qué es el Learning Agreement y para qué sirve?",
    a: "Es el documento que fija el programa de estudios que seguirás en el extranjero, para que te reconozcan lo que apruebes allí. Lo aprueban tú, tu universidad y la de destino antes de empezar la estancia. En MAbroad te explicamos cómo prepararlo y te ayudamos con una propuesta de equivalencias, pero el documento oficial se tramita con tu universidad.",
  },
  {
    q: "¿Cuántas ciudades tenéis?",
    a: `Ahora mismo hay ${CITIES.length} destinos de intercambio, cada uno con notas de 0 a 10 en 8 categorías (coste de vida, alojamiento, vida social, seguridad…), universidades, clima y consejos. Seguimos añadiendo ciudades.`,
  },
  {
    q: "¿Cómo funcionan los scores de las ciudades?",
    a: "Cada ciudad tiene una nota de 0 a 10 en 8 categorías: coste de vida, alojamiento, vida social, integración internacional, movilidad, estilo de vida, empleo y seguridad. Es una valoración propia de MAbroad, no un dato oficial: se basa en la información de cada ficha (precios orientativos, transporte, clima, oferta universitaria…). La nota global es la media de las 8 categorías.",
  },
  {
    q: "¿Puedo comparar varias ciudades a la vez?",
    a: "Sí. El comparador de MAbroad te permite poner varias ciudades lado a lado y ver todas sus métricas de golpe. Es la forma más rápida de decidirte.",
  },
  {
    q: "¿Por dónde empiezo si acabo de confirmar mi plaza?",
    a: "Lo primero es explorar tu destino para saber qué esperar. Después, tramita el Learning Agreement cuanto antes — es lo más urgente y lo que más se suele dejar para el final.",
  },
  {
    q: "¿De dónde salen los datos y cuándo se actualizan?",
    a: "Los importes de beca y ayuda de viaje siguen la convocatoria Erasmus+ 2026 del SEPIE y la Guía del Programa de la Comisión Europea, pero el importe oficial es el que publica tu universidad. El resto (coste de vida, transporte, ambiente) son valoraciones y cifras aproximadas de MAbroad. En cada ficha y en el comparador puedes abrir «Cómo calculamos estos datos» para ver el método y la fecha de la última revisión.",
  },
];

/** FAQ de /beca-erasmus. */
export const BECA_FAQS = [
  {
    q: "¿Hay que devolver la beca Erasmus?",
    a: "No, salvo que no realices la estancia, la abandones sin justificación válida, no entregues la documentación obligatoria o incumplas las condiciones del programa. Si cumples todo, el dinero es tuyo.",
  },
  {
    // Fuente: Carta del Estudiante Erasmus+ (Comisión Europea), apartado
    // «Before the mobility period» → derecho a prefinanciación:
    // https://erasmus-plus.ec.europa.eu/resources-and-tools/erasmus-student-charter-0
    // La Carta no fija el porcentaje del anticipo ni la fecha del saldo final:
    // eso lo concreta el convenio de cada universidad.
    q: "¿Cuándo se cobra la beca?",
    a: "El convenio de subvención que firmas con tu universidad indica cuándo se paga el anticipo, qué documentos tienes que entregar y cuándo se liquida el resto. Según la Carta del Estudiante Erasmus+, tienes derecho a recibir una prefinanciación en los 30 días naturales siguientes a la firma del convenio por ambas partes o a la recepción de la confirmación de llegada, y no más tarde de la fecha de inicio de la movilidad. Revisa en tu convenio qué activa el pago y ten un colchón para los primeros meses.",
  },
  {
    q: "¿Qué es el complemento de 'menos oportunidades'?",
    a: "Un extra de +250€/mes para estudiantes con beca MEC por criterios económicos, familias numerosas, personas con discapacidad u otros colectivos definidos en cada convocatoria. Consúltalo con tu ORI porque los requisitos exactos varían.",
  },
  {
    // Fuentes: SEPIE, «Información sobre financiación de los proyectos
    // Erasmus+ — Convocatoria 2026», apdo. 3.3.2 (todos los estudiantes
    // reciben ayuda de viaje según los importes de la Guía del Programa):
    // https://www.sepie.es/doc/convocatoria/2026/infofinanciacioneplus2026.pdf
    // y la Guía del Programa Erasmus+ 2026 (tarifas estándar y de viaje
    // ecológico por franja de distancia; glosario, p. 446: viaje ecológico =
    // medios de bajas emisiones en al menos la mitad del viaje de ida y vuelta):
    // https://erasmus-plus.ec.europa.eu/sites/default/files/2025-11/programme-guide-2026_en.pdf#page=446
    q: "¿Qué es Green Travel?",
    a: "No es una ayuda aparte: es la modalidad ecológica de la ayuda de viaje. Si al menos la mitad del viaje de ida y vuelta la haces en medios con bajas emisiones (por ejemplo, autobús, tren, bici o coche compartido), tu ayuda de viaje se calcula con la tarifa de viaje ecológico, que puede ser mayor que la estándar según la franja de distancia. Las dos tarifas son importes fijos por franja que marca la Guía del Programa; tu universidad te dirá qué justificantes del viaje pide.",
  },
  {
    // Fuentes: SEPIE, tabla de importes KA131 de la convocatoria 2026
    // (https://sepie.es/doc/newsletter/2026/65/importes_ka1_hed.pdf) y el
    // documento de financiación 2026, apdo. 3.3.4: las instituciones deciden
    // los importes dentro de los rangos, los publican y los aplican por igual
    // a todos los estudiantes del mismo grupo de países y tipo de movilidad.
    q: "¿Los importes son iguales en todas las universidades?",
    a: "No. El SEPIE fija para cada grupo de países un rango mensual, y cada universidad decide su importe dentro de ese rango para su proyecto, según su presupuesto, y lo publica en su web. Además, puede sumar ayudas propias. Por eso dos estudiantes que van al mismo país desde universidades distintas pueden cobrar cantidades distintas.",
  },
];
