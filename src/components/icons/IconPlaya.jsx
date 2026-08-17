import { useId } from "react";

/**
 * IconPlaya — icono ilustrado MAbroad (sistema 3D consistente).
 * Sombrilla — cerca del mar / playa.
 * Multi-color: franjas Sky/rojo cálido sobre base Amber, mástil Navy.
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconPlaya({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#3F7A7D"/><stop offset="100%" stopColor="#A6D5DB"/>
</linearGradient>
<linearGradient id={`sh-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`cc-${uid}`}><circle cx="64" cy="64" r="46" /></clipPath>
<clipPath id={`umb-${uid}`}><path d="M30 58 C30 40 46 30 64 30 C82 30 98 40 98 58 Z" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<circle cx="64" cy="64" r="46" fill={`url(#bg-${uid})`}/>
<g clipPath={`url(#cc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#sh-${uid})`}/>
</g>
<path d="M30 58 C30 40 46 30 64 30 C82 30 98 40 98 58 Z" fill="#FFFFFF" opacity="0.95"/>
<g clipPath={`url(#umb-${uid})`}>
<rect x="30" y="30" width="17" height="28" fill="#FBBF24"/>
<rect x="47" y="30" width="17" height="28" fill="#FFFFFF"/>
<rect x="64" y="30" width="17" height="28" fill="#EF4444" opacity="0.85"/>
<rect x="81" y="30" width="17" height="28" fill="#FFFFFF"/>
</g>
<line x1="64" y1="58" x2="64" y2="94" stroke="#2F5073" strokeWidth="5" strokeLinecap="round"/>
<line x1="50" y1="94" x2="78" y2="94" stroke="#2F5073" strokeWidth="5" strokeLinecap="round"/>
</g>

    </svg>
  );
}
