import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, ClipboardList, Mail, CheckCircle2, Landmark as LandmarkIcon, Briefcase, PartyPopper, Home,
  Lightbulb, PenLine, Hourglass, Plane, Stethoscope, ShieldCheck, FileText, FolderOpen,
  GraduationCap, BarChart3,
} from "lucide-react";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useSEO } from "../hooks/useSEO";

/* ─── Prefijos de emoji → icono Lucide, usados en content/shortContent ──── */
const PREFIX_ICONS = [
  ["✅ ", CheckCircle2],
  ["⏳ ", Hourglass],
  ["⚠️ ", ShieldCheck],
  ["💡 ", Lightbulb],
  ["🏠 ", Home],
  ["✈️ ", Plane],
  ["🩺 ", Stethoscope],
  ["🛡️ ", ShieldCheck],
  ["📄 ", FileText],
  ["📁 ", FolderOpen],
  ["📋 ", ClipboardList],
  ["🎓 ", GraduationCap],
  ["📝 ", PenLine],
  ["🏦 ", LandmarkIcon],
  ["📊 ", BarChart3],
];

function findPrefixIcon(line) {
  return PREFIX_ICONS.find(([prefix]) => line.startsWith(prefix));
}

// Renderiza texto largo (content / urgencyAlert.body) línea a línea,
// sustituyendo los prefijos de emoji por iconos Lucide.
function IconText({ text, as: Tag = "p", className }) {
  return (
    <>
      {text.split("\n").map((line, i) => {
        const match = findPrefixIcon(line);
        if (match) {
          const [prefix, Icon] = match;
          return (
            <Tag key={i} className={className}>
              <Icon size={15} strokeWidth={1.75} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />
              {line.slice(prefix.length)}
            </Tag>
          );
        }
        return line ? <Tag key={i} className={className}>{line}</Tag> : <br key={i} />;
      })}
    </>
  );
}

