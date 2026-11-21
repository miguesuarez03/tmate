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
6. **Cerrar**: actualizar «Dónde vamos», la tabla y el registro; `npm run build`; commit y push.

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
| 1 | 22/11 | Luneburgo, Odense, Angers, Campobasso, Salerno, Tetovo, Enschede, Santarém, Erfurt, Gotinga | Pendiente |
| 2 | 23/11 | Ratisbona, Wurzburgo, Malinas, Belfort, Debrecen, Benevento, Castellanza, Bergen, Arnhem, Flesinga | Pendiente |
| 3 | 24/11 | Aveiro, Vila Real, Nottingham, Ostrava, Zlín, Umeå, Brugg, Aquisgrán, Bamberg, Bonn | Pendiente |
| 4 | 25/11 | Bremen, Fráncfort, Jena, Mannheim, Osnabrück, Passau, Stuttgart, Graz, Wiener Neustadt, Cortrique | Pendiente |
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
