import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.css";

// ─── MOOD TAGS CONFIG ─────────────────────────────────────────────────────────
const MOOD_ICONS = {
  erasmus: { icon: "🌍", label: "Top Erasmus" },
  fiesta:  { icon: "🎉", label: "Gran vida social" },
  barato:  { icon: "💸", label: "Asequible" },
  sol:     { icon: "☀️", label: "Mucho sol" },
  bici:    { icon: "🚲", label: "Ciclable" },
  seguro:  { icon: "🛡️", label: "Segura" },
  foodie:  { icon: "🍝", label: "Gastronómica" },
  arte:    { icon: "🎨", label: "Cultural" },
  tech:    { icon: "💻", label: "Tech & startups" },
  playa:   { icon: "🏖️", label: "Cerca del mar" },
};

function getMoodTags(city) {
  const tags = [];
  if (city.erasmus >= 90) tags.push("erasmus");
  if (city.costDetail?.includes("350") || city.costDetail?.includes("450") || city.costDetail?.includes("500")) tags.push("barato");
  if (city.vibe?.toLowerCase().includes("gastro") || city.highlights?.some(h => h.toLowerCase().includes("pasta") || h.toLowerCase().includes("gastro"))) tags.push("foodie");
  if (city.weather?.toLowerCase().includes("mediterr") || city.weather?.toLowerCase().includes("sol")) tags.push("sol");
  if (city.highlights?.some(h => h.toLowerCase().includes("bici") || h.toLowerCase().includes("cicl"))) tags.push("bici");
  if (city.highlights?.some(h => h.toLowerCase().includes("playa") || h.toLowerCase().includes("mar") || h.toLowerCase().includes("surf"))) tags.push("playa");
  if (city.vibe?.toLowerCase().includes("cultur") || city.highlights?.some(h => h.toLowerCase().includes("museo") || h.toLowerCase().includes("arte"))) tags.push("arte");
  if (city.highlights?.some(h => h.toLowerCase().includes("startup") || h.toLowerCase().includes("tech") || h.toLowerCase().includes("fintech"))) tags.push("tech");
  tags.push("fiesta");
  return tags.slice(0, 5).map(k => MOOD_ICONS[k]).filter(Boolean);
}

function scoreColor(score) {
  if (score >= 8.5) return "#22C55E";
  if (score >= 7.5) return "#00BFA5";
  if (score >= 6.5) return "#0EA5E9";
  return "#F59E0B";
}

function scoreLabel(score) {
  if (score >= 8.5) return "Excelente";
  if (score >= 7.5) return "Muy bueno";
  if (score >= 6.5) return "Bueno";
  return "Regular";
}

// ─── SCORE RING ───────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 110 }) {
  const [animated, setAnimated] = useState(false);
  const r = 44;
  const circ = 2 * Math.PI * r;
  const color = scoreColor(score);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.ringWrap} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className={styles.ringsvg}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7"/>
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={animated ? circ * (1 - score / 10) : circ}
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className={styles.ringCenter}>
        <span className={styles.ringScore} style={{ color }}>{score}</span>
        <span className={styles.ringDen}>/10</span>
        <span className={styles.ringLabel} style={{ color }}>{scoreLabel(score)}</span>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function HeroSection({ city, overallScore, insights }) {
  const navigate = useNavigate();
  const moodTags = getMoodTags(city);
  const color = scoreColor(overallScore);

  return (
    <section className={styles.hero}>
      {/* ── Background ── */}
      <div className={styles.heroBg}>
        <img src={city.heroImg || city.img} alt={city.name} className={styles.heroBgImg} />
        <div className={styles.heroBgGradient} />
      </div>

      {/* ── Content ── */}
      <div className={styles.heroInner}>

        {/* LEFT */}
        <div className={styles.heroLeft}>
          <div className={styles.heroBreadcrumb}>
            <span>{city.emoji}</span>
            <span>{city.country}</span>
            <span className={styles.heroBreadSep}>·</span>
            <span>{city.region}</span>
          </div>

          <h1 className={styles.heroTitle}>{city.name}</h1>

          <p className={styles.heroTagline}>
            {insights?.tagline || city.phrase}
          </p>

          <div className={styles.heroMoodTags}>
            {moodTags.map((tag, i) => (
              <span key={i} className={styles.heroMoodTag}>
                <span>{tag.icon}</span>
                <span>{tag.label}</span>
              </span>
            ))}
          </div>

          <div className={styles.heroActions}>
            <button
              className={styles.heroCta}
              onClick={() => document.getElementById("insights")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver análisis completo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className={styles.heroSecondary} onClick={() => navigate("/")}>
              ← Explorar más ciudades
            </button>
          </div>
        </div>

        {/* RIGHT — glass card */}
        <div className={styles.heroCard}>
          <div className={styles.heroCardTop}>
            <div>
              <p className={styles.heroCardCity}>{city.name}</p>
              <p className={styles.heroCardTag}>{city.tag}</p>
            </div>
            <span className={styles.heroCardFlag}>{city.emoji}</span>
          </div>

          <ScoreRing score={overallScore} />

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatIcon}>💶</span>
              <div>
                <p className={styles.heroStatVal}>{city.costDetail}</p>
                <p className={styles.heroStatKey}>presupuesto/mes</p>
              </div>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatIcon}>🎓</span>
              <div>
                <p className={styles.heroStatVal}>{city.students}</p>
                <p className={styles.heroStatKey}>estudiantes</p>
              </div>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatIcon}>🌍</span>
              <div>
                <p className={styles.heroStatVal}>{city.erasmus}/100</p>
                <p className={styles.heroStatKey}>índice Erasmus</p>
              </div>
            </div>
          </div>

          <button
            className={styles.heroCardCta}
            style={{ "--cta-color": color }}
            onClick={() => document.getElementById("insights")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explorar guía completa →
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className={styles.heroScrollHint}>
        <div className={styles.heroScrollLine} />
        <span>Desliza para explorar</span>
      </div>
    </section>
  );
}
