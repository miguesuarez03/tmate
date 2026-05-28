import { useState, useCallback, useRef, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { useNavigate } from "react-router-dom";
import styles from "./WorldMap.module.css";
import { getFinalScore } from "../data/cityBaseScores";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ─── CITIES del mapa — coords y datos estáticos ──────────────────────────────
// El score se calcula dinámicamente con getOverallScore() para mantener
// consistencia con la página de detalle de cada ciudad.
const CITIES = [
  { slug: "bolonia",   name: "Bolonia",   country: "Italia",       flag: "🇮🇹", coords: [11.34, 44.49], cost: "600–900€"   },
  { slug: "milan",     name: "Milán",     country: "Italia",       flag: "🇮🇹", coords: [9.19,  45.46], cost: "750–1.100€" },
  { slug: "roma",      name: "Roma",      country: "Italia",       flag: "🇮🇹", coords: [12.49, 41.90], cost: "650–950€"   },
  { slug: "turin",     name: "Turín",     country: "Italia",       flag: "🇮🇹", coords: [7.68,  45.07], cost: "500–750€"   },
  { slug: "cracovia",  name: "Cracovia",  country: "Polonia",      flag: "🇵🇱", coords: [19.94, 50.06], cost: "350–550€"   },
  { slug: "varsovia",  name: "Varsovia",  country: "Polonia",      flag: "🇵🇱", coords: [21.01, 52.23], cost: "450–700€"   },
  { slug: "budapest",  name: "Budapest",  country: "Hungría",      flag: "🇭🇺", coords: [19.04, 47.50], cost: "380–600€"   },
  { slug: "praga",     name: "Praga",     country: "Rep. Checa",   flag: "🇨🇿", coords: [14.42, 50.08], cost: "450–700€"   },
  { slug: "la-haya",   name: "La Haya",   country: "Países Bajos", flag: "🇳🇱", coords: [4.30,  52.07], cost: "700–1.000€" },
  { slug: "rotterdam", name: "Rotterdam", country: "Países Bajos", flag: "🇳🇱", coords: [4.48,  51.92], cost: "700–1.000€" },
  { slug: "munich",    name: "Múnich",    country: "Alemania",     flag: "🇩🇪", coords: [11.58, 48.14], cost: "800–1.100€" },
  { slug: "berlin",    name: "Berlín",    country: "Alemania",     flag: "🇩🇪", coords: [13.40, 52.52], cost: "600–900€"   },
  { slug: "lisboa",    name: "Lisboa",    country: "Portugal",     flag: "🇵🇹", coords: [-9.14, 38.71], cost: "550–850€"   },
  { slug: "oporto",    name: "Oporto",    country: "Portugal",     flag: "🇵🇹", coords: [-8.61, 41.15], cost: "450–700€"   },
  { slug: "paris",     name: "París",     country: "Francia",      flag: "🇫🇷", coords: [2.35,  48.85], cost: "800–1.200€" },
  { slug: "londres",   name: "Londres",   country: "Reino Unido",  flag: "🇬🇧", coords: [-0.12, 51.51], cost: "950–1.400€" },
  { slug: "amsterdam", name: "Ámsterdam", country: "Países Bajos", flag: "🇳🇱", coords: [4.90,  52.37], cost: "750–1.100€" },
  { slug: "viena",     name: "Viena",     country: "Austria",      flag: "🇦🇹", coords: [16.37, 48.21], cost: "650–950€"   },
  { slug: "rosenheim", name: "Rosenheim", country: "Alemania",     flag: "🇩🇪", coords: [12.12, 47.85], cost: "550–800€"   },
  { slug: "bruselas",  name: "Bruselas",  country: "Bélgica",      flag: "🇧🇪", coords: [4.35,  50.85], cost: "600–900€"   },
].map(city => ({ ...city, score: getFinalScore(city.slug) }))

// ─── PAÍSES con coordenadas para zoom ─────────────────────────────────────────
const COUNTRY_ZOOM = {
  "Todos":         { coords: [13, 50],   zoom: 1.4 },
  "Italia":        { coords: [12.5, 42], zoom: 3.0 },
  "Alemania":      { coords: [10.5, 51], zoom: 3.2 },
  "Polonia":       { coords: [20, 52],   zoom: 3.5 },
  "Portugal":      { coords: [-8.5, 39], zoom: 3.8 },
  "Francia":       { coords: [2.5, 46],  zoom: 3.2 },
  "Reino Unido":   { coords: [-1, 52],   zoom: 3.5 },
  "Países Bajos":  { coords: [5, 52.3],  zoom: 4.5 },
  "Hungría":       { coords: [19, 47],   zoom: 4.5 },
  "Rep. Checa":    { coords: [15.5, 50], zoom: 4.5 },
  "Austria":       { coords: [14, 47.5], zoom: 4.5 },
  "Bélgica":       { coords: [4.5, 50.5],zoom: 5.5 },
};

// ─── ETIQUETAS DE PAÍS ───────────────────────────────────────────────────────
const COUNTRY_LABELS = [
  { name: "Italia",       flag: "🇮🇹", coords: [12.5, 42.5] },
  { name: "Alemania",    flag: "🇩🇪", coords: [10.5, 51.2] },
  { name: "Polonia",     flag: "🇵🇱", coords: [19.5, 52.0] },
  { name: "Portugal",    flag: "🇵🇹", coords: [-8.0, 39.5] },
  { name: "Francia",     flag: "🇫🇷", coords: [2.5,  46.5] },
  { name: "Reino Unido", flag: "🇬🇧", coords: [-2.0, 53.5] },
  { name: "Países Bajos",flag: "🇳🇱", coords: [5.3,  52.3] },
  { name: "Hungría",     flag: "🇭🇺", coords: [19.0, 47.2] },
  { name: "Rep. Checa",  flag: "🇨🇿", coords: [15.5, 49.8] },
  { name: "Austria",     flag: "🇦🇹", coords: [14.0, 47.5] },
  { name: "Bélgica",     flag: "🇧🇪", coords: [4.5,  50.5] },
];

// ─── FILTROS DE VIBE ──────────────────────────────────────────────────────────
const VIBE_FILTERS = [
  { key: "fiesta",   label: "Fiesta",   icon: "🎉", desc: "Vida nocturna" },
  { key: "cultura",  label: "Cultura",  icon: "🏛️", desc: "Arte & historia" },
  { key: "barato",   label: "Barato",   icon: "💸", desc: "Coste de vida bajo" },
];

const ALL_COUNTRIES = ["Todos", ...Array.from(new Set(CITIES.map(c => c.country))).sort()];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function scoreColor(score) {
  if (score >= 8.5) return "#22c55e";
  if (score >= 8)   return "#00bfa5";
  if (score >= 7)   return "#3b82f6";
  return "#f59e0b";
}
function scoreLabel(score) {
  if (score >= 8.5) return "Excelente";
  if (score >= 8)   return "Muy bueno";
  if (score >= 7)   return "Bueno";
  return "Regular";
}

// ─── POPUP ────────────────────────────────────────────────────────────────────
function CityPopup({ city, onClose, navigate }) {
  return (
    <div className={styles.popup} onClick={e => e.stopPropagation()}>
      <button className={styles.popupClose} onClick={onClose} aria-label="Cerrar">✕</button>
      <div className={styles.popupImg}>
        <img src={`https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300&q=70`} alt={city.name} loading="lazy" />
        <div className={styles.popupImgOverlay} />
        <div className={styles.popupScore} style={{ color: scoreColor(city.score) }}>
          {city.score}<span>/10</span>
        </div>
        <span className={styles.popupFlag}>{city.flag}</span>
      </div>
      <div className={styles.popupBody}>
        <h3 className={styles.popupName}>{city.name}</h3>
        <p className={styles.popupCountry}>{city.country}</p>
        <div className={styles.popupVibes}>
          <span className={styles.popupVibe}>🎉 {city.fiesta}/10</span>
          <span className={styles.popupVibe}>🏛️ {city.cultura}/10</span>
          <span className={styles.popupVibe}>💸 {city.economia}/10</span>
        </div>
        <div className={styles.popupTags}>
          <span className={styles.popupTag}>💶 {city.cost}/mes</span>
          <span className={styles.popupTagScore} style={{
            color: scoreColor(city.score),
            borderColor: scoreColor(city.score) + "55",
            background: scoreColor(city.score) + "15",
          }}>
            {scoreLabel(city.score)}
          </span>
        </div>
        <button className={styles.popupCta} onClick={() => navigate(`/city/${city.slug}`)}>
          Explorar guía →
        </button>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function WorldMap() {
  const navigate = useNavigate();
  const [selected, setSelected]   = useState(null);
  const [tooltip, setTooltip]     = useState(null);
  const [position, setPosition]   = useState({ coordinates: [13, 50], zoom: 1.4 });
  const zoom = position.zoom;
  const [country, setCountry]     = useState("Todos");
  const [vibeFilter, setVibeFilter] = useState(null); // null | "fiesta"|"cultura"|"economia"|"dinero"
  const containerRef              = useRef(null);

  const handleMoveEnd = useCallback(pos => setPosition(pos), []);

  // Zoom al país al seleccionar
  useEffect(() => {
    const target = COUNTRY_ZOOM[country] || COUNTRY_ZOOM["Todos"];
    setPosition({ coordinates: target.coords, zoom: target.zoom });
    setSelected(null);
    setTooltip(null);
  }, [country]);

  // Filtrar ciudades según país y vibe
  const visibleCities = CITIES.filter(c => {
    if (country !== "Todos" && c.country !== country) return false;
    if (vibeFilter) {
      const val = vibeFilter === "barato"
        ? Math.round((c.economia + c.dinero) / 2)
        : c[vibeFilter];
      if (val < 7) return false;
    }
    return true;
  });

  const handlePinEnter = useCallback((city, e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ city, x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handlePinLeave = useCallback(() => setTooltip(null), []);

  const handlePinClick = useCallback((city, e) => {
    e.stopPropagation();
    setTooltip(null);
    setSelected(city);
  }, []);

  return (
    <div className={styles.mapWrapper} onClick={() => { setSelected(null); setTooltip(null); }}>
      <div className={styles.mapHeader}>
        <p className={styles.mapEyebrow}>Explora destinos</p>
        <h2 className={styles.mapTitle}>Encuentra tu ciudad Erasmus</h2>
        <p className={styles.mapSub}>Filtra por país o por lo que más te importa · Haz clic en un pin para ver la guía</p>
      </div>

      <div className={styles.mapContainer} ref={containerRef}>

        {/* ── FILTRO FLOTANTE ENCIMA DEL MAPA ── */}
        <div className={styles.mapFilters} onClick={e => e.stopPropagation()}>

          {/* Filtro por país */}
          <div className={styles.countryFilter}>
            <span className={styles.filterLabel}>🌍 País</span>
            <select
              className={styles.countrySelect}
              value={country}
              onChange={e => setCountry(e.target.value)}
            >
              {ALL_COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Separador */}
          <div className={styles.filterDivider} />

          {/* Filtros de vibe */}
          <div className={styles.vibeFilters}>
            {VIBE_FILTERS.map(f => (
              <button
                key={f.key}
                className={`${styles.vibeBtn} ${vibeFilter === f.key ? styles.vibeBtnActive : ""}`}
                onClick={() => setVibeFilter(v => v === f.key ? null : f.key)}
                title={f.desc}
              >
                <span>{f.icon}</span>
                <span className={styles.vibeBtnLabel}>{f.label}</span>
              </button>
            ))}
          </div>

          {/* Contador de pins visibles */}
          {(country !== "Todos" || vibeFilter) && (
            <div className={styles.filterResult}>
              <span>{visibleCities.length} ciudad{visibleCities.length !== 1 ? "es" : ""}</span>
              <button className={styles.filterReset} onClick={() => { setCountry("Todos"); setVibeFilter(null); }}>
                ✕ Limpiar
              </button>
            </div>
          )}
        </div>

        {/* ── MAPA ── */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 800 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            onMoveEnd={handleMoveEnd}
            minZoom={1}
            maxZoom={14}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: "#dde8f0", stroke: "#b8ccd8", strokeWidth: 0.4, outline: "none" },
                      hover:   { fill: "#c8dcea", stroke: "#b8ccd8", strokeWidth: 0.4, outline: "none" },
                      pressed: { fill: "#c8dcea", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Etiquetas de país */}
            {COUNTRY_LABELS.map(c => {
              const base = 1 / zoom;
              const fontSize = Math.max(4, Math.min(10, base * 10));
              const emojiSize = Math.max(7, Math.min(18, base * 16));
              return (
                <Marker key={c.name} coordinates={c.coords} style={{ pointerEvents: "none" }}>
                  <text
                    textAnchor="middle"
                    y={0}
                    fontSize={emojiSize}
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {c.flag}
                  </text>
                  <text
                    textAnchor="middle"
                    y={emojiSize + 2}
                    fontSize={fontSize}
                    fill="#6b8fa8"
                    fontFamily="DM Sans, sans-serif"
                    fontWeight="600"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {c.name}
                  </text>
                </Marker>
              );
            })}

            {/* Pins de ciudades */}
            {CITIES.map(city => {
              const visible = visibleCities.some(c => c.slug === city.slug);
              const isSelected = selected?.slug === city.slug;
              const color = visible ? scoreColor(city.score) : "#ccc";
              const base = 1 / zoom;
              const r = isSelected ? base * 7 : (visible ? base * 4 : base * 2.5);

              return (
                <Marker
                  key={city.slug}
                  coordinates={city.coords}
                  onClick={visible ? e => handlePinClick(city, e) : undefined}
                  onMouseEnter={visible ? e => handlePinEnter(city, e) : undefined}
                  onMouseLeave={visible ? handlePinLeave : undefined}
                  style={{ cursor: visible ? "pointer" : "default" }}
                >
                  {/* Anillo exterior */}
                  <circle
                    r={r + 2}
                    fill={color + "20"}
                    stroke={visible ? color : "transparent"}
                    strokeWidth={isSelected ? 1.5 : 0.8}
                    style={{ transition: "all 0.2s ease" }}
                  />
                  {/* Punto central */}
                  <circle
                    r={r / 2}
                    fill={color}
                    opacity={visible ? 1 : 0.3}
                    style={{ transition: "all 0.2s ease" }}
                  />
                  {/* Emoji de bandera para ciudades seleccionadas o en zoom alto */}
                  {isSelected && (
                    <text
                      textAnchor="middle"
                      y={-10}
                      fontSize={10}
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {city.flag}
                    </text>
                  )}
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip hover */}
        {tooltip && !selected && (
          <div
            className={styles.tooltip}
            style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, calc(-100% - 16px))" }}
            onMouseEnter={() => setTooltip(null)}
          >
            <div className={styles.tooltipBody}>
              <span className={styles.tooltipFlag}>{tooltip.city.flag}</span>
              <div>
                <span className={styles.tooltipName}>{tooltip.city.name}</span>
                <span className={styles.tooltipCountry}>{tooltip.city.country}</span>
              </div>
              <span className={styles.tooltipScore} style={{ color: scoreColor(tooltip.city.score) }}>
                {tooltip.city.score}/10
              </span>
            </div>
            <div className={styles.tooltipVibes}>
              <span>🎉 {tooltip.city.fiesta}</span>
              <span>🏛️ {tooltip.city.cultura}</span>
              <span>💸 {tooltip.city.economia}</span>
              <span>💰 {tooltip.city.dinero}</span>
            </div>
          </div>
        )}

        {/* Popup ciudad */}
        {selected && (
          <CityPopup city={selected} onClose={() => setSelected(null)} navigate={navigate} />
        )}

        {/* Controles zoom */}
        <div className={styles.zoomControls}>
          <button className={styles.zoomBtn} onClick={() => setPosition(p => ({ ...p, zoom: Math.min(p.zoom * 1.4, 14) }))} aria-label="Acercar">+</button>
          <button className={styles.zoomBtn} onClick={() => setPosition(p => ({ ...p, zoom: Math.max(p.zoom / 1.4, 1) }))} aria-label="Alejar">−</button>
        </div>

        <div className={styles.cityCount}>
          <span className={styles.cityCountDot} style={{ background: vibeFilter ? "#f59e0b" : "#00bfa5" }} />
          {visibleCities.length} de {CITIES.length} destinos
        </div>
      </div>
    </div>
  );
}
