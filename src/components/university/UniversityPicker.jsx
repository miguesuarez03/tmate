import { useEffect, useId, useMemo, useRef, useState } from "react";
import { IconUniversidad } from "../icons";
import { useUniversity } from "../../hooks/useUniversity";
import { searchUniversityOptions } from "../../lib/universities";
import styles from "./University.module.css";

/**
 * Buscador «Tu uni y grado»: un campo con autocompletado donde escribes
 * «Loyola», «ADE» o «ingeniería» y eliges tu universidad (todos los grados) o
 * un grado concreto. Es el mismo en todas partes: el buscador de la home, la
 * invitación de cada página y el chip de la cabecera.
 *
 * Patrón combobox (ARIA 1.2): flechas para moverse, Intro para elegir, Escape
 * para cerrar. La lista de grados sale del registro (registry.js → degrees),
 * sin descargar los convenios.
 *
 * @param {{
 *   uniId?: string | null,   solo las opciones de esa universidad (ficha)
 *   autoFocus?: boolean,
 *   onDone?: () => void,     tras elegir (o con Escape)
 *   placeholder?: string,
 * }} props
 */
export default function UniversityPicker({ uniId = null, autoFocus = false, onDone = null, placeholder = "Escribe tu universidad o tu grado (p. ej. ADE)" }) {
  const uni = useUniversity();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();
  const options = useMemo(() => searchUniversityOptions(query, { uniId }), [query, uniId]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);
  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const choose = (opt) => {
    uni.setUniversity(opt.uniId, opt.degreeId);
    setQuery("");
    onDone?.();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (options[active]) choose(options[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onDone?.();
    }
  };

  const selectedKey = uni.uniId ? (uni.degreeId ? `${uni.uniId}:${uni.degreeId}` : uni.uniId) : null;
  const optionId = (i) => `${listId}-opt-${i}`;

  return (
    <div className={styles.picker}>
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
          aria-label="Tu universidad y tu grado"
          autoComplete="off"
          enterKeyHint="done"
        />
      </div>
      <ul className={styles.pickerList} id={listId} role="listbox" ref={listRef} aria-label="Universidades y grados">
        {options.length === 0 && <li className={styles.pickerEmpty}>No encontramos esa universidad o ese grado.</li>}
        {options.map((o, i) => (
          <li
            key={o.key}
            id={optionId(i)}
            data-index={i}
            role="option"
            aria-selected={i === active}
            className={`${styles.pickerOption}${i === active ? ` ${styles.pickerOptionActive}` : ""}${o.key === selectedKey ? ` ${styles.pickerOptionCurrent}` : ""}`}
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={() => setActive(i)}
            onClick={() => choose(o)}
          >
            <span className={styles.pickerLabel}>{o.label}</span>
            <span className={styles.pickerSub}>{o.sub}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
