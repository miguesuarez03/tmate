import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer, SectionLabel } from "../components/Layout";
import { IconUniversidad, IconEdificio, IconGlobo, IconManos, IconAmigos, IconLibros, IconLapiz, IconRobot, IconAlerta, IconSobre, IconCheck, IconCiclo, IconReloj, IconFiesta, IconClipboard } from "../components/icons";
import { useSEO } from "../hooks/useSEO";
import { useCityDetails } from "../hooks/useCityDetail";
import { getAllCities, isErasmusEligible } from "../lib/cities";
import SearchableInput from "../components/SearchableInput";
import styles from "./LearningAgreementPage.module.css";

// Índice ligero de ciudades (ver lib/cities.js).
const ALL_CITIES = getAllCities();

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const FIRMAS = [
  {
    id: "tu",
    Icon: IconUniversidad,
    label: "Tú",
    desc: "El estudiante",
    detail: "Eres la primera firma. Tú propones las asignaturas, justificas las equivalencias y eres responsable de que el documento esté completo y correcto antes de enviarlo.",
    color: "#3F7A7D",
    step: "1ª firma",
  },
  {
    id: "origen",
    Icon: IconEdificio,
    label: "Tu universidad",
    desc: "Coordinador de grado",
    detail: "Tu coordinador académico revisa que las asignaturas que propones son equivalentes a las de tu plan de estudios. Puede pedirte cambios o justificaciones adicionales.",
    color: "#8B5CF6",
    step: "2ª firma",
  },
  {
    id: "destino",
    Icon: IconGlobo,
    label: "Universidad destino",
    desc: "Coordinador Erasmus",
    detail: "La universidad de destino confirma que las asignaturas que pides están disponibles, tienen plazas y que cumples los requisitos para cursarlas.",
    color: "#10B981",
    step: "3ª firma",
  },
];

