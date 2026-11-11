import { useId, useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  IconExplorar,
  IconCityMatch,
  IconComparar,
  IconBeca,
  IconLearningAgreement,
  IconProceso,
  IconExperiencia,
  IconDocumento,
} from "./icons";
import ThemeToggle, { ThemeToggleRow } from "./ThemeToggle";
import { CITY_MATCH_QUESTION_COUNT } from "../data/cityMatch";

// Símbolo MA — trazo grueso de puntas redondeadas que dibuja la M y la A de
// un solo recorrido (vertical → valle → pico → base), con el tramo derecho
// repasado en un degradado distinto para lograr el efecto bitono, y el sol
// como semicírculo apoyado en la línea base entre las dos montañas.
// El icono nunca se recolorea — mismos degradados siempre, independientemente
// del modo claro/oscuro o del fondo del navbar.
// Fuente: MAbroad_symbol_only_corrected.svg (sol desplazado a la derecha,
// bajo el segundo pico, en vez de centrado en el valle).
export function MASymbol({ size = 28, light = false }) {
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
          {/* light: variante clara del trazo izquierdo para cuando el navbar
              flota transparente sobre una foto/vídeo oscuro (el navy original
              desaparecería sobre el fondo). */}
          <stop offset="0" stopColor={light ? "#FFFFFF" : "#16364D"} />
          <stop offset="1" stopColor={light ? "#D9E8F0" : "#2F5073"} />
        </linearGradient>
        <linearGradient id={rightId} x1="190" y1="285" x2="325" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3F7A7D" />
          <stop offset="0.55" stopColor="#55A9B3" />
          <stop offset="1" stopColor="#A6D5DB" />
        </linearGradient>
        <linearGradient id={sunId} x1="275" y1="285" x2="345" y2="215" gradientUnits="userSpaceOnUse">
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
      <path d="M270 285 A65 65 0 0 1 400 285 Z" fill={`url(#${sunId})`} />
    </svg>
  );
}

/**
 * ¿Clic normal (botón principal, sin Ctrl/Cmd/Shift/Alt)? Los enlaces que
 * sustituyen la navegación por un scroll (logo en la home, «Encontrar tu
 * ciudad») solo lo hacen en ese caso: con un modificador el usuario quiere
 * abrir el enlace en otra pestaña o ventana, y eso no se intercepta.
 */
export function isPlainClick(e) {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

// Enlace real a la home (antes un <div role="button"> que no respondía a
// Enter ni se podía abrir en otra pestaña). `onClick` es opcional: el navbar
// de la home lo usa para "volver arriba" en vez de navegar.
export function Logo({ dark = false, onClick, iconSize = 26, light = false }) {
  return (
    <Link to="/" className="navbar__logo" onClick={onClick} aria-label="MAbroad, ir al inicio">
      <span className="navbar__logo-icon">
        <MASymbol size={iconSize} light={light} />
      </span>
      <span className="navbar__logo-text" style={{ color: dark ? "var(--color-dark)" : "#fff" }}>
        Abroad
      </span>
    </Link>
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
    to: "/",
  },
  {
    Icon: IconCityMatch,
    label: "City Match",
    desc: `Responde ${CITY_MATCH_QUESTION_COUNT} preguntas y descubre tu ciudad ideal`,
    action: "match",
    to: "/city-match",
  },
  {
    Icon: IconComparar,
    label: "Comparativa de destinos",
    desc: "Compara tus ciudades favoritas lado a lado",
    action: "compare",
    to: "/comparar",
  },
  {
    Icon: IconProceso,
    label: "¿Cómo funciona el Erasmus?",
    desc: "Todo el proceso explicado sin rodeos, paso a paso",
    action: "steps",
    to: "/proceso",
  },
  {
    Icon: IconBeca,
    label: "Beca Erasmus+",
    desc: "Cuánto cobras, complementos y calculadora de ayudas",
    action: "beca",
    to: "/beca-erasmus",
  },
  {
    Icon: IconLearningAgreement,
    label: "Tu Learning Agreement",
    desc: "Cómo preparar el contrato académico y conseguir las convalidaciones",
    action: "la",
    to: "/learning-agreement",
  },
  {
    Icon: IconDocumento,
    label: "Guías Erasmus",
    desc: "Beca, Learning Agreement, destino y papeles, explicados a fondo",
    action: "guias",
    to: "/guias",
  },
  {
    Icon: IconExperiencia,
    label: "Cuéntanos tu experiencia",
    desc: "Comparte tu Erasmus y ayuda a otros estudiantes",
    action: "share",
    to: "/?accion=compartir",
  },
];

// Navegación horizontal (desktop/tablet-landscape, ver .navbar__links en
// global.css) — etiquetas cortas a propósito, distintas de las de
// MENU_ITEMS (que sí llevan descripción larga, para el drawer móvil). No
// incluye "Cuéntanos tu experiencia": es una acción secundaria (abre un
// modal en Home), no una sección — en escritorio vive en el footer.
export const NAV_LINKS = [
  { label: "Destinos", path: "/" },
  { label: "City Match", path: "/city-match" },
  { label: "Comparar", path: "/comparar" },
  { label: "Proceso", path: "/proceso" },
  { label: "Beca", path: "/beca-erasmus" },
  { label: "Learning Agreement", path: "/learning-agreement" },
  { label: "Guías Erasmus", path: "/guias" },
];

/**
 * Navbar "integrado" con el fondo: mientras el usuario está arriba del todo
 * en una página con foto/vídeo de fondo (home, fichas de ciudad), la barra es
 * transparente con un degradado oscuro sutil y todo en blanco; al bajar
 * (>40px) pasa con una transición suave al estado sólido/blur de siempre.
 * `enabled` = false en el resto de páginas → siempre sólido, como hasta ahora.
 */
function useNavbarOverlay(enabled) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); // al volver atrás, la página puede abrir ya scrolleada
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return { scrolled, overlay: enabled && !scrolled };
}

