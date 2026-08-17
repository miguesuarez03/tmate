import { useId } from "react";

/**
 * IconLearningAgreement — icono ilustrado MAbroad (sistema 3D consistente).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {string} className
 */
export default function IconLearningAgreement({ size = 56, className = "", ...rest }) {
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
<linearGradient id={`folderg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#F5963A"/><stop offset="100%" stopColor="#FFC95E"/>
</linearGradient>
<linearGradient id={`folders-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`folderc-${uid}`}><path d="M20 40 L54 40 L60 48 L108 48 L108 96 C108 100 104 104 100 104 L24 104 C22 104 20 102 20 100 Z" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<rect x="40" y="34" width="42" height="52" rx="3" fill="#FFFFFF"/>
<rect x="40" y="34" width="42" height="52" rx="3" fill="none" stroke="#CBD5E1" strokeWidth="1"/>
<line x1="47" y1="46" x2="75" y2="46" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round"/>
<line x1="47" y1="54" x2="75" y2="54" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round"/>
<line x1="47" y1="62" x2="63" y2="62" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round"/>
<path d="M20 40 L54 40 L60 48 L108 48 L108 96 C108 100 104 104 100 104 L24 104 C22 104 20 102 20 100 Z" fill={`url(#folderg-${uid})`}/>
<g clipPath={`url(#folderc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#folders-${uid})`}/>
<ellipse cx="36" cy="44" rx="13" ry="7.2" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 36 44)"/>
</g>
<circle cx="90" cy="88" r="17" fill="#10B981"/>
<ellipse cx="85" cy="83" rx="5" ry="3.2" fill="#FFFFFF" opacity="0.4" style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 85 83)"/>
<path d="M82 88 L88 94 L99 81" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
</g>

    </svg>
  );
}
