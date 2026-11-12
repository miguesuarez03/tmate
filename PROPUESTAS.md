# Propuestas

Cosas detectadas que no se han hecho directamente: datos que faltan (para el agente
`contenido-verificacion`) y mejoras de más calado para que Miguel decida.

## Datos que faltan o conviene verificar (contenido-verificacion)

### Subnota «Nivel de inglés» — 12 ciudades sin dato

El criterio «Se vive en inglés» (chips del comparador, `/ranking/se-vive-en-ingles`) lee la
subcategoría `Nivel de inglés` de `integracion` en `src/data/insights.js`. Estas ciudades no la
tienen, así que en el comparador aparecen al final, «sin dato» y sin puesto. No se ha inventado
ninguna nota. Todas son de fuera de Erasmus+, así que la página de ranking (solo Erasmus+) está
completa.

| Ciudad (slug) | Idioma (`cities.js`) | Lo que hay ahora en Integración |
| --- | --- | --- |
| `lima` | Español | Actitud local, Facilidad para hacer amigos, Choque cultural |
| `montevideo` | Español | Actitud local, Facilidad para hacer amigos, Choque cultural |
| `quito` | Español | Actitud local, Facilidad para hacer amigos, Choque cultural |
| `miami` | Inglés / Español | «Nivel de español/inglés» (mezcla los dos idiomas) |
| `montreal` | Francés / Inglés | «Nivel de francés/inglés» (mezcla los dos idiomas) |
| `ciudad-de-mexico` | Español | «Nivel de español» |
| `quebec` | Francés | «Nivel de francés necesario» |
| `buenos-aires` | Español | «Nivel de español requerido» |
| `cordoba-argentina` | Español | «Nivel de español requerido» |
| `santiago-de-chile` | Español | «Nivel de español requerido» |
| `bogota` | Español | «Nivel de español requerido» |
| `medellin` | Español | «Nivel de español requerido» |

Qué hace falta: añadir `{ label: "Nivel de inglés", score, desc }` a `integracion` en cada una,
con su fuente (si no hay una fuente fiable, mejor dejarla sin dato). En Miami y Montreal, separar la
subnota mixta en una de inglés y otra del otro idioma.

### Subnota «Clima»: revisar coherencia ahora que es un ranking público

`/ranking/mejor-clima` ordena por la subnota `Clima` de `estilo_vida`. Algunos valores llaman la
atención y conviene contrastarlos con los servicios meteorológicos nacionales (DWD, Météo-France,
AEMET, IPMA…): **Friburgo 9.0** queda por delante de Roma, Atenas, Nápoles o Split (8.5), y
**Montpellier 9.5** empata con La Valeta por encima de Lisboa (9.4). No se ha cambiado ninguna nota.

### PRIORITARIO — Reino Unido y Suiza vuelven a Erasmus+ en 2027

Detectado por Codex al revisar los rankings. Afecta a toda la web, no solo a los rankings, así
que no se ha cambiado en esta tarea (solo se ha suavizado el texto de `/ranking/*` y del filtro del
comparador para no afirmar lo contrario):

- **Reino Unido**: el acuerdo para que entre en Erasmus+ en 2027 ya está cerrado
  ([GOV.UK](https://www.gov.uk/government/news/uk-and-eu-finalise-agreement-to-bring-uk-into-erasmus-in-2027)).
  El Turing Scheme 2026/27 financia a estudiantes de instituciones británicas, no a quien llega
  desde España ([GOV.UK](https://www.gov.uk/government/publications/turing-scheme-international-placements-2026-to-2027/overview-of-the-turing-scheme-2026-to-2027)).
- **Suiza**: en la convocatoria 2026 sigue el SEMP
  ([Movetia](https://movetia.ch/de/beratung/hilfestellung-und-foerderpraxis/projekt-planen/swiss-european-mobility-programme));
  la asociación a Erasmus+ está prevista para 2027, pendiente de la aprobación presupuestaria del
  Consejo Nacional según la actualización oficial de octubre
  ([Movetia](https://movetia.ch/en/latest/new-developments-for-erasmus)).

Qué revisar: el `programType` (`uk_bilateral`, `switzerland_bilateral`) de esas ciudades para el
curso 2027/28, `/tipos-de-intercambio`, la calculadora de `/beca-erasmus` (grupo de país e
importes), la pregunta «destino» de City Match y las guías. Cuando cambie el `programType`, los
rankings Erasmus+ y el filtro del comparador los incluirán solos.

### América y Erasmus+

El filtro del comparador agrupa Reino Unido, Suiza y América como «Reino Unido, Suiza y América»
(antes de esta revisión se llamaba «Fuera de Erasmus+»). Existen movilidades Erasmus+ con países no
asociados, también en América ([Comisión Europea](https://erasmus-plus.ec.europa.eu/sites/default/files/2023-07/factsheet-erasmusplus-celac-2023_en.pdf)):
conviene revisar si los textos de las fichas americanas dicen que «no hay Erasmus+».

## Mejoras propuestas

1. **Rankings en el menú principal.** `/ranking` está enlazado desde la home, el comparador y cada
   ranking, pero no desde el Navbar. Añadirlo (o meterlo junto a «Comparar») le daría más
   visibilidad; no se ha tocado para no cambiar la navegación.
2. **Imagen para compartir propia en cada ranking.** Ahora usan la imagen de marca por defecto.
   Una OG con la foto de la nº 1 y el título («Las ciudades Erasmus más baratas en 2027») se vería
   mucho mejor en WhatsApp.
3. **Fecha de actualización por ranking** («Actualizado en noviembre de 2026») visible y como
   `dateModified` en el JSON-LD: ayuda a que Google entienda que el «2027» del título es real.
4. **Año de los títulos.** `RANKING_YEAR` (`src/data/rankings.js`) está a mano: hay que pasarlo a
   2028 cuando empiece la convocatoria siguiente (~septiembre de 2027).
5. **Rankings fuera de Erasmus+** (Reino Unido, Suiza, América) o por región: más páginas
   indexables con intención de búsqueda propia («ciudades más baratas para estudiar en
   Latinoamérica»).
6. **Buscador del comparador en la URL** (`?q=`): hoy el orden y el programa se comparten por
   enlace, pero el texto buscado no.
7. **City Match: más imprescindibles.** Ahora se pueden marcar presupuesto, clima, idioma, ambiente
   y tamaño. Se podría añadir «lo académico» (empleo ≥ 8) y «calidad de vida». El presupuesto
   imprescindible mira el **mínimo** del rango de coste (permisivo); se podría ofrecer un modo
   estricto con el punto medio.
8. **Clima estructurado.** City Match deduce cálido/templado/frío por palabras clave del campo
   `weather` (≈45 descripciones distintas). Un campo cerrado (`climateType`) por ciudad haría el
   filtro imprescindible de clima más fiable.
9. **Puntuar «Naturaleza» con datos.** Sigue siendo la única señal heurística (cuenta palabras en
   los textos); por eso no se ofrece como imprescindible.
