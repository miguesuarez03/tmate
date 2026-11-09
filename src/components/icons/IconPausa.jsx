/**
 * IconPausa — glifo de control (no ilustrado, a diferencia del resto del
 * set): dos barras redondeadas. Pensado para ir dentro de botones
 * pequeños, así que hereda el color del texto (currentColor).
 * @param {number} size - tamaño en px (ancho y alto). Default 16.
 * @param {string} className
 */
export default function IconPausa({ size = 16, className = "", ...rest }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden={rest["aria-label"] ? undefined : true}
      {...rest}
    >
      <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
      <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
    </svg>
  );
}
