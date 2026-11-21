import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import Flag from "../components/Flag";
import UniversityOfficialInfo from "../components/university/UniversityOfficialInfo";
import { useSEO } from "../hooks/useSEO";
import { useUniversity } from "../hooks/useUniversity";
import { useUniversityPage } from "../hooks/useUniversityPage";
import { getUniversityEntry } from "../data/universities/registry";
import { FLAG_CODES } from "../data/flagSprite";
import {
  buildUniversityPageView, getDegreeSummaries, getUniversityFaqs, getUniversityPageMeta, getUniversityPageJsonLd,
  getAgreementLabel, formatAgreementCount, formatTotals, formatExtractedAt, getDegreeShortName, UNIVERSITIES_PATH,
} from "../lib/universities";
import NotFoundPage from "./NotFoundPage";
import styles from "./UniversityPage.module.css";

/* ─────────────────────────────────────────────────────────────────────────
   /universidades/:id — los convenios de intercambio de una universidad del
   registro, prerenderizados: cifras, selector de grado (filtra al momento y
   deja el grado en la URL: /universidades/loyola#ade), un bloque por país
   (programa, idioma requerido, ficha de la ciudad), un resumen con ancla por
   grado, la Oficina (registro → official) y preguntas frecuentes con fuente.
   «Convenios», nunca «plazas». Los destinos en España (SICUE) no salen; los
   de otros programas (MAGIS…), plegados.
   Primer render = HTML prerenderizado (todos los grados); el grado del
   hash o el elegido en «Mi universidad» se aplican en un efecto.
   ───────────────────────────────────────────────────────────────────────── */

