import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CITIES } from "../data/cities";
import { getCityInsights, getOverallScore, parseMinCost } from "../lib/cities";
import { Navbar, Footer } from "../components/Layout";
import styles from "./ComparePage.module.css";

// ─── Score IDs canónicos ────────────────────────────────────────────────────
const SCORE_IDS = [
  "coste",
  "fiesta",
  "extranjeros",
  "transporte",
  "piso",
  "erasmus_community",
  "seguridad",
  "clima",
  "calidad_vida",
  "internships",
];

// ─── Helpers ────────────────────────────────────────────────────────────────
function getScoreMap(slug) {
  const insights = getCityInsights(slug);
  const map = {};
  SCORE_IDS.forEach((id) => {
    const s = insights.scores.find((s) => s.id === id);
    map[id] = s ?? null;
  });
  return map;
}

function ScoreBar({ score, max = 10, color, best }) {
  const pct = (score / max) * 100;
  return (
    <div className={styles.barWrap}>
      <div
        className={`${styles.bar} ${best ? styles.barBest : ""}`}
        style={{ width: `${pct}%`, background: color ?? "var(--color-primary)" }}
      />
      <span className={`${styles.barLabel} ${best ? styles.barLabelBest : ""}`}>
        {score.toFixed(1)}
      </span>
    </div>
  );
}

// Colores predeterminados por columna
const COL_COLORS = ["#0EA5E9", "#8B5CF6", "#F59E0B"];

