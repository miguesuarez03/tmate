import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useSEO } from "../hooks/useSEO";

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const GROUP1 = [
  "Alemania", "Austria", "Bélgica", "Dinamarca", "Finlandia",
  "Francia", "Irlanda", "Islandia", "Italia", "Liechtenstein",
  "Luxemburgo", "Noruega", "Países Bajos", "Suecia",
];
const GROUP2 = [
  "Chipre", "Chequia", "Eslovaquia", "Eslovenia", "España",
  "Estonia", "Grecia", "Letonia", "Malta", "Portugal",
];
const GROUP3 = [
  "Bulgaria", "Croacia", "Hungría", "Lituania", "Macedonia del Norte",
  "Polonia", "Rumanía", "Serbia", "Turquía",
];

// Travel aid table (official EU Erasmus+ 2024-2025 rates)
const TRAVEL_AID = [
  { range: "10 – 99 km",      standard: 28,   eco: 56   },
  { range: "100 – 499 km",    standard: 211,  eco: 285  },
  { range: "500 – 1.999 km",  standard: 309,  eco: 417  },
  { range: "2.000 – 2.999 km",standard: 395,  eco: 535  },
  { range: "3.000 – 3.999 km",standard: 580,  eco: 785  },
  { range: "4.000 – 7.999 km",standard: 1188, eco: 1188 },
  { range: "8.000 km o más",  standard: 1735, eco: 1735 },
];

// Approximate distance from Spain to typical destinations (for calculator guidance)
const COUNTRY_DISTANCE = {
  "Alemania": "500 – 1.999 km", "Austria": "500 – 1.999 km",
  "Bélgica": "500 – 1.999 km", "Dinamarca": "500 – 1.999 km",
  "Finlandia": "2.000 – 2.999 km", "Francia": "100 – 499 km",
  "Irlanda": "500 – 1.999 km", "Islandia": "2.000 – 2.999 km",
  "Italia": "500 – 1.999 km", "Liechtenstein": "500 – 1.999 km",
  "Luxemburgo": "500 – 1.999 km", "Noruega": "2.000 – 2.999 km",
  "Países Bajos": "500 – 1.999 km", "Suecia": "2.000 – 2.999 km",
  "Chipre": "2.000 – 2.999 km", "Chequia": "500 – 1.999 km",
  "Eslovaquia": "500 – 1.999 km", "Eslovenia": "500 – 1.999 km",
  "España": "100 – 499 km", "Estonia": "2.000 – 2.999 km",
  "Grecia": "500 – 1.999 km", "Letonia": "2.000 – 2.999 km",
  "Malta": "500 – 1.999 km", "Portugal": "100 – 499 km",
  "Bulgaria": "2.000 – 2.999 km", "Croacia": "500 – 1.999 km",
  "Hungría": "500 – 1.999 km", "Lituania": "2.000 – 2.999 km",
  "Macedonia del Norte": "500 – 1.999 km", "Polonia": "500 – 1.999 km",
  "Rumanía": "2.000 – 2.999 km", "Serbia": "500 – 1.999 km",
  "Turquía": "2.000 – 2.999 km",
};

const COMPAT_BECAS = [
  { icon: "📚", name: "Beca MEC", desc: "Compatible al 100%. Puedes cobrar ambas a la vez." },
  { icon: "🏛️", name: "Ayudas autonómicas", desc: "Andalucía, Madrid, Cataluña y otras CCAA ofrecen complementos propios." },
  { icon: "🎓", name: "Becas de tu universidad", desc: "Muchas universidades tienen sus propios fondos de movilidad." },
  { icon: "🏦", name: "Becas privadas", desc: "Ejemplo: Banco Santander u otras entidades privadas." },
];

const CCAA_LIST = [
  "Andalucía", "Comunidad de Madrid", "Cataluña", "Comunidad Valenciana",
  "País Vasco", "Galicia", "Castilla y León", "Aragón",
  "Región de Murcia", "Extremadura", "Castilla-La Mancha", "Canarias", "Baleares",
];