/** Emoji de bandera de un código ISO («IT» → 🇮🇹), solo si el sprite la tiene. */
function flagFor(code) {
  const cc = String(code ?? "").toLowerCase();
  if (!/^[a-z]{2}$/.test(cc) || !FLAG_CODES.has(cc)) return null;
  return String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

function Stats({ totals }) {
  const items = [
    [totals.agreements, totals.agreements === 1 ? "convenio" : "convenios"],
    [totals.countries, totals.countries === 1 ? "país" : "países"],
    [totals.cities, totals.cities === 1 ? "ciudad" : "ciudades"],
  ];
  return (
    <dl className={styles.stats} aria-live="polite">
      {items.map(([n, label]) => (
        <div key={label} className={styles.stat}>
          <dt>{label}</dt>
          <dd>{n}</dd>
        </div>
      ))}
    </dl>
  );
}

function CountrySection({ country }) {
  const flag = flagFor(country.code);
  return (
    <section id={country.anchor} className={styles.country} aria-labelledby={`${country.anchor}-t`}>
      <h3 id={`${country.anchor}-t`} className={styles.countryTitle}>
        {flag && <Flag emoji={flag} />} {country.name}
        <span className={styles.countryCount}>{formatAgreementCount(country.count)}</span>
      </h3>
      <ul className={styles.cities}>
        {country.cities.map((c) => (
          <li key={c.key} className={styles.city}>
            <div className={styles.cityHead}>
              <h4 className={styles.cityName}>{c.name}</h4>
              {c.slug ? (
                <Link to={`/city/${c.slug}`} className={styles.cityLink}>Ver ficha de {c.name} →</Link>
              ) : (
                <span className={styles.cityPending}>Ficha en preparación</span>
              )}
            </div>
            <ul className={styles.rels}>
              {c.relations.map((r) => (
                <li key={r.relationId} className={styles.rel}>
                  <span className={styles.relUni}>{r.university}</span>
                  <span className={styles.tag}>{getAgreementLabel(r.agreementType)}</span>
                  <span className={styles.relLang}>
                    {r.language ? <>Idioma: {r.language}</> : "Idioma: el portal no lo indica"}
                  </span>
                  {r.degreesUnspecified && <span className={styles.rri}>Consulta en tu oficina de RRII</span>}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function UniversityPage() {
  const { id } = useParams();
  const entry = getUniversityEntry(id);
  const page = useUniversityPage(id);
  const uni = useUniversity();
  const [degreeId, setDegreeId] = useState(null);

  const meta = entry && page ? getUniversityPageMeta(entry, page) : null;
  const jsonLd = useMemo(() => (entry && page ? getUniversityPageJsonLd(entry, page) : null), [entry, page]);
  const faqs = useMemo(() => getUniversityFaqs(entry, page), [entry, page]);
  const degrees = useMemo(() => getDegreeSummaries(entry, page), [entry, page]);
  const view = useMemo(() => (page ? buildUniversityPageView(page, degreeId) : null), [page, degreeId]);
  useSEO(meta ? { ...meta, jsonLd } : {});

  // Grado de la URL (#ade) o, si no hay, el elegido en «Mi universidad».
  // En un efecto: el primer render tiene que ser el HTML prerenderizado.
  const known = useMemo(() => new Set(degrees.map((d) => d.id)), [degrees]);
  useEffect(() => {
    const fromHash = () => {
      const h = decodeURIComponent(window.location.hash.slice(1));
      if (known.has(h)) setDegreeId(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [known]);
  useEffect(() => {
    if (uni.uniId === id && uni.degreeId && known.has(uni.degreeId) && !known.has(window.location.hash.slice(1))) {
      setDegreeId(uni.degreeId);
    }
  }, [uni.uniId, uni.degreeId, id, known]);

  if (!entry || !page) return <NotFoundPage />;

  const name = entry.shortName;
  const degree = degrees.find((d) => d.id === degreeId) ?? null;
  const isMine = uni.uniId === id && uni.degreeId === degreeId;

  /** Elige grado: filtra y lo deja en la URL sin mover la página. */
  const chooseDegree = (next) => {
    setDegreeId(next || null);
    const url = `${window.location.pathname}${window.location.search}${next ? `#${next}` : ""}`;
    window.history.replaceState(window.history.state, "", url);
  };
  const showCountries = (next) => {
    chooseDegree(next);
    document.getElementById("destinos")?.scrollIntoView({ block: "start" });
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <nav aria-label="Migas de pan" className={styles.crumbs}>
            <Link to="/">Inicio</Link> <span aria-hidden="true">›</span>{" "}
            <Link to={UNIVERSITIES_PATH}>Universidades</Link> <span aria-hidden="true">›</span>{" "}
            <span aria-current="page">{name}</span>
          </nav>
          <SectionLabel color="var(--color-primary)">Destinos de intercambio</SectionLabel>
          <h1 className={styles.title}>Destinos Erasmus de la {entry.name}</h1>
          <p className={styles.sub}>
            Todos los convenios de intercambio de {name} fuera de España, por grado y por país, con el idioma que pide
            cada universidad de destino y la ficha de la ciudad. Cada convenio es un acuerdo con una universidad, no
            un número de plazas.
          </p>

          <div className={styles.picker}>
            <label htmlFor="grado" className={styles.pickerLabel}>Tu grado</label>
            <select id="grado" className={styles.select} value={degreeId ?? ""} onChange={(e) => chooseDegree(e.target.value)}>
              <option value="">Todos los grados ({formatAgreementCount(page.totals.agreements)})</option>
              {degrees.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({formatAgreementCount(d.totals.agreements)})</option>
              ))}
            </select>
          </div>
          <Stats totals={view.totals} />
          {degree && (
            <p className={styles.mine}>
              {isMine ? (
                <>Toda la web ya enseña solo tus destinos de {getDegreeShortName(degree.name, degree.id)}. <Link to="/">Ver en el mapa →</Link></>
              ) : (
                <button type="button" className={styles.mineBtn} onClick={() => uni.setUniversity(id, degree.id)}>
                  Ver solo estos destinos en toda la web
                </button>
              )}
            </p>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <section id="destinos" aria-labelledby="destinos-t" className={styles.block}>
          <h2 id="destinos-t" className={styles.h2}>
            {degree ? `Destinos de ${degree.name}` : "Destinos por país"}
          </h2>
          <p className={styles.lead}>
            {degree
              ? `${formatTotals(view.totals)} para ${degree.name}. Incluye los convenios para los que el portal no dice el grado («Consulta en tu oficina de RRII»).`
              : `${formatTotals(view.totals)}. Elige tu grado arriba para ver solo los tuyos.`}
          </p>
          <ul className={styles.chips} aria-label="Países">
            {view.countries.map((c) => (
              <li key={c.code}><a href={`#${c.anchor}`}>{c.name} <span>{c.count}</span></a></li>
            ))}
          </ul>
          {view.countries.map((c) => <CountrySection key={c.code} country={c} />)}

          {view.other.map((o) => (
            <details key={o.type} className={styles.other}>
              <summary>Otros programas: {o.name} ({formatAgreementCount(o.count)})</summary>
              <p className={styles.lead}>No son intercambios de estudios de un cuatrimestre o un curso, así que no cuentan en las cifras de arriba.</p>
              {o.countries.map((c) => (
                <p key={c.code} className={styles.otherRow}>
                  <strong>{c.name}:</strong>{" "}
                  {c.cities.map((x) => `${x.name} (${x.relations.map((r) => r.university).join(", ")})`).join(" · ")}
                </p>
              ))}
            </details>
          ))}
        </section>

        <section id="grados" aria-labelledby="grados-t" className={styles.block}>
          <h2 id="grados-t" className={styles.h2}>Destinos por grado</h2>
          <div className={styles.degrees}>
            {degrees.map((d) => {
              const withFicha = d.cities.filter((c) => c.slug);
              const rest = d.cities.length - withFicha.length;
              return (
                <section key={d.id} id={d.id} className={styles.degree} aria-labelledby={`${d.id}-t`}>
                  <h3 id={`${d.id}-t`} className={styles.degreeTitle}>{d.name}</h3>
                  <p className={styles.degreeTotals}>{formatTotals(d.totals)}</p>
                  {withFicha.length > 0 && (
                    <p className={styles.degreeCities}>
                      {withFicha.map((c, i) => (
                        <span key={c.slug}>{i > 0 && " · "}<Link to={`/city/${c.slug}`}>{c.name}</Link></span>
                      ))}
                      {rest > 0 && <span className={styles.degreeRest}> y {rest} {rest === 1 ? "ciudad" : "ciudades"} más</span>}
                    </p>
                  )}
                  <button type="button" className={styles.degreeBtn} onClick={() => showCountries(d.id)}>
                    Ver por país
                  </button>
                </section>
              );
            })}
          </div>
        </section>

        <UniversityOfficialInfo entry={entry} context="Plazos, requisitos y contacto que publica la propia universidad, cada uno con su fuente." />

        <section id="faq" aria-labelledby="faq-t" className={styles.block}>
          <h2 id="faq-t" className={styles.h2}>Preguntas frecuentes</h2>
          <div className={styles.faqs}>
            {faqs.map((f) => (
              <div key={f.q} className={styles.faq}>
                <h3 className={styles.faqQ}>{f.q}</h3>
                <p className={styles.faqA}>
                  {f.a}{" "}
                  <a href={f.source} target="_blank" rel="noopener noreferrer" className={styles.source}>Fuente ↗</a>
                </p>
              </div>
            ))}
          </div>
        </section>

        <p className={styles.fine}>
          Fuente: {entry.name}, portal de movilidad (datos del {formatExtractedAt(page.extractedAt)}), publicado con
          permiso de la universidad.{" "}
          <a href={page.source} target="_blank" rel="noopener noreferrer">Ver el portal ↗</a>{" "}
          Las plazas, fechas y requisitos de cada convocatoria los fija la universidad: confírmalos siempre con su
          Oficina de Relaciones Internacionales.
        </p>
      </main>

      <Footer />
    </div>
  );
}
