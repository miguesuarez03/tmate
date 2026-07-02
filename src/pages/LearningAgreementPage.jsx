import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap, School, Globe2, Landmark, Users, BookOpen, Globe,
  PenLine, Bot, AlertTriangle, Mail, CheckCircle2, RefreshCw, Handshake,
  Laptop, Timer, Check, PartyPopper, Copy, X, Send, Circle,
} from "lucide-react";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { useSEO } from "../hooks/useSEO";
import { CITIES } from "../data/cities";
import styles from "./LearningAgreementPage.module.css";

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const FIRMAS = [
  {
    id: "tu",
    icon: GraduationCap,
    label: "Tú",
    desc: "El estudiante",
    detail: "Eres la primera firma. Tú propones las asignaturas, justificas las equivalencias y eres responsable de que el documento esté completo y correcto antes de enviarlo.",
    color: "#0EA5E9",
    step: "1ª firma",
  },
  {
    id: "origen",
    icon: School,
    label: "Tu universidad",
    desc: "Coordinador de grado",
    detail: "Tu coordinador académico revisa que las asignaturas que propones son equivalentes a las de tu plan de estudios. Puede pedirte cambios o justificaciones adicionales.",
    color: "#8B5CF6",
    step: "2ª firma",
  },
  {
    id: "destino",
    icon: Globe2,
    label: "Universidad destino",
    desc: "Coordinador Erasmus",
    detail: "La universidad de destino confirma que las asignaturas que pides están disponibles, tienen plazas y que cumples los requisitos para cursarlas.",
    color: "#10B981",
    step: "3ª firma",
  },
];

