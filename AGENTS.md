# AGENTS.md — Normas comunes para Claude y Codex

Este archivo lo leen los dos agentes que trabajan en este repo: **Claude Code** y **Codex**.
El contexto técnico completo (arquitectura, comandos, SSG, datos, rutas, estilos, despliegue) está en `CLAUDE.md`: **léelo antes de tocar código**.

## Proyecto
MAbroad (repo `tmate`): web en español para elegir ciudad de Erasmus. React + Vite, sin backend, prerenderizada (SSG) y desplegada en Vercel. Dueño: Miguel.

## Reparto de papeles
- **Claude Code hace las tareas**: planifica, decide (producto, diseño, arquitectura, textos), edita el código y los datos, y da el visto bueno final.
- **Codex revisa**: Claude lo llama con `codex exec` en **modo solo lectura** (`-s read-only`) al terminar cada tarea, antes del push. Codex no edita archivos en esas llamadas: informa y Claude corrige.

## Flujo de cada tarea
1. Claude hace la tarea.
2. Antes del push, Claude pide a Codex que revise el diff y verifique los datos contra **fuentes oficiales** (con búsqueda web).
3. Si Codex encuentra fallos, Claude los corrige y vuelve a pedir revisión: **máximo 2 rondas**. Si siguen sin estar de acuerdo, decide Claude y lo apunta en el resumen.
4. Después: `npm run build` sin errores, commit y `git push` a `main` sin preguntar a Miguel.
5. El resumen final de Claude incluye una línea con lo que encontró Codex.

## Cómo revisa Codex
- Respuestas cortas y accionables: solo lo que hay que cambiar, con archivo/slug, valor actual, valor correcto y **URL de la fuente**.
- Si un dato no aparece en una fuente oficial o fiable, lo dice en vez de inventar una cifra.
- Fuentes válidas: institutos nacionales de estadística, webs oficiales de universidades, ayuntamientos, operadores de transporte, Comisión Europea/SEPIE, servicios meteorológicos nacionales. Blogs y agregadores solo como pista, nunca como fuente final.
- No repite trabajo: parte del diff y del resumen que le pasa Claude.

## Reglas para los dos
1. **Nunca editar a la vez los mismos archivos.** Claude edita y Codex revisa.
2. **Git es el punto de encuentro**: commits pequeños, con mensaje en español que diga qué y por qué. Antes de empezar, `git status` para no pisar cambios sin commitear.
3. **Revisión antes del push**: todo cambio no trivial pasa por la revisión de Codex antes de hacer push (los cambios pequeños, como un texto o un estilo, no la necesitan).
4. **Despliegue**: el push a `main` (que despliega en Vercel) lo hace Claude tras la revisión y el build, sin preguntar. `vercel --prod` solo si Miguel lo pide.
5. Respetar las capas: datos en `src/data/`, lógica en `src/lib/cities.js`, estado en `src/hooks/`, tipos en `src/types/`, UI en `src/components/` y `src/pages/`.
6. **Nunca inventar opiniones ni testimonios** de estudiantes (`cityExperiences.js` solo contiene experiencias reales aprobadas a mano). Las puntuaciones son valoración editorial de MAbroad, nunca datos oficiales.
7. No levantar el servidor ni navegar la web para comprobar cambios visualmente: se revisa el código. Las pruebas visuales las hace Miguel.
8. Para verificar el build de verdad: `npm run build` (no basta con `vite dev`).
9. No tocar `.env.local` ni exponer claves.
10. Idioma: textos de la web, comentarios y commits en español.
