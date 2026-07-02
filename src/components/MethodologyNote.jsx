import { useState } from "react";

// Actualiza esto cuando revises o refresques los datos de las ciudades.
export const DATA_LAST_REVIEWED = "enero de 2026";

/**
 * Nota de metodología y fuentes — explica de forma honesta cómo se
 * construyen los scores y de dónde salen los datos "duros" (beca, ayuda
 * de viaje, distancias). Se usa en la ficha de ciudad y en el comparador,
 * que son los sitios donde más se necesita este contexto.
 */
export default function MethodologyNote({ compact = false }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`trust-note${compact ? " trust-note--compact" : ""}`}>
      <button type="button" className="trust-note__toggle" onClick={() => setOpen((o) => !o)}>
        <span>📊 Cómo calculamos estos datos</span>
        <span className="trust-note__arrow">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="trust-note__body">
          <ul className="trust-note__list">
            <li>Cada categoría se puntúa del 1 al 10 combinando investigación de fuentes oficiales, comparación de precios reales por ciudad y experiencias que estudiantes Erasmus han compartido sobre cada destino.</li>
            <li>Los importes de la beca Erasmus+ y la ayuda de viaje se basan en las tarifas oficiales <strong>SEPIE / Comisión Europea 2024–2025</strong>.</li>
            <li>Las distancias entre ciudades se calculan con coordenadas reales y geocodificación (OpenStreetMap / Nominatim).</li>
          </ul>
          <p className="trust-note__updated">
            🕓 Contenido revisado en <strong>{DATA_LAST_REVIEWED}</strong>. Los precios y condiciones reales pueden variar según convocatoria — confírmalos siempre con tu universidad.
          </p>
          <p className="trust-note__feedback">
            ¿Ves algo desactualizado o que no cuadra?{" "}
            <a href="mailto:hola@tmate.app?subject=Dato%20desactualizado%20en%20TMate">Escríbenos</a>.
          </p>
        </div>
      )}
    </div>
  );
}
