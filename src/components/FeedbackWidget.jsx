import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./FeedbackWidget.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// Botón flotante «¿Qué te falta?» + panel de feedback.
//
// Envío sin backend propio vía Web3Forms (https://web3forms.com). La access key
// viene de VITE_WEB3FORMS_KEY (ver .env.example) — es una clave pública por
// diseño (solo permite enviar al email asociado). Si no está definida, el
// formulario hace fallback a un mailto: con el texto ya rellenado.
//
// Se registra siempre la página desde la que se envía (ruta + URL completa).
// ─────────────────────────────────────────────────────────────────────────────

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
// Mismo buzón de contacto que usa el resto de la web (MethodologyNote, LA, /privacidad).
const FEEDBACK_EMAIL = "suarezalvarez.ma03@gmail.com";
const MAX_LEN = 2000;

function buildMailto({ message, email, page }) {
  const subject = "Feedback MAbroad: ¿qué te falta?";
  const body = `${message}\n\n—\nPágina: ${page}${email ? `\nEmail de contacto: ${email}` : ""}`;
  return `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5v-8Z"
        stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"
      />
      <path d="M8.5 8.5h7M8.5 11.5h4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export default function FeedbackWidget() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const fabRef = useRef(null);
  const panelRef = useRef(null);
  const textareaRef = useRef(null);
  const closeRef = useRef(null);
  const ids = useId();
  const titleId = `fb-title-${ids}`;
  const textId = `fb-text-${ids}`;
  const emailId = `fb-email-${ids}`;
  const descId = `fb-desc-${ids}`;

  const path = location.pathname + location.search;
  // En City Match y el comparador el botón va en formato icono (más discreto,
  // no compite con el quiz ni con la barra "Comparar"); en las fichas de
  // ciudad sube por encima de las burbujas de WhatsApp/alojamiento.
  const compact = location.pathname === "/city-match" || location.pathname === "/comparar";
  const onCityPage = location.pathname.startsWith("/city/");

  // Al cambiar de página se cierra el panel.
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Foco: al abrir, al textarea (o al botón cerrar si ya se envió); al cerrar,
  // de vuelta al botón flotante.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        (status === "success" ? closeRef.current : textareaRef.current)?.focus();
      }, 30);
      wasOpen.current = true;
      return () => clearTimeout(t);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      fabRef.current?.focus();
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Escape para cerrar + trampa de foco con Tab dentro del panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll(
        'button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), a[href]'
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
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const openPanel = () => {
    // Si se reabre tras un envío correcto, empieza de cero.
    if (status === "success") {
      setStatus("idle");
      setMessage("");
      setEmail("");
    }
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text || status === "sending") return;
    const pageUrl = typeof window !== "undefined" ? window.location.href : path;

    if (!WEB3FORMS_KEY) {
      window.location.href = buildMailto({ message: text, email: email.trim(), page: pageUrl });
      setStatus("success");
      return;
    }

    // Honeypot anti-spam de Web3Forms: si un bot lo marca, no se envía.
    const botcheck = e.currentTarget.elements.namedItem("botcheck");
    if (botcheck && botcheck.checked) return;

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Feedback MAbroad (${path})`,
          from_name: "Feedback MAbroad",
          message: text,
          ...(email.trim() ? { email: email.trim() } : {}),
          pagina: path,
          url: pageUrl,
          botcheck: false,
        }),
      });
      let data = null;
      try { data = await res.json(); } catch { /* respuesta no JSON */ }
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || `Error ${res.status}`);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        typeof navigator !== "undefined" && navigator.onLine === false
          ? "Parece que no tienes conexión."
          : "No hemos podido enviarlo."
      );
      console.warn("[Feedback] Error al enviar:", err);
    }
  };

  const fabClass = [
    styles.fab,
    compact ? styles.fabCompact : "",
    onCityPage ? styles.fabRaised : "",
    open ? styles.fabHidden : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        className={fabClass}
        onClick={openPanel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="¿Qué te falta? Envíanos tu feedback"
        title="¿Qué te falta? Envíanos tu feedback"
      >
        <span className={styles.fabIcon}><ChatIcon /></span>
        <span className={styles.fabLabel}>¿Qué te falta?</span>
      </button>

      {open && (
        <>
          <div className={styles.backdrop} onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Cerrar panel de feedback"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>

            {status === "success" ? (
              <div className={styles.success} role="status" aria-live="polite">
                <div className={styles.successIcon} aria-hidden="true">✓</div>
                <h2 id={titleId} className={styles.title}>¡Gracias!</h2>
                <p id={descId} className={styles.desc}>
                  {WEB3FORMS_KEY
                    ? "Lo hemos recibido. Lo leemos todo y nos ayuda muchísimo a mejorar MAbroad."
                    : "Se ha abierto tu app de correo con el mensaje listo: solo te falta pulsar enviar."}
                </p>
                <button type="button" className={styles.submit} onClick={() => setOpen(false)}>
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 id={titleId} className={styles.title}>¿Qué te falta o qué mejorarías?</h2>
                <p id={descId} className={styles.desc}>
                  Una idea, algo que no encuentras o algo que no funciona. Cualquier cosa vale.
                </p>

                <label htmlFor={textId} className={styles.srOnly}>Tu comentario</label>
                <textarea
                  ref={textareaRef}
                  id={textId}
                  className={styles.textarea}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Me faltaría…"
                  rows={4}
                  maxLength={MAX_LEN}
                  required
                  disabled={status === "sending"}
                />

                <label htmlFor={emailId} className={styles.label}>
                  Email <span className={styles.optional}>(opcional, por si quieres respuesta)</span>
                </label>
                <input
                  id={emailId}
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  inputMode="email"
                  disabled={status === "sending"}
                />

                {/* Honeypot anti-spam (invisible para personas). */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className={styles.honeypot}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {status === "error" && (
                  <p className={styles.error} role="alert">
                    {errorMsg} Inténtalo de nuevo o{" "}
                    <a href={buildMailto({ message: message.trim(), email: email.trim(), page: window.location.href })}>
                      escríbenos por email
                    </a>.
                  </p>
                )}

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={status === "sending" || !message.trim()}
                  aria-busy={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className={styles.spinner} aria-hidden="true" />
                      Enviando…
                    </>
                  ) : (
                    "Enviar"
                  )}
                </button>
                <p className={styles.fine}>
                  Recibimos tu mensaje, la página desde la que escribes y, si lo dejas, tu email. Lo lee
                  Miguel Ángel Suárez (MAbroad) para mejorar la web y responderte; se envía con Web3Forms.{" "}
                  <Link to="/privacidad">Privacidad y tus derechos</Link>
                </p>
              </form>
            )}
          </div>
        </>
      )}
    </>
  );
}
