import { useId } from "react";

/**
 * IconUniversidad — icono ilustrado MAbroad (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconUniversidad({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`capbaseg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#16364D"/><stop offset="100%" stopColor="#2F5073"/>
</linearGradient>
<linearGradient id={`capbases-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`capbasec-${uid}`}><path d="M40 58 L88 58 L88 78 C88 86 78 92 64 92 C50 92 40 86 40 78 Z" /></clipPath>
<linearGradient id={`captopg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073"/><stop offset="100%" stopColor="#16364D"/>
</linearGradient>
<linearGradient id={`captops-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`captopc-${uid}`}><path d="M64 30 L106 50 L64 70 L22 50 Z" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<path d="M40 58 L88 58 L88 78 C88 86 78 92 64 92 C50 92 40 86 40 78 Z" fill={`url(#capbaseg-${uid})`}/>
<g clipPath={`url(#capbasec-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#capbases-${uid})`}/>
<ellipse cx="50" cy="62" rx="10" ry="5.5" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 50 62)"/>
</g>
<path d="M64 30 L106 50 L64 70 L22 50 Z" fill={`url(#captopg-${uid})`}/>
<g clipPath={`url(#captopc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#captops-${uid})`}/>
<ellipse cx="46" cy="42" rx="13" ry="7.2" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 46 42)"/>
</g>
<line x1="98" y1="50" x2="98" y2="80" stroke="#2F5073" strokeWidth="2"/>
<circle cx="98" cy="86" r="6" fill="#FBBF24"/>
<ellipse cx="96" cy="84" rx="2" ry="1.4" fill="#FFFFFF" opacity="0.5" style={{ mixBlendMode: "soft-light" }}/>
<circle cx="64" cy="50" r="3.4" fill="#FBBF24"/>
</g>

    </svg>
  );
}
