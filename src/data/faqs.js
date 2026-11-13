// ─────────────────────────────────────────────────────────────────────────────
// Preguntas frecuentes — FUENTE ÚNICA.
// De aquí salen tanto el texto visible (HomePage, BecaErasmusPage) como el
// JSON-LD FAQPage (getFaqJsonLd en src/lib/seo.js), en el cliente y en el
// prerender (entry-server.jsx). Si cambias una respuesta, cambia aquí y las
// dos versiones siguen idénticas, como exige el marcado FAQPage.
// Texto plano (sin JSX) para que sirva también al JSON-LD. Admite el formato
// inline de las guías, [texto](/ruta) o [texto](#ancla): en pantalla lo pinta
// GuideText como enlace y el JSON-LD lo quita (plainInline en src/lib/seo.js).
// ─────────────────────────────────────────────────────────────────────────────

// FAQ de la home: lo que de verdad pregunta un estudiante con plaza.
// Verificado el 13/11/2026 contra fuentes oficiales:
// · Cambios del Learning Agreement («within five weeks after the start of each
//   semester»; el plazo real lo fija cada universidad):
//   https://erasmus-plus.ec.europa.eu/resources-and-tools/mobility-and-learning-agreements/learning-agreements/studies-agreement-guidelines-ka131
// · Carta del Estudiante Erasmus+ (prefinanciación en 30 días, reconocimiento
//   pleno de lo aprobado según el LA, seguro):
//   https://erasmus-plus.ec.europa.eu/es/resources-and-tools/erasmus-student-charter-0
// · Importes y ayuda de viaje 2026 (rangos por grupo; máx. 674 €/mes, grupo 1):
//   https://www.sepie.es/doc/newsletter/2026/65/importes_ka1_hed.pdf
// · Modelo de convenio de subvención (saldo tras el EU Survey, cláusula 5.2;
//   seguro de salud, responsabilidad civil y accidentes, cláusula 7):
//   https://relint.uva.es/wp-content/uploads/2026/05/Convenio-Subvencion-Convocatoria-Practicas-Erasmus-26-27.pdf
// · Fianzas: Alemania, §551 BGB (hasta 3 meses) https://www.gesetze-im-internet.de/bgb/__551.html ;
//   Países Bajos (2 meses) https://www.government.nl/themes/building-and-housing/housing/rented-housing/step-by-step-plan-for-tenants ;
//   antiestafa (ECC-Net Alemania) https://www.evz.de/themen/einkaufen-digitales/betrugsmaschen/mietbetrug/
// · Trabajo: https://europa.eu/youreurope/citizens/work/work-abroad/work-permits/index_es.htm ;
//   Reino Unido https://www.gov.uk/government/publications/student-route-caseworker-guidance/student-and-child-student
//   y https://www.gov.uk/standard-visitor
// · TSE: https://prestaciones.seg-social.es/servicio/tarjeta-sanitaria-europea-certificado-provisional-sustitutorio.html
//   y https://europa.eu/youreurope/citizens/health/unplanned-healthcare/temporary-stays/index_es.htm
// · ESN y buddy programs: https://esn.org/sections
// «Gratis» y «de dónde salen los datos» viven en el footer (Layout.jsx).
export const HOME_FAQS = [
  {
    q: "¿Por dónde empiezo si acabo de confirmar mi plaza?",
    a: "Lo primero, vigila el correo: la universidad de destino suele pedirte su propia solicitud (application) con un plazo que se pasa con facilidad. A la vez, empieza el [Learning Agreement](/learning-agreement), que tienen que aprobar tu universidad y la de destino y suele ser lo que más se alarga, y firma el convenio de subvención antes de irte, porque sin él no cobras la beca. Con eso encarrilado, busca alojamiento y mira la [ficha de tu ciudad](#destinos) para saber qué te espera. Tienes todo el paso a paso en [Cómo funciona el Erasmus](/proceso).",
  },
  {
    q: "¿Cuánto dinero necesito al mes y cuánto me cubre la beca?",
    a: "Depende mucho de la ciudad: en la [ficha de cada destino](#destinos) tienes el coste de vida mensual en rango, con alquiler, comida y transporte. La beca Erasmus+ es una ayuda mensual que va según el grupo de países, y cada universidad fija su importe dentro del rango del SEPIE; suele sumarse una ayuda de viaje según la distancia y, si te corresponde, un complemento por menos oportunidades, con condiciones que dependen de tu universidad. En muchas ciudades no llega a cubrirlo todo, así que cuenta con ahorros o con ayuda de casa. En la [calculadora de beca](/beca-erasmus) ves cuánto te tocaría y cuánto te faltaría en tu destino.",
  },
  {
    q: "¿Cuándo y cómo se cobra la beca Erasmus+?",
    a: "Te la paga tu universidad, según el convenio de subvención que firmas antes de irte. Lo normal es un primer pago al principio y el resto al volver, cuando entregas el certificado de estancia y rellenas el informe final (EU Survey), pero cuántos pagos hay y en qué fechas depende de cada universidad. Según la Carta del Estudiante Erasmus+, el primer pago tiene que llegarte como tarde 30 días después de firmar el convenio o el día que empieza la estancia, si eso es antes (si tu universidad pide la confirmación de llegada, cuenta esa fecha en lugar del inicio, salvo para estudiantes con menos oportunidades). Aun así, lleva un colchón para el primer mes, que es el más caro.",
  },
  {
    q: "¿Cómo encuentro piso sin que me estafen?",
    a: "No pagues nada, ni fianza ni reserva, sin haber visto el piso (en persona o por videollamada en directo con alguien dentro) y sin tener el contrato firmado. Desconfía si el casero dice estar en el extranjero y nadie puede enseñártelo, si el precio es muy bajo para la zona, si te meten prisa o si te pide pagar por Western Union o similares. Si te piden más de un mes de fianza, comprueba que la ley del país lo permite (en Alemania se admiten hasta tres meses de alquiler sin gastos y en Países Bajos dos de alquiler base), y nunca la pagues antes de firmar. Busca en plataformas conocidas, pregunta en la oficina internacional de tu universidad de destino y en ESN, y mira en la [ficha de tu ciudad](#destinos) los barrios y precios orientativos para saber qué es normal.",
  },
  {
    q: "¿Qué pasa si no me convalidan una asignatura o tengo que cambiar el Learning Agreement?",
    a: "Puede pasar y está previsto: al llegar puedes pedir cambios en el Learning Agreement si una asignatura se cancela, te choca de horario o no encaja. Las directrices de la Comisión Europea dan cinco semanas desde el inicio de cada semestre para pedirlos, pero el procedimiento y el plazo real los marca cada universidad, así que habla con tu coordinador en cuanto veas el problema: los cambios tienen que aprobarlos tu universidad y la de destino. Lo que esté en el Learning Agreement firmado y apruebes, tu universidad tiene que reconocértelo (lo dice la Carta del Estudiante Erasmus+), por eso cualquier cambio tiene que quedar firmado y no solo hablado. En el [asistente del Learning Agreement](/learning-agreement) tienes cómo prepararlo y qué revisar antes de irte.",
  },
  {
    q: "¿Puedo trabajar durante el Erasmus?",
    a: "Si tienes la nacionalidad de un país de la UE, puedes trabajar en cualquier otro país de la UE sin permiso de trabajo y con los mismos derechos que sus trabajadores; en Noruega, Islandia, Liechtenstein y Suiza también hay libre circulación, pero con normas propias. En Reino Unido depende de cómo entres: con visado de estudiante para un grado a tiempo completo lo normal es poder trabajar hasta 20 horas a la semana en periodo lectivo (lo pone tu permiso), pero si vas como visitante (estudios de hasta 6 meses) no puedes trabajar. Fuera de Europa manda el visado de estudiante: unos países permiten algunas horas a la semana y otros nada, así que mira qué dice el tuyo antes de buscar. Y que el horario no se coma las clases, que lo primero son las asignaturas del Learning Agreement.",
  },
  {
    q: "¿Necesito seguro médico o me basta con la tarjeta sanitaria europea?",
    a: "La Tarjeta Sanitaria Europea, que se pide gratis a la Seguridad Social, te cubre la atención necesaria en la sanidad pública durante tu estancia en la UE, el EEE, Suiza y Reino Unido, con los mismos derechos que la gente de allí (si allí se copaga, tú también). No cubre la sanidad privada ni la repatriación, así que merece la pena un seguro privado. Además, tu universidad tiene que asegurarse de que vas con seguro de salud, responsabilidad civil y accidentes: pregúntale si lo contrata ella o te toca a ti. Fuera de esos países la tarjeta no sirve y necesitas un seguro médico, que lo normal es que te pidan para el visado o la matrícula.",
  },
  {
    q: "¿Y si me cuesta hacer amigos o me siento solo al principio?",
    a: "Es de lo más normal y le pasa a mucha gente las primeras semanas, aunque en redes parezca que los demás ya tienen grupo. Apúntate a las actividades de ESN si hay sección en tu ciudad y al buddy program de tu universidad si lo tiene, y métete en los grupos de WhatsApp de estudiantes, que suelen pasar ESN o la propia universidad. Di que sí a planes aunque te dé pereza, sobre todo al principio, que es cuando todos están igual de perdidos. Si pasan las semanas y sigues mal, cuéntaselo a la oficina internacional: muchas universidades tienen servicios de apoyo.",
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
    a: "El convenio de subvención que firmas con tu universidad indica cuándo se paga el anticipo, qué documentos tienes que entregar y cuándo se liquida el resto. Según la Carta del Estudiante Erasmus+, tienes derecho a recibir una prefinanciación como tarde 30 días naturales después de que ambas partes firméis el convenio o, si eso sucede antes, en la fecha de inicio de la movilidad. Si tu universidad pide la confirmación de llegada, esa confirmación sustituye a la fecha de inicio (salvo para participantes con menos oportunidades). Revisa en tu convenio qué activa el pago y ten un colchón para los primeros meses.",
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
