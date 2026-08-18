import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.css";
import { getCityWhatsappGroup } from "../../data/cityWhatsappGroups";
import { isErasmusEligible, getScoreLevel } from "../../lib/cities";
import { IconUniversidad, IconFiesta, IconBeca, IconSol, IconBici, IconSeguridad, IconComida, IconArte, IconLaptop, IconPlaya, IconFuego } from "../icons";
import ScoreRing from "../ScoreRing";

// ─── MOOD TAGS CONFIG ─────────────────────────────────────────────────────────
const MOOD_ICONS = {
  erasmus: { Icon: IconUniversidad, label: "Top Erasmus" },
  fiesta:  { Icon: IconFiesta, label: "Gran vida social" },
  barato:  { Icon: IconBeca, label: "Asequible" },
  sol:     { Icon: IconSol, label: "Mucho sol" },
  bici:    { Icon: IconBici, label: "Ciclable" },
  seguro:  { Icon: IconSeguridad, label: "Segura" },
  foodie:  { Icon: IconComida, label: "Gastronómica" },
  arte:    { Icon: IconArte, label: "Cultural" },
  tech:    { Icon: IconLaptop, label: "Tech & startups" },
  playa:   { Icon: IconPlaya, label: "Cerca del mar" },
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

// ─── MAIN ─────────────────────────────────────────────────────────────────────
// ─── BURBUJAS FLOTANTES (WhatsApp / alojamiento) ───────────────────────────
// Las mismas dos tarjetas del hero, en formato burbuja fija abajo a la
// derecha, visibles solo después de hacer scroll (el hero ya las muestra
// enteras). Si hay grupo de WhatsApp real, la burbuja abre ese enlace
// igual que la tarjeta; si no (o en el caso de alojamiento, que todavía no
// tiene destino real), pulsar hace scroll suave hasta la tarjeta
// correspondiente del hero en vez de no hacer nada — sigue "llevando" a
// donde se explica el "Próximamente", listo para apuntar a la URL real en
// cuanto exista sin tener que tocar este componente otra vez.
function scrollToCard(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function FloatingActionBubbles({ city, whatsappGroup }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`${styles.floatingActions}${visible ? ` ${styles.floatingActionsVisible}` : ""}`}>
      {whatsappGroup ? (
        <a
          href={whatsappGroup}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.floatingBubble}
          style={{ "--bubble-color": "#25D366" }}
          aria-label={`Grupo de WhatsApp de ${city.name}`}
          title="Grupo de WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.6 6.32A8.78 8.78 0 0 0 12.06 4a8.94 8.94 0 0 0-7.74 13.4L3 21l3.7-1.28a8.85 8.85 0 0 0 5.36 1.83h.01a8.94 8.94 0 0 0 7.7-13.4 8.84 8.84 0 0 0-2.17-1.83Zm-5.54 13.7h-.01a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.81.97.94-2.74-.18-.28a7.43 7.43 0 0 1 11.51-9.22 7.31 7.31 0 0 1 2.17 5.21 7.43 7.43 0 0 1-7.57 7.26Zm4.07-5.57c-.22-.11-1.31-.65-1.51-.72-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.86-.13.15-.26.16-.48.05a6.1 6.1 0 0 1-1.8-1.11 6.7 6.7 0 0 1-1.24-1.54c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.07-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38h-.43c-.15 0-.39.05-.6.28-.2.22-.78.77-.78 1.86s.8 2.16.91 2.31c.11.15 1.57 2.4 3.81 3.36.53.23.95.36 1.27.47.53.17 1.02.14 1.4.09.43-.06 1.31-.53 1.49-1.05.18-.51.18-.95.13-1.05-.05-.1-.2-.16-.42-.27Z"/>
          </svg>
        </a>
      ) : (
        <button
          type="button"
          className={styles.floatingBubble}
          style={{ "--bubble-color": "#25D366" }}
          onClick={() => scrollToCard("hero-whatsapp-card")}
          aria-label="Grupo de WhatsApp — próximamente"
          title="Grupo de WhatsApp — próximamente"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.6 6.32A8.78 8.78 0 0 0 12.06 4a8.94 8.94 0 0 0-7.74 13.4L3 21l3.7-1.28a8.85 8.85 0 0 0 5.36 1.83h.01a8.94 8.94 0 0 0 7.7-13.4 8.84 8.84 0 0 0-2.17-1.83Zm-5.54 13.7h-.01a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.81.97.94-2.74-.18-.28a7.43 7.43 0 0 1 11.51-9.22 7.31 7.31 0 0 1 2.17 5.21 7.43 7.43 0 0 1-7.57 7.26Zm4.07-5.57c-.22-.11-1.31-.65-1.51-.72-.2-.07-.35-.11-.5.11-.15.22-.57.72-.7.86-.13.15-.26.16-.48.05a6.1 6.1 0 0 1-1.8-1.11 6.7 6.7 0 0 1-1.24-1.54c-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.07-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38h-.43c-.15 0-.39.05-.6.28-.2.22-.78.77-.78 1.86s.8 2.16.91 2.31c.11.15 1.57 2.4 3.81 3.36.53.23.95.36 1.27.47.53.17 1.02.14 1.4.09.43-.06 1.31-.53 1.49-1.05.18-.51.18-.95.13-1.05-.05-.1-.2-.16-.42-.27Z"/>
          </svg>
          <span className={styles.floatingBubbleDot} />
        </button>
      )}

      <button
        type="button"
        className={styles.floatingBubble}
        style={{ "--bubble-color": "#3F7A7D" }}
        onClick={() => scrollToCard("hero-housing-card")}
        aria-label="Búsqueda de alojamiento — próximamente"
        title="Búsqueda de alojamiento — próximamente"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>
        </svg>
        <span className={styles.floatingBubbleDot} />
      </button>
    </div>
  );
}

