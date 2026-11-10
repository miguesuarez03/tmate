import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import GuideBlock from "../components/guides/GuideBlock";
import GuideText from "../components/guides/GuideText";
import { useSEO } from "../hooks/useSEO";
import {
  getGuideBySlug, getGuideMeta, getGuidePath, getGuideReadingMinutes, getOtherGuides, formatGuideDate, GUIDES_PATH,
} from "../lib/guides";
import { getGuideJsonLd } from "../lib/seo";
import NotFoundPage from "./NotFoundPage";
import styles from "./GuidePage.module.css";

export default function GuidePage() {
  const { slug } = useParams();
  const guide = getGuideBySlug(slug);
  const jsonLd = useMemo(() => (guide ? getGuideJsonLd(guide) : null), [guide]);

  useSEO(guide ? { ...getGuideMeta(guide), jsonLd, ogType: "article" } : {});

  // Slug inexistente: 404 (noindex), no redirección a /guias (soft 404).
  if (!guide) return <NotFoundPage />;

  return (
    <div className={styles.page}>
      <Navbar />

      <article className={styles.article}>
        <header className={styles.header}>
          <nav className={styles.crumbs} aria-label="Migas de pan">
            <Link to="/">Inicio</Link> <span aria-hidden="true">›</span> <Link to={GUIDES_PATH}>Guías</Link>
          </nav>
          <SectionLabel color="var(--color-primary)">Guía Erasmus</SectionLabel>
          <h1 className={styles.title}>{guide.title}</h1>
          <p className={styles.meta}>
            Revisada el <time dateTime={guide.dateModified}>{formatGuideDate(guide.dateModified)}</time>
            {" · "}{getGuideReadingMinutes(guide)} min de lectura
          </p>
          <p className={styles.intro}><GuideText text={guide.intro} /></p>
        </header>

        <nav className={styles.toc} aria-labelledby="toc-title">
          <p id="toc-title" className={styles.tocTitle}>En esta guía</p>
          <ol>
            {guide.sections.map((s) => (
              <li key={s.id}><a href={`#${s.id}`}>{s.heading}</a></li>
            ))}
          </ol>
        </nav>

        <div className={styles.body}>
          {guide.sections.map((s) => (
            <section key={s.id} id={s.id} className={styles.section} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`} className={styles.h2}>{s.heading}</h2>
              {s.blocks.map((b, i) => <GuideBlock key={i} block={b} />)}
            </section>
          ))}
        </div>

        <section className={styles.sources} aria-labelledby="fuentes-h">
          <h2 id="fuentes-h" className={styles.h2Small}>Fuentes oficiales</h2>
          <ul>
            {guide.sources.map((src) => (
              <li key={src.url}>
                <a href={src.url} target="_blank" rel="noopener noreferrer">{src.label}</a>
              </li>
            ))}
          </ul>
          <p className={styles.disclaimer}>
            Resumen elaborado por MAbroad a partir de estas fuentes, revisado el {formatGuideDate(guide.dateModified)}.
            Los importes y plazos oficiales que te aplican son los de tu universidad y su convocatoria. Las cifras de
            coste de vida y las notas de las ciudades son estimaciones propias de MAbroad, no datos oficiales.
          </p>
        </section>

        <section className={styles.related} aria-labelledby="herramientas-h">
          <h2 id="herramientas-h" className={styles.h2Small}>Sigue con estas herramientas</h2>
          <ul className={styles.relatedList}>
            {guide.related.map((r) => (
              <li key={r.to}><Link to={r.to} className={styles.relatedLink}>{r.label} →</Link></li>
            ))}
          </ul>
        </section>

        <section className={styles.more} aria-labelledby="mas-guias-h">
          <h2 id="mas-guias-h" className={styles.h2Small}>Más guías</h2>
          <ul className={styles.moreList}>
            {getOtherGuides(guide).map((g) => (
              <li key={g.slug}>
                <Link to={getGuidePath(g)} className={styles.moreCard}>
                  <span className={styles.moreTitle}>{g.title}</span>
                  <span className={styles.moreText}>{g.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <Footer />
    </div>
  );
}
