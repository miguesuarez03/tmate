import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CITIES } from "../data/cities";
import { getScoreMap, getOverallScore, parseMinCost, isErasmusEligible } from "../lib/cities";
import { getComparePhrase } from "../data/comparePhrases";
import { Navbar, Footer } from "../components/Layout";
import { IconRanking, IconCorona, IconBeca, IconUniversidad, IconClima, IconIdiomas, IconCheck, IconAlerta, IconComparar, IconLupa } from "../components/icons";
import { getCategoryIcon } from "../lib/categoryIcons";
import MethodologyNote from "../components/MethodologyNote";
import { useSEO } from "../hooks/useSEO";
import styles from "./ComparePage.module.css";

const SCORE_IDS = [
  "coste", "alojamiento", "vida_social", "integracion",
  "movilidad", "estilo_vida", "empleo", "seguridad",
];

const COL_COLORS = ["#0EA5E9", "#F59E0B", "#8B5CF6"];
const COL_GRADIENTS = [
  "linear-gradient(135deg,#0EA5E9,#14B8A6)",
  "linear-gradient(135deg,#F59E0B,#EF4444)",
  "linear-gradient(135deg,#8B5CF6,#EC4899)",
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
            <span>{city.emoji} {city.name}</span>
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

/* ─── Mini card (selector view) ─────────────────────────────────────────
   Tarjeta compacta con miniatura de ciudad — se usa tanto para las ciudades
   ya seleccionadas (checked, dispara `remove`, con IconCheck superpuesto)
   como para el resto de destinos dentro de cada acordeón de región (sin
   marcar, dispara `toggle`). */
function MiniCard({ city, checked = false, disabled = false, accentColor, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.miniCard} ${checked ? styles.miniCardSelected : ""} ${disabled ? styles.miniCardDisabled : ""}`}
      style={checked ? { "--tile-color": accentColor } : {}}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.miniThumb}>
        <img
          className={styles.miniThumbImg}
          src={city.img}
          alt=""
          loading="lazy"
          onError={(e) => { e.currentTarget.style.opacity = 0; }}
        />
        <span className={styles.miniEmoji}>{city.emoji}</span>
        {checked && (
          <span className={styles.miniCheck}>
            <IconCheck size={20} />
          </span>
        )}
      </span>
      <span className={styles.miniInfo}>
        <span className={styles.miniName}>{city.name}</span>
        <span className={styles.miniCountry}>{city.country}</span>
      </span>
    </button>
  );
}

/* ─── Region accordion (selector view) ──────────────────────────────────── */
function RegionAccordion({ region, cities, open, onToggle, isFull, toggle }) {
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
            {cities.map((city) => (
              <MiniCard
                key={city.slug}
                city={city}
                disabled={isFull}
                onClick={() => toggle(city.slug)}
              />
            ))}
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
  const navigate = useNavigate();
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
  const selected = useMemo(
    () => citiesParam.split(",").map((s) => s.trim()).filter(Boolean),
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

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return CITIES.filter(
      (c) =>
        !selected.includes(c.slug) &&
        (!q || c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q))
    );
  }, [search, selected]);

  const selectedCities = useMemo(
    () => selected.map((s) => CITIES.find((c) => c.slug === s)).filter(Boolean),
    [selected]
  );

  // Ciudades no seleccionadas que coinciden con la búsqueda, agrupadas por
  // región y ordenadas alfabéticamente dentro de cada grupo. Se apoya en
  // `filtered` (ya filtra por nombre/país/tag y excluye las seleccionadas)
  // para no duplicar esa lógica.
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
  const [openRegions, setOpenRegions] = useState(() => new Set([REGION_ORDER[0]]));
  useEffect(() => {
    if (search.trim()) {
      setOpenRegions(new Set(regionGroups.map((g) => g.region)));
    } else {
      setOpenRegions(new Set([REGION_ORDER[0]]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
    const maxIdx = overallScores.indexOf(Math.max(...overallScores));

    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.compareMain}>

          {/* Hero band */}
          <div className={styles.compareHero}>
            <div className={styles.compareHeroBg} />
            <div className={styles.compareHeroContent}>
              <button className={styles.backBtn} onClick={() => setComparing(false)}>
                ← Cambiar selección
              </button>
              <h1 className={styles.compareTitle}>Comparativa de destinos</h1>
              <p className={styles.compareSubtitle}>
                {selectedCities.map((c) => `${c.emoji} ${c.name}`).join("  vs  ")}
              </p>
            </div>
          </div>

          <div className={styles.compareBody}>

            {/* City header cards */}
            <div className={styles.cityCards} style={{ "--cols": selectedCities.length }}>
              {selectedCities.map((city, i) => {
                const isTop = maxIdx === i;
                const isCheapest = parseMinCost(city.costDetail) === Math.min(...selectedCities.map((c) => parseMinCost(c.costDetail)));
                const bestCategory = SCORE_IDS.reduce((best, id) => {
                  const s = scoreMaps[i][id]?.score ?? 0;
                  const bs = scoreMaps[i][best]?.score ?? 0;
                  return s > bs ? id : best;
                }, SCORE_IDS[0]);
                const bestScoreObj = scoreMaps[i][bestCategory];

                return (
                  <div key={city.slug} className={`${styles.cityCard}${isTop ? ` ${styles.cityCardWinner}` : ""}`} style={{ "--accent": COL_COLORS[i] }}>
                    <div className={styles.cityCardHero} style={{ backgroundImage: `url(${city.img})` }}>
                      <div className={styles.cityCardOverlay} style={{ background: `linear-gradient(to top, ${COL_COLORS[i]}cc 0%, rgba(0,0,0,0.2) 60%)` }} />
                      <div className={styles.cityCardTop}>
                        <span className={styles.cityEmoji}>{city.emoji}</span>
                        <button className={styles.removeBtn} onClick={() => remove(city.slug)}>✕</button>
                      </div>
                      <div className={styles.cityCardInfo}>
                        <h2 className={styles.cityCardName}>{city.name}</h2>
                        <span className={styles.cityCardCountry}>{city.country}</span>
                      </div>
                      <div className={styles.cityCardBadges}>
                        {isTop && <span className={`${styles.cityCardTag} ${styles.cityCardTagBest}`}><IconCorona size={16} /> Mejor puntuación</span>}
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
                      {maxIdx === i && <span className={styles.crownIcon}><IconCorona size={20} /></span>}
                      <span className={styles.overallNumber}>{overallScores[i].toFixed(1)}</span>
                      <span className={styles.overallLabel}>/ 10</span>
                      {maxIdx === i && <span className={styles.bestLabel}>Mejor puntuación</span>}
                    </div>

                    {/* Quick stats */}
                    <div className={styles.quickStats}>
                      <div className={styles.stat}><span><IconBeca size={18} /></span><span>{city.costDetail}</span></div>
                      <div className={styles.stat}><span><IconUniversidad size={18} /></span><span>{city.erasmusStudents} {isErasmusEligible(city) ? "Erasmus" : "intercambio"}</span></div>
                      <div className={styles.stat}><span><IconClima size={18} /></span><span>{city.weather}</span></div>
                      <div className={styles.stat}><span><IconIdiomas size={18} /></span><span>{city.language}</span></div>
                    </div>

                    <button className={styles.cityLinkBtn} style={{ borderColor: COL_COLORS[i], color: COL_COLORS[i] }}
                      onClick={() => navigate(`/city/${city.slug}`)}>
                      Ver guía completa →
                    </button>
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
                      <div className={styles.prosConsHead} style={{ color: COL_COLORS[i] }}>{city.emoji} {city.name}</div>
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
                                {r.city.emoji} {r.city.name}
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
                      {city.emoji} {city.name}
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
                        {isErasmusEligible(city) ? "Erasmus+" : "Bilateral (no Erasmus+)"}
                      </span>
                    </div>
                    <div className={styles.featureBlock}>
                      <span className={styles.featureLabel}>Highlights</span>
                      <ul className={styles.highlightList}>
                        {city.highlights.slice(0, 3).map((h, hi) => <li key={hi}>{h}</li>)}
                      </ul>
                    </div>
                    <div className={styles.featureBlock}>
                      <span className={styles.featureLabel}>Universidades</span>
                      <ul className={styles.highlightList}>
                        {city.universities.slice(0, 2).map((u, ui) => <li key={ui}>{u}</li>)}
                      </ul>
                    </div>
                    <div className={styles.featureBlock}>
                      <span className={styles.featureLabel}>Tips locales</span>
                      <ul className={styles.highlightList}>
                        {city.tips.slice(0, 2).map((t, ti) => <li key={ti}>{t}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
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

          {selected.length > 0 && (
            <div className={styles.stickyChips}>
              {selectedCities.map((city, i) => (
                <div key={city.slug} className={styles.pill} style={{ "--pill-color": COL_COLORS[i] }}>
                  <span>{city.emoji} {city.name}</span>
                  <button className={styles.pillRemove} onClick={() => remove(city.slug)} aria-label={`Quitar ${city.name} de la selección`}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <main className={`${styles.selectorMain} ${canCompare ? styles.selectorMainWithBar : ""}`}>

        {selected.length === 0 && (
          <p className={styles.hint}>Selecciona de 2 a 3 ciudades para empezar la comparativa</p>
        )}

        {/* Seleccionadas — siempre arriba del todo, fuera de las regiones */}
        {selected.length > 0 && (
          <section className={styles.selectedSection}>
            <h2 className={styles.groupTitle}>
              Seleccionadas <span className={styles.groupCount}>{selected.length}/3</span>
            </h2>
            <div className={styles.miniGrid}>
              {selectedCities.map((city, i) => (
                <MiniCard
                  key={city.slug}
                  city={city}
                  checked
                  accentColor={COL_COLORS[i]}
                  onClick={() => remove(city.slug)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Resto de destinos, agrupados por región en acordeones */}
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
            />
          ))}
        </div>

        {regionGroups.length === 0 && (
          <div className={styles.empty}>
            <span><IconLupa size={40} /></span>
            <p>No hay ciudades que coincidan con "{search}"</p>
            <button onClick={() => setSearch("")}>Ver todas</button>
          </div>
        )}
      </main>

      {/* Botón "Comparar" fijo en la parte inferior — activo desde 2 ciudades */}
      {canCompare && (
        <div className={styles.stickyCompareBar}>
          <div className={styles.stickyCompareInner}>
            <span className={styles.stickyCompareInfo}>
              {selected.length} destino{selected.length > 1 ? "s" : ""} seleccionado{selected.length > 1 ? "s" : ""}
            </span>
            <button className={styles.compareBtn} onClick={() => setComparing(true)}>
              Comparar {selected.length} destinos →
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
