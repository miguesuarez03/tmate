import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { IconUniversidad } from "../icons";
import SuggestionList from "../SuggestionList";
import { useUniversity } from "../../hooks/useUniversity";
import { getUniversityEntry } from "../../data/universities/registry";
import { searchUniversities, searchDegrees } from "../../lib/universities";
import styles from "./University.module.css";

/**
 * Buscador «Tu uni y grado», en dos pasos (pensado para cuando haya muchas
 * universidades), con la misma lista de sugerencias que el buscador de
 * destinos (SuggestionList) y como mucho `max` a la vista:
 *   1. «Busca tu universidad». Con el campo vacío, las disponibles.
 *   2. Al elegirla pasa solo al grado, sin cerrarse y con el foco puesto:
 *      «Busca tu grado en …». Con el campo vacío, los grados con más
 *      destinos. Arriba, «Todos los grados» (pastilla pequeña) y
 *      «← Cambiar universidad».
 * Al escribir, la primera sugerencia es siempre la más parecida (empieza
 * igual > contiene > se parece, con siglas y erratas: lib/universities.js
 * matchScore). Intro elige la marcada o la primera; Escape cierra.
 *
 * @param {{
 *   uniId?: string | null,   empezar ya en el paso 2 con esa universidad
 *   autoFocus?: boolean,
 *   max?: number,            sugerencias a la vista (3 en móvil, 5 en escritorio)
 *   onDone?: () => void,     tras elegir (o con Escape)
 * }} props
 */
export default function UniversityPicker({ uniId = null, autoFocus = false, max = 5, onDone = null }) {
  const uni = useUniversity();
  const [chosen, setChosen] = useState(() => getUniversityEntry(uniId));
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listId = useId();
  const step = chosen ? "degree" : "uni";

  // Opciones del paso actual para un texto: { key, label, sub, pick() }.
  const buildOptions = (q) => {
    if (!chosen) {
      return searchUniversities(q).slice(0, max).map((u) => ({
        key: u.id, label: u.name, sub: `${u.degrees?.length ?? 0} grados`, pick: () => chooseUni(u),
      }));
    }
    return searchDegrees(chosen, q).slice(0, max).map((d) => ({
      key: d.id,
      label: d.name,
      sub: d.destinations ? `${d.destinations} destino${d.destinations === 1 ? "" : "s"}` : null,
      pick: () => finish(d.id),
    }));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = useMemo(() => buildOptions(query), [query, chosen, max]);

  // Foco al montar en un layout effect: dentro del mismo toque que abre el
  // buscador (iOS abre el teclado) y sin mover la página.
  useLayoutEffect(() => {
    if (autoFocus) inputRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);
  useEffect(() => setActive(0), [query, chosen]);

  function chooseUni(u) {
    setChosen(u);
    setQuery("");
    // Mismo campo: el foco sigue en él para escribir el grado.
    inputRef.current?.focus({ preventScroll: true });
  }
  function finish(degreeId) {
    uni.setUniversity(chosen.id, degreeId);
    setQuery("");
    onDone?.();
  }
  function changeUni() {
    setChosen(null);
    setQuery("");
    inputRef.current?.focus({ preventScroll: true });
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

  const current = uni.uniId && chosen?.id === uni.uniId ? uni.degreeId : null;
  const placeholder = step === "uni" ? "Busca tu universidad" : `Busca tu grado en ${chosen.shortName}`;

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
          aria-activedescendant={options[active] ? `${listId}-opt-${active}` : undefined}
          aria-label={placeholder}
          autoComplete="off"
          enterKeyHint={step === "uni" ? "next" : "done"}
        />
      </div>
      {step === "degree" && (
        <div className={styles.pickerStep}>
          <button type="button" className={styles.pickerBack} onClick={changeUni}>← Cambiar universidad</button>
          <button
            type="button"
            className={`${styles.pickerAll}${uni.uniId === chosen.id && !uni.degreeId ? ` ${styles.pickerAllOn}` : ""}`}
            onClick={() => finish(null)}
            title={`Todos los destinos de ${chosen.shortName}`}
          >
            Todos los grados
          </button>
        </div>
      )}
      <SuggestionList
        id={listId}
        label={step === "uni" ? "Universidades" : `Grados de ${chosen.name}`}
        items={options}
        active={active}
        current={current}
        onHover={setActive}
        onPick={(o) => o.pick()}
        empty={step === "uni" ? "No encontramos esa universidad." : "No encontramos ese grado."}
      />
    </div>
  );
}
