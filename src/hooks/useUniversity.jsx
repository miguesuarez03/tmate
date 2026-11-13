import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";
import { getUniversityEntry } from "../data/universities/registry";
import { buildUniversityView, getDegreeName } from "../lib/universities";

// ─────────────────────────────────────────────────────────────────────────────
// Modo «Mi universidad»: universidad + grado elegidos, para toda la web.
//
// Se guarda en localStorage y también se puede abrir por enlace
// (/?uni=loyola&grado=giti: la URL manda y se guarda). Como en useStoredState,
// el primer render es SIEMPRE el modo apagado —igual que el HTML
// prerenderizado— y lo guardado se aplica en un layout effect, antes de pintar:
// así se hidrata sin desajustes y la URL no cambia lo que se prerenderiza.
// Sin universidad elegida, `filtering` es false y nada filtra ni añade
// distintivos: la web queda exactamente como sin este modo.
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "mabroad:universidad";

const OFF = {
  uniId: null,
  degreeId: null,
  entry: null,
  data: null,
  degreeName: null,
  view: null,
  active: false,
  filtering: false,
  showAll: false,
  setShowAll: () => {},
  setUniversity: () => {},
  setDegree: () => {},
  clear: () => {},
  isIncluded: () => true,
  placesFor: () => [],
  allPlacesFor: () => [],
};

const UniversityContext = createContext(OFF);

function save(sel) {
  try {
    if (sel.uni) localStorage.setItem(STORAGE_KEY, JSON.stringify(sel));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Sin almacenamiento: el modo funciona igual, solo que no se recuerda.
  }
}

export function UniversityProvider({ children }) {
  const [sel, setSel] = useState({ uni: null, grado: null });
  const [loaded, setLoaded] = useState(null); // { id, data, mapping }
  const [showAll, setShowAll] = useState(false);

  // Lo guardado / el enlace se aplican tras el primer render (ver arriba).
  useIsoLayoutEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get("uni");
      if (fromUrl && getUniversityEntry(fromUrl)) {
        const next = { uni: fromUrl, grado: params.get("grado") || null };
        setSel(next);
        save(next);
        return;
      }
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved?.uni && getUniversityEntry(saved.uni)) setSel({ uni: saved.uni, grado: saved.grado ?? null });
    } catch {
      // JSON roto o sin almacenamiento: modo apagado.
    }
  }, []);

  // Datos de la universidad: solo se descargan al elegirla.
  useEffect(() => {
    const entry = getUniversityEntry(sel.uni);
    if (!entry || loaded?.id === entry.id) return undefined;
    let cancelled = false;
    entry
      .load()
      .then(([data, mapping]) => {
        if (!cancelled) setLoaded({ id: entry.id, data, mapping });
      })
      .catch(() => {
        // Sin conexión o chunk caducado: el modo se queda sin filtrar.
      });
    return () => {
      cancelled = true;
    };
  }, [sel.uni, loaded?.id]);

  const setUniversity = useCallback((uni, grado = null) => {
    const next = { uni: getUniversityEntry(uni) ? uni : null, grado: grado || null };
    setSel(next);
    setShowAll(false);
    save(next);
  }, []);
  const setDegree = useCallback((grado) => {
    setSel((prev) => {
      const next = { ...prev, grado: grado || null };
      save(next);
      return next;
    });
    setShowAll(false);
  }, []);
  const clear = useCallback(() => setUniversity(null), [setUniversity]);

  const value = useMemo(() => {
    const entry = getUniversityEntry(sel.uni);
    if (!entry) return OFF;
    const data = loaded?.id === entry.id ? loaded.data : null;
    const mapping = loaded?.id === entry.id ? loaded.mapping : null;
    // Un grado que no existe en los datos (enlace mal copiado) se ignora.
    const degreeName = data ? getDegreeName(data, sel.grado) : null;
    const degreeId = data && !degreeName ? null : sel.grado;
    const view = data ? buildUniversityView(data, mapping, degreeId) : null;
    const active = Boolean(view);
    const filtering = active && !showAll;
    return {
      uniId: entry.id,
      degreeId,
      entry,
      data,
      degreeName,
      view,
      active,
      filtering,
      showAll,
      setShowAll,
      setUniversity,
      setDegree,
      clear,
      isIncluded: (slug) => !filtering || view.slugs.has(slug),
      placesFor: (slug) => (view?.bySlug.get(slug) ?? []),
      // Todas las plazas de la ciudad, de cualquier titulación (ficha: «ver todas»).
      allPlacesFor: (slug) => (data?.relations ?? []).filter((r) => mapping?.[r.relationId] === slug),
    };
  }, [sel, loaded, showAll, setUniversity, setDegree, clear]);

  return <UniversityContext.Provider value={value}>{children}</UniversityContext.Provider>;
}

/** Estado del modo «Mi universidad» (fuera del provider, siempre apagado). */
export function useUniversity() {
  return useContext(UniversityContext);
}
