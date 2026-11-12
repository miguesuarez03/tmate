import { useState, useCallback, useRef, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Link } from "react-router-dom";
import styles from "./WorldMap.module.css";
import { getAllCities, getOverallScore, getScoreMap, getScoreLevel, getStateCountry, getMapCountries } from "../lib/cities";
import { CITY_COORDS } from "../lib/cityCoords";
import { MAP_ALL_VIEW } from "../data/mapCountries";
import { IconFiesta, IconEdificio, IconBeca, IconGlobo } from "./icons";
import { responsiveImage } from "../lib/images";
import PhotoCredit from "./PhotoCredit";
import Flag, { SvgFlag } from "./Flag";

// Foto de la ficha emergente: 240px de ancho × 130px de alto (WorldMap.module.css).
const POPUP_PHOTO_SLOTS = [[null, "240px", 240 / 130]];

// world-atlas@2.0.2 (licencia ISC en public/maps/LICENSE-world-atlas.txt;
// geometrías de Natural Earth, dominio público), servido desde el propio dominio.
const GEO_URL = "/maps/countries-110m.json";

// ─── CIUDADES del mapa ───────────────────────────────────────────────────────
// Todo sale de una sola fuente: nombre, país, bandera, foto y coste de la ficha
// (índice de lib/cities.js) y las coordenadas de lib/cityCoords.js. Así un
// destino nuevo aparece en el mapa con su bandera sin tocar este archivo. El
// score se calcula con getOverallScore(), igual que en la ficha.
const CITIES = getAllCities()
  .filter(city => CITY_COORDS[city.slug])
  .map(city => {
    // Mismas notas de categoría que la ficha de la ciudad (una sola fuente).
    const scores = getScoreMap(city.slug);
    return {
      slug: city.slug,
      name: city.name,
      // «Escocia (Reino Unido)» se agrupa con Reino Unido (filtro y rótulo);
      // el pin conserva su bandera escocesa.
      country: getStateCountry(city.country),
      flag: city.emoji,
      coords: CITY_COORDS[city.slug],
      img: city.img ?? null,
      cost: city.costDetail ?? null,
      score: getOverallScore(city.slug),
      fiesta: scores.vida_social?.score ?? 7,
      cultura: scores.estilo_vida?.score ?? 7,
      economia: scores.coste?.score ?? 7,
      dinero: scores.coste?.score ?? 7,
    };
  });

// ─── PAÍSES: rótulo (bandera + nombre) y zoom al elegirlos ───────────────────
// Cada país con destinos, con su posición de src/data/mapCountries.js
// (tests/flags.test.mjs comprueba que no falte ninguno).
const MAP_COUNTRY_LIST = getMapCountries().filter(c => c.position);
// Zoom mínimo: el del mapa y el del botón «Alejar» (la vista mundial es 0.29).
const MIN_ZOOM = 0.22;
const COUNTRY_VIEW = Object.fromEntries(MAP_COUNTRY_LIST.map(c => [c.name, c.position]));

// ─── FILTROS DE VIBE ──────────────────────────────────────────────────────────
const VIBE_FILTERS = [
  { key: "fiesta",   label: "Fiesta",   Icon: IconFiesta, desc: "Vida nocturna" },
  { key: "cultura",  label: "Cultura",  Icon: IconEdificio, desc: "Arte & historia" },
  { key: "barato",   label: "Barato",   Icon: IconBeca, desc: "Coste de vida bajo" },
];

const ALL_COUNTRIES = ["Todos", ...MAP_COUNTRY_LIST.map(c => c.name)];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const scoreColor = (score) => getScoreLevel(score).color;
const scoreLabel = (score) => getScoreLevel(score).label;

