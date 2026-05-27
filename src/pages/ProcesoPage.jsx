import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useSEO } from "../hooks/useSEO";

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    num: "01",
    emoji: "🔍",
    title: "Busca tu destino y sácate el nivel de idioma",
    color: "#0EA5E9",
    tag: "Preparación",
    content: `Antes de solicitar nada, tienes que hacer dos cosas en paralelo: explorar destinos y preparar el idioma.

La mayoría de programas Erasmus exigen un nivel mínimo de idioma (normalmente B1 o B2). Aquí van las opciones más comunes:`,
    languages: [
      { lang: "Inglés", cert: "Cambridge B2 / IELTS / TOEFL", note: "El más solicitado, vale para casi todos los países" },
      { lang: "Alemán", cert: "Goethe B1/B2", note: "Obligatorio para Alemania y Austria" },
      { lang: "Francés", cert: "DELF B1/B2", note: "Francia, Bélgica y partes de Suiza" },
      { lang: "Italiano", cert: "CELI / CILS B1", note: "Italia — muchos programas aceptan sin certificado" },
      { lang: "Portugués", cert: "CAPLE B1", note: "Portugal — nivel relativamente accesible" },
    ],
    note: "Según tu universidad, la nota media puede ser determinante para elegir destino. Cada uni tiene su propio sistema de puntuación. ¡Consulta con tu Oficina de Relaciones Internacionales (RRII)!",
  },
  {
    num: "02",
    emoji: "📋",
    title: "Pones tu lista de preferencias y esperas",
    color: "#14B8A6",
    tag: "Solicitud",
    content: `Llega el momento de la solicitud oficial. Tu universidad abrirá un plazo (normalmente entre octubre y febrero para el curso siguiente) en el que debes:

• Entrar en la plataforma interna de tu universidad
• Ordenar tus destinos por preferencia (suele pedirse entre 3 y 5 opciones)
• Adjuntar documentación: expediente académico, certificado de idioma y carta de motivación

Una vez enviada la solicitud, toca esperar. La resolución suele tardar entre 2 y 6 semanas dependiendo de la universidad.`,
    tip: "💡 Investiga bien antes de ordenar las preferencias. No pongas una ciudad de número 1 solo porque suena bien — usa TMate para comparar scores reales.",
  },
  {
    num: "03",
    emoji: "✉️",
    title: "Resultado: te aceptan o te quedas en lista de espera",
    color: "#8B5CF6",
    tag: "Resolución",
    content: `Llega el email con la resolución. Hay dos escenarios:

✅ Te han aceptado en uno de tus destinos — ¡enhorabuena! Pasa directamente al paso 4.

⏳ Estás en lista de espera — no todo está perdido. Depende de tu universidad:
• Algunas permiten esperar activamente a que salga una plaza
• Otras cierran el proceso y tendrás que solicitar en la siguiente convocatoria
• En algunos casos puedes cambiar tu orden de preferencias

Lo más importante: mantén el contacto con tu oficina RRII y sé rápido respondiendo si te ofrecen una plaza de lista de espera, porque los plazos suelen ser cortos.`,
  },
  {
    num: "04",
    emoji: "🤝",
    title: "Aceptas tu destino y tu universidad se pone en marcha",
    color: "#F59E0B",
    tag: "Aceptación",
    content: `Una vez aceptas formalmente tu plaza, tu universidad de origen hace su parte:

• Comunica oficialmente tu nominación a la universidad de destino
• Te envía documentación a firmar (acuerdo bilateral, carta de compromiso, etc.)
• Empieza a gestionar la beca Erasmus+ en tu nombre

Mientras tanto, tú tienes cosas que hacer:

🏠 Busca alojamiento YA — es lo más crítico. Los pisos cerca de universidades populares se van rápido. Busca grupos de Facebook de la ciudad, páginas de la propia universidad, o contacta con antiguos Erasmus que conozcan caseros de confianza.

✈️ Reserva los vuelos con antelación — cuanto antes, más baratos.

💶 Infórmate de cuándo cobrarás la beca — varía mucho según la universidad y el país. A veces el primer pago tarda meses.`,
  },
  {
    num: "05",
    emoji: "🎓",
    title: "Eres nominado por tu universidad de destino",
    color: "#EC4899",
    tag: "Nominación",
    content: `La universidad de destino recibe tu información y te envía un email oficial de nominación. Este email es importantísimo porque incluye:

• Instrucciones para el proceso de matrícula en destino
• Lista de documentación que debes subir a su plataforma
• Fechas límite para cada trámite
• Información sobre el Learning Agreement (paso 6)
• Detalles de la orientación para estudiantes Erasmus

Lee ese email con mucha atención y marca las fechas en el calendario. Los plazos de las universidades extranjeras son más estrictos de lo que parece.`,
    tip: "💡 Muchas universidades tienen una plataforma propia (tipo portal del estudiante) donde gestionas toda la documentación. Créate la cuenta cuanto antes.",
  },
  {
    num: "06",
    emoji: "📝",
    title: "El Learning Agreement",
    color: "#10B981",
    tag: "Learning Agreement",
    isLA: true,
    content: `El Learning Agreement (LA) es el documento más importante de todo el proceso. Es básicamente el contrato académico que dice qué asignaturas vas a cursar en destino y cómo se van a convalidar en tu universidad de origen.

Tiene que estar firmado por ti, por tu tutor en la universidad de origen y por la universidad de destino antes de irte.`,
  },
];

