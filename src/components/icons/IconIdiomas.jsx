import { useId } from "react";

/**
 * IconIdiomas — icono ilustrado MAbroad (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconIdiomas({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`bubAg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#F5963A"/><stop offset="100%" stopColor="#FFC95E"/>
</linearGradient>
<linearGradient id={`bubAs-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`bubAc-${uid}`}><path d="M20 30 C20 24 25 20 31 20 L66 20 C72 20 77 24 77 30 L77 52 C77 58 72 62 66 62 L36 62 L24 74 L26 62 L31 62 C25 62 20 58 20 52 Z" /></clipPath>
<linearGradient id={`bubBg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#3F7A7D"/><stop offset="100%" stopColor="#10B981"/>
</linearGradient>
<linearGradient id={`bubBs-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`bubBc-${uid}`}><path d="M52 62 C52 56 57 52 63 52 L98 52 L98 52 C104 52 109 56 109 62 L109 84 C109 90 104 94 98 94 L68 94 L56 106 L58 94 L63 94 C57 94 52 90 52 84 Z" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<path d="M20 30 C20 24 25 20 31 20 L66 20 C72 20 77 24 77 30 L77 52 C77 58 72 62 66 62 L36 62 L24 74 L26 62 L31 62 C25 62 20 58 20 52 Z" fill={`url(#bubAg-${uid})`}/>
<g clipPath={`url(#bubAc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#bubAs-${uid})`}/>
<ellipse cx="32" cy="30" rx="12" ry="6.6" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 32 30)"/>
</g>
<path d="M52 62 C52 56 57 52 63 52 L98 52 L98 52 C104 52 109 56 109 62 L109 84 C109 90 104 94 98 94 L68 94 L56 106 L58 94 L63 94 C57 94 52 90 52 84 Z" fill={`url(#bubBg-${uid})`}/>
<g clipPath={`url(#bubBc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#bubBs-${uid})`}/>
<ellipse cx="66" cy="62" rx="12" ry="6.6" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 66 62)"/>
</g>
<text x="48" y="46" fontFamily="'Bricolage Grotesque', sans-serif" fontSize="20" fontWeight="700" textAnchor="middle" fill="#FFFFFF">A</text>
<text x="80" y="80" fontFamily="'Bricolage Grotesque', sans-serif" fontSize="20" fontWeight="700" textAnchor="middle" fill="#FFFFFF">B</text>
</g>

    </svg>
  );
}
