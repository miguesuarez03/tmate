# VERIFICACIÓN DE DESTINOS

Revisión de las 150 fichas, de 5 en 5, con información real y comprobable.
Claude Code hace cada tanda y Codex la revisa con `codex exec` en solo lectura (ver «Flujo de cada tarea» en CLAUDE.md y AGENTS.md).

## Dónde vamos

**Siguiente tanda: 8** (Friburgo, Leipzig, Dresde, Tubinga, Rosenheim) (actualizar al cerrar cada tanda).

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

## Cómo se hace una tanda

Herramientas en `scripts/verificacion/` (ejecutar desde la raíz del repo):

1. **Auditoría (Codex, solo lectura)**: `prompt-auditoria.txt` con `{{SLUGS}}` sustituido por las 5 ciudades →
   `Get-Content prompt.txt -Raw -Encoding utf8 | codex exec -s read-only --ephemeral --color never -c web_search=live -o auditoria.txt -` (en segundo plano: tarda 10–20 min).
2. **Fotos (Claude)**: comprobar que cada `img`/`heroImg` es de esa ciudad (descargar una miniatura y mirarla) y, si es de Wikimedia, que el original mide ≥1920×1080 en `wikimediaPhotos.js`.
3. **Ver los textos marcados**: `node scripts/verificacion/show.cjs <slug> "patrón1|patrón2"` imprime las líneas de esa ciudad en cities.js, insights.js, comparePhrases.js y weatherSeasons.js.
4. **Aplicar (Claude)**: un script con `require("./scripts/verificacion/lib.cjs")` → `city(slug, { C, I, P, W })` (reemplazos exactos dentro del bloque de la ciudad; falla si el texto no aparece una sola vez), `temps(slug, {...})`, `score(slug, "coste", "7.0", "6.5")` y `file(ruta, pares)`. Hacer copia de `src/data` antes por si falla a medias.
5. **Revisión (Codex)**: ronda 1 sobre `git diff` con las afirmaciones nuevas y las decisiones editoriales; corregir y ronda 2 si hace falta (máx. 2).
6. **Cerrar**: actualizar «Dónde vamos», la tabla y el registro; `npm run build`; commit y push.

Criterios fijados en las tandas 1–5: `language` = solo idiomas oficiales; `costDetail` = estimación mensual que publica una universidad de la ciudad (si no hay, estimación editorial marcada como pendiente) y nota de coste coherente; clima = medias de mínimas y máximas por estación de las normales 1991–2020 (sin dato verificado, sin bloque: la sección no se muestra); precios sueltos de cervezas o menús sin fuente → se reescriben sin cifra; testimonios en primera persona que no estén en `cityExperiences.js` → fuera.

## Tandas

Orden: primero los destinos Erasmus+ más demandados por estudiantes españoles (orden editorial orientativo: no hay un ranking oficial por ciudad), luego el resto de Erasmus+, después Reino Unido y Suiza, y al final América.

| Tanda | Ciudades | Estado |
|---|---|---|
| 1 | Bolonia (`bolonia`), Roma (`roma`), Milán (`milan`), Florencia (`florencia`), Lisboa (`lisboa`) | ✅ 10-11-2026 |
| 2 | Oporto (`oporto`), Berlín (`berlin`), París (`paris`), Praga (`praga`), Budapest (`budapest`) | ✅ 10-11-2026 |
| 3 | Varsovia (`varsovia`), Cracovia (`cracovia`), Viena (`viena`), Ámsterdam (`amsterdam`), Bruselas (`bruselas`) | ✅ 10-11-2026 |
| 4 | Múnich (`munich`), Lyon (`lyon`), Turín (`turin`), Nápoles (`napoles`), Padua (`padua`) | ✅ 10-11-2026 |
| 5 | Coimbra (`coimbra`), Copenhague (`copenhague`), Dublín (`dublin`), Estocolmo (`estocolmo`), Helsinki (`helsinki`) | ✅ 10-11-2026 |
| 6 | Lovaina (`lovaina`), Gante (`gante`), Utrecht (`utrecht`), Groningen (`groningen`), Rotterdam (`rotterdam`) | ✅ 10-11-2026 |
| 7 | La Haya (`la-haya`), Maastricht (`maastricht`), Hamburgo (`hamburgo`), Colonia (`colonia`), Heidelberg (`heidelberg`) | ✅ 11-11-2026 |
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

