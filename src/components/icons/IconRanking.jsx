import { useId } from "react";

/**
 * IconRanking — icono ilustrado MAbroad (sistema 3D consistente).
 * Trofeo/copa para la categoría "General" del ranking de ciudades.
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconRanking({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`cupg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#FBBF24"/><stop offset="100%" stopColor="#F59E0B"/>
</linearGradient>
<linearGradient id={`cups-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="55%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="100%" stopColor="#0C2340" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`cupc-${uid}`}><path d="M38 32 L90 32 C90 54 80 66 64 66 C48 66 38 54 38 32 Z" /></clipPath>
<linearGradient id={`baseg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0D5C6E"/><stop offset="100%" stopColor="#0C2340"/>
</linearGradient>
<linearGradient id={`bases-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="55%" stopColor="#0C2340" stopOpacity="0"/>
<stop offset="100%" stopColor="#0C2340" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`basec-${uid}`}><path d="M60 66 L68 66 L68 84 L88 100 L40 100 L60 84 Z" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<path d="M38 32 L90 32 C90 54 80 66 64 66 C48 66 38 54 38 32 Z" fill={`url(#cupg-${uid})`}/>
<g clipPath={`url(#cupc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#cups-${uid})`}/>
<ellipse cx="50" cy="41" rx="14" ry="7.5" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 50 41)"/>
</g>
<path d="M60 66 L68 66 L68 84 L88 100 L40 100 L60 84 Z" fill={`url(#baseg-${uid})`}/>
<g clipPath={`url(#basec-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#bases-${uid})`}/>
</g>
<path d="M38 38 C25 38 25 60 39 62" fill="none" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round"/>
<path d="M90 38 C103 38 103 60 89 62" fill="none" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round"/>
<path d="M38 32 L90 32" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round"/>
</g>

    </svg>
  );
}
