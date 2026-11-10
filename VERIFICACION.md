# VERIFICACIÓN DE DESTINOS

Revisión de las 150 fichas, de 5 en 5, con información real y comprobable.
Claude Code hace cada tanda y Codex la revisa con `codex exec` en solo lectura (ver «Flujo de cada tarea» en CLAUDE.md y AGENTS.md).

## Dónde vamos

**Siguiente tanda: 4** (Múnich, Lyon, Turín, Nápoles, Padua) (actualizar al cerrar cada tanda).

## Qué se revisa en cada ciudad

| Bloque | Dónde | Qué comprobar |
|---|---|---|
| Fotos | `cities.js` (`img`, `heroImg`) + `wikimediaPhotos.js` | Que la foto es de esa ciudad, original ≥1920×1080 y con autor y licencia. Si cambia la URL: `npm run photos:meta`. |
| Textos | `cities.js` (`tag`, `phrase`, `vibe`, `description`, `highlights`) | Que toda afirmación factual (fechas, «la más antigua», «UNESCO», récords…) sea cierta y no haya cifras sin fuente. |
| Clima | `cities.js` (`weather`) + `weatherSeasons.js` | Temperaturas medias de cada estación contra el servicio meteorológico nacional o las normales climatológicas oficiales. |
| Datos | `cities.js` (`country`, `region`, `language`, `costDetail`, `universities`, `neighborhoods`) + `cityPopulation.js` | Idioma(s) oficial(es), universidades reales y con su nombre oficial, barrios que existen, coste coherente y población del instituto de estadística. |
| Tips | `cities.js` (`tips`) | Precios de transporte (web del operador), nombres de servicios, apps y trámites actuales. |
| Enlaces | `universityErasmusLinks.js`, `cityWhatsappGroups.js` | Que cada URL lleve a la página oficial de estudiantes de intercambio (incoming) y siga funcionando. |
| Programa | `cities.js` (`programType`, `experiences`) | Erasmus+ solo en países del programa (UE + Islandia, Liechtenstein, Noruega, Macedonia del Norte, Serbia y Turquía). Reino Unido y Suiza van por convenios bilaterales. |
| Score | `insights.js` (8 categorías y subcategorías) + `comparePhrases.js` | Que los textos de cada subcategoría sean ciertos y que las notas (valoración editorial de MAbroad) sean coherentes con los datos comprobados (p. ej., la nota de coste con `costDetail`). |

Reglas: no inventar datos ni opiniones; si algo no se puede comprobar en una fuente oficial o fiable, se reescribe sin la cifra o se quita. Las notas son editoriales, no datos oficiales.

## Tandas

Orden: primero los destinos Erasmus+ más demandados por estudiantes españoles (orden editorial orientativo: no hay un ranking oficial por ciudad), luego el resto de Erasmus+, después Reino Unido y Suiza, y al final América.

