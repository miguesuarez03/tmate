import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useSEO } from "../hooks/useSEO";

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    num: "01",
    emoji: "🔍",
    title: "Elige tu destino",
    color: "#0EA5E9",
    tag: "Preparación",
    content: `Antes de solicitar nada, tómate tiempo en serio para elegir bien. No es solo elegir una ciudad bonita — es elegir dónde vas a vivir varios meses.

Factores que realmente importan:
· Tu nota media y créditos superados — en la mayoría de universidades determinan el orden de adjudicación de plazas
· El idioma — comprueba qué nivel exigen y si tienes certificado o necesitas sacártelo
· Las asignaturas disponibles — que puedas convalidar lo que necesitas en tu carrera
· El coste real de vida — no solo el alquiler, también comida, transporte y ocio

Visita la Oficina de Relaciones Internacionales (ORI) de tu facultad cuanto antes. Ellos tienen la lista de universidades con las que hay acuerdo, los requisitos concretos de cada plaza y los plazos exactos. Mucha gente llega tarde por no ir a informarse a tiempo.`,
    note: "Usa TMate para comparar ciudades con scores reales de estudiantes que ya estuvieron ahí. Es exactamente para esto.",
    languages: [
      { lang: "Inglés", cert: "Cambridge B2 / IELTS / TOEFL", note: "El más solicitado, vale para casi todos los países" },
      { lang: "Alemán", cert: "Goethe B1/B2", note: "Obligatorio para Alemania y Austria" },
      { lang: "Francés", cert: "DELF B1/B2", note: "Francia, Bélgica y partes de Suiza" },
      { lang: "Italiano", cert: "CELI / CILS B1", note: "Italia — muchos programas aceptan sin certificado" },
      { lang: "Portugués", cert: "CAPLE B1", note: "Portugal — nivel relativamente accesible" },
    ],
  },
  {
    num: "02",
    emoji: "📋",
    title: "Solicita en tu universidad",
    color: "#14B8A6",
    tag: "Solicitud",
    content: `Tu universidad abrirá un plazo oficial (normalmente entre octubre y febrero para el curso siguiente). En ese período debes:

· Entrar en la plataforma interna de movilidad de tu uni
· Ordenar tus destinos por preferencia (suelen pedirse entre 3 y 5 opciones)
· Adjuntar la documentación: expediente académico, certificado de idioma y carta de motivación

Una vez enviada la solicitud, toca esperar. La resolución suele tardar entre 2 y 6 semanas.`,
    tip: "💡 Ordena las preferencias con cabeza. No pongas una ciudad de número 1 solo porque suena bien — compara scores reales en TMate antes de decidir.",
    urgencyAlert: {
      title: "⚠️ Empieza a mirar pisos y vuelos ahora mismo — aunque todavía no sepas si te aceptan",
      body: "Los alojamientos cerca de universidades con mucha demanda Erasmus se van en semanas. Cuando tengas la confirmación puede ser demasiado tarde para encontrar algo decente a buen precio.\n\nNadie va a avisarte ni a gestionarlo por ti — es tu responsabilidad buscar, reservar y pagar. Cuanto antes empieces a mirar, más opciones y mejores precios encontrarás. Empieza ya a explorar grupos de Facebook de la ciudad, plataformas locales y residencias universitarias.",
    },
  },
  {
    num: "03",
    emoji: "✉️",
    title: "Resolución: aceptado o lista de espera",
    color: "#8B5CF6",
    tag: "Resolución",
    content: `Llega el email con la resolución. Hay dos escenarios:

✅ Te han aceptado en uno de tus destinos — pasa directamente al paso 4.

⏳ Estás en lista de espera — no todo está perdido:
· Algunas universidades permiten esperar activamente a que salga una plaza
· Otras cierran el proceso y tendrás que solicitar en la siguiente convocatoria
· En algunos casos puedes cambiar tu orden de preferencias

Lo más importante: mantén el contacto con tu ORI y responde rápido si te ofrecen una plaza de lista de espera. Los plazos son muy cortos.`,
  },
  {
    num: "04",
    emoji: "✅",
    title: "Acepta la plaza formalmente",
    color: "#F59E0B",
    tag: "Aceptación",
    content: `Una vez aceptas tu plaza, tu universidad de origen hace su parte:

· Comunica oficialmente tu nominación a la universidad de destino
· Te envía documentación a firmar (acuerdo bilateral, carta de compromiso)
· Empieza a gestionar la beca Erasmus+ en tu nombre

Sobre la beca: las cantidades varían según el país de destino y la universidad, pero en general rondan los 300–500€/mes. Lo importante es saber que el primer pago puede tardar semanas o incluso meses en llegar — planifica tener un colchón económico para los primeros meses. Nadie te lo adelanta.

Mientras tanto, si aún no has empezado a buscar piso y vuelos, hazlo ahora sin falta.`,
  },
  {
    num: "05",
    emoji: "🏛️",
    title: "La universidad de destino te contacta",
    color: "#EC4899",
    tag: "Nominación",
    content: `La universidad de destino recibe tu nominación y te manda un email oficial. Este email es muy importante — léelo con atención y apunta todas las fechas.

Normalmente incluye:
· Instrucciones para registrarte en su plataforma propia
· Lista de documentación que debes subir
· Fechas límite para cada trámite (suelen ser más estrictas de lo que parece)
· Información sobre la matrícula en destino
· Detalles de la orientación para Erasmus

Créate la cuenta en su plataforma cuanto antes y sube la documentación sin esperar al último día. Las universidades extranjeras no suelen dar segundas oportunidades con los plazos.`,
    tip: "💡 En esta fase también arranca el Learning Agreement — el contrato académico que define qué asignaturas cursarás y cómo se convalidarán. Tenemos una guía completa para hacerlo bien.",
    laLink: true,
  },
  {
    num: "06",
    emoji: "🧳",
    title: "Prepara la partida",
    color: "#10B981",
    tag: "Pre-partida",
    content: `Esta fase tiene más papeleo del que parece. Organízate con tiempo:

🏠 Piso — si todavía no tienes, es urgente. Busca en grupos de Facebook de estudiantes de la ciudad, en la web de la propia universidad (algunas tienen residencias para Erasmus) y pregunta en foros o a gente que ya estuvo allí. Los mejores pisos se van semanas antes de que empiece el curso.

✈️ Vuelos — reserva con antelación. Cuanto antes, más barato. Y recuerda que la beca puede no haber llegado todavía cuando tengas que pagar.

🩺 Tarjeta Sanitaria Europea (TSE) — es gratuita y cubre atención médica básica en cualquier país de la UE. Pídela en la Seguridad Social con al menos 15 días de antelación antes de irte. Es obligatoria.

🛡️ Seguro complementario — muchas universidades lo exigen además de la TSE. Cubre lo que la TSE no cubre (repatriación, gastos extras). Es barato y no es opcional si tu uni lo pide.

📄 Firma electrónica / DNI electrónico — algunas universidades de destino requieren firma digital para sus trámites. Si necesitas activarla, hazlo con tiempo porque el proceso puede tardar.

📁 Copia de todos tus documentos — guárdalos en la nube (Google Drive, iCloud). DNI/pasaporte, seguro, matrícula, Learning Agreement, datos bancarios. Si pierdes algo allí, lo agradecerás.`,
  },
  {
    num: "07",
    emoji: "🎉",
    title: "Llegada y primeros días",
    color: "#F97316",
    tag: "Llegada",
    content: `Ya estás ahí. Pero aún quedan trámites importantes:

📋 Certificado de llegada — uno de los documentos más críticos de todo el proceso. Lo firma el coordinador Erasmus de tu universidad de destino y lo tienes que enviar a tu ORI en España. Sin este certificado, no cobras la beca. Consíguelo en los primeros días y mándalo cuanto antes.

🎓 Orientación Erasmus — casi todas las universidades organizan una sesión de bienvenida en los primeros días. Ve sin falta: te explican cómo funciona todo, conoces a otros Erasmus y resuelves dudas.

📝 Cambios en el Learning Agreement — si al llegar ves que alguna asignatura no te encaja o tiene conflicto de horario, hay un plazo (normalmente las primeras semanas) para modificarlo. Fuera de ese plazo no puedes cambiar nada.

🏦 Cuenta bancaria local — en algunos países conviene abrirla para evitar comisiones. Pregunta a otros Erasmus qué banco usan allí.`,
  },
  {
    num: "08",
    emoji: "🏠",
    title: "Vuelta y cierre",
    color: "#6366F1",
    tag: "Fin de estancia",
    content: `El Erasmus no termina cuando coges el avión de vuelta. Aún quedan cosas por hacer:

📋 Certificado de salida — igual que el de llegada, lo firma la universidad de destino. Es obligatorio para cerrar la beca. No te vayas sin él.

📊 Encuesta obligatoria de la UE — recibirás un email de la Comisión Europea pidiendo que rellenes una encuesta sobre tu experiencia. Es obligatoria para haber recibido la beca. No la ignores.

📄 Informe final Erasmus — tu universidad de origen también puede pedirte una memoria o informe de la estancia. Consulta con tu ORI qué formato exigen.

🎓 Convalidaciones — entrega toda la documentación a tu coordinador de grado para que tramiten las convalidaciones. El certificado de notas de la universidad de destino es el documento clave. El proceso puede tardar un par de meses en reflejarse en tu expediente — es normal.`,
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
      <span className="proceso-step-pill__emoji">{step.emoji}</span>
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
        <span style={{ marginRight: 12 }}>{step.emoji}</span>
        {step.title}
      </h2>

      <p className="proceso-detail__content" style={{ whiteSpace: "pre-line" }}>
        {step.content}
      </p>

      {/* Languages table for step 01 */}
      {step.languages && (
        <div className="proceso-langs">
          <h4 className="proceso-langs__title">Certificados más comunes por idioma</h4>
          <div className="proceso-langs__grid">
            {step.languages.map((l) => (
              <div key={l.lang} className="proceso-lang-card">
                <span className="proceso-lang-card__lang">{l.lang}</span>
                <span className="proceso-lang-card__cert">{l.cert}</span>
                <span className="proceso-lang-card__note">{l.note}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Note box */}
      {step.note && (
        <div className="proceso-note">
          <span style={{ fontSize: 20 }}>💡</span>
          <p>{step.note}</p>
        </div>
      )}

      {/* Tip box */}
      {step.tip && !step.laLink && (
        <div className="proceso-tip">
          <p>{step.tip}</p>
        </div>
      )}

      {/* LA link tip */}
      {step.laLink && (
        <div className="proceso-la-callout">
          <div className="proceso-la-callout__icon">📝</div>
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
          <div className="proceso-urgency__title">{step.urgencyAlert.title}</div>
          <p className="proceso-urgency__body" style={{ whiteSpace: "pre-line" }}>
            {step.urgencyAlert.body}
          </p>
        </div>
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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=70')", backgroundPosition: "center 40%" }}
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

      {/* Main content */}
      <section className="proceso-main">
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
