import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { CITIES } from "../data/cities";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import SearchBar from "../components/SearchBar";
import CityCard from "../components/CityCard";
import { useCityFilter } from "../hooks/useCityFilter";
import { useSEO } from "../hooks/useSEO";

const Globe3D = lazy(() => import("../components/Globe3D"));

const HERO_WORDS = [
  { word: "Erasmus.", gender: "m" },
  { word: "ciudad.", gender: "f" },
  { word: "aventura.", gender: "f" },
  { word: "futuro.", gender: "m" },
  { word: "capítulo.", gender: "m" },
];

const STATS = [
  { val: "20", label: "Destinos" },
  { val: "2,4M", label: "Erasmus/año" },
  { val: "98%", label: "Satisfacción" },
  { val: "Gratis", label: "Siempre" },
];

const HOW_IT_WORKS = [
  { step: "01", icon: "🏫", title: "Tu universidad te nomina", desc: "Habla con tu oficina internacional. Cada uni tiene plazas Erasmus en universidades de toda Europa." },
  { step: "02", icon: "🌍", title: "Eliges tu destino", desc: "Seleccionas entre los destinos con convenio. Aquí es donde TMate te ayuda a elegir bien." },
  { step: "03", icon: "💶", title: "Recibes la beca", desc: "La UE te paga entre 250€ y 500€/mes según el país. Más lo que aporte tu universidad." },
  { step: "04", icon: "✈️", title: "Te vas entre 3 y 12 meses", desc: "Estudias en el extranjero, las notas cuentan en tu universidad de origen. Sin perder el curso." },
];

const TRENDING = ["Bolonia", "Lisboa", "Berlín", "Praga", "Viena"];

const TESTIMONIALS = [
  {
    name: "Lucía M.",
    city: "Bolonia",
    flag: "🇮🇹",
    text: "TMate me ayudó a elegir Bolonia sin dudarlo. Los scores de vida nocturna y coste de vida fueron exactamente lo que necesitaba para convencer a mis padres.",
    avatar: "L",
    color: "#E0F2FE",
  },
  {
    name: "Andrés P.",
    city: "Berlín",
    flag: "🇩🇪",
    text: "Llevaba semanas dudando entre Berlín y Múnich. Con la comparativa de scores lo vi clarísimo: Berlín ganaba en vibes, Múnich en calidad de vida. Elegí Berlín y no me arrepiento.",
    avatar: "A",
    color: "#D1FAE5",
  },
  {
    name: "Sara K.",
    city: "Lisboa",
    flag: "🇵🇹",
    text: "La guía de barrios de Lisboa es increíble. Encontré piso en Mouraria gracias a los consejos. Nadie más me dio esa info tan específica y honesta.",
    avatar: "S",
    color: "#FEF3C7",
  },
  {
    name: "Anónimo",
    city: "Praga",
    flag: "🇨🇿",
    text: "Nunca había viajado solo. TMate me dio la confianza de saber exactamente a qué iba. La sección de transporte y tips locales es oro puro.",
    avatar: "?",
    color: "#F3E8FF",
  },
];



function AnimatedWord() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx((i) => (i + 1) % HERO_WORDS.length); setVisible(true); }, 320);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_WORDS[idx];
  const adj = current.gender === "m" ? "próximo" : "próxima";

  return (
    <span className="hero__title-line2">
      <span style={{ color: "#fff" }}>{adj} </span>
      <span className="hero__animated-word" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}>
        {current.word}
      </span>
    </span>
  );
}

function HowCard({ item, index }) {
  return (
    <div className="how-card"
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(14,165,233,0.12)"; e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = ""; }}
    >
      <span className="how-card__step">{item.step}</span>
      <span style={{ fontSize: 38, display: "block", marginBottom: 16 }}>{item.icon}</span>
      <h3 className="how-card__title">{item.title}</h3>
      <p className="how-card__desc">{item.desc}</p>
    </div>
  );
}