| Tanda | Ciudades | Estado |
|---|---|---|
| 1 | Bolonia (`bolonia`), Roma (`roma`), Milán (`milan`), Florencia (`florencia`), Lisboa (`lisboa`) | ✅ 10-11-2026 |
| 2 | Oporto (`oporto`), Berlín (`berlin`), París (`paris`), Praga (`praga`), Budapest (`budapest`) | ✅ 10-11-2026 |
| 3 | Varsovia (`varsovia`), Cracovia (`cracovia`), Viena (`viena`), Ámsterdam (`amsterdam`), Bruselas (`bruselas`) | ✅ 10-11-2026 |
| 4 | Múnich (`munich`), Lyon (`lyon`), Turín (`turin`), Nápoles (`napoles`), Padua (`padua`) | Pendiente |
| 5 | Coimbra (`coimbra`), Copenhague (`copenhague`), Dublín (`dublin`), Estocolmo (`estocolmo`), Helsinki (`helsinki`) | Pendiente |
| 6 | Lovaina (`lovaina`), Gante (`gante`), Utrecht (`utrecht`), Groningen (`groningen`), Rotterdam (`rotterdam`) | Pendiente |
| 7 | La Haya (`la-haya`), Maastricht (`maastricht`), Hamburgo (`hamburgo`), Colonia (`colonia`), Heidelberg (`heidelberg`) | Pendiente |
| 8 | Friburgo (`friburgo`), Leipzig (`leipzig`), Dresde (`dresde`), Tubinga (`tubinga`), Rosenheim (`rosenheim`) | Pendiente |
| 9 | Toulouse (`toulouse`), Burdeos (`burdeos`), Nantes (`nantes`), Montpellier (`montpellier`), Marsella (`marsella`) | Pendiente |
| 10 | Lille (`lille`), Estrasburgo (`estrasburgo`), Grenoble (`grenoble`), Rennes (`rennes`), Venecia (`venecia`) | Pendiente |
| 11 | Pisa (`pisa`), Siena (`siena`), Bari (`bari`), Génova (`genova`), Perugia (`perugia`) | Pendiente |
| 12 | Trieste (`trieste`), Parma (`parma`), Bérgamo (`bergamo`), Ferrara (`ferrara`), Urbino (`urbino`) | Pendiente |
| 13 | Lecce (`lecce`), Catania (`catania`), Palermo (`palermo`), Cagliari (`cagliari`), Verona (`verona`) | Pendiente |
| 14 | Braga (`braga`), Atenas (`atenas`), Salónica (`salonica`), Breslavia (`wroclaw`), Gdansk (`gdansk`) | Pendiente |
| 15 | Poznan (`poznan`), Katowice (`katowice`), Brno (`brno`), Bratislava (`bratislava`), Pécs (`pecs`) | Pendiente |
| 16 | Liubliana (`liubliana`), Zagreb (`zagreb`), Split (`split`), Tallin (`tallin`), Riga (`riga`) | Pendiente |
| 17 | Vilna (`vilna`), Kaunas (`kaunas`), Bucarest (`bucarest`), Cluj-Napoca (`cluj-napoca`), Sofía (`sofia`) | Pendiente |
| 18 | Oslo (`oslo`), Reikiavik (`reikiavik`), Lund (`lund`), Uppsala (`uppsala`), Malmö (`malmo`) | Pendiente |
| 19 | Gotemburgo (`gotemburgo`), Aarhus (`aarhus`), Turku (`turku`), Galway (`galway`), Innsbruck (`innsbruck`) | Pendiente |
| 20 | Nicosia (`nicosia`), La Valeta (`la-valeta`), Estambul (`estambul`), Londres (`londres`), Edimburgo (`edimburgo`) | Pendiente |
| 21 | Mánchester (`manchester`), Glasgow (`glasgow`), Bristol (`bristol`), Liverpool (`liverpool`), Leeds (`leeds`) | Pendiente |
| 22 | Zúrich (`zurich`), Ginebra (`ginebra`), Lausana (`lausana`), Basilea (`basilea`), Berna (`berna`) | Pendiente |
| 23 | Nueva York (`nueva-york`), Boston (`boston`), Chicago (`chicago`), Los Ángeles (`los-angeles`), San Francisco (`san-francisco`) | Pendiente |
| 24 | Washington D.C. (`washington`), Miami (`miami`), Austin (`austin`), Seattle (`seattle`), Nueva Orleans (`nueva-orleans`) | Pendiente |
| 25 | Ann Arbor (`ann-arbor`), San Diego (`san-diego`), Toronto (`toronto`), Vancouver (`vancouver`), Montreal (`montreal`) | Pendiente |
| 26 | Quebec (`quebec`), Ottawa (`ottawa`), Ciudad de México (`ciudad-de-mexico`), Guadalajara (`guadalajara`), Monterrey (`monterrey`) | Pendiente |
| 27 | Buenos Aires (`buenos-aires`), Córdoba (`cordoba-argentina`), Santiago de Chile (`santiago-de-chile`), Bogotá (`bogota`), Medellín (`medellin`) | Pendiente |
| 28 | Cartagena de Indias (`cartagena-de-indias`), Lima (`lima`), Cusco (`cusco`), São Paulo (`sao-paulo`), Río de Janeiro (`rio-de-janeiro`) | Pendiente |
| 29 | Florianópolis (`florianopolis`), Montevideo (`montevideo`), Quito (`quito`), Ciudad de Panamá (`ciudad-de-panama`), San José (`san-jose-costa-rica`) | Pendiente |
| 30 | La Paz (`la-paz`), Asunción (`asuncion`), Ciudad de Guatemala (`ciudad-de-guatemala`), San Salvador (`san-salvador`), Santo Domingo (`santo-domingo`) | Pendiente |

## Registro de tandas

<!-- Por cada tanda cerrada: fecha, commit, qué se cambió y qué encontró Codex. -->

