// ─────────────────────────────────────────────────────────────────────────────
// Guías de MAbroad (/guias y /guias/:slug) — FUENTE ÚNICA del contenido.
//
// Reglas editoriales:
//  - Cada dato oficial lleva su enlace a la fuente oficial justo al lado.
//  - Nada inventado: si un dato no está en una fuente oficial, no se pone.
//  - Los ejemplos con nombres de personas o importes de una universidad son
//    HIPOTÉTICOS y lo dicen (bloque "example"); nunca son becas reales.
//  - Las cifras de coste de vida son estimaciones orientativas de MAbroad (las
//    de cada ficha), no datos oficiales.
//
// Formato de texto: "[texto](url)" crea un enlace (interno si empieza por "/",
// externo a la fuente si no) y "**texto**" pone negrita. Bloques:
//   { type: "p", text }                         párrafo
//   { type: "list", items, ordered? }           lista
//   { type: "checklist", items }                lista de comprobación
//   { type: "table", caption, head, rows }      tabla (celdas con el mismo formato)
//   { type: "example", title, text | items }    ejemplo hipotético (se rotula)
//   { type: "note", text }                      aviso destacado
// ─────────────────────────────────────────────────────────────────────────────

// Fuentes oficiales usadas en varias guías.
const SRC = {
  sepieImportes: "https://www.sepie.es/doc/newsletter/2026/65/importes_ka1_hed.pdf",
  sepieFinanciacion: "https://www.sepie.es/doc/convocatoria/2026/infofinanciacioneplus2026.pdf",
  govukErasmus2027: "https://www.gov.uk/government/news/uk-and-eu-finalise-agreement-to-bring-uk-into-erasmus-in-2027",
  sefriMovilidad: "https://www.sbfi.admin.ch/en/international-mobility-and-cooperation-in-education",
  programmeGuide2026: "https://erasmus-plus.ec.europa.eu/sites/default/files/2025-11/programme-guide-2026_en.pdf",
  // p. 66: movilidad con beca cero; p. 446 (glosario): definición de viaje ecológico.
  programmeGuide2026ZeroGrant: "https://erasmus-plus.ec.europa.eu/sites/default/files/2025-11/programme-guide-2026_en.pdf#page=66",
  programmeGuide2026Green: "https://erasmus-plus.ec.europa.eu/sites/default/files/2025-11/programme-guide-2026_en.pdf#page=446",
  studyingAbroad: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/studying-abroad",
  reportingPresence: "https://europa.eu/youreurope/citizens/residence/documents-formalities/reporting-presence/index_es.htm",
  // Ejemplos reales de universidades (no reglas generales):
  uvicPracticas: "https://www.uvic.cat/es/internacional/out/becas/erasmus-practicas-sepie",
  ugrMovilidad: "https://www.ugr.es/destacado/convocatorias-movilidad-internacional-grado",
  ucmNoAsociados: "https://www.ucm.es/erasmus-paises-no-asociados-26-27",
  heMobility: "https://erasmus-plus.ec.europa.eu/programme-guide/part-b/key-action-1/higher-education-mobility-projects",
  studentCharter: "https://erasmus-plus.ec.europa.eu/resources-and-tools/erasmus-student-charter-0",
  learningAgreements: "https://erasmus-plus.ec.europa.eu/resources-and-tools/mobility-and-learning-agreements/learning-agreements",
  laGuidelinesKa131: "https://erasmus-plus.ec.europa.eu/resources-and-tools/mobility-and-learning-agreements/learning-agreements/studies-agreement-guidelines-ka131",
  laGuidelinesKa171: "https://erasmus-plus.ec.europa.eu/resources-and-tools/mobility-and-learning-agreements/learning-agreements/studies-agreement-guidelines-ka171",
  residenceStudents: "https://europa.eu/youreurope/citizens/residence/residence-rights/students/index_es.htm",
  entryExit: "https://europa.eu/youreurope/citizens/travel/entry-exit/eu-citizen/index_es.htm",
  ehic: "https://employment-social-affairs.ec.europa.eu/policies-and-activities/moving-working-europe/eu-social-security-coordination/european-health-insurance-card_es",
  ehicSegSocial: "https://prestaciones.seg-social.es/servicio/tarjeta-sanitaria-europea-certificado-provisional-sustitutorio.html?categoria=certificados",
  iban: "https://finance.ec.europa.eu/consumer-finance-and-payments/payment-services/payment-services/iban-discrimination_en",
  roaming: "https://europa.eu/youreurope/citizens/consumers/internet-telecoms/mobile-roaming-costs/index_es.htm",
  registroViajeros: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/Paginas/Registro-de-viajeros.aspx",
};

const REVIEWED = "2026-11-11";
// Guías revisadas por la vuelta de Reino Unido a Erasmus+ (curso 2027-28).
const REVIEWED_UK = "2026-11-12";

