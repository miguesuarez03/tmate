import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GA_MEASUREMENT_ID, initGA, trackPageview } from "../lib/analytics";

// No renderiza nada — solo inicializa gtag.js (si hay Measurement ID) y
// registra un page_view en cada cambio de ruta de la SPA.
export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    initGA();
  }, []);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    trackPageview(location.pathname + location.search);
  }, [location]);

  return null;
}