const TIPS = [
  {
    Icon: IconEdificio,
    color: "#2F5073",
    title: "Consulta el histórico de tu uni",
    short: "La info más valiosa y la que casi nadie pide",
    content: "Casi seguro que alguien de tu universidad ya se fue de Erasmus a tu destino antes. Las universidades guardan registro de qué asignaturas se han convalidado.\n\nContacta con tu ORI o coordinador de grado y pídeles el histórico. Es oro puro y muy poca gente lo pide.",
    tag: "Primero de todo",
  },
  {
    Icon: IconAmigos,
    color: "#3F7A7D",
    title: "Habla con Erasmus anteriores",
    short: "Primera mano, no encontrarás esto en ningún sitio oficial",
    content: "Busca en redes a estudiantes de tu uni que ya hayan ido a tu destino. Pregúntales:\n· Qué asignaturas cogieron y cuáles les convalidaron\n· Cuáles eran las más llevaderas\n· Qué nivel de exigencia había\n· Si tuvieron problemas con alguna convalidación",
    tag: "Comunidad",
  },
  {
    Icon: IconLibros,
    color: "#8B5CF6",
    title: "Cómo elegir las asignaturas",
    short: "No te sobrecarges — también quieres vivir el Erasmus",
    content: "✅ Que tengan equivalente claro en tu plan\n✅ Que el nivel de idioma sea el tuyo\n✅ Que los horarios sean compatibles\n✅ Carga de trabajo razonable\n⚠️ Evita exámenes únicos sin evaluación continua si no dominas el idioma\n⚠️ Mejor aprobar 5 bien que suspender 8",
    tag: "Estrategia",
  },
  {
    Icon: IconGlobo,
    color: "#F59E0B",
    title: "El OLA — firma todo digital",
    short: "Sin imprimir, sin escanear, todo online desde la UE",
    content: "La mayoría de universidades ya usan el OLA (Online Learning Agreement), accesible desde la plataforma Erasmus Without Paper.\n\n· Firmas digitales — nada de papel\n· Cambios más fáciles si algo falla al llegar\n· Tu uni de origen y destino lo ven en tiempo real\n\nCréate la cuenta antes de que te lo pidan.",
    tag: "Plataforma",
  },
  {
    Icon: IconLapiz,
    color: "#EC4899",
    title: "Cambios durante la estancia",
    short: "El plazo varía mucho según tu universidad — infórmate antes",
    content: "Al llegar tienes un plazo para modificar el LA si algo no cuadra — horario incompatible, asignatura cancelada, o lo que sea. Pero ese plazo depende muchísimo de cada universidad: tanto la de destino como la tuya propia marcan sus propias reglas, y pueden ser muy distintas.\n\nAlgunas dan pocas semanas, otras son más flexibles. No des por hecho ningún número concreto.\n\nImportante: infórmate de ese plazo con antelación, tanto en tu ORI como en la universidad de destino. Fuera de ese plazo no puedes cambiar nada, así que si algo no funciona al llegar, actúa cuanto antes.",
    tag: "Cambios",
  },
  {
    Icon: IconRobot,
    color: "#6366F1",
    title: "Usa IA para argumentar equivalencias",
    short: "El truco que más tiempo ahorra en todo el proceso",
    content: "Coge el programa oficial de la asignatura de destino y el de la asignatura de tu uni, y pídele a una IA que compare contenidos y redacte la justificación de equivalencia.\n\nNo es magia — pero suele convencer al coordinador si la equivalencia es razonable, y te ahorra horas.",
    tag: "Herramienta",
  },
  {
    Icon: IconAlerta,
    color: "#F97316",
    title: "Los horarios los sabrás al llegar (o antes)",
    short: "Una realidad que muy pocos te cuentan antes de firmar",
    content: "Cuando haces el Learning Agreement, normalmente no conoces los horarios de las asignaturas. Esto significa que puede haber solapamientos que no detectas hasta que llegas.\n\nPor eso, al acordarlo con tu tutor Erasmus en tu universidad, pídele que también valide un listado de asignaturas alternativas. Así, si al llegar una asignatura te coincide en horario, está cancelada o no hay plazas, tienes ya aprobadas las sustituciones sin volver a empezar el proceso.\n\nEn muchas universidades la matrícula funciona por orden de llegada (first come, first served): fijan una hora y el que antes entra en la plataforma se matricula. Si no llegas a tiempo, puedes quedarte sin plaza en alguna clase.\n\nTener un plan B acordado de antemano te ahorra mucho estrés.",
    tag: "Importante",
  },
  {
    Icon: IconSobre,
    color: "#3F7A7D",
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
              <span className={styles.firmaIcon}><firma.Icon size={36} /></span>
              <span className={styles.firmaLabel}>{firma.label}</span>
              <span className={styles.firmaDesc}>{firma.desc}</span>
              <span className={styles.firmaCheck}>✓ Debe firmar</span>
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
                <span className={styles.firmaIcon} style={{ fontSize: 28 }}><activeData.Icon size={40} /></span>
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
              >✕</button>
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
            <tip.Icon size={32} />
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
  const color = pct === 100 ? "#10B981" : "#F5963A";

  const ICONS = {
    historico: IconEdificio, contacto: IconAmigos, asignaturas: IconLibros,
    alternativas: IconCiclo, coordinador: IconManos, ola: IconGlobo,
    firmado: IconCheck, correos: IconSobre, cambios: IconReloj,
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
                {isDone ? <IconCheck size={20} /> : (ICONS[item.id] ? (() => { const ItemIcon = ICONS[item.id]; return <ItemIcon size={20} />; })() : "○")}
              </span>
              <span className={styles.checklistPillText}>{item.text}</span>
            </button>
          );
        })}
      </div>

      {pct === 100 && (
        <div className={styles.checklistDone} style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
          <IconFiesta size={22} /> ¡Todo listo! Tu Learning Agreement está preparado.
        </div>
      )}
    </div>
  );
}

// Destinos del formulario, por orden alfabético, para el buscador de ciudad
// (antes un <select> con las 150 en el orden del fichero de datos).
const WIZARD_CITY_OPTIONS = [...ALL_CITIES]
  .sort((a, b) => a.name.localeCompare(b.name, "es"))
  .map((c) => ({ value: c.slug, label: c.name, sublabel: c.country, emoji: c.emoji }));

const WIZARD_LANGUAGES = ["Inglés", "Alemán", "Francés", "Italiano", "Portugués", "Neerlandés", "Polaco", "Húngaro", "Checo", "Otro"];

const WIZARD_STEPS = [
  { id: "origen", title: "Tu universidad", Icon: IconEdificio },
  { id: "destino", title: "Universidad de destino", Icon: IconGlobo },
  { id: "asignaturas", title: "Asignaturas a convalidar", Icon: IconLibros },
  { id: "creditos", title: "Créditos e idioma", Icon: IconUniversidad },
  { id: "contacto", title: "Tus datos de contacto", Icon: IconSobre },
];

