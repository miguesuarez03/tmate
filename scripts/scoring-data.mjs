// ─────────────────────────────────────────────────────────────────────────────
// scripts/scoring-data.mjs — descarga los datos con fuente de la nota MAbroad
//
//   npm run scoring:data
//
// Escribe en src/data/scoring/ (ficheros que SÍ van a git, para que el build
// no dependa de la red y cada cambio de dato quede en un commit):
//
//   · universities.js  Universidades de cada ciudad en el THE World University
//                      Rankings (puesto, edición, estudiantes, % internacional).
//   · esn.js           Secciones ACTIVAS de Erasmus Student Network por ciudad.
//   · homicides.js     Tasa de homicidios por 100.000 hab. por país (UNODC,
//                      vía la API del Banco Mundial), últimos 3 años con dato.
//   · neet.js          Tasa NEET 15–24 de la región (Eurostat) o del país (OIT)
//                      de cada ciudad, últimos 3 años con dato.
//
// Qué se hace con cada dato y cómo se pasa a 0–10: docs/scoring.md y
// src/lib/scoring.js. La lista de universidades de cada ciudad (THE_NAMES) es
// la única decisión manual: son los nombres EXACTOS de la tabla de THE de las
// universidades de la ficha (cities.js) y de otras con sede en la misma ciudad.
// Si una universidad de la lista no sale en la edición actual (se ha retirado
// del ranking), se usa la edición más reciente en la que sí sale (2023–2026).
// Una entrada puede ser { name, satellite: true }: la universidad solo tiene en
// la ciudad un campus satélite pequeño. Cuenta para el nivel académico, pero sus
// estudiantes internacionales (cifra de toda la institución) no cuentan para la
// comunidad de la vida estudiantil (docs/scoring.md).
// ─────────────────────────────────────────────────────────────────────────────

import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CITIES } from "../src/data/cities.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "src", "data", "scoring");
const HEADER = (src) =>
  `// Generado por scripts/scoring-data.mjs (npm run scoring:data) — no editar a mano.\n// Fuente: ${src}\n// Descargado el ${new Date().toISOString().slice(0, 10)}.\n`;

export const THE_EDITION = 2027;
const THE_FALLBACK_EDITIONS = [2026, 2025, 2024, 2023];
const THE_URL = (y) => `https://www.timeshighereducation.com/json/ranking_tables/world_university_rankings/${y}`;
const ESN_URL = "https://accounts.esn.org/api/v2/sections";
const WB_URL = "https://api.worldbank.org/v2/country/all/indicator/VC.IHR.PSRC.P5?format=json&per_page=20000&date=2015:2026";
const UA = { "User-Agent": "Mozilla/5.0 (compatible; MAbroad-data/1.0)" };

/** País de cities.js → ISO (alpha-2 para ESN, alpha-3 para el Banco Mundial). */
export const COUNTRY_ISO = {
  "Italia": ["IT", "ITA"], "Francia": ["FR", "FRA"], "Alemania": ["DE", "DEU"], "Polonia": ["PL", "POL"],
  "Países Bajos": ["NL", "NLD"], "Suiza": ["CH", "CHE"], "Suecia": ["SE", "SWE"], "Reino Unido": ["GB", "GBR"],
  "Escocia (Reino Unido)": ["GB", "GBR"], "Canadá": ["CA", "CAN"], "Estados Unidos": ["US", "USA"],
  "Portugal": ["PT", "PRT"], "México": ["MX", "MEX"], "Colombia": ["CO", "COL"], "Bélgica": ["BE", "BEL"],
  "Brasil": ["BR", "BRA"], "Rumanía": ["RO", "ROU"], "República Checa": ["CZ", "CZE"], "Perú": ["PE", "PER"],
  "Lituania": ["LT", "LTU"], "Irlanda": ["IE", "IRL"], "Hungría": ["HU", "HUN"], "Grecia": ["GR", "GRC"],
  "Finlandia": ["FI", "FIN"], "Dinamarca": ["DK", "DNK"], "Croacia": ["HR", "HRV"], "Austria": ["AT", "AUT"],
  "Argentina": ["AR", "ARG"], "Uruguay": ["UY", "URY"], "Turquía": ["TR", "TUR"], "República Dominicana": ["DO", "DOM"],
  "Paraguay": ["PY", "PRY"], "Panamá": ["PA", "PAN"], "Noruega": ["NO", "NOR"], "Malta": ["MT", "MLT"],
  "Letonia": ["LV", "LVA"], "Islandia": ["IS", "ISL"], "Guatemala": ["GT", "GTM"], "Estonia": ["EE", "EST"],
  "Eslovenia": ["SI", "SVN"], "Eslovaquia": ["SK", "SVK"], "El Salvador": ["SV", "SLV"], "Ecuador": ["EC", "ECU"],
  "Costa Rica": ["CR", "CRI"], "Chipre": ["CY", "CYP"], "Chile": ["CL", "CHL"], "Bulgaria": ["BG", "BGR"],
  "Bolivia": ["BO", "BOL"],
  // Países de la fase 2 de la cola Loyola (base preparada antes que sus fichas).
  "Macedonia del Norte": ["MK", "MKD"], "India": ["IN", "IND"], "Corea del Sur": ["KR", "KOR"], "Japón": ["JP", "JPN"],
  "Taiwán": ["TW", "TWN"], "Filipinas": ["PH", "PHL"], "Australia": ["AU", "AUS"], "Marruecos": ["MA", "MAR"],
  "Burkina Faso": ["BF", "BFA"], "Costa de Marfil": ["CI", "CIV"], "Madagascar": ["MG", "MDG"], "Honduras": ["HN", "HND"],
  "Venezuela": ["VE", "VEN"],
};

