import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useSEO } from "../hooks/useSEO";
import styles from "./LearningAgreementPage.module.css";

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const FIRMAS = [
  {
    id: "tu",
    icon: "🎓",
    label: "Tú",
    desc: "El estudiante",
    detail: "Eres la primera firma. Tú propones las asignaturas, justificas las equivalencias y eres responsable de que el documento esté completo y correcto antes de enviarlo.",
    color: "#0EA5E9",
    step: "1ª firma",
  },
  {
    id: "origen",
    icon: "🏫",
    label: "Tu universidad",
    desc: "Coordinador de grado",
    detail: "Tu coordinador académico revisa que las asignaturas que propones son equivalentes a las de tu plan de estudios. Puede pedirte cambios o justificaciones adicionales.",
    color: "#8B5CF6",
    step: "2ª firma",
  },
  {
    id: "destino",
    icon: "🌍",
    label: "Universidad destino",
    desc: "Coordinador Erasmus",
    detail: "La universidad de destino confirma que las asignaturas que pides están disponibles, tienen plazas y que cumples los requisitos para cursarlas.",
    color: "#10B981",
    step: "3ª firma",
  },
];

const TIPS = [
  {
    icon: "🏛️",
    color: "#0EA5E9",
    title: "Consulta el histórico de tu uni",
    short: "La info más valiosa y la que casi nadie pide",
    content: "Casi seguro que alguien de tu universidad ya se fue de Erasmus a tu destino antes. Las universidades guardan registro de qué asignaturas se han convalidado.\n\nContacta con tu ORI o coordinador de grado y pídeles el histórico. Es oro puro y muy poca gente lo pide.",
    tag: "Primero de todo",
  },
  {
    icon: "👥",
    color: "#14B8A6",
    title: "Habla con Erasmus anteriores",
    short: "Primera mano, no encontrarás esto en ningún sitio oficial",
    content: "Busca en redes a estudiantes de tu uni que ya hayan ido a tu destino. Pregúntales:\n· Qué asignaturas cogieron y cuáles les convalidaron\n· Cuáles eran las más llevaderas\n· Qué nivel de exigencia había\n· Si tuvieron problemas con alguna convalidación",
    tag: "Comunidad",
  },
  {
    icon: "📚",
    color: "#8B5CF6",
    title: "Cómo elegir las asignaturas",
    short: "No te sobrecarges — también quieres vivir el Erasmus",
    content: "✅ Que tengan equivalente claro en tu plan\n✅ Que el nivel de idioma sea el tuyo\n✅ Que los horarios sean compatibles\n✅ Carga de trabajo razonable\n⚠️ Evita exámenes únicos sin evaluación continua si no dominas el idioma\n⚠️ Mejor aprobar 5 bien que suspender 8",
    tag: "Estrategia",
  },
  {
    icon: "🌐",
    color: "#F59E0B",
    title: "El OLA — firma todo digital",
    short: "Sin imprimir, sin escanear, todo online desde la UE",
    content: "La mayoría de universidades ya usan el OLA (Online Learning Agreement), accesible desde la plataforma Erasmus Without Paper.\n\n· Firmas digitales — nada de papel\n· Cambios más fáciles si algo falla al llegar\n· Tu uni de origen y destino lo ven en tiempo real\n\nCréate la cuenta antes de que te lo pidan.",
    tag: "Plataforma",
  },
  {
    icon: "✏️",
    color: "#EC4899",
    title: "Cambios durante la estancia",
    short: "Tienes 4-5 semanas al llegar — úsalas bien",
    content: "Al llegar tienes un plazo (normalmente las primeras 4-5 semanas) para modificar el LA si algo no cuadra — horario incompatible, asignatura cancelada, o lo que sea.\n\nImportante: fuera de ese plazo no puedes cambiar nada. Si ves que algo no funciona, actúa rápido.",
    tag: "Cambios",
  },
  {
    icon: "🤖",
    color: "#6366F1",
    title: "Usa IA para argumentar equivalencias",
    short: "El truco que más tiempo ahorra en todo el proceso",
    content: "Coge el programa oficial de la asignatura de destino y el de la asignatura de tu uni, y pídele a una IA que compare contenidos y redacte la justificación de equivalencia.\n\nNo es magia — pero suele convencer al coordinador si la equivalencia es razonable, y te ahorra horas.",
    tag: "Herramienta",
  },
  {
    icon: "⚠️",
    color: "#F97316",
    title: "Los horarios los sabrás al llegar (o antes)",
    short: "Una realidad que muy pocos te cuentan antes de firmar",
    content: "Cuando haces el Learning Agreement, normalmente no conoces los horarios de las asignaturas. Esto significa que puede haber solapamientos que no detectas hasta que llegas.\n\nPor eso, al acordarlo con tu tutor Erasmus en tu universidad, pídele que también valide un listado de asignaturas alternativas. Así, si al llegar una asignatura te coincide en horario, está cancelada o no hay plazas, tienes ya aprobadas las sustituciones sin volver a empezar el proceso.\n\nEn muchas universidades la matrícula funciona por orden de llegada (first come, first served): fijan una hora y el que antes entra en la plataforma se matricula. Si no llegas a tiempo, puedes quedarte sin plaza en alguna clase.\n\nTener un plan B acordado de antemano te ahorra mucho estrés.",
    tag: "Importante",
  },
  {
    icon: "📬",
    color: "#0EA5E9",
    title: "Atentos a los correos de ambas universidades",
    short: "Plazos, documentos, instrucciones — todo llega por email",
    content: "Durante todo el proceso Erasmus, tanto tu universidad de origen como la de destino te enviarán correos con plazos, instrucciones y documentos importantes.\n\nRevisar el correo a diario es fundamental:\n· Plazos de entrega del LA que se cierran sin aviso\n· Instrucciones de matrícula y acceso a plataformas\n· Cambios de última hora en asignaturas o aulas\n· Notificaciones de firmas pendientes en el OLA\n\nRevisa también la carpeta de spam — algunos correos institucionales cuelan ahí. Y si tienes cuenta de tu uni de destino, actívala cuanto antes.",
    tag: "Comunicación",
  },
];

