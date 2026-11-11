// ─────────────────────────────────────────────────────────────────────────────
// Banderas: de emoji a código del sprite SVG (src/assets/flags.svg).
//
// Los datos (src/data/cities.js, el mapa…) guardan la bandera como emoji. Un
// emoji de bandera no es un dibujo: son dos "indicadores regionales" (🇮 + 🇹)
// que cada sistema decide cómo pintar — y Windows los pinta como letras. De
// esos dos caracteres sale directamente el código ISO del país ("it"), que es
// el id del símbolo en el sprite. Las subdivisiones (Escocia) son una bandera
// negra seguida de etiquetas invisibles ("gbsct") → "gb-sct".
//
// Sin dependencias: lo usan el cliente (<Flag>) y scripts/build-flags.mjs.
// ─────────────────────────────────────────────────────────────────────────────

const REGIONAL_A = 0x1f1e6; // 🇦
const REGIONAL_Z = 0x1f1ff; // 🇿
const BLACK_FLAG = 0x1f3f4; // 🏴
const TAG_A = 0xe0061;      // etiqueta "a"
const TAG_Z = 0xe007a;      // etiqueta "z"

/**
 * Código del sprite para un emoji de bandera, o null si no lo es.
 * "🇮🇹" → "it" · "🏴󠁧󠁢󠁳󠁣󠁴󠁿" (Escocia) → "gb-sct"
 * @param {string} emoji
 * @returns {string|null}
 */
export function flagEmojiToCode(emoji) {
  if (typeof emoji !== "string" || !emoji) return null;
  const points = Array.from(emoji.trim(), (ch) => ch.codePointAt(0));

  if (points.length === 2 && points.every((p) => p >= REGIONAL_A && p <= REGIONAL_Z)) {
    return points.map((p) => String.fromCharCode(97 + p - REGIONAL_A)).join("");
  }

  if (points[0] === BLACK_FLAG && points.length > 3) {
    const tags = points.slice(1).filter((p) => p >= TAG_A && p <= TAG_Z);
    const letters = tags.map((p) => String.fromCharCode(97 + p - TAG_A)).join("");
    // Dos letras de país + el resto de subdivisión: "gbsct" → "gb-sct".
    if (letters.length > 2) return `${letters.slice(0, 2)}-${letters.slice(2)}`;
  }

  return null;
}
