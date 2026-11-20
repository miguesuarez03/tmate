import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";
import { getUniversityEntry } from "../data/universities/registry";
import { buildUniversityView, getCampus, getDegreeName, isStudyRelation } from "../lib/universities";

// ─────────────────────────────────────────────────────────────────────────────
// Modo «Mi universidad»: universidad, grado y campus elegidos, para toda la web.
//
// Se guarda en localStorage y también se puede abrir por enlace
// (/?uni=loyola&grado=giti: la URL manda, se guarda y se quita de la barra
// de direcciones, para que cambiar o quitar la elección no se deshaga al
// recargar; «Copiar enlace» la vuelve a generar). Como en useStoredState,
// el primer render es SIEMPRE el modo apagado —igual que el HTML
// prerenderizado— y lo guardado se aplica en un layout effect, antes de pintar:
// así se hidrata sin desajustes y la URL no cambia lo que se prerenderiza.
// Sin universidad elegida, `filtering` es false y nada filtra ni añade
// distintivos: la web queda exactamente como sin este modo.
//
// Invitación «¿Eres de…?»: se puede cerrar y no vuelve en la sesión
// (sessionStorage). El HTML prerenderizado la trae siempre; para que no
// parpadee a quien ya eligió universidad o la cerró, un script en línea de
// index.html marca <html data-uni-invite="off"> antes de pintar, y este
// proveedor mantiene esa marca al día (ver .uni-invite en global.css).
// ─────────────────────────────────────────────────────────────────────────────

export const UNIVERSITY_STORAGE_KEY = "mabroad:universidad";
export const INVITE_DISMISSED_KEY = "mabroad:invitacion-universidad";

const OFF = {
  ready: false,
  uniId: null,
  degreeId: null,
  campusId: null,
  campus: null,
  entry: null,
  data: null,
  degreeName: null,
  view: null,
  active: false,
  filtering: false,
  loadError: false,
  inviteDismissed: false,
  dismissInvite: () => {},
  retry: () => {},
  showAll: false,
  setShowAll: () => {},
  setUniversity: () => {},
  setDegree: () => {},
  setCampus: () => {},
  clear: () => {},
  isIncluded: () => true,
  placesFor: () => [],
  allPlacesFor: () => [],
  otherPlacesFor: () => [],
};

const UniversityContext = createContext(OFF);

function save(sel) {
  try {
    if (sel.uni) localStorage.setItem(UNIVERSITY_STORAGE_KEY, JSON.stringify(sel));
    else localStorage.removeItem(UNIVERSITY_STORAGE_KEY);
  } catch {
    // Sin almacenamiento: el modo funciona igual, solo que no se recuerda.
  }
}

const EMPTY = { uni: null, grado: null, campus: null };