const CHECKLIST_ITEMS = [
  { id: "historico", text: "He consultado el histórico de convalidaciones de mi universidad" },
  { id: "contacto", text: "He hablado con algún Erasmus que ya estuvo en mi destino" },
  { id: "asignaturas", text: "He elegido las asignaturas con equivalente claro en mi plan" },
  { id: "alternativas", text: "He acordado con mi tutor Erasmus asignaturas alternativas (por si algo falla: horarios, plazas, cancelaciones)" },
  { id: "coordinador", text: "He consultado con mi coordinador de grado antes de enviarlo" },
  { id: "ola", text: "Me he creado cuenta en la plataforma OLA (Erasmus Without Paper)" },
  { id: "firmado", text: "El LA está firmado por las 3 partes antes de irme" },
  { id: "correos", text: "Tengo activadas las cuentas de correo de ambas universidades y las reviso regularmente" },
  { id: "cambios", text: "Sé que tengo 4-5 semanas al llegar para hacer cambios si hace falta" },
];

/* ─── COMPONENTS ─────────────────────────────────────────────────────────── */

function FirmasDiagram() {
  const [active, setActive] = useState(null);
  const activeData = FIRMAS.find(f => f.id === active);

  return (
    <div className={styles.firmasWrap}>
      <div className={styles.firmasRow}>
        {FIRMAS.map((firma, i) => (
          <div key={firma.id} className={styles.firmaCol}>
            {i > 0 && (
              <div className={styles.firmaArrow}>
                <div className={styles.firmaArrowLine} />
                <span className={styles.firmaArrowTip}>→</span>
              </div>
            )}
            <button
              className={`${styles.firmaCard} ${active === firma.id ? styles.firmaCardActive : ""}`}
              style={{ "--firma-color": firma.color }}
              onClick={() => setActive(v => v === firma.id ? null : firma.id)}
            >
              <span className={styles.firmaStep}>{firma.step}</span>
              <span className={styles.firmaIcon}>{firma.icon}</span>
              <span className={styles.firmaLabel}>{firma.label}</span>
              <span className={styles.firmaDesc}>{firma.desc}</span>
            </button>
          </div>
        ))}
      </div>

      {activeData && (
        <div
          className={styles.firmaDetail}
          style={{ borderColor: activeData.color, background: activeData.color + "0d" }}
        >
          <span className={styles.firmaDetailIcon}>{activeData.icon}</span>
          <div>
            <strong className={styles.firmaDetailTitle} style={{ color: activeData.color }}>
              {activeData.label} — {activeData.step}
            </strong>
            <p className={styles.firmaDetailText}>{activeData.detail}</p>
          </div>
        </div>
      )}

      {!active && (
        <p className={styles.firmaHint}>Toca cualquier parte para ver qué hace cada uno</p>
      )}
    </div>
  );
}