// Renderiza una línea corta (shortContent), sustituyendo el prefijo si existe.
function IconLine({ line }) {
  const match = findPrefixIcon(line);
  if (!match) return <>{line}</>;
  const [prefix, Icon] = match;
  return (
    <>
      <Icon size={14} strokeWidth={1.75} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} />
      {line.slice(prefix.length)}
    </>
  );
}

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    num: "01",
    emoji: Search,
    title: "Elige tu destino",
    color: "#0EA5E9",
    tag: "Preparación",
    content: `Tómate en serio la elección — no vas a vivir solo en una ciudad bonita, vas a vivir allí varios meses. Lo que de verdad importa:

· Tu nota media y créditos — suelen decidir el orden de adjudicación de plazas
· El idioma exigido — comprueba si necesitas certificado
· Las asignaturas disponibles para convalidar
· El coste real de vida: alquiler, comida, transporte y ocio

Visita cuanto antes la ORI de tu facultad: tienen el listado de universidades con convenio, requisitos y plazos exactos. Llegar tarde a informarte es el error más común.`,
    note: "Usa TMate para comparar ciudades con scores reales de estudiantes que ya estuvieron ahí. Es exactamente para esto.",
    shortContent: [
      "Elige bien: no es solo una ciudad bonita, es donde vas a vivir meses.",
      "Tu nota media decide el orden de adjudicación de plazas.",
      "Comprueba el idioma exigido y si necesitas certificado.",
      "Mira qué asignaturas puedes convalidar de verdad.",
      "Visita tu ORI cuanto antes — tienen plazos y requisitos exactos.",
    ],
    languages: [
      { lang: "Inglés", cert: "Cambridge B2 / IELTS / TOEFL", note: "Vale para casi todos los países" },
      { lang: "Alemán", cert: "Goethe B1/B2", note: "Obligatorio en Alemania y Austria" },
      { lang: "Francés", cert: "DELF B1/B2", note: "Francia, Bélgica y parte de Suiza" },
      { lang: "Italiano", cert: "CELI / CILS B1", note: "Muchos programas no lo exigen" },
      { lang: "Portugués", cert: "CAPLE B1", note: "Nivel relativamente accesible" },
    ],
  },
  {
    num: "02",
    emoji: ClipboardList,
    title: "Solicita en tu universidad",
    color: "#14B8A6",
    tag: "Solicitud",
    content: `Tu universidad abre un plazo oficial (normalmente entre octubre y febrero) en el que debes:

· Entrar en la plataforma interna de movilidad
· Ordenar tus destinos por preferencia (suele pedirse entre 3 y 5)
· Adjuntar expediente, certificado de idioma y carta de motivación

Después toca esperar: la resolución suele tardar entre 2 y 6 semanas.`,
    tip: "💡 Ordena las preferencias con cabeza. No pongas una ciudad de número 1 solo porque suena bien — compara scores reales en TMate antes de decidir.",
    shortContent: [
      "Tu uni abre el plazo entre octubre y febrero.",
      "Ordena tus destinos por preferencia (3–5 opciones).",
      "Adjunta expediente, certificado de idioma y carta de motivación.",
      "La resolución tarda entre 2 y 6 semanas.",
      "⚠️ Empieza a mirar piso y vuelos ya, aunque no sepas si te aceptan.",
    ],
    urgencyAlert: {
      title: "⚠️ Empieza a mirar pisos y vuelos ahora — aunque todavía no sepas si te aceptan",
      body: "Los alojamientos cerca de universidades con mucha demanda Erasmus se van en semanas. Cuando llegue la confirmación puede ser tarde para encontrar algo decente.\n\nEs tu responsabilidad buscar, reservar y pagar; nadie te lo gestiona. Cuanto antes empieces, más opciones y mejores precios. Explora ya grupos de Facebook de la ciudad, plataformas locales y residencias universitarias.",
    },
  },
  {
    num: "03",
    emoji: Mail,
    title: "Resolución: aceptado o lista de espera",
    color: "#8B5CF6",
    tag: "Resolución",
    content: `Llega el email con la resolución. Dos escenarios:

✅ Aceptado en uno de tus destinos — pasa directo al paso 4.

⏳ Lista de espera — no todo está perdido: algunas universidades permiten esperar a que salga plaza, otras cierran el proceso para esta convocatoria, y en algunos casos puedes cambiar tu orden de preferencias.

Lo importante: mantén contacto con tu ORI y responde rápido si te ofrecen plaza. Los plazos son muy cortos.`,
    shortContent: [
      "✅ Aceptado: pasa directo al paso 4.",
      "⏳ Lista de espera: algunas unis permiten esperar a que salga plaza.",
      "Otras cierran el proceso para esta convocatoria.",
      "Mantén contacto con tu ORI y responde rápido a cualquier oferta.",
    ],
  },
  {
    num: "04",
    emoji: CheckCircle2,
    title: "Acepta la plaza formalmente",
    color: "#F59E0B",
    tag: "Aceptación",
    content: `Al aceptar tu plaza, tu universidad de origen:

· Comunica oficialmente tu nominación a la universidad de destino
· Te envía documentación a firmar (acuerdo bilateral, carta de compromiso)
· Empieza a gestionar tu beca Erasmus+

La beca ronda los 300–500€/mes según país y universidad, pero el primer pago puede tardar semanas o meses — ten un colchón económico para los primeros meses, porque nadie lo adelanta.

Si aún no has buscado piso ni vuelos, hazlo ahora sin falta.`,
    shortContent: [
      "Tu uni comunica tu nominación a la universidad de destino.",
      "Te envía documentos a firmar (acuerdo bilateral, carta de compromiso).",
      "Empieza la gestión de la beca Erasmus+ (300–500€/mes aprox).",
      "El primer pago puede tardar — ten un colchón económico.",
    ],
  },
  {
    num: "05",
    emoji: LandmarkIcon,
    title: "La universidad de destino te contacta",
    color: "#EC4899",
    tag: "Nominación",
    content: `La universidad de destino recibe tu nominación y te manda un email oficial — léelo con atención y apunta todas las fechas. Suele incluir:

· Instrucciones para registrarte en su plataforma
· Documentación a subir y fechas límite (más estrictas de lo que parece)
· Información sobre matrícula y orientación Erasmus

Crea la cuenta cuanto antes y sube la documentación sin esperar al último día: las universidades extranjeras no suelen dar segundas oportunidades.`,
    tip: "💡 En esta fase arranca también el Learning Agreement — el contrato académico de tus asignaturas. Tenemos una guía completa para hacerlo bien.",
    laLink: true,
    shortContent: [
      "La universidad de destino te manda un email oficial clave.",
      "Regístrate en su plataforma y sube documentación pronto.",
      "Apunta bien todas las fechas límite — son estrictas.",
      "Aquí arranca también el Learning Agreement.",
    ],
  },
  {
    num: "06",
    emoji: Briefcase,
    title: "Prepara la partida",
    color: "#10B981",
    tag: "Pre-partida",
    content: `Esta fase tiene más papeleo del que parece. Organízate con tiempo:

🏠 Piso — si no lo tienes, es urgente. Busca en grupos de Facebook de la ciudad, en la web de la universidad (algunas ofrecen residencias Erasmus) y pregunta a quien ya estuvo allí. Los mejores pisos vuelan semanas antes del curso.

✈️ Vuelos — reserva con antelación, cuanto antes más barato. La beca puede no haber llegado aún cuando toque pagar.

🩺 Tarjeta Sanitaria Europea (TSE) — gratuita, cubre atención médica básica en la UE. Pídela en la Seguridad Social con al menos 15 días de antelación. Es obligatoria.

🛡️ Seguro complementario — muchas universidades lo exigen además de la TSE, para cubrir repatriación y gastos extra. Es barato y no opcional si tu uni lo pide.

📄 Firma electrónica — algunas universidades la requieren para sus trámites. Actívala con tiempo si la necesitas.

📁 Documentos en la nube — DNI/pasaporte, seguro, matrícula, Learning Agreement, datos bancarios. Lo agradecerás si pierdes algo allí.`,
    shortContent: [
      "🏠 Piso — búscalo ya, los buenos vuelan semanas antes.",
      "✈️ Vuelos — cuanto antes reserves, más barato.",
      "🩺 Tarjeta Sanitaria Europea — gratis, pídela con 15 días.",
      "🛡️ Seguro complementario — muchas unis lo exigen.",
      "📁 Sube todos tus documentos a la nube por si acaso.",
    ],
  },
  {
    num: "07",
    emoji: PartyPopper,
    title: "Llegada y primeros días",
    color: "#F97316",
    tag: "Llegada",
    content: `Ya estás ahí, pero quedan trámites importantes:

📋 Certificado de llegada — uno de los documentos más críticos. Lo firma tu coordinador Erasmus de destino y debes enviarlo a tu ORI en España; sin él no cobras la beca. Consíguelo en los primeros días.

🎓 Orientación Erasmus — casi todas las universidades hacen una sesión de bienvenida los primeros días. Ve sin falta: te lo explican todo y conoces a otros Erasmus.

📝 Cambios en el Learning Agreement — si alguna asignatura no encaja, hay un plazo corto (primeras semanas) para modificarlo.

🏦 Cuenta bancaria local — en algunos países conviene abrirla para evitar comisiones.`,
    shortContent: [
      "📋 Certificado de llegada — sin él no cobras la beca. Consíguelo ya.",
      "🎓 Ve a la orientación Erasmus, te explican todo.",
      "📝 Hay un plazo corto para cambiar el Learning Agreement.",
      "🏦 Plantéate abrir cuenta bancaria local si conviene.",
    ],
  },
  {
    num: "08",
    emoji: Home,
    title: "Vuelta y cierre",
    color: "#6366F1",
    tag: "Fin de estancia",
    content: `El Erasmus no termina al coger el avión de vuelta. Queda por hacer:

📋 Certificado de salida — lo firma la universidad de destino, igual que el de llegada. Obligatorio para cerrar la beca: no te vayas sin él.

📊 Encuesta de la UE — la Comisión Europea te la envía por email; es obligatoria para haber recibido la beca.

📄 Informe final — tu universidad de origen puede pedirte una memoria de la estancia; consulta el formato con tu ORI.

🎓 Convalidaciones — entrega la documentación a tu coordinador de grado. El certificado de notas de destino es el documento clave; puede tardar un par de meses en reflejarse, es normal.`,
    shortContent: [
      "📋 Certificado de salida — obligatorio para cerrar la beca.",
      "📊 Rellena la encuesta de la UE, es obligatoria.",
      "📄 Puede que tu uni te pida un informe final.",
      "🎓 Entrega la documentación para tramitar convalidaciones.",
    ],
  },
];

