import { useEffect, useId, useMemo, useRef, useState } from "react";
import { IconUniversidad } from "../icons";
import { useUniversity } from "../../hooks/useUniversity";
import { getUniversityEntry } from "../../data/universities/registry";
import { searchUniversities, searchDegrees } from "../../lib/universities";
import styles from "./University.module.css";

/**
 * Buscador «Tu uni y grado», en dos pasos (pensado para cuando haya muchas
 * universidades):
 *   1. «Busca tu universidad»: lista con buscador.
 *   2. Al elegirla pasa solo al grado, sin cerrarse y con el foco puesto:
 *      «Busca tu grado en …», con «Todos los grados» arriba y
 *      «← Cambiar universidad».
 * Intro elige la primera opción (o la marcada con las flechas); Escape cierra.
 * Es el mismo en todas partes: buscador de la home, hoja del móvil,
 * invitaciones y chip de la cabecera. La elección se guarda al terminar el
 * paso 2. La lista de grados sale del registro (registry.js → degrees), sin
 * descargar los convenios.
 *
 * @param {{
 *   uniId?: string | null,   empezar ya en el paso 2 con esa universidad
 *                            (ficha, chip de la cabecera)
 *   autoFocus?: boolean,
 *   onDone?: () => void,     tras elegir el grado (o con Escape)
 * }} props
 */
export default function UniversityPicker({ uniId = null, autoFocus = false, onDone = null }) {
  const uni = useUniversity();
  const [chosen, setChosen] = useState(() => getUniversityEntry(uniId));
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();
  const step = chosen ? "degree" : "uni";

  // Opciones del paso actual para un texto: { key, label, sub?, pick() }.
  const buildOptions = (q) => {
    if (!chosen) {
      return searchUniversities(q).map((u) => ({ key: u.id, label: u.name, sub: `${u.degrees?.length ?? 0} grados`, pick: () => chooseUni(u) }));
    }
    const all = { key: "__all", label: "Todos los grados", sub: `Todos los destinos de ${chosen.shortName}`, pick: () => finish(null) };
    const degrees = searchDegrees(chosen, q).map((d) => ({ key: d.id, label: d.name, sub: d.short !== d.name ? d.short : null, pick: () => finish(d.id) }));
    return q.trim() ? degrees : [all, ...degrees];
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => buildOptions(query), [query, chosen]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);
  useEffect(() => setActive(0), [query, chosen]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function chooseUni(u) {
    setChosen(u);
    setQuery("");
    // Mismo campo: el foco sigue (o vuelve) en él para escribir el grado.
    requestAnimationFrame(() => inputRef.current?.focus());
  }
  function finish(degreeId) {
    uni.setUniversity(chosen.id, degreeId);
    setQuery("");
    onDone?.();
  }
  function changeUni() {
    setChosen(null);
    setQuery("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      // Con lo que hay escrito ahora mismo (si se pulsa Intro justo tras la
      // última letra, la lista aún no se ha repintado).
      const value = e.currentTarget.value;
      const fresh = value === query ? options : buildOptions(value);
      (fresh[value === query ? active : 0] ?? fresh[0])?.pick();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onDone?.();
    } else if (e.key === "Backspace" && !query && chosen) {
      // Borrar con el campo vacío vuelve a la universidad.
      e.preventDefault();
      changeUni();
    }
  };

  const currentKey = uni.uniId && chosen?.id === uni.uniId ? uni.degreeId ?? "__all" : null;
  const optionId = (i) => `${listId}-opt-${i}`;
  const placeholder = step === "uni" ? "Busca tu universidad" : `Busca tu grado en ${chosen.shortName}`;

  return (
    <div className={styles.picker}>
      {step === "degree" && (
        <div className={styles.pickerStep}>
          <button type="button" className={styles.pickerBack} onClick={changeUni}>← Cambiar universidad</button>
          <span className={styles.pickerUni}>{chosen.name}</span>
        </div>
      )}
      <div className={styles.pickerField}>
        <IconUniversidad size={18} />
        <input
          ref={inputRef}
          className={styles.pickerInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={options[active] ? optionId(active) : undefined}
          aria-label={placeholder}
          autoComplete="off"
          enterKeyHint={step === "uni" ? "next" : "done"}
        />
      </div>
      <ul className={styles.pickerList} id={listId} role="listbox" ref={listRef} aria-label={step === "uni" ? "Universidades" : `Grados de ${chosen.name}`}>
        {options.length === 0 && (
          <li className={styles.pickerEmpty}>{step === "uni" ? "No encontramos esa universidad." : "No encontramos ese grado."}</li>
        )}
        {options.map((o, i) => (
          <li
            key={o.key}
            id={optionId(i)}
            data-index={i}
            role="option"
            aria-selected={i === active}
            className={`${styles.pickerOption}${i === active ? ` ${styles.pickerOptionActive}` : ""}${o.key === currentKey ? ` ${styles.pickerOptionCurrent}` : ""}`}
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={() => setActive(i)}
            onClick={() => o.pick()}
          >
            <span className={styles.pickerLabel}>{o.label}</span>
            {o.sub && <span className={styles.pickerSub}>{o.sub}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
