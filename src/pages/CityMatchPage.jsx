import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Euro, CloudSun, Languages, PartyPopper, Building2, Trees, GraduationCap, Sparkles, Compass, Medal } from "lucide-react";
import { CITIES } from "../data/cities";
import { getScoreMap, getOverallScore } from "../lib/cities";
import { useSEO } from "../hooks/useSEO";
import { Navbar, Footer } from "../components/Layout";
import styles from "./CityMatchPage.module.css";

/* ─────────────────────────────────────────────────────────────────────────
   City Match — recomendador inteligente.

   Cada pregunta se resuelve contra datos reales que ya existen en la app
   (scores de categoría, idioma, clima, nº de estudiantes) en vez de
   inventar métricas nuevas por ciudad. "Naturaleza" es la única dimensión
   heurística: cuenta menciones de palabras relacionadas con naturaleza en
   los textos reales de cada ciudad (highlights/tips/descripción), así que
   es una señal aproximada, no un dato investigado como el resto.
   ───────────────────────────────────────────────────────────────────────── */

function bucketStudents(str) {
  const n = parseInt(String(str).replace(/\D/g, ""), 10) || 0;
  if (n < 100) return 0;   // ciudad universitaria pequeña
  if (n < 250) return 1;   // mediana
  return 2;                 // gran capital estudiantil
}

const WEATHER_BUCKET = {
  "Mediterráneo": 0,
  "Cálido continental": 0,
  "Continental húmedo": 1,
  "Continental": 1,
  "Oceánico suave": 1,
  "Oceánico": 1,
  "Continental frío": 2,
  "Oceánico lluvioso": 2,
  "Alpino": 2,
};

const NATURE_KEYWORDS = [
  "parque", "playa", "montañ", "lago", "naturaleza", "jardín", "jardin",
  "bosque", "canal", "costa", "río", "rio ", "senderismo", "aire libre",
  "alpes", "mar ",
];

function natureLevel(city) {
  const text = [...(city.highlights || []), ...(city.tips || []), city.description || ""]
    .join(" ")
    .toLowerCase();
  const hits = NATURE_KEYWORDS.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
  if (hits === 0) return 0;
  if (hits <= 2) return 1;
  return 2;
}

function bucketSimilarity(a, b) {
  const dist = Math.abs(a - b);
  return dist === 0 ? 1 : dist === 1 ? 0.5 : 0.15;
}

/* ─── Dimensiones: cada una resuelve una pregunta contra datos reales ────── */
const DIMENSIONS = {
  presupuesto: {
    icon: Euro,
    reason: "se ajusta a tu presupuesto",
    similarity: (city, scoreMap, value) => {
      if (value === "alto") return 1;
      const target = value === "bajo" ? 9.5 : 6.5;
      const score = scoreMap.coste?.score ?? 5;
      return Math.max(0, 1 - Math.abs(score - target) / 10);
    },
  },
  clima: {
    icon: CloudSun,
    reason: "tiene el clima que buscas",
    similarity: (city, _sm, value) => {
      const bucket = WEATHER_BUCKET[city.weather] ?? 1;
      const target = { calido: 0, templado: 1, frio: 2 }[value];
      return bucket === target ? 1 : 0.3;
    },
  },
  idioma: {
    icon: Languages,
    reason: "encaja con tu idioma preferido",
    similarity: (city, _sm, value) => {
      if (value === "flexible") return 1;
      return city.language.toLowerCase().includes(value) ? 1 : 0.35;
    },
  },
  fiesta: {
    icon: PartyPopper,
    reason: "tiene el nivel de vida social que buscas",
    similarity: (city, scoreMap, value) => {
      const target = { tranquila: 5, equilibrada: 7.5, intensa: 9.5 }[value];
      const score = scoreMap.vida_social?.score ?? 5;
      return Math.max(0, 1 - Math.abs(score - target) / 10);
    },
  },
  tamano: {
    icon: Building2,
    reason: "tiene el tamaño de ciudad que encaja contigo",
    similarity: (city, _sm, value) => {
      const bucket = bucketStudents(city.students);
      const target = { pequena: 0, mediana: 1, grande: 2 }[value];
      return bucketSimilarity(bucket, target);
    },
  },
  naturaleza: {
    icon: Trees,
    reason: "ofrece el contacto con naturaleza que valoras",
    similarity: (city, _sm, value) => {
      const bucket = natureLevel(city);
      const target = { poca: 0, algo: 1, mucha: 2 }[value];
      return bucketSimilarity(bucket, target);
    },
  },
  universidad: {
    icon: GraduationCap,
    reason: "tiene buena proyección académica y laboral",
    similarity: (city, scoreMap, value) => {
      if (value === "secundario") return 1;
      const target = value === "prestigio" ? 9 : 7;
      const score = scoreMap.empleo?.score ?? 5;
      return Math.max(0, 1 - Math.abs(score - target) / 10);
    },
  },
  estilo: {
    icon: Sparkles,
    reason: "tiene una calidad de vida diaria muy alta",
    similarity: (city, scoreMap, value) => {
      if (value === "no-prioridad") return 1;
      const target = value === "top" ? 9.5 : 7.5;
      const score = scoreMap.estilo_vida?.score ?? 5;
      return Math.max(0, 1 - Math.abs(score - target) / 10);
    },
  },
};