/** Universidades de cada ciudad, con su nombre exacto en la tabla de THE
 *  (o { name, satellite: true } si en la ciudad solo hay un campus satélite pequeño). */
const THE_NAMES = {
  "bolonia": ["University of Bologna"],
  "milan": ["Politecnico di Milano", "University of Milan", "University of Milan-Bicocca"],
  "roma": ["Sapienza University of Rome", "Università Cattolica del Sacro Cuore", "University of Rome II – Tor Vergata", "Campus Bio-Medico University of Rome", "University of Rome III", "Rome Business School"],
  "turin": ["University of Turin", "Polytechnic University of Turin"],
  "cracovia": ["Jagiellonian University", "AGH University of Krakow", "PK Krakow University of Technology"],
  "varsovia": ["University of Warsaw", "Medical University of Warsaw", "SGH Warsaw School of Economics", "Warsaw University of Technology", "Warsaw University of Life Sciences – SGGW", "Cardinal Stefan Wyszyński University in Warsaw"],
  "budapest": ["Semmelweis University", "Eötvös Loránd University", "Corvinus University of Budapest", "Budapest University of Technology and Economics"],
  "praga": ["Charles University", "Czech University of Life Sciences Prague (CZU)", "Czech Technical University in Prague", "University of Chemistry and Technology, Prague", "Prague University of Economics and Business (VŠE)"],
  "la-haya": ["Leiden University"],
  "rotterdam": ["Erasmus University Rotterdam"],
  "munich": ["Technical University of Munich", "LMU Munich"],
  "berlin": ["Humboldt University of Berlin", "Charité – Universitätsmedizin Berlin", "Free University of Berlin", "Technical University of Berlin"],
  "lisboa": ["University of Lisbon", "NOVA University of Lisbon", "ISCTE-University Institute of Lisbon"],
  "oporto": ["University of Porto", "Polytechnic Institute of Porto"],
  "paris": ["Sorbonne University", "Paris Sciences et Lettres – PSL Research University Paris", "Institut Polytechnique de Paris", "Université Paris-Saclay", "Université Paris Cité", "Sciences Po", "Panthéon-Sorbonne University – Paris 1", "CY Cergy Paris University", "Université Sorbonne Nouvelle", "Paris Nanterre University"],
  "londres": ["Imperial College London", "UCL", "King’s College London", "London School of Economics and Political Science", "Queen Mary University of London", "Birkbeck, University of London", "City St George’s, University of London", "Brunel University of London", "Royal Holloway, University of London", "SOAS University of London", "Goldsmiths, University of London", "London South Bank University", "London Metropolitan University", "University of East London", "University of the Arts London", "University of West London", "Bloomsbury Institute London", "London Academy of Music and Dramatic Art (LAMDA)", "London Business School", "London Film School", "London School of Hygiene and Tropical Medicine", "Royal Central School of Speech and Drama, University of London"],
  "amsterdam": ["University of Amsterdam", "Vrije Universiteit Amsterdam"],
  "viena": ["University of Vienna", "Medical University of Vienna"],
  "rosenheim": [],
  "bruselas": ["Université Libre de Bruxelles", "Vrije Universiteit Brussel"],
  "estocolmo": ["Karolinska Institute", "KTH Royal Institute of Technology", "Stockholm University"],
  "copenhague": ["University of Copenhagen", "Technical University of Denmark"],
  "helsinki": ["University of Helsinki", "Aalto University"],
  "oslo": ["University of Oslo"],
  "reikiavik": ["University of Iceland", "Reykjavík University"],
  "dublin": ["Trinity College Dublin", "University College Dublin", "Dublin City University", "Technological University Dublin"],
  "edimburgo": ["University of Edinburgh", "Heriot-Watt University", "Edinburgh Napier University"],
  "atenas": ["National and Kapodistrian University of Athens", "Harokopio University of Athens", "National Technical University of Athens", "Athens University of Economics and Business"],
  "zagreb": ["University of Zagreb"],
  "liubliana": ["University of Ljubljana"],
  "tallin": ["Tallinn University of Technology", "Tallinn University"],
  "vilna": ["Vilnius University", "VILNIUS TECH (Vilnius Gediminas Technical University)"],
  "riga": ["Riga Technical University", "University of Latvia", "Riga Stradiņš University", "Riga Nordic University"],
  "bratislava": ["Comenius University Bratislava", "Slovak University of Technology in Bratislava", "University of Economics in Bratislava"],
  "bucarest": ["Bucharest University of Economic Studies", "University of Bucharest", "Polytechnic University of Bucharest", "University of Agronomic Sciences and Veterinary Medicine of Bucharest"],
  "sofia": ["Sofia University", "Technical University of Sofia"],
  "ginebra": ["University of Geneva"],
  "florencia": ["University of Florence"],
  "hamburgo": ["University of Hamburg", "Hamburg University of Technology"],
  "gante": ["Ghent University"],
  "venecia": ["Ca’ Foscari University of Venice"],
  "lyon": ["École Normale Supérieure de Lyon", "Claude Bernard University Lyon 1", "École Centrale de Lyon", "National Institute of Applied Sciences of Lyon (INSA Lyon)", "Jean Moulin University – Lyon 3"],
  "colonia": ["University of Cologne"],
  "lovaina": ["KU Leuven"],
  "utrecht": ["Utrecht University"],
  "lund": ["Lund University"],
  "innsbruck": ["Medical University of Innsbruck", "University of Innsbruck"],
  "split": ["University of Split"],
  "salonica": ["Aristotle University of Thessaloniki", "University of Macedonia"],
  "napoles": ["University of Naples Federico II", "Parthenope University of Naples"],
  "groningen": ["University of Groningen"],
  "coimbra": ["University of Coimbra"],
  "uppsala": ["Uppsala University"],
  "friburgo": ["University of Freiburg"],
  "nantes": ["Centrale Nantes", "Nantes Université"],
  "wroclaw": ["Wroclaw Medical University", "University of Wrocław", "Wrocław University of Science and Technology (Wrocław Tech)", "Wroclaw University of Economics and Business"],
  "cluj-napoca": ["Iuliu Haţieganu University of Medicine and Pharmacy Cluj-Napoca", "Babeş-Bolyai University", "USAMV Cluj-Napoca", "Technical University of Cluj-Napoca"],
  "galway": ["University of Galway", "Atlantic Technological University"],
  "lausana": ["École Polytechnique Fédérale de Lausanne", "University of Lausanne"],
  // La ficha de Malmö incluye Lund University (a 15 minutos en tren).
  "malmo": ["Lund University"],
  "aarhus": ["Aarhus University"],
  "heidelberg": ["Universität Heidelberg"],
  "toulouse": ["University of Toulouse"],
  "burdeos": ["University of Bordeaux"],
  "palermo": ["University of Palermo"],
  "gdansk": ["Gdańsk University of Technology", "Medical University of Gdańsk", "University of Gdańsk"],
  "nicosia": ["University of Cyprus", "University of Nicosia", "European University Cyprus"],
  "la-valeta": ["University of Malta"],
  "zurich": ["ETH Zurich", "University of Zurich", "ZHAW Zurich University of Applied Sciences"],
  "brno": ["Masaryk University", "Brno University of Technology", "Mendel University in Brno"],
  "estrasburgo": ["University of Strasbourg", "National Institute of Applied Sciences, Strasbourg (INSA Strasbourg)"],
  "montpellier": ["Montpellier University", "Paul-Valéry University, Montpellier 3"],
  "marsella": ["Aix-Marseille University"],
  "lille": ["University of Lille"],
  "dresde": ["TU Dresden"],
  "leipzig": [],
  "tubinga": ["University of Tübingen"],
  "poznan": ["Adam Mickiewicz University, Poznań", "Poznan University of Medical Sciences", "Poznań University of Life Sciences", "Poznan University of Technology"],
  "katowice": ["Silesian University of Technology", "Medical University of Silesia in Katowice", "University of Silesia in Katowice"],
  "braga": ["University of Minho"],
  "bari": ["Polytechnic University of Bari", "University of Bari Aldo Moro"],
  "padua": ["University of Padua"],
  "genova": ["University of Genoa"],
  "perugia": ["University of Perugia"],
  "manchester": ["University of Manchester", "Manchester Metropolitan University", "University of Greater Manchester"],
  "glasgow": ["University of Glasgow", "University of Strathclyde", "Glasgow Caledonian University", "Glasgow School of Art"],
  "bristol": ["University of Bristol", "UWE Bristol (University of the West of England)"],
  "basilea": ["University of Basel"],
  "berna": ["University of Bern"],
  "estambul": ["Boğaziçi University", "Istanbul Technical University", "İstanbul Nişantaşi University", "Istanbul Medipol University", "Istanbul University", "Istanbul Gelisim University", "Istanbul University-Cerrahpaşa", "Istanbul Aydın University", "Istanbul Medeniyet University", "Istanbul Bilgi University", "Istanbul Okan University", "Istanbul Gedik University", "Istanbul Ticaret University", "İstanbul Topkapı University", "Istanbul Yeni Yuzyil University"],
  "pisa": ["Scuola Normale Superiore di Pisa", "Sant’Anna School of Advanced Studies – Pisa", "University of Pisa"],
  "siena": ["University of Siena"],
  "trieste": ["University of Trieste"],
  "parma": ["University of Parma"],
  "bergamo": ["University of Bergamo"],
  "ferrara": ["University of Ferrara"],
  "urbino": ["University of Urbino Carlo Bo"],
  "lecce": ["University of Salento"],
  "catania": ["University of Catania"],
  "cagliari": ["University of Cagliari"],
  "maastricht": ["Maastricht University"],
  "grenoble": ["Université Grenoble Alpes"],
  "verona": ["Verona University"],
  "gotemburgo": ["University of Gothenburg", "Chalmers University of Technology"],
  "liverpool": ["University of Liverpool", "Liverpool John Moores University", "Liverpool Hope University", "Liverpool Institute for Performing Arts", "Liverpool School of Tropical Medicine"],
  "leeds": ["University of Leeds", "Leeds Beckett University", "Leeds Arts University", "Leeds Conservatoire", "Leeds Trinity University"],
  "turku": ["University of Turku"],
  "rennes": ["University of Rennes 1"],
  "pecs": ["University of Pécs"],
  "kaunas": ["Kaunas University of Technology", "Vytautas Magnus University"],
  "sao-paulo": ["University of São Paulo", "Universidade Federal de São Paulo (UNIFESP)", "Universidade Cidade de São Paulo"],
  "rio-de-janeiro": ["Federal University of Rio de Janeiro", "Pontifical Catholic University of Rio de Janeiro (PUC-Rio)", "Universidade do Estado do Rio de Janeiro (UERJ)"],
  "florianopolis": ["Universidade Federal de Santa Catarina", "Universidade do Estado de Santa Catarina"],
  "cartagena-de-indias": ["Universidad de Cartagena"],
  "cusco": [],
  "nueva-york": ["Columbia University", "New York University (NYU)", "The New School"],
  // La ficha de Boston incluye Harvard (Cambridge, al otro lado del río).
  "boston": ["Harvard University", "Boston University", "Northeastern University, US", "Boston College"],
  "chicago": ["The University of Chicago", "Northwestern University", "University of Illinois Chicago"],
  "los-angeles": ["University of California, Los Angeles", "University of Southern California"],
  // La ficha de San Francisco incluye UC Berkeley (al otro lado de la bahía).
  "san-francisco": ["University of California, Berkeley"],
  "lima": ["Universidad Peruana Cayetano Heredia", "Pontifical Catholic University of Peru", "Universidad Nacional Mayor de San Marcos", "Universidad Peruana de Ciencias Aplicadas (UPC)", "Universidad del Pacífico"],
  "ciudad-de-panama": ["Universidad de Panamá"],
  "san-jose-costa-rica": ["University of Costa Rica"],
  "montevideo": ["Catholic University of Uruguay", "ORT Uruguay University"],
  "quito": ["Universidad San Francisco de Quito", "University of Las Américas (UDLA)", "Escuela Politécnica Nacional"],
  "miami": ["University of Miami", "Florida International University"],
  "toronto": ["University of Toronto", "York University", "Toronto Metropolitan University"],
  "vancouver": ["University of British Columbia", "Simon Fraser University"],
  "montreal": ["McGill University", "Université de Montréal", "Concordia University"],
  "ciudad-de-mexico": ["National Autonomous University of Mexico"],
  "guadalajara": ["University of Guadalajara"],
  "austin": ["University of Texas at Austin"],
  "seattle": ["University of Washington"],
  "washington": ["Georgetown University", "George Washington University", "American University"],
  "nueva-orleans": ["Tulane University"],
  "ann-arbor": ["University of Michigan-Ann Arbor"],
  "quebec": ["Université Laval"],
  "ottawa": ["University of Ottawa", "Carleton University"],
  "san-diego": ["University of California, San Diego", "San Diego State University"],
  "monterrey": ["Tecnológico de Monterrey", "Universidad Autónoma de Nuevo León (UANL)", "University of Monterrey"],
  "la-paz": [],
  "asuncion": ["Universidad Nacional de Asunción"],
  "ciudad-de-guatemala": [],
  "san-salvador": [],
  "santo-domingo": ["Pontificia Universidad Católica Madre y Maestra (PUCMM)"],
  "buenos-aires": ["Pontifical Catholic University of Argentina", "Instituto Tecnológico de Buenos Aires (ITBA)"],
  "cordoba-argentina": ["National University of Córdoba", "Catholic University of Córdoba"],
  "santiago-de-chile": ["Pontificia Universidad Católica de Chile", "University of Chile", "Diego Portales University", "Adolfo Ibáñez University", "University of Santiago, Chile (USACH)"],
  "bogota": ["University of the Andes, Colombia", "Del Rosario University", "National University of Colombia", "Pontificia Universidad Javeriana", "Externado University of Colombia"],
  "medellin": ["University of Antioquia", "University of Medellín", "EAFIT University", "Universidad Pontificia Bolivariana (UPB)"],
  // Tandas Loyola
  "caserta": ["University of Campania Luigi Vanvitelli"],
  "covilha": ["University of Beira Interior"],
  "cosenza": ["University of Calabria"],
  "modena": ["University of Modena and Reggio Emilia"],
  "trento": ["University of Trento"],
  "pavia": ["University of Pavia"],
  // Instituto Politécnico de Bragança (hoy Universidade Politécnica): última edición en la que sale, 2024.
  "braganza": ["Instituto Politécnico de Bragança"],
  "newcastle": ["Newcastle University", "Northumbria University"],
  // Campus satélite: KU Leuven Campus Geel. Cuenta para el académico, no para la comunidad:
  // THE publica los internacionales de toda KU Leuven.
  "geel": [{ name: "KU Leuven", satellite: true }],
  "kleve": [],
  // Fase 2 Loyola. Solo cuentan las universidades del convenio y las de la ciudad que salen en THE.
  "campobasso": ["Università degli Studi del Molise"],
  "salerno": ["University of Salerno"],
  "angers": ["University of Angers"],
  "enschede": ["University of Twente"],
  "gotinga": ["University of Göttingen"],
  "odense": ["University of Southern Denmark"],
  // SEEU, el IPSantarém y la Universität Erfurt no salen en THE 2026 ni 2027.
  "tetovo": [],
  "santarem": [],
  "luneburgo": ["Leuphana University of Lüneburg"],
  "erfurt": [],
  // Tanda 2. LIUC y NHH tienen perfil en THE pero sin puesto; HAN y HZ no salen.
  "ratisbona": ["University of Regensburg"],
  "wurzburgo": ["University of Würzburg"],
  "malinas": [],
  "belfort": [],
  "debrecen": ["University of Debrecen"],
  "benevento": ["University of Sannio"],
  "castellanza": [],
  "bergen": ["University of Bergen"],
  "arnhem": [],
  "flesinga": [],
};

