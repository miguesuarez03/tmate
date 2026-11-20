/**
 * Lista de sugerencias de los buscadores (destinos y «Tu uni y grado»), con
 * el mismo aspecto y comportamiento en los dos (clases search-bar__item de
 * global.css). Elegir con clic o toque (onMouseDown: antes de que el campo
 * pierda el foco) o con Intro desde el campo (lo gestiona cada buscador).
 * @param {{
 *   id: string,
 *   items: { key: string, label: string, sub?: React.ReactNode, icon?: React.ReactNode }[],
 *   active?: number,                  marcada con las flechas (-1: ninguna)
 *   current?: string | null,          key de la opción ya elegida (✓)
 *   onPick: (item: any) => void,
 *   onHover?: (index: number) => void,
 *   label: string,                    aria-label de la lista
 *   empty?: string,                   texto si no hay ninguna
 * }} props
 */
export default function SuggestionList({ id, items, active = -1, current = null, onPick, onHover, label, empty = null }) {
  return (
    <ul className="search-bar__list" id={id} role="listbox" aria-label={label}>
      {items.length === 0 && empty && <li className="search-bar__empty">{empty}</li>}
      {items.map((item, i) => (
        <li
          key={item.key}
          id={`${id}-opt-${i}`}
          role="option"
          aria-selected={i === active}
          className={`search-bar__item${i === active ? " search-bar__item--active" : ""}${item.key === current ? " search-bar__item--current" : ""}`}
          onMouseDown={(e) => {
            e.preventDefault();
            onPick(item);
          }}
          onMouseEnter={() => onHover?.(i)}
        >
          {item.icon && <span style={{ display: "inline-flex" }}>{item.icon}</span>}
          <span className="search-bar__city">{item.label}</span>
          {item.sub && <span className="search-bar__country">{item.sub}</span>}
        </li>
      ))}
    </ul>
  );
}
