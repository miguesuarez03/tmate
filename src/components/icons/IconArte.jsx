import { useId } from "react";

/**
 * IconArte — icono ilustrado MAbroad (sistema 3D consistente).
 * Paleta de pintor — cultural / arte.
 * Multi-color intencional: gotas de pintura en Sky, rojo, Gold y Emerald.
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconArte({ size = 56, className = "", ...rest }) {
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
<stop offset="0%" stopColor="#2F5073"/><stop offset="100%" stopColor="#16364D"/>
</linearGradient>
<linearGradient id={`sh-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`cc-${uid}`}><circle cx="64" cy="64" r="46" /></clipPath>
<clipPath id={`pc-${uid}`}><path d="M64 40 C82 40 92 50 92 62 C92 70 86 72 80 70 C76 69 73 71 73 75 C73 80 76 83 76 87 C76 91 70 92 64 92 C46 92 36 80 36 66 C36 51 48 40 64 40 Z" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<circle cx="64" cy="64" r="46" fill={`url(#bg-${uid})`}/>
<g clipPath={`url(#cc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#sh-${uid})`}/>
</g>
<path d="M64 40 C82 40 92 50 92 62 C92 70 86 72 80 70 C76 69 73 71 73 75 C73 80 76 83 76 87 C76 91 70 92 64 92 C46 92 36 80 36 66 C36 51 48 40 64 40 Z" fill="#FFFFFF" opacity="0.95"/>
<g clipPath={`url(#pc-${uid})`}>
<ellipse cx="48" cy="52" rx="14" ry="6" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 48 52)"/>
</g>
<circle cx="48" cy="54" r="5.5" fill="#F5963A"/>
<circle cx="66" cy="50" r="5.5" fill="#EF4444"/>
<circle cx="80" cy="58" r="5.5" fill="#FBBF24"/>
<circle cx="50" cy="76" r="5.5" fill="#10B981"/>
</g>

    </svg>
  );
}
