import { useState, useEffect, useRef, useMemo, useId, lazy, Suspense } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { CITIES } from "../data/cities";
import { getScoreMap, getOverallScore, findBestCityMatch, getCitiesGroupedByRegion } from "../lib/cities";
import { HOME_FAQS } from "../data/faqs";
import { Navbar, Footer, SectionLabel, MASymbol, NAV_LINKS } from "../components/Layout";
import { IconCityMatch, IconComparar, IconBeca, IconRanking, IconComunidad, IconSeguridad, IconUniversidad, IconMedalla, IconEdificio, IconFiesta, IconPausa, IconReproducir } from "../components/icons";
import SearchBar from "../components/SearchBar";
import CityCard from "../components/CityCard";
import { useCityFilter } from "../hooks/useCityFilter";
import { useSEO } from "../hooks/useSEO";
import { useIsoLayoutEffect } from "../hooks/useIsoLayoutEffect";
import { HOME_JSON_LD } from "../lib/seo";
import { isPrerenderedFirstRender } from "../lib/firstRender";
import HomeExperiences from "../components/experiences/HomeExperiences";

// WorldMap arrastra react-simple-maps + d3 (pesado). Se carga bajo demanda
// para no engordar el bundle inicial — el globo está más abajo en la página,
// así que no afecta a lo primero que ve el usuario.
const WorldMap = lazy(() => import("../components/WorldMap"));

const HERO_WORDS = [
  { word: "Erasmus.", gender: "m" },
  { word: "ciudad.", gender: "f" },
  { word: "aventura.", gender: "f" },
  { word: "futuro.", gender: "m" },
  { word: "capítulo.", gender: "m" },
];

const STATS = [
  { val: String(CITIES.length), label: "Destinos" },
  // Comisión Europea, informe anual Erasmus+ 2024 (publicado el 14/11/2025):
  // «casi 1,5 millones» de participantes en movilidad (estudiantes, docentes,
  // formadores y jóvenes), no solo estudiantes.
  { val: "~1,5M", label: "en Erasmus+ (2024)" },
  { val: "Gratis", label: "Sin registro" },
];



const TRENDING = ["Bolonia", "Lisboa", "Berlín", "Praga", "Viena"];

// Subconjunto de NAV_LINKS para los accesos rápidos del hero en móvil —
// "Destinos" sobra (ya estamos en Home) y Comparar/Beca quedan bien
// cubiertos por la hamburguesa; con solo 3 hay más aire entre chips.
const HERO_MOBILE_LINKS = NAV_LINKS.filter((l) => ["/city-match", "/proceso", "/learning-agreement"].includes(l.path));

// Fase 1 — Home: los 3 accesos principales que responden a la intención
// más habitual de un estudiante que llega por primera vez.
const QUICK_ACCESS = [
  {
    Icon: IconCityMatch,
    title: "Encontrar tu ciudad",
    desc: "Compara coste, ambiente y más, y descubre tu destino ideal",
    action: "explore",
  },
  {
    Icon: IconComparar,
    title: "Comparar ciudades",
    desc: "Pon dos o más destinos lado a lado",
    action: "compare",
  },
  {
    Icon: IconBeca,
    title: "Calcular tu beca",
    desc: "Cuánto vas a cobrar y cuánto necesitas para vivir",
    action: "beca",
  },
];

