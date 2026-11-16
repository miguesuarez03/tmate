import { useState, useEffect } from "react";
import { formatScore, getScoreLevel } from "../lib/cities";

/**
 * Anillo circular de score, reutilizado en la ficha de ciudad, las tarjetas
 * de listado, el comparador y los resultados de City Match — un solo
 * componente para que el tamaño/color/tipografía sea siempre consistente.
 *
 * El relleno es un color sólido (no un aro fino sobre foto + texto de color):
 * así el contraste con el texto en blanco queda garantizado en cualquier
 * fondo, sin depender de adivinar la opacidad/tamaño de un disco intermedio.
 * Los fondos del nivel son variantes más oscuras de los colores de
 * getScoreLevel — los originales son demasiado claros para usarse como
 * fondo de texto blanco (ratio de contraste < 3:1 en verde/ámbar).
 */
export default function ScoreRing({ score, size = 96, showLabel = true, animate = true, className = "" }) {
  const [animated, setAnimated] = useState(!animate);
  const r = 44;
  const circ = 2 * Math.PI * r;
  // Sin nota (le falta más del 30 % del peso, ver lib/scoring.js): «—».
  const hasScore = typeof score === "number" && Number.isFinite(score);
  const level = getScoreLevel(hasScore ? score : 0);
  const fill = hasScore ? level.background : "#56708C";

  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setAnimated(true), 350);
    return () => clearTimeout(t);
  }, [animate]);

  const scoreFontSize = Math.max(11, Math.round(size * 0.3));
  // En anillos grandes (con nivel), «/10» y el nivel nunca por debajo de 12 px.
  const big = size >= 80;
  const denFontSize = big ? Math.max(12, Math.round(size * 0.115)) : Math.max(7, Math.round(size * 0.1));
  const strokeWidth = Math.max(2, Math.round(size * 0.045));

  return (
    <span className={`score-ring${className ? ` ${className}` : ""}`} style={{ "--ring-size": `${size}px` }}>
      <span className={`score-ring__disc${animate ? " score-ring__disc--intro" : ""}`}>
        <svg viewBox="0 0 100 100" className="score-ring__svg">
          <circle cx="50" cy="50" r="47" fill={fill} />
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={strokeWidth} />
          <circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke="#fff"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={animated && hasScore ? circ * (1 - Math.min(score, 10) / 10) : circ}
            transform="rotate(-90 50 50)"
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
          />
        </svg>
        <span className="score-ring__center">
          <span className="score-ring__num" style={{ fontSize: scoreFontSize }}>{formatScore(score)}</span>
          <span className="score-ring__den" style={{ fontSize: denFontSize }}>/10</span>
        </span>
      </span>
      {showLabel && hasScore && (
        <span className="score-ring__label" style={{ background: fill }}>{level.label}</span>
      )}
    </span>
  );
}