// ─── POPUP ────────────────────────────────────────────────────────────────────
function CityPopup({ city, onClose }) {
  return (
    <div className={styles.popup} onClick={e => e.stopPropagation()}>
      <button className={styles.popupClose} onClick={onClose} aria-label="Cerrar">✕</button>
      <div className={styles.popupImg}>
        <img {...responsiveImage(city.img, { slots: POPUP_PHOTO_SLOTS, fallback: 500 })} alt={`${city.name}, ${city.country}`} width={500} height={280} loading="lazy" decoding="async" />
        <div className={styles.popupImgOverlay} />
        <div className={styles.popupScore} style={{ color: scoreColor(city.score) }}>
          {city.score}<span>/10</span>
        </div>
        <span className={styles.popupFlag}><Flag emoji={city.flag} /></span>
        <PhotoCredit src={city.img} corner="bottom-right" style={{ "--credit-inset": "8px" }} />
      </div>
      <div className={styles.popupBody}>
        <h3 className={styles.popupName}>{city.name}</h3>
        <p className={styles.popupCountry}>{city.country}</p>
        <div className={styles.popupVibes}>
          <span className={styles.popupVibe} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconFiesta size={16} /> {city.fiesta}/10</span>
          <span className={styles.popupVibe} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconEdificio size={16} /> {city.cultura}/10</span>
          <span className={styles.popupVibe} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconBeca size={16} /> {city.economia}/10</span>
        </div>
        <div className={styles.popupTags}>
          {city.cost && <span className={styles.popupTag} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconBeca size={16} /> {city.cost}</span>}
          <span className={styles.popupTagScore} style={{
            color: scoreColor(city.score),
            borderColor: scoreColor(city.score) + "55",
            background: scoreColor(city.score) + "15",
          }}>
            {scoreLabel(city.score)}
          </span>
        </div>
        <Link className={`${styles.popupCta} link-btn`} to={`/city/${city.slug}`}>
          Explorar guía →
        </Link>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function WorldMap() {
  const [selected, setSelected]   = useState(null);
  const [tooltip, setTooltip]     = useState(null);
  const [position, setPosition]   = useState({ coordinates: MAP_ALL_VIEW.center, zoom: MAP_ALL_VIEW.zoom });
  const zoom = position.zoom;
  const [country, setCountry]     = useState("Todos");
  const [vibeFilter, setVibeFilter] = useState(null); // null | "fiesta"|"cultura"|"economia"|"dinero"
  const containerRef              = useRef(null);

  const handleMoveEnd = useCallback(pos => setPosition(pos), []);

  // Zoom al país al seleccionar
  useEffect(() => {
    const target = COUNTRY_VIEW[country] || MAP_ALL_VIEW;
    setPosition({ coordinates: target.center, zoom: target.zoom });
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

      {/* ── FILTROS — barra encima del mapa (fuera del lienzo para no tapar pins) ── */}
      <div className={styles.mapFilters} onClick={e => e.stopPropagation()}>

        {/* Filtro por país */}
        <div className={styles.countryFilter}>
          <span className={styles.filterLabel} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IconGlobo size={18} /> País</span>
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
              <span style={{ display: "inline-flex" }}><f.Icon size={18} /></span>
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

      <div className={styles.mapContainer} ref={containerRef}>

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
            minZoom={MIN_ZOOM}
            maxZoom={14}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: "var(--map-land)", stroke: "var(--map-land-stroke)", strokeWidth: 0.4, outline: "none" },
                      hover:   { fill: "var(--map-land-hover)", stroke: "var(--map-land-stroke)", strokeWidth: 0.4, outline: "none" },
                      pressed: { fill: "var(--map-land-hover)", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Etiquetas de país */}
            {MAP_COUNTRY_LIST.map(c => {
              const base = 1 / zoom;
              const fontSize = Math.max(4, Math.min(10, base * 10));
              const emojiSize = Math.max(7, Math.min(18, base * 16));
              return (
                <Marker key={c.name} coordinates={c.position.label} style={{ pointerEvents: "none" }}>
                  <SvgFlag emoji={c.flag} y={0} height={emojiSize * 0.8} />
                  <text
                    textAnchor="middle"
                    y={emojiSize + 2}
                    fontSize={fontSize}
                    fill="var(--map-label)"
                    fontFamily="DM Sans, sans-serif"
                    fontWeight="600"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {c.short}
                  </text>
                </Marker>
              );
            })}

            {/* Pins de ciudades */}
            {CITIES.map(city => {
              const visible = visibleCities.some(c => c.slug === city.slug);
              const isSelected = selected?.slug === city.slug;
              // Nota: se mantiene como hex literal (no var()) porque más abajo
              // se concatena con sufijos de alpha ("20"/"55") — un custom
              // property ahí produciría un valor de color inválido.
              const color = visible ? scoreColor(city.score) : "#ccc";
              // Con 150 ciudades y un zoom por defecto muy alejado (vista mundial),
              // 1/zoom crecería sin control — se limita a 1 para que los pines no
              // se solapen ni tapen continentes enteros al entrar en la página.
              const base = Math.min(1 / zoom, 1);
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
                    <SvgFlag emoji={city.flag} y={-10} height={8} />
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
              <span className={styles.tooltipFlag}><Flag emoji={tooltip.city.flag} /></span>
              <div>
                <span className={styles.tooltipName}>{tooltip.city.name}</span>
                <span className={styles.tooltipCountry}>{tooltip.city.country}</span>
              </div>
              <span className={styles.tooltipScore} style={{ color: scoreColor(tooltip.city.score) }}>
                {tooltip.city.score}/10
              </span>
            </div>
            <div className={styles.tooltipVibes}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconFiesta size={14} /> {tooltip.city.fiesta}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconEdificio size={14} /> {tooltip.city.cultura}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconBeca size={14} /> {tooltip.city.economia}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconBeca size={14} /> {tooltip.city.dinero}</span>
            </div>
          </div>
        )}

        {/* Popup ciudad */}
        {selected && (
          <CityPopup city={selected} onClose={() => setSelected(null)} />
        )}

        {/* Controles zoom */}
        <div className={styles.zoomControls}>
          <button className={styles.zoomBtn} onClick={() => setPosition(p => ({ ...p, zoom: Math.min(p.zoom * 1.4, 14) }))} aria-label="Acercar">+</button>
          <button className={styles.zoomBtn} onClick={() => setPosition(p => ({ ...p, zoom: Math.max(p.zoom / 1.4, MIN_ZOOM) }))} aria-label="Alejar">−</button>
        </div>

        <div className={styles.cityCount}>
          <span className={styles.cityCountDot} style={{ background: vibeFilter ? "#f59e0b" : "#00bfa5" }} />
          {visibleCities.length} de {CITIES.length} destinos
        </div>
      </div>
    </div>
  );
}
