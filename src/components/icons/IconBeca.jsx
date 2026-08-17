import { useId } from "react";

/**
 * IconBeca — icono ilustrado MAbroad (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconBeca({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`coing-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#FBBF24"/><stop offset="100%" stopColor="#F59E0B"/>
</linearGradient>
<linearGradient id={`coins-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="55%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="100%" stopColor="#0C2340" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`coinc-${uid}`}><circle cx="64" cy="64" r="46" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<circle cx="64" cy="64" r="46" fill={`url(#coing-${uid})`}/>
<g clipPath={`url(#coinc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#coins-${uid})`}/>
<ellipse cx="48" cy="46" rx="16" ry="8.8" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 48 46)"/>
</g>
<circle cx="64" cy="64" r="37" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.6"/>
<text x="64" y="80" fontFamily="Georgia, 'DM Sans', serif" fontSize="46" fontWeight="700" textAnchor="middle" fill="#0C2340" opacity="0.88">&#8364;</text>
</g>

    </svg>
  );
}
