import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Globe2, PartyPopper, Coins, Sun, Bike, ShieldCheck, UtensilsCrossed, Palette, Laptop2, Waves, Euro } from "lucide-react";
import styles from "./HeroSection.module.css";
import { getCityWhatsappGroup } from "../../data/cityWhatsappGroups";

// ─── MOOD TAGS CONFIG ─────────────────────────────────────────────────────────
const MOOD_ICONS = {
  erasmus: { icon: Globe2, label: "Top Erasmus" },
  fiesta:  { icon: PartyPopper, label: "Gran vida social" },
  barato:  { icon: Coins, label: "Asequible" },
  sol:     { icon: Sun, label: "Mucho sol" },
  bici:    { icon: Bike, label: "Ciclable" },
  seguro:  { icon: ShieldCheck, label: "Segura" },
  foodie:  { icon: UtensilsCrossed, label: "Gastronómica" },
  arte:    { icon: Palette, label: "Cultural" },
  tech:    { icon: Laptop2, label: "Tech & startups" },
  playa:   { icon: Waves, label: "Cerca del mar" },
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
  if (score >= 9)   return "#22C55E";
  if (score >= 8)   return "#00BFA5";
  if (score >= 6)   return "#0EA5E9";
  if (score >= 5)   return "#F59E0B";
  return "#EF4444";
}

function scoreLabel(score) {
  if (score >= 9)   return "Excelente";
  if (score >= 8)   return "Muy bueno";
  if (score >= 6)   return "Bueno";
  if (score >= 5)   return "Aceptable";
  if (score >= 3)   return "Malo";
  return "Muy malo";
}

// ─── SCORE RING ───────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 96 }) {
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
  const whatsappGroup = getCityWhatsappGroup(city.slug);

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
                <tag.icon size={14} strokeWidth={1.75} />
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

          <div className={styles.heroBigLinks}>
            {whatsappGroup ? (
              <a
                href={whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroBigLink}
                style={{ "--big-color": "#25D366" }}
              >
                <span className={styles.heroBigLinkIcon}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.6 6.32A8.78 8.78 0 0 0 12.06 4a8.94 8.94 0 0 0-7.74 13.4L3 21l3.7-1.28a8.85 8.85 0 0 0 5.36 1.83h.01a8.94 8.94 0 0 0 7.7-13.4 8.84 8.84 0 0 0-2.17-1.83Zm-5.54 13.7h-.01a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.81.97.94-2.74-.18-.28a7.43 7.43 0 0 1 11.51-9.22 7.31 7.31 0 0 1 2.17 5.21 7.43 7.43 0 0 1-7.57 7.26Zm4.07-5.57c-.22-.11-1.31-.65-1.51-.72-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.86-.13.15-.26.16-.48.05a6.1 6.1 0 0 1-1.8-1.11 6.7 6.7 0 0 1-1.24-1.54c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.07-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38h-.43c-.15 0-.39.05-.6.28-.2.22-.78.77-.78 1.86s.8 2.16.91 2.31c.11.15 1.57 2.4 3.81 3.36.53.23.95.36 1.27.47.53.17 1.02.14 1.4.09.43-.06 1.31-.53 1.49-1.05.18-.51.18-.95.13-1.05-.05-.1-.2-.16-.42-.27Z"/>
                  </svg>
                </span>
                <span className={styles.heroBigLinkText}>
                  <span className={styles.heroBigLinkTitle}>Grupo de WhatsApp</span>
                  <span className={styles.heroBigLinkSub}>Erasmus en {city.name} — únete ahora</span>
                </span>
                <span className={styles.heroBigLinkArrow}>→</span>
              </a>
            ) : (
              <div className={styles.heroBigLink} style={{ "--big-color": "#25D366" }}>
                <span className={styles.heroBigLinkIcon}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.6 6.32A8.78 8.78 0 0 0 12.06 4a8.94 8.94 0 0 0-7.74 13.4L3 21l3.7-1.28a8.85 8.85 0 0 0 5.36 1.83h.01a8.94 8.94 0 0 0 7.7-13.4 8.84 8.84 0 0 0-2.17-1.83Zm-5.54 13.7h-.01a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.81.97.94-2.74-.18-.28a7.43 7.43 0 0 1 11.51-9.22 7.31 7.31 0 0 1 2.17 5.21 7.43 7.43 0 0 1-7.57 7.26Zm4.07-5.57c-.22-.11-1.31-.65-1.51-.72-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.86-.13.15-.26.16-.48.05a6.1 6.1 0 0 1-1.8-1.11 6.7 6.7 0 0 1-1.24-1.54c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.07-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38h-.43c-.15 0-.39.05-.6.28-.2.22-.78.77-.78 1.86s.8 2.16.91 2.31c.11.15 1.57 2.4 3.81 3.36.53.23.95.36 1.27.47.53.17 1.02.14 1.4.09.43-.06 1.31-.53 1.49-1.05.18-.51.18-.95.13-1.05-.05-.1-.2-.16-.42-.27Z"/>
                  </svg>
                </span>
                <span className={styles.heroBigLinkText}>
                  <span className={styles.heroBigLinkTitle}>Grupo de WhatsApp</span>
                  <span className={styles.heroBigLinkSub}>Próximamente — estamos creando el grupo de {city.name}</span>
                </span>
                <span className={styles.heroBigLinkBadge}>Pronto</span>
              </div>
            )}

            <div className={styles.heroBigLink} style={{ "--big-color": "#0EA5E9" }}>
              <span className={styles.heroBigLinkIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>
                </svg>
              </span>
              <span className={styles.heroBigLinkText}>
                <span className={styles.heroBigLinkTitle}>Búsqueda de alojamiento</span>
                <span className={styles.heroBigLinkSub}>Próximamente — pisos y residencias en {city.name}</span>
              </span>
              <span className={styles.heroBigLinkBadge}>Pronto</span>
            </div>
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
              <span className={styles.heroStatIcon}><Euro size={20} strokeWidth={1.75} /></span>
              <div>
                <p className={styles.heroStatVal}>{city.costDetail}</p>
                <p className={styles.heroStatKey}>presupuesto/mes</p>
              </div>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatIcon}><Globe2 size={20} strokeWidth={1.75} /></span>
              <div>
                <p className={styles.heroStatVal}>{city.erasmusStudents}</p>
                <p className={styles.heroStatKey}>estudiantes Erasmus/año</p>
              </div>
            </div>
          </div>

          <button
            className={styles.heroCardCta}
            style={{ "--cta-color": color }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Estás en la guía ↑
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
