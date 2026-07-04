import { useId } from "react";

/**
 * IconIntegracion — icono ilustrado TMate (sistema 3D consistente).
 * Globo con nodos de red — integración internacional.
 * Multi-color: globo Sky/DeepTeal, nodos en Gold, rojo y Emerald.
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconIntegracion({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0EA5E9"/><stop offset="100%" stopColor="#0D5C6E"/>
</linearGradient>
<linearGradient id={`sh-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="55%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="100%" stopColor="#0C2340" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`cc-${uid}`}><circle cx="64" cy="64" r="46" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<circle cx="64" cy="64" r="46" fill={`url(#bg-${uid})`}/>
<g clipPath={`url(#cc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#sh-${uid})`}/>
<ellipse cx="48" cy="46" rx="15" ry="8.2" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 48 46)"/>
</g>
<circle cx="64" cy="64" r="20" fill="none" stroke="#FFFFFF" strokeWidth="3.5" opacity="0.9"/>
<line x1="48" y1="50" x2="80" y2="78" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.7"/>
<line x1="80" y1="50" x2="48" y2="78" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.7"/>
<line x1="44" y1="64" x2="84" y2="64" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.7"/>
<circle cx="48" cy="50" r="5" fill="#FBBF24"/>
<circle cx="80" cy="50" r="5" fill="#EF4444"/>
<circle cx="80" cy="78" r="5" fill="#10B981"/>
<circle cx="48" cy="78" r="5" fill="#FFFFFF"/>
</g>

    </svg>
  );
}