### Tanda 1 — 10-11-2026 (Bolonia, Roma, Milán, Florencia, Lisboa)
- Fotos: las 5 corresponden a su ciudad (Wikimedia ≥1920 px o Unsplash).
- Transporte al día: TPER 2,30 €/39 €, Metrebus Roma 35 €, Florencia 42,20 €; Milán tiene 5 líneas de metro.
- Fuera cifras y récords sin fuente: «300 días de sol» y «el invierno más suave de Europa» (Lisboa), aperitivo «a 3 €»/«gratis» (Milán), «7.000+ internacionales» (Roma), «comer por 5 €» (Bolonia), «la pasta se inventó aquí», «top 10 de seguridad», «Feedzai nació en Lisboa». «3.000 años» de Roma → «casi 2.800».
- Clima: temperaturas por estación con las normales 1991–2020 (ARPAE, OMM/NOAA, LaMMA, IPMA).
- Enlaces Erasmus arreglados: Accademia di Belle Arti di Bologna, LUISS, Roma Tre, Cattolica, Unifi y NOVA (404 o bloqueados); clave «Sapienza» corregida; fuera la sede de Forlì (no está en Bolonia).
- Datos: Lisboa, idioma «Portugués» y coste 800–1.000 €/mes (ISCTE) con nota de coste 6,5; población 2023 de las 4 ciudades italianas.
- Codex: auditoría con fuentes + 2 rondas de revisión; en la ronda 1 pidió precisar OutSystems y subir el coste de Lisboa (aplicado). No pudo volver a abrir las tablas italianas de clima: se mantienen las normales que dio en la auditoría.

### Tanda 2 — 10-11-2026 (Oporto, Berlín, París, Praga, Budapest)
- Cambio global: `language` solo recoge idiomas oficiales (fuera « / Inglés» en 16 fichas; Nicosia «Griego / Turco»; Montreal mantiene «Francés / Inglés»). En City Match, «Inglés» ya solo encaja con países anglófonos.
- Fotos: las 5 corresponden a su ciudad.
- Coste revisado con las estimaciones de las universidades (Católica Porto, TU Berlin, ICP, Universidad Carolina, ELTE): Oporto 600–800 €, Berlín 900–1.200 €, París 1.100–1.500 €, Praga 550–1.000 €, Budapest 600–800 €; notas de coste ajustadas a la baja.
- Transporte al día: Andante 30/40 €, Navigo 90,80 €, DPP 550/130 CZK, BKK 8.950/3.450 HUF (con el requisito de domicilio desde el 15-06-2026).
- Fuera cifras y récords sin fuente: «+5.000/+9.000/+12.000/+7.500 internacionales», «la más fotogénica/bella de Europa», «cerveza más barata que el agua», «el mayor hub de startups», «el techno nació aquí», precios de cervezas y menús, «35 % de extranjeros», «700 km de carril bici», etc. Datos caducados corregidos: Watergate (cerró en 2024), Berlin Music Week (ahora Pop-Kultur), Pompidou (cerrado hasta 2030), metro 1 de Budapest (el primero de Europa continental).
- Quitado un falso testimonio en París («La residencia CROUS me la dieron…»).
- Clima con normales 1991–2020 (IPMA, DWD/OMM, Météo-France, ČHMÚ, HungaroMet).
- 14 enlaces Erasmus arreglados (FU, HU, TU, BHT, ISCAP, Sorbonne, Sciences Po, HEC, Dauphine, Carolina, ČVUT, VŠE, Corvinus, BME, ELTE) y nombres oficiales de universidades.
- Codex: auditoría con fuentes + 2 rondas; en la ronda 1 corrigió la mínima de verano de París, la excepción de la U4 en Berlín y el requisito de los museos de París (aplicado).

### Tanda 3 — 10-11-2026 (Varsovia, Cracovia, Viena, Ámsterdam, Bruselas)
- Fotos: las 5 corresponden a su ciudad.
- Coste según las universidades (UW, UEK, Univie, UvA, ULB): Varsovia 700–1.100 €, Cracovia 600–950 €, Viena 1.000–1.400 €, Ámsterdam 1.000–1.500 €, Bruselas 950–1.350 €; notas de coste ajustadas.
- Transporte 2026: Varsovia 110/55 PLN, Cracovia 193/96,50 PLN, Wiener Linien 461 €/año o 65,20 €/mes, STIB 56 € (12 €/año para menores de 25 con requisitos).
- Corregido lo falso: Viena «n.º 1 diez años seguidos» (fue n.º 1 en 2022–2024), «ópera desde 3 €», Runtastic (Linz), Pogłos (cerró en 2024), Thalys (ahora Eurostar), BCE (está en Fráncfort), Bruselas «trilingüe» (es bilingüe), ASML (no está en Ámsterdam).
- Fuera cifras sin fuente («+5.500/+6.000/+8.000 internacionales», «800.000 bicis», «40.000 funcionarios», «top 3 mundial en seguridad») y un falso testimonio en Ámsterdam.
- Clima con normales 1991–2020 (IMGW, GeoSphere, KNMI, IRM) y 11 enlaces Erasmus arreglados; nombres oficiales (SGH, Krakow University of Economics).
- Pendiente: el enlace de Vesalius College (ahora Brussels School of Governance) no se pudo comprobar.
- Codex: auditoría con fuentes + 1 ronda de revisión sin fallos (solo dejó sin volver a cotejar el clima polaco, que salió de su propia auditoría).
