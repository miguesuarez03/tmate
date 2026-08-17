import { useId } from "react";

/**
 * IconEstiloVida — icono ilustrado MAbroad (sistema 3D consistente).
 * Montaña con sol — estilo de vida y entorno.
 * Multi-color: montañas Emerald/DeepTeal, cumbre nevada blanca, sol Gold.
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconEstiloVida({ size = 56, className = "", ...rest }) {
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
<stop offset="0%" stopColor="#F5963A"/><stop offset="100%" stopColor="#FFC95E"/>
</linearGradient>
<linearGradient id={`mg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#10B981"/><stop offset="100%" stopColor="#16364D"/>
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
</g>
<circle cx="86" cy="42" r="10" fill="#FBBF24"/>
<path d="M40 84 L58 52 L70 68 L78 56 L96 84 Z" fill={`url(#mg-${uid})`}/>
<path d="M58 52 L64 62 L52 62 Z" fill="#FFFFFF" opacity="0.9"/>
<path d="M78 56 L83 63 L73 63 Z" fill="#FFFFFF" opacity="0.9"/>
</g>

    </svg>
  );
}
