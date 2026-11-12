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

### Reino Unido y Suiza en Erasmus+ — hecho el 12/11/2026, con recordatorios

Decisión de Miguel, ya aplicada. Cada ciudad lleva `erasmusFrom: "2027-28"` y `erasmusStatus` en
`src/data/cities.js`:

- **Reino Unido** (7 ciudades): `programType: "erasmus"`, `erasmusStatus: "confirmed"` (acuerdo
  UE-Reino Unido del 17/12/2025,
  [GOV.UK](https://www.gov.uk/government/news/uk-and-eu-finalise-agreement-to-bring-uk-into-erasmus-in-2027)).
  Badge «Erasmus+ desde 2027-28». Entra en los rankings, el comparador, City Match, la calculadora y
  el Learning Agreement.
- **Suiza** (5 ciudades): sigue `switzerland_bilateral`, `erasmusStatus: "pending"`. El acuerdo de
  programas UE-Suiza se firmó el 10/11/2025, pero falta que el Parlamento apruebe la financiación;
  el acuerdo se aplicaría de forma provisional antes de ratificarse el paquete con la UE
  ([SEFRI](https://www.sbfi.admin.ch/en/international-mobility-and-cooperation-in-education),
  [Gobierno suizo](https://www.bag.admin.ch/en/nsb?id=104716)). Badge
  «Erasmus+ previsto 2027 (pendiente)». No entra en los rankings Erasmus+.

**Recordatorios:**

1. **Revisar Suiza con la convocatoria 2027 del SEPIE** (y las novedades de
   [Movetia](https://movetia.ch/en/latest/new-developments-for-erasmus)). Si el Parlamento aprueba la
   financiación y Suiza entra, cambia en sus 5 ciudades `programType` a `"erasmus"` y
   `erasmusStatus` a `"confirmed"`. Después revisa la tarjeta de Suiza en `/tipos-de-intercambio`, el
   subtítulo de la pregunta «destino» de City Match, la nota bajo los grupos de `/beca-erasmus`, el
   texto de `/ranking/*` y la guía «Erasmus+ o intercambio fuera de Europa». Añade también Suiza a
   `ESTIMATED_GROUPS` en `BecaErasmusPage.jsx` (o a su grupo oficial) y quita `"Suiza"` del filtro
   «Suiza y América» del comparador (`PROGRAM_LABELS`). Si no entra, actualiza `erasmusFrom` al curso
   que se anuncie.
2. **Grupo del Reino Unido en la convocatoria 2027.** La calculadora lo pone en el grupo 1 como
   «estimación, pendiente de la convocatoria 2027» (`ESTIMATED_GROUPS`). Cuando se publique la tabla,
   pásalo a `GROUP1/2/3` y quita la estimación. Revisa también los importes de 2027 del resto de
   países.
3. **Cuando empiece el curso 2027-28**, los badges «Erasmus+ desde 2027-28» dejarán de aportar. Se
   puede quitar `erasmusFrom` del Reino Unido (seguirá siendo Erasmus+) y simplificar los textos que
   hablan del curso 2026-27.
4. **Visado del Reino Unido**: la web mantiene lo que dice GOV.UK (Standard Visitor/ETA hasta
   6 meses, Student visa para más). Si con la entrada en Erasmus+ cambian los requisitos para
   estudiantes de intercambio, hay que actualizar `/tipos-de-intercambio`.

### América y Erasmus+

El filtro del comparador agrupa Suiza y América como «Suiza y América» (antes «Reino Unido, Suiza
y América», y antes aún «Fuera de Erasmus+»). Existen movilidades Erasmus+ con países no asociados,
también en América ([Comisión Europea](https://erasmus-plus.ec.europa.eu/sites/default/files/2023-07/factsheet-erasmusplus-celac-2023_en.pdf)):
conviene revisar si los textos de las fichas americanas dicen que «no hay Erasmus+».

### Calculadora de la beca: coordenadas que faltaban (arreglado)

`src/lib/cityCoords.js` solo tenía 40 ciudades, así que con otros 66 destinos Erasmus+ (Venecia,
Lyon, Mánchester…) el cálculo de distancia de `/beca-erasmus` daba «No tenemos coordenadas de esa
ciudad». Se han copiado las del mapa (`WorldMap.jsx`), y un test comprueba que no falte ninguna.
Mejor a futuro: una sola fuente de coordenadas para el mapa y la calculadora.

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
5. **Rankings fuera de Erasmus+** (Suiza, América) o por región: más páginas
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
