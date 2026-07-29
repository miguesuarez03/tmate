// City scores and insights data — extends cities.js
// Each city has scores 0-10, subcategory breakdowns, and real student reviews

export const CITY_INSIGHTS = {
  bolonia: {
    heroImg: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1400&q=80",
    tagline: "La capital universitaria de Italia. Donde la pasta se inventó y el conocimiento nunca para.",
    atmosphere: "Rojiza, académica, gastronómica y festiva. Bolonia huele a ragù y suena a risas de estudiantes bajo los pórticos.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 6.8,
        summary: "Moderado para Italia, alto para Europa del Este. Vivir bien con 850€/mes es realista.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 5.5, desc: "Habitaciones desde 350–500€. Alta demanda por la universidad, conviene buscar con antelación." },
          { label: "Comida y supermercados", score: 8.5, desc: "Mercado Quadrilatero: comer bien por 5€. La cultura gastronómica premia al curioso." },
          { label: "Transporte", score: 8.0, desc: "Bus TPER por 1,30€/viaje. Pase mensual a 35€. La bici funciona perfectamente en el centro." },
          { label: "Ocio y gastos diarios", score: 7.0, desc: "Cervezas a 3–4€. Mucha oferta gratuita: conciertos, eventos culturales, mercados." },
        ],
        reviews: [
          { text: "Con 900€/mes vivía muy bien, comía de lujo y salía todos los fines de semana.", author: "Marta, Erasmus 2023", flag: "🇪🇸" },
          { text: "El alojamiento fue lo más difícil de conseguir. Empieza a buscar 3 meses antes.", author: "João, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 5.2,
        summary: "Alta competencia por la demanda universitaria. Busca con mucha antelación. Incluye pisos, habitaciones, residencias y colivings.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 4.5, desc: "Alta demanda de 100.000+ estudiantes. Las mejores habitaciones se van en semanas." },
          { label: "Precio", score: 6.0, desc: "350–500€ habitación individual. Compartir piso es la norma." },
          { label: "Facilidad de búsqueda", score: 5.5, desc: "Idealista, Unipol, grupos de Facebook de la universidad. Mejor buscar desde origen." },
          { label: "Residencias universitarias", score: 6.5, desc: "Las residencias universitarias de Unibo son buena opción si las pillas a tiempo." },
        ],
        reviews: [
          { text: "Tardé 2 meses en encontrar alojamiento desde España. Empieza en marzo para septiembre.", author: "Ana, Erasmus 2023", flag: "🇪🇸" },
          { text: "Las residencias universitarias de Unibo son buena opción si las pillas a tiempo.", author: "Marco, estudiante local", flag: "🇮🇹" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 9.2,
        summary: "Una de las mejores vidas nocturnas estudiantiles de Europa. Comunidad Erasmus enorme y muy activa. Siempre hay algo que hacer.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 9.5, desc: "+6.000 estudiantes Erasmus al año. De las más grandes de Italia. ESN Bolonia organiza eventos semanales, trips y fiestas. Muy bien organizado." },
          { label: "Ambiente internacional", score: 9.0, desc: "Estudiantes de toda Europa, Sudamérica y Asia. Ambiente verdaderamente internacional." },
          { label: "Fiesta y vida nocturna", score: 9.5, desc: "Via del Pratello y Via Zamboni son las arterias de la noche. Llenos de jueves a sábado." },
          { label: "Eventos y actividades", score: 8.5, desc: "ESN muy activo. Fiestas temáticas, excursiones, cenas internacionales cada semana. Cine de verano al aire libre, festivales, mercados nocturnos." },
        ],
        reviews: [
          { text: "La mejor vida social de mi Erasmus. Cada noche había un plan diferente.", author: "Lucia, Erasmus 2023", flag: "🇩🇪" },
          { text: "El ESN de Bolonia es de los más activos de Italia. Los primeros días ya tienes amigos.", author: "Pierre, Erasmus 2024", flag: "🇫🇷" },
          { text: "El ESN organizó mi llegada, me presentó gente y tenía planes cada semana. Increíble.", author: "Klara, Erasmus 2024", flag: "🇩🇪" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 8.4,
        summary: "Ciudad muy acostumbrada a estudiantes internacionales. El inglés llega lejos y los locales son abiertos.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 7.5, desc: "El inglés funciona bien en zonas universitarias. Aprender algo de italiano acelera todo." },
          { label: "Actitud local", score: 9.0, desc: "Boloñeses muy abiertos y curiosos con los extranjeros. Nada de hostilidad." },
          { label: "Facilidad para hacer amigos", score: 8.8, desc: "Los boloñeses son abiertos y orgullosos de su ciudad. Mezclarse es fácil." },
          { label: "Integración con locales", score: 8.5, desc: "Fácil mezclarse por la alta densidad estudiantil. Los italianos invitan a cenar con facilidad." },
        ],
        reviews: [
          { text: "La gente local me adoptó desde el primer mes. Ahora tengo amigos italianos de por vida.", author: "Sofia, Work&Travel 2023", flag: "🇬🇷" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.2,
        summary: "Ciudad compacta y muy ciclable. Posición estratégica en Italia para escapadas de fin de semana.",
        color: "#F59E0B",
        subcategories: [
          { label: "Ciudad caminable", score: 9.0, desc: "La mejor forma de moverse. Centro completamente plano y con carril bici. Muy caminable." },
          { label: "Transporte público", score: 7.5, desc: "Red de autobuses amplia. Pase mensual a 35€. Funciona bien pero no 24h." },
          { label: "Conexiones nacionales", score: 8.0, desc: "Tren directo a Florencia (35min), Milán (1h), Venecia (1h20). Posición estratégica en el corazón de Italia." },
          { label: "Escapadas de fin de semana", score: 8.5, desc: "Base perfecta para explorar Italia: Toscana, Veneto, Emilia-Romaña. Todo a menos de 2 horas." },
        ],
        reviews: [
          { text: "Compré una bici de segunda mano por 60€ y fue mi mejor inversión del año.", author: "Tomás, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.0,
        summary: "Excelente calidad de vida entre gastronomía, cultura y un ritmo equilibrado. El clima es variable pero los pórticos lo hacen todo más llevadero.",
        color: "#14B8A6",
        subcategories: [
          { label: "Clima", score: 7.2, desc: "Veranos muy calurosos (35–40°C en julio-agosto), inviernos fríos con niebla frecuente. Primavera y otoño son espectaculares: 18–25°C perfectos para vivir la ciudad." },
          { label: "Calidad de vida", score: 8.6, desc: "Ritmo de vida equilibrado. Ni demasiado acelerado ni aburrido. Instalaciones universitarias accesibles y mucha vida al aire libre en los parques." },
          { label: "Autenticidad local", score: 9.8, desc: "La mejor ciudad para comer de Italia. Ragù, tortellini, mortadella... auténticos. Museos, teatros, cine al aire libre, mercados. Oferta cultural continua." },
          { label: "Estilo de vida", score: 8.5, desc: "Cine de verano al aire libre, festivales, mercados nocturnos. La ciudad nunca duerme en verano. Sociabilidad local alta." },
        ],
        reviews: [
          { text: "El mejor año de mi vida. La comida, la gente, la ciudad. Volvería mañana.", author: "Emma, Erasmus 2023", flag: "🇫🇷" },
          { text: "Bolonia tiene algo especial que no supe definir hasta que me fui.", author: "Rui, Erasmus 2024", flag: "🇵🇹" },
          { text: "El invierno fue más frío de lo que esperaba, pero la vida estudiantil compensa.", author: "Pedro, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.1,
        summary: "Buenas oportunidades en agroalimentario, tech y startups locales.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 7.0, desc: "Ecosistema tech creciente. Motor Valley (Ferrari, Lamborghini) atrae talento industrial." },
          { label: "Prácticas", score: 7.5, desc: "Convocatorias activas en empresas locales y organismos universitarios." },
          { label: "Empresas relevantes", score: 7.0, desc: "Sector agroalimentario líder, startups de foodtech, industria automotriz del Motor Valley." },
          { label: "Oportunidades para estudiantes", score: 7.0, desc: "La comunidad universitaria facilita conexiones. Unibo Career Service muy activo." },
        ],
        reviews: [
          { text: "Conseguí prácticas en una startup de foodtech gracias a la red de Erasmus.", author: "Lena, Internship 2024", flag: "🇩🇪" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 7.8,
        summary: "Ciudad segura para estándares europeos. Precaución normal en zonas nocturnas.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.0, desc: "Muy segura de día. Centro histórico concurrido y bien vigilado." },
          { label: "Seguridad nocturna", score: 7.5, desc: "Las zonas de fiesta son seguras. Como en cualquier ciudad, atención con pertenencias." },
          { label: "Ambiente de la ciudad", score: 7.5, desc: "Nivel de carteristas bajo comparado con Roma o Florencia. Precaución normal en transporte." },
        ],
        reviews: [
          { text: "Me sentí más segura que en mi ciudad de origen. Nunca tuve ningún problema.", author: "Ingrid, Erasmus 2023", flag: "🇸🇪" },
        ],
      },
    ],
  },

  berlin: {
    heroImg: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=1600&q=85",
    tagline: "La capital de la libertad creativa. Donde el arte no pide permiso y la noche no tiene hora de cierre.",
    atmosphere: "Cruda, vibrante, auténtica. Berlín huele a café de especialidad y suena a techno saliendo de almacenes reconvertidos.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 7.2,
        summary: "Más asequible que París o Londres. Habitaciones desde 500–700€, comida barata si sabes dónde.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 6.0, desc: "WG (pisos compartidos) 450–700€. La demanda es alta pero la oferta también." },
          { label: "Comida y supermercados", score: 8.5, desc: "Mercados turcos, döner a 3€, supermercados económicos. Comer sano y barato es fácil." },
          { label: "Transporte", score: 8.5, desc: "Deutschlandticket a 49€/mes. Metro, bus, tram 24h los fines de semana." },
          { label: "Ocio y gastos diarios", score: 8.0, desc: "Entrada a clubs: 10–20€. Pero la vida cultural (museos, galerías) tiene mucho gratis." },
        ],
        reviews: [
          { text: "Con 1.100€/mes vivía muy bien. Berlín sigue siendo la más asequible de las grandes capitales.", author: "Carlos, Erasmus 2024", flag: "🇪🇸" },
          { text: "El Deutschlandticket cambió todo. Me moví por toda Alemania por 49€ al mes.", author: "Anna, Work&Travel 2024", flag: "🇵🇱" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 5.8,
        summary: "Mercado tenso pero más fácil que Múnich o París. WG Gesucht es la biblia.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 5.5, desc: "Demanda muy alta. Las WG buenas se van en días. Hay que ser rápido y preparado." },
          { label: "Precio", score: 6.5, desc: "Más barato que otras capitales. WG 450–700€. Posible encontrar algo razonable." },
          { label: "Facilidad de búsqueda", score: 7.0, desc: "WG-Gesucht, Immowelt, grupos de Facebook. Ecosistema de búsqueda bien desarrollado." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "Tardé 3 semanas pero encontré un alojamiento increíble en Neukölln. WG-Gesucht es clave.", author: "Luisa, Erasmus 2024", flag: "🇧🇷" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 9.4,
        summary: "La mejor vida nocturna del mundo. Punto. Clubs que abren 72 horas seguidas. Comunidad internacional enorme y muy activa. Fácil hacer amigos de todo el mundo.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 9.0, desc: "+8.000 estudiantes internacionales al año entre todas las universidades berlinesas. Varios ESN por universidad. Eventos constantes para conectar desde el día 1." },
          { label: "Ambiente internacional", score: 9.0, desc: "Estudiantes de 150+ países. La ciudad más internacional de Alemania." },
          { label: "Fiesta y vida nocturna", score: 10.0, desc: "Berghain, Tresor, Watergate. La meca del techno mundial. Experiencia única." },
          { label: "Eventos y actividades", score: 9.8, desc: "Festival of Lights, Berlin Music Week, mercados navideños épicos." },
        ],
        reviews: [
          { text: "Berlín te cambia la perspectiva de la vida. La libertad que respiras no existe en ningún otro sitio.", author: "Felix, Erasmus 2023", flag: "🇫🇷" },
          { text: "Entrar al Berghain fue la experiencia más memorable de mi Erasmus.", author: "Yuki, Exchange 2024", flag: "🇯🇵" },
          { text: "Mi grupo de amigos era de 8 países distintos. Eso no pasa en ningún otro sitio.", author: "Sophie, Erasmus 2023", flag: "🇨🇭" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 8.8,
        summary: "La ciudad más internacional de Alemania. El inglés funciona perfectamente en todos lados.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 9.5, desc: "Todo el mundo habla inglés. Berlín funciona en inglés perfectamente." },
          { label: "Ambiente internacional", score: 9.5, desc: "35% de residentes son de fuera de Alemania. La ciudad más diversa del país." },
          { label: "Actitud local", score: 8.0, desc: "Los berlineses son directos, no siempre cálidos al principio, pero muy abiertos." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Nunca necesité el alemán. Todo el mundo cambiaba al inglés antes de que terminara de intentarlo.", author: "Giulia, Erasmus 2023", flag: "🇮🇹" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 9.4,
        summary: "El mejor transporte público de Alemania. 24h los fines de semana. Cobertura total.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.5, desc: "Red amplísima. Nunca esperas más de 5 minutos. Funciona 24h viernes y sábado." },
          { label: "Ciudad caminable", score: 9.0, desc: "700km de carril bici. La bici es el transporte más usado por jóvenes." },
          { label: "Conexiones nacionales", score: 10.0, desc: "49€/mes para toda Alemania. El mayor cambio en transporte público europeo en décadas." },
        ],
        reviews: [
          { text: "El transporte de Berlín me hizo olvidar que tenía coche en casa.", author: "Mikael, Erasmus 2024", flag: "🇸🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.4,
        summary: "Libertad, cultura, creatividad. Una ciudad que te expande como persona.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 8.5, desc: "30% de la ciudad es parques y lagos. Müggelsee, Wannsee — playas urbanas épicas." },
          { label: "Clima", score: 6.2, desc: "Inviernos largos y grises. Veranos cortos pero intensos y maravillosos. Verano (jun–ago): Los mejores meses. Lagos, terrazas, festivales. Berlín en verano es otro planeta. Invierno (dic–feb): Frío, gris y lluvioso. Los días son cortos. Requiere adaptación anímica." },
          { label: "Calidad de vida", score: 8.7, desc: "Libertad, cultura, creatividad. Una ciudad que te expande como persona." },
          { label: "Autenticidad local", score: 8.5, desc: "La ciudad más multicultural de Alemania. Comida de 80 culturas en cada barrio." },
          { label: "Estilo de vida", score: 8.0, desc: "Ritmo de vida intenso pero con mucho espacio para la introspección y la creatividad." },
        ],
        reviews: [
          { text: "Berlín no es una ciudad. Es un estado mental. Salí siendo otra persona.", author: "David, Work&Travel 2023", flag: "🇨🇴" },
          { text: "La libertad que te da Berlín para ser quien quieras ser es irrepetible.", author: "Alex, Erasmus 2024", flag: "🇬🇧" },
          { text: "El invierno es duro pero los berlineses saben cómo sobrevivir con buen humor.", author: "Aleksei, Erasmus 2024", flag: "🇷🇺" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 8.9,
        summary: "El hub de startups más grande de Europa. Oportunidades en tech, creativas y fintech.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 9.5, desc: "Rocket Internet, Zalando, N26, Delivery Hero. Berlín es la capital startup de Europa." },
          { label: "Prácticas", score: 9.0, desc: "Moda, diseño, música, cine, publicidad. La industria creativa más densa de Alemania." },
          { label: "Empresas relevantes", score: 8.5, desc: "Miles de empresas internacionales buscando talento joven. El inglés es suficiente." },
          { label: "Oportunidades para estudiantes", score: 8.9, desc: "El hub de startups más grande de Europa. Oportunidades en tech, creativas y fintech." },
        ],
        reviews: [
          { text: "Conseguí trabajo en una startup fintech antes de terminar mi Erasmus. Me quedé 2 años.", author: "Tom, Erasmus→Job 2022", flag: "🇳🇱" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 7.5,
        summary: "Segura para una capital grande. Precaución en algunos barrios de noche.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 7.5, desc: "Ciudad segura. Estadísticas de criminalidad bajas para su tamaño." },
          { label: "Seguridad nocturna", score: 7.0, desc: "Zonas de fiesta bien vigiladas. Atención normal en estaciones de metro de noche." },
          { label: "Ambiente de la ciudad", score: 8.0, desc: "Prenzlauer Berg y Mitte muy seguros. Más precaución en algunas zonas de Neukölln." },
        ],
        reviews: [
          { text: "Me sentí segura en todo momento, incluso volviendo sola de noche.", author: "Marie, Erasmus 2023", flag: "🇫🇷" },
        ],
      },
      ],
  },
  paris: {
    heroImg: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=85",
    tagline: "Sí, es tan bonita como en las fotos. La ciudad más icónica del mundo sigue siendo insuperable en cultura, gastronomía y romanticismo.",
    atmosphere: "Romántica, intelectual e inexplicablemente perfecta. París huele a croissant recién horneado y tierra mojada, y suena a acordeón en los puentes sobre el Sena al atardecer.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 5.5,
        summary: "Cara, sí. Pero con residencias CROUS y beca Erasmus+ máxima es más viable de lo que parece. 1.000–1.400€/mes.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 4.5, desc: "Habitaciones desde 700–1.100€. Residencias CROUS desde 400€ — la opción más inteligente. Solicítalas el primer día." },
          { label: "Comida y supermercados", score: 7.5, desc: "Boulangeries para desayunos baratos (croissant 1,20€). Mercados del barrio asequibles. Monoprix y Franprix para el día a día." },
          { label: "Transporte", score: 7.5, desc: "Navigo mensual a 86€ — metro, RER, autobús y tranvía ilimitados en toda la región parisina. Vélib' para complementar." },
          { label: "Ocio y gastos diarios", score: 6.5, desc: "Cervezas a 5–8€ en bares. Pero museos gratis menores de 26 años (UE) — el Louvre, Orsay, Pompidou gratis siempre." },
        ],
        reviews: [
          { text: "Con la residencia CROUS a 430€ y la beca Erasmus+ máxima, París era viable. Sin eso, muy difícil. Planifica bien.", author: "Isabel, Erasmus 2024", flag: "🇪🇸" },
          { text: "Los museos gratis para menores de 26 me cambiaron la vida. El Louvre un martes por la tarde sin colas. Eso no tiene precio.", author: "Jonas, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 4.0,
        summary: "Crisis de vivienda severa. Las residencias CROUS son la mejor opción — solicítalas el primer día sin excusa.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 3.5, desc: "Mercado de los más difíciles de Europa. Altísima demanda con oferta insuficiente. Sin plan B preparado, el riesgo es alto." },
          { label: "Precio", score: 4.0, desc: "700–1.100€ habitación en el mercado libre. CROUS desde 400€ — la única opción realmente asequible." },
          { label: "Facilidad de búsqueda", score: 5.0, desc: "CROUS (solicitar desde el primer día), PAP, SeLoger, grupos de Facebook de la Sorbonne. Empieza 4 meses antes." },
          { label: "Residencias universitarias", score: 6.0, desc: "La residencia CROUS me la dieron por nota académica. Sin ella no sé cómo habría podido ir. Es el primer trámite que tienes que hacer." },
        ],
        reviews: [
          { text: "La residencia CROUS me la dieron por nota académica. Sin ella no sé cómo habría podido ir. Es el primer trámite que tienes que hacer.", author: "Nadia, Erasmus 2024", flag: "🇵🇱" },
          { text: "Tardé 3 meses buscando en el mercado libre. Al final encontré algo en Belleville — lejos del centro pero con buena conexión.", author: "Tom, Erasmus 2023", flag: "🇦🇺" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.9,
        summary: "Noches parisinas legendarias. Oberkampf, Pigalle y los clubs del Marais definen una escena nocturna única en el mundo. Una de las comunidades Erasmus más grandes de Europa. +12.000 internacionales entre todas las universidades parisinas.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 9.0, desc: "+12.000 internacionales entre Sorbonne, Sciences Po, HEC, Dauphine y decenas de grandes écoles. La más grande de esta guía. ESN Paris muy activo. Boat parties en el Sena, visitas nocturnas al Louvre, soirées internacionales, trips a la costa normanda." },
          { label: "Ambiente internacional", score: 9.0, desc: "No solo europea — estudiantes de todo el mundo eligen París. La comunidad más global y diversa de esta guía." },
          { label: "Fiesta y vida nocturna", score: 9.5, desc: "Oberkampf, Canal Saint-Martin, Le Marais. Terrazas llenas de vida hasta la madrugada. París inventó el arte de la terraza." },
          { label: "Eventos y actividades", score: 10.0, desc: "ESN muy activo en Sorbonne y Sciences Po. Boat parties en el Sena, visitas nocturnas a museos, soirées internacionales." },
        ],
        reviews: [
          { text: "La Fête de la Musique el 21 de junio — música gratis en cada esquina de la ciudad hasta el amanecer. No existe nada igual.", author: "Camille, Erasmus 2023", flag: "🇧🇪" },
          { text: "El Rex Club un viernes es una experiencia que todo amante de la música electrónica tiene que vivir.", author: "Marco, Exchange 2024", flag: "🇮🇹" },
          { text: "La boat party del ESN en el Sena con la Torre Eiffel de fondo fue la noche más bonita de mi vida.", author: "Valentina, Erasmus 2023", flag: "🇮🇹" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.5,
        summary: "París ha mejorado mucho. Los parisinos son más abiertos de lo que su fama sugiere, especialmente en entornos universitarios.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 7.0, desc: "El francés importa más aquí que el inglés en otras ciudades. Hacer el esfuerzo de hablar francés cambia completamente la experiencia." },
          { label: "Actitud local", score: 7.5, desc: "Los parisinos son menos fríos de lo que su reputación sugiere. En entornos universitarios y de barrio son muy abiertos." },
          { label: "Integración con locales", score: 8.0, desc: "La comunidad Erasmus es enorme y facilita la vida social. Integrarse con locales requiere esfuerzo pero vale cada segundo." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Aprendí francés en tres meses por necesidad. Al final fue el mejor regalo que me dio París — y fue obligado.", author: "Lena, Erasmus 2024", flag: "🇩🇪" },
          { text: "Los parisinos son normales, no el monstruo que todos describen. Si hablas francés aunque sea mal, te tratan genial.", author: "Miguel, Erasmus 2023", flag: "🇪🇸" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 9.0,
        summary: "El metro más denso de Europa. 16 líneas, RER regional y una red que llega absolutamente a todo. Puntual y eficiente.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.5, desc: "16 líneas, 302 estaciones. La red más densa de Europa. Nunca más de 500m de una boca de metro en el centro." },
          { label: "Conexiones nacionales", score: 9.0, desc: "5 líneas de RER que conectan toda la región parisina — Versalles, aeropuertos, Fontainebleau. Todo con el Navigo." },
          { label: "Ciudad caminable", score: 8.5, desc: "20.000 bicis Vélib' por toda la ciudad. La red ciclista de París ha mejorado enormemente en los últimos años." },
        ],
        reviews: [
          { text: "El Navigo mensual a 86€ incluía hasta Versalles en RER. Fui cuatro veces en un semestre. Inmejorable.", author: "Alice, Erasmus 2023", flag: "🇬🇧" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.0,
        summary: "La ciudad más icónica del mundo por algo. Cultura, gastronomía, arquitectura y romanticismo en concentración máxima.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.5, desc: "Espacios naturales y zonas verdes accesibles desde la ciudad." },
          { label: "Clima", score: 6.8, desc: "Oceánico suave. Inviernos grises pero no muy fríos. Primavera y otoño son la mejor época para vivir París. Verano: 22–30°C, soleado. París en verano — terrazas, picnics en el Champ de Mars, jardines en flor. La mejor versión de la ciudad. Invierno: 5–10°C, gris y con lluvia frecuente. No hace tanto frío como otras capitales pero la falta de sol tiene impacto anímico." },
          { label: "Calidad de vida", score: 9.2, desc: "La ciudad más icónica del mundo por algo. Cultura, gastronomía, arquitectura y romanticismo en concentración máxima." },
          { label: "Autenticidad local", score: 10.0, desc: "Croissants, baguettes, fromages, vins. La gastronomía francesa es Patrimonio Cultural Inmaterial de la Humanidad. Por algo." },
          { label: "Estilo de vida", score: 8.5, desc: "Cara y con el piso difícil, pero la experiencia de vivir en París transforma. Sales siendo una persona diferente." },
        ],
        reviews: [
          { text: "Vivir en París te enseña a apreciar la belleza en lo cotidiano. Un café en una terraza de Oberkampf se convierte en el momento más importante del día.", author: "Sophie, Erasmus 2024", flag: "🇧🇪" },
          { text: "El Louvre un martes por la tarde vacío, gratis, con 25 años. Eso no lo da ninguna otra ciudad del mundo.", author: "Hugo, Erasmus 2023", flag: "🇧🇷" },
          { text: "París en primavera es lo más bonito que he visto en mi vida. Los jardines de Luxemburgo en abril son otro mundo.", author: "Elisa, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 9.3,
        summary: "Hub de moda, lujo, finanzas, medios y consultoría. Las mejores empresas del mundo tienen su sede europea en París.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 10.0, desc: "LVMH, Kering, Chanel, Hermès, L'Oréal. La capital mundial de la moda y el lujo. Sin competencia posible." },
          { label: "Prácticas", score: 9.5, desc: "BNP Paribas, Société Générale, McKinsey, BCG. Hub financiero de primer orden europeo con salarios top." },
          { label: "Empresas relevantes", score: 9.0, desc: "Criteo, Deezer, Dailymotion, Le Monde, Canal+. Ecosistema tech y de medios muy activo en la estación de F." },
          { label: "Oportunidades para estudiantes", score: 9.3, desc: "Hub de moda, lujo, finanzas, medios y consultoría. Las mejores empresas del mundo tienen su sede europea en París." },
        ],
        reviews: [
          { text: "Hice prácticas en LVMH. Sin haber estado en París no habría tenido ni la entrevista. La ciudad te abre puertas que no existen en ningún otro sitio.", author: "Clara, Internship 2024", flag: "🇪🇸" },
          { text: "El CV con 'Sciences Po París' es la llave maestra de Europa. Todo el mundo lo reconoce y lo respeta.", author: "Romain, Erasmus 2023", flag: "🇨🇭" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 7.0,
        summary: "Ciudad segura en general con más precaución necesaria en algunas zonas y en el transporte público.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 7.5, desc: "Ciudad segura en zonas universitarias y turísticas principales. Sin problemas graves en el día a día estudiantil." },
          { label: "Ambiente de la ciudad", score: 6.0, desc: "Presentes en el metro, Torre Eiffel y zonas muy turísticas. Bolsillos interiores y mochila al pecho en aglomeraciones." },
          { label: "Ambiente de la ciudad", score: 7.0, desc: "Latin Quarter, Le Marais y Montmartre muy seguros. Más precaución en algunas zonas del norte y nordeste de la ciudad." },
        ],
        reviews: [
          { text: "Me intentaron robar en el metro línea 1. Desde entonces, mochila al pecho siempre en el metro. Lección aprendida.", author: "Peter, Erasmus 2024", flag: "🇨🇿" },
        ],
      },
      ],
  },
  oporto: {
    heroImg: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&q=85",
    tagline: "El secreto mejor guardado de Portugal. Más auténtica que Lisboa, igual de bonita y con el vino do Porto como excusa perfecta para todo.",
    atmosphere: "Romántica, artesanal y genuina. Oporto huele a bacalhau asado y vinho verde, y suena a fado espontáneo saliendo de tabernas con azulejos azules en las paredes.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 8.2,
        summary: "Más asequible que Lisboa y mucho más que cualquier capital occidental. Con 600–800€/mes se vive muy bien.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 7.5, desc: "Habitaciones desde 350–550€. Más barata que Lisboa. Bonfim y Campanhã son las zonas más asequibles para estudiantes." },
          { label: "Comida y supermercados", score: 9.0, desc: "Mercado do Bolhão renovado con precios razonables. Menú del día por 7–9€. Francesinha y bacalhau a precios de verdad." },
          { label: "Transporte", score: 8.5, desc: "Andante mensual a 30€ — metro, autobús y tranvía integrados. La bici funciona bien en zonas planas cerca del río." },
          { label: "Ocio y gastos diarios", score: 8.5, desc: "Cervezas a 1,50–2€. Vino do Porto desde 2€ en bares locales. Mucha vida gratuita en las riberas del Duero." },
        ],
        reviews: [
          { text: "Con 700€/mes vivía mejor que con 1.300€ en mi ciudad. Oporto tiene una relación calidad-precio que no existe en Europa occidental.", author: "Lukas, Erasmus 2024", flag: "🇩🇪" },
          { text: "El menú del día en el barrio de Bonfim: sopa, plato, postre y bebida por 8€. Cada día diferente. Nunca comí tan bien.", author: "Marie, Erasmus 2023", flag: "🇫🇷" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 7.0,
        summary: "El mercado se ha tensionado pero sigue siendo más fácil que Lisboa. Busca con 2 meses de antelación.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 7.0, desc: "Más oferta que Lisboa aunque el turismo presiona el mercado. Los barrios emergentes tienen mejor precio y disponibilidad." },
          { label: "Precio", score: 7.5, desc: "350–550€ habitación. Notablemente más barato que Lisboa para una calidad de vida comparable." },
          { label: "Facilidad de búsqueda", score: 7.0, desc: "Idealista Portugal, Uniplaces, grupos de Facebook de la Universidade do Porto. Proceso más tranquilo que en Lisboa." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "Encontré algo genial en Bonfim en dos semanas. Más fácil de lo que esperaba y mucho más barato que Lisboa.", author: "Lena, Erasmus 2024", flag: "🇦🇹" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.5,
        summary: "Vida nocturna auténtica y sin turistas. Galerias de Paris, Bonfim y la ribera del Duero marcan el ritmo. Comunidad Erasmus grande y muy activa. Oporto está ganando popularidad como destino y la comunidad crece cada año.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.5, desc: "+5.000 internacionales entre la Universidade do Porto, Católica y ISCAP. Comunidad en rápido crecimiento. ESN Porto muy activo. Wine tastings, trips a Douro Valley, surf en Matosinhos, cenas internacionales cada semana." },
          { label: "Ambiente internacional", score: 8.5, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 9.5, desc: "La calle de bares más auténtica de Oporto. Sin turistas, llena de locales y estudiantes. Una rareza en Portugal." },
          { label: "Eventos y actividades", score: 10.0, desc: "ESN activo. Queima das Fitas (fiesta universitaria anual) es una de las más grandes de Portugal. ESN trips semanales." },
        ],
        reviews: [
          { text: "Galerias de Paris un jueves por la noche es lo más auténtico que he vivido en Europa. Sin turistas, puro Oporto.", author: "Sofia, Erasmus 2023", flag: "🇬🇷" },
          { text: "La Queima das Fitas fue lo más épico de mi Erasmus. Una semana entera de fiesta con toda la ciudad volcada.", author: "Rafa, Erasmus 2024", flag: "🇪🇸" },
          { text: "El ESN organizó una visita a una bodega del Duero. Cata de Porto y paisaje increíble por 15€. No existe nada igual.", author: "Pierre, Erasmus 2023", flag: "🇫🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 9.0,
        summary: "Los portuenses son de los más acogedores de Europa. Ciudad abierta con mucha menos saturación turística que Lisboa.",
        color: "#14B8A6",
        subcategories: [
          { label: "Actitud local", score: 9.5, desc: "Los portuenses son directos, orgullosos y extraordinariamente generosos. La hospitalidad portuguesa en su versión más auténtica." },
          { label: "Nivel de inglés", score: 8.5, desc: "El inglés funciona bien en zonas universitarias. El español es comprendido fácilmente. El portugués se aprende rápido." },
          { label: "Integración con locales", score: 9.0, desc: "Al ser menos turística que Lisboa, la integración con locales es más fácil y más profunda. Menos burbuja Erasmus." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Mi vecino portuense me enseñó más de la ciudad en una tarde que el ESN en un mes. La gente de aquí es de otra pasta.", author: "Emma, Erasmus 2024", flag: "🇸🇪" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 7.8,
        summary: "Metro que cubre los puntos clave, autobuses para el resto y tranvías históricos para los turistas. Bici en zonas planas.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 8.0, desc: "6 líneas que conectan bien el aeropuerto, universidades y el centro. Puntual y limpio. Pase Andante muy asequible." },
          { label: "Topografía", score: 6.0, desc: "Las colinas de Oporto son legendarias. Subir a pie puede ser agotador — los autobuses y el metro compensan esto." },
          { label: "Conexiones nacionales", score: 8.0, desc: "Tren a Lisboa (2h45), Braga (1h), Vigo (2h). Acceso fácil al norte de Portugal y Galicia española." },
          { label: "Escapadas de fin de semana", score: 8.0, desc: "Excelente posición para escapadas: Tren a Lisboa (2h45), Braga (1h), Vigo (2h). Acceso fácil al norte de Portugal y Galicia española." },
        ],
        reviews: [
          { text: "Las colinas son brutales pero te pones en forma sin querer. Después de un mes, ya no te das cuenta.", author: "Carlos, Erasmus 2023", flag: "🇧🇷" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.6,
        summary: "Una de las ciudades con mejor calidad de vida por precio de esta guía. Belleza, autenticidad, gastronomía y mar.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 9.0, desc: "Matosinhos para surf, Foz do Douro para paseos, Valle del Duero a 1h para vino y paisaje. Naturaleza en todas direcciones." },
          { label: "Clima", score: 8.2, desc: "Clima atlántico con mucho sol y algo de lluvia en invierno. Más fresco que Lisboa pero muy agradable todo el año. Verano: 22–28°C, soleado. Las playas de Matosinhos y Foz do Douro a 20 minutos. La brisa atlántica suaviza el calor. Invierno: 10–16°C. Llueve más que Lisboa pero raramente hace frío de verdad. El invierno más suave de la Península después del sur." },
          { label: "Calidad de vida", score: 9.0, desc: "Una de las ciudades con mejor calidad de vida por precio de esta guía. Belleza, autenticidad, gastronomía y mar." },
          { label: "Autenticidad local", score: 9.5, desc: "Francesinha, bacalhau à Brás, pastéis de nata, vinho verde. Y el vino do Porto como banda sonora de cada tarde." },
          { label: "Estilo de vida", score: 9.0, desc: "Ritmo de vida perfecto. Sin el estrés de las grandes capitales, con todo lo necesario para vivir muy bien." },
        ],
        reviews: [
          { text: "Oporto es la ciudad más bonita en la que he vivido. Y encima la más barata de esta parte de Europa. No tiene explicación.", author: "Tom, Erasmus 2024", flag: "🇬🇧" },
          { text: "El atardecer desde el Puente de Dom Luís con una copa de Porto en la mano. Eso es vivir.", author: "Léa, Erasmus 2023", flag: "🇫🇷" },
          { text: "El invierno fue más lluvioso de lo esperado pero nunca frío. Con un buen abrigo y un café, Oporto en invierno tiene su encanto.", author: "Ana, Erasmus 2023", flag: "🇵🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.2,
        summary: "Ecosistema en crecimiento. Tech, turismo y startups empiezan a mirar a Oporto como alternativa real a Lisboa.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 7.5, desc: "UPTEC (parque tecnológico de la universidad) atrae startups crecientes. Menos que Lisboa pero en rápido crecimiento." },
          { label: "Prácticas", score: 8.0, desc: "El boom turístico ha creado muchas oportunidades en hostelería, guías y experiencias gastronómicas." },
          { label: "Empresas relevantes", score: 6.5, desc: "Menos presencia de multinacionales que Lisboa pero algunas como Farfetch tienen centros importantes en Oporto." },
          { label: "Oportunidades para estudiantes", score: 7.2, desc: "Ecosistema en crecimiento. Tech, turismo y startups empiezan a mirar a Oporto como alternativa real a Lisboa." },
        ],
        reviews: [
          { text: "Hice prácticas en una startup del UPTEC. Ambiente increíble, equipo joven y todo en inglés. Oporto está despegando.", author: "Marta, Internship 2024", flag: "🇪🇸" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.8,
        summary: "Una de las ciudades más seguras de la Península Ibérica. Ambiente tranquilo incluso de noche.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 9.0, desc: "Muy segura para estándares europeos. Criminalidad baja incluso para Portugal." },
          { label: "Seguridad nocturna", score: 8.5, desc: "Las zonas de fiesta son seguras. Galerias de Paris y la Ribeira muy concurridas y bien vigiladas." },
          { label: "Ambiente de la ciudad", score: 8.5, desc: "Nivel bajo. Algo de atención en las zonas más turísticas pero nada comparado con ciudades del sur de Europa." },
        ],
        reviews: [
          { text: "Me sentí completamente segura en todo momento, incluso volviendo sola a las 4am. Oporto es muy tranquila.", author: "Ingrid, Erasmus 2024", flag: "🇩🇰" },
        ],
      },
      ],
  },
  bruselas: {
    heroImg: "https://images.unsplash.com/photo-1559113202-c916b8e44373?w=1600&q=85",
    tagline: "El corazón político de Europa. Donde la UE toma decisiones, el chocolate es el mejor del mundo y la ciudad real sorprende a todos.",
    atmosphere: "Internacional, política y sorprendentemente acogedora. Bruselas huele a gaufres recién hechos y café, y suena a veinte idiomas mezclados en los pasillos de las instituciones europeas.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 7.0,
        summary: "Precio medio para Europa Occidental. Con 750–1.000€/mes se vive bien en la capital europea.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 6.5, desc: "Habitaciones desde 500–700€. Más asequible que París o Ámsterdam. Ixelles y Saint-Gilles son las zonas más estudiantiles." },
          { label: "Comida y supermercados", score: 8.0, desc: "Mercado du Midi los domingos — el más grande de Bélgica y muy asequible. Chocolate y gaufres de calidad a buen precio." },
          { label: "Transporte", score: 8.5, desc: "STIB mensual a 50€ — metro, tranvía y autobús integrados. La red cubre bien toda la ciudad." },
          { label: "Ocio y gastos diarios", score: 7.5, desc: "Cervezas belgas artesanales a 3–4€. Muchos eventos institucionales gratuitos. Museos muy asequibles." },
        ],
        reviews: [
          { text: "Con 850€/mes vivía bien en Ixelles. Caro para Bélgica pero muy razonable para ser la capital de la UE.", author: "Camille, Internship 2024", flag: "🇫🇷" },
          { text: "El mercado du Midi los domingos me salvó el presupuesto alimentario. Dos horas allí y tenía comida para la semana.", author: "Marco, Erasmus 2023", flag: "🇮🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 6.8,
        summary: "Mercado manejable comparado con París o Ámsterdam. Busca con 2 meses de antelación y tendrás opciones.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 7.0, desc: "Oferta razonable. Menos presión que en otras capitales europeas occidentales. Ixelles y Etterbeek para estudiantes." },
          { label: "Precio", score: 6.5, desc: "500–700€ habitación. Más asequible que París pero subiendo con la demanda de instituciones europeas." },
          { label: "Facilidad de búsqueda", score: 7.0, desc: "Immoweb, grupos de Facebook de ULB y VUB, Erasmus in Brussels. Proceso más fácil que en ciudades del oeste." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "Encontré alojamiento en Etterbeek, a 10 minutos del Parlamento Europeo, en tres semanas. Sin dramas.", author: "Pieter, Internship 2024", flag: "🇳🇱" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.2,
        summary: "Vida nocturna más auténtica de lo que parece. Ixelles, Saint-Gilles y Matongé tienen mucha personalidad. Comunidad Erasmus activa más una enorme comunidad de becarios institucionales. Dos mundos que se complementan.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.5, desc: "+4.500 Erasmus entre ULB, VUB y KU Leuven campus BXL. Más miles de becarios en instituciones europeas. ESN organiza eventos regulares. Chocolate tours, cerveza belga nights, trips a Brujas y Gante." },
          { label: "Ambiente internacional", score: 8.5, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 9.5, desc: "500+ tipos de cerveza belga. Delirium Tremens, Moeder Lambic, À La Mort Subite. La cultura de la cerveza es un arte." },
          { label: "Eventos y actividades", score: 8.5, desc: "ESN activo entre ULB y VUB. Eventos regulares aunque la ciudad dispersa más a la comunidad." },
        ],
        reviews: [
          { text: "La cerveza belga me cambió la vida. Cada bar tiene su carta de 50 tipos y el barman te aconseja. Es una cultura aparte.", author: "Jonas, Erasmus 2023", flag: "🇩🇪" },
          { text: "Place du Châtelain los miércoles por la noche — mercado ambulante, ambiente increíble, muy local.", author: "Sophie, Internship 2024", flag: "🇧🇪" },
          { text: "La mezcla entre Erasmus y becarios de la UE es única. En una semana tenía amigos que trabajaban en la Comisión Europea.", author: "Giulia, Internship 2023", flag: "🇮🇹" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 9.0,
        summary: "La ciudad más internacional de esta guía después de La Haya. El inglés, francés y neerlandés conviven perfectamente.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 9.5, desc: "Ciudad oficialmente trilingüe. El inglés funciona perfectamente. La diversidad lingüística es parte del ADN de la ciudad." },
          { label: "Comunidad europea", score: 10.0, desc: "40.000 funcionarios europeos más miles de becarios de toda la UE. La ciudad más internacional de Europa en términos de diversidad institucional." },
          { label: "Actitud local", score: 8.0, desc: "Los bruselenses son acogedores y acostumbrados a vivir con gente de todo el mundo. Sin xenofobia ni barreras." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "En mi piso éramos de 6 países distintos y hablábamos 4 idiomas. Bruselas normaliza eso totalmente.", author: "Elena, Internship 2024", flag: "🇷🇴" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.2,
        summary: "Metro, tranvía y autobús bien integrados. Tren a París, Ámsterdam y Londres con Eurostar y Thalys.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 8.0, desc: "4 líneas de metro y red de tranvías que cubre bien la ciudad. Puntual y cómodo para el día a día." },
          { label: "Ciudad caminable", score: 7.5, desc: "Villo! (bici compartida) muy útil. La ciudad está mejorando su infraestructura ciclista aunque todavía con trabajo pendiente." },
          { label: "Conexiones nacionales", score: 9.5, desc: "Eurostar a Londres (2h), Thalys a París (1h22) y Ámsterdam (1h48). El hub ferroviario internacional de Europa." },
        ],
        reviews: [
          { text: "En fin de semana podía estar en París en 1h22. Eso cambia totalmente las posibilidades de viajar desde Bruselas.", author: "Lara, Erasmus 2023", flag: "🇪🇸" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.0,
        summary: "Ciudad más rica de lo que parece al primer golpe de vista. Chocolate, cerveza, arte nouveau y el pulso europeo.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.5, desc: "Espacios naturales y zonas verdes accesibles desde la ciudad." },
          { label: "Clima", score: 5.8, desc: "Clima oceánico con mucha lluvia y cielos grises. Veranos agradables pero cortos. El paraguas es esencial. Verano: 18–24°C, con días soleados perfectos para terrazas y parques. El Bois de la Cambre lleno de vida. Invierno: Gris, húmedo y con días muy cortos. El clima belga en invierno es uno de los más duros anímicamente de Europa." },
          { label: "Calidad de vida", score: 8.2, desc: "Ciudad más rica de lo que parece al primer golpe de vista. Chocolate, cerveza, arte nouveau y el pulso europeo." },
          { label: "Autenticidad local", score: 9.5, desc: "Chocolate Neuhaus, cervezas Trappistes, moules-frites, gaufres de Lieja. La gastronomía más subestimada de Europa." },
          { label: "Estilo de vida", score: 8.0, desc: "Ciudad que no impresiona a primera vista pero enamora con el tiempo. La Bruselas real está escondida para quien la busca." },
        ],
        reviews: [
          { text: "Bruselas me tardó en gustar pero al final fue la ciudad que más eché de menos. Tiene algo difícil de explicar.", author: "Sara, Erasmus 2024", flag: "🇵🇹" },
          { text: "La gastronomía belga es la más infravalorada de Europa. Chocolate, cerveza y mejillones — la trinidad perfecta.", author: "James, Exchange 2023", flag: "🇦🇺" },
          { text: "El invierno gris fue duro. Pero la vida interior de Bruselas — cafés, museos, cervecerías — lo compensa bien.", author: "Marc, Internship 2023", flag: "🇫🇷" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 9.2,
        summary: "La mejor ciudad de Europa para prácticas en instituciones europeas, política y relaciones internacionales.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 10.0, desc: "Parlamento Europeo, Comisión, Consejo, BCE. El Schuman Traineeship es el programa de prácticas más prestigioso de Europa." },
          { label: "Prácticas", score: 9.5, desc: "Miles de ONGs, think tanks y organizaciones de lobby con sede en Bruselas. Oportunidades para todo tipo de perfiles." },
          { label: "Empresas relevantes", score: 8.5, desc: "Muchas empresas internacionales con sede o delegación en Bruselas por la presencia institucional." },
          { label: "Oportunidades para estudiantes", score: 9.2, desc: "La mejor ciudad de Europa para prácticas en instituciones europeas, política y relaciones internacionales." },
        ],
        reviews: [
          { text: "Conseguí un Schuman Traineeship en el Parlamento Europeo. Seis meses que definieron mi carrera en política europea.", author: "Clara, Internship 2024", flag: "🇩🇪" },
          { text: "Si quieres trabajar en Europa, Bruselas es donde tienes que estar. Los contactos que haces aquí no los haces en ningún otro sitio.", author: "Alejandro, Internship 2023", flag: "🇪🇸" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 7.2,
        summary: "Segura en zonas institucionales y universitarias. Algunos barrios periféricos requieren más atención.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 7.5, desc: "Ciudad segura en general. Las zonas universitarias e institucionales son muy tranquilas." },
          { label: "Ambiente de la ciudad", score: 6.5, desc: "Molenbeek y algunas zonas del norte requieren más precaución. Ixelles, Uccle y Etterbeek son muy seguros." },
          { label: "Seguridad nocturna", score: 7.5, desc: "El centro y las zonas de fiesta son seguros. Precaución estándar en zonas más periféricas de noche." },
        ],
        reviews: [
          { text: "Viví en Ixelles sin ningún problema. La clave es conocer bien qué zonas evitar, como en cualquier ciudad grande.", author: "Nina, Erasmus 2024", flag: "🇩🇪" },
        ],
      },
      ],
  },
  rosenheim: {
    heroImg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85",
    tagline: "La puerta a los Alpes bávaros. Pequeña, auténtica y a 60km de Múnich — la experiencia alemana sin el ruido de las grandes ciudades.",
    atmosphere: "Tranquila, alpina y profundamente bávara. Rosenheim huele a madera de pino y cerveza artesanal, y suena al silencio de los Alpes roto por el tañido de campanas de iglesia.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 7.5,
        summary: "Más asequible que Múnich con acceso a todo lo que ofrece. Con 650–850€/mes se vive muy bien.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 7.5, desc: "Habitaciones desde 400–600€. Significativamente más barata que Múnich a solo 40 minutos en tren." },
          { label: "Comida y supermercados", score: 8.0, desc: "Mercado semanal en la Ludwigsplatz con productos bávaros frescos. Supermercados bien surtidos a precios razonables." },
          { label: "Transporte", score: 7.5, desc: "Deutschlandticket a 49€/mes cubre todo — incluyendo el tren a Múnich. Sin coche es completamente viable." },
          { label: "Ocio y gastos diarios", score: 8.0, desc: "Cervezas en biergartens locales a 3–4€. Naturaleza gratuita por todas partes. Sin el precio premium de las grandes ciudades." },
        ],
        reviews: [
          { text: "Pagaba 480€ de habitación y en 40 minutos de tren estaba en Múnich. Lo mejor de los dos mundos.", author: "Klaus, Erasmus 2024", flag: "🇦🇹" },
          { text: "El Deutschlandticket lo cambió todo. Por 49€ al mes tenía Múnich, los Alpes y toda Baviera a mi disposición.", author: "Sarah, Exchange 2023", flag: "🇬🇧" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 8.2,
        summary: "El mercado más fácil de los destinos alemanes de esta guía. Buena oferta y precios razonables.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 8.5, desc: "Oferta amplia para el tamaño de la comunidad estudiantil. Sin la presión brutal de Múnich." },
          { label: "Precio", score: 8.0, desc: "400–600€ habitación. Considerablemente más barato que Múnich para acceso similar a la región." },
          { label: "Facilidad de búsqueda", score: 8.0, desc: "La propia universidad (TH Rosenheim) tiene bolsa de alojamiento. WG-Gesucht y grupos de Facebook universitarios." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "La universidad me ayudó a encontrar alojamiento antes de llegar. En dos semanas tenía todo resuelto. Imposible en Múnich.", author: "Lena, Erasmus 2023", flag: "🇦🇹" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 6.2,
        summary: "Vida social tranquila y muy local. La naturaleza y los viajes a Múnich son el ocio principal. Comunidad muy pequeña pero muy unida. Si buscas calidad de relaciones sobre cantidad, es perfecta.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 6.5, desc: "Comunidad muy pequeña pero muy unida. Si buscas calidad de relaciones sobre cantidad, es perfecta." },
          { label: "Ambiente internacional", score: 6.5, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 7.0, desc: "Varios biergardens tradicionales bávaros. Ambiente muy local y auténtico — sin turistas, sin poses." },
          { label: "Eventos y actividades", score: 9.5, desc: "Salzburgo a 45 minutos, Innsbruck a 1h30, Múnich a 40 minutos. Base perfecta para explorar la región alpina." },
        ],
        reviews: [
          { text: "No vine por la vida nocturna — vine por los Alpes. Y fue la mejor decisión de mi vida académica.", author: "Petra, Erasmus 2023", flag: "🇳🇱" },
          { text: "La comunidad Erasmus era pequeñísima pero nos volvimos familia. 8 personas muy unidas durante todo el semestre.", author: "Nico, Exchange 2024", flag: "🇫🇷" },
          { text: "Éramos 20 Erasmus y acabamos siendo una familia. Me llevo amigos de por vida de una ciudad que nadie conoce.", author: "Hugo, Erasmus 2024", flag: "🇫🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.8,
        summary: "Bávaros auténticos y muy acogedores. Menos inglés que en las grandes ciudades — el alemán abre todas las puertas.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 6.5, desc: "Menos inglés que en Múnich. El alemán es esencial para integrarse con los locales. Un reto pero muy recompensado." },
          { label: "Actitud local", score: 9.0, desc: "Bávaros genuinamente acogedores con los pocos extranjeros que llegan. Sin la frialdad de las grandes ciudades." },
          { label: "Integración con locales", score: 8.5, desc: "Al ser tan pequeña, la integración con locales es mucho más profunda que en cualquier gran ciudad." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Los vecinos me invitaron a su Brotzeit (merienda bávara) la primera semana. En Múnich eso nunca habría pasado.", author: "Mia, Exchange 2023", flag: "🇩🇰" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 7.8,
        summary: "Perfectamente conectada con Múnich y los Alpes. A pie dentro de la ciudad, en tren para todo lo demás.",
        color: "#F59E0B",
        subcategories: [
          { label: "Ciudad caminable", score: 9.5, desc: "Ciudad completamente caminable. Del campus al centro en 15 minutos. Bici para los más activos." },
          { label: "Tren a Múnich", score: 9.0, desc: "Tren directo a Múnich cada 30 minutos, 40 minutos de trayecto. Con Deutschlandticket sale gratis del bono mensual." },
          { label: "Escapadas de fin de semana", score: 9.5, desc: "Chiemsee en autobús, estaciones de ski en coche compartido o bus regional. Todo muy accesible." },
        ],
        reviews: [
          { text: "Iba a Múnich tres veces por semana sin pensarlo. El tren es puntual y el Deutschlandticket hace que no cueste nada extra.", author: "Tom, Erasmus 2024", flag: "🇬🇧" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.2,
        summary: "Calidad de vida altísima para quien busca naturaleza, autenticidad y tranquilidad. El antídoto a las grandes ciudades.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 10.0, desc: "Chiemsee, Alpes, bosques bávaros. La naturaleza más espectacular de esta guía a precios de vida razonables." },
          { label: "Clima", score: 7.5, desc: "Clima alpino con cuatro estaciones marcadas. Nieve en invierno garantizada, veranos frescos y muy agradables. Verano: 20–26°C, fresco y soleado. Los lagos alpinos cercanos son perfectos. Sin el calor sofocante de las ciudades del sur. Invierno: Nieve garantizada. Frío pero con los Alpes a 30 minutos se convierte en una ventaja enorme para el ski." },
          { label: "Calidad de vida", score: 8.8, desc: "Calidad de vida altísima para quien busca naturaleza, autenticidad y tranquilidad. El antídoto a las grandes ciudades." },
          { label: "Autenticidad local", score: 10.0, desc: "Tradiciones, trajes típicos, Oktoberfest local, biergardens centenarios. Baviera sin filtro turístico." },
          { label: "Estilo de vida", score: 8.0, desc: "Ritmo de vida que combina trabajo, cultura y ocio de forma equilibrada." },
        ],
        reviews: [
          { text: "El Erasmus más tranquilo y productivo que podría haber tenido. Estudié más, gasté menos y viví mejor. No cambiaría nada.", author: "Julia, Erasmus 2024", flag: "🇮🇹" },
          { text: "Rosenheim es para quien quiere un Erasmus diferente. Si buscas fiesta, ve a otro sitio. Si buscas vida, ven aquí.", author: "Christoph, Exchange 2023", flag: "🇦🇹" },
          { text: "Esquié 8 veces en un semestre por menos de lo que mis amigos gastaban en una noche de fiesta en Múnich.", author: "Marc, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.0,
        summary: "Industria local sólida y acceso a todo el ecosistema de Múnich a 40 minutos. Mejor para ingeniería y tecnología.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 7.5, desc: "Empresas industriales y tecnológicas medianas con prácticas accesibles. Menos competencia que en Múnich." },
          { label: "Prácticas", score: 8.5, desc: "A 40 minutos de todo el ecosistema de BMW, Siemens y startups de Múnich. Muchos estudiantes hacen prácticas allí." },
          { label: "Empresas relevantes", score: 7.0, desc: "La universidad tiene buenas conexiones con la industria regional. Perfil principalmente técnico e ingenieril." },
          { label: "Oportunidades para estudiantes", score: 7.0, desc: "Industria local sólida y acceso a todo el ecosistema de Múnich a 40 minutos. Mejor para ingeniería y tecnología." },
        ],
        reviews: [
          { text: "Hice prácticas en una empresa de Múnich desde Rosenheim. El tren diario era cómodo y el alquiler era la mitad.", author: "Felix, Internship 2023", flag: "🇩🇪" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 9.5,
        summary: "Una de las ciudades más seguras de esta guía. Ambiente rural-urbano sin ningún problema de seguridad reseñable.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 9.5, desc: "Ciudad pequeña bávara sin ningún problema de seguridad. La criminalidad es prácticamente inexistente." },
          { label: "Seguridad nocturna", score: 9.5, desc: "Completamente segura en todo momento. La tranquilidad de una ciudad pequeña de montaña." },
          { label: "Ambiente de la ciudad", score: 9.5, desc: "Comunidad local cohesionada donde todos se conocen. El ambiente más seguro de esta guía." },
        ],
        reviews: [
          { text: "Nunca pensé en la seguridad ni una sola vez. Es ese tipo de lugar.", author: "Anna, Exchange 2023", flag: "🇸🇪" },
        ],
      },
      ],
  },
  londres: {
    heroImg: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=85",
    tagline: "La capital del mundo. Donde el inglés se perfecciona en semanas, los contactos duran toda la vida y las oportunidades no tienen rival.",
    atmosphere: "Cosmopolita, acelerada e infinita. Londres huele a fish and chips y lluvia sobre asfalto, y suena a decenas de idiomas mezclados en el metro más antiguo del mundo.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 4.5,
        summary: "La ciudad más cara de esta guía. Con 1.200–1.600€/mes se sobrevive. Para vivir bien, más.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 3.5, desc: "Habitaciones desde 800–1.200€. House shares son la única opción viable. Zonas como Stratford o Hackney son más asequibles." },
          { label: "Comida y supermercados", score: 6.0, desc: "Supermercados como Lidl y Aldi salvan el presupuesto. Mercados como Borough Market o Portobello para caprichos asequibles." },
          { label: "Transporte", score: 5.5, desc: "Oyster Card imprescindible. El metro más caro de Europa — hasta 6£ por trayecto en hora punta. Pase mensual a 180£." },
          { label: "Ocio y gastos diarios", score: 5.0, desc: "Cervezas a 6–8£. Entrada a clubs 15–25£. Pero museos y galerías nacionales completamente gratis — una ventaja enorme." },
        ],
        reviews: [
          { text: "Es brutal de cara. Pero con la beca Erasmus+ máxima y un house share bien buscado, es viable. Justo.", author: "Irene, Erasmus 2024", flag: "🇪🇸" },
          { text: "Gasté más que en cualquier otro sitio pero lo que gané en inglés, contactos y experiencia no tiene precio.", author: "Marco, Internship 2023", flag: "🇮🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 3.8,
        summary: "Crisis de vivienda severa. Junto a Ámsterdam, el mercado más difícil de esta guía. Empieza a buscar ya.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 4.0, desc: "Demanda enorme, oferta insuficiente. La crisis de vivienda londinense es real y afecta directamente a los Erasmus." },
          { label: "Precio", score: 3.0, desc: "800–1.200£ habitación. Los precios más altos de esta guía. House shares son la única opción para presupuestos Erasmus." },
          { label: "Facilidad de búsqueda", score: 5.0, desc: "Rightmove, SpareRoom, Uniplaces. Residencias universitarias son la mejor opción — pídelas en cuanto te acepten." },
          { label: "Residencias universitarias", score: 6.0, desc: "Las residencias de UCL me salvaron. Sin eso no sé si habría podido ir. Solicítalas el primer día sin falta." },
        ],
        reviews: [
          { text: "Las residencias de UCL me salvaron. Sin eso no sé si habría podido ir. Solicítalas el primer día sin falta.", author: "Klara, Erasmus 2024", flag: "🇵🇱" },
          { text: "Tardé 8 semanas desde Alemania. Muchas estafas en el camino. Usa solo plataformas verificadas.", author: "Jonas, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.5,
        summary: "Escena nocturna de clase mundial. Fabric, XOYO, Printworks. Para todos los gustos y a todas las horas. Comunidad internacional enorme pero dispersa por el tamaño de la ciudad. UCL y King's lideran.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.0, desc: "+3.000 Erasmus entre UCL, King's, LSE y Queen Mary. Grande pero la ciudad lo diluye más que en ciudades pequeñas. ESN organiza eventos regulares pero la ciudad es tan grande que la comunidad está más fragmentada que en otras ciudades." },
          { label: "Ambiente internacional", score: 8.0, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 9.5, desc: "Fabric, XOYO, Fabric, Village Underground. La escena de clubs más diversa de Europa. Techno, drum & bass, grime, jazz." },
          { label: "Eventos y actividades", score: 8.5, desc: "O2 Arena, Brixton Academy, Royal Albert Hall. Los mejores artistas del mundo pasan por Londres primero." },
        ],
        reviews: [
          { text: "Fabric un sábado es una experiencia que todo amante de la música electrónica tiene que vivir al menos una vez.", author: "Alex, Erasmus 2023", flag: "🇩🇪" },
          { text: "El pub de mi barrio en Hackney se convirtió en mi sala de estar. Ahí hice mis mejores amigos londinenses.", author: "Sienna, Exchange 2024", flag: "🇦🇺" },
          { text: "La comunidad Erasmus era más pequeña de lo esperado pero la red de contactos que hice vale más que en cualquier otra ciudad.", author: "Beatriz, Internship 2024", flag: "🇧🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 8.8,
        summary: "La ciudad más diversa del mundo. El inglés es el idioma nativo y la diversidad es el ADN de Londres.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 10.0, desc: "Inglés nativo de inmersión total. En pocas semanas el salto es notable. La mejor ciudad del mundo para aprenderlo." },
          { label: "Ambiente internacional", score: 10.0, desc: "Más de 300 idiomas hablados. El 37% de la población nació fuera del Reino Unido. Diversidad que no existe en ningún otro sitio." },
          { label: "Actitud local", score: 7.5, desc: "Los londinenses son educados pero reservados — el famoso 'British politeness'. Conectar lleva más tiempo que en el sur." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Llegué con B2 de inglés y en tres meses pensaba en inglés. La inmersión es total y sin red de seguridad.", author: "Paula, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.0,
        summary: "El metro más antiguo del mundo — lento pero legendario. Autobuses rojos icónicos. Caro pero funciona.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 8.0, desc: "11 líneas que cubren toda la ciudad. Puntual en general aunque con averías frecuentes. Caro sin Oyster Card." },
          { label: "Transporte público", score: 8.5, desc: "Red de autobuses enorme y que llega a todos lados. Más barato que el metro. Los autobuses nocturnos son esenciales." },
          { label: "Ciudad caminable", score: 7.5, desc: "Santander Cycles (Boris Bikes) muy útiles en el centro. La ciudad está mejorando su infraestructura ciclista." },
          { label: "Conexiones nacionales", score: 9.5, desc: "Heathrow, Gatwick, Stansted, Luton. El hub aéreo más importante de Europa. Vuelos a cualquier parte del mundo." },
        ],
        reviews: [
          { text: "El Tube es lento y caro pero lo cubre todo. La Oyster Card es lo primero que debes conseguir al llegar.", author: "Yuki, Exchange 2023", flag: "🇯🇵" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 6.8,
        summary: "Cara y caótica, pero con una oferta cultural, gastronómica y de oportunidades que no existe en ningún otro sitio.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 9.0, desc: "Hyde Park, Regent's Park, Hampstead Heath. El 47% de Londres es espacio verde. Increíble para una megalópolis." },
          { label: "Clima", score: 5.2, desc: "El famoso clima londinense es real. Lluvia frecuente, cielos grises y sol que se celebra como victoria. Verano: 18–25°C, con días soleados épicos. Los parques se llenan de vida. El verano londinense es genuinamente bonito. Invierno: Gris, húmedo y con días muy cortos. No hace tanto frío pero la falta de sol tiene impacto anímico real." },
          { label: "Calidad de vida", score: 8.5, desc: "Cara y caótica, pero con una oferta cultural, gastronómica y de oportunidades que no existe en ningún otro sitio." },
          { label: "Autenticidad local", score: 9.5, desc: "La ciudad más diversa gastronómicamente de Europa. Cada cocina del mundo representada al más alto nivel." },
          { label: "Estilo de vida", score: 7.5, desc: "El coste y el ritmo intenso tienen su precio. Pero la experiencia de vivir en Londres es transformadora e irrepetible." },
        ],
        reviews: [
          { text: "Londres te come pero también te construye. Salí siendo una persona completamente diferente — más segura, más capaz.", author: "Nina, Erasmus 2024", flag: "🇩🇪" },
          { text: "Los museos gratuitos me salvaron muchos fines de semana. La oferta cultural gratuita de Londres no existe en ningún otro sitio.", author: "Hugo, Exchange 2023", flag: "🇫🇷" },
          { text: "El primer mes gris fue duro. Luego salió el sol un martes y todo el parque se llenó de gente en bikini. Los ingleses son únicos.", author: "Carla, Erasmus 2023", flag: "🇪🇸" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 9.8,
        summary: "La mejor ciudad del mundo para internships. Finanzas, tech, media, moda, consultoría — todo al más alto nivel.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 10.0, desc: "Goldman Sachs, JPMorgan, Barclays, HSBC. La capital financiera de Europa. Las prácticas más competitivas y mejor remuneradas." },
          { label: "Prácticas", score: 9.5, desc: "DeepMind, Revolut, Monzo, Deliveroo. El hub tech más grande de Europa. Oportunidades en todos los niveles." },
          { label: "Empresas relevantes", score: 9.5, desc: "BBC, Sky, Condé Nast, Burberry. Londres es la capital mundial de los medios y la moda anglosajona." },
          { label: "Oportunidades para estudiantes", score: 9.8, desc: "La mejor ciudad del mundo para internships. Finanzas, tech, media, moda, consultoría — todo al más alto nivel." },
        ],
        reviews: [
          { text: "Hice prácticas en Goldman Sachs. Sin haber estado en Londres antes no hubiera conseguido ni la entrevista. La ciudad abre puertas.", author: "Thomas, Internship 2024", flag: "🇨🇭" },
          { text: "El CV con 'Londres' marca la diferencia. Los reclutadores lo notan. Vale cada libra gastada.", author: "Priya, Internship 2023", flag: "🇮🇳" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 7.2,
        summary: "Segura en zonas universitarias y turísticas. Más precaución en algunos barrios periféricos de noche.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 7.5, desc: "Ciudad segura en términos generales. La mayoría de barrios estudiantiles son tranquilos y bien vigilados." },
          { label: "Seguridad nocturna", score: 7.0, desc: "Zonas de fiesta seguras. Precaución en estaciones de metro solitarias de madrugada y algunas zonas periféricas." },
          { label: "Ambiente de la ciudad", score: 7.0, desc: "Hackney, Stratford, Brixton tienen partes muy seguras y otras más delicadas. Aprende tu barrio bien." },
        ],
        reviews: [
          { text: "Nunca tuve problemas serios pero London te enseña a estar alerta. Es una ciudad grande y hay que conocerla.", author: "Liam, Exchange 2023", flag: "🇮🇪" },
        ],
      },
      ],
  },
  munich: {
    heroImg: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=1600&q=85",
    tagline: "La capital de Baviera. Los Alpes a una hora, el Oktoberfest en casa y la mejor calidad de vida de Alemania.",
    atmosphere: "Ordenada, festiva y eficiente. Múnich huele a pretzel y cerveza de trigo, y suena a conversaciones en bávaro mezcladas con inglés en beergardens llenos de sol.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 5.8,
        summary: "La ciudad más cara de Alemania. Con 1.000–1.300€/mes se vive bien si controlas el alquiler.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 4.5, desc: "Habitaciones desde 700–1.000€. El mercado más tenso de Alemania. WG (pisos compartidos) es la única opción realista." },
          { label: "Comida y supermercados", score: 7.0, desc: "Viktualienmarkt para productos frescos de calidad. Supermercados Aldi y Lidl para el día a día. Comer fuera es caro." },
          { label: "Transporte", score: 7.5, desc: "Isarcard mensual a 57€ — metro, autobús, tranvía y tren regional incluidos. Bien conectada internamente." },
          { label: "Ocio y gastos diarios", score: 6.5, desc: "Cervezas en biergarten a 4–5€. Oktoberfest aparte — allí una Mass (litro) cuesta 15€. Mucha oferta cultural gratuita." },
        ],
        reviews: [
          { text: "Es cara pero con la beca Erasmus+ máxima y una WG bien ubicada es viable. Lo más difícil fue encontrar el piso.", author: "Julia, Erasmus 2024", flag: "🇪🇸" },
          { text: "El English Garden en verano es gratis y es lo mejor de la ciudad. Munich sabe darte mucho sin gastar.", author: "Luca, Erasmus 2023", flag: "🇮🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 4.0,
        summary: "El mercado más difícil de Alemania. Empieza a buscar 4–5 meses antes y ten documentación perfecta lista.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 3.5, desc: "Crisis de vivienda severa. Las WG buenas se van en horas. Competencia brutal con locales y otros estudiantes." },
          { label: "Precio", score: 4.0, desc: "700–1.000€ habitación. Los precios más altos de Alemania. WG compartida es la única opción para presupuestos Erasmus." },
          { label: "Facilidad de búsqueda", score: 5.0, desc: "WG-Gesucht es la biblia. Residencias de LMU y TUM muy limitadas — solicítalas el primer día sin falta." },
          { label: "Residencias universitarias", score: 6.0, desc: "La residencia universitaria me la dieron por sorteo. Sin ella no sé si habría podido ir. Fundamental solicitarla a tiempo." },
        ],
        reviews: [
          { text: "Mandé 100 solicitudes en WG-Gesucht en dos meses. Conseguí 3 visitas. Empieza en enero para octubre.", author: "Sofía, Erasmus 2024", flag: "🇦🇷" },
          { text: "La residencia universitaria me la dieron por sorteo. Sin ella no sé si habría podido ir. Fundamental solicitarla a tiempo.", author: "David, Erasmus 2023", flag: "🇧🇪" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.5,
        summary: "Biergardens, Oktoberfest y una escena de clubs sorprendentemente buena. La fiesta bávara tiene su propia personalidad. Gran comunidad internacional entre LMU y TUM. Activa, diversa y con muy buen networking profesional.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.5, desc: "+4.500 internacionales entre LMU, TUM y Munich UAS. Comunidad grande y bien organizada. ESN Munich muy activo. Oktoberfest en grupo, ski trips, cenas internacionales, visitas a BMW Welt." },
          { label: "Ambiente internacional", score: 8.5, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 10.0, desc: "Rote Sonne, Blitz, Harry Klein. Escena electrónica seria aunque más pequeña que Berlín. Muy buena calidad." },
          { label: "Eventos y actividades", score: 8.0, desc: "ESN activo en LMU y TUM. Eventos desde la semana de bienvenida, excursiones a los Alpes y al lago Starnberg." },
        ],
        reviews: [
          { text: "El Oktoberfest fue lo más loco y bonito que he vivido. Nada te prepara para eso. Imprescindible.", author: "Camille, Erasmus 2023", flag: "🇫🇷" },
          { text: "El Chinesischer Turm en el English Garden un domingo soleado es la imagen perfecta de vivir en Múnich.", author: "Erik, Exchange 2024", flag: "🇸🇪" },
          { text: "El ESN organizó una mesa reservada en el Oktoberfest la primera semana. Ahí conocí a mis mejores amigos del Erasmus.", author: "Marie, Erasmus 2023", flag: "🇫🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 8.2,
        summary: "Ciudad muy internacional por su tamaño y economía. El inglés funciona bien en entornos universitarios y tech.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 7.5, desc: "El inglés funciona bien en campus y empresas internacionales. El alemán marca la diferencia para integrarse con locales." },
          { label: "Actitud local", score: 8.0, desc: "Los bávaros son orgullosos de su cultura pero acogedores. Más cálidos que los berlineses en el trato personal." },
          { label: "Integración con locales", score: 8.5, desc: "Ciudad muy internacional — el 40% de la población tiene raíces extranjeras. Fácil encontrar comunidad." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Los bávaros al principio parecen serios pero en el biergarten se abren totalmente. La cerveza es el idioma universal aquí.", author: "Pedro, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 9.0,
        summary: "El mejor transporte público de Baviera. Metro puntual, red densa y el Deutschlandticket para toda Alemania.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.0, desc: "8 líneas que cubren toda la ciudad. Puntual al minuto, limpio y con frecuencia alta. Referente alemán." },
          { label: "Transporte público", score: 9.0, desc: "Conecta con los lagos (Starnberg, Ammersee) y el aeropuerto. Esencial para escapadas de fin de semana cercanas." },
          { label: "Escapadas de fin de semana", score: 10.0, desc: "Garmisch-Partenkirchen a 1h30 en tren. Esquí, senderismo y lagos alpinos al alcance de cualquier fin de semana." },
        ],
        reviews: [
          { text: "Con el Deutschlandticket fui a Berlín, Hamburgo y Viena en tren. Todo desde Múnich, todo por 49€ al mes.", author: "Anna, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.2,
        summary: "La mejor calidad de vida de Alemania. Alpes, cultura, seguridad, gastronomía bávara y eficiencia alemana en un paquete único.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 10.0, desc: "Lagos alpinos, ski en invierno, senderismo en verano. La naturaleza bávara es un privilegio diario." },
          { label: "Clima", score: 7.2, desc: "Veranos soleados y agradables, inviernos fríos con nieve. Los Alpes regulan el clima y añaden magia al paisaje. Verano: 22–28°C, soleado. El English Garden se convierte en la playa urbana más grande de Europa. Perfecto. Invierno: Frío real, -5 a -10°C posibles. Nieve frecuente pero los mercados navideños son de los más bonitos de Europa." },
          { label: "Calidad de vida", score: 9.2, desc: "La mejor calidad de vida de Alemania. Alpes, cultura, seguridad, gastronomía bávara y eficiencia alemana en un paquete único." },
          { label: "Autenticidad local", score: 9.0, desc: "Weisswurst, Brezel, Schweinshaxe, Weizenbier. La cocina bávara es contundente, deliciosa y muy celebrada." },
          { label: "Estilo de vida", score: 9.0, desc: "Cara pero la calidad de todo — transporte, seguridad, naturaleza, servicios — justifica el precio para muchos." },
        ],
        reviews: [
          { text: "Múnich es cara pero te da todo a cambio. Salí con los mejores recuerdos, los mejores contactos y una perspectiva de vida diferente.", author: "Isabelle, Erasmus 2024", flag: "🇧🇪" },
          { text: "Esquiar los Alpes un sábado y cenar en un biergarten el domingo. Eso es la calidad de vida de Múnich.", author: "Klaus, Exchange 2023", flag: "🇦🇹" },
          { text: "El English Garden en verano con la gente surfeando en el río Eisbach es lo más surreal y bonito que he visto.", author: "Tom, Erasmus 2023", flag: "🇬🇧" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 9.5,
        summary: "El hub industrial y tecnológico más potente de Alemania. BMW, Siemens, Allianz y un ecosistema tech en auge.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 10.0, desc: "BMW, MAN, MTU. La automoción alemana tiene su corazón en Múnich. Prácticas de ingeniería de primer nivel mundial." },
          { label: "Prácticas", score: 9.5, desc: "Allianz, Munich Re, HypoVereinsbank. El hub financiero más importante del sur de Alemania." },
          { label: "Empresas relevantes", score: 9.0, desc: "Siemens, MBition (Mercedes), Celonis. Ecosistema tech creciente con salarios muy competitivos." },
          { label: "Oportunidades para estudiantes", score: 9.5, desc: "El hub industrial y tecnológico más potente de Alemania. BMW, Siemens, Allianz y un ecosistema tech en auge." },
        ],
        reviews: [
          { text: "Hice prácticas en BMW. El nivel técnico y la organización eran impresionantes. Múnich es el sitio para la ingeniería en Europa.", author: "Stefan, Internship 2024", flag: "🇵🇱" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 9.2,
        summary: "Una de las ciudades más seguras de Europa. Múnich tiene estadísticas de criminalidad excepcionalmente bajas.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 9.5, desc: "Consistentemente rankeada como una de las ciudades más seguras de Europa. Criminalidad muy baja." },
          { label: "Seguridad nocturna", score: 9.0, desc: "Completamente segura de noche en todas las zonas del centro. Sin barrios conflictivos reales." },
          { label: "Ambiente de la ciudad", score: 9.0, desc: "Problema muy menor. Solo precaución básica en el Oktoberfest por la aglomeración." },
        ],
        reviews: [
          { text: "La ciudad más segura en la que he vivido en mi vida. Nunca me sentí en peligro ni un solo momento.", author: "Ingrid, Erasmus 2024", flag: "🇳🇴" },
        ],
      },
      ],
  },

  "la-haya": {
    heroImg: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1600&q=85",
    tagline: "La capital diplomática del mundo. Donde la ONU, el mar del Norte y la bici conviven en perfecta armonía.",
    atmosphere: "Elegante, internacional y sorprendentemente tranquila. La Haya huele a mar del Norte y café de oficina, y suena a conversaciones en veinte idiomas en los pasillos de organismos internacionales.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 6.5,
        summary: "Cara para estándares holandeses. Con 900–1.100€/mes se vive bien si controlas el ocio.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 5.5, desc: "Habitaciones desde 600–850€. Más barata que Ámsterdam pero el mercado es competitivo. Busca con antelación." },
          { label: "Comida y supermercados", score: 7.0, desc: "Haagse Markt — el mercado más grande y barato de Holanda. Albert Heijn para compra diaria asequible." },
          { label: "Transporte", score: 7.0, desc: "OV-chipkaart obligatoria. Tram y autobús bien conectados. La bici propia es la opción más económica y práctica." },
          { label: "Ocio y gastos diarios", score: 6.5, desc: "Cervezas a 4–5€. Menos opciones de ocio barato que Ámsterdam pero el mar a 15 minutos compensa." },
        ],
        reviews: [
          { text: "Es cara, no voy a mentir. Pero la calidad de vida y el nivel de las prácticas en organismos internacionales lo justifican.", author: "Valentina, Internship 2024", flag: "🇦🇷" },
          { text: "El Haagse Markt me salvó el presupuesto. Fruta, verdura y comida étnica a precios ridículos.", author: "Pieter, estudiante local", flag: "🇳🇱" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 5.5,
        summary: "Mercado tenso. Más fácil que Ámsterdam pero hay que buscar con mucha antelación.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 5.5, desc: "Menos presión que Ámsterdam pero el mercado sigue siendo competitivo. Busca 3 meses antes mínimo." },
          { label: "Precio", score: 5.5, desc: "600–850€ habitación. Caro para lo que se recibe pero está en línea con el mercado holandés." },
          { label: "Facilidad de búsqueda", score: 6.0, desc: "Kamernet, Pararius, grupos de Facebook de La Haya University. La búsqueda requiere paciencia y rapidez." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "Tardé 6 semanas pero encontré algo en Laak — más asequible y con buena conexión al centro.", author: "Sofia, Internship 2024", flag: "🇪🇸" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 7.4,
        summary: "Vida nocturna más tranquila que Ámsterdam pero con personalidad propia. Ideal para quien busca algo más calmado. Comunidad más pequeña que otras ciudades pero muy internacional y profesional. Calidad sobre cantidad.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 7.8, desc: "+2.500 internacionales entre La Haya University y los estudiantes de Leiden campus La Haya. ESN activo con eventos regulares. Visitas a organismos internacionales, networking events, excursiones." },
          { label: "Ambiente internacional", score: 7.8, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 7.0, desc: "Centrum tiene buenos bares. Paard van Troje para conciertos. Menos opciones que Ámsterdam pero sin aglomeraciones." },
          { label: "Eventos y actividades", score: 8.0, desc: "Holland Dance Festival, Parkpop (el festival gratuito más grande de Europa). Agenda cultural muy rica." },
        ],
        reviews: [
          { text: "La vida social es diferente — más adulta, más internacional. Me gustó más que la escena universitaria típica.", author: "Nora, Internship 2023", flag: "🇳🇴" },
          { text: "Scheveningen un viernes por la tarde con colegas de prácticas de diez países. Eso es La Haya.", author: "Kai, Exchange 2024", flag: "🇩🇪" },
          { text: "La comunidad de becarios de la ONU y tribunales internacionales es increíble. Hice contactos que valen oro.", author: "Julia, Internship 2023", flag: "🇩🇪" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 9.0,
        summary: "La ciudad más internacional de Holanda. Todo el mundo habla inglés y está acostumbrado a trabajar con personas de todo el mundo.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 9.5, desc: "Todo el mundo habla inglés perfectamente. La ciudad funciona al 100% en inglés sin necesidad de neerlandés." },
          { label: "Ambiente internacional", score: 9.5, desc: "Con 100+ organizaciones internacionales, La Haya es la ciudad más acostumbrada a la diversidad de Holanda." },
          { label: "Actitud local", score: 8.5, desc: "Holandeses directos y muy abiertos. Sin rodeos pero muy respetuosos. Fácil hacer amigos reales." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Nunca me sentí extranjera. En la oficina éramos de 15 países y el inglés era el idioma natural de todos.", author: "Amara, Internship 2024", flag: "🇬🇭" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.5,
        summary: "Tranvías eficientes y bici omnipresente. A Ámsterdam en 50 minutos, al mar en 15. Posición perfecta.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 8.5, desc: "Red de tranvías HTM muy fiable. Cubre toda la ciudad con frecuencia alta. OV-chipkaart integrada." },
          { label: "Ciudad caminable", score: 9.5, desc: "Infraestructura ciclista perfecta como en toda Holanda. La bici propia es la forma más rápida de moverse." },
          { label: "Conexiones nacionales", score: 9.0, desc: "Tren a Ámsterdam (50min), Rotterdam (25min), Leiden (15min). Posición central perfecta en la Randstad." },
          { label: "Escapadas de fin de semana", score: 9.0, desc: "Excelente posición para escapadas: Tren a Ámsterdam (50min), Rotterdam (25min), Leiden (15min). Posición central perfecta en la Randstad." },
        ],
        reviews: [
          { text: "Compré una bici de segunda mano por 80€ y me movía por toda la ciudad en la mitad de tiempo que en tranvía.", author: "Lars, Exchange 2023", flag: "🇸🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.0,
        summary: "Altísima calidad de vida. Mar, bici, cultura, seguridad y la ciudad más internacional del mundo en un paquete compacto.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 9.0, desc: "Scheveningen y Kijkduin a 15 minutos. Dunas, mar del Norte y atardeceres espectaculares." },
          { label: "Clima", score: 5.5, desc: "Clima oceánico con mucho viento y lluvia. El mar del Norte marca el ritmo. Verano agradable pero corto. Verano: 18–24°C, con días soleados perfectos para la playa de Scheveningen. El mejor momento para vivir la ciudad. Invierno: Gris, lluvioso y ventoso. El viento del mar del Norte puede ser brutal. Ropa impermeable imprescindible." },
          { label: "Calidad de vida", score: 8.5, desc: "Altísima calidad de vida. Mar, bici, cultura, seguridad y la ciudad más internacional del mundo en un paquete compacto." },
          { label: "Autenticidad local", score: 10.0, desc: "100+ organizaciones internacionales. La ciudad más diplomática del mundo. Una experiencia de vida sin parangón." },
          { label: "Estilo de vida", score: 8.5, desc: "Ciudad tranquila, ordenada y con todo lo necesario. Perfecta para quien quiere calidad de vida sin el caos de una gran metrópolis." },
        ],
        reviews: [
          { text: "La Haya tiene todo lo que necesitas sin el estrés de Ámsterdam. Mar, cultura, trabajo. La combinación perfecta.", author: "Isabelle, Internship 2024", flag: "🇧🇪" },
          { text: "Ver La joven de la perla de Vermeer en el Mauritshuis y luego tomar una cerveza en la playa. Eso es La Haya.", author: "Tom, Exchange 2023", flag: "🇦🇺" },
          { text: "El invierno fue durísimo anímicamente. Pero los holandeses tienen una actitud ante el mal tiempo que te contagia.", author: "Miguel, Internship 2023", flag: "🇧🇷" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 9.5,
        summary: "La mejor ciudad del mundo para prácticas en organismos internacionales, derecho y relaciones internacionales.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 10.0, desc: "ONU, CIJ, CPI, OIAC, Europol, Eurojust. Ninguna ciudad del mundo concentra tantas instituciones internacionales." },
          { label: "Prácticas", score: 10.0, desc: "La capital mundial del derecho internacional. Imprescindible para estudiantes de derecho y RRII." },
          { label: "Empresas relevantes", score: 9.0, desc: "Decenas de ONGs y centros de investigación internacionales con programas de prácticas activos." },
          { label: "Oportunidades para estudiantes", score: 9.5, desc: "La mejor ciudad del mundo para prácticas en organismos internacionales, derecho y relaciones internacionales." },
        ],
        reviews: [
          { text: "Hice prácticas en la CPI. Algo que no habría podido hacer en ninguna otra ciudad del mundo. Punto.", author: "Claire, Internship 2024", flag: "🇫🇷" },
          { text: "Si estudias derecho internacional o RRII, La Haya no es una opción — es una obligación.", author: "Alejandro, Internship 2023", flag: "🇲🇽" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.8,
        summary: "Una de las ciudades más seguras de Holanda. Ambiente tranquilo y organizado.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 9.0, desc: "Ciudad muy segura. Criminalidad baja incluso para estándares holandeses." },
          { label: "Seguridad nocturna", score: 8.5, desc: "Sin zonas especialmente conflictivas. El centro es seguro en todo momento." },
          { label: "Ambiente de la ciudad", score: 9.0, desc: "Problema muy menor. Nada comparable a ciudades más turísticas del sur de Europa." },
        ],
        reviews: [
          { text: "Me sentí completamente segura en todo momento, incluso sola de noche. La Haya es muy tranquila.", author: "Emma, Internship 2024", flag: "🇫🇷" },
        ],
      },
      ],
  },
  amsterdam: {
    heroImg: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&q=85",
    tagline: "La ciudad más liberal y abierta de Europa. Todo el mundo habla inglés, todo el mundo va en bici y los canales son Patrimonio UNESCO.",
    atmosphere: "Liberal, creativa y en perpetuo movimiento. Ámsterdam huele a stroopwafel y canal, y suena a ruedas de bici sobre adoquines mojados al amanecer.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 5.5,
        summary: "Una de las ciudades más caras de Europa. Con 1.100–1.400€/mes se vive bien si encuentras piso.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 4.0, desc: "Habitaciones desde 750–1.100€. El mercado más competitivo de Holanda. Encontrar algo es el mayor reto del Erasmus." },
          { label: "Comida y supermercados", score: 7.0, desc: "Albert Heijn para compra diaria asequible. Albert Cuypmarkt para productos frescos y baratos. Comer fuera es caro." },
          { label: "Transporte", score: 7.5, desc: "OV-chipkaart integra metro, tram y autobús. La bici propia elimina casi todos los gastos de transporte." },
          { label: "Ocio y gastos diarios", score: 5.5, desc: "Cervezas a 5–7€. Entrada a clubs 15–25€. La vida nocturna de calidad tiene un precio claro." },
        ],
        reviews: [
          { text: "Es cara pero con la beca Erasmus y un piso bien ubicado es viable. Eso sí, el piso fue lo más difícil de mi vida.", author: "Laura, Erasmus 2024", flag: "🇪🇸" },
          { text: "Tardé 3 meses en encontrar piso desde Madrid. Empecé a buscar en enero para septiembre. No fue suficiente.", author: "João, Erasmus 2023", flag: "🇵🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 3.5,
        summary: "El mercado más difícil de esta guía. Empieza a buscar 4–5 meses antes y ten un plan B siempre preparado.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 3.0, desc: "Crisis de vivienda real. Miles de estudiantes compiten por cada habitación. Sin exagerar: es la mayor dificultad del Erasmus aquí." },
          { label: "Precio", score: 3.5, desc: "750–1.100€ habitación. Los precios más altos de esta guía con diferencia. Sin techo a la vista." },
          { label: "Facilidad de búsqueda", score: 5.0, desc: "Kamernet, HousingAnywhere, grupos de Facebook de UvA. La universidad tiene residencias — solicítalas el primer día." },
          { label: "Residencias universitarias", score: 6.0, desc: "Conseguí residencia universitaria de UvA. Sin eso no sé cómo habría podido ir. Las residencias son oro." },
        ],
        reviews: [
          { text: "Encontrar alojamiento fue lo más estresante de mi vida. Empieza en enero para septiembre y reza. No es broma.", author: "Marta, Erasmus 2024", flag: "🇵🇱" },
          { text: "Conseguí residencia universitaria de UvA. Sin eso no sé cómo habría podido ir. Las residencias son oro.", author: "Felix, Erasmus 2023", flag: "🇦🇹" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 9.1,
        summary: "Una de las mejores escenas nocturnas de Europa. Clubs de techno, bares de canal y eventos que no paran nunca. Comunidad internacional enorme y muy diversa. Entre UvA y VU hay miles de estudiantes de todo el mundo.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 9.0, desc: "+6.000 internacionales al año entre UvA, VU y Amsterdam UAS. Una de las más grandes de Europa del Norte. ESN Amsterdam organiza eventos épicos: boat parties, bike tours, King's Day events, museum nights." },
          { label: "Ambiente internacional", score: 9.0, desc: "No solo europea — estudiantes de Asia, América y África. La comunidad más global de esta guía." },
          { label: "Fiesta y vida nocturna", score: 9.5, desc: "Shelter, Radion, Melkweg, Paradiso. Escena de clubs de primer nivel mundial. Techno, house y todo lo que quieras." },
          { label: "Eventos y actividades", score: 10.0, desc: "ESN muy activo entre UvA y VU. Boat parties por los canales, bike tours, eventos de bienvenida épicos." },
        ],
        reviews: [
          { text: "King's Day en Ámsterdam es la experiencia más increíble que he vivido. Nada se le acerca en toda Europa.", author: "Sophie, Erasmus 2023", flag: "🇫🇷" },
          { text: "La boat party del ESN por los canales fue la noche más memorable del Erasmus. Sin duda.", author: "Lukas, Erasmus 2024", flag: "🇩🇪" },
          { text: "Mi grupo del ESN era de 12 países distintos. Nunca había tenido amigos de Corea, Brasil e India a la vez.", author: "Hanna, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 9.2,
        summary: "La ciudad más abierta e internacional de Holanda. El inglés es prácticamente el idioma oficial del día a día.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 9.5, desc: "Todo el mundo habla inglés perfectamente — incluso los ancianos. Nunca necesitarás el neerlandés." },
          { label: "Ambiente internacional", score: 9.5, desc: "Ciudad histórica de tolerancia y apertura. LGBTQ+ friendly al máximo. Todo el mundo es bienvenido." },
          { label: "Actitud local", score: 8.5, desc: "Holandeses directos y sin rodeos — puede parecer brusco pero es honestidad. Muy abiertos una vez que conectas." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Ámsterdam es la ciudad donde más yo misma me he sentido. La libertad y la apertura son reales, no de postal.", author: "Maya, Erasmus 2024", flag: "🇺🇸" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 9.0,
        summary: "La bici lo es todo. Metro, tram y bus completan una red perfecta. Una de las ciudades más ciclables del mundo.",
        color: "#F59E0B",
        subcategories: [
          { label: "Ciudad caminable", score: 10.0, desc: "800.000 bicis en la ciudad. Infraestructura ciclista perfecta. Sin bici no entiendes Ámsterdam — es parte de su alma." },
          { label: "Transporte público", score: 8.5, desc: "Red integrada y eficiente. El tram cubre el centro, el metro conecta con los barrios exteriores." },
          { label: "Conexiones nacionales", score: 9.0, desc: "Tren a Rotterdam (40min), La Haya (50min), Utrecht (30min), Bruselas (2h). Hub ferroviario internacional." },
          { label: "Escapadas de fin de semana", score: 9.0, desc: "Excelente posición para escapadas: Tren a Rotterdam (40min), La Haya (50min), Utrecht (30min), Bruselas (2h). Hub ferroviario internacional." },
        ],
        reviews: [
          { text: "La primera semana me compraron una bici de segunda mano. La segunda semana ya no podía vivir sin ella.", author: "Clara, Erasmus 2023", flag: "🇧🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.3,
        summary: "Altísima calidad de vida si el presupuesto lo permite. Cultura, libertad, canales y bici. Difícil de superar.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.5, desc: "Espacios naturales y zonas verdes accesibles desde la ciudad." },
          { label: "Clima", score: 5.8, desc: "Oceánico con mucha lluvia y viento. Veranos agradables pero cortos. Hay que adaptarse mentalmente. Verano: 18–24°C, soleado y con terrazas llenas de vida. Los canales en verano son la imagen perfecta de la ciudad. Invierno: Gris, húmedo y con viento. Los días son muy cortos. La ciudad sabe compensarlo con mucha vida interior." },
          { label: "Calidad de vida", score: 8.8, desc: "Altísima calidad de vida si el presupuesto lo permite. Cultura, libertad, canales y bici. Difícil de superar." },
          { label: "Autenticidad local", score: 9.5, desc: "Rijksmuseum, Van Gogh, Anne Frank, Stedelijk. Concentración de museos de primer nivel mundial por metro cuadrado." },
          { label: "Estilo de vida", score: 8.5, desc: "Cara y con el piso difícil, pero la calidad de vida cotidiana — en bici, con canales, con cultura — es excepcional." },
        ],
        reviews: [
          { text: "Ámsterdam te cambia. La libertad que respiras es diferente a todo. Salí siendo otra persona, en el mejor sentido.", author: "Inés, Erasmus 2024", flag: "🇪🇸" },
          { text: "El Rijksmuseum un martes por la tarde sin colas. Luego en bici hasta el mercado. Eso es vivir en Ámsterdam.", author: "Pierre, Erasmus 2023", flag: "🇫🇷" },
          { text: "El invierno fue duro pero los cafés, los museos y la vida social de interior lo compensan. Los holandeses son expertos en el hygge.", author: "Elisa, Erasmus 2023", flag: "🇮🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 9.0,
        summary: "Hub tecnológico, financiero y creativo de primer nivel europeo. Sede de multinacionales y startups top.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 9.5, desc: "Booking.com, TomTom, Adyen, Takeaway. Ecosistema tech de los más maduros de Europa. Mucha demanda en inglés." },
          { label: "Prácticas", score: 9.0, desc: "ASML, ING, ABN AMRO, Flow Traders. Hub financiero y de trading europeo de primer nivel." },
          { label: "Empresas relevantes", score: 8.5, desc: "Agencias de diseño, publicidad, moda y media con sede en Ámsterdam. Muy activo para perfiles creativos." },
          { label: "Oportunidades para estudiantes", score: 9.0, desc: "Hub tecnológico, financiero y creativo de primer nivel europeo. Sede de multinacionales y startups top." },
        ],
        reviews: [
          { text: "Hice prácticas en Booking.com. El nivel era el de cualquier empresa de Silicon Valley. Ámsterdam es ese tipo de ciudad.", author: "Kim, Internship 2024", flag: "🇰🇷" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 7.8,
        summary: "Ciudad segura en general. Atención con carteristas en zonas turísticas y con los robos de bicicletas.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.0, desc: "Ciudad segura para una capital de su tamaño. Poca violencia. El mayor problema son los hurtos." },
          { label: "Robos de bici", score: 5.5, desc: "Los robos de bicicletas son endémicos. Dos candados mínimo — uno para el cuadro, uno para la rueda. Sin excepción." },
          { label: "Zonas turísticas", score: 7.5, desc: "Carteristas en el Barrio Rojo y zonas muy turísticas. Precaución normal con pertenencias en aglomeraciones." },
        ],
        reviews: [
          { text: "Me robaron la bici en la primera semana. Desde entonces, dos candados y la bici dentro de casa si puedo.", author: "Andrei, Erasmus 2024", flag: "🇷🇴" },
        ],
      },
      ],
  },
  rotterdam: {
    heroImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85",
    tagline: "La ciudad que se destruyó y se reinventó más bonita. Arquitectura radical, el mayor puerto de Europa y una energía que no para.",
    atmosphere: "Futurista, multicultural y sin complejos. Rotterdam huele a mar y obra nueva, y suena a grúas del puerto mezcladas con música de decenas de culturas en cada barrio.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 6.8,
        summary: "Más asequible que Ámsterdam pero sigue siendo Holanda. Con 800–1.000€/mes se vive bien.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 6.5, desc: "Habitaciones desde 550–750€. Más barata que Ámsterdam. Kralingen y Delfshaven son las zonas más asequibles." },
          { label: "Comida y supermercados", score: 7.5, desc: "Markthal — espectacular y con opciones para todos los presupuestos. Mercados del barrio más baratos para el día a día." },
          { label: "Transporte", score: 7.5, desc: "Metro + tranvía + autobús con OV-chipkaart. Muy bien conectada internamente y con el resto de Holanda." },
          { label: "Ocio y gastos diarios", score: 7.0, desc: "Cervezas a 4–5€. Muchos eventos culturales gratuitos o muy baratos. Escena más underground y menos cara que Ámsterdam." },
        ],
        reviews: [
          { text: "Rotterdam es Ámsterdam sin el precio ni el turismo masivo. Para mí fue la mejor decisión.", author: "Finn, Erasmus 2024", flag: "🇩🇰" },
          { text: "Con 900€/mes vivía bien. Hubiera necesitado 1.400€ para lo mismo en Ámsterdam.", author: "Sara, Internship 2023", flag: "🇮🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 6.0,
        summary: "Más fácil que Ámsterdam pero el mercado holandés sigue siendo exigente. Empieza la búsqueda pronto.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 6.0, desc: "Más oferta que Ámsterdam pero la demanda crece con la popularidad de la ciudad. Sin margen de relajarse." },
          { label: "Precio", score: 6.5, desc: "550–750€ habitación. Notablemente más barato que Ámsterdam para una calidad comparable." },
          { label: "Facilidad de búsqueda", score: 6.5, desc: "Kamernet, Pararius, grupos de Facebook de Erasmus University Rotterdam. Proceso similar al holandés estándar." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "Tardé 5 semanas pero encontré algo genial en Kralingen — zona estudiantil perfecta y más barata que el centro.", author: "Emma, Erasmus 2024", flag: "🇩🇪" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.1,
        summary: "Escena nocturna más auténtica y underground que Ámsterdam. Sin turistas, con más personalidad. Comunidad Erasmus activa centrada en Erasmus University. Internacional, profesional y bien organizada.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.0, desc: "+3.000 internacionales principalmente en Erasmus University Rotterdam y Rotterdam UAS. ESN Rotterdam organiza eventos regulares. Canal histórico tours, trips a Delft y Gouda, eventos de networking." },
          { label: "Ambiente internacional", score: 8.0, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 8.5, desc: "Rotterdamse Schouwburg, Annabel, Bird. Escena electrónica seria y muy local. Sin el turismo de fiesta de Ámsterdam." },
          { label: "Eventos y actividades", score: 7.5, desc: "North Sea Jazz Festival, Rotterdam Unlimited, Wereldhavendagen. Agenda de eventos de primer nivel internacional." },
        ],
        reviews: [
          { text: "Witte de Withstraat un jueves por la noche es uno de mis mejores recuerdos del Erasmus. Sin turistas, todo local.", author: "Hanna, Erasmus 2023", flag: "🇫🇮" },
          { text: "El North Sea Jazz es increíble. Pasé tres días escuchando música de primer nivel mundial a precios razonables.", author: "Marcus, Exchange 2024", flag: "🇧🇷" },
          { text: "La comunidad era más pequeña que en otras ciudades pero mucho más unida. Todos nos conocíamos.", author: "Lena, Erasmus 2023", flag: "🇦🇹" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 8.8,
        summary: "La ciudad más multicultural de Holanda. El inglés funciona perfectamente y la diversidad es parte del ADN de la ciudad.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 9.5, desc: "Todo el mundo habla inglés. Rotterdam funciona perfectamente en inglés sin necesitar neerlandés." },
          { label: "Ambiente internacional", score: 9.5, desc: "Más del 50% de la población tiene raíces no holandesas. La ciudad más diversa de los Países Bajos sin discusión." },
          { label: "Actitud local", score: 8.5, desc: "Rotterdamers directos, trabajadores y sin pretensiones. Menos elitismo que en Ámsterdam. Muy auténticos." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Rotterdam es la ciudad más diversa en la que he vivido. Cada barrio es un país diferente y todos conviven perfectamente.", author: "Aisha, Erasmus 2024", flag: "🇸🇳" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 9.0,
        summary: "Metro moderno, tranvías eficientes y bici por todas partes. A Ámsterdam en 40 minutos, a La Haya en 25.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.0, desc: "Red de metro moderna y eficiente. Cubre bien todos los barrios principales. Puntual y frecuente." },
          { label: "Ciudad caminable", score: 9.5, desc: "Infraestructura ciclista excelente como en toda Holanda. Imprescindible tener bici propia o de alquiler." },
          { label: "Conexiones nacionales", score: 9.0, desc: "Tren a Ámsterdam (40min), La Haya (25min), Utrecht (35min). Hub de transporte del sur de Holanda." },
          { label: "Escapadas de fin de semana", score: 9.0, desc: "Excelente posición para escapadas: Tren a Ámsterdam (40min), La Haya (25min), Utrecht (35min). Hub de transporte del sur de Holanda." },
        ],
        reviews: [
          { text: "El metro de Rotterdam es de los mejores de Holanda. Puntual, limpio y conecta todo perfectamente.", author: "Joost, Erasmus 2023", flag: "🇳🇱" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 6.9,
        summary: "Ciudad estimulante, diversa y con una arquitectura que no deja de sorprender. La alternativa auténtica a Ámsterdam.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.5, desc: "Espacios naturales y zonas verdes accesibles desde la ciudad." },
          { label: "Clima", score: 5.5, desc: "Clima oceánico clásico. Lluvia frecuente, viento del mar y veranos agradables pero cortos. Verano: 18–24°C, con días soleados perfectos. Las terrazas del Witte de Withstraat se llenan de vida en verano. Invierno: Gris, húmedo y ventoso. El viento en Rotterdam es especialmente fuerte por la proximidad al puerto y el mar." },
          { label: "Calidad de vida", score: 8.3, desc: "Ciudad estimulante, diversa y con una arquitectura que no deja de sorprender. La alternativa auténtica a Ámsterdam." },
          { label: "Autenticidad local", score: 9.0, desc: "La ciudad más multicultural de Holanda tiene la gastronomía más diversa. Cocina surinamesa, turca, marroquí, indonesia..." },
          { label: "Estilo de vida", score: 8.0, desc: "Ciudad con energía propia y sin pretensiones. Perfecta para quien busca autenticidad y no turismo de postal." },
        ],
        reviews: [
          { text: "Rotterdam es la ciudad más honesta que he vivido. Sin poses, sin turistas, con arquitectura que te rompe los esquemas.", author: "David, Erasmus 2024", flag: "🇬🇧" },
          { text: "La Markthal para desayunar un domingo. Eso es Rotterdam en una imagen.", author: "Léa, Exchange 2023", flag: "🇫🇷" },
          { text: "El invierno fue el mayor reto. Pero cuando salía el sol en mayo y la gente llenaba las terrazas, todo tenía sentido.", author: "Carlos, Exchange 2023", flag: "🇨🇱" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 8.5,
        summary: "Hub logístico, portuario y tecnológico de primer nivel europeo. Oportunidades reales en sectores clave.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 9.5, desc: "El mayor puerto de Europa genera miles de oportunidades en logística, supply chain y comercio internacional." },
          { label: "Prácticas", score: 8.5, desc: "Sede de multinacionales como Unilever, ING, Heineken. Hub financiero y de consultoría del sur de Holanda." },
          { label: "Empresas relevantes", score: 8.0, desc: "Ecosistema de startups en crecimiento. RDM Innovation Dock — espacio de innovación ligado al puerto. Mucho potencial." },
          { label: "Oportunidades para estudiantes", score: 8.5, desc: "Hub logístico, portuario y tecnológico de primer nivel europeo. Oportunidades reales en sectores clave." },
        ],
        reviews: [
          { text: "Hice prácticas en el departamento de supply chain del puerto. Una experiencia imposible de replicar en ningún otro sitio de Europa.", author: "Erik, Internship 2024", flag: "🇸🇪" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.0,
        summary: "Ciudad segura en general. Algunos barrios periféricos requieren más precaución que el centro.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.0, desc: "Ciudad segura para su tamaño. La diversidad no equivale a inseguridad — Rotterdam lo demuestra cada día." },
          { label: "Seguridad nocturna", score: 8.0, desc: "El centro y Witte de Withstraat son seguros de noche. Precaución estándar en zonas más periféricas." },
          { label: "Ambiente de la ciudad", score: 7.5, desc: "Delfshaven y Kralingen muy seguros. Algo más de precaución en algunas partes del sur de la ciudad." },
        ],
        reviews: [
          { text: "Me sentí segura en todo momento. Rotterdam tiene fama de dura pero la realidad es mucho más tranquila.", author: "Giulia, Erasmus 2024", flag: "🇮🇹" },
        ],
      },
      ],
  },
  budapest: {
    heroImg: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1600&q=85",
    tagline: "La ciudad más fotogénica de Europa. Baños termales de día, ruin bars de noche y el Danubio siempre de fondo.",
    atmosphere: "Mágica, bohemia y nostálgica. Budapest huele a langos recién fritos y suena a música klezmer saliendo de un ruin bar con paredes cubiertas de arte.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 8.8,
        summary: "Una de las ciudades más baratas de Europa Central. Con 400–600€/mes se vive de maravilla.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 8.5, desc: "Habitaciones desde 250–400€. Pisos en el centro histórico por lo que en Berlín costaría una habitación pequeña." },
          { label: "Comida y supermercados", score: 9.0, desc: "Gran Mercado Central: frutas, especias y comida húngara por muy poco. Menú del día por 4–6€. Langos a 2€." },
          { label: "Transporte", score: 9.5, desc: "Pase mensual metro + autobús + tranvía a 15€. El más barato de esta guía para una capital con metro." },
          { label: "Ocio y gastos diarios", score: 9.0, desc: "Cervezas a 1,50–2€. Ruin bars con entrada gratuita muchas noches. Baños termales por 15–20€." },
        ],
        reviews: [
          { text: "Con 450€/mes vivía mejor que con 1.100€ en Barcelona. Budapest es otro planeta en términos de precio.", author: "Núria, Erasmus 2024", flag: "🇪🇸" },
          { text: "El pase de transporte a 15€ al mes me pareció un error. No era un error.", author: "Thomas, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 7.5,
        summary: "Mercado asequible con buena oferta. Más fácil que cualquier ciudad de Europa Occidental.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 7.5, desc: "Oferta razonable. El turismo ha tensionado algo el mercado pero nada comparable al oeste de Europa." },
          { label: "Precio", score: 8.5, desc: "250–400€ habitación. Pisos enteros desde 600€. Todavía muy asequible para la calidad ofrecida." },
          { label: "Facilidad de búsqueda", score: 7.5, desc: "Albérlet.hu, grupos de Facebook de Corvinus y ELTE, Erasmus in Budapest. Proceso ágil desde el extranjero." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "Encontré un alojamiento en el Distrito VII, a 5 minutos de Szimpla, por 350€. En ningún otro sitio de Europa sería posible.", author: "Lukas, Erasmus 2024", flag: "🇨🇿" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 9.3,
        summary: "Los ruin bars son únicos en el mundo. Budapest tiene una de las escenas nocturnas más originales y vibrantes de Europa. Una de las comunidades Erasmus más vibrantes de Europa Central. +7.500 internacionales al año.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 9.2, desc: "+7.500 Erasmus al año entre Corvinus, ELTE y Budapest University of Technology. Masa crítica enorme. ESN Budapest es de los más activos de Europa. Eventos casi cada día: baños termales, ruin bar nights, cenas." },
          { label: "Ambiente internacional", score: 9.2, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 10.0, desc: "Szimpla Kert, Instant, Fogasház. Bares en edificios en ruinas con salas temáticas, arte y ambiente imposible de copiar." },
          { label: "Eventos y actividades", score: 10.0, desc: "ESN muy activo. Erasmus parties legendarias, cruceros por el Danubio, visitas a los baños termales en grupo." },
        ],
        reviews: [
          { text: "Szimpla Kert un domingo por la mañana con mercadillo incluido. No existe nada igual en Europa.", author: "Camille, Erasmus 2023", flag: "🇫🇷" },
          { text: "Las Erasmus parties en Budapest son legendarias. Gente de 30 países en el mismo sitio cada semana.", author: "Marco, Erasmus 2024", flag: "🇮🇹" },
          { text: "El ESN organizó una noche en los baños termales en la primera semana. Ahí hice los amigos del Erasmus.", author: "Sofia, Erasmus 2023", flag: "🇬🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.8,
        summary: "Ciudad muy acostumbrada al turismo internacional. El inglés funciona bien aunque el húngaro es un mundo aparte.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 7.5, desc: "El húngaro es uno de los idiomas más difíciles de Europa — nadie espera que lo aprendas. El inglés funciona en todas partes." },
          { label: "Actitud local", score: 8.0, desc: "Los húngaros son reservados con desconocidos pero muy hospitalarios cuando te conocen. Muy leales como amigos." },
          { label: "Integración con locales", score: 8.0, desc: "La enorme comunidad Erasmus hace fácil la vida social. Integrarse con locales lleva más tiempo pero vale la pena." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Los húngaros parecen serios al principio pero son de las personas más generosas que he conocido.", author: "Ana, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.8,
        summary: "Red de transporte completa y muy barata. Metro histórico (el 2º más antiguo de Europa), tranvías y autobuses.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.0, desc: "4 líneas incluyendo la línea 1 de 1896 — la 2ª más antigua de Europa continental. Frecuente y fiable." },
          { label: "Transporte público", score: 9.0, desc: "Los tranvías de Budapest son icónicos. La línea 2 junto al Danubio es una de las rutas más bonitas de Europa." },
          { label: "Conexiones nacionales", score: 8.5, desc: "Tren a Viena (2h30), Praga (7h), Bratislava (2h30). Posición central en Europa perfecta para viajar." },
          { label: "Escapadas de fin de semana", score: 8.5, desc: "Excelente posición para escapadas: Tren a Viena (2h30), Praga (7h), Bratislava (2h30). Posición central en Europa perfecta para viajar." },
        ],
        reviews: [
          { text: "El tranvía nocturno junto al Danubio a las 2am es una de las experiencias más bonitas de mi Erasmus.", author: "Ingrid, Erasmus 2023", flag: "🇸🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.0,
        summary: "Difícil encontrar una ciudad que combine mejor precio, belleza, cultura y vida social. Budapest es una joya.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.5, desc: "Espacios naturales y zonas verdes accesibles desde la ciudad." },
          { label: "Clima", score: 7.0, desc: "Cuatro estaciones bien marcadas. Veranos calurosos, inviernos fríos pero no extremos. Primavera espectacular. Verano: 30–35°C, soleado. Las playas del Danubio y los balnearios al aire libre hacen el calor muy llevadero. Invierno: Frío, -5 a -10°C posibles. Puede nevar. Los baños termales calientes son el antídoto perfecto." },
          { label: "Calidad de vida", score: 9.0, desc: "Difícil encontrar una ciudad que combine mejor precio, belleza, cultura y vida social. Budapest es una joya." },
          { label: "Autenticidad local", score: 8.5, desc: "Gulasch, lángos, kürtőskalács. Cocina húngara contundente y deliciosa. Restaurantes excelentes a precios mínimos." },
          { label: "Estilo de vida", score: 9.0, desc: "La combinación de precio bajo, belleza extrema y vida social intensa hace que el bienestar sea altísimo." },
        ],
        reviews: [
          { text: "Budapest tiene algo mágico que no sé explicar. Solo sé que me fui llorando y que volvería mañana.", author: "Alice, Erasmus 2023", flag: "🇫🇷" },
          { text: "Los baños termales un domingo por la mañana se convirtieron en mi ritual semanal. No hay mejor forma de vivir.", author: "Erik, Erasmus 2024", flag: "🇳🇴" },
          { text: "El invierno en los baños termales de Széchenyi, con nieve cayendo alrededor, fue lo más especial del año.", author: "Elisa, Erasmus 2024", flag: "🇮🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.2,
        summary: "Hub regional en crecimiento. Finanzas, tech y empresas internacionales con sede en Budapest.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 7.5, desc: "Muchos centros de servicios compartidos de multinacionales (SSC). Magyar Telekom, Eaton, BT. Buenos para perfiles de negocio." },
          { label: "Prácticas", score: 7.5, desc: "Ecosistema tech húngaro en crecimiento. Prezi nació aquí. Cada vez más startups internacionales." },
          { label: "Empresas relevantes", score: 7.0, desc: "El boom turístico ha creado muchas oportunidades en hostelería, guías y servicios de experiencias." },
          { label: "Oportunidades para estudiantes", score: 7.2, desc: "Hub regional en crecimiento. Finanzas, tech y empresas internacionales con sede en Budapest." },
        ],
        reviews: [
          { text: "Hice prácticas en un SSC de una multinacional americana. Todo en inglés, equipo de 15 nacionalidades. Muy buen nivel.", author: "Kristof, Internship 2023", flag: "🇸🇰" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.0,
        summary: "Ciudad segura en general. Precaución con carteristas en zonas turísticas y transporte en horas punta.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.5, desc: "Ciudad segura para estándares europeos. Poca violencia. El mayor riesgo son hurtos en zonas turísticas." },
          { label: "Seguridad nocturna", score: 8.0, desc: "Las zonas de ruin bars son seguras y muy concurridas. Precaución estándar volviendo solo de madrugada." },
          { label: "Ambiente de la ciudad", score: 7.5, desc: "Presentes en el metro y zonas turísticas como el Distrito VII. Bolsillos interiores recomendados." },
        ],
        reviews: [
          { text: "Me robaron la cartera en el metro en hora punta. Lo típico de las ciudades turísticas. Desde entonces, bolsillo interior.", author: "Jan, Erasmus 2023", flag: "🇵🇱" },
        ],
      },
      ],
  },
  praga: {
    heroImg: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1600&q=85",
    tagline: "La ciudad más bella de Europa Central. Donde la cerveza es más barata que el agua y cada calle parece sacada de un cuento.",
    atmosphere: "Gótica, romántica y vibrante. Praga huele a svíčková y lúpulo fresco, y suena a acordeón en los puentes empedrados al atardecer.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 8.5,
        summary: "Muy asequible para ser una capital tan turística. Con 500–700€/mes se vive muy bien.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 7.5, desc: "Habitaciones desde 300–500€. Más cara que Cracovia o Budapest pero todavía muy razonable." },
          { label: "Comida y supermercados", score: 9.0, desc: "Cerveza a 1€ el litro en bares locales. Menú del día por 5–7€. Evita los restaurantes del centro histórico turístico." },
          { label: "Transporte", score: 9.5, desc: "Pase mensual metro + tranvía + autobús a 20€. Red 24h los fines de semana. Increíble relación calidad-precio." },
          { label: "Ocio y gastos diarios", score: 9.0, desc: "Cervezas a 1–2€. Entrada a clubs entre 5–10€. La vida nocturna más barata de una capital bella de Europa." },
        ],
        reviews: [
          { text: "Salía tres noches por semana y no gastaba más de 30€ en total. En París eso es una copa.", author: "Antoine, Erasmus 2024", flag: "🇫🇷" },
          { text: "La cerveza más barata que el agua no es un mito. Es literalmente verdad en los bares locales.", author: "James, Exchange 2023", flag: "🇬🇧" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 6.8,
        summary: "El mercado se ha tensionado por el turismo. Más difícil que Cracovia o Budapest pero manejable con antelación.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 6.5, desc: "El boom turístico ha reducido la oferta de larga duración. Muchos pisos van a Airbnb. Busca en grupos locales." },
          { label: "Precio", score: 7.0, desc: "300–500€ habitación. Ha subido pero todavía muy por debajo de capitales occidentales." },
          { label: "Facilidad de búsqueda", score: 7.0, desc: "Sreality.cz, grupos de Facebook de Charles University, Erasmus in Prague. Empieza 2–3 meses antes." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "Tardé un mes pero encontré algo genial en Žižkov. Alejado del centro turístico pero con mejor ambiente.", author: "Hannah, Erasmus 2024", flag: "🇦🇺" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 9.0,
        summary: "Escena nocturna enorme y variada. Žižkov, Vinohrady y el underground son el alma de la noche praguense. Una de las comunidades Erasmus más grandes de Europa. +9.000 internacionales entre todas las universidades.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 9.0, desc: "+9.000 internacionales al año entre Charles University, CTU y Prague University of Economics. Enorme. ESN Prague muy organizado. Pub crawls legendarios, trips semanales, eventos de bienvenida masivos." },
          { label: "Ambiente internacional", score: 9.0, desc: "Estudiantes de toda Europa, América y Asia. Una de las comunidades más internacionales de Europa Central." },
          { label: "Fiesta y vida nocturna", score: 9.5, desc: "Bares en sótanos medievales, cervecerías artesanales, terrazas junto al Moldava. Para todos los gustos y a precios mínimos." },
          { label: "Eventos y actividades", score: 9.0, desc: "ESN muy activo. Pub crawls legendarios, cenas internacionales, trips a Dresde y Viena casi cada fin de semana." },
        ],
        reviews: [
          { text: "Náplavka en verano es lo más bonito que he visto en Europa. Música, cerveza y el Moldava de fondo.", author: "Klara, Erasmus 2023", flag: "🇩🇪" },
          { text: "El pub crawl del ESN fue la primera noche — y ahí conocí a mis mejores amigos del Erasmus.", author: "Valentina, Erasmus 2024", flag: "🇮🇹" },
          { text: "El ESN organizaba trips cada fin de semana. Fui a Viena, Dresde y Bratislava por menos de 50€ cada vez.", author: "Rafa, Erasmus 2023", flag: "🇪🇸" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.8,
        summary: "Ciudad muy turística pero con alma propia. El inglés funciona bien, los checos son discretos pero hospitalarios.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 8.5, desc: "Excelente nivel de inglés entre la gente joven. En zonas universitarias y turísticas no hay barrera real." },
          { label: "Actitud local", score: 7.5, desc: "Los checos son reservados y no muy expresivos con desconocidos. Nada de hostilidad — solo discreción cultural." },
          { label: "Integración con locales", score: 7.5, desc: "La burbuja turística es real en el centro. Salir a barrios como Žižkov o Vinohrady abre la puerta a la Praga real." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Al principio parecían fríos pero con tiempo descubrí que son muy divertidos y sarcásticos. Me encantaron.", author: "Pedro, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 9.2,
        summary: "Uno de los mejores transportes públicos de Europa Central. Metro, tranvía y autobús 24h integrados.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.0, desc: "Tres líneas (A, B, C) que cubren todos los puntos clave. Puntual, limpio y muy frecuente." },
          { label: "Transporte público", score: 9.5, desc: "Red de tranvías icónica y eficiente. Funciona 24h. Recorrer Praga en tranvía es una experiencia en sí misma." },
          { label: "Conexiones nacionales", score: 9.0, desc: "Tren a Viena (4h), Berlín (4h30), Budapest (7h). Posición central perfecta para escapadas de fin de semana." },
          { label: "Escapadas de fin de semana", score: 9.0, desc: "Excelente posición para escapadas: Tren a Viena (4h), Berlín (4h30), Budapest (7h). Posición central perfecta para escapadas de fin de semana." },
        ],
        reviews: [
          { text: "El tranvía nocturno de Praga es puntual a las 3am. Algo que muchas ciudades del oeste no pueden decir.", author: "Mikael, Erasmus 2023", flag: "🇫🇮" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.8,
        summary: "Una de las ciudades con mejor relación belleza-precio-calidad de vida de toda Europa. Difícil de superar.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.5, desc: "Espacios naturales y zonas verdes accesibles desde la ciudad." },
          { label: "Clima", score: 6.5, desc: "Cuatro estaciones marcadas. Inviernos fríos con nieve posible, veranos cálidos y muy agradables. Verano: 25–30°C, soleado y perfecto. Náplavka, terrazas y la ciudad entera al aire libre. La mejor época sin duda. Invierno: Frío, -5 a -10°C posibles. Gris con frecuencia. Pero los mercados navideños de Praga son de los más bonitos de Europa." },
          { label: "Calidad de vida", score: 9.0, desc: "Una de las ciudades con mejor relación belleza-precio-calidad de vida de toda Europa. Difícil de superar." },
          { label: "Autenticidad local", score: 8.0, desc: "Svíčková, gulasch, trdelník. Cocina checa contundente. Y una escena foodie moderna en auge en Vinohrady." },
          { label: "Estilo de vida", score: 9.0, desc: "Precio bajo, ciudad preciosa, vida social intensa, buena oferta cultural. La fórmula perfecta del Erasmus." },
        ],
        reviews: [
          { text: "Praga es la ciudad más bonita en la que he estado. Y encima barata. Y encima con buena cerveza. No existe nada mejor.", author: "Oliver, Exchange 2024", flag: "🇬🇧" },
          { text: "Cada vez que tenía un día libre me perdía por un barrio nuevo. En 6 meses no la terminé de descubrir.", author: "Lucia, Erasmus 2023", flag: "🇨🇴" },
          { text: "Los mercados navideños de Praga son lo más bonito que he visto en Europa. Vale la pena el frío.", author: "Elisa, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.5,
        summary: "Hub regional sólido. Tech, finanzas y centros de servicios de multinacionales con fuerte presencia.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 8.0, desc: "Ecosistema tech checo sólido. Avast, Kiwi.com, JetBrains tienen sede aquí. Mucha demanda de perfiles técnicos." },
          { label: "Prácticas", score: 7.5, desc: "Centros de servicios compartidos de grandes multinacionales. Deutsche Telekom, Accenture, IBM con equipos internacionales." },
          { label: "Empresas relevantes", score: 7.0, desc: "Ecosistema startup en crecimiento. Menos maduro que Varsovia pero con mucho potencial y ambiente innovador." },
          { label: "Oportunidades para estudiantes", score: 7.5, desc: "Hub regional sólido. Tech, finanzas y centros de servicios de multinacionales con fuerte presencia." },
        ],
        reviews: [
          { text: "Hice prácticas en Kiwi.com — una startup checa de viajes increíble. Ambiente joven, inglés al 100% y muy buen nivel técnico.", author: "Pavel, Internship 2024", flag: "🇸🇰" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.2,
        summary: "Ciudad muy segura en general. El principal problema son los timos turísticos y algún carterista en zonas concurridas.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.5, desc: "Una de las capitales más seguras de Europa Central. Criminalidad muy baja para su tamaño." },
          { label: "Timos turísticos", score: 6.5, desc: "El mayor riesgo son los taxistas sin taxímetro y los cambios de moneda ilegales. Usa Bolt y casas de cambio oficiales." },
          { label: "Seguridad nocturna", score: 8.5, desc: "Las zonas de fiesta son seguras. Precaución normal con pertenencias en el pub crawl y lugares concurridos." },
        ],
        reviews: [
          { text: "Me intentaron cobrar 50€ por un trayecto de taxi de 5 minutos. Usa Bolt siempre. Sin excepción.", author: "Luisa, Erasmus 2023", flag: "🇧🇷" },
        ],
      },
      ],
  },
  cracovia: {
    heroImg: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1600&q=85",
    tagline: "El secreto mejor guardado del Erasmus europeo. Medieval, barata y con una vida nocturna que no perdona.",
    atmosphere: "Medieval, festiva y sorprendente. Cracovia huele a zapiekanka callejera y suena a música saliendo de los sótanos del Rynek.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 9.2,
        summary: "La ciudad más barata de esta guía. Con 350–500€/mes se vive increíblemente bien.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 9.0, desc: "Habitaciones desde 200–350€. Pisos enteros por lo que en Lisboa pagarías una habitación." },
          { label: "Comida y supermercados", score: 9.5, desc: "Menú del día por 4–5€. Cerveza a 1,50€. Zapiekanka (bocadillo polaco) por 2€. Comer bien es ridículamente barato." },
          { label: "Transporte", score: 9.5, desc: "Pase mensual de tranvía y autobús a 20€. La ciudad entera caminable desde el centro." },
          { label: "Ocio y gastos diarios", score: 9.0, desc: "Noche entera con 20–30€. Shots a 1€, cervezas a 1,50€. La vida nocturna más barata de Europa occidental." },
        ],
        reviews: [
          { text: "Con 400€/mes vivía mejor que en España con 1.000€. No exagero. Cracovia te cambia la perspectiva del dinero.", author: "Sergio, Erasmus 2024", flag: "🇪🇸" },
          { text: "El primer mes no me creía los precios. Pensaba que algo fallaba. No fallaba nada.", author: "Lucie, Erasmus 2023", flag: "🇫🇷" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 8.0,
        summary: "Mercado fácil y asequible. Mucha oferta para estudiantes internacionales. Sin el estrés de ciudades del oeste.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 8.0, desc: "Oferta amplia. Cracovia está preparada para recibir muchos estudiantes internacionales cada año." },
          { label: "Precio", score: 9.0, desc: "200–350€ habitación. Pisos enteros desde 500€. Los precios más bajos de esta guía." },
          { label: "Facilidad de búsqueda", score: 7.5, desc: "OLX.pl, grupos de Facebook de la Jagiellonian, Erasmus in Krakow. Proceso sencillo desde el extranjero." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "Encontré un alojamiento entero por 500€ al mes con dos compañeras. En mi ciudad eso es una habitación.", author: "Giulia, Erasmus 2024", flag: "🇮🇹" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 9.2,
        summary: "Vida nocturna legendaria. Kazimierz y el Rynek son el epicentro de una de las mejores escenas estudiantiles de Europa. Una de las comunidades Erasmus más grandes y activas de Europa del Este. +8.000 internacionales al año.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 9.2, desc: "+8.000 estudiantes internacionales al año. Una de las más grandes de Europa Central. ESN Kraków es muy activo. Eventos casi diarios: pub crawls, excursiones, cenas temáticas, deportes." },
          { label: "Ambiente internacional", score: 9.2, desc: "Estudiantes de toda Europa, especialmente España, Italia, Francia y Turquía. Ambiente muy internacional." },
          { label: "Fiesta y vida nocturna", score: 9.5, desc: "Kazimierz tiene cientos de bares en sótanos medievales. Cada uno con su ambiente. La calle Szeroka es imprescindible." },
          { label: "Eventos y actividades", score: 9.5, desc: "ESN muy activo. Pub crawls, cenas internacionales, excursiones a Zakopane y Auschwitz cada semana." },
        ],
        reviews: [
          { text: "Las noches en Kazimierz son irrepetibles. Cada bar es diferente, todo es barato y la gente es increíble.", author: "Tom, Erasmus 2023", flag: "🇬🇧" },
          { text: "El Juwenalia fue lo más loco que he vivido en mi vida. Tres días de fiesta con toda la ciudad.", author: "Marta, Erasmus 2024", flag: "🇩🇪" },
          { text: "El ESN organizaba algo cada dos días. Nunca me aburrí ni me sentí solo un solo momento.", author: "Pierre, Erasmus 2023", flag: "🇫🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 8.0,
        summary: "Ciudad muy acostumbrada a estudiantes internacionales. El inglés funciona perfectamente en zonas estudiantiles.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 8.0, desc: "El inglés funciona bien en el centro y zonas universitarias. El polaco es difícil pero los locales lo agradecen si lo intentas." },
          { label: "Actitud local", score: 8.0, desc: "Los polacos son reservados al principio pero muy hospitalarios cuando se abren. Leales y directos." },
          { label: "Integración con locales", score: 8.0, desc: "La enorme comunidad Erasmus facilita la vida. Integrarse con locales requiere más esfuerzo pero vale la pena." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Al principio pensé que eran fríos. Luego me invitaron a la casa de su familia en Navidad. Son de otra pasta.", author: "Isabel, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.5,
        summary: "Ciudad compacta y perfectamente caminable en el centro. Tranvías eficientes para el resto.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 8.5, desc: "Red de tranvías que cubre toda la ciudad. Puntual y frecuente. Pase mensual a 20€ es una ganga." },
          { label: "Ciudad caminable", score: 9.5, desc: "El centro histórico entero es caminable. Del Rynek a Kazimierz en 15 minutos. La mejor forma de moverse." },
          { label: "Conexiones nacionales", score: 8.0, desc: "Tren a Varsovia (2h20), Praga (7h), Viena (7h). Autobuses FlixBus muy baratos a toda Europa." },
          { label: "Escapadas de fin de semana", score: 8.0, desc: "Excelente posición para escapadas: Tren a Varsovia (2h20), Praga (7h), Viena (7h). Autobuses FlixBus muy baratos a toda Europa." },
        ],
        reviews: [
          { text: "En tres meses apenas usé el tranvía. Todo estaba a 15 minutos a pie.", author: "Anna, Erasmus 2023", flag: "🇸🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.4,
        summary: "Calidad de vida altísima para el precio. Historia, gastronomía, naturaleza y comunidad en una ciudad perfecta de tamaño.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 8.0, desc: "Zakopane y los Tatras a 2h. Senderismo en verano, esquí en invierno. Naturaleza polaca espectacular." },
          { label: "Clima", score: 6.0, desc: "Inviernos fríos y nevados, veranos cálidos y agradables. Las cuatro estaciones bien marcadas. Verano: 25–30°C, soleado y agradable. El Rynek lleno de vida, terrazas por todas partes. La mejor época. Invierno: Muy frío, -5 a -15°C con frecuencia. Nieve garantizada. Requiere ropa de abrigo real y mentalidad de invierno." },
          { label: "Calidad de vida", score: 8.8, desc: "Calidad de vida altísima para el precio. Historia, gastronomía, naturaleza y comunidad en una ciudad perfecta de tamaño." },
          { label: "Autenticidad local", score: 8.5, desc: "Pierogi, żurek, bigos. Cocina polaca contundente y deliciosa. Restaurantes excelentes a precios irrisorios." },
          { label: "Estilo de vida", score: 9.0, desc: "Tamaño perfecto: grande para tener de todo, pequeña para no perderse. La ciudad ideal para el Erasmus." },
        ],
        reviews: [
          { text: "Cracovia tiene el tamaño perfecto. En 20 minutos llegas a cualquier sitio y siempre hay algo nuevo que descubrir.", author: "Rafa, Erasmus 2024", flag: "🇪🇸" },
          { text: "La visita a Auschwitz fue lo más impactante de mi Erasmus. Necesaria y transformadora.", author: "Hannah, Exchange 2023", flag: "🇺🇸" },
          { text: "El invierno fue duro pero también mágico. Cracovia nevada es de postal. Compra buen abrigo.", author: "Elena, Erasmus 2023", flag: "🇬🇷" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 6.8,
        summary: "Mercado laboral en crecimiento. Mejor para prácticas en empresas polacas que para multinacionales top.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 8.0, desc: "Cracovia es hub de centros de servicios compartidos de multinacionales: IBM, Google, Motorola tienen oficinas aquí." },
          { label: "Prácticas", score: 7.5, desc: "Ecosistema tech polaco sólido. Muchas empresas de software con equipos internacionales." },
          { label: "Empresas relevantes", score: 6.0, desc: "Ecosistema startup menos maduro que Varsovia pero en crecimiento. Buenas opciones para perfiles técnicos." },
          { label: "Oportunidades para estudiantes", score: 6.8, desc: "Mercado laboral en crecimiento. Mejor para prácticas en empresas polacas que para multinacionales top." },
        ],
        reviews: [
          { text: "Hice prácticas en el centro de IBM de Cracovia. Todo en inglés, equipo internacional. No esperaba ese nivel.", author: "Mikkel, Internship 2024", flag: "🇩🇰" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.8,
        summary: "Una de las ciudades más seguras de Europa Central. Ambiente tranquilo incluso de noche.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 9.0, desc: "Índice de criminalidad muy bajo. Ciudad tranquila y segura para estándares europeos." },
          { label: "Seguridad nocturna", score: 8.5, desc: "Kazimierz y el Rynek son seguros incluso de madrugada. Presencia policial discreta pero efectiva." },
          { label: "Ambiente de la ciudad", score: 9.0, desc: "Problema muy menor. Nada comparable a ciudades del sur o del oeste de Europa." },
        ],
        reviews: [
          { text: "Volví sola a las 4am caminando por el centro docenas de veces. Nunca tuve ningún problema.", author: "Katja, Erasmus 2024", flag: "🇩🇪" },
        ],
      },
      ],
  },
  varsovia: {
    heroImg: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=1600&q=85",
    tagline: "La ciudad que resurgió de sus cenizas y hoy es el motor de Europa del Este. Ambiciosa, moderna y más barata que cualquier capital occidental.",
    atmosphere: "Moderna, resiliente y llena de energía. Varsovia huele a café de especialidad en coworkings y suena a grúas construyendo el futuro sobre la historia.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 8.5,
        summary: "Más cara que Cracovia pero todavía muy asequible. Con 550–700€/mes se vive bien en la capital polaca.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 8.0, desc: "Habitaciones desde 300–450€. Más cara que Cracovia pero muy asequible comparada con capitales occidentales." },
          { label: "Comida y supermercados", score: 9.0, desc: "Menú del día por 5–7€. Mercado Hala Koszyki para foodie asequible. Supermercados baratos y bien surtidos." },
          { label: "Transporte", score: 9.0, desc: "Metro + autobús + tranvía por 22€/mes. Red amplia y moderna. Una de las más baratas de Europa." },
          { label: "Ocio y gastos diarios", score: 8.5, desc: "Cervezas a 2–3€. Vida nocturna barata y variada. Muchos eventos culturales gratuitos." },
        ],
        reviews: [
          { text: "Con 600€/mes vivía cómodo y ahorraba. En Madrid eso no me daría ni para el piso.", author: "Diego, Erasmus 2024", flag: "🇪🇸" },
          { text: "La relación calidad-precio de Varsovia es imbatible para una capital europea de este tamaño.", author: "Lena, Internship 2023", flag: "🇩🇪" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 7.5,
        summary: "Mercado más tenso que Cracovia pero manejable. Busca con 2 meses de antelación y tendrás opciones.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 7.5, desc: "Oferta amplia pero la demanda crece con la ciudad. Más fácil que cualquier capital de Europa Occidental." },
          { label: "Precio", score: 8.0, desc: "300–450€ habitación. Subiendo año a año pero todavía muy asequible para una capital." },
          { label: "Facilidad de búsqueda", score: 7.5, desc: "OLX.pl, Otodom, grupos de Facebook de la Universidad de Varsovia. El proceso es más ágil que en ciudades del oeste." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "Encontré alojamiento en dos semanas desde Países Bajos. Sin dramas, sin competencia brutal. Muy diferente a Ámsterdam.", author: "Joost, Erasmus 2024", flag: "🇳🇱" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.5,
        summary: "Escena nocturna moderna y diversa. Praga-Północ y el centro concentran los mejores clubs y bares. Comunidad internacional grande y creciente. Varsovia atrae cada vez más estudiantes internacionales.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.5, desc: "+6.000 internacionales entre la Universidad de Varsovia, Warsaw School of Economics y la Politécnica. ESN Warszawa muy organizado. Buddy system, eventos de bienvenida, excursiones y vida social desde el día 1." },
          { label: "Ambiente internacional", score: 8.5, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 8.5, desc: "Smolna, Jasna 1, Pogłos. Escena electrónica seria y en crecimiento. Muy por encima de lo que la gente espera." },
          { label: "Eventos y actividades", score: 8.5, desc: "ESN activo. Eventos regulares entre la comunidad internacional. La ciudad tiene mucho que ofrecer más allá del campus." },
        ],
        reviews: [
          { text: "Varsovia tiene una escena de clubs que no esperaba. Smolna es de lo mejor que he visto en Europa.", author: "Axel, Erasmus 2023", flag: "🇫🇷" },
          { text: "Los rooftops con vistas al skyline son una experiencia única. Nada que envidiar a ciudades más famosas.", author: "Sara, Exchange 2024", flag: "🇮🇹" },
          { text: "El buddy system del ESN fue increíble. Mi compañero polaco me enseñó la ciudad entera en la primera semana.", author: "Clara, Erasmus 2023", flag: "🇧🇪" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.8,
        summary: "Ciudad cada vez más internacional. El inglés funciona bien en entornos profesionales y zonas jóvenes.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 8.0, desc: "Muy buen nivel de inglés entre la gente joven. En entornos profesionales y universitarios funciona perfectamente." },
          { label: "Actitud local", score: 7.5, desc: "Los varsovianoss son más reservados que los cracovianoss con extranjeros. Más cálidos en entornos universitarios." },
          { label: "Integración con locales", score: 8.0, desc: "La ciudad atrae cada vez más expatriados y estudiantes internacionales. El ambiente es cosmopolita y abierto." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Al principio me costó conectar con locales pero en el trabajo de prácticas hice amigos polacos increíbles.", author: "Nina, Internship 2024", flag: "🇳🇱" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 9.0,
        summary: "El mejor transporte público de Polonia. Metro moderno, red de autobuses densa y todo integrado en una tarjeta.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.0, desc: "Dos líneas modernas y eficientes. Puntual, limpio y con frecuencia alta. Envidia de muchas capitales occidentales." },
          { label: "Transporte público", score: 8.5, desc: "Red densa que cubre toda la ciudad. Funciona las 24h con servicios nocturnos. Muy fiable." },
          { label: "Conexiones nacionales", score: 8.5, desc: "Tren a Cracovia (2h20), Gdansk (3h), Berlín (6h). Aeropuerto Chopin con vuelos lowcost a toda Europa." },
          { label: "Escapadas de fin de semana", score: 8.5, desc: "Excelente posición para escapadas: Tren a Cracovia (2h20), Gdansk (3h), Berlín (6h). Aeropuerto Chopin con vuelos lowcost a toda Europa." },
        ],
        reviews: [
          { text: "El metro de Varsovia es mejor que el de muchas ciudades occidentales. Nunca esperé más de 3 minutos.", author: "Felix, Erasmus 2023", flag: "🇦🇹" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.0,
        summary: "Ciudad moderna con mucho que ofrecer. Historia, cultura, gastronomía y una energía de ciudad en construcción constante.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 8.0, desc: "Parque Łazienki, orillas del Wisła. Más verde de lo que parece. Muy buena infraestructura deportiva." },
          { label: "Clima", score: 5.8, desc: "Inviernos muy fríos y largos. Veranos cálidos y agradables. Hay que venir preparado para el frío. Verano: 25–30°C, soleado y agradable. Las orillas del Wisła se llenan de gente. La mejor época para vivir Varsovia. Invierno: Muy frío, -10 a -20°C posibles. Gris y largo. El invierno polaco es serio — no es para todo el mundo." },
          { label: "Calidad de vida", score: 8.2, desc: "Ciudad moderna con mucho que ofrecer. Historia, cultura, gastronomía y una energía de ciudad en construcción constante." },
          { label: "Autenticidad local", score: 8.0, desc: "Pierogi, żurek, barszcz. Pero también una escena foodie moderna con restaurantes de todo el mundo." },
          { label: "Estilo de vida", score: 8.0, desc: "Ritmo intenso de capital pero con precios que no asfixian. La combinación perfecta para el Erasmus ambicioso." },
        ],
        reviews: [
          { text: "El Museo del Levantamiento de Varsovia me dejó sin palabras. Nunca había entendido tanto la historia de un país.", author: "Sophie, Exchange 2024", flag: "🇨🇭" },
          { text: "Varsovia tiene esa energía de ciudad que no ha llegado a su techo todavía. Todo está pasando ahora.", author: "Carlos, Internship 2023", flag: "🇲🇽" },
          { text: "El invierno fue lo más duro. Pero los varsovianoss saben vivir con él — te contagian su energía.", author: "Marco, Erasmus 2023", flag: "🇮🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 8.5,
        summary: "El hub de empleo más potente de Polonia. Finanzas, tech, consultoría y multinacionales con base en Varsovia.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 9.0, desc: "PKO, mBank, ING Polonia. Hub financiero de Europa del Este con prácticas reales y bien remuneradas." },
          { label: "Prácticas", score: 8.5, desc: "Allegro, Booksy, DocPlanner. Ecosistema startup de los más maduros de Europa Central." },
          { label: "Empresas relevantes", score: 8.5, desc: "Samsung, Google, Accenture, Deloitte tienen centros importantes en Varsovia. Muchas prácticas en inglés." },
          { label: "Oportunidades para estudiantes", score: 8.5, desc: "El hub de empleo más potente de Polonia. Finanzas, tech, consultoría y multinacionales con base en Varsovia." },
        ],
        reviews: [
          { text: "Hice prácticas en Accenture Varsovia todo en inglés. El nivel era el mismo que en cualquier oficina de Londres.", author: "Petra, Internship 2024", flag: "🇨🇿" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.5,
        summary: "Ciudad segura para ser una capital grande. Estadísticas de criminalidad bajas para su tamaño.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.5, desc: "Una de las capitales más seguras de Europa Central. Criminalidad baja para una ciudad de 2 millones." },
          { label: "Seguridad nocturna", score: 8.0, desc: "Zonas de fiesta bien vigiladas. Precaución normal en estaciones de metro de madrugada." },
          { label: "Ambiente de la ciudad", score: 8.5, desc: "Śródmieście y Mokotów muy seguros. Precaución estándar en algunas zonas periféricas." },
        ],
        reviews: [
          { text: "Me sentí segura en todo momento. Varsovia tiene fama de dura pero la realidad es muy diferente.", author: "Maria, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
      ],
  },
  turin: {
    heroImg: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=1600&q=85",
    tagline: "La joya escondida de Italia. Donde el vermut se inventó, los Alpes están a la vuelta y nadie te va a hacer cola.",
    atmosphere: "Elegante, tranquila y sorprendente. Turín huele a chocolate y café, y suena a tranvías sobre una ciudad que guarda secretos en cada palacio.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 7.8,
        summary: "La más asequible de las grandes ciudades italianas. Con 650–800€/mes se vive muy bien.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 7.5, desc: "Habitaciones desde 300–450€. Oferta amplia y precios razonables gracias a la menor presión turística." },
          { label: "Comida y supermercados", score: 8.5, desc: "Mercato di Porta Palazzo — el más grande de Europa — con precios imbatibles. Comer bien por 5–7€ es fácil." },
          { label: "Transporte", score: 8.5, desc: "GTT mensual a 35€. Metro + autobuses + tranvías. Red compacta y eficiente para el tamaño de la ciudad." },
          { label: "Ocio y gastos diarios", score: 8.0, desc: "Cervezas a 3–4€. Aperitivo turinés (el original, antes que Milán) con buffet incluido. Mucha oferta cultural gratuita." },
        ],
        reviews: [
          { text: "Con 700€/mes vivía mejor que amigos míos en Milán con 1.200€. Turín es el secreto mejor guardado de Italia.", author: "Pablo, Erasmus 2024", flag: "🇪🇸" },
          { text: "El mercado de Porta Palazzo me cambió la vida. Fruta, queso y pan fresco por nada. Cada sábado era una fiesta.", author: "Mia, Erasmus 2023", flag: "🇩🇰" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 7.2,
        summary: "El mercado más fácil de las grandes ciudades italianas. Más oferta, mejores precios y menos competencia.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 7.5, desc: "Oferta mucho más amplia que Roma o Milán. Menos presión turística significa más pisos disponibles." },
          { label: "Precio", score: 8.0, desc: "300–450€ habitación. De las más baratas entre ciudades universitarias italianas de tamaño comparable." },
          { label: "Facilidad de búsqueda", score: 7.0, desc: "Idealista, Subito.it, grupos de Facebook del Politecnico di Torino y UniTo. Proceso más relajado que en otras ciudades." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "Encontré alojamiento en una semana desde Berlín. Algo impensable en Milán o Roma.", author: "Jana, Erasmus 2024", flag: "🇩🇪" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 7.8,
        summary: "Vida nocturna más tranquila que Roma o Milán pero con personalidad propia. San Salvario es el corazón. Comunidad más pequeña que otras ciudades italianas pero muy unida. Calidad sobre cantidad.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 7.8, desc: "+3.500 Erasmus al año entre UniTo y Politecnico. Más íntimo que Roma o Milán. ESN Torino organiza eventos regulares: spritz tours, visitas al Museo Egizio, escapadas a los Alpes." },
          { label: "Ambiente internacional", score: 7.8, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 9.0, desc: "San Salvario y Vanchiglia concentran la vida estudiantil. El aperitivo turinés es el original — más cuidado y con más producto que el milanés." },
          { label: "Eventos y actividades", score: 8.5, desc: "ESN activo con eventos regulares. La comunidad es más íntima — fácil hacer amigos de verdad, no solo conocidos." },
        ],
        reviews: [
          { text: "San Salvario de noche tiene una energía especial. Más íntimo que Roma, más auténtico que Milán.", author: "Beatriz, Erasmus 2023", flag: "🇵🇹" },
          { text: "La comunidad Erasmus era pequeña pero unida. Acabamos siendo como una familia.", author: "Erik, Exchange 2024", flag: "🇸🇪" },
          { text: "Éramos pocos Erasmus pero nos conocíamos todos. Fue la experiencia más auténtica que podría haber tenido.", author: "Sofía, Erasmus 2023", flag: "🇬🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 8.3,
        summary: "Turineses reservados al principio pero muy leales. Ciudad abierta con menos saturación turística.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 7.0, desc: "Menos inglés que en Milán. Aprender italiano básico es más necesario aquí — y más recompensado." },
          { label: "Actitud local", score: 8.5, desc: "Turineses elegantes y discretos. No invasivos pero muy generosos cuando te conocen. Relaciones más profundas." },
          { label: "Integración con locales", score: 8.5, desc: "Al ser menos turística, la integración real con locales es más fácil. Menos burbuja Erasmus." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Los turineses son más tímidos que los romanos pero mucho más auténticos. Mis mejores amigos italianos son de Turín.", author: "Camille, Erasmus 2024", flag: "🇫🇷" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.0,
        summary: "Ciudad compacta y bien conectada. Metro pequeño pero eficiente. Ideal para la bici en zonas planas.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 7.5, desc: "Una sola línea (M1) pero cubre el eje principal. Puntual y limpio. Se está ampliando." },
          { label: "Transporte público", score: 8.0, desc: "Red de autobuses y tranvías amplia. Cubre toda la ciudad con frecuencia razonable." },
          { label: "Ciudad caminable", score: 8.0, desc: "Ciudad bastante plana en el centro. TO Bike (bici compartida) muy útil. Carriles bici en crecimiento." },
          { label: "Conexiones nacionales", score: 8.5, desc: "Tren a Milán (45min), Génova (2h), Lyon (3h30). Aeropuerto de Caselle con vuelos lowcost." },
          { label: "Escapadas de fin de semana", score: 8.5, desc: "Excelente posición para escapadas: Tren a Milán (45min), Génova (2h), Lyon (3h30). Aeropuerto de Caselle con vuelos lowcost." },
        ],
        reviews: [
          { text: "Me compré una bici usada por 50€ y me moví por toda la ciudad sin gastar un euro más en transporte.", author: "Lars, Erasmus 2023", flag: "🇳🇴" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.7,
        summary: "Alta calidad de vida con bajo coste. Chocolate, vermut, Alpes y museos de clase mundial. El secreto de Italia.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 9.5, desc: "Alpes a 1h para esquiar en invierno y senderismo en verano. Lagos Maggiore y Como accesibles en tren." },
          { label: "Clima", score: 6.8, desc: "Veranos calurosos, inviernos fríos con algo de nieve. Los Alpes regulan el clima y añaden opciones únicas. Verano: 30–35°C, caluroso pero menos húmedo que Milán. Los Alpes a 1h para escapar del calor. Invierno: Frío real, puede nevar. Pero la nieve en los Alpes a 1h lo convierte en una ventaja para los esquiadores." },
          { label: "Calidad de vida", score: 8.5, desc: "Alta calidad de vida con bajo coste. Chocolate, vermut, Alpes y museos de clase mundial. El secreto de Italia." },
          { label: "Autenticidad local", score: 9.0, desc: "Cuna del vermut, del grissini y del bicerin. Chocolate Venchi y Guido Gobino. Gastronomía piamontesa de altísimo nivel." },
          { label: "Estilo de vida", score: 8.5, desc: "Ritmo de vida equilibrado. Sin el caos de Roma ni el estrés de Milán. La ciudad ideal para estudiar y disfrutar." },
        ],
        reviews: [
          { text: "Turín tiene todo lo que necesitas sin el ruido de las ciudades grandes. Mi Erasmus ideal.", author: "Lena, Erasmus 2024", flag: "🇦🇹" },
          { text: "El Museo Egizio me dejó sin palabras. Y el bicerin del café Al Bicerin es lo más rico que he probado en Europa.", author: "James, Exchange 2023", flag: "🇺🇸" },
          { text: "El invierno fue frío pero fui a esquiar tres veces por 30€ todo incluido. En Roma eso es imposible.", author: "Marco, Erasmus 2023", flag: "🇪🇸" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.5,
        summary: "Motor industrial de Italia. Automoción, aeroespacial y tech con un ecosistema de startups en rápido crecimiento.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 9.0, desc: "Ferrari, Lamborghini, Maserati y FIAT/Stellantis tienen sede aquí. La Motor Valley atrae talento de ingeniería de toda Europa." },
          { label: "Prácticas", score: 8.0, desc: "Leonardo, Thales Alenia Space, Reply. Turín es el hub aeroespacial de Italia con demanda real de ingenieros." },
          { label: "Empresas relevantes", score: 7.0, desc: "I3P (incubadora del Politecnico) es una de las mejores de Italia. Ecosistema joven pero con mucho potencial." },
          { label: "Oportunidades para estudiantes", score: 7.5, desc: "Motor industrial de Italia. Automoción, aeroespacial y tech con un ecosistema de startups en rápido crecimiento." },
        ],
        reviews: [
          { text: "Hice prácticas en Stellantis gracias al Politecnico. Una experiencia técnica imposible de conseguir en otra ciudad italiana.", author: "Klaus, Internship 2024", flag: "🇩🇪" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.2,
        summary: "Una de las ciudades más seguras de Italia. Ambiente tranquilo y sin los problemas de carteristas de Roma.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.5, desc: "Ciudad tranquila con baja incidencia de delitos. Muy segura para estándares de ciudades universitarias italianas." },
          { label: "Seguridad nocturna", score: 8.0, desc: "San Salvario y Vanchiglia son seguros de noche. Precaución normal en zonas periféricas." },
          { label: "Ambiente de la ciudad", score: 8.5, desc: "Nivel muy bajo comparado con Roma o Milán. No es un problema habitual para los estudiantes." },
        ],
        reviews: [
          { text: "Nunca me sentí en peligro en ningún momento, ni de día ni de noche. Turín es muy tranquila.", author: "Ingrid, Erasmus 2024", flag: "🇩🇰" },
        ],
      },
      ],
  },
  roma: {
    heroImg: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&q=85",
    tagline: "La Ciudad Eterna. Donde cada adoquín tiene 3.000 años de historia y el carbonara es religión.",
    atmosphere: "Caótica, apasionada e hipnótica. Roma huele a espresso y piedra caliente, y suena a motos entre columnas romanas.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 6.5,
        summary: "Más asequible que Milán, más cara que Bolonia. Con 800–1.000€/mes se vive bien si controlas el ocio.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 5.5, desc: "Habitaciones desde 450–650€. Zonas estudiantiles como Pigneto o Nomentano son más asequibles que el centro." },
          { label: "Comida y supermercados", score: 8.0, desc: "Pizza al taglio desde 2€. Mercados de barrio baratos. Comer auténtico y barato es parte de la cultura romana." },
          { label: "Transporte", score: 7.0, desc: "CityPass mensual a 51€. Metro limitado (solo 3 líneas) pero autobuses y tranvías cubren bien la ciudad." },
          { label: "Ocio y gastos diarios", score: 7.5, desc: "Cervezas a 4–5€. Mucha vida gratuita: Coliseo exterior, fontanas, Villa Borghese. La ciudad entera es un museo al aire libre." },
        ],
        reviews: [
          { text: "Con 900€/mes vivía bien en Pigneto. Lejos del centro turístico pero con buena conexión.", author: "Clara, Erasmus 2023", flag: "🇩🇪" },
          { text: "La pizza al taglio me salvó el presupuesto. 2€ y estás lleno. Roma sabe cuidarte si sabes buscar.", author: "Andrés, Erasmus 2024", flag: "🇨🇴" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 5.0,
        summary: "Mercado competitivo con 200.000+ estudiantes. Zonas alejadas del centro son más fáciles y baratas.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 5.0, desc: "Alta demanda. Sapienza es la universidad más grande de Europa — eso lo dice todo." },
          { label: "Precio", score: 5.5, desc: "450–650€ habitación. Pigneto, Nomentano y Ostiense son las zonas más asequibles para estudiantes." },
          { label: "Facilidad de búsqueda", score: 5.5, desc: "Idealista, Uniplaces, grupos de Facebook de Sapienza y LUISS. Empieza 3 meses antes mínimo." },
          { label: "Residencias universitarias", score: 6.0, desc: "Las residencias de Sapienza son muy limitadas. No cuentes con ellas y busca por libre desde el principio." },
        ],
        reviews: [
          { text: "Busqué desde España durante 2 meses. Al final encontré algo en Pigneto — perfecto, aunque lejos del campus.", author: "María, Erasmus 2024", flag: "🇪🇸" },
          { text: "Las residencias de Sapienza son muy limitadas. No cuentes con ellas y busca por libre desde el principio.", author: "Giulio, estudiante local", flag: "🇮🇹" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.9,
        summary: "Vida social intensa y apasionada. Trastevere, Pigneto y el Testaccio marcan el ritmo nocturno. Una de las comunidades Erasmus más grandes de Europa. 7.000+ internacionales entre todas las universidades.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 9.0, desc: "+7.000 Erasmus al año. Sapienza, LUISS, Roma Tre y Cattolica juntas forman una masa crítica enorme. Varios ESN por universidad. Eventos desde la semana de bienvenida: tours, cenas, fiestas de disfraces." },
          { label: "Ambiente internacional", score: 9.0, desc: "Estudiantes de toda Europa y Latinoamérica. La conexión cultural con España y Sudamérica es especialmente fuerte." },
          { label: "Fiesta y vida nocturna", score: 9.0, desc: "Trastevere para bares de calle, Testaccio para clubs, Pigneto para ambiente alternativo y local." },
          { label: "Eventos y actividades", score: 9.5, desc: "ESN muy activo entre las universidades romanas. Fiestas en terrazas, cenas internacionales, trips a la costa." },
        ],
        reviews: [
          { text: "Una noche en Trastevere con italianos y estudiantes de doce países. Eso es Roma.", author: "Léa, Erasmus 2023", flag: "🇫🇷" },
          { text: "El verano romano es incomparable. Cada plaza es un salón de estar y cada fuente un sitio de encuentro.", author: "Niklas, Exchange 2024", flag: "🇫🇮" },
          { text: "El ESN de Roma Tre organizó una cena internacional la primera semana. Ahí hice mis mejores amigos del Erasmus.", author: "Klara, Erasmus 2023", flag: "🇨🇿" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 8.2,
        summary: "Ciudad muy acostumbrada al turismo y a los internacionales. Caótica pero acogedora.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 7.5, desc: "El inglés funciona en zonas universitarias y turísticas. Aprender algo de italiano acelera la integración real." },
          { label: "Actitud local", score: 8.5, desc: "Los romanos son expresivos, apasionados y generosos. Más cálidos que los milaneses desde el primer día." },
          { label: "Integración con locales", score: 8.5, desc: "Fácil conectar a través de la comida, el fútbol (Roma vs Lazio) y la vida de barrio. La cultura romana engancha." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "La familia de mi compañera de piso me invitó a cenar cada domingo. Roma te adopta si te dejas.", author: "Irina, Erasmus 2024", flag: "🇷🇴" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 6.5,
        summary: "El punto débil de Roma. Metro escaso, autobuses irregulares. A pie o en moto es como se mueve la ciudad.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 5.5, desc: "Solo 3 líneas (A, B, C). No cubre muchos barrios clave. Frecuente retrasos y averías." },
          { label: "Transporte público", score: 6.5, desc: "Red extensa pero poco puntual. La app Moovit es esencial. Mejor evitar horas punta." },
          { label: "Ciudad caminable", score: 8.5, desc: "El centro histórico es perfectamente caminable. La bici funciona en zonas planas pero el tráfico es un reto." },
          { label: "Conexiones nacionales", score: 7.5, desc: "Termini conecta con toda Italia. AVE a Nápoles (1h10), Florencia (1h30), Milán (3h)." },
        ],
        reviews: [
          { text: "El transporte es el caos de Roma. Al final me compré una bicicleta y fue la mejor decisión.", author: "Tom, Erasmus 2023", flag: "🇬🇧" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.7,
        summary: "Vivir en Roma es una experiencia que marca para siempre. Historia, comida, belleza y caos en equilibrio perfecto.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 8.0, desc: "Villa Borghese, Appia Antica, playas a 30 minutos en Ostia. Más verde de lo que parece." },
          { label: "Clima", score: 8.5, desc: "Clima mediterráneo de manual. Inviernos suaves, veranos calurosos y mucho sol durante todo el año. Verano: 35–38°C en julio y agosto. Caluroso pero seco. La ciudad se vacía en agosto — mucho espacio para los que se quedan. Invierno: 10–15°C. Uno de los inviernos más suaves de Italia continental. Raramente nieva." },
          { label: "Calidad de vida", score: 8.8, desc: "Vivir en Roma es una experiencia que marca para siempre. Historia, comida, belleza y caos en equilibrio perfecto." },
          { label: "Autenticidad local", score: 9.5, desc: "Carbonara, cacio e pepe, supplì, gelato auténtico. La cocina romana es sencilla, potente e irresistible." },
          { label: "Estilo de vida", score: 8.5, desc: "El caos romano se vuelve parte de ti. La ciudad enseña a vivir con más calma y más pasión a la vez." },
        ],
        reviews: [
          { text: "Roma no es perfecta pero tiene algo que ninguna otra ciudad tiene. No sé definirlo, solo sé que lo echo de menos.", author: "Emma, Erasmus 2023", flag: "🇸🇪" },
          { text: "El mejor año de mi vida. El carbonara, las noches en Trastevere y el Coliseo al atardecer. Punto.", author: "Javier, Erasmus 2024", flag: "🇪🇸" },
          { text: "Fui en febrero pensando que haría frío. Estaba en manga corta. El clima de Roma es un regalo.", author: "Petra, Erasmus 2024", flag: "🇸🇰" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.0,
        summary: "Buenas oportunidades en medios, cultura, política y organismos internacionales. Menos tech que Milán.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 8.5, desc: "FAO, IFAD, WFP tienen sede en Roma. Prácticas en organismos internacionales muy accesibles desde LUISS o Cattolica." },
          { label: "Prácticas", score: 8.0, desc: "RAI, grandes editoriales, agencias de publicidad. Hub cultural y mediático de Italia." },
          { label: "Empresas relevantes", score: 5.5, desc: "Ecosistema tech menos desarrollado que Milán. Creciendo pero todavía limitado en comparación." },
          { label: "Oportunidades para estudiantes", score: 7.0, desc: "Buenas oportunidades en medios, cultura, política y organismos internacionales. Menos tech que Milán." },
        ],
        reviews: [
          { text: "Hice prácticas en la FAO gracias a un programa de LUISS. Una experiencia que no habría tenido en ningún otro sitio.", author: "Valentina, Internship 2024", flag: "🇦🇷" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 7.0,
        summary: "Segura en general, pero más carteristas que en otras ciudades italianas. Atención en zonas turísticas.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 7.5, desc: "La violencia es rara. Los problemas más comunes son hurtos y carteristas, no agresiones." },
          { label: "Ambiente de la ciudad", score: 6.0, desc: "Más frecuentes que en Bolonia o Turín. Especial atención en el metro, autobuses llenos y zonas turísticas muy concurridas." },
          { label: "Seguridad nocturna", score: 7.5, desc: "Trastevere y Testaccio son seguros y muy concurridos. Precaución normal en zonas más oscuras." },
        ],
        reviews: [
          { text: "Me robaron el móvil en el autobús 40. Lleva los objetos de valor en bolsillos interiores siempre.", author: "Hugo, Erasmus 2023", flag: "🇫🇷" },
        ],
      },
      ],
  },
  milan: {
    heroImg: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=1600&q=85",
    tagline: "La capital mundial del diseño y la ambición. Donde el aperitivo es una institución y el Duomo te quita el aliento.",
    atmosphere: "Cosmopolita, acelerada y elegante. Milán huele a café espresso y cuero de diseñador, y suena a tacones sobre adoquines mojados.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 6.0,
        summary: "La más cara de Italia. Viable con 1.000–1.200€/mes si controlas el ocio y compartes piso.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 5.0, desc: "Habitaciones desde 550–800€. El mercado es muy competitivo. Zona Città Studi es la más asequible para estudiantes." },
          { label: "Comida y supermercados", score: 7.0, desc: "Supermercados Esselunga muy completos. El aperitivo (18–21h) incluye buffet gratis con la bebida — cena gratuita si sabes usarlo." },
          { label: "Transporte", score: 8.0, desc: "ATM mensual (metro + tram + bus) a 39€. Red muy completa y puntual. Una de las mejores de Italia." },
          { label: "Ocio y gastos diarios", score: 6.0, desc: "Cervezas a 5–7€ en bares. El aperitivo salva la situación: bebida + buffet por 8–10€. Museos gratis el primer martes de mes." },
        ],
        reviews: [
          { text: "El aperitivo fue mi salvavidas. Con 10€ tomaba algo y cenaba. Cinco noches a la semana.", author: "Carla, Erasmus 2024", flag: "🇪🇸" },
          { text: "Es cara, no te van a engañar. Pero las prácticas en Bocconi lo compensan con creces.", author: "Luca, Internship 2023", flag: "🇩🇪" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 4.5,
        summary: "El mercado más competitivo de Italia. Empieza a buscar 4 meses antes y ten documentación lista.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 4.0, desc: "Alta demanda de 180.000+ estudiantes. Las habitaciones buenas se van en horas. Sin margen de espera." },
          { label: "Precio", score: 4.5, desc: "550–800€ habitación individual. Compartir piso es casi obligatorio para no arruinarse." },
          { label: "Facilidad de búsqueda", score: 5.0, desc: "Idealista, Uniplaces, Spotahome, grupos de Facebook de Bocconi y Politecnico. Prepara una presentación breve de ti mismo." },
          { label: "Residencias universitarias", score: 6.0, desc: "Las residencias universitarias del Politecnico son la mejor opción. Pídelas en cuanto te acepten." },
        ],
        reviews: [
          { text: "Mandé 60 mensajes en Idealista antes de conseguir visita. Empieza antes de lo que creas necesario.", author: "Elena, Erasmus 2023", flag: "🇩🇪" },
          { text: "Las residencias universitarias del Politecnico son la mejor opción. Pídelas en cuanto te acepten.", author: "Rui, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.5,
        summary: "Noches largas en Navigli y Isola. El aperitivo marca el ritmo de la vida social milanesa. Una de las comunidades internacionales más grandes de Italia. Bocconi y Politecnico lideran.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.8, desc: "+5.500 Erasmus al año entre Bocconi, Politecnico, Statale y NABA. ESN muy activo especialmente en Bocconi. Eventos desde la semana 1 de llegada." },
          { label: "Ambiente internacional", score: 8.8, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 9.5, desc: "Navigli es el epicentro. De jueves a sábado los canales se llenan de gente. Ambiente único en Europa." },
          { label: "Eventos y actividades", score: 8.5, desc: "ESN muy activo en Bocconi, Politecnico y Statale. Fiestas temáticas, spritz tours y cenas internacionales." },
        ],
        reviews: [
          { text: "Navigli de noche es una de las cosas más bonitas que he vivido en Europa. Imprescindible.", author: "Sophie, Erasmus 2023", flag: "🇫🇷" },
          { text: "Los eventos del ESN de Bocconi son increíbles. Muy bien organizados y con gente de todo el mundo.", author: "Jonas, Erasmus 2024", flag: "🇸🇪" },
          { text: "La comunidad internacional de Bocconi es brutal. Hice contactos que hoy son colegas en cinco países.", author: "Marta, Erasmus 2022", flag: "🇪🇸" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 8.0,
        summary: "Ciudad muy internacional. El inglés funciona en entornos universitarios y profesionales.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 7.5, desc: "El inglés funciona bien en campus y zonas internacionales. En barrios locales, el italiano marca la diferencia." },
          { label: "Actitud local", score: 8.0, desc: "Los milaneses son directos y no siempre cálidos al principio, pero muy respetuosos con los extranjeros." },
          { label: "Integración con locales", score: 8.5, desc: "La alta concentración de estudiantes internacionales facilita la integración. La comunidad Erasmus es enorme." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Al principio me pareció fría, pero con el tiempo descubrí que los milaneses son muy leales como amigos.", author: "Ana, Erasmus 2023", flag: "🇵🇹" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.8,
        summary: "El mejor transporte público de Italia. Metro puntual, tranvías históricos y red de autobuses densa.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.0, desc: "4 líneas, puntual y limpio. Cubre los puntos clave de la ciudad eficientemente." },
          { label: "Transporte público", score: 8.5, desc: "Los tranvías históricos son lentos pero encantadores. Los autobuses completan la red perfectamente." },
          { label: "Conexiones nacionales", score: 9.0, desc: "Tren a Turín (45min), Venecia (2h20), Bolonia (1h), Roma (3h). Hub ferroviario de Italia." },
          { label: "Escapadas de fin de semana", score: 9.0, desc: "Excelente posición para escapadas: Tren a Turín (45min), Venecia (2h20), Bolonia (1h), Roma (3h). Hub ferroviario de Italia." },
        ],
        reviews: [
          { text: "Con el pase ATM me moví por toda la ciudad sin estrés. Muy distinto a Roma.", author: "Michael, Erasmus 2024", flag: "🇬🇧" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.4,
        summary: "Alta calidad de vida si el presupuesto lo permite. Diseño, moda, gastronomía y cultura al máximo nivel.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.0, desc: "Parco Sempione, lagos Maggiore y Como a 1h. Menos verde que otras ciudades pero accesible." },
          { label: "Clima", score: 6.5, desc: "Veranos muy calurosos y húmedos. Inviernos fríos con niebla. Primavera es la estación dorada. Verano: 35°C con humedad alta. Mucho milanés huye en agosto. Los canales compensan un poco. Invierno: Frío húmedo, niebla frecuente en enero-febrero. No tan frío como el norte de Europa pero gris." },
          { label: "Calidad de vida", score: 8.3, desc: "Alta calidad de vida si el presupuesto lo permite. Diseño, moda, gastronomía y cultura al máximo nivel." },
          { label: "Autenticidad local", score: 9.0, desc: "Aperitivo, risotto alla milanese, panettone. Y cocina del mundo en cada barrio." },
          { label: "Estilo de vida", score: 7.5, desc: "Ritmo intenso y exigente. Perfecta para quien quiere crecer, más difícil si buscas relax." },
        ],
        reviews: [
          { text: "Milán te exige pero te da todo a cambio. Salí siendo mejor profesional y persona.", author: "David, Internship 2023", flag: "🇫🇷" },
          { text: "La ciudad más estimulante en la que he vivido. No para quien quiera tranquilidad.", author: "Yuki, Exchange 2024", flag: "🇯🇵" },
          { text: "El verano fue sofocante pero la primavera milanesa es espectacular. Parque Sempione lleno de vida.", author: "Andrea, Erasmus 2024", flag: "🇨🇴" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 9.2,
        summary: "La mejor ciudad de Italia para prácticas. Moda, finanzas, tech y diseño en el mismo sitio.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 9.5, desc: "Armani, Versace, Prada, Gucci tienen sede aquí. El mejor sitio del mundo para prácticas en moda." },
          { label: "Prácticas", score: 9.0, desc: "Banca, seguros, consulting. Mediobanca, Intesa Sanpaolo, BCG, McKinsey. Hub financiero de Italia." },
          { label: "Empresas relevantes", score: 8.5, desc: "Ecosistema tech creciente. H-Farm, TechStars Milano. Menos que Berlín pero en rápido crecimiento." },
          { label: "Oportunidades para estudiantes", score: 9.2, desc: "La mejor ciudad de Italia para prácticas. Moda, finanzas, tech y diseño en el mismo sitio." },
        ],
        reviews: [
          { text: "Hice prácticas en una consultora del top 3 mundial gracias a la red de Bocconi. Imposible en otra ciudad italiana.", author: "Chiara, Internship 2024", flag: "🇮🇹" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 7.8,
        summary: "Ciudad segura para su tamaño. Precaución normal en estaciones de tren y zonas periféricas.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.0, desc: "Muy segura en zonas universitarias y del centro. Poca violencia para una metrópolis." },
          { label: "Seguridad nocturna", score: 7.5, desc: "Navigli y Isola son seguros. Más precaución en Centrale y algunas zonas periféricas." },
          { label: "Ambiente de la ciudad", score: 7.5, desc: "Nivel moderado. Atención en el metro y alrededores de la Stazione Centrale." },
        ],
        reviews: [
          { text: "Nunca me sentí en peligro. Solo precaución normal en el metro hora punta.", author: "Lisa, Erasmus 2023", flag: "🇳🇱" },
        ],
      },
      ],
  },
  viena: {
    heroImg: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&q=85",
    tagline: "La ciudad con mejor calidad de vida del mundo, 10 años seguidos. Imperial, elegante y con una oferta cultural que no tiene rival en Europa.",
    atmosphere: "Imperial, refinada y sorprendentemente joven. Viena huele a Sachertorte y café de Kaffeehäuser centenarios, y suena a música clásica saliendo de palacios convertidos en salas de concierto.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 7.0,
        summary: "Cara para el este de Europa, asequible para el oeste. Con 800–1.100€/mes se vive muy bien.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 6.5, desc: "Habitaciones desde 500–750€. Más asequible que Múnich o Londres. El mercado es competitivo pero manejable." },
          { label: "Comida y supermercados", score: 8.0, desc: "Naschmarkt — el mejor mercado de la ciudad con precios razonables. Supermercados Billa y Spar bien surtidos y asequibles." },
          { label: "Transporte", score: 9.5, desc: "Wiener Linien anual por 365€ — 1€ al día para metro, tranvía y autobús ilimitados. El mejor precio-calidad de esta guía." },
          { label: "Ocio y gastos diarios", score: 8.0, desc: "Ópera desde 3€ de pie. Museos asequibles. Muchos conciertos gratuitos. La cultura de primer nivel no tiene por qué ser cara." },
        ],
        reviews: [
          { text: "El pase anual de transporte a 365€ fue lo más inteligente que hice. Un euro al día para moverse por toda la ciudad.", author: "Ana, Erasmus 2024", flag: "🇪🇸" },
          { text: "La ópera a 3€ de pie fue mi actividad del miércoles durante todo el semestre. Viena te da cultura de lujo por nada.", author: "François, Erasmus 2023", flag: "🇫🇷" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 6.0,
        summary: "Mercado competitivo pero más manejable que Múnich o Londres. Busca con 2–3 meses de antelación.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 6.0, desc: "Demanda alta pero la oferta es mayor que en otras capitales. Las residencias universitarias son una buena opción." },
          { label: "Precio", score: 6.5, desc: "500–750€ habitación. Más asequible que Múnich o Ámsterdam para una calidad comparable." },
          { label: "Facilidad de búsqueda", score: 6.5, desc: "WG-Gesucht, Willhaben, grupos de Facebook de la Universidad de Viena. Proceso más relajado que en Alemania." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "Encontré alojamiento en Favoriten en tres semanas desde Cracovia. Más fácil de lo que esperaba comparado con lo que me contaron de Múnich.", author: "Jana, Erasmus 2024", flag: "🇵🇱" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.4,
        summary: "Vida nocturna más sofisticada que salvaje. Gürtelbars, clubs underground y la escena de Naschmarkt para todos los gustos. Gran comunidad internacional entre la Universidad de Viena, WU y TU Wien. Muy activa y bien organizada.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.8, desc: "+5.500 internacionales entre la Universidad de Viena, WU Vienna y TU Wien. Comunidad numerosa y diversa. ESN Vienna muy organizado. Bailes universitarios, trips a Budapest y Bratislava, cenas de gala, eventos culturales." },
          { label: "Ambiente internacional", score: 8.8, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 9.0, desc: "Los arcos bajo el cinturón ferroviario del Gürtel albergan decenas de bares únicos. Ambiente local e internacional mezclado." },
          { label: "Eventos y actividades", score: 9.0, desc: "ESN activo. Bolas universitarias (sí, bailes de gala), cenas internacionales, trips a Budapest y Bratislava." },
        ],
        reviews: [
          { text: "Fui a un baile universitario de gala y fue lo más surrealista y bonito de mi Erasmus. Viena es única en eso.", author: "Klara, Erasmus 2023", flag: "🇩🇪" },
          { text: "Los Gürtelbars son increíbles — cada arco es un bar diferente y todos tienen personalidad propia.", author: "Matteo, Erasmus 2024", flag: "🇮🇹" },
          { text: "ESN Viena organiza los mejores eventos de todos los Erasmus que conozco. Los bailes de gala son una experiencia de otra época.", author: "Sofia, Erasmus 2023", flag: "🇬🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 8.2,
        summary: "Ciudad muy internacional y acostumbrada a visitantes de todo el mundo. El inglés funciona bien en todos los entornos.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 8.0, desc: "El inglés funciona muy bien en zonas universitarias y turísticas. El alemán vienés tiene su acento particular pero es accesible." },
          { label: "Actitud local", score: 8.0, desc: "Los vieneses son formales y algo reservados pero muy educados. La cortesía es parte del ADN cultural." },
          { label: "Integración con locales", score: 8.5, desc: "Ciudad histórica de encuentro de culturas del Imperio. La diversidad es parte de su historia y presente." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Los vieneses son formales al principio pero con tiempo son muy abiertos. Me invitaron a un Heuriger (taberna de vino) y fue increíble.", author: "Petra, Erasmus 2024", flag: "🇨🇿" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 9.5,
        summary: "El mejor transporte público de esta guía. Metro, tranvía, autobús y tren integrados. Puntual, limpio y baratísimo.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.5, desc: "5 líneas que cubren toda la ciudad. Puntual al segundo, limpio y con frecuencia altísima. Modelo europeo." },
          { label: "Transporte público", score: 9.5, desc: "Red de tranvías histórica e icónica. El Ring de noche en tranvía es una de las experiencias más bonitas de la ciudad." },
          { label: "Conexiones nacionales", score: 9.0, desc: "Tren a Budapest (2h30), Bratislava (1h), Múnich (4h), Praga (4h). La posición más central de Europa Central." },
          { label: "Escapadas de fin de semana", score: 9.0, desc: "Excelente posición para escapadas: Tren a Budapest (2h30), Bratislava (1h), Múnich (4h), Praga (4h). La posición más central de Europa Central." },
        ],
        reviews: [
          { text: "El transporte de Viena es el mejor que he usado en mi vida. Nunca esperé más de 3 minutos. Nunca llegué tarde.", author: "Lars, Erasmus 2023", flag: "🇩🇰" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.5,
        summary: "La mejor calidad de vida de esta guía. 10 años consecutivos número 1 mundial. No es casualidad.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 9.0, desc: "Prater, Donauinsel, Wienerwald. Verde abundante dentro de la ciudad. Naturaleza alpina a 1h en tren." },
          { label: "Clima", score: 7.5, desc: "Cuatro estaciones bien marcadas. Veranos calurosos, inviernos fríos pero con mucho encanto navideño. Verano: 28–33°C, soleado. El Donauinsel (isla del Danubio) se convierte en la playa de la ciudad. Perfecta para vivir al aire libre. Invierno: Frío, -5°C posibles, con nieve ocasional. Pero los mercados navideños de Viena son de los más bonitos de Europa." },
          { label: "Calidad de vida", score: 9.5, desc: "La mejor calidad de vida de esta guía. 10 años consecutivos número 1 mundial. No es casualidad." },
          { label: "Autenticidad local", score: 9.0, desc: "Wiener Schnitzel, Tafelspitz, Sachertorte, Apfelstrudel. Y la cultura del Kaffeehaus — café y periódico como ritual diario." },
          { label: "Estilo de vida", score: 9.5, desc: "Transporte perfecto, seguridad máxima, cultura accesible, gastronomía de nivel. La fórmula que nadie ha superado." },
        ],
        reviews: [
          { text: "Viena es la ciudad más completa en la que he vivido. Tiene todo y funciona todo. El número 1 es merecido.", author: "Oliver, Erasmus 2024", flag: "🇬🇧" },
          { text: "El Naschmarkt los sábados, la ópera los miércoles, el Prater los domingos. Mi rutina perfecta durante 6 meses.", author: "Céline, Erasmus 2023", flag: "🇧🇪" },
          { text: "El Donauinsel en verano con 100.000 personas de picnic es lo más bonito que he visto. Viena sabe vivir el verano.", author: "Lena, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 8.0,
        summary: "Hub de negocios de Europa Central. Finanzas, consultoría, ONGs internacionales y empresas regionales con sede en Viena.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 9.0, desc: "ONU Viena, OPEP, AIEA, ONUDI. La tercera sede de la ONU — detrás de Nueva York y Ginebra. Prácticas de alto nivel." },
          { label: "Prácticas", score: 8.0, desc: "Erste Group, Raiffeisen, Vienna Insurance Group. Hub financiero de Europa Central con salarios competitivos." },
          { label: "Empresas relevantes", score: 7.5, desc: "Ecosistema startup en crecimiento. Bitpanda, Runtastic (Adidas), Shpock nacieron aquí. Potencial real." },
          { label: "Oportunidades para estudiantes", score: 8.0, desc: "Hub de negocios de Europa Central. Finanzas, consultoría, ONGs internacionales y empresas regionales con sede en Viena." },
        ],
        reviews: [
          { text: "Hice prácticas en la ONU Viena. Una experiencia que abrió puertas que no sabía que existían.", author: "Valentina, Internship 2024", flag: "🇨🇴" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 9.3,
        summary: "Una de las ciudades más seguras de Europa. Constantemente en el top 3 mundial de ciudades más seguras.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 9.5, desc: "Top 3 mundial de ciudades más seguras según múltiples rankings. Criminalidad excepcionalmente baja." },
          { label: "Seguridad nocturna", score: 9.5, desc: "Completamente segura de noche en todas las zonas. Sin barrios conflictivos. Una de las ciudades más tranquilas de Europa." },
          { label: "Ambiente de la ciudad", score: 9.0, desc: "Nivel muy bajo. Solo precaución básica en el metro y zonas turísticas muy concurridas." },
        ],
        reviews: [
          { text: "Viena es la ciudad más segura en la que he estado. Nunca sentí ningún tipo de peligro en ningún momento.", author: "Emma, Erasmus 2024", flag: "🇸🇪" },
        ],
      },
      ],
  },
  lisboa: {
    heroImg: "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=1600&q=85",
    tagline: "La ciudad dorada del Atlántico. 300 días de sol, fado en las calles y el mar a 30 minutos.",
    atmosphere: "Cálida, nostálgica y vibrante. Lisboa huele a pastéis de nata y suena a fado saliendo de tabernas con luz azul.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 7.0,
        summary: "Asequible para Europa Occidental. Caro para Portugal. 900–1.100€/mes bien vividos.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 6.0, desc: "500–700€ habitación. El boom turístico encareció el mercado. Busca en Mouraria o Intendente." },
          { label: "Comida y supermercados", score: 8.5, desc: "Menú del día por 8–10€. Mercado de Ribeira. Pastéis por 1,20€. Comer bien es barato." },
          { label: "Transporte", score: 9.0, desc: "Pase mensual Navegante a 40€. Metro, tram, autobús. Los barcos sobre el Tajo incluidos." },
          { label: "Ocio y gastos diarios", score: 8.0, desc: "Cervezas a 2–3€. Mucha vida gratuita en miradores, playas urbanas y festivales de verano." },
        ],
        reviews: [
          { text: "Con 1.000€/mes vivía de lujo comparado con lo que habría pagado en París.", author: "Camille, Erasmus 2024", flag: "🇫🇷" },
          { text: "El alquiler se disparó pero si buscas bien en barrios menos turísticos, está bien.", author: "Tiago, estudiante local", flag: "🇵🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 5.5,
        summary: "Mercado tensionado por el turismo y los nómadas. Busca en barrios emergentes.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 5.0, desc: "Muy alta demanda. Muchos pisos se van a Airbnb. Hay que buscar en grupos locales." },
          { label: "Precio", score: 5.5, desc: "500–700€ habitación. Caro para Portugal. Mejor en Mouraria, Intendente o Arroios." },
          { label: "Plataformas", score: 7.0, desc: "Idealista Portugal, Uniplaces, grupos de Facebook de internacionales." },
          { label: "Residencias universitarias", score: 6.0, desc: "Consulta residencias universitarias disponibles — pueden ser la opción más cómoda y segura para los primeros meses." },
        ],
        reviews: [
          { text: "Buscando en el grupo de Facebook 'Erasmus Lisboa' encontré alojamiento en 4 días.", author: "Sofía, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.9,
        summary: "Noches largas y cálidas. Bairro Alto, Cais do Sodré y la escena de nómadas digitales. Enorme comunidad internacional. Lisboa es el destino Erasmus más trendy ahora mismo.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 9.1, desc: "+7.000 estudiantes internacionales entre NOVA, ULisboa e ISCTE. ESN muy activo. Rooftop parties, surf trips, wine tastings, city tours." },
          { label: "Ambiente internacional", score: 9.1, desc: "Ambiente internacional con estudiantes de toda Europa y el mundo." },
          { label: "Fiesta y vida nocturna", score: 9.0, desc: "Bairro Alto (bares de calle), Cais do Sodré (discotecas), LX Factory (eventos). Para todos." },
          { label: "Eventos y actividades", score: 8.5, desc: "Fado en vivo, rooftops con vistas, mercados nocturnos en verano." },
        ],
        reviews: [
          { text: "Las noches de verano en Lisboa son mágicas. Empieza en el Bairro Alto y termina en el Cais.", author: "Hannah, Erasmus 2023", flag: "🇩🇪" },
          { text: "Fui por Erasmus y me quedé 6 meses extra. La comunidad internacional es adictiva.", author: "Marco, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 9.2,
        summary: "Los portugueses son de los más acogedores de Europa. La ciudad más amigable del sur.",
        color: "#14B8A6",
        subcategories: [
          { label: "Actitud local", score: 9.5, desc: "Extremadamente amables y pacientes. El orgullo português se comparte, no se impone." },
          { label: "Nivel de inglés", score: 8.5, desc: "El inglés funciona muy bien. Muchos jóvenes hablan castellano también." },
          { label: "Integración con locales", score: 9.5, desc: "La ciudad más acogedora de la Península. Histórica apertura al mundo." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "La comunidad estudiantil facilita conocer gente de todo el mundo desde los primeros días." },
        ],
        reviews: [
          { text: "Los lisboetas son los más amables que he conocido en Europa. Me invitaron a cenar el primer día.", author: "Nadia, Erasmus 2024", flag: "🇦🇹" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.5,
        summary: "Navegante lo cubre todo. La bici cuesta en las colinas, el tuk-tuk es para turistas.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.0, desc: "Navegante Metropolitano a 40€/mes. Metro, tram, autobuses y ferries en un solo bono." },
          { label: "Topografía", score: 6.5, desc: "Las 7 colinas son bonitas pero duras a pie. Los eléctricos históricos son lentos. GIRA (bici compartida) es útil en zonas planas." },
          { label: "Conexiones nacionales", score: 8.5, desc: "Trenes a Oporto (3h) y a Faro (3,5h). Autocarres baratos para Sevilla y Madrid." },
        ],
        reviews: [
          { text: "Con el Navegante tenía el mundo. Hasta los ferries estaban incluidos.", author: "Erik, Erasmus 2023", flag: "🇳🇴" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 9.2,
        summary: "Difícil encontrar una ciudad que lo combine todo mejor. Será tu referencia de por vida.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 9.5, desc: "Surf en Ericeira (45min), playas de Cascais (30min), Serra de Sintra (30min)." },
          { label: "Clima", score: 9.4, desc: "El mejor clima de Europa Occidental. 300 días de sol. El Atlántico regula la temperatura. Verano: 25–35°C, seco y soleado. La brisa atlántica suaviza el calor. Playas a 30 minutos. Invierno: 12–18°C. El invierno más suave de Europa. Raramente baja de 10°C." },
          { label: "Calidad de vida", score: 9.0, desc: "Difícil encontrar una ciudad que lo combine todo mejor. Será tu referencia de por vida." },
          { label: "Autenticidad local", score: 9.5, desc: "Pastéis, bacalhau, ginjinha, marisco. La gastronomía más subestimada de Europa." },
          { label: "Estilo de vida", score: 9.0, desc: "Ritmo de vida relajado que invita a disfrutar. La antítesis del estrés." },
        ],
        reviews: [
          { text: "Lisboa te enseña a vivir. La velocidad, la comida, la gente, el mar. Es perfecta.", author: "Raphaelle, Erasmus 2024", flag: "🇫🇷" },
          { text: "Ninguna ciudad del mundo tiene lo que tiene Lisboa a ese precio. Todavía.", author: "Jake, Digital Nomad 2023", flag: "🇺🇸" },
          { text: "Vengo de Finlandia. El clima de Lisboa fue lo que me convenció para quedarme.", author: "Paavo, Work&Travel 2023", flag: "🇫🇮" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.8,
        summary: "Hub tecnológico en crecimiento. Startups, fintech y empresas internacionales que eligen Portugal.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 8.5, desc: "Web Summit. Farfetch, OutSystems, Feedzai nacieron aquí. Ecosistema tech muy activo." },
          { label: "Prácticas", score: 8.0, desc: "Mercedes, Google, Natixis tienen centros en Lisboa. Muchas oportunidades en inglés." },
          { label: "Empresas relevantes", score: 7.5, desc: "Convocatorias activas. El IPDJ gestiona muchos programas de prácticas internacionales." },
          { label: "Oportunidades para estudiantes", score: 7.8, desc: "Hub tecnológico en crecimiento. Startups, fintech y empresas internacionales que eligen Portugal." },
        ],
        reviews: [
          { text: "Hice prácticas en una startup del Web Summit. Me ficharon al terminar el Erasmus.", author: "Rafael, Erasmus→Job 2023", flag: "🇧🇷" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.5,
        summary: "Una de las capitales más seguras de Europa. Índice de criminalidad muy bajo.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.5, desc: "Consistentemente rankeada entre las 10 ciudades más seguras de Europa." },
          { label: "Seguridad nocturna", score: 8.5, desc: "Las zonas de fiesta son seguras. La gente está tranquila y no hay cultura de violencia." },
          { label: "Turismo masivo", score: 7.5, desc: "Con el turismo han aumentado los carteristas. Atención en trams históricos y zonas muy turísticas." },
        ],
        reviews: [
          { text: "La ciudad más segura en la que he vivido. Volví sola de noche siempre sin problema.", author: "Aisha, Erasmus 2024", flag: "🇬🇧" },
        ],
      },
      ],
  },
  estocolmo: {
    heroImg: "https://images.unsplash.com/photo-1564924304464-8cee6c450e7a?w=1600&q=85",
    tagline: "La capital del diseño escandinavo. 14 islas, agua por todas partes y el ecosistema startup más denso de Europa.",
    atmosphere: "Ordenada, luminosa en verano y profundamente nórdica. Estocolmo huele a canela recién horneada (kanelbulle) y suena al silencio educado del metro más bonito del mundo.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 4.2,
        summary: "Una de las ciudades más caras de esta guía, a la altura de Londres o Ámsterdam. Con 1.000–1.200€/mes se vive con holgura.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 3.0, desc: "Habitaciones desde 500–750€. El coste más alto de la vivienda de toda la guía junto a Londres." },
          { label: "Comida y supermercados", score: 5.5, desc: "ICA y Coop cubren lo básico, pero comer fuera es caro. Lunch menu del mediodía (100–130 SEK) es la opción lista." },
          { label: "Transporte", score: 6.5, desc: "SL-kortet mensual ≈930 SEK (~83€). Caro pero cubre metro, bus, tren de cercanías y ferris a las islas." },
          { label: "Ocio y gastos diarios", score: 4.5, desc: "Una cerveza en bar puede costar 8–9€. Sistema Ölkontroll estricto — el alcohol en tienda solo en Systembolaget." },
        ],
        reviews: [
          { text: "Llegué pensando que sería como cualquier capital europea y el primer mes de compra me hizo recalcular todo el presupuesto.", author: "Diego, Erasmus 2024", flag: "🇪🇸" },
          { text: "Con la beca máxima y compartiendo piso se puede, pero hay que dejar la vida social cara para ocasiones puntuales.", author: "Elena, Erasmus 2023", flag: "🇮🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 2.8,
        summary: "El mercado más difícil de esta guía junto a Londres. La demanda supera con creces la oferta — hay que moverse con muchísima antelación.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 2.5, desc: "Las colas de SSSB (la bolsa de vivienda estudiantil) se miden en años para pisos permanentes; para Erasmus hay cupos específicos pero limitados." },
          { label: "Precio", score: 3.0, desc: "500–750€ habitación. Corridor rooms (habitación con cocina/baño compartidos) son la opción más asequible." },
          { label: "Facilidad de búsqueda", score: 3.0, desc: "SSSB, Bostad Direkt y Blocket Bostad. Regístrate en SSSB en cuanto tengas la carta de admisión, no antes de llegar." },
          { label: "Residencias universitarias", score: 5.5, desc: "KTH y Stockholms Universitet gestionan cupos de corridor rooms para exchange students — solicítalo el primer día posible." },
        ],
        reviews: [
          { text: "Me registré en SSSB el día que me admitieron, meses antes de llegar. Sin eso no habría encontrado nada a tiempo.", author: "Marcus, Exchange 2023", flag: "🇩🇪" },
          { text: "Acabé en un corridor room compartiendo cocina con 12 personas. Al principio parece caótico pero acabas haciendo grandes amigos ahí mismo.", author: "Camille, Erasmus 2024", flag: "🇫🇷" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 7.5,
        summary: "Reservada al principio — los suecos no hablan con desconocidos por defecto — pero la comunidad internacional y las naciones estudiantiles compensan con creces.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.0, desc: "ESN Stockholm organiza sittningar (cenas temáticas con juegos y cánticos), sauna nights y viajes al archipiélago casi cada semana." },
          { label: "Ambiente internacional", score: 8.0, desc: "Gran mezcla de nacionalidades en KTH y Stockholms Universitet, con eventos pensados específicamente para exchange students." },
          { label: "Fiesta y vida nocturna", score: 6.5, desc: "Bares y clubs en Södermalm y Stureplan, pero caros y con colas largas los findes. Las fiestas estudiantiles (nations, gasque) son más accesibles." },
          { label: "Eventos y actividades", score: 8.0, desc: "Saunas junto al agua, patinaje sobre hielo en invierno, baño en el archipiélago en verano — el ocio local pesa tanto como la fiesta." },
        ],
        reviews: [
          { text: "Cuesta un poco romper el hielo con los suecos, pero en cuanto entras en su círculo la amistad es sólida y duradera.", author: "Tomás, Erasmus 2024", flag: "🇵🇹" },
          { text: "Las sittningar de ESN fueron lo más divertido del semestre — cenas con disfraz, canciones y mucho ambiente.", author: "Greta, Exchange 2023", flag: "🇦🇹" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.5,
        summary: "El inglés es prácticamente un segundo idioma nativo para los suecos, lo que facilita el día a día — aunque integrarse socialmente con locales lleva más tiempo que el idioma.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 9.5, desc: "Nivel de inglés altísimo en toda la población, incluidas las clases universitarias impartidas en inglés sin problema." },
          { label: "Actitud local", score: 6.5, desc: "Amables pero reservados — el concepto de 'lagom' (ni mucho ni poco) se aplica también al contacto social espontáneo." },
          { label: "Integración con locales", score: 6.0, desc: "Compartir corridor con suecos o unirte a una nation estudiantil son las vías más rápidas de integración real." },
          { label: "Facilidad para hacer amigos", score: 7.5, desc: "Fácil con la comunidad internacional desde el primer día; con locales requiere paciencia y contextos compartidos (deporte, fika)." },
        ],
        reviews: [
          { text: "El inglés no es un problema en absoluto. El reto real es pasar de conocidos a amigos con los suecos.", author: "Bruno, Erasmus 2023", flag: "🇧🇷" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.8,
        summary: "Transporte público excelente y muy puntual. El metro (Tunnelbana) es una atracción en sí mismo por sus estaciones decoradas como cuevas de arte.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.0, desc: "Metro, bus, tren de cercanías y ferris integrados en el mismo abono SL. Frecuente, limpio y fiable." },
          { label: "Ciudad caminable", score: 8.0, desc: "Muy ciclable pese al frío — carriles bici todo el año, incluso con nieve. Bici propia o Lime/Voi de alquiler." },
          { label: "Conexiones internacionales", score: 8.5, desc: "Arlanda conecta con toda Europa; ferris a Helsinki y las islas Åland son una excursión clásica de fin de semana." },
          { label: "Escapadas de fin de semana", score: 9.0, desc: "Archipiélago de Estocolmo (30.000 islas) a un ferry de distancia; Uppsala a 40 minutos en tren." },
        ],
        reviews: [
          { text: "El metro de Estocolmo parece un museo de arte subterráneo. Y siempre llega puntual, cosa que no había vivido en ningún otro sitio.", author: "Nadia, Exchange 2024", flag: "🇳🇱" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.7,
        summary: "Calidad de vida excepcional: naturaleza integrada en la ciudad, diseño en cada esquina y un equilibrio vida-trabajo que pocos sitios igualan.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 9.5, desc: "El archipiélago, los bosques dentro de los límites de la ciudad y el agua limpia para bañarse en pleno centro en verano." },
          { label: "Clima", score: 6.0, desc: "Extremo estacional: veranos de días interminables (18-19h de luz) frente a inviernos con apenas 6 horas de luz y frío seco bajo cero." },
          { label: "Calidad de vida", score: 9.5, desc: "Diseñada para el bienestar: espacios verdes, transporte fiable, sanidad y educación de primer nivel." },
          { label: "Autenticidad local", score: 8.5, desc: "El 'lagom' y el 'fika' no son clichés turísticos, son la forma de vida real de la ciudad." },
          { label: "Estilo de vida", score: 8.5, desc: "Ritmo tranquilo, mucho deporte al aire libre y una cultura del diseño que se respira en cada edificio." },
        ],
        reviews: [
          { text: "En junio salía de clase a las 21h y todavía había luz de sobra para bañarme en el lago Mälaren. Surrealista y maravilloso.", author: "Lucía, Erasmus 2024", flag: "🇪🇸" },
          { text: "El invierno es duro de verdad, pero la sauna y el mys (la versión sueca del hygge) te hacen quererlo igualmente.", author: "Adam, Exchange 2023", flag: "🇵🇱" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 8.7,
        summary: "El hub tecnológico más importante del norte de Europa. Cuna de Spotify, Klarna, King y decenas de unicornios — ideal para prácticas en tech.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 8.5, desc: "Por habitante, Estocolmo produce más unicornios tecnológicos que ninguna otra ciudad europea salvo Silicon Valley." },
          { label: "Prácticas", score: 9.0, desc: "Spotify, Klarna, King, Ericsson y un ecosistema enorme de startups abiertas a becarios internacionales en inglés." },
          { label: "Empresas relevantes", score: 9.0, desc: "KTH y su parque tecnológico conectan directamente a estudiantes de ingeniería con empresas del sector." },
          { label: "Oportunidades para estudiantes", score: 8.0, desc: "Networking constante vía eventos universitarios, hackathons y el propio KTH Innovation." },
        ],
        reviews: [
          { text: "Hice unas prácticas de verano en una startup fintech gracias a un contacto de la universidad. La escena tech aquí es brutal.", author: "Rafael, Internship 2024", flag: "🇧🇷" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.8,
        summary: "Una de las capitales más seguras y ordenadas de Europa, con un índice de criminalidad muy bajo y transporte público seguro a cualquier hora.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 9.0, desc: "Criminalidad muy baja para estándares de capital europea. Zonas universitarias completamente tranquilas." },
          { label: "Seguridad nocturna", score: 8.5, desc: "El metro funciona con normalidad hasta tarde y las calles están bien iluminadas incluso en invierno." },
          { label: "Ambiente de la ciudad", score: 9.0, desc: "Ciudad ordenada, limpia y con un civismo generalizado que se nota desde el primer día." },
        ],
        reviews: [
          { text: "Nunca me sentí insegura, ni de noche ni volviendo sola del metro. Rarísimo comparado con otras capitales.", author: "Valentina, Erasmus 2023", flag: "🇦🇷" },
        ],
      },
    ],
  },
  copenhague: {
    heroImg: "https://images.unsplash.com/photo-1764514814372-1997910000c1?w=1600&q=85",
    tagline: "La ciudad del hygge y las bicis. Diseño nórdico, sostenibilidad real y una de las capitales más felices del mundo.",
    atmosphere: "Relajada, ciclable y acogedora. Copenhague huele a canela de las panaderías y suena al timbre constante de bicicletas en los carriles bici más transitados de Europa.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 4.0,
        summary: "Una de las capitales más caras de esta guía. Con 1.000–1.300€/mes se vive con comodidad, sin lujos.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 3.2, desc: "Habitaciones desde 550–800€. Especialmente caro en Frederiksberg e Indre By (centro)." },
          { label: "Comida y supermercados", score: 5.5, desc: "Netto, Rema 1000 y Lidl para el día a día. Comer fuera es caro salvo en food halls como Reffen o Torvehallerne." },
          { label: "Transporte", score: 6.5, desc: "La bici sustituye al transporte público en el día a día. Rejsekort para trayectos ocasionales en metro/tren/bus." },
          { label: "Ocio y gastos diarios", score: 4.5, desc: "Cerveza en bar 6–7€. El alcohol en tienda es más asequible que en Suecia o Noruega, sin sistema de monopolio estatal." },
        ],
        reviews: [
          { text: "Es cara, no lo voy a negar, pero al no necesitar transporte público (todo en bici) el gasto mensual se equilibra bastante.", author: "Iker, Erasmus 2024", flag: "🇪🇸" },
          { text: "Cociné en casa casi todos los días. Comer fuera aquí es un lujo ocasional, no una rutina.", author: "Sofia, Exchange 2023", flag: "🇮🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 3.2,
        summary: "Escasez real de vivienda estudiantil en toda la ciudad. Hay que empezar la búsqueda con muchísima antelación y usar canales oficiales.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 3.0, desc: "La demanda estudiantil supera ampliamente la oferta. Muchos exchange students acaban en colegios mayores fuera del centro." },
          { label: "Precio", score: 3.5, desc: "550–800€ habitación. Kollegier (residencias) y bofællesskaber (pisos compartidos) son las opciones más razonables." },
          { label: "Facilidad de búsqueda", score: 3.5, desc: "Housing Foundation Copenhagen gestiona cupos para exchange students — es la vía más fiable, aplica el primer día posible." },
          { label: "Residencias universitarias", score: 5.0, desc: "KU, CBS y DTU colaboran con Housing Foundation, pero las plazas se agotan rápido, sobre todo para el semestre de otoño." },
        ],
        reviews: [
          { text: "Apliqué a Housing Foundation el mismo día que me admitieron. Aun así, tardé semanas en tener respuesta.", author: "Mateus, Exchange 2024", flag: "🇵🇹" },
          { text: "Acabé en un kollegium a 25 minutos en bici del centro. No es lo ideal pero en Copenhague 25 minutos en bici no es nada.", author: "Anaïs, Erasmus 2023", flag: "🇫🇷" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 7.8,
        summary: "Vida social relajada, muy centrada en el aire libre, la bici y el hygge — reuniones íntimas antes que macrofiestas.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.0, desc: "ESN Copenhagen organiza cenas, picnics junto al canal y viajes de fin de semana a Malmö o Lund." },
          { label: "Ambiente internacional", score: 8.5, desc: "KU, CBS y DTU reciben miles de exchange students cada semestre, con eventos pensados para ellos desde el primer día." },
          { label: "Fiesta y vida nocturna", score: 6.5, desc: "Vesterbro y Nørrebro concentran los bares; caros pero con ambiente joven. Las fiestas de kollegium son un clásico." },
          { label: "Eventos y actividades", score: 8.5, desc: "Baño en el puerto en verano, festivales de música, Tivoli Gardens y una vida al aire libre constante en bici." },
        ],
        reviews: [
          { text: "Aquí la vida social pasa más por un picnic junto al canal con una cerveza que por un club. Y se agradece.", author: "Nikos, Erasmus 2024", flag: "🇬🇷" },
          { text: "El baño en el puerto en pleno centro de una capital europea sigue pareciéndome una locura maravillosa.", author: "Alba, Exchange 2023", flag: "🇪🇸" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.8,
        summary: "Inglés altísimo y cultura muy abierta a estudiantes internacionales, aunque el danés cerrado ('hyggeligt' pero reservado) tarda en abrirse del todo.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 9.5, desc: "Casi toda la población domina el inglés con fluidez nativa, incluidos trámites administrativos y vida diaria." },
          { label: "Actitud local", score: 7.0, desc: "Amables y educados, pero el círculo social danés se forma desde la infancia — cuesta entrar del todo en poco tiempo." },
          { label: "Integración con locales", score: 6.5, desc: "Unirte a un kollegium con daneses o a un club deportivo universitario acelera mucho la integración real." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "Muy fácil con la enorme comunidad internacional; con locales requiere iniciativa y paciencia." },
        ],
        reviews: [
          { text: "Con la comunidad internacional hice amigos en la primera semana. Con daneses tardé meses, pero mereció la pena.", author: "Jonas, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 9.2,
        summary: "La ciudad más ciclable del mundo. Carriles bici propios, semáforos pensados para bicis y una infraestructura que hace innecesario el coche.",
        color: "#F59E0B",
        subcategories: [
          { label: "Bici como transporte principal", score: 9.8, desc: "Más de 375 km de carriles bici segregados. La bici es más rápida que el coche o el metro en la mayoría de trayectos." },
          { label: "Transporte público", score: 8.5, desc: "Metro automático 24h, trenes S-tog y buses cubren lo que la bici no alcanza, especialmente en invierno." },
          { label: "Conexiones internacionales", score: 9.0, desc: "El puente de Öresund conecta en tren directo con Malmö (Suecia) en 35 minutos — una escapada nórdica constante." },
          { label: "Escapadas de fin de semana", score: 8.5, desc: "Malmö y Lund a un salto de tren; Roskilde y sus fiordos a 30 minutos." },
        ],
        reviews: [
          { text: "Vendí la idea de comprar un abono de transporte a los dos días. La bici te lleva a todos lados más rápido.", author: "Pietro, Erasmus 2024", flag: "🇮🇹" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.8,
        summary: "El hygge no es marketing: calidad de vida altísima, diseño en cada esquina y un equilibrio entre trabajo, estudio y bienestar que se nota desde el primer día.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 8.0, desc: "Canales limpios para bañarse en pleno centro, parques como Frederiksberg Have y la costa a un pedaleo de distancia." },
          { label: "Clima", score: 6.0, desc: "Veranos suaves y luminosos (16-22°C) frente a inviernos oscuros y húmedos con apenas 7 horas de luz." },
          { label: "Calidad de vida", score: 9.5, desc: "Dinamarca aparece año tras año entre los países más felices del mundo — y Copenhague concentra buena parte de ese bienestar." },
          { label: "Autenticidad local", score: 8.5, desc: "El hygge (bienestar cotidiano con velas, café y buena compañía) es una forma de vida real, no un concepto turístico." },
          { label: "Estilo de vida", score: 8.5, desc: "Ritmo pausado, mucha vida en bici y al aire libre, y un diseño escandinavo presente en cada edificio y mueble." },
        ],
        reviews: [
          { text: "Llegué escéptico con lo del hygge y salí siendo un converso total. Las velas y el café de media tarde cambian el humor de cualquiera.", author: "Thomas, Exchange 2023", flag: "🇧🇪" },
          { text: "El equilibrio vida-estudio aquí es real. Nadie te mira raro por salir de clase a las 16h a montar en bici.", author: "Carla, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 8.3,
        summary: "Fuerte en biotecnología, diseño, sostenibilidad y finanzas, con Malmö y el sur de Suecia a 35 minutos ampliando aún más las oportunidades.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 8.0, desc: "Sede de Novo Nordisk, Maersk, Ørsted y un ecosistema fuerte de cleantech y diseño." },
          { label: "Prácticas", score: 8.5, desc: "CBS tiene fuertes conexiones con el sector financiero y consultoría; DTU con ingeniería y biotech." },
          { label: "Empresas relevantes", score: 8.5, desc: "El clúster de ciencias de la vida de Copenhague-Malmö (Medicon Valley) es uno de los más importantes de Europa." },
          { label: "Oportunidades para estudiantes", score: 8.0, desc: "Networking constante vía DTU Skylab, eventos de CBS y el ecosistema startup de la región de Øresund." },
        ],
        reviews: [
          { text: "Hice prácticas en una empresa de diseño sostenible gracias a un contacto de CBS. El foco en sostenibilidad aquí es real, no de cara a la galería.", author: "Émile, Internship 2024", flag: "🇫🇷" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.9,
        summary: "Constantemente entre las ciudades más seguras y felices del mundo. Criminalidad muy baja y ambiente urbano tranquilo a cualquier hora.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 9.0, desc: "Índice de criminalidad muy bajo, incluso en comparación con otras capitales nórdicas." },
          { label: "Seguridad nocturna", score: 8.5, desc: "Volver en bici de noche por carriles bien iluminados es completamente normal y seguro." },
          { label: "Ambiente de la ciudad", score: 9.0, desc: "Ciudad ordenada, confiada — los propios daneses dejan carritos de bebé sin vigilancia en la puerta de las cafeterías." },
        ],
        reviews: [
          { text: "Ver carritos de bebé aparcados fuera de un café mientras los padres toman algo dentro me dejó helada. Nivel de confianza que no había visto nunca.", author: "Ana, Erasmus 2023", flag: "🇵🇹" },
        ],
      },
    ],
  },
  helsinki: {
    heroImg: "https://images.unsplash.com/photo-1544096714-18ad573ad07e?w=1600&q=85",
    tagline: "Diseño nórdico, naturaleza a un paso y sauna como forma de vida. Un Erasmus tranquilo, seguro y distinto al resto de Europa.",
    atmosphere: "Silenciosa, ordenada y profundamente conectada con la naturaleza. Helsinki huele a bosque de pino y agua salada del Báltico, y suena al vapor de una sauna compartida con desconocidos que en dos horas ya son amigos.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 5.5,
        summary: "Algo más asequible que Estocolmo o Copenhague, aunque sigue siendo una capital nórdica cara. Con 800–1.150€/mes se vive bien.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 5.0, desc: "Habitaciones desde 450–650€. HOAS (residencias estudiantiles) es la opción más asequible con diferencia." },
          { label: "Comida y supermercados", score: 6.0, desc: "K-Market, S-Market y Lidl para el día a día. Los comedores universitarios (con Kela Card) ofrecen menús completos por 2,95€." },
          { label: "Transporte", score: 7.0, desc: "Abono HSL mensual ≈65€ para toda la red, incluidos los ferris a Suomenlinna. Descuento estudiantil significativo." },
          { label: "Ocio y gastos diarios", score: 5.5, desc: "Una cerveza en bar 6-7€, pero la sauna pública (10-15€) es el plan social más habitual y barato en comparación." },
        ],
        reviews: [
          { text: "Comía en el comedor de la universidad casi todos los días por menos de 3€. Con Kela Card el presupuesto de comida baja muchísimo.", author: "Laura, Erasmus 2024", flag: "🇪🇸" },
          { text: "Más barata que Estocolmo o Copenhague, pero sigue siendo una capital nórdica — el presupuesto hay que cuidarlo igual.", author: "Milan, Exchange 2023", flag: "🇨🇿" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 4.5,
        summary: "Mercado tenso pero más manejable que en Estocolmo. HOAS es la vía casi obligatoria para exchange students.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 4.5, desc: "HOAS gestiona miles de plazas específicas para estudiantes internacionales, aunque hay que solicitarlas con antelación." },
          { label: "Precio", score: 5.0, desc: "450–650€ habitación en HOAS. El mercado privado es notablemente más caro y competido." },
          { label: "Facilidad de búsqueda", score: 5.0, desc: "El portal de HOAS es el canal principal — regístrate en cuanto tengas la carta de admisión de tu universidad." },
          { label: "Residencias universitarias", score: 6.5, desc: "HOAS ofrece habitaciones individuales y compartidas repartidas por toda la ciudad, bien conectadas en transporte." },
        ],
        reviews: [
          { text: "HOAS fue mucho más sencillo que lo que había oído sobre Estocolmo. En un par de meses tenía alojamiento confirmado.", author: "Giulia, Erasmus 2024", flag: "🇮🇹" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 6.5,
        summary: "Tranquila pero muy genuina: la sauna, más que el bar, es el verdadero centro social. Comunidad Erasmus pequeña y muy unida.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 7.0, desc: "ESN Helsinki organiza saunas semanales, viajes a Laponia y eventos en el archipiélago — el ambiente es cercano." },
          { label: "Ambiente internacional", score: 7.5, desc: "Comunidad internacional activa entre University of Helsinki, Aalto y Hanken, con eventos pensados para exchange students." },
          { label: "Fiesta y vida nocturna", score: 6.0, desc: "Kallio concentra los bares estudiantiles; más tranquila que otras capitales pero con ambiente auténtico." },
          { label: "Eventos y actividades", score: 7.5, desc: "Vappu (1 de mayo) es la fiesta estudiantil del año; saunas, islas del archipiélago y auroras boreales en invierno." },
        ],
        reviews: [
          { text: "Compartir sauna con gente que acababas de conocer rompe el hielo (literalmente) más rápido que cualquier fiesta.", author: "Kacper, Erasmus 2023", flag: "🇵🇱" },
          { text: "Vappu es una locura maravillosa — toda la ciudad estudiantil sale a la calle con gorros blancos de graduación.", author: "Noor, Exchange 2024", flag: "🇳🇱" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.5,
        summary: "Inglés muy alto y sistema pensado para estudiantes internacionales. Los finlandeses son reservados pero honestos y fiables una vez conectas.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 9.0, desc: "Nivel de inglés muy alto en toda la población joven; los cursos de Aalto y Hanken están mayoritariamente en inglés." },
          { label: "Actitud local", score: 6.5, desc: "Reservados y de pocas palabras al principio, pero directos y de fiar — el silencio incómodo no existe en la cultura finlandesa." },
          { label: "Integración con locales", score: 6.5, desc: "La sauna y los clubes deportivos universitarios son la vía más rápida de romper el hielo con finlandeses." },
          { label: "Facilidad para hacer amigos", score: 7.5, desc: "Comunidad internacional muy acogedora desde el primer día vía ESN y las universidades." },
        ],
        reviews: [
          { text: "Al principio pensé que los finlandeses eran fríos. Luego entendí que solo hablan cuando tienen algo que decir. Amistades muy sinceras.", author: "Diego, Erasmus 2024", flag: "🇦🇷" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.5,
        summary: "Transporte público excelente y muy puntual. El archipiélago y Laponia quedan sorprendentemente accesibles.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.0, desc: "Metro, tram, bus y ferris integrados en el abono HSL. Puntual y muy fiable incluso en pleno invierno." },
          { label: "Ciudad caminable", score: 8.0, desc: "Ciudad compacta y muy ciclable; el mal tiempo invernal es lo único que frena el uso de bici en esa época." },
          { label: "Conexiones internacionales", score: 8.0, desc: "Ferry directo a Tallin (2h) y a Estocolmo (overnight); vuelos baratos a toda Escandinavia y Báltico." },
          { label: "Escapadas de fin de semana", score: 8.5, desc: "Suomenlinna en ferry de 15 minutos; Tallin como escapada clásica de fin de semana." },
        ],
        reviews: [
          { text: "El ferry a Tallin por 20-30€ ida y vuelta se convirtió en nuestro plan de findes recurrente.", author: "Emma, Exchange 2023", flag: "🇩🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.5,
        summary: "Naturaleza, diseño y sauna en su máxima expresión. Calma nórdica en estado puro para quien busca desconectar del ruido de las grandes capitales.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 9.5, desc: "Bosques dentro de los límites de la ciudad, archipiélago de más de 300 islas y agua limpia para bañarse en verano." },
          { label: "Clima", score: 5.5, desc: "Veranos de días eternos (hasta 19h de luz) frente a inviernos con apenas 6 horas de luz, frío intenso y nieve garantizada." },
          { label: "Calidad de vida", score: 9.0, desc: "Finlandia lidera año tras año los rankings de países más felices del mundo — Helsinki concentra buena parte de ese bienestar." },
          { label: "Autenticidad local", score: 8.5, desc: "La sauna (más de 3.000 en la ciudad) no es un cliché turístico, es una institución social real y cotidiana." },
          { label: "Estilo de vida", score: 8.0, desc: "Ritmo pausado, diseño funcional en cada rincón (Aalto, Marimekko, Iittala) y un contacto constante con la naturaleza." },
        ],
        reviews: [
          { text: "La sauna semanal se convirtió en mi ritual favorito del Erasmus. Un lujo silencioso que no sabía que necesitaba.", author: "Hugo, Erasmus 2024", flag: "🇫🇷" },
          { text: "Ver auroras boreales desde las afueras de la ciudad en pleno invierno fue de las experiencias más increíbles de mi vida.", author: "Chiara, Exchange 2023", flag: "🇮🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.8,
        summary: "Fuerte ecosistema tecnológico heredado de Nokia, con una escena startup pujante y educación de referencia mundial.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 7.5, desc: "Legado tecnológico de Nokia convertido en un ecosistema activo de startups (Supercell, Wolt) y gaming." },
          { label: "Prácticas", score: 8.0, desc: "Aalto tiene fuertes conexiones con tecnología y diseño; Hanken con finanzas y consultoría." },
          { label: "Empresas relevantes", score: 7.5, desc: "Slush, uno de los mayores eventos startup de Europa, se celebra anualmente en Helsinki." },
          { label: "Oportunidades para estudiantes", score: 8.0, desc: "Ecosistema de innovación muy accesible para estudiantes vía Aalto Ventures Program y eventos universitarios." },
        ],
        reviews: [
          { text: "Asistí a Slush como estudiante y acabé con contactos que me llevaron a unas prácticas de verano en una startup local.", author: "Rodrigo, Internship 2024", flag: "🇧🇷" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 9.2,
        summary: "Una de las ciudades más seguras y con menos corrupción del mundo. Índice de criminalidad prácticamente residual.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 9.5, desc: "Finlandia lidera consistentemente los rankings globales de menor corrupción y mayor confianza institucional." },
          { label: "Seguridad nocturna", score: 9.0, desc: "Volver de noche caminando o en transporte público es completamente normal, incluso para mujeres solas." },
          { label: "Ambiente de la ciudad", score: 9.0, desc: "Ciudad ordenada, silenciosa y con un civismo generalizado que sorprende a quien llega de capitales más grandes." },
        ],
        reviews: [
          { text: "Nunca en mi vida me he sentido tan segura como caminando sola de madrugada por Helsinki.", author: "Martina, Erasmus 2023", flag: "🇪🇸" },
        ],
      },
    ],
  },
  oslo: {
    heroImg: "https://images.unsplash.com/photo-1690809092810-dc3e9240191f?w=1600&q=85",
    tagline: "Fiordos, bosques y esquí urbano. La capital más cara de esta guía, pero también una de las que mejor calidad de vida ofrece.",
    atmosphere: "Salvaje y sofisticada a la vez. Oslo huele a bosque de pino recién llovido y suena al silencio de Nordmarka roto solo por el crujido de la nieve bajo los esquís.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 3.5,
        summary: "La ciudad más cara de esta guía. Con 1.000–1.350€/mes se vive con comodidad moderada; Noruega no está en la eurozona y el coste se nota en todo.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 4.0, desc: "Habitaciones desde 500–750€. SiO gestiona buena parte de la vivienda estudiantil, la opción más asequible con diferencia." },
          { label: "Comida y supermercados", score: 3.5, desc: "Kiwi y Rema 1000 son los supermercados más económicos, aun así los precios sorprenden a quien llega de fuera de Escandinavia." },
          { label: "Transporte", score: 6.5, desc: "Abono Ruter mensual ≈50€, con buen descuento estudiantil, cubre metro, tram, bus y ferris del fiordo." },
          { label: "Ocio y gastos diarios", score: 3.0, desc: "Una cerveza en bar puede rondar los 9-10€, de las más caras de Europa. El vinmonopolet regula la venta de alcohol fuerte." },
        ],
        reviews: [
          { text: "Es cara de verdad, más que Estocolmo o Copenhague en mi experiencia. Pero la naturaleza gratis compensa buena parte del gasto en ocio.", author: "Sara, Erasmus 2024", flag: "🇮🇹" },
          { text: "Cociné en casa prácticamente todo el semestre. Salir a comer fuera aquí es un lujo puntual, no una opción habitual.", author: "Tomás, Exchange 2023", flag: "🇪🇸" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 3.5,
        summary: "Mercado ajustado pero manejable gracias a SiO, la organización de bienestar estudiantil que gestiona buena parte de la vivienda universitaria.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 3.5, desc: "SiO tiene cupos priorizados para exchange students, pero la demanda sigue superando la oferta en temporada alta." },
          { label: "Precio", score: 4.0, desc: "500–750€ habitación en residencias SiO. El mercado privado es notablemente más caro." },
          { label: "Facilidad de búsqueda", score: 4.5, desc: "SiO es prácticamente el único canal recomendable — solicita en cuanto tengas la carta de admisión." },
          { label: "Residencias universitarias", score: 5.5, desc: "Kringsjå y Sogn Student Villages son las más habituales para exchange students, con cocina y baño compartidos." },
        ],
        reviews: [
          { text: "Viví en Sogn Student Village y fue de las mejores decisiones. Cocina compartida con gente de toda Europa, ambiente muy internacional.", author: "Louise, Exchange 2024", flag: "🇫🇷" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 6.8,
        summary: "Vida social de calidad más que de cantidad: la naturaleza es el plan constante, no el bar. Comunidad Erasmus unida y muy activa al aire libre.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 7.0, desc: "ESN Oslo organiza rutas de senderismo, esquí y viajes a fiordos casi cada fin de semana." },
          { label: "Ambiente internacional", score: 7.5, desc: "UiO, BI y OsloMet reciben una comunidad internacional grande y activa, con eventos pensados para exchange students." },
          { label: "Fiesta y vida nocturna", score: 6.0, desc: "Grünerløkka concentra los bares con más ambiente; caros pero con buen ambiente joven." },
          { label: "Eventos y actividades", score: 7.5, desc: "Esquí de fondo a un tranvía del centro, senderismo en Nordmarka y baño en el fiordo en verano." },
        ],
        reviews: [
          { text: "Cambié salir de fiesta por salir a esquiar de fondo un domingo por la mañana. Nunca pensé que echaría de menos algo así.", author: "Piotr, Erasmus 2023", flag: "🇵🇱" },
          { text: "La comunidad Erasmus era pequeña pero muy unida. Las rutas de senderismo organizadas por ESN son de lo mejor del semestre.", author: "Camille, Exchange 2024", flag: "🇫🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.2,
        summary: "Inglés altísimo y sistema muy accesible para internacionales. Los noruegos son reservados al principio, pero cercanos y fiables una vez conectas.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 9.0, desc: "Nivel de inglés muy alto en toda la población, especialmente entre los jóvenes universitarios." },
          { label: "Actitud local", score: 6.0, desc: "Reservados y de pocas palabras al inicio, similar a otros países nórdicos — pero honestos y de fiar." },
          { label: "Integración con locales", score: 6.5, desc: "Unirte a un buddy group de la universidad o a actividades al aire libre acelera mucho la integración." },
          { label: "Facilidad para hacer amigos", score: 7.5, desc: "Muy fácil con la comunidad internacional; con locales requiere paciencia y actividades compartidas." },
        ],
        reviews: [
          { text: "El programa de buddy de UiO me ayudó muchísimo a romper el hielo con estudiantes noruegos desde la primera semana.", author: "Elena, Erasmus 2024", flag: "🇬🇷" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.5,
        summary: "Transporte público excelente y muy bien conectado con la naturaleza — el bosque de Nordmarka está literalmente al final de una línea de metro.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 8.5, desc: "Metro, tram y bus integrados en el abono Ruter. Puntual y fiable incluso con nieve." },
          { label: "Ciudad caminable", score: 8.0, desc: "Centro compacto y ciclable en las estaciones cálidas; en invierno la bici da paso al transporte público." },
          { label: "Naturaleza a un trayecto", score: 9.5, desc: "La línea de metro T-bane lleva directamente a Nordmarka — de la ciudad al bosque en 20-30 minutos." },
          { label: "Escapadas de fin de semana", score: 8.0, desc: "Los fiordos noruegos y Bergen a un vuelo corto o tren panorámico; estaciones de esquí a 1-2 horas." },
        ],
        reviews: [
          { text: "Coger el metro para ir directo al bosque a esquiar de fondo un martes por la tarde fue de lo más surrealista y maravilloso que he vivido.", author: "Ben, Exchange 2023", flag: "🇩🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 9.0,
        summary: "Naturaleza salvaje integrada en la ciudad como en ningún otro destino de esta guía: fiordo y bosque a la vez, con una calidad de vida excepcional.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 10.0, desc: "Fiordo de Oslo para bañarte en verano y bosque de Nordmarka con 2.600 km de pistas de esquí de fondo en invierno." },
          { label: "Clima", score: 6.0, desc: "Veranos suaves y luminosos (16-22°C) frente a inviernos fríos y oscuros con nieve prácticamente garantizada." },
          { label: "Calidad de vida", score: 9.5, desc: "Noruega lidera consistentemente los rankings de renta per cápita y desarrollo humano más altos del mundo." },
          { label: "Autenticidad local", score: 8.5, desc: "El friluftsliv (vida al aire libre) no es un concepto de marketing — es la forma en que los noruegos viven su tiempo libre." },
          { label: "Estilo de vida", score: 8.5, desc: "Ritmo pausado, mucho deporte al aire libre y una relación con la naturaleza que impregna toda la cultura." },
        ],
        reviews: [
          { text: "Vivir a 20 minutos en metro de un bosque donde puedes esquiar de fondo gratis cambió mi forma de entender la calidad de vida.", author: "Marta, Erasmus 2024", flag: "🇵🇹" },
          { text: "El friluftsliv es real. Los noruegos literalmente organizan su semana alrededor de estar al aire libre.", author: "Jonas, Exchange 2023", flag: "🇩🇪" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 8.0,
        summary: "Fuerte en energía, tecnología marina y sector público, en un país con una de las rentas per cápita más altas del mundo.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 7.5, desc: "Sector energético (Equinor) y tecnología marina dominan; también fuerte presencia de fondos soberanos y finanzas." },
          { label: "Prácticas", score: 8.0, desc: "BI tiene fuertes conexiones con el sector financiero y empresarial noruego." },
          { label: "Empresas relevantes", score: 8.0, desc: "Equinor, Telenor y un ecosistema tecnológico creciente en torno a energías renovables." },
          { label: "Oportunidades para estudiantes", score: 8.5, desc: "Salarios estudiantiles altos comparados con el resto de Europa, aunque el coste de vida los absorbe en gran parte." },
        ],
        reviews: [
          { text: "Trabajé unas horas a la semana en un café durante el semestre y el sueldo por hora era muy superior al de mi país.", author: "Andrei, Erasmus 2024", flag: "🇷🇴" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.8,
        summary: "Entre los países más seguros y con mejor calidad de vida del mundo. Criminalidad muy baja y confianza institucional altísima.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 9.0, desc: "Noruega aparece consistentemente entre los primeros puestos de los índices globales de paz y seguridad." },
          { label: "Seguridad nocturna", score: 8.5, desc: "Volver de noche por el centro o en transporte público es completamente normal y seguro." },
          { label: "Ambiente de la ciudad", score: 9.0, desc: "Ciudad ordenada y tranquila, con un nivel de confianza social muy alto entre sus habitantes." },
        ],
        reviews: [
          { text: "Me sorprendió ver a estudiantes dejando el portátil sin vigilancia en la biblioteca durante horas. Nivel de confianza muy distinto al de mi país.", author: "Clara, Erasmus 2023", flag: "🇪🇸" },
        ],
      },
    ],
  },
  reikiavik: {
    heroImg: "https://images.unsplash.com/photo-1762339863505-17af5c0478b0?w=1600&q=85",
    tagline: "El Erasmus más extremo y espectacular de Europa: volcanes, géiseres y auroras boreales a la vuelta de la esquina de la capital más pequeña y segura del continente.",
    atmosphere: "Cruda, espectacular y sorprendentemente acogedora. Reikiavik huele a azufre geotermal en cuanto sales de la ciudad y suena al silencio absoluto de un país con más ovejas que coches en muchas carreteras.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 4.0,
        summary: "Cara y fuera de la eurozona. Con 900–1.300€/mes se vive, pero comer fuera y el ocio nocturno son de los más caros de Europa.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 4.5, desc: "Habitaciones desde 500–750€. Comunidad estudiantil pequeña facilita encontrar piso compartido vía grupos de Facebook." },
          { label: "Comida y supermercados", score: 4.0, desc: "Bónus y Krónan son los supermercados más económicos. Comer fuera puede triplicar el precio que en el sur de Europa." },
          { label: "Transporte", score: 5.5, desc: "Strætó (bus urbano) cubre la ciudad con descuento estudiantil; para el Círculo Dorado hace falta coche compartido o tour." },
          { label: "Ocio y gastos diarios", score: 3.5, desc: "Una cerveza en bar puede rondar los 9-10€. Las piscinas geotermales de barrio, en cambio, son una ganga a 6-8€." },
        ],
        reviews: [
          { text: "El presupuesto de comida fue el mayor shock. Cocinar en casa y compartir coche para las excursiones fue clave para sobrevivir el semestre.", author: "Andrea, Erasmus 2024", flag: "🇮🇹" },
          { text: "Cara sí, pero la piscina geotermal de mi barrio costaba menos que un café en muchas capitales europeas. Todo es cuestión de elegir bien los gastos.", author: "Kevin, Exchange 2023", flag: "🇩🇪" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 4.5,
        summary: "Comunidad estudiantil pequeña que hace el mercado manejable si te mueves con tiempo, aunque la oferta específica para exchange students es limitada.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 4.0, desc: "Comunidad reducida — la oferta de habitaciones es menor que en capitales grandes, pero también la demanda." },
          { label: "Precio", score: 4.5, desc: "500–750€ habitación en el centro (101 Reykjavík). Barrios como Hlíðar son algo más asequibles." },
          { label: "Facilidad de búsqueda", score: 4.5, desc: "Grupos de Facebook de exchange students en Reikiavik y el portal de vivienda de cada universidad son los canales principales." },
          { label: "Residencias universitarias", score: 5.0, desc: "Ambas universidades tienen convenios con residencias, pero conviene solicitarlas en cuanto llega la admisión — las plazas son limitadas." },
        ],
        reviews: [
          { text: "Con un grupo de Facebook de exchange students encontré piso en tres semanas. La comunidad es pequeña pero se ayuda mucho entre sí.", author: "Julie, Exchange 2024", flag: "🇫🇷" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 5.8,
        summary: "Comunidad Erasmus reducida pero muy unida — en una ciudad tan pequeña, todo el mundo acaba conociéndose en pocas semanas.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 6.0, desc: "ESN Iceland organiza excursiones al Círculo Dorado, tours de auroras boreales y noches de piscina geotermal." },
          { label: "Ambiente internacional", score: 6.5, desc: "Comunidad internacional pequeña pero muy activa entre University of Iceland y Reykjavik University." },
          { label: "Fiesta y vida nocturna", score: 5.5, desc: "El centro (101 Reykjavík) concentra la vida nocturna, cara pero con ambiente auténtico los findes." },
          { label: "Eventos y actividades", score: 7.0, desc: "Tours de auroras boreales, excursiones a glaciares y piscinas geotermales son el plan constante, más que el bar." },
        ],
        reviews: [
          { text: "Al ser tan pocos Erasmus acabamos siendo una familia real. Viajamos juntos a ver auroras boreales cada pocas semanas.", author: "Noah, Erasmus 2023", flag: "🇳🇱" },
          { text: "La vida nocturna del centro es cara pero tiene un ambiente muy genuino, sin el postureo de otras capitales.", author: "Bianca, Exchange 2024", flag: "🇷🇴" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 6.8,
        summary: "Inglés altísimo e islandeses sorprendentemente cercanos para tratarse de un país nórdico — la comunidad pequeña favorece conexiones reales.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 9.0, desc: "Nivel de inglés muy alto en toda la población joven, especialmente en el entorno universitario." },
          { label: "Actitud local", score: 6.5, desc: "Más abiertos de lo esperado para ser nórdicos; el tamaño reducido de la ciudad favorece el contacto cercano." },
          { label: "Integración con locales", score: 6.0, desc: "Las piscinas geotermales de barrio son, sorprendentemente, el mejor sitio para socializar con islandeses." },
          { label: "Facilidad para hacer amigos", score: 6.5, desc: "Comunidad internacional pequeña pero cercana; con locales lleva algo más de tiempo pero es alcanzable." },
        ],
        reviews: [
          { text: "En la piscina de mi barrio acabé charlando con jubilados islandeses cada semana. Es el verdadero punto de encuentro social aquí.", author: "Rebecca, Exchange 2023", flag: "🇬🇧" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 6.0,
        summary: "Strætó cubre bien la propia ciudad, pero explorar la isla exige coche compartido o tours organizados — no hay red ferroviaria en todo el país.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte urbano", score: 6.5, desc: "Strætó (bus) cubre Reikiavik y alrededores con buen descuento estudiantil, aunque la frecuencia baja fuera de horas punta." },
          { label: "Ciudad caminable", score: 7.5, desc: "El centro (101 Reykjavík) es pequeño y perfectamente caminable o ciclable." },
          { label: "Excursiones por la isla", score: 5.0, desc: "No hay trenes en Islandia — coche compartido, alquiler o tours organizados son imprescindibles para el Círculo Dorado y más allá." },
          { label: "Conexiones internacionales", score: 6.0, desc: "El aeropuerto de Keflavík conecta con Europa y EE.UU., pero los vuelos suelen ser más caros que en el continente." },
        ],
        reviews: [
          { text: "Compartir coche con otros Erasmus se convirtió en el plan de cada fin de semana. Sin coche, ver la isla de verdad es muy difícil.", author: "Léa, Erasmus 2024", flag: "🇫🇷" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 9.5,
        summary: "El entorno más espectacular y extremo de toda esta guía: volcanes, géiseres, glaciares y auroras boreales al alcance de un fin de semana.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 10.0, desc: "Círculo Dorado, glaciares, costas volcánicas y auroras boreales — un paisaje que no se parece a ningún otro destino de Europa." },
          { label: "Clima", score: 6.5, desc: "Extremo estacional: sol de medianoche en verano frente a apenas 4-5 horas de luz en pleno invierno, con viento constante todo el año." },
          { label: "Calidad de vida", score: 9.5, desc: "Islandia lidera consistentemente los rankings de igualdad y bienestar social del mundo." },
          { label: "Autenticidad local", score: 9.0, desc: "Cultura de sagas, piscinas geotermales de barrio y una relación con la naturaleza que define toda la identidad islandesa." },
          { label: "Estilo de vida", score: 8.5, desc: "Ritmo tranquilo con la naturaleza siempre como protagonista, muy alejado del ajetreo de las grandes capitales." },
        ],
        reviews: [
          { text: "Ver mi primera aurora boreal desde las afueras de la ciudad, sin necesidad de ningún tour, fue el momento que definió todo mi Erasmus.", author: "Sofía, Erasmus 2024", flag: "🇪🇸" },
          { text: "Bañarme en una piscina geotermal humeante mientras nevaba alrededor es de las experiencias más surrealistas que he vivido nunca.", author: "Matteo, Exchange 2023", flag: "🇮🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 6.5,
        summary: "Mercado laboral pequeño, pero con un turismo en auge y un sector de energía geotérmica puntero a nivel mundial.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 6.0, desc: "Economía pequeña centrada en turismo, pesca y energía renovable — pocas prácticas específicas para exchange students." },
          { label: "Prácticas", score: 6.5, desc: "Reykjavik University tiene conexiones con energía geotérmica e informática; oportunidades más limitadas que en capitales grandes." },
          { label: "Empresas relevantes", score: 6.5, desc: "Islandia es referencia mundial en energía 100% renovable (geotérmica e hidroeléctrica), un sector con fuerte proyección." },
          { label: "Oportunidades para estudiantes", score: 6.5, desc: "El turismo ofrece trabajos estudiantiles a tiempo parcial relativamente accesibles y bien pagados." },
        ],
        reviews: [
          { text: "El mercado es pequeño, pero conseguí un trabajo a tiempo parcial en turismo que me ayudó bastante con el presupuesto.", author: "Oscar, Erasmus 2023", flag: "🇸🇪" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 9.8,
        summary: "La capital más pequeña y consistentemente más segura de Europa. Islandia encabeza año tras año el Índice Global de Paz.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 10.0, desc: "Islandia lleva más de una década siendo el país más pacífico del mundo según el Índice Global de Paz." },
          { label: "Seguridad nocturna", score: 9.5, desc: "Caminar de noche por cualquier zona de Reikiavik es completamente normal y seguro, sin excepción." },
          { label: "Ambiente de la ciudad", score: 9.5, desc: "Comunidad pequeña donde el nivel de confianza social es prácticamente absoluto." },
        ],
        reviews: [
          { text: "Nunca cerré la puerta de casa con llave en todo el semestre. Es literalmente ese tipo de sitio.", author: "Freya, Exchange 2024", flag: "🇩🇰" },
        ],
      },
    ],
  },
  dublin: {
    heroImg: "https://images.unsplash.com/photo-1660501772252-d569493dc61f?w=1600&q=85",
    tagline: "Pubs con música en directo cada noche, la cuna literaria de Joyce y Wilde, y la sede europea de medio Silicon Valley.",
    atmosphere: "Ruidosa, literaria y profundamente social. Dublín huele a Guinness recién tirada y suena a violín irlandés colándose por la puerta entreabierta de cualquier pub un martes por la noche.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 3.8,
        summary: "Una de las capitales más caras de esta guía. Con 1.000–1.400€/mes se vive con cierta comodidad, sin margen para grandes lujos.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 2.5, desc: "Habitaciones desde 700–1.000€. La crisis de vivienda dublinesa es real y golpea de lleno a los estudiantes internacionales." },
          { label: "Comida y supermercados", score: 5.0, desc: "Lidl y Aldi salvan el presupuesto. Salir a comer fuera es notablemente caro comparado con el resto de Europa." },
          { label: "Transporte", score: 6.0, desc: "Leap Card con descuento estudiantil cubre bus, DART y tranvía Luas. Razonable dentro del contexto irlandés." },
          { label: "Ocio y gastos diarios", score: 3.0, desc: "Una pinta de Guinness ronda los 6-7€, de las más caras de Europa. La vida de pub, aun así, sigue siendo el plan social central." },
        ],
        reviews: [
          { text: "El alojamiento es el gran shock. Llegué sin piso cerrado y tardé semanas en encontrar algo mínimamente razonable de precio.", author: "Martina, Erasmus 2024", flag: "🇮🇹" },
          { text: "Es cara, sin duda, pero la vida social compensa. Un par de pintas en un pub con música en vivo valen cada euro.", author: "Rui, Exchange 2023", flag: "🇵🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 2.5,
        summary: "Crisis de vivienda severa, de las más difíciles de toda esta guía. Es imprescindible empezar a buscar con muchos meses de antelación.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 2.0, desc: "La demanda supera ampliamente la oferta desde hace años. Muchos exchange students recurren a residencias privadas fuera del centro." },
          { label: "Precio", score: 2.5, desc: "700–1.000€ habitación. De los precios más altos de toda esta guía en relación al tamaño de la ciudad." },
          { label: "Facilidad de búsqueda", score: 3.5, desc: "Daft.ie es el portal principal. Las oficinas internacionales de TCD y UCD ofrecen orientación, aunque plazas limitadas." },
          { label: "Residencias universitarias", score: 4.0, desc: "TCD y UCD tienen residencias propias con cupos para exchange students — solicítalas en cuanto llegue la admisión." },
        ],
        reviews: [
          { text: "Empecé a buscar 5 meses antes y aun así fue estresante. Aquí la búsqueda de piso empieza mucho antes que en cualquier otro destino.", author: "Hannah, Exchange 2024", flag: "🇩🇪" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.5,
        summary: "El pub con música en directo es el verdadero centro social de la ciudad, no solo un sitio para beber. Vida social intensa desde la primera semana.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.5, desc: "TCD y UCD reciben miles de exchange students, con ESN organizando eventos constantes y muy participativos." },
          { label: "Ambiente internacional", score: 8.5, desc: "Ciudad acostumbrada a recibir estudiantes internacionales desde hace décadas, con infraestructura social muy rodada." },
          { label: "Fiesta y vida nocturna", score: 8.5, desc: "Temple Bar concentra el ambiente más turístico; los pubs de barrio ofrecen música en vivo auténtica cada noche de la semana." },
          { label: "Eventos y actividades", score: 8.0, desc: "Sesiones de música tradicional irlandesa, eventos literarios y festivales al aire libre en verano." },
        ],
        reviews: [
          { text: "En Dublín el pub no es un plan de viernes, es un plan de cualquier día. La música en vivo espontánea en cualquier bar es una pasada.", author: "Sofia, Erasmus 2023", flag: "🇬🇷" },
          { text: "La comunidad Erasmus aquí es enorme y muy activa. Nunca sentí que faltara ambiente ni un solo fin de semana.", author: "Lucas, Exchange 2024", flag: "🇫🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 8.5,
        summary: "Inglés nativo desde el primer día e irlandeses entre los más abiertos, habladores y acogedores de toda Europa.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 10.0, desc: "Inmersión total en inglés nativo desde el minuto uno, con el irlandés como segunda lengua oficial en menor uso cotidiano." },
          { label: "Actitud local", score: 9.0, desc: "Los irlandeses tienen fama merecida de ser habladores, cercanos y dispuestos a charlar con cualquiera en el pub." },
          { label: "Integración con locales", score: 7.5, desc: "El pub es la vía más rápida de integración real — basta con sentarte en la barra y dejarte llevar por la conversación." },
          { label: "Facilidad para hacer amigos", score: 8.5, desc: "Ciudad muy sociable donde hacer amigos, tanto internacionales como locales, resulta sorprendentemente fácil." },
        ],
        reviews: [
          { text: "Llegué con miedo a mi nivel de inglés y en dos semanas ya charlaba sin parar con desconocidos en cualquier pub. Los irlandeses lo ponen fácil.", author: "Valeria, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 6.5,
        summary: "El transporte público es mejorable comparado con otras capitales europeas, pero la Leap Card lo hace manejable y la costa queda muy cerca.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 6.0, desc: "Bus, DART (tren de cercanías) y tranvía Luas cubren la ciudad, aunque con menos frecuencia que en otras capitales." },
          { label: "Ciudad caminable", score: 7.5, desc: "Centro compacto y muy caminable; el DART conecta bien con la costa norte y sur." },
          { label: "Conexiones nacionales", score: 7.0, desc: "Buses y trenes conectan con Galway, Cork y los Acantilados de Moher en escapadas de fin de semana." },
          { label: "Conexiones internacionales", score: 7.5, desc: "Vuelos baratos a toda Europa desde el aeropuerto de Dublín, uno de los más conectados de las Islas Británicas." },
        ],
        reviews: [
          { text: "El DART hacia la costa sur (Dalkey, Howth) se convirtió en mi escapada de findes favorita, a menos de 30 minutos del centro.", author: "Ben, Exchange 2023", flag: "🇬🇧" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.5,
        summary: "Literatura, música y una costa espectacular a un trayecto corto de la ciudad. El estilo de vida dublinés gira en torno a lo social.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.5, desc: "Costa irlandesa con acantilados y pueblos pesqueros a menos de una hora; Phoenix Park, uno de los parques urbanos más grandes de Europa." },
          { label: "Clima", score: 5.5, desc: "Oceánico suave y muy lluvioso todo el año, sin extremos de temperatura pero con lluvia constante e impredecible." },
          { label: "Calidad de vida", score: 7.5, desc: "Buena calidad de vida general, aunque el coste de vivienda es el principal lastre para estudiantes." },
          { label: "Autenticidad local", score: 8.5, desc: "La tradición literaria y musical irlandesa impregna toda la ciudad, no solo las zonas turísticas." },
          { label: "Estilo de vida", score: 7.5, desc: "Ritmo social intenso centrado en la conversación, la música y el pub como espacio comunitario real." },
        ],
        reviews: [
          { text: "Visitar la casa de Joyce y luego acabar la noche en un pub con música tradicional resume perfectamente lo que es vivir en Dublín.", author: "Chiara, Erasmus 2024", flag: "🇮🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 9.0,
        summary: "Sede europea de Google, Meta, LinkedIn y buena parte del sector tech mundial, con oportunidades de prácticas muy accesibles en inglés.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 9.0, desc: "Silicon Docks concentra las sedes europeas de las principales tecnológicas del mundo, con alta demanda de perfiles multilingües." },
          { label: "Prácticas", score: 9.0, desc: "TCD y UCD tienen fuertes conexiones con el sector tech y financiero, con programas de prácticas muy activos." },
          { label: "Empresas relevantes", score: 9.5, desc: "Google, Meta, LinkedIn, Stripe y Airbnb tienen su sede europea en Dublín." },
          { label: "Oportunidades para estudiantes", score: 8.5, desc: "Perfil multilingüe muy valorado en el sector tech dublinés, con demanda constante de hablantes de otros idiomas europeos." },
        ],
        reviews: [
          { text: "Conseguí unas prácticas en una tech company gracias a mi combinación de idiomas. Aquí ser hablante de español o italiano es un activo real.", author: "Pablo, Internship 2024", flag: "🇪🇸" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 7.8,
        summary: "Segura en general para estándares europeos, con la precaución habitual de cualquier capital, especialmente en las zonas de más ambiente nocturno.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.0, desc: "Segura para estándares de capital europea, con los cuidados normales en cualquier gran ciudad." },
          { label: "Seguridad nocturna", score: 7.0, desc: "Precaución razonable en Temple Bar y alrededores tarde de noche los fines de semana, como en cualquier zona de fiesta." },
          { label: "Ambiente de la ciudad", score: 8.0, desc: "Ambiente generalmente tranquilo y acogedor, con la vida social muy volcada en espacios públicos como el pub." },
        ],
        reviews: [
          { text: "Me sentí segura la mayor parte del tiempo, con el cuidado normal los findes en Temple Bar por la afluencia de gente.", author: "Nora, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
    ],
  },
  edimburgo: {
    heroImg: "https://images.unsplash.com/photo-1566037194426-1944346fc8d9?w=1600&q=85",
    tagline: "Una ciudad de piedra gótica construida sobre volcanes extintos, con el mayor festival de artes del mundo cada agosto.",
    atmosphere: "Gótica, literaria y espectacular. Edimburgo huele a piedra húmeda tras la lluvia y suena a gaitas callejeras mezcladas con el bullicio de agosto durante el Fringe Festival.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 3.8,
        summary: "Cara, en línea con Dublín. Con 1.000–1.400€/mes se vive con cierta comodidad, especialmente fuera del festival de agosto.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 3.0, desc: "Habitaciones desde 650–950€. Los precios suben notablemente si tu estancia coincide con el Fringe Festival en agosto." },
          { label: "Comida y supermercados", score: 5.0, desc: "Lidl, Aldi y Tesco cubren el día a día. Comer fuera es caro salvo en food markets puntuales." },
          { label: "Transporte", score: 6.5, desc: "Abono Lothian Buses o tranvía con descuento estudiantil; el centro es totalmente caminable de todas formas." },
          { label: "Ocio y gastos diarios", score: 4.0, desc: "Una pinta en pub ronda 5-6£. Los eventos del Fringe suelen tener entradas económicas para estudiantes." },
        ],
        reviews: [
          { text: "Vivir aquí en agosto es caro por el Fringe, pero el resto del año el presupuesto se relaja bastante.", author: "Elin, Exchange 2024", flag: "🇸🇪" },
          { text: "Cociné en casa la mayor parte del tiempo y usé el increíble catálogo de eventos gratuitos de la universidad para el ocio.", author: "Marc, Erasmus 2023", flag: "🇫🇷" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 3.0,
        summary: "Mercado tenso, especialmente si tu estancia coincide con el Fringe Festival de agosto, cuando la demanda se dispara.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 3.0, desc: "University of Edinburgh garantiza alojamiento a estudiantes de intercambio de año completo si aplicas a tiempo; semestre único, no siempre." },
          { label: "Precio", score: 3.0, desc: "650–950€ habitación. Old Town y zonas céntricas son notablemente más caras que Marchmont o Leith." },
          { label: "Facilidad de búsqueda", score: 4.0, desc: "El portal de accommodation.ed.ac.uk es el canal principal — solicita en cuanto tengas la admisión confirmada." },
          { label: "Residencias universitarias", score: 5.0, desc: "Ambas universidades ofrecen residencias con cupos para exchange students, aunque limitados en semestres únicos." },
        ],
        reviews: [
          { text: "Al ser de año completo tuve alojamiento garantizado por la universidad, lo cual simplificó todo muchísimo.", author: "Ingrid, Exchange 2024", flag: "🇳🇴" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.0,
        summary: "El pub y el Fringe Festival definen la vida social de la ciudad, con una comunidad internacional muy activa durante todo el año académico.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.0, desc: "University of Edinburgh recibe una comunidad internacional muy grande, con sociedades estudiantiles activas todo el año." },
          { label: "Ambiente internacional", score: 8.0, desc: "Una de cada tres personas de la universidad viene de fuera del Reino Unido — ambiente muy cosmopolita." },
          { label: "Fiesta y vida nocturna", score: 7.5, desc: "Cowgate y Grassmarket concentran los pubs con más ambiente estudiantil, con ceilidhs (bailes tradicionales) incluidos." },
          { label: "Eventos y actividades", score: 9.0, desc: "El Fringe Festival en agosto convierte la ciudad entera en escenario, con miles de espectáculos accesibles para estudiantes." },
        ],
        reviews: [
          { text: "Vivir el Fringe desde dentro, como estudiante local, es una experiencia que no se olvida. La ciudad entera respira teatro.", author: "Alessia, Erasmus 2024", flag: "🇮🇹" },
          { text: "Fui a mi primer ceilidh (baile tradicional escocés) organizado por la universidad y acabé haciendo algunos de mis mejores amigos ahí.", author: "Diego, Exchange 2023", flag: "🇦🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 8.0,
        summary: "Inglés nativo y escoceses conocidos por ser especialmente cercanos y hospitalarios, incluso más que el resto del Reino Unido.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 10.0, desc: "Inmersión total en inglés nativo, con acento escocés como reto añadido pero muy asequible con el tiempo." },
          { label: "Actitud local", score: 8.5, desc: "Los escoceses tienen fama merecida de ser más cercanos y menos reservados que el resto del Reino Unido." },
          { label: "Integración con locales", score: 7.5, desc: "Las sociedades estudiantiles (societies) son la vía más rápida de conectar con estudiantes locales." },
          { label: "Facilidad para hacer amigos", score: 8.0, desc: "Comunidad internacional enorme facilita amistades desde el primer día, con locales requiriendo algo más de iniciativa." },
        ],
        reviews: [
          { text: "Los escoceses son mucho más abiertos y habladores de lo que esperaba. Se nota la diferencia con otras partes de Reino Unido.", author: "Léna, Erasmus 2024", flag: "🇫🇷" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 7.5,
        summary: "Ciudad muy caminable con buses y tranvía para completar el resto, y las Highlands escocesas a un trayecto corto para escapadas.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 7.5, desc: "Lothian Buses y el tranvía conectan bien la ciudad y el aeropuerto, con buen descuento para estudiantes." },
          { label: "Ciudad caminable", score: 8.5, desc: "El centro histórico es compacto y perfectamente caminable, con Arthur's Seat como mirador natural a pie de ciudad." },
          { label: "Escapadas de fin de semana", score: 8.5, desc: "Highlands, Loch Ness y la Isla de Skye a pocas horas en coche compartido o tour organizado." },
          { label: "Conexiones internacionales", score: 7.0, desc: "El aeropuerto de Edimburgo conecta bien con Europa, aunque con menos rutas directas que Londres." },
        ],
        reviews: [
          { text: "Una excursión de fin de semana a las Highlands con otros exchange students fue de lo mejor del semestre — paisajes que no había visto nunca.", author: "Kasper, Exchange 2023", flag: "🇩🇰" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.5,
        summary: "Gótica y literaria, con Arthur's Seat como montaña dentro de la propia ciudad y las Highlands escocesas a un trayecto corto.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 8.5, desc: "Arthur's Seat, un volcán extinto dentro de los límites de la ciudad, ofrece vistas panorámicas a pocos minutos del centro." },
          { label: "Clima", score: 5.5, desc: "Oceánico fresco y lluvioso todo el año, sin extremos de temperatura pero con viento constante." },
          { label: "Calidad de vida", score: 8.5, desc: "Casco antiguo Patrimonio de la Humanidad, con una vida cultural intensa durante todo el año." },
          { label: "Autenticidad local", score: 8.5, desc: "Tradición literaria (cuna de Conan Doyle y J.K. Rowling escribió aquí sus primeros libros) y cultura gaélica muy presente." },
          { label: "Estilo de vida", score: 8.0, desc: "Ritmo académico serio combinado con una vida cultural y festivalera de primer nivel mundial." },
        ],
        reviews: [
          { text: "Subir a Arthur's Seat al amanecer antes de clase se convirtió en mi ritual favorito del semestre. Ver una ciudad entera desde un volcán es único.", author: "Paula, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.5,
        summary: "Fuerte en finanzas, ciencia de datos y el sector cultural, con University of Edinburgh entre las mejores universidades del mundo en investigación.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 7.5, desc: "Segundo centro financiero del Reino Unido tras Londres, con fuerte presencia también en ciencia de datos e IA." },
          { label: "Prácticas", score: 7.5, desc: "University of Edinburgh tiene fuertes conexiones con investigación y tecnología, aunque el visado post-Brexit añade trámites." },
          { label: "Empresas relevantes", score: 7.5, desc: "Sede de importantes gestoras financieras (Standard Life, Baillie Gifford) y un ecosistema creciente de startups de IA." },
          { label: "Oportunidades para estudiantes", score: 7.0, desc: "El sector cultural y de eventos ofrece trabajos estudiantiles accesibles, especialmente durante el Fringe Festival." },
        ],
        reviews: [
          { text: "Trabajé como voluntario en el Fringe Festival y acabé con contactos en el sector cultural que no esperaba conseguir de Erasmus.", author: "Tom, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.5,
        summary: "Una de las capitales más seguras y tranquilas del Reino Unido, con un ambiente estudiantil muy cuidado por la propia universidad.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.5, desc: "Índice de criminalidad bajo comparado con otras grandes ciudades del Reino Unido." },
          { label: "Seguridad nocturna", score: 8.0, desc: "Volver de noche por zonas estudiantiles como Marchmont es generalmente tranquilo y seguro." },
          { label: "Ambiente de la ciudad", score: 8.5, desc: "Ciudad ordenada y con un fuerte sentido comunitario, especialmente en el entorno universitario." },
        ],
        reviews: [
          { text: "Me sentí muy segura durante todo el semestre, incluso volviendo sola de noche desde la biblioteca.", author: "Greta, Exchange 2024", flag: "🇦🇹" },
        ],
      },
    ],
  },
  atenas: {
    heroImg: "https://images.unsplash.com/photo-1578345536195-d122fa60a195?w=1600&q=85",
    tagline: "Cuna de la democracia y la filosofía occidental, con la Acrópolis presidiendo el horizonte y playas del Egeo a un tranvía del centro.",
    atmosphere: "Caótica, cálida y llena de vida. Atenas huele a café frío y souvlaki a la parrilla, y suena a motos zumbando entre ruinas de 2.500 años de antigüedad como si fuera lo más normal del mundo.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 8.0,
        summary: "Una de las capitales más baratas de Europa Occidental. Con 500–800€/mes se vive con comodidad, incluyendo salidas frecuentes.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 6.5, desc: "Habitaciones desde 250–400€. Los precios han subido con el turismo y los pisos turísticos, pero siguen siendo bajos para Europa Occidental." },
          { label: "Comida y supermercados", score: 8.5, desc: "Souvlaki callejero por 2-3€, mercados frescos y tabernas económicas por toda la ciudad." },
          { label: "Transporte", score: 8.0, desc: "Con carné ISIC/ESN el billete baja de 1,40€ a 0,60€. Muy asequible para moverse por toda la ciudad." },
          { label: "Ocio y gastos diarios", score: 8.5, desc: "Cervezas a 3-4€, entrada a clubs asequible. La vida de terraza mediterránea es barata y constante." },
        ],
        reviews: [
          { text: "Con 600€ al mes vivía muy bien, salía varias veces por semana y todavía ahorraba para viajar por las islas.", author: "Nikolas, Erasmus 2024", flag: "🇩🇪" },
          { text: "El presupuesto aquí es de los más generosos de toda Europa. Comía fuera casi a diario sin preocuparme por el dinero.", author: "Camille, Exchange 2023", flag: "🇫🇷" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 6.5,
        summary: "Precios contenidos comparados con el resto de Europa, aunque el auge del turismo y los pisos tipo Airbnb ha tensionado algunas zonas.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 6.5, desc: "Oferta razonable, aunque zonas turísticas como Plaka o Koukaki han visto subir precios por los pisos turísticos." },
          { label: "Precio", score: 7.0, desc: "250–400€ habitación en barrios estudiantiles como Exarchia o Pangrati, de los más bajos de esta guía." },
          { label: "Facilidad de búsqueda", score: 6.0, desc: "Spitogatos y grupos de Facebook de exchange students son los canales principales de búsqueda." },
          { label: "Residencias universitarias", score: 5.5, desc: "Oferta limitada de residencias oficiales; la mayoría de exchange students buscan piso compartido por su cuenta." },
        ],
        reviews: [
          { text: "Encontré piso en Pangrati sin demasiado esfuerzo y a un precio que en cualquier otra capital europea sería impensable.", author: "Marco, Erasmus 2023", flag: "🇮🇹" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.5,
        summary: "Vida nocturna y de terrazas mediterránea, intensa y muy asequible. La comunidad Erasmus es de las más activas de Europa del Sur.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 9.0, desc: "ESN KAPA Athens organiza excursiones a islas, fiestas temáticas y actividades constantes durante todo el semestre." },
          { label: "Ambiente internacional", score: 8.0, desc: "NKUA y AUEB reciben cientos de exchange students cada semestre, con una comunidad internacional muy unida." },
          { label: "Fiesta y vida nocturna", score: 8.5, desc: "Gazi y Psiri concentran clubs y bares con ambiente hasta la madrugada, a precios muy asequibles." },
          { label: "Eventos y actividades", score: 8.5, desc: "Excursiones a islas cercanas (Egina, Hydra) organizadas por ESN son de los planes más populares del semestre." },
        ],
        reviews: [
          { text: "Las excursiones de ESN a las islas los fines de semana fueron de lo mejor de mi Erasmus. Playa por la mañana, fiesta por la noche.", author: "Théo, Erasmus 2024", flag: "🇫🇷" },
          { text: "La vida nocturna en Gazi no tiene nada que envidiar a otras capitales europeas, y el precio es una fracción.", author: "Sara, Exchange 2023", flag: "🇪🇸" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.0,
        summary: "Griegos hospitalarios y calurosos, aunque el nivel de inglés varía según el barrio y el entorno generacional.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 7.0, desc: "Buen nivel entre jóvenes y en el entorno universitario; más limitado en comercios de barrio o generaciones mayores." },
          { label: "Actitud local", score: 8.5, desc: "Los griegos tienen fama merecida de hospitalarios — la filoxenía (amor al extranjero) es parte de su cultura." },
          { label: "Integración con locales", score: 6.5, desc: "Aprender algunas frases básicas de griego abre muchas puertas y acelera notablemente la integración." },
          { label: "Facilidad para hacer amigos", score: 7.5, desc: "Comunidad internacional muy accesible desde el primer día; con locales requiere algo de iniciativa." },
        ],
        reviews: [
          { text: "En cuanto intenté hablar unas palabras de griego, la actitud de la gente cambió por completo. Son muy cálidos con quien lo intenta.", author: "Julia, Erasmus 2024", flag: "🇵🇱" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 6.5,
        summary: "Metro y tranvía cubren bien el centro y llegan hasta las playas del Egeo, aunque la red de superficie puede ser más caótica.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 7.0, desc: "Metro moderno y eficiente en las líneas principales; bus y tranvía completan el resto con menos puntualidad." },
          { label: "Ciudad caminable", score: 6.0, desc: "El centro histórico es caminable, aunque el tráfico y las aceras irregulares pueden ser un reto." },
          { label: "Playas a un tranvía", score: 8.5, desc: "El tranvía conecta el centro con Vouliagmeni y otras playas de la Riviera de Atenas en menos de una hora." },
          { label: "Conexiones internacionales", score: 7.0, desc: "El aeropuerto de Atenas conecta bien con toda Europa; ferris a las islas griegas desde el puerto de El Pireo." },
        ],
        reviews: [
          { text: "Salir de clase e ir directamente a la playa en tranvía sin cambiar de plan fue una de las cosas más surrealistas de mi Erasmus.", author: "Anke, Exchange 2023", flag: "🇩🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 8.5,
        summary: "Historia antigua, playas cercanas y ritmo mediterráneo auténtico. Vivir entre ruinas de miles de años forma parte del día a día.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 8.0, desc: "Playas del Egeo a un tranvía, monte Licabeto con vistas panorámicas y las islas griegas a un ferry de distancia." },
          { label: "Clima", score: 8.5, desc: "Mediterráneo con veranos calurosos e inviernos suaves — de los climas más agradecidos de toda esta guía." },
          { label: "Calidad de vida", score: 8.0, desc: "Ritmo de vida relajado, gastronomía excelente y un coste que permite disfrutar sin grandes preocupaciones económicas." },
          { label: "Autenticidad local", score: 9.0, desc: "Vivir rodeado de historia de 2.500 años, desde el Ágora hasta el Partenón, sin que resulte nunca artificial." },
          { label: "Estilo de vida", score: 8.5, desc: "Café largo en terraza, siesta veraniega y vida social que se alarga hasta bien entrada la noche." },
        ],
        reviews: [
          { text: "Ver el atardecer desde el monte Licabeto con toda la ciudad y la Acrópolis iluminada de fondo es algo que no olvidaré nunca.", author: "Valentina, Erasmus 2024", flag: "🇮🇹" },
          { text: "Vivir a cinco minutos andando de ruinas de 2.500 años y tratarlas como algo normal cambia tu perspectiva de la historia.", author: "Oskar, Exchange 2023", flag: "🇸🇪" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 5.5,
        summary: "Mercado laboral más limitado que en el norte de Europa, aunque el turismo y el sector marítimo ofrecen algunas oportunidades.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 5.5, desc: "Economía centrada en turismo, transporte marítimo y sector público — menos dinámica que otras capitales de esta guía." },
          { label: "Prácticas", score: 5.5, desc: "AUEB tiene conexiones con el sector financiero y naviero griego, aunque las prácticas para exchange students son limitadas." },
          { label: "Empresas relevantes", score: 5.5, desc: "Grecia es potencia mundial en transporte marítimo, con importantes navieras con sede en Atenas y El Pireo." },
          { label: "Oportunidades para estudiantes", score: 5.5, desc: "El turismo ofrece trabajos estudiantiles estacionales, especialmente en temporada alta de verano." },
        ],
        reviews: [
          { text: "El mercado laboral no es el punto fuerte de Atenas, pero para un semestre de experiencia académica y cultural es perfecto.", author: "Fernando, Erasmus 2023", flag: "🇵🇹" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 6.5,
        summary: "Segura en general, con las mismas precauciones que cualquier gran capital, prestando algo más de atención en ciertas zonas del centro por la noche.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 6.5, desc: "Segura para estándares de gran capital europea, con las precauciones normales de cualquier ciudad grande." },
          { label: "Seguridad nocturna", score: 6.0, desc: "Algunas zonas como Omonia requieren algo más de atención de noche; el resto del centro es tranquilo." },
          { label: "Ambiente de la ciudad", score: 7.0, desc: "Ambiente generalmente cálido y acogedor, con la vida callejera activa hasta tarde en verano." },
        ],
        reviews: [
          { text: "Me sentí segura en general, evitando simplemente algunas calles de noche que ya me habían recomendado los locales.", author: "Ines, Erasmus 2024", flag: "🇩🇪" },
        ],
      },
    ],
  },
  zagreb: {
    heroImg: "https://images.unsplash.com/photo-1590233216259-d9576426f5e2?w=1600&q=85",
    tagline: "Elegancia austrohúngara, cultura de café en terraza y la costa adriática a un autobús de distancia.",
    atmosphere: "Tranquila, elegante y acogedora. Zagreb huele a café recién molido en cualquier terraza de Tkalčićeva y suena al tranvía azul cruzando la Ciudad Baja bajo edificios de fachadas pastel.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 7.5,
        summary: "Uno de los costes de vida más bajos de esta guía. Con 450–700€/mes se vive con comodidad y margen para viajar por la región.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 7.0, desc: "Habitaciones desde 250–380€. Sin la presión de otras capitales, aunque los precios han subido moderadamente en los últimos años." },
          { label: "Comida y supermercados", score: 8.0, desc: "Mercado Dolac para producto fresco y económico; menús del día en tabernas desde 6-8€." },
          { label: "Transporte", score: 8.0, desc: "Abono estudiantil de ZET (tranvía y bus) muy asequible, con buena cobertura de toda la ciudad." },
          { label: "Ocio y gastos diarios", score: 7.5, desc: "Café en terraza por 1,50-2€, cervezas a 2-3€. La cultura de la terraza hace el ocio diario muy barato." },
        ],
        reviews: [
          { text: "Con 500€ al mes vivía perfectamente, incluyendo café diario en terraza y alguna escapada a la costa.", author: "Lena, Erasmus 2024", flag: "🇩🇪" },
          { text: "El presupuesto aquí me permitió viajar por los Balcanes varios fines de semana sin preocupación económica.", author: "Tomás, Exchange 2023", flag: "🇪🇸" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 7.0,
        summary: "Mercado tranquilo y accesible, sin la presión que sufren otras capitales de esta guía. Búsqueda relativamente sencilla.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 7.0, desc: "Oferta razonable para el tamaño de la comunidad estudiantil, sin escasez severa." },
          { label: "Precio", score: 7.5, desc: "250–380€ habitación, de los precios más bajos de toda esta guía." },
          { label: "Facilidad de búsqueda", score: 6.5, desc: "Grupos de Facebook de exchange students y portales locales (Njuškalo) son los canales principales." },
          { label: "Residencias universitarias", score: 6.0, desc: "University of Zagreb ofrece plazas en varios halls de residencia, con proceso de solicitud dentro de la aplicación de intercambio." },
        ],
        reviews: [
          { text: "Encontré piso en Donji Grad en menos de dos semanas sin apenas estrés. Un cambio total respecto a lo que había oído de otras ciudades.", author: "Paolo, Erasmus 2023", flag: "🇮🇹" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 7.0,
        summary: "El café en terraza, más que el club nocturno, define la vida social diaria. Comunidad Erasmus activa aunque más pequeña que en otras capitales.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 7.5, desc: "ESN Zagreb organiza excursiones a la costa, fiestas temáticas y actividades constantes para exchange students." },
          { label: "Ambiente internacional", score: 7.0, desc: "University of Zagreb recibe cientos de exchange students cada semestre, con Welcome Week bien organizada." },
          { label: "Fiesta y vida nocturna", score: 6.5, desc: "Tkalčićeva concentra bares y terrazas con ambiente; la escena de clubs es más modesta que en otras capitales." },
          { label: "Eventos y actividades", score: 7.5, desc: "El mercado navideño de Zagreb ha sido galardonado varias veces como el mejor de Europa." },
        ],
        reviews: [
          { text: "La cultura de café en terraza aquí es sagrada. Pasas horas charlando con un solo café y a nadie le importa.", author: "Nadia, Exchange 2024", flag: "🇳🇱" },
          { text: "El mercado navideño superó todas mis expectativas. Entiendo perfectamente por qué lo premian año tras año.", author: "Erik, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.0,
        summary: "Croatas acogedores y con buen nivel de inglés entre los jóvenes, en una ciudad menos acostumbrada al turismo masivo que otras capitales.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 7.5, desc: "Buen nivel entre estudiantes y jóvenes; algo más limitado fuera del entorno universitario." },
          { label: "Actitud local", score: 7.5, desc: "Los croatas son hospitalarios y curiosos con los extranjeros, especialmente al ser una ciudad con menos turismo masivo." },
          { label: "Integración con locales", score: 6.5, desc: "El café en terraza y los eventos universitarios son las vías más naturales de conectar con estudiantes locales." },
          { label: "Facilidad para hacer amigos", score: 7.0, desc: "Comunidad internacional acogedora desde el primer día, con ESN facilitando bastante el proceso." },
        ],
        reviews: [
          { text: "Al ser menos habitual como destino Erasmus, sentí una curiosidad genuina de los locales hacia nosotros, muy distinta a otras capitales saturadas de turismo.", author: "Clara, Erasmus 2024", flag: "🇫🇷" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 7.0,
        summary: "Tranvía y bus cubren bien la ciudad, con la costa adriática y sus islas a un trayecto de autobús para escapadas de fin de semana.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 7.5, desc: "Red de tranvías (ZET) cubre bien el centro y barrios cercanos, con frecuencia razonable." },
          { label: "Ciudad caminable", score: 7.5, desc: "Centro compacto y muy caminable, con la Ciudad Alta accesible también por funicular histórico." },
          { label: "Escapadas de fin de semana", score: 8.0, desc: "Split, Zadar y las islas dálmatas a 4-5 horas en autobús — clásico plan de fin de semana largo." },
          { label: "Conexiones internacionales", score: 6.5, desc: "El aeropuerto de Zagreb conecta con Europa, aunque con menos rutas directas que otras capitales de esta guía." },
        ],
        reviews: [
          { text: "Un fin de semana largo en Split con otros Erasmus fue de lo mejor del semestre — playa de verdad a pocas horas de la universidad.", author: "Mikkel, Exchange 2023", flag: "🇩🇰" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.5,
        summary: "Elegancia austrohúngara en la Ciudad Alta combinada con un ritmo de vida tranquilo y la costa adriática siempre cerca.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.0, desc: "Parque Maksimir dentro de la ciudad; montaña Medvednica para senderismo a un tranvía del centro." },
          { label: "Clima", score: 7.0, desc: "Continental con veranos cálidos e inviernos fríos pero secos, sin extremos severos." },
          { label: "Calidad de vida", score: 8.0, desc: "Ritmo tranquilo, coste de vida bajo y una ciudad a escala humana fácil de recorrer a pie." },
          { label: "Autenticidad local", score: 8.5, desc: "La Ciudad Alta conserva su estética austrohúngara intacta, sin la masificación turística de otras capitales." },
          { label: "Estilo de vida", score: 7.5, desc: "Café en terraza, paseos por la Ciudad Alta y escapadas frecuentes a la costa definen el ritmo de vida." },
        ],
        reviews: [
          { text: "Pasear por la Ciudad Alta al atardecer, con las luces encendiéndose una a una, es de las postales más bonitas que me llevo del Erasmus.", author: "Beatriz, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 6.0,
        summary: "Mercado laboral modesto pero en crecimiento, con el sector IT y el turismo como principales motores de oportunidades.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 6.0, desc: "Economía en crecimiento desde la entrada en el euro y Schengen, con IT y turismo como sectores más dinámicos." },
          { label: "Prácticas", score: 6.0, desc: "University of Zagreb tiene conexiones crecientes con empresas tecnológicas locales, aunque el mercado sigue siendo modesto." },
          { label: "Empresas relevantes", score: 6.0, desc: "Ecosistema tecnológico incipiente, con Zagreb consolidándose como hub emergente en la región." },
          { label: "Oportunidades para estudiantes", score: 6.0, desc: "El turismo, en auge tras la entrada en el euro, ofrece trabajos estudiantiles estacionales." },
        ],
        reviews: [
          { text: "El mercado laboral no es el punto fuerte, pero encontré unas prácticas cortas en una startup local gracias a contactos de la universidad.", author: "Ivo, Erasmus 2023", flag: "🇸🇮" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.0,
        summary: "Una de las capitales más tranquilas y seguras de Europa Central, con un ambiente urbano relajado y poca criminalidad.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.5, desc: "Índice de criminalidad bajo, con un ambiente urbano generalmente tranquilo y confiado." },
          { label: "Seguridad nocturna", score: 7.5, desc: "Volver de noche por el centro o Tkalčićeva es habitualmente tranquilo y seguro." },
          { label: "Ambiente de la ciudad", score: 8.0, desc: "Ciudad ordenada y relajada, sin la masificación turística que genera fricciones en otras capitales." },
        ],
        reviews: [
          { text: "Nunca me sentí insegura ni de día ni de noche. Zagreb tiene un ambiente muy tranquilo comparado con otras capitales europeas.", author: "Marion, Exchange 2024", flag: "🇫🇷" },
        ],
      },
    ],
  },
  liubliana: {
    heroImg: "https://images.unsplash.com/photo-1699870192530-c70781bdea21?w=1600&q=85",
    tagline: "La capital más verde y peatonal de Europa Central, con un castillo sobre la ciudad y los Alpes Julianos a menos de una hora.",
    atmosphere: "Serena, verde y a escala humana. Liubliana huele a río limpio y castañas asadas en otoño, y suena al eco tranquilo de pasos sobre adoquines en un centro casi sin coches.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 7.0,
        summary: "Muy asequible, de las capitales más baratas de esta guía. Con 500–750€/mes se vive con comodidad y margen para escapadas.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 6.5, desc: "Habitaciones desde 280–420€. Mercado pequeño y manejable, sin la tensión de otras capitales." },
          { label: "Comida y supermercados", score: 7.5, desc: "Mercadillo central (Odprta kuhna los viernes) y supermercados asequibles cubren bien el presupuesto." },
          { label: "Transporte", score: 8.0, desc: "El centro es peatonal, así que apenas se necesita transporte; LPP tiene abono estudiantil muy económico para el resto." },
          { label: "Ocio y gastos diarios", score: 7.0, desc: "Café en terraza junto al río por 1,50-2€. Ocio muy asequible comparado con capitales occidentales." },
        ],
        reviews: [
          { text: "Con 550€ al mes vivía con holgura, incluyendo escapadas frecuentes a Bled y los Alpes cercanos.", author: "Sanne, Erasmus 2024", flag: "🇳🇱" },
          { text: "El presupuesto aquí es de los más generosos de Europa. Ni de lejos gasté lo que gastaban mis amigos en otras capitales.", author: "Rafael, Exchange 2023", flag: "🇵🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 7.0,
        summary: "Mercado pequeño y manejable, sin la presión de otras capitales de esta guía. Búsqueda relativamente sencilla si te mueves con algo de antelación.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 7.0, desc: "Oferta razonable para el tamaño de la comunidad estudiantil, sin escasez severa." },
          { label: "Precio", score: 7.0, desc: "280–420€ habitación, de los precios más bajos de esta guía." },
          { label: "Facilidad de búsqueda", score: 6.5, desc: "Grupos de Facebook de exchange students y el portal Nepremicnine.net son los canales principales." },
          { label: "Residencias universitarias", score: 6.5, desc: "University of Ljubljana ofrece plazas en dormitorios estudiantiles, con proceso dentro de la solicitud de intercambio." },
        ],
        reviews: [
          { text: "Encontré piso compartido cerca del centro en menos de un mes, sin apenas competencia con otros estudiantes.", author: "Milena, Exchange 2024", flag: "🇷🇸" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 6.5,
        summary: "Tranquila y de escala pequeña, ideal para comunidades muy unidas. Menos ambiente festivo que otras capitales, pero muy genuino.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 7.0, desc: "ESN Ljubljana organiza excursiones a Bled, Bohinj y los Alpes Julianos con buena participación." },
          { label: "Ambiente internacional", score: 6.5, desc: "Comunidad internacional más pequeña que en otras capitales de esta guía, pero muy cercana entre sí." },
          { label: "Fiesta y vida nocturna", score: 6.0, desc: "Metelkova, un antiguo cuartel militar convertido en zona alternativa, concentra buena parte del ambiente nocturno." },
          { label: "Eventos y actividades", score: 7.0, desc: "Excursiones de día al lago Bled y Bohinj son de los planes más recurrentes y valorados del semestre." },
        ],
        reviews: [
          { text: "La comunidad Erasmus aquí es pequeña pero de las más unidas que he vivido. Acabamos siendo un grupo muy cercano en pocas semanas.", author: "Louis, Erasmus 2023", flag: "🇧🇪" },
          { text: "Metelkova tiene un ambiente alternativo y underground que no esperaba encontrar en una capital tan tranquila.", author: "Ana, Exchange 2024", flag: "🇪🇸" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.0,
        summary: "Eslovenos amables y discretos, con buen nivel de inglés entre los jóvenes y una actitud abierta hacia los estudiantes internacionales.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 7.5, desc: "Buen nivel entre jóvenes y en el entorno universitario, algo más limitado fuera de él." },
          { label: "Actitud local", score: 7.5, desc: "Eslovenos discretos pero amables, con una curiosidad genuina hacia los estudiantes internacionales." },
          { label: "Integración con locales", score: 6.5, desc: "El tamaño reducido de la ciudad facilita encontrarte con las mismas caras y acabar conociendo gente local." },
          { label: "Facilidad para hacer amigos", score: 7.0, desc: "Comunidad internacional acogedora, con locales requiriendo algo de iniciativa pero muy accesibles." },
        ],
        reviews: [
          { text: "Al ser una ciudad tan pequeña, acabé reconociendo caras por la calle en pocas semanas. Da una sensación de comunidad muy especial.", author: "Fien, Erasmus 2024", flag: "🇧🇪" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 7.0,
        summary: "Centro totalmente peatonal y muy caminable, con el lago Bled y los Alpes Julianos a menos de una hora para escapadas constantes.",
        color: "#F59E0B",
        subcategories: [
          { label: "Ciudad caminable", score: 9.0, desc: "El centro histórico está prácticamente libre de coches — caminar o ir en bici es la forma normal de moverse." },
          { label: "Transporte público", score: 6.5, desc: "LPP (bus) cubre el resto de la ciudad, aunque apenas se necesita dentro del centro." },
          { label: "Escapadas de fin de semana", score: 8.5, desc: "Lago Bled a 50 minutos, Bohinj y los Alpes Julianos a poco más — de las escapadas más accesibles de esta guía." },
          { label: "Conexiones internacionales", score: 6.0, desc: "El aeropuerto de Liubliana tiene menos rutas directas que otras capitales, aunque Venecia y Zagreb quedan cerca en coche." },
        ],
        reviews: [
          { text: "Ir al lago Bled un sábado por la mañana y volver a tiempo para cenar se convirtió en nuestro plan de cabecera.", author: "Iris, Exchange 2023", flag: "🇳🇱" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 9.0,
        summary: "La capital más verde de Europa Central, a escala humana y con una calidad de vida altísima para quien busca tranquilidad.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 9.5, desc: "Castillo con bosque propio dentro de la ciudad; lago Bled, Bohinj y los Alpes Julianos a un trayecto corto." },
          { label: "Clima", score: 7.0, desc: "Continental con veranos agradables e inviernos fríos pero manejables, sin extremos severos." },
          { label: "Calidad de vida", score: 9.0, desc: "Nombrada Capital Verde Europea, con más zonas verdes por habitante que casi cualquier otra capital del continente." },
          { label: "Autenticidad local", score: 8.5, desc: "Ciudad pequeña sin masificación turística, donde la vida local y la estudiantil se mezclan con naturalidad." },
          { label: "Estilo de vida", score: 9.0, desc: "Ritmo pausado, mucho contacto con la naturaleza y una ciudad completamente recorrible a pie o en bici." },
        ],
        reviews: [
          { text: "Es probablemente la ciudad más tranquila y verde en la que he vivido. El castillo con su bosque dentro de la ciudad es un lujo diario.", author: "Théo, Erasmus 2024", flag: "🇫🇷" },
          { text: "Poder ir en bici a todos lados y respirar aire limpio en una capital europea me hizo replantearme cómo debería ser vivir en una ciudad.", author: "Marija, Exchange 2023", flag: "🇧🇬" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 6.0,
        summary: "Mercado laboral pequeño pero con un sector tecnológico en crecimiento y buenas conexiones con la industria centroeuropea.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 6.0, desc: "Economía pequeña pero estable, con un sector IT y de startups en crecimiento constante." },
          { label: "Prácticas", score: 6.0, desc: "University of Ljubljana tiene conexiones crecientes con empresas tecnológicas locales y regionales." },
          { label: "Empresas relevantes", score: 6.0, desc: "Ecosistema tecnológico incipiente, con Liubliana consolidándose poco a poco como hub regional." },
          { label: "Oportunidades para estudiantes", score: 6.0, desc: "El tamaño reducido del mercado limita las oportunidades, pero también la competencia por ellas." },
        ],
        reviews: [
          { text: "El mercado laboral es pequeño, pero encontré unas prácticas cortas en una empresa tecnológica local gracias a la propia universidad.", author: "Karin, Erasmus 2024", flag: "🇩🇪" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 9.0,
        summary: "Una de las capitales más seguras y tranquilas de toda Europa, con un índice de criminalidad prácticamente residual.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 9.5, desc: "Eslovenia aparece consistentemente entre los países más seguros y pacíficos de Europa." },
          { label: "Seguridad nocturna", score: 8.5, desc: "Caminar de noche por el centro peatonal es completamente normal y seguro, sin excepción." },
          { label: "Ambiente de la ciudad", score: 9.0, desc: "Ciudad tranquila y ordenada, con un ritmo pausado que se nota en el ambiente general." },
        ],
        reviews: [
          { text: "Nunca sentí ni la más mínima preocupación por mi seguridad, ni de día ni de noche, en todo el semestre.", author: "Nora, Exchange 2023", flag: "🇩🇰" },
        ],
      },
    ],
  },
  tallin: {
    heroImg: "https://images.unsplash.com/photo-1690310457081-71c3fb276e10?w=1600&q=85",
    tagline: "Un casco medieval declarado Patrimonio de la Humanidad y la capital más digitalizada de Europa, cuna de Skype.",
    atmosphere: "Medieval por fuera, digital por dentro. Tallin huele a mazapán y vino especiado en la plaza del ayuntamiento, y suena al murmullo de estudiantes trabajando en portátiles en cafés con wifi gratuito garantizado por ley.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 6.5,
        summary: "Asequible, de las capitales más baratas de esta guía. Con 500–800€/mes se vive con comodidad.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 6.0, desc: "Habitaciones desde 300–450€. Kalamaja y Kristiine ofrecen los precios más razonables cerca del centro." },
          { label: "Comida y supermercados", score: 7.0, desc: "Rimi, Selver y Maxima cubren el día a día a precios bajos comparados con el resto de Europa Occidental." },
          { label: "Transporte", score: 8.5, desc: "Transporte público gratuito para residentes registrados en Tallin — una ventaja única en Europa." },
          { label: "Ocio y gastos diarios", score: 6.5, desc: "Cervezas y salidas asequibles; el mercado navideño de invierno es un plan gratuito y muy popular." },
        ],
        reviews: [
          { text: "El transporte público gratuito una vez te registras como residente es una pasada — nunca pagué un billete en todo el semestre.", author: "Filip, Erasmus 2024", flag: "🇵🇱" },
          { text: "Con 550€/mes vivía con comodidad, incluyendo salidas frecuentes con otros exchange students.", author: "Elena, Exchange 2023", flag: "🇷🇴" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 6.5,
        summary: "Mercado manejable, con una comunidad estudiantil internacional todavía pequeña que facilita la búsqueda.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 6.5, desc: "Oferta razonable para el tamaño de la comunidad Erasmus, sin la presión de otras capitales europeas." },
          { label: "Precio", score: 7.0, desc: "300–450€ habitación, de los más bajos de toda esta guía." },
          { label: "Facilidad de búsqueda", score: 6.0, desc: "Academic Hostel y plataformas locales como City24 son los canales principales de búsqueda." },
          { label: "Residencias universitarias", score: 6.5, desc: "TalTech y TLU ofrecen alojamiento gestionado (Academic Hostel) para exchange students, por orden de solicitud." },
        ],
        reviews: [
          { text: "Academic Hostel fue muy sencillo de gestionar y el precio, comparado con lo que pagaban mis amigos en otras capitales, era una ganga.", author: "Timo, Exchange 2024", flag: "🇩🇪" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 6.5,
        summary: "Comunidad Erasmus reducida pero muy unida, con el barrio de Kalamaja como epicentro social y creativo.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 6.5, desc: "ESN Tallinn organiza eventos regulares con una comunidad internacional pequeña pero muy cercana." },
          { label: "Ambiente internacional", score: 6.5, desc: "TalTech y TLU reciben estudiantes de más de 90 países, con buen ambiente internacional en el campus." },
          { label: "Fiesta y vida nocturna", score: 6.5, desc: "Casco antiguo y Telliskivi Creative City concentran bares y ambiente joven a precios razonables." },
          { label: "Eventos y actividades", score: 7.0, desc: "Mercados navideños, festivales de música y el distrito creativo de Telliskivi ofrecen planes constantes." },
        ],
        reviews: [
          { text: "Al ser pocos Erasmus acabamos siendo un grupo muy unido. Descubrir Telliskivi Creative City con ellos fue de lo mejor del semestre.", author: "Marta, Erasmus 2023", flag: "🇵🇱" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.0,
        summary: "Estonios reservados al principio pero fiables y directos, con un nivel de inglés muy alto entre los jóvenes.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 8.5, desc: "Nivel de inglés muy alto entre la población joven, especialmente en el entorno universitario y tecnológico." },
          { label: "Actitud local", score: 6.5, desc: "Reservados y de pocas palabras al principio, similar a otros países bálticos y nórdicos, pero fiables." },
          { label: "Integración con locales", score: 6.5, desc: "Los eventos de TalTech y TLU son la vía más rápida de conectar con estudiantes estonios." },
          { label: "Facilidad para hacer amigos", score: 7.0, desc: "Comunidad internacional pequeña pero cercana desde el primer día." },
        ],
        reviews: [
          { text: "Los estonios tardan en abrirse, pero cuando lo hacen la amistad es muy genuina y duradera.", author: "Hugo, Exchange 2024", flag: "🇫🇷" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 7.5,
        summary: "Transporte público gratuito para residentes y un ferry directo a Helsinki que convierte la escapada nórdica en algo cotidiano.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 8.5, desc: "Gratuito para residentes registrados — tram y bus cubren toda la ciudad sin coste añadido." },
          { label: "Ciudad caminable", score: 8.0, desc: "El casco antiguo y el centro son totalmente caminables, compactos y bien conectados." },
          { label: "Conexiones internacionales", score: 7.5, desc: "Ferry a Helsinki en 2 horas; vuelos baratos a los países bálticos y nórdicos." },
          { label: "Escapadas de fin de semana", score: 7.0, desc: "Helsinki, Riga y el resto de capitales bálticas a un trayecto corto en ferry o bus." },
        ],
        reviews: [
          { text: "Coger el ferry a Helsinki un sábado por la mañana y volver por la noche se convirtió en un plan recurrente y muy asequible.", author: "Ines, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.5,
        summary: "Casco medieval Patrimonio de la Humanidad conviviendo con una identidad digital y startup muy fuerte para su tamaño.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.0, desc: "Bosques y costa báltica a un trayecto corto; el parque Kadriorg ofrece naturaleza dentro de la propia ciudad." },
          { label: "Clima", score: 6.0, desc: "Báltico con inviernos fríos y oscuros y veranos suaves de días largos — extremos marcados por estación." },
          { label: "Calidad de vida", score: 8.0, desc: "Estonia lidera rankings de digitalización y trámites administrativos, lo que se traduce en una vida diaria muy sencilla." },
          { label: "Autenticidad local", score: 8.5, desc: "El casco medieval mejor conservado del norte de Europa convive de forma natural con startups y coworkings." },
          { label: "Estilo de vida", score: 7.5, desc: "Ritmo tranquilo, mentalidad digital y una identidad de país pequeño con ambición tecnológica grande." },
        ],
        reviews: [
          { text: "Vivir entre torres medievales y startups tecnológicas al mismo tiempo es una combinación que no había visto en ningún otro destino.", author: "Diego, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.0,
        summary: "Cuna de Skype y hogar de uno de los ecosistemas startup más densos de Europa en relación a su población.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 7.0, desc: "Estonia tiene más unicornios tecnológicos per cápita que casi cualquier otro país europeo." },
          { label: "Prácticas", score: 7.0, desc: "TalTech tiene fuertes conexiones con el sector IT; el programa e-Residency atrae startups internacionales." },
          { label: "Empresas relevantes", score: 7.5, desc: "Skype nació en Tallin, y empresas como Bolt y Wise mantienen fuerte presencia en la ciudad." },
          { label: "Oportunidades para estudiantes", score: 6.5, desc: "Ecosistema startup accesible para estudiantes de perfil técnico, con eventos y hackathons frecuentes." },
        ],
        reviews: [
          { text: "Asistí a un hackathon organizado por una startup local y acabé con contactos que me llevaron a una entrevista de prácticas.", author: "Léo, Internship 2023", flag: "🇫🇷" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.5,
        summary: "Una de las capitales más seguras y tranquilas del Báltico, con un índice de criminalidad muy bajo.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.5, desc: "Estonia se sitúa consistentemente entre los países más seguros y con menos corrupción de Europa." },
          { label: "Seguridad nocturna", score: 8.0, desc: "Volver de noche por el casco antiguo o zonas estudiantiles es tranquilo y seguro." },
          { label: "Ambiente de la ciudad", score: 8.5, desc: "Ciudad ordenada y con un fuerte sentido cívico, reflejo de su digitalización administrativa." },
        ],
        reviews: [
          { text: "Me sentí completamente segura durante todo el semestre, incluso paseando sola de noche por el casco antiguo.", author: "Alba, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
    ],
  },
  vilna: {
    heroImg: "https://images.unsplash.com/photo-1660562278746-72e961bb9644?w=1600&q=85",
    tagline: "Uno de los cascos barrocos mejor conservados de Europa, con Užupis, una 'república' bohemia dentro de la propia ciudad.",
    atmosphere: "Barroca, bohemia y sorprendentemente creativa. Vilna huele a café recién hecho en las cafeterías de Užupis y suena al eco de campanas de iglesias barrocas mezclado con música callejera improvisada.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 7.0,
        summary: "Asequible, de las capitales más baratas de esta guía. Con 500–750€/mes se vive con comodidad.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 6.5, desc: "Habitaciones desde 280–420€. Užupis y el centro son algo más caros que Žvėrynas." },
          { label: "Comida y supermercados", score: 7.5, desc: "Maxima, Rimi e IKI cubren el día a día a precios bajos; los mercados locales ofrecen productos frescos económicos." },
          { label: "Transporte", score: 7.5, desc: "Abono estudiantil de transporte muy económico para una ciudad de tamaño compacto." },
          { label: "Ocio y gastos diarios", score: 7.0, desc: "Cervezas y salidas asequibles; la escena de café de Užupis es un plan barato y constante." },
        ],
        reviews: [
          { text: "Con 500€ al mes vivía cómodamente, incluyendo salidas frecuentes con el grupo de Erasmus.", author: "Marco, Erasmus 2024", flag: "🇮🇹" },
          { text: "El presupuesto aquí da para mucho más que en el resto de Europa. Comer fuera casi a diario no era un problema.", author: "Sara, Exchange 2023", flag: "🇪🇸" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 7.0,
        summary: "Mercado manejable con una comunidad Erasmus en crecimiento constante, sin la presión de otras capitales.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 7.0, desc: "Oferta razonable para el tamaño de la comunidad internacional, especialmente fuera del corazón del casco antiguo." },
          { label: "Precio", score: 7.5, desc: "280–420€ habitación, de los más bajos de toda esta guía." },
          { label: "Facilidad de búsqueda", score: 6.5, desc: "Aruodas.lt y grupos de Facebook de exchange students son los canales principales de búsqueda." },
          { label: "Residencias universitarias", score: 6.5, desc: "VU y VILNIUS TECH ofrecen residencias con cupos para exchange students, gestionadas por orden de solicitud." },
        ],
        reviews: [
          { text: "Viví en una residencia de VILNIUS TECH y las cenas internacionales en los pasillos fueron de lo mejor del semestre.", author: "Andrej, Exchange 2023", flag: "🇸🇰" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 6.8,
        summary: "Ambiente bohemio y creativo, con Užupis como epicentro cultural de una comunidad Erasmus en crecimiento.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 7.0, desc: "ESN Vilnius organiza eventos regulares con una comunidad internacional cada vez más numerosa." },
          { label: "Ambiente internacional", score: 6.5, desc: "VU y VILNIUS TECH reciben estudiantes de decenas de países, con buen ambiente en ambos campus." },
          { label: "Fiesta y vida nocturna", score: 6.5, desc: "Casco antiguo y Užupis concentran bares con ambiente joven y precios muy razonables." },
          { label: "Eventos y actividades", score: 7.5, desc: "El día de la independencia de la 'República de Užupis' (1 de abril) es un evento único con mucho humor local." },
        ],
        reviews: [
          { text: "Celebrar el día de Užupis con toda su parodia de burocracia y humor fue una de las experiencias más divertidas y originales de mi Erasmus.", author: "Camille, Erasmus 2024", flag: "🇫🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 6.8,
        summary: "Lituanos cercanos y cálidos una vez conectas, con buen nivel de inglés entre la población joven y universitaria.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 8.0, desc: "Nivel de inglés alto entre jóvenes y en el entorno universitario, aunque menos extendido fuera de él." },
          { label: "Actitud local", score: 6.5, desc: "Reservados al principio, pero cálidos y hospitalarios una vez se rompe el hielo inicial." },
          { label: "Integración con locales", score: 6.5, desc: "Los eventos universitarios y las cenas de residencia son la vía más natural de conectar con lituanos." },
          { label: "Facilidad para hacer amigos", score: 7.0, desc: "Comunidad internacional cercana y en crecimiento, con buen ambiente desde el primer día." },
        ],
        reviews: [
          { text: "Los lituanos parecen fríos al principio, pero en cuanto muestras interés genuino por su cultura se abren por completo.", author: "Noah, Exchange 2024", flag: "🇳🇱" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 7.0,
        summary: "Ciudad compacta y caminable, con el castillo del lago de Trakai a una excursión de día muy accesible.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 7.0, desc: "Bus y trolebús cubren bien la ciudad, con buen descuento para estudiantes internacionales." },
          { label: "Ciudad caminable", score: 8.0, desc: "El casco antiguo barroco es totalmente caminable, compacto y muy bien conservado." },
          { label: "Escapadas de fin de semana", score: 8.0, desc: "El castillo de Trakai, sobre un lago, está a menos de una hora — una de las excursiones más icónicas de la región." },
          { label: "Conexiones internacionales", score: 6.5, desc: "Vuelos baratos a las capitales bálticas y nórdicas; menos rutas directas que otras capitales europeas." },
        ],
        reviews: [
          { text: "El castillo de Trakai, con el lago alrededor, fue una de las excursiones más bonitas que hice en todo mi Erasmus.", author: "Julia, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.8,
        summary: "Casco barroco Patrimonio de la Humanidad con alma alternativa y creativa, gracias en gran parte a Užupis.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.5, desc: "Bosques y lagos bálticos a un trayecto corto; el río Neris y sus orillas ofrecen naturaleza dentro de la propia ciudad." },
          { label: "Clima", score: 6.0, desc: "Continental húmedo con inviernos fríos y veranos suaves — clima báltico típico con estaciones marcadas." },
          { label: "Calidad de vida", score: 7.5, desc: "Ciudad tranquila y a escala humana, con un coste de vida que permite disfrutar sin grandes preocupaciones." },
          { label: "Autenticidad local", score: 8.5, desc: "Užupis, con su constitución propia llena de humor, es de las experiencias urbanas más originales de Europa." },
          { label: "Estilo de vida", score: 7.5, desc: "Ritmo tranquilo, mucha vida de café y una identidad creativa que se nota especialmente en el barrio bohemio." },
        ],
        reviews: [
          { text: "Vivir cerca de Užupis y su 'constitución' llena de humor (como el derecho a ser feliz o el derecho de un gato a no querer a su dueño) me cambió la forma de ver una ciudad.", author: "Elena, Erasmus 2024", flag: "🇷🇴" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 6.5,
        summary: "Mercado laboral modesto pero con un sector IT en crecimiento sostenido, apoyado por un ecosistema fintech activo.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 6.5, desc: "Vilna se ha consolidado como hub fintech regional, con Revolut y otras fintechs con presencia relevante." },
          { label: "Prácticas", score: 6.5, desc: "VILNIUS TECH tiene conexiones crecientes con el sector tecnológico local e internacional." },
          { label: "Empresas relevantes", score: 6.5, desc: "Sector fintech en expansión, con Vilna posicionándose como alternativa a otros hubs bálticos." },
          { label: "Oportunidades para estudiantes", score: 6.5, desc: "Ecosistema startup accesible, aunque con menos densidad que Tallin o Riga." },
        ],
        reviews: [
          { text: "Hice unas prácticas cortas en una fintech local gracias a un contacto de la universidad — el sector está creciendo rápido.", author: "Tobias, Internship 2023", flag: "🇩🇪" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.5,
        summary: "Una de las capitales más seguras y tranquilas del Báltico, con un índice de criminalidad bajo.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.5, desc: "Lituania se sitúa entre los países más seguros de Europa del Este, con criminalidad baja." },
          { label: "Seguridad nocturna", score: 8.0, desc: "Volver de noche por el casco antiguo o Užupis es tranquilo y seguro." },
          { label: "Ambiente de la ciudad", score: 8.5, desc: "Ciudad ordenada y de ritmo pausado, con un ambiente generalmente relajado." },
        ],
        reviews: [
          { text: "Me sentí segura en todo momento, incluso volviendo sola de noche desde el centro a mi residencia.", author: "Beatriz, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
    ],
  },
  riga: {
    heroImg: "https://images.unsplash.com/photo-1683730796330-06e60e3438d8?w=1600&q=85",
    tagline: "La mayor colección de arquitectura Art Nouveau de Europa, un casco medieval Patrimonio de la Humanidad y la playa báltica a 30 minutos.",
    atmosphere: "Elegante y báltica. Riga huele a pan de centeno recién horneado en el Mercado Central y suena al eco de fachadas Art Nouveau que cuentan la historia de una ciudad que fue, durante un tiempo, la capital cultural del Báltico.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 7.0,
        summary: "Asequible, de las capitales más baratas de esta guía. Con 500–750€/mes se vive con comodidad.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 6.5, desc: "Habitaciones desde 280–420€. El casco antiguo y el barrio Art Nouveau son algo más caros que Āgenskalns." },
          { label: "Comida y supermercados", score: 7.5, desc: "Rimi y Maxima cubren el día a día; el Mercado Central, en antiguos hangares de zepelines, ofrece producto fresco muy barato." },
          { label: "Transporte", score: 7.0, desc: "Abono estudiantil de tranvía y bus muy asequible para una ciudad de tamaño manejable." },
          { label: "Ocio y gastos diarios", score: 7.0, desc: "Cervezas y salidas económicas; el tren a Jurmala (playa báltica) cuesta apenas unos euros." },
        ],
        reviews: [
          { text: "Con 550€ al mes vivía cómodamente, incluyendo escapadas frecuentes a Jurmala en verano.", author: "Karolina, Erasmus 2024", flag: "🇵🇱" },
          { text: "El Mercado Central es una pasada — producto fresco baratísimo en unos hangares históricos enormes.", author: "Tobias, Exchange 2023", flag: "🇩🇪" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 7.0,
        summary: "Mercado manejable, sin la presión de otras capitales europeas, con una comunidad Erasmus todavía pequeña.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 7.0, desc: "Oferta razonable para el tamaño de la comunidad internacional, especialmente fuera del corazón del Art Nouveau." },
          { label: "Precio", score: 7.0, desc: "280–420€ habitación, de los más bajos de toda esta guía." },
          { label: "Facilidad de búsqueda", score: 6.5, desc: "City24.lv y grupos de Facebook de exchange students son los canales principales." },
          { label: "Residencias universitarias", score: 6.5, desc: "LU y RTU ofrecen residencias con cupos para exchange students, gestionadas por orden de solicitud." },
        ],
        reviews: [
          { text: "Encontré piso en Āgenskalns sin demasiado esfuerzo y a un precio muy razonable para estar a 15 minutos del centro.", author: "Louis, Exchange 2024", flag: "🇫🇷" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 6.5,
        summary: "Tranquila pero con una comunidad Erasmus en crecimiento constante, con eventos regulares organizados por ESN.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 6.5, desc: "ESN Riga organiza excursiones a Jurmala y eventos culturales con una comunidad internacional creciente." },
          { label: "Ambiente internacional", score: 6.5, desc: "LU y RTU reciben estudiantes de decenas de países, con buen ambiente en ambos campus." },
          { label: "Fiesta y vida nocturna", score: 6.5, desc: "Casco antiguo concentra bares con ambiente estudiantil a precios muy razonables." },
          { label: "Eventos y actividades", score: 7.0, desc: "Excursiones a Jurmala en verano y mercados navideños en invierno son los planes más populares del semestre." },
        ],
        reviews: [
          { text: "Las excursiones de ESN a Jurmala los fines de semana de verano fueron de lo mejor de mi Erasmus — playa báltica a 30 minutos del centro.", author: "Elena, Erasmus 2023", flag: "🇮🇹" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 6.8,
        summary: "Letones reservados al principio pero fiables, con buen nivel de inglés entre la población joven y universitaria.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 8.0, desc: "Nivel de inglés alto entre jóvenes y en el entorno universitario, similar al resto de países bálticos." },
          { label: "Actitud local", score: 6.5, desc: "Reservados y de pocas palabras al principio, pero fiables y honestos una vez conectas." },
          { label: "Integración con locales", score: 6.5, desc: "Los eventos de LU y RTU son la vía más rápida de conectar con estudiantes letones." },
          { label: "Facilidad para hacer amigos", score: 7.0, desc: "Comunidad internacional cercana desde el primer día, con locales requiriendo algo más de tiempo." },
        ],
        reviews: [
          { text: "Los letones tardan en abrirse, similar a estonios y lituanos, pero la amistad una vez hecha es muy genuina.", author: "Mateus, Exchange 2024", flag: "🇵🇹" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 7.0,
        summary: "Centro caminable y muy bien conectado con Jurmala, la playa báltica de arena fina a solo 30 minutos en tren.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 7.0, desc: "Tranvía, trolebús y bus cubren bien la ciudad, con buen descuento para estudiantes internacionales." },
          { label: "Ciudad caminable", score: 8.0, desc: "El casco antiguo y el barrio Art Nouveau son totalmente caminables y muy compactos." },
          { label: "Jurmala a un tren", score: 8.5, desc: "Tren directo a Jurmala en 30 minutos — playa báltica de arena fina, muy popular en verano." },
          { label: "Conexiones internacionales", score: 6.5, desc: "Vuelos baratos a las capitales bálticas y nórdicas; aeropuerto con buena conectividad regional." },
        ],
        reviews: [
          { text: "Ir a la playa de Jurmala en tren después de clase se convirtió en un plan de verano recurrente y muy fácil.", author: "Nadia, Erasmus 2024", flag: "🇳🇱" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.5,
        summary: "La mayor colección de arquitectura Art Nouveau de Europa conviviendo con un casco medieval Patrimonio de la Humanidad.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.0, desc: "Jurmala y sus playas bálticas a 30 minutos; bosques y parques dentro de la propia ciudad." },
          { label: "Clima", score: 6.0, desc: "Continental húmedo con inviernos fríos y veranos suaves — clima báltico típico marcado por estaciones." },
          { label: "Calidad de vida", score: 7.5, desc: "Ciudad tranquila y elegante, con un coste de vida que permite disfrutar sin grandes preocupaciones económicas." },
          { label: "Autenticidad local", score: 8.5, desc: "El barrio de Alberta iela concentra la mayor densidad de arquitectura Art Nouveau de toda Europa." },
          { label: "Estilo de vida", score: 7.0, desc: "Ritmo tranquilo, mucha vida de café y una identidad báltica elegante que se nota en cada fachada." },
        ],
        reviews: [
          { text: "Pasear por Alberta iela y ver esas fachadas Art Nouveau cada día de camino a clase fue un lujo que no esperaba de un Erasmus.", author: "Giulia, Erasmus 2024", flag: "🇮🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 6.5,
        summary: "Mercado modesto pero con un sector IT y logístico en crecimiento sostenido, apoyado por la posición estratégica báltica de Riga.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 6.5, desc: "Economía centrada en logística, transporte y un sector IT en expansión constante." },
          { label: "Prácticas", score: 6.5, desc: "RTU tiene conexiones crecientes con el sector tecnológico e industrial báltico." },
          { label: "Empresas relevantes", score: 6.5, desc: "Riga se posiciona como hub logístico báltico, con un ecosistema IT en crecimiento sostenido." },
          { label: "Oportunidades para estudiantes", score: 6.5, desc: "Mercado accesible para perfiles técnicos, aunque con menos densidad startup que Tallin." },
        ],
        reviews: [
          { text: "Hice unas prácticas cortas en una empresa logística local gracias a un contacto de la universidad — el sector está en pleno crecimiento.", author: "Emil, Internship 2023", flag: "🇸🇪" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.0,
        summary: "Segura y tranquila, en línea con el resto de capitales bálticas, con un índice de criminalidad bajo.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.0, desc: "Letonia se sitúa entre los países más seguros de Europa del Este, con criminalidad baja." },
          { label: "Seguridad nocturna", score: 7.5, desc: "Volver de noche por el casco antiguo o el barrio Art Nouveau es generalmente tranquilo y seguro." },
          { label: "Ambiente de la ciudad", score: 8.0, desc: "Ciudad ordenada y elegante, con un ambiente generalmente relajado y cívico." },
        ],
        reviews: [
          { text: "Me sentí segura durante todo el semestre, incluso paseando sola de noche por el casco antiguo.", author: "Marta, Erasmus 2023", flag: "🇵🇱" },
        ],
      },
    ],
  },
  bratislava: {
    heroImg: "https://images.unsplash.com/photo-1665585696602-0259a0d9c32b?w=1600&q=85",
    tagline: "La única capital del mundo que hace frontera con otras dos capitales — Viena a 1 hora, Budapest a 2,5. La base perfecta para explorar Centroeuropa.",
    atmosphere: "Compacta, tranquila y sorprendentemente bien situada. Bratislava huele a pretzel recién horneado en el casco antiguo y suena al murmullo del Danubio bajo el castillo, con Austria visible al otro lado del río.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 7.0,
        summary: "Asequible, de las capitales más baratas de Centroeuropa. Con 500–750€/mes se vive con comodidad.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 6.5, desc: "Habitaciones desde 300–450€. Staré Mesto es algo más caro que Petržalka o Ružinov." },
          { label: "Comida y supermercados", score: 7.5, desc: "Lidl, Kaufland y Billa cubren el día a día a precios bajos comparados con Viena o Múnich." },
          { label: "Transporte", score: 7.5, desc: "Abono estudiantil de tranvía y bus muy económico para una ciudad de tamaño compacto." },
          { label: "Ocio y gastos diarios", score: 7.0, desc: "Cervezas y salidas asequibles; escapadas a Viena son el único gasto extra que sube el presupuesto." },
        ],
        reviews: [
          { text: "Con 550€ al mes vivía cómodamente, incluyendo alguna escapada mensual a Viena en tren.", author: "Filip, Erasmus 2024", flag: "🇵🇱" },
          { text: "El presupuesto aquí rinde mucho más que en Viena, a solo una hora de distancia. La combinación es perfecta.", author: "Elena, Exchange 2023", flag: "🇷🇴" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 6.8,
        summary: "Mercado manejable, con una comunidad Erasmus grande gracias al tamaño reducido de Eslovaquia y su ubicación estratégica.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 6.5, desc: "Oferta razonable para el tamaño de la comunidad internacional, especialmente en Petržalka y Ružinov." },
          { label: "Precio", score: 7.0, desc: "300–450€ habitación, de los más bajos de Centroeuropa." },
          { label: "Facilidad de búsqueda", score: 6.5, desc: "Nehnutelnosti.sk y grupos de Facebook de exchange students son los canales principales." },
          { label: "Residencias universitarias", score: 6.5, desc: "UK y STU ofrecen residencias con cupos para exchange students, gestionadas por orden de solicitud." },
        ],
        reviews: [
          { text: "Encontré piso en Ružinov sin demasiado esfuerzo y a un precio muy razonable para estar a 15 minutos del centro en tranvía.", author: "Andrej, Exchange 2024", flag: "🇸🇰" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 7.5,
        summary: "Compacta pero animada, con miles de Erasmus repartidos por toda Eslovaquia y una comunidad muy activa en Bratislava.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 8.0, desc: "ESN SK coordina 10 secciones por todo el país y organiza viajes y eventos constantes para casi 2.000 Erasmus." },
          { label: "Ambiente internacional", score: 7.0, desc: "UK y STU reciben una comunidad internacional creciente, con buen ambiente en ambos campus." },
          { label: "Fiesta y vida nocturna", score: 7.5, desc: "El casco antiguo, tan compacto, concentra toda la vida nocturna a poca distancia caminando." },
          { label: "Eventos y actividades", score: 7.5, desc: "Escapadas organizadas a Viena, Budapest y los castillos eslovacos son planes constantes de fin de semana." },
        ],
        reviews: [
          { text: "La comunidad Erasmus aquí es enorme para lo pequeña que es la ciudad. Nunca faltó plan ni un solo fin de semana.", author: "Sofia, Erasmus 2023", flag: "🇬🇷" },
          { text: "El casco antiguo es tan pequeño que te cruzas con la misma gente de Erasmus constantemente — se genera una comunidad muy unida rápido.", author: "Lucas, Exchange 2024", flag: "🇫🇷" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 7.0,
        summary: "Eslovacos cercanos y hospitalarios, con buen nivel de inglés entre la población joven y universitaria.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 7.5, desc: "Nivel de inglés bueno entre jóvenes y en el entorno universitario, algo menor fuera de él." },
          { label: "Actitud local", score: 7.5, desc: "Los eslovacos tienen fama de cercanos y hospitalarios, especialmente en un país pequeño y acogedor." },
          { label: "Integración con locales", score: 6.5, desc: "El curso gratuito de eslovaco para Erasmus+ es una buena vía de integración con locales." },
          { label: "Facilidad para hacer amigos", score: 7.5, desc: "El sistema de buddy de ESN facilita mucho el contacto inicial con estudiantes locales." },
        ],
        reviews: [
          { text: "Mi buddy de ESN me ayudó desde el primer día con todo, desde el alojamiento hasta hacerme sentir parte de la ciudad enseguida.", author: "Marco, Erasmus 2024", flag: "🇮🇹" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 8.5,
        summary: "La mejor base de toda esta guía para explorar Centroeuropa: Viena a 1 hora, Budapest a 2,5, Praga a 4.",
        color: "#F59E0B",
        subcategories: [
          { label: "Ciudad caminable", score: 9.0, desc: "El casco antiguo se recorre entero caminando en 20 minutos — de las ciudades más compactas de esta guía." },
          { label: "Transporte público", score: 7.5, desc: "Tranvía y bus cubren bien el resto de la ciudad, con buen descuento estudiantil." },
          { label: "Viena a 1 hora", score: 9.5, desc: "Tren directo a Viena en apenas 1 hora — muchos Erasmus hacen escapadas de un día entero sin planificación previa." },
          { label: "Conexiones regionales", score: 8.5, desc: "Budapest a 2,5 horas y Praga a 4 — base perfecta para descubrir Centroeuropa entera durante el semestre." },
        ],
        reviews: [
          { text: "Iba a Viena casi cada dos semanas sin pensarlo demasiado — el tren es rápido, barato y directo desde el centro.", author: "Ben, Exchange 2023", flag: "🇩🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.5,
        summary: "Ciudad pequeña a orillas del Danubio, con un castillo desde el que se ven tres países a la vez y una vida tranquila pero bien conectada.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 7.0, desc: "El Danubio atraviesa la ciudad; los Cárpatos Pequeños ofrecen senderismo y viñedos a un trayecto corto." },
          { label: "Clima", score: 6.5, desc: "Continental con veranos cálidos e inviernos fríos con nieve ocasional — clima centroeuropeo típico." },
          { label: "Calidad de vida", score: 7.5, desc: "Ciudad tranquila y a escala humana, con un coste de vida que permite disfrutar sin grandes preocupaciones." },
          { label: "Autenticidad local", score: 7.5, desc: "Menos turística que Praga o Viena, con un ambiente más local y auténtico en el día a día." },
          { label: "Estilo de vida", score: 7.5, desc: "Ritmo tranquilo, con la posibilidad constante de escapar a otras capitales sin apenas planificación." },
        ],
        reviews: [
          { text: "Desde el castillo se ven Austria y, en días claros, hasta Hungría. Es una sensación única tener tres países a la vista al mismo tiempo.", author: "Chiara, Erasmus 2024", flag: "🇮🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.0,
        summary: "Mercado modesto pero con sede de bancos internacionales y empresas regionales que ofrecen algunas oportunidades a estudiantes.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 7.0, desc: "Sede de importantes bancos internacionales y un sector automotriz fuerte en el resto de Eslovaquia." },
          { label: "Prácticas", score: 6.5, desc: "STU tiene conexiones con el sector industrial y tecnológico eslovaco." },
          { label: "Empresas relevantes", score: 7.0, desc: "Presencia de multinacionales atraídas por costes laborales competitivos y proximidad a Viena." },
          { label: "Oportunidades para estudiantes", score: 7.0, desc: "Mercado accesible para perfiles multilingües, especialmente en servicios compartidos de multinacionales." },
        ],
        reviews: [
          { text: "Conseguí unas prácticas en un centro de servicios de una multinacional gracias a mi perfil multilingüe. Aquí valoran mucho hablar varios idiomas.", author: "Pablo, Internship 2023", flag: "🇪🇸" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 8.0,
        summary: "Capital tranquila y segura, de las más manejables de esta guía por su tamaño reducido y ambiente relajado.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.0, desc: "Eslovaquia se sitúa entre los países más seguros de Centroeuropa, con criminalidad baja." },
          { label: "Seguridad nocturna", score: 7.5, desc: "Volver de noche por el casco antiguo, tan compacto, es tranquilo y seguro." },
          { label: "Ambiente de la ciudad", score: 8.0, desc: "Ciudad pequeña y ordenada, con un ambiente generalmente relajado y cívico." },
        ],
        reviews: [
          { text: "Me sentí segura en todo momento, ayudada también por lo pequeño y manejable que es el centro de la ciudad.", author: "Ana, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
    ],
  },
  bucarest: {
    heroImg: "https://images.unsplash.com/photo-1636196435721-e937d2ad9746?w=1600&q=85",
    tagline: "El 'Pequeño París' del Este, con su propio Arco del Triunfo, arquitectura Belle Époque y el edificio administrativo más pesado del mundo.",
    atmosphere: "Contrastada y llena de energía. Bucarest huele a mici (albóndigas a la parrilla) en cualquier terraza del Centro Vechi y suena a la mezcla perfecta entre elegancia Belle Époque y el eco monumental del comunismo.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 8.5,
        summary: "La capital más barata de toda esta guía. Con 400–650€/mes se vive muy bien, incluyendo salidas frecuentes.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 7.5, desc: "Habitaciones desde 200–350€, de los precios más bajos de toda Europa para una capital." },
          { label: "Comida y supermercados", score: 8.5, desc: "Kaufland, Mega Image y Lidl cubren el día a día muy barato; comer fuera también es muy asequible." },
          { label: "Transporte", score: 8.0, desc: "Abono de metro y bus estudiantil muy económico para una ciudad grande y extensa." },
          { label: "Ocio y gastos diarios", score: 8.5, desc: "Cervezas a 2-3€, entrada a clubs muy barata. La vida nocturna del Centro Vechi es asequible incluso saliendo a menudo." },
        ],
        reviews: [
          { text: "Con 450€ al mes vivía genial, salía todos los findes y todavía ahorraba para viajar por Rumanía.", author: "Diego, Erasmus 2024", flag: "🇦🇷" },
          { text: "El presupuesto aquí rinde más que en cualquier otro destino que consideré. Se puede vivir muy bien con poco.", author: "Sara, Exchange 2023", flag: "🇮🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 7.5,
        summary: "Mercado amplio y asequible, sin apenas presión de demanda comparado con otras capitales europeas.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 8.0, desc: "Oferta amplia en toda la ciudad, sin la escasez que sufren otras capitales de esta guía." },
          { label: "Precio", score: 8.0, desc: "200–350€ habitación, de los más bajos de toda Europa para una capital de este tamaño." },
          { label: "Facilidad de búsqueda", score: 7.0, desc: "Storia.ro y grupos de Facebook de exchange students son los canales principales de búsqueda." },
          { label: "Residencias universitarias", score: 6.5, desc: "UB y UPB ofrecen residencias con cupos para exchange students, gestionadas por orden de solicitud." },
        ],
        reviews: [
          { text: "Encontí piso en Cotroceni en pocos días y a un precio que en cualquier capital occidental habría sido impensable.", author: "Lucas, Exchange 2024", flag: "🇫🇷" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 8.0,
        summary: "Vida nocturna intensa en el Centro Vechi, considerada de las mejores de Europa del Este, con precios muy asequibles.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 7.5, desc: "UB y UPB reciben una comunidad internacional creciente, con ESN organizando eventos regulares." },
          { label: "Ambiente internacional", score: 7.0, desc: "Ambiente internacional en aumento, especialmente en UPB gracias a su perfil técnico e ingenieril." },
          { label: "Fiesta y vida nocturna", score: 9.0, desc: "El Centro Vechi concentra decenas de bares y clubs con ambiente hasta la madrugada a precios muy bajos." },
          { label: "Eventos y actividades", score: 8.0, desc: "Festivales de música, rooftops en verano y una escena cultural en pleno crecimiento." },
        ],
        reviews: [
          { text: "La vida nocturna del Centro Vechi no tiene nada que envidiar a otras capitales europeas, y el precio es una fracción de lo que pagaba en mi país.", author: "Théo, Erasmus 2023", flag: "🇫🇷" },
          { text: "Nunca esperé que Bucarest tuviera tanta energía nocturna. Cada noche de la semana hay algo diferente que hacer en el Centro Vechi.", author: "Marta, Exchange 2024", flag: "🇵🇱" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 6.5,
        summary: "Rumanos hospitalarios y cercanos, con un nivel de inglés que varía notablemente según la generación y la zona de la ciudad.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 7.0, desc: "Buen nivel entre jóvenes y en el entorno universitario, más limitado fuera de ese círculo." },
          { label: "Actitud local", score: 8.0, desc: "Los rumanos tienen fama merecida de hospitalarios y cálidos con los estudiantes internacionales." },
          { label: "Integración con locales", score: 6.0, desc: "El idioma latino facilita algo la comprensión para hispanohablantes e italianos." },
          { label: "Facilidad para hacer amigos", score: 7.0, desc: "Comunidad internacional accesible desde el primer día, con locales muy dispuestos a ayudar." },
        ],
        reviews: [
          { text: "Al ser español, entender rumano básico fue sorprendentemente más fácil de lo esperado por la raíz latina común.", author: "Pablo, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 6.5,
        summary: "El metro es rápido y barato, imprescindible para moverse por una ciudad grande y extensa como Bucarest.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 7.5, desc: "Metro rápido y muy económico; bus y tranvía completan el resto de la red." },
          { label: "Ciudad caminable", score: 5.5, desc: "Ciudad extensa donde el metro es casi imprescindible para moverse entre zonas alejadas." },
          { label: "Conexiones nacionales", score: 6.5, desc: "Trenes y buses conectan con el resto de Rumanía, incluida Transilvania y sus castillos." },
          { label: "Conexiones internacionales", score: 6.0, desc: "Vuelos baratos a otras capitales del Este; menos rutas directas que capitales occidentales." },
        ],
        reviews: [
          { text: "El metro es rapidísimo y baratísimo. Sin él, moverse por una ciudad tan extensa habría sido mucho más complicado.", author: "Nadia, Exchange 2023", flag: "🇳🇱" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 6.8,
        summary: "El 'Pequeño París' con contrastes constantes entre arquitectura Belle Époque y monumentalismo comunista.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 6.5, desc: "El parque Herăstrău, junto a un lago, ofrece un respiro verde dentro de la propia ciudad." },
          { label: "Clima", score: 5.5, desc: "Continental extremo, con veranos calurosos e inviernos fríos con nieve frecuente." },
          { label: "Calidad de vida", score: 7.0, desc: "El coste de vida bajísimo permite disfrutar de la ciudad sin apenas restricciones económicas." },
          { label: "Autenticidad local", score: 7.5, desc: "El contraste entre el Arco del Triunfo, la arquitectura Belle Époque y el Palacio del Parlamento define el carácter único de la ciudad." },
          { label: "Estilo de vida", score: 7.0, desc: "Ritmo intenso, con una vida social muy activa y un coste que permite disfrutar sin grandes preocupaciones." },
        ],
        reviews: [
          { text: "Ver el Arco del Triunfo y minutos después el gigantesco Palacio del Parlamento resume perfectamente los contrastes de esta ciudad.", author: "Giulia, Erasmus 2024", flag: "🇮🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 7.0,
        summary: "Fuerte en IT y outsourcing, con uno de los sectores tecnológicos más grandes y dinámicos de Europa del Este.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 7.5, desc: "Rumanía es uno de los principales hubs de IT y outsourcing tecnológico de Europa del Este." },
          { label: "Prácticas", score: 7.0, desc: "UPB tiene fuertes conexiones con el sector tecnológico, con muchas multinacionales presentes en Bucarest." },
          { label: "Empresas relevantes", score: 7.0, desc: "Presencia de grandes tecnológicas internacionales atraídas por talento técnico y costes competitivos." },
          { label: "Oportunidades para estudiantes", score: 6.5, desc: "Mercado accesible para perfiles técnicos, especialmente en desarrollo de software." },
        ],
        reviews: [
          { text: "Hice unas prácticas en una empresa de software gracias a un contacto de UPB. El sector tech aquí es mucho más grande de lo que esperaba.", author: "Rodrigo, Internship 2024", flag: "🇧🇷" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 6.5,
        summary: "Segura en general, aunque requiere algo más de precaución que otras capitales de esta guía, especialmente en algunas zonas nocturnas.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 6.5, desc: "Segura para estándares de gran capital, con las precauciones normales de cualquier ciudad extensa." },
          { label: "Seguridad nocturna", score: 6.0, desc: "El Centro Vechi es seguro y muy transitado; conviene algo más de atención en zonas periféricas de noche." },
          { label: "Ambiente de la ciudad", score: 7.0, desc: "Ambiente generalmente cálido y acogedor, con la vida callejera activa hasta tarde." },
        ],
        reviews: [
          { text: "Me sentí segura la mayor parte del tiempo, con la precaución normal de cualquier gran ciudad al volver de noche.", author: "Valentina, Erasmus 2023", flag: "🇪🇸" },
        ],
      },
    ],
  },
  sofia: {
    heroImg: "https://images.unsplash.com/photo-1753529179550-c6aff1b76e6e?w=1600&q=85",
    tagline: "Una de las capitales más antiguas de Europa, con más de 7.000 años de historia y pistas de esquí a las puertas de la ciudad.",
    atmosphere: "Milenaria y sorprendentemente montañosa. Sofía huele a banitsa recién horneada en cualquier panadería y suena al eco ortodoxo de la Catedral Alexander Nevsky, con el monte Vitosha siempre presente al fondo.",
    scores: [
      // 1. COSTE DE VIDA
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💰",
        score: 8.7,
        summary: "De las capitales más baratas de toda esta guía. Con 400–600€/mes se vive muy bien.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Alojamiento", score: 7.5, desc: "Habitaciones desde 180–320€, de los precios más bajos de toda Europa para una capital." },
          { label: "Comida y supermercados", score: 8.5, desc: "Kaufland, Lidl y Billa cubren el día a día muy barato; comer fuera también es muy asequible." },
          { label: "Transporte", score: 8.5, desc: "Abono de metro y bus estudiantil muy económico, con acceso directo a las pistas de Vitosha." },
          { label: "Ocio y gastos diarios", score: 8.5, desc: "Cervezas a 2€, entrada a clubs muy barata. El forfait de esquí en Vitosha es de los más baratos de Europa." },
        ],
        reviews: [
          { text: "Con 400€ al mes vivía muy bien, incluyendo esquiar varias veces al mes en Vitosha sin gastar apenas.", author: "Karolina, Erasmus 2024", flag: "🇵🇱" },
          { text: "El presupuesto aquí es el más generoso de todos los destinos que consideré para mi Erasmus.", author: "Marco, Exchange 2023", flag: "🇮🇹" },
        ],
      },
      // 2. ALOJAMIENTO
      {
        id: "alojamiento",
        label: "Alojamiento",
        icon: "🏠",
        score: 7.5,
        summary: "Mercado amplio y muy asequible, sin apenas presión de demanda comparado con otras capitales europeas.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 8.0, desc: "Oferta amplia en toda la ciudad, especialmente en Studentski grad, la 'ciudad estudiantil'." },
          { label: "Precio", score: 8.0, desc: "180–320€ habitación, de los más bajos de toda Europa para una capital." },
          { label: "Facilidad de búsqueda", score: 7.0, desc: "Imot.bg y grupos de Facebook de exchange students son los canales principales." },
          { label: "Residencias universitarias", score: 6.5, desc: "Sofia University y TU-Sofia ofrecen residencias en Studentski grad, con cupos limitados para exchange students." },
        ],
        reviews: [
          { text: "Encontré piso en Lozenets sin apenas esfuerzo y a un precio que en cualquier otra capital habría sido impensable.", author: "Louis, Exchange 2024", flag: "🇫🇷" },
        ],
      },
      // 3. VIDA SOCIAL Y AMBIENTE
      {
        id: "vida_social",
        label: "Vida social y ambiente",
        icon: "🎉",
        score: 6.5,
        summary: "Comunidad Erasmus pequeña pero muy cercana, con la montaña de Vitosha como plan constante además del ambiente de la ciudad.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Comunidad Erasmus", score: 6.5, desc: "ESN Sofia University organiza eventos y excursiones para una comunidad internacional de más de 20 nacionalidades por semestre." },
          { label: "Ambiente internacional", score: 6.5, desc: "Sofia University y TU-Sofia reciben estudiantes de varios continentes cada semestre." },
          { label: "Fiesta y vida nocturna", score: 6.5, desc: "El centro concentra bares y clubs con ambiente estudiantil a precios muy bajos." },
          { label: "Eventos y actividades", score: 7.0, desc: "Excursiones a Vitosha para esquiar o hacer senderismo son de los planes más populares del semestre." },
        ],
        reviews: [
          { text: "Al ser pocos Erasmus acabamos siendo un grupo muy unido. Ir a esquiar juntos a Vitosha varias veces al mes fue de lo mejor del semestre.", author: "Elena, Erasmus 2023", flag: "🇷🇴" },
        ],
      },
      // 4. INTEGRACIÓN INTERNACIONAL
      {
        id: "integracion",
        label: "Integración internacional",
        icon: "🌍",
        score: 6.5,
        summary: "Búlgaros hospitalarios y cercanos, con un nivel de inglés que varía notablemente según la generación.",
        color: "#14B8A6",
        subcategories: [
          { label: "Nivel de inglés", score: 6.5, desc: "Buen nivel entre jóvenes y en el entorno universitario, más limitado fuera de ese círculo." },
          { label: "Actitud local", score: 7.5, desc: "Los búlgaros tienen fama de hospitalarios y cálidos con los estudiantes internacionales, aunque algo reservados al inicio." },
          { label: "Integración con locales", score: 6.0, desc: "El curso gratuito de búlgaro de Sofia University es una buena vía de integración con locales." },
          { label: "Facilidad para hacer amigos", score: 7.0, desc: "Comunidad internacional accesible desde el primer día, con locales dispuestos a ayudar." },
        ],
        reviews: [
          { text: "Los búlgaros son mucho más cálidos de lo que esperaba. En cuanto mostré interés por su cultura, la conexión fue inmediata.", author: "Julia, Erasmus 2024", flag: "🇩🇪" },
        ],
      },
      // 5. UBICACIÓN Y MOVILIDAD
      {
        id: "movilidad",
        label: "Ubicación y movilidad",
        icon: "🚆",
        score: 7.0,
        summary: "El monte Vitosha está a solo 30 minutos en transporte público — una de las pocas capitales del mundo donde se puede esquiar el mismo día de clase.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 7.5, desc: "Metro, tram y bus cubren bien la ciudad, con buen descuento estudiantil." },
          { label: "Ciudad caminable", score: 7.0, desc: "El centro histórico es compacto y caminable, con Vitosha visible desde casi cualquier punto." },
          { label: "Vitosha a 30 minutos", score: 9.0, desc: "Transporte público directo a las pistas de esquí de Vitosha — único caso de capital europea con esta accesibilidad." },
          { label: "Conexiones internacionales", score: 6.0, desc: "Vuelos baratos a otras capitales del Este; menos rutas directas que capitales occidentales." },
        ],
        reviews: [
          { text: "Esquié por la mañana en Vitosha y estaba en clase por la tarde el mismo día. No conozco otra capital del mundo donde esto sea posible.", author: "Anke, Exchange 2023", flag: "🇩🇪" },
        ],
      },
      // 6. ESTILO DE VIDA Y ENTORNO
      {
        id: "estilo_vida",
        label: "Estilo de vida y entorno",
        icon: "🏔️",
        score: 7.5,
        summary: "Más de 7.000 años de historia continua conviviendo con una montaña que ofrece esquí, senderismo y naturaleza a las puertas de la ciudad.",
        color: "#14B8A6",
        subcategories: [
          { label: "Naturaleza", score: 9.0, desc: "El monte Vitosha, con esquí en invierno y senderismo en verano, es un parque natural a 30 minutos del centro." },
          { label: "Clima", score: 6.0, desc: "Continental con veranos calurosos e inviernos fríos con nieve garantizada en la montaña." },
          { label: "Calidad de vida", score: 7.5, desc: "El coste de vida bajísimo permite disfrutar de la ciudad y la montaña sin apenas restricciones." },
          { label: "Autenticidad local", score: 8.5, desc: "Más de 7.000 años de historia continua, entre las capitales más antiguas de Europa, sin artificio turístico." },
          { label: "Estilo de vida", score: 7.5, desc: "Ritmo tranquilo, con la montaña siempre presente como parte del día a día, incluso entre semana." },
        ],
        reviews: [
          { text: "Vivir en una capital con 7.000 años de historia y tener una estación de esquí a 30 minutos es una combinación que no imaginé posible.", author: "Chiara, Erasmus 2024", flag: "🇮🇹" },
        ],
      },
      // 7. EMPLEO Y OPORTUNIDADES
      {
        id: "empleo",
        label: "Empleo y oportunidades",
        icon: "💼",
        score: 6.5,
        summary: "Sector IT en crecimiento constante, con costes laborales muy competitivos que atraen a empresas tecnológicas internacionales.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Mercado laboral", score: 6.5, desc: "Bulgaria se ha consolidado como destino de outsourcing tecnológico, con Sofía como epicentro del sector." },
          { label: "Prácticas", score: 6.5, desc: "TU-Sofia tiene conexiones crecientes con el sector tecnológico local e internacional." },
          { label: "Empresas relevantes", score: 6.5, desc: "Presencia de multinacionales tecnológicas atraídas por costes competitivos y talento técnico." },
          { label: "Oportunidades para estudiantes", score: 6.5, desc: "Mercado accesible para perfiles técnicos, especialmente en desarrollo de software." },
        ],
        reviews: [
          { text: "Hice unas prácticas cortas en una empresa de software gracias a un contacto de TU-Sofia. El sector tech está en pleno crecimiento aquí.", author: "Tobias, Internship 2023", flag: "🇩🇪" },
        ],
      },
      // 8. SEGURIDAD
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 7.0,
        summary: "Segura en general, con las precauciones normales de cualquier capital europea de este tamaño.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 7.0, desc: "Segura para estándares de capital europea, con criminalidad moderada." },
          { label: "Seguridad nocturna", score: 6.5, desc: "El centro es tranquilo y transitado; conviene algo más de atención en zonas periféricas de noche." },
          { label: "Ambiente de la ciudad", score: 7.5, desc: "Ambiente generalmente relajado y cívico, con la montaña como refugio constante." },
        ],
        reviews: [
          { text: "Me sentí segura durante todo el semestre, con la precaución normal de cualquier capital al volver de noche.", author: "Marta, Erasmus 2024", flag: "🇵🇱" },
        ],
      },
    ],
  },
};

// Generate default scores for cities without custom data
const DEFAULT_SCORES = (city) => [
  { id: "coste", label: "Coste de vida", icon: "💰", score: 7.0, summary: `Coste medio para Europa. Planifica un presupuesto de ${city?.costDetail || "800–1.200€"}/mes.`, color: "#0EA5E9", subcategories: [], reviews: [] },
  { id: "alojamiento", label: "Alojamiento", icon: "🏠", score: 6.0, summary: "Busca con 2–3 meses de antelación. Incluye pisos, habitaciones, residencias y colivings.", color: "#EF4444", subcategories: [], reviews: [] },
  { id: "vida_social", label: "Vida social y ambiente", icon: "🎉", score: 7.5, summary: "Buena vida social estudiantil. Comunidad Erasmus activa con eventos semanales.", color: "#8B5CF6", subcategories: [], reviews: [] },
  { id: "integracion", label: "Integración internacional", icon: "🌍", score: 7.8, summary: "Ciudad abierta a estudiantes internacionales. El inglés funciona bien.", color: "#14B8A6", subcategories: [], reviews: [] },
  { id: "movilidad", label: "Ubicación y movilidad", icon: "🚆", score: 7.5, summary: "Buen transporte público y buenas conexiones. Tarjeta mensual entre 30–60€.", color: "#F59E0B", subcategories: [], reviews: [] },
  { id: "estilo_vida", label: "Estilo de vida y entorno", icon: "🏔️", score: 7.8, summary: "Buena calidad de vida general. Mezcla equilibrada de cultura, ocio y comodidad.", color: "#14B8A6", subcategories: [], reviews: [] },
  { id: "empleo", label: "Empleo y oportunidades", icon: "💼", score: 7.0, summary: "Oportunidades en sectores clave. Prácticas Erasmus+ disponibles.", color: "#8B5CF6", subcategories: [], reviews: [] },
  { id: "seguridad", label: "Seguridad", icon: "🛡️", score: 8.0, summary: "Ciudad segura para estándares europeos. Precaución normal.", color: "#22C55E", subcategories: [], reviews: [] },
];

export const getCityInsights = (slug, cityData) => {
  const custom = CITY_INSIGHTS[slug];
  if (custom) {
    return {
      ...custom,
      // Always use the city's own heroImg if it exists and custom one fails
      heroImg: custom.heroImg || cityData?.img || "",
    };
  }
  return {
    heroImg: cityData?.img || "",
    tagline: cityData?.description || "",
    atmosphere: cityData?.vibe || "",
    scores: DEFAULT_SCORES(cityData),
  };
};

// ─── DEFAULT_INSIGHTS ─────────────────────────────────────────────────────────
// Exportado para que lib/cities.js pueda usarlo directamente.
// Ciudades sin insights propios usan este fallback automáticamente.
export const DEFAULT_INSIGHTS = (city) => ({
  heroImg: city?.img || "",
  tagline: city?.description || "",
  atmosphere: city?.vibe || "",
  scores: DEFAULT_SCORES(city),
});
