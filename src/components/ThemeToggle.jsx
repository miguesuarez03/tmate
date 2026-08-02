import { useTheme } from "../hooks/useTheme";

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M17.99 17.99l1.77 1.77M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M17.99 6.01l1.77-1.77" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z" />
  </svg>
);

/**
 * Toggle claro/oscuro. `isDark` es el estado del navbar (hero transparente
 * vs. scrolleado), no confundir con el tema — se usa solo para decidir el
 * color del icono cuando flota sobre una imagen siempre oscura.
 */
export default function ThemeToggle({ isDark = false, className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-pressed={isDarkTheme}
      aria-label={isDarkTheme ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDarkTheme ? "Modo claro" : "Modo oscuro"}
      style={{ color: isDark ? "#fff" : "var(--color-dark)" }}
    >
      {isDarkTheme ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

/** Fila con switch para el menú (drawer) móvil/desktop. */
export function ThemeToggleRow() {
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <button type="button" className="theme-toggle-row" onClick={toggleTheme} aria-pressed={isDarkTheme}>
      <span className="theme-toggle-row__icon">{isDarkTheme ? <MoonIcon /> : <SunIcon />}</span>
      <span className="theme-toggle-row__text">
        <span className="theme-toggle-row__label">Modo {isDarkTheme ? "oscuro" : "claro"}</span>
        <span className="theme-toggle-row__desc">Toca para cambiar de apariencia</span>
      </span>
      <span className={`theme-toggle-row__switch${isDarkTheme ? " theme-toggle-row__switch--on" : ""}`} />
    </button>
  );
}