/** Nombres con que ESN escribe cada ciudad (además del nombre de la ficha). */
const ESN_CITY_NAMES = {
  "cracovia": ["krakow", "cracow"], "varsovia": ["warszawa", "warsaw"], "praga": ["praha", "prague"],
  "la-haya": ["den haag", "the hague", "'s-gravenhage", "leiden"], "munich": ["munchen", "munich"], "lisboa": ["lisbon"],
  "oporto": ["porto"], "londres": ["london"], "viena": ["wien", "vienna"],
  "bruselas": ["brussels", "bruxelles", "brussel", "ixelles", "etterbeek", "elsene"],
  "estocolmo": ["stockholm", "solna"], "copenhague": ["copenhagen", "kobenhavn", "frederiksberg", "kongens lyngby", "lyngby"],
  "helsinki": ["espoo"], "reikiavik": ["reykjavik"], "edimburgo": ["edinburgh"], "atenas": ["athens", "athina"],
  "liubliana": ["ljubljana"], "tallin": ["tallinn"], "vilna": ["vilnius"], "bucarest": ["bucharest", "bucuresti"],
  "ginebra": ["geneva", "geneve", "genf"], "florencia": ["florence", "firenze"], "hamburgo": ["hamburg"],
  "gante": ["ghent", "gent"], "venecia": ["venice", "venezia", "mestre"], "colonia": ["cologne", "koln"],
  "lovaina": ["leuven"], "salonica": ["thessaloniki"], "napoles": ["naples", "napoli"],
  "friburgo": ["freiburg", "freiburg im breisgau"], "lausana": ["lausanne"], "burdeos": ["bordeaux", "talence", "pessac"],
  "zurich": ["zuerich"], "estrasburgo": ["strasbourg"], "marsella": ["marseille", "aix-en-provence"],
  "dresde": ["dresden"], "tubinga": ["tubingen"], "padua": ["padova"], "genova": ["genoa"], "basilea": ["basel"],
  "berna": ["bern"], "estambul": ["istanbul"], "gotemburgo": ["gothenburg", "goteborg"], "turin": ["torino"],
  "milan": ["milano"], "roma": ["rome"], "bolonia": ["bologna"], "cluj-napoca": ["cluj"], "katowice": ["gliwice"],
  "nicosia": ["lefkosia"], "la-valeta": ["msida", "valletta"],
  "cosenza": ["rende", "arcavacata di rende", "arcavacata"],
  "salerno": ["fisciano"], "gotinga": ["gottingen", "goettingen"], "luneburgo": ["luneburg", "lueneburg"], "flesinga": ["vlissingen"], "ratisbona": ["regensburg"], "wurzburgo": ["wurzburg", "wuerzburg"], "malinas": ["mechelen"],
};

