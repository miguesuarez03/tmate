import { useId } from "react";

/**
 * IconAccesibilidad — icono ilustrado TMate (sistema 3D consistente).
 * Accesibilidad — ayudas para estudiantes con discapacidad.
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconAccesibilidad({ size = 56, className = "", ...rest }) {
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
<stop offset="0%" stopColor="#0EA5E9"/><stop offset="100%" stopColor="#06B6D4"/>
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
<circle cx="64" cy="44" r="7" fill="#FFFFFF" opacity="0.95"/>
<path d="M64 54 L64 76" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" opacity="0.95"/>
<path d="M48 62 L80 62" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.95"/>
<path d="M64 76 L52 88 M64 76 L76 88" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.95"/>
</g>

    </svg>
  );
}
