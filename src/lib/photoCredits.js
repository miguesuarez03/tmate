// ─────────────────────────────────────────────────────────────────────────────
// Créditos de las fotos de Wikimedia Commons (autor + licencia + enlaces).
// Los datos salen de src/data/wikimediaPhotos.js — la misma tabla que usa
// images.js para los tamaños —, generada por `npm run photos:meta`: al cambiar
// una foto y regenerarla, el icono ⓘ de la foto y la página /creditos se
// actualizan solos.
// ─────────────────────────────────────────────────────────────────────────────
import { WIKIMEDIA_PHOTOS } from "../data/wikimediaPhotos";
import { parseWikimediaUrl } from "./images";

/** Nombre de la licencia en español (las CC se dejan con su código). */
function licenseLabel(license) {
  if (/^public domain$/i.test(license)) return "Dominio público";
  if (/^FAL$/i.test(license)) return "Licencia Arte Libre";
  return license;
}

/** Enlace al texto de la licencia, o null si no hay uno estándar. */
function licenseUrl(license) {
  const cc = /^CC (BY(?:-SA|-ND|-NC|-NC-SA|-NC-ND)?) (\d\.\d)(?: ([a-z]{2}))?$/i.exec(license);
  if (cc) return `https://creativecommons.org/licenses/${cc[1].toLowerCase()}/${cc[2]}/${cc[3] ? `${cc[3].toLowerCase()}/` : ""}`;
  if (/^CC0/i.test(license)) return "https://creativecommons.org/publicdomain/zero/1.0/deed.es";
  if (/^FAL$/i.test(license)) return "https://artlibre.org/licence/lal/es/";
  return null;
}

/**
 * Crédito de una foto, o null si no es de Wikimedia o no está en la tabla.
 * @returns {{ author: string, license: string, licenseUrl: string|null, sourceUrl: string, requiresCredit: boolean } | null}
 */
export function photoCredit(url) {
  const parsed = parseWikimediaUrl(url);
  const row = parsed && WIKIMEDIA_PHOTOS[parsed.key];
  if (!row) return null;
  const [, , , author, license] = row;
  return {
    author,
    license: licenseLabel(license),
    licenseUrl: licenseUrl(license),
    sourceUrl: `https://commons.wikimedia.org/wiki/File:${parsed.file}`,
    // El dominio público no exige atribución; CC (incluida CC0) y FAL se acreditan siempre.
    requiresCredit: !/^public domain$/i.test(license),
  };
}

/**
 * Lista para la página /creditos: una fila por foto distinta de cada ciudad
 * (portada y foto de tarjeta, si son diferentes), ordenada por ciudad.
 */
export function cityPhotoCredits(cities) {
  const rows = [];
  for (const city of cities) {
    const seen = new Set();
    for (const url of [city.heroImg, city.img]) {
      const parsed = parseWikimediaUrl(url);
      if (!parsed || seen.has(parsed.key)) continue;
      seen.add(parsed.key);
      const credit = photoCredit(url);
      if (credit) rows.push({ city: city.name, country: city.country, slug: city.slug, ...credit });
    }
  }
  return rows.sort((a, b) => a.city.localeCompare(b.city, "es"));
}