/** @type {Array<import('../types').Guide>} */
export const GUIDES = [
  // ── 1. BECA ────────────────────────────────────────────────────────────────
  {
    slug: "beca-erasmus-cuanto-se-cobra",
    title: "Beca Erasmus+ 2026/27: cuánto se cobra y cuándo llega",
    seoTitle: "Beca Erasmus+ 2026/27: cuánto se cobra y cuándo | MAbroad",
    description:
      "Rangos oficiales del SEPIE por grupo de países, complementos de +250 € y +150 €, ayuda de viaje, cuándo llega el anticipo y un ejemplo de cálculo.",
    summary: "Rangos oficiales por país, complementos, ayuda de viaje y cuándo cobras el anticipo.",
    datePublished: REVIEWED,
    dateModified: REVIEWED_UK,
    intro:
      "La beca Erasmus+ no es una cifra única: depende del país al que vas, de lo que decida tu universidad dentro de unos rangos oficiales y de si te corresponde algún complemento. Aquí tienes los números de la convocatoria 2026, de dónde salen y qué preguntar en tu oficina de relaciones internacionales (ORI) para saber lo que vas a cobrar tú.",
    sections: [
      {
        id: "convocatoria-y-curso",
        heading: "Convocatoria no es lo mismo que curso",
        blocks: [
          { type: "p", text: "Cuando leas «convocatoria 2026», no la confundas con el curso en el que te vas. La convocatoria es el año en que el SEPIE concede a tu universidad el proyecto de movilidad del que sale el dinero de tu beca. Una estancia del curso 2026/27 puede pagarse con ese proyecto o con uno anterior, según cómo organice tu universidad sus fondos." },
          { type: "p", text: "Un ejemplo real: la página de becas Erasmus+ de prácticas de la [Universitat de Vic](" + SRC.uvicPracticas + ") vincula las estancias del curso 2026/27 a su proyecto de la convocatoria 2025. No es una regla general: cada universidad lo organiza a su manera." },
          { type: "p", text: "Por eso los rangos de esta guía son los de la convocatoria 2026, pero el dato que manda en tu caso es la tabla de importes que publique tu universidad para tu plaza. Si en la web de tu ORI aparecen dos tablas, pregunta cuál se aplica a tu estancia." },
        ],
      },
      {
        id: "cuanto",
        heading: "Cuánto se cobra al mes: los tres grupos de países",
        blocks: [
          { type: "p", text: "Para estancias de estudios de larga duración, la ayuda mensual depende del coste de vida del país de destino. El SEPIE fija un rango para cada grupo y cada universidad elige su importe dentro de él ([tabla de importes KA131 de la convocatoria 2026](" + SRC.sepieImportes + "))." },
          {
            type: "table",
            caption: "Ayuda individual mensual para estudios, convocatoria 2026 (SEPIE)",
            head: ["Grupo", "Países (UE y asociados)", "Rango mensual"],
            rows: [
              ["Grupo 1 · coste de vida alto", "Alemania, Austria, Bélgica, Dinamarca, Finlandia, Francia, Irlanda, Islandia, Italia, Liechtenstein, Luxemburgo, Noruega, Países Bajos y Suecia", "350–674 €"],
              ["Grupo 2 · coste de vida medio", "Chequia, Chipre, Eslovaquia, Eslovenia, España, Estonia, Grecia, Letonia, Malta y Portugal", "300–606 €"],
              ["Grupo 3 · coste de vida bajo", "Bulgaria, Croacia, Hungría, Lituania, Macedonia del Norte, Polonia, Rumanía, Serbia y Turquía", "250–550 €"],
            ],
          },
          { type: "p", text: "El grupo 1 incluye también algunos países no asociados al programa, como Reino Unido y Suiza ([documento de financiación 2026 del SEPIE](" + SRC.sepieFinanciacion + "), apartado 3.3.2). Que estén en la tabla no significa que tu universidad tenga plazas Erasmus+ allí: lo explicamos en la [guía sobre Erasmus+ e intercambios fuera de Europa](/guias/erasmus-o-intercambio-fuera-de-europa)." },
          { type: "p", text: "Reino Unido vuelve a Erasmus+ en el curso 2027-28 ([Gobierno británico](" + SRC.govukErasmus2027 + ")). Su grupo e importe como país del programa los fijará la convocatoria 2027 del SEPIE; mientras tanto, la [calculadora](/beca-erasmus) lo estima con el grupo 1 y lo marca como estimación." },
          { type: "p", text: "Según ese mismo documento (apartado 3.3.4), las universidades deciden sus importes según su presupuesto, deben publicarlos en su web, no pueden cambiarlos durante el convenio y dan **la misma cantidad base a todos los estudiantes que van al mismo grupo de países** con el mismo tipo de movilidad. Los complementos de abajo y la financiación especial de Canarias se suman aparte, así que el total sí puede variar entre compañeros. Y dos estudiantes que van a Italia desde universidades distintas pueden tener bases diferentes." },
        ],
      },
      {
        id: "complementos",
        heading: "Complementos: menos oportunidades y prácticas",
        blocks: [
          { type: "p", text: "Encima de la cantidad base puede haber dos complementos mensuales ([tabla de importes 2026](" + SRC.sepieImportes + ")):" },
          {
            type: "list",
            items: [
              "**+250 € al mes para estudiantes con menos oportunidades**, si encajas en alguno de los perfiles del SEPIE.",
              "**+150 € al mes si tu movilidad es de prácticas** en una empresa u organización. Es compatible con el anterior.",
            ],
          },
          { type: "p", text: "Los perfiles de menos oportunidades de la convocatoria 2026 incluyen, entre otros, tener reconocida una discapacidad igual o superior al 33 %, haber sido beneficiario de la beca general del Ministerio (o de la del Departamento de Educación del País Vasco) en el curso anterior o en el de la movilidad, que tu familia cobre el Ingreso Mínimo Vital o una renta mínima, pertenecer a una familia numerosa o monoparental, tener la condición de refugiado o estudiar en Ceuta o Melilla. La lista completa y sus condiciones están en el [documento de financiación del SEPIE](" + SRC.sepieFinanciacion + ") (apartado 3.3.2). Los estudiantes de universidades de Canarias tienen una financiación especial." },
        ],
      },
      {
        id: "viaje",
        heading: "La ayuda de viaje y el viaje ecológico",
        blocks: [
          { type: "p", text: "En la convocatoria 2026, las movilidades con financiación Erasmus+ incluyen también una ayuda de viaje con los importes de la Guía del Programa ([SEPIE, apartado 3.3.2](" + SRC.sepieFinanciacion + "); [Guía del Programa 2026](" + SRC.programmeGuide2026 + ")). Ojo: también existen las movilidades con «beca cero», en las que participas en el programa sin recibir fondos Erasmus+ ([Guía del Programa 2026, p. 66](" + SRC.programmeGuide2026ZeroGrant + "))." },
          { type: "p", text: "La ayuda de viaje es una cantidad fija por franja de distancia, con dos tarifas: la estándar y la de viaje ecológico, que puede ser mayor según la franja. Cuenta como viaje ecológico el que haces en medios con bajas emisiones (por ejemplo, autobús, tren, bici o coche compartido) en al menos la mitad del viaje de ida y vuelta ([Guía del Programa 2026, glosario, p. 446](" + SRC.programmeGuide2026Green + "))." },
          { type: "p", text: "Por ejemplo, para la franja de 500 a 1.999 km la tabla del SEPIE da 309 € con la tarifa estándar y 417 € con la ecológica ([tabla 2026](" + SRC.sepieImportes + ")). Tu universidad te dirá qué justificantes del viaje te pide para aplicar la tarifa ecológica." },
        ],
      },
      {
        id: "cuando",
        heading: "Cuándo llega el dinero",
        blocks: [
          { type: "p", text: "Antes de irte firmarás un convenio de subvención con tu universidad: ahí se dice cuánto cobras, en cuántos pagos y qué documentos tienes que entregar para cada uno. La [Carta del Estudiante Erasmus+](" + SRC.studentCharter + ") te reconoce el derecho a recibir una prefinanciación en los 30 días naturales siguientes a la firma del convenio por ambas partes o a la recepción de la confirmación de llegada, y no más tarde de la fecha de inicio de la movilidad." },
          { type: "p", text: "La Carta no fija qué porcentaje es ese anticipo ni cuándo se paga el resto: eso lo concreta tu convenio. Lo prudente es contar con ahorros para el primer mes de alquiler y la fianza, que suelen pagarse antes de que llegue nada." },
          { type: "p", text: "La misma Carta recoge que puedes seguir cobrando las becas o préstamos de estudios de tu país mientras estás fuera, así que la beca Erasmus+ no te quita la beca general que ya tengas." },
        ],
      },
      {
        id: "ejemplo",
        heading: "Un ejemplo de cálculo",
        blocks: [
          {
            type: "example",
            title: "Ejemplo hipotético: cinco meses en Bolonia",
            items: [
              "Lucía (estudiante inventada para el ejemplo) se va cinco meses completos a [Bolonia](/city/bolonia) con una plaza con financiación Erasmus+. Italia está en el grupo 1 y su universidad (también hipotética) ha publicado 450 € al mes, dentro del rango de 350–674 €.",
              "Ayuda individual: 5 × 450 € = 2.250 €. Si además tuvo la beca general del Ministerio, le corresponde el complemento de menos oportunidades: 5 × 250 € = 1.250 € más, en total 3.500 €.",
              "Gastos: supongamos que Lucía calcula 750 € al mes entre alquiler, comida y transporte (cifra hipotética), es decir, 3.750 € en cinco meses. Sin complemento le faltarían 1.500 €; con él, 250 €.",
              "Ayuda de viaje, aparte: si su trayecto cae en la franja de 500 a 1.999 km, 309 € con la tarifa estándar o 417 € si al menos la mitad del viaje de ida y vuelta lo hace en tren o autobús. Sirve para el billete, no para el día a día.",
              "Conclusión: según sus gastos reales, la beca puede no cubrirlo todo. Mira el presupuesto que estimamos en la [ficha de Bolonia](/city/bolonia) y haz tus números con el [estimador de la beca](/beca-erasmus).",
            ],
          },
        ],
      },
      {
        id: "preguntas-ori",
        heading: "Qué preguntar en tu ORI",
        blocks: [
          {
            type: "checklist",
            items: [
              "Qué importe mensual habéis publicado para el grupo de mi destino y con qué convocatoria se paga mi plaza.",
              "Cuántos pagos hay, qué porcentaje es el anticipo y qué lo activa (firma del convenio, certificado de llegada…).",
              "Qué documentos tengo que entregar al volver para cobrar el resto.",
              "Si me corresponde el complemento de menos oportunidades y qué tengo que acreditar.",
              "Qué justificantes pedís para la tarifa de viaje ecológico.",
              "Si hay ayudas de la universidad o de mi comunidad autónoma compatibles con la Erasmus+.",
            ],
          },
          { type: "p", text: "Y si todavía no tienes destino, la [guía para elegir destino](/guias/elegir-destino-erasmus) te ayuda a cruzar la beca con el coste de vida de cada ciudad." },
        ],
      },
    ],
    sources: [
      { label: "SEPIE — Tabla de importes KA131 (educación superior), convocatoria 2026", url: SRC.sepieImportes },
      { label: "SEPIE — Información sobre financiación de los proyectos Erasmus+, convocatoria 2026", url: SRC.sepieFinanciacion },
      { label: "GOV.UK — Acuerdo UE-Reino Unido para entrar en Erasmus+ en 2027", url: SRC.govukErasmus2027 },
      { label: "Comisión Europea — Guía del Programa Erasmus+ 2026 (beca cero, p. 66)", url: SRC.programmeGuide2026ZeroGrant },
      { label: "Comisión Europea — Guía del Programa Erasmus+ 2026 (viaje ecológico, glosario, p. 446)", url: SRC.programmeGuide2026Green },
      { label: "Comisión Europea — Carta del Estudiante Erasmus+", url: SRC.studentCharter },
      { label: "Universitat de Vic — Becas Erasmus+ de prácticas (ejemplo de curso y proyecto)", url: SRC.uvicPracticas },
    ],
    related: [
      { to: "/beca-erasmus", label: "Estimador de la beca Erasmus+" },
      { to: "/comparar", label: "Comparador de ciudades" },
      { to: "/city/bolonia", label: "Ficha de Bolonia" },
    ],
  },

  // ── 2. LEARNING AGREEMENT ──────────────────────────────────────────────────
  {
    slug: "learning-agreement-paso-a-paso",
    title: "Learning Agreement paso a paso: de la tabla A a las convalidaciones",
    seoTitle: "Learning Agreement Erasmus paso a paso | MAbroad",
    description:
      "Cómo preparar el Learning Agreement de estudios: tablas A y B, créditos, firmas antes de irte, plazos para cambiarlo y un ejemplo resuelto.",
    summary: "Tablas A y B, créditos, firmas, plazos para cambiarlo y un ejemplo resuelto.",
    datePublished: REVIEWED,
    dateModified: REVIEWED,
    intro:
      "El Learning Agreement es el documento que asegura que lo que apruebes fuera cuente en tu expediente. Bien hecho te ahorra disgustos a la vuelta; mal hecho, puede costarte asignaturas. Esta guía sigue las directrices oficiales de la Comisión Europea para movilidades de estudios dentro de Europa.",
    sections: [
      {
        id: "que-es",
        heading: "Qué es y quién lo firma",
        blocks: [
          { type: "p", text: "Es un acuerdo entre tres partes: tú, tu universidad de origen y la de destino. Fija qué vas a estudiar fuera y cómo se reconocerá en tu titulación, y tiene que estar aprobado por las tres **antes de que empiece la estancia** ([Comisión Europea, Learning Agreements](" + SRC.learningAgreements + ")). La Comisión está pasando el documento de papel a formato digital a través de Erasmus Without Paper, empezando por las movilidades de estudios dentro de Europa, así que lo normal es que lo prepares en la plataforma que use tu universidad." },
        ],
      },
      {
        id: "tablas",
        heading: "Las dos tablas que importan",
        blocks: [
          { type: "p", text: "Según las [directrices de la Comisión para el Learning Agreement de estudios (KA131)](" + SRC.laGuidelinesKa131 + "):" },
          {
            type: "table",
            caption: "Partes principales del Learning Agreement de estudios",
            head: ["Tabla", "Qué contiene", "Lo que debes saber"],
            rows: [
              ["Tabla A", "Las asignaturas que cursarás en la universidad de destino, con sus créditos.", "Usa los códigos y nombres del catálogo oficial de destino."],
              ["Tabla B", "Cómo se reconocerá ese paquete en tu universidad de origen.", "No hace falta que cada asignatura tenga una equivalente exacta: se reconoce el conjunto."],
            ],
          },
          { type: "p", text: "Las directrices toman como referencia unos 60 créditos ECTS por curso completo, proporcionales para estancias más cortas (en torno a 30 por semestre). Tu facultad puede tener sus propias reglas de créditos mínimos: pregúntale a tu coordinador académico." },
        ],
      },
      {
        id: "pasos",
        heading: "Paso a paso",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "**Habla con tu coordinador académico.** Pregúntale qué asignaturas de tu plan puedes cubrir fuera, si hay obligatorias que convenga dejar en origen y si existe un histórico de convalidaciones de otros años.",
              "**Busca el catálogo de destino.** Mira el catálogo de asignaturas para estudiantes de intercambio del curso en el que vas, no el del año pasado.",
              "**Monta la tabla A con margen.** Elige asignaturas que sumen los créditos que te piden y ten pensadas un par de alternativas por si alguna se llena o coincide en horario.",
              "**Propón la tabla B.** Indica qué parte de tu plan de estudios se reconocerá con ese paquete. Con el [asistente de Learning Agreement de MAbroad](/learning-agreement) puedes preparar una propuesta de equivalencias para llevar a tu coordinador.",
              "**Consigue las tres aprobaciones antes de irte.** Sin ellas no empieces la estancia: es la garantía de que se te reconocerá lo acordado.",
              "**Ajusta al llegar si hace falta.** Los cambios tienen su propio procedimiento (ver abajo).",
              "**Al terminar**, la universidad de destino emite tu certificado de notas y tu universidad de origen reconoce lo aprobado según lo firmado.",
            ],
          },
        ],
      },
      {
        id: "cambios",
        heading: "Cambiar el Learning Agreement durante la estancia",
        blocks: [
          { type: "p", text: "Al llegar puede pasar que una asignatura no se oferte, que dos coincidan en horario o que una sea distinta de lo esperado. Los cambios deberían ser la excepción, no la norma, y las [directrices KA131](" + SRC.laGuidelinesKa131 + ") marcan cómo hacerlos:" },
          {
            type: "list",
            items: [
              "Los cambios se piden dentro de las **5 semanas siguientes al inicio de cada semestre**.",
              "Las tres partes deberían acordarlos en las **2 semanas siguientes a la solicitud**.",
              "No se modifican las tablas originales: los cambios se recogen en el apartado de modificaciones durante la movilidad.",
            ],
          },
          { type: "note", text: "Hasta que el cambio esté aprobado por las tres partes, no des por hecho que la asignatura nueva se te reconocerá. Guarda los correos y el documento actualizado." },
        ],
      },
      {
        id: "ejemplo",
        heading: "Un ejemplo resuelto",
        blocks: [
          {
            type: "example",
            title: "Ejemplo hipotético: un semestre en Lisboa",
            items: [
              "Pablo (estudiante inventado) cursa ADE y se va un semestre a [Lisboa](/city/lisboa). Su facultad le pide unos 30 ECTS.",
              "Tabla A: cinco asignaturas de 6 ECTS del catálogo de intercambio de la universidad de destino (30 ECTS).",
              "Tabla B: cuatro asignaturas de su plan (24 ECTS) más 6 ECTS de optatividad. No hay una equivalencia exacta asignatura por asignatura, pero el conjunto encaja con su semestre.",
              "En la segunda semana descubre que una asignatura coincide en horario con otra. Pide el cambio dentro del plazo, propone otra de 6 ECTS y no da de baja la antigua hasta que las tres partes aprueban la modificación.",
            ],
          },
        ],
      },
      {
        id: "errores",
        heading: "Errores que más cuestan",
        blocks: [
          {
            type: "checklist",
            items: [
              "Dejarlo para el final: el catálogo de destino y las respuestas del coordinador tardan.",
              "Elegir asignaturas sin comprobar el idioma de docencia ni el semestre en que se imparten.",
              "Ir justo de créditos, sin alternativas por si una asignatura se cae.",
              "Cambiar de asignatura al llegar sin tramitar el cambio en plazo.",
              "No guardar copia del documento firmado y de cada modificación.",
            ],
          },
          { type: "p", text: "Si tu plaza pertenece a un proyecto KA171 (movilidad internacional con fondos de política exterior), se aplican sus [directrices específicas](" + SRC.laGuidelinesKa171 + "). Las plazas KA131, también las que van a países no asociados, siguen las de KA131; si dudas de qué tipo es la tuya, pregúntalo en tu ORI ([Comisión Europea, Learning Agreements](" + SRC.learningAgreements + ")). Y para el dinero de la estancia, mira la [guía de la beca Erasmus+](/guias/beca-erasmus-cuanto-se-cobra)." },
        ],
      },
    ],
    sources: [
      { label: "Comisión Europea — Learning Agreements", url: SRC.learningAgreements },
      { label: "Comisión Europea — Directrices del Learning Agreement de estudios (KA131)", url: SRC.laGuidelinesKa131 },
      { label: "Comisión Europea — Directrices del Learning Agreement de estudios (KA171)", url: SRC.laGuidelinesKa171 },
    ],
    related: [
      { to: "/learning-agreement", label: "Asistente de Learning Agreement" },
      { to: "/proceso", label: "El proceso Erasmus en 8 pasos" },
      { to: "/city/lisboa", label: "Ficha de Lisboa" },
    ],
  },

  // ── 3. ELEGIR DESTINO ──────────────────────────────────────────────────────
  {
    slug: "elegir-destino-erasmus",
    title: "Cómo elegir destino Erasmus sin equivocarte",
    seoTitle: "Cómo elegir destino Erasmus: criterios y ejemplo | MAbroad",
    description:
      "De los convenios de tu universidad a una lista ordenada: asignaturas, idioma, beca frente a coste de vida, tipo de ciudad y un ejemplo comparando destinos.",
    summary: "Convenios, asignaturas, idioma, beca frente a coste de vida y un ejemplo comparando ciudades.",
    datePublished: REVIEWED,
    dateModified: REVIEWED_UK,
    intro:
      "Elegir destino no es escoger la ciudad más bonita de Instagram: es encontrar el sitio donde vas a aprobar, poder pagarte el día a día y disfrutar. Este es el orden que te recomendamos para decidir, con las herramientas de MAbroad en cada paso.",
    sections: [
      {
        id: "convenios",
        heading: "1. Parte de la lista de convenios de tu universidad",
        blocks: [
          { type: "p", text: "Para una plaza de estudios Erasmus+ solo puedes optar a las plazas que tu universidad oferta para tu titulación, en universidades con las que tiene acuerdo ([Comisión Europea, estudiar en el extranjero](" + SRC.studyingAbroad + ")). Cada universidad las publica en su convocatoria de movilidad; por ejemplo, la [Universidad de Granada](" + SRC.ugrMovilidad + ") reúne sus convocatorias de movilidad internacional de grado en una página. Esa lista es tu universo real de opciones, y suele ser más corta (y más interesante) de lo que parece." },
          { type: "p", text: "Fíjate también en el tipo de plaza: no es lo mismo una plaza Erasmus+ dentro de Europa que un convenio bilateral con Suiza o fuera de Europa. Reino Unido vuelve a Erasmus+ en el curso 2027-28; si vas antes, su plaza también es un convenio. Lo explicamos en la [guía sobre Erasmus+ e intercambios fuera de Europa](/guias/erasmus-o-intercambio-fuera-de-europa) y en [tipos de intercambio](/tipos-de-intercambio)." },
        ],
      },
      {
        id: "criterios",
        heading: "2. Los criterios que de verdad pesan",
        blocks: [
          {
            type: "list",
            items: [
              "**Asignaturas.** Si no hay asignaturas que encajen con tu plan, el resto da igual. Mira el catálogo antes de enamorarte de una ciudad (te lo contamos en la [guía del Learning Agreement](/guias/learning-agreement-paso-a-paso)).",
              "**Idioma.** El de docencia y el de la calle. Algunas universidades piden un nivel acreditado: compruébalo en la web de la universidad de destino.",
              "**Dinero.** La beca depende del grupo del país y el gasto real, de la ciudad. Los cruzamos en el siguiente apartado.",
              "**Tipo de ciudad.** Grande o pequeña, universitaria o capital, con mar o con nieve. En cada ficha tienes clima por meses, barrios y consejos.",
              "**Distancia y viajes.** Cuánto cuesta volver a casa y qué tienes cerca para viajar.",
              "**Calendario.** Cada universidad tiene sus fechas de inicio, exámenes y vacaciones, y no siempre coinciden con las de la tuya. Míralas en su web antes de decidir, sobre todo si tienes que volver para algún examen o unas prácticas.",
            ],
          },
          { type: "p", text: "Ten en cuenta también cómo reparte las plazas tu universidad: cada una publica sus criterios en la convocatoria interna de movilidad. Si un destino es muy solicitado y tus criterios no te favorecen, pon detrás opciones que también te convenzan, en vez de rellenar la lista con cualquier cosa." },
        ],
      },
      {
        id: "beca-vs-coste",
        heading: "3. Beca frente a coste de vida: la cuenta que casi nadie hace",
        blocks: [
          { type: "p", text: "La beca depende del grupo del país, pero el gasto depende de la ciudad: alquiler, transporte y comida cambian mucho dentro de un mismo país. Por eso un destino de un grupo con beca más baja no siempre te deja con menos dinero a fin de mes. Los rangos de beca son los oficiales del SEPIE para la convocatoria 2026 ([tabla de importes](" + SRC.sepieImportes + "))." },
          {
            type: "table",
            caption: "Grupo de beca (SEPIE 2026) de algunos destinos de MAbroad",
            head: ["Ciudad", "Grupo de beca", "Beca mensual (rango oficial)", "Gasto estimado"],
            rows: [
              ["[Bolonia](/city/bolonia) (Italia)", "Grupo 1", "350–674 €", "[Ver en la ficha](/city/bolonia)"],
              ["[Berlín](/city/berlin) (Alemania)", "Grupo 1", "350–674 €", "[Ver en la ficha](/city/berlin)"],
              ["[Lisboa](/city/lisboa) (Portugal)", "Grupo 2", "300–606 €", "[Ver en la ficha](/city/lisboa)"],
              ["[Praga](/city/praga) (Chequia)", "Grupo 2", "300–606 €", "[Ver en la ficha](/city/praga)"],
              ["[Cracovia](/city/cracovia) (Polonia)", "Grupo 3", "250–550 €", "[Ver en la ficha](/city/cracovia)"],
            ],
          },
          { type: "p", text: "El gasto de cada ficha es una estimación orientativa de MAbroad, no un dato oficial: úsalo para comparar ciudades entre sí, no como presupuesto cerrado." },
          {
            type: "example",
            title: "Ejemplo hipotético: la cuenta que importa",
            items: [
              "Destino A, grupo 1: su universidad paga 450 € al mes y el estudiante calcula gastar 850 € al mes. Le faltan 400 € al mes.",
              "Destino B, grupo 3: su universidad paga 350 € al mes y calcula gastar 650 € al mes. Le faltan 300 € al mes.",
              "Con menos beca, B le cuesta 100 € menos al mes. Todas las cifras son inventadas: el importe de tu beca lo fija tu universidad dentro de cada rango y puedes probar tu caso en el [estimador de la beca](/beca-erasmus).",
            ],
          },
        ],
      },
      {
        id: "herramientas",
        heading: "4. Filtra y compara",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Haz el [City Match](/city-match): diez preguntas sobre presupuesto, clima, idioma y estilo de vida que ordenan los destinos según encajen contigo.",
              "Mete tus tres favoritas en el [comparador](/comparar) para verlas lado a lado por categorías.",
              "Abre la ficha de cada una: presupuesto, universidades, clima mes a mes y consejos.",
            ],
          },
          { type: "note", text: "Las notas de 0 a 10 de MAbroad son una valoración editorial propia, no un dato oficial ni una media de opiniones. Úsalas para comparar, y contrasta lo importante con la universidad." },
        ],
      },
      {
        id: "ejemplo",
        heading: "Un ejemplo de decisión",
        blocks: [
          {
            type: "example",
            title: "Ejemplo hipotético: Marta elige entre cuatro convenios",
            items: [
              "Marta (estudiante inventada) estudia Psicología y su facultad tiene convenio con Bolonia, Berlín, Lisboa y Cracovia.",
              "Descarta Berlín porque no encuentra asignaturas en inglés que encajen con su plan.",
              "Entre las otras tres, con un presupuesto ajustado, cruza el gasto estimado de cada ficha con el rango de beca de su grupo y con lo que paga su universidad.",
              "Con esa cuenta y las asignaturas que encaja en cada una, decide su orden y deja una tercera opción por si las otras se llenan.",
            ],
          },
        ],
      },
      {
        id: "lista",
        heading: "Antes de entregar tu lista de preferencias",
        blocks: [
          {
            type: "checklist",
            items: [
              "Todas las opciones son plazas que mi universidad oferta para mi titulación.",
              "He visto asignaturas compatibles en el catálogo de cada una.",
              "Cumplo el requisito de idioma que pida cada universidad de destino.",
              "He hecho la cuenta de beca frente a gasto de cada ciudad.",
              "Sé qué tipo de plaza es cada una (Erasmus+ o convenio bilateral).",
              "Tengo un orden pensado por si no me dan la primera.",
            ],
          },
          { type: "p", text: "Cuando tengas plaza, el siguiente paso son los papeles: lo tienes en la [guía de trámites antes de irte](/guias/tramites-antes-de-irte-erasmus)." },
        ],
      },
    ],
    sources: [
      { label: "Comisión Europea — Estudiar en el extranjero con Erasmus+", url: SRC.studyingAbroad },
      { label: "SEPIE — Tabla de importes KA131 (educación superior), convocatoria 2026", url: SRC.sepieImportes },
      { label: "SEPIE — Información sobre financiación de los proyectos Erasmus+, convocatoria 2026", url: SRC.sepieFinanciacion },
      { label: "Universidad de Granada — Convocatorias de movilidad internacional de grado (ejemplo)", url: SRC.ugrMovilidad },
    ],
    related: [
      { to: "/city-match", label: "City Match" },
      { to: "/comparar", label: "Comparador de ciudades" },
      { to: "/", label: "Todos los destinos" },
    ],
  },

  // ── 4. TRÁMITES ────────────────────────────────────────────────────────────
  {
    slug: "tramites-antes-de-irte-erasmus",
    title: "Papeles antes de irte de Erasmus: TSE, residencia, banco y móvil",
    seoTitle: "Trámites antes de un Erasmus: TSE, banco y móvil | MAbroad",
    description:
      "Papeles para un Erasmus en Europa: tarjeta sanitaria europea y sus límites, registro de residencia, cuenta bancaria, roaming y registro de viajeros.",
    summary: "Tarjeta sanitaria europea, registro de residencia, cuenta bancaria, roaming y registro de viajeros.",
    datePublished: REVIEWED,
    dateModified: REVIEWED,
    intro:
      "Con la plaza confirmada empieza la parte menos glamurosa: los papeles. Esta guía es para estudiantes con nacionalidad de un país de la UE que se van a otro país de la UE. Si tu destino está fuera de la UE o no tienes nacionalidad europea, las reglas cambian: consulta en el consulado del país de destino.",
    sections: [
      {
        id: "identidad",
        heading: "Documento de identidad",
        blocks: [
          { type: "p", text: "Para viajar entre países de la UE te basta un DNI o un pasaporte en vigor ([Tu Europa, entrada y salida](" + SRC.entryExit + ")). Comprueba la fecha de caducidad antes de irte: renovarlo desde fuera es más complicado. Lleva una copia digital por si lo pierdes." },
        ],
      },
      {
        id: "tse",
        heading: "Tarjeta Sanitaria Europea (TSE)",
        blocks: [
          { type: "p", text: "La TSE te da acceso a la asistencia sanitaria pública que necesites durante una estancia temporal en otro país, en las mismas condiciones que a quienes tienen seguro allí ([Comisión Europea, TSE](" + SRC.ehic + ")). En España se pide a la Seguridad Social; si te vas antes de recibirla, puedes pedir un certificado provisional sustitutorio ([Seguridad Social](" + SRC.ehicSegSocial + "))." },
          { type: "p", text: "Lo que la TSE **no** cubre, según la Comisión:" },
          {
            type: "list",
            items: [
              "La sanidad privada.",
              "La repatriación a España si te pones enfermo o tienes un accidente.",
              "Ir a otro país expresamente para recibir un tratamiento.",
              "No sustituye a un seguro de viaje: si quieres cobertura de repatriación o de equipaje, necesitas uno aparte. Tu universidad puede exigirte un seguro concreto, pregúntalo.",
            ],
          },
        ],
      },
      {
        id: "residencia",
        heading: "Registro de residencia",
        blocks: [
          { type: "p", text: "Aquí se mezclan tres cosas distintas, y conviene no confundirlas:" },
          {
            type: "list",
            items: [
              "**Aviso de presencia.** Algunos países piden que comuniques que estás allí poco después de llegar, aunque vayas a quedarte menos de tres meses ([Tu Europa, notificar tu presencia](" + SRC.reportingPresence + ")).",
              "**Registro de residencia.** Durante los tres primeros meses no estás obligado a registrarte como residente. A partir de ahí, el país puede exigirte que te registres ante las autoridades ([Tu Europa, derechos de residencia de los estudiantes](" + SRC.residenceStudents + ")).",
              "**Alta en el padrón o registro municipal.** En España se llama «empadronamiento», y a veces se usa esa palabra para cualquiera de los trámites anteriores. Cada país tiene su propio registro local: confirma en la web oficial del ayuntamiento o de extranjería de tu ciudad cuál te corresponde y en qué plazo.",
            ],
          },
          { type: "p", text: "Para residir más de tres meses como estudiante, según [Tu Europa](" + SRC.residenceStudents + "), te pueden pedir:" },
          {
            type: "checklist",
            items: [
              "Documento de identidad o pasaporte en vigor.",
              "Justificante de matrícula en un centro de estudios reconocido (la carta de aceptación o el certificado de la universidad de destino).",
              "Un seguro de enfermedad que te cubra en el país (pregunta en el registro qué seguro aceptan).",
              "Una declaración de que tienes recursos suficientes para no convertirte en una carga para la asistencia social.",
            ],
          },
        ],
      },
      {
        id: "banco",
        heading: "Cuenta bancaria: tu IBAN español vale",
        blocks: [
          { type: "p", text: "Para los pagos SEPA en euros (transferencias y adeudos domiciliados), una empresa o una administración no puede rechazar tu cuenta solo porque el IBAN sea de otro país de la zona SEPA: es la llamada «discriminación por IBAN», y está prohibida ([Comisión Europea](" + SRC.iban + ")). Si te ponen pegas, puedes reclamar." },
          { type: "p", text: "Aun así, conviene llevar una tarjeta sin comisiones por pagar en otra moneda si vas fuera de la zona euro, y comprobar con tu banco las comisiones por sacar dinero en cajeros extranjeros." },
        ],
      },
      {
        id: "movil",
        heading: "Móvil: roaming sí, pero con letra pequeña",
        blocks: [
          { type: "p", text: "Con la regulación «roaming como en casa» usas tu tarifa española en la UE sin recargos. Pero está pensado para viajes, no para vivir fuera: si durante un periodo de cuatro meses pasas más tiempo y consumes más en el extranjero que en España, tu operador puede pedirte explicaciones y, tras avisarte, cobrarte recargos ([Tu Europa, itinerancia](" + SRC.roaming + ")). Para un semestre o un curso, revisa las condiciones de tu operador o plantéate una tarjeta SIM local." },
        ],
      },
      {
        id: "alojamiento",
        heading: "Alojamiento: antes de pagar nada",
        blocks: [
          { type: "p", text: "El alojamiento no es un trámite oficial, pero es donde más estudiantes pierden dinero. Pregunta primero a la universidad de destino si tiene residencias o una bolsa de pisos para estudiantes de intercambio: suele ser la opción más segura para las primeras semanas." },
          {
            type: "checklist",
            items: [
              "No pagues una fianza por un piso que nadie te ha enseñado, ni en persona ni por videollamada.",
              "Pide un contrato por escrito, con el importe, la duración y qué incluye (gastos, internet).",
              "Desconfía de precios muy por debajo de lo normal y de quien te presiona para pagar ya.",
              "Paga con métodos que dejen rastro (transferencia o plataforma con protección) y guarda los justificantes.",
            ],
          },
          { type: "p", text: "Como referencia de gasto, cada ficha de destino tiene un presupuesto mensual estimado por MAbroad, por ejemplo la de [Lisboa](/city/lisboa)." },
        ],
      },
      {
        id: "registro-viajeros",
        heading: "Registro de viajeros del Ministerio de Exteriores",
        blocks: [
          { type: "p", text: "Es un registro voluntario y gratuito para que el consulado pueda localizarte y ayudarte en una emergencia grave en el país en el que estés ([Ministerio de Asuntos Exteriores](" + SRC.registroViajeros + "))." },
        ],
      },
      {
        id: "checklist",
        heading: "Checklist por fases",
        blocks: [
          {
            type: "table",
            caption: "Qué hacer y cuándo (orientativo)",
            head: ["Cuándo", "Qué hacer"],
            rows: [
              ["Al confirmar la plaza", "Revisar caducidad del DNI o pasaporte · Empezar el [Learning Agreement](/guias/learning-agreement-paso-a-paso) · Leer el convenio de subvención"],
              ["Un mes antes", "Pedir la TSE (o el certificado provisional) · Decidir seguro de viaje · Revisar tarifa móvil y comisiones del banco · Buscar alojamiento"],
              ["La semana antes", "Copias digitales de todos los documentos · Registro de viajeros · Datos de contacto de tu ORI y de la universidad de destino"],
              ["Al llegar", "Certificado de llegada para la universidad · Comprobar si el país exige aviso de presencia desde el primer día · Cambios del Learning Agreement en plazo"],
              ["Antes de los tres meses", "Registro de residencia y alta en el registro municipal si tu estancia los supera y el país lo exige"],
            ],
          },
          { type: "p", text: "En la ficha de cada destino tienes consejos prácticos de la ciudad, por ejemplo en [Berlín](/city/berlin) o [Praga](/city/praga), y en [el proceso Erasmus](/proceso) el calendario completo." },
        ],
      },
    ],
    sources: [
      { label: "Tu Europa — Viajar dentro de la UE: documentos para ciudadanos de la UE", url: SRC.entryExit },
      { label: "Comisión Europea — Tarjeta Sanitaria Europea", url: SRC.ehic },
      { label: "Seguridad Social — TSE y certificado provisional sustitutorio", url: SRC.ehicSegSocial },
      { label: "Tu Europa — Derechos de residencia de los estudiantes", url: SRC.residenceStudents },
      { label: "Tu Europa — Notificar tu presencia", url: SRC.reportingPresence },
      { label: "Comisión Europea — Discriminación por IBAN", url: SRC.iban },
      { label: "Tu Europa — Itinerancia: costes del móvil en la UE", url: SRC.roaming },
      { label: "Ministerio de Asuntos Exteriores — Registro de viajeros", url: SRC.registroViajeros },
    ],
    related: [
      { to: "/proceso", label: "El proceso Erasmus en 8 pasos" },
      { to: "/learning-agreement", label: "Asistente de Learning Agreement" },
      { to: "/city/berlin", label: "Ficha de Berlín" },
    ],
  },

  // ── 5. ERASMUS+ VS FUERA DE EUROPA ─────────────────────────────────────────
  {
    slug: "erasmus-o-intercambio-fuera-de-europa",
    title: "Erasmus+ o intercambio fuera de Europa: diferencias que importan",
    seoTitle: "Erasmus+ o intercambio fuera de Europa: diferencias | MAbroad",
    description:
      "Erasmus+ en Europa, movilidad Erasmus+ internacional y convenios bilaterales comparados: beca, Learning Agreement, visado, sanidad y coste, con ejemplos.",
    summary: "Beca, Learning Agreement, visado, sanidad y coste: Erasmus+ frente a convenios fuera de Europa.",
    datePublished: REVIEWED,
    dateModified: REVIEWED_UK,
    intro:
      "No todos los intercambios son Erasmus+, y la diferencia se nota en la beca, en el papeleo y en el bolsillo. Esta guía te ayuda a saber qué tipo de plaza tienes delante y qué implica antes de ponerla en tu lista.",
    sections: [
      {
        id: "tres-vias",
        heading: "Tres formas de irte",
        blocks: [
          {
            type: "list",
            items: [
              "**Erasmus+ en Europa.** Movilidad entre países de la UE y países asociados al programa (Islandia, Liechtenstein, Noruega, Macedonia del Norte, Serbia y Turquía), con Learning Agreement. La beca Erasmus+ depende de la financiación de la plaza: también existen movilidades con «beca cero», sin fondos Erasmus+ ([Guía del Programa 2026, p. 66](" + SRC.programmeGuide2026ZeroGrant + ")).",
              "**Erasmus+ internacional.** Erasmus+ también financia algunas movilidades a países no asociados de todo el mundo. Con fondos de política interior, una universidad puede dedicar hasta el 20 % de su última subvención a movilidades salientes a esos países ([Guía del Programa, movilidad en educación superior](" + SRC.heMobility + ")). Por ejemplo, la [Universidad Complutense](" + SRC.ucmNoAsociados + ") convoca plazas Erasmus+ en países no asociados para el curso 2026/27. Hay además proyectos de movilidad internacional con fondos de política exterior (KA171), con sus propias condiciones.",
              "**Programas propios y convenios bilaterales.** Acuerdos directos entre tu universidad y otra de fuera del programa, con las condiciones (ayudas, matrícula, reconocimiento) que fije cada convocatoria. Por ejemplo, la [Universidad de Granada](" + SRC.ugrMovilidad + ") publica, junto a sus convocatorias Erasmus+, las de su Programa Propio de movilidad internacional.",
            ],
          },
          { type: "p", text: "Reino Unido vuelve a Erasmus+ en el curso 2027-28 ([Gobierno británico](" + SRC.govukErasmus2027 + ")): desde entonces sus plazas son Erasmus+ en Europa. Suiza prevé entrar en 2027, pero aún falta que su Parlamento apruebe la financiación ([SEFRI](" + SRC.sefriMovilidad + ")). Hasta entonces, los dos aparecen en el grupo 1 de la tabla de importes del SEPIE como países no asociados ([documento de financiación 2026](" + SRC.sepieFinanciacion + ")): eso permite que algunas universidades financien plazas allí con fondos Erasmus+. Si tu plaza es así o es un convenio bilateral, solo lo sabe tu ORI. Lo resumimos por país en [tipos de intercambio](/tipos-de-intercambio)." },
        ],
      },
      {
        id: "comparativa",
        heading: "Comparativa rápida",
        blocks: [
          {
            type: "table",
            caption: "Qué cambia según el tipo de plaza",
            head: ["", "Erasmus+ en Europa", "Erasmus+ internacional", "Convenio bilateral"],
            rows: [
              ["Beca", "Según la financiación de la plaza: importe por grupo de país ([guía de la beca](/guias/beca-erasmus-cuanto-se-cobra)) o beca cero", "Según la financiación de la plaza y las condiciones del proyecto de tu universidad", "La que fije la convocatoria: ayudas de tu universidad o comunidad, o fondos propios"],
              ["Reconocimiento", "Learning Agreement (directrices KA131)", "Learning Agreement (KA131, o KA171 si la plaza es de ese tipo de proyecto)", "Lo que fije tu universidad para ese convenio"],
              ["Visado", "Entre países de la UE, no con nacionalidad de la UE (puede haber aviso de presencia o registro). En otros casos, según el país, la duración y tu nacionalidad", "Según el país, la duración y tu nacionalidad", "Según el país, la duración y tu nacionalidad"],
              ["Sanidad", "[TSE](" + SRC.ehic + ") donde tenga cobertura, más el seguro que pida la universidad", "TSE solo si el país está en su ámbito; si no, seguro médico", "TSE solo si el país está en su ámbito; si no, seguro médico"],
            ],
          },
          { type: "note", text: "La [Tarjeta Sanitaria Europea](" + SRC.ehic + ") cubre la asistencia pública necesaria en los países de la UE, Islandia, Liechtenstein, Noruega, Suiza y Reino Unido. En el resto, necesitas un seguro médico que cumpla lo que pidan el país y la universidad de destino." },
        ],
      },
      {
        id: "dinero",
        heading: "El dinero: donde más se nota",
        blocks: [
          { type: "p", text: "Sin beca Erasmus+, el coste de vida pesa todavía más. Cada ficha de MAbroad tiene un presupuesto mensual estimado (orientativo, no oficial) que te sirve para comparar: por ejemplo, [Berlín](/city/berlin), [Londres](/city/londres), [Zúrich](/city/zurich), [Toronto](/city/toronto) o [Buenos Aires](/city/buenos-aires)." },
          { type: "p", text: "Un destino lejano puede salir barato en el día a día y caro en el vuelo, el seguro o el visado; otro europeo, al revés. Haz la cuenta completa de toda la estancia: viaje, seguro, trámites de entrada y meses de alquiler, menos las ayudas que tenga tu plaza." },
        ],
      },
      {
        id: "visado",
        heading: "Visado y plazos",
        blocks: [
          { type: "p", text: "Dentro de la UE, con nacionalidad europea, no necesitas visado, aunque para más de tres meses puede tocarte registrarte ([Tu Europa](" + SRC.residenceStudents + ")). En el resto de casos, si necesitas visado o permiso de estudiante depende del país, la duración y tu nacionalidad. Consulta los requisitos y los plazos en la web oficial del consulado o de inmigración del país de destino en cuanto tengas la plaza, y no compres vuelos hasta tenerlo claro." },
        ],
      },
      {
        id: "ejemplo",
        heading: "Un ejemplo para decidir",
        blocks: [
          {
            type: "example",
            title: "Ejemplo hipotético: Berlín, Zúrich o Buenos Aires",
            items: [
              "Álex (estudiante inventado) tiene tres opciones inventadas para el ejemplo: una plaza Erasmus+ con financiación en [Berlín](/city/berlin), un convenio bilateral sin ayuda en [Zúrich](/city/zurich) y otro sin ayuda en [Buenos Aires](/city/buenos-aires).",
              "Berlín: beca del grupo 1 (350–674 € al mes, según lo que pague su universidad) más ayuda de viaje, y Learning Agreement con reglas claras.",
              "Zúrich: en este ejemplo su plaza no tiene ayuda; compara el presupuesto estimado de la ficha y consulta en la web oficial de las autoridades suizas qué trámites necesita para estudiar allí.",
              "Buenos Aires: en este ejemplo, como la plaza no tiene ayuda, el vuelo y el seguro corren de su cuenta; tendría que comprobar en la web oficial si necesita visado, y el reconocimiento depende de lo que fije su universidad.",
              "Con un presupuesto ajustado, Berlín le da más seguridad; si su prioridad es el español o vivir algo muy distinto, Buenos Aires puede compensar si encuentra una ayuda de su universidad o comunidad.",
            ],
          },
        ],
      },
      {
        id: "preguntas",
        heading: "Qué preguntar antes de elegir una plaza fuera de Europa",
        blocks: [
          {
            type: "checklist",
            items: [
              "¿Es una plaza Erasmus+ (y de qué tipo) o un convenio bilateral?",
              "¿Hay beca o ayuda? ¿Cuánto y cuándo se cobra?",
              "¿Pago la matrícula en mi universidad o en la de destino?",
              "¿Cómo se reconocen las asignaturas y quién firma el acuerdo?",
              "¿Qué visado necesito y cuánto tarda?",
              "¿Qué seguro médico exige la universidad de destino?",
            ],
          },
          { type: "p", text: "Con eso claro, compara tus opciones en el [comparador](/comparar) o descubre cuál encaja más contigo en el [City Match](/city-match)." },
        ],
      },
    ],
    sources: [
      { label: "Comisión Europea — Guía del Programa: proyectos de movilidad en educación superior", url: SRC.heMobility },
      { label: "Comisión Europea — Guía del Programa Erasmus+ 2026 (beca cero, p. 66)", url: SRC.programmeGuide2026ZeroGrant },
      { label: "SEPIE — Información sobre financiación de los proyectos Erasmus+, convocatoria 2026", url: SRC.sepieFinanciacion },
      { label: "GOV.UK — Acuerdo UE-Reino Unido para entrar en Erasmus+ en 2027", url: SRC.govukErasmus2027 },
      { label: "SEFRI (Suiza) — Movilidad y cooperación internacional en educación", url: SRC.sefriMovilidad },
      { label: "Universidad Complutense de Madrid — Erasmus+ en países no asociados 2026/27 (ejemplo)", url: SRC.ucmNoAsociados },
      { label: "Universidad de Granada — Convocatorias de movilidad internacional de grado (ejemplo)", url: SRC.ugrMovilidad },
      { label: "Comisión Europea — Directrices del Learning Agreement (KA131)", url: SRC.laGuidelinesKa131 },
      { label: "Comisión Europea — Directrices del Learning Agreement (KA171)", url: SRC.laGuidelinesKa171 },
      { label: "Tu Europa — Derechos de residencia de los estudiantes", url: SRC.residenceStudents },
      { label: "Comisión Europea — Tarjeta Sanitaria Europea", url: SRC.ehic },
    ],
    related: [
      { to: "/tipos-de-intercambio", label: "Tipos de intercambio" },
      { to: "/city/zurich", label: "Ficha de Zúrich" },
      { to: "/city/buenos-aires", label: "Ficha de Buenos Aires" },
    ],
  },
];
