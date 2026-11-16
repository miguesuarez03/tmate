# Nota MAbroad: criterio de cálculo

Fuente única del cálculo: [`src/lib/scoring.js`](../src/lib/scoring.js). Datos con fuente: [`src/data/scoring/`](../src/data/scoring/) y [`src/data/becaGroups.js`](../src/data/becaGroups.js). Si cambias un peso, una escala o una fuente, cambia también este documento y el texto de [`MethodologyNote.jsx`](../src/components/MethodologyNote.jsx).

## Qué es

La nota de cada ciudad **no se escribe a mano**. Es la media ponderada, con **pesos fijos**, de 8 subnotas de 0 a 10. Cada subnota sale de un dato con fuente, de una valoración editorial de MAbroad cuyo criterio está escrito aquí, o de las dos a medias. En la web se marca cuál es cuál.

| Subnota | Peso | Tipo | Dato y fuente |
|---|---|---|---|
| Coste de vida | 20 % | Dato | Punto medio del rango `costDetail` de la ficha |
| Vida estudiantil | 20 % | Mixto | Secciones de Erasmus Student Network + estudiantes internacionales (THE), y ambiente (valoración) |
| Seguridad | 15 % | Mixto | Mitad tasa de homicidios del país (UNODC), mitad valoración de la ciudad |
| Salidas profesionales | 10 % | Mixto | Mitad jóvenes que ni trabajan ni estudian en la región o el país (Eurostat / OIT), mitad valoración de empleo de la ciudad |
| Nivel académico | 10 % | Dato | Mejor puesto de las universidades de la ciudad en THE World University Rankings |
| Alojamiento | 10 % | Valoración | Categoría «Alojamiento» de la ficha |
| Calidad de vida y clima | 10 % | Valoración | Subnotas «Clima» y «Calidad de vida» de la ficha |
| Conectividad para viajar | 5 % | Valoración | Subnotas de escapadas y conexiones de la ficha |

**El idioma no cuenta para la nota**: es una preferencia personal. Se calcula igual y se enseña como dato aparte en el desglose y en el comparador (ver «Idioma» más abajo), y City Match lo pregunta.

Niveles (`getScoreLevel`, sobre la nota tal como se enseña, con un decimal): 8,0 o más es «Excelente»; de 7,0 a 7,9, «Muy buena»; de 6,0 a 6,9, «Buena»; por debajo de 6,0, «Mejorable». Los rankings ordenan por la nota **sin redondear** (`overallExact`, 4 decimales), así que dos ciudades que se enseñan con 7,8 no empatan por orden alfabético.

## Datos pendientes y notas provisionales

Si a una subnota le falta un dato fiable, se queda **pendiente** (`null`) en vez de inventarla:

- La nota se calcula con los pesos que quedan, repartidos en proporción, y se marca como **provisional**. En la web aparece un punto naranja junto a la nota, «Pendiente» en la subnota y una frase en el desglose.
- **Las notas provisionales no entran en los rankings.** En «Mejor nota global», en las pestañas de la portada y en el orden rápido del comparador van al final, sin puesto, con el texto «Nota provisional». Repartir el peso de lo pendiente equivale a suponer que la ciudad saca ahí lo mismo que en el resto, así que su posición no sería comparable.
- Si falta más del 30 % del peso (`MIN_COVERAGE = 0.7`), la ciudad no tiene nota y se muestra «—». Hoy no hay ninguna ciudad en ese caso.

La lista actual de pendientes está en la sección «Datos de la nota MAbroad» de [`VERIFICACION.md`](../VERIFICACION.md).

## Criterio de cada subnota

### Coste de vida (20 %)

- **Dato:** punto medio del rango `mín–máx€/mes` de `costDetail` en [`cities.js`](../src/data/cities.js), o la cifra publicada cuando la fuente oficial solo da un importe aproximado (`~700 €/mes` en Trento). Si la ficha tiene `costSource`, la fuente es oficial (normalmente la universidad); si no, es una estimación MAbroad, y el desglose lo dice.
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

