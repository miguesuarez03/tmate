/**
 * CITY_WHATSAPP_GROUPS — TMate
 *
 * Enlaces a grupos de WhatsApp reales por ciudad (uno por destino).
 * NOTA IMPORTANTE: esto es gestión de comunidad, no desarrollo. Hasta que
 * exista un grupo real por ciudad, el valor es `null` y el botón de WhatsApp
 * no se muestra (en vez de enlazar a un grupo roto o inexistente).
 *
 * Para activar el acceso de una ciudad, sustituye `null` por el enlace de
 * invitación real (formato: https://chat.whatsapp.com/XXXXXXXXXXXXXXXXXXXXXX).
 */

export const CITY_WHATSAPP_GROUPS = {
  bolonia: null,
  milan: null,
  roma: null,
  turin: null,
  cracovia: null,
  varsovia: null,
  budapest: null,
  praga: null,
  "la-haya": null,
  rotterdam: null,
  munich: null,
  berlin: null,
  lisboa: null,
  oporto: null,
  paris: null,
  londres: null,
  amsterdam: null,
  viena: null,
  rosenheim: null,
  bruselas: null,
  estocolmo: null,
  copenhague: null,
  helsinki: null,
  oslo: null,
  reikiavik: null,
  dublin: null,
  edimburgo: null,
  atenas: null,
  zagreb: null,
  liubliana: null,
  tallin: null,
  vilna: null,
  riga: null,
  bratislava: null,
  bucarest: null,
  sofia: null,
  ginebra: null,
  florencia: null,
  hamburgo: null,
  gante: null,
};

/** Devuelve el enlace del grupo de WhatsApp de una ciudad, o null si aún no existe. */
export function getCityWhatsappGroup(slug) {
  return CITY_WHATSAPP_GROUPS[slug] || null;
}
