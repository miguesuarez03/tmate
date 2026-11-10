# AGENTS.md — Normas comunes para Claude y Codex

Este archivo lo leen los dos agentes que trabajan en este repo: **Claude Code** y **Codex**.
El contexto técnico completo (arquitectura, comandos, SSG, datos, rutas, estilos, despliegue) está en `CLAUDE.md`: **léelo antes de tocar código**.

## Proyecto
MAbroad (repo `tmate`): web en español para elegir ciudad de Erasmus. React + Vite, sin backend, prerenderizada (SSG) y desplegada en Vercel. Dueño: Miguel.

## Reparto de papeles
- **Claude Code manda**: decide qué se hace y cómo, planifica, toma las decisiones de producto, diseño y arquitectura, y da el visto bueno final.
- **Codex ejecuta y revisa**: Claude le delega todo lo que no necesite su criterio, para ahorrar uso de Claude. Si Codex lo hace igual o mejor, lo hace Codex.

## Cuándo delegar en Codex (`/codex:rescue`)
- Tareas mecánicas o repetitivas: añadir o actualizar ciudades y datos en `src/data/`, cambios en muchos archivos con el mismo patrón, renombrados.
- Ejecutar `npm run build` y arreglar los errores que salgan.
- Depurar un fallo concreto y bien acotado.
- Refactors grandes una vez que Claude ha fijado el plan.
- Buscar en el código ("¿dónde se usa X?") cuando haga falta recorrer mucho.

## Qué se queda Claude
- Planificar y dividir el trabajo, con encargos a Codex breves y concretos (qué, archivos, criterio de "hecho").
- Decisiones de UX, diseño visual, textos de la web y contenido.
- Revisar el resultado de Codex mirando el diff, no releyendo todo el proyecto.

## Revisiones (`/codex:review`)
- Codex revisa los cambios no triviales de Claude antes del push, y siempre los que tocan rutas, SEO/prerender, `vercel.json` o datos legales.
- Los cambios pequeños (un texto, un estilo) no necesitan revisión.

## Ahorro de uso
- Codex devuelve resúmenes cortos: qué ha cambiado, en qué archivos y qué queda pendiente.
- No repetir trabajo: si uno ya ha investigado algo, el otro parte de su resumen.

## Reglas para los dos
1. **Nunca editar a la vez los mismos archivos.** Un agente edita y el otro revisa.
2. **Git es el punto de encuentro**: commits pequeños, con mensaje en español que diga qué y por qué. Antes de empezar, `git status` para no pisar cambios sin commitear del otro.
3. **Revisión antes de aceptar**: todo cambio no trivial pasa por la revisión del otro agente antes de hacer push.
4. **Despliegue solo con permiso explícito de Miguel**: nada de `git push` a `main` ni `vercel --prod` sin que lo pida en ese momento (push a main despliega en producción).
5. Respetar las capas: datos en `src/data/`, lógica en `src/lib/cities.js`, estado en `src/hooks/`, tipos en `src/types/`, UI en `src/components/` y `src/pages/`.
6. **Nunca inventar opiniones ni testimonios** de estudiantes (`cityExperiences.js` solo contiene experiencias reales aprobadas a mano). Las puntuaciones son valoración editorial de MAbroad, nunca datos oficiales.
7. No levantar el servidor ni navegar la web para comprobar cambios visualmente: se revisa el código. Las pruebas visuales las hace Miguel.
8. Para verificar el build de verdad: `npm run build` (no basta con `vite dev`).
9. No tocar `.env.local` ni exponer claves.
10. Idioma: textos de la web, comentarios y commits en español.
