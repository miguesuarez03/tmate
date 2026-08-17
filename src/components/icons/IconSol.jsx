import { useId } from "react";

/**
 * IconSol — icono ilustrado MAbroad (sistema 3D consistente).
 * Sol — clima cálido / mucho sol.
 * Multi-color: núcleo Amber→Gold, acento interior en rojo cálido.
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconSol({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`sung-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#FBBF24"/><stop offset="100%" stopColor="#F59E0B"/>
</linearGradient>
<linearGradient id={`sh-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="55%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="100%" stopColor="#0C2340" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`cc-${uid}`}><circle cx="64" cy="64" r="46" /></clipPath>
<clipPath id={`sc-${uid}`}><circle cx="64" cy="64" r="19" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<circle cx="64" cy="64" r="46" fill={`url(#bg-${uid})`}/>
<g clipPath={`url(#cc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#sh-${uid})`}/>
</g>
{[0,45,90,135,180,225,270,315].map((a) => (
  <rect key={a} x="61.5" y="20" width="5" height="14" rx="2.5" fill="#FBBF24" transform={`rotate(${a} 64 64)`} />
))}
<circle cx="64" cy="64" r="19" fill={`url(#sung-${uid})`}/>
<g clipPath={`url(#sc-${uid})`}>
<circle cx="70" cy="70" r="12" fill="#EF4444" opacity="0.35"/>
<ellipse cx="58" cy="56" rx="6" ry="3.2" fill="#FFFFFF" opacity="0.45"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 58 56)"/>
</g>
</g>

    </svg>
  );
}
