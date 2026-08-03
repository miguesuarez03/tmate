import { useState, useCallback, useRef, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { useNavigate } from "react-router-dom";
import styles from "./WorldMap.module.css";
import { getOverallScore, CITY_BASE_SCORES, getCityBySlug } from "../lib/cities";
import { IconFiesta, IconEdificio, IconBeca, IconGlobo } from "./icons";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ─── CITIES del mapa — coords y datos estáticos ──────────────────────────────
// El score se calcula dinámicamente con getOverallScore() para mantener
// consistencia con la página de detalle de cada ciudad.
const CITIES = [
  { slug: "bolonia",   name: "Bolonia",   country: "Italia",       flag: "🇮🇹", coords: [11.34, 44.49], cost: "600–900€"   },
  { slug: "milan",     name: "Milán",     country: "Italia",       flag: "🇮🇹", coords: [9.19,  45.46], cost: "750–1.100€" },
  { slug: "roma",      name: "Roma",      country: "Italia",       flag: "🇮🇹", coords: [12.49, 41.90], cost: "650–950€"   },
  { slug: "turin",     name: "Turín",     country: "Italia",       flag: "🇮🇹", coords: [7.68,  45.07], cost: "500–750€"   },
  { slug: "cracovia",  name: "Cracovia",  country: "Polonia",      flag: "🇵🇱", coords: [19.94, 50.06], cost: "350–550€"   },
  { slug: "varsovia",  name: "Varsovia",  country: "Polonia",      flag: "🇵🇱", coords: [21.01, 52.23], cost: "450–700€"   },
  { slug: "budapest",  name: "Budapest",  country: "Hungría",      flag: "🇭🇺", coords: [19.04, 47.50], cost: "380–600€"   },
  { slug: "praga",     name: "Praga",     country: "Rep. Checa",   flag: "🇨🇿", coords: [14.42, 50.08], cost: "450–700€"   },
  { slug: "la-haya",   name: "La Haya",   country: "Países Bajos", flag: "🇳🇱", coords: [4.30,  52.07], cost: "700–1.000€" },
  { slug: "rotterdam", name: "Rotterdam", country: "Países Bajos", flag: "🇳🇱", coords: [4.48,  51.92], cost: "700–1.000€" },
  { slug: "munich",    name: "Múnich",    country: "Alemania",     flag: "🇩🇪", coords: [11.58, 48.14], cost: "800–1.100€" },
  { slug: "berlin",    name: "Berlín",    country: "Alemania",     flag: "🇩🇪", coords: [13.40, 52.52], cost: "600–900€"   },
  { slug: "lisboa",    name: "Lisboa",    country: "Portugal",     flag: "🇵🇹", coords: [-9.14, 38.71], cost: "550–850€"   },
  { slug: "oporto",    name: "Oporto",    country: "Portugal",     flag: "🇵🇹", coords: [-8.61, 41.15], cost: "450–700€"   },
  { slug: "paris",     name: "París",     country: "Francia",      flag: "🇫🇷", coords: [2.35,  48.85], cost: "800–1.200€" },
  { slug: "londres",   name: "Londres",   country: "Reino Unido",  flag: "🇬🇧", coords: [-0.12, 51.51], cost: "950–1.400€" },
  { slug: "amsterdam", name: "Ámsterdam", country: "Países Bajos", flag: "🇳🇱", coords: [4.90,  52.37], cost: "750–1.100€" },
  { slug: "viena",     name: "Viena",     country: "Austria",      flag: "🇦🇹", coords: [16.37, 48.21], cost: "650–950€"   },
  { slug: "rosenheim", name: "Rosenheim", country: "Alemania",     flag: "🇩🇪", coords: [12.12, 47.85], cost: "550–800€"   },
  { slug: "bruselas",  name: "Bruselas",  country: "Bélgica",      flag: "🇧🇪", coords: [4.35,  50.85], cost: "600–900€"   },
  { slug: "estocolmo", name: "Estocolmo", country: "Suecia",       flag: "🇸🇪", coords: [18.07, 59.33], cost: "850–1.200€" },
  { slug: "copenhague", name: "Copenhague", country: "Dinamarca", flag: "🇩🇰", coords: [12.57, 55.68], cost: "900–1.300€" },
  { slug: "helsinki",   name: "Helsinki",   country: "Finlandia", flag: "🇫🇮", coords: [24.94, 60.17], cost: "800–1.150€" },
  { slug: "oslo",       name: "Oslo",       country: "Noruega",   flag: "🇳🇴", coords: [10.75, 59.91], cost: "950–1.350€" },
  { slug: "reikiavik",  name: "Reikiavik",  country: "Islandia",  flag: "🇮🇸", coords: [-21.94, 64.15], cost: "900–1.300€" },
  { slug: "dublin",     name: "Dublín",     country: "Irlanda",   flag: "🇮🇪", coords: [-6.27, 53.35], cost: "1.000–1.400€" },
  { slug: "edimburgo",  name: "Edimburgo",  country: "Reino Unido", flag: "🏴", coords: [-3.19, 55.95], cost: "1.000–1.400€" },
  { slug: "atenas",     name: "Atenas",     country: "Grecia",    flag: "🇬🇷", coords: [23.73, 37.98], cost: "500–800€" },
  { slug: "zagreb",     name: "Zagreb",     country: "Croacia",   flag: "🇭🇷", coords: [15.98, 45.81], cost: "450–700€" },
  { slug: "liubliana",  name: "Liubliana",  country: "Eslovenia", flag: "🇸🇮", coords: [14.51, 46.06], cost: "500–750€" },
  { slug: "tallin",     name: "Tallin",     country: "Estonia",   flag: "🇪🇪", coords: [24.75, 59.44], cost: "500–800€" },
  { slug: "vilna",      name: "Vilna",      country: "Lituania",  flag: "🇱🇹", coords: [25.28, 54.69], cost: "500–750€" },
  { slug: "riga",       name: "Riga",       country: "Letonia",   flag: "🇱🇻", coords: [24.11, 56.95], cost: "500–750€" },
  { slug: "bratislava", name: "Bratislava", country: "Eslovaquia", flag: "🇸🇰", coords: [17.11, 48.15], cost: "500–750€" },
  { slug: "bucarest",   name: "Bucarest",   country: "Rumanía",   flag: "🇷🇴", coords: [26.10, 44.43], cost: "400–650€" },
  { slug: "sofia",      name: "Sofía",      country: "Bulgaria",  flag: "🇧🇬", coords: [23.32, 42.70], cost: "400–600€" },
  { slug: "ginebra",    name: "Ginebra",    country: "Suiza",     flag: "🇨🇭", coords: [6.14, 46.20],  cost: "1.100–1.600€" },
  { slug: "florencia",  name: "Florencia",  country: "Italia",    flag: "🇮🇹", coords: [11.26, 43.77], cost: "650–950€" },
  { slug: "hamburgo",   name: "Hamburgo",   country: "Alemania",  flag: "🇩🇪", coords: [9.99, 53.55],  cost: "750–1.050€" },
  { slug: "gante",      name: "Gante",      country: "Bélgica",   flag: "🇧🇪", coords: [3.72, 51.05],  cost: "600–850€" },
  { slug: "venecia",    name: "Venecia",    country: "Italia",   flag: "🇮🇹", coords: [12.34, 45.44], cost: "700–1.050€" },
  { slug: "lyon",       name: "Lyon",       country: "Francia",  flag: "🇫🇷", coords: [4.84, 45.76],  cost: "650–950€" },
  { slug: "colonia",    name: "Colonia",    country: "Alemania", flag: "🇩🇪", coords: [6.96, 50.94],  cost: "650–950€" },
  { slug: "lovaina",    name: "Lovaina",    country: "Bélgica",  flag: "🇧🇪", coords: [4.70, 50.88],  cost: "600–850€" },
  { slug: "utrecht",    name: "Utrecht",    country: "Países Bajos", flag: "🇳🇱", coords: [5.12, 52.09], cost: "800–1.100€" },
  { slug: "lund",       name: "Lund",       country: "Suecia",   flag: "🇸🇪", coords: [13.19, 55.70], cost: "750–1.050€" },
  { slug: "innsbruck",  name: "Innsbruck",  country: "Austria",  flag: "🇦🇹", coords: [11.40, 47.27], cost: "700–1.000€" },
  { slug: "split",      name: "Split",      country: "Croacia",  flag: "🇭🇷", coords: [16.44, 43.51], cost: "500–750€" },
  { slug: "salonica",   name: "Salónica",   country: "Grecia",   flag: "🇬🇷", coords: [22.94, 40.64], cost: "450–700€" },
  { slug: "napoles",    name: "Nápoles",    country: "Italia",   flag: "🇮🇹", coords: [14.25, 40.85], cost: "550–800€" },
  { slug: "groningen",  name: "Groningen",  country: "Países Bajos", flag: "🇳🇱", coords: [6.57, 53.22], cost: "650–950€" },
  { slug: "coimbra",    name: "Coimbra",    country: "Portugal", flag: "🇵🇹", coords: [-8.43, 40.21], cost: "400–650€" },
  { slug: "uppsala",    name: "Uppsala",    country: "Suecia",   flag: "🇸🇪", coords: [17.64, 59.86], cost: "750–1.050€" },
  { slug: "friburgo",   name: "Friburgo",   country: "Alemania", flag: "🇩🇪", coords: [7.85, 47.99],  cost: "700–1.000€" },
  { slug: "nantes",     name: "Nantes",     country: "Francia",  flag: "🇫🇷", coords: [-1.55, 47.22], cost: "600–900€" },
  { slug: "wroclaw",    name: "Breslavia",  country: "Polonia",  flag: "🇵🇱", coords: [17.03, 51.11], cost: "450–700€" },
  { slug: "cluj-napoca",name: "Cluj-Napoca",country: "Rumanía",  flag: "🇷🇴", coords: [23.60, 46.77], cost: "400–650€" },
  { slug: "galway",     name: "Galway",     country: "Irlanda",  flag: "🇮🇪", coords: [-9.05, 53.27], cost: "750–1.050€" },
  { slug: "lausana",    name: "Lausana",    country: "Suiza",    flag: "🇨🇭", coords: [6.63, 46.52],  cost: "1.000–1.400€" },
  { slug: "malmo",      name: "Malmö",      country: "Suecia",   flag: "🇸🇪", coords: [13.00, 55.60], cost: "700–1.000€" },
  { slug: "aarhus",     name: "Aarhus",     country: "Dinamarca", flag: "🇩🇰", coords: [10.20, 56.16], cost: "800–1.150€" },
  { slug: "heidelberg", name: "Heidelberg", country: "Alemania", flag: "🇩🇪", coords: [8.69, 49.41],  cost: "700–1.000€" },
  { slug: "toulouse",   name: "Toulouse",   country: "Francia",  flag: "🇫🇷", coords: [1.44, 43.60],  cost: "600–900€" },
  { slug: "burdeos",    name: "Burdeos",    country: "Francia",  flag: "🇫🇷", coords: [-0.58, 44.84], cost: "700–1.000€" },
  { slug: "palermo",    name: "Palermo",    country: "Italia",   flag: "🇮🇹", coords: [13.36, 38.12], cost: "450–700€" },
  { slug: "gdansk",     name: "Gdansk",     country: "Polonia",  flag: "🇵🇱", coords: [18.65, 54.35], cost: "400–650€" },
  { slug: "nicosia",    name: "Nicosia",    country: "Chipre",   flag: "🇨🇾", coords: [33.37, 35.17], cost: "600–900€" },
  { slug: "la-valeta",  name: "La Valeta",  country: "Malta",    flag: "🇲🇹", coords: [14.51, 35.90], cost: "750–1.100€" },
  { slug: "zurich",     name: "Zúrich",     country: "Suiza",    flag: "🇨🇭", coords: [8.54, 47.37],  cost: "1.200–1.700€" },
  { slug: "brno",       name: "Brno",       country: "República Checa", flag: "🇨🇿", coords: [16.61, 49.20], cost: "300–500€" },
  { slug: "estrasburgo", name: "Estrasburgo", country: "Francia",  flag: "🇫🇷", coords: [7.75, 48.58],  cost: "650–950€" },
  { slug: "montpellier", name: "Montpellier", country: "Francia",  flag: "🇫🇷", coords: [3.88, 43.61],  cost: "550–850€" },
  { slug: "marsella",    name: "Marsella",    country: "Francia",  flag: "🇫🇷", coords: [5.37, 43.30],  cost: "550–850€" },
  { slug: "lille",       name: "Lille",       country: "Francia",  flag: "🇫🇷", coords: [3.06, 50.63],  cost: "550–800€" },
  { slug: "dresde",      name: "Dresde",      country: "Alemania", flag: "🇩🇪", coords: [13.74, 51.05], cost: "550–800€" },
  { slug: "leipzig",     name: "Leipzig",     country: "Alemania", flag: "🇩🇪", coords: [12.37, 51.34], cost: "550–850€" },
  { slug: "tubinga",     name: "Tubinga",     country: "Alemania", flag: "🇩🇪", coords: [9.06, 48.52],  cost: "700–1.000€" },
  { slug: "poznan",      name: "Poznan",      country: "Polonia",  flag: "🇵🇱", coords: [16.93, 52.41], cost: "400–650€" },
  { slug: "katowice",    name: "Katowice",    country: "Polonia",  flag: "🇵🇱", coords: [19.02, 50.26], cost: "400–600€" },
  { slug: "braga",       name: "Braga",       country: "Portugal", flag: "🇵🇹", coords: [-8.43, 41.55], cost: "400–650€" },
  { slug: "bari",        name: "Bari",        country: "Italia",   flag: "🇮🇹", coords: [16.87, 41.12], cost: "450–700€" },
  { slug: "padua",       name: "Padua",       country: "Italia",   flag: "🇮🇹", coords: [11.88, 45.41], cost: "550–800€" },
  { slug: "genova",      name: "Génova",      country: "Italia",   flag: "🇮🇹", coords: [8.93, 44.41],  cost: "550–850€" },
  { slug: "perugia",     name: "Perugia",     country: "Italia",   flag: "🇮🇹", coords: [12.39, 43.11], cost: "500–750€" },
  { slug: "manchester",  name: "Mánchester",  country: "Reino Unido", flag: "🇬🇧", coords: [-2.24, 53.48], cost: "800–1.150€" },
  { slug: "glasgow",     name: "Glasgow",     country: "Reino Unido", flag: "🏴", coords: [-4.25, 55.86], cost: "750–1.100€" },
  { slug: "bristol",     name: "Bristol",     country: "Reino Unido", flag: "🇬🇧", coords: [-2.59, 51.45], cost: "800–1.150€" },
  { slug: "basilea",     name: "Basilea",     country: "Suiza",    flag: "🇨🇭", coords: [7.59, 47.56],  cost: "1.100–1.550€" },
  { slug: "berna",       name: "Berna",       country: "Suiza",    flag: "🇨🇭", coords: [7.45, 46.95],  cost: "1.000–1.400€" },
  { slug: "estambul",    name: "Estambul",    country: "Turquía",  flag: "🇹🇷", coords: [28.98, 41.01], cost: "350–600€" },
  { slug: "pisa",        name: "Pisa",        country: "Italia",   flag: "🇮🇹", coords: [10.40, 43.72], cost: "500–750€" },
  { slug: "siena",       name: "Siena",       country: "Italia",   flag: "🇮🇹", coords: [11.33, 43.32], cost: "550–800€" },
  { slug: "trieste",     name: "Trieste",     country: "Italia",   flag: "🇮🇹", coords: [13.78, 45.65], cost: "500–750€" },
  { slug: "parma",       name: "Parma",       country: "Italia",   flag: "🇮🇹", coords: [10.33, 44.80], cost: "550–800€" },
  { slug: "bergamo",     name: "Bérgamo",     country: "Italia",   flag: "🇮🇹", coords: [9.67, 45.70],  cost: "550–800€" },
  { slug: "ferrara",     name: "Ferrara",     country: "Italia",   flag: "🇮🇹", coords: [11.62, 44.84], cost: "500–750€" },
  { slug: "urbino",      name: "Urbino",      country: "Italia",   flag: "🇮🇹", coords: [12.64, 43.73], cost: "450–700€" },
  { slug: "lecce",       name: "Lecce",       country: "Italia",   flag: "🇮🇹", coords: [18.17, 40.35], cost: "450–700€" },
  { slug: "catania",     name: "Catania",     country: "Italia",   flag: "🇮🇹", coords: [15.09, 37.50], cost: "450–700€" },
  { slug: "cagliari",    name: "Cagliari",    country: "Italia",   flag: "🇮🇹", coords: [9.11, 39.22],  cost: "500–800€" },
  { slug: "maastricht",  name: "Maastricht",  country: "Países Bajos", flag: "🇳🇱", coords: [5.69, 50.85], cost: "800–1.100€" },
  { slug: "grenoble",    name: "Grenoble",    country: "Francia",  flag: "🇫🇷", coords: [5.72, 45.19],  cost: "600–900€" },
  { slug: "verona",      name: "Verona",      country: "Italia",   flag: "🇮🇹", coords: [10.99, 45.44], cost: "600–900€" },
  { slug: "gotemburgo",  name: "Gotemburgo",  country: "Suecia",   flag: "🇸🇪", coords: [11.97, 57.71], cost: "800–1.150€" },
  { slug: "liverpool",   name: "Liverpool",   country: "Reino Unido", flag: "🇬🇧", coords: [-2.98, 53.41], cost: "700–1.050€" },
  { slug: "leeds",       name: "Leeds",       country: "Reino Unido", flag: "🇬🇧", coords: [-1.55, 53.80], cost: "750–1.100€" },
  { slug: "turku",       name: "Turku",       country: "Finlandia", flag: "🇫🇮", coords: [22.27, 60.45], cost: "700–1.000€" },
  { slug: "rennes",      name: "Rennes",      country: "Francia",  flag: "🇫🇷", coords: [-1.68, 48.11], cost: "550–850€" },
  { slug: "pecs",        name: "Pécs",        country: "Hungría",  flag: "🇭🇺", coords: [18.23, 46.07], cost: "350–550€" },
  { slug: "kaunas",      name: "Kaunas",      country: "Lituania", flag: "🇱🇹", coords: [23.90, 54.90], cost: "450–700€" },
  { slug: "nueva-york",   name: "Nueva York",   country: "Estados Unidos", flag: "🇺🇸", coords: [-74.01, 40.71], cost: "2.200–3.600€" },
  { slug: "boston",       name: "Boston",       country: "Estados Unidos", flag: "🇺🇸", coords: [-71.06, 42.36], cost: "1.900–2.900€" },
  { slug: "chicago",      name: "Chicago",      country: "Estados Unidos", flag: "🇺🇸", coords: [-87.63, 41.88], cost: "1.600–2.500€" },
  { slug: "los-angeles",  name: "Los Ángeles",  country: "Estados Unidos", flag: "🇺🇸", coords: [-118.24, 34.05], cost: "1.700–2.800€" },
  { slug: "san-francisco",name: "San Francisco",country: "Estados Unidos", flag: "🇺🇸", coords: [-122.42, 37.77], cost: "2.300–3.400€" },
  { slug: "miami",        name: "Miami",        country: "Estados Unidos", flag: "🇺🇸", coords: [-80.19, 25.76], cost: "1.300–1.900€" },
  { slug: "austin",       name: "Austin",       country: "Estados Unidos", flag: "🇺🇸", coords: [-97.74, 30.27], cost: "1.400–2.000€" },
  { slug: "seattle",      name: "Seattle",      country: "Estados Unidos", flag: "🇺🇸", coords: [-122.33, 47.61], cost: "1.650–2.600€" },
  { slug: "washington",   name: "Washington D.C.", country: "Estados Unidos", flag: "🇺🇸", coords: [-77.04, 38.91], cost: "2.000–2.900€" },
  { slug: "nueva-orleans",name: "Nueva Orleans",country: "Estados Unidos", flag: "🇺🇸", coords: [-90.07, 29.95], cost: "1.300–1.900€" },
  { slug: "ann-arbor",    name: "Ann Arbor",    country: "Estados Unidos", flag: "🇺🇸", coords: [-83.74, 42.28], cost: "900–1.400€" },
  { slug: "san-diego",    name: "San Diego",    country: "Estados Unidos", flag: "🇺🇸", coords: [-117.16, 32.72], cost: "1.200–1.800€" },
  { slug: "toronto",      name: "Toronto",      country: "Canadá", flag: "🇨🇦", coords: [-79.38, 43.65], cost: "1.300–1.800€" },
  { slug: "vancouver",    name: "Vancouver",    country: "Canadá", flag: "🇨🇦", coords: [-123.12, 49.28], cost: "1.350–1.850€" },
  { slug: "montreal",     name: "Montreal",     country: "Canadá", flag: "🇨🇦", coords: [-73.57, 45.50], cost: "1.000–1.450€" },
  { slug: "quebec",       name: "Quebec",       country: "Canadá", flag: "🇨🇦", coords: [-71.21, 46.81], cost: "700–1.100€" },
  { slug: "ottawa",       name: "Ottawa",       country: "Canadá", flag: "🇨🇦", coords: [-75.70, 45.42], cost: "850–1.300€" },
  { slug: "ciudad-de-mexico", name: "Ciudad de México", country: "México", flag: "🇲🇽", coords: [-99.13, 19.43], cost: "450–800€" },
  { slug: "guadalajara",  name: "Guadalajara",  country: "México", flag: "🇲🇽", coords: [-103.35, 20.68], cost: "450–700€" },
  { slug: "monterrey",    name: "Monterrey",    country: "México", flag: "🇲🇽", coords: [-100.32, 25.69], cost: "500–800€" },
  { slug: "buenos-aires", name: "Buenos Aires", country: "Argentina", flag: "🇦🇷", coords: [-58.38, -34.60], cost: "450–750€" },
  { slug: "cordoba-argentina", name: "Córdoba", country: "Argentina", flag: "🇦🇷", coords: [-64.18, -31.42], cost: "350–600€" },
  { slug: "santiago-de-chile", name: "Santiago de Chile", country: "Chile", flag: "🇨🇱", coords: [-70.65, -33.45], cost: "550–850€" },
  { slug: "bogota",       name: "Bogotá",       country: "Colombia", flag: "🇨🇴", coords: [-74.08, 4.71], cost: "400–700€" },
  { slug: "medellin",     name: "Medellín",     country: "Colombia", flag: "🇨🇴", coords: [-75.57, 6.25], cost: "400–650€" },
  { slug: "cartagena-de-indias", name: "Cartagena de Indias", country: "Colombia", flag: "🇨🇴", coords: [-75.51, 10.39], cost: "400–650€" },
  { slug: "lima",         name: "Lima",         country: "Perú", flag: "🇵🇪", coords: [-77.03, -12.05], cost: "450–750€" },
  { slug: "cusco",        name: "Cusco",        country: "Perú", flag: "🇵🇪", coords: [-71.97, -13.53], cost: "350–550€" },
  { slug: "ciudad-de-panama", name: "Ciudad de Panamá", country: "Panamá", flag: "🇵🇦", coords: [-79.52, 8.98], cost: "700–1.100€" },
  { slug: "san-jose-costa-rica", name: "San José", country: "Costa Rica", flag: "🇨🇷", coords: [-84.09, 9.93], cost: "650–1.000€" },
  { slug: "montevideo",   name: "Montevideo",   country: "Uruguay", flag: "🇺🇾", coords: [-56.19, -34.90], cost: "750–1.100€" },
  { slug: "quito",        name: "Quito",        country: "Ecuador", flag: "🇪🇨", coords: [-78.47, -0.18], cost: "400–700€" },
  { slug: "sao-paulo",    name: "São Paulo",    country: "Brasil", flag: "🇧🇷", coords: [-46.63, -23.55], cost: "500–800€" },
  { slug: "rio-de-janeiro", name: "Río de Janeiro", country: "Brasil", flag: "🇧🇷", coords: [-43.21, -22.91], cost: "500–800€" },
  { slug: "florianopolis",name: "Florianópolis",country: "Brasil", flag: "🇧🇷", coords: [-48.55, -27.60], cost: "450–700€" },
  { slug: "la-paz",       name: "La Paz",       country: "Bolivia", flag: "🇧🇴", coords: [-68.15, -16.50], cost: "300–480€" },
  { slug: "asuncion",     name: "Asunción",     country: "Paraguay", flag: "🇵🇾", coords: [-57.63, -25.30], cost: "350–550€" },
  { slug: "ciudad-de-guatemala", name: "Ciudad de Guatemala", country: "Guatemala", flag: "🇬🇹", coords: [-90.51, 14.63], cost: "450–700€" },
  { slug: "san-salvador", name: "San Salvador", country: "El Salvador", flag: "🇸🇻", coords: [-89.19, 13.69], cost: "500–750€" },
  { slug: "santo-domingo",name: "Santo Domingo",country: "República Dominicana", flag: "🇩🇴", coords: [-69.90, 18.49], cost: "500–800€" },
].map(city => ({
  ...city,
  img: getCityBySlug(city.slug)?.img ?? null,
  score: getOverallScore(city.slug),
  fiesta: CITY_BASE_SCORES[city.slug]?.vida_social ?? 7,
  cultura: CITY_BASE_SCORES[city.slug]?.estilo_vida ?? 7,
  economia: CITY_BASE_SCORES[city.slug]?.coste ?? 7,
  dinero: CITY_BASE_SCORES[city.slug]?.coste ?? 7,
}))

// ─── PAÍSES con coordenadas para zoom ─────────────────────────────────────────
const COUNTRY_ZOOM = {
  "Todos":         { coords: [-44.9, 22.9], zoom: 0.29 },
  "Italia":        { coords: [12.5, 42], zoom: 3.0 },
  "Alemania":      { coords: [10.5, 51], zoom: 3.2 },
  "Polonia":       { coords: [20, 52],   zoom: 3.5 },
  "Portugal":      { coords: [-8.5, 39], zoom: 3.8 },
  "Francia":       { coords: [2.5, 46],  zoom: 3.2 },
  "Reino Unido":   { coords: [-1, 52],   zoom: 3.5 },
  "Países Bajos":  { coords: [5, 52.3],  zoom: 4.5 },
  "Hungría":       { coords: [19, 47],   zoom: 4.5 },
  "Rep. Checa":    { coords: [15.5, 50], zoom: 4.5 },
  "Austria":       { coords: [14, 47.5], zoom: 4.5 },
  "Bélgica":       { coords: [4.5, 50.5],zoom: 5.5 },
  "Suiza":         { coords: [8.2, 46.8], zoom: 4.0 },
  "Estados Unidos": { coords: [-96, 38],   zoom: 1.2 },
  "Canadá":         { coords: [-90, 46],   zoom: 1.4 },
  "México":         { coords: [-101, 22],  zoom: 2.2 },
  "Argentina":      { coords: [-61, -33],  zoom: 2.5 },
  "Chile":          { coords: [-70.65, -33.45], zoom: 4.0 },
  "Colombia":       { coords: [-75, 5.5],  zoom: 3.0 },
  "Perú":           { coords: [-75, -12.5],zoom: 2.8 },
  "Panamá":         { coords: [-79.52, 8.98], zoom: 4.5 },
  "Costa Rica":     { coords: [-84.09, 9.93], zoom: 5.0 },
  "Uruguay":        { coords: [-56.19, -34.90], zoom: 4.5 },
  "Ecuador":        { coords: [-78.47, -0.18], zoom: 4.5 },
  "Brasil":         { coords: [-46, -25],  zoom: 2.5 },
  "Bolivia":        { coords: [-68.15, -16.50], zoom: 4.0 },
  "Paraguay":       { coords: [-57.63, -25.30], zoom: 4.5 },
  "Guatemala":      { coords: [-90.51, 14.63], zoom: 5.0 },
  "El Salvador":    { coords: [-89.19, 13.69], zoom: 5.5 },
  "República Dominicana": { coords: [-69.90, 18.49], zoom: 5.0 },
};

// ─── ETIQUETAS DE PAÍS ───────────────────────────────────────────────────────
const COUNTRY_LABELS = [
  { name: "Italia",       flag: "🇮🇹", coords: [12.5, 42.5] },
  { name: "Alemania",    flag: "🇩🇪", coords: [10.5, 51.2] },
  { name: "Polonia",     flag: "🇵🇱", coords: [19.5, 52.0] },
  { name: "Portugal",    flag: "🇵🇹", coords: [-8.0, 39.5] },
  { name: "Francia",     flag: "🇫🇷", coords: [2.5,  46.5] },
  { name: "Reino Unido", flag: "🇬🇧", coords: [-2.0, 53.5] },
  { name: "Países Bajos",flag: "🇳🇱", coords: [5.3,  52.3] },
  { name: "Hungría",     flag: "🇭🇺", coords: [19.0, 47.2] },
  { name: "Rep. Checa",  flag: "🇨🇿", coords: [15.5, 49.8] },
  { name: "Austria",     flag: "🇦🇹", coords: [14.0, 47.5] },
  { name: "Bélgica",     flag: "🇧🇪", coords: [4.5,  50.5] },
  { name: "Suiza",       flag: "🇨🇭", coords: [8.2,  46.8] },
  { name: "Estados Unidos", flag: "🇺🇸", coords: [-96, 38] },
  { name: "Canadá",         flag: "🇨🇦", coords: [-90, 55] },
  { name: "México",         flag: "🇲🇽", coords: [-101, 22] },
  { name: "Argentina",      flag: "🇦🇷", coords: [-61, -35] },
  { name: "Chile",          flag: "🇨🇱", coords: [-70.65, -33.45] },
  { name: "Colombia",       flag: "🇨🇴", coords: [-75, 5.5] },
  { name: "Perú",           flag: "🇵🇪", coords: [-75, -10] },
  { name: "Panamá",         flag: "🇵🇦", coords: [-79.52, 8.98] },
  { name: "Costa Rica",     flag: "🇨🇷", coords: [-84.09, 9.93] },
  { name: "Uruguay",        flag: "🇺🇾", coords: [-56.19, -34.90] },
  { name: "Ecuador",        flag: "🇪🇨", coords: [-78.47, -0.18] },
  { name: "Brasil",         flag: "🇧🇷", coords: [-48, -20] },
  { name: "Bolivia",        flag: "🇧🇴", coords: [-68.15, -16.50] },
  { name: "Paraguay",       flag: "🇵🇾", coords: [-57.63, -25.30] },
  { name: "Guatemala",      flag: "🇬🇹", coords: [-90.51, 14.63] },
  { name: "El Salvador",    flag: "🇸🇻", coords: [-89.19, 13.69] },
  { name: "República Dominicana", flag: "🇩🇴", coords: [-69.90, 18.49] },
];

// ─── FILTROS DE VIBE ──────────────────────────────────────────────────────────
const VIBE_FILTERS = [
  { key: "fiesta",   label: "Fiesta",   Icon: IconFiesta, desc: "Vida nocturna" },
  { key: "cultura",  label: "Cultura",  Icon: IconEdificio, desc: "Arte & historia" },
  { key: "barato",   label: "Barato",   Icon: IconBeca, desc: "Coste de vida bajo" },
];

const ALL_COUNTRIES = ["Todos", ...Array.from(new Set(CITIES.map(c => c.country))).sort()];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function scoreColor(score) {
  if (score >= 8.5) return "#22c55e";
  if (score >= 8)   return "#00bfa5";
  if (score >= 7)   return "#3b82f6";
  return "#f59e0b";
}
function scoreLabel(score) {
  if (score >= 8.5) return "Excelente";
  if (score >= 8)   return "Muy bueno";
  if (score >= 7)   return "Bueno";
  return "Regular";
}

// ─── POPUP ────────────────────────────────────────────────────────────────────
function CityPopup({ city, onClose, navigate }) {
  return (
    <div className={styles.popup} onClick={e => e.stopPropagation()}>
      <button className={styles.popupClose} onClick={onClose} aria-label="Cerrar">✕</button>
      <div className={styles.popupImg}>
        <img src={city.img} alt={`${city.name}, ${city.country}`} loading="lazy" />
        <div className={styles.popupImgOverlay} />
        <div className={styles.popupScore} style={{ color: scoreColor(city.score) }}>
          {city.score}<span>/10</span>
        </div>
        <span className={styles.popupFlag}>{city.flag}</span>
      </div>
      <div className={styles.popupBody}>
        <h3 className={styles.popupName}>{city.name}</h3>
        <p className={styles.popupCountry}>{city.country}</p>
        <div className={styles.popupVibes}>
          <span className={styles.popupVibe} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconFiesta size={16} /> {city.fiesta}/10</span>
          <span className={styles.popupVibe} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconEdificio size={16} /> {city.cultura}/10</span>
          <span className={styles.popupVibe} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconBeca size={16} /> {city.economia}/10</span>
        </div>
        <div className={styles.popupTags}>
          <span className={styles.popupTag} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconBeca size={16} /> {city.cost}/mes</span>
          <span className={styles.popupTagScore} style={{
            color: scoreColor(city.score),
            borderColor: scoreColor(city.score) + "55",
            background: scoreColor(city.score) + "15",
          }}>
            {scoreLabel(city.score)}
          </span>
        </div>
        <button className={styles.popupCta} onClick={() => navigate(`/city/${city.slug}`)}>
          Explorar guía →
        </button>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function WorldMap() {
  const navigate = useNavigate();
  const [selected, setSelected]   = useState(null);
  const [tooltip, setTooltip]     = useState(null);
  const [position, setPosition]   = useState({ coordinates: [-44.9, 22.9], zoom: 0.29 });
  const zoom = position.zoom;
  const [country, setCountry]     = useState("Todos");
  const [vibeFilter, setVibeFilter] = useState(null); // null | "fiesta"|"cultura"|"economia"|"dinero"
  const containerRef              = useRef(null);

  const handleMoveEnd = useCallback(pos => setPosition(pos), []);

  // Zoom al país al seleccionar
  useEffect(() => {
    const target = COUNTRY_ZOOM[country] || COUNTRY_ZOOM["Todos"];
    setPosition({ coordinates: target.coords, zoom: target.zoom });
    setSelected(null);
    setTooltip(null);
  }, [country]);

  // Filtrar ciudades según país y vibe
  const visibleCities = CITIES.filter(c => {
    if (country !== "Todos" && c.country !== country) return false;
    if (vibeFilter) {
      const val = vibeFilter === "barato"
        ? Math.round((c.economia + c.dinero) / 2)
        : c[vibeFilter];
      if (val < 7) return false;
    }
    return true;
  });

  const handlePinEnter = useCallback((city, e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ city, x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handlePinLeave = useCallback(() => setTooltip(null), []);

  const handlePinClick = useCallback((city, e) => {
    e.stopPropagation();
    setTooltip(null);
    setSelected(city);
  }, []);

  return (
    <div className={styles.mapWrapper} onClick={() => { setSelected(null); setTooltip(null); }}>
      <div className={styles.mapHeader}>
        <p className={styles.mapEyebrow}>Explora destinos</p>
        <h2 className={styles.mapTitle}>Encuentra tu ciudad Erasmus</h2>
        <p className={styles.mapSub}>Filtra por país o por lo que más te importa · Haz clic en un pin para ver la guía</p>
      </div>

      <div className={styles.mapContainer} ref={containerRef}>

        {/* ── FILTRO FLOTANTE ENCIMA DEL MAPA ── */}
        <div className={styles.mapFilters} onClick={e => e.stopPropagation()}>

          {/* Filtro por país */}
          <div className={styles.countryFilter}>
            <span className={styles.filterLabel} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IconGlobo size={18} /> País</span>
            <select
              className={styles.countrySelect}
              value={country}
              onChange={e => setCountry(e.target.value)}
            >
              {ALL_COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Separador */}
          <div className={styles.filterDivider} />

          {/* Filtros de vibe */}
          <div className={styles.vibeFilters}>
            {VIBE_FILTERS.map(f => (
              <button
                key={f.key}
                className={`${styles.vibeBtn} ${vibeFilter === f.key ? styles.vibeBtnActive : ""}`}
                onClick={() => setVibeFilter(v => v === f.key ? null : f.key)}
                title={f.desc}
              >
                <span style={{ display: "inline-flex" }}><f.Icon size={18} /></span>
                <span className={styles.vibeBtnLabel}>{f.label}</span>
              </button>
            ))}
          </div>

          {/* Contador de pins visibles */}
          {(country !== "Todos" || vibeFilter) && (
            <div className={styles.filterResult}>
              <span>{visibleCities.length} ciudad{visibleCities.length !== 1 ? "es" : ""}</span>
              <button className={styles.filterReset} onClick={() => { setCountry("Todos"); setVibeFilter(null); }}>
                ✕ Limpiar
              </button>
            </div>
          )}
        </div>

        {/* ── MAPA ── */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 800 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            onMoveEnd={handleMoveEnd}
            minZoom={0.22}
            maxZoom={14}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: "var(--map-land)", stroke: "var(--map-land-stroke)", strokeWidth: 0.4, outline: "none" },
                      hover:   { fill: "var(--map-land-hover)", stroke: "var(--map-land-stroke)", strokeWidth: 0.4, outline: "none" },
                      pressed: { fill: "var(--map-land-hover)", outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Etiquetas de país */}
            {COUNTRY_LABELS.map(c => {
              const base = 1 / zoom;
              const fontSize = Math.max(4, Math.min(10, base * 10));
              const emojiSize = Math.max(7, Math.min(18, base * 16));
              return (
                <Marker key={c.name} coordinates={c.coords} style={{ pointerEvents: "none" }}>
                  <text
                    textAnchor="middle"
                    y={0}
                    fontSize={emojiSize}
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {c.flag}
                  </text>
                  <text
                    textAnchor="middle"
                    y={emojiSize + 2}
                    fontSize={fontSize}
                    fill="var(--map-label)"
                    fontFamily="DM Sans, sans-serif"
                    fontWeight="600"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {c.name}
                  </text>
                </Marker>
              );
            })}

            {/* Pins de ciudades */}
            {CITIES.map(city => {
              const visible = visibleCities.some(c => c.slug === city.slug);
              const isSelected = selected?.slug === city.slug;
              // Nota: se mantiene como hex literal (no var()) porque más abajo
              // se concatena con sufijos de alpha ("20"/"55") — un custom
              // property ahí produciría un valor de color inválido.
              const color = visible ? scoreColor(city.score) : "#ccc";
              // Con 150 ciudades y un zoom por defecto muy alejado (vista mundial),
              // 1/zoom crecería sin control — se limita a 1 para que los pines no
              // se solapen ni tapen continentes enteros al entrar en la página.
              const base = Math.min(1 / zoom, 1);
              const r = isSelected ? base * 7 : (visible ? base * 4 : base * 2.5);

              return (
                <Marker
                  key={city.slug}
                  coordinates={city.coords}
                  onClick={visible ? e => handlePinClick(city, e) : undefined}
                  onMouseEnter={visible ? e => handlePinEnter(city, e) : undefined}
                  onMouseLeave={visible ? handlePinLeave : undefined}
                  style={{ cursor: visible ? "pointer" : "default" }}
                >
                  {/* Anillo exterior */}
                  <circle
                    r={r + 2}
                    fill={color + "20"}
                    stroke={visible ? color : "transparent"}
                    strokeWidth={isSelected ? 1.5 : 0.8}
                    style={{ transition: "all 0.2s ease" }}
                  />
                  {/* Punto central */}
                  <circle
                    r={r / 2}
                    fill={color}
                    opacity={visible ? 1 : 0.3}
                    style={{ transition: "all 0.2s ease" }}
                  />
                  {/* Emoji de bandera para ciudades seleccionadas o en zoom alto */}
                  {isSelected && (
                    <text
                      textAnchor="middle"
                      y={-10}
                      fontSize={10}
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {city.flag}
                    </text>
                  )}
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip hover */}
        {tooltip && !selected && (
          <div
            className={styles.tooltip}
            style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, calc(-100% - 16px))" }}
            onMouseEnter={() => setTooltip(null)}
          >
            <div className={styles.tooltipBody}>
              <span className={styles.tooltipFlag}>{tooltip.city.flag}</span>
              <div>
                <span className={styles.tooltipName}>{tooltip.city.name}</span>
                <span className={styles.tooltipCountry}>{tooltip.city.country}</span>
              </div>
              <span className={styles.tooltipScore} style={{ color: scoreColor(tooltip.city.score) }}>
                {tooltip.city.score}/10
              </span>
            </div>
            <div className={styles.tooltipVibes}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconFiesta size={14} /> {tooltip.city.fiesta}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconEdificio size={14} /> {tooltip.city.cultura}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconBeca size={14} /> {tooltip.city.economia}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><IconBeca size={14} /> {tooltip.city.dinero}</span>
            </div>
          </div>
        )}

        {/* Popup ciudad */}
        {selected && (
          <CityPopup city={selected} onClose={() => setSelected(null)} navigate={navigate} />
        )}

        {/* Controles zoom */}
        <div className={styles.zoomControls}>
          <button className={styles.zoomBtn} onClick={() => setPosition(p => ({ ...p, zoom: Math.min(p.zoom * 1.4, 14) }))} aria-label="Acercar">+</button>
          <button className={styles.zoomBtn} onClick={() => setPosition(p => ({ ...p, zoom: Math.max(p.zoom / 1.4, 1) }))} aria-label="Alejar">−</button>
        </div>

        <div className={styles.cityCount}>
          <span className={styles.cityCountDot} style={{ background: vibeFilter ? "#f59e0b" : "#00bfa5" }} />
          {visibleCities.length} de {CITIES.length} destinos
        </div>
      </div>
    </div>
  );
}
