import { useState, useMemo, useEffect } from "react";
import Flag from "../components/Flag";
import { Link, useSearchParams } from "react-router-dom";
import {
  getAllCities, getScoreMap, getOverallScore, parseMinCost, getProgramLabel, getCompareLeader, buildCompareVerdict, COMPARE_MIN_CATEGORY_GAP,
  getRankingCriteria, getCriterion, rankCities, filterByProgram, formatCriterionValue, getRankingPath, PROGRAM_FILTERS,
} from "../lib/cities";
import { getComparePhrase } from "../data/comparePhrases";
import { Navbar, Footer } from "../components/Layout";
import JourneySteps from "../components/JourneySteps";
import ShareButton from "../components/ShareButton";
import { IconRanking, IconCorona, IconBeca, IconUniversidad, IconClima, IconIdiomas, IconCheck, IconAlerta, IconComparar, IconLupa } from "../components/icons";
import { getCategoryIcon, getCriterionIcon } from "../lib/categoryIcons";
import MethodologyNote from "../components/MethodologyNote";
import ScoreRing from "../components/ScoreRing";
import { useSEO } from "../hooks/useSEO";
import { useCityDetails } from "../hooks/useCityDetail";
import styles from "./ComparePage.module.css";
import { responsiveImage } from "../lib/images";
import PhotoCredit from "../components/PhotoCredit";

// Índice ligero de ciudades (ver lib/cities.js).
const ALL_CITIES = getAllCities();

// Huecos de las fotos del comparador (ver ComparePage.module.css).
const MINI_THUMB_SLOTS = [[null, "42px", 1]]; // avatar circular
const FEATURED_SLOTS = [
  ["(max-width: 560px)", "100vw", 4 / 3],
  ["(max-width: 1024px)", "50vw", 4 / 3],
  [null, "300px", 4 / 3],
];
// Cabecera de cada ciudad comparada: columnas de un contenedor de 1200px (2-4).
const RESULT_HERO_SLOTS = [
  ["(max-width: 768px)", "100vw", 1.6],
  ["(min-width: 1240px)", "600px", 2.2],
  [null, "50vw", 2.2],
];

// Mismo top trending que la home — cuando no hay nada seleccionado, se usa
// como bloque destacado en vez de empezar directo con la sopa de acordeones.
const TRENDING_SLUGS = ["bolonia", "lisboa", "berlin", "praga", "viena"];

const CITY_SLUGS = new Set(ALL_CITIES.map((c) => c.slug));

// Chips de orden rápido (?orden=<id>): los mismos criterios que los rankings
// (src/data/rankings.js). Se combinan con el buscador y con ?programa=.
const SORT_CRITERIA = getRankingCriteria();
// «otros» = Suiza y América (programType distinto de erasmus en cities.js).
// Reino Unido entra en «erasmus» (Erasmus+ desde 2027-28, acuerdo cerrado).
// Se nombran por lo que son, sin afirmar que nunca haya Erasmus+: depende de
// la convocatoria de cada universidad.
const PROGRAM_LABELS = { todos: "Todos", erasmus: "Erasmus+ (UE y asociados)", otros: "Suiza y América" };

// Texto guía del selector según cuántas ciudades hay elegidas (0–3).
const SELECTION_HINTS = [
  "Selecciona de 2 a 3 ciudades para empezar la comparativa",
  "1 de 3 elegida: añade al menos una más",
  "2 de 3 elegidas: ya puedes comparar, o añade una tercera",
  "3 de 3 elegidas: pulsa «Comparar» o quita una para cambiarla",
];

const SCORE_IDS = [
  "coste", "alojamiento", "vida_social", "integracion",
  "movilidad", "estilo_vida", "empleo", "seguridad",
];

const COL_COLORS = ["#3F7A7D", "#F59E0B", "#B45309"];
const COL_GRADIENTS = [
  "linear-gradient(135deg,#3F7A7D,#2F5073)",
  "linear-gradient(135deg,#F59E0B,#EF4444)",
  "linear-gradient(135deg,#FFC95E,#B45309)",
];

// ─── Radar comparativo ──────────────────────────────────────────────────
const RADAR_SHORT = {
  coste: "Coste",
  alojamiento: "Alojam.",
  vida_social: "V. social",
  integracion: "Integración",
  movilidad: "Movilidad",
  estilo_vida: "Estilo",
  empleo: "Empleo",
  seguridad: "Seguridad",
};

