# TMate — Cambios de esta sesión (SEO técnico + seguridad)

Aplica estos 6 ficheros sobre tu repo (respetan las rutas). Ninguno toca
diseño, colores ni contenido.

## Ficheros

| Fichero | Estado | Qué hace |
|---|---|---|
| `src/entry-server.jsx` | **NUEVO** | Entry de render en servidor (SSG). Solo se usa en build. Renderiza cada ruta a HTML y calcula el `<head>` por página reutilizando tus funciones puras (`getCityMeta`, `getHomeMeta`, `getCityJsonLd`, `getWebsiteJsonLd`). |
| `scripts/prerender.mjs` | **NUEVO** | Post-build: genera un `index.html` real (con contenido + metadatos) por cada una de las 26 rutas, más `sitemap.xml` y `robots.txt` dinámicos. |
| `.gitignore` | **NUEVO** | No existía. Excluye `node_modules/`, `dist/`, `.ssr-temp/`. |
| `package.json` | modificado | `build` ahora encadena: `build:client` → `build:ssr` → `prerender`. |
| `vercel.json` | modificado | Enrutado corregido (fin del `rewrite` a `/` que servía el shell vacío) + cabeceras de seguridad + CSP en modo Report-Only + `buildCommand` fijado. |
| `src/components/WorldMap.jsx` | modificado | Bug: el popup del mapa mostraba la foto de Bolonia para TODAS las ciudades. Ahora usa la imagen real de cada ciudad. |

## Cómo aplicar y probar en local

```bash
# 1. Copia los 6 ficheros a su sitio en el repo
# 2. Reinstala (por si acaso) y compila:
npm install
npm run build

# 3. Sirve el resultado estático y comprueba una URL profunda:
npx serve dist         # o: npm run preview
# Abre http://localhost:3000/city/berlin  →  ver contenido real en "Ver código fuente"
```

## Verificación rápida de que el SEO ya funciona

```bash
# Debe imprimir el <title> y la description ÚNICOS de Berlín, no el genérico:
grep -E "<title>|name=\"description\"" dist/city/berlin/index.html

# Debe listar 26 URLs con la fecha de hoy:
grep -c "<loc>" dist/sitemap.xml
```
