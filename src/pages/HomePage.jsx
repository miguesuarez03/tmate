import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CITIES } from "../data/cities";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import SearchBar from "../components/SearchBar";
import CityCard from "../components/CityCard";
import { useCityFilter } from "../hooks/useCityFilter";
import { useSEO } from "../hooks/useSEO";

// WorldMap arrastra react-simple-maps + d3 (pesado). Se carga bajo demanda
// para no engordar el bundle inicial — el globo está más abajo en la página,
// así que no afecta a lo primero que ve el usuario.
const WorldMap = lazy(() => import("../components/WorldMap"));

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



const TRENDING = ["Bolonia", "Lisboa", "Berlín", "Praga", "Viena"];

const TESTIMONIALS = [
  {
    name: "Lucía M.",
    city: "Bolonia",
    flag: "🇮🇹",
    text: "TMate me ayudó a elegir Bolonia sin dudarlo. Los scores de vida nocturna y coste de vida fueron exactamente lo que necesitaba para convencer a mis padres.",
    avatar: "L",
    color: "#E0F2FE",
    stars: 5,
    photo: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
  },
  {
    name: "Andrés P.",
    city: "Berlín",
    flag: "🇩🇪",
    text: "Llevaba semanas dudando entre Berlín y Múnich. Con la comparativa de scores lo vi clarísimo. Elegí Berlín y no me arrepiento.",
    avatar: "A",
    color: "#D1FAE5",
    stars: 5,
    photo: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=600&q=80",
  },
  {
    name: "Sara K.",
    city: "Lisboa",
    flag: "🇵🇹",
    text: "La guía de barrios de Lisboa es increíble. Encontré piso en Mouraria gracias a los consejos. Nadie más me dio esa info tan específica y honesta.",
    avatar: "S",
    color: "#FEF3C7",
    stars: 5,
    photo: "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=600&q=80",
  },
  {
    name: "Anónimo",
    city: "Praga",
    flag: "🇨🇿",
    text: "Nunca había viajado solo. TMate me dio la confianza de saber exactamente a qué iba. La sección de transporte y tips locales es oro puro.",
    avatar: "?",
    color: "#F3E8FF",
    stars: 4,
    photo: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=600&q=80",
  },
  {
    name: "Marta V.",
    city: "Budapest",
    flag: "🇭🇺",
    text: "Budapest fue una sorpresa enorme. Con 400€ al mes viví como una reina. La comunidad Erasmus allí es brutal.",
    avatar: "M",
    color: "#FCE7F3",
    stars: 5,
    photo: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&q=80",
  },
  {
    name: "Carlos R.",
    city: "Ámsterdam",
    flag: "🇳🇱",
    text: "Caro pero vale cada euro. La ciudad te cambia la perspectiva de todo. Volví siendo otra persona.",
    avatar: "C",
    color: "#DCFCE7",
    stars: 4,
    photo: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80",
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
  return (
    <Suspense fallback={<div style={{ minHeight: 560 }} aria-hidden="true" />}>
      <WorldMap />
    </Suspense>
  );
}

const FAQS = [
  {
    q: "¿Es gratis usar TMate?",
    a: "Sí, completamente gratis. Puedes explorar todos los destinos, comparar ciudades y usar el generador de Learning Agreement sin pagar nada.",
  },
  {
    q: "¿Qué es el Learning Agreement y para qué sirve?",
    a: "Es el documento académico que recoge las asignaturas que cursarás en el extranjero y cómo se reconocerán en tu universidad de origen. Sin él, tu plaza Erasmus no queda confirmada. En TMate puedes generarlo paso a paso.",
  },
  {
    q: "¿Cuántas ciudades tenéis?",
    a: "Actualmente contamos con 20 destinos Erasmus con datos reales: scores de vida nocturna, coste de vida, transporte, seguridad y mucho más. Seguimos añadiendo ciudades.",
  },
  {
    q: "¿Cómo funcionan los scores de las ciudades?",
    a: "Cada ciudad tiene puntuaciones del 1 al 10 en categorías clave: coste de vida, vida nocturna, transporte, clima, idioma y ambiente universitario. Son datos reales combinados con experiencias de estudiantes.",
  },
  {
    q: "¿Puedo comparar varias ciudades a la vez?",
    a: "Sí. El comparador de TMate te permite poner varias ciudades lado a lado y ver todas sus métricas de golpe. Es la forma más rápida de decidirte.",
  },
  {
    q: "¿Por dónde empiezo si acabo de confirmar mi plaza?",
    a: "Lo primero es explorar tu destino para saber qué esperar. Después, tramita el Learning Agreement cuanto antes — es lo más urgente y lo que más se suele dejar para el final.",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="faq-header">
          <SectionLabel color="var(--color-primary)">Preguntas frecuentes</SectionLabel>
          <h2 className="section__title">Todo lo que necesitas saber.</h2>
          <p className="faq-subtitle">
            Las dudas más habituales antes de empezar tu Erasmus, resueltas.
          </p>
        </div>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`faq-item${openIdx === i ? " faq-item--open" : ""}`}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <div className="faq-item__question">
                <span>{item.q}</span>
                <span className="faq-item__icon">{openIdx === i ? "−" : "+"}</span>
              </div>
              {openIdx === i && (
                <div className="faq-item__answer">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="star-rating">
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          type="button"
          className={`star-rating__star ${n <= (hovered || value) ? "star-rating__star--active" : ""}`}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          aria-label={`${n} estrellas`}
        >
          ★
        </button>
      ))}
      {value > 0 && (
        <span className="star-rating__label">
          {["","Regular","Bien","Muy bien","Genial","¡Imprescindible!"][value]}
        </span>
      )}
    </div>
  );
}