const norm = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").toLowerCase().trim();

async function getJson(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.json();
}

/** «=111» → 111, «301–325» → 301, «2001+» → 2001, «Reporter» → null. */
export function parseTheRank(rank) {
  const m = /(\d+)/.exec(String(rank ?? ""));
  return m ? Number(m[1]) : null;
}

function pct(s) {
  const n = parseFloat(String(s ?? "").replace("%", ""));
  return Number.isFinite(n) ? n : null;
}

async function buildUniversities() {
  const editions = {};
  for (const y of [THE_EDITION, ...THE_FALLBACK_EDITIONS]) editions[y] = (await getJson(THE_URL(y))).data;
  const out = {};
  const missing = [];
  for (const city of CITIES) {
    const names = THE_NAMES[city.slug];
    if (!names) throw new Error(`scoring-data: falta ${city.slug} en THE_NAMES`);
    out[city.slug] = names.map((entry) => {
      const { name, satellite = false } = typeof entry === "string" ? { name: entry } : entry;
      for (const y of [THE_EDITION, ...THE_FALLBACK_EDITIONS]) {
        // THE mete a veces espacios duros (U+00A0) en los nombres.
        const row = editions[y].find((x) => x.name.replace(/\s+/g, " ") === name);
        if (!row) continue;
        return {
          name,
          edition: y,
          rank: row.rank,
          students: parseInt(String(row.stats_number_students).replace(/[^\d]/g, ""), 10) || null,
          intlPct: pct(row.stats_pc_intl_students),
          ...(satellite ? { satellite: true } : {}),
        };
      }
      missing.push(`${city.slug}: ${name}`);
      return null;
    }).filter(Boolean);
  }
  if (missing.length) throw new Error(`scoring-data: no están en THE ${THE_EDITION}–${THE_FALLBACK_EDITIONS.at(-1)}:\n  ${missing.join("\n  ")}`);
  return out;
}

