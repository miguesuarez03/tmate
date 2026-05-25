import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCityBySlug, CITIES } from "../data/cities";
import { getCityInsights } from "../data/insights";
import { NavbarCity, Footer, SectionLabel } from "../components/Layout";
import ScoreCard, { ProgressBar } from "../components/ScoreCard";

const EXP_META = {
  erasmus:       { label: "Erasmus+",           color: "#0EA5E9", icon: "🎓" },
  internship:    { label: "Erasmus Prácticas",  color: "#8B5CF6", icon: "💼" },
  "work-travel": { label: "Erasmus Prácticas",  color: "#14B8A6", icon: "💼" },
  volunteering:  { label: "Voluntariado EU",    color: "#22C55E", icon: "🤝" },
};

const PRICE_STYLE = {
  "€":    { bg: "#22C55E15", border: "#22C55E30", text: "#16A34A", label: "Muy económico" },
  "€€":   { bg: "#0EA5E915", border: "#0EA5E930", text: "#0284C7", label: "Moderado" },
  "€€€":  { bg: "#F59E0B15", border: "#F59E0B30", text: "#D97706", label: "Caro" },
  "€€€€": { bg: "#EF444415", border: "#EF444430", text: "#DC2626", label: "Muy caro" },
};

const TABS = [
  { id: "overview",      label: "📋 Resumen" },
  { id: "insights",      label: "📊 City Scores" },
  { id: "vivir",         label: "🏘️ Dónde vivir" },
  { id: "universidades", label: "🏛️ Universidades" },
  { id: "movilidad",     label: "🚌 Movilidad" },
  { id: "clima",         label: "☀️ Clima" },
  { id: "tips",          label: "💡 Tips insider" },
];

