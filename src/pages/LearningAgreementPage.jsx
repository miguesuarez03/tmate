import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useSEO } from "../hooks/useSEO";

const LA_TIPS = [
  {
    icon: "🏛️",
    title: "Consulta el histórico de convalidaciones de tu uni",
    content: `Es lo primero que debes hacer. Casi seguro que alguien de tu universidad ya se fue de Erasmus a tu destino antes que tú, y las universidades guardan registro de qué asignaturas se han convalidado.

Contacta con tu ORI o tu coordinador de grado y pídeles el histórico. Es la información más valiosa que puedes tener y muy poca gente la pide.`,
  },
  {
    icon: "👥",
    title: "Habla con Erasmus que ya estuvieron ahí",
    content: `Busca en redes a estudiantes de tu universidad que ya hayan ido a tu destino. Pregúntales:

· Qué asignaturas cogieron y cuáles les convalidaron
· Cuáles eran las más llevaderas o más interesantes
· Qué nivel de exigencia había en cada una
· Si tuvieron problemas con alguna convalidación y cómo lo resolvieron

Esta información de primera mano vale oro y no la encontrarás en ningún sitio oficial.`,
  },
  {
    icon: "📚",
    title: "Cómo elegir bien las asignaturas",
    content: `A la hora de elegir, ten en cuenta:

✅ Que tengan equivalente claro en tu plan de estudios
✅ Que el nivel de idioma requerido sea el que tú tienes
✅ Que los horarios sean compatibles entre sí
✅ Que la carga de trabajo sea razonable — recuerda que también quieres vivir el Erasmus
⚠️ Evita asignaturas con examen único sin evaluación continua si no dominas el idioma al 100%
⚠️ No te sobrecarges — es mejor aprobar 5 asignaturas bien que suspender 8`,
  },
  {
    icon: "🌐",
    title: "El OLA — Online Learning Agreement",
    content: `La mayoría de universidades europeas ya usan el sistema digital OLA (Online Learning Agreement), accesible desde la plataforma Erasmus Without Paper.

Ventajas del OLA:
· Las firmas son digitales — no necesitas imprimir ni escanear nada
· Puedes hacer cambios más fácilmente si algo falla al llegar
· Tu universidad de origen y la de destino lo ven en tiempo real

Créate la cuenta antes de que te lo pidan y familiarízate con la plataforma. Muchos estudiantes pierden tiempo por no haberla abierto antes.`,
  },
  {
    icon: "✏️",
    title: "Cambios durante la estancia",
    content: `Al llegar a destino tienes un plazo (normalmente las primeras 4-5 semanas) para modificar el Learning Agreement si algo no cuadra — un horario incompatible, una asignatura cancelada, o simplemente que quieres cambiar algo.

Esto se llama "Changes to the Learning Agreement" y también se tramita en el OLA.

Importante: fuera de ese plazo no puedes hacer cambios. Si te quedas con asignaturas que no puedes seguir, el problema es tuyo. Actúa rápido si ves que algo no funciona.`,
  },
  {
    icon: "🤖",
    title: "Usa la IA para argumentar equivalencias",
    content: `Si tienes dudas sobre si una asignatura de destino es equivalente a una de tu carrera, las herramientas de IA pueden ayudarte a construir el argumento.

Coge el programa oficial de la asignatura de destino y el de la asignatura de tu uni que quieres convalidar, y pídele a la IA que compare contenidos y redacte una justificación de equivalencia.

No es magia — pero te ahorra mucho tiempo y suele convencer al coordinador si la equivalencia es razonable.`,
  },
];