function polar(cx, cy, r, angle) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function RadarChart({ scoreIds, selectedCities, scoreMaps }) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 54;
  const n = scoreIds.length;
  const angleFor = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const ringPoints = (frac) =>
    scoreIds.map((_, i) => { const p = polar(cx, cy, maxR * frac, angleFor(i)); return `${p.x},${p.y}`; }).join(" ");

  return (
    <div className={styles.radarWrap}>
      <svg viewBox={`0 0 ${size} ${size}`} className={styles.radarSvg}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <polygon key={f} points={ringPoints(f)} className={styles.radarRing} />
        ))}
        {scoreIds.map((id, i) => {
          const p = polar(cx, cy, maxR, angleFor(i));
          return <line key={id} x1={cx} y1={cy} x2={p.x} y2={p.y} className={styles.radarAxis} />;
        })}
        {selectedCities.map((city, ci) => {
          const pts = scoreIds.map((id, i) => {
            const val = scoreMaps[ci][id]?.score ?? 0;
            const p = polar(cx, cy, maxR * (val / 10), angleFor(i));
            return `${p.x},${p.y}`;
          }).join(" ");
          return (
            <polygon key={city.slug} points={pts}
              fill={COL_COLORS[ci]} fillOpacity="0.14"
              stroke={COL_COLORS[ci]} strokeWidth="2.5" className={styles.radarPolygon} />
          );
        })}
        {scoreIds.map((id, i) => {
          const p = polar(cx, cy, maxR + 30, angleFor(i));
          const firstScoreObj = selectedCities.map((_, ci) => scoreMaps[ci][id]).find(Boolean);
          return (
            <g key={id}>
              <text x={p.x} y={p.y - 6} textAnchor="middle" className={styles.radarLabelIcon}>
                {firstScoreObj?.icon}
              </text>
              <text x={p.x} y={p.y + 10} textAnchor="middle" className={styles.radarLabelText}>
                {RADAR_SHORT[id]}
              </text>
            </g>
          );
        })}
      </svg>
      <div className={styles.radarLegend}>
        {selectedCities.map((city, i) => (
          <div key={city.slug} className={styles.radarLegendItem}>
            <span className={styles.radarLegendDot} style={{ background: COL_COLORS[i] }} />
            <span><Flag emoji={city.emoji} /> {city.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Diferencias más destacadas ─────────────────────────────────────────
function buildTopDifferences(scoreIds, selectedCities, scoreMaps, limit = 3) {
  return scoreIds
    .map((id) => {
      const rows = selectedCities.map((city, i) => ({ city, color: COL_COLORS[i], scoreObj: scoreMaps[i][id] }));
      const scores = rows.map((r) => r.scoreObj?.score ?? 0);
      const gap = Math.max(...scores) - Math.min(...scores);
      const winnerIdx = scores.indexOf(Math.max(...scores));
      const meta = rows.map((r) => r.scoreObj).find(Boolean);
      return { id, gap, rows, winnerIdx, meta };
    })
    .filter((d) => d.meta && d.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, limit);
}

// ─── Veredicto ──────────────────────────────────────────────────────────
// Lo primero que se lee en la comparativa: quién va por delante (o empate
// técnico), cuánto cambia el coste EN EUROS y en qué gana cada ciudad. Todo
// sale de buildCompareVerdict (src/lib/cities.js), es decir, de las mismas
// notas y rangos de coste que aparecen debajo: aquí solo se redacta.
const COST_SIMILAR_MAX = 25; // €/mes: por debajo, «coste muy parecido»

function joinWithY(parts) {
  return parts.map((p, i) => (
    <span key={i}>{i > 0 && (i === parts.length - 1 ? " y " : ", ")}{p}</span>
  ));
}

function Verdict({ cities }) {
  const v = useMemo(() => buildCompareVerdict(cities), [cities]);
  const name = (i) => <strong style={{ color: COL_COLORS[i] }}>{cities[i].name}</strong>;
  const score = (i) => v.overall[i].toFixed(1);
  const all = cities.map((_, i) => i);

  let headline;
  if (v.winnerIdx !== -1) {
    const rest = all.filter((i) => i !== v.winnerIdx);
    headline = <>{name(v.winnerIdx)} saca la mejor nota global: {score(v.winnerIdx)} frente a {joinWithY(rest.map((i) => <>{score(i)} de {name(i)}</>))}.</>;
  } else if (v.tiedIdx.length === cities.length) {
    headline = <>Empate técnico en la nota global ({joinWithY(all.map((i) => <>{name(i)} {score(i)}</>))}): decide por lo que más te importe.</>;
  } else {
    const behind = all.filter((i) => !v.tiedIdx.includes(i));
    headline = <>{joinWithY(v.tiedIdx.map((i) => <>{name(i)} ({score(i)})</>))} empatan en cabeza; {joinWithY(behind.map((i) => <>{name(i)} ({score(i)})</>))} queda por detrás.</>;
  }

  // Coste: puede haber empate en los extremos (dos ciudades con el mismo
  // rango), así que la más barata y la más cara son GRUPOS; «entre medias»
  // solo se dice de la que queda estrictamente entre los dos.
  const { cheapestIdx, priciestIdx, middleIdx, diff } = v.cost;
  const plural = cheapestIdx.length > 1;
  const ranges = joinWithY(all.map((i) => <>{cities[i].costDetail} en {name(i)}</>));
  const costLine = diff < COST_SIMILAR_MAX
    ? <>El coste de vida es muy parecido: {ranges}.</>
    : <>{joinWithY(cheapestIdx.map(name))} {plural ? "salen" : "sale"} unos <strong>{diff} €/mes</strong> más {plural ? "baratas" : "barata"} que {joinWithY(priciestIdx.map(name))}{middleIdx.length > 0 && <>; {joinWithY(middleIdx.map(name))} queda entre medias</>} ({ranges}).</>;

  const withStrengths = all.filter((i) => v.strengths[i].length > 0);

  return (
    <section className={styles.verdict} aria-labelledby="verdict-title">
      <h2 id="verdict-title" className={styles.verdictTitle}>En resumen</h2>
      <ul className={styles.verdictList}>
        <li><span className={styles.verdictIcon}><IconRanking size={20} /></span><span>{headline}</span></li>
        <li><span className={styles.verdictIcon}><IconBeca size={20} /></span><span>{costLine}</span></li>
        {withStrengths.map((i) => (
          <li key={cities[i].slug}>
            <span className={styles.verdictIcon}><IconCheck size={20} /></span>
            <span>{name(i)} gana en {joinWithY(v.strengths[i].map((s) => <>{s.label} (+{s.gap.toFixed(1)})</>))}.</span>
          </li>
        ))}
        {withStrengths.length === 0 && (
          <li><span className={styles.verdictIcon}><IconCheck size={20} /></span><span>Ninguna saca {COMPARE_MIN_CATEGORY_GAP.toFixed(1)} puntos de ventaja a todas las demás en ninguna categoría (sin contar el coste): mira las diferencias de abajo.</span></li>
        )}
      </ul>
      <p className={styles.verdictNote}>
        La diferencia de coste compara el punto medio de los rangos orientativos de cada ficha. Las notas son la valoración editorial de MAbroad.
      </p>
    </section>
  );
}

// ─── Ventajas y a tener en cuenta ────────────────────────────────────────
function buildProsCons(scoreMap) {
  const entries = SCORE_IDS.map((id) => scoreMap[id]).filter(Boolean).sort((a, b) => b.score - a.score);
  return { pros: entries.slice(0, 2), cons: entries.slice(-2).reverse() };
}


/* ─── Versus Card (per category) ───────────────────────────────────────── */
function VersusCard({ categoryMeta, rows, open, onToggle }) {
  const maxScore = Math.max(...rows.map((r) => r.score));
  const winners = rows.filter((r) => r.score === maxScore);
  const isTie = winners.length > 1;

  return (
    <div className={styles.versusCard}>
      <button
        type="button"
        className={styles.versusCardHeader}
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className={styles.versusCardHeaderLeft}>
          <span className={styles.versusCardIcon}>{categoryMeta.icon}</span>
          <span className={styles.versusCardLabel}>{categoryMeta.label}</span>
        </div>
        <div className={styles.versusMiniBars}>
          {rows.map((r) => {
            const isW = !isTie && r.score === maxScore;
            return (
              <div key={r.city.slug} className={styles.versusMiniBarWrap}>
                <div className={styles.versusMiniBar}>
                  <div
                    className={styles.versusMiniBarFill}
                    style={{ height: `${(r.score / 10) * 100}%`, background: r.color, opacity: isW ? 1 : 0.5 }}
                  />
                </div>
                <span className={styles.versusMiniScore} style={{ color: isW ? r.color : "var(--color-muted)" }}>
                  {r.score.toFixed(1)}
                </span>
              </div>
            );
          })}
        </div>
        <span className={`${styles.versusChevron} ${open ? styles.versusChevronOpen : ""}`}>›</span>
      </button>

      {open && (
        <div className={styles.versusDetail}>
          <div className={styles.versusDetailCols} style={{ "--vc-cols": rows.length }}>
            {rows.map((r) => {
              const isWinner = !isTie && r.score === maxScore;
              return (
                <div key={r.city.slug}
                  className={`${styles.versusCol} ${isWinner ? styles.versusColWinner : ""}`}
                  style={{ "--accent": r.color }}>
                  <div className={styles.versusColHead}>
                    <span className={styles.versusColName} style={{ color: r.color }}>{r.city.name}</span>
                    {isWinner && <span className={styles.versusTrophy}><IconRanking size={28} /></span>}
                  </div>
                  <span className={styles.versusColScore} style={isWinner ? { color: r.color } : {}}>
                    {r.score.toFixed(1)}
                  </span>
                  <div className={styles.versusColBar}>
                    <div
                      className={styles.versusColBarFill}
                      style={{ width: `${Math.min(100, (r.score / 10) * 100)}%`, background: r.color }}
                    />
                  </div>
                  {r.phrase && <p className={styles.versusColPhrase}>{r.phrase}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Versus Grid — gestiona qué fila está abierta ─────────────────────── */
function VersusGrid({ scoreIds, selectedCities, scoreMaps }) {
  const [openRow, setOpenRow] = useState(null);

  // En escritorio el grid es de 2 columnas y las tarjetas se abren en pareja
  // (por fila). En móvil es una sola columna, así que abrir "la fila" abre
  // dos tarjetas apiladas a la vez y queda raro — ahí abrimos de una en una.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 721);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cards = scoreIds.map((id) => {
    const rows = selectedCities.map((city, i) => ({
      city,
      color: COL_COLORS[i],
      score: scoreMaps[i][id]?.score ?? 0,
      phrase: getComparePhrase(city.slug, id),
    }));
    const firstScoreObj = selectedCities.map((_, i) => scoreMaps[i][id]).find(Boolean);
    if (!firstScoreObj) return null;
    return { id, rows, categoryMeta: { icon: firstScoreObj.icon, label: firstScoreObj.label } };
  }).filter(Boolean);

  // Agrupar en filas de 2 (solo aplica en escritorio)
  function getRow(idx) { return Math.floor(idx / 2); }

  function handleToggle(idx) {
    if (isMobile) {
      setOpenRow((prev) => (prev === idx ? null : idx));
    } else {
      const row = getRow(idx);
      setOpenRow((prev) => (prev === row ? null : row));
    }
  }

  return (
    <div className={styles.versusGrid}>
      {cards.map((card, idx) => (
        <VersusCard
          key={card.id}
          categoryMeta={card.categoryMeta}
          rows={card.rows}
          open={isMobile ? openRow === idx : openRow === getRow(idx)}
          onToggle={() => handleToggle(idx)}
        />
      ))}
    </div>
  );
}

/* ─── Tabla compacta (solo móvil) ───────────────────────────────────────
   En móvil las tarjetas de cada ciudad se apilaban una debajo de otra y
   comparar obligaba a subir y bajar. Aquí todo va lado a lado, una columna
   por ciudad, con la cabecera de ciudades fija bajo el navbar mientras se
   baja. Sustituye (solo ≤720px, por CSS) a las tarjetas, al resumen rápido y
   a las puntuaciones detalladas; mismas notas y mismo criterio de ganadora. */
function MobileCompareTable({ cities, scoreMaps, overallScores, winnerIdx, tiedIdx, onRemove }) {
  const cols = cities.length;
  const minCost = Math.min(...cities.map((c) => parseMinCost(c.costDetail)));

  const basics = [
    {
      id: "overall", label: "Nota global",
      cell: (c, i) => (
        <span className={styles.mtScore} style={{ color: winnerIdx === i ? COL_COLORS[i] : undefined }}>
          {winnerIdx === i && <IconCorona size={14} />}
          {overallScores[i].toFixed(1)}
          {tiedIdx.includes(i) && <span className={styles.mtNote}>empate</span>}
        </span>
      ),
    },
    {
      id: "coste", label: "Coste al mes",
      cell: (c) => (
        <span className={parseMinCost(c.costDetail) === minCost ? styles.mtBest : undefined}>
          {c.costDetail.replace("/mes", "")}
        </span>
      ),
    },
    { id: "clima", label: "Clima", cell: (c) => c.weather },
    { id: "idioma", label: "Idioma", cell: (c) => c.language },
    { id: "programa", label: "Programa", cell: (c) => getProgramLabel(c) },
  ];

  const row = (id, label, cells, icon = null) => (
    <tbody key={id} className={styles.mtGroup}>
      <tr>
        <th scope="rowgroup" colSpan={cols} className={styles.mtRowLabel}>{icon}{label}</th>
      </tr>
      <tr>{cells}</tr>
    </tbody>
  );

  return (
    <div className={styles.mobileTableWrap}>
      <table className={styles.mobileTable} style={{ "--cols": cols }}>
        <caption className="sr-only">Comparativa lado a lado de {cities.map((c) => c.name).join(", ")}</caption>
        <thead>
          <tr>
            {cities.map((c, i) => (
              <th key={c.slug} scope="col" className={styles.mtHead} style={{ "--accent": COL_COLORS[i] }}>
                <span className={styles.mtHeadName}><Flag emoji={c.emoji} /> {c.name}</span>
                <span className={styles.mtHeadScore} style={{ background: COL_GRADIENTS[i] }}>{overallScores[i].toFixed(1)}</span>
                <button type="button" className={styles.mtRemove} onClick={() => onRemove(c.slug)} aria-label={`Quitar ${c.name} de la comparativa`}>✕</button>
              </th>
            ))}
          </tr>
        </thead>

        {basics.map((b) => row(b.id, b.label, cities.map((c, i) => <td key={c.slug}>{b.cell(c, i)}</td>)))}

        {SCORE_IDS.map((id) => {
          const meta = scoreMaps.map((m) => m[id]).find(Boolean);
          if (!meta) return null;
          const scores = scoreMaps.map((m) => m[id]?.score ?? 0);
          const max = Math.max(...scores);
          const single = scores.filter((s) => s === max).length === 1;
          const CatIcon = getCategoryIcon(id);
          return row(id, meta.label, cities.map((c, i) => {
            const best = single && scores[i] === max;
            return (
              <td key={c.slug}>
                <span className={styles.mtScore} style={{ color: best ? COL_COLORS[i] : undefined }}>
                  {scores[i].toFixed(1)}
                  {best && <span className="sr-only"> (la mejor)</span>}
                </span>
                <span className={styles.mtBar} aria-hidden="true">
                  <span style={{ width: `${scores[i] * 10}%`, background: COL_COLORS[i], opacity: best ? 1 : 0.45 }} />
                </span>
              </td>
            );
          }), <CatIcon size={16} />);
        })}

        <tbody className={styles.mtGroup}>
          <tr>
            {cities.map((c, i) => (
              <td key={c.slug}>
                <Link className={styles.mtLink} style={{ color: COL_COLORS[i], borderColor: COL_COLORS[i] }} to={`/city/${c.slug}`}>
                  Ver guía →
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ─── Mini card (selector view) ─────────────────────────────────────────
   Tarjeta compacta con miniatura de ciudad dentro de cada acordeón de
   región. Al elegirla NO se mueve de sitio: se queda donde estaba, marcada
   (checked: borde de su color e IconCheck); volver a pulsarla la quita. */
function MiniCard({ city, checked = false, disabled = false, accentColor, onClick, rank = null, metric = null }) {
  return (
    <button
      type="button"
      className={`${styles.miniCard} ${checked ? styles.miniCardSelected : ""} ${disabled ? styles.miniCardDisabled : ""}${metric ? ` ${styles.miniCardRanked}` : ""}`}
      style={checked ? { "--tile-color": accentColor } : {}}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={checked}
    >
      {metric && <span className={styles.miniRank}>{rank != null ? `#${rank}` : "–"}</span>}
      <span className={styles.miniThumb}>
        <img
          className={styles.miniThumbImg}
          {...responsiveImage(city.img, { slots: MINI_THUMB_SLOTS, fallback: 120, min: 120 })}
          alt=""
          width={120}
          height={120}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.style.opacity = 0; }}
        />
        <span className={styles.miniEmoji}><Flag emoji={city.emoji} /></span>
        {checked && (
          <span className={styles.miniCheck}>
            <IconCheck size={20} />
          </span>
        )}
      </span>
      <span className={styles.miniInfo}>
        <span className={styles.miniName}>{city.name}</span>
        <span className={styles.miniCountry}>{city.country}</span>
        {metric && <span className={styles.miniMetric}>{metric}</span>}
      </span>
    </button>
  );
}

/* ─── Featured card (destinos trending) — jerarquía visual clara, nada que
   ver con el tamaño mini de las regiones de debajo. Igual que las mini, se
   marca en su sitio al elegirla. ─────────────────────────────────────────── */
function FeaturedCard({ city, checked = false, disabled = false, accentColor, onClick }) {
  const overall = getOverallScore(city.slug);
  return (
    <button
      type="button"
      className={`${styles.featuredCard} ${checked ? styles.featuredCardSelected : ""} ${disabled ? styles.featuredCardDisabled : ""}`}
      style={checked ? { "--tile-color": accentColor } : {}}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={checked}
    >
      <PhotoCredit src={city.img} corner="bottom-right" nested /><img className={styles.featuredImg} {...responsiveImage(city.img, { slots: FEATURED_SLOTS })} width={800} height={600} alt="" loading="lazy" decoding="async" onError={(e) => { e.currentTarget.style.opacity = 0; }} />
      <div className={styles.featuredOverlay} />
      {checked && <span className={styles.featuredCheck}><IconCheck size={18} /></span>}
      <div className={styles.featuredBody}>
        <div>
          <p className={styles.featuredName}><Flag emoji={city.emoji} /> {city.name}</p>
          <p className={styles.featuredCountry}>{city.country}</p>
        </div>
        <ScoreRing score={overall} size={46} showLabel={false} animate={false} />
      </div>
    </button>
  );
}

/* ─── Region accordion (selector view) ──────────────────────────────────── */
function RegionAccordion({ region, cities, open, onToggle, isFull, toggle, selected }) {
  return (
    <div className={styles.regionAccordion}>
      <button type="button" className={styles.regionHeader} onClick={onToggle} aria-expanded={open}>
        <span className={styles.regionName}>{region}</span>
        <span className={styles.regionCount}>{cities.length}</span>
        <span className={`${styles.regionChevron} ${open ? styles.regionChevronOpen : ""}`}>›</span>
      </button>
      {open && (
        <div className={styles.regionBody}>
          <div className={styles.miniGrid}>
            {cities.map((city) => {
              const pos = selected.indexOf(city.slug);
              const checked = pos !== -1;
              return (
                <MiniCard
                  key={city.slug}
                  city={city}
                  checked={checked}
                  accentColor={COL_COLORS[pos]}
                  disabled={isFull && !checked}
                  onClick={() => toggle(city.slug)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Agrupación por región (7 grupos, 14–31 ciudades cada uno) en vez de por
// país (48 países, la mayoría con 1–3 ciudades — demasiado fragmentado para
// acordeones útiles). Orden fijo para que la lista no "salte" al seleccionar.
const REGION_ORDER = [
  "Europa del Sur",
  "Europa del Este",
  "Europa Central",
  "Europa del Norte",
  "Europa del Oeste",
  "Latinoamérica",
  "Norteamérica",
];

/* ─── Main Component ────────────────────────────────────────────────────── */
export default function ComparePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  useSEO({
    title: "Comparador de ciudades Erasmus lado a lado | MAbroad",
    description: "Compara hasta 3 ciudades Erasmus a la vez: coste de vida, vida social, seguridad, empleo y más. Radar comparativo, diferencias destacadas y resumen automático.",
  });

  // Selección y vista viven en la URL (?cities=bolonia,berlin&view=compare):
  // así, si entras a la guía de una ciudad desde la comparativa y vuelves
  // atrás, sigues exactamente donde estabas — selección y vista incluidas.
  // También hace que la comparativa se pueda compartir por enlace.
  const citiesParam = searchParams.get("cities") || "";
  // Solo slugs que existen, sin repetir y como mucho 3: la URL se puede
  // escribir o pegar a mano, y la comparativa (colores por posición,
  // veredicto) da por hecho que cada elemento es una ciudad real.
  const selected = useMemo(
    () => [...new Set(citiesParam.split(",").map((s) => s.trim()))].filter((s) => CITY_SLUGS.has(s)).slice(0, 3),
    [citiesParam]
  );
  const comparing = searchParams.get("view") === "compare";

  const setSelected = (next) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const value = typeof next === "function" ? next(selected) : next;
      if (value.length) params.set("cities", value.join(","));
      else { params.delete("cities"); params.delete("view"); }
      return params;
    }, { replace: true });
  };
  const setComparing = (next) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const value = typeof next === "function" ? next(comparing) : next;
      if (value) params.set("view", "compare");
      else params.delete("view");
      return params;
    }, { replace: true });
  };

  // Cambiar de vista (selector ↔ comparativa) solo cambia el query, no la
  // ruta, así que ScrollRestoration no interviene: sin esto la comparativa se
  // abría a la altura a la que estuvieras en el selector, a media página.
  const switchView = (compare) => {
    setComparing(compare);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const [search, setSearch] = useState("");

  // Orden rápido y programa también viven en la URL (?orden=baratas&programa=erasmus):
  // el enlace se puede compartir tal cual. Valores desconocidos = sin filtro.
  const sortCriterion = getCriterion(searchParams.get("orden") || "");
  const programParam = searchParams.get("programa");
  const program = PROGRAM_FILTERS.includes(programParam) ? programParam : "todos";

  const setUrlParam = (name, value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) params.set(name, value);
      else params.delete(name);
      return params;
    }, { replace: true });
  };
  const setSort = (id) => setUrlParam("orden", id === sortCriterion?.id ? null : id);
  const setProgram = (value) => setUrlParam("programa", value === "todos" ? null : value);
  const clearFilters = () => {
    setSearch("");
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("orden");
      params.delete("programa");
      return params;
    }, { replace: true });
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return filterByProgram(ALL_CITIES, program).filter(
      (c) => !q || c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q)
    );
  }, [search, program]);

  // Con un chip de orden activo, lista única ordenada por ese criterio (con
  // su puesto y su dato) en vez de los acordeones por región.
  const ranked = useMemo(
    () => (sortCriterion ? rankCities(sortCriterion.id, { cities: filtered }) : null),
    [sortCriterion, filtered]
  );
  const missingData = ranked ? ranked.filter((r) => r.value == null).length : 0;
  const hasFilters = Boolean(search.trim() || sortCriterion || program !== "todos");

  const selectedCities = useMemo(
    () => selected.map((s) => ALL_CITIES.find((c) => c.slug === s)).filter(Boolean),
    [selected]
  );
  // Highlights, universidades y tips solo están en la ficha completa de cada
  // ciudad: se piden al elegirla y aparecen en «Características clave» al llegar.
  const selectedDetails = useCityDetails(selected);

  // Ciudades que coinciden con la búsqueda, agrupadas por región y ordenadas
  // alfabéticamente dentro de cada grupo. Las seleccionadas NO se quitan de
  // la lista: antes desaparecían y todo se recolocaba bajo el dedo (el
  // segundo toque caía en otra ciudad); ahora se quedan en su sitio, marcadas.
  const regionGroups = useMemo(() => {
    return REGION_ORDER
      .map((region) => ({
        region,
        cities: filtered
          .filter((c) => c.region === region)
          .sort((a, b) => a.name.localeCompare(b.name, "es")),
      }))
      .filter((g) => g.cities.length > 0);
  }, [filtered]);

  // Acordeones abiertos. Por defecto solo el primero (Europa del Sur, el
  // grupo más grande) para que la página no cargue con todo desplegado.
  // Al buscar, se despliegan automáticamente solo los grupos con resultados
  // y se ocultan los que no tienen ninguno (ver filtro de arriba); al borrar
  // la búsqueda se vuelve al estado inicial (solo el primer grupo abierto).
  // Con el filtro de programa, el que se abre es el primer grupo que tenga
  // ciudades (con «Suiza y América» no hay ninguna de Europa del Sur).
  const [openRegions, setOpenRegions] = useState(() => new Set([regionGroups[0]?.region ?? REGION_ORDER[0]]));
  useEffect(() => {
    if (search.trim()) {
      setOpenRegions(new Set(regionGroups.map((g) => g.region)));
    } else {
      setOpenRegions(new Set([regionGroups[0]?.region ?? REGION_ORDER[0]]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, program]);

  function toggleRegion(region) {
    setOpenRegions((prev) => {
      const next = new Set(prev);
      if (next.has(region)) next.delete(region);
      else next.add(region);
      return next;
    });
  }

  const scoreMaps = useMemo(() => selectedCities.map((c) => getScoreMap(c.slug)), [selectedCities]);
  const overallScores = useMemo(() => selectedCities.map((c) => getOverallScore(c.slug)), [selectedCities]);

  function toggle(slug) {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug)
        : prev.length < 3 ? [...prev, slug] : prev
    );
  }
  function remove(slug) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const next = selected.filter((s) => s !== slug);
      if (next.length) {
        params.set("cities", next.join(","));
        if (next.length < 2) params.delete("view");
      } else {
        params.delete("cities");
        params.delete("view");
      }
      return params;
    }, { replace: true });
  }

  const canCompare = selected.length >= 2;

  /* ─── COMPARE VIEW ──────────────────────────────────────────────────── */
  if (comparing && canCompare) {
    // «Mejor puntuación» solo con ventaja clara (≥0,3); si no, empate técnico.
    const { winnerIdx, tiedIdx } = getCompareLeader(overallScores);

    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.compareMain}>

          {/* Hero band */}
          <div className={styles.compareHero}>
            <div className={styles.compareHeroBg} />
            <div className={styles.compareHeroContent}>
              <div className={styles.compareHeroActions}>
                <button className={styles.backBtn} onClick={() => switchView(false)}>
                  ← Cambiar selección
                </button>
                <ShareButton
                  className={`${styles.backBtn} ${styles.shareBtn}`}
                  path={`/comparar?cities=${selectedCities.map((c) => c.slug).join(",")}&view=compare`}
                  title={`${selectedCities.map((c) => c.name).join(" vs ")} | MAbroad`}
                  text={`${selectedCities.map((c) => c.name).join(" vs ")}: coste, notas por categoría y diferencias, lado a lado.`}
                >
                  Compartir
                </ShareButton>
              </div>
              <h1 className={styles.compareTitle}>Comparativa de destinos</h1>
              <p className={styles.compareSubtitle}>
                {selectedCities.map((c, i) => (
                  <span key={c.slug}>{i > 0 && "  vs  "}<Flag emoji={c.emoji} /> {c.name}</span>
                ))}
              </p>
            </div>
          </div>

          <div className={styles.compareBody}>

            {/* Veredicto: la conclusión antes que los datos */}
            <Verdict cities={selectedCities} />

            {/* Móvil: tabla compacta lado a lado con cabecera fija */}
            <MobileCompareTable
              cities={selectedCities}
              scoreMaps={scoreMaps}
              overallScores={overallScores}
              winnerIdx={winnerIdx}
              tiedIdx={tiedIdx}
              onRemove={remove}
            />

            {/* City header cards */}
            <div className={styles.cityCards} style={{ "--cols": selectedCities.length }}>
              {selectedCities.map((city, i) => {
                const isTop = winnerIdx === i;
                const isTied = tiedIdx.includes(i);
                const isCheapest = parseMinCost(city.costDetail) === Math.min(...selectedCities.map((c) => parseMinCost(c.costDetail)));
                const bestCategory = SCORE_IDS.reduce((best, id) => {
                  const s = scoreMaps[i][id]?.score ?? 0;
                  const bs = scoreMaps[i][best]?.score ?? 0;
                  return s > bs ? id : best;
                }, SCORE_IDS[0]);
                const bestScoreObj = scoreMaps[i][bestCategory];

                return (
                  <div key={city.slug} className={`${styles.cityCard}${isTop ? ` ${styles.cityCardWinner}` : ""}`} style={{ "--accent": COL_COLORS[i] }}>
                    <div className={styles.cityCardHero}>
                      <img className={styles.cityCardHeroImg} {...responsiveImage(city.img, { slots: RESULT_HERO_SLOTS })} alt="" width={800} height={330} loading="lazy" decoding="async" />
                      <PhotoCredit src={city.img} corner="bottom-right" />
                      <div className={styles.cityCardOverlay} style={{ background: `linear-gradient(to top, ${COL_COLORS[i]}cc 0%, rgba(0,0,0,0.2) 60%)` }} />
                      <div className={styles.cityCardTop}>
                        <span className={styles.cityEmoji}><Flag emoji={city.emoji} /></span>
                        <button className={styles.removeBtn} onClick={() => remove(city.slug)}>✕</button>
                      </div>
                      <div className={styles.cityCardInfo}>
                        <h2 className={styles.cityCardName}>{city.name}</h2>
                        <span className={styles.cityCardCountry}>{city.country}</span>
                      </div>
                      <div className={styles.cityCardBadges}>
                        {isTop && <span className={`${styles.cityCardTag} ${styles.cityCardTagBest}`}><IconCorona size={16} /> Mejor puntuación</span>}
                        {isTied && <span className={styles.cityCardTag}>Empate técnico</span>}
                        {isCheapest && <span className={styles.cityCardTag}><IconBeca size={16} /> Más económica</span>}
                        {bestScoreObj && (
                          <span className={styles.cityCardTag} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            {(() => { const CatIcon = getCategoryIcon(bestScoreObj.id); return <CatIcon size={16} />; })()} Destaca en {bestScoreObj.label}
                          </span>
                        )}
                        {city.phrase && <p className={styles.cityCardPhrase}>"{city.phrase}"</p>}
                      </div>
                    </div>

                    {/* Score badge */}
                    <div className={styles.overallBadge} style={{ background: COL_GRADIENTS[i] }}>
                      {isTop && <span className={styles.crownIcon}><IconCorona size={20} /></span>}
                      <span className={styles.overallNumber}>{overallScores[i].toFixed(1)}</span>
                      <span className={styles.overallLabel}>/ 10</span>
                    </div>

                    {/* Quick stats */}
                    <div className={styles.quickStats}>
                      <div className={styles.stat}><span><IconBeca size={18} /></span><span>{city.costDetail}</span></div>
                      <div className={styles.stat}><span><IconClima size={18} /></span><span>{city.weather}</span></div>
                      <div className={styles.stat}><span><IconIdiomas size={18} /></span><span>{city.language}</span></div>
                    </div>

                    <Link className={`${styles.cityLinkBtn} link-btn`} style={{ borderColor: COL_COLORS[i], color: COL_COLORS[i] }}
                      to={`/city/${city.slug}`}>
                      Ver guía completa →
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Resumen rápido — puntos fuertes y a tener en cuenta */}
            <div className={styles.summarySection}>
              <h3 className={styles.sectionTitle}>Resumen rápido</h3>
              <div className={styles.prosConsGrid} style={{ "--cols": selectedCities.length }}>
                {selectedCities.map((city, i) => {
                  const { pros, cons } = buildProsCons(scoreMaps[i]);
                  return (
                    <div key={city.slug} className={styles.prosConsCol} style={{ borderTopColor: COL_COLORS[i] }}>
                      <div className={styles.prosConsHead} style={{ color: COL_COLORS[i] }}><Flag emoji={city.emoji} /> {city.name}</div>
                      <div className={styles.prosConsBlock}>
                        <span className={styles.prosConsLabel} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IconCheck size={16} /> Puntos fuertes</span>
                        <ul className={styles.prosConsList}>
                          {pros.map((p) => <li key={p.id}>{p.icon} {p.label} — {p.score.toFixed(1)}/10</li>)}
                        </ul>
                      </div>
                      <div className={styles.prosConsBlock}>
                        <span className={styles.prosConsLabel} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IconAlerta size={16} /> A tener en cuenta</span>
                        <ul className={styles.prosConsList}>
                          {cons.map((c) => <li key={c.id}>{c.icon} {c.label} — {c.score.toFixed(1)}/10</li>)}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Radar comparativo + Diferencias más destacadas, lado a lado en escritorio */}
            <div className={styles.overviewSection}>
              <div className={styles.radarSection}>
                <h3 className={styles.sectionTitle}>Vista de conjunto</h3>
                <RadarChart scoreIds={SCORE_IDS} selectedCities={selectedCities} scoreMaps={scoreMaps} />
              </div>

              <div className={styles.diffSection}>
                <h3 className={styles.sectionTitle}>Diferencias más destacadas</h3>
                <div className={styles.diffList}>
                  {buildTopDifferences(SCORE_IDS, selectedCities, scoreMaps).map((d) => (
                    <div key={d.id} className={styles.diffRow}>
                      <div className={styles.diffRowHead}>
                        <span>{d.meta.icon} {d.meta.label}</span>
                        <span className={styles.diffGap}>Δ {d.gap.toFixed(1)} pts</span>
                      </div>
                      <div className={styles.diffBars}>
                        {d.rows.map((r, i) => {
                          const score = r.scoreObj?.score ?? 0;
                          const isWinner = i === d.winnerIdx;
                          return (
                            <div key={r.city.slug} className={styles.diffBarItem}>
                              <span className={styles.diffBarLabel} style={{ color: isWinner ? r.color : "var(--color-slate-light)" }}>
                                <Flag emoji={r.city.emoji} /> {r.city.name}
                              </span>
                              <div className={styles.diffBarTrack}>
                                <div className={styles.diffBarFill} style={{ width: `${(score / 10) * 100}%`, background: r.color, opacity: isWinner ? 1 : 0.45 }} />
                              </div>
                              <span className={styles.diffBarScore}>{score.toFixed(1)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Versus cards per category */}
            <div className={styles.versusSection}>
              <h3 className={styles.sectionTitle}>Puntuaciones detalladas</h3>
              <VersusGrid scoreIds={SCORE_IDS} selectedCities={selectedCities} scoreMaps={scoreMaps} />
            </div>

            {/* Metodología y fuentes */}
            <div className="trust-note-wrap" style={{ padding: 0 }}>
              <MethodologyNote compact />
            </div>

            {/* Features */}
            <div className={styles.featuresSection}>
              <h3 className={styles.sectionTitle}>Características clave</h3>
              <div className={styles.featuresGrid} style={{ "--cols": selectedCities.length }}>
                {selectedCities.map((city, i) => (
                  <div key={city.slug} className={styles.featureCol}
                    style={{ "--accent": COL_COLORS[i], borderTopColor: COL_COLORS[i] }}>
                    <div className={styles.featureColHead} style={{ color: COL_COLORS[i] }}>
                      <Flag emoji={city.emoji} /> {city.name}
                    </div>
                    <div className={styles.featureBlock}>
                      <span className={styles.featureLabel}>Vibe</span>
                      <span className={styles.featureVal}>{city.vibe}</span>
                    </div>
                    <div className={styles.featureBlock}>
                      <span className={styles.featureLabel}>Tag</span>
                      <span className={styles.featureVal}>{city.tag}</span>
                    </div>
                    <div className={styles.featureBlock}>
                      <span className={styles.featureLabel}>Tipo de programa</span>
                      <span className={styles.featureVal}>
                        {getProgramLabel(city) === "Bilateral" ? "Bilateral (no Erasmus+)" : getProgramLabel(city)}
                      </span>
                    </div>
                    <div className={styles.featureBlock}>
                      <span className={styles.featureLabel}>Highlights</span>
                      <ul className={styles.highlightList}>
                        {(selectedDetails[city.slug]?.city.highlights ?? []).slice(0, 3).map((h, hi) => <li key={hi}>{h}</li>)}
                      </ul>
                    </div>
                    <div className={styles.featureBlock}>
                      <span className={styles.featureLabel}>Universidades</span>
                      <ul className={styles.highlightList}>
                        {(selectedDetails[city.slug]?.city.universities ?? []).slice(0, 2).map((u, ui) => <li key={ui}>{u}</li>)}
                      </ul>
                    </div>
                    <div className={styles.featureBlock}>
                      <span className={styles.featureLabel}>Tips locales</span>
                      <ul className={styles.highlightList}>
                        {(selectedDetails[city.slug]?.city.tips ?? []).slice(0, 2).map((t, ti) => <li key={ti}>{t}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
        <JourneySteps current="comparar" />
        <Footer />
      </div>
    );
  }

  /* ─── SELECTOR VIEW ──────────────────────────────────────────────────── */
  return (
    <div className={styles.page}>
      <Navbar />

      {/* Hero */}
      <div className={styles.selectorHero}>
        <div className={styles.selectorHeroBg} />
        <div className={styles.selectorHeroContent}>
          <span className={styles.selectorBadge} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IconComparar size={16} /> Comparativa</span>
          <h1 className={styles.selectorTitle}>Comparativa de destinos</h1>
          <p className={styles.selectorSub}>
            Elige 2 o 3 ciudades y compara sus puntuaciones, coste de vida, vibe y mucho más — lado a lado.
          </p>
        </div>
      </div>

      {/* Sticky bar: buscador + chips de seleccionadas (queda por debajo del
          navbar fijo de 64px — ver .navbar en src/styles/global.css) */}
      <div className={styles.stickyBar}>
        <div className={styles.stickyBarInner}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}><IconLupa size={18} /></span>
            <input className={styles.searchInput} type="text"
              placeholder="Busca por ciudad, país o tag…"
              value={search} onChange={(e) => setSearch(e.target.value)} />
            {search && (
              <button className={styles.searchClear} onClick={() => setSearch("")}>✕</button>
            )}
          </div>

          {/* Bandeja de la selección: siempre presente (con un texto guía
              cuando está vacía) para que la barra no cambie de alto —y empuje
              la lista— al elegir la primera ciudad. */}
          <div className={styles.stickyChips}>
            {selected.length === 0 && (
              <span className={styles.stickyChipsEmpty}>Tu selección aparecerá aquí (0/3)</span>
            )}
            {selectedCities.map((city, i) => (
              <div key={city.slug} className={styles.pill} style={{ "--pill-color": COL_COLORS[i] }}>
                <span><Flag emoji={city.emoji} /> {city.name}</span>
                <button className={styles.pillRemove} onClick={() => remove(city.slug)} aria-label={`Quitar ${city.name} de la selección`}>✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className={`${styles.selectorMain} ${canCompare ? styles.selectorMainWithBar : ""}`}>

        {/* Guía de estado: siempre ocupa su línea (cambia el texto, no el
            alto), para que la lista no salte al elegir. */}
        <p className={styles.hint} aria-live="polite">{SELECTION_HINTS[Math.min(selected.length, 3)]}</p>

        {/* Orden rápido + programa: se combinan entre sí y con el buscador, y
            quedan en la URL (?orden=…&programa=…) para compartir el enlace. */}
        <section className={styles.filterPanel} aria-label="Ordenar y filtrar destinos">
          <div className={styles.filterRow}>
            <span className={styles.filterLabel} id="compare-sort-label">Ordenar por</span>
            <div className={styles.filterChips} role="group" aria-labelledby="compare-sort-label">
              {SORT_CRITERIA.map((c) => {
                const Icon = getCriterionIcon(c);
                const active = sortCriterion?.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-pressed={active}
                    className={`${styles.filterChip}${active ? ` ${styles.filterChipActive}` : ""}`}
                    onClick={() => setSort(c.id)}
                  >
                    <Icon size={18} /> {c.chip}
                  </button>
                );
              })}
            </div>
          </div>
          <div className={styles.filterRow}>
            <span className={styles.filterLabel} id="compare-program-label">Programa</span>
            <div className={styles.segmented} role="group" aria-labelledby="compare-program-label">
              {PROGRAM_FILTERS.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={program === p}
                  className={`${styles.segment}${program === p ? ` ${styles.segmentActive}` : ""}`}
                  onClick={() => setProgram(p)}
                >
                  {PROGRAM_LABELS[p]}
                </button>
              ))}
            </div>
            <span className={styles.filterEnd}>
              {hasFilters && (
                <button type="button" className={styles.filterReset} onClick={clearFilters}>Quitar filtros</button>
              )}
              <Link className={styles.filterRankings} to="/ranking">Rankings Erasmus+ →</Link>
            </span>
          </div>
        </section>

        {/* Destinos trending destacados en grande, en vez de arrancar directo
            en la sopa de acordeones. Se quedan a la vista también con ciudades
            elegidas (marcadas en su sitio): antes esta sección se cambiaba por
            otra de «Seleccionadas» y todo lo de debajo se movía. Con un filtro
            activo se ocultan: lo que manda es la lista filtrada. */}
        {!hasFilters && (
          <section className={styles.selectedSection}>
            <h2 className={styles.groupTitle}>Destinos con más tirón ahora mismo</h2>
            <div className={styles.featuredGrid}>
              {TRENDING_SLUGS.map((slug) => {
                const city = ALL_CITIES.find((c) => c.slug === slug);
                if (!city) return null;
                const pos = selected.indexOf(slug);
                const checked = pos !== -1;
                return (
                  <FeaturedCard
                    key={slug}
                    city={city}
                    checked={checked}
                    accentColor={COL_COLORS[pos]}
                    disabled={selected.length >= 3 && !checked}
                    onClick={() => toggle(slug)}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Con orden rápido: una sola lista ordenada, con puesto y dato. */}
        {ranked && ranked.length > 0 && (
          <section className={styles.rankedSection} aria-labelledby="compare-ranked-title">
            <div className={styles.rankedHead}>
              <h2 id="compare-ranked-title" className={styles.groupTitle}>
                {sortCriterion.chip}
                <span className={styles.groupCount}>{ranked.length}</span>
              </h2>
              <Link className={styles.rankedLink} to={getRankingPath(sortCriterion)}>
                Top Erasmus+ y cómo se calcula →
              </Link>
            </div>
            {missingData > 0 && (
              <p className={styles.rankedNote}>
                {missingData === 1 ? "1 destino no tiene" : `${missingData} destinos no tienen`} dato de {sortCriterion.label.toLowerCase()}: {missingData === 1 ? "va" : "van"} al final, sin puesto.
              </p>
            )}
            <div className={styles.miniGrid}>
              {ranked.map((r) => {
                const pos = selected.indexOf(r.city.slug);
                const checked = pos !== -1;
                return (
                  <MiniCard
                    key={r.city.slug}
                    city={r.city}
                    checked={checked}
                    accentColor={COL_COLORS[pos]}
                    disabled={selected.length >= 3 && !checked}
                    onClick={() => toggle(r.city.slug)}
                    rank={r.rank}
                    metric={formatCriterionValue(r.city, sortCriterion.id, r.value)}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Sin orden rápido: destinos agrupados por región en acordeones */}
        {!ranked && (
          <div className={styles.accordionList}>
            {regionGroups.map((group) => (
              <RegionAccordion
                key={group.region}
                region={group.region}
                cities={group.cities}
                open={openRegions.has(group.region)}
                onToggle={() => toggleRegion(group.region)}
                isFull={selected.length >= 3}
                toggle={toggle}
                selected={selected}
              />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <span><IconLupa size={40} /></span>
            <p>
              {search.trim() ? `No hay ciudades que coincidan con "${search}"` : "No hay ciudades con estos filtros"}
              {program !== "todos" && ` en «${PROGRAM_LABELS[program]}»`}
            </p>
            <button onClick={clearFilters}>Ver todas</button>
          </div>
        )}
      </main>

      {/* Botón "Comparar" fijo en la parte inferior — activo desde 2 ciudades */}
      {canCompare && (
        <div className={styles.stickyCompareBar} data-bottom-bar>
          <div className={styles.stickyCompareInner}>
            <span className={styles.stickyCompareInfo}>
              {selected.length} destino{selected.length > 1 ? "s" : ""} seleccionado{selected.length > 1 ? "s" : ""}
            </span>
            <button className={styles.compareBtn} onClick={() => switchView(true)}>
              Comparar {selected.length} destinos →
            </button>
          </div>
        </div>
      )}

      <JourneySteps current="comparar" />

      <Footer />
    </div>
  );
}