// ─── STICKY SCORE BAR ─────────────────────────────────────────────────────────
function StickyScoreBar({ scores, city }) {
  const [visible, setVisible] = useState(false);
  const overall = (scores.reduce((a, b) => a + b.score, 0) / scores.length).toFixed(1);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-score-bar${visible ? " sticky-score-bar--visible" : ""}`}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span className="sticky-score-bar__city">{city.name}</span>
        <span style={{ fontSize: 13, color: "var(--color-muted)" }}>{city.emoji} {city.country}</span>
      </div>
      <div className="sticky-score-bar__right">
        <div className="sticky-score-bar__scores">
          {scores.slice(0, 5).map((s) => (
            <div key={s.id} style={{ textAlign: "center" }}>
              <span style={{ fontSize: 14, fontFamily: "var(--font-display)", fontWeight: 800, color: s.color, display: "block" }}>{s.score}</span>
              <span style={{ fontSize: 12 }}>{s.icon}</span>
            </div>
          ))}
        </div>
        <div className="sticky-score-bar__overall">{overall} / 10</div>
      </div>
    </div>
  );
}

// ─── CITY HERO ────────────────────────────────────────────────────────────────
function CityHero({ city, insights, overall }) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(insights.heroImg || city.img);

  return (
    <section className="city-hero" style={{ background: "#1a2744" }}>
      <img
        className={`city-hero__img${loaded ? " city-hero__img--loaded" : ""}`}
        src={imgSrc}
        alt={city.name}
        onLoad={() => setLoaded(true)}
        onError={() => { if (imgSrc !== city.img) setImgSrc(city.img); }}
        style={{ transform: loaded ? "scale(1)" : "scale(1.04)", opacity: loaded ? 1 : 0.3, transition: "transform 1.2s ease, opacity 0.5s ease" }}
      />
      <div className="city-hero__overlay-right" />
      <div className="city-hero__overlay-bottom" />

      <button className="back-btn" onClick={() => navigate("/")}>← Todos los destinos</button>

      <div className="city-hero__content">
        <div className="city-hero__badges">
          {city.experiences?.map((exp) => {
            const e = EXP_META[exp];
            if (!e) return null;
            return <span key={exp} className="city-hero__badge">{e.icon} {e.label}</span>;
          })}
          <span className="city-hero__badge">{city.tag}</span>
        </div>
        <h1 className="city-hero__title">{city.name}</h1>
        <p className="city-hero__location">{city.emoji}&nbsp;&nbsp;{city.country} · {city.region}</p>
        <div className="city-hero__meta">
          {[{ icon: "💶", label: city.costDetail }, { icon: "🌡️", label: city.weather }, { icon: "🗣️", label: city.language }].map((m) => (
            <div key={m.label} className="city-hero__meta-pill"><span>{m.icon}</span><span>{m.label}</span></div>
          ))}
        </div>
      </div>

      <div className="city-hero__score-badge">
        <span className="city-hero__score-label">Puntuación global</span>
        <span className="city-hero__score-val">{overall}</span>
        <span className="city-hero__score-sub">de 10 puntos</span>
        <div className="city-hero__dots">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="city-hero__dot" style={{ background: i < Math.round(overall) ? "#14B8A6" : "rgba(255,255,255,0.2)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function OverviewTab({ city, insights, overall }) {
  return (
    <div className="overview-layout">
      <div>
        <h2 className="content-section__title" style={{ marginBottom: 14 }}>Por qué {city.name}</h2>
        <p style={{ fontSize: 16, color: "var(--color-slate)", lineHeight: 1.75, marginBottom: 32 }}>{city.description}</p>

        {/* Phrase highlight */}
        <div style={{ padding: "18px 22px", background: "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(20,184,166,0.08))", borderLeft: "3px solid var(--color-teal)", borderRadius: "0 14px 14px 0", marginBottom: 32 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--color-dark)", fontStyle: "italic" }}>"{city.phrase}"</p>
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Lo mejor de {city.name}</h3>
        <div className="highlights-grid" style={{ marginBottom: 32 }}>
          {city.highlights?.map((h, i) => (
            <div key={i} className="highlight-item">
              <span className="highlight-item__star">✦</span>
              <span className="highlight-item__text">{h}</span>
            </div>
          ))}
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Programas disponibles</h3>
        <div className="exp-badges">
          {city.experiences?.map((exp) => {
            const e = EXP_META[exp];
            if (!e) return null;
            return (
              <div key={exp} className="exp-badge" style={{ background: `${e.color}12`, borderColor: `${e.color}30` }}>
                <span className="exp-badge__icon">{e.icon}</span>
                <span className="exp-badge__label" style={{ color: e.color }}>{e.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="sidebar">
        <div className="info-card">
          <h4 className="info-card__title">Datos clave</h4>
          {[
            { icon: "💶", key: "Presupuesto", val: city.costDetail },
            { icon: "🌤️", key: "Clima",       val: city.weather },
            { icon: "🗣️", key: "Idioma",      val: city.language },
            { icon: "🎓", key: "Estudiantes", val: city.students },
            { icon: "📍", key: "Región",       val: city.region },
          ].map((item) => (
            <div key={item.key} className="info-card__row">
              <span className="info-card__key"><span>{item.icon}</span>{item.key}</span>
              <span className="info-card__val">{item.val}</span>
            </div>
          ))}
        </div>

        <div className="budget-card">
          <span className="budget-card__label">Presupuesto mensual</span>
          <span className="budget-card__amount">{city.costDetail}</span>
          <p className="budget-card__note">Con beca Erasmus puede reducirse a la mitad.</p>
        </div>

        {/* Overall score visual */}
        <div style={{ background: "#fff", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: 22, textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-muted)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Puntuación global TMate</p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 900, background: "var(--gradient-brand)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: 8 }}>{overall}</p>
          <p style={{ fontSize: 13, color: "var(--color-muted)" }}>sobre 10 puntos</p>
        </div>
      </div>
    </div>
  );
}

// ─── INSIGHTS ─────────────────────────────────────────────────────────────────
function InsightsTab({ city, insights, overall }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
        <div>
          <SectionLabel>City Insight Dashboard</SectionLabel>
          <h2 className="content-section__title">Cómo es vivir en {city.name}</h2>
        </div>
      </div>

      {insights.atmosphere && (
        <div className="atmosphere-quote"><p className="atmosphere-quote__text">{insights.atmosphere}</p></div>
      )}

      <div className="score-legend">
        {[{ label: "Excelente", color: "#22C55E", range: "8.5–10" }, { label: "Bueno", color: "#0EA5E9", range: "7–8.4" }, { label: "Regular", color: "#F59E0B", range: "5.5–6.9" }, { label: "Difícil", color: "#EF4444", range: "<5.5" }].map((l) => (
          <div key={l.label} className="score-legend__item">
            <div className="score-legend__dot" style={{ background: l.color }} />
            {l.label} <span style={{ color: "var(--color-border)" }}>({l.range})</span>
          </div>
        ))}
        <span className="score-legend__hint">← Click para ver el desglose</span>
      </div>

      <div className="scores-grid">
        {insights.scores.map((item, i) => <ScoreCard key={item.id} item={item} index={i} />)}
      </div>
    </div>
  );
}

// ─── VIVIR ────────────────────────────────────────────────────────────────────
function VivirTab({ city }) {
  if (!city.neighborhoods?.length) return <p style={{ color: "var(--color-muted)" }}>Próximamente.</p>;
  return (
    <div>
      <div className="content-section__header">
        <h2 className="content-section__title">Dónde vivir en {city.name}</h2>
        <p className="content-section__subtitle">Los barrios más populares entre estudiantes internacionales.</p>
      </div>
      <div className="hood-grid">
        {city.neighborhoods.map((n, i) => {
          const ps = PRICE_STYLE[n.price] || PRICE_STYLE["€€"];
          return (
            <div key={i} className="hood-card">
              <div className="hood-card__icon">🏘️</div>
              <h3 className="hood-card__name">{n.name}</h3>
              <p className="hood-card__vibe">{n.vibe}</p>
              <span className="hood-card__price" style={{ background: ps.bg, borderColor: ps.border, color: ps.text }}>
                {n.price} · {ps.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Alojamiento tips */}
      <div style={{ marginTop: 32, padding: "20px 24px", background: "linear-gradient(135deg, rgba(14,165,233,0.07), rgba(20,184,166,0.07))", borderRadius: "var(--radius-lg)", border: "1px solid rgba(14,165,233,0.15)" }}>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--color-dark)", marginBottom: 10 }}>💡 Cómo buscar piso</h4>
        <p style={{ fontSize: 13, color: "var(--color-slate-light)", lineHeight: 1.65 }}>
          Idealista, Uniplaces y los grupos de Facebook de tu universidad son los mejores recursos. Empieza a buscar 2–3 meses antes de llegar. Los WG (pisos compartidos) son la opción más asequible y la mejor para conocer gente.
        </p>
      </div>
    </div>
  );
}

// ─── UNIVERSIDADES ────────────────────────────────────────────────────────────
function UniversidadesTab({ city }) {
  return (
    <div>
      <div className="content-section__header">
        <h2 className="content-section__title">Universidades en {city.name}</h2>
        <p className="content-section__subtitle">Centros con convenios Erasmus y programas para estudiantes internacionales.</p>
      </div>
      {city.universities?.map((u, i) => (
        <div key={i} className="uni-item">
          <div className="uni-item__icon">🏛️</div>
          <div>
            <p className="uni-item__name">{u}</p>
            <p className="uni-item__sub">{city.name} · {city.country} · Convenios Erasmus disponibles</p>
          </div>
          <span className="uni-item__link">Ver info →</span>
        </div>
      ))}
    </div>
  );
}

// ─── MOVILIDAD ────────────────────────────────────────────────────────────────
function MovilidadTab({ city, insights }) {
  const movScore = insights.scores.find((s) => s.id === "transporte");
  return (
    <div>
      <div className="content-section__header">
        <h2 className="content-section__title">Moverse por {city.name}</h2>
        <p className="content-section__subtitle">Todo lo que necesitas saber sobre el transporte y la movilidad.</p>
      </div>

      {movScore && (
        <div style={{ marginBottom: 28 }}>
          <ScoreCard item={movScore} index={0} />
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {[
          { icon: "🚇", title: "Metro & Bus", desc: "Transporte público eficiente. Consulta el pase mensual local para ahorrar." },
          { icon: "🚲", title: "Bicicleta", desc: "Muchas ciudades europeas tienen excelente infraestructura para ciclistas." },
          { icon: "🚶", title: "A pie", desc: "Los centros históricos son muy caminables. Lo mejor para explorarlo todo." },
        ].map((item) => (
          <div key={item.title} style={{ padding: "20px 18px", background: "#fff", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
            <span style={{ fontSize: 36, display: "block", marginBottom: 10 }}>{item.icon}</span>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--color-dark)", marginBottom: 6 }}>{item.title}</h4>
            <p style={{ fontSize: 12, color: "var(--color-slate-light)", lineHeight: 1.55 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <h4 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 14, color: "var(--color-dark)" }}>Tips de transporte</h4>
        <div className="tips-grid">
          {city.tips?.slice(0, 3).map((tip, i) => (
            <div key={i} className="tip-item">
              <div className="tip-item__num">{i + 1}</div>
              <p className="tip-item__text">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CLIMA ────────────────────────────────────────────────────────────────────
function ClimaTab({ city, insights }) {
  const climaScore = insights.scores.find((s) => s.id === "clima");
  const seasons = [
    { name: "Primavera", months: "Mar–May", icon: "🌸", desc: "La mejor época para llegar. Temperaturas suaves y días largos." },
    { name: "Verano", months: "Jun–Ago", icon: "☀️", desc: "Calor, festivales y la ciudad al 100%. Muchos estudiantes de intercambio." },
    { name: "Otoño", months: "Sep–Nov", icon: "🍂", desc: "El semestre Erasmus arranca. Ambiente estudiantil máximo." },
    { name: "Invierno", months: "Dic–Feb", icon: "❄️", desc: "Frío pero con ambiente navideño y mercados. Vida interior intensa." },
  ];

  return (
    <div>
      <div className="content-section__header">
        <h2 className="content-section__title">El clima en {city.name}</h2>
        <p className="content-section__subtitle">Qué esperar del tiempo en cada época del año.</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, padding: "16px 20px", background: "var(--color-surface)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
        <span style={{ fontSize: 36 }}>🌡️</span>
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "var(--color-dark)" }}>{city.weather}</p>
          <p style={{ fontSize: 13, color: "var(--color-muted)" }}>Tipo de clima predominante</p>
        </div>
        {climaScore && (
          <div style={{ marginLeft: "auto", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 900, color: "#F59E0B", lineHeight: 1 }}>{climaScore.score}</p>
            <p style={{ fontSize: 11, color: "var(--color-muted)" }}>Score clima</p>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, marginBottom: 24 }}>
        {seasons.map((s) => (
          <div key={s.name} style={{ padding: "18px 20px", background: "#fff", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>{s.icon}</span>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--color-dark)", marginBottom: 2 }}>{s.name} <span style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--color-muted)", fontWeight: 400 }}>{s.months}</span></p>
              <p style={{ fontSize: 12, color: "var(--color-slate-light)", lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TIPS ─────────────────────────────────────────────────────────────────────
function TipsTab({ city }) {
  return (
    <div>
      <div className="content-section__header">
        <h2 className="content-section__title">Tips insider para {city.name}</h2>
        <p className="content-section__subtitle">Lo que nadie te cuenta pero todos los que vivieron allí saben.</p>
      </div>
      <div className="tips-grid">
        {city.tips?.map((tip, i) => (
          <div key={i} className="tip-item">
            <div className="tip-item__num">{i + 1}</div>
            <p className="tip-item__text">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CITY DETAIL PAGE ─────────────────────────────────────────────────────────
export default function CityDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const city = getCityBySlug(slug);
  const insights = getCityInsights(slug, city);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!city) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: "var(--font-body)" }}>
        <p style={{ fontSize: 64 }}>🗺️</p>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--color-dark)" }}>Ciudad no encontrada</h2>
        <button className="btn-primary" onClick={() => navigate("/")}>← Volver al inicio</button>
      </div>
    );
  }

  const overall = (insights.scores.reduce((a, b) => a + b.score, 0) / insights.scores.length).toFixed(1);
  const related = CITIES.filter((c) => c.country === city.country && c.slug !== city.slug).slice(0, 3);

  const scrollToTab = (tabId) => {
    setActiveTab(tabId);
    const el = document.getElementById(`tab-${tabId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <StickyScoreBar scores={insights.scores} city={city} />
      <NavbarCity cityName={city.name} overall={overall} />

      <CityHero city={city} insights={insights} overall={overall} />

      {/* Tab nav */}
      <div className="tab-nav">
        <div className="tab-nav__inner">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-nav__btn${activeTab === tab.id ? " tab-nav__btn--active" : ""}`}
              onClick={() => scrollToTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>

        <div id="tab-overview" className="content-section">
          <OverviewTab city={city} insights={insights} overall={overall} />
        </div>

        <div id="tab-insights" className="content-section" style={{ paddingTop: 0, borderTop: "1px solid var(--color-border)" }}>
          <InsightsTab city={city} insights={insights} overall={overall} />
        </div>

        <div id="tab-vivir" className="content-section" style={{ paddingTop: 0, borderTop: "1px solid var(--color-border)" }}>
          <VivirTab city={city} />
        </div>

        <div id="tab-universidades" className="content-section" style={{ paddingTop: 0, borderTop: "1px solid var(--color-border)" }}>
          <UniversidadesTab city={city} />
        </div>

        <div id="tab-movilidad" className="content-section" style={{ paddingTop: 0, borderTop: "1px solid var(--color-border)" }}>
          <MovilidadTab city={city} insights={insights} />
        </div>

        <div id="tab-clima" className="content-section" style={{ paddingTop: 0, borderTop: "1px solid var(--color-border)" }}>
          <ClimaTab city={city} insights={insights} />
        </div>

        <div id="tab-tips" className="content-section" style={{ paddingTop: 0, borderTop: "1px solid var(--color-border)" }}>
          <TipsTab city={city} />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", padding: "clamp(48px,7vw,72px) var(--section-px)" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "var(--color-dark)" }}>También en {city.country}</h3>
              <button className="btn-ghost" style={{ background: "transparent", border: "1.5px solid var(--color-border)", color: "var(--color-slate)" }} onClick={() => navigate("/")}>Ver todos los destinos →</button>
            </div>
            <div className="related-grid" style={{ gridTemplateColumns: `repeat(${Math.min(related.length, 3)}, 1fr)` }}>
              {related.map((c) => (
                <div key={c.slug} className="related-card" onClick={() => navigate(`/city/${c.slug}`)}>
                  <img className="related-card__img" src={c.img} alt={c.name} loading="lazy" />
                  <div className="related-card__overlay" />
                  <div className="related-card__content">
                    <div>
                      <p className="related-card__name">{c.name}</p>
                      <p className="related-card__vibe">{c.phrase}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA strip */}
      <div className="cta-strip">
        <h3 className="cta-strip__title">¿{city.name} te convence?</h3>
        <p className="cta-strip__sub">Encuentra programas, pisos y compañeros de aventura.</p>
        <div className="cta__buttons">
          <button className="btn-primary">Explorar programas en {city.name}</button>
          <button className="btn-ghost" onClick={() => navigate("/")}>Ver otros destinos</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
