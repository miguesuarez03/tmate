import { useId } from "react";

const TONES = {
  gold: ["#FBBF24", "#F59E0B"],
  silver: ["#E2E8F0", "#94A3B8"],
  bronze: ["#F59E0B", "#78350F"],
};

/**
 * IconMedalla — icono ilustrado MAbroad (sistema 3D consistente).
 * Medalla de posición para rankings (top 1/2/3).
 * Luz 135°, sombra navy 20%, brillo especular soft-light.
 * @param {number} size - tamaño en px (ancho y alto). Default 56.
 * @param {"gold"|"silver"|"bronze"} tone - variante de posición. Default "gold".
 * @param {string} className
 */
export default function IconMedalla({ size = 56, tone = "gold", className = "", ...rest }) {
  const uid = useId();
  const [c1, c2] = TONES[tone] || TONES.gold;
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
<linearGradient id={`rg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#3F7A7D"/><stop offset="100%" stopColor="#16364D"/>
</linearGradient>
<linearGradient id={`mg-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor={c1}/><stop offset="100%" stopColor={c2}/>
</linearGradient>
<linearGradient id={`ms-${uid}`} x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="55%" stopColor="#2F5073" stopOpacity="0"/>
<stop offset="100%" stopColor="#2F5073" stopOpacity="0.32"/>
</linearGradient>
<clipPath id={`mc-${uid}`}><circle cx="64" cy="76" r="24" /></clipPath>
</defs>
<g filter={`url(#ds-${uid})`}>
<path d="M50 40 L38 62 L54 66 Z" fill={`url(#rg-${uid})`}/>
<path d="M78 40 L90 62 L74 66 Z" fill={`url(#rg-${uid})`}/>
<circle cx="64" cy="76" r="24" fill={`url(#mg-${uid})`}/>
<g clipPath={`url(#mc-${uid})`}>
<rect x="0" y="0" width="128" height="128" fill={`url(#ms-${uid})`}/>
<ellipse cx="55" cy="68" rx="8" ry="4.4" fill="#FFFFFF" opacity="0.4"
style={{ mixBlendMode: "soft-light" }} transform="rotate(-35 55 68)"/>
</g>
<circle cx="64" cy="76" r="24" fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.6"/>
</g>

    </svg>
  );
}
