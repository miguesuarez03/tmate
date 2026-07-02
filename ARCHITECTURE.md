# TMate — Arquitectura del sistema de ciudades

## Estructura de carpetas

```
src/
├── types/
│   └── index.ts          ← TODOS los tipos TypeScript del proyecto
├── lib/
│   └── cities.js         ← Todas las operaciones sobre ciudades (filtros, rankings, favoritos...)
├── hooks/
│   ├── useCityFilter.js  ← Filtros reactivos para la lista de ciudades
│   ├── useFavorites.js   ← Favoritos persistidos en localStorage
│   └── useSEO.js         ← SEO dinámico por página (title, meta, OG)
├── data/
│   ├── cities.js         ← Datos base de las 20 ciudades
│   └── insights.js       ← Scores detallados por ciudad
├── components/
│   ├── Layout.jsx        ← Navbar, Footer, Logo, SectionLabel
│   ├── CityCard.jsx      ← Card de ciudad para el grid
│   ├── SearchBar.jsx     ← Buscador con autocomplete
│   ├── ScoreCard.jsx     ← Dashboard de scores expandible
│   ├── WorldMap.jsx      ← Mapa interactivo (react-simple-maps), carga lazy
│   ├── ScrollRestoration.jsx ← Restaura el scroll al navegar atrás/adelante
│   └── RouteLoader.jsx   ← Indicador de carga entre páginas (code-splitting)
├── pages/
│   ├── HomePage.jsx      ← Página principal
│   └── CityDetailPage.jsx ← Página de detalle por ciudad (/city/:slug)
└── styles/
    └── global.css        ← Todo el CSS con variables
```

---

## Cómo añadir una nueva ciudad

### Paso 1 — Añadir datos base en `src/data/cities.js`

Copia el bloque de cualquier ciudad existente y modifica el contenido:

```js
{
  slug: "sevilla",           // URL: /city/sevilla — sin acentos, sin espacios
  name: "Sevilla",
  nameEn: "Seville",
  country: "España",
  emoji: "🇪🇸",
  region: "Europa del Sur", // ver tipos/index.ts para las regiones disponibles
  tag: "Flamenco & Tapas",
  phrase: "La ciudad más alegre de Europa",
  costDetail: "500–750€/mes",
  vibe: "Festiva & Cultural",
  erasmus: 89,               // score Erasmus 0-100
  weather: "Mediterráneo seco",
  language: "Español",
  students: "70.000+",
  img: "https://images.unsplash.com/photo-XXX?w=800&q=80",
  heroImg: "https://images.unsplash.com/photo-XXX?w=1400&q=80",
  description: "Descripción completa de la ciudad...",
  highlights: ["Destaca 1", "Destaca 2", "Destaca 3"],
  universities: ["Universidad de Sevilla", "Pablo de Olavide"],
  neighborhoods: [
    { name: "Triana", vibe: "Bohemio & auténtico", price: "€€" },
    { name: "El Centro", vibe: "Turístico & animado", price: "€€€" },
  ],
  tips: ["Tip 1", "Tip 2", "Tip 3"],
  experiences: ["erasmus"],
},
```

**Eso es todo.** La ciudad aparecerá automáticamente en:
- El grid de la homepage
- El buscador con autocomplete
- El mapa interactivo (si añades las coordenadas en `WorldMap.jsx`)
- Los filtros por región
- Los rankings (calculados automáticamente)

### Paso 2 — Añadir scores en `src/data/insights.js` (opcional)

Si no añades insights, la ciudad usará scores por defecto (todos ~7.5).

Para añadir scores detallados, busca el objeto `CITY_INSIGHTS` y añade:

```js
sevilla: {
  heroImg: "https://...",
  tagline: "Tagline de la ciudad",
  atmosphere: "Descripción del ambiente",
  scores: [
    {
      id: "coste",
      label: "Coste de vida",
      icon: "💶",
      score: 7.5,           // 0-10
      summary: "Resumen del score",
      color: "#0EA5E9",
      subcategories: [
        { label: "Vivienda", score: 7.0, desc: "Descripción..." },
      ],
      reviews: [
        { text: "Opinión real", author: "Nombre, Erasmus 2024", flag: "🇪🇸" },
      ],
    },
    // ... más scores (fiesta, extranjeros, transporte, piso, etc.)
  ],
},
```

---

## Features preparadas (listas para implementar)

### Favoritos
```js
import { useFavorites } from '../hooks/useFavorites';

const { isFav, toggleFavorite } = useFavorites();
// <button onClick={() => toggleFavorite(city.slug)}>
//   {isFav(city.slug) ? '❤️' : '🤍'}
// </button>
```

### Rankings
```js
import { getRankedCities } from '../lib/cities';

// En una página /rankings futura:
const ranked = getRankedCities(); // ya ordenado por overallScore
```

### Filtros avanzados
```js
import { useCityFilter } from '../hooks/useCityFilter';

const { cities, setQuery, sortKey, setSortKey } = useCityFilter();
// El hook ya soporta: región, texto libre, tipo de experiencia, ordenación
```

### Comparativa
```js
import { getCompareCities, toggleCompare } from '../lib/cities';
// sessionStorage, max 3 ciudades, listo para una página /compare
```

### SEO por página
```js
import { useSEO } from '../hooks/useSEO';

// En cualquier página:
useSEO({ city, overallScore }); // actualiza title + meta + OG automáticamente
```

---

## Reglas de arquitectura

1. **Datos** → solo en `src/data/` (cities.js e insights.js)
2. **Lógica** → solo en `src/lib/cities.js`
3. **Estado reactivo** → solo en `src/hooks/`
4. **Tipos** → solo en `src/types/index.ts`
5. **UI** → componentes en `src/components/`, páginas en `src/pages/`

> Nunca pongas lógica de negocio directamente en los componentes.
> Si necesitas filtrar, calcular o transformar datos → añádelo a `lib/cities.js`.
