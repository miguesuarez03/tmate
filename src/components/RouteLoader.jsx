import styles from "./RouteLoader.module.css";

/**
 * RouteLoader — fallback de <Suspense> al cargar el chunk de cada página.
 * Con code-splitting por ruta, la primera vez que se visita una página
 * (ej. /comparar) el navegador descarga su JS bajo demanda. Esto es
 * prácticamente instantáneo con buena conexión, pero mostramos un loader
 * mínimo para evitar una pantalla en blanco si la conexión va lenta.
 */
export default function RouteLoader() {
  return (
    <div className={styles.wrap} role="status" aria-label="Cargando">
      <div className={styles.bar} />
    </div>
  );
}
