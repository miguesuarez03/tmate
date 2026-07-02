import { useState, useEffect, useRef } from "react";

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
export function ProgressBar({ score, color, animate = true, delay = 0 }) {
  const [width, setWidth] = useState(animate ? 0 : score * 10);
  const ref = useRef(null);

  useEffect(() => {
    if (!animate) { setWidth(score * 10); return; }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(score * 10), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [score, animate, delay]);

  return (
    <div ref={ref} className="progress-bar">
      <div className="progress-bar__fill" style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}77, ${color})` }} />
    </div>
  );
}

// ─── SCORE LEVEL ──────────────────────────────────────────────────────────────
function getLevel(score) {
  if (score >= 8.5) return { label: "Excelente", color: "#22C55E" };
  if (score >= 7)   return { label: "Bueno",     color: "#0EA5E9" };
  if (score >= 5.5) return { label: "Regular",   color: "#F59E0B" };
  return               { label: "Difícil",   color: "#EF4444" };
}

// ─── REVIEW CARD ──────────────────────────────────────────────────────────────
function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <span className="review-card__flag">{review.flag}</span>
      <div>
        <p className="review-card__text">"{review.text}"</p>
        <p className="review-card__author">— {review.author}</p>
      </div>
    </div>
  );
}

// ─── SCORE CARD — new visual design ──────────────────────────────────────────
export default function ScoreCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetail = (item.subcategories?.length > 0) || (item.reviews?.length > 0);
  const level = getLevel(item.score);

  return (
    <div
      className={`score-card${expanded ? " score-card--expanded" : ""}`}
      style={expanded ? { borderColor: `${item.color}50`, background: `linear-gradient(145deg, ${item.color}07, #fff)`, boxShadow: `0 12px 40px ${item.color}18` } : {}}
    >
      <div
        className="score-card__header"
        onClick={() => hasDetail && setExpanded((e) => !e)}
        style={{ cursor: hasDetail ? "pointer" : "default" }}
      >
        {/* Top row: icon + label + BIG number */}
        <div className="score-card__top">
          <div className="score-card__left">
            {/* Big emoji icon */}
            <div className="score-card__icon-wrap" style={{ background: `${item.color}18`, border: `1.5px solid ${item.color}30` }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
            </div>
            <div>
              <span className="score-card__label">{item.label}</span>
              <span className="score-card__level" style={{ color: level.color }}>
                {level.label}
              </span>
            </div>
          </div>

          {/* Big score number */}
          <div className="score-card__score-wrap">
            <span className="score-card__num" style={{ color: item.color }}>{item.score}</span>
            <span className="score-card__denom">/10</span>
            {hasDetail && (
              <div className="score-card__chevron" style={expanded ? { background: `${item.color}22` } : {}}>
                <span style={{ display: "block", transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", color: expanded ? item.color : "var(--color-muted)", fontSize: 13 }}>↓</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar score={item.score} color={item.color} animate delay={index * 60} />

        <p className="score-card__summary">{item.summary}</p>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="score-card__expanded" style={{ background: `${item.color}05`, borderTopColor: `${item.color}22` }}>
          {item.subcategories?.length > 0 && (
            <div style={{ marginBottom: item.reviews?.length > 0 ? 20 : 0 }}>
              <span className="score-card__section-label">Desglose detallado</span>
              {item.subcategories.map((sub, i) => (
                <div key={i} className="sub-item">
                  <div className="sub-item__top">
                    <span className="sub-item__label">{sub.label}</span>
                    <span className="sub-item__score" style={{ color: item.color }}>{sub.score}/10</span>
                  </div>
                  <ProgressBar score={sub.score} color={item.color} animate={false} />
                  <p className="sub-item__desc">{sub.desc}</p>
                </div>
              ))}
            </div>
          )}
          {item.reviews?.length > 0 && (
            <div>
              <span className="score-card__section-label">Experiencias reales</span>
              {item.reviews.map((r, i) => <ReviewCard key={i} review={r} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
