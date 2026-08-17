import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchCities, findBestCityMatch } from "../lib/cities";
import { IconLupa, IconPin } from "./icons";

export default function SearchBar({ light = false }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setSuggestions(query.length > 0 ? searchCities(query, 6) : []);
  }, [query]);

  const handleSelect = (slug) => {
    navigate(`/city/${slug}`);
    setQuery("");
  };

  // Coincidencia exacta si existe; si no, la más parecida (tolera errores
  // tipográficos y tildes, ej. "rama" encuentra "Roma").
  const handleSearch = () => {
    const city = findBestCityMatch(query);
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
    <div className="search-bar">
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
          autoComplete="off"
        />
        <button className="search-bar__btn" onClick={handleSearch}>
          Explorar →
        </button>
      </div>

      {focused && suggestions.length > 0 && (
        <div className="search-bar__dropdown">
          {suggestions.map((city) => (
            <div
              key={city.slug}
              className="search-bar__item"
              onMouseDown={() => handleSelect(city.slug)}
            >
              <span style={{ display: "inline-flex" }}><IconPin size={16} /></span>
              <span className="search-bar__city">{city.name}</span>
              <span className="search-bar__country">
                {city.emoji} {city.country}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
