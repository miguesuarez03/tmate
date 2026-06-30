import { useState, useEffect } from "react";
import styles from "./InsightDashboard.module.css";
import { getCityWhatsappGroup } from "../../data/cityWhatsappGroups";

function scoreColor(s) {
  if (s >= 9)   return "#22C55E";
  if (s >= 8)   return "#00BFA5";
  if (s >= 6)   return "#0EA5E9";
  if (s >= 5)   return "#F59E0B";
  if (s >= 3)   return "#EF4444";
  return "#991B1B";
}
function scoreLabel(s) {
  if (s >= 9)   return "Excelente";
  if (s >= 8)   return "Muy bueno";
  if (s >= 6)   return "Bueno";
  if (s >= 5)   return "Aceptable";
  if (s >= 3)   return "Malo";
  return "Muy malo";
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
export default function InsightDashboard({ scores = [], overallScore, citySlug, cityName }) {
  const [active, setActive] = useState(scores[0]?.id ?? null);
  const current = scores.find(s => s.id === active) ?? scores[0];
  const color = current ? scoreColor(current.score) : "#0EA5E9";
  const whatsappGroup = getCityWhatsappGroup(citySlug);

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

          {/* Accesos rápidos: WhatsApp + alojamiento */}
          <div className={styles.quickAccessBox}>
            <p className={styles.quickAccessTitle}>Accesos rápidos</p>
            {whatsappGroup ? (
              <a href={whatsappGroup} target="_blank" rel="noopener noreferrer" className={styles.quickAccessItem} style={{ "--qa-color": "#25D366" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.6 6.32A8.78 8.78 0 0 0 12.06 4a8.94 8.94 0 0 0-7.74 13.4L3 21l3.7-1.28a8.85 8.85 0 0 0 5.36 1.83h.01a8.94 8.94 0 0 0 7.7-13.4 8.84 8.84 0 0 0-2.17-1.83Zm-5.54 13.7h-.01a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.81.97.94-2.74-.18-.28a7.43 7.43 0 0 1 11.51-9.22 7.31 7.31 0 0 1 2.17 5.21 7.43 7.43 0 0 1-7.57 7.26Zm4.07-5.57c-.22-.11-1.31-.65-1.51-.72-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.86-.13.15-.26.16-.48.05a6.1 6.1 0 0 1-1.8-1.11 6.7 6.7 0 0 1-1.24-1.54c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.07-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38h-.43c-.15 0-.39.05-.6.28-.2.22-.78.77-.78 1.86s.8 2.16.91 2.31c.11.15 1.57 2.4 3.81 3.36.53.23.95.36 1.27.47.53.17 1.02.14 1.4.09.43-.06 1.31-.53 1.49-1.05.18-.51.18-.95.13-1.05-.05-.1-.2-.16-.42-.27Z"/>
                </svg>
                <span>Grupo de WhatsApp</span>
              </a>
            ) : (
              <span className={styles.quickAccessItem} style={{ "--qa-color": "#94A3B8", cursor: "default", opacity: 0.65 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.6 6.32A8.78 8.78 0 0 0 12.06 4a8.94 8.94 0 0 0-7.74 13.4L3 21l3.7-1.28a8.85 8.85 0 0 0 5.36 1.83h.01a8.94 8.94 0 0 0 7.7-13.4 8.84 8.84 0 0 0-2.17-1.83Z"/>
                </svg>
                <span>Grupo de WhatsApp — próximamente</span>
              </span>
            )}
            <span className={styles.quickAccessItem} style={{ "--qa-color": "#94A3B8", cursor: "default", opacity: 0.65 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>
              </svg>
              <span>Búsqueda de alojamiento — próximamente</span>
            </span>
          </div>
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
