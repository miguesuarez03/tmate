import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CITIES } from "../data/cities";
import { getCityInsights, getOverallScore, parseMinCost } from "../lib/cities";
import { Navbar, Footer } from "../components/Layout";
import styles from "./ComparePage.module.css";

const SCORE_IDS = [
  "coste", "fiesta", "extranjeros", "transporte",
  "piso", "erasmus_community", "seguridad", "clima",
  "calidad_vida", "internships",
];

const COL_COLORS = ["#0EA5E9", "#8B5CF6", "#F59E0B"];
const COL_GRADIENTS = [
  "linear-gradient(135deg,#0EA5E9,#14B8A6)",
  "linear-gradient(135deg,#8B5CF6,#EC4899)",
  "linear-gradient(135deg,#F59E0B,#EF4444)",
];

function getScoreMap(slug) {
  const insights = getCityInsights(slug);
  const map = {};
  SCORE_IDS.forEach((id) => {
    const s = insights.scores.find((s) => s.id === id);
    map[id] = s ?? null;
  });
  return map;
}

/* ─── Animated Score Bar ───────────────────────────────────────────────── */
function ScoreBar({ score, max = 10, color, best, label, icon }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((score / max) * 100), 80);
    return () => clearTimeout(t);
  }, [score, max]);

  return (
    <div className={styles.barRow}>
      <div className={styles.barMeta}>
        <span className={styles.barIcon}>{icon}</span>
        <span className={styles.barName}>{label}</span>
      </div>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{
            width: `${width}%`,
            background: color,
            boxShadow: best ? `0 0 10px ${color}80` : "none",
          }}
        />
        <span className={`${styles.barNum} ${best ? styles.barNumBest : ""}`}
          style={best ? { color } : {}}>
          {score.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

/* ─── Radar Chart (SVG) ─────────────────────────────────────────────────── */
function RadarChart({ cities, scoreMaps }) {
  const SIZE = 200;
  const CENTER = SIZE / 2;
  const R = 80;
  const LABELS = [
    { id: "coste", label: "Coste" },
    { id: "fiesta", label: "Fiesta" },
    { id: "clima", label: "Clima" },
    { id: "seguridad", label: "Seguridad" },
    { id: "transporte", label: "Transporte" },
    { id: "erasmus_community", label: "Erasmus" },
  ];
  const N = LABELS.length;

  function toXY(angle, r) {
    return [
      CENTER + r * Math.cos(angle - Math.PI / 2),
      CENTER + r * Math.sin(angle - Math.PI / 2),
    ];
  }

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={styles.radar}>
      {/* Grid rings */}
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={LABELS.map((_, i) => {
            const [x, y] = toXY((2 * Math.PI * i) / N, R * ring);
            return `${x},${y}`;
          }).join(" ")}
          fill="none"
          stroke="rgba(148,163,184,0.2)"
          strokeWidth="1"
        />
      ))}
      {/* Spokes */}
      {LABELS.map((_, i) => {
        const [x, y] = toXY((2 * Math.PI * i) / N, R);
        return <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="rgba(148,163,184,0.2)" strokeWidth="1" />;
      })}
      {/* Data polygons */}
      {cities.map((city, ci) => {
        const points = LABELS.map((l, i) => {
          const score = scoreMaps[ci][l.id]?.score ?? 0;
          const [x, y] = toXY((2 * Math.PI * i) / N, R * (score / 10));
          return `${x},${y}`;
        }).join(" ");
        return (
          <g key={city.slug}>
            <polygon
              points={points}
              fill={COL_COLORS[ci]}
              fillOpacity="0.15"
              stroke={COL_COLORS[ci]}
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
        );
      })}
      {/* Labels */}
      {LABELS.map((l, i) => {
        const [x, y] = toXY((2 * Math.PI * i) / N, R + 16);
        return (
          <text key={l.id} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fontSize="9" fill="var(--color-slate)" fontFamily="var(--font-body)" fontWeight="600">
            {l.label}
          </text>
        );
      })}
    </svg>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────── */
