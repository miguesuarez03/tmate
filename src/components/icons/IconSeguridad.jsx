import { useId } from "react";

/**
 * IconSeguridad — icono ilustrado MAbroad (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconSeguridad({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`shieldg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#10B981"/><stop offset="100%" stopColor="#14B8A6"/>
</linearGradient>
<linearGradient id={`shields-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="55%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="100%" stopColor="#0C2340" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`shieldc-${uid}`}><path d="M64 18 L98 30 L98 60 C98 86 84 100 64 112 C44 100 30 86 30 60 L30 30 Z" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<path d="M64 18 L98 30 L98 60 C98 86 84 100 64 112 C44 100 30 86 30 60 L30 30 Z" fill={`url(#shieldg-${uid})`}/>
<g clipPath={`url(#shieldc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#shields-${uid})`}/>
<ellipse cx="46" cy="40" rx="15" ry="8.2" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 46 40)"/>
</g>
<path d="M48 62 L60 74 L82 48" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
</g>

    </svg>
  );
}
