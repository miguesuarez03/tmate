import { useState } from "react";
import { useUniversity } from "../../hooks/useUniversity";
import {
  getAgreementLabel, formatExtractedAt, formatAgreementCount, getRelationNotes, studentQuoteLabel,
  cleanPortalText, splitPortalCosts, linkifyParts, getDegreeShortName,
} from "../../lib/universities";
import styles from "./University.module.css";

const norm = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/**
 * Observaciones del portal de un convenio, separadas: lo que dice la
 * universidad y las opiniones de antiguos alumnos (marcadas como tales).
 */
export function RelationNotes({ rel, overrides = null, shortName }) {
  const parts = getRelationNotes(rel, overrides);
  if (!parts.length) return null;
  const hasQuotes = parts.some((p) => p.kind === "student");
  return (
    <details className={styles.notes}>
      <summary>{hasQuotes ? "Observaciones y opiniones de alumnos" : "Observaciones"}</summary>
      {parts.map((p, i) =>
        p.kind === "student" ? (
          <figure key={i} className={styles.quote}>
            <blockquote>{p.text}</blockquote>
            <figcaption>{studentQuoteLabel(shortName)}</figcaption>
          </figure>
        ) : (
          <p key={i}>
            <span className={styles.notesSource}>Portal de {shortName}: </span>
            <PortalText text={cleanPortalText(p.text) ?? p.text} />
          </p>
        )
      )}
    </details>
  );
}

/** Texto del portal con sus URL como enlaces. */
function PortalText({ text }) {
  return linkifyParts(text).map((p, i) =>
    p.url ? (
      <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className={styles.portalInlineLink}>enlace de la universidad ↗</a>
    ) : (
      <span key={i}>{p.text}</span>
    )
  );
}

function PlaceCard({ rel, cityName, shortName, overrides }) {
  const otherCity = norm(rel.city) !== norm(cityName) ? rel.city : null;
  // Textos del portal ordenados (sin «||» ni erratas) y coste de vida y
  // alojamiento por separado; las cifras no cambian.
  const { living, housing } = splitPortalCosts(rel);
  const language = cleanPortalText(rel.languageRequirement);
  const major = cleanPortalText(rel.major);
  return (
    <li className={styles.placeCard}>
      <div className={styles.placeHead}>
        <p className={styles.placeUni}>
          {rel.university}
          {otherCity && <span className={styles.placeCity}> · {otherCity}</span>}
        </p>
        <span className={styles.agreementTag}>{getAgreementLabel(rel.agreementType)}</span>
      </div>
      {rel.degreesUnspecified && <p className={styles.rriTag}>Consulta en tu oficina de RRII</p>}
      <dl className={styles.placeFacts}>
        {language && (<><dt>Idioma requerido</dt><dd><PortalText text={language} /></dd></>)}
        {living && (<><dt>Coste de vida al mes</dt><dd><PortalText text={living} /></dd></>)}
        {housing && (<><dt>Alojamiento</dt><dd><PortalText text={housing} /></dd></>)}
        {major && (<><dt>Mención</dt><dd><PortalText text={major} /></dd></>)}
      </dl>
      {rel.notes && <RelationNotes rel={rel} overrides={overrides} shortName={shortName} />}
    </li>
  );
}

/**
 * Ficha de ciudad: «Tus convenios desde Loyola». Los convenios de estudios de
 * la universidad elegida en esta ciudad, filtrados por el grado (interruptor
 * «Solo mi grado / Todos los grados»), y al final, plegados, los de otros programas
 * (MAGIS…). Sin modo universidad, o sin convenios aquí, no se pinta nada.
 * No enlaza a los factsheets: el portal los sirve desde una sesión.
 */
export default function UniversityPlaces({ slug, cityName }) {
  const uni = useUniversity();
  const [allDegrees, setAllDegrees] = useState(false);
  if (!uni.active) return null;
  const all = uni.allPlacesFor(slug);
  const others = uni.otherPlacesFor(slug);
  if (!all.length && !others.length) return null;

  const byDegree = uni.placesFor(slug);
  const list = uni.degreeId && !allDegrees ? byDegree : all;
  const name = uni.entry.shortName;
  const source = uni.data.university.source;
  const degreeShort = getDegreeShortName(uni.degreeName, uni.degreeId);

  return (
    <section id="tus-convenios" className={styles.places} aria-labelledby="tus-convenios-title">
      <div className={styles.placesInner}>
        <p className={styles.placesEyebrow}>Mi universidad</p>
        <h2 id="tus-convenios-title" className={styles.placesTitle}>Tus convenios desde {name}</h2>
        <p className={styles.placesSub}>
          {all.length === 0
            ? `${name} no tiene convenios de estudios en ${cityName}.`
            : uni.degreeName
              ? byDegree.length
                ? `Para tu grado (${degreeShort}) hay ${formatAgreementCount(byDegree.length)} en ${cityName}. En total, ${name} tiene ${formatAgreementCount(all.length)} aquí.`
                : `Para tu grado (${degreeShort}) no hay convenios en ${cityName}. En total, ${name} tiene ${formatAgreementCount(all.length)} aquí, de otros grados.`
              : `${name} tiene ${formatAgreementCount(all.length)} en ${cityName}, de todos sus grados.`}
        </p>
        {uni.degreeId && all.length > 0 && (
          <div className={styles.segmented} role="group" aria-label="Qué convenios ver">
            <button type="button" aria-pressed={!allDegrees} className={!allDegrees ? styles.segmentedOn : ""} onClick={() => setAllDegrees(false)}>
              Solo mi grado ({byDegree.length})
            </button>
            <button type="button" aria-pressed={allDegrees} className={allDegrees ? styles.segmentedOn : ""} onClick={() => setAllDegrees(true)}>
              Todos los grados de {name} ({all.length})
            </button>
          </div>
        )}

        {all.length > 0 && (list.length === 0 ? (
          <p className={styles.placesEmpty}>
            No hay convenios para tu grado en {cityName}. Pulsa «Todos los grados de {name}» para ver los demás.
          </p>
        ) : (
          <ul className={styles.placesList}>
            {list.map((rel) => <PlaceCard key={rel.relationId} rel={rel} cityName={cityName} shortName={name} overrides={uni.data.notesOverrides} />)}
          </ul>
        ))}

        {/* Programas que no son de estudios (MAGIS…): aparte y plegados. */}
        {others.length > 0 && (
          <details className={styles.otherPrograms}>
            <summary>
              Otros programas: {[...new Set(others.map((r) => getAgreementLabel(r.agreementType)))].join(", ")} ({others.length})
            </summary>
            <p className={styles.pendingSub}>No son intercambios de estudios de un cuatrimestre o un curso.</p>
            <ul className={styles.placesList}>
              {others.map((rel) => <PlaceCard key={rel.relationId} rel={rel} cityName={cityName} shortName={name} overrides={uni.data.notesOverrides} />)}
            </ul>
          </details>
        )}

        <p className={styles.placesFoot}>
          <a href={source} target="_blank" rel="noopener noreferrer" className={styles.portalLink}>
            Ver en el portal de {name} ↗
          </a>
          <span>
            Fuente: {uni.entry.name}, portal de movilidad ({formatExtractedAt(uni.data.university.extractedAt)}). Confirma
            siempre con la Oficina de Relaciones Internacionales.
          </span>
        </p>
      </div>
    </section>
  );
}
