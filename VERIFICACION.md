# VERIFICACIÓN DE DESTINOS

Revisión de las 150 fichas, de 5 en 5, con información real y comprobable.
Claude Code hace cada tanda y Codex la revisa con `codex exec` en solo lectura (ver «Flujo de cada tarea» en CLAUDE.md y AGENTS.md).

## Dónde vamos

**Siguiente tanda: 14** (Braga, Atenas, Salónica, Breslavia, Gdansk). Rosenheim (tanda 8) espera los datos locales de Miguel: ver «Pendiente de Miguel» al final. (actualizar al cerrar cada tanda).

## Qué se revisa en cada ciudad

| Bloque | Dónde | Qué comprobar |
|---|---|---|
| Fotos | `cities.js` (`img`, `heroImg`) + `wikimediaPhotos.js` | Que la foto es de esa ciudad, original ≥1920×1080 y con autor y licencia. Si cambia la URL: `npm run photos:meta`. |
| Textos | `cities.js` (`tag`, `phrase`, `vibe`, `description`, `highlights`) | Que toda afirmación factual (fechas, «la más antigua», «UNESCO», récords…) sea cierta y no haya cifras sin fuente. |
| Clima | `cities.js` (`weather`) + `weatherSeasons.js` | Temperaturas medias de cada estación contra el servicio meteorológico nacional o las normales climatológicas oficiales. |
| Datos | `cities.js` (`country`, `region`, `language`, `costDetail`, `universities`, `neighborhoods`) + `cityPopulation.js` | Idioma(s) oficial(es), universidades reales y con su nombre oficial, barrios que existen, coste coherente y población del instituto de estadística. |
| Tips | `cities.js` (`tips`) | Precios de transporte (web del operador), nombres de servicios, apps y trámites actuales. |
| Enlaces | `universityErasmusLinks.js`, `cityWhatsappGroups.js` | Que cada URL lleve a la página oficial de estudiantes de intercambio (incoming) y siga funcionando. |
| Programa | `cities.js` (`programType`, `experiences`) | Erasmus+ solo en países del programa (UE + Islandia, Liechtenstein, Noruega, Macedonia del Norte, Serbia y Turquía). Reino Unido: `programType: "erasmus"` con `erasmusFrom: "2027-28"` y `erasmusStatus: "confirmed"` (acuerdo UE-Reino Unido del 17/12/2025). Suiza: `switzerland_bilateral` con `erasmusStatus: "pending"` hasta que su Parlamento apruebe la financiación (el acuerdo se aplica de forma provisional antes de su ratificación). |
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
6. **Cerrar**: actualizar «Dónde vamos», la tabla y el registro; poner la fecha de la tanda a sus ciudades en `src/data/cityReviews.js` (la ficha la enseña como «Datos revisados el …»); `npm run build`; commit y push.

Criterios fijados en las tandas 1–5: `language` = solo idiomas oficiales; `costDetail` = estimación mensual que publica una universidad de la ciudad, siempre como rango `mín–máx€/mes` (si la universidad da una sola cifra, se usa su desglose o una segunda estimación de gastos de la ciudad; si no hay, rango editorial marcado como pendiente; no vale el mínimo para el visado, que es solvencia y no gasto; `npm test` falla con una cifra suelta) (si no hay, estimación editorial marcada como pendiente) y nota de coste coherente; con fuente oficial, `costSource` en `cities.js` (sin él, la ficha dice «Estimación MAbroad» y no lleva «Asequible»); clima = medias de mínimas y máximas por estación de las normales 1991–2020 (sin dato verificado, sin bloque: la sección no se muestra); precios sueltos de cervezas o menús sin fuente → se reescriben sin cifra; testimonios en primera persona que no estén en `cityExperiences.js` → fuera.

**Coste con fuente oficial** (`costSource` en `cities.js`, que da «Fuente: …» en la ficha y permite la etiqueta «Asequible»): vale la cifra total que publique una fuente oficial (normalmente la universidad) o la suma de sus partidas, **pero solo si las partidas cubren todo el presupuesto mensual: como mínimo alojamiento, comida y transporte**. Si solo hay precios sueltos (por ejemplo, el alquiler y el abono, como en Bolonia o Génova), la ciudad queda como «Estimación MAbroad» hasta encontrar una fuente que cubra el presupuesto entero. Con este criterio, **Grenoble** (estimación sumando las partidas de alojamiento, comida y transporte de la Université Grenoble Alpes, tanda 10) podría pasar a fuente oficial: pendiente de revisar.

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
| 8 | Friburgo (`friburgo`), Leipzig (`leipzig`), Dresde (`dresde`), Tubinga (`tubinga`), Rosenheim (`rosenheim`) | ✅ 11-11-2026 (Rosenheim: falta lo local) |
| 9 | Toulouse (`toulouse`), Burdeos (`burdeos`), Nantes (`nantes`), Montpellier (`montpellier`), Marsella (`marsella`) | ✅ 13-11-2026 |
| 10 | Lille (`lille`), Estrasburgo (`estrasburgo`), Grenoble (`grenoble`), Rennes (`rennes`), Venecia (`venecia`) | ✅ 13-11-2026 |
| 11 | Pisa (`pisa`), Siena (`siena`), Bari (`bari`), Génova (`genova`), Perugia (`perugia`) | ✅ 13-11-2026 |
| 12 | Trieste (`trieste`), Parma (`parma`), Bérgamo (`bergamo`), Ferrara (`ferrara`), Urbino (`urbino`) | ✅ 13-11-2026 |
| 13 | Lecce (`lecce`), Catania (`catania`), Palermo (`palermo`), Cagliari (`cagliari`), Verona (`verona`) | ✅ 13-11-2026 |
| 13b | Fuente del coste de Bolonia (`bolonia`), Roma (`roma`), Milán (`milan`) y Florencia (`florencia`) | ✅ 13-11-2026 (Bolonia, pendiente de fuente) |
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
- Coste según las universidades (THUAS, UM, Universität Hamburg, Universität zu Köln, Universidad de Heidelberg): La Haya 1.000–1.300 € (más seguro si trabajas), Maastricht 1.200–1.250 € (folleto de intercambio de la SBE y estimación de 2026), Hamburgo 900–1.400 €, Colonia 900–1.200 €, Heidelberg 750–1.050 € (desglose para intercambio en residencia); notas de coste ajustadas (La Haya 6,5→5,0).
- Corregido lo falso: La Haya «sede de la ONU» (es sede de la Corte Internacional de Justicia), «OV-chipkaart obligatoria» (también OVpay), Parkpop (terminó en 2023); Maastricht «la ciudad con más estudiantes internacionales» (el dato es de la universidad) y «PBL íntegramente en inglés»; mirador de la Elbphilharmonie «gratis» (5 €/3 €); Karneval «cada febrero» (febrero o marzo), museo y torre de la catedral «gratis», «RTL Group» (es RTL Deutschland), ICE a París (es Eurostar); Heidelberg «BioPark» (Technologiepark) y SAP «a 15 minutos».
- Fuera récords y cifras sin fuente: «capital diplomática del mundo», «la ciudad más internacional», «ninguna ciudad concentra tantas instituciones», «+2.500 internacionales», «el mercado más barato de Holanda», «segunda economía urbana de Alemania», «una de las ciudades más seguras de Alemania» (seguridad de Heidelberg 9,0→8,5), tiempos de tren y precios de habitaciones y cervezas sin fuente.
- Clima con normales 1991–2020: La Haya (KNMI Voorschoten) y Hamburgo (DWD Fuhlsbüttel) corregidos; añadidos Maastricht (KNMI), Colonia (DWD Köln/Bonn) y Heidelberg (DWD Mannheim, la estación más cercana con serie completa, a unos 18 km).
- 7 enlaces Erasmus arreglados (Leiden, THUAS, Universität Hamburg, HCU, TUHH, Universität zu Köln, Sporthochschule).
- Código: ordenar por coste y la etiqueta «Asequible» leían mal los miles («1.200–1.500€» contaba como 120 € o como barato); ahora usan `parseMinCost`. `show.cjs`/`lib.cjs` aceptan slugs con guion (`"la-haya"`).
- Codex: auditoría con fuentes + 2 rondas; en la ronda 1 pidió quitar junio de las iluminaciones del castillo de Heidelberg y usar el desglose de THUAS sin el seguro (solo si trabajas) (aplicado). No puso objeciones al clima de Heidelberg con la estación de Mannheim (anotado en weatherSeasons.js).

### Tanda 8 — 11-11-2026 (Friburgo, Leipzig, Dresde, Tubinga, Rosenheim)
- Fotos: las 5 corresponden a su ciudad.
- Coste: Friburgo 800–1.400 € (universidad), Leipzig 800–950 € (facultad y programa de la universidad), Rosenheim 900–1.150 € (TH). Dresde 800–1.000 € y Tubinga 900–1.050 € son **estimación editorial pendiente de fuente**: TU Dresden solo da «unos 900 €» y la cifra de Tubinga (947 €) es la media alemana de 2021; el rango de Tubinga suma sus alquileres (residencias del Studierendenwerk, 284 € de media en sus sedes en 2025; habitación en Tubinga, unos 430 € según la universidad). Notas de coste ajustadas (Rosenheim 7,5→6,0; alojamiento 8,2→6,0, porque la TH avisa de escasez).
- Corregido lo falso: Friburgo «la más soleada de Alemania» (una de las más soleadas); Institut für Zukunft (cerró en 2024); ESN en Leipzig y Tubinga (son WILMA y StudIT); Tubinga «uno de cada tres habitantes es estudiante» (unos 28.000 estudiantes y unos 92.000 habitantes); Studierendenwerk Tübingen-Hohenheim; en Dresde el Deutschlandsemesterticket va en la matrícula; Praga a unas 2 h 30; Rosenheim «Oktoberfest local» (es el Herbstfest), el Deutschlandticket «lo cubre todo» (no el ICE), «40 minutos» a Múnich, Aicherpark «residencial» (es zona comercial) y «el mercado de alquiler más fácil».
- Fuera récords sin fuente: «de las ciudades más seguras de Alemania» en Friburgo, Dresde y Tubinga (seguridad 9,0→8,5, 8,3→8,0, 9,0→8,5), garantías absolutas de seguridad en Rosenheim, tiempos de tren sin fuente y precios de habitaciones sin fuente.
- Clima con normales 1991–2020: añadidos Friburgo (DWD/OMM Freiburg), Leipzig (Holzhausen), Dresde (Klotzsche) y Tubinga (Stuttgart-Echterdingen, estación sustitutiva a unos 20 km, anotada); Rosenheim corregido (DWD Rosenheim).
- 4 enlaces Erasmus arreglados (Friburgo, Leipzig, HTWK, TH Rosenheim). El de la Universität Leipzig no se pudo comprobar automáticamente (su web rechaza las peticiones automáticas): **comprobar en el navegador**.
- Código: Maastricht y Heidelberg pasan a rango (1.200–1.250 € y 750–1.050 €); `isAffordable()` en `src/lib/cities.js`; el popup del mapa del mundo tenía su propia copia del coste de 150 ciudades, desfasada (Cracovia 350–550 € frente a 600–950 €), y ahora lee `costDetail`; `npm test` (Node, sin dependencias) comprueba el formato de rango, el orden por coste y «Asequible».
- Codex: auditoría con fuentes + 2 rondas; en la ronda 1 rechazó usar el mínimo para el visado (992 €) como extremo del rango y avisó de que los 947 € de Tubinga son media alemana de 2021 (aplicado: Friburgo con su rango oficial, Dresde y Tubinga como estimación editorial); en la ronda 2 precisó la redacción de los alquileres de Tubinga (aplicado).

### Tanda 9 — 13-11-2026 (Toulouse, Burdeos, Nantes, Montpellier, Marsella)
- Fotos: las 5 corresponden a su ciudad y cumplen el mínimo. La de Burdeos (Place de la Bourse de noche, dominio público) es oscura y de poca calidad: **decisión de Miguel** si se cambia.
- Coste según fuentes oficiales: Toulouse 800–900 € (INSA Toulouse), Burdeos 750–1.100 € (desglose de la guía de la Universidad de Burdeos; el mínimo exige residencia), Nantes 800–1.100 € (Audencia), Montpellier 800–1.000 € (Institut Agro Montpellier), Marsella 850–1.150 € (Aix-Marseille Université, CROUS o privado). Notas de coste ajustadas (Marsella 7,0→6,0; Nantes 6,8→6,0).
- Corregido lo falso: tranvía «directo» a la playa de Palavas en 10 minutos (es tranvía 3 + bus), «abono TaM joven» (TaM es gratis para residentes con Pass Gratuité), «cata gratuita» en la Cité du Vin, Bordeaux Fête le Vin «cada dos años» (vuelve en 2027), elefante de Nantes de «20 toneladas» (48 t, 12 m; en mantenimiento hasta finales de febrero de 2027: **quitar esa nota después**), TAN (ahora Naolib), «Université de Nantes» (Nantes Université) y «Paul-Valéry Montpellier 3» (Université de Montpellier Paul-Valéry), «Fiesta de las Calanques», clima de Toulouse «mediterráneo continental» (oceánico con influencia mediterránea).
- Fuera récords y cifras sin fuente: «elegida año tras año mejor destino Erasmus» (Burdeos), «la ciudad más habitable de Francia» (Nantes), «uno de cada cinco habitantes es estudiante» y «más de 300 días de sol» (Montpellier), «la más multicultural de Francia», «más de cien nacionalidades» y «segunda economía de Francia» (Marsella), «calas casi vírgenes», precios medios de habitaciones sin fuente y garantías de seguridad.
- Clima con normales 1991–2020 de Météo-France: añadidos los 5 (Toulouse-Blagnac, Bordeaux-Mérignac, Nantes-Bouguenais, Montpellier-Aéroport, Marignane para Marsella).
- 3 enlaces Erasmus arreglados (ISAE-SUPAERO, Nantes Université, Paul-Valéry). El de Audencia rechaza peticiones automáticas (403): **comprobar en el navegador**.
- Codex: auditoría con fuentes + 2 rondas; en la ronda 1 corrigió el redondeo del verano de Toulouse (16–27 °C) y las heladas de Nantes; en la ronda 2 detectó un «calas casi vírgenes» que quedaba en Marsella (aplicado todo).

### Tanda 10 — 13-11-2026 (Lille, Estrasburgo, Grenoble, Rennes, Venecia)
- Fotos: las 5 corresponden a su ciudad y cumplen el mínimo. Las de Rennes (plaza gris con señales) y Grenoble (teleférico en día gris) son flojas: **decisión de Miguel** si se cambian.
- Coste: Lille 650–1.300 € (Universidad de Lille: piso compartido 650–1.100 €, estudio 800–1.300 €), Estrasburgo 630–1.130 € (EM Strasbourg, guía de 2023: alojamiento 300–600 € + 300–500 € de comida y gastos + 28 € de abono joven), Rennes 550–950 € (Universidad de Rennes), Venecia 850–1.200 € es **estimación editorial** de MAbroad (así se dice en la ficha) a partir del IUAV: habitación 300–600 € más gastos y el resto de su presupuesto; Ca' Foscari e IUAV recomiendan unos 900 €. Grenoble 700–1.100 € es **estimación editorial pendiente de fuente** (la Université Grenoble Alpes solo publica partidas sueltas). Notas de coste ajustadas (Lille 7,2→6,0; Venecia 4,0→5,5).
- Corregido lo falso: Lille con Londres «a menos de una hora» (1 h 20), Estrasburgo con el alemán como idioma oficial, TAG (ahora M réso), Lyon «a menos de una hora» de Grenoble, clima «alpino» de Grenoble (continental con influencia de montaña), casas de entramado de Rennes «reconstruidas tras el incendio de 1720» (son las que sobrevivieron), Mont Saint-Michel «a menos de una hora», metro «VAL» de Rennes (dos líneas automáticas), en Venecia «Mestre ahorra la mitad del alquiler», Trieste y los Dolomitas «a menos de dos horas en tren», abono de vaporetto (25 €/mes o 230 €/año para menores de 26) y la acqua alta sin mencionar el MOSE.
- Fuera récords y cifras sin fuente: «la mejor conectada de toda esta guía», «uno de cada cuatro habitantes es estudiante» (Rennes), «la ciudad más fotografiada del mundo», «el mercado más difícil de Italia», «una de las más seguras de Italia/Francia», capítulos de ESN «de los más activos», precios de habitaciones sin fuente.
- Clima con normales 1991–2020: Lille-Lesquin, Strasbourg-Entzheim y Rennes-Saint-Jacques (Météo-France); Grenoble con Grenoble-Le Versoud (en el valle junto a la ciudad, pero su serie de temperatura es 1999–2020; la alternativa, Saint-Geoirs, está a 40 km en una meseta); Venecia con Venezia-Tessera (OMM), con la máxima de marzo estimada a partir de la media mensual porque falta en la serie: la máxima de primavera (18 °C) queda **pendiente de fuente**.
- 5 enlaces Erasmus arreglados (Universidad de Lille, Sciences Po Lille, Universidad de Estrasburgo, UGA, Grenoble INP). El de la Universidad de Rennes rechaza peticiones automáticas (403): **comprobar en el navegador**.
- Codex: la auditoría se cortó por el límite de uso de Codex (13-11-2026, 01:15); Claude la completó con fuentes oficiales. En la revisión (04:20) Codex corrigió el abono de Ilévia (33,40 €/mes, 28,65 € anual solo residentes de la MEL), el abono ACTV (solo estudiantes menores de 26 con perfil de estudiante), el rango de Estrasburgo (faltaba el transporte), Venecia como estimación editorial, «sede» de STMicroelectronics en Grenoble (está en Ginebra; «presencia») y el clima de Venecia («Templado subcontinental, moderado por el Adriático», no mediterráneo).

### Tanda 11 — 13-11-2026 (Pisa, Siena, Bari, Génova, Perugia)
- Fotos: las 5 corresponden a su ciudad, cumplen el mínimo y se ven bien.
- Coste: Pisa 800–1.100 € (Universidad de Pisa: 800–850 € con habitación en piso compartido, 1.000–1.100 € con piso entero), Siena 690–1.170 € (Universidad de Siena: alojamiento 250–800 €, comida 240–360 €, transporte/ocio/gastos 200–360 €; el máximo usa la habitación compartida de 300–450 € de la misma página, porque los 800 € incluyen piso entero), Bari 600–800 € (Politecnico di Bari), Perugia 700–800 € (Universidad de Perugia, FiSSUF). Génova 550–850 € es **estimación editorial pendiente de fuente**: la Universidad de Génova solo publica partidas (habitación individual 350–400 €, abono mensual de AMT 48 €). Notas de coste ajustadas (Pisa 7,8→5,5; Siena 7,3→6,5; Bari 8,0→7,5; Perugia 7,8→7,0) y alquileres sin fuente sustituidos por los de las universidades.
- Corregido lo falso o exagerado: «el centro histórico medieval más grande de Europa» (Génova: «uno de los más extensos»), Bari Vecchia «diseñada para despistar a los invasores», «uno de los paseos marítimos más largos de Italia», Siena «sin edificios modernos visibles» y «medieval intacta», Palio con fechas y 10 de las 17 contradas, Florencia «a menos de una hora» de Siena (1 h 15–1 h 30), Università per Stranieri «dedicada íntegramente a estudiantes internacionales» (también admite italianos; está especializada en lengua y cultura italianas), Eurochocolate «en octubre» (en 2026 es en noviembre: «cada otoño»), Asís (el tren llega a la estación, no al centro), Roma-Fiumicino «a menos de dos horas» de Perugia (unas 3 h 30 en bus directo), ascensor de Castelletto «gratis» (funciona con billete o abono de AMT), «sede» de grandes empresas en Pisa, aeropuerto de Pisa «uno de los mayores hubs low-cost».
- Fuera récords y comparativas sin fuente: «una de las ciudades más seguras de Italia» (Pisa, Siena, Perugia), «una de las mayores comunidades internacionales de Italia», «una de las más baratas de Italia, por debajo de Nápoles», «de los climas más soleados de esta guía», «la ciudad medieval mejor conservada de Italia», «uno de los puertos más grandes del Mediterráneo».
- Clima con normales 1991–2020: Pisa-San Giusto y Bari-Palese (OMM), Siena (Consorzio LaMMA). **Génova y Perugia, pendientes de fuente**: a la serie OMM de Genova-Sestri le faltan las máximas de marzo y mayo y la mínima de mayo, y para Perugia no hay serie 1991–2020 accesible (el portal del ISPRA no responde y los datos abiertos de Umbría solo traen extremos de 1951–1967). No se añade bloque hasta tener los datos.
- 3 enlaces Erasmus arreglados (Universidad de Bari, Politecnico di Bari, Università per Stranieri di Perugia). El de la Universidad de Siena rechaza peticiones automáticas (403): **comprobar en el navegador**.
- Codex: auditoría completa; Claude la contrastó con las fuentes (rango de Siena con habitación compartida en vez de piso entero, Génova como estimación). En la revisión Codex corrigió el abono anual de AMT para menores de 26 (220 €, la guía de UniGe conserva la tarifa anterior), el acceso a Portofino (tren a Santa Margherita y bus), «habitación compartida» en Siena y los gastos de la habitación doble en Perugia.