export default function ComparePage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [comparing, setComparing] = useState(false);

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

  const scoreMaps = useMemo(() => selectedCities.map((c) => getScoreMap(c.slug)), [selectedCities]);
  const overallScores = useMemo(() => selectedCities.map((c) => getOverallScore(c.slug)), [selectedCities]);

  function toggle(slug) {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug)
        : prev.length < 3 ? [...prev, slug] : prev
    );
  }
  function remove(slug) {
    setSelected((prev) => prev.filter((s) => s !== slug));
    if (selected.length <= 2) setComparing(false);
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
              {selectedCities.map((city, i) => (
                <div key={city.slug} className={styles.cityCard} style={{ "--accent": COL_COLORS[i] }}>
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
                  </div>

                  {/* Score badge */}
                  <div className={styles.overallBadge} style={{ background: COL_GRADIENTS[i] }}>
                    {maxIdx === i && <span className={styles.crownIcon}>👑</span>}
                    <span className={styles.overallNumber}>{overallScores[i].toFixed(1)}</span>
                    <span className={styles.overallLabel}>/ 10</span>
                    {maxIdx === i && <span className={styles.bestLabel}>Mejor puntuación</span>}
                  </div>

                  {/* Quick stats */}
                  <div className={styles.quickStats}>
                    <div className={styles.stat}><span>💶</span><span>{city.costDetail}</span></div>
                    <div className={styles.stat}><span>🎓</span><span>{city.erasmusStudents} Erasmus</span></div>
                    <div className={styles.stat}><span>🌤️</span><span>{city.weather}</span></div>
                    <div className={styles.stat}><span>🗣️</span><span>{city.language}</span></div>
                  </div>

                  <button className={styles.cityLinkBtn} style={{ borderColor: COL_COLORS[i], color: COL_COLORS[i] }}
                    onClick={() => navigate(`/city/${city.slug}`)}>
                    Ver guía completa →
                  </button>
                </div>
              ))}
            </div>

            {/* Radar + scores side by side */}
            <div className={styles.analysisGrid}>

              {/* Radar chart */}
              <div className={styles.radarCard}>
                <h3 className={styles.sectionTitle}>Vista general</h3>
                <RadarChart cities={selectedCities} scoreMaps={scoreMaps} />
                <div className={styles.radarLegend}>
                  {selectedCities.map((city, i) => (
                    <div key={city.slug} className={styles.radarLegendItem}>
                      <span className={styles.radarDot} style={{ background: COL_COLORS[i] }} />
                      <span>{city.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Score bars */}
              <div className={styles.scoresCard}>
                <h3 className={styles.sectionTitle}>Puntuaciones detalladas</h3>
                {SCORE_IDS.map((id) => {
                  const rows = selectedCities.map((city, i) => ({
                    city, scoreObj: scoreMaps[i][id], color: COL_COLORS[i],
                  }));
                  const scores = rows.map((r) => r.scoreObj?.score ?? 0);
                  const maxScore = Math.max(...scores);
                  const firstRow = rows[0].scoreObj;
                  if (!firstRow) return null;

                  return (
                    <div key={id} className={styles.scoreGroup}>
                      <div className={styles.scoreGroupHeader}>
                        <span>{firstRow.icon}</span>
                        <span className={styles.scoreGroupName}>{firstRow.label}</span>
                      </div>
                      {rows.map(({ city, scoreObj, color }) => (
                        <div key={city.slug} className={styles.scoreBarRow}>
                          <span className={styles.scoreBarCityName}
                            style={{ color }}>
                            {city.name}
                          </span>
                          <div className={styles.scoreBarTrack}>
                            <div className={styles.scoreBarFill}
                              style={{
                                width: `${((scoreObj?.score ?? 0) / 10) * 100}%`,
                                background: color,
                                opacity: scoreObj?.score === maxScore ? 1 : 0.45,
                              }}
                            />
                            <span className={styles.scoreBarNum}
                              style={{ color: scoreObj?.score === maxScore ? color : "var(--color-slate)" }}>
                              {(scoreObj?.score ?? 0).toFixed(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
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

            {/* Verdict */}
            <div className={styles.verdictSection}>
              <h3 className={styles.sectionTitle}>¿Cuál te conviene más?</h3>
              <div className={styles.verdictGrid} style={{ "--cols": selectedCities.length }}>
                {selectedCities.map((city, i) => {
                  const overall = overallScores[i];
                  const isTop = maxIdx === i;
                  const isCheapest = parseMinCost(city.costDetail) === Math.min(...selectedCities.map((c) => parseMinCost(c.costDetail)));
                  const bestCategory = SCORE_IDS.reduce((best, id) => {
                    const s = scoreMaps[i][id]?.score ?? 0;
                    const bs = scoreMaps[i][best]?.score ?? 0;
                    return s > bs ? id : best;
                  }, SCORE_IDS[0]);
                  const bestScoreObj = scoreMaps[i][bestCategory];

                  return (
                    <div key={city.slug}
                      className={`${styles.verdictCard} ${isTop ? styles.verdictCardTop : ""}`}
                      style={{ borderColor: isTop ? COL_COLORS[i] : "var(--color-border)", "--accent": COL_COLORS[i] }}>
                      {isTop && (
                        <div className={styles.verdictBadge} style={{ background: COL_GRADIENTS[i] }}>
                          👑 Mejor puntuación general
                        </div>
                      )}
                      <div className={styles.verdictEmoji}>{city.emoji}</div>
                      <div className={styles.verdictCity}>{city.name}</div>
                      <div className={styles.verdictScore} style={{ WebkitTextFillColor: "transparent",
                        backgroundImage: COL_GRADIENTS[i], WebkitBackgroundClip: "text", backgroundClip: "text" }}>
                        {overall.toFixed(1)}
                      </div>
                      <div className={styles.verdictTags}>
                        {isCheapest && <span className={styles.verdictTag}>💶 Más económica</span>}
                        {bestScoreObj && (
                          <span className={styles.verdictTag}>
                            {bestScoreObj.icon} Destaca en {bestScoreObj.label}
                          </span>
                        )}
                      </div>
                      <p className={styles.verdictPhrase}>"{city.phrase}"</p>
                      <button className={styles.verdictBtn}
                        style={{ background: COL_GRADIENTS[i] }}
                        onClick={() => navigate(`/city/${city.slug}`)}>
                        Ver guía →
                      </button>
                    </div>
                  );
                })}
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
          <span className={styles.selectorBadge}>⚖️ Comparativa</span>
          <h1 className={styles.selectorTitle}>Comparativa de destinos</h1>
          <p className={styles.selectorSub}>
            Elige 2 o 3 ciudades y compara sus puntuaciones, coste de vida, vibe y mucho más — lado a lado.
          </p>
        </div>
      </div>

      <main className={styles.selectorMain}>

        {/* Selection bar */}
        {selected.length > 0 && (
          <div className={styles.selectionBar}>
            <div className={styles.selectionPills}>
              {selectedCities.map((city, i) => (
                <div key={city.slug} className={styles.pill} style={{ "--pill-color": COL_COLORS[i] }}>
                  <span>{city.emoji} {city.name}</span>
                  <button className={styles.pillRemove} onClick={() => remove(city.slug)}>✕</button>
                </div>
              ))}
              {selected.length < 3 && (
                <div className={styles.pillEmpty}>
                  + Añadir {selected.length === 1 ? "otra ciudad" : "una más"} (opcional)
                </div>
              )}
            </div>
            {canCompare && (
              <button className={styles.compareBtn} onClick={() => setComparing(true)}>
                Comparar {selected.length} destinos →
              </button>
            )}
          </div>
        )}

        {/* Search */}
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input className={styles.searchInput} type="text"
            placeholder="Busca por ciudad, país o tag…"
            value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && (
            <button className={styles.searchClear} onClick={() => setSearch("")}>✕</button>
          )}
        </div>

        {selected.length === 0 && (
          <p className={styles.hint}>Selecciona de 2 a 3 ciudades para empezar la comparativa</p>
        )}

        {/* City grid */}
        <div className={styles.cityGrid}>
          {filtered.map((city) => {
            const overall = getOverallScore(city.slug);
            const isSelected = selected.includes(city.slug);
            const isFull = selected.length >= 3 && !isSelected;
            const selIdx = selected.indexOf(city.slug);

            return (
              <button key={city.slug}
                className={`${styles.cityTile} ${isSelected ? styles.cityTileSelected : ""} ${isFull ? styles.cityTileFull : ""}`}
                style={isSelected ? { "--tile-color": COL_COLORS[selIdx] } : {}}
                onClick={() => !isFull && toggle(city.slug)}
                disabled={isFull}>
                <div className={styles.tileImg} style={{ backgroundImage: `url(${city.img})` }}>
                  <div className={styles.tileOverlay} />
                  {isSelected && (
                    <div className={styles.tileCheck} style={{ background: COL_COLORS[selIdx] }}>✓</div>
                  )}
                  <div className={styles.tileScore}>{overall.toFixed(1)}</div>
                </div>
                <div className={styles.tileBody}>
                  <div className={styles.tileName}>{city.emoji} {city.name}</div>
                  <div className={styles.tileCountry}>{city.country}</div>
                  <div className={styles.tileTag}>{city.tag}</div>
                  <div className={styles.tileCost}>{city.costDetail}</div>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <span>🔍</span>
            <p>No hay ciudades que coincidan con "{search}"</p>
            <button onClick={() => setSearch("")}>Ver todas</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
