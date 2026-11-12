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

### Consejos de estudiantes (Roma, Alemania) — hecho el 12/11/2026, con pendientes

Nueva sección «Lo que dicen los que viven allí» en cada ficha (`src/data/cityExperiences.js`).
Se estrena con Lucía (Roma) y con Miguel (Rosenheim, como fundador: no cuenta como opinión de la
gente). Los datos de sus consejos y de las fichas de Roma y Alemania los ha verificado el agente
`contenido-verificacion` (ATAC, MVG, TH Rosenheim, Bundesregierung, operadores locales).

**Formulario:** las fichas sin testimonios muestran «¿Estás de Erasmus en X? Cuéntanos tus
consejos» con el formulario que ya existía (`ShareExperienceModal.jsx`). No tiene backend
propio: envía con Web3Forms a tu correo (y, sin clave, abre un `mailto:`), así que no hace falta
un Google Form. Ahora pide el curso (2026-27) en vez del año, la universidad de destino (opcional)
y si la persona prefiere salir sin nombre. Mejora futura: campos separados por tema
(transporte, barrios, ocio…) para que llegue ya en forma de `tips`.

**Pendientes:**

1. **Lucía**: confirmar con ella el texto de sus consejos y si sale con nombre
   (`anonymous: true` en su entrada para que salga como «Estudiante de Universidad Loyola»).
   Con su entrada, la portada pasa del bloque «Mi experiencia» a las tarjetas de experiencias
   (comportamiento previsto de `HomeExperiences`).
2. **«Blue a bar» (Roma)**: no se ha publicado. El candidato probable es el **Blue Bar San
   Lorenzo** (Largo degli Osci 21), pero solo aparece en un agregador. Si Lucía lo confirma,
   añádelo a su consejo de ocio.
3. **San Lorenzo «más barato»**: no se ha dicho del alquiler (immobiliare.it lo da algo por
   encima de la media de Roma); solo «más barato para salir».
4. **Precios que cambian el 1/1/2027**: Deutschland-Ticket 63 € → 66,80 €; el rebajado de
   Baviera (Múnich, Rosenheim) 43 € → 46,80 €; el Deutschlandsemesterticket pasa a ~40,08 €/mes,
   pero muchas universidades solo desde el semestre de invierno 2027/28. Las fichas ya dicen
   los dos precios; en enero de 2027 se pueden dejar solo los nuevos.
5. **Roma, billete sencillo de ATAC**: desde 2025 se habla de subirlo de 1,50 € a 2 €. A
   noviembre de 2026 siguen 35 € (mensual) y 250 € (anual), pero conviene revisarlo.
6. **Heidelberg**: el VRN prevé retirar la app rnv/VRN Handy-Ticket en primavera de 2027; la
   ficha ya recomienda myVRN.
7. **Miguel (Rosenheim)**: añadir más adelante sus consejos de la universidad y el alojamiento
   (`FOUNDER_EXPERIENCE.tips`, temas `universidad` y `alojamiento`).

### Calculadora: Praga y Brno sin grupo (arreglado)

La calculadora buscaba «República Checa» en la tabla del SEPIE, donde figura como «Chequia», así
que Praga y Brno no tenían grupo ni importe. Ahora pasa por `programCountry()`
(`SEPIE_NAMES` en `BecaErasmusPage.jsx`).

### América y Erasmus+

El filtro del comparador agrupa Suiza y América como «Suiza y América» (antes «Reino Unido, Suiza
y América», y antes aún «Fuera de Erasmus+»). Existen movilidades Erasmus+ con países no asociados,
también en América ([Comisión Europea](https://erasmus-plus.ec.europa.eu/sites/default/files/2023-07/factsheet-erasmusplus-celac-2023_en.pdf)):
conviene revisar si los textos de las fichas americanas dicen que «no hay Erasmus+».

### Calculadora de la beca: coordenadas que faltaban (arreglado)

`src/lib/cityCoords.js` solo tenía 40 ciudades, así que con otros 66 destinos Erasmus+ (Venecia,
Lyon, Mánchester…) el cálculo de distancia de `/beca-erasmus` daba «No tenemos coordenadas de esa
ciudad». Se han copiado las del mapa (`WorldMap.jsx`), y un test comprueba que no falte ninguna.
Desde el 12/11/2026 `cityCoords.js` es la única fuente: el mapa también lee de ahí, y su bandera
y su país salen del índice (antes el mapa tenía su propia copia y le faltaban los rótulos de 18
países, como Suecia, Grecia o Irlanda).

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