function HorizontalNav() {
  const location = useLocation();
  return (
    <div className="navbar__links">
      {NAV_LINKS.map((link) => {
        // "Destinos" ("/") no se marca como activo: es la home por
        // defecto, no una sección que tenga sentido ver "seleccionada".
        // Las guías sueltas (/guias/:slug) también marcan «Guías Erasmus».
        const active = link.path !== "/" &&
          (location.pathname === link.path || location.pathname.startsWith(`${link.path}/`));
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar__link${active ? " navbar__link--active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

// Los ítems del menú son enlaces (<Link to>): la navegación la hace el propio
// enlace. Aquí solo se cierra el menú y, para "Explorar destinos", se baja a
// la rejilla de ciudades de la home una vez montada.
function useMenuAction(setMenuOpen) {
  return (action) => {
    setMenuOpen(false);
    if (action === "explore") {
      setTimeout(() => {
        document.getElementById("destinos")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };
}

const MENU_ID = "menu-principal";
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Bloquea el scroll de la página mientras `active`. Se bloquea en <html>
 * (no en <body>, que ya tiene overflow-x propio) y, si la página tenía barra
 * de scroll, se reserva su hueco (scrollbar-gutter) para que nada salte de
 * sitio al desaparecer la barra.
 */
function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    const root = document.documentElement;
    const hadScrollbar = window.innerWidth > root.clientWidth;
    const prev = { overflow: root.style.overflow, gutter: root.style.scrollbarGutter };
    root.style.overflow = "hidden";
    if (hadScrollbar) root.style.scrollbarGutter = "stable";
    return () => {
      root.style.overflow = prev.overflow;
      root.style.scrollbarGutter = prev.gutter;
    };
  }, [active]);
}

/**
 * Menú lateral (móvil y tablet). El panel y el fondo están SIEMPRE montados y
 * se animan con CSS en ambos sentidos (ver "NAV DRAWER" en global.css): antes
 * el fondo se montaba/desmontaba de golpe y el cierre era un corte seco.
 * Accesibilidad: Escape y clic fuera cierran; el foco entra al abrir, Tab no
 * sale del menú (más el botón que lo abre, que pasa a ser la ✕) y al cerrar
 * vuelve a ese botón. Cerrado, el panel es `inert`: ni foco ni lector.
 */
function NavMenuDrawer({ menuOpen, setMenuOpen, triggerRef }) {
  const handleMenuAction = useMenuAction(setMenuOpen);
  const drawerRef = useRef(null);
  useScrollLock(menuOpen);

  useEffect(() => {
    if (drawerRef.current) drawerRef.current.inert = !menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const drawer = drawerRef.current;
    const trigger = triggerRef.current;
    // El panel ya es visible (visibility cambia al instante al abrir): el foco
    // entra en el primer elemento; si aún no pudo, se reintenta al pintar.
    const focusFirst = () => drawer?.querySelector(FOCUSABLE)?.focus({ preventScroll: true });
    focusFirst();
    const frame = drawer && !drawer.contains(document.activeElement) ? requestAnimationFrame(focusFirst) : 0;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawer) return;
      const cycle = [trigger, ...drawer.querySelectorAll(FOCUSABLE)].filter(Boolean);
      const index = cycle.indexOf(document.activeElement);
      if (e.shiftKey && index <= 0) {
        e.preventDefault();
        cycle[cycle.length - 1].focus();
      } else if (!e.shiftKey && (index === -1 || index === cycle.length - 1)) {
        e.preventDefault();
        cycle[0].focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      // Al cerrar, el foco vuelve al botón del menú si estaba dentro del
      // panel (o se había perdido), nunca si el usuario ya lo movió fuera.
      const active = document.activeElement;
      if (trigger && (!active || active === document.body || drawer?.contains(active))) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, [menuOpen, setMenuOpen, triggerRef]);

  return (
    <>
      <div
        className={`nav-overlay${menuOpen ? " nav-overlay--open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        id={MENU_ID}
        className={`nav-drawer${menuOpen ? " nav-drawer--open" : ""}`}
        role="dialog"
        aria-label="Menú"
      >
        <nav className="nav-drawer__items" aria-label="Secciones">
          {MENU_ITEMS.map((item, i) => (
            <Link
              key={item.action}
              to={item.to}
              className="nav-drawer__item"
              style={{ "--i": i }}
              onClick={() => handleMenuAction(item.action)}
            >
              <span className={`nav-drawer__item-icon${item.Icon ? " nav-drawer__item-icon--illustrated" : ""}`}>
                {item.Icon ? <item.Icon size={36} /> : item.icon}
              </span>
              <span className="nav-drawer__item-text">
                <span className="nav-drawer__item-label">{item.label}</span>
                <span className="nav-drawer__item-desc">{item.desc}</span>
              </span>
              <span className="nav-drawer__item-arrow" aria-hidden="true">›</span>
            </Link>
          ))}
        </nav>

        <div className="nav-drawer__footer" style={{ "--i": MENU_ITEMS.length }}>
          <ThemeToggleRow />
        </div>
      </div>
    </>
  );
}

// mobileOnly: en iPad horizontal (1024–1199px) el navbar ya enseña los
// enlaces en horizontal y la hamburguesa se oculta (ver .navbar__hamburger--
// mobile-only en global.css); en escritorio (≥1200px) se ve, a propósito.
// NavbarCity no lo pasa: no tiene otro menú.
export function HamburgerButton({ menuOpen, setMenuOpen, isDark, buttonRef, mobileOnly = false }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`navbar__hamburger${mobileOnly ? " navbar__hamburger--mobile-only" : ""}${menuOpen ? " navbar__hamburger--open" : ""}`}
      aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={menuOpen}
      aria-controls={MENU_ID}
      onClick={() => setMenuOpen((v) => !v)}
    >
      <span style={{ background: isDark ? "#fff" : "var(--color-dark)" }} />
      <span style={{ background: isDark ? "#fff" : "var(--color-dark)" }} />
      <span style={{ background: isDark ? "#fff" : "var(--color-dark)" }} />
    </button>
  );
}

export function Navbar({ transparent = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const { scrolled, overlay: atTop } = useNavbarOverlay(transparent);
  // Con el menú abierto, barra sólida (el drawer y el overlay van debajo).
  const overlay = atTop && !menuOpen;

  // Arriba del todo en Home (transparent=true) la barra es transparente y
  // blanca sobre el vídeo; el contraste lo garantiza el degradado oscuro de
  // .navbar--overlay::before (no depende de la foto que haya debajo).
  //
  // Solo en Home (transparent=true, exclusivo de HomePage): si ya se ha
  // hecho scroll, el logo actúa como "volver arriba" en vez de navegar.
  // En el resto de páginas mantiene su comportamiento normal (ir a "/").
  const handleLogoClick = (e) => {
    setMenuOpen(false);
    if (transparent && scrolled && isPlainClick(e)) {
      e.preventDefault(); // ya estamos en la home: no se navega, se sube
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className={`navbar ${overlay ? "navbar--overlay" : "navbar--scrolled"}`}>
        <Logo dark={!overlay} light={overlay} onClick={handleLogoClick} iconSize={HEADER_LOGO_ICON_SIZE} />
        <HorizontalNav />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
          <ThemeToggle isDark={overlay} />
          <HamburgerButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} isDark={overlay} buttonRef={menuButtonRef} mobileOnly />
        </div>
      </nav>

      <NavMenuDrawer menuOpen={menuOpen} setMenuOpen={setMenuOpen} triggerRef={menuButtonRef} />
    </>
  );
}

export function NavbarCity({ cityName, overall }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  // Las fichas abren con la foto de la ciudad a pantalla completa: misma
  // barra transparente que la home mientras se está arriba del todo.
  const { overlay: atTop } = useNavbarOverlay(true);
  const overlay = atTop && !menuOpen;

  return (
    <>
      <nav className={`navbar ${overlay ? "navbar--overlay" : "navbar--scrolled"}`} style={{ position: "fixed", zIndex: 1000 }}>
        <Logo dark={!overlay} light={overlay} iconSize={HEADER_LOGO_ICON_SIZE} />
        <nav className="navbar__city-breadcrumb" aria-label="Migas de pan">
          <Link to="/" className="navbar__crumb-link">Inicio</Link>
          <span aria-hidden="true">›</span>
          <span className="navbar__crumb-current" aria-current="page">{cityName}</span>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {overall && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--gradient-brand)", borderRadius: "var(--radius-full)", padding: "6px 18px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{overall}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>/ 10</span>
            </div>
          )}
          <ThemeToggle isDark={overlay} />
          <HamburgerButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} isDark={overlay} buttonRef={menuButtonRef} />
        </div>
      </nav>

      <NavMenuDrawer menuOpen={menuOpen} setMenuOpen={setMenuOpen} triggerRef={menuButtonRef} />
    </>
  );
}

const FOOTER_LINKS = [
  { label: "Destinos", path: "/" },
  { label: "City Match", path: "/city-match" },
  { label: "Comparar ciudades", path: "/comparar" },
  { label: "Cómo funciona el Erasmus", path: "/proceso" },
  { label: "Beca Erasmus+", path: "/beca-erasmus" },
  { label: "Learning Agreement", path: "/learning-agreement" },
  { label: "Tipos de intercambio", path: "/tipos-de-intercambio" },
  { label: "Guías Erasmus", path: "/guias" },
];

export function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className="footer">
      <Logo dark={false} />
      <p className="footer__copy">
        © {new Date().getFullYear()} MAbroad · Hecho para ciudadanos globales ·{" "}
        <Link to="/privacidad" className="footer__link">Aviso legal y privacidad</Link>
        {" · "}
        <Link to="/creditos" className="footer__link">Créditos de las fotos</Link>
      </p>
      {/* Enlaces rastreables a todas las páginas indexables (ninguna queda
          huérfana: /tipos-de-intercambio no está en el navbar). */}
      <nav aria-label="Secciones de MAbroad">
        <ul className="footer__nav">
          {FOOTER_LINKS.map((l) => (
            <li key={l.path}><Link to={l.path} aria-current={pathname === l.path ? "page" : undefined}>{l.label}</Link></li>
          ))}
          {/* Abre el formulario «Comparte tu experiencia» de la home (ver
              HomeExperiences). En escritorio es el único acceso: el navbar
              horizontal no lo lleva y el menú lateral no se ve. */}
          <li><Link to="/?accion=compartir">Cuéntanos tu experiencia</Link></li>
        </ul>
      </nav>
      <p className="footer__independence">
        MAbroad es un proyecto independiente, sin relación con la Comisión Europea, el SEPIE ni las universidades.
        Los importes y datos son orientativos: el dato oficial es el de cada universidad y su convocatoria.
      </p>
    </footer>
  );
}

export function SectionLabel({ children, color }) {
  return <span className="section-label" style={color ? { color } : {}}>{children}</span>;
}