function QuickAccessSection() {
  const navigate = useNavigate();

  const handleClick = (action) => {
    if (action === "explore") {
      const el = document.querySelector(".section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (action === "compare") {
      navigate("/comparar");
    } else if (action === "beca") {
      navigate("/beca-erasmus");
    }
  };

  return (
    <section className="quick-access">
      <div className="quick-access__grid">
        {QUICK_ACCESS.map((item) => (
          <button
            key={item.action}
            type="button"
            className="quick-access__card"
            onClick={() => handleClick(item.action)}
          >
            <span className="quick-access__icon quick-access__icon--illustrated">
              <item.Icon size={56} />
            </span>
            <span className="quick-access__title">{item.title}</span>
            <span className="quick-access__desc">{item.desc}</span>
            <span className="quick-access__arrow">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}


// Anima "150" → cuenta entera, "1,5M" → cuenta el decimal manteniendo el
// sufijo. Cualquier otro valor no numérico ("Gratis") se muestra tal cual,
// sin animar. Dispara una sola vez al entrar en el viewport y respeta
// prefers-reduced-motion (muestra el valor final directamente).
//
// El estado inicial es el valor REAL: es lo que se prerenderiza (antes el
// HTML decía "0 Destinos" a buscadores y a quien aún no tenía el JS). El
// contador solo arranca desde cero —puesto antes de pintar, sin parpadeo—
// cuando se llega a la home navegando dentro de la web; en la primera carga
// sobre el HTML prerenderizado la cifra ya está en pantalla y no se reinicia.

function CountUpStat({ value }) {
  const ref = useRef(null);
  const intMatch = /^(\d+)$/.exec(value);
  const decMatch = /^(\d+),(\d+)(\D*)$/.exec(value);
  const animatable = Boolean(intMatch || decMatch);
  const [display, setDisplay] = useState(value);
  const done = useRef(false);

  useIsoLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !animatable || isPrerenderedFirstRender()) { setDisplay(value); return; }

    const el = ref.current;
    if (!el) return;
    setDisplay(intMatch ? "0" : `0,0${decMatch[3]}`);

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || done.current) return;
      done.current = true;
      const start = performance.now();
      const duration = 1100;

      const target = intMatch ? parseInt(intMatch[1], 10) : parseInt(decMatch[1] + decMatch[2], 10);
      const suffix = decMatch ? decMatch[3] : "";

      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const current = Math.round(target * eased);
        setDisplay(
          intMatch
            ? String(current)
            : `${Math.floor(current / 10)},${current % 10}${suffix}`
        );
        if (p < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      }
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref} className="hero__stat-val">{display}</span>;
}

function AnimatedWord() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx((i) => (i + 1) % HERO_WORDS.length); setVisible(true); }, 320);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_WORDS[idx];
  const adj = current.gender === "m" ? "próximo" : "próxima";

  return (
    <span className="hero__title-line2">
      <span style={{ color: "#fff" }}>{adj} </span>
      <span className="hero__animated-word" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)" }}>
        {current.word}
      </span>
    </span>
  );
}

// Vídeo de fondo del hero, alojado en /public (no en un CDN externo):
// Róterdam en hora dorada — Pexels, vídeo 32326469 ("Aerial View of
// Rotterdam Skyline at Sunset", de A.S. Kacar), Licencia Pexels: uso
// comercial gratuito, sin atribución obligatoria. Skyline moderno (economía,
// futuro) con el río y sus barcos (vida) y, al fondo, el puente Erasmus.
// Retocado algo más cálido y saturado; recortado a 11 s con fundido del
// final sobre el principio (bucle sin salto); MP4 H.264 + WebM VP9 a 1080p
// (<4,5 MB cada uno). El poster es su primer fotograma, en WebP 1920/1280.
// Para pantallas estrechas hay una versión a 720p (~1,1 MB, la cuarta parte):
// el mismo corte reescalado con ffmpeg (VP9 y H.264 en dos pasadas, ~800 kbps).
const HERO_VIDEO = {
  webm: "/videos/hero-rotterdam.webm",
  mp4: "/videos/hero-rotterdam.mp4",
  small: {
    webm: "/videos/hero-rotterdam-720.webm",
    mp4: "/videos/hero-rotterdam-720.mp4",
  },
  // Misma frontera que el poster de 1280 (posterSizes).
  smallQuery: "(max-width: 768px)",
  poster: "/videos/hero-rotterdam-poster.webp",
  posterSrcSet: "/videos/hero-rotterdam-poster-1280.webp 1280w, /videos/hero-rotterdam-poster.webp 1920w",
  // En móvil el hero se pinta por su alto: la versión de 1280 basta y pesa la mitad.
  posterSizes: "(max-width: 768px) 640px, 100vw",
};