const LA_TIPS = [
  {
    icon: "🏛️",
    title: "Consulta el histórico de convalidaciones",
    content: `Casi seguro que alguien de tu universidad ya se fue de Erasmus a tu destino. Las universidades guardan registro de qué asignaturas se han convalidado antes.

Contacta con tu oficina RRII o tu coordinador de grado y pídeles el histórico de convalidaciones. Es la información más valiosa que puedes tener.`,
  },
  {
    icon: "👥",
    title: "Contacta con antiguos Erasmus",
    content: `Busca en redes sociales a estudiantes de tu universidad que ya hayan ido a tu destino. Pregúntales:

• Qué asignaturas cogieron y cuáles les convalidaron
• Cuáles eran las más llevaderas o más interesantes
• Qué nivel de exigencia había en cada una

Esta información de primera mano vale oro y no la encontrarás en ningún sitio oficial.`,
  },
  {
    icon: "🌐",
    title: "Busca convalidaciones de otros estudiantes",
    content: `Pregunta en grupos de estudiantes de tu universidad, en redes sociales o en foros de Erasmus. Es muy probable que alguien ya haya hecho exactamente el mismo camino que tú y esté dispuesto a compartir su experiencia.`,
  },
  {
    icon: "🤖",
    title: "Usa la IA como apoyo",
    content: `Las herramientas de IA pueden ayudarte a comparar programas de asignaturas, encontrar equivalencias y redactar la justificación de convalidación. Bien utilizadas son muy útiles.

Tip: pégale el programa de la asignatura de destino y el de la de origen y pídele que compare y argumente por qué son equivalentes. Te ahorra mucho tiempo.`,
  },
  {
    icon: "📚",
    title: "Criterios para elegir bien las asignaturas",
    content: `A la hora de elegir, ten en cuenta:

✅ Que tengan equivalente claro en tu plan de estudios
✅ Que el nivel de idioma requerido sea el que tú tienes
✅ Que los horarios sean compatibles entre sí
✅ Que la carga de trabajo sea razonable (recuerda que también quieres vivir el Erasmus)
⚠️ Evita asignaturas con examen único y sin evaluación continua si no dominas el idioma`,
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

function LATip({ tip, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`la-tip ${open ? "la-tip--open" : ""}`}>
      <button className="la-tip__header" onClick={() => setOpen((v) => !v)}>
        <span className="la-tip__icon">{tip.icon}</span>
        <span className="la-tip__title">{tip.title}</span>
        <span className="la-tip__chevron">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="la-tip__body">
          <p style={{ whiteSpace: "pre-line", lineHeight: 1.7, color: "var(--color-slate)", fontSize: 15 }}>
            {tip.content}
          </p>

        </div>
      )}
    </div>
  );
}

function StepCard({ step, index, isActive, onClick }) {
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
          <span style={{ fontSize: 20 }}>⚠️</span>
          <p>{step.note}</p>
        </div>
      )}

      {/* Tip box */}
      {step.tip && (
        <div className="proceso-tip">
          <p>{step.tip}</p>
        </div>
      )}

      {/* Learning Agreement subsection */}
      {step.isLA && (
        <div className="la-section">
          <div className="la-section__header">
            <SectionLabel color={step.color}>Cómo hacer un buen Learning Agreement</SectionLabel>
            <h3 className="la-section__title">5 claves para que te convaliden todo</h3>
            <p className="la-section__subtitle">
              Es el documento que más dolores de cabeza da, pero con la estrategia correcta es manejable.
            </p>
          </div>
          <div className="la-tips-list">
            {LA_TIPS.map((tip, i) => (
              <LATip key={i} tip={tip} index={i} />
            ))}
          </div>
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
    title: "Cómo funciona el Erasmus — Guía completa paso a paso | TMate",
    description: "Todo el proceso Erasmus explicado en 6 pasos: desde buscar destino hasta el Learning Agreement. Guía práctica y honesta.",
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
        <div className="proceso-hero__content">
          <button className="proceso-back" onClick={() => navigate("/")}>
            ← Volver al inicio
          </button>
          <SectionLabel color="#14B8A6">Guía completa</SectionLabel>
          <h1 className="proceso-hero__title">
            El Erasmus,<br />
            <span className="proceso-hero__title-accent">paso a paso.</span>
          </h1>
          <p className="proceso-hero__subtitle">
            Todo el proceso explicado sin rodeos. Desde que decides que quieres ir
            hasta que aterrizas en tu nueva ciudad.
          </p>
          <div className="proceso-hero__stats">
            <div className="proceso-hero__stat">
              <span className="proceso-hero__stat-val">6</span>
              <span className="proceso-hero__stat-label">Pasos clave</span>
            </div>
            <div className="proceso-hero__stat">
              <span className="proceso-hero__stat-val">~6</span>
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
                  index={i}
                  isActive={activeStep === i}
                  onClick={() => handleStepClick(i)}
                />
              ))}
            </div>

            {/* Navigation arrows */}
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

            {/* Bottom navigation */}
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
          <button className="btn-ghost" onClick={() => navigate("/")}>
            Comparar ciudades
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
