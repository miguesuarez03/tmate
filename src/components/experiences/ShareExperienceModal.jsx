import { useEffect, useId, useMemo, useRef, useState } from "react";
import { getAllCities } from "../../lib/cities";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { IconCheck, IconLapiz } from "../icons";
import styles from "./ShareExperienceModal.module.css";

// Índice ligero de ciudades (ver lib/cities.js).
const ALL_CITIES = getAllCities();

// ─────────────────────────────────────────────────────────────────────────────
// «Compartir mi experiencia» — formulario real.
//
// Se envía con Web3Forms (misma clave pública que el feedback, ver
// .env.example) a tu correo. NADA se publica solo: la experiencia llega con un
// bloque «para_publicar» ya formateado y, si la apruebas, lo pegas a mano en
// src/data/cityExperiences.js. Sin clave, hace fallback a un mailto:.
// ─────────────────────────────────────────────────────────────────────────────

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
// Mismo buzón que el resto de la web (FeedbackWidget, MethodologyNote, /privacidad).
const CONTACT_EMAIL = "suarezalvarez.ma03@gmail.com";
const MAX_LEN = 1500;
const MIN_LEN = 40;
const YEARS_BACK = 15;
const CONSENT_TEXT = "Acepto que MAbroad publique mi experiencia (con el nombre o alias que indico, o sin nombre si lo he marcado) tras revisarla.";

/** Curso «2026-27» a partir del año en que empieza. */
const courseLabel = (y) => `${y}-${String((y + 1) % 100).padStart(2, "0")}`;

const RATING_WORDS = ["", "Regular", "Bien", "Muy bien", "Genial", "Imprescindible"];

const EMPTY = { city: "", course: "", homeUniversity: "", hostUniversity: "", name: "", anonymous: false, text: "", rating: 0, email: "", consent: false };

const SORTED_CITIES = [...ALL_CITIES].sort((a, b) => a.name.localeCompare(b.name, "es"));

/**
 * Bloque listo para pegar en src/data/cityExperiences.js (sin el email). Si la
 * persona prefiere salir sin nombre, el nombre real no entra en el bloque (iría
 * al JavaScript público): solo llega en el campo «nombre_o_alias» del correo.
 */
function publishSnippet(d) {
  const fields = [
    `name: ${JSON.stringify(d.anonymous ? "Anónimo" : d.name.trim())}`,
    ...(d.anonymous ? ["anonymous: true"] : []),
    `homeUniversity: ${JSON.stringify(d.homeUniversity.trim())}`,
    ...(d.hostUniversity.trim() ? [`hostUniversity: ${JSON.stringify(d.hostUniversity.trim())}`] : []),
    `course: ${JSON.stringify(d.course)}`,
    `text: ${JSON.stringify(d.text.trim())}`,
    ...(d.rating ? [`rating: ${d.rating}`] : []),
  ];
  return `// Dentro de CITY_EXPERIENCES, en «${d.city}: [ … ]»:\n{ ${fields.join(", ")} },`;
}

