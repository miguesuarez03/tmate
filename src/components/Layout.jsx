import { useId, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  IconExplorar,
  IconCityMatch,
  IconComparar,
  IconBeca,
  IconLearningAgreement,
  IconProceso,
  IconExperiencia,
} from "./icons";
import ThemeToggle, { ThemeToggleRow } from "./ThemeToggle";

// Símbolo MA — trazo grueso de puntas redondeadas que dibuja la M y la A de
// un solo recorrido (vertical → valle → pico → base), con el tramo derecho
// repasado en un degradado distinto para lograr el efecto bitono, y el sol
// como semicírculo apoyado en la línea base entre las dos montañas.
// El icono nunca se recolorea — mismos degradados siempre, independientemente
// del modo claro/oscuro o del fondo del navbar. Fuente: MAbroad_symbol_only.svg
export function MASymbol({ size = 28 }) {
  // Un solo símbolo puede aparecer varias veces en la misma página (navbar +
  // footer, por ejemplo) — cada instancia necesita sus propios ids de
  // degradado, o un `url(#id)` duplicado en el HTML sería inválido.
  const uid = useId();
  const leftId = `ma-left-${uid}`;
  const rightId = `ma-right-${uid}`;
  const sunId = `ma-sun-${uid}`;
  return (
    <svg viewBox="0 0 520 360" width={size} height={size * (360 / 520)} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={leftId} x1="55" y1="35" x2="190" y2="285" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#16364D" />
          <stop offset="1" stopColor="#2F5073" />
        </linearGradient>
        <linearGradient id={rightId} x1="190" y1="285" x2="325" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3F7A7D" />
          <stop offset="0.55" stopColor="#55A9B3" />
          <stop offset="1" stopColor="#A6D5DB" />
        </linearGradient>
        <linearGradient id={sunId} x1="155" y1="285" x2="225" y2="215" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F5963A" />
          <stop offset="1" stopColor="#F7CA52" />
        </linearGradient>
      </defs>
      <path
        d="M45 285 L45 45 L185 285 L325 45 L465 285"
        stroke={`url(#${leftId})`}
        strokeWidth="50"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M185 285 L325 45 L465 285"
        stroke={`url(#${rightId})`}
        strokeWidth="50"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M220 285 A65 65 0 0 1 350 285 Z" fill={`url(#${sunId})`} />
    </svg>
  );
}

export function Logo({ dark = false, onClick, iconSize = 26 }) {
  return (
    <div className="navbar__logo" onClick={onClick} role="button" tabIndex={0} aria-label="Ir al inicio">
      <div className="navbar__logo-icon">
        <MASymbol size={iconSize} />
      </div>
      <span className="navbar__logo-text" style={{ color: dark ? "var(--color-dark)" : "#fff" }}>
        Abroad
      </span>
    </div>
  );
}

// ~30% más grande que el tamaño base (26px) — solo para el header/navbar,
// el texto "Abroad" no cambia de tamaño (fuente aparte, en navbar__logo-text).
const HEADER_LOGO_ICON_SIZE = 34;

const MENU_ITEMS = [
  {
    Icon: IconExplorar,
    label: "Explorar destinos",
    desc: "Todas las ciudades Erasmus con scores y guías",
    action: "explore",
  },
  {
    Icon: IconCityMatch,
    label: "City Match",
    desc: "Responde 8 preguntas y descubre tu ciudad ideal",
    action: "match",
  },
  {
    Icon: IconComparar,
    label: "Comparativa de destinos",
    desc: "Compara tus ciudades favoritas lado a lado",
    action: "compare",
  },
  {
    Icon: IconProceso,
    label: "¿Cómo funciona el Erasmus?",
    desc: "Todo el proceso explicado sin rodeos, paso a paso",
    action: "steps",
  },
  {
    Icon: IconBeca,
    label: "Beca Erasmus+",
    desc: "Cuánto cobras, complementos y calculadora de ayudas",
    action: "beca",
  },
  {
    Icon: IconLearningAgreement,
    label: "Tu Learning Agreement",
    desc: "Cómo preparar el contrato académico y conseguir las convalidaciones",
    action: "la",
  },
  {
    Icon: IconExperiencia,
    label: "Cuéntanos tu experiencia",
    desc: "Comparte tu Erasmus y ayuda a otros estudiantes",
    action: "share",
  },
];

// Navegación horizontal (desktop/tablet-landscape, ver .navbar__links en
// global.css) — etiquetas cortas a propósito, distintas de las de
// MENU_ITEMS (que sí llevan descripción larga, para el drawer móvil). No
// incluye "Cuéntanos tu experiencia": es una acción secundaria (abre un
// modal en Home), no una sección — se queda solo en el drawer móvil.
export const NAV_LINKS = [
  { label: "Destinos", path: "/" },
  { label: "City Match", path: "/city-match" },
  { label: "Comparar", path: "/comparar" },
  { label: "Proceso", path: "/proceso" },
  { label: "Beca", path: "/beca-erasmus" },
  { label: "Learning Agreement", path: "/learning-agreement" },
];

