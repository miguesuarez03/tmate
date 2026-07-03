import { useId } from "react";

/**
 * IconViajes — icono ilustrado TMate (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconViajes({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`planeg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0EA5E9"/><stop offset="100%" stopColor="#06B6D4"/>
</linearGradient>
<linearGradient id={`planes-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="55%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="100%" stopColor="#0C2340" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`planec-${uid}`}><path d="M22 66 L104 30 L74 100 L62 76 L40 80 Z" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<path d="M22 66 L104 30 L74 100 L62 76 L40 80 Z" fill={`url(#planeg-${uid})`}/>
<g clipPath={`url(#planec-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#planes-${uid})`}/>
<ellipse cx="44" cy="42" rx="15" ry="8.2" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 44 42)"/>
</g>
<path d="M62 76 L104 30 L74 100 Z" fill="#0D5C6E" opacity="0.22"/>
<line x1="40" y1="80" x2="62" y2="76" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.6"/>
</g>

    </svg>
  );
}