export default function HeroSection({ city, overallScore, insights }) {
  const navigate = useNavigate();
  const moodTags = getMoodTags(city);
  const color = getScoreLevel(overallScore).color;
  const whatsappGroup = getCityWhatsappGroup(city.slug);
  const erasmusEligible = isErasmusEligible(city);

  return (
    <>
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

          <p className={erasmusEligible ? styles.heroProgramBadgeOk : styles.heroProgramBadgeWarn}>
            {erasmusEligible
              ? "✅ Destino Erasmus+ · Beca disponible"
              : "🌍 Intercambio internacional (no Erasmus) · Financiación propia / convenio bilateral"}
          </p>

          <p className={styles.heroTagline}>
            {insights?.tagline || city.phrase}
          </p>

          <div className={styles.heroMoodTags}>
            {moodTags.map((tag, i) => (
              <span key={i} className={styles.heroMoodTag}>
                <span style={{ display: "inline-flex" }}><tag.Icon size={18} /></span>
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

          <div className={styles.heroBigLinks} id="hero-quick-links">
            {whatsappGroup ? (
              <a
                id="hero-whatsapp-card"
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
              <div id="hero-whatsapp-card" className={styles.heroBigLink} style={{ "--big-color": "#25D366" }}>
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

            <div id="hero-housing-card" className={styles.heroBigLink} style={{ "--big-color": "#3F7A7D" }}>
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
              <p className={styles.heroCardTag} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                {city.tag === "Trending" && <IconFuego size={14} />} {city.tag}
              </p>
            </div>
            <span className={styles.heroCardFlag}>{city.emoji}</span>
          </div>

          <ScoreRing score={overallScore} />

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatIcon}><IconBeca size={22} /></span>
              <div>
                <p className={styles.heroStatVal}>{city.costDetail}</p>
                <p className={styles.heroStatKey}>presupuesto/mes</p>
              </div>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatIcon}><IconUniversidad size={22} /></span>
              <div>
                <p className={styles.heroStatVal}>{city.erasmusStudents}</p>
                <p className={styles.heroStatKey}>{erasmusEligible ? "estudiantes Erasmus/año" : "estudiantes de intercambio/año"}</p>
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

    <FloatingActionBubbles city={city} whatsappGroup={whatsappGroup} />
    </>
  );
}