const TIPS = [
  {
    icon: Landmark,
    color: "#0EA5E9",
    title: "Consulta el histórico de tu uni",
    short: "La info más valiosa y la que casi nadie pide",
    content: "Casi seguro que alguien de tu universidad ya se fue de Erasmus a tu destino antes. Las universidades guardan registro de qué asignaturas se han convalidado.\n\nContacta con tu ORI o coordinador de grado y pídeles el histórico. Es oro puro y muy poca gente lo pide.",
    tag: "Primero de todo",
  },
  {
    icon: Users,
    color: "#14B8A6",
    title: "Habla con Erasmus anteriores",
    short: "Primera mano, no encontrarás esto en ningún sitio oficial",
    content: "Busca en redes a estudiantes de tu uni que ya hayan ido a tu destino. Pregúntales:\n· Qué asignaturas cogieron y cuáles les convalidaron\n· Cuáles eran las más llevaderas\n· Qué nivel de exigencia había\n· Si tuvieron problemas con alguna convalidación",
    tag: "Comunidad",
  },
  {
    icon: BookOpen,
    color: "#8B5CF6",
    title: "Cómo elegir las asignaturas",
    short: "No te sobrecarges — también quieres vivir el Erasmus",
    content: "✅ Que tengan equivalente claro en tu plan\n✅ Que el nivel de idioma sea el tuyo\n✅ Que los horarios sean compatibles\n✅ Carga de trabajo razonable\n⚠️ Evita exámenes únicos sin evaluación continua si no dominas el idioma\n⚠️ Mejor aprobar 5 bien que suspender 8",
    tag: "Estrategia",
  },
  {
    icon: Globe,
    color: "#F59E0B",
    title: "El OLA — firma todo digital",
    short: "Sin imprimir, sin escanear, todo online desde la UE",
    content: "La mayoría de universidades ya usan el OLA (Online Learning Agreement), accesible desde la plataforma Erasmus Without Paper.\n\n· Firmas digitales — nada de papel\n· Cambios más fáciles si algo falla al llegar\n· Tu uni de origen y destino lo ven en tiempo real\n\nCréate la cuenta antes de que te lo pidan.",
    tag: "Plataforma",
  },
  {
    icon: PenLine,
    color: "#EC4899",
    title: "Cambios durante la estancia",
    short: "El plazo varía mucho según tu universidad — infórmate antes",
    content: "Al llegar tienes un plazo para modificar el LA si algo no cuadra — horario incompatible, asignatura cancelada, o lo que sea. Pero ese plazo depende muchísimo de cada universidad: tanto la de destino como la tuya propia marcan sus propias reglas, y pueden ser muy distintas.\n\nAlgunas dan pocas semanas, otras son más flexibles. No des por hecho ningún número concreto.\n\nImportante: infórmate de ese plazo con antelación, tanto en tu ORI como en la universidad de destino. Fuera de ese plazo no puedes cambiar nada, así que si algo no funciona al llegar, actúa cuanto antes.",
    tag: "Cambios",
  },
  {
    icon: Bot,
    color: "#6366F1",
    title: "Usa IA para argumentar equivalencias",
    short: "El truco que más tiempo ahorra en todo el proceso",
    content: "Coge el programa oficial de la asignatura de destino y el de la asignatura de tu uni, y pídele a una IA que compare contenidos y redacte la justificación de equivalencia.\n\nNo es magia — pero suele convencer al coordinador si la equivalencia es razonable, y te ahorra horas.",
    tag: "Herramienta",
  },
  {
    icon: AlertTriangle,
    color: "#F97316",
    title: "Los horarios los sabrás al llegar (o antes)",
    short: "Una realidad que muy pocos te cuentan antes de firmar",
    content: "Cuando haces el Learning Agreement, normalmente no conoces los horarios de las asignaturas. Esto significa que puede haber solapamientos que no detectas hasta que llegas.\n\nPor eso, al acordarlo con tu tutor Erasmus en tu universidad, pídele que también valide un listado de asignaturas alternativas. Así, si al llegar una asignatura te coincide en horario, está cancelada o no hay plazas, tienes ya aprobadas las sustituciones sin volver a empezar el proceso.\n\nEn muchas universidades la matrícula funciona por orden de llegada (first come, first served): fijan una hora y el que antes entra en la plataforma se matricula. Si no llegas a tiempo, puedes quedarte sin plaza en alguna clase.\n\nTener un plan B acordado de antemano te ahorra mucho estrés.",
    tag: "Importante",
  },
  {
    icon: Mail,
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
  { id: "cambios", text: "He consultado cuánto tiempo tengo para hacer cambios al llegar (varía según universidad)" },
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
            <button
              className={styles.firmaCard}
              style={{ "--firma-color": firma.color }}
              onClick={() => setActive(firma.id)}
            >
              <span className={styles.firmaBadge}>{i + 1}</span>
              <span className={styles.firmaIcon}><firma.icon size={26} strokeWidth={1.75} /></span>
              <span className={styles.firmaLabel}>{firma.label}</span>
              <span className={styles.firmaDesc}>{firma.desc}</span>
              <span className={styles.firmaCheck}><Check size={13} strokeWidth={2} /> Debe firmar</span>
            </button>
            {i < FIRMAS.length - 1 && (
              <span className={styles.firmaPlus} aria-hidden="true">+</span>
            )}
          </div>
        ))}
      </div>

      <p className={styles.firmaHint}>Las 3 firmas son sobre el mismo documento, no pasos consecutivos. Toca cada parte para ver qué hace.</p>

      {/* Modal popup */}
      {activeData && (
        <div className={styles.firmaModalOverlay} onClick={() => setActive(null)}>
          <div
            className={styles.firmaModal}
            style={{ "--firma-color": activeData.color }}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.firmaModalHeader}>
              <div className={styles.firmaModalLeft}>
                <span className={styles.firmaIcon} style={{ fontSize: 28 }}><activeData.icon size={28} strokeWidth={1.75} /></span>
                <div>
                  <span className={styles.firmaStep} style={{ color: activeData.color }}>{activeData.step}</span>
                  <p className={styles.firmaLabel} style={{ margin: 0 }}>{activeData.label}</p>
                  <p className={styles.firmaDesc} style={{ margin: 0 }}>{activeData.desc}</p>
                </div>
              </div>
              <button
                type="button"
                className={styles.firmaModalClose}
                onClick={() => setActive(null)}
                aria-label="Cerrar"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>
            <div className={styles.firmaModalBody}>
              <p>{activeData.detail}</p>
            </div>
          </div>
        </div>
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
            <tip.icon size={20} strokeWidth={1.75} />
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
          {tip.content.split("\n").map((line, i) => {
            if (line.startsWith("✅ ")) {
              return <p key={i} className={styles.tipLineOk}><CheckCircle2 size={15} strokeWidth={1.75} /> {line.slice("✅ ".length)}</p>;
            }
            if (line.startsWith("⚠️ ")) {
              return <p key={i} className={styles.tipLineWarn}><AlertTriangle size={15} strokeWidth={1.75} /> {line.slice("⚠️ ".length)}</p>;
            }
            return line ? <p key={i}>{line}</p> : <br key={i} />;
          })}
        </div>
      )}
    </div>
  );
}

// El checklist se usa a lo largo de semanas (no es un formulario de una
// sola sesión), así que el progreso se guarda en localStorage para que no
// se pierda al recargar la página o volver otro día.
const CHECKLIST_STORAGE_KEY = "tmate_la_checklist";

