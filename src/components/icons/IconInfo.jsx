/**
 * IconInfo — glifo de control (no ilustrado, a diferencia del resto del
 * set): una "i" de información. Pensado para ir dentro de botones pequeños
 * (créditos de foto), así que hereda el color del texto (currentColor).
 * @param {number} size - tamaño en px (ancho y alto). Default 16.
 * @param {string} className
 */
export default function IconInfo({ size = 16, className = "", ...rest }) {
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
      <circle cx="8" cy="3.6" r="1.5" />
      <path d="M6.4 6.4h2.6v6.1h1.1V14H5.9v-1.5H7V7.9h-.6z" />
    </svg>
  );
}