const FAQ = [
  {
    q: "¿Hay que devolver la beca Erasmus?",
    a: "No, salvo que no realices la estancia, la abandones sin justificación válida, no entregues la documentación obligatoria o incumplas las condiciones del programa. Si cumples todo, el dinero es tuyo.",
  },
  {
    q: "¿Cuándo se cobra la beca?",
    a: "Normalmente en dos pagos: el primero entre el inicio de la estancia y los primeros meses, y el segundo al regresar y entregar toda la documentación. Planifica tener un colchón económico para los primeros meses porque el primer pago puede tardar.",
  },
  {
    q: "¿Qué es el complemento de 'menos oportunidades'?",
    a: "Un extra de +250€/mes para estudiantes con beca MEC por criterios económicos, familias numerosas, personas con discapacidad u otros colectivos definidos en cada convocatoria. Consúltalo con tu ORI porque los requisitos exactos varían.",
  },
  {
    q: "¿Qué es Green Travel?",
    a: "Un complemento adicional para estudiantes que viajan en medios de transporte sostenibles: tren, autobús o coche compartido. La cuantía depende de la distancia y la convocatoria.",
  },
  {
    q: "¿Los importes son iguales en todas las universidades?",
    a: "No. La base la pone la UE según el grupo del país de destino, pero cada universidad puede complementarla con fondos propios. Dos estudiantes yendo al mismo país pueden cobrar cantidades distintas.",
  },
];

/* ─── CALCULATOR ─────────────────────────────────────────────────────────── */

