import { useState } from "react";
import { IconGrafica, IconReloj } from "./icons";

// Actualiza esto cuando revises o refresques los datos de las ciudades.
export const DATA_LAST_REVIEWED = "enero de 2026";

/**
 * Nota de metodología: cómo se calculan DE VERDAD los scores (pesos y escalas
 * en src/lib/scoring.js, criterio completo en docs/scoring.md; niveles en
 * getScoreLevel de src/lib/cities.js) y de dónde salen los
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
              <strong>La nota global:</strong> es la media ponderada, siempre con los mismos pesos, de 8 subnotas de 0 a
              10 (toca la nota para ver las de cada ciudad): coste de vida 20 %, vida estudiantil 20 %, seguridad 15 %,
              salidas profesionales 10 %, nivel académico 10 %, alojamiento 10 %, calidad de vida y clima 10 % y
              conectividad 5 %. De 8,0 en adelante es «Excelente»; de 7,0 a 7,9, «Muy buena»; de 6,0 a 6,9, «Buena»; y por
              debajo de 6,0, «Mejorable».
            </li>
            <li>
              <strong>Subnotas con dato:</strong> coste (coste mensual de la ficha: 400 €/mes o menos es un 10 y cada 200 €
              más resta un punto) y nivel académico (mejor puesto de las universidades de la ciudad en el ranking
              <strong> Times Higher Education</strong>; si ninguna aparece, un 4).
            </li>
            <li>
              <strong>Subnotas mitad dato, mitad valoración de la ciudad:</strong> seguridad (tasa de homicidios del país
              según <strong>UNODC</strong> y la valoración de MAbroad de la ciudad); salidas profesionales (porcentaje de
              jóvenes de 15 a 24 años que ni trabajan ni estudian en la región, según <strong>Eurostat</strong>, o en el
              país, según la <strong>OIT</strong>, y la valoración de MAbroad de empleo y prácticas); y vida estudiantil
              (secciones de <strong>Erasmus Student Network</strong> y estudiantes internacionales de sus universidades,
              según THE, y el ambiente: fiesta y eventos).
            </li>
            <li>
              <strong>Subnotas de valoración MAbroad:</strong> alojamiento, calidad de vida y clima, y conectividad salen
              del desglose de cada ficha. No son datos oficiales ni una encuesta, y así se marcan en el desglose.
            </li>
            <li>
              <strong>El idioma no cuenta:</strong> es una preferencia personal. En el desglose ves cuánto se puede vivir
              en inglés o en español (porcentaje que habla inglés según el <strong>Eurobarómetro 540</strong>, o un 10 si
              el inglés o el español son la lengua oficial), pero no suma ni resta.
            </li>
            <li>
              <strong>Si falta un dato:</strong> esa subnota queda «pendiente» en vez de inventarla, la nota se calcula
              con el resto de pesos y se marca como provisional (un punto naranja junto a la nota). Las notas
              provisionales no entran en los rankings hasta tener todos sus datos.
            </li>
            <li>
              <strong>Categorías de la ficha:</strong> las 8 categorías del análisis completo (coste, alojamiento, vida
              social, integración, movilidad, estilo de vida, empleo y seguridad) son la valoración de MAbroad de cada
              ciudad, con su desglose. Explican la ciudad, pero la nota global no es su media.
            </li>
            <li>
              <strong>Te faltan tras la beca:</strong> el coste medio menos el mínimo de la beca Erasmus+ del grupo del país
              (en Suiza, la beca SEMP; en América, 0 € porque no hay beca común). Es un dato aparte: no cuenta en la nota.
            </li>
            <li>
              <strong>Rankings:</strong> «Mejor nota global» y «Más vida social» usan la nota y la subnota de vida
              estudiantil; el resto reordena las categorías de la ficha (y, en clima e inglés, la subnota del desglose).
              «Más baratas» ordena por el coste mensual en euros de cada ficha.
            </li>
            <li>
              <strong>Coste mensual:</strong> si lo publica una fuente oficial (normalmente la universidad), la ficha
              indica «Fuente: …»; si no, es una «Estimación MAbroad». La etiqueta «Asequible» solo aparece cuando el
              coste viene de una fuente oficial y el mínimo no pasa de 500 €/mes; el resto de ciudades podrá llevarla
              cuando verifiquemos su coste, si cumple ese límite.
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
