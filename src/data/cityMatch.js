// ─────────────────────────────────────────────────────────────────────────────
// City Match: qué preguntas tiene el test y en qué orden.
//
// Es la ÚNICA fuente del número de preguntas. Lo leen el propio test
// (src/pages/CityMatchPage.jsx, que define cada pregunta y las monta en este
// orden), el menú lateral, la descripción SEO y el prerender — antes cada uno
// llevaba el número escrito a mano y el menú decía «8 preguntas» cuando ya
// eran 10.
//
// Para añadir o quitar una pregunta: edita esta lista Y su definición en
// QUESTION_DEFS (CityMatchPage.jsx). Si no coinciden, la página falla al
// cargar con un mensaje que dice cuál falta.
//
// Fichero aparte, sin dependencias, para que el menú no tenga que importar la
// página entera solo para saber cuántas preguntas hay.
// ─────────────────────────────────────────────────────────────────────────────
export const CITY_MATCH_QUESTION_IDS = [
  "destino",
  "presupuesto",
  "clima",
  "idioma",
  "fiesta",
  "tamano",
  "naturaleza",
  "universidad",
  "estilo",
  "prioridades",
];

export const CITY_MATCH_QUESTION_COUNT = CITY_MATCH_QUESTION_IDS.length;
