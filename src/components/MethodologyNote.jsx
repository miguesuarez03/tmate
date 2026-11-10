import { useState } from "react";
import { IconGrafica, IconReloj } from "./icons";

// Actualiza esto cuando revises o refresques los datos de las ciudades.
export const DATA_LAST_REVIEWED = "enero de 2026";

/**
 * Nota de metodología: cómo se calculan DE VERDAD los scores (ver
 * getOverallScore y getScoreLevel en src/lib/cities.js) y de dónde salen los
 * datos «duros» (beca, ayuda de viaje, distancias). Sin mencionar opiniones
 * de estudiantes mientras no haya experiencias reales publicadas: cuando las
 * haya (src/data/cityExperiences.js), habrá que contar aquí cómo influyen.
 * Se usa en la ficha de ciudad y en el comparador.
 */
export default function MethodologyNote({ compact = false }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`trust-note${compact ? " trust-note--compact" : ""}`}>
      <button type="button" className="trust-note__toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><IconGrafica size={20} /> Cómo calculamos estos datos</span>
        <span className="trust-note__arrow">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="trust-note__body">
          <ul className="trust-note__list">
            <li>
              <strong>Qué es:</strong> cada ciudad tiene una nota de 0 a 10 en 8 categorías. Es una valoración propia
              de MAbroad, no un dato oficial ni una encuesta.
            </li>
            <li>
              <strong>Con qué datos:</strong> la información de cada ficha, que se desglosa dentro de cada categoría:
              precios orientativos de alojamiento, comida, transporte y ocio (coste de vida); disponibilidad, precio y
              residencias (alojamiento); comunidad internacional y vida nocturna (vida social); nivel de inglés y
              actitud local (integración); transporte y conexiones (movilidad); clima, naturaleza y calidad de vida
              (estilo de vida); mercado laboral y prácticas (empleo); y seguridad de día y de noche (seguridad).
            </li>
            <li>
              <strong>Criterio:</strong> más alto es mejor para un estudiante (en coste de vida, 10 significa barato).
              La nota global es la media de las 8 categorías, todas con el mismo peso. De 8,5 en adelante es
              «Excelente»; de 7 a 8,4, «Bueno»; de 5,5 a 6,9, «Regular»; y por debajo, «Difícil».
            </li>
            <li>
              Los precios de las fichas son aproximados y pueden quedarse desfasados. El tamaño de ciudad de City Match
              sale de la población oficial del municipio que publica el instituto de estadística de cada país.
            </li>
            <li>
              Los importes de la beca Erasmus+ y la ayuda de viaje siguen la convocatoria 2026 del <strong>SEPIE</strong> y
              la Guía del Programa de la <strong>Comisión Europea</strong>, pero el importe oficial es el que publica tu
              universidad.
            </li>
            <li>Las distancias de la calculadora se miden en línea recta con coordenadas (OpenStreetMap / Nominatim).</li>
          </ul>
          <p className="trust-note__updated" style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
            <IconReloj size={16} /> Contenido revisado en <strong>{DATA_LAST_REVIEWED}</strong>. Precios y condiciones
            cambian: confirma lo importante con tu universidad y en fuentes oficiales.
          </p>
          <p className="trust-note__feedback">
            ¿Ves algo desactualizado o que no cuadra?{" "}
            <a href="mailto:suarezalvarez.ma03@gmail.com?subject=Dato%20desactualizado%20en%20MAbroad">Escríbenos</a>.
          </p>
        </div>
      )}
    </div>
  );
}