function Checklist() {
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // localStorage no disponible (modo privado, etc.) — se pierde el
      // progreso al recargar, pero la checklist sigue funcionando.
    }
  }, [checked]);

  const total = CHECKLIST_ITEMS.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);
  const color = pct === 100 ? "#10B981" : "#0EA5E9";

  const ICONS = {
    historico: Landmark, contacto: Users, asignaturas: BookOpen,
    alternativas: RefreshCw, coordinador: Handshake, ola: Laptop,
    firmado: CheckCircle2, correos: Mail, cambios: Timer,
  };

  return (
    <div className={styles.checklist}>
      {/* Header compacto con progreso integrado */}
      <div className={styles.checklistHeader}>
        <div className={styles.checklistHeaderLeft}>
          <h3 className={styles.checklistTitle}>¿Tienes todo listo?</h3>
          <div className={styles.checklistBar}>
            <div className={styles.checklistFill} style={{ width: `${pct}%`, background: color }} />
          </div>
        </div>
        <div className={styles.checklistPctWrap}>
          <span className={styles.checklistPct} style={{ color }}>{pct}%</span>
          <span className={styles.checklistCount}>{done}/{total}</span>
        </div>
      </div>

      {/* Grid de pills */}
      <div className={styles.checklistGrid}>
        {CHECKLIST_ITEMS.map(item => {
          const isDone = checked[item.id];
          return (
            <button
              key={item.id}
              type="button"
              className={`${styles.checklistPill} ${isDone ? styles.checklistPillDone : ""}`}
              onClick={() => setChecked(v => ({ ...v, [item.id]: !v[item.id] }))}
            >
              <span className={styles.checklistPillIcon}>
                {(() => { const Icon = isDone ? Check : (ICONS[item.id] || Circle); return <Icon size={16} strokeWidth={1.75} />; })()}
              </span>
              <span className={styles.checklistPillText}>{item.text}</span>
            </button>
          );
        })}
      </div>

      {pct === 100 && (
        <div className={styles.checklistDone}>
          <PartyPopper size={16} strokeWidth={1.75} /> ¡Todo listo! Tu Learning Agreement está preparado.
        </div>
      )}
    </div>
  );
}

const WIZARD_LANGUAGES = ["Inglés", "Alemán", "Francés", "Italiano", "Portugués", "Neerlandés", "Polaco", "Húngaro", "Checo", "Otro"];

const WIZARD_STEPS = [
  { id: "origen", title: "Tu universidad", emoji: School },
  { id: "destino", title: "Universidad de destino", emoji: Globe2 },
  { id: "asignaturas", title: "Asignaturas a convalidar", emoji: BookOpen },
  { id: "creditos", title: "Créditos e idioma", emoji: GraduationCap },
  { id: "contacto", title: "Tus datos de contacto", emoji: Mail },
];

/* ─── WIZARD LEARNING AGREEMENT ─────────────────────────────────────────── */

// El borrador del wizard se guarda en localStorage: es un formulario de 5
// pasos y perder todo por recargar la página o salir sin querer sería
// bastante frustrante.
const WIZARD_STORAGE_KEY = "tmate_la_wizard_draft";
const WIZARD_DEFAULTS = {
  universidadOrigen: "",
  gradoOrigen: "",
  ciudadDestino: "",
  universidadDestino: "",
  asignaturas: "",
  creditos: "",
  idioma: "",
  nombre: "",
  email: "",
};

function buildEmailContent(data, destinoCity) {
  const subject = `Learning Agreement — ${data.nombre} (${destinoCity?.name || data.ciudadDestino})`;
  const body =
`Solicitud de propuesta de equivalencias — TMate Learning Agreement

UNIVERSIDAD DE ORIGEN
Universidad: ${data.universidadOrigen}
Grado: ${data.gradoOrigen}

UNIVERSIDAD DE DESTINO
Ciudad: ${destinoCity?.name || data.ciudadDestino}
Universidad: ${data.universidadDestino}

ASIGNATURAS PENDIENTES DE CONVALIDAR
${data.asignaturas}

CRÉDITOS NECESARIOS
${data.creditos} ECTS

IDIOMA DE LAS ASIGNATURAS
${data.idioma}

CONTACTO
Nombre: ${data.nombre}
Email: ${data.email}
`;
  return { subject, body };
}