function TestimonialCard({ t, onClick, compact }) {
  return (
    <button
      type="button"
      className={`community-card${compact ? " community-card--compact" : ""}`}
      onClick={onClick}
    >
      <div className="community-card__img">
        <img src={t.photo} alt={t.city} loading="lazy" />
        <div className="community-card__img-overlay" />
        <div className="community-card__city-badge">
          <span>{t.flag}</span>
          <span>{t.city}</span>
        </div>
        <div className="community-card__stars">
          {[1,2,3,4,5].map(n => (
            <span key={n} className={n <= t.stars ? "star--on" : "star--off"}>★</span>
          ))}
        </div>
      </div>
      <div className="community-card__body">
        <div className="community-card__author">
          <div className="community-card__avatar" style={{ background: t.color }}>
            {t.avatar}
          </div>
          <div>
            <p className="community-card__name">{t.name}</p>
            <p className="community-card__meta">{t.flag} Erasmus en {t.city}</p>
          </div>
          <span className="community-card__quote">"</span>
        </div>
        <p className="community-card__text community-card__text--clamp">{t.text}</p>
      </div>
    </button>
  );
}

function AllTestimonialsModal({ onClose, onSelect }) {
  const [cityFilter, setCityFilter] = useState("Todas");
  const [starFilter, setStarFilter] = useState(0);

  const cities = ["Todas", ...Array.from(new Set(TESTIMONIALS.map(t => t.city)))];

  const filtered = TESTIMONIALS.filter(t => {
    const cityOk = cityFilter === "Todas" || t.city === cityFilter;
    const starOk = starFilter === 0 || t.stars >= starFilter;
    return cityOk && starOk;
  });

  return (
    <div className="all-testimonials-overlay" onClick={onClose}>
      <div className="all-testimonials-modal" onClick={e => e.stopPropagation()}>
        <div className="all-testimonials-modal__header">
          <h3>Todas las opiniones</h3>
          <button type="button" className="all-testimonials-modal__close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <div className="all-testimonials-modal__filters">
          <div className="at-filter-group">
            <span className="at-filter-group__label">Destino</span>
            <div className="at-filter-pills">
              {cities.map(c => (
                <button
                  key={c}
                  type="button"
                  className={`at-filter-pill${cityFilter === c ? " at-filter-pill--active" : ""}`}
                  onClick={() => setCityFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="at-filter-group">
            <span className="at-filter-group__label">Estrellas</span>
            <div className="at-filter-pills">
              {[0,5,4,3].map(s => (
                <button
                  key={s}
                  type="button"
                  className={`at-filter-pill${starFilter === s ? " at-filter-pill--active" : ""}`}
                  onClick={() => setStarFilter(s)}
                >
                  {s === 0 ? "Todas" : `${s}★ y más`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="all-testimonials-modal__count">
          {filtered.length} {filtered.length === 1 ? "opinión" : "opiniones"}
        </div>

        <div className="all-testimonials-modal__grid">
          {filtered.length === 0 ? (
            <p className="all-testimonials-modal__empty">No hay opiniones con estos filtros.</p>
          ) : (
            filtered.map((t, i) => (
              <TestimonialCard key={i} t={t} onClick={() => onSelect(t)} compact />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CommunitySection() {
  const [formData, setFormData] = useState({ name: "", anon: false, city: "", text: "", stars: 0, photo: null });
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const fileRef = useRef(null);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
    setFormData(p => ({ ...p, photo: file }));
  };

  const handleSubmit = () => {
    if (!formData.city || !formData.text.trim() || !formData.stars) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setPhotoPreview(null); }, 4000);
    setFormData({ name: "", anon: false, city: "", text: "", stars: 0, photo: null });
  };

  return (
    <section className="community-section">
      {/* Header */}
      <div className="community-header">
        <SectionLabel color="var(--color-teal)">Comunidad TMate</SectionLabel>
        <h2 className="section__title" style={{ marginBottom: 14 }}>Erasmus que inspiran.</h2>
        <p style={{ fontSize: "clamp(15px,2vw,17px)", color: "var(--color-slate-light)", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
          Historias reales de estudiantes. Cada tarjeta mezcla su opinión con sus propias fotos del viaje.
        </p>
      </div>

      {/* Línea horizontal de tarjetas + acceso a ver todas */}
      <div className="community-cards-row">
        {TESTIMONIALS.slice(0, 5).map((t, i) => (
          <TestimonialCard key={i} t={t} onClick={() => setActiveTestimonial(t)} />
        ))}
      </div>
      <div className="community-cards-more">
        <button type="button" className="community-cards-more__btn" onClick={() => setShowAllModal(true)}>
          Ver más opiniones →
        </button>
      </div>

      {/* Modal con todas las opiniones + filtros */}
      {showAllModal && (
        <AllTestimonialsModal
          onClose={() => setShowAllModal(false)}
          onSelect={(t) => { setShowAllModal(false); setActiveTestimonial(t); }}
        />
      )}

      {/* Modal de testimonio completo */}
      {activeTestimonial && (
        <div className="testimonial-modal-overlay" onClick={() => setActiveTestimonial(null)}>
          <div className="testimonial-modal" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="testimonial-modal__close"
              onClick={() => setActiveTestimonial(null)}
              aria-label="Cerrar"
            >
              ✕
            </button>
            <div className="testimonial-modal__img">
              <img src={activeTestimonial.photo} alt={activeTestimonial.city} />
              <div className="community-card__img-overlay" />
              <div className="community-card__city-badge">
                <span>{activeTestimonial.flag}</span>
                <span>{activeTestimonial.city}</span>
              </div>
            </div>
            <div className="testimonial-modal__body">
              <div className="community-card__stars" style={{ position: "static", marginBottom: 10 }}>
                {[1,2,3,4,5].map(n => (
                  <span key={n} className={n <= activeTestimonial.stars ? "star--on" : "star--off"}>★</span>
                ))}
              </div>
              <div className="community-card__author" style={{ marginBottom: 16 }}>
                <div className="community-card__avatar" style={{ background: activeTestimonial.color }}>
                  {activeTestimonial.avatar}
                </div>
                <div>
                  <p className="community-card__name">{activeTestimonial.name}</p>
                  <p className="community-card__meta">{activeTestimonial.flag} Erasmus en {activeTestimonial.city}</p>
                </div>
              </div>
              <p className="testimonial-modal__text">{activeTestimonial.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Social links */}
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
              <p className="exp-form-subtitle">Tu historia y tus fotos pueden ayudar a miles de estudiantes.</p>
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
              {/* Paso 1: Destino */}
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

              {/* Paso 2: Estrellas */}
              <div className="exp-form__field">
                <label className="exp-form__label">¿Cómo fue tu experiencia? *</label>
                <StarRating value={formData.stars} onChange={stars => setFormData(p => ({ ...p, stars }))} />
              </div>

              {/* Paso 3: Nombre */}
              <div className="exp-form__row">
                <div className="exp-form__field">
                  <label className="exp-form__label">Tu nombre (opcional)</label>
                  <input className="exp-form__input" placeholder="Nombre o alias"
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

              {/* Paso 4: Texto */}
              <div className="exp-form__field">
                <label className="exp-form__label">Tu experiencia *</label>
                <textarea className="exp-form__textarea"
                  placeholder="¿Qué te cambió? ¿Qué consejo le darías a alguien que va a tu ciudad? Sé honesto/a."
                  rows={5}
                  value={formData.text}
                  onChange={e => setFormData(p => ({ ...p, text: e.target.value }))} />
                <span className="exp-form__char">{formData.text.length}/600 caracteres</span>
              </div>

              {/* Paso 5: Foto */}
              <div className="exp-form__field">
                <label className="exp-form__label">Sube una foto tuya del Erasmus (opcional)</label>
                <div className="photo-upload" onClick={() => fileRef.current?.click()}>
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="photo-upload__preview" />
                  ) : (
                    <div className="photo-upload__placeholder">
                      <span style={{ fontSize: 28 }}>📷</span>
                      <span>Haz clic para subir una foto</span>
                      <span className="photo-upload__hint">JPG, PNG — máx. 5MB</span>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
                {photoPreview && (
                  <button className="photo-upload__remove" onClick={() => { setPhotoPreview(null); setFormData(p => ({ ...p, photo: null })); }}>
                    ✕ Quitar foto
                  </button>
                )}
              </div>

              <button className="exp-form__btn"
                onClick={handleSubmit}
                disabled={!formData.city || !formData.text.trim() || !formData.stars}>
                Compartir experiencia →
              </button>
              {!formData.stars && formData.city && (
                <p style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 8, textAlign: "center" }}>
                  Selecciona una puntuación para continuar
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // "Mostrar más" también vive en la URL (?ver=todo): si entras a una ciudad
  // y vuelves atrás, sigues viendo la lista expandida tal y como la dejaste,
  // en vez de que se colapse de vuelta a las 8 primeras.
  const showAll = searchParams.get("ver") === "todo";
  const setShowAll = (next) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const value = typeof next === "function" ? next(showAll) : next;
      if (value) params.set("ver", "todo");
      else params.delete("ver");
      return params;
    }, { replace: true });
  };

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

  const INITIAL_COUNT = 6;
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
            <span className="section__count">{totalCount} ciudad{totalCount !== 1 ? 'es' : ''}</span>
          </div>
        </div>
        <div className="filters">
          {regions.map((r) => (
            <button key={r} className={`filter-pill${(region || 'Todos') === r ? " filter-pill--active" : ""}`}
              onClick={() => { setRegion(r === 'Todos' ? null : r); setShowAll(false); }}>
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

      {/* COMMUNITY */}
      <CommunitySection />

      {/* FAQ */}
      <FAQSection />

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
