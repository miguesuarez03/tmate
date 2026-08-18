import { useState, useEffect } from "react";
import { getScoreLevel } from "../lib/cities";

/**
 * Anillo circular de score, reutilizado en la ficha de ciudad, las tarjetas
 * de listado, el comparador y los resultados de City Match — un solo
 * componente para que el tamaño/color/tipografía sea siempre consistente.
 *
 * El tamaño de fuente es proporcional al diámetro real del anillo (no rem
 * fijo) para que el número, "/10" y la etiqueta siempre quepan con aire,
 * sea cual sea el tamaño en el que se use.
 */
export default function ScoreRing({ score, size = 96, showLabel = true, animate = true, className = "" }) {
  const [animated, setAnimated] = useState(!animate);
  const r = 44;
  const circ = 2 * Math.PI * r;
  const level = getScoreLevel(score);
  const color = level.color;

  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setAnimated(true), 350);
    return () => clearTimeout(t);
  }, [animate]);

  // Presupuesto de tamaño de fuente más conservador que antes (score ~30%
  // del diámetro en vez de ~37%), con margen interno extra, para que
  // scores de 2 dígitos con decimal ("10.0") o etiquetas largas ("Regular")
  // nunca toquen el trazo del anillo, en ningún tamaño.
  const scoreFontSize = Math.max(11, Math.round(size * 0.3));
  const denFontSize = Math.max(7, Math.round(size * 0.1));
  const labelFontSize = Math.max(7, Math.round(size * 0.082));
  const strokeWidth = Math.max(3, Math.round(size * 0.073));

  return (
    <div className={`score-ring${className ? ` ${className}` : ""}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="score-ring__svg">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--score-ring-track, rgba(255,255,255,0.1))" strokeWidth={strokeWidth} />
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={animated ? circ * (1 - Math.min(score, 10) / 10) : circ}
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="score-ring__center">
        <span className="score-ring__center-bg" />
        <span className="score-ring__num" style={{ color, fontSize: scoreFontSize }}>{score}</span>
        <span className="score-ring__den" style={{ fontSize: denFontSize }}>/10</span>
        {showLabel && (
          <span className="score-ring__label" style={{ color, fontSize: labelFontSize }}>{level.label}</span>
        )}
      </div>
    </div>
  );
}