/**
 * ¿Pide el usuario ahorrar datos? (modo ahorro de datos o red 2G). Es el
 * ÚNICO caso en que el hero se queda solo con el poster. prefers-reduced-
 * motion NO lo quita: el plano es lento y no se desplaza por la pantalla
 * (nivel 2 de "MOVIMIENTO REDUCIDO POR NIVELES" en global.css), y el botón
 * de pausa cubre a quien prefiera pararlo.
 */
function prefersReducedData() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia?.("(prefers-reduced-data: reduce)").matches) return true;
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return Boolean(conn && (conn.saveData || ["slow-2g", "2g"].includes(conn.effectiveType)));
}

// La pausa del usuario se recuerda entre visitas. Con el almacenamiento
// bloqueado (modo privado estricto, cookies desactivadas) no se recuerda,
// pero el botón sigue funcionando durante la visita.
const HERO_VIDEO_PAUSED_KEY = "tmate-hero-video-paused";

function readHeroVideoPaused() {
  try { return localStorage.getItem(HERO_VIDEO_PAUSED_KEY) === "1"; } catch { return false; }
}

function saveHeroVideoPaused(paused) {
  try {
    if (paused) localStorage.setItem(HERO_VIDEO_PAUSED_KEY, "1");
    else localStorage.removeItem(HERO_VIDEO_PAUSED_KEY);
  } catch { /* sin almacenamiento: la elección dura solo esta visita */ }
}

// El fichero se elige UNA vez, al montar, según el ancho de la pantalla: en
// móvil la versión 720p (1,1 MB en vez de 4 MB). No se cambia al girar el
// dispositivo o redimensionar: recargar el vídeo a mitad sería peor.
function pickHeroVideoSources() {
  const small = window.matchMedia?.(HERO_VIDEO.smallQuery).matches;
  return small ? HERO_VIDEO.small : { webm: HERO_VIDEO.webm, mp4: HERO_VIDEO.mp4 };
}