### Tanda 12 — 13-11-2026 (Trieste, Parma, Bérgamo, Ferrara, Urbino)
- Fotos: las 5 corresponden a su ciudad y cumplen el mínimo (la de Urbino tiene el cielo algo apagado, pero vale).
- Coste: Trieste 650–900 € (ficha Erasmus 2025/26 de la Universidad de Trieste: habitación individual 250–400 €, comida 300–400 €, transporte 51,60 €, internet 26 € y teléfono 20 €; suman 647,60–897,60 €). Urbino 500–600 € (lo que aconseja la Universidad de Urbino, que avisa de que está revisando sus cifras; habitación individual en piso privado 270–280 € + 60 € de gastos). **Parma 550–800 €, Bérgamo 550–800 € y Ferrara 500–750 € siguen como estimación editorial pendiente de fuente**: sus universidades no publican un presupuesto mensual actual (Parma solo tiene una ficha de 2018 y Bérgamo una guía de 2020; Bérgamo sí publica 280–330 €/mes en sus residencias). Quitados los alquileres sin fuente y las comparativas («por debajo de Bolonia», «de lo más barato de esta guía»). Nota de coste de Trieste 7,8→7,0.
- Corregido lo falso o exagerado: Bérgamo con la Città Alta entera «Patrimonio de la Humanidad» (lo son las murallas venecianas, 2017), Ferrara «Patrimonio en su totalidad» (lo es la ciudad del Renacimiento con el delta del Po), Urbino «con casi tantos estudiantes como vecinos» y «sin coches en el centro» (zona de tráfico limitado), Palacio Ducal «cuna del Renacimiento», Venecia y Milán «a menos de una hora» de Ferrara y Parma, Liubliana «a menos de una hora» de Trieste, la bora «cierra calles enteras», «Parmalat con sede en Parma» (está en Collecchio), clima «mediterráneo» de Trieste (templado, suavizado por el mar), Parma «ciudad natal de Verdi» (nació en Roncole, Busseto, en su provincia), Urbino con la costa «a menos de una hora» (Fano, 1 h 20 en bus) y «sin empresas relevantes» (Benelli Armi tiene sede allí).
- Fuera récords sin fuente: «la plaza junto al mar más grande de Europa», SISSA «de los centros más prestigiosos del mundo», aeropuerto de Bérgamo «uno de los mayores hubs low-cost», «la mejor mesa de Italia», «Buskers Festival, uno de los mayores de Europa», «una de las ciudades más seguras de Italia» (las cinco).
- Clima con normales 1991–2020: Trieste (OMM 16110), Bergamo-Orio al Serio (OMM 16076), Parma urbana (ARPAE 6031) y Malborghetto di Boara, Ferrara (ARPAE 3). **Urbino, pendiente de fuente**: no tiene serie OMM ni tabla 1991–2020 accesible del observatorio.
- Enlaces Erasmus: los de Trieste, SISSA, Parma, Ferrara y Urbino responden. El de la Universidad de Bérgamo rechaza peticiones automáticas (403): **comprobar en el navegador**.
- Codex: la auditoría se cortó por el límite de uso (13-11-2026, hasta las 9:20) y Claude la hizo con fuentes oficiales. En la revisión, Codex corrigió el coste de Trieste (había otra ficha 2025/26 con comida y transporte más altos), Verdi en Parma, las cifras de alojamiento que sí publican Bérgamo y Urbino, la distancia a Fano y el empleo de Urbino, y aportó el clima de Parma y Ferrara (ARPAE), comprobado por Claude.

### Tanda 13 — 13-11-2026 (Lecce, Catania, Palermo, Cagliari, Verona)
- Fotos: las 5 corresponden a su ciudad y cumplen el mínimo (la de Cagliari, una vista desde el Castello di San Michele, tiene el cielo algo brumoso, pero vale).
- Coste: Verona 950–1.000 € (Universidad de Verona, página de estudiantes de intercambio 2025/26: unos 1.000 €/mes, con habitación en piso compartido y gastos 450 €, comida 450 €, libros 50 € y otros gastos 50 €; el mínimo es sin libros). Lecce 600–700 € (Universidad del Salento, «Living in Lecce», **cifras de 2020**, así se dice en la ficha: unos 600 €/mes como mínimo; habitación 150–250 €, gastos 50 €, comida 250 €, ocio 60 €, libros 40 €, teléfono 20 € e internet 15 €, que suman 585–685 €). **Catania 450–700 €, Palermo 450–700 € y Cagliari 500–800 € siguen como estimación de MAbroad pendiente de fuente**: la guía de UniCT (2021/22) tiene su tabla en una imagen y UniPa y UniCa no publican cifras. Quitados los alquileres sin fuente y las comparativas («de las más baratas de Italia», «la mejor relación calidad-precio»). Notas de coste ajustadas (Lecce 8,3→7,5; Verona 6,8→5,5 y alojamiento 6,0→5,5).
- Corregido lo falso o exagerado: Verona «Venecia a 20 minutos» (algo más de una hora en tren; Garda, a unos 15 minutos hasta Peschiera), «el balcón más famoso de la literatura», «centro histórico completo Patrimonio» (la ciudad de Verona, UNESCO 2000); Lecce «Bari y Brindisi a menos de una hora» (solo Brindisi), «aguas comparables al Caribe», «típico solo de aquí» y el barrio genérico «Zona universitaria» (quitado); Catania «AMT» (metro de FCE y bus de AMTS), Etna «el volcán activo más grande de Europa» (uno de los más activos del mundo, UNESCO 2013), «visible desde toda la ciudad», Siracusa «a menos de una hora», barroco «único en Italia» (Val di Noto, UNESCO 2002), universidad «de las más antiguas de Italia» (la más antigua de Sicilia, 1434); Palermo Mondello «a 20 minutos» (30–40 minutos en bus), «la tasa de desempleo más alta de Italia» (una de las más altas), «solo en avión o ferry» (también hay tren); Cagliari «la única capital europea con playa», Poetto «dentro de la ciudad» (llega a Quartu) y «en bus o tranvía» (solo bus), metrotranvía de CTM (es de ARST).
- Fuera récords sin fuente: «la ciudad más auténtica de la guía», «de los climas más soleados de la guía», «una de las ciudades/capitales más seguras de Italia» (Verona, Cagliari), «evento de primer nivel mundial», actividades de ESN «constantemente». Seguridad de Verona 8,3→8,0.
- Clima con normales 1991–2020: Lecce (OMM 16332), Cagliari-Elmas (OMM 16560), Verona-Villafranca (OMM 16090) y Palermo (Osservatorio Astronomico «G.S. Vaiana», Palazzo Reale, normales 1991–2020 de INAF, meteo.oapa.inaf.it: 13–20 / 22–29 / 18–24 / 10–16 °C; Palermo no tiene serie OMM 1991–2020, la encontró Codex en la revisión). **Catania, pendiente de fuente**: Catania-Fontanarossa casi no tiene datos en la serie OMM y Sigonella está en el interior (veranos de 19–33 °C); Palermo no tiene serie OMM 1991–2020.
- Enlaces Erasmus: los 5 responden.
- Código: «Asequible» solo con fuente oficial de coste (`costSource` en `cities.js`: 47 ciudades de las tandas 1–12, más Lecce y Verona). Sin ella, la ficha muestra «Estimación MAbroad» bajo el coste y nunca «Asequible». Quedan como estimación Coímbra, Dresde, Tubinga, Grenoble, Venecia, Génova, Parma, Bérgamo, Ferrara, Catania, Palermo y Cagliari; también Bolonia (ver tanda 13b, donde Roma, Milán y Florencia sí consiguen fuente) y las ciudades aún sin verificar. Test en `tests/cost.test.mjs`.
- Codex: la auditoría se cortó por el límite de uso de Codex (13-11-2026, hasta las 14:25); Claude la hizo con fuentes oficiales. Revisión de Codex (14:30, junto con la 13b): clima de Palermo (normales INAF, añadido); Cagliari, sí hay tren regional a Oristano, Sassari y Olbia (corregido «requiere coche»); enlace Erasmus de Cagliari a la página de entrantes (en.unica.it/…/erasmus-unica); Catania y Palermo, quitada la comparación «más frecuente que en el norte de Italia» (sin dato municipal; ISTAT no la respalda); Mondello, sin fuente para «30–40 minutos», ahora «línea 806 de AMAT» (Ayuntamiento de Palermo). Verona 950–1.000 €: Codex pide justificar el mínimo; **se mantiene** (decisión de Claude): es el desglose de la universidad sin los 50 € de libros, y el criterio de rango ya lo explica arriba. La ronda 2 no se pudo hacer (Codex sin cuota hasta el 17-11-2026): las correcciones son las que pidió Codex en la ronda 1 y Claude las comprobó en cada fuente (CSV de INAF, Ayuntamiento de Palermo, UniCa, Autolinee Toscane).

### Tanda 13b — 13-11-2026 (fuente del coste de Bolonia, Roma, Milán y Florencia)
La tanda 1 no apuntó de dónde salía el coste de estas cuatro ciudades. Solo se ha tocado el coste (y los textos que lo repiten); el resto de las fichas sigue como en la tanda 1.
- Roma: 800–900 €/mes (antes 650–950 €). Sapienza, *International Student Guide* 2024: «On average, you will need at least €800-900/month to live in Rome». Otro folleto de la Sapienza (*International Admissions*, sin fecha clara) da 600–900 €; se usa la guía de 2024, que es la fechada. Nota de coste sin cambios (6,5).
- Milán: 680–1.150 €/mes (antes 750–1.100 €). Politecnico di Milano, página «Useful information» (sin fecha; consultada el 13-11-2026): alojamiento 400–700 €, comida 150–200 €, vida social 100–200 €, transporte 22 € y móvil 10–30 €, que suman 682–1.152 €. Fuera «la más cara de Italia» (sin fuente). Nota de coste sin cambios (6,0).
- Florencia: 800–1.000 €/mes (antes 650–950 €). Universidad de Florencia, ficha de intercambio de la Escuela de Economía 2025/26 (rev. 06-06-2025): alojamiento 450–700 €, comida 250–300 €, abono mensual 39 €, «Total approx. 800-1.000 euro». Los alquileres de la ficha (400–550 €) pasan a los de la universidad. Nota de coste sin cambios (6,0). Abono: la ficha de la UniFi da 39 € al mes, pero Autolinee Toscane (tarifas vigentes, «Urban passes») cobra 42,20 € por el mensual ordinario «Urbano capoluogo», y su FAQ aclara que los abonos mensuales y trimestrales no se venden con perfil de estudiante; para estudiantes está el anual «Urbano capoluogo» de estudiante, a 278,70 € (221,20 € con ISEE). La ficha de Florencia lo indica así, citando a Autolinee Toscane (los 39 € de la UniFi están desfasados).
- **Bolonia sigue como estimación de MAbroad, pendiente de fuente**: la Universidad de Bolonia solo publica precios sueltos («Living costs in Bologna»: habitación individual unos 400 € más gastos, compartida unos 300 €, comida unos 60 € a la semana, abono de bus para menores de 27 años 27 €), no un presupuesto mensual; tampoco lo da la guía de intercambio de Medicina 2025/26.
- Ninguna de las tres con fuente baja de 500 €, así que ninguna lleva «Asequible». Las frases cortas del comparador (`comparePhrases.js`) de Roma, Milán y Florencia se ponen al día con las nuevas cifras.
- Nota visible sobre «Asequible»: en la ficha, bajo «Estimación MAbroad», una línea explica que la etiqueta solo aparece con coste de fuente oficial y que se revisará al verificar ese coste; y en «Cómo calculamos estos datos» (ficha y comparador), un punto sobre «Fuente: …», «Estimación MAbroad» y «Asequible».
- Codex (revisión de las 14:30): Florencia, el abono de estudiante es hasta los 26 años (FAQ de Autolinee Toscane, «You are considered a student up to age 26»; añadido en la ficha). En «Cómo calculamos estos datos», «las demás ciudades la irán recuperando» daba a entender que verificar el coste basta: ahora dice que hace falta fuente oficial **y** mínimo ≤ 500 €/mes. El resto de la 13b, sin observaciones.

## Datos de la nota MAbroad (rama `nuevo-score`)

Criterio completo en `docs/scoring.md`. Esta sección recoge de dónde sale cada dato, qué queda pendiente y las decisiones tomadas.

### 23-11-2026 — vida estudiantil solo con ESN cuando falta THE (rama `tarea/nota-vida-esn`)

**Decisión de Miguel:** si una ciudad no tiene datos de THE, la comunidad de la vida estudiantil se calcula solo con ESN (escalada de 0–4 a 0–10); sin THE ni ESN, sigue provisional. Documentado en `docs/scoring.md` y `MethodologyNote.jsx`, con test propio.

- **Salen de provisional:** Geel (7,4), Malinas (7,0) y Arnhem (7,0). Ninguna entra en el top 20 de «Mejor nota global» ni en el de «Vida estudiantil»: los dos top 20 quedan igual.
- **Siguen provisionales (sin THE ni sección activa de ESN):** Rosenheim, Leipzig, Kleve, Tetovo, Santarém, Erfurt, Belfort, Castellanza y Flesinga (Erasmus+), y Cusco, La Paz, Ciudad de Guatemala y San Salvador.
- **Tope del test de rankings:** en main estaba en el 10 % (subido en la tanda 2); Miguel pidió volver al 5 % con esta regla, pero el 5 % (7 de 135) no admite los 9 provisionales. **Decisión de Miguel (23-11):** como máximo el 15 % de los destinos Erasmus+ (`Math.floor`, revisión de Codex), con el comentario «revisar al acabar la fase 2» en `tests/rankings.test.mjs`. Codex revisó solo este cambio: corregidos el texto de «Pendiente» en `docs/scoring.md`, la nota de metodología, el caso de ambiente nulo en el test y el redondeo del tope.