/* ─── Preguntas (copy + opciones) ─────────────────────────────────────── */
const QUESTIONS = [
  {
    id: "presupuesto",
    title: "¿Cuál es tu presupuesto mensual?",
    subtitle: "Alojamiento, comida y ocio incluidos",
    options: [
      { value: "bajo", label: "Ajustado", desc: "Hasta 600€/mes" },
      { value: "medio", label: "Medio", desc: "600–900€/mes" },
      { value: "alto", label: "Flexible", desc: "900€+ sin problema" },
    ],
  },
  {
    id: "clima",
    title: "¿Qué clima prefieres?",
    subtitle: "Piensa en cómo vas a vivir el otoño y el invierno",
    options: [
      { value: "calido", label: "Cálido", desc: "Mediterráneo, veranos largos" },
      { value: "templado", label: "Templado", desc: "Estaciones marcadas, sin extremos" },
      { value: "frio", label: "Frío de verdad", desc: "Inviernos duros, me gusta el frío" },
    ],
  },
  {
    id: "idioma",
    title: "¿Qué idioma te gustaría tener cerca?",
    subtitle: "El inglés suele funcionar en todas partes, pero esto ayuda a afinar",
    options: [
      { value: "inglés", label: "Inglés" },
      { value: "alemán", label: "Alemán" },
      { value: "francés", label: "Francés" },
      { value: "italiano", label: "Italiano" },
      { value: "portugués", label: "Portugués" },
      { value: "neerlandés", label: "Neerlandés" },
      { value: "polaco", label: "Polaco" },
      { value: "checo", label: "Checo" },
      { value: "húngaro", label: "Húngaro" },
      { value: "flexible", label: "Me da igual / quiero aprender uno nuevo" },
    ],
  },
  {
    id: "fiesta",
    title: "¿Cuánta marcha quieres que tenga tu ciudad?",
    subtitle: "Vida social, ambiente estudiantil y fiesta",
    options: [
      { value: "tranquila", label: "Tranquila", desc: "Prefiero planes tranquilos" },
      { value: "equilibrada", label: "Equilibrada", desc: "Un poco de todo" },
      { value: "intensa", label: "Intensa", desc: "Quiero fiesta y mucha vida social" },
    ],
  },
  {
    id: "tamano",
    title: "¿Qué tamaño de ciudad universitaria prefieres?",
    subtitle: "Piensa en el ambiente que te gustaría sentir cada día",
    options: [
      { value: "pequena", label: "Pequeña y manejable", desc: "Todo cerca, ritmo tranquilo" },
      { value: "mediana", label: "Mediana", desc: "Equilibrio entre ambiente y tamaño" },
      { value: "grande", label: "Gran capital", desc: "Todo grande, todo pasa allí" },
    ],
  },
  {
    id: "naturaleza",
    title: "¿Cuánto te importa tener naturaleza cerca?",
    subtitle: "Parques, playa, montaña o naturaleza accesible desde la ciudad",
    options: [
      { value: "poca", label: "Poca falta me hace", desc: "Prefiero todo urbano" },
      { value: "algo", label: "Algo estaría bien", desc: "Sin que sea lo principal" },
      { value: "mucha", label: "Es fundamental para mí", desc: "Necesito desconectar en naturaleza" },
    ],
  },
  {
    id: "universidad",
    title: "¿Qué priorizas en lo académico?",
    subtitle: "Prestigio, salidas profesionales o simplemente vivir la experiencia",
    options: [
      { value: "prestigio", label: "Prestigio y salidas laborales", desc: "Quiero que pese en el CV" },
      { value: "equilibrio", label: "Buen equilibrio", desc: "Ni lo más top ni lo más flojo" },
      { value: "secundario", label: "Es secundario", desc: "Prioriza la experiencia sobre lo académico" },
    ],
  },
  {
    id: "estilo",
    title: "¿Cuánto te importa la calidad de vida diaria?",
    subtitle: "Gastronomía, ocio, bienestar y ritmo de vida en general",
    options: [
      { value: "top", label: "Es lo que más me importa", desc: "Quiero vivir muy bien cada día" },
      { value: "media", label: "Me importa, pero no es lo principal" },
      { value: "no-prioridad", label: "No es una prioridad" },
    ],
  },
];

