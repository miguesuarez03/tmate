import { useId } from "react";

/**
 * IconAmigos — icono ilustrado MAbroad (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconAmigos({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`avAg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#3F7A7D"/><stop offset="100%" stopColor="#10B981"/>
</linearGradient>
<linearGradient id={`avAs-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`avAc-${uid}`}><circle cx="48" cy="58" r="30" /></clipPath>
<linearGradient id={`avBg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#3F7A7D"/><stop offset="100%" stopColor="#3F7A7D"/>
</linearGradient>
<linearGradient id={`avBs-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`avBc-${uid}`}><circle cx="84" cy="58" r="30" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<circle cx="84" cy="58" r="30" fill={`url(#avBg-${uid})`}/>
<g clipPath={`url(#avBc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#avBs-${uid})`}/>
<ellipse cx="96" cy="42" rx="11" ry="6.1" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 96 42)"/>
</g>
<circle cx="84" cy="48" r="8" fill="#FFFFFF" opacity="0.9"/>
<path d="M68 78 C68 66 98 66 98 78 Z" fill="#FFFFFF" opacity="0.9"/>
<circle cx="48" cy="58" r="30" fill={`url(#avAg-${uid})`}/>
<g clipPath={`url(#avAc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#avAs-${uid})`}/>
<ellipse cx="34" cy="42" rx="11" ry="6.1" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 34 42)"/>
</g>
<circle cx="48" cy="48" r="8" fill="#FFFFFF" opacity="0.9"/>
<path d="M32 78 C32 66 62 66 62 78 Z" fill="#FFFFFF" opacity="0.9"/>
</g>

    </svg>
  );
}