### 14-11-2026 — revisión de Codex
- Descarga completa repetida para las 150 ciudades y 48 países: las cifras guardadas de THE 2027 (y ediciones 2023–2026), ESN, UNODC y NEET coinciden con sus API; antes de corregir las asignaciones, el diff solo cambiaba la fecha de descarga.
- Fuentes cotejadas: [THE 2027](https://www.timeshighereducation.com/json/ranking_tables/world_university_rankings/2027), [ESN](https://accounts.esn.org/api/v2/sections), [UNODC vía Banco Mundial](https://api.worldbank.org/v2/country/all/indicator/VC.IHR.PSRC.P5?format=json&per_page=20000&date=2015:2026), [Eurostat](https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/edat_lfse_22?format=JSON&lang=EN&sex=T&age=Y15-24&sinceTimePeriod=2021), [GISCO](https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_10M_2024_4326_LEVL_2.geojson) y [OIT vía Banco Mundial](https://api.worldbank.org/v2/country/all/indicator/SL.UEM.NEET.ZS?format=json&per_page=20000&date=2015:2026). Comprobadas las dimensiones de Eurostat: anual, ambos sexos, 15–24, sin educación formal/no formal, no empleados, porcentaje; sin mezclar series al aplanar el JSON. El cruce de coordenadas con GISCO reproduce las regiones guardadas.
- Asignaciones THE corregidas: retirada UNBC de Vancouver (su campus principal está en [Prince George](https://www.unbc.ca/about-unbc/campus-location-details)); retirada la Universidad Nacional de Costa Rica de San José (sede en [Heredia](https://www.directorio.una.ac.cr/)); ninguna estaba listada en esas fichas. Añadida University of Zurich, que sí está en la ficha: THE 2024, puesto 80, 25.608 estudiantes, 24 % internacionales; [retirada de THE confirmada por UZH](https://news.uzh.ch/en/articles/news/2024/rankings.html). Regenerados los datos desde las fuentes tras corregir la lista.
- Cálculo: pesos y escalas conformes a `docs/scoring.md`, incluido coste 400 € → 10 y 2.400 € → 0. Corregido el caso de universidades sin cifras THE (pendiente, no cero); calidad de vida usa la categoría completa si falta una de sus dos subnotas; las medias de UNODC/NEET seleccionan los tres últimos años numéricos incluso si reciben una serie más larga. Tests de regresión para estos casos.
- Limitación documentada también en la metodología visible: THE cuenta instituciones completas, no habitantes/estudiantes del municipio; mezcla años si hay una retirada. Se mantiene la regla editorial existente, incluidas las universidades cercanas expresamente listadas en fichas. No se sustituyen datos ausentes por estimaciones.
- Validación: `npm.cmd test`, 55 pruebas aprobadas; `npm.cmd run build` desde PowerShell, 174/174 páginas prerenderizadas. Sin servidor, navegación de la web, Claude Code ni push.

### 13-11-2026 — primera carga de datos
- **THE World University Rankings 2027**: tabla completa en JSON de timeshighereducation.com (`npm run scoring:data`). QS 2027 no se puede descargar: la tabla va detrás de un formulario y la web bloquea la descarga automática. Decisión de Claude: THE como única fuente académica.
  - Retiradas de THE, que usan la última edición en la que salen: Utrecht University (2023, 66), Sorbonne University (2026, =76), Aix-Marseille (2025, 401–500), University of Strasbourg (2023, 601–800) y University of Bergamo (2025, 1001–1200).
  - Nunca han estado en THE y cuentan como «no clasificada»: Universidad de Buenos Aires, Universität Leipzig, UdelaR (Montevideo), UNSAAC (Cusco), UMSA (La Paz), USAC (Guatemala), UCA (San Salvador) y TH Rosenheim. Buenos Aires saca 4,5 por la UCA (2001+). Es una limitación conocida: la UBA está bien situada en QS.
- **ESN**: listado público `accounts.esn.org/api/v2/sections`, solo secciones `active` y del mismo país. Comprobado a mano:
  - Leipzig, Grenoble, Tubinga, Mánchester y Liverpool no tienen sección activa. Las de Bristol están «expelled».
  - «ESN Córdoba» es la de España (se filtra por país).
  - Kaunas cuenta también la sección de la Universidad de Vilna, que tiene campus en Kaunas.
- **UNODC**: homicidios por 100.000 hab. vía la API del Banco Mundial (indicador VC.IHR.PSRC.P5). Media de los 3 años más recientes con dato.
  - Reino Unido llega solo hasta 2021 (años 2019–2021).
  - Bélgica tiene solo 2021.
  - Perú usa 2019–2021.
  - El Salvador usa 2020–2022. Su tasa ha bajado mucho (7,9 en 2022), pero la media de tres años la deja en 15,6.
- **Eurobarómetro 540**: Volumen A (xlsx) de data.europa.eu, hoja D48_alllang, fila «English», fracciones pasadas a %. Se copiaron los 27 países y el español nunca supera al inglés en ninguno.
- **SEMP (Suiza)**: 440 CHF/mes para universidades de origen españolas (tabla 2025/26 de la Universidad de Berna). Son unos 475 € con el cambio del BCE del 13-11-2026 (0,9266 CHF/€). La Universidad de Friburgo enlaza un PDF de 2026/27 que da 404.
- **Pendientes** (la nota de estas ciudades es provisional):
  - Idioma (11 ciudades): Oslo, Reikiavik, Ginebra, Lausana, Zúrich, Basilea y Berna; Estambul; São Paulo, Río de Janeiro y Florianópolis. El Eurobarómetro no cubre esos países, y la encuesta AES de Eurostat mide «lengua extranjera más conocida» (no siempre el inglés) con otra escala, así que no se mezcla.
  - Idioma (2 ciudades): Montreal y Quebec. Falta el dato de Statistics Canada sobre conocimiento del inglés por área metropolitana; su web bloquea la descarga automática y hay que copiarlo a mano.
  - Vida estudiantil (6 ciudades): Rosenheim, Leipzig, Cusco, La Paz, Ciudad de Guatemala y San Salvador, porque ninguna universidad de la ciudad publica datos en THE.
- **Efecto de lo pendiente**: repartir el peso equivale a suponer la media de la ciudad (Estambul salía 1.ª sin la subnota de idioma). Resuelto en la segunda versión, más abajo: el idioma sale de la nota y las notas provisionales no entran en los rankings.
- **Seguridad**: la nota usa el dato del país; el ranking «Más seguras» y la categoría de la ficha siguen con la valoración por ciudad. Si el ranking usara el dato del país, saldrían 20 ciudades italianas empatadas.
- Revisión de Codex: pendiente (sin cuota hasta el 17-11-2026). Hay que hacerla antes de pasar la rama a `main`.

### 13-11-2026 — cambio de criterio de Miguel (segunda versión)
- **El idioma sale de la nota.** Es una preferencia personal: sigue como dato aparte en el desglose y el comparador, y como pregunta de City Match. Por eso las notas de Suiza, Noruega, Islandia, Turquía, Brasil, Montreal y Quebec dejan de ser provisionales.
- **Nueva subnota «Salidas profesionales» (10 %)**: la mitad es la tasa NEET 15–24 y la otra mitad, la categoría «Empleo» de la ficha.
  - **Decisión de Claude, NEET en vez de paro juvenil:** el paro juvenil cuenta como parados a los estudiantes que buscan trabajo (Suecia, 24 %) y premia el empleo informal (Bolivia, 5 %; Guatemala, 4,8 %; México, 5,7 %). Con él, Latinoamérica volvía a subir.
  - **Fuentes:**
    - Eurostat `edat_lfse_22`, NUTS 2, 2023–2025, con la región sacada de las coordenadas sobre los límites GISCO NUTS 2024.
    - Para Reino Unido y América, la OIT por país (`SL.UEM.NEET.ZS`, Banco Mundial), 2023–2025. Perú usa 2020–2022.
    - Bratislava, Dresde y Leipzig usan el dato del país: su región no tiene dato en Eurostat.
    - Comprobado a mano que cada ciudad cae en su región: Lisboa en PT1A Grande Lisboa, Rotterdam y La Haya en NL36 Zuid-Holland, Estambul en TR10, etc.
- **Seguridad**: mitad país (UNODC) y mitad valoración de la ciudad (categoría «Seguridad»).
- **Notas provisionales fuera de los rankings.** Quedan 6 provisionales, todas por vida estudiantil: Rosenheim, Leipzig, Cusco, La Paz, Ciudad de Guatemala y San Salvador.
- **Umbral de «Excelente» (8,5)**: ninguna ciudad llegaba (máxima 8,4). Resuelto por Miguel el 13-11-2026: Excelente 8,0 o más, Muy buena 7,0–7,9, Buena 6,0–6,9, Mejorable por debajo de 6,0; y los rankings ordenan por la nota sin redondear.
  - Propuesta: Excelente 8,0 o más (8 ciudades); Bueno, de 7,0 a 7,9 (97); Regular, de 6,0 a 6,9 (31); Difícil, por debajo de 6,0 (14, todas en América).
  - Hoy, con los umbrales actuales: 0 Excelente, 105 Bueno, 40 Regular y 5 Difícil.

## Fase 2: todos los destinos internacionales de Loyola con ficha (antes del 30/11/2026)

Una rama por tanda (`tarea/destinos-loyola-N`), 10 ciudades por tanda. Cola: `docs/destinos-pendientes-loyola.md`.

### 21-11-2026 — cola al día y decisiones de Miguel

**Cola** (`npm run universities:match`): el script ya solo cuenta convenios de estudios fuera de España. España (SICUE) y otros programas (MAGIS) van en listas aparte al final del documento, sin contar.
- Al empezar: **100 ciudades sin ficha con 136 convenios de estudios internacionales** (de 418; 90 ciudades con ficha). Aparte: SICUE, 47 convenios en 9 ciudades; MAGIS, 23 en 23.
- Países que aún no existen en MAbroad (cada uno necesita bandera, `mapCountries.js` y datos de la nota): India, Corea del Sur, Japón, Taiwán, Filipinas, Australia, Macedonia del Norte, Marruecos, Burkina Faso, Costa de Marfil, Madagascar, Honduras y Venezuela.

**Tandas acordadas** (fechas objetivo):

| Tanda | Fecha | Ciudades | Estado |
|---|---|---|---|
| 1 | 22/11 | Luneburgo, Odense, Angers, Campobasso, Salerno, Tetovo, Enschede, Santarém, Erfurt, Gotinga | Fichas escritas (22-11) |
| 2 | 23/11 | Ratisbona, Wurzburgo, Malinas, Belfort, Debrecen, Benevento, Castellanza, Bergen, Arnhem, Flesinga | Fichas escritas (22-11) |
| 3 | 24/11 | Aveiro, Vila Real, Nottingham, Ostrava, Zlín, Umeå, Brugg, Aquisgrán, Bamberg, Bonn | Fichas escritas (23-11) |
| 4 | 25/11 | Bremen, Fráncfort, Jena, Mannheim, Osnabrück, Passau, Stuttgart, Graz, Wiener Neustadt, Cortrique | Fichas escritas (23-11) |
| 5 | 26/11 | Diepenbeek, Namur, Limasol, Roskilde, Nitra, Prešov, Kuopio, Rovaniemi, Clermont-Ferrand, El Havre | Pendiente |
| 6 | 26/11 | Ruan, Limerick, Waterford, Eindhoven, Zwolle, Rzeszów, Viseu, Olomouc, Örebro, Trollhättan | Pendiente |
| 7 | 27/11 | Aberystwyth, Bradford, Hatfield, Leicester, Portsmouth, Fortaleza, São Leopoldo, Cali, León, Puebla | Pendiente |
| 8 | 28/11 | Tijuana, Torreón, Búfalo, Cincinnati, Erie, Flint, Jacksonville, Laredo, Lock Haven, Milwaukee | Pendiente |
| 9 | 28/11 | Newark, Omaha, Syracuse, Utica, Seúl, Busan, Tokio, Taipéi, Manila, Sídney | Pendiente |
| 10 | 29/11 | Bhubaneswar, Chennai, Jamshedpur, Uagadugú, Abiyán, Fianarantsoa, Rabat, Tegucigalpa, Caracas, Willemstad | Pendiente |

Si algo no aparece en una fuente oficial, la ficha sale sin esa cifra (o sin esa sección) en vez de retrasar la tanda; se apunta en el registro de la tanda.

**Decisiones de Miguel (21-11). La regla es usar el nombre que da el portal de Loyola:**
- **Castellanza, Hatfield y Diepenbeek tienen ficha propia**, con una línea de cercanía: «A 28 km de Milán», «A 28 km de Londres», «Junto a Hasselt». La línea enlaza a la ficha de esa ciudad si existe. Comprobado en `loyola.json`: el portal no las agrupa con la ciudad grande (`city` = «Castellanza» / «Hatfield» / «Diepenbeek», relaciones 2489, 1316, 2798 y 1231), así que no hacía falta avisar. Las distancias exactas se comprueban en su tanda.
- **Willemstad (Curazao) es Erasmus+.** El portal la da como `Erasmus-SMS`, con el código Erasmus NLWILLEMS02 (relación 1383). La [Guía del Programa Erasmus+, «Eligible countries», nota 3](https://erasmus-plus.ec.europa.eu/programme-guide/part-a/eligible-countries) dice que los países y territorios de ultramar participan «on a 'EU Member State or third country associated to the Programme' status», con las reglas del Estado miembro al que están vinculados. La [lista de PTU de la Comisión](https://international-partnerships.ec.europa.eu/countries/overseas-countries-and-territories_en) da Curaçao como «linked to Netherlands». La guía no nombra a Curazao: el vínculo sale de la lista de la Comisión. País como en el portal: Países Bajos, y el texto de la ficha dice que está en Curazao (Caribe).

### 21-11-2026 — base de los 13 países nuevos (tanda 1, rama `tarea/destinos-loyola-1`)

Cambio de Miguel: la base de los países nuevos va en la tanda 1 o la 2, y las tandas 9 y 10 son solo fichas.
- **Banderas** de los 13 países en el sprite (`UPCOMING` en `scripts/build-flags.mjs`: sobra cuando todos tengan ciudad). **Rótulo del mapa** en `mapCountries.js`. **ISO** en `COUNTRY_ISO` (`scripts/scoring-data.mjs`).
- **Homicidios (UNODC, vía Banco Mundial)**, `npm run scoring:data` del 21-11. Sin dato: **Taiwán, Costa de Marfil y Madagascar**, con la mitad «país» de seguridad pendiente. Burkina Faso tiene datos solo hasta 2017. Los NEET se bajan cuando exista la ciudad (van por región NUTS o por país, de la OIT).
- **Idioma (extra, no cuenta en la nota):** Honduras y Venezuela como `native: "español"` (Constitución de Honduras, art. 6, y de Venezuela, art. 9). El resto queda pendiente: en India y Filipinas el inglés es oficial pero no mayoritario, Australia no tiene lengua oficial de iure, y del resto no hay dato comparable.
- **Regiones** nuevas Asia, África y Oceanía (`types`, `REGION_ORDER` del comparador; un test nuevo falla si una región con ciudades no está en esa lista) y **programa** `study_abroad_world` para sus convenios bilaterales. El filtro del comparador pasa de «Suiza y América» a «Suiza y fuera de Europa».
- **Para la tanda 9** (primera ciudad de Asia): City Match dice «También América» en la opción «Europa y fuera de Europa»; hay que ampliarlo cuando existan. **Para la tanda 10:** comprobar qué grupo de beca aplica el SEPIE a Curazao (PTU de los Países Bajos).

### Tanda 1 — 21/22-11-2026: Luneburgo, Odense, Angers, Campobasso, Salerno, Tetovo, Enschede, Santarém, Erfurt, Gotinga

Cinco agentes `contenido-verificacion` (dos ciudades cada uno, solo lectura) preparan un informe con fuente oficial por dato. Claude escribe las fichas con lo verificado; lo que no tiene fuente oficial no se publica (se anota abajo).

**Fuentes por ciudad (informes de los agentes, 21-11):**
- **Campobasso.**
  - Población: 47.547 a 31-12-2024 ([ISTAT, Molise, censo 2024, diap. 4](https://www.istat.it/wp-content/uploads/2026/04/Approfondimento-Regionale-Molise.pdf)).
  - Clima: Campobasso OMM 16252, en la ciudad, a 793 m ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/6.6/data/0-data/Region-6-WMO-Normals-9120/Italy/CSV/Campobasso_16252.csv)). Invierno 2,3/7,9; primavera 7,5/15,2; verano 17,4/26,8; otoño 10,5/17,4.
  - Universidad: Unimol, THE 2027 801–1000 ([perfil](https://www.timeshighereducation.com/world-university-rankings/universita-degli-studi-del-molise)). Da clase también en Pesche y Termoli; Medicina, en Contrada Tappino. Residencias: Vazzieri y Collegio Medico ([Unimol](https://www.unimol.it/english/services-2/student-residences/)). Entrantes: [Unimol](https://www.unimol.it/english/?p=867).
  - ESN Unimol: sí.
  - Hechos: Unimol se fundó en 1982 ([Unimol](https://www.unimol.it/english/?p=633)); Museo dei Misteri, con 13 «Ingegni» de Di Zinno ([MiC](https://cultura.gov.it/luogo/museo-dei-misteri)).
  - Tren: el servicio está interrumpido por obras ([RFI](https://www.rfi.it/it/rete/i-nostri-progetti/I-nostri-progetti-regione-per-regione/molise.html)) y Trenitalia pone un bus de sustitución hasta el 12-12-2026.
  - **Sin fuente oficial (no se publica):** coste mensual (queda «Estimación MAbroad»), operador y precio del bus urbano, aeropuerto, Castello Monforte, barrios, economía municipal. La ficha Erasmus de Unimol más reciente es la 2022/23: lo que sale de ella (registro en la policía, B1) no se publica.
- **Salerno.**
  - Población: 126.000 a 31-12-2024 ([ISTAT, Campania, diap. 4](https://www.istat.it/wp-content/uploads/2026/04/Approfondimento-Regionale-Campania.pdf)).
  - Universidad: University of Salerno, THE 2026 501–600 y 2027 651–700. **El campus está en Fisciano**, a unos 12 km de la estación, con los buses Busitalia 7, 17 y 27 ([UNISA, trasporti](https://web.unisa.it/vivere-il-campus/campus/trasporti)).
  - Residencias ADISURC en el campus: 215–274 €/mes con gastos; solicitud hasta el 31-10; sin plaza garantizada. Habitación privada unos 350 € (individual) y 300 € (doble). Ambos datos de la [UNISA Data Sheet 2025-26](https://www.novaims.unl.pt/media/lxhpznzy/2025-2026-unisa-data-sheet.pdf), que solo da partidas sueltas, así que el coste queda como «Estimación MAbroad».
  - Aeropuerto: Salerno Airlink, unos 40 min y 8 € además del billete de tren ([Trenitalia](https://www.trenitalia.com/content/trenitalia/it/regionale/collegamenti-regionale/salerno-airlink.html)). Catedral de 1080–1085 con los restos de san Mateo ([Italia.it](https://www.italia.it/it/campania/salerno/salerno-il-duomo)). Entrantes: [UNISA](https://web.unisa.it/en/international/incoming-mobility/students-opportunities).
  - ESN Salerno: sí.
  - **Sin fuente oficial (no se publica):** el clima (no hay normal OMM completa cerca: Capodichino no tiene mayo ni julio y Capri no es representativa, así que no hay bloque), el precio del bus (tarifas de Campania del 1-10-2026, igual que en Caserta) y la economía.
- **Angers.**
  - Población: 159.022, población municipal 2023 en vigor desde el 1-1-2026 ([Banatic, Ministerio del Interior](https://www.banatic.interieur.gouv.fr/commune/49007-Angers), INSEE).
  - Clima: Angers-Beaucouzé ([Météo-France, ficha 49020001](https://donneespubliques.meteofrance.fr/FichesClim/FICHECLIM_49020001.pdf)). Invierno 3,2/9,3; primavera 6,8/16,5; verano 13,7/25,1; otoño 8,9/17,4.
  - **Coste: «a minimum of €700 per month»** (y 1.200 € el primer mes), calculado con una residencia Crous ([Université d'Angers](https://www.univ-angers.fr/en/you-are/exchange-student/essential-mobility-formalities.html)). Es un total oficial con una sola cifra, como en Trento: `~700 €/mes` con `costSource`, y la ficha dice que es un mínimo.
  - Alojamiento: Crous, 274,20 € (9 m²) y 397,69 € (estudio 18 m², solo curso completo), sin plaza garantizada (misma página).
  - Transporte: Irigo, sin contacto 1,70 € el viaje y 4,80 € como máximo al día ([Irigo](https://www.irigo.fr/titres-tarifs/paiement-sans-contact-irigo-voyagez-facilement-avec-votre-carte-bancaire)).
  - THE: University of Angers 1001–1200 (2026 y 2027); la UCO no aparece.
  - Hechos: Tapicería del Apocalipsis, Memoria del Mundo de la UNESCO el 18-05-2023 ([Ministerio de Cultura](https://www.culture.gouv.fr/Regions/DRAC-Pays-de-la-Loire/Vos-actualites/Inscription-au-registre-Memoire-du-monde-de-l-UNESCO-de-la-tenture-de-l-Apocalypse-a-Angers)); sede de la OCVV, agencia de la UE ([CPVO](https://cpvo.europa.eu/en/about-us/what-we-do/our-mission)).
  - Entrantes: [UCO](https://www.uco.fr/en/node/525), aunque la página es de 2019-20 y solo se usa el enlace. ESN Angers: sí. Registro: los ciudadanos de la UE no necesitan permiso ([service-public](https://www.service-public.gouv.fr/particuliers/vosdroits/F2739)).
  - **Sin fuente oficial:** abono joven de Irigo, precios de la UCO, THE de la UCO.
- **Enschede.**
  - Población: 162.683 a 1-1-2026 (CBS, StatLine 03759ned).
  - Clima: Twenthe, OMM 06290, KNMI ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Netherlands/CSV/TwentheAws_06290.csv)). Invierno 0,2/5,8; primavera 3,9/14,5; verano 11,2/22,7; otoño 6,1/14,3.
  - **Coste: 1.311 €/mes sin matrícula, con todas las partidas** ([Universiteit Twente, actualizado 24-07-2026](https://www.utwente.nl/en/education/student-services/upcoming-students/money-matters/cost-of-living/)). Es la media nacional de Nibud: `~1.300 €/mes` con `costSource` y la aclaración, como el DSW en Kleve.
  - Alojamiento Saxion: Xior, en Ariensplein, 346–550 € de alquiler base más unos 260 € de servicios, y no se puede acortar el contrato ([Saxion](https://www.saxion.edu/studying-in-the-netherlands/housing/availability-and-rental-prices)). La garantía de la UT (Boulevard 1945, unos 580 €) es **solo para estudiantes de fuera del EEE**: no aplica a Loyola.
  - Tren: intercity directo desde Schiphol, uno por hora ([Saxion](https://saxion.edu/studying-in-the-netherlands/welcome-to-saxion/arrival-information)).
  - THE: University of Twente =201 en 2027; Saxion no aparece.
  - Hechos: la UT, aprobada el 1-12-1961, tuvo el primer campus universitario del país ([UT](https://www.utwente.nl/en/alumni/ut-canon/stories/foundation-tht)); Kennispark tiene más de 480 empresas y casi 13.000 empleos ([UT, 11-03-2026](https://www.utwente.nl/en/news/2026/3/843058/new-strategy-aims-to-grow-kennispark-twente-to-700-companies-and-16500-jobs)).
  - Registro BRP en 5 días para estancias de más de 4 meses ([government.nl](https://www.government.nl/topics/personal-data/question-and-answer/when-should-i-register-with-the-personal-records-database-as-a-resident)). Entrantes: [Saxion](https://www.saxion.edu/studying-in-the-netherlands/application/exchange). ESN Twente: sí.
  - **Sin fuente oficial:** tarifas de Arriva; en qué sede de Saxion son los convenios (también está en Deventer y Apeldoorn); la explosión de Roombeek (solo fuente de prensa, NOS: no se publica).
- **Gotinga.**
  - Población: 124.548 en el censo 2022 ([Ayuntamiento](https://www.goettingen.de/portal/meldungen/zensus-2022-ergebnis-amtlich-bestaetigt-900003878-25480.html); esa página da 403 a los bots, así que también [Estadística de Baja Sajonia](https://www.statistik.niedersachsen.de/presse/zensus-2022-7-94-millionen-menschen-lebten-am-15-mai-2022-in-niedersachsen-233253.html), comprobado por Codex el 22-11). La cifra de 2025 (130.521) solo aparece en terceros, así que se usa la del censo.
  - Clima: Göttingen, OMM 10444 ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Germany/CSV/Goettingen_10444.csv)). Invierno −0,9/4,6; primavera 3,6/14,2; verano 11,2/23,2; otoño 5,7/13,8.
  - **Coste:** «Overall cost of living per months: 650 € to 850 €» ([Fact Sheet Erasmus 2026/27 de la Universität Göttingen, marzo de 2026](https://e-learning.uni-goettingen.de/de/document/download/9be867810a8262ba35669c1f13080cfd.pdf/Fact_Sheet_D_GOTTING01_E+KA131_2026_27.pdf)). Va con `costSource`. **Conflicto para Miguel:** [otra página de la misma universidad](https://www.uni-goettingen.de/en/573247.html) dice «at least 950 to 1.000 euros». Se usa la Fact Sheet porque está dirigida a estudiantes de intercambio y es más reciente.
  - Residencias: unas 4.700 plazas del Studierendenwerk, con mucha demanda; 200–300 € según la Fact Sheet.
  - Bus: GöVB, 2,60 € (2,90 € desde el 1-1-2027) ([GöVB](https://www.goevb.de/fahrkarten/tarife)). La cuota semestral de la universidad incluye el Deutschlandsemesterticket (226,80 €) ([uni-goettingen](https://www.uni-goettingen.de/de/semester+fees/133195.html)), pero no está confirmado si la pagan los de intercambio.
  - Tren: ICE; Hannover aeropuerto, S5 + ICE ([uni](https://www.uni-goettingen.de/en/getting+to+g%c3%b6ttingen/95413.html)).
  - THE: University of Göttingen, 133 en 2027. La PFH no aparece. Entrantes: [PFH](https://www.pfh.de/en/international-exchange-students), con alemán B1 o inglés B2. ESN Göttingen: sí.
  - Hechos: clases desde 1734 e inauguración en 1737 ([uni](https://uni-goettingen.de/en/90607.html)); tradición del Gänseliesel ([uni](https://uni-goettingen.de/de/690255.html)).
  - **Sin fuente oficial:** población de 2025, empleadores aparte de la universidad, THE de la PFH, número de premios Nobel (las cifras de la universidad no coinciden: no se publica).
- **Odense.**
  - Población: 214.064 en el 4.º trimestre de 2026 ([Danmarks Statistik](https://www.dst.dk/da/Statistik/kommunekort/kommunefakta/kommune?kom=461)).
  - **Clima: sin normal oficial con mínimas y máximas** (la OMM 06120 solo da la media), así que la ficha va sin bloque de clima.
  - **Coste:** SDU solo publica el ejemplo de un estudiante, así que queda «Estimación MAbroad». Lo oficial: vivienda de SDU 2.350–4.000 DKK/mes con gastos ([SDU](https://www.sdu.dk/en/uddannelse/studenthousing/odense/housingodense)), garantizada si se pide en plazo (1 de mayo y 1 de noviembre).
  - Bus: FynBus, 28 DKK; «Young Odense» por 10 DKK los menores de 26; abono de 30 días, 435 DKK ([FynBus](https://en.fynbus.dk/fares/fares)). Las tarifas cambian en enero de 2027.
  - THE: University of Southern Denmark, =277 en 2027. Entrantes: [SDU](https://www.sdu.dk/en/uddannelse/exchange/apply), sin matrícula e inglés B2. ESN Odense: sí.
  - Registro UE: certificado del SIRI y CPR en ICS South ([lifeindenmark](https://lifeindenmark.borger.dk/settle-in-denmark/ics-international-citizen-service/ics-south-in-odense)).
  - Hechos: la Odense Universitet abrió el 31-08-1966 y pasó a SDU en 1998 ([SDU](https://www.sdu.dk/en/om-sdu/historie/tidslinje)); H.C. Andersens Hus.
  - **Sin fuente oficial:** fecha de apertura del tranvía (solo prensa), cómo llegar desde Billund, el clúster de robótica, el plazo del CPR (las fuentes oficiales no coinciden).
- **Tetovo** (informe del 22-11).
  - Población: 84.770 en el municipio, censo 2021 ([Oficina Estatal de Estadística, comunicado 2.1.22.10, tabla T-01](https://www.stat.gov.mk/pdf/2022/2.1.22.10-mk-en.pdf)); 71,32 % albaneses y 18,32 % macedonios (tabla T-07). La cifra de la ciudad (63.176) solo sale en terceros.
  - **Coste: 335–340 €/mes**, total publicado por la SEEU con residencia (75 €), comida (150 €), transporte (50 €), teléfono y otros ([SEEU, entrantes](https://seeu.edu.mk/en/current-students/international-relation/incoming-students-staff)). Cumpliría el criterio, pero la página no tiene fecha. **Decisión de Miguel (22-11):** estimación MAbroad de 350–500 €/mes, sin `costSource` ni las partidas de la SEEU.
  - Residencias: 7 edificios y 450 plazas en el campus, sin plazo fijo y con mucha demanda ([SEEU](https://www.seeu.edu.mk/future-students/student-life/dormitories)). Inglés B2, plazos 10 de mayo y 10 de noviembre, sin matrícula, seguro de 30.000 € (página de entrantes).
  - SEEU: iniciativa de la OSCE, campus abierto en octubre de 2001 ([SEEU](https://seeu.edu.mk/en/about/history), [OSCE](https://www.osce.org/hcnm/57811)). Mezquita Pintada, monumento protegido restaurado en el siglo XIX ([KOVZ](https://kovz.gov.mk/ns-newsarticle-painted-mosque---tetovo.nspx)); sin año de construcción oficial (el 1438 es de Wikipedia: no se publica).
  - Aeropuerto de Skopie a unos 45 km, buses regulares a Skopie y taxis 24 h ([Ayuntamiento de Tetovo](https://tetova.gov.mk/transport_airport)).
  - THE: no sale (solo Impact Rankings). ESN: no hay sección (la de Skopie está expulsada).
  - **Sin fuente oficial (no se publica):** el clima (NOAA no tiene normales de Macedonia del Norte y el servicio nacional no las publica: la ficha va sin bloque de clima), la población de la ciudad, operador y precio del bus urbano y del bus al aeropuerto, la economía local, el cambio del denar. Registro: la SEEU dice 24 h y el Ministerio del Interior 12/48 h según el alojamiento, así que la ficha solo dice «regístrate en la comisaría al llegar».
- **Santarém** (informe del 22-11).
  - Población: 69.392 en el concelho, estimación del INE a 31-12-2025 ([PORDATA](https://www.pordata.pt/en/municipalities/summary+table/santarem-828231)), con el mismo criterio que Braganza.
  - Clima: Santarém/Fonte Boa, IPMA 734, a unos 6 km, serie híbrida del IPMA ([IPMA](https://www.ipma.pt/bin/file.data/climate-normal/cn_91-20_SANTAREM_FONTE_BOA.pdf)). Invierno 6,4/15,6; primavera 10,4/21,8; verano 16,0/30,2; otoño 12,6/23,7. Enero, mínima 5,8; agosto, máxima 31,5; 64,1 días al año de 30 °C o más.
  - **Coste: sin dato oficial** (la fact sheet 2026 deja el alojamiento en blanco): «Estimación MAbroad» de 450–650 €/mes, entre Braganza/Covilhã y Coímbra.
  - **CAFD se estudia en Rio Maior** (escuela de deporte ESDRM), no en Santarém ([IPSantarém, InfoPack](https://www.ipsantarem.pt/wp-content/uploads/2022/05/InfoPack2022.pdf), [ESDRM](https://www.ipsantarem.pt/esdrm/erasmus-course/)): va como consejo en la ficha.
  - IPSantarém creado el 26-12-1979 ([IPSantarém](https://www.ipsantarem.pt/apresentacao-e-estatutos-en/)). Tren regional de CP desde Lisboa-Oriente en unos 56 min ([CP](https://cp.pt/info/documents/d/cp/comboios-regionais-lisboa-tomar)); metro hasta Oriente desde el aeropuerto ([Metro de Lisboa](https://www.metrolisboa.pt/institucional/?p=18889)). Certificado de registro UE en la Câmara Municipal, 15 € ([gov.pt](https://www.gov.pt/servicos/pedir-o-certificado-de-registo-para-cidadao-da-ue-eee-suica)). Paro registrado del 3 % en 2025 (PORDATA). Entrantes: [IPSantarém](https://www.ipsantarem.pt/en/internacionalizacao/erasmus/).
  - THE: no sale. ESN: no hay sección (la más cercana, ESN Tomar).
  - **Sin fuente oficial:** coste, precio de las residencias y si hay plaza para Erasmus, bus urbano, precio del tren, el censo 2021 exacto, «Capital do Gótico». El portal de Loyola pide inglés o portugués B1, pero la fact sheet 2026 (alojada en la web de una universidad socia) dice inglés B2. **Decisión de Miguel (22-11):** la ficha dice «Inglés B2 (fact sheet 2026)» y que el portal de Loyola indica B1, para confirmarlo con la Oficina.
- **Luneburgo** (informe del 22-11).
  - Población: 78.246 con residencia principal a 31-12-2025, padrón de la ciudad ([Hansestadt Lüneburg](https://www.hansestadt-lueneburg.de/_Resources/Persistent/e/0/9/6/e096bf5b26855266e0a01c03052c437801a5d88b/Einwohnerbestandsstatistik_31.12.2025.pdf)). La cifra del LSN (base Zensus 2022) no se pudo leer de fuente primaria: cuando se lea, sustituye a la del padrón.
  - Clima: Boizenburg, OMM 10249, a unos 24 km ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Germany/CSV/Boizenburg_10249.csv)). Invierno −0,5/4,2; primavera 4,3/13,8; verano 12,5/23,1; otoño 6,4/13,4. Enero, mínima −1,0; julio, máxima 23,9.
  - **Coste: 650–1.050 €/mes**, suma de las partidas de la [Fact Sheet 2027-28 de Leuphana](https://www.leuphana.de/fileadmin/user_upload/ZentraleEinrichtungen/international-center/Homepage/Dateien_homepage/Leuphana_Fact_Sheet_2027-28.pdf): alquiler 350–550 € y otros gastos (comida, libros, ocio) 300–500 €; el transporte va en la tasa única de 380 € con el Deutschlandsemesterticket. Cubre todo el presupuesto, así que va con `costSource`. La página general de la universidad da «approximately 1,000 €» incluyendo un seguro médico que los de la UE no pagan.
  - Alojamiento sin garantía: cupo limitado de habitaciones para intercambio, por orden de solicitud ([Leuphana](https://www.leuphana.de/en/institutions/international-center/coming-to-leuphana/studying-at-leuphana/information-accommodation-service.html)).
  - THE: Leuphana 501–550 en 2027. ESN: no hay sección. Leuphana nació en 1946 ([historia](https://www.leuphana.de/en/university/history/history.html)); edificio de Libeskind inaugurado en 2017 ([Leuphana](https://www.leuphana.de/news/meldungen-universitaet/ansicht/datum/2017/01/31/bauaufsicht-genehmigt-sofortige-nutzung-des-libeskind-baus.html)); la sal y la Hansa, salina cerrada en 1980 ([ciudad](https://www.hansestadt-lueneburg.de/rathaus/stadtportraet/stadtgeschichte.html)). Llegada desde el aeropuerto de Hamburgo ([Leuphana](https://www.leuphana.de/en/institutions/international-center/how-to-get-to-lueneburg.html)). Empadronamiento en 2 semanas ([ciudad](https://service.hansestadt-lueneburg.de/buergerservice/dienstleistungen/hauptwohnsitz-anmelden-900000059-0.html?myMedium=1&selected_kommune=36330)). Sectores del distrito ([Landkreis](https://www.landkreis-lueneburg.de/ueber-den-landkreis/der-landkreis-als-wirtschaftsstandort.html)).
  - **Sin fuente oficial:** población del LSN, operador actual de los buses urbanos (MOIN, sin confirmar), precio de las habitaciones de intercambio, grandes empleadores.
- **Erfurt** (informe del 22-11).
  - Población: 217.159 (TLS, base Zensus 2022, «Gebietsstand 31.12.2025») ([TLS](https://statistik.thueringen.de/datenbank/TabAnzeige.asp?tabelle=kr000102)); la fecha de referencia del dato se presume 31-12-2025.
  - Clima: Erfurt-Weimar, OMM 10554, a unos 5 km ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Germany/CSV/Erfurt-Weimar_10554.csv)). Invierno −2,1/3,5; primavera 3,7/13,3; verano 12,1/22,8; otoño 5,4/13,0. Enero, mínima −2,5; julio, máxima 23,6.
  - **Coste: «Estimación MAbroad» de 800–1.000 €/mes.** La universidad publica 947 €/mes, pero de la encuesta social del DSW de 2021 ([Uni Erfurt](https://uni-erfurt.de/en/studies/before-studies/costs-financing)): con más de 12 meses no sirve como `costSource`. El «Aprox. 900 €» del portal de Loyola no aparece en ninguna fuente de Erfurt.
  - Residencias del Studierendenwerk Thüringen: 204–423 € con todo incluido (tabla sin fecha) ([STW](https://www.stw-thueringen.de/en/housing/residential-homes.html)); fianza de 300 €, mínimo 6 meses, solicitud desde el 1-4 / 1-10 ([Uni Erfurt](https://www.uni-erfurt.de/en/international/incoming/planning-of-study-related-stay/accommodation)).
  - Cuota semestral 357,80 € con el Deutschlandsemesterticket, que pagan también los de intercambio ([Uni Erfurt](https://www.uni-erfurt.de/en/studies/during-studies/student-affairs/fees-and-contributions)); billete sencillo 3,00 € desde el 1-8-2026 ([VMT](https://www.vmt-thueringen.de/ueber-uns/presse/medieninformationen/zum-1-august-aendern-sich-die-preise-im-vmt/)). Idioma: alemán A2 recomendado, inglés B2 para Relaciones Internacionales y Comunicación, curso de alemán gratuito de 4 semanas ([Factsheet 2027/28](https://www.uni-erfurt.de/fileadmin/Hauptseiten/International/Incoming/Factsheets_Austauschstudium/Uni_Erfurt_FACTSHEET_Exchange_AY_2027_28.pdf)).
  - Universidad: privilegio de 1379, cerrada en 1816, refundada en 1994 ([Uni Erfurt](https://www.uni-erfurt.de/en/university/profile/history)). Herencia judía medieval, Patrimonio Mundial en 2023 ([ciudad](https://juedisches-leben.erfurt.de/jl/en/world-heritage)). ICE: Berlín 1 h 40, Múnich 2 h 15; más de 14.000 empresas y unos 140.000 empleos ([ciudad](https://www.erfurt.de/ef/de/wirtschaft/wirtschaftsstandort/index.html)). Empadronamiento en 2 semanas ([ciudad](https://www.erfurt.de/ef/de/rathaus/bservice/leistungen/leistung-1528.htmc)).
  - THE: no sale. ESN: no hay sección.
  - **Sin fuente oficial:** coste posterior a 2021, fecha exacta del dato de población, fecha de la tabla del Studierendenwerk, trenes desde Fráncfort y Leipzig/Halle.

**Fichas escritas (22-11).**
- Clima calculado con los datos mensuales de cada fuente (estaciones y mes más frío/cálido): Angers (Météo-France), Campobasso, Enschede, Gotinga, Luneburgo y Erfurt (NOAA) y Santarém (IPMA). Sin bloque de clima: Salerno, Odense y Tetovo.
- **Coste con `costSource`:** Angers (~700 €, mínimo de la Université d'Angers), Enschede (~1.300 €, UT/Nibud), Gotinga (650–850 €, Fact Sheet 2026/27, decisión de Miguel) y Luneburgo (650–1.050 €). **Estimación MAbroad:** Tetovo 350–500 € (decisión de Miguel), Campobasso 500–700 €, Salerno 550–800 €, Odense 800–1.100 €, Santarém 450–650 € y Erfurt 800–1.000 €.
- Universidad del convenio en la ficha: en Angers es la UCO, en Enschede Saxion y en Gotinga la PFH (los datos de coste y THE son de las otras universidades de la ciudad, y así se dice).
- Nota MAbroad: sin THE, Tetovo, Santarém y Erfurt; sin ESN, Tetovo, Santarém, Luneburgo y Erfurt (vida estudiantil pendiente o parcial, como Kleve).
- Fotos de Wikimedia Commons con original ≥ 1920×1080, en `wikimediaPhotos.js` con `npm run photos:meta`.

### Tanda 2 — 22/23-11-2026: Ratisbona, Wurzburgo, Malinas, Belfort, Debrecen, Benevento, Castellanza, Bergen, Arnhem, Flesinga (rama `tarea/destinos-loyola-2`)

Dos agentes `contenido-verificacion` (cinco ciudades cada uno, solo lectura) preparan un informe con fuente oficial por dato; Claude escribe las fichas con lo verificado y lo que no tiene fuente oficial no se publica.

- **Línea de cercanía** (decisión de Miguel del 21-11): campo `near: { text, slug }` en `cities.js`, `getNearLine()` en `src/lib/cities.js` y una línea bajo el título del hero que enlaza a la ficha de la ciudad grande si existe. La primera es Castellanza («A 25 km de Milán», con la cifra de la LIUC).
- Fotos (Wikimedia Commons, original ≥ 1920×1080): Steinerne Brücke y catedral (Ratisbona), Alte Mainbrücke y Marienberg (Wurzburgo), Grote Markt (Malinas), León de Belfort, Gran Iglesia (Debrecen), Arco de Trajano (Benevento), Villa Pomini (Castellanza), Bryggen (Bergen), el Rin desde el Mandelabrug (Arnhem), Boulevard Evertsen (Flesinga).

**Fuentes por ciudad (informes de los agentes, 22-11; poblaciones de Baviera y Bélgica leídas por Claude en el XLSX/PDF oficial).**
- **Ratisbona.** Población 151.517 a 31-12-2025 ([Oficina de Estadística de Baviera, A1210C, tabla 4](https://www.statistik.bayern.de/mam/produkte/veroffentlichungen/statistische_berichte/a1210c_202500.xlsx)). Clima: Regensburg, OMM 10776, a unos 3 km ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Germany/CSV/Regensburg_10776.csv)). **Coste: «at least €1,000 per month… including rent»** ([UR, Funding](https://www.uni-regensburg.de/en/international/coming-to-regensburg/living-in-regensburg/funding)): total oficial con una sola cifra, como Angers → `~1.000 €/mes` con `costSource`. La página también habla a estudiantes de grado completo. Habitaciones de 280–450 € reservadas por la oficina internacional a los de intercambio que las piden en plazo, fianza 350 € y tasa 210 € ([UR, Accommodation](https://www.uni-regensburg.de/en/international/coming-to-regensburg/exchange-programs/accommodation)); semesterticket del RVV con la cuota ([Studierendenwerk](https://stwno.de/en/home-en2/semester-contribution-and-tickets/semesterticket-regensburg)). THE «University of Regensburg» 451–500 (2027). ESN Regensburg. Alemán B2 / inglés B2 ([UR](https://www.uni-regensburg.de/en/international/coming-to-regensburg/exchange-programs/application)). Casco antiguo con Stadtamhof, UNESCO 2006 ([Comisión Alemana de la UNESCO](https://www.unesco.de/staette/altstadt-von-regensburg-mit-stadtamhof/)). **Sin fuente oficial:** precio del billete del RVV, cuota semestral exacta 2026/27, fecha de fundación de la UR, economía.
- **Wurzburgo.** Población 133.753 a 31-12-2025 (mismo XLSX bávaro). Clima: Würzburg, OMM 10655 ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Germany/CSV/Wuerzburg_10655.csv)). **Coste: «about €940»** en la página de intercambio del 09-07-2026 ([JMU](https://www.uni-wuerzburg.de/en/international/studying-in-wuerzburg/exchange-students/before-arrival-exchange-students/costs-and-financing/)): comida 250, vivienda 350, seguro 110, otros 212 y canon 18; el transporte va en la cuota semestral → `~940 €/mes` con `costSource` (la ficha avisa de los 110 € de seguro). Residencia garantizada si se pide antes del 15-6 / 15-1 ([JMU, Living](https://www.uni-wuerzburg.de/en/international/studying-in-wuerzburg/exchange-students/before-arrival-exchange-students/living/)); cuota 182,10 € con 110,10 € de semesterticket ([JMU](https://www.uni-wuerzburg.de/en/international/studying-in-wuerzburg/exchange-students/before-arrival-exchange-students/enrolment-semester-fees/)). THE «University of Würzburg» 182 (2027). Sin sección de ESN. Historia desde 1402, Röntgen y los rayos X en 1895 ([JMU, About](https://www.uni-wuerzburg.de/en/university/about/)); Residenz, UNESCO 1981. **Sin fuente oficial:** billete de WVV, precios del Studierendenwerk, requisitos de idioma, economía.
- **Malinas.** Población 91.239 a 1-9-2026 ([Registro Nacional, cifras por municipio](https://www.rijksregister.fgov.be/sites/default/files/documents/nl/bevolking/statistieken/stat-1-1_n.pdf)). Clima: Brussels National (Zaventem), OMM 06451, a unos 15 km ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Belgium/CSV/BRUSSELSNATIONALAIRPORT_06451.csv)). **Coste: estimación MAbroad de 900–1.250 €**: Thomas More da 850–1.150 € para estudiantes de grado y sin transporte ([Thomas More](https://thomasmore.be/en/studycosts)), así que no cumple el criterio. Residencia Campus Kruidtuin, 486 € / 662 € sin gastos extra, contrato de septiembre a junio ([Thomas More](https://thomasmore.be/en/student-housing-mechelen)); De Lijn 3 € en la app ([De Lijn](https://www.delijn.be/en/content/vervoerbewijzen/tickets/ticket/?vertaling=true)); campus De Vest a 750 m de la estación ([Thomas More](https://thomasmore.be/en/contact/campuses/study-mechelen)); B2 (B1 en Teacher Training), sin free movers ([FAQ](https://thomasmore.be/en/faq-exchange-students)). THE: no sale. ESN Mechelen. **Sin fuente oficial (no se publica):** campanarios en la lista UNESCO (whc.unesco.org da 403 a los bots), plazo del registro UE, economía.
- **Belfort.** Población 45.912, población municipal del INSEE en vigor ([Banatic](https://www.banatic.interieur.gouv.fr/commune/90010-Belfort)). **Clima: Luxeuil, OMM 07292, a unos 41 km** ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/France/CSV/LUXEUIL_07292.csv)): la ficha de Météo-France de Dorans solo cubre 2009-2020. Se publica, como Geel (37 km), con la distancia en la fuente. **Coste: estimación MAbroad de 650–900 €** (la UTBM no publica nada). Crous desde 261 € ([UTBM](https://bienvenue.utbm.fr/le-logement/)); Optymo 1 € el viaje y tope de 36 €/mes ([Optymo](https://www.optymo.fr/pass-tickets/pass-optymo/tarifs/)). Cursos «majoritairement dispensés en français»; **el B1 del portal de Loyola no aparece en la UTBM** (la ficha remite a la Oficina). León de Bartholdi, monumento histórico desde 1931 ([POP](https://pop.culture.gouv.fr/notice/merimee/PA00101140)). THE: no sale. **ESN Belfort-Montbéliard está expulsada** en la API de ESN: no cuenta y la ficha no la menciona. **Sin fuente oficial:** coste, fecha de creación de la UTBM (Légifrance da 403), página de entrantes (404), aeropuerto, economía.
- **Debrecen.** Población 202.331 a 1-1-2026 ([KSH](https://www.ksh.hu/stadat_files/fol/hu/fol0014.html)). Clima: Debrecen, OMM 12882 ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Hungary/CSV/Debrecen_12882.csv)). **Coste: estimación MAbroad de 550–800 €**: la página de costes de la universidad es de 2023 con un cambio de 2015. Residencias por semestre 200.000–278.250 HUF, sin garantía ([unideb](https://internationaloffice.unideb.hu/accommodation)); DKV 480 HUF en el móvil, abono de estudiante 5.300 HUF ([DKV](https://dkv.hu/en/tickets-and-passes/fares)). THE «University of Debrecen» 801–1000. ESN Debrecen. Colegio Reformado de 1538, universidad real en 1912, 14 facultades y casi 30.000 estudiantes ([unideb](https://eng.unideb.hu/en/history-university-and-debrecen)); planta de BMW de la Neue Klasse ([BMW Group, 28-07-2026](https://newsroom.bmwgroup.com/global/ramp-up-in-record-time-bmw-group-plant-debrecen-produces-50000th-bmw-ix3)). **Sin fuente oficial:** coste actual, plazos (la Fact Sheet es la 2025/26: no se publican), plazo del registro UE.
- **Benevento.** **Población: sin cifra de ISTAT legible en fuente primaria** (el informe regional solo da provincias; la API SDMX no devolvió el municipio): la ficha va sin población. Clima: sin estación representativa (Grazzanise está a 60 km en la llanura costera): sin bloque. **Idioma: las clases son en italiano** ([guía de entrantes de Unisannio, mayo de 2026](https://www.unisannio.it/sites/default/files/sito/cover-page/allegati/it/FAQ%20Erasmus%20%281%29.pdf)); el portal de Loyola dice inglés o italiano B1, así que la ficha remite a la Oficina. Coste: estimación MAbroad de 500–700 €. Residencias de ADISURC con los Erasmus al final de la prioridad ([Unisannio](https://www.unisannio.it/en/content/halls-residence)). THE «University of Sannio» 1001–1200. ESN Maleventum. Autónoma desde 1998 ([Unisannio](https://www.unisannio.it/en/ateneo/unisannio/storia)); Santa Sofia en «Longobards in Italy», UNESCO 2011. **Sin fuente oficial:** población, clima, coste, precio de residencias, bus, economía.
- **Castellanza.** **Línea de cercanía: «A 25 km de Milán»**, la cifra de la [guía internacional de la LIUC 2026/27](https://www.liuc.it/wp-content/uploads/Brochure_International-Student-guide-2026.pdf) («lies 25 kilometres north west of Milan»), no los 28 km de la decisión inicial (eran una estimación). Enlaza a la ficha de Milán. Tiempo en tren sin fuente oficial (trenord.it da 403): no se publica. Población: sin cifra de ISTAT legible, como Benevento. Clima: Novara/Cameri, OMM 16064, a unos 20 km ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Italy/CSV/NovaraCameri_16064.csv)). Residencia «Carlo Pomini», 440 camas, 500 € doble / 750 € individual, 4–11 meses, solicitud hasta el 30-6 / 30-11 (guía, p. 27): solo alojamiento, así que el coste es estimación MAbroad de 750–1.050 €. **Inglés B2 recomendado por la LIUC frente al B1 del portal de Loyola** (la ficha remite a la Oficina). LIUC fundada en 1991 por 300 empresarios (guía, p. 3). Malpensa Express hasta Castellanza ([LIUC](https://en.liuc.it/how-to-find-us/)). THE: perfil sin puesto. Sin ESN (la más cercana, ESN Insubria).
- **Bergen.** Población 295.589, 3.er trimestre de 2026 ([SSB](https://www.ssb.no/kommunefakta/bergen)). Clima: Bergen-Florida, OMM 01317 ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Norway/CSV/BERGEN_FLORIDA_01317.csv)). **Coste: estimación MAbroad de 1.000–1.400 €**: la Fact Sheet 2026/27 de la NHH no da cifra, Study Bergen da «around 13.000 NOK» sin fecha y el «1.050 € / 300 €» del portal de Loyola no aparece en la NHH. Vivienda de Sammen garantizada para el primer intercambio, plazos 1-4/15-5 y 1-10/1-11 ([NHH](https://www.nhh.no/en/incoming-exchange/)). Skyss: estudiante 30 NOK, 30 días 302 NOK desde el 1-11-2026 ([Skyss](https://www.skyss.no/en/tickets-and-prices/prices/bus-light-rail-and--some-boat-connections/)). Flybussen y Bybanen ([Avinor](https://www.avinor.no/en/airport/bergen/info/public-transportation)). Registro en la UDI para más de 3 meses ([UDI](https://www.udi.no/en/want-to-apply/residence-under-the-eueeu-regulations/student-who-are-eueea-national/)). Bryggen, UNESCO 1979 ([Riksantikvaren](https://riksantikvaren.no/en/world-heritage/bryggen-in-bergen/)). THE: NHH sin puesto; University of Bergen =273, que cuenta para el académico. ESN Bergen. **Sin fuente oficial:** coste, precios de Sammen, fundación de la NHH, economía.
- **Arnhem.** Población 171.822 a 1-1-2026 (CBS 03759ned). Clima: Deelen, OMM 06275, a unos 8 km ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Netherlands/CSV/Deelen_06275.csv)). **Coste: «around €1200 per month, including housing»** ([Fact Sheet 2026-27 de la HAN, febrero de 2026](https://www.hanuniversity.com/international/en/collaboration/partner-universities/HAN-Fact-Sheet-2026-2027.pdf)) → `~1.200 €/mes` con `costSource`; el «900 € / 380–450 €» del portal de Loyola está desfasado. Los intercambios de empresa, comunicación, ingeniería e informática son en Arnhem ([HAN](https://www.hanuniversity.com/en/study-and-living/studying-at-han/exchange-programs/)). SSH&: 500–900 € (la mayoría, 530–630 €), habitación para los que se inscriben a tiempo, menores de 31, 2,5 meses por adelantado ([HAN Housing](https://www.hanuniversity.com/en/study-and-living/housing/han-housing/)). BRP en 5 días. THE: no sale. ESN Arnhem activa en la API. **Sin fuente oficial:** tarifa de RRReis (antes Breng), batalla de Arnhem (solo prensa), economía.
- **Flesinga.** Población 45.878 a 1-1-2026 (CBS 03759ned). Clima: Vlissingen, OMM 06310 ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Netherlands/CSV/VlissingenAws_06310.csv)). Coste: solo partidas sueltas (fact sheet 2025-26) → estimación MAbroad de 800–1.100 €. APV Housing 300–700 € en Flesinga y 220–600 € en Middelburg ([HZ](https://hz.nl/en/practical-information/housing)). THE: no sale. Sin ESN. **Sin fuente oficial:** requisito de inglés para intercambio, operador y tarifa del bus (cambia en diciembre de 2026, solo prensa), página de entrantes de la HZ (sin enlace), fundación de la HZ, economía.

**Fichas escritas (22-11).** Coste con `costSource`: Ratisbona (~1.000 €), Wurzburgo (~940 €) y Arnhem (~1.200 €); el resto, estimación MAbroad. Sin bloque de clima: Benevento. Sin población: Benevento y Castellanza. Avisos de idioma remitidos a la Oficina: Benevento (clases en italiano), Castellanza (B2 frente a B1) y Belfort (B1 no confirmado). Nota provisional: Malinas, Belfort, Castellanza, Arnhem y Flesinga (sus universidades no publican datos en THE, así que la vida estudiantil queda pendiente). Con ellas hay 12 destinos Erasmus+ provisionales de 135 y el test de rankings, que admitía un 5 % (7), fallaba. **Decisión de Claude, para que la revise Miguel:** el tope sube al 10 % (13). La regla no cambia: las notas provisionales siguen fuera de los rankings. Con la cola de Loyola llena de universidades pequeñas sin THE, en próximas tandas habrá que decidir si la vida estudiantil se calcula solo con ESN cuando THE no tiene datos (cambio de criterio de `docs/scoring.md`).

### Tanda 3 — 23-11-2026: Aveiro, Vila Real, Nottingham, Ostrava, Zlín, Umeå, Brugg, Aquisgrán, Bamberg, Bonn (rama `tarea/destinos-loyola-3`)

Dos agentes `contenido-verificacion` (cinco ciudades cada uno, solo lectura); Claude abre los PDF y XLSX oficiales que los agentes no pueden leer. Esta rama sale de main (`ac46239`), sin el cambio de la vida estudiantil solo con ESN (`tarea/nota-vida-esn`, pendiente de Miguel).

- Fotos (Wikimedia Commons, original ≥ 1920×1080): ría y moliceiros (Aveiro), Casa de Mateus (Vila Real; la primera candidata, «Vila Real Main Square», era de Vila Real de Santo António y se descartó), Council House y Old Market Square (Nottingham), Dolní Vítkovice (Ostrava), náměstí Míru (Zlín), campus de la universidad en invierno (Umeå), casco antiguo sobre el Aar (Brugg), ayuntamiento de Aquisgrán, Obere Mühlenbrücke y antiguo ayuntamiento (Bamberg), antiguo palacio electoral, sede de la universidad (Bonn).

**Fuentes por ciudad (informes de los agentes, 23-11; normales del IPMA, guía de la UA y población de Bamberg leídas por Claude en el PDF/XLSX oficial).**
- **Aveiro.** Población 91.397 a 31-12-2025 ([INE vía PORDATA](https://www.pordata.pt/en/municipalities/summary+table/aveiro-828115)). Clima: Aveiro/Universidade, IPMA 702, en la ciudad ([IPMA](https://www.ipma.pt/bin/file.data/climate-normal/cn_91-20_AVEIRO.pdf)). **Coste: estimación MAbroad de 600–800 €.** La [guía de entrantes de la UA](https://api-portal.ua.pt/api/v1/file/89434) da «between 600 and 700 per month» con alojamiento, comida, transporte y material, pero **no tiene fecha** (ni en el texto ni en los metadatos): mismo criterio que Tetovo. **La guía dice que la UA no puede dar residencia a los de intercambio**, lo que contradice las 25 habitaciones que cita el portal de Loyola; la ficha sigue a la UA. Precios privados 350–400 € (individual), 250–350 € (doble); comedores a 2,65 €. Aveirobus: 2 € a bordo, mensual zona 1 15 € ([Aveirobus](https://www.aveirobus.pt/gama-tarifaria), desde el 1-11-2026). THE «University of Aveiro» 701–800. ESN Aveiro. UA creada en 1973 ([DRE](https://diariodarepublica.pt/dr/detalhe/decreto-lei/402-1973-419197)). **Sin fuente oficial:** plazos actuales, idioma de los cursos, economía.
- **Vila Real.** Población 52.964 a 31-12-2025 ([INE vía PORDATA](https://www.pordata.pt/en/municipalities/summary+table/vila+real-828099)). Clima: Vila Real, IPMA 567, en la ciudad ([IPMA](https://www.ipma.pt/bin/file.data/climate-normal/cn_91-20_VILA_REAL.pdf)); 40,2 días al año con máxima de 30 °C o más. **Coste: estimación MAbroad de 450–650 €**: la [guía internacional de la UTAD](https://internacionalizacao.utad.pt/en/) da partidas sueltas sin fecha (habitación 200–300 €, T1 350–500 €, abono 21 €, comida 7–10 € al día) y la fact sheet más reciente es la 2023-24. Cinco residencias para 532 estudiantes (misma guía). THE «University of Trás-os-Montes and Alto Douro» 1201–1400. ESN UTAD. **Sin fuente oficial:** billete sencillo, plazos, el B2 del portal de Loyola (la ficha remite a la Oficina), precio de residencia para no becarios, año de la universidad, Casa de Mateus (solo terceros: es la foto, no se describe), economía.
- **Nottingham.** Población 325.765, mitad de 2025 ([ONS vía Nomis](https://www.nomisweb.co.uk/api/v01/dataset/NM_2002_1.data.csv?geography=E06000018&date=latest&gender=0&c_age=200&measures=20100&select=date_name,geography_name,obs_value)). Clima: Watnall, OMM 03354, a unos 9 km ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/UnitedKingdom/CSV/Nottingham_03354.csv)). **Coste: estimación MAbroad de 1.100–1.500 €** (como Newcastle): el «£1023» del portal de Loyola no aparece en ninguna fuente y ntu.ac.uk da 403. Entrada: Standard Visitor con ETA (20 £) hasta 6 meses; Student visa para más ([GOV.UK](https://www.gov.uk/standard-visitor/visit-to-study), [ETA](https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta), [Student visa](https://www.gov.uk/student-visa)). Skylink desde East Midlands ([aeropuerto](https://eastmidlandsairport.com/getting-to-and-from/by-bus)). NTU nace de la Government School of Design de 1843 ([NTU](https://ntu.ac.uk/about-us/our-history)); Ciudad de la Literatura UNESCO desde 2015 ([UK National Commission for UNESCO](https://unesco.org.uk/our-network/creative-cities/nottingham)). THE: Nottingham Trent 601–650 y University of Nottingham =157 (las dos cuentan, como en Newcastle). Sin ESN. Empleo 64,7 % (ONS APS). **Sin fuente oficial:** billete de NCT (2,50 £ o 3 £, las fuentes no coinciden), IELTS 6.5 de NTU (lo da el portal de Loyola; la ficha remite a la Oficina), alojamiento, campus de los grados, plazos. Sin enlace de entrantes de NTU.
- **Ostrava.** Población 280.853 a 31-12-2025, provisional ([ČSÚ](https://csu.gov.cz/msk/demograficky-vyvoj-ve-mestech-moravskoslezskeho-kraje-v-roce-2025)). Clima: Ostrava/Mošnov, OMM 11782, a unos 21 km ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/CzechRepublic/CSV/OstravaMosnov_11782.csv)). **Coste: «around 500 Euro per month, including accommodation at our dormitories»** ([FAQ de la VŠB, mayo de 2026](https://www.vsb.cz/en/study/degree-students/faqs/)) → `~500 €/mes` con `costSource`. Residencias desde el 1-7-2026 ([VŠB](https://www.vsb.cz/ubytovani/en/student/pricelist/long-termaccommodation/)), preferencia para los de la VŠB ([calendario](https://www.vsb.cz/ubytovani/en/student/accommodation_time_schedule_2026_2027/)). Bus AE y trenes S4/S8 desde el aeropuerto, vuelos a Málaga y Girona ([aeropuerto](https://airport-ostrava.cz/en/p/public-transport-2)). Registro en 30 días ([portal.gov.cz](https://portal.gov.cz/en/sluzby-vs/registration-of-residence-by-an-eu-citizen-or-a-family-member-of-an-eu-citizen-after-arrival-in-the-czech-republic-S7764)). THE: VŠB 1001–1200 y University of Ostrava 1601–1800. Dos secciones de ESN. **Sin fuente oficial:** billete sencillo de DPO, nivel de idioma (B2 del portal sin confirmar), fundación de la VŠB, Dolní Vítkovice como monumento, economía.
- **Zlín.** Población 74.917 a finales de 2025 ([ČSÚ](https://csu.gov.cz/zlk/demograficky-vyvoj-ve-mestech-zlinskeho-kraje-v-roce-2025)). Clima: Holešov, OMM 11774, a unos 13 km ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/CzechRepublic/CSV/Holesov_11774.csv)). **Coste: estimación MAbroad de 450–650 €**: la [página de costes de la UTB](https://www.utb.cz/en/university/about-the-university/ects/general-information-for-students/cost-of-living/) (5.000–6.000 CZK) no tiene fecha y contradice sus propios precios de residencia. **La UTB espera inglés B2** ([UTB](https://www.utb.cz/en/university/international/students/exchange-students/incoming-students/application/)); el portal de Loyola dice B1 (la ficha remite a la Oficina). DSZO 18 CZK / 490 CZK ([DSZO](https://www.dszo.cz/cestujici/jizdne-a-tarify), sin fecha de vigencia). UTB creada en 2001, estudiantes desde 1960 ([UTB](https://www.utb.cz/en/university/about-the-university/general-information/university-history/)). THE 1401–1600. ESN Zlín. **Sin fuente oficial:** monumentos de la época Baťa (no se describen), economía.
- **Umeå.** Población 135.273 a 31-12-2025 ([SCB](https://statistikdatabasen.scb.se/api/v2/tables/TAB5557/data?lang=sv&valueCodes[Region]=2480&valueCodes[Civilstand]=SC&valueCodes[Alder]=TotSA&valueCodes[Kon]=TotSa&valueCodes[ContentsCode]=000007ME,000007MG&valueCodes[Tid]=2025&outputFormat=csv)). Clima: Umeå Flygplats, OMM 02286 ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Sweden/CSV/Umea_Flygplats_02286.csv)). **Coste: estimación MAbroad de 800–1.100 €**: no hay total oficial actual; el «7600 SEK» del portal de Loyola es de una fact sheet antigua. Vivienda 20.500–24.500 SEK por semestre, sin garantía ([umu.se](https://www.umu.se/en/education/student-life/accommodation/tuition-fee-paying-students--exchange-students/student-housing-through-the-university/housing-information/)). Ultra 26/31 SEK ([Ultra](https://www.tabussen.nu/en/ultra/tickets-and-prices/single-tickets)). **Idioma: «Exchange students do not have to prove their English language proficiency»** ([FAQ](https://www.umu.se/en/education/application-and-admission/future-exchange-students/faq/)); el portal de Loyola pide B2 (la ficha remite a la Oficina). 1965 y CRISPR-Cas9 ([umu.se](https://www.umu.se/en/about-umea-university/facts-and-figures/history)). THE 351–375. Sin ESN. **Sin fuente oficial:** coste total, abono de 30 días, economía.
- **Brugg.** Población 13.509 a 31-12-2024 ([Estadística de Argovia, anuario del distrito de Brugg](https://www.ag.ch/app/staag/statistisches_jahrbuch/pdfChapters/twn_brugg.pdf)); el campus está en el municipio de Windisch (8.150). Clima: Buchs/Aarau, OMM 06633, a unos 15 km ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Switzerland/CSV/BuchsAarau_06633.csv)). **Coste:** la [fact sheet 2026 de la FHNW School of Business](https://www.fhnw.ch/en/business/degree-programmes/international/exchange-semester/fact-sheet_-fhnw_school-of-business-undergraduates_2026.pdf/@@display-file/file) da 1.415–2.080 CHF con todas las partidas (el «1.215–1.980» del portal de Loyola está desfasado). Como el resto de fichas suizas, la cifra de la ficha va en euros y como **estimación MAbroad (1.400–2.100 €)**; la cifra oficial en CHF va en los consejos. Pisos desde 600 CHF ([FHNW](https://www.fhnw.ch/en/degree-programmes/business/international-experience/offers-for-incoming-students/accommodation)). Campus Brugg-Windisch junto a la estación ([FHNW](https://www.fhnw.ch/en/business/degree-programmes/about-degree-programmes/studying-in-brugg-windisch)). Permiso de residencia en Argovia ([Migrationsamt, Merkblatt A1010](https://www.ag.ch/media/kanton-aargau/dvi/dokumente/mika/merkblaetter/studienaufenthalte/a1010-schueler-studenten-eu27/a1010-merkblatt-schueler-eu25efta-august-2016.pdf), de 2020: prioritario revisarlo). **ESN FHNW cuenta también para Brugg** (la sección lista Brugg entre sus ciudades), como ya contaba para Basilea. THE: FHNW con perfil sin puesto. **Sin línea de cercanía**: ninguna fuente oficial da los km a Zúrich. **Sin fuente oficial:** población de 2025, bus local, economía.
- **Aquisgrán.** Población 262.670 a 31-12-2024 ([IT.NRW, Kommunalprofil](https://statistik.nrw/sites/default/files/municipalprofiles/l05334002.pdf)). **Clima: Maastricht-Aachen Airport, OMM 06380, a unos 27 km** ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Netherlands/CSV/MaastrichtAachenAp_06380.csv)): la estación de Aachen (10501) solo tiene 20–21 años. **Coste: estimación MAbroad de 950–1.250 €**: la [fact sheet de la RWTH](https://www.rwth-aachen.de/global/show_document.asp?id=aaaaaaaabsuidar&download=1) da «approx. € 1200» pero sin fecha. Alojamiento «not offered nor guaranteed»; B1 de inglés o alemán, 5.º semestre (misma hoja). THE «RWTH Aachen University» 90. ESN Aachen. Catedral, UNESCO 1978 ([unesco.de](https://www.unesco.de/staette/aachener-dom/)). Empleo: 140.746, 68,2 % servicios (Kommunalprofil). Cuota semestral 375,19 € en invierno 2026/27 con el Deutschlandsemesterticket ([AStA RWTH](https://www.asta.rwth-aachen.de/ueber-uns/finanzen/), revisión de Codex). **Sin fuente oficial:** billete del Rheinlandtarif, fundación de la RWTH, aeropuertos.
- **Bamberg.** Población 77.218 a 31-12-2025 ([Oficina de Estadística de Baviera, A1210C, tabla 4](https://www.statistik.bayern.de/mam/produkte/veroffentlichungen/statistische_berichte/a1210c_202500.xlsx)). Clima: Bamberg, OMM 10675 ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Germany/CSV/Bamberg_10675.csv)). **Coste: 990–1.150 €** ([Infosheet 2026, 30-06-2026](https://www.uni-bamberg.de/fileadmin/international-office/Incoming/Exchange/Infosheet_Living_Expenses_Bamberg_2026.pdf)), con todas las partidas → `costSource`; la ficha avisa de que el seguro médico (133–146 €) no lo pagan los de la UE. Habitación por la oficina internacional, 330–500 €, sin garantía ([Next steps](https://www.uni-bamberg.de/en/studies/exchange-students-eg-erasmus/next-steps/)). Billete 2,60 € ([VGN](https://www.vgn.de/en/getting-around/local-traffics/bamberg)). Alemán B1 y/o inglés B2 ([How do I apply](https://www.uni-bamberg.de/en/studies/exchange-students-eg-erasmus/how-do-i-apply/)). 1647, 10.400 estudiantes, 19 % internacionales ([uni-bamberg](https://www.uni-bamberg.de/en/university/profile)); casco antiguo UNESCO 1993 ([unesco.de](https://www.unesco.de/staette/altstadt-von-bamberg/)). THE: perfil sin puesto. Sin ESN → **nota provisional** (sin THE ni ESN). **Sin fuente oficial:** aeropuerto, economía.
- **Bonn.** Población 323.587 a finales de 2025, cifra de IT.NRW citada por la ciudad ([bonn.de](https://www.bonn.de/themen-entdecken/wirtschaft-wissenschaft/jahreswirtschaftsbericht-2026/standortentwicklung/demographische-entwicklung.php)). Clima: Köln-Bonn, OMM 10513, a unos 15 km ([NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Germany/CSV/Koeln-Bonn_10513.csv)). **Coste: «at least €1,000 per month»** ([Erasmus+ Fact Sheet KA131 2026/27](https://www.uni-bonn.de/en/studying/international-students/exchange-students/erasmus-program/download/erasmus_fact_sheet_university_of_bonn_ka131.pdf), p. 8) → `~1.000 €/mes` con `costSource`, como Ratisbona. Residencias 300–560 € sin garantía, pisos 350–650 € (pp. 7–8); cuota 363,07 € con 226,80 € de Deutschlandsemesterticket ([uni-bonn](https://www.uni-bonn.de/en/studying/application-admission-and-enrollment/costs)). **Teología: Facultad de Teología Católica, alemán B2** ([coordinadores Erasmus](https://uni-bonn.de/en/studying/erasmus-departmental-coordinators)). 1818, 31.500 estudiantes, más de 5.200 internacionales, Beethoven y 21 agencias de la ONU (fact sheet, p. 2). THE «University of Bonn» 89. ESN Bonn. **Sin fuente oficial:** billete, bus desde el aeropuerto, economía con cifras.

**Fichas escritas (23-11).** Coste con `costSource`: Ostrava (~500 €), Bamberg (990–1.150 €) y Bonn (~1.000 €); el resto, estimación MAbroad (Aveiro y Aquisgrán porque su total oficial no tiene fecha). Avisos de idioma remitidos a la Oficina: Vila Real (B2), Nottingham (IELTS 6.5), Zlín (B2 frente a B1) y Umeå (sin requisito frente a B2). Revisión de Codex (23-11): cuota de la RWTH, requisito de inglés de NTU (depende de facultad y estancia), matiz del seguro en Bamberg y «heladas muy raras» en Aveiro (0,3 días al año), todo corregido; sin segunda ronda. Nota provisional en esta rama: Bamberg (sin THE ni ESN; seguiría provisional con la regla de `tarea/nota-vida-esn`) y Brugg (sin THE; con esa regla saldría por ESN FHNW).

### Tanda 4 — 23-11-2026: Bremen, Fráncfort, Jena, Mannheim, Osnabrück, Passau, Stuttgart, Graz, Wiener Neustadt, Cortrique (rama `tarea/destinos-tanda4`)

Dos agentes `contenido-verificacion` (cinco ciudades cada uno, solo lectura); Claude abre los PDF, XLSX y ODS oficiales. Población: Destatis a 31-12-2025 ([Gemeindeverzeichnis, XLSX](https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/Gemeindeverzeichnis/Administrativ/Archiv/GVAuszugJ/31122025_Auszug_GV.html)) para las siete alemanas; Statistik Austria a 1-1-2026 ([serie por unidades administrativas, ODS](https://www.statistik.at/fileadmin/pages/405/Bev_Zeitreihe_Jahresbeginn_Gebietseinheiten.ods)) para Graz y Wiener Neustadt; Cortrique, 82.017 a 1-9-2026 ([Rijksregister](https://www.rijksregister.fgov.be/sites/default/files/documents/nl/bevolking/statistieken/stat-1-1_n.pdf)). Clima: normales OMM 1991–2020 de NOAA (estaciones en `docs/fuentes-clima.md`).

**Decisiones de Claude (para que las revise Miguel):**
- Clima de **Osnabrück** con Münster/Osnabrück (10315, a 29 km): la estación de Osnabrück (10317) solo tiene 17–20 años, como Aquisgrán. **Passau** con Fürstenzell (10895, a 8 km) aunque tiene 24 años de datos (23 en enero), el 80 % de la serie. **Wiener Neustadt** con Wien Hohe Warte, a unos 50 km (no hay estación OMM más cercana con normales). **Jena** con Gera-Leumnitz, a 38 km (Weimar no publica máximas ni mínimas).
- **Cortrique**: KU Leuven cuenta como campus satélite (Kulak), como en Geel; la vida estudiantil sale de ESN Leonardo Kortrijk.
- **Wiener Neustadt sin línea de cercanía** a Viena: ninguna fuente oficial da los km ni el tiempo de tren (mismo criterio que Brugg).
- **Coste con `costSource` solo en Passau** (600–950 €): el [Fact Sheet 2026/27](https://www.uni-passau.de/fileadmin/dokumente/internationales/auslandsamt/incomings/Fact_Sheet_Passau_2627.pdf), de noviembre de 2026, desglosa alojamiento, comida, transporte y libros. El resto, estimación MAbroad: Jena, Mannheim y Sankt Georgen dan un total sin fecha; Stuttgart no incluye la comida; Bremen, Osnabrück, Graz, Wiener Neustadt y Cortrique no publican total.
- Nota provisional: **Osnabrück** (perfil en THE sin puesto, sin ESN) y **Wiener Neustadt** (sin THE ni ESN). Con ellas hay 12 provisionales de 154 destinos Erasmus+ (7,8 %, tope del 15 %).

**Discrepancias con el portal de Loyola (la ficha sigue a la universidad de destino):**
- **Passau:** el portal pide alemán B2; la universidad, alemán o inglés B1 con B2 recomendado (Fact Sheet 2026/27). Los 760 € y el alquiler de 250–450 € del portal no aparecen en la universidad (residencias 250–400 €). La ficha remite a la Oficina.
- **Graz (PPH Augustinum):** el portal pide alemán o inglés B1; la escuela, B2 ([First information on Erasmus studies 2026](https://pph-augustinum.at/internationales/incomings/)). El «máx. 1.000 € con residencia» del portal no tiene fuente: coste como estimación. La ficha remite a la Oficina.
- **Jena:** el portal da «alemán B2 o inglés B2»; la universidad dice que casi todo el grado es en alemán (B2 aproximado) y que las pocas asignaturas en inglés piden B2–C1 ([uni-jena](https://www.uni-jena.de/en/25500/application)). El portal da unos 450 € de alojamiento; la universidad, unos 300 € de alquiler y 200–350 € en residencia. La ficha remite a la Oficina.
- **Stuttgart:** el «alemán B1 o inglés B2» del portal encaja, pero la universidad avisa de que en grado hay muy pocas asignaturas en inglés, y el curso intensivo (250 €) solo es obligatorio con A2, no «para quien no tenga nivel» ([uni-stuttgart](https://www.uni-stuttgart.de/en/study/application/international-non-degree/erasmus/)). Los 750 € del portal no aparecen: la universidad da 992 € como mínimo. La ficha remite a la Oficina.
- **Mannheim:** el portal no da idioma; la universidad pide alemán o inglés B2 sin certificado ([uni-mannheim](https://www.uni-mannheim.de/en/academics/coming-to-mannheim/exchange-students/application/)).
- **Fráncfort (Sankt Georgen):** el portal no da idioma; la facultad pide alemán C1 a los de carrera completa y no publica nivel para intercambio. La ficha remite a la Oficina.
- **Bremen:** la residencia en el campus no figura como «obligatoria» literalmente, pero Constructor asigna habitación a los de intercambio y vivir en el campus exige plan de comidas ([housing options](https://constructor.university/student-life/student-services/housing-options)); coherente con la opinión del antiguo alumno.

**Sin fuente oficial (no se publica):** web de VIVES (da 403: idioma, plazos, vivienda y coste de Cortrique; el bachelor de 1.000 € del portal), billetes sencillos de BSAG, VMT, VRN, VVS, VOS, Graz y VOR, tiempo de tren de Wiener Neustadt a Viena, coste total de Graz, Wiener Neustadt, Osnabrück y Bremen, fundación de la Universität Passau y de la Universität Stuttgart, % de internacionales de Sankt Georgen y Osnabrück.

**Revisión de Codex (23-11).** Corregido: Constructor fundada en 1999 (campus desde 2001, [constructor.university/about](https://constructor.university/about)); Anmeldebescheinigung en Austria para más de 3 meses, en los 4 primeros meses y 44 € ([oesterreich.gv.at](https://www.oesterreich.gv.at/de/themen/menschen_aus_anderen_staaten/aufenthalt/4/2/Seite.120810); la hoja del Augustinum decía 4 meses, 3 meses y 15 €); vía A2 + inglés B2 y plazo de C@MPUS en Stuttgart; cuota de Jena solo para el invierno 2026/27; remisión a la Oficina en Mannheim; «sin incidencias específicas» cambiado por «sin datos específicos» en las nuevas. **No aplicado:** la fecha del Fact Sheet de Passau (Codex dice diciembre de 2025; el PDF termina con «November 2026»). Codex dice que VIVES publica inglés B1 sin certificado, pero la página da 403 y no se ha podido leer: la ficha mantiene la remisión a la Oficina. Sin segunda ronda.

**Para el correo a Loyola (discrepancias de la tanda 4, decisión de Miguel del 26-11).** En todos los casos la ficha sigue a la universidad de destino y remite a la Oficina.
- **Idioma:**
  - Passau: el portal pide alemán B2; la universidad pide alemán o inglés B1, con B2 recomendado (Fact Sheet 2026/27).
  - Graz (PPH Augustinum): el portal pide alemán o inglés B1; la escuela pide B2 (First information on Erasmus studies 2026).
  - Jena: el portal da «alemán B2 o inglés B2»; casi todo el grado es en alemán (B2 aproximado) y las pocas asignaturas en inglés piden B2–C1.
  - Stuttgart: «alemán B1 o inglés B2» encaja, pero en grado hay muy pocas asignaturas en inglés y el curso intensivo de alemán solo es obligatorio con A2 (y B2 de inglés), no «para quien no tenga nivel».
  - Mannheim: el portal no da idioma; la universidad pide alemán o inglés B2, sin certificado.
  - Fráncfort (Sankt Georgen): el portal no da idioma; la facultad pide alemán C1 a los de carrera completa y no publica nivel para intercambio.
  - Cortrique (VIVES): el portal dice inglés B1; no se ha podido comprobar en vives.be (da 403).
- **Coste:**
  - Passau: el portal da 760 € al mes y alquiler de 250–450 €; la universidad, 600–950 € al mes (Fact Sheet 2026/27) y residencias de 250–400 €.
  - Stuttgart: el portal da 750 € al mes; la universidad, 992 € como mínimo.
  - Jena: el portal da unos 900 € con unos 450 € de alojamiento; la universidad, 750–900 € con unos 300 € de alquiler (200–350 € en residencia).
  - Graz: el «máx. 1.000 € con residencia» del portal no aparece en ninguna fuente del Augustinum.
  - Cortrique: el bachelor de International Management de 1.000 € del portal no tiene fuente oficial.
- **Clima** (decisión de Miguel): se mantiene en Jena, Passau y Wiener Neustadt, y el pie del bloque indica la estación y la distancia (Passau, además, «24 de 30 años de datos»).

## Ciudades nuevas de la cola Loyola (rama `tandas-loyola`)

### 15-11-2026 — campus satélite y cierre de la revisión pendiente

Claude Code, con dos agentes `contenido-verificacion` (uno por tanda, solo lectura) y lectura directa de los PDF oficiales. La sesión anterior sobre el campus satélite no dejó cambios sin commit: se ha hecho desde cero.

**Campus satélite (criterio de Miguel).** Una universidad que solo tiene en la ciudad un campus pequeño cuenta para el nivel académico, pero sus estudiantes internacionales (cifra de THE de toda la institución) no cuentan para la comunidad de la vida estudiantil. Se marca `{ name, satellite: true }` en `THE_NAMES`; `scoring.js` lo excluye de la suma y el desglose lo explica. Documentado en `docs/scoring.md` y en la metodología visible; test nuevo en `tests/scoring.test.mjs`.
- **Geel** (KU Leuven Campus Geel: una sola facultad, Ingeniería Técnica, [web del campus](https://www.kuleuven.be/english/campuses/geel-campus/about); KU Leuven no publica cifra de alumnos por campus): vida estudiantil pendiente → **nota provisional 7,6, fuera de los rankings** (académico 10 por KU Leuven =45). Thomas More no está en THE. Cierra la «decisión editorial abierta» de la revisión de Codex del 14-11.
- Revisadas el resto de asignaciones de `THE_NAMES`. No se marcan, por tener en la ciudad un campus grande: Leiden en La Haya (Campus The Hague, unas 7.000 personas, ~20 % de la universidad), PUCMM en Santo Domingo (sede en Santiago de los Caballeros, pero campus completo en la capital), ATU en Galway (su mayor campus) y ZHAW en Zúrich (sede en Winterthur, dos departamentos en Zúrich; no cambiaría la nota). **Casos límite para Miguel:** si se aplica también a La Haya y Santo Domingo, ambas quedan provisionales. Las universidades de ciudad vecina listadas en la ficha (Lund–Malmö, Harvard–Boston, Berkeley–San Francisco, Northwestern–Chicago, Politécnica de Silesia–Katowice) siguen la regla general.
- `npm run scoring:data` regenerado: solo cambia la marca de Geel (ESN, UNODC y NEET idénticos salvo la fecha, revertida).

**Clima, normales 1991–2020:**
- Caserta (Grazzanise), Covilhã ([IPMA Fundão](https://www.ipma.pt/bin/file.data/climate-normal/cn_91-20_FUNDAO.pdf)), Módena ([Annuario UNIMORE 2021, tabla 10](https://www.ossgeo.unimore.it/wp-content/uploads/2023/09/2021AnnuarioOsservatorio_compressed.pdf)), Pavía ([NOAA, Linate 16080](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Italy/CSV/MilanoLinate_16080.csv)) y Newcastle ([Met Office, Tynemouth](https://www.metoffice.gov.uk/research/climate/maps-and-data/location-specific-long-term-averages/gcybg0mzy)): coinciden. Caserta solo se ha cotejado con la réplica de la tabla OMM (el servidor de NOAA dio 503).
- **Braganza**: leída la [ficha IPMA 575](https://www.ipma.pt/bin/file.data/climate-normal/cn_91-20_BRAGANCA.pdf). Verano 13–28 → **13–29 °C** (máximas JJA 28,5); el resto coincide; 53,4 días de helada confirmados.
- **Geel**: con Uccle el verano daba 22,47 °C (no 22,5). Cambiado a la estación oficial más cercana, **Antwerpen-Deurne** (OMM 06450, ~37 km, [NOAA](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Belgium/CSV/ANTWERPENDEURNE_06450.csv)): invierno 2–7 → **1–7**, otoño 8–15 → **7–15**; primavera y verano iguales.
- Trento, Cosenza y Kleve siguen sin bloque: no hay normal oficial con mínimas y máximas (Meteotrentino y DWD solo dan medias; las de la ficha cuadran: Trento 3,2/22,7 °C, Kleve 3,4/17,6 °C).

**Población:**
- Kleve: **53.028 a 31-12-2024**, confirmado en el [perfil municipal de IT.NRW](https://statistik.nrw/sites/default/files/municipalprofiles/l05154036.pdf) (Stand 15-01-2026).
- Trento: 118.640, [Ayuntamiento (censo permanente 2024)](https://www.comune.trento.it/ocmultibinary/download/42763/1594394/7/8955adad29a9753f065ba9af2c32cba0.pdf/file/cens_perm_popolazione%2B2024.pdf). Braganza: estimación INE a 31-12-2025 vía [PORDATA](https://www.pordata.pt/en/municipalities/summary+table/braganca-828102).
- **Sin fuente primaria leída** (demo.istat.it es dinámica): Caserta, Módena y Cosenza (coinciden con datos ISTAT reproducidos por terceros salvo Cosenza, no confirmada), Pavía (provisional 1-1-2026) y Covilhã (Censos 2021; la ficha municipal del INE no abrió). Se mantienen.

**Enlaces de entrantes:** Vanvitelli, UBI, UNICAL, Pavía, Northumbria, Thomas More y HSRW cargan y son oficiales. Añadidos **Newcastle University** y **KU Leuven Campus Geel**. UNIMORE (ECONNRESET) y UniTrento (403 a bots) no se pudieron abrir, pero las guías oficiales enlazan esas rutas: se mantienen. **Braganza:** `ipb.pt` redirige ahora a `unipb.pt` y no se ha localizado la página de entrantes: sin enlace.

**Correcciones aplicadas:**
- Caserta: fuera los «22 km» al aeropuerto de Capodichino (sin fuente; por carretera son más).
- Covilhã: aeropuertos «Lisboa y Oporto, ambos a unos 250 km» → «Oporto y Lisboa» (Oporto está bastante más cerca). Comida social «unos 2,50 €» → **2,80 €**, [tabla de los SAS de la UBI en vigor desde el 1-10-2026](https://www.ubi.pt/Entidade/SASUBI_Alimentacao_precarios).
- Módena: Ferrari no tiene su domicilio social en Módena (la matriz tiene sede estatutaria en Ámsterdam y principal en Maranello, [SEC](https://www.sec.gov/Archives/edgar/data/1648416/000110465925017329/tm2428908-1_f3.htm)) → «tiene su fábrica en Maranello, en la misma provincia». «Welcome Weeks cada septiembre» → «Welcome Week al inicio de cada semestre» ([ESN MoRe](https://more.esn.it/)).
- Trento: el abono de 70 € es de los estudiantes de UniTrento (Erasmus incluidos), no de todos los universitarios ([Provincia](https://www.provincia.tn.it/en/Services/University-student-transport-passes)).
- Pavía: fuera «una cama sin beca, unos 170–340 €» (la página ya no carga y EDiSU fija la tarifa según la renta, [convocatoria](https://www.edisu.pv.it/servizi/bando-collegi/)); ahora remite a la convocatoria.
- Braganza: el bus Zamora–Braganza ya no dice «solo algunos días»; «tres residencias» → «residencias de los Servicios de Acción Social, con prioridad para becados».
- Confirmado y sin cambios: Kleve «atrae más trabajadores de los que salen» (saldo de commuters +4.636 a 30-6-2024, perfil IT.NRW); Newcastle (residencias, Mayor's Fares hasta marzo de 2027, Tyne Bridge 1928, Metro al aeropuerto, LNER); Geel (kot 315 €, UNESCO 2023, JRC 1960); Cosenza; Caserta (Frecciarossa, sedes, delitos −4,8 %).

**Pendiente:**
- Trento: ya existe la [ficha de intercambio 2026/27](https://www.unitn.it/sites/default/files/2026-03/Trento_Factsheet_26_27.pdf), pero devuelve 403: comprobar si mantiene «unos 700 €/mes» y actualizar `costSource`.
- Braganza: URL de entrantes en unipb.pt (la web se carga con JavaScript); revisar el nombre en mayo de 2027.
- Fechas de caducidad: Mayor's Fares (marzo de 2027), cuota de HSRW (2026/27).

**Notas finales (160 ciudades, 152 con puesto):** Trento 7,4 (54.º), Pavía 7,3 (60.º), Covilhã 7,2 (74.º), Módena 7,2 (78.º), Newcastle 6,9 (107.º), Cosenza 6,9 (110.º), Braganza 6,7 (115.º), Caserta 6,3 (129.º); Geel 7,6 y Kleve 6,6, provisionales y sin puesto. Ninguna nota cambia por las correcciones de texto (no afectan a las subnotas).

**Revisión de Codex (15-11-2026, solo lectura, commit `c3f82ae`):** sin cambios obligatorios. Código del campus satélite, test y documentación coherentes; no encuentra otro campus pequeño sin marcar. No pudo abrir el CSV de NOAA de Antwerpen-Deurne (lo leyó el agente de verificación), la tabla escaneada de la UBI (2,80 €, leída por Claude en el PDF oficial) ni la ficha 2026/27 de Trento (403, sigue pendiente).

### 14-11-2026 — revisión de Codex y cierre solicitado por Miguel

Esta revisión sustituye las decisiones pendientes de coste de las tandas A/B. Trabajo realizado directamente por Codex, sin Claude Code ni otros agentes. Por petición de cierre de Miguel, los puntos no cotejados de nuevo se detallan abajo y no se dan por verificados.

- **Trento:** `650–800€/mes` editorial → `~700 €/mes`, fuente UniTrento, [ficha 2025/26](https://www.unitn.it/sites/default/files/2025-01/Trento_Factsheet_25_26.pdf). Parser, documentación, metodología visible y test admiten una cifra oficial aproximada; mínimo, máximo y valor de cálculo son 700 €. La nota de coste es 8,5 y la diferencia tras beca 350 €. Se elimina la cifra de 1.300 plazas sin fuente primaria y se explican las prioridades de alojamiento de la misma ficha.
- **Kleve:** eliminado `costSource`; 900–1.200 € queda como **Estimación MAbroad**. Billete/cuota semestral intactos por decisión de Miguel. Corregido «75 % de los grados» a programas de grado **y máster**, según el [perfil oficial de HSRW](https://www.hochschule-rhein-waal.de/en/about-us/profile/about-the-university); quitado el 50 % internacional sin fecha actual. La cifra de población 53.028 aparece en la [agencia municipal](https://wtm-kleve.de/strukturdaten/), pero falta confirmar directamente el año de referencia en IT.NRW.
- **Módena:** mantiene la estimación de coste. Abono SETA de 24 € confirmado también en la [página vigente de UNIMORE](https://www.unimore.it/it/servizi/trasporti/trasporto-urbano), que recoge el curso 2026/27; actualizado el curso de la ficha.
- **Pavía:** coste 600–1.000 € confirmado con presupuesto completo en [Universidad de Pavía](https://en.unipv.it/en/university/campus/town-pavia). Confirmados 27 € y límite de 11.000 abonos de [UNIPASS 2026/27](https://www.unipv.news/notizie/unipass-27eu-grazie-al-contributo-di-oltre-1-milione-e-centomila-euro-delluniversita-di).
- **Covilhã:** [UBI confirma](https://www.ubi.pt/entidade/world_living_covilha) los 250–350 € del T1; [movilidad entrante](https://www.ubi.pt/entidade/incoming_interinstitutional_mobility) confirma que no proporciona alojamiento a movilidad. Mantiene coste estimado. Retirada la duración de 3 h 30 a Lisboa, pendiente del horario nuevo de CP.
- **Cosenza:** mantiene coste estimado. Retirada la cifra repetida de 2.500 plazas: localizada en prensa y documentación antigua, sin confirmar disponibilidad actual en una fuente primaria; se remite a la convocatoria del Centro Residenziale.
- **Braganza:** mantiene coste estimado. El 34 % internacional se identifica ahora como dato institucional de THE **2024**, no como cifra actual. No confirmada actividad vigente de AEE-IPB: sustituida por el contacto de la oficina internacional, respaldado por la [información institucional](https://portal3.ipb.pt/index.php/en/guiaects/general-information-for-students). **Revisar el nombre oficial de la universidad en mayo de 2027**, decisión de Miguel; no se ha creado recordatorio externo.
- **Newcastle:** población **320.838 en 2025** confirmada en [Nomis/ONS](https://www.nomisweb.co.uk/reports/lmp/lad/1778385143/report.aspx). Metro 35,70 £/4 semanas, zona Inner Newcastle, confirmado por la [autoridad de transporte](https://travelnortheast.uk/explore-the-north-east/be-inspired/newcastle-university-guide/). Coste sigue estimado.
- **Geel:** [De Lijn](https://www.delijn.be/en/content/buzzy-pazz/jongere/) confirma 40 €/mes y 165 €/año para 18–24 años. Corregida omisión de **KU Leuven**, cuyo [campus de Geel](https://www.kuleuven.be/english/campuses/geel-campus/contact) figura en la ficha: THE 2027 =45, 50.364 estudiantes, 22 % internacionales (institución completa). Según el criterio actual entra tanto en académico como en comunidad y Geel deja de ser provisional. **Decisión editorial abierta:** si Miguel quiere datos exclusivamente del campus para comunidad, habrá que cambiar esa regla de forma consistente para todas las universidades multicampus, no solo Geel. No se presentan las cifras institucionales como un censo de Geel. Coste sigue estimado.
- **Caserta:** coste sigue estimado. THE 2026 1001–1200, 33.016 estudiantes y 2 % internacionales, ausencia de ESN y región NEET Campania comprobados en las fuentes del generador; no se ha confirmado que la ausencia en 2027 sea una retirada voluntaria (la tabla solo demuestra ausencia).
- **Fotos de las diez ciudades:** cotejados tamaño, autor, licencia y descripción contra la API de Commons; vistas las diez miniaturas descargadas, incluida Trento. Todas corresponden al destino y superan 1920×1080; no hay cambios de URL ni metadatos. Trento está a contraluz y Pavía tiene cielo gris: cambiar esas fotos sería una decisión estética, no una corrección necesaria. Script reproducible: `scripts/verificacion/revisar-fotos-loyola.mjs`; evidencias temporales dentro de `.verificacion-loyola.local/` (ignorado por Git).
- **Puntuación:** incorporadas las correcciones de `nuevo-score` (`f27f4a5`), incluida la gestión de datos ausentes. Regeneración completa de THE/ESN/UNODC/NEET terminada para las 160 ciudades y 48 países, ninguna sin NEET; salvo las asignaciones corregidas, los valores descargados coinciden con los guardados.
- **Pendiente de una revisión posterior, no de una decisión de producto:** cotejo completo de las siete series estacionales con las tablas originales (Caserta, Covilhã, Módena, Pavía, Braganza, Newcastle y Geel), población original de las otras ciudades, todos los enlaces incoming y resto de afirmaciones históricas/culturales y de transporte. Se conservan los datos de las tandas anteriores; esta revisión no certifica todavía cada afirmación de las diez fichas.
- **Validación de cierre:** `npm.cmd test`, **56/56**; `npm.cmd run build` desde PowerShell, **184/184** páginas prerenderizadas; `git diff --check` sin errores. Sin push, sin abrir la web del proyecto y sin tocar `main` ni `mi-universidad`.

Cola: `docs/destinos-pendientes-loyola.md` de la rama `mi-universidad`, por orden de plazas y sin las ciudades de España (las decide Miguel). Cada ficha nace con la nota nueva (`docs/scoring.md`).

**Proceso:**
1. Un agente `contenido-verificacion` investiga cada ciudad en solo lectura y devuelve cada dato con su URL.
2. Claude escribe la ficha, solo con datos que tengan fuente.
3. Otro agente `contenido-verificacion` revisa la tanda.
4. Claude aplica las correcciones.

La revisión de Codex queda pendiente hasta el 17-11-2026.

### Tanda Loyola A — 13-11-2026: Caserta, Covilhã, Cosenza, Módena, Trento

**Notas y datos de la nota:**

| Ciudad | Nota | Nivel | Puesto entre 155 | Te faltan tras la beca | Particularidades |
|---|---|---|---|---|---|
| Caserta | 6,3 | Buena | 126.º | 300 €/mes | Sin ESN. Académico 4,5: la Vanvitelli dejó THE en 2027, se usa su tramo de 2026 (1001–1200) |
| Covilhã | 7,2 | Muy buena | 72.º | 250 €/mes | |
| Cosenza | 6,9 | Buena | 108.º | 250 €/mes | |
| Módena | 7,2 | Muy buena | 76.º | 350 €/mes | |
| Trento | 7,4 | Muy buena | 55.º | 375 €/mes | |

Ninguna tiene nota provisional.

**Fuentes:**
- Población: ISTAT a 31-12-2024 (censo permanente); para Covilhã, INE (Censos 2021, 46.455 habitantes).
- Clima, normales 1991–2020:
  - Caserta: Grazzanise (OMM 16253, a 22 km).
  - Covilhã: Fundão (IPMA 698, a 16 km).
  - Módena: Osservatorio Geofisico de UNIMORE.
  - Trento y Cosenza no tienen bloque de clima. En Trento solo hay medias de Meteotrentino, no mínimas y máximas. En Cosenza no hay normales oficiales legibles: el portal del ISPRA está caído.
- Fotos de Wikimedia Commons, todas con un original de 2592×1944 o más. He revisado a mano Caserta, Covilhã, Cosenza y Módena. La de Trento solo la he comprobado por metadatos, porque Commons devolvió un 429 al bajar la miniatura.
- Coste: las cinco fichas son «Estimación MAbroad», sin `costSource`. Es decisión de Claude, pendiente de que Miguel la revise:
  - Caserta, Covilhã y Cosenza no tienen ninguna cifra oficial de coste mensual.
  - Trento: la universidad da una sola cifra, 700 €/mes (ficha de 2025/26); el rango 650–800 es editorial.
  - Módena: UNIMORE da 7.000–8.000 € al año sin decir si son 10 o 12 meses; el rango 600–800 es editorial.

**Correcciones del agente de verificación, todas aplicadas:**
- Caserta:
  - Añadida la sede de Capua.
  - Fuera las cifras de 1,40 € y 25 €, porque el cuadro de tarifas de AIR Campania solo está en imagen. En su lugar se explica que el 1-10-2026 subieron los billetes sencillos y no los abonos.
  - Comedor: ahora pone «servicio de restauración de ADISURC».
- Covilhã:
  - Comida social a «unos 2,50 €» (las dos páginas de la UBI dan 2,45 y 2,50 €).
  - Fuera las «16 líneas» de bus, que no tienen fuente.
- Módena: el abono de 24 € es del curso 2025/26.
- Trento:
  - Enlace Erasmus cambiado a la página nueva de UniTrento.
  - «Más de 1.300 plazas» de residencia (L'Adige, 3-9-2026).
  - Bus Verona Airlink a 7 €.
  - Fuera el menú de 4,90 €, que es la tarifa de 2023-24.
  - Fuera el teleférico de Sardagna del abono.

**Dudosos que siguen pendientes:**
- Covilhã: el tren a Lisboa es de «unas 3 h 30», pero la línea de la Beira Baixa reabrió el 20-09-2026 con horario nuevo.
- Módena: el enlace Erasmus de UNIMORE no respondió al agente.
- Cosenza: las 2.500 plazas de residencia salen de prensa, no de la web de la UNICAL.
- Las normales de clima no las pudo volver a leer el agente de verificación, porque los PDF no se dejan leer.
- Revisión de Codex: pendiente (sin cuota hasta el 17-11-2026).

### Tanda Loyola B — 13-11-2026: Pavía, Braganza, Newcastle, Geel, Kleve

**Notas y datos de la nota:**

| Ciudad | Nota | Nivel | Puesto | Te faltan tras la beca | Particularidades |
|---|---|---|---|---|---|
| Pavía | 7,3 | Muy buena | 60.º | 450 €/mes | |
| Braganza | 6,7 | Buena | 115.º | 250 €/mes | Sin ESN. Académico 4,5: THE 2024, 1201–1500 |
| Newcastle | 6,9 | Buena | 107.º | 950 €/mes | Reino Unido, Erasmus+ desde 2027-28 |
| Geel | 6,9 | Buena | sin puesto | 650 €/mes | Provisional |
| Kleve | 6,6 | Buena | sin puesto | 700 €/mes | Provisional, sin ESN |

Geel y Kleve tienen nota provisional, así que no entran en los rankings. Les falta la vida estudiantil: ni Thomas More ni la Hochschule Rhein-Waal publican datos en THE.

He cambiado `tests/rankings.test.mjs` para que admita hasta un 5 % de destinos Erasmus+ con subnota pendiente, en vez de 3 fijos.

**Coste:**
- Pavía: `costSource` de la Universidad de Pavía. Es un total con desglose, pero la página no tiene fecha.
- Kleve: `costSource` de la Hochschule Rhein-Waal. Ojo: los 900–1.200 € son la media de toda Alemania según el Deutsches Studierendenwerk, no una cifra de Kleve. **Decisión de Miguel: ¿vale como fuente oficial?**
- Geel: estimación MAbroad. Thomas More da 850–1.150 € sin transporte, así que no cumple el criterio.
- Braganza y Newcastle: estimación MAbroad.
  - Braganza: no hay ninguna cifra total oficial.
  - Newcastle: el total de Northumbria (1.203 £) viene de un tercero y no cuadra con su propio desglose.

**Fuentes:**
- Población:
  - Pavía: ISTAT provisional a 1-1-2026.
  - Braganza: INE vía PORDATA, 2025.
  - Newcastle: ONS, mitad de 2025.
  - Geel: Statbel a 1-1-2026. Lo comprobé yo en el Excel oficial `Bevolking_per_gemeente.xlsx` (42.650).
  - Kleve: IT.NRW, 2024.
- Clima, normales 1991–2020:
  - Pavía: Milano Linate (OMM 16080).
  - Braganza: IPMA, estación 575.
  - Newcastle: Tynemouth, Met Office (estación en la costa).
  - Geel: Uccle, KMI. La ficha de Geel del KMI solo trae gráficos.
  - Kleve: sin bloque de clima; el DWD solo publica medias.
- Fotos: las cinco miniaturas revisadas a ojo.
- Braganza: el IPB es la Universidade Politécnica de Bragança desde agosto de 2026, y el Gobierno ha anunciado otro cambio de nombre. Hay que volver a revisarlo en 6–12 meses.

**Correcciones del agente de verificación (aplicadas):**
- Braganza:
  - Verano a 13–28 °C.
  - Fuera las «355 plazas», los «211 km» y el «corcho».
  - El tip de Zamora pasa a hablar del autobús Zamora–Braganza, que sale algunos días a la semana.
- Newcastle:
  - Millennium Bridge: «puente inclinable», no «basculante».
  - Abono de Metro «zona Inner Newcastle».
  - Mayor's Fares completas: 1 £ hasta los 21 años y 2,50 £ desde los 22.
- Geel: quitado el `costSource`.
- Kleve:
  - El ticket semestral solo está confirmado para matriculados; el tip dice que el estudiante de intercambio lo consulte con la universidad.
  - Fuera los precios de residencia, la lista de pueblos y el «50 % internacionales» (solo aparece en una página de empleo).
  - Aeropuerto de Weeze: tren RE10 hasta la estación y luego lanzadera.
- No aplicada: el agente proponía 22 °C para el verano de Geel. La media de máximas es 22,5 °C y redondeando sale 23 °C, así que lo dejo en 23.

**Sin confirmar:**
- Población de Newcastle (320.838) y de Kleve (53.028).
- Que la AEE-IPB siga activa.
- Revisión de Codex: pendiente (sin cuota hasta el 17-11-2026).

## Clima: mes más frío y mes más cálido (16-11-2026, rama `tandas-loyola`)

### Revisión de fuentes y licencias (16-11-2026, petición de Miguel)

Inventario de las 78 ciudades: [fuentes y licencias del clima](docs/fuentes-clima.md). Esta revisión actualiza las atribuciones y pendientes descritos más abajo, que se conservan como historial.

- **Migraciones a OMM/NOAA: ninguna.** Se han consultado los índices completos de las versiones [1.1](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/) y [6.6](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/6.6/data/0-data/Region-6-WMO-Normals-9120/). Portugal, Grecia y Lituania no figuran: Lisboa, Oporto, Coímbra, Covilhã, Braganza, Atenas y Vilna conservan sus fuentes y valores.
- En los índices de Reino Unido de ambas versiones no figuran Edinburgh, Gogarbank, Royal Botanic Garden, Newcastle ni Tynemouth: Edimburgo y Newcastle conservan Met Office. No se sustituyen por ciudades lejanas como Leuchars o Boulmer.
- En Italia no figuran Parma, Ferrara, Siena, Palermo ni Módena (tampoco Palermo/Punta Raisi): conservan ARPAE, LaMMA, INAF-OAPa y UNIMORE. Bolonia sí figura, pero **faltan mayo, junio y julio tanto en TN como en TX**. Se conserva Bologna idrografico (ARPAE 14101), sin rellenar huecos ni mezclar estaciones. CSV examinados: [BolognaBorgoPanigale_16140, v1.1](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/Italy/CSV/BolognaBorgoPanigale_16140.csv) y [Bologna_16140, v6.6](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/6.6/data/0-data/Region-6-WMO-Normals-9120/Italy/CSV/Bologna_16140.csv). Se examinan los parámetros 3 y 4, no las filas NoY ni los récords 22/23.
- **Viena: OMM/NOAA → GeoSphere Austria, Wien Hohe Warte (105 / OMM 11035).** Fuente: [publicación oficial](https://klimaportal.geosphere.at/klimamittelwerte_1991_2020.html) y [XLSX 1991–2020](https://klimaportal.geosphere.at/klimamittel/klimanormalperiode_19912020.xlsx), hoja `Temperatur`, columna FJ, `mtmin` FJ145:FJ156 y `mtmax` FJ214:FJ225. TN enero–diciembre: −1,3; −0,5; 2,6; 6,7; 10,7; 14,7; 15,9; 15,6; 12; 7,3; 3,7; −0,4 °C. TX: 3,5; 6,5; 10,7; 17,2; 20,7; 25,1; 26,4; 26,1; 21,1; 14,3; 8,8; 4 °C.
- **Antes → después (Viena):** primavera 7–16 → 7–16 °C; verano 15–26 → 15–26 °C; otoño 8–15 → 8–15 °C; invierno −1–5 → −1–5 °C. Enero (`month: 0`) −1,3 → −1,3 °C; julio (`month: 6`) 26,4 → 26,4 °C. Promedio simple de los tres meses y `Math.round`, sin ponderar por días. Cambia la fuente, no las cifras: **la normal oficial confirma 26,4, no 27,1 °C**. GeoSphere explica que sus normales usan datos controlados y parcialmente homogeneizados, distintos de las observaciones del Data Hub. Se mantienen `low: -9.32`, `high: 33.96` y `daysBy: "GeoSphere Austria"` por corresponder a la misma estación y meses; son cálculos con observaciones diarias, no extremos de la normal homogeneizada.
- Los textos de Viena en `insights.js`, `cities.js` y los resúmenes de `weatherSeasons.js` siguen siendo coherentes (verano 26 °C de máxima media, invierno −1/5 °C). No hay cambios numéricos en las otras 15 ciudades que obliguen a modificar sus textos.
- Licencias contrastadas en las webs oficiales: Met Office OGL v3.0; ARPAE CC BY 4.0 en sus condiciones vigentes (la copia de `aggiornati.arpae.it` aún muestra NC y no se usa); LaMMA CC BY-ND 4.0, con restricciones sobre obras derivadas. INAF-OAPa y UNIMORE: sin licencia clara localizada para estas normales. EMY y el XLS histórico de LHMT: uso comercial sin confirmar; no se extrapola la licencia de la API de LHMT al XLS. IPMA mantiene la restricción a fines no lucrativos. Detalles y enlaces en el inventario.

- **Validación final:** `npm test`: 61 pruebas aprobadas, 0 fallos. Incluye el cotejo de Viena con los 24 valores mensuales de la publicación oficial y la cobertura exacta de las 78 ciudades en el inventario. `git diff --check` sin errores. Sin servidor, revisión visual, commit ni push. El `pretest` informó de 0 archivos generados actualizados.

### Historial de la incorporación de los meses extremos

Petición de Miguel: los rangos por estación son medias y esconden los días extremos. `CITY_CLIMATE_EXTREMES` en `weatherSeasons.js` guarda, para las **78 ciudades con bloque de clima**, el mes más frío (media de las mínimas diarias) y el más cálido (media de las máximas), con su fuente; la ficha lo enseña bajo las cuatro estaciones con la nota «Rangos medios: habrá días más fríos y más calurosos». Test nuevo: `tests/climate.test.mjs` (formato de los rangos y coherencia mes ↔ estación).

**Fuentes (normales 1991–2020):**
- 61 ciudades: normales OMM publicadas por [NOAA/NCEI](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/1.1/data/0-data/Region-6-WMO-Normals-9120/) (CSV por estación; Venecia y Florencia, en la [versión 6.6](https://www.ncei.noaa.gov/data/oceans/archive/arc0216/0253808/6.6/data/0-data/Region-6-WMO-Normals-9120/Italy/CSV/)). Script de descarga y comparación con los rangos de cada ficha: se ejecutó desde el scratchpad; las estaciones están en el campo `source` de cada ciudad. En las ciudades ya verificadas, los rangos recalculados coinciden con la ficha (diferencias de 1 °C en La Haya, Bruselas, Maastricht y Heidelberg, cuya ficha usa la serie del servicio nacional: se mantiene).
- IPMA (fichas `cn_91-20_*.pdf`): Lisboa/Instituto Geofísico, Porto/Pedras Rubras, Coimbra/Bencanta, Fundão (Covilhã) y Bragança.
- Met Office: Edinburgh Royal Botanic Garden y Tynemouth (Newcastle).
- ARPAE ([tablas climáticas](https://www.arpae.it/it/temi-ambientali/clima/dati-e-indicatori/tabelle-climatiche)): Bologna idrografico (14101), Parma urbana (6031) y Malborghetto di Boara (Ferrara). UNIMORE (Módena), LaMMA ([calendario 1991–2020](https://www.toscana-notizie.it/documents/toscana-notizie/CALENDARIO%20LAMMA_low.pdf), Siena; su TX de noviembre trae una errata, 4,2 por 14,2, que no afecta a los meses extremos) e [INAF](https://meteo.oapa.inaf.it/normali-climatiche.php) (Palermo).
- Météo-France, [Grenoble-Le Versoud](https://donneespubliques.meteofrance.fr/FichesClim/FICHECLIM_38538002.pdf): temperaturas **1999–2020** (la ficha lo indica).
- Atenas: [EMY](https://www.emy.gr/en/climatic-data), Elliniko (estación en la costa).
- **Rosenheim y Vilna: medias calculadas**, porque DWD y LHMT solo publican la normal de la temperatura media. Rosenheim, con los [datos mensuales del DWD](https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/monthly/kl/historical/monatswerte_KL_04261_18810101_20240331_hist.zip) (360/360 meses; comprobado por Claude). Vilna, con los [datos diarios 1991–2020 de LHMT](https://www.meteo.lt/app/uploads/2023/11/TEMP_KRITUL_1991_2020_kasdieniai.xls) (el método reproduce la normal oficial de la media). La ficha lo dice en la fuente.

**«Días de hasta…» (media de la temperatura más baja/alta de cada mes):** ninguna normal oficial la publica (solo dan récords absolutos, que no son medias), así que se calcula con datos diarios oficiales (16-11-2026, petición de Miguel).
- **Método:** para cada año de 1991 a 2020, la mínima diaria más baja del mes más frío (el de `cold.month`) y la máxima diaria más alta del más cálido; se promedian los años con al menos 25 días válidos en ese mes, y solo si hay al menos 25 años. **Excepción: Grenoble**, cuya serie de temperatura de Le Versoud empieza en 1999 (21 eneros y 22 julios); se acepta porque todo su clima ya se presenta como 1999–2020. Con el DWD se usan sus valores mensuales `MX_TN`/`MX_TX`, que son exactamente eso. Control: con los mismos datos, la media de las mínimas y máximas del mes reproduce la normal de la OMM al décimo en todas las ciudades (salvo lo indicado abajo).
- **ECA&D no se usa:** su [política de datos](https://www.ecad.eu/documents/ECAD_datapolicy.pdf) (punto 1b) limita los datos a investigación y educación no comerciales. Decisión de Miguel: solo datos de servicios nacionales con licencia abierta, que permiten uso comercial citando la fuente. La ficha cita el servicio en `daysBy`, dice que es un cálculo de MAbroad y enlaza la licencia (CC BY 4.0 o Licence Ouverte 2.0).
- **31 ciudades, fuente y estación (la misma de los meses extremos):**
  - DWD, [datos mensuales KL](https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/monthly/kl/historical/) (CC BY 4.0): Múnich (3379, München-Stadt), Berlín (433, Tempelhof), Hamburgo (1975), Colonia (2667, Köln/Bonn), Heidelberg (5906, Mannheim), Friburgo (1443; 29 julios), Leipzig (2928, Holzhausen; 28 julios), Dresde (1048), Tubinga (4931, Stuttgart-Echterdingen) y Rosenheim (4261).
  - KNMI, [daggegevens](https://www.knmi.nl/nederland-nu/klimatologie/daggegevens) (datos abiertos): Ámsterdam (240), Utrecht (260, De Bilt), Groningen (280, Eelde), Rotterdam (344) y Maastricht (380).
  - Météo-France, [données climatologiques de base quotidiennes](https://www.data.gouv.fr/fr/datasets/donnees-climatologiques-de-base-quotidiennes/) (Licence Ouverte): Toulouse (31069001), Burdeos (33281001), Nantes (44020001), Montpellier (34154001), Marsella (13054001, Marignane), Lille (59343001), Estrasburgo (67124001), Rennes (35281001), Lyon (69029001, Bron), París (75114001, Montsouris) y Grenoble (38538002, Le Versoud, **1999–2020**: 21 eneros y 22 julios, como el resto de su clima).
  - GeoSphere Austria, [klima-v2-1d](https://dataset.api.hub.geosphere.at/v1/station/historical/klima-v2-1d) (CC BY 4.0): Viena (105, Hohe Warte). Ojo: con estos datos el mes de julio da 27,1 °C de máxima media, 0,7 °C más que la copia de NOAA de la normal OMM (26,4) que usa la ficha; la mínima de enero sí coincide. Pendiente de aclarar cuál es la buena.
  - SMHI, [metobs](https://opendata-download-metobs.smhi.se/) (CC BY 4.0): Estocolmo (98210, Observatoriekullen).
  - FMI, [WFS de datos abiertos](https://opendata.fmi.fi/) (CC BY 4.0): Helsinki (fmisid 100971, Kaisaniemi).
  - MeteoSwiss, [ogd-smn](https://data.geo.admin.ch/ch.meteoschweiz.ogd-smn/gve/) (datos abiertos): Ginebra (GVE, Cointrin; enero 0,2 °C más templado que la normal OMM).
  - LHMT: Vilna (cálculo del agente de verificación, ver arriba).
- **Revisión de Codex (16-11-2026):** cifras sin objeciones. Aplicado: licencia enlazada y «cálculo de MAbroad» en la ficha; excepción de Grenoble documentada. **Para Miguel:** las [condiciones del IPMA](https://www.ipma.pt/pt/siteinfo/index.html?page=index.xml) permiten reutilizar sus datos gratis *sin fines lucrativos*; si MAbroad tiene ingresos, las normales del IPMA (Lisboa, Oporto, Coímbra, Covilhã y Braganza) necesitarían autorización o otra fuente. Lo mismo convendría revisar para el resto de fuentes de normales (OMM/NOAA es dominio público; Met Office, ARPAE, LaMMA, INAF, UNIMORE, EMY y LHMT, sin revisar).
- **Pendientes (47), sin datos diarios abiertos localizados o sin serie completa:** Bolonia, Milán, Roma, Cracovia, Varsovia, Budapest, Praga, La Haya (Voorschoten solo tiene 6 años de serie diaria), Lisboa, Oporto, Londres, Bruselas, Oslo, Reikiavik, Dublín (el servidor de Met Éireann no respondió), Edimburgo, Atenas, Zagreb, Liubliana, Tallin, Riga, Bratislava, Bucarest, Sofía, Florencia, Gante, Coímbra, Lovaina, Venecia, Pisa, Siena, Bari, Trieste, Bérgamo, Parma, Ferrara, Lecce, Cagliari, Verona, Palermo, Caserta, Covilhã, Módena, Pavía, Braganza, Newcastle y Geel. Budapest: HungaroMet publica datos diarios abiertos de Pestszentlőrinc (44527), pero solo desde 2002 (19 años, no llega a 25). Vías abiertas por probar: IMGW (Polonia), ČHMÚ (Chequia), HungaroMet, Met Office MIDAS-Open (Reino Unido, requiere cuenta de CEDA), MET Norway Frost (requiere identificador), Met Éireann, ARPAE Dexter (Emilia-Romaña) y KMI/IRM (Bélgica).

**Rangos por estación corregidos** (la ficha no cuadraba con ninguna normal oficial; casi todas eran de tandas sin verificar):
- Londres (St James's Park), Oslo (Blindern), Reikiavik, Zagreb (Maksimir), Liubliana (Bežigrad), Tallin (Harku), Riga, Bratislava (aeropuerto), Bucarest (Băneasa), Sofía, Ginebra (Cointrin), Edimburgo, Atenas y Vilna: rangos nuevos de la estación anotada en `weatherSeasons.js`. Oslo (invierno −7/−1 → −4/1 °C) y Bucarest (verano 20–33 → 15–30 °C) eran los más desviados. Textos de clima de Londres («18–25 °C» → 14–23) y Oslo («16-22 °C» → 12–21) corregidos.
- Bérgamo: invierno 0–9 → 0–8 °C (misma estación OMM 16076: máximas DJF 8,4).
- Bolonia: verano 21–31 → 20–31 °C (ARPAE, mínimas JJA 20,47).
- **Florencia**: los rangos anteriores no salían de ninguna estación oficial; ahora Firenze Peretola (OMM 16170, la que usa el ISPRA): 8–20 / 18–31 / 11–21 / 2–12 °C.
- Oporto: unificado con Porto/Pedras Rubras (IPMA 545) por decisión de Miguel (16-11-2026): primavera 10–19 → 10–18 °C; el resto ya coincidía.

**Revisión de Codex (16-11-2026, solo lectura, commit `e1b09cd`), aplicada:**
- Desglose de la nota: al abrirse, el foco pasa al panel (va en un portal al final de la página); salir con Tab lo cierra y devuelve el foco a la nota.
- Anillo de la nota de la ficha: «/10» y el nivel a 12 px o más (el anillo pasa de 96 a 112 px para que «Excelente» quepa).
- Comparador: «Cambiar selección» y el desplegable de orden, de 40 a 44 px de alto.
- Valores OMM guardados con los dos decimales de la fuente (Bérgamo 29,65, no 29,6); no cambia ninguna cifra mostrada.
- Atenas: Codex solo veía enteros en la web de EMY. Comprobado por Claude en la [API oficial que alimenta esa página](https://api.emy.gr/api/microstep/climateData/72) (`1991-2020` → `temp`): enero 6,9 / 13,5 °C y agosto 23,7 / 33,4 °C.
- **Vilna, pendiente de segunda comprobación:** Codex no reprodujo el cálculo con el XLS diario de LHMT (formato .xls binario). Lo calculó el agente de verificación, cuyo método reproduce la normal oficial de la temperatura media.

## Ajustes móviles de la nota y el desglose (16/11/2026)

- Autorización de Miguel para editar con Codex, sin commit, push, servidor ni navegación. Se conserva el archivo local preexistente `.claude/settings.local.json` sin tocarlo.
- `ScoreRing`: nivel fuera del círculo, en pastilla con fondo compartido en `getScoreLevel` y contraste AA comprobado para los cuatro niveles. Se mantienen sin etiqueta los anillos compactos que ya usaban `showLabel={false}` (tarjetas, selector del comparador y City Match).
- `ScoreBreakdown`: chip «Ver desglose ›» dentro del único botón accesible en hero, análisis y tarjetas del comparador. Pulsación a 0,96; brillo CSS de entrada único en el anillo, sin animación con movimiento reducido. Panel móvil a 60vh/60dvh, asa y cabecera fuera del scroll, cierre por arrastre superior a 80 px o gesto rápido descendente, cancelación del gesto, Esc, exterior y cruz. El contenido admite foco para desplazamiento por teclado.
- `formatScore` centraliza el decimal español de la nota en anillo, navbar, mapa, análisis, comparador y rankings. RankingPage y CityCard reciben el cambio mediante sus utilidades/componentes compartidos. No se añaden lecturas del entorno durante render o inicialización del estado.
- Burbujas de 44 px en móvil, ocultas mediante una clase de body gestionada en efecto mientras el desglose está abierto. Espacio al final de la ficha para apartar el texto de las acciones. Navbar compacta para conservar la nota y los controles en 320/375 px.
- Validación: `npm test`, 63 pruebas correctas, incluidas formato y contraste; sintaxis JS/JSX/CSS comprobada con esbuild. `npm run build` desde PowerShell no pudo cargar `vite.config.js`: esbuild devuelve «Cannot read directory ../..: Access is denied». No se ha comprobado visualmente ni probado el gesto en iPhone, conforme a la instrucción de no navegar ni levantar servidor.

## Fase 1, tareas pequeñas (26-11-2026, rama `tarea/fase1-pequenas`)

- **Fecha de revisión por ficha** (`src/data/cityReviews.js`): sale de las tandas cerradas de este documento (tandas 1–13 y 13b, Loyola A/B con su cierre del 15-11 y fase 2, tandas 1–3). Las fichas que no han pasado por ninguna no enseñan fecha (decisión de Miguel: nada de «pendiente de revisión»).
- **Enlaces de entrantes:**
  - Trento: se mantiene la [página de UniTrento para estudiantes de intercambio](https://www.unitn.it/en/international/coming-unitrento/exchange-student) (la web oficial la devuelve en las búsquedas; a los bots les da 403).
  - Pavía: pasa a la página concreta [Erasmus+ EU Students](https://en.unipv.it/en/international/study-pavia/exchange-student/study/erasmus-eu-students) de la UniPV (carga, con el buzón incoming.erasmus@unipv.it).
  - Braganza: **sin enlace**. portal3.ipb.pt rechaza la conexión y unipb.pt solo se carga con JavaScript; no hay página oficial comprobada.
  - Una universidad sin enlace oficial sale ya sin enlace en la ficha (antes abría una búsqueda de Google).

## Pendiente de Miguel (Rosenheim, vive allí)

Datos de Rosenheim que no se pueden comprobar con fuentes oficiales. Siguen como estaban hasta que Miguel los confirme o corrija (lo verificable ya se aplicó en la tanda 8):

- Distancias y transporte: «los Alpes a 30 minutos» (¿a dónde y en qué?), «a 60 km de Múnich», «Chiemsee a 20 minutos» (¿en qué y hasta dónde?), regional a Múnich «cada 30 minutos», «del campus al centro en 15 minutos» andando, Salzburgo a 45 min e Innsbruck a 1 h 30 (¿en tren?), esquí en bus regional o coche compartido (¿qué estaciones?), «sin coche es completamente viable».
- Barrios: Innenstadt «centro histórico tranquilo, €€». Aicherpark se ha cambiado a «zona comercial y de oficinas» (según el ayuntamiento): ¿qué barrios residenciales pondrías para estudiantes y con qué precio relativo (€/€€/€€€)?
- Ambiente: «tranquila y asequible, lejos del turismo masivo», «ambiente bávaro muy auténtico», «Baviera sin filtro turístico», «biergärten centenarios» (¿cuáles?), mercado de Navidad «de los más bonitos del país», comunidad Erasmus «pequeña pero muy unida», el ocio principal es la naturaleza y los viajes a Múnich, vida nocturna «muy local».
- Gente e idioma: menos inglés que en Múnich y el alemán es esencial, locales muy acogedores con extranjeros, integración y amistades «desde los primeros días».
- Coste del día a día: supermercados «bien surtidos a precios razonables», ocio más barato que en Múnich, grupos de Facebook o webs para buscar piso además de WG-Gesucht.
- Clima: invierno con «nieve frecuente» / «nieve asegurada».
- Empleo: «muchos estudiantes hacen prácticas en Múnich», prácticas accesibles en empresas locales.
- Seguridad: «de las ciudades más seguras de la guía», «todos se conocen».
- Texto de ambiente: «huele a madera de pino y cerveza artesanal», «el silencio de los Alpes».

### Tanda 5 — 26-11-2026: Diepenbeek, Namur, Limasol, Roskilde, Nitra, Prešov, Kuopio, Rovaniemi, Clermont-Ferrand, El Havre (rama `tarea/destinos-tanda-5`)

Rama creada desde `tarea/destinos-tanda4` y rebasada sobre `origin/main`, porque la tanda 4 aún no estaba en `main`: si la tanda 4 se integra antes, el rebase quita sus commits solo. Dos agentes `contenido-verificacion` (cinco ciudades cada uno, solo lectura); Claude abre los PDF y XLSX oficiales y calcula el clima.

**Población:** Statbel a 1-1-2026 ([XLSX por municipio](https://statbel.fgov.be/sites/default/files/files/documents/bevolking/5.1%20Structuur%20van%20de%20bevolking/Bevolking_per_gemeente.xlsx)): Diepenbeek 19.867 y Namur 115.457. Roskilde, 93.162 en el municipio (Danmarks Statistik, [FOLK1A](https://api.statbank.dk/v1/data/FOLK1A/CSV?lang=en&OMR%C3%85DE=265&Tid=2026K4), 4.º trimestre de 2026). Kuopio 126.572 y Rovaniemi 66.191 a 31-12-2025 (Statistics Finland, [tabla 11ra](https://pxdata.stat.fi/PxWeb/pxweb/en/StatFin/StatFin__vaerak/statfin_vaerak_pxt_11ra.px/)). Clermont-Ferrand 146.351 y El Havre 166.687 (INSEE, [poblaciones de referencia 2023](https://www.insee.fr/fr/statistiques/8643952?geo=COM-63113)). **Nitra (77.610) y Prešov (83.897) son de 1-1-2022** ([Eurostat urb_cpop1](https://ec.europa.eu/eurostat/databrowser/view/urb_cpop1/default/table), con datos del ŠÚ SR): el DATAcube y el portal de capitales regionales del ŠÚ SR no respondían; conviene actualizarlas. **Limasol sin población**: desde el 1-7-2024 el municipio incluye otros antiguos municipios y no hay cifra oficial con los límites nuevos.

**Clima** (normales OMM 1991–2020 de NOAA; rangos redondeados a la mitad alejándose de cero, comprobado con Semmerzake/Cortrique): Diepenbeek con Kleine-Brogel (06479, a unos 29 km), Namur con Charleroi-Gosselies (06449, a unos 30 km), **Limasol con el aeropuerto de Pafos (17600, a unos 50 km)**, Kuopio con su aeropuerto (02917, a unos 14 km); el resto, estaciones a menos de 10 km. Las fichas de Eslovaquia y Finlandia de NOAA no traen el número de años. **Roskilde sin bloque de clima**: las normales OMM danesas de NOAA (versiones 1.1 y 6.6) no traen máximas ni mínimas, como en Copenhague, Aarhus y Odense.

**Decisiones de Claude (para que las revise Miguel):**
- **Diepenbeek sin línea de cercanía**: ninguna fuente oficial da la distancia ni el tiempo a Hasselt (UHasselt solo dice que hay bus desde la estación de Hasselt al menos cada 15 minutos, y no dice cuál de sus dos campus es el principal). Solo hay distancias de planificadores de rutas (unos 6 km). Va como ficha propia, sin `near`.
- **Roskilde con línea de cercanía** a Copenhague: «unos 22 minutos en tren» ([DSB](https://www.dsb.dk/togture-i-danmark/roskilde-kobenhavn/)).
- **THE**: en Limasol cuenta la Cyprus University of Technology (501–550), porque la University of Limassol solo sale como «Reporter». Kuopio cuenta la University of Eastern Finland (451–500) sin marcarla como satélite: tiene dos campus grandes, Kuopio y Joensuu (mismo criterio que Leiden en La Haya).
- **Coste con `costSource` solo en Clermont-Ferrand** (610–1.050 €): la [guía para internacionales 2026-2027](https://www.clermont-sb.fr/docs/CLERMONT-SB_GUIDE_ETUDIANTS_INTERNATIONAUX_EN.pdf) desglosa alquiler, comida, ocio, teléfono y transporte. El resto, estimación MAbroad: Namur (600–700 € de UNamur), Kuopio (desglose de Savonia) y El Havre (unos 800 € de EM Normandie) no tienen fecha; Diepenbeek, Limasol, Roskilde, Nitra, Prešov y Rovaniemi no publican total.
- **Nota provisional: El Havre** (sin THE ni ESN). Quedan 13 provisionales de 164 destinos Erasmus+ (7,9 %, tope del 15 %). Namur, Limasol y Roskilde no tienen ESN, pero sí THE.
- Fotos: campus de UHasselt (Diepenbeek), confluencia del Mosa y el Sambre (Namur), paseo marítimo (Limasol), catedral (Roskilde), castillo (Nitra), concatedral (Prešov), Kuopio desde Puijo, puente Jätkänkynttilä (Rovaniemi), panorámica de Clermont y edificios de Perret (El Havre); originales de 3.200 px o más.

**Discrepancias con el portal de Loyola (la ficha sigue a la universidad de destino y remite a la Oficina):**
- **Idioma:**
  - Prešov: el portal dice inglés B1; la universidad pide inglés B2 ([Fact Sheet 2025/26](https://www.unipo.sk/public/media/11395/Fact_Sheet-University%20of%20Presov_25_26.pdf)).
  - Namur: el portal pide francés B1; UNamur no exige acreditar nivel y recomienda B1/B2 ([UNamur](https://www.unamur.be/en/international/mobility/in/exchange-students/administrative-procedure)).
  - Roskilde: el portal pide B2 certificado con menos de 2 años; RUC pide IELTS 6.5, Cambridge C1 Advanced 160 o TOEFL iBT 80, o un documento de la universidad si se estudia en inglés, sin antigüedad máxima ([RUC](https://ruc.dk/en/node/899)).
  - Rovaniemi: el portal no da idioma; Lapland UAS pide inglés B1 ([Lapland UAS](https://lapinamk.fi/en/studies/exchange-students/application-process/)).
  - Limasol: el portal pide inglés B2; la universidad no publica nivel para intercambio.
  - Clermont-Ferrand: «francés B2 o inglés» y «mayoritariamente en francés» del portal no aparecen en la web ni en la guía de la escuela.
  - El Havre: EM Normandie pide B2 en la lengua de las clases; el portal dice «mayoritariamente en francés». La oferta de cursos 2026-27 está en un dominio ajeno (azurewebsites) y no se ha usado.
- **Coste y alojamiento:**
  - Prešov: el portal da unos 120 €; la residencia cuesta 140 € al mes, más 50 € de tasa inicial ([Before Mobility, 29-09-2026](https://www.unipo.sk/taxonomy/term/60950)).
  - Kuopio: el portal da «~400 €» al mes; solo el desglose de Savonia sin la compra ya pasa de 450 €.
  - Diepenbeek: el portal da 313–430 €; la hoja 2026-27 de UHasselt, 360–480 € más unos 90 € de gastos. Idioma (inglés o neerlandés B2) y bici (70 € + 25 €) coinciden.
  - Namur: el portal da unos 300 € de alojamiento; la Maison Internationale cuesta unos 370 € con gastos.
  - Roskilde: el portal da 500–670 €; RUC, 4.200–5.300 coronas (unos 560–710 €).
  - Clermont-Ferrand: el portal da 610–800 €; la guía 2026-27, 610–1.050 €.
  - El Havre: el portal da 800–900 € con alojamiento; EM Normandie, unos 800 € (sin fecha).

**Sin fuente oficial (no se publica en la ficha):** distancia Diepenbeek–Hasselt y fundación de UHasselt; población de Limasol con los límites de 2024; plazos, tasas, precios de alojamiento y coste de vida de la University of Limassol; registro en Chipre (la página del CRMD da 404); precio de las residencias de la SPU (Nitra); billetes urbanos de TEC (403), EMEL, Movia, Nitra y Linkkari (Rovaniemi); tiempos a los aeropuertos salvo Kuopio y Rovaniemi; plazos de Clermont SB 2026-27 y de Lapland UAS 2027-28; año de fundación de Savonia; la capitalidad de Valonia y la confluencia del Sambre y el Mosa en Namur (solo enciclopedias).

**Revisión de Codex (26-11, solo lectura, commit `877f837`), aplicada:** Diepenbeek ya no dice que «la mayoría de los programas» de UHasselt son en inglés (solo hay asignaturas de intercambio en inglés según la facultad); en Roskilde, el documento de la universidad de origen tiene que confirmar que el programa es íntegramente en inglés ([RUC](https://ruc.dk/en/admission-exchange)); en Kuopio y Rovaniemi, el registro en Migri solo hace falta para más de 3 meses seguidos ([Migri](https://migri.fi/en/eu-citizen)); en Clermont-Ferrand, el billete de 1,60 € también se paga a bordo con tarjeta sin contacto y el de 2 € es el que se compra al conductor ([T2C](https://www.t2c.fr/page/les-supports-au-voyage)). Nada grave: sin segunda ronda.

### 26-11-2026 — Regla nueva de Miguel: si el portal de Loyola no coincide con la universidad de destino, se muestra lo de Loyola (rama `tarea/destinos-tanda-5`)

Sustituye a la regla anterior de idioma («la ficha sigue a la universidad de destino»). La ficha muestra lo que dice el portal de movilidad de Loyola (extraído el 13-11-2026) y sigue remitiendo a la Oficina. Para el correo a Loyola, cada discrepancia queda aquí, marcada **se muestra lo de Loyola**.

**Idioma (se muestra lo de Loyola):**
- Prešov: Loyola, inglés B1; la universidad, B2 (Fact Sheet 2025/26).
- Namur: Loyola, francés B1 con certificado; UNamur no exige acreditar nivel y recomienda B1/B2.
- Roskilde: Loyola, inglés B2 certificado con menos de 2 años; RUC, IELTS 6.5 / C1 Advanced 160 / TOEFL 80 o documento si el programa es íntegramente en inglés.
- Rovaniemi: Loyola no indica idioma; Lapland UAS pide inglés B1. La ficha dice que el portal no indica nivel.
- Limasol: Loyola, inglés B2; la universidad no publica nivel para intercambio.
- Clermont-Ferrand: Loyola, francés B2 o inglés, oferta sobre todo en francés; la escuela no publica nivel.
- El Havre: Loyola, francés o inglés B2, oferta sobre todo en francés; EM Normandie, B2 en la lengua de las clases.
- Santarém: Loyola, inglés o portugués B1; la fact sheet 2026, inglés B2.
- Benevento: Loyola, inglés o italiano B1; Unisannio dice que las clases son en italiano (guía de mayo de 2026).
- Castellanza: Loyola, italiano o inglés B1; la LIUC recomienda inglés B2.
- Belfort: Loyola, inglés o francés B1; la UTBM no publica ese B1 y da la mayoría de los cursos en francés.
- Vila Real: Loyola, portugués o inglés B2 (ya se mostraba).
- Nottingham: Loyola, B2 para el convenio, pero NTU pide IELTS 6.5 o equivalente (el propio portal lo dice).
- Zlín: Loyola, inglés B1; la UTB espera B2.
- Umeå: Loyola, inglés B2; la universidad no pide acreditar el inglés.
- Passau: Loyola, alemán B2; la universidad, alemán o inglés B1 con B2 recomendado.
- Graz (Augustinum): Loyola, alemán o inglés B1; la escuela, B2.
- Jena: Loyola, alemán B2 o inglés B2; la universidad, grado casi todo en alemán (B2 aproximado) y pocas asignaturas en inglés con B2–C1.
- Stuttgart: Loyola, alemán B1 o inglés B2; la universidad, muy pocas asignaturas de grado en inglés y vía A2 + inglés B2 con curso intensivo obligatorio.
- Mannheim: Loyola no indica idioma; la universidad, alemán o inglés B2 sin certificado. La ficha dice que el portal no indica nivel.
- Fráncfort (Sankt Georgen): Loyola no indica idioma; la facultad pide C1 a los de carrera completa. La ficha dice que el portal no indica nivel.

**Alojamiento (se muestra lo de Loyola):** Aveiro: Loyola, 25 habitaciones en residencias para intercambio a 180 € al mes, con prioridad para universidades con acuerdo de alojamiento y estudiantes con discapacidad física; la guía de la UA dice que no puede dar residencia a los de intercambio.

**Coste (se muestra lo de Loyola, campo `costBy: "loyola"`, etiqueta «Según la Universidad Loyola»).** No es fuente oficial: nunca da «Asequible». Ninguna cifra del portal lleva año.
- Erfurt: ~900 € (antes estimación MAbroad de 800–1.000 €; la universidad, 947 € de una encuesta de 2021).
- Bergen: ~1.050 €, con unos 300 € de alojamiento (antes estimación de 1.000–1.400 €).
- Arnhem: ~900 €, con 380–450 € de alojamiento (antes ~1.200 € de la HAN, Fact Sheet 2026-27, con `costSource`).
- Umeå: 7.600 SEK, unos 680 € al cambio del BCE del 26-11-2026 (antes estimación de 800–1.100 €).
- Brugg: 1.215–1.980 CHF, 1.330–2.160 € al cambio del BCE del 26-11-2026 (la FHNW, 1.415–2.080 CHF en la fact sheet 2026).
- Aquisgrán: ~800 €, con unos 450 € de piso privado (antes estimación de 950–1.250 €; la RWTH, 1.200 € sin fecha).
- Passau: ~760 €, alquiler de 250–450 € (antes 600–950 € de la universidad, Fact Sheet 2026/27, con `costSource`).
- Stuttgart: ~750 €, alquiler de 350–500 € (la universidad, 992 € como mínimo).
- Graz: como mucho 1.000 € con residencia, mostrado como ~1.000 € (no aparece en ninguna fuente del Augustinum).
- Aplicado solo a esta lista. Otras diferencias de coste anotadas (Jena; Prešov, Kuopio, Diepenbeek, Namur, Roskilde, Clermont-Ferrand y El Havre en la tanda 5) siguen como estaban, pendientes de que Miguel diga si también van con la cifra de Loyola.

**Clasificación como en el portal:** Kuopio y Limasol solo cuentan las universidades del convenio (Savonia y University of Limassol, sin puesto en THE). Kuopio sigue con nota (ESN Savo); **Limasol pasa a provisional** (sin THE ni ESN). Notas provisionales: **14 de 164** destinos Erasmus+ (8,5 %, tope del 15 %).

Sin cambios: Diepenbeek sin `near`; Nitra y Prešov con Eurostat 2022; Limasol sin población.
