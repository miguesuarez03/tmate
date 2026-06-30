import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CITIES } from "../data/cities";
import { getCityInsights, getOverallScore, parseMinCost } from "../lib/cities";
import { getComparePhrase } from "../data/comparePhrases";
import { Navbar, Footer } from "../components/Layout";
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

function getScoreMap(slug) {
  const insights = getCityInsights(slug);
  const map = {};
  SCORE_IDS.forEach((id) => {
    const s = insights.scores.find((s) => s.id === id);
    map[id] = s ?? null;
  });
  return map;
}


/* ─── Versus Card (per category) ───────────────────────────────────────── */
function VersusCard({ categoryMeta, rows }) {
  const maxScore = Math.max(...rows.map((r) => r.score));
  const winners = rows.filter((r) => r.score === maxScore);
  const isTie = winners.length > 1;

  return (
    <div className={styles.versusCard}>
      <div className={styles.versusCardHeader}>
        <span className={styles.versusCardIcon}>{categoryMeta.icon}</span>
        <span className={styles.versusCardLabel}>{categoryMeta.label}</span>
      </div>
      <div className={styles.versusCardRows} style={{ "--vc-cols": rows.length }}>
        {rows.map((r) => {
          const isWinner = !isTie && r.score === maxScore;
          return (
            <div key={r.city.slug}
              className={`${styles.versusCol} ${isWinner ? styles.versusColWinner : ""}`}
              style={{ "--accent": r.color }}>
              <div className={styles.versusColHead}>
                <span className={styles.versusColName} style={{ color: r.color }}>{r.city.name}</span>
                {isWinner && <span className={styles.versusTrophy} title="Gana en esta categoría">🏆</span>}
              </div>
              <span className={styles.versusColScore} style={isWinner ? { color: r.color } : {}}>
                {r.score.toFixed(1)}
              </span>
              {r.phrase && <p className={styles.versusColPhrase}>{r.phrase}</p>}
            </div>
          );
        })}
      </div>
    </div>
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
                      <div className={styles.cityCardBadges}>
                        {isTop && <span className={styles.cityCardTag}>👑 Mejor puntuación</span>}
                        {isCheapest && <span className={styles.cityCardTag}>💶 Más económica</span>}
                        {bestScoreObj && (
                          <span className={styles.cityCardTag}>
                            {bestScoreObj.icon} Destaca en {bestScoreObj.label}
                          </span>
                        )}
                        {city.phrase && <p className={styles.cityCardPhrase}>"{city.phrase}"</p>}
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
                );
              })}
            </div>

            {/* Versus cards per category */}
            <div className={styles.versusSection}>
              <h3 className={styles.sectionTitle}>Puntuaciones detalladas</h3>
              <div className={styles.versusGrid}>
                {SCORE_IDS.map((id) => {
                  const rows = selectedCities.map((city, i) => ({
                    city,
                    color: COL_COLORS[i],
                    score: scoreMaps[i][id]?.score ?? 0,
                    phrase: getComparePhrase(city.slug, id),
                  }));
                  const firstScoreObj = selectedCities
                    .map((_, i) => scoreMaps[i][id])
                    .find(Boolean);
                  if (!firstScoreObj) return null;

                  return (
                    <VersusCard
                      key={id}
                      categoryMeta={{ icon: firstScoreObj.icon, label: firstScoreObj.label }}
                      rows={rows}
                    />
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