function HorizontalNav({ isDark }) {
  const location = useLocation();
  return (
    <div className="navbar__links">
      {NAV_LINKS.map((link) => {
        const active = location.pathname === link.path;
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar__link${active ? " navbar__link--active" : ""}`}
            style={{ color: isDark ? "rgba(255,255,255,0.88)" : "var(--color-dark)" }}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

function useMenuAction(navigate, setMenuOpen) {
  return (action) => {
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
      } else if (action === "match") {
        navigate("/city-match");
      } else if (action === "steps") {
        navigate("/proceso");
      } else if (action === "beca") {
        navigate("/beca-erasmus");
      } else if (action === "la") {
        navigate("/learning-agreement");
      } else if (action === "share") {
        navigate("/?accion=compartir");
      }
    }, 50);
  };
}

function NavMenuDrawer({ menuOpen, setMenuOpen }) {
  const navigate = useNavigate();
  const handleMenuAction = useMenuAction(navigate, setMenuOpen);

  return (
    <>
      {menuOpen && (
        <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
      )}

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
              <span className={`nav-drawer__item-icon${item.Icon ? " nav-drawer__item-icon--illustrated" : ""}`}>
                {item.Icon ? <item.Icon size={36} /> : item.icon}
              </span>
              <div className="nav-drawer__item-text">
                <span className="nav-drawer__item-label">{item.label}</span>
                <span className="nav-drawer__item-desc">{item.desc}</span>
              </div>
              <span className="nav-drawer__item-arrow">›</span>
            </button>
          ))}
        </nav>

        <div className="nav-drawer__footer">
          <ThemeToggleRow />
        </div>
      </div>
    </>
  );
}

export function HamburgerButton({ menuOpen, setMenuOpen, isDark }) {
  return (
    <button
      className={`navbar__hamburger${menuOpen ? " navbar__hamburger--open" : ""}`}
      aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
      onClick={() => setMenuOpen((v) => !v)}
    >
      <span style={{ background: isDark ? "#fff" : "var(--color-dark)" }} />
      <span style={{ background: isDark ? "#fff" : "var(--color-dark)" }} />
      <span style={{ background: isDark ? "#fff" : "var(--color-dark)" }} />
    </button>
  );
}

export function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isDark = transparent && !scrolled && !menuOpen;

  // Solo en Home (transparent=true, exclusivo de HomePage): si ya se ha
  // hecho scroll, el logo actúa como "volver arriba" en vez de navegar.
  // En el resto de páginas mantiene su comportamiento normal (ir a "/").
  const handleLogoClick = () => {
    setMenuOpen(false);
    if (transparent && scrolled) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled || !transparent || menuOpen ? "navbar--scrolled" : ""}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Logo dark={!isDark} onClick={handleLogoClick} iconSize={HEADER_LOGO_ICON_SIZE} />
          <HorizontalNav isDark={isDark} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
          <button
            type="button"
            className="navbar__cta"
            onClick={() => navigate("/city-match")}
          >
            City Match
          </button>
          <ThemeToggle isDark={isDark} />
          <HamburgerButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} isDark={isDark} />
        </div>
      </nav>

      <NavMenuDrawer menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}

export function NavbarCity({ cityName, overall }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className="navbar navbar--scrolled" style={{ position: "fixed", zIndex: 1000 }}>
        <Logo dark onClick={() => navigate("/")} iconSize={HEADER_LOGO_ICON_SIZE} />
        <div className="navbar__city-breadcrumb">
          <span style={{ cursor: "pointer", color: "var(--color-primary)" }} onClick={() => navigate("/")}>Inicio</span>
          <span>›</span>
          <span style={{ color: "var(--color-dark)", fontWeight: 600 }}>{cityName}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {overall && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--gradient-brand)", borderRadius: "var(--radius-full)", padding: "6px 18px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{overall}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>/ 10</span>
            </div>
          )}
          <ThemeToggle isDark={false} />
          <HamburgerButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} isDark={false} />
        </div>
      </nav>

      <NavMenuDrawer menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <Logo dark={false} onClick={() => navigate("/")} />
      <p className="footer__copy">© 2025 MAbroad · Hecho para ciudadanos globales</p>
    </footer>
  );
}

export function SectionLabel({ children, color }) {
  return <span className="section-label" style={color ? { color } : {}}>{children}</span>;
}
