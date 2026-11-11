import { flagEmojiToCode } from "../lib/flags";
import { FLAG_CODES } from "../data/flagSprite";
// ?url: Vite lo publica como /assets/flags-<hash>.svg (caché inmutable, y el
// nombre cambia solo cuando cambia el sprite).
import SPRITE_URL from "../assets/flags.svg?url";

/** Código del sprite si esa bandera está incluida; si no, null. */
function spriteCode(emoji) {
  const code = flagEmojiToCode(emoji);
  return code && FLAG_CODES.has(code) ? code : null;
}

/**
 * Bandera de un país como SVG, a partir del emoji que guardan los datos.
 *
 * Windows no pinta las banderas emoji (salen como "IT", "DE"…): este
 * componente dibuja el símbolo del sprite src/assets/flags.svg, igual en todos
 * los sistemas. Si la bandera no está en el sprite, deja el emoji tal cual.
 *
 * Mide en `em` (ver .flag en global.css): hereda el tamaño del texto que la
 * rodea, igual que el emoji al que sustituye. Es decorativa (va siempre junto
 * al nombre del país o de la ciudad), así que queda fuera del árbol de
 * accesibilidad.
 */
export default function Flag({ emoji, className = "" }) {
  if (!emoji) return null;
  const code = spriteCode(emoji);
  if (!code) return <span className={className || undefined} aria-hidden="true">{emoji}</span>;
  return (
    <svg className={`flag${className ? ` ${className}` : ""}`} aria-hidden="true" focusable="false">
      <use href={`${SPRITE_URL}#${code}`} />
    </svg>
  );
}

/**
 * La misma bandera para pintarla DENTRO de otro SVG (los marcadores del mapa):
 * centrada en (0, y) con el alto indicado. Sin sprite, el emoji como <text>.
 */
export function SvgFlag({ emoji, y = 0, height = 10 }) {
  if (!emoji) return null;
  const code = spriteCode(emoji);
  if (!code) {
    return (
      <text textAnchor="middle" y={y} fontSize={height} style={{ pointerEvents: "none", userSelect: "none" }}>
        {emoji}
      </text>
    );
  }
  const width = height * 1.5; // las banderas del sprite son 3:2
  return (
    <use
      href={`${SPRITE_URL}#${code}`}
      x={-width / 2}
      y={y - height}
      width={width}
      height={height}
      style={{ pointerEvents: "none" }}
    />
  );
}