const CITY_PILLS = [
  { name: "Bolonia",   code: "BOL", flag: "🇮🇹", slug: "bolonia"   },
  { name: "Berlín",    code: "BER", flag: "🇩🇪", slug: "berlin"    },
  { name: "Lisboa",    code: "LIS", flag: "🇵🇹", slug: "lisboa"    },
  { name: "Praga",     code: "PRG", flag: "🇨🇿", slug: "praga"     },
  { name: "Ámsterdam", code: "AMS", flag: "🇳🇱", slug: "amsterdam" },
  { name: "Viena",     code: "VIE", flag: "🇦🇹", slug: "viena"     },
  { name: "Budapest",  code: "BUD", flag: "🇭🇺", slug: "budapest"  },
  { name: "París",     code: "PAR", flag: "🇫🇷", slug: "paris"     },
];

function GlobeSection() {
  const navigate = useNavigate();

  return (
    <section className="globe-section">
      <div className="globe-section__inner">

        {/* Text side */}
        <div className="globe-section__text">
          <SectionLabel color="var(--color-teal)">Mapa Erasmus</SectionLabel>
          <h2 className="section__title" style={{ color: "#fff", marginBottom: 16 }}>
            Europa te espera.
          </h2>
          <p style={{
            fontSize: "clamp(15px,2vw,17px)",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7, marginBottom: 32, maxWidth: 400,
          }}>
            20 ciudades Erasmus con datos reales. Gira el globo y haz clic en cualquier marcador para explorar.
          </p>
          <div className="globe-city-list">
            {CITY_PILLS.map(c => (
              <button key={c.name} className="globe-city-pill"
                onClick={() => navigate(`/city/${c.slug}`)}>
                <span>{c.flag}</span>
                <span>{c.name}</span>
                <span className="globe-city-pill__code">{c.code}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Globe 3D */}
        <div className="globe-wrap">
          <Suspense fallback={
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.3)", fontSize: 14, fontFamily: "DM Sans, sans-serif",
            }}>
              Cargando globo...
            </div>
          }>
            <Globe3D />
          </Suspense>
        </div>

      </div>
    </section>
  );
}