async function buildEsn() {
  const secs = await getJson(ESN_URL);
  const out = {};
  for (const city of CITIES) {
    const cc = COUNTRY_ISO[city.country]?.[0];
    const names = new Set([norm(city.name), norm(city.nameEn), ...(ESN_CITY_NAMES[city.slug] || []).map(norm)]);
    out[city.slug] = secs
      .filter((s) => s.state === "active" && s.cc === cc &&
        ((s.cities || []).some((x) => names.has(norm(x.name))) || names.has(norm(s.address?.locality))))
      .map((s) => s.label.trim())
      .sort((a, b) => a.localeCompare(b));
  }
  return out;
}

async function buildHomicides() {
  const [, rows] = await getJson(WB_URL);
  const out = {};
  for (const [country, [, iso3]] of Object.entries(COUNTRY_ISO)) {
    if (out[country]) continue;
    const years = rows
      .filter((r) => r.countryiso3code === iso3 && r.value != null)
      .sort((a, b) => b.date - a.date)
      .slice(0, 3);
    out[country] = Object.fromEntries(years.reverse().map((r) => [r.date, Math.round(r.value * 100) / 100]));
  }
  return out;
}

// ─── Salidas profesionales: tasa NEET 15–24 años ─────────────────────────────
// Jóvenes que ni trabajan ni estudian ni se forman. Región NUTS 2 de Eurostat
// (edat_lfse_22) donde cae la ciudad (coordenadas de lib/cityCoords.js sobre
// los límites oficiales GISCO, NUTS 2024); si la región no tiene dato, el país
// en Eurostat; fuera de Eurostat (Reino Unido, América), el país según la OIT
// (indicador SL.UEM.NEET.ZS que publica el Banco Mundial).
const NEET_EUROSTAT_URL = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/edat_lfse_22?format=JSON&lang=EN&sex=T&age=Y15-24&sinceTimePeriod=2021";
const NUTS_URL = "https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_10M_2024_4326_LEVL_2.geojson";
const NEET_ILO_URL = "https://api.worldbank.org/v2/country/all/indicator/SL.UEM.NEET.ZS?format=json&per_page=20000&date=2015:2026";
/** Eurostat usa EL para Grecia; GISCO y ESN, EL/GR: aquí se normaliza a la clave de Eurostat. */
const EUROSTAT_CC = (iso2) => (iso2 === "GR" ? "EL" : iso2);

