// ─────────────────────────────────────────────────────────────────────────────
// Abonos de transporte con precio oficial, para el desglose de la beca.
//
// Alemania: el transporte de un estudiante es el Deutschland-Ticket (bus,
// tranvía, metro y regionales de todo el país). Precio en DB Regio
// (https://regional.bahn.de/tickets/Deutschlandticket, consultado el
// 20/11/2026): 63 €/mes en 2026 y 66,80 €/mes desde el 1 de enero de 2027.
// ⚠️ El 1/1/2027 hay que pasar `monthly` a 66.8 (ver PROPUESTAS.md).
//
// Si la universidad incluye el Deutschlandsemesterticket en la cuota
// semestral, es la opción más barata: se dice, sin cifra (DB no la publica;
// la comunica cada universidad). Las ciudades marcadas salen de lo verificado
// en las tandas (tips de src/data/cities.js).
// ─────────────────────────────────────────────────────────────────────────────

export const DEUTSCHLAND_TICKET = {
  country: "Alemania",
  name: "Deutschland-Ticket",
  monthly: 63,
  next: { monthly: 66.8, from: "1 de enero de 2027" },
  source: "https://regional.bahn.de/tickets/Deutschlandticket",
  sourceLabel: "Deutsche Bahn (DB Regio)",
};

/** Ciudades alemanas cuya universidad principal incluye el Deutschlandsemesterticket en la matrícula. */
export const SEMESTER_TICKET_CITIES = {
  dresde: "TU Dresden",
  leipzig: "la Universidad de Leipzig",
  colonia: "la Universität zu Köln",
  kleve: "la Hochschule Rhein-Waal (si te corresponde como estudiante de intercambio: confírmalo)",
};
