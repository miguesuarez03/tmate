import { useState } from "react";
import styles from "./InsightDashboard.module.css";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getScoreConfig(score) {
  if (score >= 8.5) return { label: "Excelente", color: "#22C55E", track: "#DCFCE7" };
  if (score >= 7)   return { label: "Bueno",     color: "#0EA5E9", track: "#DBEAFE" };
  if (score >= 5.5) return { label: "Regular",   color: "#F59E0B", track: "#FEF3C7" };
  return               { label: "Difícil",   color: "#EF4444", track: "#FEE2E2" };
}

// ─── ICONS ────────────────────────────────────────────────────────────────────

const IconChevron = ({ open }) => (
  <svg
    width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
  >
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const IconQuote = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" opacity="0.18">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
  </svg>
);

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function SubcategoryBar({ label, score, desc }) {
  const { color, track } = getScoreConfig(score);
  return (
    <div className={styles.subcat}>
      <div className={styles.subcatHeader}>
        <span className={styles.subcatLabel}>{label}</span>
        <span className={styles.subcatScore} style={{ color }}>{score.toFixed(1)}</span>
      </div>
      <div className={styles.subcatTrack} style={{ background: track }}>
        <div
          className={styles.subcatFill}
          style={{ width: `${score * 10}%`, background: color }}
        />
      </div>
      {desc && <p className={styles.subcatDesc}>{desc}</p>}
    </div>
  );
}

function ReviewBubble({ review }) {
  return (
    <div className={styles.bubble}>
      <div className={styles.bubbleQuote}><IconQuote /></div>
      <p className={styles.bubbleText}>{review.text}</p>
      <div className={styles.bubbleAuthor}>
        <span className={styles.bubbleFlag}>{review.flag}</span>
        <span className={styles.bubbleName}>{review.author}</span>
      </div>
    </div>
  );
}

function ScoreRow({ score, isOpen, onToggle }) {
  const { label, color, track } = getScoreConfig(score.score);

  return (
    <div className={`${styles.row} ${isOpen ? styles.rowOpen : ""}`}>
      {/* ── Clickable header ── */}
      <button className={styles.rowHeader} onClick={onToggle} aria-expanded={isOpen}>
        {/* Icon */}
        <div className={styles.rowIcon} style={{ background: track, color }}>
          <span className={styles.rowEmoji}>{score.icon}</span>
        </div>

        {/* Label + bar */}
        <div className={styles.rowMain}>
          <div className={styles.rowTitleRow}>
            <span className={styles.rowLabel}>{score.label}</span>
            <span className={styles.rowBadge} style={{ background: track, color }}>{label}</span>
          </div>
          <div className={styles.rowTrack}>
            <div
              className={styles.rowFill}
              style={{ width: isOpen ? `${score.score * 10}%` : "0%", background: color }}
            />
          </div>
          <p className={styles.rowSummary}>{score.summary}</p>
        </div>

        {/* Score + chevron */}
        <div className={styles.rowRight}>
          <span className={styles.rowScore} style={{ color }}>{score.score.toFixed(1)}</span>
          <span className={styles.rowChevron} style={{ color: "var(--color-muted, #888)" }}>
            <IconChevron open={isOpen} />
          </span>
        </div>
      </button>

      {/* ── Expandable panel ── */}
      <div className={`${styles.rowPanel} ${isOpen ? styles.rowPanelOpen : ""}`}>
        <div className={styles.rowPanelInner}>
          {/* Subcategories */}
          {score.subcategories?.length > 0 && (
            <div className={styles.subcats}>
              <p className={styles.panelSectionLabel}>Desglose</p>
              {score.subcategories.map((sub, i) => (
                <SubcategoryBar key={i} {...sub} />
              ))}
            </div>
          )}

          {/* Reviews */}
          {score.reviews?.length > 0 && (
            <div className={styles.reviews}>
              <p className={styles.panelSectionLabel}>Opiniones reales</p>
              <div className={styles.reviewsGrid}>
                {score.reviews.map((rev, i) => (
                  <ReviewBubble key={i} review={rev} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function InsightDashboard({ scores = [], overallScore }) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(prev => (prev === id ? null : id));

  const { color: overallColor } = getScoreConfig(overallScore);

  return (
    <section className={styles.dashboard}>
      {/* Section header */}
      <div className={styles.dashHeader}>
        <div>
          <p className={styles.dashEyebrow}>City Scores</p>
          <h2 className={styles.dashTitle}>Análisis completo</h2>
          <p className={styles.dashSubtitle}>
            Puntuaciones reales basadas en experiencias de estudiantes Erasmus
          </p>
        </div>
        <div className={styles.dashOverall}>
          <span className={styles.dashOverallNum} style={{ color: overallColor }}>
            {overallScore}
          </span>
          <span className={styles.dashOverallLabel}>Nota global</span>
        </div>
      </div>

      {/* Accordion rows */}
      <div className={styles.dashList}>
        {scores.map((score) => (
          <ScoreRow
            key={score.id}
            score={score}
            isOpen={openId === score.id}
            onToggle={() => toggle(score.id)}
          />
        ))}
      </div>
    </section>
  );
}
