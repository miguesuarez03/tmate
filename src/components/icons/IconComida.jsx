import { useId } from "react";

/**
 * IconComida — icono ilustrado MAbroad (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconComida({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`plateg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#F59E0B"/><stop offset="100%" stopColor="#FBBF24"/>
</linearGradient>
<linearGradient id={`plates-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="55%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="100%" stopColor="#0C2340" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`platec-${uid}`}><circle cx="64" cy="64" r="42" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<circle cx="64" cy="64" r="42" fill={`url(#plateg-${uid})`}/>
<g clipPath={`url(#platec-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#plates-${uid})`}/>
<ellipse cx="48" cy="46" rx="15" ry="8.2" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 48 46)"/>
</g>
<circle cx="64" cy="64" r="30" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.6"/>
<g stroke="#0C2340" strokeWidth="4.4" strokeLinecap="round" fill="none"><line x1="46" y1="42" x2="46" y2="86"/><line x1="40" y1="42" x2="40" y2="56"/><line x1="52" y1="42" x2="52" y2="56"/><path d="M40 56 C40 62 52 62 52 56"/></g>
<g stroke="#0C2340" strokeWidth="4.4" strokeLinecap="round" fill="none"><line x1="82" y1="86" x2="82" y2="58"/><path d="M82 58 C82 44 90 40 90 40 C90 48 86 54 82 58 Z" fill="#0C2340" stroke="none"/></g>
</g>

    </svg>
  );
}