function Calculator() {
  const [country, setCountry] = useState("Alemania");
  const [months, setMonths] = useState(5);
  const [menosOport, setMenosOport] = useState(false);
  const [distanceRange, setDistanceRange] = useState("500 – 1.999 km");
  const [eco, setEco] = useState(false);
  const [mec, setMec] = useState(false);
  const [aut, setAut] = useState(false);
  const [autAmount, setAutAmount] = useState(150);

  // Auto-suggest distance when country changes
  const handleCountryChange = (c) => {
    setCountry(c);
    if (COUNTRY_DISTANCE[c]) setDistanceRange(COUNTRY_DISTANCE[c]);
  };

  const group = GROUP1.includes(country) ? 1 : GROUP2.includes(country) ? 2 : 3;
  const baseRate = group === 1 ? 350 : group === 2 ? 300 : 250;
  const complemento = menosOport ? 250 : 0;
  const monthly = baseRate + complemento;
  const erasmusTotal = monthly * months;

  const travelRow = TRAVEL_AID.find(r => r.range === distanceRange) || TRAVEL_AID[2];
  const travelBonus = eco ? travelRow.eco : travelRow.standard;

  const mecEstimate = mec ? 600 : 0;
  const autEstimate = aut ? autAmount * months : 0;

  const total = erasmusTotal + travelBonus + mecEstimate + autEstimate;

  return (
    <div className="beca-calc">
      <h3 className="beca-calc__title">🧮 Calcula cuánto podrías cobrar</h3>
      <p className="beca-calc__subtitle">Estimación orientativa — las cuantías exactas las confirma tu universidad</p>

      <div className="beca-calc__grid">
        {/* Left: inputs */}
        <div className="beca-calc__inputs">
          <div className="beca-calc__field">
            <label className="beca-calc__label">País de destino</label>
            <select
              className="beca-calc__select"
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              <optgroup label="Grupo 1 — Coste alto (350€/mes)">
                {GROUP1.map((c) => <option key={c}>{c}</option>)}
              </optgroup>
              <optgroup label="Grupo 2 — Coste medio (300€/mes)">
                {GROUP2.map((c) => <option key={c}>{c}</option>)}
              </optgroup>
              <optgroup label="Grupo 3 — Coste bajo (250€/mes)">
                {GROUP3.map((c) => <option key={c}>{c}</option>)}
              </optgroup>
            </select>
          </div>

          <div className="beca-calc__field">
            <label className="beca-calc__label">Duración de la estancia</label>
            <div className="beca-calc__slider-row">
              <input
                type="range" min={1} max={12} value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="beca-calc__slider"
              />
              <span className="beca-calc__slider-val">{months} meses</span>
            </div>
          </div>

          <div className="beca-calc__field">
            <label className="beca-calc__label">✈️ Ayuda de viaje — distancia aproximada</label>
            <select
              className="beca-calc__select"
              value={distanceRange}
              onChange={(e) => setDistanceRange(e.target.value)}
            >
              {TRAVEL_AID.map(r => (
                <option key={r.range} value={r.range}>
                  {r.range} — {eco ? r.eco : r.standard}€
                </option>
              ))}
            </select>
            <label className="beca-calc__check" style={{ marginTop: 8 }}>
              <input type="checkbox" checked={eco} onChange={(e) => setEco(e.target.checked)} />
              <span>🌿 Viaje ecológico (tren/bus/coche compartido) — importes más altos</span>
            </label>
          </div>

          <div className="beca-calc__field">
            <label className="beca-calc__label">Otros complementos</label>
            <div className="beca-calc__checks">
              <label className="beca-calc__check">
                <input type="checkbox" checked={menosOport} onChange={(e) => setMenosOport(e.target.checked)} />
                <span>Complemento de menos oportunidades (+250€/mes)</span>
              </label>
              <label className="beca-calc__check">
                <input type="checkbox" checked={mec} onChange={(e) => setMec(e.target.checked)} />
                <span>Beca MEC (estimación ~600€/año)</span>
              </label>
              <label className="beca-calc__check">
                <input type="checkbox" checked={aut} onChange={(e) => setAut(e.target.checked)} />
                <span>Ayuda autonómica</span>
              </label>
              {aut && (
                <div className="beca-calc__sub-field">
                  <label className="beca-calc__label">¿Cuánto al mes?</label>
                  <div className="beca-calc__slider-row">
                    <input
                      type="range" min={50} max={500} step={10} value={autAmount}
                      onChange={(e) => setAutAmount(Number(e.target.value))}
                      className="beca-calc__slider"
                    />
                    <span className="beca-calc__slider-val">{autAmount}€</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: result */}
        <div className="beca-calc__result">
          <div className="beca-calc__result-card">
            <div className="beca-calc__result-group">
              <span className="beca-calc__result-label">País</span>
              <span className="beca-calc__result-val">{country} — Grupo {group}</span>
            </div>
            <div className="beca-calc__result-group">
              <span className="beca-calc__result-label">Erasmus base ({months} meses)</span>
              <span className="beca-calc__result-val">{baseRate}€ × {months} = <strong>{baseRate * months}€</strong></span>
            </div>
            {menosOport && (
              <div className="beca-calc__result-group">
                <span className="beca-calc__result-label">Complemento menos oportunidades</span>
                <span className="beca-calc__result-val">+250€ × {months} = <strong>+{250 * months}€</strong></span>
              </div>
            )}
            <div className="beca-calc__result-group">
              <span className="beca-calc__result-label">Ayuda de viaje ({distanceRange}){eco ? " 🌿" : ""}</span>
              <span className="beca-calc__result-val"><strong>+{travelBonus}€</strong> (pago único)</span>
            </div>
            {mec && (
              <div className="beca-calc__result-group">
                <span className="beca-calc__result-label">Beca MEC</span>
                <span className="beca-calc__result-val"><strong>+~600€</strong> (estimado anual)</span>
              </div>
            )}
            {aut && (
              <div className="beca-calc__result-group">
                <span className="beca-calc__result-label">Ayuda autonómica</span>
                <span className="beca-calc__result-val">{autAmount}€ × {months} = <strong>+{autEstimate}€</strong></span>
              </div>
            )}

            <div className="beca-calc__divider" />

            <div className="beca-calc__total">
              <span className="beca-calc__total-label">Total estimado</span>
              <span className="beca-calc__total-val">{total.toLocaleString("es-ES")}€</span>
              <span className="beca-calc__total-monthly">({Math.round(total / months).toLocaleString("es-ES")}€/mes de media)</span>
            </div>

            <p className="beca-calc__disclaimer">
              ⚠️ Estimación orientativa. Los importes reales los confirma tu universidad y pueden variar según convocatoria y comunidad autónoma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ ITEM ───────────────────────────────────────────────────────────── */

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`beca-faq-item ${open ? "beca-faq-item--open" : ""}`}>
      <button className="beca-faq-item__q" onClick={() => setOpen((v) => !v)}>
        <span>{item.q}</span>
        <span className="beca-faq-item__arrow">{open ? "▲" : "▼"}</span>
      </button>
      {open && <p className="beca-faq-item__a">{item.a}</p>}
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default function BecaErasmusPage() {
  const navigate = useNavigate();

  useSEO({
    title: "Beca Erasmus+: cuánto se cobra y cómo funciona | TMate",
    description: "Guía completa de la beca Erasmus+ para estudiantes españoles: importes por país, complementos, compatibilidad con MEC y estimador de cuánto cobrarías.",
  });

  return (
    <div className="beca-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="proceso-hero">
        <div className="proceso-hero__bg" />
        <div className="proceso-hero__img proceso-hero__img--beca" />
        <div className="proceso-hero__content">
          <button className="proceso-back" onClick={() => navigate("/")}>
            ← Volver al inicio
          </button>
          <SectionLabel color="#14B8A6">Guía de ayudas</SectionLabel>
          <h1 className="proceso-hero__title">
            La beca Erasmus+<br />
            <span className="proceso-hero__title-accent">explicada sin rodeos</span>
          </h1>
          <p className="proceso-hero__subtitle">
            Cuánto cobras, cómo se calcula y cómo exprimir al máximo todas las ayudas disponibles.
          </p>
          <div className="proceso-hero__stats">
            <div className="proceso-hero__stat">
              <span className="proceso-hero__stat-val">250–350€</span>
              <span className="proceso-hero__stat-label">Base mensual</span>
            </div>
            <div className="proceso-hero__stat">
              <span className="proceso-hero__stat-val">+250€</span>
              <span className="proceso-hero__stat-label">Complemento posible</span>
            </div>
            <div className="proceso-hero__stat">
              <span className="proceso-hero__stat-val">100%</span>
              <span className="proceso-hero__stat-label">Compatible con MEC</span>
            </div>
          </div>
        </div>
      </section>

      <div className="beca-body">

        {/* ── ¿QUÉ ES? ── */}
        <section className="beca-section">
          <SectionLabel>Qué es</SectionLabel>
          <h2 className="beca-section__title">¿Qué es la beca Erasmus+?</h2>
          <div className="beca-intro-grid">
            <div className="beca-intro-text">
              <p>
                La beca Erasmus+ es una <strong>ayuda económica de la Unión Europea</strong> que facilita que estudiantes universitarios realicen parte de sus estudios en otro país europeo.
              </p>
              <p>
                Su objetivo <strong>no es cubrir todos los gastos</strong> de la estancia, sino ayudar a compensar el coste adicional de vivir en el extranjero. Tendrás que aportar dinero propio o de tu familia, pero la beca reduce significativamente la diferencia.
              </p>
              <p>
                La buena noticia es que es <strong>compatible con otras becas</strong> — puedes cobrar la Erasmus junto con la MEC, ayudas autonómicas y becas de tu propia universidad al mismo tiempo.
              </p>
            </div>
            <div className="beca-intro-callout">
              <span className="beca-intro-callout__icon">💡</span>
              <p>La beca <strong>no tienes que devolverla</strong> si cumples las condiciones. Es una ayuda, no un préstamo.</p>
            </div>
          </div>
        </section>

        {/* ── GRUPOS / IMPORTES ── */}
        <section className="beca-section beca-section--dark">
          <SectionLabel color="#14B8A6">Importes base</SectionLabel>
          <h2 className="beca-section__title beca-section__title--light">Ayuda base según el país de destino</h2>
          <p className="beca-section__subtitle beca-section__subtitle--light">
            Los países Erasmus se dividen en tres grupos según el coste de vida. Tu mensualidad depende del grupo al que pertenezca tu destino.
          </p>

          <div className="beca-groups">
            {/* Grupo 1 */}
            <div className="beca-group beca-group--1">
              <div className="beca-group__header">
                <span className="beca-group__badge">Grupo 1</span>
                <span className="beca-group__label">Coste de vida alto</span>
                <span className="beca-group__amount">350€<span>/mes</span></span>
              </div>
              <div className="beca-group__countries">
                {GROUP1.map((c) => <span key={c} className="beca-group__country">{c}</span>)}
              </div>
            </div>

            {/* Grupo 2 */}
            <div className="beca-group beca-group--2">
              <div className="beca-group__header">
                <span className="beca-group__badge">Grupo 2</span>
                <span className="beca-group__label">Coste de vida medio</span>
                <span className="beca-group__amount">300€<span>/mes</span></span>
              </div>
              <div className="beca-group__countries">
                {GROUP2.map((c) => <span key={c} className="beca-group__country">{c}</span>)}
              </div>
            </div>

            {/* Grupo 3 */}
            <div className="beca-group beca-group--3">
              <div className="beca-group__header">
                <span className="beca-group__badge">Grupo 3</span>
                <span className="beca-group__label">Coste de vida bajo</span>
                <span className="beca-group__amount">250€<span>/mes</span></span>
              </div>
              <div className="beca-group__countries">
                {GROUP3.map((c) => <span key={c} className="beca-group__country">{c}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPLEMENTOS ── */}
        <section className="beca-section">
          <SectionLabel>Extras</SectionLabel>
          <h2 className="beca-section__title">Complementos que pueden aumentar tu beca</h2>

          <div className="beca-extras-grid">
            {/* Menos oportunidades */}
            <div className="beca-extra-card">
              <div className="beca-extra-card__icon">💚</div>
              <h3 className="beca-extra-card__title">Complemento de menos oportunidades</h3>
              <div className="beca-extra-card__amount">+250€/mes</div>
              <p className="beca-extra-card__desc">
                Para estudiantes de colectivos con menos oportunidades: beneficiarios de beca MEC por criterios económicos, familias numerosas, personas con discapacidad, personas refugiadas u otros colectivos definidos en cada convocatoria.
              </p>
              <div className="beca-extra-card__examples">
                <strong>Ejemplos con complemento:</strong>
                <ul>
                  <li>🇩🇪 Alemania: 350 + 250 = <strong>600€/mes</strong></li>
                  <li>🇵🇹 Portugal: 300 + 250 = <strong>550€/mes</strong></li>
                  <li>🇵🇱 Polonia: 250 + 250 = <strong>500€/mes</strong></li>
                </ul>
              </div>
            </div>

            {/* Discapacidad */}
            <div className="beca-extra-card">
              <div className="beca-extra-card__icon">♿</div>
              <h3 className="beca-extra-card__title">Ayudas para estudiantes con discapacidad</h3>
              <div className="beca-extra-card__amount">Según costes reales</div>
              <p className="beca-extra-card__desc">
                Además del complemento anterior, los estudiantes con discapacidad o necesidades especiales pueden solicitar financiación adicional para gastos específicos relacionados con su movilidad:
              </p>
              <ul className="beca-extra-card__list">
                <li>Asistencia personal</li>
                <li>Transporte adaptado</li>
                <li>Alojamiento adaptado</li>
                <li>Material técnico o especializado</li>
                <li>Otros gastos justificados</li>
              </ul>
            </div>

            {/* Green Travel */}
            <div className="beca-extra-card">
              <div className="beca-extra-card__icon">🌿</div>
              <h3 className="beca-extra-card__title">Ayuda de viaje + Green Travel</h3>
              <div className="beca-extra-card__amount">28€ – 1.735€</div>
              <p className="beca-extra-card__desc">
                Desde 2024-25, <strong>todos los estudiantes Erasmus</strong> reciben una ayuda única de desplazamiento. La cuantía depende de la distancia entre tu universidad de origen y la de destino, calculada con la herramienta oficial de la Comisión Europea.
              </p>
              <p className="beca-extra-card__desc">
                Si viajas en <strong>tren, autobús o coche compartido</strong> (Green Travel), los importes son más altos. No necesitas aportar facturas.
              </p>
            </div>
          </div>

          {/* Travel aid full table */}
          <div className="beca-travel-table-wrap">
            <h3 className="beca-travel-table__title">Tabla completa de ayuda de viaje (2024–2025)</h3>
            <p className="beca-travel-table__subtitle">Pago único al inicio de la estancia. La distancia la calcula tu universidad con la <strong>calculadora oficial de la UE</strong>.</p>
            <div className="beca-travel-table">
              <div className="beca-travel-table__header">
                <span>Distancia</span>
                <span>Viaje estándar</span>
                <span>🌿 Viaje ecológico</span>
              </div>
              {TRAVEL_AID.map((row) => (
                <div key={row.range} className="beca-travel-table__row">
                  <span className="beca-travel-table__range">{row.range}</span>
                  <span className="beca-travel-table__val">{row.standard}€</span>
                  <span className="beca-travel-table__val beca-travel-table__val--eco">{row.eco}€</span>
                </div>
              ))}
            </div>
            <p className="beca-travel-table__note">
              🇪🇺 Fuente: tarifas oficiales Erasmus+ KA131 2024-2025 (SEPIE / Comisión Europea). A partir de 4.000 km el importe es el mismo independientemente del tipo de transporte.
            </p>
          </div>
        </section>

        {/* ── CALCULADORA ── */}
        <section className="beca-section beca-section--light">
          <Calculator />
        </section>

        {/* ── COMPATIBILIDAD ── */}
        <section className="beca-section">
          <SectionLabel>Compatibilidad</SectionLabel>
          <h2 className="beca-section__title">Compatible con otras becas</h2>
          <p className="beca-section__subtitle">
            La beca Erasmus+ se puede cobrar al mismo tiempo que estas ayudas. Puedes acumularlas todas si cumples los requisitos de cada una.
          </p>

          <div className="beca-compat-grid">
            {COMPAT_BECAS.map((b) => (
              <div key={b.name} className="beca-compat-card">
                <span className="beca-compat-card__icon">{b.icon}</span>
                <div>
                  <strong className="beca-compat-card__name">{b.name}</strong>
                  <p className="beca-compat-card__desc">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="beca-ccaa-section">
            <h3 className="beca-ccaa-section__title">Comunidades autónomas con ayudas propias</h3>
            <p className="beca-ccaa-section__desc">
              Estas CCAA han ofrecido históricamente ayudas complementarias a la beca Erasmus. Las cuantías y requisitos cambian cada curso — consulta siempre la convocatoria vigente en tu región.
            </p>
            <div className="beca-ccaa-pills">
              {CCAA_LIST.map((c) => (
                <span key={c} className="beca-ccaa-pill">{c}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="beca-section beca-section--light">
          <SectionLabel>Dudas frecuentes</SectionLabel>
          <h2 className="beca-section__title">Preguntas frecuentes</h2>

          <div className="beca-faq">
            {FAQ.map((item, i) => (
              <FaqItem key={i} item={item} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="proceso-cta">
          <h2 className="proceso-cta__title">¿Tienes claro cuánto cobrarás?</h2>
          <p className="proceso-cta__subtitle">
            Ahora elige el destino perfecto. Compara ciudades con scores reales de estudiantes que ya estuvieron ahí.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => navigate("/")}>
              Explorar destinos →
            </button>
            <button className="btn-ghost" onClick={() => navigate("/proceso")}>
              ¿Cómo funciona el Erasmus?
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