// Fondo del hero: SIEMPRE se pinta el poster (es la imagen LCP y la que ve
// quien ahorra datos). El <video> se monta solo en cliente — así el HTML
// prerenderizado no empieza a descargar 4 MB a quien no lo va a ver — y
// aparece con un fundido cuando ya reproduce (sin parpadeo negro). El
// degradado de encima asegura que el título se lea sobre vídeo o foto.
//
// La reproducción se controla a mano (play()/pause()) en vez de con el
// atributo autoplay, para poder: respetar la pausa guardada sin descargar
// el vídeo (preload="none"), pararlo cuando el hero sale de pantalla (no
// tiene sentido decodificar vídeo que nadie ve) y reflejar en el botón si
// el navegador bloqueó el arranque (p. ej. iOS en modo ahorro de batería).
function HeroBackground() {
  const videoRef = useRef(null);
  const [videoAllowed, setVideoAllowed] = useState(false);
  const [sources, setSources] = useState(null);
  const [paused, setPaused] = useState(false);   // elección del usuario (persistida)
  const [blocked, setBlocked] = useState(false); // el navegador no dejó arrancar solo
  const [inView, setInView] = useState(true);
  const [started, setStarted] = useState(false); // ya hay fotogramas → fundido sobre el poster

  useEffect(() => {
    setPaused(readHeroVideoPaused());
    setSources(pickHeroVideoSources());
    setVideoAllowed(!prefersReducedData());
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoAllowed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused || !inView) { video.pause(); return; }
    video.muted = true; // los navegadores solo permiten arrancar solo un vídeo silenciado
    video.play()?.catch((err) => {
      // AbortError = un pause() posterior interrumpió este play(): no es un bloqueo.
      if (err?.name === "NotAllowedError") setBlocked(true);
    });
  }, [videoAllowed, paused, inView]);

  const playing = !paused && !blocked;

  function togglePlayback() {
    const video = videoRef.current;
    if (playing) {
      setPaused(true);
      saveHeroVideoPaused(true);
      video?.pause();
      return;
    }
    setPaused(false);
    setBlocked(false);
    saveHeroVideoPaused(false);
    // play() dentro del propio clic: si el navegador bloqueó el arranque
    // automático, solo lo permite durante un gesto del usuario.
    if (video) { video.muted = true; video.play()?.catch(() => {}); }
  }

  const toggleLabel = playing ? "Pausar el vídeo de fondo" : "Reproducir el vídeo de fondo";

  return (
    <>
      <img
        className="hero__poster"
        src={HERO_VIDEO.poster}
        srcSet={HERO_VIDEO.posterSrcSet}
        sizes={HERO_VIDEO.posterSizes}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        fetchpriority="high"
        decoding="async"
      />
      {videoAllowed && sources && (
        <video
          ref={videoRef}
          className={`hero__video${started ? " hero__video--playing" : ""}`}
          muted loop playsInline
          disablePictureInPicture
          disableRemotePlayback
          preload={paused ? "none" : "auto"}
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => { setStarted(true); setBlocked(false); }}
          onError={() => setVideoAllowed(false)}
        >
          <source src={sources.webm} type="video/webm" />
          {/* Si falla el último formato, se queda el poster (el vídeo solo
              se hace visible cuando ya está reproduciendo). */}
          <source src={sources.mp4} type="video/mp4" onError={() => setVideoAllowed(false)} />
        </video>
      )}
      <div className="hero__video-overlay" />
      {videoAllowed && (
        <button
          type="button"
          className="hero__video-toggle"
          onClick={togglePlayback}
          aria-label={toggleLabel}
          title={toggleLabel}
        >
          {playing ? <IconPausa size={16} /> : <IconReproducir size={16} />}
        </button>
      )}
    </>
  );
}

const VIBE_FILTERS = [
  { key: "fiesta",  label: "Fiesta",   Icon: IconFiesta, tags: ["Ciudad universitaria", "Ruin bars", "Oktoberfest", "Arte & Libertad", "Trending"] },
  { key: "cultura", label: "Cultura",  Icon: IconEdificio, tags: ["Historia viva", "Joya medieval", "Capital diplomática", "Arquitectura radical", "La ciudad luz", "Capital global", "Capital de Europa", "Fotogénica", "Gran calidad de vida"] },
  { key: "barato",  label: "Barato",   Icon: IconBeca, tags: ["Muy barata", "Pueblo & Naturaleza", "Gema oculta"] },
];

const CITY_PILLS = [
  { name: "Bolonia",   code: "BOL", flag: "🇮🇹", slug: "bolonia"   },
  { name: "Berlín",    code: "BER", flag: "🇩🇪", slug: "berlin"    },
  { name: "Lisboa",    code: "LIS", flag: "🇵🇹", slug: "lisboa"    },
  { name: "Praga",     code: "PRG", flag: "🇨🇿", slug: "praga"     },
  { name: "Ámsterdam", code: "AMS", flag: "🇳🇱", slug: "amsterdam" },
  { name: "Viena",     code: "VIE", flag: "🇦🇹", slug: "viena"     },
  { name: "Budapest",  code: "BUD", flag: "🇭🇺", slug: "budapest"  },
  { name: "París",     code: "PAR", flag: "🇫🇷", slug: "paris"     },
];

