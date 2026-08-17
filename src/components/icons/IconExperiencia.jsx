import { useId } from "react";

/**
 * IconExperiencia — icono ilustrado MAbroad (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconExperiencia({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`starg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#FBBF24"/><stop offset="100%" stopColor="#F59E0B"/>
</linearGradient>
<linearGradient id={`stars-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="55%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="100%" stopColor="#0C2340" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`starc-${uid}`}>
<path d="M64 16 L77.4 47.6 L111.6 51.2 L85.8 74.2 L93.4 108 L64 90.4 L34.6 108 L42.2 74.2 L16.4 51.2 L50.6 47.6 Z"/>
</clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<path d="M64 16 L77.4 47.6 L111.6 51.2 L85.8 74.2 L93.4 108 L64 90.4 L34.6 108 L42.2 74.2 L16.4 51.2 L50.6 47.6 Z" fill={`url(#starg-${uid})`}/>
<g clipPath={`url(#starc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#stars-${uid})`}/>
<ellipse cx="50" cy="42" rx="16" ry="8.8" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 50 42)"/>
</g>
<path d="M64 16 L77.4 47.6 L111.6 51.2 L85.8 74.2 L93.4 108 L64 90.4 L34.6 108 L42.2 74.2 L16.4 51.2 L50.6 47.6 Z" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.6" strokeLinejoin="round"/>
</g>

    </svg>
  );
}
