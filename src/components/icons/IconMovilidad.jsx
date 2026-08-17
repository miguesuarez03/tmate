import { useId } from "react";

/**
 * IconMovilidad — icono ilustrado MAbroad (sistema 3D consistente).
 * Tren — ubicación y movilidad.
 * Multi-color: cuerpo blanco sobre fondo Sky, ventanas Sky, luces rojo/Gold.
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconMovilidad({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073"/><stop offset="100%" stopColor="#16364D"/>
</linearGradient>
<linearGradient id={`sh-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`cc-${uid}`}><circle cx="64" cy="64" r="46" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<circle cx="64" cy="64" r="46" fill={`url(#bg-${uid})`}/>
<g clipPath={`url(#cc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#sh-${uid})`}/>
</g>
<rect x="42" y="38" width="44" height="40" rx="14" fill="#FFFFFF" opacity="0.95"/>
<rect x="48" y="48" width="14" height="14" rx="2" fill="#3F7A7D"/>
<rect x="66" y="48" width="14" height="14" rx="2" fill="#3F7A7D"/>
<circle cx="52" cy="80" r="6" fill="#2F5073"/>
<circle cx="76" cy="80" r="6" fill="#2F5073"/>
<rect x="46" y="30" width="8" height="8" rx="2" fill="#EF4444"/>
<rect x="74" y="30" width="8" height="8" rx="2" fill="#FBBF24"/>
</g>

    </svg>
  );
}
