/**
 * IconReproducir — glifo de control (no ilustrado, a diferencia del resto
 * del set): triángulo "play" con esquinas suaves, desplazado medio píxel a
 * la derecha para que se vea ópticamente centrado en un botón circular.
 * Hereda el color del texto (currentColor).
 * @param {number} size - tamaño en px (ancho y alto). Default 16.
 * @param {string} className
 */
export default function IconReproducir({ size = 16, className = "", ...rest }) {
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
      <path d="M5.5 3.3v9.4c0 .7.77 1.13 1.37.76l7.4-4.7a.9.9 0 0 0 0-1.52l-7.4-4.7C6.27 2.17 5.5 2.6 5.5 3.3z" />
    </svg>
  );
}
