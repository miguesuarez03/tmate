import { useState, useEffect } from "react";
import styles from "./InsightDashboard.module.css";

function scoreColor(s) {
  if (s >= 8.5) return "#22C55E";
  if (s >= 7)   return "#00BFA5";
  if (s >= 5.5) return "#0EA5E9";
  return "#EF4444";
}
function scoreLabel(s) {
  if (s >= 8.5) return "Excelente";
  if (s >= 7)   return "Bueno";
  if (s >= 5.5) return "Regular";
  return "Difícil";
}

// ── Bar ──────────────────────────────────────────────────────────────────────
function AnimatedBar({ score, color, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(score * 10), delay + 100);
    return () => clearTimeout(t);
  }, [score, delay]);
  return (
    <div className={styles.barTrack}>
      <div
        className={styles.barFill}
        style={{ width: `${w}%`, background: color, transition: `width 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}
      />
    </div>
  );
}

// ── Review bubble ─────────────────────────────────────────────────────────────
function ReviewBubble({ review }) {
  return (
    <div className={styles.bubble}>
      <p className={styles.bubbleText}>"{review.text}"</p>
      <div className={styles.bubbleAuthor}>
        <span className={styles.bubbleFlag}>{review.flag}</span>
        <span className={styles.bubbleName}>{review.author}</span>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function InsightDashboard({ scores = [], overallScore }) {
  const [active, setActive] = useState(scores[0]?.id ?? null);
  const current = scores.find(s => s.id === active) ?? scores[0];
  const color = current ? scoreColor(current.score) : "#0EA5E9";

  if (!scores.length) return null;

  return (
    <section className={styles.dash} id="insights">
      {/* Header */}
      <div className={styles.dashTop}>
        <div>
          <p className={styles.eyebrow}>City Scores</p>
          <h2 className={styles.title}>Análisis completo</h2>
          <p className={styles.sub}>Puntuaciones basadas en experiencias reales de estudiantes Erasmus</p>
        </div>
        <div className={styles.overallBadge}>
          <span className={styles.overallNum} style={{ color: scoreColor(overallScore) }}>{overallScore}</span>
          <span className={styles.overallLabel}>nota global</span>
        </div>
      </div>

      <div className={styles.dashGrid}>

        {/* LEFT — metric pills */}
        <div className={styles.metricList}>
          {scores.map(s => {
            const isActive = s.id === active;
            const c = scoreColor(s.score);
            return (
              <button
                key={s.id}
                className={`${styles.metricPill} ${isActive ? styles.metricPillActive : ""}`}
                onClick={() => setActive(s.id)}
                style={isActive ? { "--pill-color": c } : {}}
              >
                <span className={styles.metricEmoji}>{s.icon}</span>
                <div className={styles.metricMeta}>
                  <span className={styles.metricLabel}>{s.label}</span>
                  <div className={styles.metricBar}>
                    <div className={styles.metricBarFill} style={{ width: `${s.score * 10}%`, background: c }} />
                  </div>
                </div>
                <span className={styles.metricScore} style={{ color: c }}>{s.score.toFixed(1)}</span>
              </button>
            );
          })}
        </div>

        {/* CENTER — detail */}
        {current && (
          <div className={styles.detail} key={current.id}>
            {/* Score hero */}
            <div className={styles.detailHero} style={{ "--detail-color": color }}>
              <div className={styles.detailScoreRow}>
                <span className={styles.detailEmoji}>{current.icon}</span>
                <div>
                  <h3 className={styles.detailLabel}>{current.label}</h3>
                  <div className={styles.detailBadge} style={{ background: `${color}20`, color }}>
                    {scoreLabel(current.score)}
                  </div>
                </div>
                <span className={styles.detailScore} style={{ color }}>{current.score.toFixed(1)}</span>
              </div>

              <AnimatedBar score={current.score} color={color} />

              <p className={styles.detailSummary}>{current.summary}</p>
            </div>

            {/* Subcategories */}
            {current.subcategories?.length > 0 && (
              <div className={styles.subcats}>
                <p className={styles.subcatTitle}>Desglose</p>
                {current.subcategories.map((sub, i) => {
                  const sc = scoreColor(sub.score);
                  return (
                    <div key={i} className={styles.subcat}>
                      <div className={styles.subcatHeader}>
                        <span className={styles.subcatLabel}>{sub.label}</span>
                        <span className={styles.subcatScore} style={{ color: sc }}>{sub.score.toFixed(1)}</span>
                      </div>
                      <AnimatedBar score={sub.score} color={sc} delay={i * 80} />
                      {sub.desc && <p className={styles.subcatDesc}>{sub.desc}</p>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* RIGHT — reviews */}
        {current?.reviews?.length > 0 && (
          <div className={styles.reviews}>
            <p className={styles.reviewsTitle}>Opiniones reales</p>
            <div className={styles.reviewsList}>
              {current.reviews.map((r, i) => <ReviewBubble key={i} review={r} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
