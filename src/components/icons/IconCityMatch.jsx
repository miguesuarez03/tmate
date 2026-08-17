import { useId } from "react";

/**
 * IconCityMatch — icono ilustrado MAbroad (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconCityMatch({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`compassg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#3F7A7D"/><stop offset="55%" stopColor="#A6D5DB"/><stop offset="100%" stopColor="#3F7A7D"/>
</linearGradient>
<linearGradient id={`compasss-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`compassc-${uid}`}><circle cx="64" cy="64" r="46" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<circle cx="64" cy="64" r="46" fill={`url(#compassg-${uid})`}/>
<g clipPath={`url(#compassc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#compasss-${uid})`}/>
<ellipse cx="48" cy="46" rx="15" ry="8.2" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 48 46)"/>
</g>
<circle cx="64" cy="64" r="46" fill="none" stroke="#16364D" strokeOpacity="0.4" strokeWidth="2"/>
<circle cx="64" cy="64" r="34" fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.4"/>
<circle cx="64" cy="21.5" r="3.2" fill="#DC2626"/>
<circle cx="64" cy="106.5" r="3.2" fill="#FFFFFF" opacity="0.85"/>
<circle cx="21.5" cy="64" r="3.2" fill="#10B981"/>
<circle cx="106.5" cy="64" r="3.2" fill="#10B981"/>
<path d="M64 34 L72 64 L64 70 L56 64 Z" fill="#DC2626"/>
<path d="M64 34 L72 64 L64 70 Z" fill="#B91C1C" opacity="0.6"/>
<path d="M64 94 L56 64 L64 58 L72 64 Z" fill="#E2E8F0"/>
<path d="M64 94 L56 64 L64 58 Z" fill="#CBD5E1" opacity="0.55"/>
<circle cx="64" cy="64" r="6.5" fill="#2F5073"/>
<circle cx="64" cy="64" r="6.5" fill="none" stroke="#FBBF24" strokeWidth="1.2" strokeOpacity="0.7"/>
</g>

    </svg>
  );
}