### Tanda 4 — 10-11-2026 (Múnich, Lyon, Turín, Nápoles, Padua)
- Cambio global: la sección «Las cuatro estaciones» ya no muestra temperaturas genéricas inventadas a las ciudades sin datos (afectaba a 111 fichas, incluida América, con «invierno frío 2–8 °C»). Sin datos reales, la sección no aparece; se añadirán en cada tanda.
- Fotos: las 5 corresponden a su ciudad.
- Coste según las universidades (TUM, Lyon 2, Politecnico di Torino, Federico II, UniPD): Múnich 1.200–1.500 €, Lyon 800–1.100 €, Turín 700–1.000 €, Nápoles 750–1.000 €, Padua 800–950 €; notas de coste ajustadas.
- Transporte: Deutschlandticket 63 € en Múnich, TCL 26 € (estudiantes), GTT 38 € / 25 € Under 26.
- Corregido lo falso: Harry Klein (cerró en 2023), MBition (no está en Múnich), Bicimia (es de Brescia) y TO Bike (cerró), Ferrari/Lamborghini/«Motor Valley» en Turín, la Circumvesuviana no llega a Amalfi, el abono de Padua no cubre el tren, Oktoberfest en verano, «canales por los cuatro costados» en Padua.
- Fuera cifras y comparaciones sin fuente («+4.500 internacionales», «40 % con raíces extranjeras», «la más barata/segura de Italia», «a mitad de precio que París») y un falso testimonio en Múnich.
- Clima: Múnich con normales DWD/OMM y Lyon añadido (Météo-France, Lyon-Bron). Turín: quitado hasta tener normales de una estación urbana (la serie completa de la OMM es de Torino-Bric, a 710 m). Nápoles y Padua: sin normales completas verificadas (pendiente).
- 4 enlaces Erasmus arreglados (LMU, TUM, HM, UniPD).
- Codex: auditoría con fuentes + 2 rondas; en la ronda 1 precisó que el récord de seguridad de Múnich es entre ciudades de más de 200.000 habitantes (aplicado).

### Tanda 5 — 10-11-2026 (Coímbra, Copenhague, Dublín, Estocolmo, Helsinki)
- Fotos: las 5 corresponden a su ciudad.
- Coste según las universidades (KU, UCD, Stockholm University, University of Helsinki): Copenhague 1.300–1.800 €, Dublín 1.700–2.400 €, Estocolmo 1.100–1.400 €, Helsinki 900–1.250 €. Coímbra 550–750 € es **estimación editorial** (no hay estimación universitaria vigente): pendiente de fuente. Notas de coste ajustadas.
- Transporte: SL 1.060/650 SEK (rebaja temporal hasta diciembre de 2026), HSL 73,90 € con 40 % para estudiantes, app Rejsekort (la tarjeta física dejó de funcionar).
- Corregido lo falso: universidad de Coímbra «desde 1290» (fundada en Lisboa; en Coímbra definitivamente desde 1537), Dublín con el irlandés como «segunda» lengua (es la primera), «Ölkontroll», «naciones estudiantiles» en Estocolmo (eso es de Lund/Uppsala), Kela Card (es la tarjeta sanitaria), «oscuridad casi total», «nieve segura». Helsinki: idioma «Finés / Sueco».
- Fuera récords y cifras sin fuente: «la ciudad más ciclable del mundo» (Utrecht la superó en 2025), «ecosistema startup más denso de Europa», «más de 3.000 saunas», «miles de plazas HOAS», «criminalidad residual».
- Clima: Dublín, Estocolmo y Helsinki con normales 1991–2020 (Met Éireann, SMHI, FMI); Coímbra añadido (IPMA). Copenhague retirado hasta extraer las normales del DMI (Landbohøjskolen, informe DMIRep21-11).
- 2 enlaces Erasmus: SSE (apuntaba a outgoing) y el nuevo nombre de la Universidade Politécnica de Coimbra.
- Codex: auditoría con fuentes + 2 rondas; en la ronda 1 añadió la rebaja temporal del SL y matizó lo de Systembolaget (aplicado).

