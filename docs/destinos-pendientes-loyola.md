# Destinos de Universidad Loyola Andalucía sin ficha en MAbroad

Generado por `scripts/match-university-cities.mjs` a partir de `src/data/universities/loyola.json` (portal de movilidad, extraído el 2026-11-13). No editar a mano: vuelve a lanzar `npm run universities:match`.

Es la cola de trabajo para añadir fichas: 10 ciudades con 10 convenios de estudios (de 418 fuera de España) que todavía no casan con ninguna ciudad de MAbroad (mismo país y nombre/alias, o universidad a ≤ 15 km). Ordenadas por número de convenios. No cuentan los destinos en España (SICUE) ni los de otros programas (MAGIS (red jesuita)): van aparte, al final. Las coordenadas son las de la primera universidad de cada ciudad en el portal (algunas son aproximadas).

| # | Ciudad | País | Convenios | Coordenadas (lat, lng) | Universidades |
|---|---|---|---|---|---|
| 1 | Uagadugú | Burkina Faso | 1 | 12.2844, -1.5194 | Kosyam Jesuit University of Science (KoJUS) |
| 2 | Abiyán | Costa de Marfil | 1 | 5.3399, -4.0006 | CERAP-IDDH University |
| 3 | Tegucigalpa | Honduras | 1 | 14.0821, -87.2063 | Universidad Nacional Autónoma de Honduras |
| 4 | Bhubaneswar | India | 1 | 20.1592, 85.7625 | XIM University |
| 5 | Chennai | India | 1 | 13.0616, 80.2347 | Loyola College |
| 6 | Jamshedpur | India | 1 | 22.8133, 86.1908 | XLRI, Xavier School of Management |
| 7 | Fianarantsoa | Madagascar | 1 | -21.4277, 47.3027 | Magis University |
| 8 | Rabat | Marruecos | 1 | 34.0229, -6.7668 | Université Internationale de Rabat |
| 9 | Willemstad | Países Bajos | 1 | 12.1696, -68.9900 | University of Curaçao Dr. Moises Da Costa Gomez |
| 10 | Caracas | Venezuela | 1 | 10.4643, -66.9758 | Universidad Católica Andrés Bello |

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

No son intercambios de estudios de un cuatrimestre o un curso: en la web van plegados y fuera de los totales, así que no piden ficha. Sin ficha: 14 ciudades con 14 convenios.

| Ciudad | País | Convenios | Universidades |
|---|---|---|---|
| Pekín | China | 1 | The Beijing Center |
| Denver | Estados Unidos | 1 | Regis University |
| Kansas City | Estados Unidos | 1 | Rockhurst University |
| Scranton | Estados Unidos | 1 | University of Scranton |
| Cagayán de Oro | Filipinas | 1 | Xavier University - Ateneo de Cagayan |
| Bangalore | India | 1 | St. Joseph's University, Bengaluru, Karnataka, India |
| Bhubaneswar | India | 1 | XIM University |
| Bombay | India | 1 | St. Xavier's College (Autonomous) |
| Jamshedpur | India | 1 | XLRI, Xavier School of Management |
| Yogyakarta | Indonesia | 1 | Sanata Dharma University |
| Nairobi | Kenia | 1 | Hekima University College |
| Fianarantsoa | Madagascar | 1 | Magis University |
| Caracas | Venezuela | 1 | Universidad Católica Andrés Bello |
| Harare | Zimbabue | 1 | Arrupe Jesuit University |
