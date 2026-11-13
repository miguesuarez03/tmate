// Generado por scripts/scoring-data.mjs (npm run scoring:data) — no editar a mano.
// Fuente: Tasa NEET (jóvenes de 15 a 24 años que ni trabajan ni estudian ni se forman, %). Eurostat edat_lfse_22 por región NUTS 2 (https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/edat_lfse_22?format=JSON&lang=EN&sex=T&age=Y15-24&sinceTimePeriod=2021) con la región de cada ciudad según los límites GISCO NUTS 2024 (https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_10M_2024_4326_LEVL_2.geojson); fuera de Eurostat, OIT por país (indicador SL.UEM.NEET.ZS del Banco Mundial: https://api.worldbank.org/v2/country/all/indicator/SL.UEM.NEET.ZS?format=json&per_page=20000&date=2015:2026).
// Descargado el 2026-11-13.
/** slug → { source: "eurostat" | "ilo", scope: "region" | "country", geo, name?, years: { año: % } } o null (sin dato) */
export const CITY_NEET = {
 "bolonia": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITH5",
  "name": "Emilia-Romagna",
  "years": {
   "2023": 9,
   "2024": 7.4,
   "2025": 6.5
  }
 },
 "milan": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITC4",
  "name": "Lombardia",
  "years": {
   "2023": 9.1,
   "2024": 8.9,
   "2025": 6.3
  }
 },
 "roma": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITI4",
  "name": "Lazio",
  "years": {
   "2023": 10.5,
   "2024": 11,
   "2025": 9.5
  }
 },
 "turin": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITC1",
  "name": "Piemonte",
  "years": {
   "2023": 8.8,
   "2024": 9.1,
   "2025": 8.5
  }
 },
 "cracovia": {
  "source": "eurostat",
  "scope": "region",
  "geo": "PL21",
  "name": "Małopolskie",
  "years": {
   "2023": 3.5,
   "2024": 7.4,
   "2025": 8
  }
 },
 "varsovia": {
  "source": "eurostat",
  "scope": "region",
  "geo": "PL91",
  "name": "Warszawski stołeczny",
  "years": {
   "2022": 6.8,
   "2023": 3.5,
   "2024": 3.7
  }
 },
 "budapest": {
  "source": "eurostat",
  "scope": "region",
  "geo": "HU11",
  "name": "Budapest",
  "years": {
   "2023": 3.9,
   "2024": 4.9,
   "2025": 3.3
  }
 },
 "praga": {
  "source": "eurostat",
  "scope": "region",
  "geo": "CZ01",
  "name": "Praha",
  "years": {
   "2022": 6.1,
   "2023": 3.5,
   "2024": 2.1
  }
 },
 "la-haya": {
  "source": "eurostat",
  "scope": "region",
  "geo": "NL36",
  "name": "Zuid-Holland",
  "years": {
   "2023": 3.4,
   "2024": 3.5,
   "2025": 3.9
  }
 },
 "rotterdam": {
  "source": "eurostat",
  "scope": "region",
  "geo": "NL36",
  "name": "Zuid-Holland",
  "years": {
   "2023": 3.4,
   "2024": 3.5,
   "2025": 3.9
  }
 },
 "munich": {
  "source": "eurostat",
  "scope": "region",
  "geo": "DE21",
  "name": "Oberbayern",
  "years": {
   "2023": 5.2,
   "2024": 5,
   "2025": 5
  }
 },
 "berlin": {
  "source": "eurostat",
  "scope": "region",
  "geo": "DE30",
  "name": "Berlin",
  "years": {
   "2023": 12.5,
   "2024": 11.4,
   "2025": 12.3
  }
 },
 "lisboa": {
  "source": "eurostat",
  "scope": "region",
  "geo": "PT1A",
  "name": "Grande Lisboa",
  "years": {
   "2023": 7.8,
   "2024": 7.5,
   "2025": 6.7
  }
 },
 "oporto": {
  "source": "eurostat",
  "scope": "region",
  "geo": "PT11",
  "name": "Norte",
  "years": {
   "2023": 7.4,
   "2024": 7.4,
   "2025": 6.4
  }
 },
 "paris": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FR10",
  "name": "Ile-de-France",
  "years": {
   "2023": 8.7,
   "2024": 9.4,
   "2025": 10.4
  }
 },
 "londres": {
  "source": "ilo",
  "scope": "country",
  "geo": "GBR",
  "years": {
   "2023": 12.8,
   "2024": 14.3,
   "2025": 14.4
  }
 },
 "amsterdam": {
  "source": "eurostat",
  "scope": "region",
  "geo": "NL32",
  "name": "Noord-Holland",
  "years": {
   "2023": 3.5,
   "2024": 3.2,
   "2025": 3.5
  }
 },
 "viena": {
  "source": "eurostat",
  "scope": "region",
  "geo": "AT13",
  "name": "Wien",
  "years": {
   "2023": 12.3,
   "2024": 12.9,
   "2025": 12.8
  }
 },
 "rosenheim": {
  "source": "eurostat",
  "scope": "region",
  "geo": "DE21",
  "name": "Oberbayern",
  "years": {
   "2023": 5.2,
   "2024": 5,
   "2025": 5
  }
 },
 "bruselas": {
  "source": "eurostat",
  "scope": "region",
  "geo": "BE10",
  "name": "Région de Bruxelles-Capitale/ Brussels Hoofdstedelijk Gewest",
  "years": {
   "2023": 8.6,
   "2024": 9,
   "2025": 9.5
  }
 },
 "estocolmo": {
  "source": "eurostat",
  "scope": "region",
  "geo": "SE11",
  "name": "Stockholm",
  "years": {
   "2023": 4.9,
   "2024": 5.1,
   "2025": 5
  }
 },
 "copenhague": {
  "source": "eurostat",
  "scope": "region",
  "geo": "DK01",
  "name": "Hovedstaden",
  "years": {
   "2023": 6.7,
   "2024": 5.7,
   "2025": 6
  }
 },
 "helsinki": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FI1B",
  "name": "Helsinki-Uusimaa",
  "years": {
   "2023": 7,
   "2024": 6.9,
   "2025": 8.5
  }
 },
 "oslo": {
  "source": "eurostat",
  "scope": "region",
  "geo": "NO08",
  "name": "Oslo og Viken",
  "years": {
   "2023": 5.4,
   "2024": 6,
   "2025": 5.9
  }
 },
 "reikiavik": {
  "source": "eurostat",
  "scope": "region",
  "geo": "IS00",
  "name": "Ísland",
  "years": {
   "2023": 3.8,
   "2024": 4,
   "2025": 4.1
  }
 },
 "dublin": {
  "source": "eurostat",
  "scope": "region",
  "geo": "IE06",
  "name": "Eastern and Midland",
  "years": {
   "2023": 6.8,
   "2024": 6.3,
   "2025": 6.9
  }
 },
 "edimburgo": {
  "source": "ilo",
  "scope": "country",
  "geo": "GBR",
  "years": {
   "2023": 12.8,
   "2024": 14.3,
   "2025": 14.4
  }
 },
 "atenas": {
  "source": "eurostat",
  "scope": "region",
  "geo": "EL30",
  "name": "Attiki",
  "years": {
   "2023": 10.4,
   "2024": 7.3,
   "2025": 7.5
  }
 },
 "zagreb": {
  "source": "eurostat",
  "scope": "region",
  "geo": "HR05",
  "name": "Grad Zagreb",
  "years": {
   "2023": 5.2,
   "2024": 3.4,
   "2025": 4.5
  }
 },
 "liubliana": {
  "source": "eurostat",
  "scope": "region",
  "geo": "SI04",
  "name": "Zahodna Slovenija",
  "years": {
   "2023": 5.8,
   "2024": 6.6,
   "2025": 5.4
  }
 },
 "tallin": {
  "source": "eurostat",
  "scope": "region",
  "geo": "EE00",
  "name": "Eesti",
  "years": {
   "2023": 9.6,
   "2024": 10.2,
   "2025": 10.9
  }
 },
 "vilna": {
  "source": "eurostat",
  "scope": "region",
  "geo": "LT01",
  "name": "Sostinės regionas",
  "years": {
   "2023": 10.6,
   "2024": 12.3,
   "2025": 8.1
  }
 },
 "riga": {
  "source": "eurostat",
  "scope": "region",
  "geo": "LV00",
  "name": "Latvija",
  "years": {
   "2023": 7.2,
   "2024": 9,
   "2025": 9.1
  }
 },
 "bratislava": {
  "source": "eurostat",
  "scope": "country",
  "geo": "SK",
  "years": {
   "2023": 8.9,
   "2024": 8.7,
   "2025": 8
  }
 },
 "bucarest": {
  "source": "eurostat",
  "scope": "region",
  "geo": "RO32",
  "name": "Bucureşti-Ilfov",
  "years": {
   "2023": 7.6,
   "2024": 7.8,
   "2025": 9.6
  }
 },
 "sofia": {
  "source": "eurostat",
  "scope": "region",
  "geo": "BG41",
  "name": "Yugozapaden",
  "years": {
   "2023": 5.8,
   "2024": 4.6,
   "2025": 4.6
  }
 },
 "ginebra": {
  "source": "eurostat",
  "scope": "region",
  "geo": "CH01",
  "name": "Région lémanique",
  "years": {
   "2023": 10.8,
   "2024": 12.8,
   "2025": 11.1
  }
 },
 "florencia": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITI1",
  "name": "Toscana",
  "years": {
   "2023": 8.3,
   "2024": 8.7,
   "2025": 8.2
  }
 },
 "hamburgo": {
  "source": "eurostat",
  "scope": "region",
  "geo": "DE60",
  "name": "Hamburg",
  "years": {
   "2023": 8.7,
   "2024": 8.5,
   "2025": 7.8
  }
 },
 "gante": {
  "source": "eurostat",
  "scope": "region",
  "geo": "BE23",
  "name": "Prov. Oost-Vlaanderen",
  "years": {
   "2023": 4.1,
   "2024": 6,
   "2025": 6.2
  }
 },
 "venecia": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITH3",
  "name": "Veneto",
  "years": {
   "2023": 8.5,
   "2024": 7.2,
   "2025": 6.9
  }
 },
 "lyon": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FRK2",
  "name": "Rhône-Alpes",
  "years": {
   "2023": 8.5,
   "2024": 9.1,
   "2025": 8.4
  }
 },
 "colonia": {
  "source": "eurostat",
  "scope": "region",
  "geo": "DEA2",
  "name": "Köln",
  "years": {
   "2023": 6.4,
   "2024": 6.8,
   "2025": 8.3
  }
 },
 "lovaina": {
  "source": "eurostat",
  "scope": "region",
  "geo": "BE24",
  "name": "Prov. Vlaams-Brabant",
  "years": {
   "2023": 6.3,
   "2024": 6.3,
   "2025": 6.1
  }
 },
 "utrecht": {
  "source": "eurostat",
  "scope": "region",
  "geo": "NL35",
  "name": "Utrecht",
  "years": {
   "2023": 2.6,
   "2024": 3,
   "2025": 3.2
  }
 },
 "lund": {
  "source": "eurostat",
  "scope": "region",
  "geo": "SE22",
  "name": "Sydsverige",
  "years": {
   "2023": 5,
   "2024": 5.5,
   "2025": 3.8
  }
 },
 "innsbruck": {
  "source": "eurostat",
  "scope": "region",
  "geo": "AT33",
  "name": "Tirol",
  "years": {
   "2023": 7.6,
   "2024": 5.6,
   "2025": 6.9
  }
 },
 "split": {
  "source": "eurostat",
  "scope": "region",
  "geo": "HR03",
  "name": "Jadranska Hrvatska",
  "years": {
   "2023": 10.5,
   "2024": 8.1,
   "2025": 9.2
  }
 },
 "salonica": {
  "source": "eurostat",
  "scope": "region",
  "geo": "EL52",
  "name": "Kentriki Makedonia",
  "years": {
   "2023": 10.2,
   "2024": 12.1,
   "2025": 9.9
  }
 },
 "napoles": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITF3",
  "name": "Campania",
  "years": {
   "2023": 21.8,
   "2024": 19.4,
   "2025": 16
  }
 },
 "groningen": {
  "source": "eurostat",
  "scope": "region",
  "geo": "NL11",
  "name": "Groningen",
  "years": {
   "2023": 3,
   "2024": 3.8,
   "2025": 3.9
  }
 },
 "coimbra": {
  "source": "eurostat",
  "scope": "region",
  "geo": "PT19",
  "name": "Centro (PT)",
  "years": {
   "2023": 7.3,
   "2024": 7.1,
   "2025": 6
  }
 },
 "uppsala": {
  "source": "eurostat",
  "scope": "region",
  "geo": "SE12",
  "name": "Östra Mellansverige",
  "years": {
   "2023": 5.5,
   "2024": 6.6,
   "2025": 5.8
  }
 },
 "friburgo": {
  "source": "eurostat",
  "scope": "region",
  "geo": "DE13",
  "name": "Freiburg",
  "years": {
   "2023": 6.2,
   "2024": 7.2,
   "2025": 7.7
  }
 },
 "nantes": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FRG0",
  "name": "Pays de la Loire",
  "years": {
   "2023": 8.7,
   "2024": 9.5,
   "2025": 10.1
  }
 },
 "wroclaw": {
  "source": "eurostat",
  "scope": "region",
  "geo": "PL51",
  "name": "Dolnośląskie",
  "years": {
   "2023": 5.1,
   "2024": 6.4,
   "2025": 6
  }
 },
 "cluj-napoca": {
  "source": "eurostat",
  "scope": "region",
  "geo": "RO11",
  "name": "Nord-Vest",
  "years": {
   "2023": 12.2,
   "2024": 14.5,
   "2025": 12.9
  }
 },
 "galway": {
  "source": "eurostat",
  "scope": "region",
  "geo": "IE04",
  "name": "Northern and Western",
  "years": {
   "2023": 5.4,
   "2024": 5.6,
   "2025": 6.7
  }
 },
 "lausana": {
  "source": "eurostat",
  "scope": "region",
  "geo": "CH01",
  "name": "Région lémanique",
  "years": {
   "2023": 10.8,
   "2024": 12.8,
   "2025": 11.1
  }
 },
 "malmo": {
  "source": "eurostat",
  "scope": "region",
  "geo": "SE22",
  "name": "Sydsverige",
  "years": {
   "2023": 5,
   "2024": 5.5,
   "2025": 3.8
  }
 },
 "aarhus": {
  "source": "eurostat",
  "scope": "region",
  "geo": "DK04",
  "name": "Midtjylland",
  "years": {
   "2023": 7.1,
   "2024": 7.1,
   "2025": 9.1
  }
 },
 "heidelberg": {
  "source": "eurostat",
  "scope": "region",
  "geo": "DE12",
  "name": "Karlsruhe",
  "years": {
   "2023": 5.8,
   "2024": 6.7,
   "2025": 7.4
  }
 },
 "toulouse": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FRJ2",
  "name": "Midi-Pyrénées",
  "years": {
   "2023": 9,
   "2024": 9.4,
   "2025": 7.8
  }
 },
 "burdeos": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FRI1",
  "name": "Aquitaine",
  "years": {
   "2023": 9.9,
   "2024": 8.7,
   "2025": 11.3
  }
 },
 "palermo": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITG1",
  "name": "Sicilia",
  "years": {
   "2023": 22.1,
   "2024": 19.5,
   "2025": 16.1
  }
 },
 "gdansk": {
  "source": "eurostat",
  "scope": "region",
  "geo": "PL63",
  "name": "Pomorskie",
  "years": {
   "2023": 8,
   "2024": 6.4,
   "2025": 8.6
  }
 },
 "nicosia": {
  "source": "eurostat",
  "scope": "region",
  "geo": "CY00",
  "name": "Kýpros",
  "years": {
   "2023": 11.4,
   "2024": 10.2,
   "2025": 9.4
  }
 },
 "la-valeta": {
  "source": "eurostat",
  "scope": "region",
  "geo": "MT00",
  "name": "Malta",
  "years": {
   "2023": 8.2,
   "2024": 7.6,
   "2025": 8.4
  }
 },
 "zurich": {
  "source": "eurostat",
  "scope": "region",
  "geo": "CH04",
  "name": "Zürich",
  "years": {
   "2023": 6.2,
   "2024": 10.6,
   "2025": 7.6
  }
 },
 "brno": {
  "source": "eurostat",
  "scope": "region",
  "geo": "CZ06",
  "name": "Jihovýchod",
  "years": {
   "2023": 5.2,
   "2024": 3.5,
   "2025": 4.1
  }
 },
 "estrasburgo": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FRF1",
  "name": "Alsace",
  "years": {
   "2023": 8.1,
   "2024": 7,
   "2025": 7.4
  }
 },
 "montpellier": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FRJ1",
  "name": "Languedoc-Roussillon",
  "years": {
   "2023": 11.6,
   "2024": 12,
   "2025": 12.7
  }
 },
 "marsella": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FRL0",
  "name": "Provence-Alpes-Côte d’Azur",
  "years": {
   "2023": 11.5,
   "2024": 9.9,
   "2025": 11.4
  }
 },
 "lille": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FRE1",
  "name": "Nord-Pas de Calais",
  "years": {
   "2023": 14.5,
   "2024": 13.8,
   "2025": 11.8
  }
 },
 "dresde": {
  "source": "eurostat",
  "scope": "country",
  "geo": "DE",
  "years": {
   "2023": 7.5,
   "2024": 7.7,
   "2025": 8.2
  }
 },
 "leipzig": {
  "source": "eurostat",
  "scope": "country",
  "geo": "DE",
  "years": {
   "2023": 7.5,
   "2024": 7.7,
   "2025": 8.2
  }
 },
 "tubinga": {
  "source": "eurostat",
  "scope": "region",
  "geo": "DE14",
  "name": "Tübingen",
  "years": {
   "2021": 5.6,
   "2023": 5.8,
   "2024": 6.3
  }
 },
 "poznan": {
  "source": "eurostat",
  "scope": "region",
  "geo": "PL41",
  "name": "Wielkopolskie",
  "years": {
   "2023": 7.9,
   "2024": 6.3,
   "2025": 8.1
  }
 },
 "katowice": {
  "source": "eurostat",
  "scope": "region",
  "geo": "PL22",
  "name": "Śląskie",
  "years": {
   "2023": 4.8,
   "2024": 5.2,
   "2025": 5.4
  }
 },
 "braga": {
  "source": "eurostat",
  "scope": "region",
  "geo": "PT11",
  "name": "Norte",
  "years": {
   "2023": 7.4,
   "2024": 7.4,
   "2025": 6.4
  }
 },
 "bari": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITF4",
  "name": "Puglia",
  "years": {
   "2023": 17.3,
   "2024": 17.1,
   "2025": 13.9
  }
 },
 "padua": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITH3",
  "name": "Veneto",
  "years": {
   "2023": 8.5,
   "2024": 7.2,
   "2025": 6.9
  }
 },
 "genova": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITC3",
  "name": "Liguria",
  "years": {
   "2023": 8.5,
   "2024": 10.5,
   "2025": 10.3
  }
 },
 "perugia": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITI2",
  "name": "Umbria",
  "years": {
   "2023": 7.7,
   "2024": 7.5,
   "2025": 5.9
  }
 },
 "manchester": {
  "source": "ilo",
  "scope": "country",
  "geo": "GBR",
  "years": {
   "2023": 12.8,
   "2024": 14.3,
   "2025": 14.4
  }
 },
 "glasgow": {
  "source": "ilo",
  "scope": "country",
  "geo": "GBR",
  "years": {
   "2023": 12.8,
   "2024": 14.3,
   "2025": 14.4
  }
 },
 "bristol": {
  "source": "ilo",
  "scope": "country",
  "geo": "GBR",
  "years": {
   "2023": 12.8,
   "2024": 14.3,
   "2025": 14.4
  }
 },
 "basilea": {
  "source": "eurostat",
  "scope": "region",
  "geo": "CH03",
  "name": "Nordwestschweiz",
  "years": {
   "2023": 7.4,
   "2024": 8.7,
   "2025": 8.5
  }
 },
 "berna": {
  "source": "eurostat",
  "scope": "region",
  "geo": "CH02",
  "name": "Espace Mittelland",
  "years": {
   "2023": 7.7,
   "2024": 8.7,
   "2025": 8.4
  }
 },
 "estambul": {
  "source": "eurostat",
  "scope": "region",
  "geo": "TR10",
  "name": "İstanbul",
  "years": {
   "2023": 15,
   "2024": 15.9,
   "2025": 16.6
  }
 },
 "pisa": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITI1",
  "name": "Toscana",
  "years": {
   "2023": 8.3,
   "2024": 8.7,
   "2025": 8.2
  }
 },
 "siena": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITI1",
  "name": "Toscana",
  "years": {
   "2023": 8.3,
   "2024": 8.7,
   "2025": 8.2
  }
 },
 "trieste": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITH4",
  "name": "Friuli-Venezia Giulia",
  "years": {
   "2023": 8.1,
   "2024": 8.1,
   "2025": 6.6
  }
 },
 "parma": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITH5",
  "name": "Emilia-Romagna",
  "years": {
   "2023": 9,
   "2024": 7.4,
   "2025": 6.5
  }
 },
 "bergamo": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITC4",
  "name": "Lombardia",
  "years": {
   "2023": 9.1,
   "2024": 8.9,
   "2025": 6.3
  }
 },
 "ferrara": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITH5",
  "name": "Emilia-Romagna",
  "years": {
   "2023": 9,
   "2024": 7.4,
   "2025": 6.5
  }
 },
 "urbino": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITI3",
  "name": "Marche",
  "years": {
   "2023": 7.8,
   "2024": 8.2,
   "2025": 9
  }
 },
 "lecce": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITF4",
  "name": "Puglia",
  "years": {
   "2023": 17.3,
   "2024": 17.1,
   "2025": 13.9
  }
 },
 "catania": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITG1",
  "name": "Sicilia",
  "years": {
   "2023": 22.1,
   "2024": 19.5,
   "2025": 16.1
  }
 },
 "cagliari": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITG2",
  "name": "Sardegna",
  "years": {
   "2023": 17.3,
   "2024": 12,
   "2025": 11.2
  }
 },
 "maastricht": {
  "source": "eurostat",
  "scope": "region",
  "geo": "NL42",
  "name": "Limburg (NL)",
  "years": {
   "2023": 4.3,
   "2024": 4.5,
   "2025": 4.2
  }
 },
 "grenoble": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FRK2",
  "name": "Rhône-Alpes",
  "years": {
   "2023": 8.5,
   "2024": 9.1,
   "2025": 8.4
  }
 },
 "verona": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITH3",
  "name": "Veneto",
  "years": {
   "2023": 8.5,
   "2024": 7.2,
   "2025": 6.9
  }
 },
 "gotemburgo": {
  "source": "eurostat",
  "scope": "region",
  "geo": "SE23",
  "name": "Västsverige",
  "years": {
   "2023": 6,
   "2024": 5.2,
   "2025": 4.8
  }
 },
 "liverpool": {
  "source": "ilo",
  "scope": "country",
  "geo": "GBR",
  "years": {
   "2023": 12.8,
   "2024": 14.3,
   "2025": 14.4
  }
 },
 "leeds": {
  "source": "ilo",
  "scope": "country",
  "geo": "GBR",
  "years": {
   "2023": 12.8,
   "2024": 14.3,
   "2025": 14.4
  }
 },
 "turku": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FI1C",
  "name": "Etelä-Suomi",
  "years": {
   "2023": 6.7,
   "2024": 9.5,
   "2025": 9.9
  }
 },
 "rennes": {
  "source": "eurostat",
  "scope": "region",
  "geo": "FRH0",
  "name": "Bretagne",
  "years": {
   "2023": 10.4,
   "2024": 9.5,
   "2025": 8.1
  }
 },
 "pecs": {
  "source": "eurostat",
  "scope": "region",
  "geo": "HU23",
  "name": "Dél-Dunántúl",
  "years": {
   "2023": 13.3,
   "2024": 15.2,
   "2025": 13.4
  }
 },
 "kaunas": {
  "source": "eurostat",
  "scope": "region",
  "geo": "LT02",
  "name": "Vidurio ir vakarų Lietuvos regionas ",
  "years": {
   "2023": 14.6,
   "2024": 16,
   "2025": 15
  }
 },
 "sao-paulo": {
  "source": "ilo",
  "scope": "country",
  "geo": "BRA",
  "years": {
   "2023": 20.6,
   "2024": 19.3,
   "2025": 18.7
  }
 },
 "rio-de-janeiro": {
  "source": "ilo",
  "scope": "country",
  "geo": "BRA",
  "years": {
   "2023": 20.6,
   "2024": 19.3,
   "2025": 18.7
  }
 },
 "florianopolis": {
  "source": "ilo",
  "scope": "country",
  "geo": "BRA",
  "years": {
   "2023": 20.6,
   "2024": 19.3,
   "2025": 18.7
  }
 },
 "cartagena-de-indias": {
  "source": "ilo",
  "scope": "country",
  "geo": "COL",
  "years": {
   "2023": 23.3,
   "2024": 23.2,
   "2025": 22
  }
 },
 "cusco": {
  "source": "ilo",
  "scope": "country",
  "geo": "PER",
  "years": {
   "2020": 25.7,
   "2021": 22.7,
   "2022": 22.8
  }
 },
 "nueva-york": {
  "source": "ilo",
  "scope": "country",
  "geo": "USA",
  "years": {
   "2023": 11.2,
   "2024": 11.6,
   "2025": 11.6
  }
 },
 "boston": {
  "source": "ilo",
  "scope": "country",
  "geo": "USA",
  "years": {
   "2023": 11.2,
   "2024": 11.6,
   "2025": 11.6
  }
 },
 "chicago": {
  "source": "ilo",
  "scope": "country",
  "geo": "USA",
  "years": {
   "2023": 11.2,
   "2024": 11.6,
   "2025": 11.6
  }
 },
 "los-angeles": {
  "source": "ilo",
  "scope": "country",
  "geo": "USA",
  "years": {
   "2023": 11.2,
   "2024": 11.6,
   "2025": 11.6
  }
 },
 "san-francisco": {
  "source": "ilo",
  "scope": "country",
  "geo": "USA",
  "years": {
   "2023": 11.2,
   "2024": 11.6,
   "2025": 11.6
  }
 },
 "lima": {
  "source": "ilo",
  "scope": "country",
  "geo": "PER",
  "years": {
   "2020": 25.7,
   "2021": 22.7,
   "2022": 22.8
  }
 },
 "ciudad-de-panama": {
  "source": "ilo",
  "scope": "country",
  "geo": "PAN",
  "years": {
   "2023": 15.1,
   "2024": 14.7,
   "2025": 15.1
  }
 },
 "san-jose-costa-rica": {
  "source": "ilo",
  "scope": "country",
  "geo": "CRI",
  "years": {
   "2023": 20.9,
   "2024": 18.3,
   "2025": 19.4
  }
 },
 "montevideo": {
  "source": "ilo",
  "scope": "country",
  "geo": "URY",
  "years": {
   "2023": 14.9,
   "2024": 14,
   "2025": 12.6
  }
 },
 "quito": {
  "source": "ilo",
  "scope": "country",
  "geo": "ECU",
  "years": {
   "2023": 18.6,
   "2024": 19,
   "2025": 17.7
  }
 },
 "miami": {
  "source": "ilo",
  "scope": "country",
  "geo": "USA",
  "years": {
   "2023": 11.2,
   "2024": 11.6,
   "2025": 11.6
  }
 },
 "toronto": {
  "source": "ilo",
  "scope": "country",
  "geo": "CAN",
  "years": {
   "2023": 11.7,
   "2024": 13,
   "2025": 13.3
  }
 },
 "vancouver": {
  "source": "ilo",
  "scope": "country",
  "geo": "CAN",
  "years": {
   "2023": 11.7,
   "2024": 13,
   "2025": 13.3
  }
 },
 "montreal": {
  "source": "ilo",
  "scope": "country",
  "geo": "CAN",
  "years": {
   "2023": 11.7,
   "2024": 13,
   "2025": 13.3
  }
 },
 "ciudad-de-mexico": {
  "source": "ilo",
  "scope": "country",
  "geo": "MEX",
  "years": {
   "2023": 15.9,
   "2024": 15.9,
   "2025": 16.2
  }
 },
 "guadalajara": {
  "source": "ilo",
  "scope": "country",
  "geo": "MEX",
  "years": {
   "2023": 15.9,
   "2024": 15.9,
   "2025": 16.2
  }
 },
 "austin": {
  "source": "ilo",
  "scope": "country",
  "geo": "USA",
  "years": {
   "2023": 11.2,
   "2024": 11.6,
   "2025": 11.6
  }
 },
 "seattle": {
  "source": "ilo",
  "scope": "country",
  "geo": "USA",
  "years": {
   "2023": 11.2,
   "2024": 11.6,
   "2025": 11.6
  }
 },
 "washington": {
  "source": "ilo",
  "scope": "country",
  "geo": "USA",
  "years": {
   "2023": 11.2,
   "2024": 11.6,
   "2025": 11.6
  }
 },
 "nueva-orleans": {
  "source": "ilo",
  "scope": "country",
  "geo": "USA",
  "years": {
   "2023": 11.2,
   "2024": 11.6,
   "2025": 11.6
  }
 },
 "ann-arbor": {
  "source": "ilo",
  "scope": "country",
  "geo": "USA",
  "years": {
   "2023": 11.2,
   "2024": 11.6,
   "2025": 11.6
  }
 },
 "quebec": {
  "source": "ilo",
  "scope": "country",
  "geo": "CAN",
  "years": {
   "2023": 11.7,
   "2024": 13,
   "2025": 13.3
  }
 },
 "ottawa": {
  "source": "ilo",
  "scope": "country",
  "geo": "CAN",
  "years": {
   "2023": 11.7,
   "2024": 13,
   "2025": 13.3
  }
 },
 "san-diego": {
  "source": "ilo",
  "scope": "country",
  "geo": "USA",
  "years": {
   "2023": 11.2,
   "2024": 11.6,
   "2025": 11.6
  }
 },
 "monterrey": {
  "source": "ilo",
  "scope": "country",
  "geo": "MEX",
  "years": {
   "2023": 15.9,
   "2024": 15.9,
   "2025": 16.2
  }
 },
 "la-paz": {
  "source": "ilo",
  "scope": "country",
  "geo": "BOL",
  "years": {
   "2023": 9.6,
   "2024": 8,
   "2025": 8
  }
 },
 "asuncion": {
  "source": "ilo",
  "scope": "country",
  "geo": "PRY",
  "years": {
   "2015": 17.5,
   "2016": 18.6,
   "2017": 18.6
  }
 },
 "ciudad-de-guatemala": {
  "source": "ilo",
  "scope": "country",
  "geo": "GTM",
  "years": {
   "2023": 23.8,
   "2024": 24,
   "2025": 22.3
  }
 },
 "san-salvador": {
  "source": "ilo",
  "scope": "country",
  "geo": "SLV",
  "years": {
   "2023": 21.5,
   "2024": 20.5,
   "2025": 19.1
  }
 },
 "santo-domingo": {
  "source": "ilo",
  "scope": "country",
  "geo": "DOM",
  "years": {
   "2023": 25.7,
   "2024": 25.7,
   "2025": 24.7
  }
 },
 "buenos-aires": {
  "source": "ilo",
  "scope": "country",
  "geo": "ARG",
  "years": {
   "2023": 15,
   "2024": 16.3,
   "2025": 15.2
  }
 },
 "cordoba-argentina": {
  "source": "ilo",
  "scope": "country",
  "geo": "ARG",
  "years": {
   "2023": 15,
   "2024": 16.3,
   "2025": 15.2
  }
 },
 "santiago-de-chile": {
  "source": "ilo",
  "scope": "country",
  "geo": "CHL",
  "years": {
   "2023": 15.3,
   "2024": 13.8,
   "2025": 13.4
  }
 },
 "bogota": {
  "source": "ilo",
  "scope": "country",
  "geo": "COL",
  "years": {
   "2023": 23.3,
   "2024": 23.2,
   "2025": 22
  }
 },
 "medellin": {
  "source": "ilo",
  "scope": "country",
  "geo": "COL",
  "years": {
   "2023": 23.3,
   "2024": 23.2,
   "2025": 22
  }
 },
 "caserta": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITF3",
  "name": "Campania",
  "years": {
   "2023": 21.8,
   "2024": 19.4,
   "2025": 16
  }
 },
 "covilha": {
  "source": "eurostat",
  "scope": "region",
  "geo": "PT19",
  "name": "Centro (PT)",
  "years": {
   "2023": 7.3,
   "2024": 7.1,
   "2025": 6
  }
 },
 "cosenza": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITF6",
  "name": "Calabria",
  "years": {
   "2023": 18.8,
   "2024": 19.3,
   "2025": 12
  }
 },
 "modena": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITH5",
  "name": "Emilia-Romagna",
  "years": {
   "2023": 9,
   "2024": 7.4,
   "2025": 6.5
  }
 },
 "trento": {
  "source": "eurostat",
  "scope": "region",
  "geo": "ITH2",
  "name": "Provincia Autonoma di Trento",
  "years": {
   "2023": 8.8,
   "2024": 6.9,
   "2025": 5.8
  }
 }
};
