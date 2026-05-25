import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logo({ dark = false, onClick }) {
  return (
    <div className="navbar__logo" onClick={onClick} role="button" tabIndex={0} aria-label="Ir al inicio">
      <div className="navbar__logo-icon">🌍</div>
      <span className="navbar__logo-text" style={{ color: dark ? "var(--color-dark)" : "#fff" }}>
        TMate
      </span>
    </div>
  );
}

export function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = transparent && !scrolled;
  const linkColor = isDark ? "rgba(255,255,255,0.82)" : "var(--color-slate)";

  return (
    <nav className={`navbar ${scrolled || !transparent ? "navbar--scrolled" : ""}`}>
      {/* Logo always goes home */}
      <Logo dark={!isDark} onClick={() => navigate("/")} />

      <div className="navbar__links">
        {["Explorar", "Experiencias", "Comunidad"].map((item) => (
          <button key={item} className="navbar__link" style={{ color: linkColor }}>{item}</button>
        ))}
        <button className="navbar__cta">Registro gratis</button>
      </div>

      <button className="navbar__hamburger" aria-label="Menu">
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ background: isDark ? "#fff" : "var(--color-dark)" }} />
        ))}
      </button>
    </nav>
  );
}

// Navbar for city pages — always white, logo always goes home
export function NavbarCity({ cityName, overall }) {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar--scrolled" style={{ position: "fixed", zIndex: 1000 }}>
      <Logo dark onClick={() => navigate("/")} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontFamily: "var(--font-body)", color: "var(--color-muted)" }}>
        <span style={{ cursor: "pointer", color: "var(--color-primary)" }} onClick={() => navigate("/")}>Inicio</span>
        <span>›</span>
        <span style={{ color: "var(--color-dark)", fontWeight: 600 }}>{cityName}</span>
      </div>
      {overall && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--gradient-brand)", borderRadius: "var(--radius-full)", padding: "6px 18px" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{overall}</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>/ 10</span>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <Logo dark={false} onClick={() => navigate("/")} />
      <p className="footer__copy">© 2025 TMate · Hecho para ciudadanos globales</p>
    </footer>
  );
}

export function SectionLabel({ children, color }) {
  return <span className="section-label" style={color ? { color } : {}}>{children}</span>;
}
