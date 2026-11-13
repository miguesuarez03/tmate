# Nota MAbroad: criterio de cálculo

Fuente única del cálculo: [`src/lib/scoring.js`](../src/lib/scoring.js). Datos con fuente: [`src/data/scoring/`](../src/data/scoring/) y [`src/data/becaGroups.js`](../src/data/becaGroups.js). Si cambias un peso, una escala o una fuente, cambia también este documento y el texto de [`MethodologyNote.jsx`](../src/components/MethodologyNote.jsx).

## Qué es

La nota de cada ciudad **no se escribe a mano**. Es la media ponderada, con **pesos fijos**, de 8 subnotas de 0 a 10. Cada subnota sale de un dato con fuente o de una valoración editorial de MAbroad cuyo criterio está escrito aquí. En la web se marca cuál es cuál.

| Subnota | Peso | Tipo | Dato y fuente |
|---|---|---|---|
| Coste de vida | 20 % | Dato | Punto medio del rango `costDetail` de la ficha |
| Vida estudiantil | 20 % | Mixto | Secciones de Erasmus Student Network + estudiantes internacionales (THE) + ambiente (valoración) |
| Seguridad | 15 % | Dato | Tasa de homicidios del país (UNODC) |
| Nivel académico | 10 % | Dato | Mejor puesto de las universidades de la ciudad en THE World University Rankings |
| Alojamiento | 10 % | Valoración | Categoría «Alojamiento» de la ficha |
| Calidad de vida y clima | 10 % | Valoración | Subnotas «Clima» y «Calidad de vida» de la ficha |
| Idioma (inglés o español) | 10 % | Dato | Eurobarómetro 540, o lengua oficial inglesa o española |
| Conectividad para viajar | 5 % | Valoración | Subnotas de escapadas y conexiones de la ficha |

Niveles (`getScoreLevel`): 8,5 o más es «Excelente»; de 7 a 8,4, «Bueno»; de 5,5 a 6,9, «Regular»; por debajo, «Difícil».

## Datos pendientes

Si a una subnota le falta un dato fiable, se queda **pendiente** (`null`) en vez de inventarla:

- La nota se calcula con los pesos que quedan, repartidos en proporción, y se marca como **provisional**. En la web aparece un punto naranja junto a la nota, «Pendiente» en la subnota y una frase en el desglose.
- Si falta más del 30 % del peso (`MIN_COVERAGE = 0.7`), la ciudad no tiene nota y se muestra «—». Hoy no hay ninguna ciudad en ese caso.

Ojo: repartir el peso de lo pendiente equivale a suponer que la ciudad saca en esa subnota lo mismo que en el resto. Por eso, una nota provisional puede quedar por encima de donde estaría con el dato completo. Lista actual de pendientes: sección «Datos de la nota MAbroad» de [`VERIFICACION.md`](../VERIFICACION.md).

## Criterio de cada subnota

### Coste de vida (20 %)

- **Dato:** punto medio del rango `mín–máx€/mes` de `costDetail` en [`cities.js`](../src/data/cities.js). Si la ficha tiene `costSource`, la fuente es oficial (normalmente la universidad); si no, es una estimación MAbroad, y el desglose lo dice.
- **A 0–10:** escala fija en euros, igual para todos los destinos. Con 400 €/mes o menos, un 10. Cada 200 € más restan 1 punto. Con 2.400 €/mes o más, un 0. La fórmula es `10 × (2.400 − coste) / 2.000`, limitada a 0–10 (`costToScore`).
- La beca **no** entra en esta subnota.

### Te faltan tras la beca (dato aparte, no cuenta en la nota)

Se calcula como `max(0, punto medio − beca de referencia)` (`getBecaGap`) y se muestra en la ficha y en el comparador. La beca de referencia depende del destino:

- **Erasmus+:** el mínimo mensual del SEPIE del grupo del país (convocatoria 2026: grupo 1, 350 €; grupo 2, 300 €; grupo 3, 250 €). Reino Unido usa el grupo 1 como estimación hasta la convocatoria 2027.
- **Suiza:** la beca SEMP. Son 440 CHF/mes para estudiantes de universidades españolas, según la [tabla 2025/26 de la Universidad de Berna](https://www.unibe.ch/studies/mobility/incoming/from_europe/semp_erasmus_studies/grants/index_eng.html). Al cambio del BCE del 13-11-2026 son unos 475 €.
- **Estados Unidos, Canadá y Latinoamérica:** 0 €, porque no hay una beca común. Depende de cada universidad.

### Vida estudiantil (20 %)

Es la media de dos mitades, cada una de 0 a 10.

**Comunidad (dato), de 0 a 10.** Suma de dos partes:

- **Secciones activas de Erasmus Student Network en la ciudad** ([listado público de ESN](https://accounts.esn.org/api/v2/sections), estado «active»). Ninguna da 0 puntos; una, 3; dos o más, 4. ESN solo existe en Europa, así que en América esta parte es 0. Es intencionado: la subnota mide también el ambiente Erasmus.
- **Estudiantes internacionales de las universidades de la ciudad**: suma de `estudiantes × % internacional` de cada universidad de la ciudad que publica sus datos en THE (`stats_number_students`, `stats_pc_intl_students`). Los puntos van así:

  | Estudiantes internacionales | Puntos |
  |---|---|
  | 20.000 o más | 6 |
  | 10.000 o más | 5 |
  | 5.000 o más | 4 |
  | 2.500 o más | 3 |
  | 1.000 o más | 2 |
  | 250 o más | 1 |
  | Menos de 250 | 0 |

  Cuenta a quienes estudian el grado o máster allí, no solo a los de intercambio. Sirve como medida del tamaño de la comunidad internacional.

**Ambiente (valoración MAbroad), de 0 a 10.** Media de las subnotas de la ficha que empiezan por «Fiesta» o «Eventos» (fiesta y vida nocturna, eventos y actividades). Si una ficha no las tiene, se usa su categoría «Vida social y ambiente».

**Pendiente:** si ninguna universidad de la ciudad publica datos en THE, no sabemos cuántos estudiantes internacionales tiene, y la subnota queda pendiente.

### Seguridad (15 %)

- **Dato:** homicidios intencionados por cada 100.000 habitantes del **país**, según UNODC (indicador `VC.IHR.PSRC.P5`, el que publica el Banco Mundial). Se usa la media de los 3 años más recientes con dato. Así se suavizan los saltos de un año a otro en países pequeños: Malta pasó de 1,51 en 2022 a 0,56 en 2023.
- **A 0–10:** escala logarítmica. Una tasa de 0,5 o menos da un 10 y una de 40 o más da un 0. La fórmula es `10 × ln(40 / tasa) / ln(80)` (`homicideToScore`). Cada vez que la tasa se duplica, la nota baja unos 1,6 puntos.
  - Italia (0,54): 9,8.
  - Alemania (0,85): 8,8.
  - Estados Unidos (6,3): 4,2.
  - Colombia (25,1): 1,1.
- **Limitación:** es un dato del país, así que no distingue entre ciudades del mismo país (Nápoles y Bolonia sacan lo mismo). La categoría «Seguridad» de la ficha y el ranking «Más seguras» siguen siendo la valoración de MAbroad de cada ciudad (seguridad de día, de noche y ambiente), y su texto lo explica.

### Nivel académico (10 %)

- **Dato:** el mejor puesto, entre las universidades de la ciudad, en el [THE World University Rankings](https://www.timeshighereducation.com/world-university-rankings) (edición actual: 2027). THE publica la tabla completa en JSON. QS no permite descargarla sin formulario, así que no se usa.
- **Qué universidades cuentan:** las de la ficha (`universities` en `cities.js`) más otras clasificadas con sede en la misma ciudad. La lista exacta, con el nombre que usa THE, está en `THE_NAMES` de [`scripts/scoring-data.mjs`](../scripts/scoring-data.mjs). Malmö incluye Lund University, Boston incluye Harvard y San Francisco incluye UC Berkeley, porque sus fichas las listan.
- **Universidades que han dejado THE:** si una universidad ya no sale en la edición actual porque se ha retirado del ranking, se usa la edición más reciente en la que sí sale, entre 2023 y 2026. El desglose lo indica. Hoy es el caso de:
  - Utrecht University: THE 2023, puesto 66.
  - Aix-Marseille: THE 2025, 401–500.
  - University of Strasbourg: THE 2023, 601–800.
  - University of Bergamo: THE 2025, 1001–1200.
  - Sorbonne University: THE 2026, puesto 76.
- **A 0–10:** por tramos, según el número con el que empieza el tramo de THE:

  | Puesto en THE | Nota |
  |---|---|
  | Hasta el 50 | 10 |
  | Del 51 al 100 | 9 |
  | Del 101 al 200 | 8 |
  | Del 201 al 300 | 7 |
  | Del 301 al 500 | 6 |
  | Del 501 al 1000 | 5 |
  | Más de 1000 | 4,5 |
  | Ninguna clasificada | 4 |

  «Ninguna clasificada» incluye a las que solo salen como «Reporter» y a las que no participan.
- **Limitación:** la mejor universidad de la ciudad no tiene por qué ser la tuya. Por eso el peso es solo del 10 %.
  - La Universidad de Buenos Aires y la Universität Leipzig nunca han participado en THE: Buenos Aires saca 4,5 por la UCA y Leipzig, 4.
  - Si se añade QS, la regla sería «el mejor de los dos rankings».

### Alojamiento (10 %) · valoración MAbroad

Es la nota de la categoría «Alojamiento» de la ficha ([`insights.js`](../src/data/insights.js)): disponibilidad, precio, facilidad de búsqueda y residencias. Cuenta porque encontrar piso es el primer problema en ciudades como Dublín, Ámsterdam o Galway.

### Calidad de vida y clima (10 %) · valoración MAbroad

Es la media de las subnotas «Clima» y «Calidad de vida» de la categoría «Estilo de vida y entorno». Si falta alguna, se usa la categoría entera.

### Idioma: inglés o español (10 %)

- **Qué mide:** cuánto se puede vivir en inglés o en español, el que puntúe más. Para un estudiante español, un país hispanohablante es tan fácil como uno angloparlante.
- **Dato:**
  - **UE:** porcentaje de la población que dice poder mantener una conversación en inglés (lengua materna incluida), del [Eurobarómetro Especial 540](https://data.europa.eu/data/datasets/s2979_100_1_sp540_eng) (Comisión Europea; trabajo de campo de septiembre y octubre de 2023, publicado en 2024). Es la tabla D48.alllang, fila «English», del Volumen A. El español nunca supera al inglés en ningún país de la UE de la lista.
  - **Inglés o español como lengua oficial y mayoritaria:** un 10. Es el caso de Reino Unido, Estados Unidos, Canadá anglófona y los países hispanohablantes de América.
- **A 0–10:** el porcentaje dividido entre 10. Italia (34 %) saca 3,4 y Países Bajos (95 %), 9,5.
- **Pendiente:**
  - Suiza, Noruega, Islandia, Turquía y Brasil: el Eurobarómetro solo cubre la UE. La encuesta AES de Eurostat no da el inglés por separado ni mide lo mismo, así que no se mezcla.
  - Montreal y Quebec: son francófonas. Falta el dato del censo de Statistics Canada sobre conocimiento del inglés por área metropolitana; su web bloquea las descargas automáticas y hay que copiarlo a mano.

### Conectividad para viajar (5 %) · valoración MAbroad

Es la media de las subnotas de la categoría «Ubicación y movilidad» que empiezan por «Escapadas» o «Conexiones»: escapadas de fin de semana y conexiones nacionales e internacionales. El transporte urbano no cuenta. Si una ficha no las tiene, se usa la categoría entera.

## Las 8 categorías de la ficha

Las categorías de `insights.js` (coste, alojamiento, vida social, integración, movilidad, estilo de vida, empleo y seguridad) siguen en la ficha como **análisis editorial** de cada ciudad, con su desglose. **La nota global ya no es su media.** Hay rankings que siguen usándolas:

- «Más seguras» (categoría Seguridad).
- «Piso más fácil» (Alojamiento).
- «Más prácticas» (Empleo).
- «Mejor clima» y «Se vive en inglés» (subnotas del desglose).

«Más vida social» y «Mejor nota global» usan la nota nueva.

## City Match (preparado, sin activar)

`weightsFromMatch({ priorities, tightBudget })` en `scoring.js` da pesos ajustados a las respuestas:

- La 1.ª prioridad sube su peso un 50 %, la 2.ª un 30 % y la 3.ª un 15 %.
- Un presupuesto ajustado sube el coste un 50 %.
- Después se renormaliza a 100.

City Match todavía no lo usa. Para activarlo, hay que ordenar con `computeScore(subs, weightsFromMatch(respuestas))` y traducir sus prioridades actuales (categorías de la ficha) a ids de `SUBSCORES`.

## Cómo actualizar los datos

```bash
npm run scoring:data   # descarga THE, ESN y UNODC y reescribe src/data/scoring/*.js (van a git)
npm test               # comprueba escalas, cobertura y que la nota cuadra en cada ciudad
```

- **Eurobarómetro:** se edita a mano en `src/data/scoring/languages.js`, con la fuente en la cabecera.
- **Beca SEMP:** se edita en `src/data/becaGroups.js`.
- **Ciudad nueva:** añade su lista de universidades de THE a `THE_NAMES`. Si su país no está en `COUNTRY_ISO`, añádelo también. Luego ejecuta `npm run scoring:data`.