### Tanda 6 — 10-11-2026 (Lovaina, Gante, Utrecht, Groningen, Rotterdam)
- Fotos: las 5 corresponden a su ciudad.
- Coste según las universidades (KU Leuven, UGent, UU, RUG, EUR): Lovaina 1.050–1.400 €, Gante 1.200–1.800 €, Utrecht 1.000–1.400 €, Groningen 800–1.000 €, Rotterdam 1.000–1.800 €; notas de coste ajustadas. Gante: el alojamiento ya no se presenta como «abundante» (hay escasez).
- Corregido lo falso: «la universidad más grande» de Bélgica (UGent) y de Países Bajos (Utrecht), Groningen «un tercio estudiantes / la ciudad más joven de Europa» (es casi una cuarta parte), Kotweb (es Kotwijs/KotatGent), Kences (no alquila habitaciones), sedes de Unilever/ING/Heineken en Rotterdam, RET 8,50 € (ahora 12 €), «la ciudad que se destruyó», tiempos de tren y aeropuerto.
- Fuera cifras sin fuente: «la mitad de turistas», «+3.000 internacionales», «miles de habitaciones SSH», «más del 50 % con raíces no holandesas».
- Clima: Gante y Rotterdam con normales 1991–2020 (IRM, KNMI); añadidos Lovaina (IRM), Utrecht (KNMI De Bilt) y Groningen (KNMI Eelde).
- 5 enlaces Erasmus arreglados (UGent, HOGENT, Artevelde, EUR, Rotterdam UAS).
- Codex: auditoría con fuentes + 2 rondas; en la ronda 1 pidió usar el coste de la UGent tal cual (Claude había interpolado con Lovaina) y precisar Amsterdam Zuid (aplicado).

### Tanda 7 — 11-11-2026 (La Haya, Maastricht, Hamburgo, Colonia, Heidelberg)
- Fotos: las 5 corresponden a su ciudad.
- Coste según las universidades (THUAS, UM, Universität Hamburg, Universität zu Köln, Universidad de Heidelberg): La Haya 1.000–1.300 € (más seguro si trabajas), Maastricht 1.250 €, Hamburgo 900–1.400 €, Colonia 900–1.200 €, Heidelberg 1.000 €; notas de coste ajustadas (La Haya 6,5→5,0).
- Corregido lo falso: La Haya «sede de la ONU» (es sede de la Corte Internacional de Justicia), «OV-chipkaart obligatoria» (también OVpay), Parkpop (terminó en 2023); Maastricht «la ciudad con más estudiantes internacionales» (el dato es de la universidad) y «PBL íntegramente en inglés»; mirador de la Elbphilharmonie «gratis» (5 €/3 €); Karneval «cada febrero» (febrero o marzo), museo y torre de la catedral «gratis», «RTL Group» (es RTL Deutschland), ICE a París (es Eurostar); Heidelberg «BioPark» (Technologiepark) y SAP «a 15 minutos».
- Fuera récords y cifras sin fuente: «capital diplomática del mundo», «la ciudad más internacional», «ninguna ciudad concentra tantas instituciones», «+2.500 internacionales», «el mercado más barato de Holanda», «segunda economía urbana de Alemania», «una de las ciudades más seguras de Alemania» (seguridad de Heidelberg 9,0→8,5), tiempos de tren y precios de habitaciones y cervezas sin fuente.
- Clima con normales 1991–2020: La Haya (KNMI Voorschoten) y Hamburgo (DWD Fuhlsbüttel) corregidos; añadidos Maastricht (KNMI), Colonia (DWD Köln/Bonn) y Heidelberg (DWD Mannheim, la estación más cercana con serie completa, a unos 18 km).
- 7 enlaces Erasmus arreglados (Leiden, THUAS, Universität Hamburg, HCU, TUHH, Universität zu Köln, Sporthochschule).
- Código: ordenar por coste y la etiqueta «Asequible» leían mal los miles («1.200–1.500€» contaba como 120 € o como barato); ahora usan `parseMinCost`. `show.cjs`/`lib.cjs` aceptan slugs con guion (`"la-haya"`).
- Codex: auditoría con fuentes + 2 rondas; en la ronda 1 pidió quitar junio de las iluminaciones del castillo de Heidelberg y usar el desglose de THUAS sin el seguro (solo si trabajas) (aplicado). No puso objeciones al clima de Heidelberg con la estación de Mannheim (anotado en weatherSeasons.js).