/** Convierte la respuesta JSON-stat de Eurostat en { geo: { año: valor } }. */
function jsonStatByGeo(d) {
  const ids = d.id;
  const keys = ids.map((k) => Object.keys(d.dimension[k].category.index)
    .sort((a, b) => d.dimension[k].category.index[a] - d.dimension[k].category.index[b]));
  const out = {};
  for (const [pos, v] of Object.entries(d.value)) {
    let rem = Number(pos);
    const r = [];
    for (let i = ids.length - 1; i >= 0; i--) { r[i] = rem % d.size[i]; rem = Math.floor(rem / d.size[i]); }
    const o = Object.fromEntries(ids.map((id, i) => [id, keys[i][r[i]]]));
    (out[o.geo] ??= {})[o.time] = v;
  }
  return out;
}

/** ¿Está el punto [lng, lat] dentro de un (Multi)Polygon GeoJSON? (ray casting) */
function inGeometry([x, y], geom) {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  const inRing = (ring) => {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  };
  return polys.some(([outer, ...holes]) => inRing(outer) && !holes.some(inRing));
}

/** Distancia aproximada (grados) del punto al vértice más cercano de la geometría. */
function nearestVertex([x, y], geom) {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  let best = Infinity;
  for (const poly of polys) for (const ring of poly) for (const [vx, vy] of ring) best = Math.min(best, Math.hypot(vx - x, vy - y));
  return best;
}

