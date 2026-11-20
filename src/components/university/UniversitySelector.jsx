import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { IconUniversidad } from "../icons";
import { useUniversity } from "../../hooks/useUniversity";
import { UNIVERSITY_REGISTRY } from "../../data/universities/registry";
import { getUniversityShareUrl } from "../../lib/universities";
import styles from "./University.module.css";

/**
 * Selector «Mi universidad»: plegado es un botón discreto; abierto (o con una
 * universidad ya elegida), desplegable de universidad + desplegable de grado,
 * «Copiar enlace» (/?uni=…&grado=…) y «Quitar». El primer render es siempre
 * el plegado, igual que el HTML prerenderizado.
 * Con `id`, el enlace del menú (/#mi-universidad) lo abre y baja hasta él.
 */
export default function UniversitySelector({ id }) {
  const uni = useUniversity();
  const { hash } = useLocation();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const selectRef = useRef(null);
  // Foco al cambiar de plegado a abierto (y al revés): el control que tenía el
  // foco desaparece, así que se pasa al desplegable de universidad o al botón.
  const focusAfterToggle = useRef(null); // "select" | "trigger" | null
  const expanded = open || Boolean(uni.uniId);

  useEffect(() => {
    const target = focusAfterToggle.current;
    if (!target) return;
    focusAfterToggle.current = null;
    (target === "select" ? selectRef : triggerRef).current?.focus();
  }, [expanded]);

  useEffect(() => {
    if (!id || hash !== `#${id}`) return;
    setOpen(true);
    requestAnimationFrame(() => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
  }, [id, hash]);

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copyLink() {
    const url = getUniversityShareUrl(window.location.origin, uni.uniId, uni.degreeId);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copia este enlace:", url);
    }
  }

  if (!expanded) {
    return (
      <div id={id} ref={rootRef} className={styles.selector}>
        <button
          type="button"
          ref={triggerRef}
          className={styles.trigger}
          onClick={() => {
            focusAfterToggle.current = "select";
            setOpen(true);
          }}
          aria-expanded="false"
        >
          <IconUniversidad size={18} />
          <span>Mi universidad</span>
          <span className={styles.triggerHint}>· ve solo los destinos con plazas de tu universidad</span>
        </button>
      </div>
    );
  }

  const selectId = id ?? "uni";
  return (
    <div id={id} ref={rootRef} className={`${styles.selector} ${styles.selectorOpen}`}>
      <span className={styles.selectorTitle}>
        <IconUniversidad size={18} /> Mi universidad
      </span>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Universidad</span>
        <select
          id={`${selectId}-universidad`}
          ref={selectRef}
          className={styles.select}
          value={uni.uniId ?? ""}
          onChange={(e) => uni.setUniversity(e.target.value || null)}
        >
          <option value="">Elige tu universidad</option>
          {UNIVERSITY_REGISTRY.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </label>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>Grado</span>
        <select
          id={`${selectId}-grado`}
          className={styles.select}
          value={uni.degreeId ?? ""}
          disabled={!uni.data}
          onChange={(e) => uni.setDegree(e.target.value || null)}
        >
          <option value="">
            {uni.data
              ? "Todos los grados"
              : uni.loadError
                ? "No se han podido cargar los grados"
                : uni.uniId
                  ? "Cargando grados…"
                  : "Elige antes tu universidad"}
          </option>
          {(uni.data?.degrees ?? []).map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </label>
      {uni.loadError && (
        <p className={styles.loadError} role="alert">
          No hemos podido cargar las plazas de {uni.entry.shortName}: por ahora ves todos los destinos.{" "}
          <button type="button" className={styles.linkBtn} onClick={uni.retry}>Reintentar</button>
        </p>
      )}
      <div className={styles.selectorActions}>
        {uni.uniId && (
          <button type="button" className={styles.ghostBtn} onClick={copyLink}>
            {copied ? "¡Enlace copiado!" : "Copiar enlace"}
          </button>
        )}
        <button
          type="button"
          className={styles.ghostBtn}
          onClick={() => {
            focusAfterToggle.current = "trigger";
            uni.clear();
            setOpen(false);
          }}
        >
          {uni.uniId ? "Quitar" : "Cerrar"}
        </button>
      </div>
    </div>
  );
}