function TipCard({ tip }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${styles.tipCard} ${open ? styles.tipCardOpen : ""}`}
      style={{ "--tip-color": tip.color }}
    >
      <button className={styles.tipHeader} onClick={() => setOpen(v => !v)}>
        <div className={styles.tipHeaderLeft}>
          <span className={styles.tipIcon} style={{ background: tip.color + "18", color: tip.color }}>
            {tip.icon}
          </span>
          <div className={styles.tipHeaderText}>
            <div className={styles.tipTag} style={{ color: tip.color }}>{tip.tag}</div>
            <div className={styles.tipTitle}>{tip.title}</div>
            {!open && <div className={styles.tipShort}>{tip.short}</div>}
          </div>
        </div>
        <span className={styles.tipChevron} style={{ color: tip.color }}>
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <div className={styles.tipBody}>
          <p style={{ whiteSpace: "pre-line" }}>{tip.content}</p>
        </div>
      )}
    </div>
  );
}

function Checklist() {
  const [checked, setChecked] = useState({});
  const total = CHECKLIST_ITEMS.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className={styles.checklist}>
      <div className={styles.checklistHeader}>
        <div>
          <h3 className={styles.checklistTitle}>¿Tienes todo listo?</h3>
          <p className={styles.checklistSub}>Marca lo que ya has hecho</p>
        </div>
        <div className={styles.checklistProgress}>
          <div className={styles.checklistPct}>{pct}%</div>
          <div className={styles.checklistBar}>
            <div
              className={styles.checklistFill}
              style={{ width: `${pct}%`, background: pct === 100 ? "#10B981" : "#0EA5E9" }}
            />
          </div>
          <div className={styles.checklistCount}>{done}/{total}</div>
        </div>
      </div>
      <div className={styles.checklistItems}>
        {CHECKLIST_ITEMS.map(item => (
          <button
            key={item.id}
            className={`${styles.checklistItem} ${checked[item.id] ? styles.checklistItemDone : ""}`}
            onClick={() => setChecked(v => ({ ...v, [item.id]: !v[item.id] }))}
          >
            <span className={styles.checklistBox}>
              {checked[item.id] ? "✓" : ""}
            </span>
            <span className={styles.checklistText}>{item.text}</span>
          </button>
        ))}
      </div>
      {done === total && (
        <div className={styles.checklistDone}>
          🎉 ¡Todo listo! Tu Learning Agreement está preparado.
        </div>
      )}
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default function LearningAgreementPage() {
  const navigate = useNavigate();

  useSEO({
    title: "Learning Agreement Erasmus — Guía completa para convalidar todo | TMate",
    description: "Cómo preparar el Learning Agreement paso a paso: histórico de convalidaciones, OLA digital, cambios durante la estancia y consejos reales de estudiantes.",
  });

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div
          className={styles.heroImg}
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=70')", backgroundPosition: "center 40%" }}
        />
        <div className={styles.heroContent}>
          <button className={styles.backBtn} onClick={() => navigate("/proceso")}>
            ← Volver al proceso
          </button>
          <SectionLabel color="#10B981">Documento clave</SectionLabel>
          <h1 className={styles.heroTitle}>
            Tu Learning<br />
            <span className={styles.heroAccent}>Agreement</span>
          </h1>
          <p className={styles.heroSub}>
            El contrato que define qué estudias y qué te convalidan.
            El documento que más agobia — y el que mejor puedes preparar si sabes cómo.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>3</span>
              <span className={styles.heroStatLabel}>Firmas necesarias</span>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>OLA</span>
              <span className={styles.heroStatLabel}>100% digital en la UE</span>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>4–5</span>
              <span className={styles.heroStatLabel}>Semanas para cambios</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUÉ ES: DIAGRAMA ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <SectionLabel color="#10B981">Qué es exactamente</SectionLabel>
          <h2 className={styles.sectionTitle}>Un contrato entre tres partes</h2>
          <p className={styles.sectionText}>
            El LA dice qué asignaturas cursas en destino y cómo se reconocen cuando vuelves.
            Necesita la firma de los tres antes de irte — sin alguna, no es válido.
          </p>
          <FirmasDiagram />
        </div>
      </section>

      {/* ── 6 CLAVES ── */}
      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <SectionLabel color="#10B981">Cómo hacerlo bien</SectionLabel>
          <h2 className={styles.sectionTitle}>Claves para que te convaliden todo</h2>
          <p className={styles.sectionText}>
            Con la estrategia correcta, el Learning Agreement deja de ser un dolor de cabeza.
          </p>
          <div className={styles.tipsGrid}>
            {TIPS.map((tip, i) => (
              <TipCard key={i} tip={tip} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CHECKLIST ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner} style={{ maxWidth: 640 }}>
          <Checklist />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>¿Quieres repasar el proceso completo?</h2>
        <p className={styles.ctaSub}>
          El Learning Agreement es solo uno de los 8 pasos. Que no se te escape ninguno.
        </p>
        <div className={styles.ctaBtns}>
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