// El mapa (react-simple-maps + d3 + el topojson de países) no se descarga al
// entrar en la home, sino cuando el usuario se acerca: al aproximarse su
// hueco a la pantalla (IntersectionObserver con margen) o en cuanto empieza
// a bajar — el mapa queda a poco más de una pantalla, así que el primer
// scroll da el margen justo para que esté listo al llegar. Quien no pasa del
// hero no descarga nada. El hueco reserva la altura del mapa (.map-slot en
// global.css) para que lo de debajo no salte al montarse.
function GlobeSection() {
  const slotRef = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = slotRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") { setNear(true); return undefined; }

    const load = () => setNear(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) load();
    }, { rootMargin: "200px 0px" });
    observer.observe(el);
    window.addEventListener("scroll", load, { passive: true, once: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", load);
    };
  }, []);

  const placeholder = <div className="map-slot__placeholder" aria-hidden="true" />;
  return (
    <div ref={slotRef} className="map-slot">
      {near ? <Suspense fallback={placeholder}><WorldMap /></Suspense> : placeholder}
    </div>
  );
}

// Directorio de todos los destinos por región: enlaces rastreables a las
// fichas que no aparecen en la rejilla inicial (solo enseña 4), para que
// ninguna ficha quede huérfana en el HTML prerenderizado.
const CITY_DIRECTORY = getCitiesGroupedByRegion();

