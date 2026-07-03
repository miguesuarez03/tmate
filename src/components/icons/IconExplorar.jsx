import { useId } from "react";

/**
 * IconExplorar — icono ilustrado TMate (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconExplorar({ size = 56, className = "", ...rest }) {
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
<feDropShadow dx="0" dy="4" stdDeviation="3.2" floodColor="#0F172A" floodOpacity="0.20"/>
</filter>
<linearGradient id={`ping-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#14B8A6"/><stop offset="100%" stopColor="#06B6D4"/>
</linearGradient>
<linearGradient id={`pins-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="55%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="100%" stopColor="#0C2340" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`pinc-${uid}`}><path d="M64 20 C42 20 26 36 26 57 C26 82 64 112 64 112 C64 112 102 82 102 57 C102 36 86 20 64 20 Z" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<path d="M64 20 C42 20 26 36 26 57 C26 82 64 112 64 112 C64 112 102 82 102 57 C102 36 86 20 64 20 Z" fill={`url(#ping-${uid})`}/>
<g clipPath={`url(#pinc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#pins-${uid})`}/>
<ellipse cx="48" cy="44" rx="14" ry="7.7" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 48 44)"/>
</g>
<circle cx="64" cy="57" r="16" fill="#FFFFFF"/>
<circle cx="64" cy="57" r="16" fill="none" stroke="#0D5C6E" strokeOpacity="0.25" strokeWidth="2"/>
</g>

    </svg>
  );
}