/** Media de los 3 años más recientes con dato de una serie { año: valor }. */
function last3(series) {
  const years = Object.keys(series || {}).filter((y) => series[y] != null).sort().slice(-3);
  return years.length ? { years: Object.fromEntries(years.map((y) => [y, series[y]])) } : null;
}

async function buildNeet() {
  const { CITY_COORDS } = await import("../src/lib/cityCoords.js");
  const eurostat = jsonStatByGeo(await getJson(NEET_EUROSTAT_URL));
  const nuts = (await getJson(NUTS_URL)).features;
  const [, ilo] = await getJson(NEET_ILO_URL);
  const out = {};
  for (const city of CITIES) {
    const [iso2, iso3] = COUNTRY_ISO[city.country];
    const cc = EUROSTAT_CC(iso2);
    const pt = CITY_COORDS[city.slug];
    let entry = null;
    if (eurostat[cc] && pt) {
      const inCountry = nuts.filter((f) => f.properties.CNTR_CODE === cc);
      // Si el punto cae justo fuera por la generalización de la costa, la región más cercana.
      const region = inCountry.find((f) => inGeometry(pt, f.geometry))
        ?? inCountry.map((f) => ({ f, d: nearestVertex(pt, f.geometry) })).sort((a, b) => a.d - b.d)[0]?.f;
      const id = region?.properties.NUTS_ID;
      const reg = last3(eurostat[id]);
      if (reg && Object.keys(reg.years).length >= 2) {
        entry = { source: "eurostat", scope: "region", geo: id, name: region.properties.NAME_LATN, ...reg };
      } else {
        const nat = last3(eurostat[cc]);
        if (nat) entry = { source: "eurostat", scope: "country", geo: cc, ...nat };
      }
    }
    if (!entry) {
      const series = Object.fromEntries(ilo.filter((r) => r.countryiso3code === iso3 && r.value != null)
        .map((r) => [r.date, Math.round(r.value * 10) / 10]));
      const nat = last3(series);
      if (nat) entry = { source: "ilo", scope: "country", geo: iso3, ...nat };
    }
    out[city.slug] = entry; // null = sin dato (subnota pendiente)
  }
  return out;
}

