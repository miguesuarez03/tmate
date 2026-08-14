// ─────────────────────────────────────────────────────────────────────────────
// Google Analytics 4 (gtag.js) — carga diferida y solo en cliente.
//
// El Measurement ID viene de la variable de entorno VITE_GA_MEASUREMENT_ID
// (ver .env.example). Si no está definida, initGA()/trackPageview() no hacen
// nada: el sitio funciona exactamente igual, sin scripts de terceros ni
// llamadas de red a Google. No hay ningún ID inventado en el código.
// ─────────────────────────────────────────────────────────────────────────────

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

let initialized = false;

export function initGA() {
  if (!GA_MEASUREMENT_ID || initialized || typeof window === "undefined") return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  // send_page_view: false — las vistas se envían manualmente en cada cambio
  // de ruta vía trackPageview(), porque esto es una SPA (react-router) y
  // gtag por defecto solo registra la carga inicial.
  gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageview(path) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path });
}
