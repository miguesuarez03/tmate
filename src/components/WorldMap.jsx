import { useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { useNavigate } from "react-router-dom";
import styles from "./WorldMap.module.css";

// ─── GEO URL ──────────────────────────────────────────────────────────────────
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ─── CITY DATA WITH COORDINATES ───────────────────────────────────────────────
const CITIES = [
  { slug: "bolonia",   name: "Bolonia",   country: "Italia",          coords: [11.34,  44.49], cost: "600–900€",   score: 7.8, img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=70" },
  { slug: "milan",     name: "Milán",     country: "Italia",          coords: [9.19,   45.46], cost: "750–1.100€", score: 7.5, img: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=400&q=70" },
  { slug: "roma",      name: "Roma",      country: "Italia",          coords: [12.49,  41.90], cost: "650–950€",   score: 8.0, img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=70" },
  { slug: "turin",     name: "Turín",     country: "Italia",          coords: [7.68,   45.07], cost: "500–750€",   score: 7.2, img: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=400&q=70" },
  { slug: "cracovia",  name: "Cracovia",  country: "Polonia",         coords: [19.94,  50.06], cost: "350–550€",   score: 8.5, img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=70" },
  { slug: "varsovia",  name: "Varsovia",  country: "Polonia",         coords: [21.01,  52.23], cost: "450–700€",   score: 7.8, img: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=400&q=70" },
  { slug: "budapest",  name: "Budapest",  country: "Hungría",         coords: [19.04,  47.50], cost: "380–600€",   score: 8.3, img: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=400&q=70" },
  { slug: "praga",     name: "Praga",     country: "Rep. Checa",      coords: [14.42,  50.08], cost: "450–700€",   score: 8.1, img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&q=70" },
  { slug: "la-haya",   name: "La Haya",   country: "Países Bajos",    coords: [4.30,   52.07], cost: "700–1.000€", score: 7.5, img: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=400&q=70" },
  { slug: "rotterdam", name: "Rotterdam", country: "Países Bajos",    coords: [4.48,   51.92], cost: "700–1.000€", score: 7.6, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70" },
  { slug: "munich",    name: "Múnich",    country: "Alemania",        coords: [11.58,  48.14], cost: "800–1.100€", score: 7.9, img: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=400&q=70" },
  { slug: "berlin",    name: "Berlín",    country: "Alemania",        coords: [13.40,  52.52], cost: "600–900€",   score: 8.2, img: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=400&q=70" },
  { slug: "lisboa",    name: "Lisboa",    country: "Portugal",        coords: [-9.14,  38.71], cost: "550–850€",   score: 8.7, img: "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=400&q=70" },
  { slug: "oporto",    name: "Oporto",    country: "Portugal",        coords: [-8.61,  41.15], cost: "450–700€",   score: 8.4, img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&q=70" },
  { slug: "paris",     name: "París",     country: "Francia",         coords: [2.35,   48.85], cost: "800–1.200€", score: 8.0, img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=70" },
  { slug: "londres",   name: "Londres",   country: "Reino Unido",     coords: [-0.12,  51.51], cost: "950–1.400€", score: 7.4, img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=70" },
  { slug: "amsterdam", name: "Ámsterdam", country: "Países Bajos",    coords: [4.90,   52.37], cost: "750–1.100€", score: 8.0, img: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&q=70" },
  { slug: "viena",     name: "Viena",     country: "Austria",         coords: [16.37,  48.21], cost: "650–950€",   score: 8.2, img: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=400&q=70" },
  { slug: "rosenheim", name: "Rosenheim", country: "Alemania",        coords: [12.12,  47.85], cost: "550–800€",   score: 6.8, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70" },
  { slug: "bruselas",  name: "Bruselas",  country: "Bélgica",         coords: [4.35,   50.85], cost: "600–900€",   score: 7.7, img: "https://images.unsplash.com/photo-1559113202-c916b8e44373?w=400&q=70" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function scoreColor(score) {
  if (score >= 8.5) return "#22c55e";
  if (score >= 8)   return "#00d4b8";
  if (score >= 7)   return "#0ea5e9";
  return "#f59e0b";
}

// ─── POPUP ────────────────────────────────────────────────────────────────────
function CityPopup({ city, onClose, navigate }) {
  return (
    <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
      <button className={styles.popupClose} onClick={onClose} aria-label="Cerrar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <div className={styles.popupImg}>
        <img src={city.img} alt={city.name} loading="lazy" />
        <div className={styles.popupImgOverlay} />
        <div className={styles.popupScore} style={{ color: scoreColor(city.score) }}>
          {city.score} <span>/10</span>
        </div>
      </div>
      <div className={styles.popupBody}>
        <h3 className={styles.popupName}>{city.name}</h3>
        <p className={styles.popupCountry}>{city.country}</p>
        <div className={styles.popupTags}>
          <span className={styles.popupTag}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
            {city.cost}/mes
          </span>
          <span className={styles.popupTag} style={{ color: scoreColor(city.score), borderColor: `${scoreColor(city.score)}44`, background: `${scoreColor(city.score)}12` }}>
            {city.score >= 8.5 ? "Excelente" : city.score >= 8 ? "Muy bueno" : city.score >= 7 ? "Bueno" : "Regular"}
          </span>
        </div>
        <button
          className={styles.popupCta}
          onClick={() => navigate(`/city/${city.slug}`)}
        >
          Explorar guía →
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function WorldMap() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [position, setPosition] = useState({ coordinates: [13, 51], zoom: 4.5 });

  const handleMoveEnd = useCallback((pos) => setPosition(pos), []);

  return (
    <div className={styles.mapWrapper} onClick={() => setSelected(null)}>
      {/* Header */}
      <div className={styles.mapHeader}>
        <p className={styles.mapEyebrow}>Explora destinos</p>
        <h2 className={styles.mapTitle}>Encuentra tu ciudad Erasmus</h2>
        <p className={styles.mapSub}>Haz clic en cualquier pin para ver la guía completa</p>
      </div>

      {/* Map container */}
      <div className={styles.mapContainer}>
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
            maxZoom={12}
          >
            {/* Countries */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: "#1e2d3d", stroke: "#0d1a26", strokeWidth: 0.3, outline: "none" },
                      hover:   { fill: "#253d52", stroke: "#0d1a26", strokeWidth: 0.3, outline: "none" },
                      pressed: { fill: "#253d52", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* City markers */}
            {CITIES.map((city) => {
              const isHovered  = hoveredPin === city.slug;
              const isSelected = selected?.slug === city.slug;
              const color = scoreColor(city.score);
              return (
                <Marker
                  key={city.slug}
                  coordinates={city.coords}
                  onClick={(e) => { e.stopPropagation(); setSelected(city); }}
                  onMouseEnter={() => setHoveredPin(city.slug)}
                  onMouseLeave={() => setHoveredPin(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Ping ring */}
                  <circle
                    r={isHovered || isSelected ? 10 : 7}
                    fill={`${color}22`}
                    stroke={color}
                    strokeWidth={isHovered || isSelected ? 1.5 : 1}
                    className={styles.pingRing}
                  />
                  {/* Dot */}
                  <circle
                    r={isHovered || isSelected ? 5 : 3.5}
                    fill={color}
                    style={{ transition: "r 0.2s ease" }}
                  />
                  {/* Tooltip on hover */}
                  {isHovered && !isSelected && (
                    <g transform="translate(0, -18)">
                      <rect x="-28" y="-14" width="56" height="18" rx="5" fill="#0d1520" stroke={color} strokeWidth="0.8" />
                      <text textAnchor="middle" y="-2" fontSize="7" fill="#fff" fontFamily="DM Sans, sans-serif" fontWeight="600">
                        {city.name}
                      </text>
                    </g>
                  )}
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* Popup */}
        {selected && (
          <CityPopup
            city={selected}
            onClose={() => setSelected(null)}
            navigate={navigate}
          />
        )}

        {/* Zoom controls */}
        <div className={styles.zoomControls}>
          <button
            className={styles.zoomBtn}
            onClick={() => setPosition(p => ({ ...p, zoom: Math.min(p.zoom * 1.4, 12) }))}
            aria-label="Acercar"
          >+</button>
          <button
            className={styles.zoomBtn}
            onClick={() => setPosition(p => ({ ...p, zoom: Math.max(p.zoom / 1.4, 1) }))}
            aria-label="Alejar"
          >−</button>
        </div>

        {/* City count badge */}
        <div className={styles.cityCount}>
          <span className={styles.cityCountDot} />
          {CITIES.length} destinos disponibles
        </div>
      </div>
    </div>
  );
}