function buildMailto(d, cityName) {
  const subject = `Mi experiencia en ${cityName} (curso ${d.course})`;
  const body = [
    `Ciudad: ${cityName}`,
    `Curso: ${d.course}`,
    `Universidad de origen: ${d.homeUniversity.trim()}`,
    `Universidad de destino: ${d.hostUniversity.trim() || "(no indicada)"}`,
    `Nombre o alias: ${d.name.trim()}${d.anonymous ? " (prefiero salir sin nombre)" : ""}`,
    `Valoración: ${d.rating ? `${d.rating}/5` : "sin valoración"}`,
    "",
    d.text.trim(),
    "",
    CONSENT_TEXT,
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Diálogo modal con el formulario. Se pinta en document.body (portal) solo
 * mientras está abierto, así que no afecta al prerender.
 * @param {{ open: boolean, onClose: () => void, initialCity?: string }} props
 */
export default function ShareExperienceModal({ open, onClose, initialCity = "" }) {
  const [data, setData] = useState(EMPTY);
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | sending | success | mailto | error
  const [errorMsg, setErrorMsg] = useState("");

  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const uid = useId();
  const id = (name) => `exp-${name}-${uid}`;
  const titleId = id("title");

  // Cursos desde el actual hacia atrás (el formulario solo se pinta en el
  // cliente, al abrirlo, así que leer la fecha aquí no afecta a la hidratación).
  const courses = useMemo(() => {
    const now = new Date();
    const start = now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
    return Array.from({ length: YEARS_BACK + 1 }, (_, i) => courseLabel(start - i));
  }, []);

  const city = ALL_CITIES.find((c) => c.slug === data.city);
  const update = (field, value) => setData((d) => ({ ...d, [field]: value }));

  // Al abrir: formulario limpio (con la ciudad de la ficha, si viene de una),
  // foco al primer campo, Escape para cerrar, Tab atrapado dentro y la página
  // de detrás sin scroll. Al cerrar, el foco vuelve a donde estaba.
  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
    setData({ ...EMPTY, city: initialCity });
    setStatus("idle");
    setErrorMsg("");

    const t = setTimeout(() => firstFieldRef.current?.focus(), 30);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll(
        'button:not([disabled]), select:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), a[href]'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocusRef.current?.focus?.();
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Tras enviar, el foco pasa al botón «Cerrar» del mensaje de gracias.
  useEffect(() => {
    if (status === "success" || status === "mailto") closeRef.current?.focus();
  }, [status]);

  if (!open || typeof document === "undefined") return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    if (!city) return;

    if (!WEB3FORMS_KEY) {
      window.location.href = buildMailto(data, city.name);
      setStatus("mailto");
      return;
    }

    // Honeypot anti-spam de Web3Forms: si un bot lo marca, no se envía.
    const botcheck = form.elements.namedItem("botcheck");
    if (botcheck && botcheck.checked) return;

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nueva experiencia para revisar: ${city.name} (curso ${data.course})`,
          from_name: "Experiencias MAbroad",
          ciudad: `${city.name} (${city.slug})`,
          curso: data.course,
          universidad_origen: data.homeUniversity.trim(),
          universidad_destino: data.hostUniversity.trim() || "(no indicada)",
          nombre_o_alias: data.name.trim(),
          publicar_sin_nombre: data.anonymous ? "Sí" : "No",
          valoracion: data.rating ? `${data.rating}/5` : "Sin valoración",
          experiencia: data.text.trim(),
          ...(data.email.trim() ? { email: data.email.trim() } : {}),
          consentimiento_publicacion: `Sí: «${CONSENT_TEXT}» — ${new Date().toISOString()}`,
          para_publicar: publishSnippet(data),
          botcheck: false,
        }),
      });
      let json = null;
      try { json = await res.json(); } catch { /* respuesta no JSON */ }
      if (!res.ok || !json?.success) throw new Error(json?.message || `Error ${res.status}`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        typeof navigator !== "undefined" && navigator.onLine === false
          ? "Parece que no tienes conexión."
          : "No hemos podido enviarla."
      );
      console.warn("[Experiencia] Error al enviar:", err);
    }
  };

  const sending = status === "sending";
  const shownRating = hoverRating || data.rating;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        {status === "success" || status === "mailto" ? (
          <div className={styles.success} role="status" aria-live="polite">
            <span className={styles.successIcon}><IconCheck size={56} /></span>
            <h2 id={titleId} className={styles.title}>Gracias.</h2>
            <p className={styles.successText}>
              {status === "success"
                ? "La revisaremos antes de publicarla."
                : "Se ha abierto tu app de correo con tu experiencia lista: solo te falta pulsar enviar. La revisaremos antes de publicarla."}
            </p>
            <button ref={closeRef} type="button" className={styles.submit} onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.header}>
              <span className={styles.headerIcon}><IconLapiz size={44} /></span>
              <div>
                <h2 id={titleId} className={styles.title}>Comparte tu experiencia</h2>
                <p className={styles.subtitle}>
                  Cuéntale al siguiente lo que a ti te habría gustado saber. La leemos antes de publicarla.
                </p>
              </div>
            </div>

            <div className={`${styles.row} ${styles.rowCityYear}`}>
              <div className={styles.field}>
                <label htmlFor={id("city")} className={styles.label}>Ciudad</label>
                <select
                  ref={firstFieldRef}
                  id={id("city")}
                  className={`${styles.input} ${styles.select}`}
                  value={data.city}
                  onChange={(e) => update("city", e.target.value)}
                  required
                  disabled={sending}
                >
                  <option value="">Elige la ciudad…</option>
                  {SORTED_CITIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name} — {c.country}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor={id("course")} className={styles.label}>Curso</label>
                <select
                  id={id("course")}
                  className={`${styles.input} ${styles.select}`}
                  value={data.course}
                  onChange={(e) => update("course", e.target.value)}
                  required
                  disabled={sending}
                >
                  <option value="">Curso…</option>
                  {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor={id("uni")} className={styles.label}>Universidad de origen</label>
                <input
                  id={id("uni")}
                  className={styles.input}
                  value={data.homeUniversity}
                  onChange={(e) => update("homeUniversity", e.target.value)}
                  placeholder="Ej. Universidad de Sevilla"
                  autoComplete="organization"
                  maxLength={120}
                  required
                  disabled={sending}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor={id("name")} className={styles.label}>Nombre o alias</label>
                <input
                  id={id("name")}
                  className={styles.input}
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Ej. Laura o L. G."
                  autoComplete="nickname"
                  maxLength={60}
                  required
                  aria-describedby={id("name-hint")}
                  disabled={sending}
                />
                <span id={id("name-hint")} className={styles.hint}>
                  {data.anonymous ? "No se publicará: solo lo vemos nosotros." : "Es lo que se publicará junto a tu experiencia."}
                </span>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor={id("host")} className={styles.label}>
                  Universidad de destino <span className={styles.optional}>(opcional)</span>
                </label>
                <input
                  id={id("host")}
                  className={styles.input}
                  value={data.hostUniversity}
                  onChange={(e) => update("hostUniversity", e.target.value)}
                  placeholder="Ej. Sapienza"
                  maxLength={120}
                  disabled={sending}
                />
              </div>
              <div className={`${styles.field} ${styles.checkField}`}>
                <label className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    checked={data.anonymous}
                    onChange={(e) => update("anonymous", e.target.checked)}
                    disabled={sending}
                  />
                  Prefiero salir sin nombre
                </label>
                <span className={styles.hint}>Saldrá como «Estudiante de» tu universidad.</span>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor={id("text")} className={styles.label}>Tus consejos y tu experiencia</label>
              <textarea
                id={id("text")}
                className={`${styles.input} ${styles.textarea}`}
                value={data.text}
                onChange={(e) => update("text", e.target.value)}
                placeholder="Transporte (qué abono coger), barrios para vivir, supermercados, sitios baratos para salir, apps útiles… y lo que te sorprendió. Sé honesto/a."
                rows={6}
                minLength={MIN_LEN}
                maxLength={MAX_LEN}
                required
                aria-describedby={id("text-count")}
                disabled={sending}
              />
              <span id={id("text-count")} className={`${styles.hint} ${styles.count}`}>
                {data.text.length}/{MAX_LEN}{data.text.length > 0 && data.text.trim().length < MIN_LEN ? ` · mínimo ${MIN_LEN}` : ""}
              </span>
            </div>

            <fieldset className={styles.ratingField} disabled={sending}>
              <legend className={styles.label}>Valoración <span className={styles.optional}>(opcional)</span></legend>
              <div className={styles.ratingRow} onMouseLeave={() => setHoverRating(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <label
                    key={n}
                    className={`${styles.star}${n <= shownRating ? ` ${styles.starActive}` : ""}`}
                    onMouseEnter={() => setHoverRating(n)}
                  >
                    <input
                      type="radio"
                      name={id("rating")}
                      value={n}
                      checked={data.rating === n}
                      onChange={() => update("rating", n)}
                      className={styles.starInput}
                    />
                    <span aria-hidden="true">★</span>
                    <span className="sr-only">{n} de 5</span>
                  </label>
                ))}
                {shownRating > 0 && <span className={styles.ratingWord} aria-hidden="true">{RATING_WORDS[shownRating]}</span>}
                {data.rating > 0 && (
                  <button type="button" className={styles.clearRating} onClick={() => update("rating", 0)}>
                    Quitar
                  </button>
                )}
              </div>
            </fieldset>

            <div className={styles.field}>
              <label htmlFor={id("email")} className={styles.label}>
                Email <span className={styles.optional}>(opcional)</span>
              </label>
              <input
                id={id("email")}
                type="email"
                className={styles.input}
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="tu@email.com"
                autoComplete="email"
                inputMode="email"
                aria-describedby={id("email-hint")}
                disabled={sending}
              />
              <span id={id("email-hint")} className={styles.hint}>
                Solo para avisarte cuando se publique o si tenemos alguna duda. Nunca se publica.
              </span>
            </div>

            <div className={styles.consent}>
              <input
                id={id("consent")}
                type="checkbox"
                checked={data.consent}
                onChange={(e) => update("consent", e.target.checked)}
                required
                disabled={sending}
              />
              <label htmlFor={id("consent")}>
                {CONSENT_TEXT}{" "}
                <Link to="/privacidad" target="_blank" rel="noopener">Política de privacidad</Link>
              </label>
            </div>

            {/* Honeypot anti-spam (invisible para personas). */}
            <input type="checkbox" name="botcheck" className={styles.honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" />

            {status === "error" && (
              <p className={styles.error} role="alert">
                {errorMsg} Inténtalo de nuevo o{" "}
                <a href={city ? buildMailto(data, city.name) : `mailto:${CONTACT_EMAIL}`}>envíala por email</a>.
              </p>
            )}

            <button type="submit" className={styles.submit} disabled={sending} aria-busy={sending}>
              {sending ? (<><span className={styles.spinner} aria-hidden="true" />Enviando…</>) : "Enviar mi experiencia"}
            </button>

            <p className={styles.fine}>
              Responsable: Miguel Ángel Suárez Álvarez (MAbroad). Usamos estos datos solo para revisar y
              publicar tu experiencia; se envían con Web3Forms. Si se publica, aparecen tu nombre o alias, la
              ciudad, el curso, tus universidades, la valoración y el texto; el email, nunca. Puedes retirar tu
              consentimiento cuando quieras y la quitaremos.{" "}
              <Link to="/privacidad" target="_blank" rel="noopener">Privacidad y tus derechos</Link>
            </p>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
