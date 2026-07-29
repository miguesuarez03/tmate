/**
 * UNIVERSITY_ERASMUS_LINKS — TMate
 *
 * Mapa de "nombre de universidad tal y como aparece en cities.js" -> URL oficial
 * de la página de Erasmus/Relaciones Internacionales (incoming students) de esa
 * universidad. Para universidades-federación (varias facultades independientes,
 * ej. Universidade de Lisboa, NOVA Lisbon) se usa la página institucional general
 * de Erasmus, salvo que el dato de la universidad ya especifique una facultad
 * concreta, en cuyo caso se enlaza directamente a esa facultad.
 *
 * Fuente: investigación manual por ciudad (ver mejoras_tmate.md, punto 11).
 * Si una universidad nueva se añade a cities.js sin entrada aquí, el componente
 * cae automáticamente en un buscador de Google como fallback seguro.
 */

export const UNIVERSITY_ERASMUS_LINKS = {
  // ── Bolonia ──────────────────────────────────────────────────────────────
  "Università di Bologna": "https://www.unibo.it/en/international/incoming-exchange-students",
  "Unibo – Sede Forlì": "https://www.unibo.it/en/international/incoming-exchange-students",
  "Accademia di Belle Arti": "https://www.ababo.it/cms/lang/en/category/erasmus/",

  // ── Milán ────────────────────────────────────────────────────────────────
  "Politecnico di Milano": "https://www.polimi.it/en/campus-e-servizi/international-mobility/exchange-students-incoming",
  "Università degli Studi di Milano": "https://www.unimi.it/en/international/exchange-students/incoming-exchange-students",
  "Bocconi": "https://www.unibocconi.it/en/international-students/incoming-exchange-students",
  "NABA": "https://www.naba.it/en/student-services/erasmus-international-exchange-programmes",

  // ── Roma ─────────────────────────────────────────────────────────────────
  "Sapienza — la más grande de Europa": "https://www.uniroma1.it/en/pagina/students-coming-sapienza",
  "LUISS": "https://www.luiss.edu/students/erasmus-and-exchange-students",
  "Roma Tre": "https://www.uniroma3.it/en/internazionale/erasmus-incoming/",
  "Università Cattolica": "https://www.unicatt.it/international-incoming-exchange-students",

  // ── Turín ────────────────────────────────────────────────────────────────
  "Università degli Studi di Torino": "https://en.unito.it/international-relations/students-mobility/exchange-students-and-erasmus-mobility",
  "Politecnico di Torino": "https://www.polito.it/en/education/international-students/exchange-students",

  // ── Cracovia ─────────────────────────────────────────────────────────────
  "Jagiellonian University": "https://erasmus.uj.edu.pl/en_GB/incoming/studies",
  "AGH University": "https://www.erasmus.agh.edu.pl/en/incoming-students/",
  "Cracow University of Economics": "https://uek.krakow.pl/en/cooperation/exchange-students/incoming-students",

  // ── Varsovia ─────────────────────────────────────────────────────────────
  "University of Warsaw": "https://en.uw.edu.pl/candidates/exchange-students/",
  "Warsaw School of Economics": "https://www.sgh.waw.pl/en/exchange-students",
  "Warsaw University of Technology": "https://www.pw.edu.pl/engpw/Education/Exchange-Studies/Incoming-Students",

  // ── Budapest ─────────────────────────────────────────────────────────────
  "Corvinus University": "https://www.uni-corvinus.hu/contents/uploads/2021/02/erasmus.html",
  "Budapest University of Technology": "https://kth.bme.hu/en/erasmus-incoming",
  "ELTE": "https://www.elte.hu/en/erasmus",

  // ── Praga ────────────────────────────────────────────────────────────────
  "Charles University": "https://cuni.cz/UKEN-149.html",
  "Czech Technical University": "https://international.cvut.cz/exchange-students/",
  "Prague University of Economics": "https://www.vse.cz/english/exchange-studies/",

  // ── La Haya ──────────────────────────────────────────────────────────────
  "Leiden University": "https://www.universiteitleiden.nl/en/students/exchange-and-study-abroad/incoming-exchange",
  "The Hague University of Applied Sciences": "https://www.thehagueuniversity.com/about-us/contact/international-office",

  // ── Rotterdam ────────────────────────────────────────────────────────────
  "Erasmus University Rotterdam": "https://www.eur.nl/en/education/exchange-and-study-abroad/incoming-exchange-students",
  "Rotterdam University of Applied Sciences": "https://www.rotterdamuas.com/study/exchange-programme/",

  // ── Múnich ───────────────────────────────────────────────────────────────
  "Ludwig Maximilian University (LMU)": "https://www.lmu.de/en/study/before-your-studies/international-applicants/exchange-students/index.html",
  "Technical University of Munich (TUM)": "https://www.tum.de/en/studies/application/incoming-exchange-students",
  "Munich University of Applied Sciences": "https://www.hm.edu/en/international_applicants_1/exchange_students/exchange_students.en.html",

  // ── Berlín ───────────────────────────────────────────────────────────────
  "Freie Universität Berlin": "https://www.fu-berlin.de/en/studium/international/austauschstudium/incoming/index.html",
  "Humboldt-Universität": "https://www.international.hu-berlin.de/en/studium/abschnitte/incoming",
  "TU Berlin": "https://www.tu.berlin/en/international/students-from-abroad/exchange-students",
  "Beuth Hochschule": "https://www.bht-berlin.de/en/international/incoming-exchange-students",

  // ── Lisboa (federación de facultades — páginas institucionales generales) ──
  "Universidade de Lisboa": "https://www.ulisboa.pt/en/info/erasmus",
  "NOVA University Lisbon": "https://www.unl.pt/en/nova/erasmus",
  "ISCTE": "https://www.iscte-iul.pt/estudantes-incoming",
  "Universidade Católica": "https://www.ucp.pt/international/study-catolica/mobility-students-incoming",

  // ── Oporto ───────────────────────────────────────────────────────────────
  "Universidade do Porto": "https://sigarra.up.pt/up/en/web_base.gera_pagina?p_pagina=incoming%20mobility",
  "Universidade Católica Portuguesa": "https://www.ucp.pt/international/study-catolica/mobility-students-incoming",
  "ISCAP": "https://www.iscap.ipp.pt/site/internacional/mobilidade-internacional/incoming/",

  // ── París ────────────────────────────────────────────────────────────────
  "Sorbonne": "https://www.sorbonne-universite.fr/en/admissions/incoming-exchange-students",
  "Sciences Po": "https://www.sciencespo.fr/admissions/en/program-tracks/incoming-exchange/",
  "HEC Paris": "https://www.hec.edu/en/international/incoming-exchange-students",
  "Université Paris-Dauphine": "https://www.dauphine.psl.eu/en/international/exchange-students/incoming-exchange-students",

  // ── Londres ──────────────────────────────────────────────────────────────
  "UCL": "https://www.ucl.ac.uk/students/global-opportunities/incoming-exchange-students",
  "King's College London": "https://www.kcl.ac.uk/study/global-mobility/incoming-students",
  "LSE": "https://www.lse.ac.uk/study-at-lse/General-Course/Incoming-exchange-students",
  "Imperial College": "https://www.imperial.ac.uk/study/study-abroad-and-exchanges/incoming-exchange-students/",
  "Queen Mary": "https://www.qmul.ac.uk/international/global-opportunities/incoming-exchange-students/",

  // ── Ámsterdam ────────────────────────────────────────────────────────────
  "University of Amsterdam (UvA)": "https://www.uva.nl/en/education/exchange/exchange-uva/exchange-at-the-uva.html",
  "Vrije Universiteit Amsterdam": "https://vu.nl/en/education/exchange-programme",
  "Amsterdam University of Applied Sciences": "https://www.amsterdamuas.com/study/exchange-and-international-programmes",

  // ── Viena ────────────────────────────────────────────────────────────────
  "University of Vienna": "https://international.univie.ac.at/en/students/incoming-exchange-students/",
  "Vienna University of Technology": "https://www.tuwien.at/en/studies/admission-and-application/international-students/exchange-students",
  "WU Vienna": "https://www.wu.ac.at/en/students/registration/exchange-students",

  // ── Rosenheim ────────────────────────────────────────────────────────────
  "Technische Hochschule Rosenheim": "https://www.th-rosenheim.de/en/international/incoming-students",

  // ── Bruselas ─────────────────────────────────────────────────────────────
  "Université Libre de Bruxelles (ULB)": "https://www.ulb.be/en/incoming-mobility/incoming-erasmus-students",
  "VUB": "https://www.vub.be/en/internationalisation-vub/international-relations-what-we-do-how-you-can-reach-us/exchange-erasmus-projects/come-vub-exchange",
  "KU Leuven (campus BXL)": "https://www.kuleuven.be/english/education/student/register/exchange/brussels",
  "Vesalius College": "https://www.vesalius.edu/admissions/exchange-students/",

  // ── Estocolmo ────────────────────────────────────────────────────────────
  "KTH Royal Institute of Technology": "https://www.kth.se/en/studies/exchange/exchange-studies-at-kth-1.6519",
  "Stockholms Universitet": "https://www.su.se/english/education/exchange-students",
  "Stockholm School of Economics (SSE)": "https://www.hhs.se/en/education/study-at-sse/student-exchange/student-exchange/",

  // ── Copenhague ───────────────────────────────────────────────────────────
  "University of Copenhagen (KU)": "https://studies.ku.dk/study-abroad/exchange/",
  "Copenhagen Business School (CBS)": "https://www.cbs.dk/en/study-programmes/international-students/exchange-students",
  "DTU (Technical University of Denmark)": "https://www.dtu.dk/english/education/incoming-students/exchange",

  // ── Helsinki ─────────────────────────────────────────────────────────────
  "University of Helsinki": "https://www.helsinki.fi/en/admissions-and-education/apply-exchange-and-visiting-studies",
  "Aalto University": "https://www.aalto.fi/en/international-students/incoming-exchange-students",
  "Hanken School of Economics": "https://www.hanken.fi/en/students/international-opportunities/incoming-exchange-students",

  // ── Oslo ─────────────────────────────────────────────────────────────────
  "University of Oslo (UiO)": "https://www.uio.no/english/studies/admission/exchange/",
  "BI Norwegian Business School": "https://www.bi.no/en/study-at-bi/resources-and-opportunities/exchange/",
  "OsloMet": "https://www.oslomet.no/en/study/admission/admission-international-exchange-students",

  // ── Reikiavik ────────────────────────────────────────────────────────────
  "University of Iceland (Háskóli Íslands)": "https://english.hi.is/study/study-abroad/incoming-exchange-students",
  "Reykjavik University": "https://en.ru.is/studies/exchange-students/1000",

  // ── Dublín ───────────────────────────────────────────────────────────────
  "Trinity College Dublin (TCD)": "https://www.tcd.ie/global/mobility/inbound/how-to-apply/eu-and-erasmus-exchange/",
  "University College Dublin (UCD)": "https://www.ucd.ie/global/learningabroad/exchanges/inboundexchange-students/",

  // ── Edimburgo ────────────────────────────────────────────────────────────
  "University of Edinburgh": "https://edinburgh-global.ed.ac.uk/study-abroad/study-options/european-exchange",
  "Heriot-Watt University": "https://www.hw.ac.uk/uk/students/studies/exchange/incoming-exchange-students.htm",

  // ── Atenas ───────────────────────────────────────────────────────────────
  "National and Kapodistrian University of Athens (NKUA)": "https://en.interel.uoa.gr/erasmus_student_mobility",
  "Athens University of Economics and Business (AUEB)": "https://www.aueb.gr/en/erasmus",

  // ── Zagreb ───────────────────────────────────────────────────────────────
  "University of Zagreb": "https://www.unizg.hr/homepage/international-exchange/exchange-students/",

  // ── Liubliana ────────────────────────────────────────────────────────────
  "University of Ljubljana": "https://www.uni-lj.si/en/study/exchanges",

  // ── Tallin ───────────────────────────────────────────────────────────────
  "Tallinn University of Technology (TalTech)": "https://taltech.ee/en/incoming-students",
  "Tallinn University (TLU)": "https://www.tlu.ee/en/exchange",

  // ── Vilna ────────────────────────────────────────────────────────────────
  "Vilnius University (VU)": "https://www.vu.lt/en/studies/exchange-students/how-to-apply",
  "Vilnius Gediminas Technical University (VILNIUS TECH)": "https://vilniustech.lt/en/international-students/exchange-students/",

  // ── Riga ─────────────────────────────────────────────────────────────────
  "University of Latvia (LU)": "https://www.lu.lv/en/admissions/exchange-studies/",
  "Riga Technical University (RTU)": "https://www.rtu.lv/en/internationalization/incoming-exchange/erasmus-europe-students",

  // ── Bratislava ───────────────────────────────────────────────────────────
  "Comenius University in Bratislava (UK)": "https://uniba.sk/en/international-relations/eninternational-relationserasmus/incoming-students/",
  "Slovak University of Technology (STU)": "https://www.stuba.sk/english/exchange-students/erasmus.html?page_id=13453",

  // ── Bucarest ─────────────────────────────────────────────────────────────
  "University of Bucharest (UB)": "https://unibuc.ro/international/programul-erasmus/studenti-erasmus/?lang=en",
  "National University of Science and Technology POLITEHNICA Bucharest (UPB)": "https://upb.ro/en/erasmus/students/",

  // ── Sofía ────────────────────────────────────────────────────────────────
  "Sofia University St. Kliment Ohridski": "https://erasmus.uni-sofia.bg/site/income/",
  "Technical University of Sofia (TU-Sofia)": "https://tu-sofia.bg/erasmus/erasmus",

  // ── Ginebra ──────────────────────────────────────────────────────────────
  "Université de Genève (UNIGE)": "https://www.unige.ch/dase/en/echange/incoming/",
  "Graduate Institute of International and Development Studies (IHEID)": "https://www.graduateinstitute.ch/exchange-students",
  "HEG Genève": "https://www.hesge.ch/heg/en/international/incoming-students",

  // ── Florencia ────────────────────────────────────────────────────────────
  "Università degli Studi di Firenze": "https://www.unifi.it/changelang-eng/incoming-exchange-students",
  "Accademia di Belle Arti di Firenze": "https://www.accademia.firenze.it/en/international/erasmus/",

  // ── Hamburgo ─────────────────────────────────────────────────────────────
  "Universität Hamburg": "https://www.uni-hamburg.de/en/internationales/austausch/incoming.html",
  "HafenCity Universität (HCU)": "https://www.hcu-hamburg.de/en/international/incoming-students",
  "Technische Universität Hamburg (TUHH)": "https://www.tuhh.de/alt/tuhh/international/incoming-exchange-students.html",

  // ── Gante ────────────────────────────────────────────────────────────────
  "Universiteit Gent (UGent)": "https://www.ugent.be/en/facilities/international/exchange",
  "HOGENT": "https://www.hogent.be/en/international/incoming-exchange-students/",
  "Artevelde Hogeschool": "https://www.arteveldehogeschool.be/en/international/incoming-exchange-students",
};

/**
 * Devuelve el enlace oficial de Erasmus de una universidad.
 * Si no hay entrada en el mapa, cae a una búsqueda de Google como fallback
 * seguro (mejor que un enlace roto o un "#").
 */
export function getUniversityErasmusLink(universityName) {
  return (
    UNIVERSITY_ERASMUS_LINKS[universityName] ||
    `https://www.google.com/search?q=${encodeURIComponent(universityName + " Erasmus incoming students international office")}`
  );
}