- **Secciones activas de Erasmus Student Network en la ciudad** ([listado público de ESN](https://accounts.esn.org/api/v2/sections), estado «active», mismo país). Ninguna da 0 puntos; una, 3; dos o más, 4. ESN solo existe en Europa, así que en América esta parte es 0. Es intencionado: la subnota mide también el ambiente Erasmus.
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

  THE publica cifras de la institución completa, incluidos otros campus: es un indicador aproximado, no un censo municipal. Se suman solo universidades con ambas cifras disponibles; si ninguna las publica, queda pendiente. Un porcentaje publicado de 0 % sí es dato. Las ediciones históricas conservan también sus cifras históricas de estudiantes.

  **Campus satélite.** Si una universidad solo tiene en la ciudad un campus pequeño (su sede y la mayoría de su alumnado están en otra ciudad), sus estudiantes internacionales **no** se suman: la cifra de THE sería la de toda la institución y no diría nada de la comunidad local. Esa universidad sí cuenta para el nivel académico (la titulación y el profesorado son los suyos). Se marca con `{ name, satellite: true }` en `THE_NAMES` y el desglose añade «(campus en la ciudad)». Si en la ciudad no queda otra universidad con cifras, la vida estudiantil queda **pendiente** y la nota es provisional. Hoy solo es el caso de **Geel** (KU Leuven Campus Geel; la otra universidad, Thomas More, no está en THE).

  No se marcan como satélite, porque en la ciudad hay un campus grande: Leiden University en La Haya (Campus The Hague, unos 7.000 estudiantes, cerca de una quinta parte de la universidad), PUCMM en Santo Domingo (sede principal en Santiago de los Caballeros, pero con campus completo en la capital), Atlantic Technological University en Galway (su mayor campus) y ZHAW en Zúrich (sede en Winterthur, pero con dos departamentos en Zúrich; tampoco cambiaría la nota, porque ETH y UZH ya dan 5 puntos). Son casos límite: si se quisiera aplicar la regla también a ellos, La Haya y Santo Domingo quedarían provisionales. Las universidades de una ciudad cercana que lista la ficha (Lund en Malmö, Harvard en Boston, Berkeley en San Francisco, Northwestern en Chicago, la Politécnica de Silesia en Katowice) siguen la regla general: su campus principal está a un trayecto corto y su comunidad internacional es accesible.

**Ambiente (valoración MAbroad), de 0 a 10.** Media de las subnotas de la ficha que empiezan por «Fiesta» o «Eventos». Si una ficha no las tiene, se usa su categoría «Vida social y ambiente».

**Pendiente:** si ninguna universidad de la ciudad publica datos en THE (o la única que los publica es un campus satélite), no sabemos cuántos estudiantes internacionales tiene, y la subnota queda pendiente.

### Seguridad (15 %): mitad país, mitad ciudad

- **País (dato):** homicidios intencionados por cada 100.000 habitantes, según UNODC (indicador `VC.IHR.PSRC.P5`, el que publica el Banco Mundial). Se usa la media de los 3 años más recientes con dato. Así se suavizan los saltos de un año a otro en países pequeños: Malta pasó de 1,51 en 2022 a 0,56 en 2023.
  - **A 0–10:** escala logarítmica. Una tasa de 0,5 o menos da un 10 y una de 40 o más da un 0. La fórmula es `10 × ln(40 / tasa) / ln(80)` (`homicideToScore`). Cada vez que la tasa se duplica, la nota baja unos 1,6 puntos.
  - Ejemplos: Italia (0,54), 9,8; Alemania (0,85), 8,8; Estados Unidos (6,3), 4,2; Colombia (25,1), 1,1.
- **Ciudad (valoración MAbroad):** la nota de la categoría «Seguridad» de la ficha (seguridad general, de noche y ambiente). Sirve para distinguir ciudades del mismo país, como Nápoles y Bolonia.
- **Subnota:** media de las dos mitades. El ranking «Más seguras» sigue usando solo la valoración de la ciudad.

### Salidas profesionales (10 %): mitad región o país, mitad ciudad

- **Región o país (dato):** tasa NEET, el porcentaje de jóvenes de 15 a 24 años que ni trabajan ni estudian ni se forman. Media de los 3 años más recientes con dato.
  - **Europa (UE, Suiza, Noruega, Islandia y Turquía):** la región NUTS 2 de Eurostat (`edat_lfse_22`). La región de cada ciudad sale de sus coordenadas ([`cityCoords.js`](../src/lib/cityCoords.js)) sobre los límites oficiales GISCO NUTS 2024. Si la región no tiene dato, se usa el país; hoy pasa en Bratislava, Dresde y Leipzig.
  - **Reino Unido y América:** el país según la OIT (indicador `SL.UEM.NEET.ZS` que publica el Banco Mundial). Perú usa 2020–2022, los últimos años con dato.
  - **A 0–10:** con un 4 % o menos, un 10. Cada 2 puntos más restan 1. Con un 24 % o más, un 0 (`neetToScore`). Ejemplos:
    - Zuid-Holland (3,6 %): 10.
    - Emilia-Romaña (7,6 %): 8,2.
    - Berlín (12,1 %): 6,0.
    - Campania (19,1 %): 2,4.
    - Colombia (22,8 %): 0,6.
- **Por qué NEET y no el paro juvenil:** la tasa de paro juvenil cuenta como parados a los estudiantes que buscan trabajo: Suecia sale con un 24 %. Además, premia a las economías con mucho empleo informal: Bolivia sale con un 5 % y Guatemala con un 4,8 %. La tasa NEET mide lo mismo que importa aquí (cuántos jóvenes se quedan fuera) sin esos dos sesgos, y Eurostat la publica por región.
- **Ciudad (valoración MAbroad):** la nota de la categoría «Empleo y oportunidades» de la ficha (mercado laboral, prácticas, empresas relevantes y oportunidades para estudiantes). Recoge lo que la región no dice de la ciudad.
- **Subnota:** media de las dos mitades. Si no hay dato NEET, la subnota queda pendiente; hoy no le pasa a ninguna ciudad.

### Nivel académico (10 %)

- **Dato:** el mejor puesto, entre las universidades de la ciudad, en el [THE World University Rankings](https://www.timeshighereducation.com/world-university-rankings) (edición actual: 2027). THE publica la tabla completa en JSON. QS no permite descargarla sin formulario, así que no se usa.
- **Qué universidades cuentan:** las de la ficha (`universities` en `cities.js`) más otras clasificadas con sede en la misma ciudad. La lista exacta, con el nombre que usa THE, está en `THE_NAMES` de [`scripts/scoring-data.mjs`](../scripts/scoring-data.mjs). Malmö incluye Lund University, Boston incluye Harvard y San Francisco incluye UC Berkeley, porque sus fichas las listan.
- **Universidades que han dejado THE:** si una universidad ya no sale en la edición actual porque se ha retirado del ranking, se usa la edición más reciente en la que sí sale, entre 2023 y 2026. El desglose lo indica. Hoy es el caso de:
  - Utrecht University: THE 2023, puesto 66.
  - Sorbonne University: THE 2026, puesto 76.
  - Aix-Marseille: THE 2025, 401–500.
  - University of Strasbourg: THE 2023, 601–800.
  - University of Bergamo: THE 2025, 1001–1200.
  - University of Zurich: THE 2024, puesto 80 (retirada confirmada por la propia UZH).
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
  - Geel incluye KU Leuven porque tiene campus en la ciudad y figura en su ficha. El puesto es el de toda KU Leuven. Como es un campus satélite, cuenta aquí pero no en la comunidad de la vida estudiantil (ver «Campus satélite»).
  - La Universidad de Buenos Aires y la Universität Leipzig nunca han participado en THE: Buenos Aires saca 4,5 por la UCA y Leipzig, 4.
  - Si se añade QS, la regla sería «el mejor de los dos rankings».

### Alojamiento (10 %) · valoración MAbroad

Es la nota de la categoría «Alojamiento» de la ficha ([`insights.js`](../src/data/insights.js)): disponibilidad, precio, facilidad de búsqueda y residencias.

### Calidad de vida y clima (10 %) · valoración MAbroad

Es la media de las subnotas «Clima» y «Calidad de vida» de la categoría «Estilo de vida y entorno». Si falta alguna, se usa la categoría entera.

### Conectividad para viajar (5 %) · valoración MAbroad

Es la media de las subnotas de la categoría «Ubicación y movilidad» que empiezan por «Escapadas» o «Conexiones»: escapadas de fin de semana y conexiones nacionales e internacionales. El transporte urbano no cuenta. Si una ficha no las tiene, se usa la categoría entera.

## Idioma (dato aparte, no cuenta en la nota)

- **Qué mide:** cuánto se puede vivir en inglés o en español, el que puntúe más.
- **Dato:**
  - **UE:** porcentaje de la población que dice poder mantener una conversación en inglés (lengua materna incluida), del [Eurobarómetro Especial 540](https://data.europa.eu/data/datasets/s2979_100_1_sp540_eng) (Comisión Europea, 2024). Es la tabla D48.alllang, fila «English», del Volumen A.
  - **Inglés o español como lengua oficial y mayoritaria:** un 10.
- **A 0–10:** el porcentaje dividido entre 10. Italia (34 %) saca 3,4 y Países Bajos (95 %), 9,5.
- **Sin dato:** Suiza, Noruega, Islandia, Turquía, Brasil, Montreal y Quebec. Como no cuenta en la nota, no hace provisional a nadie.

## Las 8 categorías de la ficha

Las categorías de `insights.js` (coste, alojamiento, vida social, integración, movilidad, estilo de vida, empleo y seguridad) siguen en la ficha como **análisis editorial** de cada ciudad, con su desglose. **La nota global no es su media**, aunque algunas entran a medias en subnotas: Seguridad, Empleo, Alojamiento, y partes de Vida social, Estilo de vida y Movilidad.

Hay rankings que siguen usándolas:

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

City Match todavía no lo usa. Para activarlo, hay que ordenar con `computeScore(subs, weightsFromMatch(respuestas))` y traducir sus prioridades actuales (categorías de la ficha) a ids de `SUBSCORES`. El idioma sigue siendo una pregunta de City Match, no un peso.

## Cómo actualizar los datos

```bash
npm run scoring:data   # descarga THE, ESN, UNODC y NEET (Eurostat + GISCO + OIT) y reescribe src/data/scoring/*.js (van a git)
npm test               # comprueba escalas, cobertura y que la nota cuadra en cada ciudad
```

- **Eurobarómetro:** se edita a mano en `src/data/scoring/languages.js`, con la fuente en la cabecera.
- **Beca SEMP:** se edita en `src/data/becaGroups.js`.
- **Ciudad nueva:** añade su lista de universidades de THE a `THE_NAMES`. Si su país no está en `COUNTRY_ISO`, añádelo también. Comprueba que tiene coordenadas en `cityCoords.js`, porque la región NEET sale de ahí. Luego ejecuta `npm run scoring:data`.