function CityDirectorySection() {
  return (
    <section className="section city-directory" aria-labelledby="city-directory-title" style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="section__header">
        <div>
          <SectionLabel color="var(--color-teal)">Directorio</SectionLabel>
          <h2 id="city-directory-title" className="section__title">Todos los destinos</h2>
        </div>
      </div>
      <div className="city-directory__grid">
        {CITY_DIRECTORY.map(({ region, cities }) => (
          <div key={region} className="city-directory__group">
            <h3 className="city-directory__region">
              {region} <span className="city-directory__count">{cities.length}</span>
            </h3>
            <ul className="city-directory__list">
              {cities.map((c) => (
                <li key={c.slug}><Link to={`/city/${c.slug}`}>{c.name}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const baseId = useId();

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="faq-header">
          <SectionLabel color="var(--color-primary)">Preguntas frecuentes</SectionLabel>
          <h2 className="section__title">Todo lo que necesitas saber.</h2>
          <p className="faq-subtitle">
            Las dudas más habituales antes de empezar tu Erasmus, resueltas.
          </p>
        </div>
        <div className="faq-list">
          {/* Mismo texto que el JSON-LD FAQPage (src/data/faqs.js). Las
              respuestas cerradas siguen en el HTML, con hidden. */}
          {HOME_FAQS.map((item, i) => {
            const open = openIdx === i;
            const answerId = `${baseId}-faq-${i}`;
            return (
              <div key={i} className={`faq-item${open ? " faq-item--open" : ""}`}>
                <h3 className="faq-item__heading">
                  <button
                    type="button"
                    className="faq-item__question"
                    aria-expanded={open}
                    aria-controls={answerId}
                    onClick={() => setOpenIdx(open ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-item__icon" aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                </h3>
                <div id={answerId} className="faq-item__answer" hidden={!open}>{item.a}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Fase 8 — Rankings: 100% basado en los mismos scores que ya se muestran
// en cada ficha de ciudad y en el comparador. No se inventa ningún dato
// nuevo para esta sección, solo se reordena lo que ya existe.
const RANKING_CATEGORIES = [
  { id: "overall", label: "General", Icon: IconRanking },
  { id: "coste", label: "Más económicas", Icon: IconBeca },
  { id: "vida_social", label: "Vida social", Icon: IconComunidad },
  { id: "seguridad", label: "Seguridad", Icon: IconSeguridad },
  { id: "empleo", label: "Salidas profesionales", Icon: IconUniversidad },
];

function RankingsSection() {
  const [active, setActive] = useState("overall");
  const navigate = useNavigate();

  const ranked = useMemo(() => {
    return CITIES
      .map((city) => ({
        city,
        score: active === "overall" ? getOverallScore(city.slug) : (getScoreMap(city.slug)[active]?.score ?? 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [active]);

  return (
    <section className="rankings-section">
      <div className="rankings-inner">
        <div className="rankings-header">
          <SectionLabel color="var(--color-teal)">Rankings</SectionLabel>
          <h2 className="section__title">Las ciudades mejor valoradas.</h2>
          <p className="rankings-subtitle">
            Basado en los mismos scores que ves en cada ficha de ciudad y en el comparador.
          </p>
        </div>

        <div className="rankings-tabs">
          {RANKING_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`rankings-tab${active === c.id ? " rankings-tab--active" : ""}`}
              onClick={() => setActive(c.id)}
            >
              <c.Icon size={20} className="rankings-tab__icon" /> {c.label}
            </button>
          ))}
        </div>

        <div className="rankings-list">
          {ranked.map((r, i) => (
            <button
              key={r.city.slug}
              type="button"
              className="rankings-row"
              onClick={() => navigate(`/city/${r.city.slug}`)}
            >
              <span className="rankings-row__pos">
                {i < 3 ? <IconMedalla size={26} tone={i === 0 ? "gold" : i === 1 ? "silver" : "bronze"} /> : `#${i + 1}`}
              </span>
              <span className="rankings-row__city">{r.city.emoji} {r.city.name}<span className="rankings-row__country">{r.city.country}</span></span>
              <div className="rankings-row__bar">
                <div className="rankings-row__bar-fill" style={{ width: `${(r.score / 10) * 100}%` }} />
              </div>
              <span className="rankings-row__score">{r.score.toFixed(1)}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // "Mostrar más" también vive en la URL (?ver=todo): si entras a una ciudad
  // y vuelves atrás, sigues viendo la lista expandida tal y como la dejaste,
  // en vez de que se colapse de vuelta a las 8 primeras.
  const showAll = searchParams.get("ver") === "todo";
  const setShowAll = (next) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const value = typeof next === "function" ? next(showAll) : next;
      if (value) params.set("ver", "todo");
      else params.delete("ver");
      return params;
    }, { replace: true });
  };

  // Hook de filtros dinámico
  const {
    region, setRegion,
    cities: hookCities,
    totalCount: hookTotal,
    hasActiveFilters,
    resetFilters,
  } = useCityFilter({ initialSort: 'erasmus' });

  // Filtro de vibe (se aplica encima del hook, que ya ignora región cuando es un vibe key)
  const activeVibe = VIBE_FILTERS.find(f => f.key === region);
  const filtered = activeVibe
    ? hookCities.filter(c => activeVibe.tags.includes(c.tag))
    : hookCities;
  const totalCount = filtered.length;

  // SEO dinámico
  useSEO({ isHome: true, jsonLd: HOME_JSON_LD });

  // SearchAction (JSON-LD de WebSite): /?buscar=<texto> abre la ficha de la
  // ciudad que mejor coincide, igual que el buscador del hero.
  useEffect(() => {
    const term = searchParams.get("buscar");
    if (!term) return;
    const match = findBestCityMatch(term);
    if (match) navigate(`/city/${match.slug}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const INITIAL_COUNT = 4;
  const displayedCities = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  return (
    <div>
      <Navbar transparent />

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" />
        <HeroBackground />
        <div className="hero__orb" style={{ top: "14%", left: "7%", width: 320, height: 320, background: "radial-gradient(circle, rgba(245,150,58,0.22) 0%, transparent 70%)" }} />
        <div className="hero__orb" style={{ bottom: "18%", right: "4%", width: 260, height: 260, background: "radial-gradient(circle, rgba(63,122,125,0.2) 0%, transparent 70%)", animationDelay: "2s" }} />

        {/* En móvil/tablet (ver CSS, ≤1199px) el navbar horizontal de
            escritorio se esconde detrás de la hamburguesa, así que estos
            3 accesos flotan aquí, justo debajo del logo/hamburguesa —
            mismo chip (fondo blanco, hilo naranja) que el navbar de
            escritorio, cada uno suelto en vez de una caja envolvente. */}
        <nav className="hero__quicklinks" aria-label="Accesos rápidos">
          {HERO_MOBILE_LINKS.map((link) => (
            <Link key={link.path} to={link.path} className="hero__quicklink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hero__content">
          <div className="hero__crest fade-up-1" aria-hidden="true">
            <MASymbol size={40} />
          </div>

          <div className="hero__badge fade-up-1">
            <span className="hero__badge-mark" />
            <span className="hero__badge-text">Tu guía para el Erasmus</span>
          </div>

          <h1 className="hero__title fade-up-2">
            <span className="hero__title-line1">Descubre tu</span>
            <AnimatedWord />
          </h1>

          <p className="hero__subtitle fade-up-3">
            Lo que necesitas para elegir tu ciudad Erasmus: scores por categoría, comparador y guías locales.
          </p>

          <div className="fade-up-4" style={{ width: "100%", display: "flex", justifyContent: "center", position: "relative", zIndex: 10 }}>
            <SearchBar />
          </div>

          <div className="hero__trending fade-up-5">
            <span className="hero__trending-label">Trending:</span>
            {TRENDING.map((name) => {
              const city = CITIES.find((c) => c.name === name);
              return (
                <button key={name} className="hero__trending-pill" onClick={() => city && navigate(`/city/${city.slug}`)}>
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mismos stats en desktop y en móvil — en móvil sustituían a un
            nav (ver .hero__quicklinks, ahora arriba), pero un número no
            es un enlace muerto: tiene sentido dejarlos, solo más
            pequeños/discretos que en desktop. */}
        <div className="hero__stats">
          {STATS.map((s) => (
            <div key={s.label} className="hero__stat">
              <CountUpStat value={s.val} />
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESOS PRINCIPALES */}
      <QuickAccessSection />

      {/* GLOBE */}
      <GlobeSection />

      {/* CITIES */}
      <section className="section" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="section__header">
          <div>
            <SectionLabel>Destinos Erasmus</SectionLabel>
            <h2 className="section__title">Ciudades que te cambian.</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {hasActiveFilters && (
              <button onClick={resetFilters}
                style={{ fontSize: 12, color: "var(--color-muted)", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}>
                Limpiar filtros
              </button>
            )}
            <span className="section__count">{totalCount} ciudad{totalCount !== 1 ? 'es' : ''}</span>
          </div>
        </div>
        <div className="filters">
          {VIBE_FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-pill${(region || 'Todos') === f.key ? " filter-pill--active" : ""}`}
              onClick={() => setRegion((region || 'Todos') === f.key ? null : f.key)}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><f.Icon size={18} /> {f.label}</span>
            </button>
          ))}
        </div>
        <div className="cities-grid">
          {displayedCities.map((city) => <CityCard key={city.slug} city={city} />)}
        </div>

        {/* Show more / Show less */}
        {filtered.length > INITIAL_COUNT && (
          <div className="show-more-wrap">
            <button className="show-more-btn" onClick={() => setShowAll(v => !v)}>
              {showAll
                ? "← Mostrar menos"
                : `Mostrar más destinos (${filtered.length - INITIAL_COUNT} restantes) →`}
            </button>
            {!showAll && (
              <p className="show-more-hint">Más ciudades en camino. ¡Volvemos pronto con nuevos destinos!</p>
            )}
          </div>
        )}
      </section>

      {/* RANKINGS */}
      <RankingsSection />

      {/* EXPERIENCIAS — «Mi experiencia» o las experiencias reales aprobadas */}
      <HomeExperiences />

      {/* DIRECTORIO: todas las fichas enlazadas */}
      <CityDirectorySection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <section className="cta">
        <div className="cta__bg-img" />
        <div className="cta__inner">
          <h2 className="cta__title">Tu Erasmus empieza aquí.</h2>
          <p className="cta__subtitle">
            Casi 1,5 millones de personas participaron en Erasmus+ en 2024, entre estudiantes, docentes y jóvenes. Encuentra tu ciudad.
          </p>
          <div className="cta__buttons">
            <button className="btn-primary" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              Explorar destinos
            </button>
            <a className="btn-ghost" href="https://erasmus-plus.ec.europa.eu" target="_blank" rel="noopener noreferrer">
              Más info sobre Erasmus+
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
