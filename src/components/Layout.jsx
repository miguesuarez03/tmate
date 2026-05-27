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

const MENU_ITEMS = [
  {
    icon: "🗺️",
    label: "Explorar destinos",
    desc: "Todas las ciudades Erasmus con scores y guías",
    action: "explore",
  },
  {
    icon: "⚖️",
    label: "Comparativa de favoritos",
    desc: "Compara tus ciudades favoritas lado a lado",
    action: "compare",
  },
  {
    icon: "📋",
    label: "Erasmus en 5 pasos",
    desc: "Todo el proceso explicado paso a paso",
    action: "steps",
  },
  {
    icon: "⭐",
    label: "Cuéntanos tu experiencia",
    desc: "Comparte tu Erasmus y ayuda a otros estudiantes",
    action: "share",
  },
];

export function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change or scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isDark = transparent && !scrolled && !menuOpen;
  const linkColor = isDark ? "rgba(255,255,255,0.82)" : "var(--color-slate)";

  const handleMenuAction = (action) => {
    setMenuOpen(false);
    setTimeout(() => {
      if (action === "explore") {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(".section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else if (action === "compare") {
        navigate("/comparar");
      } else if (action === "steps") {
        navigate("/proceso");
      } else if (action === "share") {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(".exp-form-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }, 50);
  };

  return (
    <>
      <nav className={`navbar ${scrolled || !transparent || menuOpen ? "navbar--scrolled" : ""}`}>
        <Logo dark={!isDark} onClick={() => { setMenuOpen(false); navigate("/"); }} />

        <button
          className={`navbar__hamburger${menuOpen ? " navbar__hamburger--open" : ""}`}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span style={{ background: isDark ? "#fff" : "var(--color-dark)" }} />
          <span style={{ background: isDark ? "#fff" : "var(--color-dark)" }} />
          <span style={{ background: isDark ? "#fff" : "var(--color-dark)" }} />
        </button>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`nav-drawer${menuOpen ? " nav-drawer--open" : ""}`}>
        <div className="nav-drawer__header">
          <span className="nav-drawer__title">Menú</span>
          <button className="nav-drawer__close" onClick={() => setMenuOpen(false)} aria-label="Cerrar">✕</button>
        </div>

        <nav className="nav-drawer__items">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.action}
              className="nav-drawer__item"
              onClick={() => handleMenuAction(item.action)}
            >
              <span className="nav-drawer__item-icon">{item.icon}</span>
              <div className="nav-drawer__item-text">
                <span className="nav-drawer__item-label">{item.label}</span>
                <span className="nav-drawer__item-desc">{item.desc}</span>
              </div>
              <span className="nav-drawer__item-arrow">›</span>
            </button>
          ))}
        </nav>


      </div>
    </>
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
