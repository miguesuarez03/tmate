import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { CITIES } from "../data/cities";

const ALL_NAMES = CITIES.map((c) => c.name);

export default function SearchBar({ light = false }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 0) {
      setSuggestions(
        ALL_NAMES.filter((n) =>
          n.toLowerCase().startsWith(query.toLowerCase())
        ).slice(0, 6)
      );
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (name) => {
    const city = CITIES.find((c) => c.name === name);
    if (city) navigate(`/city/${city.slug}`);
    setQuery("");
  };

  const handleSearch = () => {
    const city = CITIES.find(
      (c) => c.name.toLowerCase() === query.toLowerCase()
    );
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
        <span className="search-bar__icon"><Search size={18} strokeWidth={1.75} /></span>
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
          {suggestions.map((name) => {
            const city = CITIES.find((c) => c.name === name);
            return (
              <div
                key={name}
                className="search-bar__item"
                onMouseDown={() => handleSelect(name)}
              >
                <span style={{ display: "flex", color: "var(--color-link)" }}><MapPin size={16} strokeWidth={1.75} /></span>
                <span className="search-bar__city">{name}</span>
                {city && (
                  <span className="search-bar__country">
                    {city.emoji} {city.country}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
