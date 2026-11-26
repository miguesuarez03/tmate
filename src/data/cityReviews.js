/**
 * CITY_REVIEWS — MAbroad
 *
 * Fecha (AAAA-MM-DD) de la última revisión de los datos de cada ficha: la de
 * la tanda de verificación cerrada en VERIFICACION.md en la que entró esa
 * ciudad (no la del build ni la del último commit, que cambian con cualquier
 * ajuste de código). La ficha la enseña como «Datos revisados el …».
 *
 * Una ciudad que aún no ha pasado por una tanda NO va aquí: su ficha no
 * enseña ninguna fecha (nunca una inventada).
 *
 * Al cerrar una tanda (o crear una ficha nueva ya verificada), añade o cambia
 * aquí la fecha de sus ciudades. tests/reviews.test.mjs comprueba que cada
 * slug existe y que la fecha es válida y no está en el futuro.
 */

const T = (date, slugs) => Object.fromEntries(slugs.split(" ").map((s) => [s, date]));

export const CITY_REVIEWS = {
  // Tandas 1–6 (10-11-2026)
  ...T("2026-11-10", "lisboa oporto berlin paris praga budapest varsovia cracovia viena amsterdam bruselas munich lyon turin napoles padua coimbra copenhague dublin estocolmo helsinki lovaina gante utrecht groningen rotterdam"),
  // Tandas 7–8 (11-11-2026). Rosenheim: falta lo local (ver «Pendiente de Miguel»).
  ...T("2026-11-11", "la-haya maastricht hamburgo colonia heidelberg friburgo leipzig dresde tubinga rosenheim"),
  // Tandas 9–13 y 13b (fuente del coste de Bolonia, Roma, Milán y Florencia, tanda 1) (13-11-2026)
  ...T("2026-11-13", "bolonia roma milan florencia toulouse burdeos nantes montpellier marsella lille estrasburgo grenoble rennes venecia pisa siena bari genova perugia trieste parma bergamo ferrara urbino lecce catania palermo cagliari verona"),
  // Tandas Loyola A y B, con el cierre de la revisión pendiente (15-11-2026)
  ...T("2026-11-15", "caserta covilha cosenza modena trento pavia braganza newcastle geel kleve"),
  // Fase 2 Loyola, tandas 1 y 2 (22-11-2026)
  ...T("2026-11-22", "luneburgo odense angers campobasso salerno tetovo enschede santarem erfurt gotinga ratisbona wurzburgo malinas belfort debrecen benevento castellanza bergen arnhem flesinga"),
  // Fase 2 Loyola, tanda 3 (23-11-2026)
  ...T("2026-11-23", "aveiro vila-real nottingham ostrava zlin umea brugg aquisgran bamberg bonn"),
  // Fase 2 Loyola, tanda 4 (23-11-2026)
  ...T("2026-11-23", "bremen francfort jena mannheim osnabruck passau stuttgart graz wiener-neustadt cortrique"),
  // Fase 2 Loyola, tanda 5 (26-11-2026)
  ...T("2026-11-26", "diepenbeek namur limasol roskilde nitra presov kuopio rovaniemi clermont-ferrand el-havre"),
  // Fase 2 Loyola, tanda 6 (27-11-2026)
  ...T("2026-11-27", "ruan limerick waterford eindhoven zwolle rzeszow viseu olomouc orebro trollhattan"),
  // Fase 2 Loyola, tanda 7 (27-11-2026)
  ...T("2026-11-27", "aberystwyth bradford hatfield leicester portsmouth fortaleza sao-leopoldo cali leon-mexico puebla"),
};