export function UniversityProvider({ children }) {
  const [sel, setSel] = useState(EMPTY);
  const [ready, setReady] = useState(false); // lo guardado ya está aplicado
  const [inviteDismissed, setInviteDismissed] = useState(false);
  const [loaded, setLoaded] = useState(null); // { id, data, mapping }
  const [failedId, setFailedId] = useState(null); // universidad cuya descarga falló
  const [attempt, setAttempt] = useState(0); // sube con «Reintentar»
  const [showAll, setShowAll] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Lo guardado / el enlace se aplican tras el primer render (ver arriba).
  useIsoLayoutEffect(() => {
    try {
      setInviteDismissed(sessionStorage.getItem(INVITE_DISMISSED_KEY) === "1");
    } catch {
      // Sin sessionStorage: la invitación se enseña.
    }
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get("uni");
      const saved = JSON.parse(localStorage.getItem(UNIVERSITY_STORAGE_KEY) ?? "null");
      if (fromUrl && getUniversityEntry(fromUrl)) {
        // El campus guardado se conserva si el enlace es de la misma universidad.
        const next = { uni: fromUrl, grado: params.get("grado") || null, campus: saved?.uni === fromUrl ? saved.campus ?? null : null };
        setSel(next);
        save(next);
      } else if (saved?.uni && getUniversityEntry(saved.uni)) {
        setSel({ uni: saved.uni, grado: saved.grado ?? null, campus: saved.campus ?? null });
      }
    } catch {
      // JSON roto o sin almacenamiento: modo apagado.
    }
    setReady(true);
  }, []);

  // Marca para el CSS de la invitación (ver arriba). Solo cuando ya se ha
  // aplicado lo guardado: antes manda la del script en línea.
  useIsoLayoutEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.uniInvite = sel.uni || inviteDismissed ? "off" : "on";
  }, [ready, sel.uni, inviteDismissed]);

  // Ya aplicados (y guardados), ?uni= y ?grado= salen de la URL: si no, al
  // recargar volverían a imponerse sobre lo que se haya cambiado o quitado.
  // Se lee la URL real (window.location), no `location`: los efectos de las
  // páginas corren antes que este y pueden haber navegado ya (p. ej.
  // /?uni=loyola&buscar=Berlin abre la ficha); con `location` se pisaría esa
  // navegación volviendo a la URL anterior.
  useEffect(() => {
    const { pathname, search: rawSearch, hash } = window.location;
    const params = new URLSearchParams(rawSearch);
    if (!params.has("uni") && !params.has("grado")) return;
    params.delete("uni");
    params.delete("grado");
    const search = params.toString();
    navigate({ pathname, search: search ? `?${search}` : "", hash }, { replace: true });
  }, [location.key, navigate]);

  // Datos de la universidad: solo se descargan al elegirla.
  useEffect(() => {
    const entry = getUniversityEntry(sel.uni);
    if (!entry || loaded?.id === entry.id) return undefined;
    let cancelled = false;
    setFailedId(null);
    entry
      .load()
      .then(([data, mapping]) => {
        if (!cancelled) setLoaded({ id: entry.id, data, mapping });
      })
      .catch(() => {
        // Sin conexión o chunk caducado: el modo se queda sin filtrar y el
        // selector ofrece «Reintentar».
        if (!cancelled) setFailedId(entry.id);
      });
    return () => {
      cancelled = true;
    };
  }, [sel.uni, loaded?.id, attempt]);
  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const update = useCallback((fn) => {
    setSel((prev) => {
      const next = fn(prev);
      save(next);
      return next;
    });
  }, []);
  const setUniversity = useCallback((uni, grado = null) => {
    const valid = getUniversityEntry(uni) ? uni : null;
    update((prev) => ({ uni: valid, grado: valid ? grado || null : null, campus: valid && prev.uni === valid ? prev.campus : null }));
    setShowAll(false);
  }, [update]);
  const setDegree = useCallback((grado) => {
    update((prev) => ({ ...prev, grado: grado || null }));
    setShowAll(false);
  }, [update]);
  const setCampus = useCallback((campus) => update((prev) => ({ ...prev, campus: campus || null })), [update]);
  const clear = useCallback(() => setUniversity(null), [setUniversity]);
  const dismissInvite = useCallback(() => {
    setInviteDismissed(true);
    try {
      sessionStorage.setItem(INVITE_DISMISSED_KEY, "1");
    } catch {
      // Sin sessionStorage: se oculta hasta recargar.
    }
  }, []);

  const value = useMemo(() => {
    const entry = getUniversityEntry(sel.uni);
    const base = { ready, inviteDismissed, dismissInvite, setUniversity, setDegree, setCampus, clear };
    // Apagado, pero con las acciones reales: desde aquí se elige la universidad.
    if (!entry) return { ...OFF, ...base };
    const data = loaded?.id === entry.id ? loaded.data : null;
    const mapping = loaded?.id === entry.id ? loaded.mapping : null;
    // Un grado que no existe en los datos (enlace mal copiado) se ignora.
    const degreeName = data ? getDegreeName(data, sel.grado) : null;
    const degreeId = data && !degreeName ? null : sel.grado;
    const campus = getCampus(entry, sel.campus);
    const view = data ? buildUniversityView(data, mapping, degreeId, entry) : null;
    const active = Boolean(view);
    const filtering = active && !showAll;
    const inCity = (slug) => (data?.relations ?? []).filter((r) => mapping?.[r.relationId] === slug);
    return {
      ...base,
      uniId: entry.id,
      degreeId,
      campusId: campus?.id ?? null,
      campus,
      entry,
      data,
      degreeName,
      view,
      active,
      filtering,
      loadError: !data && failedId === entry.id,
      retry,
      showAll,
      setShowAll,
      isIncluded: (slug) => !filtering || view.slugs.has(slug),
      // Convenios de estudios para el grado elegido en esa ciudad.
      placesFor: (slug) => (view?.bySlug.get(slug) ?? []),
      // Todos los convenios de estudios de la ciudad, de cualquier titulación (ficha: «ver todas»).
      allPlacesFor: (slug) => inCity(slug).filter((r) => isStudyRelation(r, entry)),
      // Convenios de otros programas (MAGIS…) en la ciudad: aparte y plegados.
      otherPlacesFor: (slug) => inCity(slug).filter((r) => !isStudyRelation(r, entry)),
    };
  }, [sel, ready, inviteDismissed, dismissInvite, loaded, failedId, retry, showAll, setUniversity, setDegree, setCampus, clear]);

  return <UniversityContext.Provider value={value}>{children}</UniversityContext.Provider>;
}

/** Estado del modo «Mi universidad» (fuera del provider, siempre apagado). */
export function useUniversity() {
  return useContext(UniversityContext);
}