/* ─── WIZARD LEARNING AGREEMENT ─────────────────────────────────────────── */

// La solicitud se envía con Web3Forms, como el feedback y las experiencias
// (clave pública VITE_WEB3FORMS_KEY, ver .env.example). Sin clave, o si el
// envío falla, queda el mailto: de respaldo con el texto ya escrito.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const CONTACT_EMAIL = "suarezalvarez.ma03@gmail.com";
// Plazo en el que Miguel responde a una solicitud de propuesta. Es un
// compromiso con el estudiante: si cambia, se cambia aquí y se actualiza en
// el hero, la introducción del formulario y las dos pantallas de confirmación.
const PROPOSAL_RESPONSE_TIME = "48 horas";

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
`Solicitud de propuesta de equivalencias — MAbroad Learning Agreement

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

function buildMailto(data, destinoCity) {
  const { subject, body } = buildEmailContent(data, destinoCity);
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function LAWizard() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [sentVia, setSentVia] = useState("web3forms"); // web3forms | mailto
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [copied, setCopied] = useState(false);
  // Los errores de un paso solo se enseñan después de intentar continuar.
  const [showErrors, setShowErrors] = useState(false);
  const cardRef = useRef(null);
  const botRef = useRef(null);
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

  const destinoCity = ALL_CITIES.find(c => c.slug === data.ciudadDestino);
  // Las universidades están en la ficha completa de la ciudad (no en el
  // índice ligero): se pide al elegir destino y el selector se rellena al llegar.
  const destinoDetail = useCityDetails(destinoCity ? [destinoCity.slug] : [])[destinoCity?.slug];
  const universidadesDestino = destinoDetail?.city.universities ?? [];

  // Qué falta en el paso actual: { campo: mensaje }. Vacío = se puede seguir.
  // El botón «Continuar» ya no se desactiva sin explicación: se puede pulsar
  // siempre y, si falta algo, lo dice debajo de cada campo y lleva el foco al
  // primero.
  const stepErrors = () => {
    const e = {};
    switch (current.id) {
      case "origen":
        if (!data.universidadOrigen.trim()) e.universidadOrigen = "Escribe tu universidad de origen.";
        if (!data.gradoOrigen.trim()) e.gradoOrigen = "Escribe tu grado o titulación.";
        break;
      case "destino":
        if (!data.ciudadDestino) e.ciudadDestino = "Elige una ciudad de la lista.";
        else if (!isErasmusEligible(destinoCity)) e.ciudadDestino = "Este formulario solo cubre destinos Erasmus+: elige otra ciudad.";
        else if (!data.universidadDestino) e.universidadDestino = "Elige la universidad de destino.";
        break;
      case "asignaturas":
        if (!data.asignaturas.trim()) e.asignaturas = "Escribe al menos una asignatura.";
        break;
      case "creditos":
        if (!data.creditos.trim()) e.creditos = "Indica cuántos créditos ECTS necesitas.";
        if (!data.idioma) e.idioma = "Elige el idioma de las asignaturas.";
        break;
      case "contacto":
        if (!data.nombre.trim()) e.nombre = "Escribe tu nombre.";
        if (!/\S+@\S+\.\S+/.test(data.email)) e.email = "Escribe un email válido: es donde te respondemos.";
        break;
      default:
    }
    return e;
  };
  const errors = showErrors ? stepErrors() : {};

  // Atributos de un campo: identificador (para llevarle el foco) y, si tiene
  // error, aria-invalid + el mensaje asociado para lectores de pantalla.
  const fieldProps = (name) => ({
    "data-field": name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `la-error-${name}` : undefined,
  });
  const fieldError = (name) => errors[name] && (
    <span id={`la-error-${name}`} className={styles.wizardError} role="alert">{errors[name]}</span>
  );

  const handleNext = () => {
    if (status === "sending") return;
    const missing = Object.keys(stepErrors());
    if (missing.length) {
      setShowErrors(true);
      // El foco va al primer campo con error. El campo ya está en el DOM, así
      // que se enfoca en el acto (sin esperar a un frame: en una pestaña en
      // segundo plano requestAnimationFrame puede tardar o no llegar).
      cardRef.current?.querySelector(`[data-field="${missing[0]}"]`)?.focus();
      return;
    }
    setShowErrors(false);
    if (isLast) {
      sendRequest();
    } else {
      setStep(s => s + 1);
    }
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem(WIZARD_STORAGE_KEY);
    } catch {
      // nada que limpiar si localStorage no está disponible
    }
  };

  const sendRequest = async () => {
    if (!WEB3FORMS_KEY) {
      window.location.href = buildMailto(data, destinoCity);
      setSentVia("mailto");
      setSent(true);
      clearDraft();
      return;
    }
    // Honeypot anti-spam de Web3Forms: si un bot lo marca, no se envía.
    if (botRef.current?.checked) return;

    setStatus("sending");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Learning Agreement: ${data.nombre.trim()} → ${destinoCity?.name || data.ciudadDestino}`,
          from_name: "Learning Agreement MAbroad",
          nombre: data.nombre.trim(),
          email: data.email.trim(),
          universidad_origen: data.universidadOrigen.trim(),
          grado: data.gradoOrigen.trim(),
          ciudad_destino: destinoCity?.name || data.ciudadDestino,
          universidad_destino: data.universidadDestino,
          asignaturas: data.asignaturas.trim(),
          creditos_ects: data.creditos.trim(),
          idioma: data.idioma,
          botcheck: false,
        }),
      });
      let json = null;
      try { json = await res.json(); } catch { /* respuesta no JSON */ }
      if (!res.ok || !json?.success) throw new Error(json?.message || `Error ${res.status}`);
      setSentVia("web3forms");
      setSent(true);
      setStatus("idle");
      clearDraft();
    } catch (err) {
      setStatus("error");
      console.warn("[Learning Agreement] Error al enviar:", err);
    }
  };

  const restart = () => {
    setShowErrors(false);
    setData({ ...WIZARD_DEFAULTS });
    setSent(false);
    setStatus("idle");
    setStep(0);
  };

  const handleCopy = async () => {
    const { subject, body } = buildEmailContent(data, destinoCity);
    const text = `Para: ${CONTACT_EMAIL}\nAsunto: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard no disponible — el botón simplemente no confirma la copia
    }
  };

  const handleBack = () => { setShowErrors(false); setStep(s => Math.max(0, s - 1)); };

  if (sent && sentVia === "web3forms") {
    return (
      <div className={styles.wizardDone} role="status" aria-live="polite">
        <span className={styles.wizardDoneIcon}><IconCheck size={48} /></span>
        <h3 className={styles.wizardDoneTitle}>¡Recibido!</h3>
        <p className={styles.wizardDoneText}>
          Te preparamos una propuesta orientativa de equivalencias y te la mandamos a <strong>{data.email}</strong> en
          un plazo de {PROPOSAL_RESPONSE_TIME}.
          Es una ayuda para preparar tu Learning Agreement: el documento oficial lo firmáis tú y las dos
          universidades.
        </p>
        <div className={styles.wizardDoneActions}>
          <button className={styles.wizardRestartBtn} onClick={restart}>
            Hacer otra solicitud
          </button>
        </div>
      </div>
    );
  }

  if (sent) {
    return (
      <div className={styles.wizardDone}>
        <span className={styles.wizardDoneIcon}><IconSobre size={48} /></span>
        <h3 className={styles.wizardDoneTitle}>Se ha abierto tu cliente de correo</h3>
        <p className={styles.wizardDoneText}>
          Revisa que el email se haya generado bien y envíalo. En cuanto lo recibamos, te preparamos una
          propuesta de equivalencias y te respondemos al correo que nos has dado en un plazo de {PROPOSAL_RESPONSE_TIME}.
        </p>
        <p className={styles.wizardDoneText}>
          Si no se ha abierto ningún programa de correo (pasa en algunos móviles), copia el texto y envíalo
          tú mismo a <strong>{CONTACT_EMAIL}</strong>.
        </p>
        <div className={styles.wizardDoneActions}>
          <button className={styles.wizardCopyBtn} onClick={handleCopy} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            {copied ? <><IconCheck size={16} /> Copiado</> : <><IconClipboard size={16} /> Copiar texto del email</>}
          </button>
          <button
            className={styles.wizardRestartBtn}
            onClick={restart}
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
              {i < step ? "✓" : i + 1}
            </div>
            {i < total - 1 && <div className={`${styles.wizardLine} ${i < step ? styles.wizardLineDone : ""}`} />}
          </div>
        ))}
      </div>

      <div className={styles.wizardCard} ref={cardRef}>
        <div className={styles.wizardCardHeader}>
          <span className={styles.wizardCardEmoji}><current.Icon size={32} /></span>
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
                  {...fieldProps("universidadOrigen")}
                />
                {fieldError("universidadOrigen")}
              </label>
              <label className={styles.wizardLabel}>
                Grado / titulación
                <input
                  className={styles.wizardInput}
                  type="text"
                  placeholder="ej. Grado en Ingeniería en Tecnologías Industriales"
                  value={data.gradoOrigen}
                  onChange={e => update("gradoOrigen", e.target.value)}
                  {...fieldProps("gradoOrigen")}
                />
                {fieldError("gradoOrigen")}
              </label>
            </>
          )}

          {current.id === "destino" && (
            <>
              {/* Buscador con sugerencias (el mismo de la calculadora de
                  beca). Elegir otra ciudad, o borrar la elegida, vacía también
                  la universidad: la lista depende de la ciudad. */}
              <div className={styles.wizardLabel}>
                <label htmlFor="la-ciudad-destino">Ciudad de destino</label>
                <span className={styles.wizardHint}>Escribe para buscar entre los {ALL_CITIES.length} destinos y elige uno de la lista.</span>
                <SearchableInput
                  value={destinoCity?.name || ""}
                  onChange={(text) => {
                    if (destinoCity && text !== destinoCity.name) setData(d => ({ ...d, ciudadDestino: "", universidadDestino: "" }));
                  }}
                  onSelect={(opt) => setData(d => ({ ...d, ciudadDestino: opt.value, universidadDestino: "" }))}
                  options={WIZARD_CITY_OPTIONS}
                  placeholder="ej. Bolonia"
                  inputClassName={styles.wizardInput}
                  inputProps={{ id: "la-ciudad-destino", ...fieldProps("ciudadDestino") }}
                />
                {fieldError("ciudadDestino")}
              </div>
              {data.ciudadDestino && !isErasmusEligible(destinoCity) && (
                <p className={styles.wizardHint} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <IconAlerta size={16} /> El Learning Agreement es un documento específico de Erasmus+, y {destinoCity.name} es un destino de intercambio bilateral (no Erasmus+). Para este tipo de programa, el papeleo de equivalencias lo define tu universidad de origen — consulta con tu oficina de relaciones internacionales.
                </p>
              )}
              {data.ciudadDestino && isErasmusEligible(destinoCity) && (
                <label className={styles.wizardLabel}>
                  Universidad de destino
                  <select
                    className={styles.wizardInput}
                    value={data.universidadDestino}
                    onChange={e => update("universidadDestino", e.target.value)}
                    {...fieldProps("universidadDestino")}
                  >
                    <option value="">Selecciona una universidad…</option>
                    {universidadesDestino.map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                  {fieldError("universidadDestino")}
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
                {...fieldProps("asignaturas")}
              />
              {fieldError("asignaturas")}
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
                  {...fieldProps("creditos")}
                />
                {fieldError("creditos")}
              </label>
              <label className={styles.wizardLabel}>
                Idioma de las asignaturas
                <select
                  className={styles.wizardInput}
                  value={data.idioma}
                  onChange={e => update("idioma", e.target.value)}
                  {...fieldProps("idioma")}
                >
                  <option value="">Selecciona un idioma…</option>
                  {WIZARD_LANGUAGES.map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                {fieldError("idioma")}
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
                  {...fieldProps("nombre")}
                />
                {fieldError("nombre")}
              </label>
              <label className={styles.wizardLabel}>
                Email
                <input
                  className={styles.wizardInput}
                  type="email"
                  placeholder="tucorreo@uni.es"
                  value={data.email}
                  onChange={e => update("email", e.target.value)}
                  {...fieldProps("email")}
                />
                {fieldError("email")}
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
          {/* En el primer paso no hay «Atrás» (antes salía desactivado);
              el hueco se mantiene para que «Continuar» no cambie de sitio. */}
          {step > 0 ? (
            <button className={styles.wizardBackBtn} onClick={handleBack}>
              ← Atrás
            </button>
          ) : <span aria-hidden="true" />}
          <button
            className={styles.wizardNextBtn}
            onClick={handleNext}
            disabled={status === "sending"}
            aria-busy={status === "sending"}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, justifyContent: "center" }}
          >
            {isLast
              ? (status === "sending" ? "Enviando…" : <>Enviar solicitud <IconSobre size={16} /></>)
              : "Continuar →"}
          </button>
        </div>

        {/* Honeypot anti-spam (invisible para personas). */}
        <input
          ref={botRef}
          type="checkbox"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        />

        {status === "error" && (
          <p className={styles.wizardHint} role="alert" style={{ marginTop: 14, color: "#DC2626" }}>
            No hemos podido enviarla. Inténtalo de nuevo o{" "}
            <a href={buildMailto(data, destinoCity)} style={{ color: "inherit", textDecoration: "underline" }}>envíala por email</a>.
          </p>
        )}

        <p className={styles.wizardPrivacy}>
          Hasta que pulsas «Enviar solicitud», el borrador se guarda solo en este navegador. Al enviarla nos
          llega con Web3Forms. Los datos los usa Miguel Ángel Suárez (MAbroad) solo para prepararte la
          propuesta y responderte, y los borra 6 meses después.{" "}
          <Link to="/privacidad">Privacidad y tus derechos</Link>
        </p>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */

export default function LearningAgreementPage() {

  useSEO({
    title: "Learning Agreement Erasmus: la guía completa | MAbroad",
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
          <Link className={`${styles.backBtn} link-btn`} to="/proceso">
            ← Volver al proceso
          </Link>
          <SectionLabel color="#10B981">Documento clave</SectionLabel>
          <h1 className={styles.heroTitle}>
            Tu Learning<br />
            <span className={styles.heroAccent}>Agreement</span>
          </h1>
          <p className={styles.heroSub}>
            El contrato que define qué estudias y qué te convalidan.
            El documento que más agobia — y el que mejor puedes preparar si sabes cómo.
          </p>
          {/* La herramienta de la página (pedir una propuesta de
              equivalencias revisada a mano) está muy abajo: desde aquí se
              llega con un toque. Ancla nativa a #wizard-la. */}
          <div className={styles.heroCtaRow}>
            <a className={styles.heroCta} href="#wizard-la">
              Pide tu propuesta de equivalencias <span aria-hidden="true">↓</span>
            </a>
            <span className={styles.heroCtaNote}>La revisamos a mano y te respondemos por email en {PROPOSAL_RESPONSE_TIME}.</span>
          </div>

          {/* Tres datos con el mismo formato (valor + etiqueta). El tercero
              era un icono suelto sin valor y en móvil la fila se descolocaba. */}
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>3</span>
              <span className={styles.heroStatLabel}>Firmas necesarias</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>Digital</span>
              <span className={styles.heroStatLabel}>Cada vez más con Erasmus Without Paper</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>Variable</span>
              <span className={styles.heroStatLabel}>Plazo de cambios, según tu uni</span>
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
      <section className={`${styles.section} ${styles.anchorSection}`} id="wizard-la">
        <div className={styles.sectionInner} style={{ maxWidth: 640 }}>
          <SectionLabel color="#10B981">Herramienta</SectionLabel>
          <h2 className={styles.sectionTitle}>Pide tu propuesta de equivalencias</h2>
          <p className={styles.sectionText}>
            Rellena estos datos en menos de 2 minutos y te ayudamos a preparar una propuesta de equivalencias para
            tu Learning Agreement: la revisamos a mano y te la mandamos por email en un plazo de {PROPOSAL_RESPONSE_TIME}. Es una ayuda orientativa, no el
            documento oficial, que se tramita con tu universidad y lo aprobáis tú y las dos universidades.
          </p>
          <LAWizard />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>¿Quieres repasar el proceso completo?</h2>
        <p className={styles.ctaSub}>
          El Learning Agreement es solo uno de los 8 pasos. Que no se te escape ninguno. Y si quieres repasar
          tablas, firmas y plazos de cambio, lee la{" "}
          <Link to="/guias/learning-agreement-paso-a-paso" className="guide-link-inline">guía del Learning Agreement paso a paso</Link>.
        </p>
        <div className={styles.ctaBtns}>
          <Link className="btn-primary" to="/proceso">
            Ver todos los pasos →
          </Link>
          <Link className="btn-ghost" to="/">
            Explorar destinos
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
