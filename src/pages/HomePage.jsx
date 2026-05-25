import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CITIES } from "../data/cities";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import SearchBar from "../components/SearchBar";
import CityCard from "../components/CityCard";

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
    <>
      <span style={{ color: "#fff" }}>{adj} </span>
      <span className="hero__animated-word" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}>
        {current.word}
      </span>
    </>
  );
}

function HowCard({ item, index }) {
  return (
    <div style={{
      background: "#fff",
      border: "1.5px solid var(--color-border)",
      borderRadius: "var(--radius-xl)",
      padding: "28px 24px",
      position: "relative",
      transition: "all 0.3s var(--ease-spring)",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(14,165,233,0.12)"; e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = ""; }}
    >
      {/* Step number */}
      <span style={{
        position: "absolute", top: 20, right: 20,
        fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 800,
        color: "var(--color-border)", letterSpacing: 1,
      }}>{item.step}</span>

      <span style={{ fontSize: 38, display: "block", marginBottom: 16 }}>{item.icon}</span>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800, color: "var(--color-dark)", marginBottom: 8, lineHeight: 1.2 }}>{item.title}</h3>
      <p style={{ fontSize: 13, color: "var(--color-slate-light)", lineHeight: 1.65 }}>{item.desc}</p>

      {/* Connector line — not on last */}
      {index < 3 && (
        <div style={{
          display: "none", // hidden on mobile, shown desktop via CSS
        }} className="step-connector" />
      )}
    </div>
  );
}

export default function HomePage() {
  const [filter, setFilter] = useState("Todos");
  const navigate = useNavigate();

  const regions = ["Todos", ...Array.from(new Set(CITIES.map((c) => c.region)))];
  const filtered = filter === "Todos" ? CITIES : CITIES.filter((c) => c.region === filter);

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
            Descubre tu <AnimatedWord />
          </h1>

          <p className="hero__subtitle fade-up-3">
            Todo lo que necesitas saber para elegir tu ciudad Erasmus. Scores reales, opiniones de estudiantes y guías locales.
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

      {/* CITIES */}
      <section className="section" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="section__header">
          <div>
            <SectionLabel>Destinos Erasmus</SectionLabel>
            <h2 className="section__title">Ciudades que te cambian.</h2>
          </div>
          <span className="section__count">{filtered.length} ciudades</span>
        </div>
        <div className="filters">
          {regions.map((r) => (
            <button key={r} className={`filter-pill${filter === r ? " filter-pill--active" : ""}`} onClick={() => setFilter(r)}>
              {r}
            </button>
          ))}
        </div>
        <div className="cities-grid">
          {filtered.map((city) => <CityCard key={city.slug} city={city} />)}
        </div>
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

          {/* Bottom note */}
          <div style={{
            marginTop: 32, padding: "16px 24px",
            background: "linear-gradient(135deg, rgba(14,165,233,0.07), rgba(20,184,166,0.07))",
            border: "1px solid rgba(14,165,233,0.15)",
            borderRadius: "var(--radius-lg)",
            display: "flex", alignItems: "center", gap: 16,
            flexWrap: "wrap",
          }}>
            <span style={{ fontSize: 28 }}>💡</span>
            <p style={{ fontSize: 14, color: "var(--color-slate)", lineHeight: 1.6, flex: 1 }}>
              <strong>¿Cuánto cuesta?</strong> El Erasmus no es gratis, pero la beca cubre gran parte. Pagas tu universidad de origen (no la de destino) y recibes entre 250–500€/mes de la UE según el país al que vayas.
            </p>
          </div>
        </div>
      </section>

      {/* CTA — buttons lead to cities section */}
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
