/**
 * UNIVERSITY_ERASMUS_LINKS — MAbroad
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

  // ── Venecia ──────────────────────────────────────────────────────────────
  "Università Ca' Foscari Venezia": "https://www.unive.it/pag/12522/",
  "Università Iuav di Venezia": "https://www.iuav.it/it/internazionale/studenti-in-arrivo",

  // ── Lyon ─────────────────────────────────────────────────────────────────
  "Université Lumière Lyon 2": "https://welcome.univ-lyon2.fr/study/courses/exchange-programs/attend-as-an-exchange-student",
  "Université Jean Moulin Lyon 3": "https://www.univ-lyon3.fr/exchange-students",
  "INSA Lyon": "https://www.insa-lyon.fr/en/exchange-students",
  "EM Lyon Business School": "https://em-lyon.com/en/international-experience/incoming-students",

  // ── Colonia ──────────────────────────────────────────────────────────────
  "Universität zu Köln": "https://uni-koeln.de/en/international/study-in-cologne/international-applications/exchange-students-from-partner-universities",
  "TH Köln": "https://www.th-koeln.de/en/international_office/exchange-students_21380.php",
  "Deutsche Sporthochschule Köln": "https://www.dshs-koeln.de/english/exchange-semester-at-gsu/application-process/",

  // ── Lovaina ──────────────────────────────────────────────────────────────
  "KU Leuven": "https://www.kuleuven.be/english/education/student/register/exchange",

  // ── Utrecht ──────────────────────────────────────────────────────────────
  "Universiteit Utrecht": "https://www.uu.nl/en/education/exchange-students",
  "Hogeschool Utrecht (HU)": "https://www.internationalhu.com/admissions-exchange",

  // ── Lund ─────────────────────────────────────────────────────────────────
  "Lund University": "https://www.lunduniversity.lu.se/study/exchange-and-study-abroad/exchange-studies",

  // ── Innsbruck ────────────────────────────────────────────────────────────
  "Universität Innsbruck": "https://www.uibk.ac.at/en/international-relations-office/student-mobility/incoming/",
  "MCI Management Center Innsbruck": "https://www.mci.edu/exchange-incoming",

  // ── Split ────────────────────────────────────────────────────────────────
  "Sveučilište u Splitu (University of Split)": "https://www.unist.hr/erasmus-programme-countries-incoming-students/16549",

  // ── Salónica ─────────────────────────────────────────────────────────────
  "Aristotle University of Thessaloniki": "https://www.auth.gr/en/erasmus-en/",
  "University of Macedonia": "https://www.uom.gr/en/erasmus-office/information-for-erasmus-international-students-12796",

  // ── Nápoles ──────────────────────────────────────────────────────────────
  "Università degli Studi di Napoli Federico II": "https://www.international.unina.it/students/current-students/erasmus/",
  "Università degli Studi di Napoli \"L'Orientale\"": "https://www.unior.it/en/international/international-unior/erasmus/incoming-students",

  // ── Groningen ────────────────────────────────────────────────────────────
  "Rijksuniversiteit Groningen (RUG)": "https://www.rug.nl/education/exchange/?lang=en",
  "Hanze University of Applied Sciences": "https://www.hanze.nl/en/study/studying-at-hanze/exchange-programmes",

  // ── Coimbra ──────────────────────────────────────────────────────────────
  "Universidade de Coimbra": "https://www.uc.pt/en/iru/study-abroad/incoming-students-study-at-the-university-of-coimbra/",
  "Instituto Politécnico de Coimbra": "https://www.ipc.pt/en/internacional/mobilidade-internacional/erasmus-uniao-europeia/incoming/",

  // ── Uppsala ──────────────────────────────────────────────────────────────
  "Uppsala universitet": "https://www.uu.se/en/students/international-opportunities/exchange-studies-via-university-wide-agreements",
  "Sveriges lantbruksuniversitet (SLU)": "https://www.slu.se/en/study/exchange-studies/",

  // ── Friburgo ─────────────────────────────────────────────────────────────
  "Albert-Ludwigs-Universität Freiburg": "https://www.international.uni-freiburg.de/en/erasmus/studies-incoming",
  "Hochschule Furtwangen (campus Friburgo)": "https://www.hs-furtwangen.de/en/study/international/exchange-students",

  // ── Nantes ───────────────────────────────────────────────────────────────
  "Université de Nantes": "https://english.univ-nantes.fr/education/admissions/exchange-students",
  "École Centrale de Nantes": "https://www.ec-nantes.fr/english-version/study/exchange-year-semester",
  "Audencia Business School": "https://apply.exchangestudents.audencia.com/",

  // ── Breslavia ────────────────────────────────────────────────────────────
  "Uniwersytet Wrocławski": "https://international.uni.wroc.pl/en/incoming-exchange-students/erasmus-exchange",
  "Politechnika Wrocławska": "https://crm.pwr.edu.pl/en/international-students/exchange-erasmus/incoming",

  // ── Cluj-Napoca ──────────────────────────────────────────────────────────
  "Universitatea Babeș-Bolyai (UBB)": "https://cci.ubbcluj.ro/erasmus/incoming-students/",
  "Universitatea Tehnică din Cluj-Napoca": "https://bri.utcluj.ro/en/erasmus_plus_incoming_students.php",

  // ── Galway ───────────────────────────────────────────────────────────────
  "University of Galway": "https://www.universityofgalway.ie/erasmus-programme/incomingstudents/",
  "Atlantic Technological University (ATU)": "https://www.atu.ie/study/global/erasmus/erasmus-students",

  // ── Lausana ──────────────────────────────────────────────────────────────
  "École Polytechnique Fédérale de Lausanne (EPFL)": "https://www.epfl.ch/education/international/en/coming-to-epfl/semester-courses/",
  "Université de Lausanne (UNIL)": "https://www.unil.ch/international/en/home/menuinst/etudiants-internationaux/etudiantes-dechange/etudier-a-lunil.html",

  // ── Malmö ────────────────────────────────────────────────────────────────
  "Malmö University": "https://mau.se/en/education/apply-for-exchange-studies/",
  "Lund University (campus cercano)": "https://www.lunduniversity.lu.se/study/exchange-and-study-abroad/exchange-studies",

  // ── Aarhus ───────────────────────────────────────────────────────────────
  "Aarhus Universitet (AU)": "https://international.au.dk/education/admissions/exchange",
  "VIA University College": "https://en.via.dk/programmes/exchange",

  // ── Heidelberg ───────────────────────────────────────────────────────────
  "Ruprecht-Karls-Universität Heidelberg": "https://www.uni-heidelberg.de/en/international-affairs/erasmus/incoming",

  // ── Toulouse ─────────────────────────────────────────────────────────────
  "Université Toulouse Capitole": "https://www.ut-capitole.fr/home/incoming-students/youre-an-exchange-student",
  "Université Toulouse Jean Jaurès": "https://international.univ-tlse2.fr/accueil/formation/etudiant-echange-erasmus-convention-bilaterale",
  "INSA Toulouse": "https://www.insa-toulouse.fr/en/international-2-4/",
  "ISAE-SUPAERO": "https://www.isae-supaero.fr/en/admissions-en/admission-process-for-international-students/",

  // ── Burdeos ──────────────────────────────────────────────────────────────
  "Université de Bordeaux": "https://www.u-bordeaux.fr/en/international/come-to-bordeaux/international-students/exchange-programmes",
  "Sciences Po Bordeaux": "https://www.sciencespobordeaux.fr/en/international-students-and-programs.html",
  "Kedge Business School": "https://student.kedge.edu/exchange-students",

  // ── Palermo ──────────────────────────────────────────────────────────────
  "Università degli Studi di Palermo": "https://www.unipa.it/mobilita/en/incoming-students/incoming-erasmus-and-exchange-students/",

  // ── Gdansk ───────────────────────────────────────────────────────────────
  "Uniwersytet Gdański": "https://en.ug.edu.pl/incoming-students/erasmus-2021-2027/erasmus-incoming-students",
  "Politechnika Gdańska": "https://pg.edu.pl/en/students/international-mobility/erasmus-incoming-students",

  // ── Nicosia ──────────────────────────────────────────────────────────────
  "University of Cyprus": "https://www.ucy.ac.cy/ir/mobility/erasmus-international/studies-incoming/?lang=en",
  "University of Nicosia": "https://www.unic.ac.cy/erasmus/study-mobility-incoming-mobility/",

  // ── La Valeta ────────────────────────────────────────────────────────────
  "University of Malta": "https://www.um.edu.mt/studentlife/internationalopportunities/erasmus/incoming/",

  // ── Zúrich ───────────────────────────────────────────────────────────────
  "ETH Zürich": "https://ethz.ch/en/studies/international.html",
  "Universität Zürich (UZH)": "https://www.internationals.uzh.ch/en.html",

  // ── Brno ─────────────────────────────────────────────────────────────────
  "Masarykova univerzita (Masaryk University)": "https://czs.muni.cz/en/student-from-abroad",
  "Vysoké učení technické v Brně (VUT)": "https://www.vut.cz/en/students/going-abroad/contact",

  // ── Estrasburgo ──────────────────────────────────────────────────────────
  "Université de Strasbourg": "https://en.unistra.fr/exchange-student/contacts",
  "Sciences Po Strasbourg": "https://www.sciencespo-strasbourg.fr/en/international/come-and-study-at-sciences-po-strasbourg/",

  // ── Montpellier ──────────────────────────────────────────────────────────
  "Université de Montpellier": "https://www.umontpellier.fr/en/international/etudier-a-letranger/venir-etudier-a-luniversite-de-montpellier",
  "Université Paul-Valéry Montpellier 3": "https://www.univ-montp3.fr/en/international/study-montpellier-bachelors-masters-doctorate/incoming-students-exchange-2",

  // ── Marsella ─────────────────────────────────────────────────────────────
  "Aix-Marseille Université": "https://www.univ-amu.fr/en/international-students/international-students-exchange",

  // ── Lille ────────────────────────────────────────────────────────────────
  "Université de Lille": "https://international.univ-lille.fr/en/come-to-the-university-of-lille/students/as-part-of-an-international-programme/exchange-programme-erasmus-isep/",
  "Sciences Po Lille": "https://www.sciencespo-lille.com/prospective-international-admissions/international-exchange-students/general-information",
  "EDHEC Business School": "https://www.edhec.edu/en/student-experience/international-experience/studying-abroad",

  // ── Dresde ───────────────────────────────────────────────────────────────
  "Technische Universität Dresden (TU Dresden)": "https://tu-dresden.de/studium/vor-dem-studium/internationales/austauschprogramme?set_language=en",

  // ── Leipzig ──────────────────────────────────────────────────────────────
  "Universität Leipzig": "https://www.uni-leipzig.de/en/international/exchange-students-at-leipzig-university",
  "HTWK Leipzig": "https://www.htwk-leipzig.de/en-international/coming-to-htwk-leipzig/",

  // ── Tubinga ──────────────────────────────────────────────────────────────
  "Eberhard Karls Universität Tübingen": "https://uni-tuebingen.de/international/studierende-aus-dem-ausland/erasmus-und-austausch-nach-tuebingen/",

  // ── Poznan ───────────────────────────────────────────────────────────────
  "Uniwersytet im. Adama Mickiewicza (UAM)": "https://erasmus.amu.edu.pl/en/incoming-students",
  "Poznań University of Technology": "https://put.poznan.pl/en/erasmus-incoming",

  // ── Katowice ─────────────────────────────────────────────────────────────
  "Uniwersytet Śląski (Universidad de Silesia)": "https://erasmus.us.edu.pl/exchange-students/",
  "Politechnika Śląska (cercana, en Gliwice)": "https://www.polsl.pl/rn3-1-dwz-swm/en/",

  // ── Braga ────────────────────────────────────────────────────────────────
  "Universidade do Minho": "https://www.uminho.pt/EN/education/support-for-students/international-relations-services/Incoming",

  // ── Bari ─────────────────────────────────────────────────────────────────
  "Università degli Studi di Bari Aldo Moro": "https://www.uniba.it/en/students/international-students/admission",
  "Politecnico di Bari": "http://www.en.poliba.it/international-students/studyingpoliba-international-students",

  // ── Padua ────────────────────────────────────────────────────────────────
  "Università degli Studi di Padova": "https://www.unipd.it/en/exchange-students/international-incoming-mobility-erasmus-and-other-exchange-programmes",

  // ── Génova ───────────────────────────────────────────────────────────────
  "Università di Genova": "https://unige.it/en/internazionale/incoming",

  // ── Perugia ──────────────────────────────────────────────────────────────
  "Università degli Studi di Perugia": "https://www.unipg.it/en/international-students/incoming-exchange-students",
  "Università per Stranieri di Perugia": "https://www.unistrapg.it/en/international/international-students/extra-erasmus-mobility-incoming-students",

  // ── Mánchester ───────────────────────────────────────────────────────────
  "University of Manchester": "https://www.manchester.ac.uk/study/international/study-abroad-exchange/contact/",
  "Manchester Metropolitan University": "https://www.mmu.ac.uk/study/international/exchange-to-manchester-met",

  // ── Glasgow ──────────────────────────────────────────────────────────────
  "University of Glasgow": "https://www.gla.ac.uk/study/visiting/studyabroadexchange/",
  "University of Strathclyde": "https://www.strath.ac.uk/business/undergraduate/international/comingtostrathclyde/internationalexchange/",

  // ── Bristol ──────────────────────────────────────────────────────────────
  "University of Bristol": "https://www.bristol.ac.uk/centre-for-study-abroad/inbound/study-abroad-programmes-at-bristol/",
  "University of the West of England (UWE)": "https://www.uwe.ac.uk/study/international-study-exchange",

  // ── Basilea ──────────────────────────────────────────────────────────────
  "Universität Basel": "https://www.unibas.ch/en/Studies/In-My-Studies/Mobility/Mobility-Global/In-Coming.html",

  // ── Berna ────────────────────────────────────────────────────────────────
  "Universität Bern": "https://www.int.unibe.ch/",

  // ── Estambul ─────────────────────────────────────────────────────────────
  "Boğaziçi University": "https://intl.bogazici.edu.tr/?q=incoming-students",
  "Istanbul University": "https://erasmus.istanbul.edu.tr/en",
  "Istanbul Technical University": "https://erasmus.itu.edu.tr/en",

  // ── Pisa ─────────────────────────────────────────────────────────────────
  "Università di Pisa": "https://www.unipi.it/en/international-students/erasmus-incoming/",
  "Scuola Normale Superiore": "https://www.sns.it/en/soggiorni-e-tirocini-dallestero",

  // ── Siena ────────────────────────────────────────────────────────────────
  "Università degli Studi di Siena": "https://en.unisi.it/international/international-exchange-students",
  "Università per Stranieri di Siena": "https://www.unistrasi.it/1/582/7101/Incoming_International_Students.htm",

  // ── Trieste ──────────────────────────────────────────────────────────────
  "Università degli Studi di Trieste": "https://amm.units.it/en/international-mobility/destination-units/incoming-students",
  "SISSA (Scuola Internazionale Superiore di Studi Avanzati)": "https://wiki.sissa.it/students/index.php/Erasmus",

  // ── Parma ────────────────────────────────────────────────────────────────
  "Università di Parma": "https://www.unipr.it/en/erasmus-and-international-home",

  // ── Bérgamo ──────────────────────────────────────────────────────────────
  "Università degli Studi di Bergamo": "https://en.unibg.it/global/students-exchange/erasmus-incoming-students",

  // ── Ferrara ──────────────────────────────────────────────────────────────
  "Università degli Studi di Ferrara": "https://www.unife.it/en/come-to-study/exchange-students",

  // ── Urbino ───────────────────────────────────────────────────────────────
  "Università degli Studi di Urbino Carlo Bo": "https://www.uniurb.it/international/mobility-coming-to-urbino/students",

  // ── Lecce ────────────────────────────────────────────────────────────────
  "Università del Salento": "https://international.unisalento.it/mobility/erasmus-plus-study",

  // ── Catania ──────────────────────────────────────────────────────────────
  "Università di Catania": "https://www.unict.it/en/international/erasmus-study-students",

  // ── Cagliari ─────────────────────────────────────────────────────────────
  "Università degli Studi di Cagliari": "https://en.unica.it/en/international/studying-unica/enrolling-abroad",

  // ── Maastricht ───────────────────────────────────────────────────────────
  "Maastricht University": "https://www.maastrichtuniversity.nl/education/exchange",

  // ── Grenoble ─────────────────────────────────────────────────────────────
  "Université Grenoble Alpes": "https://www.univ-grenoble-alpes.fr/education/programs/exchange-programs/come-on-exchange/come-on-exchange-784754.kjsp",
  "Grenoble INP": "https://www.grenoble-inp.fr/en/academics/international-relations-office",

  // ── Verona ───────────────────────────────────────────────────────────────
  "Università di Verona": "https://www.univr.it/en/our-services/incoming-students-and-staff/exchange-students",

  // ── Gotemburgo ───────────────────────────────────────────────────────────
  "University of Gothenburg": "https://www.gu.se/en/study-in-gothenburg/incoming-exchange-student",
  "Chalmers University of Technology": "https://www.chalmers.se/en/education/new-student/incoming-exchange-student/",

  // ── Liverpool ────────────────────────────────────────────────────────────
  "University of Liverpool": "https://www.liverpool.ac.uk/global-opportunities/visiting-students/",
  "Liverpool John Moores University": "https://www.ljmu.ac.uk/international/thinking-of-applying/exchange-study-abroad-students",

  // ── Leeds ────────────────────────────────────────────────────────────────
  "University of Leeds": "https://www.leeds.ac.uk/international-exchange-and-study-abroad",
  "Leeds Beckett University": "https://www.leedsbeckett.ac.uk/study-abroad/visiting-students/",

  // ── Turku ────────────────────────────────────────────────────────────────
  "University of Turku": "https://www.utu.fi/en/study-at-utu/exchange-studies",
  "Åbo Akademi University": "https://www.abo.fi/en/study/study-abroad/exchange-students/",

  // ── Rennes ───────────────────────────────────────────────────────────────
  "Université de Rennes": "https://www.univ-rennes.fr/en/studying-university-rennes-exchange-student",
  "Sciences Po Rennes": "https://www.sciencespo-rennes.fr/en/international/incoming-international-students",

  // ── Pécs ─────────────────────────────────────────────────────────────────
  "University of Pécs": "https://international.pte.hu/mobility-programs/student-exchange/information-incoming-exchange-students",

  // ── Kaunas ───────────────────────────────────────────────────────────────
  "Vytautas Magnus University": "https://www.vdu.lt/en/international-cooperation/for-students/erasmus-exchange-studies/incoming-students/",
  "Kaunas University of Technology": "https://admissions.ktu.edu/exchange-students/",

  // ── São Paulo ────────────────────────────────────────────────────────────
  "Universidade de São Paulo (USP)": "https://internationaloffice.usp.br/new/en/incoming/",
  "Pontifícia Universidade Católica de São Paulo (PUC-SP)": "https://www.pucsp.br/arii/study-puc-sp",
  "Fundação Getulio Vargas (FGV)": "https://portal.fgv.br/en",
  "Universidade Presbiteriana Mackenzie": "https://www.mackenzie.br/en/universidade/coi/study-at-upm/incoming-students/undergraduate",

  // ── Río de Janeiro ───────────────────────────────────────────────────────
  "Pontifícia Universidade Católica do Rio de Janeiro (PUC-Rio)": "https://www.puc-rio.br/ensinopesq/ccci/incoming/students.html",
  "Universidade Federal do Rio de Janeiro (UFRJ)": "https://internacional.ufrj.br/en/study-at-ufrj/incoming-mobility/",
  "Universidade do Estado do Rio de Janeiro (UERJ)": "http://dci.uerj.br/ingles/index.php/exchange/international-students/undergraduate",

  // ── Florianópolis ────────────────────────────────────────────────────────
  "Universidade Federal de Santa Catarina (UFSC)": "https://sinter.ufsc.br/tag/incoming/?lang=en",
  "Universidade do Estado de Santa Catarina (UDESC)": "https://www.udesc.br/international/exchangeprograms",

  // ── Cartagena de Indias ──────────────────────────────────────────────────
  "Universidad Tecnológica de Bolívar (UTB)": "https://www.utb.edu.co/utb-global/international-students/exchange-semester-in-utb/",
  "Universidad de Cartagena": "https://www.unicartagena.edu.co/internacional/estudiantes-extranjeros/informacion-general",
  "Universidad Jorge Tadeo Lozano (sede Caribe)": "https://www.utadeo.edu.co/es/link/cooperacion-nacional-e-internacional-national-and-international-affairs/93196/international-students",

  // ── Nueva York ───────────────────────────────────────────────────────────
  "Columbia University": "https://global.undergrad.columbia.edu/content/incoming-exchange",
  "New York University (NYU)": "https://www.nyu.edu/academics/studying-abroad/exchange/internationalexchange.html",
  "The New School": "https://www.newschool.edu/study-abroad/exchange-students/",
  "Fordham University": "https://www.fordham.edu/study-abroad/programs/worldwide-semester-programs/exchange-programs/incoming-exchange-students/",

  // ── Boston ───────────────────────────────────────────────────────────────
  "Boston University": "https://www.bu.edu/abroad/for-exchange-students-coming-to-bu/",
  "Northeastern University": "https://international.northeastern.edu/ogs/exchange-visitor-program/",
  "Boston College": "https://www.bc.edu/bc-web/sites/global-engagement/sites/office-of-global-education/exchange-students.html",
  "Harvard University (Cambridge)": "https://www.hio.harvard.edu/",

  // ── Chicago ──────────────────────────────────────────────────────────────
  "University of Chicago": "https://internationalaffairs.uchicago.edu/",
  "Northwestern University": "https://www.northwestern.edu/abroad/visiting-students/",
  "DePaul University": "https://www.depaul.edu/admission/international-admission/visiting-international-students",
  "University of Illinois Chicago (UIC)": "https://ois.uic.edu/programs/uic-exchange/",

  // ── Los Ángeles ──────────────────────────────────────────────────────────
  "University of Southern California (USC)": "https://dornsife.usc.edu/overseas-studies/incoming-exchange/",
  "University of California, Los Angeles (UCLA)": "https://ieo.ucla.edu/exchange/inbound-students/",
  "Loyola Marymount University": "https://studentaffairs.lmu.edu/community/officeforinternationalstudentsandscholars/internationalstudents/exchangestudents/",

  // ── San Francisco ────────────────────────────────────────────────────────
  "University of San Francisco (USF)": "https://myusf.usfca.edu/node/3192951",
  "San Francisco State University": "https://international.sfsu.edu/prospective-exchange",
  "University of California, Berkeley": "https://studyabroad.berkeley.edu/visiting-exchange-student",

  // ── Lima ─────────────────────────────────────────────────────────────────
  "Pontificia Universidad Católica del Perú (PUCP)": "https://internacionalizacion.pucp.edu.pe/en/informacion-para-estudiantes-internacionales/programas-de-intercambio-para-estudiantes-extranjeros/estudiante-de-intercambio-internacional/",
  "Universidad de Lima": "https://www.ulima.edu.pe/en/internacional/para-alumnos-extranjeros",
  "Universidad del Pacífico": "https://ori.up.edu.pe/en/incoming/",

  // ── Ciudad de Panamá ─────────────────────────────────────────────────────
  "Universidad Tecnológica de Panamá (UTP)": "https://utp.ac.pa/movilidad-internacional-del-exterior-hacia-la-utp-estudiantes",

  // ── San José ─────────────────────────────────────────────────────────────
  "Universidad de Costa Rica (UCR)": "https://oaice.ucr.ac.cr/en/",
  "Universidad Veritas": "https://studyabroad.veritas.cr/",

  // ── Montevideo ───────────────────────────────────────────────────────────
  "Universidad Católica del Uruguay (UCU)": "https://www.ucu.edu.uy/categoria/Incoming-579",
  "Universidad ORT Uruguay": "https://www.ort.edu.uy/en/international-office/study-in-uruguay/student-exchange",
  "Universidad de Montevideo": "https://www.um.edu.uy/international",

  // ── Quito ────────────────────────────────────────────────────────────────
  "Universidad San Francisco de Quito (USFQ)": "https://www.usfq.edu.ec/en/opi/international/international-students",
  "Pontificia Universidad Católica del Ecuador (PUCE)": "https://www.puce.edu.ec/internacionalizacion-universitaria/estudiantes-internacionales/",

  // ── Miami ────────────────────────────────────────────────────────────────
  "University of Miami": "https://studyabroad.miami.edu/students/incoming-exchange-students/index.html",
  "Florida International University (FIU)": "https://studyabroad.fiu.edu/incoming-exchange-students/",

  // ── Toronto ──────────────────────────────────────────────────────────────
  "University of Toronto": "https://learningabroad.utoronto.ca/inbound-visiting/",
  "Toronto Metropolitan University (TMU)": "https://www.torontomu.ca/global-learning/incoming-students/inbound-exchange/",
  "York University": "https://www.yorku.ca/international/global-learning/incoming-academic-exchange/",

  // ── Vancouver ────────────────────────────────────────────────────────────
  "University of British Columbia (UBC)": "https://goglobal.ubc.ca/go-global/coming-ubc",
  "Simon Fraser University (SFU)": "https://www.sfu.ca/students/exchange.html",
  "British Columbia Institute of Technology (BCIT)": "https://www.bcit.ca/construction-environment/about-the-school/international-exchange/incoming-students/",

  // ── Montreal ─────────────────────────────────────────────────────────────
  "McGill University": "https://www.mcgill.ca/mcgillabroad/come-mcgill/request-exchange",
  "Université de Montréal": "https://international.umontreal.ca/english/international-students/student-exchange-program/",
  "Concordia University": "https://www.concordia.ca/international/students-from-abroad/inbound-exchange.html",
  "UQAM": "https://uqam.ca/en/information/international/",

  // ── Ciudad de México ─────────────────────────────────────────────────────
  "UNAM (Universidad Nacional Autónoma de México)": "https://www.unaminternacional.unam.mx/en/movilidad/entrante",
  "Tecnológico de Monterrey (Campus CDMX)": "https://studyinmexico.tec.mx/en/campus-ciudad-de-mexico",
  "ITAM": "https://intercambio.itam.mx/en/international-office",
  "Universidad Iberoamericana": "https://internacional.ibero.mx/en/incoming-students/",

  // ── Guadalajara ──────────────────────────────────────────────────────────
  "Universidad de Guadalajara (UDG)": "https://ci.cgai.udg.mx/en/estudiantes/externos",
  "ITESO – Universidad Jesuita de Guadalajara": "https://intercambios.iteso.mx/en/proceso-de-intercambio",
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