// ─── Componente Principal ───────────────────────────────────────────────────
export default function ComparePage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [comparing, setComparing] = useState(false);

  // Ciudades filtradas para el selector
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return CITIES.filter(
      (c) =>
        !selected.includes(c.slug) &&
        (!q ||
          c.name.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.tag.toLowerCase().includes(q))
    );
  }, [search, selected]);

  const selectedCities = useMemo(
    () => selected.map((s) => CITIES.find((c) => c.slug === s)).filter(Boolean),
    [selected]
  );

  const scoreMaps = useMemo(
    () => selectedCities.map((c) => getScoreMap(c.slug)),
    [selectedCities]
  );

  const overallScores = useMemo(
    () => selectedCities.map((c) => getOverallScore(c.slug)),
    [selectedCities]
  );

  function toggle(slug) {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < 3
        ? [...prev, slug]
        : prev
    );
  }

  function remove(slug) {
    setSelected((prev) => prev.filter((s) => s !== slug));
    if (selected.length <= 2) setComparing(false);
  }

  const canCompare = selected.length >= 2;

  // ─── Vista comparativa ─────────────────────────────────────────────────
  if (comparing && canCompare) {
    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.compareMain}>
          {/* Header */}
          <div className={styles.compareHeader}>
            <button className={styles.backBtn} onClick={() => setComparing(false)}>
              ← Cambiar selección
            </button>
            <h1 className={styles.compareTitle}>Comparativa</h1>
            <p className={styles.compareSubtitle}>
              {selectedCities.map((c) => c.name).join(" vs ")}
            </p>
          </div>

          {/* Tarjetas de ciudad */}
          <div
            className={styles.cityCards}
            style={{ "--cols": selectedCities.length }}
          >
            {selectedCities.map((city, i) => (
              <div key={city.slug} className={styles.cityCard}>
                <div
                  className={styles.cityCardHero}
                  style={{ backgroundImage: `url(${city.img})` }}
                >
                  <div className={styles.cityCardOverlay} />
                  <div className={styles.cityCardTop}>
                    <span className={styles.cityEmoji}>{city.emoji}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => remove(city.slug)}
                      title="Quitar"
                    >
                      ✕
                    </button>
                  </div>
                  <div className={styles.cityCardInfo}>
                    <h2 className={styles.cityCardName}>{city.name}</h2>
                    <span className={styles.cityCardCountry}>{city.country}</span>
                  </div>
                </div>

                {/* Score global */}
                <div
                  className={styles.overallBadge}
                  style={{
                    background: `linear-gradient(135deg, ${COL_COLORS[i]}, ${COL_COLORS[i]}cc)`,
                  }}
                >
                  <span className={styles.overallNumber}>
                    {overallScores[i].toFixed(1)}
                  </span>
                  <span className={styles.overallLabel}>/ 10</span>
                </div>

                {/* Stats rápidas */}
                <div className={styles.quickStats}>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>💶</span>
                    <span className={styles.statVal}>{city.costDetail}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>🎓</span>
                    <span className={styles.statVal}>{city.erasmusStudents} Erasmus</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>🌤️</span>
                    <span className={styles.statVal}>{city.weather}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>🗣️</span>
                    <span className={styles.statVal}>{city.language}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabla de scores */}
          <div className={styles.scoresSection}>
            <h3 className={styles.scoresTitle}>Puntuaciones detalladas</h3>
            <div className={styles.scoresGrid}>
              {SCORE_IDS.map((id) => {
                const rows = selectedCities.map((city, i) => ({
                  city,
                  scoreObj: scoreMaps[i][id],
                  colColor: COL_COLORS[i],
                }));
                const scores = rows.map((r) => r.scoreObj?.score ?? 0);
                const maxScore = Math.max(...scores);
                const firstRow = rows[0].scoreObj;
                if (!firstRow) return null;

                return (
                  <div key={id} className={styles.scoreRow}>
                    <div className={styles.scoreRowLabel}>
                      <span className={styles.scoreRowIcon}>{firstRow.icon}</span>
                      <span className={styles.scoreRowName}>{firstRow.label}</span>
                    </div>
                    <div
                      className={styles.scoreBars}
                      style={{ "--cols": selectedCities.length }}
                    >
                      {rows.map(({ city, scoreObj, colColor }, i) => (
                        <div key={city.slug} className={styles.scoreBarCell}>
                          <ScoreBar
                            score={scoreObj?.score ?? 0}
                            color={colColor}
                            best={scoreObj?.score === maxScore && scores.filter(s => s === maxScore).length === 1}
                          />
                          {scoreObj?.summary && (
                            <p className={styles.scoreBarSummary}>
                              {scoreObj.summary}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Características clave */}
          <div className={styles.featuresSection}>
            <h3 className={styles.scoresTitle}>Características clave</h3>
            <div
              className={styles.featuresGrid}
              style={{ "--cols": selectedCities.length }}
            >
              {selectedCities.map((city, i) => (
                <div key={city.slug} className={styles.featureCol}>
                  <div
                    className={styles.featureColHead}
                    style={{ color: COL_COLORS[i] }}
                  >
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
                    <span className={styles.featureLabel}>Estudiantes</span>
                    <span className={styles.featureVal}>{city.students}</span>
                  </div>

                  <div className={styles.featureBlock}>
                    <span className={styles.featureLabel}>Highlights</span>
                    <ul className={styles.highlightList}>
                      {city.highlights.slice(0, 3).map((h, hi) => (
                        <li key={hi}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.featureBlock}>
                    <span className={styles.featureLabel}>Universidades</span>
                    <ul className={styles.highlightList}>
                      {city.universities.slice(0, 2).map((u, ui) => (
                        <li key={ui}>{u}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.featureBlock}>
                    <span className={styles.featureLabel}>Tips locales</span>
                    <ul className={styles.highlightList}>
                      {city.tips.slice(0, 2).map((t, ti) => (
                        <li key={ti}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className={styles.cityLinkBtn}
                    style={{ borderColor: COL_COLORS[i], color: COL_COLORS[i] }}
                    onClick={() => navigate(`/city/${city.slug}`)}
                  >
                    Ver guía completa →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Veredicto */}
          {selected.length >= 2 && (
            <div className={styles.verdictSection}>
              <h3 className={styles.scoresTitle}>¿Cuál te conviene más?</h3>
              <div
                className={styles.verdictGrid}
                style={{ "--cols": selectedCities.length }}
              >
                {selectedCities.map((city, i) => {
                  const overall = overallScores[i];
                  const isTop = overallScores.indexOf(Math.max(...overallScores)) === i;
                  const isCheapest =
                    parseMinCost(city.costDetail) ===
                    Math.min(...selectedCities.map((c) => parseMinCost(c.costDetail)));
                  const topScore = scoreMaps[i];
                  const bestCategory = SCORE_IDS.reduce((best, id) => {
                    const s = topScore[id]?.score ?? 0;
                    const bs = topScore[best]?.score ?? 0;
                    return s > bs ? id : best;
                  }, SCORE_IDS[0]);
                  const bestScoreObj = topScore[bestCategory];

                  return (
                    <div
                      key={city.slug}
                      className={`${styles.verdictCard} ${isTop ? styles.verdictCardTop : ""}`}
                      style={{
                        "--accent": COL_COLORS[i],
                        borderColor: isTop ? COL_COLORS[i] : "var(--color-border)",
                      }}
                    >
                      {isTop && (
                        <div
                          className={styles.verdictBadge}
                          style={{ background: COL_COLORS[i] }}
                        >
                          ⭐ Mejor puntuación
                        </div>
                      )}
                      <div className={styles.verdictCity}>
                        {city.emoji} {city.name}
                      </div>
                      <div className={styles.verdictScore}>{overall.toFixed(1)}</div>
                      <div className={styles.verdictTags}>
                        {isCheapest && (
                          <span className={styles.verdictTag}>💶 Más económica</span>
                        )}
                        {bestScoreObj && (
                          <span className={styles.verdictTag}>
                            {bestScoreObj.icon} Destaca en {bestScoreObj.label}
                          </span>
                        )}
                      </div>
                      <p className={styles.verdictPhrase}>"{city.phrase}"</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  // ─── Vista selector ────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.selectorMain}>
        {/* Hero */}
        <div className={styles.selectorHero}>
          <span className={styles.selectorIcon}>⚖️</span>
          <h1 className={styles.selectorTitle}>Compara destinos</h1>
          <p className={styles.selectorSub}>
            Elige 2 o 3 ciudades y compara sus puntuaciones, coste, vibe y mucho más.
          </p>
        </div>

        {/* Seleccionadas */}
        {selected.length > 0 && (
          <div className={styles.selectionBar}>
            <div className={styles.selectionPills}>
              {selectedCities.map((city, i) => (
                <div
                  key={city.slug}
                  className={styles.pill}
                  style={{ "--pill-color": COL_COLORS[i] }}
                >
                  <span>{city.emoji} {city.name}</span>
                  <button
                    className={styles.pillRemove}
                    onClick={() => remove(city.slug)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              {selected.length < 3 && (
                <div className={styles.pillEmpty}>
                  + Añadir {selected.length === 1 ? "otra" : "una más"} (opcional)
                </div>
              )}
            </div>
            {canCompare && (
              <button
                className={styles.compareBtn}
                onClick={() => setComparing(true)}
              >
                Comparar {selected.length} destinos →
              </button>
            )}
          </div>
        )}

        {/* Buscador */}
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Busca por ciudad, país o tag…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.searchClear} onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>

        {/* Hint */}
        {selected.length === 0 && (
          <p className={styles.hint}>
            Selecciona de 2 a 3 ciudades para empezar la comparativa
          </p>
        )}

        {/* Grid de ciudades */}
        <div className={styles.cityGrid}>
          {filtered.map((city) => {
            const overall = getOverallScore(city.slug);
            const isSelected = selected.includes(city.slug);
            const isFull = selected.length >= 3 && !isSelected;
            const selIdx = selected.indexOf(city.slug);

            return (
              <button
                key={city.slug}
                className={`${styles.cityTile} ${isSelected ? styles.cityTileSelected : ""} ${isFull ? styles.cityTileFull : ""}`}
                style={
                  isSelected
                    ? { "--tile-color": COL_COLORS[selIdx] }
                    : {}
                }
                onClick={() => !isFull && toggle(city.slug)}
                disabled={isFull}
              >
                <div
                  className={styles.tileImg}
                  style={{ backgroundImage: `url(${city.img})` }}
                >
                  <div className={styles.tileOverlay} />
                  {isSelected && (
                    <div
                      className={styles.tileCheck}
                      style={{ background: COL_COLORS[selIdx] }}
                    >
                      ✓
                    </div>
                  )}
                  <div className={styles.tileScore}>{overall.toFixed(1)}</div>
                </div>
                <div className={styles.tileBody}>
                  <div className={styles.tileName}>
                    {city.emoji} {city.name}
                  </div>
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