function LATip({ tip }) {
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

export default function LearningAgreementPage() {
  const navigate = useNavigate();

  useSEO({
    title: "Learning Agreement Erasmus — Guía completa para convalidar todo | TMate",
    description: "Cómo preparar el Learning Agreement paso a paso: histórico de convalidaciones, OLA digital, cambios durante la estancia y consejos reales de estudiantes.",
  });

  return (
    <div className="proceso-page">
      <Navbar />

      {/* Hero */}
      <section className="proceso-hero" style={{ "--hero-accent": "#10B981" }}>
        <div className="proceso-hero__bg" />
        <div className="proceso-hero__content">
          <button className="proceso-back" onClick={() => navigate("/proceso")}>
            ← Volver a ¿Cómo funciona el Erasmus?
          </button>
          <SectionLabel color="#10B981">Documento clave</SectionLabel>
          <h1 className="proceso-hero__title">
            Tu Learning<br />
            <span className="proceso-hero__title-accent" style={{ color: "#10B981" }}>Agreement</span>
          </h1>
          <p className="proceso-hero__subtitle">
            El contrato académico que define qué estudias y qué te convalidan.
            El documento que más dolores de cabeza da — y el que mejor puedes preparar.
          </p>
          <div className="proceso-hero__stats">
            <div className="proceso-hero__stat">
              <span className="proceso-hero__stat-val">3</span>
              <span className="proceso-hero__stat-label">Firmas necesarias</span>
            </div>
            <div className="proceso-hero__stat">
              <span className="proceso-hero__stat-val">OLA</span>
              <span className="proceso-hero__stat-label">Sistema digital UE</span>
            </div>
            <div className="proceso-hero__stat">
              <span className="proceso-hero__stat-val">4–5</span>
              <span className="proceso-hero__stat-label">Semanas para cambios</span>
            </div>
          </div>
        </div>
      </section>

      {/* Qué es */}
      <section className="proceso-main" style={{ paddingBottom: 0 }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 var(--section-px) 48px" }}>
          <SectionLabel color="#10B981">Qué es exactamente</SectionLabel>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "var(--color-dark)", marginBottom: 16, letterSpacing: "-0.5px" }}>
            Un contrato entre tres partes
          </h2>
          <p style={{ fontSize: 16, color: "var(--color-slate)", lineHeight: 1.75, marginBottom: 16 }}>
            El Learning Agreement (LA) es el documento que dice qué asignaturas vas a cursar en la universidad de destino y cómo se van a reconocer en tu universidad de origen cuando vuelvas.
          </p>
          <p style={{ fontSize: 16, color: "var(--color-slate)", lineHeight: 1.75, marginBottom: 16 }}>
            Tiene que estar firmado por <strong>tres partes</strong> antes de irte: tú, tu coordinador en la universidad de origen, y la universidad de destino. Sin las tres firmas no es válido.
          </p>
          <p style={{ fontSize: 16, color: "var(--color-slate)", lineHeight: 1.75 }}>
            Si las asignaturas no están bien elegidas o la equivalencia no está bien justificada, tu universidad puede negarse a convalidarlas cuando vuelvas. Por eso merece la pena prepararlo bien.
          </p>
        </div>
      </section>

      {/* Tips acordeón */}
      <section style={{ background: "var(--color-surface)", padding: "56px var(--section-px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <SectionLabel color="#10B981">Cómo hacerlo bien</SectionLabel>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "var(--color-dark)", marginBottom: 8, letterSpacing: "-0.5px" }}>
            6 claves para que te convaliden todo
          </h2>
          <p style={{ fontSize: 15, color: "var(--color-muted)", marginBottom: 32 }}>
            Con la estrategia correcta, el Learning Agreement deja de ser un dolor de cabeza.
          </p>
          <div className="la-tips-list">
            {LA_TIPS.map((tip, i) => (
              <LATip key={i} tip={tip} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="proceso-cta">
        <h2 className="proceso-cta__title">¿Quieres ver el proceso completo?</h2>
        <p className="proceso-cta__subtitle">
          El Learning Agreement es solo uno de los 8 pasos del Erasmus. Repasa todo el proceso para no perderte nada.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => navigate("/proceso")}>
            Ver todos los pasos →
          </button>
          <button className="btn-ghost" onClick={() => navigate("/")}>
            Explorar destinos
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
