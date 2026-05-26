import { useState, useCallback, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { useNavigate } from "react-router-dom";
import styles from "./WorldMap.module.css";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ─── CITIES ───────────────────────────────────────────────────────────────────
const CITIES = [
  { slug: "bolonia",   name: "Bolonia",   country: "Italia",       coords: [11.34, 44.49], cost: "600–900€",   score: 7.8, img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300&q=70" },
  { slug: "milan",     name: "Milán",     country: "Italia",       coords: [9.19,  45.46], cost: "750–1.100€", score: 7.5, img: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=300&q=70" },
  { slug: "roma",      name: "Roma",      country: "Italia",       coords: [12.49, 41.90], cost: "650–950€",   score: 8.0, img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&q=70" },
  { slug: "turin",     name: "Turín",     country: "Italia",       coords: [7.68,  45.07], cost: "500–750€",   score: 7.2, img: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=300&q=70" },
  { slug: "cracovia",  name: "Cracovia",  country: "Polonia",      coords: [19.94, 50.06], cost: "350–550€",   score: 8.5, img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&q=70" },
  { slug: "varsovia",  name: "Varsovia",  country: "Polonia",      coords: [21.01, 52.23], cost: "450–700€",   score: 7.8, img: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=300&q=70" },
  { slug: "budapest",  name: "Budapest",  country: "Hungría",      coords: [19.04, 47.50], cost: "380–600€",   score: 8.3, img: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=300&q=70" },
  { slug: "praga",     name: "Praga",     country: "Rep. Checa",   coords: [14.42, 50.08], cost: "450–700€",   score: 8.1, img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=300&q=70" },
  { slug: "la-haya",   name: "La Haya",   country: "Países Bajos", coords: [4.30,  52.07], cost: "700–1.000€", score: 7.5, img: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=300&q=70" },
  { slug: "rotterdam", name: "Rotterdam", country: "Países Bajos", coords: [4.48,  51.92], cost: "700–1.000€", score: 7.6, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70" },
  { slug: "munich",    name: "Múnich",    country: "Alemania",     coords: [11.58, 48.14], cost: "800–1.100€", score: 7.9, img: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=300&q=70" },
  { slug: "berlin",    name: "Berlín",    country: "Alemania",     coords: [13.40, 52.52], cost: "600–900€",   score: 8.2, img: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=300&q=70" },
  { slug: "lisboa",    name: "Lisboa",    country: "Portugal",     coords: [-9.14, 38.71], cost: "550–850€",   score: 8.7, img: "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=300&q=70" },
  { slug: "oporto",    name: "Oporto",    country: "Portugal",     coords: [-8.61, 41.15], cost: "450–700€",   score: 8.4, img: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&q=70" },
  { slug: "paris",     name: "París",     country: "Francia",      coords: [2.35,  48.85], cost: "800–1.200€", score: 8.0, img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=70" },
  { slug: "londres",   name: "Londres",   country: "Reino Unido",  coords: [-0.12, 51.51], cost: "950–1.400€", score: 7.4, img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&q=70" },
  { slug: "amsterdam", name: "Ámsterdam", country: "Países Bajos", coords: [4.90,  52.37], cost: "750–1.100€", score: 8.0, img: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=300&q=70" },
  { slug: "viena",     name: "Viena",     country: "Austria",      coords: [16.37, 48.21], cost: "650–950€",   score: 8.2, img: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=300&q=70" },
  { slug: "rosenheim", name: "Rosenheim", country: "Alemania",     coords: [12.12, 47.85], cost: "550–800€",   score: 6.8, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=70" },
  { slug: "bruselas",  name: "Bruselas",  country: "Bélgica",      coords: [4.35,  50.85], cost: "600–900€",   score: 7.7, img: "https://images.unsplash.com/photo-1559113202-c916b8e44373?w=300&q=70" },
];

// ─── COUNTRY LABELS ───────────────────────────────────────────────────────────
const COUNTRIES = [
  { flag: "🇮🇹", name: "Italia",       coords: [12.5,  42.8] },
  { flag: "🇩🇪", name: "Alemania",     coords: [10.4,  51.5] },
  { flag: "🇵🇱", name: "Polonia",      coords: [19.8,  52.5] },
  { flag: "🇵🇹", name: "Portugal",     coords: [-8.2,  39.6] },
  { flag: "🇫🇷", name: "Francia",      coords: [2.5,   46.8] },
  { flag: "🇬🇧", name: "Reino Unido",  coords: [-2.0,  53.0] },
  { flag: "🇳🇱", name: "P. Bajos",     coords: [5.2,   52.6] },
  { flag: "🇭🇺", name: "Hungría",      coords: [19.2,  47.2] },
  { flag: "🇨🇿", name: "Rep. Checa",   coords: [15.5,  49.9] },
  { flag: "🇦🇹", name: "Austria",      coords: [14.2,  47.6] },
  { flag: "🇧🇪", name: "Bélgica",      coords: [4.6,   50.6] },
];

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
        <img src={city.img} alt={city.name} loading="lazy" />
        <div className={styles.popupImgOverlay} />
        <div className={styles.popupScore} style={{ color: scoreColor(city.score) }}>
          {city.score}<span>/10</span>
        </div>
      </div>
      <div className={styles.popupBody}>
        <h3 className={styles.popupName}>{city.name}</h3>
        <p className={styles.popupCountry}>{city.country}</p>
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
  const [selected, setSelected]     = useState(null);
  const [tooltip, setTooltip]       = useState(null); // { city, x, y }
  const [position, setPosition]     = useState({ coordinates: [13, 50], zoom: 3.2 });
  const containerRef                = useRef(null);

  const handleMoveEnd = useCallback(pos => setPosition(pos), []);

  const handlePinEnter = useCallback((city, e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      city,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
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
        <p className={styles.mapSub}>Pasa el cursor sobre un pin para ver detalles · Haz clic para abrir la guía completa</p>
      </div>

      <div className={styles.mapContainer} ref={containerRef}>
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
            {/* ── Countries ── */}
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

            {/* ── Country labels (flag + name) ── */}
            {COUNTRIES.map(c => (
              <Marker key={c.name} coordinates={c.coords}>
                <text
                  textAnchor="middle"
                  y={-6}
                  fontSize={7}
                  fill="#6b8a9e"
                  fontFamily="DM Sans, sans-serif"
                  fontWeight="400"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {c.flag}
                </text>
                <text
                  textAnchor="middle"
                  y={4}
                  fontSize={4.5}
                  fill="#7a9aae"
                  fontFamily="DM Sans, sans-serif"
                  fontWeight="400"
                  letterSpacing="0.3"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {c.name.toUpperCase()}
                </text>
              </Marker>
            ))}

            {/* ── City pins ── */}
            {CITIES.map(city => {
              const isSelected = selected?.slug === city.slug;
              const color = scoreColor(city.score);
              return (
                <Marker
                  key={city.slug}
                  coordinates={city.coords}
                  onClick={e => handlePinClick(city, e)}
                  onMouseEnter={e => handlePinEnter(city, e)}
                  onMouseLeave={handlePinLeave}
                  style={{ cursor: "pointer" }}
                >
                  {/* Outer glow — CSS animated, no SVG animation to avoid ghost rings */}
                  <circle
                    r={isSelected ? 9 : 6}
                    fill={color + "25"}
                    stroke={color}
                    strokeWidth={isSelected ? 1.5 : 1}
                    style={{ transition: "r 0.2s ease" }}
                  />
                  {/* Inner dot */}
                  <circle
                    r={isSelected ? 4.5 : 3}
                    fill={color}
                    style={{ transition: "r 0.2s ease" }}
                  />
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* ── Hover tooltip (fuera del SVG → no hay ghost rings) ── */}
        {tooltip && !selected && (
          <div
            className={styles.tooltip}
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, calc(-100% - 16px))",
            }}
            onMouseEnter={() => setTooltip(null)}
          >
            <img src={tooltip.city.img} alt={tooltip.city.name} className={styles.tooltipImg} />
            <div className={styles.tooltipBody}>
              <span className={styles.tooltipName}>{tooltip.city.name}</span>
              <span className={styles.tooltipScore} style={{ color: scoreColor(tooltip.city.score) }}>
                {tooltip.city.score}/10
              </span>
            </div>
          </div>
        )}

        {/* ── City popup ── */}
        {selected && (
          <CityPopup city={selected} onClose={() => setSelected(null)} navigate={navigate} />
        )}

        {/* ── Controls ── */}
        <div className={styles.zoomControls}>
          <button className={styles.zoomBtn} onClick={() => setPosition(p => ({ ...p, zoom: Math.min(p.zoom * 1.4, 14) }))} aria-label="Acercar">+</button>
          <button className={styles.zoomBtn} onClick={() => setPosition(p => ({ ...p, zoom: Math.max(p.zoom / 1.4, 1) }))} aria-label="Alejar">−</button>
        </div>

        <div className={styles.cityCount}>
          <span className={styles.cityCountDot} />
          {CITIES.length} destinos disponibles
        </div>
      </div>
    </div>
  );
}