function computeMatch(city, answers) {
  const scoreMap = getScoreMap(city.slug);
  const results = QUESTIONS.map((q) => {
    const value = answers[q.id];
    const dim = DIMENSIONS[q.id];
    const sim = value ? dim.similarity(city, scoreMap, value) : 0.5;
    return { id: q.id, sim, icon: dim.icon, reason: dim.reason };
  });
  const avg = results.reduce((a, r) => a + r.sim, 0) / results.length;
  return { city, percent: Math.round(avg * 100), results };
}

/* ─── Componente principal ────────────────────────────────────────────── */
export default function CityMatchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  useSEO({
    title: "City Match — Encuentra tu ciudad Erasmus ideal | TMate",
    description: "Responde 8 preguntas sobre presupuesto, clima, idioma y estilo de vida, y descubre qué ciudades Erasmus encajan mejor contigo.",
  });

  // Si la URL trae respuestas guardadas (?r=valor-valor-...), restaura
  // directamente la pantalla de resultados — permite compartir/guardar enlace.
  useEffect(() => {
    const encoded = searchParams.get("r");
    if (!encoded) return;
    const values = encoded.split("-");
    const restored = {};
    QUESTIONS.forEach((q, i) => { if (values[i]) restored[q.id] = values[i]; });
    setAnswers(restored);
    setStep(QUESTIONS.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showResults = step >= QUESTIONS.length;

  function selectOption(qId, value) {
    const next = { ...answers, [qId]: value };
    setAnswers(next);
    if (step === QUESTIONS.length - 1) {
      const encoded = QUESTIONS.map((q) => next[q.id] || "x").join("-");
      setSearchParams({ r: encoded }, { replace: true });
      setStep(QUESTIONS.length);
    } else {
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setSearchParams({}, { replace: true });
  }

  const matches = useMemo(() => {
    if (!showResults) return [];
    return CITIES.map((c) => computeMatch(c, answers)).sort((a, b) => b.percent - a.percent);
  }, [showResults, answers]);

  const top = matches.slice(0, 5);

  /* ─── RESULTADOS ────────────────────────────────────────────────────── */
  if (showResults) {
    const compareSlugs = top.slice(0, 3).map((m) => m.city.slug).join(",");

    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.resultsMain}>
          <div className={styles.resultsHero}>
            <div className={styles.resultsHeroBg} />
            <div className={styles.resultsHeroContent}>
              <span className={styles.badge}><Compass size={14} strokeWidth={1.75} /> Tu City Match</span>
              <h1 className={styles.resultsTitle}>Estas son tus ciudades ideales</h1>
              <p className={styles.resultsSubtitle}>
                Calculado a partir de tus 8 respuestas y los datos reales de cada destino.
              </p>
              <div className={styles.resultsActions}>
                <button className={styles.secondaryBtn} onClick={restart}>↺ Volver a hacer el test</button>
                {compareSlugs && (
                  <button className={styles.primaryBtn} onClick={() => navigate(`/comparar?cities=${compareSlugs}`)}>
                    Comparar tu top 3 →
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={styles.resultsBody}>
            {top.map((m, i) => {
              const overall = getOverallScore(m.city.slug);
              const bestReasons = [...m.results].sort((a, b) => b.sim - a.sim).slice(0, 2);
              const weakest = [...m.results].sort((a, b) => a.sim - b.sim)[0];

              return (
                <div key={m.city.slug} className={`${styles.resultCard}${i === 0 ? ` ${styles.resultCardTop}` : ""}`}>
                  <div className={styles.resultRank}>
                    {i < 3
                      ? <Medal size={20} strokeWidth={1.75} color={i === 0 ? "#FFB020" : i === 1 ? "#B4B8C0" : "#C97B4A"} />
                      : `#${i + 1}`}
                  </div>

                  <div className={styles.resultImg} style={{ backgroundImage: `url(${m.city.img})` }}>
                    <div className={styles.resultImgOverlay} />
                  </div>

                  <div className={styles.resultBody}>
                    <div className={styles.resultHead}>
                      <div>
                        <h2 className={styles.resultName}>{m.city.emoji} {m.city.name}</h2>
                        <span className={styles.resultCountry}>{m.city.country} · {overall.toFixed(1)}/10 global</span>
                      </div>
                      <div className={styles.matchBadge}>
                        <span className={styles.matchPercent}>{m.percent}%</span>
                        <span className={styles.matchLabel}>match</span>
                      </div>
                    </div>

                    <div className={styles.matchBar}>
                      <div className={styles.matchBarFill} style={{ width: `${m.percent}%` }} />
                    </div>

                    <ul className={styles.reasonList}>
                      {bestReasons.map((r) => (
                        <li key={r.id}><r.icon size={15} strokeWidth={1.75} className={styles.reasonIcon} /> {m.city.name} {r.reason}</li>
                      ))}
                      {weakest.sim < 0.4 && (
                        <li className={styles.reasonCaveat}><weakest.icon size={15} strokeWidth={1.75} className={styles.reasonIcon} /> Ten en cuenta: aquí es donde menos encaja con lo que buscas</li>
                      )}
                    </ul>

                    <button className={styles.resultBtn} onClick={() => navigate(`/city/${m.city.slug}`)}>
                      Ver guía completa →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ─── CUESTIONARIO ──────────────────────────────────────────────────── */
  const q = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.quizMain}>
        <div className={styles.quizWrap}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressLabel}>Pregunta {step + 1} de {QUESTIONS.length}</span>

          <div className={styles.questionCard}>
            <h1 className={styles.questionTitle}>{q.title}</h1>
            {q.subtitle && <p className={styles.questionSubtitle}>{q.subtitle}</p>}

            <div className={`${styles.optionsGrid}${q.options.length > 4 ? ` ${styles.optionsGridCompact}` : ""}`}>
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`${styles.optionBtn}${answers[q.id] === opt.value ? ` ${styles.optionBtnActive}` : ""}`}
                  onClick={() => selectOption(q.id, opt.value)}
                >
                  <span className={styles.optionLabel}>{opt.label}</span>
                  {opt.desc && <span className={styles.optionDesc}>{opt.desc}</span>}
                </button>
              ))}
            </div>

            {step > 0 && (
              <button className={styles.backLink} onClick={goBack}>← Anterior</button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