const js = (name, value) => `export const ${name} = ${JSON.stringify(value, null, 1)};\n`;

async function main() {
  mkdirSync(OUT, { recursive: true });
  const universities = await buildUniversities();
  writeFileSync(join(OUT, "universities.js"),
    HEADER(`Times Higher Education World University Rankings ${THE_EDITION} (${THE_URL(THE_EDITION)}); ediciones ${THE_FALLBACK_EDITIONS.join(", ")} para las universidades que ya no salen en la actual.`) +
    `export const THE_EDITION = ${THE_EDITION};\n` +
    `/** slug → [{ name, edition, rank, students, intlPct, satellite? }] (satellite: solo un campus pequeño en la ciudad, no cuenta para la comunidad; rank tal como lo publica THE: «=111», «301–325», «Reporter»…) */\n` +
    js("CITY_UNIVERSITIES", universities));

  const esn = await buildEsn();
  writeFileSync(join(OUT, "esn.js"),
    HEADER(`Erasmus Student Network, listado público de secciones (${ESN_URL}); solo secciones con estado «active».`) +
    `/** slug → nombres de las secciones ESN activas en la ciudad */\n` + js("CITY_ESN_SECTIONS", esn));

  const homicides = await buildHomicides();
  writeFileSync(join(OUT, "homicides.js"),
    HEADER(`UNODC, homicidios intencionados por 100.000 habitantes (indicador VC.IHR.PSRC.P5 que publica el Banco Mundial: ${WB_URL}).`) +
    `/** país (como en cities.js) → { año: tasa } con los 3 años más recientes con dato */\n` + js("COUNTRY_HOMICIDE_RATES", homicides));

  const neet = await buildNeet();
  writeFileSync(join(OUT, "neet.js"),
    HEADER(`Tasa NEET (jóvenes de 15 a 24 años que ni trabajan ni estudian ni se forman, %). Eurostat edat_lfse_22 por región NUTS 2 (${NEET_EUROSTAT_URL}) con la región de cada ciudad según los límites GISCO NUTS 2024 (${NUTS_URL}); fuera de Eurostat, OIT por país (indicador SL.UEM.NEET.ZS del Banco Mundial: ${NEET_ILO_URL}).`) +
    `/** slug → { source: "eurostat" | "ilo", scope: "region" | "country", geo, name?, years: { año: % } } o null (sin dato) */\n` +
    js("CITY_NEET", neet));

  console.log(`scoring-data: ${Object.keys(universities).length} ciudades, ${Object.keys(homicides).length} países, NEET sin dato: ${Object.entries(neet).filter(([, v]) => !v).map(([k]) => k).join(", ") || "ninguna"}.`);
}

await main();
