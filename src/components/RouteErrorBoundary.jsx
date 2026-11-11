import { Component } from "react";

/**
 * Si una página o la ficha de una ciudad no se pueden descargar (sin
 * conexión, o un deploy nuevo ha cambiado los nombres de los chunks), en vez
 * de dejar la pantalla en blanco se ofrece recargar. Se reinicia al cambiar
 * de ruta (`resetKey`).
 */
export default class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, key: props.resetKey };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  static getDerivedStateFromProps(props, state) {
    return props.resetKey !== state.key ? { error: null, key: props.resetKey } : null;
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="route-error" role="alert">
        <h1>No se ha podido cargar esta página</h1>
        <p>Puede ser la conexión o que hayamos publicado una versión nueva de la web.</p>
        <button type="button" className="btn-primary" onClick={() => window.location.reload()}>
          Recargar
        </button>
      </main>
    );
  }
}
