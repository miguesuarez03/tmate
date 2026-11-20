import { useState, useEffect, useRef, useId } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { searchCities, findBestCityMatch } from "../lib/cities";
import { IconLupa, IconPin } from "./icons";
import Flag from "./Flag";
import SuggestionList from "./SuggestionList";
import UniversitySearchSegment from "./university/UniversitySearchSegment";
import { useUniversity } from "../hooks/useUniversity";
import { useFloatingBelow, useScrollLock } from "../hooks/useFloatingBelow";
import { useIsMobile, MAX_SUGGESTIONS } from "../hooks/useIsMobile";

/**
 * Buscador de destinos. Las sugerencias (3 en móvil, 5 en escritorio) salen en
 * un desplegable justo debajo de la barra, en un portal (el hero lo
 * recortaría) y pegado a ella al deslizar; en móvil, con él abierto, la
 * página no se mueve. El desplegable de «Tu uni y grado» funciona igual.
 */
export default function SearchBar({ light = false, withUniversity = false }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef(null);
  const barRef = useRef(null);
  const listId = useId();
  const navigate = useNavigate();
  const mobile = useIsMobile();
  const max = mobile ? MAX_SUGGESTIONS.mobile : MAX_SUGGESTIONS.desktop;

  // Modo «Mi universidad»: con universidad elegida, solo tus destinos.
  const uni = useUniversity();
  const include = uni.filtering ? uni.isIncluded : null;

  const suggestions = query.length > 0 ? searchCities(query, max, include) : [];
  const showList = focused && suggestions.length > 0;
  const pos = useFloatingBelow(barRef, showList);
  useScrollLock(showList && mobile);
  useEffect(() => setActive(-1), [query]);

  const handleSelect = (slug) => {
    navigate(`/city/${slug}`);
    setQuery("");
  };

  // La marcada con las flechas; si no, la más parecida (tolera errores
  // tipográficos y tildes, ej. "rama" encuentra "Roma").
  const handleSearch = () => {
    const city = suggestions[active] ?? findBestCityMatch(query, include);
    if (city) handleSelect(city.slug);
  };

  const handleKey = (e) => {
    if (e.key === "ArrowDown" && suggestions.length) {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp" && suggestions.length) {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") handleSearch();
    else if (e.key === "Escape") {
      setQuery("");
      inputRef.current?.blur();
    }
  };

  return (
    <div className="search-bar" ref={barRef}>
      <div className={`search-bar__inner${focused ? " search-bar__inner--focused" : ""}`}>
        <span className="search-bar__icon"><IconLupa size={18} /></span>
        <input
          ref={inputRef}
          className="search-bar__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 160)}
          onKeyDown={handleKey}
          placeholder="¿A dónde quieres ir?"
          aria-label="Buscar ciudad"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-opt-${active}` : undefined}
          enterKeyHint="search"
          autoComplete="off"
        />
        {/* Modo «Mi universidad», dentro de la barra (solo en la home). */}
        {withUniversity && <UniversitySearchSegment />}
        <button className="search-bar__btn" onClick={handleSearch}>
          Explorar →
        </button>
      </div>

      {showList && pos && createPortal(
        <div className="search-bar__dropdown" style={{ top: pos.top, left: pos.left, width: pos.width, maxHeight: pos.maxHeight }}>
          <SuggestionList
            id={listId}
            label="Ciudades sugeridas"
            active={active}
            onHover={setActive}
            onPick={(item) => handleSelect(item.key)}
            items={suggestions.map((city) => ({
              key: city.slug,
              label: city.name,
              icon: <IconPin size={16} />,
              sub: <><Flag emoji={city.emoji} /> {city.country}</>,
            }))}
          />
        </div>,
        document.body
      )}
    </div>
  );
}
