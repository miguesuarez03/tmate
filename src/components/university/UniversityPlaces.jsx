import { useState } from "react";
import { useUniversity } from "../../hooks/useUniversity";
import { getAgreementLabel, formatExtractedAt } from "../../lib/universities";
import styles from "./University.module.css";

const norm = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/**
 * Ficha de ciudad: «Tus plazas desde Loyola». Las plazas de la universidad
 * elegida en esta ciudad, filtradas por el grado (con «Ver todas las
 * titulaciones»). Sin modo universidad, o sin plazas aquí, no se pinta nada.
 * No enlaza a los factsheets: el portal los sirve desde una sesión.
 */
export default function UniversityPlaces({ slug, cityName }) {
  const uni = useUniversity();
  const [allDegrees, setAllDegrees] = useState(false);
  if (!uni.active) return null;
  const all = uni.allPlacesFor(slug);
  if (!all.length) return null;

  const byDegree = uni.placesFor(slug);
  const list = uni.degreeId && !allDegrees ? byDegree : all;
  const name = uni.entry.shortName;
  const source = uni.data.university.source;

  return (
    <section className={styles.places} aria-labelledby="tus-plazas-title">
      <div className={styles.placesInner}>
        <p className={styles.placesEyebrow}>Mi universidad</p>
        <h2 id="tus-plazas-title" className={styles.placesTitle}>Tus plazas desde {name}</h2>
        <p className={styles.placesSub}>
          {uni.degreeName && !allDegrees
            ? `${byDegree.length} plaza${byDegree.length === 1 ? "" : "s"} para ${uni.degreeName} (de ${all.length} en ${cityName}).`
            : `${all.length} plaza${all.length === 1 ? "" : "s"} de ${name} en ${cityName}, de todas las titulaciones.`}
        </p>
        {uni.degreeId && (
          <label className={styles.toggle}>
            <input type="checkbox" checked={allDegrees} onChange={(e) => setAllDegrees(e.target.checked)} />
            Ver todas las titulaciones
          </label>
        )}

        {list.length === 0 ? (
          <p className={styles.placesEmpty}>
            No hay plazas para {uni.degreeName} en {cityName}. Marca «Ver todas las titulaciones» para ver las demás.
          </p>
        ) : (
          <ul className={styles.placesList}>
            {list.map((rel) => {
              const otherCity = norm(rel.city) !== norm(cityName) ? rel.city : null;
              return (
                <li key={rel.relationId} className={styles.placeCard}>
                  <div className={styles.placeHead}>
                    <p className={styles.placeUni}>
                      {rel.university}
                      {otherCity && <span className={styles.placeCity}> · {otherCity}</span>}
                    </p>
                    <span className={styles.agreementTag}>{getAgreementLabel(rel.agreementType)}</span>
                  </div>
                  {rel.degreesUnspecified && <p className={styles.rriTag}>Consulta en tu oficina de RRII</p>}
                  <dl className={styles.placeFacts}>
                    {rel.languageRequirement && (<><dt>Idioma requerido</dt><dd>{rel.languageRequirement}</dd></>)}
                    {rel.monthlyCost && (<><dt>Coste de vida</dt><dd>{rel.monthlyCost}</dd></>)}
                    {rel.rentPrice && (<><dt>Alquiler</dt><dd>{rel.rentPrice}</dd></>)}
                    {rel.major && (<><dt>Mención</dt><dd>{rel.major}</dd></>)}
                  </dl>
                  {rel.notes && (
                    <details className={styles.notes}>
                      <summary>Observaciones</summary>
                      <p>{rel.notes}</p>
                    </details>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <p className={styles.placesFoot}>
          <a href={source} target="_blank" rel="noopener noreferrer" className={styles.portalLink}>
            Ver en el portal de {name} ↗
          </a>
          <span>
            Datos del portal de movilidad de {name} ({formatExtractedAt(uni.data.university.extractedAt)}). Confirma siempre
            con la Oficina de Relaciones Internacionales.
          </span>
        </p>
      </div>
    </section>
  );
}