function CommunitySection() {
  const [formData, setFormData] = useState({ name: "", anon: false, city: "", text: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!formData.city || !formData.text.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", anon: false, city: "", text: "" });
  };

  return (
    <section className="community-section">
      {/* Header */}
      <div className="community-header">
        <SectionLabel color="var(--color-teal)">Comunidad TMate</SectionLabel>
        <h2 className="section__title" style={{ marginBottom: 14 }}>Erasmus que inspiran.</h2>
        <p style={{ fontSize: "clamp(15px,2vw,17px)", color: "var(--color-slate-light)", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
          Historias reales de estudiantes que eligieron bien su destino. Y ahora comparten lo que aprendieron.
        </p>
      </div>

      {/* Testimonials grid */}
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="testimonial-card" style={{ "--t-color": t.color }}>
            <div className="testimonial-card__top">
              <div className="testimonial-avatar" style={{ background: t.color, color: "#0F172A" }}>
                {t.avatar}
              </div>
              <div>
                <p className="testimonial-name">{t.anon ? "Anónimo" : t.name}</p>
                <p className="testimonial-city">{t.flag} {t.city}</p>
              </div>
              <span className="testimonial-quote-icon">"</span>
            </div>
            <p className="testimonial-text">{t.text}</p>
          </div>
        ))}
      </div>

      {/* Photo gallery placeholder */}
      <div className="community-gallery">
        <p className="community-gallery__label">📸 Momentos Erasmus</p>
        <div className="gallery-grid">
          {[
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
            "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=400&q=80",
            "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=400&q=80",
            "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80",
          ].map((src, i) => (
            <div key={i} className="gallery-item">
              <img src={src} alt={`Erasmus moment ${i + 1}`} loading="lazy" />
              <div className="gallery-item__overlay" />
            </div>
          ))}
        </div>
      </div>

      {/* Social links placeholder */}
      <div className="social-placeholder">
        <p className="social-placeholder__label">Síguenos — Próximamente</p>
        <div className="social-icons">
          {[
            { icon: "📸", label: "Instagram", handle: "@tmate_erasmus" },
            { icon: "🎵", label: "TikTok", handle: "@tmate" },
            { icon: "💬", label: "Discord", handle: "TMate Community" },
          ].map(s => (
            <div key={s.label} className="social-icon-card">
              <span style={{ fontSize: 28 }}>{s.icon}</span>
              <span className="social-icon-card__label">{s.label}</span>
              <span className="social-icon-card__handle">{s.handle}</span>
              <span className="social-icon-card__badge">Próximamente</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience form */}
      <div className="exp-form-section">
        <div className="exp-form-card">
          <div className="exp-form-header">
            <span style={{ fontSize: 36 }}>✍️</span>
            <div>
              <h3 className="exp-form-title">Cuéntanos tu experiencia</h3>
              <p className="exp-form-subtitle">Tu historia puede ayudar a miles de estudiantes a elegir mejor.</p>
            </div>
          </div>

          {submitted ? (
            <div className="exp-form-success">
              <span style={{ fontSize: 40 }}>🎉</span>
              <p style={{ fontWeight: 700, fontSize: 18, color: "var(--color-dark)" }}>¡Gracias por compartir!</p>
              <p style={{ color: "var(--color-slate-light)", fontSize: 14 }}>Tu experiencia estará disponible pronto en la comunidad.</p>
            </div>
          ) : (
            <div className="exp-form">
              <div className="exp-form__row">
                <div className="exp-form__field">
                  <label className="exp-form__label">Nombre (opcional)</label>
                  <input className="exp-form__input" placeholder="Tu nombre o alias"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="exp-form__field exp-form__field--checkbox">
                  <label className="exp-form__checkbox-label">
                    <input type="checkbox" checked={formData.anon}
                      onChange={e => setFormData(p => ({ ...p, anon: e.target.checked }))} />
                    <span>Publicar en anonimato</span>
                  </label>
                </div>
              </div>

              <div className="exp-form__field">
                <label className="exp-form__label">Ciudad Erasmus *</label>
                <select className="exp-form__input exp-form__select"
                  value={formData.city}
                  onChange={e => setFormData(p => ({ ...p, city: e.target.value }))}>
                  <option value="">Selecciona tu ciudad</option>
                  {CITIES.map(c => (
                    <option key={c.slug} value={c.name}>{c.emoji} {c.name} — {c.country}</option>
                  ))}
                </select>
              </div>

              <div className="exp-form__field">
                <label className="exp-form__label">Tu experiencia *</label>
                <textarea className="exp-form__textarea"
                  placeholder="¿Qué te cambió? ¿Qué consejo le darías a alguien que va a tu ciudad? Sé honesto/a."
                  rows={5}
                  value={formData.text}
                  onChange={e => setFormData(p => ({ ...p, text: e.target.value }))} />
                <span className="exp-form__char">{formData.text.length}/600 caracteres</span>
              </div>

              <button className="exp-form__btn"
                onClick={handleSubmit}
                disabled={!formData.city || !formData.text.trim()}>
                Compartir experiencia →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // Hook de filtros dinámico — preparado para filtros avanzados futuros
  const {
    region, setRegion,
    cities: filtered,
    regions,
    totalCount,
    hasActiveFilters,
    resetFilters,
  } = useCityFilter({ initialSort: 'erasmus' });

  // SEO dinámico
  useSEO({ isHome: true });

  const INITIAL_COUNT = 8;
  const displayedCities = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <div>
      <Navbar transparent />

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__img" />
        <div className="hero__orb" style={{ top: "14%", left: "7%", width: 320, height: 320, background: "radial-gradient(circle, rgba(14,165,233,0.22) 0%, transparent 70%)" }} />
        <div className="hero__orb" style={{ bottom: "18%", right: "4%", width: 260, height: 260, background: "radial-gradient(circle, rgba(20,184,166,0.2) 0%, transparent 70%)", animationDelay: "2s" }} />

        <div className="hero__content">
          <div className="hero__badge fade-up-1">
            <span className="hero__badge-dot" />
            <span className="hero__badge-text">La guía definitiva para tu Erasmus</span>
          </div>

          <h1 className="hero__title fade-up-2">
            <span className="hero__title-line1">Descubre tu</span>
            <AnimatedWord />
          </h1>

          <p className="hero__subtitle fade-up-3">
            Todo lo que necesitas para elegir tu ciudad Erasmus. Scores reales, opiniones de estudiantes y guías locales.
          </p>

          <div className="fade-up-4" style={{ width: "100%", display: "flex", justifyContent: "center", position: "relative", zIndex: 10 }}>
            <SearchBar />
          </div>

          <div className="hero__trending fade-up-5">
            <span className="hero__trending-label">Trending:</span>
            {TRENDING.map((name) => {
              const city = CITIES.find((c) => c.name === name);
              return (
                <button key={name} className="hero__trending-pill" onClick={() => city && navigate(`/city/${city.slug}`)}>
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="hero__stats">
          {STATS.map((s) => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-val">{s.val}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBE */}
      <GlobeSection />

      {/* CITIES */}
      <section className="section" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="section__header">
          <div>
            <SectionLabel>Destinos Erasmus</SectionLabel>
            <h2 className="section__title">Ciudades que te cambian.</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {hasActiveFilters && (
              <button onClick={() => { resetFilters(); setShowAll(false); }}
                style={{ fontSize: 12, color: "var(--color-muted)", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}>
                Limpiar filtros
              </button>
            )}
            <span className="section__count">{totalCount} ciudades</span>
          </div>
        </div>
        <div className="filters">
          {regions.map((r) => (
            <button key={r} className={`filter-pill${region === r ? " filter-pill--active" : ""}`}
              onClick={() => { setRegion(r); setShowAll(false); }}>
              {r}
            </button>
          ))}
        </div>
        <div className="cities-grid">
          {displayedCities.map((city) => <CityCard key={city.slug} city={city} />)}
        </div>

        {/* Show more / Show less */}
        {filtered.length > INITIAL_COUNT && (
          <div className="show-more-wrap">
            <button className="show-more-btn" onClick={() => setShowAll(v => !v)}>
              {showAll
                ? "← Mostrar menos"
                : `Mostrar más destinos (${filtered.length - INITIAL_COUNT} restantes) →`}
            </button>
            {!showAll && (
              <p className="show-more-hint">Más ciudades en camino. ¡Volvemos pronto con nuevos destinos!</p>
            )}
          </div>
        )}
      </section>

      {/* HOW ERASMUS WORKS */}
      <section className="section" style={{ background: "linear-gradient(180deg, var(--color-surface) 0%, #fff 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel color="var(--color-primary)">¿Cómo funciona?</SectionLabel>
            <h2 className="section__title" style={{ marginBottom: 14 }}>El Erasmus en 4 pasos.</h2>
            <p style={{ fontSize: "clamp(15px,2vw,17px)", color: "var(--color-slate-light)", maxWidth: 460, margin: "0 auto", lineHeight: 1.6 }}>
              Más sencillo de lo que parece. Cada año más de 2,4 millones de estudiantes lo hacen.
            </p>
          </div>
          <div className="exp-grid">
            {HOW_IT_WORKS.map((item, i) => <HowCard key={item.step} item={item} index={i} />)}
          </div>

          <div className="how-note">
            <span style={{ fontSize: 28 }}>💡</span>
            <p style={{ fontSize: 14, color: "var(--color-slate)", lineHeight: 1.6, flex: 1 }}>
              <strong>¿Cuánto cuesta?</strong> El Erasmus no es gratis, pero la beca cubre gran parte. Pagas tu universidad de origen (no la de destino) y recibes entre 250–500€/mes de la UE según el país al que vayas.
            </p>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <CommunitySection />

      {/* CTA */}
      <section className="cta">
        <div className="cta__bg-img" />
        <div className="cta__inner">
          <h2 className="cta__title">Tu Erasmus empieza aquí.</h2>
          <p className="cta__subtitle">
            Más de 2,4 millones de estudiantes hacen Erasmus cada año. Encuentra tu ciudad perfecta.
          </p>
          <div className="cta__buttons">
            <button className="btn-primary" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              Explorar destinos
            </button>
            <a href="https://erasmus-plus.ec.europa.eu" target="_blank" rel="noopener noreferrer">
              <button className="btn-ghost">Más info sobre Erasmus+</button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
