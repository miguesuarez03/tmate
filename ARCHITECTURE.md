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
│   ├── insights.js       ← Scores detallados por ciudad
│   └── generated/        ← Generado en el build (scripts/city-data.mjs), fuera de git:
│                           cityIndex.js (índice ligero) + cities/<slug>.js (ficha completa)
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
    },
    // ... más scores (fiesta, extranjeros, transporte, piso, etc.)
  ],
},
```

Las opiniones NO van aquí: las experiencias reales de estudiantes viven en
`src/data/cityExperiences.js` y solo entran las recibidas por el formulario
«Comparte tu experiencia» y aprobadas a mano (nunca texto inventado).

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
Los criterios (Más baratas, Más vida social, Mejor clima, Más seguras, Se vive en inglés, Piso más fácil, Más prácticas y la nota global) están en `src/data/rankings.js`: de ahí salen los chips de orden del comparador (`/comparar?orden=<id>&programa=erasmus|otros`), las pestañas de rankings de la home y las páginas `/ranking` y `/ranking/<slug>` (prerenderizadas y en el sitemap).
```js
import { rankCities, getErasmusRanking, getCriterionValue } from '../lib/cities';

getErasmusRanking('baratas');           // top 20 Erasmus+ de /ranking/mas-baratas
rankCities('ingles', { cities });       // cualquier lista; sin dato → al final, rank null
getCriterionValue(city, 'clima');       // 0–10 o null
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

1. **Datos** → solo en `src/data/` (cities.js e insights.js). El navegador no los importa: usa el índice ligero generado (`getAllCities()`, `getCityBySlug()`, `getScoreMap()`…) y pide la ficha completa con `loadCityDetail(slug)` / `useCityDetail(slug)`. No importes `data/cities` ni `data/insights` desde código de cliente: meterías 1,5 MB en el bundle inicial.
2. **Lógica** → solo en `src/lib/cities.js`
3. **Estado reactivo** → solo en `src/hooks/`
4. **Tipos** → solo en `src/types/index.ts`
5. **UI** → componentes en `src/components/`, páginas en `src/pages/`

> Nunca pongas lógica de negocio directamente en los componentes.
> Si necesitas filtrar, calcular o transformar datos → añádelo a `lib/cities.js`.
