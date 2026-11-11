import { useState, useRef, useEffect, useId } from "react";
import Flag from "./Flag";

/**
 * Campo de texto con sugerencias: se escribe y se elige de una lista filtrada.
 * Lo usan la calculadora de beca (ciudad de origen y de destino) y el
 * formulario del Learning Agreement (ciudad de destino), en vez de un
 * <select> nativo con 150 ciudades.
 *
 * options: [{ value, label, sublabel?, emoji? }] — `emoji` es la bandera del
 *          país (se pinta con <Flag>, no como emoji).
 * onChange(texto): cada vez que cambia lo escrito.
 * onSelect(opción): al elegir una sugerencia.
 * inputClassName / inputProps: para que cada formulario use el estilo y los
 *          atributos (id, aria-invalid…) de sus propios campos.
 *
 * Teclado (patrón combobox de WAI-ARIA): ↓/↑ recorren las sugerencias, Enter
 * elige la marcada, Escape cierra. Antes las opciones solo respondían a
 * mousedown, así que con teclado no se podía elegir ninguna.
 * Estilos: bloque "SEARCHABLE INPUT" de src/styles/global.css.
 */
export default function SearchableInput({
  value, onChange, options, placeholder, onSelect,
  inputClassName = "beca-calc__select", inputProps = {}, maxResults = 8,
}) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const ref = useRef(null);
  const listId = useId();

  const q = query.toLowerCase();
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(q) ||
    (o.sublabel && o.sublabel.toLowerCase().includes(q))
  ).slice(0, maxResults);
  const showList = open && filtered.length > 0;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleInput(e) {
    setQuery(e.target.value);
    onChange(e.target.value);
    setOpen(true);
    setActiveIdx(-1);
  }

  function handleSelect(opt) {
    setQuery(opt.label);
    onChange(opt.label);
    onSelect(opt);
    setOpen(false);
    setActiveIdx(-1);
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!filtered.length) return;
      e.preventDefault();
      setOpen(true);
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActiveIdx((i) => (i + step + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      if (showList && activeIdx >= 0 && filtered[activeIdx]) {
        e.preventDefault();
        handleSelect(filtered[activeIdx]);
      }
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
      setActiveIdx(-1);
    }
  }

  const optionId = (i) => `${listId}-opt-${i}`;

  return (
    <div className="beca-searchable" ref={ref}>
      <input
        type="text"
        className={inputClassName}
        placeholder={placeholder}
        value={query}
        onChange={handleInput}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && activeIdx >= 0 ? optionId(activeIdx) : undefined}
        {...inputProps}
      />
      {showList && (
        <div className="beca-searchable__dropdown" id={listId} role="listbox">
          {filtered.map((opt, i) => (
            <button
              key={opt.value}
              id={optionId(i)}
              type="button"
              role="option"
              aria-selected={i === activeIdx}
              tabIndex={-1}
              className={`beca-searchable__option${i === activeIdx ? " beca-searchable__option--active" : ""}`}
              // mousedown no debe quitar el foco al campo (el blur cerraría la
              // lista antes del clic); la elección va en click.
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(opt)}
            >
              {opt.emoji && <span className="beca-searchable__emoji"><Flag emoji={opt.emoji} /></span>}
              <span className="beca-searchable__label">{opt.label}</span>
              {opt.sublabel && <span className="beca-searchable__sublabel">{opt.sublabel}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
