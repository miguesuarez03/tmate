import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import Flag from "../components/Flag";
import { IconMedalla, IconGrafica, IconComparar, IconCityMatch } from "../components/icons";
import { useSEO } from "../hooks/useSEO";
import {
  getRankingCriteria, getCriterionBySlug, getRankingPath, getErasmusRanking, getErasmusCityCount,
  getRankingMeta, formatCriterionValue, RANKINGS_PATH, RANKING_TOP,
} from "../lib/cities";
import { getCriterionIcon } from "../lib/categoryIcons";
import { getRankingJsonLd, getRankingsIndexJsonLd } from "../lib/seo";
import { RANKINGS_INDEX_META, RANKING_YEAR } from "../data/rankings";
import { responsiveImage } from "../lib/images";
import NotFoundPage from "./NotFoundPage";
import styles from "./RankingPage.module.css";

/* ─────────────────────────────────────────────────────────────────────────
   /ranking            → índice con todos los rankings y su top 3.
   /ranking/:slug      → top 20 de un criterio (src/data/rankings.js), con
                         cómo se calcula. Prerenderizadas y en el sitemap
                         (entry-server.jsx). Solo destinos con beca Erasmus+:
                         los títulos dicen «ciudades Erasmus».
   ───────────────────────────────────────────────────────────────────────── */

const CRITERIA = getRankingCriteria();
const ERASMUS_COUNT = getErasmusCityCount();
const THUMB_SLOTS = [[null, "64px", 1]];
const INDEX_JSON_LD = getRankingsIndexJsonLd(CRITERIA);

/** Medalla para el podio; número para el resto. */
function Position({ rank }) {
  if (rank <= 3) {
    return (
      <span className={styles.pos}>
        <IconMedalla size={30} tone={rank === 1 ? "gold" : rank === 2 ? "silver" : "bronze"} />
        <span className="sr-only">Puesto {rank}</span>
      </span>
    );
  }
  return <span className={styles.pos}>#{rank}</span>;
}