/* ─── COMPONENTS ─────────────────────────────────────────────────────────── */

function ProgressBar({ currentStep, total }) {
  return (
    <div className="proceso-progress">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`proceso-progress__dot ${i < currentStep ? "proceso-progress__dot--done" : ""} ${i === currentStep ? "proceso-progress__dot--active" : ""}`}
        />
      ))}
      <div className="proceso-progress__line">
        <div
          className="proceso-progress__fill"
          style={{ width: `${(currentStep / (total - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

function StepCard({ step, isActive, onClick }) {
  return (
    <button
      className={`proceso-step-pill ${isActive ? "proceso-step-pill--active" : ""}`}
      onClick={onClick}
      style={{ "--step-color": step.color }}
    >
      <span className="proceso-step-pill__num">{step.num}</span>
      <span className="proceso-step-pill__emoji"><step.emoji size={18} strokeWidth={1.75} /></span>
      <span className="proceso-step-pill__label">{step.tag}</span>
    </button>
  );
}

function StepDetail({ step }) {
  const navigate = useNavigate();

  return (
    <div className="proceso-detail" style={{ "--step-color": step.color }}>
      {/* Header */}
      <div className="proceso-detail__header">
        <span className="proceso-detail__num">{step.num}</span>
        <div className="proceso-detail__tag" style={{ background: step.color + "22", color: step.color }}>
          {step.tag}
        </div>
      </div>

      <h2 className="proceso-detail__title">
        <span style={{ marginRight: 12, display: "inline-flex", verticalAlign: "-6px" }}><step.emoji size={30} strokeWidth={1.75} color={step.color} /></span>
        {step.title}
      </h2>

      <div className="proceso-detail__content">
        <IconText text={step.content} />
      </div>

      {/* Languages table for step 01 */}
      {step.languages && (
        <div className="proceso-langs">
          <h4 className="proceso-langs__title">Idiomas y certificados habituales</h4>
          <p className="proceso-langs__disclaimer">
            Cada universidad fija sus propios requisitos de idioma — consulta siempre con tu ORI o coordinador antes de dar nada por hecho.
          </p>
          <div className="proceso-langs__grid">
            {step.languages.map((l) => (
              <div key={l.lang} className="proceso-lang-card">
                <span className="proceso-lang-card__lang">{l.lang}</span>
                <span className="proceso-lang-card__cert">{l.cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Note box */}
      {step.note && (
        <div className="proceso-note">
          <span style={{ display: "flex", color: step.color }}><Lightbulb size={20} strokeWidth={1.75} /></span>
          <p>{step.note}</p>
        </div>
      )}

      {/* Tip box */}
      {step.tip && !step.laLink && (
        <div className="proceso-tip">
          <p><IconLine line={step.tip} /></p>
        </div>
      )}

      {/* LA link tip */}
      {step.laLink && (
        <div className="proceso-la-callout">
          <div className="proceso-la-callout__icon"><PenLine size={22} strokeWidth={1.75} /></div>
          <div className="proceso-la-callout__body">
            <p className="proceso-la-callout__text">
              En esta fase arranca el <strong>Learning Agreement</strong> — el contrato académico más importante de todo el proceso. Define qué asignaturas cursarás y cómo se convalidarán.
            </p>
            <button
              className="proceso-la-callout__btn"
              onClick={() => navigate("/learning-agreement")}
            >
              Guía completa del Learning Agreement →
            </button>
          </div>
        </div>
      )}

      {/* Urgency alert for step 02 */}
      {step.urgencyAlert && (
        <div className="proceso-urgency">
          <div className="proceso-urgency__title"><IconLine line={step.urgencyAlert.title} /></div>
          <div className="proceso-urgency__body">
            <IconText text={step.urgencyAlert.body} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── MOBILE STORIES VIEW ───────────────────────────────────────── */
function MobileStories({ steps, navigate }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const step = steps[active];

  function goNext() { setActive((i) => Math.min(i + 1, steps.length - 1)); }
  function goPrev() { setActive((i) => Math.max(i - 1, 0)); }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }
  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (dy > 30) { touchStartX.current = null; return; } // ignore vertical scrolls
    if (dx < -40) goNext();
    else if (dx > 40) goPrev();
    touchStartX.current = null;
  }

  return (
    <div className="proceso-stories">
      {/* Progress dots */}
      <div className="proceso-stories__dots">
        {steps.map((s, i) => (
          <button
            key={s.num}
            type="button"
            className={`proceso-stories__dot ${i === active ? "proceso-stories__dot--active" : i < active ? "proceso-stories__dot--done" : ""}`}
            style={i === active || i < active ? { "--dot-color": s.color } : {}}
            onClick={() => setActive(i)}
            aria-label={`Ir al paso ${i + 1}: ${s.tag}`}
          />
        ))}
      </div>

      {/* Card */}
      <div
        className="proceso-stories__card"
        style={{ "--step-color": step.color }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top bar with color */}
        <div className="proceso-stories__top-bar" style={{ background: step.color }} />

        <div className="proceso-stories__header">
          <span className="proceso-stories__num">{step.num}</span>
          <div className="proceso-stories__tag" style={{ background: step.color + "22", color: step.color }}>
            {step.tag}
          </div>
        </div>

        <h2 className="proceso-stories__title">
          <span style={{ marginRight: 8, display: "inline-flex", verticalAlign: "-4px" }}><step.emoji size={22} strokeWidth={1.75} color={step.color} /></span>
          {step.title}
        </h2>

        <ul className="proceso-stories__list">
          {(step.shortContent || []).map((line, i) => (
            <li key={i}><IconLine line={line} /></li>
          ))}
        </ul>

        {step.laLink && (
          <button
            className="proceso-la-callout__btn"
            style={{ marginTop: 8 }}
            onClick={() => navigate("/learning-agreement")}
          >
            Guía del Learning Agreement →
          </button>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="proceso-stories__nav-bar">
        <button
          type="button"
          className="proceso-stories__nav-btn proceso-stories__nav-btn--prev"
          onClick={goPrev}
          disabled={active === 0}
        >
          ← Anterior
        </button>
        <span className="proceso-stories__counter">{active + 1} / {steps.length}</span>
        <button
          type="button"
          className="proceso-stories__nav-btn proceso-stories__nav-btn--next"
          onClick={goNext}
          disabled={active === steps.length - 1}
          style={{ color: step.color, borderColor: step.color }}
        >
          Siguiente →
        </button>
      </div>

      {/* Swipe hint solo en primer paso */}
      {active === 0 && (
        <p className="proceso-stories__swipe-hint">← Desliza para navegar →</p>
      )}
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default function ProcesoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const detailRef = useRef(null);

  useSEO({
    title: "¿Cómo funciona el Erasmus? — Guía completa paso a paso | TMate",
    description: "Todo el proceso Erasmus explicado en 8 pasos: desde elegir destino hasta volver a casa. Guía práctica y honesta para estudiantes.",
  });

  const handleStepClick = (i) => {
    setActiveStep(i);
    if (window.innerWidth < 768 && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="proceso-page">
      <Navbar />

      {/* Hero */}
      <section className="proceso-hero">
        <div className="proceso-hero__bg" />
        <div
          className="proceso-hero__img"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=70')", backgroundPosition: "center 40%" }}
        />
        <div className="proceso-hero__content">
          <button className="proceso-back" onClick={() => navigate("/")}>
            ← Volver al inicio
          </button>
          <SectionLabel color="#14B8A6">Guía completa</SectionLabel>
          <h1 className="proceso-hero__title">
            ¿Cómo funciona<br />
            <span className="proceso-hero__title-accent">el Erasmus?</span>
          </h1>
          <p className="proceso-hero__subtitle">
            Todo el proceso explicado sin rodeos. Desde que decides que quieres ir
            hasta que vuelves a casa con el certificado en la mano.
          </p>
          <div className="proceso-hero__stats">
            <div className="proceso-hero__stat">
              <span className="proceso-hero__stat-val">8</span>
              <span className="proceso-hero__stat-label">Pasos clave</span>
            </div>
            <div className="proceso-hero__stat">
              <span className="proceso-hero__stat-val">~8</span>
              <span className="proceso-hero__stat-label">Meses de proceso</span>
            </div>
            <div className="proceso-hero__stat">
              <span className="proceso-hero__stat-val">2,4M</span>
              <span className="proceso-hero__stat-label">Erasmus/año</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content — desktop (sidebar + detail) */}
      <section className="proceso-main proceso-main--desktop-only">
        <div className="proceso-main__inner">

          {/* Step selector sidebar */}
          <div className="proceso-sidebar">
            <p className="proceso-sidebar__label">Selecciona un paso</p>
            <div className="proceso-steps-list">
              {STEPS.map((step, i) => (
                <StepCard
                  key={step.num}
                  step={step}
                  isActive={activeStep === i}
                  onClick={() => handleStepClick(i)}
                />
              ))}
            </div>

            <div className="proceso-nav-arrows">
              <button
                className="proceso-nav-btn"
                disabled={activeStep === 0}
                onClick={() => handleStepClick(activeStep - 1)}
              >
                ← Anterior
              </button>
              <span className="proceso-nav-count">{activeStep + 1} / {STEPS.length}</span>
              <button
                className="proceso-nav-btn proceso-nav-btn--next"
                disabled={activeStep === STEPS.length - 1}
                onClick={() => handleStepClick(activeStep + 1)}
              >
                Siguiente →
              </button>
            </div>
          </div>

          {/* Step detail */}
          <div className="proceso-content" ref={detailRef}>
            <ProgressBar currentStep={activeStep} total={STEPS.length} />
            <StepDetail step={STEPS[activeStep]} />

            <div className="proceso-bottom-nav">
              {activeStep > 0 && (
                <button
                  className="proceso-bottom-btn proceso-bottom-btn--prev"
                  onClick={() => handleStepClick(activeStep - 1)}
                >
                  ← {STEPS[activeStep - 1].tag}
                </button>
              )}
              {activeStep < STEPS.length - 1 && (
                <button
                  className="proceso-bottom-btn proceso-bottom-btn--next"
                  onClick={() => handleStepClick(activeStep + 1)}
                  style={{ "--step-color": STEPS[activeStep + 1].color }}
                >
                  Siguiente: {STEPS[activeStep + 1].tag} →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main content — mobile (stories format) */}
      <section className="proceso-main--mobile-only">
        <MobileStories steps={STEPS} navigate={navigate} />
      </section>

      {/* CTA */}
      <section className="proceso-cta">
        <h2 className="proceso-cta__title">¿Listo para elegir tu ciudad?</h2>
        <p className="proceso-cta__subtitle">
          Ahora que conoces el proceso, encuentra el destino perfecto con scores reales y opiniones de estudiantes.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => navigate("/")}>
            Explorar destinos →
          </button>
          <button className="btn-ghost" onClick={() => navigate("/comparar")}>
            Comparar ciudades
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
