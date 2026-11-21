import { useState } from "react";
import { Link } from "react-router-dom";
import { useUniversity } from "../../hooks/useUniversity";
import { getUniversityEntry } from "../../data/universities/registry";
import {
  getAgreementLabel, formatExtractedAt, formatAgreementCount, studentQuoteLabel,
  cleanPortalText, splitPortalCosts, linkifyParts, getDegreeShortName, relationMatchesDegree, getUniversityPath,
} from "../../lib/universities";
import styles from "./University.module.css";

const norm = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/**
 * Observaciones del portal de un convenio, separadas: lo que dice la
 * universidad y las opiniones de antiguos alumnos (marcadas como tales).
 * Llegan ya separadas en la ficha (`noteParts`, ver scripts/city-data.mjs).
 */
export function RelationNotes({ parts = [], shortName }) {
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

function PlaceCard({ rel, cityName, shortName }) {
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
      {rel.noteParts?.length > 0 && <RelationNotes parts={rel.noteParts} shortName={shortName} />}
    </li>
  );
}

/** Tarjetas de convenios y, plegados, los de otros programas (MAGIS…). */
function PlaceLists({ list, others, cityName, shortName }) {
  return (
    <>
      {list.length > 0 && (
        <ul className={styles.placesList}>
          {list.map((rel) => <PlaceCard key={rel.relationId} rel={rel} cityName={cityName} shortName={shortName} />)}
        </ul>
      )}
      {others.length > 0 && (
        <details className={styles.otherPrograms}>
          <summary>
            Otros programas: {[...new Set(others.map((r) => getAgreementLabel(r.agreementType)))].join(", ")} ({others.length})
          </summary>
          <p className={styles.pendingSub}>No son intercambios de estudios de un cuatrimestre o un curso.</p>
          <ul className={styles.placesList}>
            {others.map((rel) => <PlaceCard key={rel.relationId} rel={rel} cityName={cityName} shortName={shortName} />)}
          </ul>
        </details>
      )}
    </>
  );
}

/** Enlace a la página de la universidad y fuente (portal de movilidad y fecha). */
function PlacesFoot({ entry, agreements }) {
  return (
    <>
      <p className={styles.placesMore}>
        <Link to={getUniversityPath(entry.id)}>Todos los destinos de {entry.shortName}, por grado y por país →</Link>
      </p>
      <p className={styles.placesFoot}>
        <a href={agreements.source} target="_blank" rel="noopener noreferrer" className={styles.portalLink}>
          Ver en el portal de {entry.shortName} ↗
        </a>
        <span>
          Fuente: {entry.name}, portal de movilidad ({formatExtractedAt(agreements.extractedAt)}). Confirma siempre
          con la Oficina de Relaciones Internacionales.
        </span>
      </p>
    </>
  );
}

/**
 * Convenios de intercambio de las universidades del registro en esta ciudad.
 * Los datos vienen en la ficha (`universityAgreements`, generado por
 * scripts/city-data.mjs), así que el bloque sale en el HTML prerenderizado:
 *  · Sin universidad elegida (también en el prerender): un desplegable por
 *    universidad, plegado, con enlace a /universidades/<id>.
 *  · Con universidad elegida (se aplica al hidratar): «Tus convenios desde
 *    Loyola», filtrados por el grado (interruptor «Solo mi grado / Todos los
 *    grados»), y plegados los de otros programas (MAGIS…). Si esa universidad
 *    no tiene convenios aquí, nada.
 * No enlaza a los factsheets: el portal los sirve desde una sesión.
 * @param {{ cityName: string, agreements?: any[] | null }} props
 */
export default function UniversityPlaces({ cityName, agreements = null }) {
  const uni = useUniversity();
  const [allDegrees, setAllDegrees] = useState(false);
  if (!agreements?.length) return null;

  if (!uni.uniId) {
    return (
      <section id="convenios" className={styles.places} aria-labelledby="convenios-title">
        <div className={styles.placesInner}>
          <p className={styles.placesEyebrow}>Universidades</p>
          <h2 id="convenios-title" className={styles.placesTitle}>Convenios de intercambio en {cityName}</h2>
          {agreements.map((a) => {
            const entry = getUniversityEntry(a.id);
            if (!entry) return null;
            return (
              <details key={a.id} className={styles.cityAgreements}>
                <summary>
                  {entry.name}: {formatAgreementCount(a.count)}
                  {a.other.length > 0 && ` (y ${a.other.length} de otros programas)`}
                </summary>
                <PlaceLists list={a.study} others={a.other} cityName={cityName} shortName={entry.shortName} />
                <PlacesFoot entry={entry} agreements={a} />
              </details>
            );
          })}
        </div>
      </section>
    );
  }

  const mine = agreements.find((a) => a.id === uni.uniId);
  const entry = uni.entry;
  if (!mine || !entry) return null;
  const all = mine.study;
  // Grado: el nombre sale del registro (no hace falta esperar a los convenios).
  const degree = entry.degrees?.find((d) => d.id === uni.degreeId) ?? null;
  const byDegree = degree ? all.filter((r) => relationMatchesDegree(r, degree.id)) : all;
  const list = degree && !allDegrees ? byDegree : all;
  const name = entry.shortName;
  const degreeShort = degree ? getDegreeShortName(degree.name, degree.id) : null;

  return (
    <section id="tus-convenios" className={styles.places} aria-labelledby="tus-convenios-title">
      <div className={styles.placesInner}>
        <p className={styles.placesEyebrow}>Mi universidad</p>
        <h2 id="tus-convenios-title" className={styles.placesTitle}>Tus convenios desde {name}</h2>
        <p className={styles.placesSub}>
          {all.length === 0
            ? `${name} no tiene convenios de estudios en ${cityName}.`
            : degree
              ? byDegree.length
                ? `Para tu grado (${degreeShort}) hay ${formatAgreementCount(byDegree.length)} en ${cityName}. En total, ${name} tiene ${formatAgreementCount(all.length)} aquí.`
                : `Para tu grado (${degreeShort}) no hay convenios en ${cityName}. En total, ${name} tiene ${formatAgreementCount(all.length)} aquí, de otros grados.`
              : `${name} tiene ${formatAgreementCount(all.length)} en ${cityName}, de todos sus grados.`}
        </p>
        {degree && all.length > 0 && (
          <div className={styles.segmented} role="group" aria-label="Qué convenios ver">
            <button type="button" aria-pressed={!allDegrees} className={!allDegrees ? styles.segmentedOn : ""} onClick={() => setAllDegrees(false)}>
              Solo mi grado ({byDegree.length})
            </button>
            <button type="button" aria-pressed={allDegrees} className={allDegrees ? styles.segmentedOn : ""} onClick={() => setAllDegrees(true)}>
              Todos los grados de {name} ({all.length})
            </button>
          </div>
        )}

        {all.length > 0 && list.length === 0 && (
          <p className={styles.placesEmpty}>
            No hay convenios para tu grado en {cityName}. Pulsa «Todos los grados de {name}» para ver los demás.
          </p>
        )}
        <PlaceLists list={list} others={mine.other} cityName={cityName} shortName={name} />
        <PlacesFoot entry={entry} agreements={mine} />
      </div>
    </section>
  );
}