function RankingDetail({ criterion }) {
  const entries = useMemo(() => getErasmusRanking(criterion.id), [criterion]);
  const jsonLd = useMemo(() => getRankingJsonLd(criterion, entries), [criterion, entries]);
  useSEO({ ...getRankingMeta(criterion), jsonLd });

  const Icon = getCriterionIcon(criterion);
  const isCost = criterion.source.kind === "cost";
  const others = CRITERIA.filter((c) => c.id !== criterion.id);

  return (
    <div className={styles.page}>
      <Navbar />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Migas de pan">
            <Link to="/">Inicio</Link> <span aria-hidden="true">›</span> <Link to={RANKINGS_PATH}>Rankings</Link>
          </nav>
          <SectionLabel color="var(--color-teal)">Ranking Erasmus+ {RANKING_YEAR}</SectionLabel>
          <h1 className={styles.title}>
            <span className={styles.titleIcon} aria-hidden="true"><Icon size={44} /></span>
            {criterion.title}
          </h1>
          <p className={styles.sub}>{criterion.intro}</p>
        </div>
      </header>

      <main className={styles.main}>
        <h2 className={styles.listTitle}>Top {entries.length}: {criterion.label.toLowerCase()}</h2>
        <ol className={styles.list}>
          {entries.map((e) => (
            <li key={e.city.slug}>
              <Link to={`/city/${e.city.slug}`} className={`${styles.row}${e.rank <= 3 ? ` ${styles.rowPodium}` : ""}`}>
                <Position rank={e.rank} />
                <img
                  className={styles.thumb}
                  {...responsiveImage(e.city.img, { slots: THUMB_SLOTS, fallback: 120, min: 120 })}
                  alt=""
                  width={64}
                  height={64}
                  loading={e.rank <= 6 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className={styles.cityInfo}>
                  <span className={styles.cityName}><Flag emoji={e.city.emoji} /> {e.city.name}</span>
                  <span className={styles.cityMeta}>{e.city.country} · {e.city.tag}</span>
                  {e.city.phrase && <span className={styles.phrase}>{e.city.phrase}</span>}
                </span>
                <span className={styles.valueBox}>
                  <span className={styles.value}>{formatCriterionValue(e.city, criterion.id, e.value)}</span>
                  <span className={styles.bar} aria-hidden="true">
                    <span className={styles.barFill} style={{ width: `${Math.max(4, (e.value ?? 0) * 10)}%` }} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <section className={styles.method} aria-labelledby="ranking-method">
          <h2 id="ranking-method" className={styles.methodTitle}>
            <IconGrafica size={24} /> Cómo lo calculamos
          </h2>
          <p>{criterion.method}</p>
          <p>
            Entran los {ERASMUS_COUNT} destinos de MAbroad en la Unión Europea y países asociados a Erasmus+. Reino
            Unido (que vuelve a Erasmus+ en 2027), Suiza y los destinos de América no están en este ranking, pero puedes
            ordenarlos igual en el comparador. Si una plaza lleva beca Erasmus+ lo dice la convocatoria de tu
            universidad.
          </p>
          <p className={styles.methodFine}>
            {isCost
              ? "Para comparar con el resto de criterios, el coste también se pasa a una escala de 0 a 10: el 10 es el destino más barato de MAbroad y el 0 el más caro."
              : "Las notas son la valoración editorial de MAbroad a partir del desglose de cada ficha: no son datos oficiales ni una encuesta a estudiantes."}
            {" "}Confirma lo importante con tu universidad y en fuentes oficiales.
          </p>
        </section>

        <div className={styles.actions}>
          <Link className={styles.actionCard} to={`/comparar?orden=${criterion.id}`}>
            <span className={styles.actionIcon}><IconComparar size={32} /></span>
            <span className={styles.actionText}>
              <strong>Combínalo en el comparador</strong>
              <span>Mismo orden, con buscador, todos los destinos y filtro Erasmus+.</span>
            </span>
            <span aria-hidden="true" className={styles.actionArrow}>→</span>
          </Link>
          <Link className={styles.actionCard} to="/city-match">
            <span className={styles.actionIcon}><IconCityMatch size={32} /></span>
            <span className={styles.actionText}>
              <strong>Haz el City Match</strong>
              <span>Marca lo imprescindible y te decimos qué ciudades encajan contigo.</span>
            </span>
            <span aria-hidden="true" className={styles.actionArrow}>→</span>
          </Link>
        </div>

        <nav className={styles.others} aria-labelledby="otros-rankings">
          <h2 id="otros-rankings" className={styles.othersTitle}>Otros rankings</h2>
          <ul className={styles.othersList}>
            {others.map((c) => {
              const OtherIcon = getCriterionIcon(c);
              return (
                <li key={c.id}>
                  <Link className={styles.otherLink} to={getRankingPath(c)}>
                    <OtherIcon size={20} /> {c.chip}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </main>

      <Footer />
    </div>
  );
}

function RankingsIndex() {
  useSEO({ ...RANKINGS_INDEX_META, jsonLd: INDEX_JSON_LD });

  return (
    <div className={styles.page}>
      <Navbar />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Migas de pan">
            <Link to="/">Inicio</Link>
          </nav>
          <SectionLabel color="var(--color-teal)">Rankings Erasmus+ {RANKING_YEAR}</SectionLabel>
          <h1 className={styles.title}>Rankings de ciudades Erasmus</h1>
          <p className={styles.sub}>
            Las {ERASMUS_COUNT} ciudades con beca Erasmus+ de MAbroad ordenadas por lo que más pesa al elegir: dinero,
            ambiente, clima, seguridad, idioma, piso y salidas. El top {RANKING_TOP} de cada uno, con cómo se calcula.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <ul className={styles.indexGrid}>
          {CRITERIA.map((c) => {
            const Icon = getCriterionIcon(c);
            const podium = getErasmusRanking(c.id, 3);
            return (
              <li key={c.id}>
                <Link to={getRankingPath(c)} className={styles.indexCard}>
                  <span className={styles.indexIcon} aria-hidden="true"><Icon size={40} /></span>
                  <h2 className={styles.indexTitle}>{c.title}</h2>
                  <ol className={styles.indexPodium}>
                    {podium.map((e) => (
                      <li key={e.city.slug}>
                        <Flag emoji={e.city.emoji} /> {e.city.name}
                        <span className={styles.indexValue}>{formatCriterionValue(e.city, c.id, e.value)}</span>
                      </li>
                    ))}
                  </ol>
                  <span className={styles.indexMore}>Ver el top {RANKING_TOP} →</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className={styles.methodFine}>
          Todos los rankings salen de los mismos datos que ves en cada ficha y en el comparador. Las notas son la
          valoración editorial de MAbroad, no datos oficiales.
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default function RankingPage() {
  const { slug } = useParams();
  if (!slug) return <RankingsIndex />;
  const criterion = getCriterionBySlug(slug);
  // Slug inexistente: 404 (noindex), no redirección al índice (soft 404).
  if (!criterion) return <NotFoundPage />;
  return <RankingDetail key={criterion.id} criterion={criterion} />;
}
