import { useId } from "react";

/**
 * IconComunidad — icono ilustrado MAbroad (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconComunidad({ size = 56, className = "", ...rest }) {
  const uid = useId();
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-hidden={rest["aria-label"] ? undefined : true}
      {...rest}
    >
      <defs>
<filter id={`ds-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
<feDropShadow dx="0" dy="4" stdDeviation="3.2" floodColor="#0F1E2D" floodOpacity="0.20"/>
</filter>
<linearGradient id={`bubbleg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#3F7A7D"/><stop offset="100%" stopColor="#A6D5DB"/>
</linearGradient>
<linearGradient id={`bubbles-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`bubblec-${uid}`}><path d="M26 34 C26 27 32 22 39 22 L89 22 C96 22 102 27 102 34 L102 68 C102 75 96 80 89 80 L52 80 L36 96 L38 80 L39 80 C32 80 26 75 26 68 Z" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<path d="M26 34 C26 27 32 22 39 22 L89 22 C96 22 102 27 102 34 L102 68 C102 75 96 80 89 80 L52 80 L36 96 L38 80 L39 80 C32 80 26 75 26 68 Z" fill={`url(#bubbleg-${uid})`}/>
<g clipPath={`url(#bubblec-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#bubbles-${uid})`}/>
<ellipse cx="42" cy="34" rx="15" ry="8.2" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 42 34)"/>
</g>
<circle cx="49" cy="50" r="5.5" fill="#FFFFFF"/>
<circle cx="64" cy="50" r="5.5" fill="#FFFFFF" opacity="0.85"/>
<circle cx="79" cy="50" r="5.5" fill="#FFFFFF" opacity="0.7"/>
</g>

    </svg>
  );
}
