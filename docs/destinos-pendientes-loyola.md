# Destinos de Universidad Loyola Andalucía sin ficha en MAbroad

Generado por `scripts/match-university-cities.mjs` a partir de `src/data/universities/loyola.json` (portal de movilidad, extraído el 2026-11-13). No editar a mano: vuelve a lanzar `npm run universities:match`.

Es la cola de trabajo para añadir fichas: 20 ciudades con 21 convenios de estudios (de 418 fuera de España) que todavía no casan con ninguna ciudad de MAbroad (mismo país y nombre/alias, o universidad a ≤ 15 km). Ordenadas por número de convenios. No cuentan los destinos en España (SICUE) ni los de otros programas (MAGIS (red jesuita)): van aparte, al final. Las coordenadas son las de la primera universidad de cada ciudad en el portal (algunas son aproximadas).

| # | Ciudad | País | Convenios | Coordenadas (lat, lng) | Universidades |
|---|---|---|---|---|---|
| 1 | Seúl | Corea del Sur | 2 | 37.5399, 127.0773 | Konkuk University; Sogang University |
| 2 | Sídney | Australia | 1 | -33.8671, 151.2071 | Australian Catholic University |
| 3 | Uagadugú | Burkina Faso | 1 | 12.2844, -1.5194 | Kosyam Jesuit University of Science (KoJUS) |
| 4 | Busan | Corea del Sur | 1 | 35.1400, 129.0990 | Kyungsung University |
| 5 | Abiyán | Costa de Marfil | 1 | 5.3399, -4.0006 | CERAP-IDDH University |
| 6 | Newark | Estados Unidos | 1 | 39.6791, -75.7520 | University of Delaware |
| 7 | Omaha | Estados Unidos | 1 | 41.2654, -95.9493 | Creighton University |
| 8 | Syracuse | Estados Unidos | 1 | 43.0492, -76.0849 | Le Moyne College |
| 9 | Utica | Estados Unidos | 1 | 43.0940, -75.2710 | Utica University |
| 10 | Manila | Filipinas | 1 | 14.6007, 120.9822 | Ateneo de Manila University |
| 11 | Tegucigalpa | Honduras | 1 | 14.0821, -87.2063 | Universidad Nacional Autónoma de Honduras |
| 12 | Bhubaneswar | India | 1 | 20.1592, 85.7625 | XIM University |
| 13 | Chennai | India | 1 | 13.0616, 80.2347 | Loyola College |
| 14 | Jamshedpur | India | 1 | 22.8133, 86.1908 | XLRI, Xavier School of Management |
| 15 | Tokio | Japón | 1 | 35.6785, 139.6823 | Sophia University |
| 16 | Fianarantsoa | Madagascar | 1 | -21.4277, 47.3027 | Magis University |
| 17 | Rabat | Marruecos | 1 | 34.0229, -6.7668 | Université Internationale de Rabat |
| 18 | Willemstad | Países Bajos | 1 | 12.1696, -68.9900 | University of Curaçao Dr. Moises Da Costa Gomez |
| 19 | Taipéi | Taiwán | 1 | 25.0911, 121.5598 | Fu Jen Catholic University |
| 20 | Caracas | Venezuela | 1 | 10.4643, -66.9758 | Universidad Católica Andrés Bello |

## Destinos en España (SICUE): fuera por ahora

MAbroad todavía no tiene fichas de ciudades españolas. En «Mi universidad» salen agrupados como «Destinos en España (SICUE): próximamente», sin ficha: 9 ciudades con 47 convenios.

| Ciudad | Convenios | Universidades |
|---|---|---|
| Bilbao | 13 | Escuela Universitaria Begoñako Andra Mari BAM - Deusto (2); Universidad de Deusto (11) |
| Salamanca | 11 | Universidad de Salamanca (9); Universidad Pontificia de Salamanca (2) |
| Madrid | 7 | Universidad Carlos III de Madrid; Universidad Francisco de Vitoria; Universidad Pontificia Comillas, Madrid (5) |
| Barcelona | 6 | IQS (Universitat Ramon Llull) (6) |
| Palma | 3 | Comillas - Centro de Estudios Superiores Alberta Giménez CESAG (Campus Palma de Mallorca) (3) |
| Badajoz | 2 | Universidad de Extremadura (2) |
| Burgos | 2 | Universidad de Burgos (2) |
| Jaén | 2 | Universidad de Jaén - Centro Universitario Sagrada Familia-Úbeda (2) |
| Gerona | 1 | Universitat de Girona |

## Otros programas (MAGIS (red jesuita)): no cuentan

No son intercambios de estudios de un cuatrimestre o un curso: en la web van plegados y fuera de los totales, así que no piden ficha. Sin ficha: 17 ciudades con 17 convenios.

| Ciudad | País | Convenios | Universidades |
|---|---|---|---|
| Pekín | China | 1 | The Beijing Center |
| Denver | Estados Unidos | 1 | Regis University |
| Kansas City | Estados Unidos | 1 | Rockhurst University |
| Omaha | Estados Unidos | 1 | Creighton University |
| Scranton | Estados Unidos | 1 | University of Scranton |
| Cagayán de Oro | Filipinas | 1 | Xavier University - Ateneo de Cagayan |
| Manila | Filipinas | 1 | Ateneo de Manila University |
| Bangalore | India | 1 | St. Joseph's University, Bengaluru, Karnataka, India |
| Bhubaneswar | India | 1 | XIM University |
| Bombay | India | 1 | St. Xavier's College (Autonomous) |
| Jamshedpur | India | 1 | XLRI, Xavier School of Management |
| Yogyakarta | Indonesia | 1 | Sanata Dharma University |
| Tokio | Japón | 1 | Sophia University |
| Nairobi | Kenia | 1 | Hekima University College |
| Fianarantsoa | Madagascar | 1 | Magis University |
| Caracas | Venezuela | 1 | Universidad Católica Andrés Bello |
| Harare | Zimbabue | 1 | Arrupe Jesuit University |
