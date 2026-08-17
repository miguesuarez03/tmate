import { useId } from "react";

/**
 * IconComparar — icono ilustrado MAbroad (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconComparar({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`poleg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#FBBF24"/><stop offset="100%" stopColor="#F59E0B"/>
</linearGradient>
<linearGradient id={`poles-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`polec-${uid}`}><rect x="61" y="30" width="6" height="76" rx="3" /></clipPath>
<linearGradient id={`beamg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#FBBF24"/><stop offset="100%" stopColor="#F59E0B"/>
</linearGradient>
<linearGradient id={`beams-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`beamc-${uid}`}><rect x="30" y="40" width="68" height="6" rx="3" /></clipPath>
<linearGradient id={`panLg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#F59E0B"/><stop offset="100%" stopColor="#FBBF24"/>
</linearGradient>
<linearGradient id={`panLs-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`panLc-${uid}`}><path d="M22 66 C22 78 44 78 44 66 Z" /></clipPath>
<linearGradient id={`panRg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#F59E0B"/><stop offset="100%" stopColor="#FBBF24"/>
</linearGradient>
<linearGradient id={`panRs-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`panRc-${uid}`}><path d="M84 66 C84 78 106 78 106 66 Z" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<path d="M46 108 L82 108 L78 114 L50 114 Z" fill="#2F5073"/>
<rect x="61" y="30" width="6" height="76" rx="3" fill={`url(#poleg-${uid})`}/>
<g clipPath={`url(#polec-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#poles-${uid})`}/>
<ellipse cx="66" cy="36" rx="6" ry="3.3" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 66 36)"/>
</g>
<rect x="30" y="40" width="68" height="6" rx="3" fill={`url(#beamg-${uid})`}/>
<g clipPath={`url(#beamc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#beams-${uid})`}/>
<ellipse cx="36" cy="41" rx="8" ry="4.4" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 36 41)"/>
</g>
<circle cx="64" cy="30" r="6" fill="#F59E0B"/>
<ellipse cx="61.5" cy="27.5" rx="2.4" ry="1.6" fill="#FFFFFF" opacity="0.45" style={{ mixBlendMode: "soft-light" }}/>
<line x1="33" y1="46" x2="26" y2="66" stroke="#2F5073" strokeOpacity="0.4" strokeWidth="1.6"/>
<line x1="33" y1="46" x2="40" y2="66" stroke="#2F5073" strokeOpacity="0.4" strokeWidth="1.6"/>
<line x1="95" y1="46" x2="88" y2="66" stroke="#2F5073" strokeOpacity="0.4" strokeWidth="1.6"/>
<line x1="95" y1="46" x2="102" y2="66" stroke="#2F5073" strokeOpacity="0.4" strokeWidth="1.6"/>
<path d="M22 66 C22 78 44 78 44 66 Z" fill={`url(#panLg-${uid})`}/>
<g clipPath={`url(#panLc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#panLs-${uid})`}/>
<ellipse cx="28" cy="68" rx="8" ry="4.4" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 28 68)"/>
</g>
<path d="M84 66 C84 78 106 78 106 66 Z" fill={`url(#panRg-${uid})`}/>
<g clipPath={`url(#panRc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#panRs-${uid})`}/>
<ellipse cx="90" cy="68" rx="8" ry="4.4" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 90 68)"/>
</g>
</g>

    </svg>
  );
}
