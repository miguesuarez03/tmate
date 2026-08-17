import { useId } from "react";

/**
 * IconClipboard — icono ilustrado MAbroad (sistema 3D consistente).
 * Portapapeles — solicitud / documentos (paso 2 Proceso).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconClipboard({ size = 56, className = "", ...rest }) {
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
<stop offset="0%" stopColor="#3F7A7D"/><stop offset="100%" stopColor="#10B981"/>
</linearGradient>
<linearGradient id={`sh-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`cc-${uid}`}><circle cx="64" cy="64" r="46" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<circle cx="64" cy="64" r="46" fill={`url(#bg-${uid})`}/>
<g clipPath={`url(#cc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#sh-${uid})`}/>
<ellipse cx="48" cy="46" rx="15" ry="8.2" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 48 46)"/>
</g>
<rect x="46" y="42" width="36" height="46" rx="4" fill="#FFFFFF" opacity="0.95"/>
<rect x="56" y="38" width="16" height="9" rx="3" fill="#2F5073" opacity="0.35"/>
<line x1="53" y1="58" x2="75" y2="58" stroke="#3F7A7D" strokeWidth="3.4" strokeLinecap="round"/>
<line x1="53" y1="68" x2="75" y2="68" stroke="#3F7A7D" strokeWidth="3.4" strokeLinecap="round"/>
<line x1="53" y1="78" x2="68" y2="78" stroke="#3F7A7D" strokeWidth="3.4" strokeLinecap="round"/>
</g>

    </svg>
  );
}
