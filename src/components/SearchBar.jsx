import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { searchCities, findBestCityMatch } from "../lib/cities";
import { IconLupa, IconPin } from "./icons";
import Flag from "./Flag";
import UniversitySearchSegment from "./university/UniversitySearchSegment";
import { useUniversity } from "../hooks/useUniversity";
import { useFloatingBelow } from "../hooks/useFloatingBelow";

export default function SearchBar({ light = false, withUniversity = false }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const barRef = useRef(null);
  const navigate = useNavigate();
  const showList = focused && suggestions.length > 0;
  const pos = useFloatingBelow(barRef, showList, { minHeight: 120 });

  // Modo «Mi universidad»: con universidad elegida, solo tus destinos.
  const uni = useUniversity();
  const include = uni.filtering ? uni.isIncluded : null;

  useEffect(() => {
    setSuggestions(query.length > 0 ? searchCities(query, 6, include) : []);
  }, [query, include]);

  const handleSelect = (slug) => {
    navigate(`/city/${slug}`);
    setQuery("");
  };

  // Coincidencia exacta si existe; si no, la más parecida (tolera errores
  // tipográficos y tildes, ej. "rama" encuentra "Roma").
  const handleSearch = () => {
    const city = findBestCityMatch(query, include);
    if (city) navigate(`/city/${city.slug}`);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") {
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
          enterKeyHint="search"
          autoComplete="off"
        />
        {/* Modo «Mi universidad», dentro de la barra (solo en la home). */}
        {withUniversity && <UniversitySearchSegment />}
        <button className="search-bar__btn" onClick={handleSearch}>
          Explorar →
        </button>
      </div>

      {/* Sugerencias en un portal con posición fija bajo la barra: por encima
          de todo (el hero las recortaría y sus cifras las taparían). */}
      {showList && pos && createPortal(
        <div
          className="search-bar__dropdown"
          role="listbox"
          aria-label="Ciudades sugeridas"
          style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width, maxHeight: pos.maxHeight, right: "auto" }}
        >
          {suggestions.map((city) => (
            <div
              key={city.slug}
              className="search-bar__item"
              onMouseDown={() => handleSelect(city.slug)}
            >
              <span style={{ display: "inline-flex" }}><IconPin size={16} /></span>
              <span className="search-bar__city">{city.name}</span>
              <span className="search-bar__country">
                <Flag emoji={city.emoji} /> {city.country}
              </span>
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}