function LAWizard() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(WIZARD_STORAGE_KEY);
      return saved ? { ...WIZARD_DEFAULTS, ...JSON.parse(saved) } : { ...WIZARD_DEFAULTS };
    } catch {
      return { ...WIZARD_DEFAULTS };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage no disponible — el borrador no se guarda, pero el
      // wizard sigue funcionando con normalidad en esta sesión.
    }
  }, [data]);

  const total = WIZARD_STEPS.length;
  const isLast = step === total - 1;
  const current = WIZARD_STEPS[step];

  const update = (field, value) => setData(d => ({ ...d, [field]: value }));

  const destinoCity = CITIES.find(c => c.slug === data.ciudadDestino);
  const universidadesDestino = destinoCity?.universities ?? [];

  const canContinue = () => {
    switch (current.id) {
      case "origen":      return data.universidadOrigen.trim() && data.gradoOrigen.trim();
      case "destino":     return data.ciudadDestino && data.universidadDestino;
      case "asignaturas": return data.asignaturas.trim().length > 0;
      case "creditos":    return data.creditos.trim() && data.idioma;
      case "contacto":    return data.nombre.trim() && /\S+@\S+\.\S+/.test(data.email);
      default:            return true;
    }
  };

  const handleNext = () => {
    if (!canContinue()) return;
    if (isLast) {
      sendEmail();
    } else {
      setStep(s => s + 1);
    }
  };

  const sendEmail = () => {
    const { subject, body } = buildEmailContent(data, destinoCity);
    window.location.href = `mailto:hola@tmate.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    try {
      localStorage.removeItem(WIZARD_STORAGE_KEY);
    } catch {
      // nada que limpiar si localStorage no está disponible
    }
  };

  const handleCopy = async () => {
    const { subject, body } = buildEmailContent(data, destinoCity);
    const text = `Para: hola@tmate.app\nAsunto: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard no disponible — el botón simplemente no confirma la copia
    }
  };

  const handleBack = () => setStep(s => Math.max(0, s - 1));

  if (sent) {
    return (
      <div className={styles.wizardDone}>
        <span className={styles.wizardDoneIcon}><Mail size={32} strokeWidth={1.75} /></span>
        <h3 className={styles.wizardDoneTitle}>Se ha abierto tu cliente de correo</h3>
        <p className={styles.wizardDoneText}>
          Revisa que el email se haya generado bien y envíalo. En cuanto lo recibamos, te preparamos una
          propuesta de equivalencias y te respondemos al correo que nos has dado.
        </p>
        <p className={styles.wizardDoneText}>
          Si no se ha abierto ningún programa de correo (pasa en algunos móviles), copia el texto y envíalo
          tú mismo a <strong>hola@tmate.app</strong>.
        </p>
        <div className={styles.wizardDoneActions}>
          <button className={styles.wizardCopyBtn} onClick={handleCopy}>
            {copied ? <><Check size={14} strokeWidth={1.75} /> Copiado</> : <><Copy size={14} strokeWidth={1.75} /> Copiar texto del email</>}
          </button>
          <button
            className={styles.wizardRestartBtn}
            onClick={() => { setSent(false); setStep(0); }}
          >
            Hacer otra solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wizard}>
      {/* progreso */}
      <div className={styles.wizardProgress}>
        {WIZARD_STEPS.map((s, i) => (
          <div key={s.id} className={styles.wizardProgressStep}>
            <div className={`${styles.wizardDot} ${i < step ? styles.wizardDotDone : ""} ${i === step ? styles.wizardDotActive : ""}`}>
              {i < step ? <Check size={14} strokeWidth={2} /> : i + 1}
            </div>
            {i < total - 1 && <div className={`${styles.wizardLine} ${i < step ? styles.wizardLineDone : ""}`} />}
          </div>
        ))}
      </div>

      <div className={styles.wizardCard}>
        <div className={styles.wizardCardHeader}>
          <span className={styles.wizardCardEmoji}><current.emoji size={26} strokeWidth={1.75} /></span>
          <div>
            <p className={styles.wizardCardStep}>Paso {step + 1} de {total}</p>
            <h3 className={styles.wizardCardTitle}>{current.title}</h3>
          </div>
        </div>

        <div className={styles.wizardCardBody}>
          {current.id === "origen" && (
            <>
              <label className={styles.wizardLabel}>
                Universidad de origen
                <input
                  className={styles.wizardInput}
                  type="text"
                  placeholder="ej. Universidad Loyola Andalucía"
                  value={data.universidadOrigen}
                  onChange={e => update("universidadOrigen", e.target.value)}
                />
              </label>
              <label className={styles.wizardLabel}>
                Grado / titulación
                <input
                  className={styles.wizardInput}
                  type="text"
                  placeholder="ej. Grado en Ingeniería en Tecnologías Industriales"
                  value={data.gradoOrigen}
                  onChange={e => update("gradoOrigen", e.target.value)}
                />
              </label>
            </>
          )}

          {current.id === "destino" && (
            <>
              <label className={styles.wizardLabel}>
                Ciudad de destino
                <select
                  className={styles.wizardInput}
                  value={data.ciudadDestino}
                  onChange={e => update("ciudadDestino", e.target.value)}
                >
                  <option value="">Selecciona una ciudad…</option>
                  {CITIES.map(c => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </label>
              {data.ciudadDestino && (
                <label className={styles.wizardLabel}>
                  Universidad de destino
                  <select
                    className={styles.wizardInput}
                    value={data.universidadDestino}
                    onChange={e => update("universidadDestino", e.target.value)}
                  >
                    <option value="">Selecciona una universidad…</option>
                    {universidadesDestino.map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </label>
              )}
            </>
          )}

          {current.id === "asignaturas" && (
            <label className={styles.wizardLabel}>
              Asignaturas pendientes de convalidar
              <span className={styles.wizardHint}>Una por línea, con el nombre tal y como aparece en tu plan de estudios.</span>
              <textarea
                className={styles.wizardTextarea}
                rows={6}
                placeholder={"ej.\nCálculo II\nMecánica de Fluidos\nElectrotecnia"}
                value={data.asignaturas}
                onChange={e => update("asignaturas", e.target.value)}
              />
            </label>
          )}

          {current.id === "creditos" && (
            <>
              <label className={styles.wizardLabel}>
                Créditos ECTS necesarios
                <input
                  className={styles.wizardInput}
                  type="text"
                  inputMode="numeric"
                  placeholder="ej. 30"
                  value={data.creditos}
                  onChange={e => update("creditos", e.target.value)}
                />
              </label>
              <label className={styles.wizardLabel}>
                Idioma de las asignaturas
                <select
                  className={styles.wizardInput}
                  value={data.idioma}
                  onChange={e => update("idioma", e.target.value)}
                >
                  <option value="">Selecciona un idioma…</option>
                  {WIZARD_LANGUAGES.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </label>
            </>
          )}

          {current.id === "contacto" && (
            <>
              <label className={styles.wizardLabel}>
                Nombre completo
                <input
                  className={styles.wizardInput}
                  type="text"
                  placeholder="Tu nombre"
                  value={data.nombre}
                  onChange={e => update("nombre", e.target.value)}
                />
              </label>
              <label className={styles.wizardLabel}>
                Email
                <input
                  className={styles.wizardInput}
                  type="email"
                  placeholder="tucorreo@uni.es"
                  value={data.email}
                  onChange={e => update("email", e.target.value)}
                />
              </label>
              <div className={styles.wizardSummary}>
                <p className={styles.wizardSummaryTitle}>Resumen de tu solicitud</p>
                <p><strong>Origen:</strong> {data.universidadOrigen || "—"} ({data.gradoOrigen || "—"})</p>
                <p><strong>Destino:</strong> {data.universidadDestino || "—"}, {destinoCity?.name || "—"}</p>
                <p><strong>Créditos:</strong> {data.creditos || "—"} ECTS · <strong>Idioma:</strong> {data.idioma || "—"}</p>
              </div>
            </>
          )}
        </div>

        <div className={styles.wizardCardFooter}>
          <button
            className={styles.wizardBackBtn}
            onClick={handleBack}
            disabled={step === 0}
          >
            ← Atrás
          </button>
          <button
            className={styles.wizardNextBtn}
            onClick={handleNext}
            disabled={!canContinue()}
          >
            {isLast ? <>Enviar solicitud <Send size={15} strokeWidth={1.75} /></> : "Continuar →"}
          </button>
        </div>
      </div>
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
              <span className={styles.heroStatVal}><Timer size={22} strokeWidth={1.75} /></span>
              <span className={styles.heroStatLabel}>Plazo de cambios según uni</span>
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

      {/* ── WIZARD: PROPUESTA DE EQUIVALENCIAS ── */}
      <section className={styles.section} id="wizard-la">
        <div className={styles.sectionInner} style={{ maxWidth: 640 }}>
          <SectionLabel color="#10B981">Herramienta</SectionLabel>
          <h2 className={styles.sectionTitle}>Pide tu propuesta de equivalencias</h2>
          <p className={styles.sectionText}>
            Rellena estos datos en menos de 2 minutos y te ayudamos a plantear las equivalencias de tu Learning
            Agreement. Lo revisamos a mano y te respondemos por email — más rápido y claro que rellenar un
            formulario largo de una sola página.
          </p>
          <LAWizard />
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
