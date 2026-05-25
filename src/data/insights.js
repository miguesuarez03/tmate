// City scores and insights data — extends cities.js
// Each city has scores 0-10, subcategory breakdowns, and real student reviews

export const CITY_INSIGHTS = {
  bolonia: {
    heroImg: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1400&q=80",
    tagline: "La capital universitaria de Italia. Donde la pasta se inventó y el conocimiento nunca para.",
    atmosphere: "Rojiza, académica, gastronómica y festiva. Bolonia huele a ragù y suena a risas de estudiantes bajo los pórticos.",
    scores: [
      {
        id: "coste",
        label: "Coste de vida",
        icon: "💶",
        score: 6.8,
        summary: "Moderado para Italia, alto para Europa del Este. Vivir bien con 850€/mes es realista.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Vivienda", score: 5.5, desc: "Habitaciones desde 350–500€. Alta demanda por la universidad, conviene buscar con antelación." },
          { label: "Comida & mercados", score: 8.5, desc: "Mercado Quadrilatero: comer bien por 5€. La cultura gastronómica premia al curioso." },
          { label: "Transporte", score: 8.0, desc: "Bus TPER por 1,30€/viaje. Pase mensual a 35€. La bici funciona perfectamente en el centro." },
          { label: "Ocio & salidas", score: 7.0, desc: "Cervezas a 3–4€. Mucha oferta gratuita: conciertos, eventos culturales, mercados." },
        ],
        reviews: [
          { text: "Con 900€/mes vivía muy bien, comía de lujo y salía todos los fines de semana.", author: "Marta, Erasmus 2023", flag: "🇪🇸" },
          { text: "El piso fue lo más difícil de conseguir. Empieza a buscar 3 meses antes.", author: "João, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
      {
        id: "fiesta",
        label: "Fiesta & vida social",
        icon: "🎉",
        score: 9.1,
        summary: "Una de las mejores vidas nocturnas estudiantiles de Europa. Siempre hay algo que hacer.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Bares & clubs", score: 9.5, desc: "Via del Pratello y Via Zamboni son las arterias de la noche. Llenos de jueves a sábado." },
          { label: "Eventos estudiantiles", score: 9.0, desc: "ESN muy activo. Fiestas temáticas, excursiones, cenas internacionales cada semana." },
          { label: "Cultura & ocio", score: 8.5, desc: "Cine de verano al aire libre, festivales, mercados nocturnos. La ciudad nunca duerme en verano." },
          { label: "Sociabilidad local", score: 8.8, desc: "Los boloñeses son abiertos y orgullosos de su ciudad. Mezclarse es fácil." },
        ],
        reviews: [
          { text: "La mejor vida social de mi Erasmus. Cada noche había un plan diferente.", author: "Lucia, Erasmus 2023", flag: "🇩🇪" },
          { text: "El ESN de Bolonia es de los más activos de Italia. Los primeros días ya tienes amigos.", author: "Pierre, Erasmus 2024", flag: "🇫🇷" },
        ],
      },
      {
        id: "extranjeros",
        label: "Amabilidad con extranjeros",
        icon: "🤝",
        score: 8.4,
        summary: "Ciudad muy acostumbrada a estudiantes internacionales. El inglés llega lejos.",
        color: "#14B8A6",
        subcategories: [
          { label: "Barrera del idioma", score: 7.5, desc: "El inglés funciona bien en zonas universitarias. Aprender algo de italiano acelera todo." },
          { label: "Actitud local", score: 9.0, desc: "Boloñeses muy abiertos y curiosos con los extranjeros. Nada de hostilidad." },
          { label: "Integración cultural", score: 8.5, desc: "Fácil mezclarse por la alta densidad estudiantil. Los italianos invitan a cenar con facilidad." },
        ],
        reviews: [
          { text: "La gente local me adoptó desde el primer mes. Ahora tengo amigos italianos de por vida.", author: "Sofia, Work&Travel 2023", flag: "🇬🇷" },
        ],
      },
      {
        id: "transporte",
        label: "Movilidad & transporte",
        icon: "🚌",
        score: 8.2,
        summary: "Ciudad compacta y muy ciclable. El autobús cubre el resto sin problemas.",
        color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 7.5, desc: "Red de autobuses amplia. Pase mensual a 35€. Funciona bien pero no 24h." },
          { label: "Bicicleta", score: 9.0, desc: "La mejor forma de moverse. Centro completamente plano y con carril bici." },
          { label: "Conectividad regional", score: 8.0, desc: "Tren directo a Florencia (35min), Milán (1h), Venecia (1h20). Posición estratégica." },
        ],
        reviews: [
          { text: "Compré una bici de segunda mano por 60€ y fue mi mejor inversión del año.", author: "Tomás, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
      {
        id: "piso",
        label: "Encontrar piso",
        icon: "🏠",
        score: 5.2,
        summary: "Alta competencia por la demanda universitaria. Busca con mucha antelación.",
        color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 4.5, desc: "Alta demanda de 100.000+ estudiantes. Las mejores habitaciones se van en semanas." },
          { label: "Precio", score: 6.0, desc: "350–500€ habitación individual. Compartir piso es la norma." },
          { label: "Facilidad de búsqueda", score: 5.5, desc: "Idealista, Unipol, grupos de Facebook de la universidad. Mejor buscar desde origen." },
        ],
        reviews: [
          { text: "Tardé 2 meses en encontrar piso desde España. Empieza en marzo para septiembre.", author: "Ana, Erasmus 2023", flag: "🇪🇸" },
          { text: "Las residencias universitarias de Unibo son buena opción si las pillas a tiempo.", author: "Marco, estudiante local", flag: "🇮🇹" },
        ],
      },
      {
        id: "erasmus_community",
        label: "Comunidad Erasmus",
        icon: "🌍",
        score: 9.3,
        summary: "Una de las comunidades Erasmus más grandes y activas de Italia.",
        color: "#0EA5E9",
        subcategories: [
          { label: "Tamaño comunidad", score: 9.5, desc: "+6.000 estudiantes Erasmus al año. De las más grandes de Italia." },
          { label: "ESN activo", score: 9.5, desc: "ESN Bolonia organiza eventos semanales, trips y fiestas. Muy bien organizado." },
          { label: "Diversidad", score: 9.0, desc: "Estudiantes de toda Europa, Sudamérica y Asia. Ambiente verdaderamente internacional." },
        ],
        reviews: [
          { text: "El ESN organizó mi llegada, me presentó gente y tenía planes cada semana. Increíble.", author: "Klara, Erasmus 2024", flag: "🇩🇪" },
        ],
      },
      {
        id: "seguridad",
        label: "Seguridad",
        icon: "🛡️",
        score: 7.8,
        summary: "Ciudad segura para estándares europeos. Precaución normal en zonas nocturnas.",
        color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.0, desc: "Muy segura de día. Centro histórico concurrido y bien vigilado." },
          { label: "Noche", score: 7.5, desc: "Las zonas de fiesta son seguras. Como en cualquier ciudad, atención con pertenencias." },
          { label: "Carteristas", score: 7.5, desc: "Nivel bajo comparado con Roma o Florencia. Precaución normal en transporte." },
        ],
        reviews: [
          { text: "Me sentí más segura que en mi ciudad de origen. Nunca tuve ningún problema.", author: "Ingrid, Erasmus 2023", flag: "🇸🇪" },
        ],
      },
      {
        id: "clima",
        label: "Clima",
        icon: "☀️",
        score: 7.2,
        summary: "Veranos muy calurosos, inviernos fríos con niebla. Primavera y otoño son espectaculares.",
        color: "#F59E0B",
        subcategories: [
          { label: "Verano", score: 6.5, desc: "35–40°C en julio y agosto. Mucho calor pero la ciudad se vacía de estudiantes." },
          { label: "Invierno", score: 6.5, desc: "Frío húmedo, niebla frecuente. Los pórticos son un refugio perfecto." },
          { label: "Primavera/Otoño", score: 9.0, desc: "Las mejores épocas. 18–25°C, perfectas para vivir en la ciudad." },
        ],
        reviews: [
          { text: "El invierno fue más frío de lo que esperaba, pero la vida estudiantil compensa.", author: "Pedro, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
      {
        id: "calidad_vida",
        label: "Calidad de vida",
        icon: "⭐",
        score: 8.6,
        summary: "Excelente equilibrio entre cultura, gastronomía, vida social y bienestar general.",
        color: "#14B8A6",
        subcategories: [
          { label: "Gastronomía", score: 9.8, desc: "La mejor ciudad para comer de Italia. Ragù, tortellini, mortadella... auténticos." },
          { label: "Cultura & ocio", score: 8.5, desc: "Museos, teatros, cine al aire libre, mercados. Oferta cultural continua." },
          { label: "Deporte", score: 8.0, desc: "Instalaciones universitarias accesibles. Mucha vida al aire libre en los parques." },
          { label: "Bienestar general", score: 8.0, desc: "Ritmo de vida equilibrado. Ni demasiado acelerado ni aburrido." },
        ],
        reviews: [
          { text: "El mejor año de mi vida. La comida, la gente, la ciudad. Volvería mañana.", author: "Emma, Erasmus 2023", flag: "🇫🇷" },
          { text: "Bolonia tiene algo especial que no supe definir hasta que me fui.", author: "Rui, Erasmus 2024", flag: "🇵🇹" },
        ],
      },
      {
        id: "internships",
        label: "Oportunidades laborales",
        icon: "💼",
        score: 7.1,
        summary: "Buenas oportunidades en agroalimentario, tech y startups locales.",
        color: "#8B5CF6",
        subcategories: [
          { label: "Startups & tech", score: 7.0, desc: "Ecosistema tech creciente. Motor Valley (Ferrari, Lamborghini) atrae talento industrial." },
          { label: "Prácticas Erasmus+", score: 7.5, desc: "Convocatorias activas en empresas locales y organismos universitarios." },
          { label: "Networking", score: 7.0, desc: "La comunidad universitaria facilita conexiones. Unibo Career Service muy activo." },
        ],
        reviews: [
          { text: "Conseguí prácticas en una startup de foodtech gracias a la red de Erasmus.", author: "Lena, Internship 2024", flag: "🇩🇪" },
        ],
      },
    ],
  },

  berlin: {
    heroImg: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?w=1600&q=85",
    tagline: "La capital de la libertad creativa. Donde el arte no pide permiso y la noche no tiene hora de cierre.",
    atmosphere: "Cruda, vibrante, auténtica. Berlín huele a café de especialidad y suena a techno saliendo de almacenes reconvertidos.",
    scores: [
      { id: "coste", label: "Coste de vida", icon: "💶", score: 7.2, summary: "Más asequible que París o Londres. Habitaciones desde 500–700€, comida barata si sabes dónde.", color: "#0EA5E9",
        subcategories: [
          { label: "Vivienda", score: 6.0, desc: "WG (pisos compartidos) 450–700€. La demanda es alta pero la oferta también." },
          { label: "Comida & mercados", score: 8.5, desc: "Mercados turcos, döner a 3€, supermercados económicos. Comer sano y barato es fácil." },
          { label: "Transporte", score: 8.5, desc: "Deutschlandticket a 49€/mes. Metro, bus, tram 24h los fines de semana." },
          { label: "Ocio & salidas", score: 8.0, desc: "Entrada a clubs: 10–20€. Pero la vida cultural (museos, galerías) tiene mucho gratis." },
        ],
        reviews: [
          { text: "Con 1.100€/mes vivía muy bien. Berlín sigue siendo la más asequible de las grandes capitales.", author: "Carlos, Erasmus 2024", flag: "🇪🇸" },
          { text: "El Deutschlandticket cambió todo. Me moví por toda Alemania por 49€ al mes.", author: "Anna, Work&Travel 2024", flag: "🇵🇱" },
        ],
      },
      { id: "fiesta", label: "Fiesta & vida social", icon: "🎉", score: 9.8, summary: "La mejor vida nocturna del mundo. Punto. Clubs que abren 72 horas seguidas.", color: "#8B5CF6",
        subcategories: [
          { label: "Clubs & techno", score: 10.0, desc: "Berghain, Tresor, Watergate. La meca del techno mundial. Experiencia única." },
          { label: "Bares & cultura", score: 9.5, desc: "Bar de cada estilo imaginable. Neukölln y Kreuzberg no duermen entre semana." },
          { label: "Eventos & festivales", score: 9.5, desc: "Festival of Lights, Berlin Music Week, mercados navideños épicos." },
          { label: "Comunidad alternativa", score: 9.8, desc: "La ciudad más abierta, tolerante y alternativa de Europa. Sin juicios." },
        ],
        reviews: [
          { text: "Berlín te cambia la perspectiva de la vida. La libertad que respiras no existe en ningún otro sitio.", author: "Felix, Erasmus 2023", flag: "🇫🇷" },
          { text: "Entrar al Berghain fue la experiencia más memorable de mi Erasmus.", author: "Yuki, Exchange 2024", flag: "🇯🇵" },
        ],
      },
      { id: "extranjeros", label: "Amabilidad con extranjeros", icon: "🤝", score: 8.8, summary: "La ciudad más internacional de Alemania. El inglés funciona perfectamente en todos lados.", color: "#14B8A6",
        subcategories: [
          { label: "Idioma", score: 9.5, desc: "Todo el mundo habla inglés. Berlín funciona en inglés perfectamente." },
          { label: "Diversidad", score: 9.5, desc: "35% de residentes son de fuera de Alemania. La ciudad más diversa del país." },
          { label: "Actitud local", score: 8.0, desc: "Los berlineses son directos, no siempre cálidos al principio, pero muy abiertos." },
        ],
        reviews: [
          { text: "Nunca necesité el alemán. Todo el mundo cambiaba al inglés antes de que terminara de intentarlo.", author: "Giulia, Erasmus 2023", flag: "🇮🇹" },
        ],
      },
      { id: "transporte", label: "Movilidad & transporte", icon: "🚌", score: 9.4, summary: "El mejor transporte público de Alemania. 24h los fines de semana. Cobertura total.", color: "#F59E0B",
        subcategories: [
          { label: "Metro & S-Bahn", score: 9.5, desc: "Red amplísima. Nunca esperas más de 5 minutos. Funciona 24h viernes y sábado." },
          { label: "Bicicleta", score: 9.0, desc: "700km de carril bici. La bici es el transporte más usado por jóvenes." },
          { label: "Deutschlandticket", score: 10.0, desc: "49€/mes para toda Alemania. El mayor cambio en transporte público europeo en décadas." },
        ],
        reviews: [
          { text: "El transporte de Berlín me hizo olvidar que tenía coche en casa.", author: "Mikael, Erasmus 2024", flag: "🇸🇪" },
        ],
      },
      { id: "piso", label: "Encontrar piso", icon: "🏠", score: 5.8, summary: "Mercado tenso pero más fácil que Múnich o París. WG Gesucht es la biblia.", color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 5.5, desc: "Demanda muy alta. Las WG buenas se van en días. Hay que ser rápido y preparado." },
          { label: "Precio", score: 6.5, desc: "Más barato que otras capitales. WG 450–700€. Posible encontrar algo razonable." },
          { label: "Herramientas de búsqueda", score: 7.0, desc: "WG-Gesucht, Immowelt, grupos de Facebook. Ecosistema de búsqueda bien desarrollado." },
        ],
        reviews: [
          { text: "Tardé 3 semanas pero encontré un piso increíble en Neukölln. WG-Gesucht es clave.", author: "Luisa, Erasmus 2024", flag: "🇧🇷" },
        ],
      },
      { id: "erasmus_community", label: "Comunidad Erasmus", icon: "🌍", score: 9.0, summary: "Comunidad internacional enorme y muy activa. Fácil hacer amigos de todo el mundo.", color: "#0EA5E9",
        subcategories: [
          { label: "Tamaño", score: 9.0, desc: "+8.000 estudiantes internacionales al año entre todas las universidades berlinesas." },
          { label: "ESN & actividades", score: 8.5, desc: "Varios ESN por universidad. Eventos constantes para conectar desde el día 1." },
          { label: "Internacionalidad", score: 9.5, desc: "Estudiantes de 150+ países. La ciudad más internacional de Alemania." },
        ],
        reviews: [
          { text: "Mi grupo de amigos era de 8 países distintos. Eso no pasa en ningún otro sitio.", author: "Sophie, Erasmus 2023", flag: "🇨🇭" },
        ],
      },
      { id: "seguridad", label: "Seguridad", icon: "🛡️", score: 7.5, summary: "Segura para una capital grande. Precaución en algunos barrios de noche.", color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 7.5, desc: "Ciudad segura. Estadísticas de criminalidad bajas para su tamaño." },
          { label: "Noche", score: 7.0, desc: "Zonas de fiesta bien vigiladas. Atención normal en estaciones de metro de noche." },
          { label: "Barrios", score: 8.0, desc: "Prenzlauer Berg y Mitte muy seguros. Más precaución en algunas zonas de Neukölln." },
        ],
        reviews: [
          { text: "Me sentí segura en todo momento, incluso volviendo sola de noche.", author: "Marie, Erasmus 2023", flag: "🇫🇷" },
        ],
      },
      { id: "clima", label: "Clima", icon: "☀️", score: 6.2, summary: "Inviernos largos y grises. Veranos cortos pero intensos y maravillosos.", color: "#F59E0B",
        subcategories: [
          { label: "Verano (jun–ago)", score: 9.0, desc: "Los mejores meses. Lagos, terrazas, festivales. Berlín en verano es otro planeta." },
          { label: "Invierno (dic–feb)", score: 4.0, desc: "Frío, gris y lluvioso. Los días son cortos. Requiere adaptación anímica." },
          { label: "Primavera/Otoño", score: 6.5, desc: "Variable. Llevar siempre una chaqueta extra. Los parques florecen en mayo." },
        ],
        reviews: [
          { text: "El invierno es duro pero los berlineses saben cómo sobrevivir con buen humor.", author: "Aleksei, Erasmus 2024", flag: "🇷🇺" },
        ],
      },
      { id: "calidad_vida", label: "Calidad de vida", icon: "⭐", score: 8.7, summary: "Libertad, cultura, creatividad. Una ciudad que te expande como persona.", color: "#14B8A6",
        subcategories: [
          { label: "Cultura & arte", score: 9.8, desc: "170 museos, galerías, street art. Más museos que días lluviosos." },
          { label: "Gastronomía", score: 8.5, desc: "La ciudad más multicultural de Alemania. Comida de 80 culturas en cada barrio." },
          { label: "Naturaleza & deporte", score: 8.5, desc: "30% de la ciudad es parques y lagos. Müggelsee, Wannsee — playas urbanas épicas." },
          { label: "Bienestar general", score: 8.0, desc: "Ritmo de vida intenso pero con mucho espacio para la introspección y la creatividad." },
        ],
        reviews: [
          { text: "Berlín no es una ciudad. Es un estado mental. Salí siendo otra persona.", author: "David, Work&Travel 2023", flag: "🇨🇴" },
          { text: "La libertad que te da Berlín para ser quien quieras ser es irrepetible.", author: "Alex, Erasmus 2024", flag: "🇬🇧" },
        ],
      },
      { id: "internships", label: "Oportunidades laborales", icon: "💼", score: 8.9, summary: "El hub de startups más grande de Europa. Oportunidades en tech, creativas y fintech.", color: "#8B5CF6",
        subcategories: [
          { label: "Startups & tech", score: 9.5, desc: "Rocket Internet, Zalando, N26, Delivery Hero. Berlín es la capital startup de Europa." },
          { label: "Creativo & media", score: 9.0, desc: "Moda, diseño, música, cine, publicidad. La industria creativa más densa de Alemania." },
          { label: "Prácticas internacionales", score: 8.5, desc: "Miles de empresas internacionales buscando talento joven. El inglés es suficiente." },
        ],
        reviews: [
          { text: "Conseguí trabajo en una startup fintech antes de terminar mi Erasmus. Me quedé 2 años.", author: "Tom, Erasmus→Job 2022", flag: "🇳🇱" },
        ],
      },
    ],
  },

  lisboa: {
    heroImg: "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=1600&q=85",
    tagline: "La ciudad dorada del Atlántico. 300 días de sol, fado en las calles y el mar a 30 minutos.",
    atmosphere: "Cálida, nostálgica y vibrante. Lisboa huele a pastéis de nata y suena a fado saliendo de tabernas con luz azul.",
    scores: [
      { id: "coste", label: "Coste de vida", icon: "💶", score: 7.0, summary: "Asequible para Europa Occidental. Caro para Portugal. 900–1.100€/mes bien vividos.", color: "#0EA5E9",
        subcategories: [
          { label: "Vivienda", score: 6.0, desc: "500–700€ habitación. El boom turístico encareció el mercado. Busca en Mouraria o Intendente." },
          { label: "Comida", score: 8.5, desc: "Menú del día por 8–10€. Mercado de Ribeira. Pastéis por 1,20€. Comer bien es barato." },
          { label: "Transporte", score: 9.0, desc: "Pase mensual Navegante a 40€. Metro, tram, autobús. Los barcos sobre el Tajo incluidos." },
          { label: "Ocio", score: 8.0, desc: "Cervezas a 2–3€. Mucha vida gratuita en miradores, playas urbanas y festivales de verano." },
        ],
        reviews: [
          { text: "Con 1.000€/mes vivía de lujo comparado con lo que habría pagado en París.", author: "Camille, Erasmus 2024", flag: "🇫🇷" },
          { text: "El alquiler se disparó pero si buscas bien en barrios menos turísticos, está bien.", author: "Tiago, estudiante local", flag: "🇵🇹" },
        ],
      },
      { id: "fiesta", label: "Fiesta & vida social", icon: "🎉", score: 8.7, summary: "Noches largas y cálidas. Bairro Alto, Cais do Sodré y la escena de nómadas digitales.", color: "#8B5CF6",
        subcategories: [
          { label: "Bares & zonas", score: 9.0, desc: "Bairro Alto (bares de calle), Cais do Sodré (discotecas), LX Factory (eventos). Para todos." },
          { label: "Comunidad internacional", score: 9.0, desc: "La ciudad con más nómadas digitales y jóvenes internacionales de Europa del Sur." },
          { label: "Cultura nocturna", score: 8.5, desc: "Fado en vivo, rooftops con vistas, mercados nocturnos en verano." },
        ],
        reviews: [
          { text: "Las noches de verano en Lisboa son mágicas. Empieza en el Bairro Alto y termina en el Cais.", author: "Hannah, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      { id: "extranjeros", label: "Amabilidad con extranjeros", icon: "🤝", score: 9.2, summary: "Los portugueses son de los más acogedores de Europa. La ciudad más amigable del sur.", color: "#14B8A6",
        subcategories: [
          { label: "Actitud local", score: 9.5, desc: "Extremadamente amables y pacientes. El orgullo português se comparte, no se impone." },
          { label: "Idioma", score: 8.5, desc: "El inglés funciona muy bien. Muchos jóvenes hablan castellano también." },
          { label: "Integración", score: 9.5, desc: "La ciudad más acogedora de la Península. Histórica apertura al mundo." },
        ],
        reviews: [
          { text: "Los lisboetas son los más amables que he conocido en Europa. Me invitaron a cenar el primer día.", author: "Nadia, Erasmus 2024", flag: "🇦🇹" },
        ],
      },
      { id: "transporte", label: "Movilidad & transporte", icon: "🚌", score: 8.5, summary: "Navegante lo cubre todo. La bici cuesta en las colinas, el tuk-tuk es para turistas.", color: "#F59E0B",
        subcategories: [
          { label: "Transporte público", score: 9.0, desc: "Navegante Metropolitano a 40€/mes. Metro, tram, autobuses y ferries en un solo bono." },
          { label: "Topografía", score: 6.5, desc: "Las 7 colinas son bonitas pero duras a pie. Los eléctricos históricos son lentos. GIRA (bici compartida) es útil en zonas planas." },
          { label: "Conexión nacional", score: 8.5, desc: "Trenes a Oporto (3h) y a Faro (3,5h). Autocarres baratos para Sevilla y Madrid." },
        ],
        reviews: [
          { text: "Con el Navegante tenía el mundo. Hasta los ferries estaban incluidos.", author: "Erik, Erasmus 2023", flag: "🇳🇴" },
        ],
      },
      { id: "piso", label: "Encontrar piso", icon: "🏠", score: 5.5, summary: "Mercado tensionado por el turismo y los nómadas. Busca en barrios emergentes.", color: "#EF4444",
        subcategories: [
          { label: "Disponibilidad", score: 5.0, desc: "Muy alta demanda. Muchos pisos se van a Airbnb. Hay que buscar en grupos locales." },
          { label: "Precio", score: 5.5, desc: "500–700€ habitación. Caro para Portugal. Mejor en Mouraria, Intendente o Arroios." },
          { label: "Plataformas", score: 7.0, desc: "Idealista Portugal, Uniplaces, grupos de Facebook de internacionales." },
        ],
        reviews: [
          { text: "Buscando en el grupo de Facebook 'Erasmus Lisboa' encontré piso en 4 días.", author: "Sofía, Erasmus 2024", flag: "🇪🇸" },
        ],
      },
      { id: "erasmus_community", label: "Comunidad Erasmus", icon: "🌍", score: 9.1, summary: "Enorme comunidad internacional. Lisboa es el destino Erasmus más trendy ahora mismo.", color: "#0EA5E9",
        subcategories: [
          { label: "Tamaño", score: 9.0, desc: "+7.000 estudiantes internacionales entre NOVA, ULisboa e ISCTE." },
          { label: "ESN & eventos", score: 9.0, desc: "ESN muy activo. Rooftop parties, surf trips, wine tastings, city tours." },
          { label: "Comunidad nómada", score: 9.5, desc: "La mayor comunidad de nómadas digitales jóvenes de Europa. Espacios de coworking top." },
        ],
        reviews: [
          { text: "Fui por Erasmus y me quedé 6 meses extra. La comunidad internacional es adictiva.", author: "Marco, Erasmus 2023", flag: "🇩🇪" },
        ],
      },
      { id: "seguridad", label: "Seguridad", icon: "🛡️", score: 8.5, summary: "Una de las capitales más seguras de Europa. Índice de criminalidad muy bajo.", color: "#22C55E",
        subcategories: [
          { label: "Seguridad general", score: 8.5, desc: "Consistentemente rankeada entre las 10 ciudades más seguras de Europa." },
          { label: "Noche", score: 8.5, desc: "Las zonas de fiesta son seguras. La gente está tranquila y no hay cultura de violencia." },
          { label: "Turismo masivo", score: 7.5, desc: "Con el turismo han aumentado los carteristas. Atención en trams históricos y zonas muy turísticas." },
        ],
        reviews: [
          { text: "La ciudad más segura en la que he vivido. Volví sola de noche siempre sin problema.", author: "Aisha, Erasmus 2024", flag: "🇬🇧" },
        ],
      },
      { id: "clima", label: "Clima", icon: "☀️", score: 9.4, summary: "El mejor clima de Europa Occidental. 300 días de sol. El Atlántico regula la temperatura.", color: "#F59E0B",
        subcategories: [
          { label: "Verano", score: 9.0, desc: "25–35°C, seco y soleado. La brisa atlántica suaviza el calor. Playas a 30 minutos." },
          { label: "Invierno", score: 8.5, desc: "12–18°C. El invierno más suave de Europa. Raramente baja de 10°C." },
          { label: "Lluvia", score: 9.0, desc: "Llueve poco y cuando llueve dura poco. Los días de lluvia son la excepción." },
        ],
        reviews: [
          { text: "Vengo de Finlandia. El clima de Lisboa fue lo que me convenció para quedarme.", author: "Paavo, Work&Travel 2023", flag: "🇫🇮" },
        ],
      },
      { id: "calidad_vida", label: "Calidad de vida", icon: "⭐", score: 9.0, summary: "Difícil encontrar una ciudad que lo combine todo mejor. Será tu referencia de por vida.", color: "#14B8A6",
        subcategories: [
          { label: "Gastronomía", score: 9.5, desc: "Pastéis, bacalhau, ginjinha, marisco. La gastronomía más subestimada de Europa." },
          { label: "Naturaleza & playa", score: 9.5, desc: "Surf en Ericeira (45min), playas de Cascais (30min), Serra de Sintra (30min)." },
          { label: "Cultura", score: 8.5, desc: "Fado, azulejos, museos modernos y una escena creativa muy viva." },
          { label: "Bienestar", score: 9.0, desc: "Ritmo de vida relajado que invita a disfrutar. La antítesis del estrés." },
        ],
        reviews: [
          { text: "Lisboa te enseña a vivir. La velocidad, la comida, la gente, el mar. Es perfecta.", author: "Raphaelle, Erasmus 2024", flag: "🇫🇷" },
          { text: "Ninguna ciudad del mundo tiene lo que tiene Lisboa a ese precio. Todavía.", author: "Jake, Digital Nomad 2023", flag: "🇺🇸" },
        ],
      },
      { id: "internships", label: "Oportunidades laborales", icon: "💼", score: 7.8, summary: "Hub tecnológico en crecimiento. Startups, fintech y empresas internacionales que eligen Portugal.", color: "#8B5CF6",
        subcategories: [
          { label: "Startups & tech", score: 8.5, desc: "Web Summit. Farfetch, OutSystems, Feedzai nacieron aquí. Ecosistema tech muy activo." },
          { label: "Multinacionales", score: 8.0, desc: "Mercedes, Google, Natixis tienen centros en Lisboa. Muchas oportunidades en inglés." },
          { label: "Prácticas Erasmus+", score: 7.5, desc: "Convocatorias activas. El IPDJ gestiona muchos programas de prácticas internacionales." },
        ],
        reviews: [
          { text: "Hice prácticas en una startup del Web Summit. Me ficharon al terminar el Erasmus.", author: "Rafael, Erasmus→Job 2023", flag: "🇧🇷" },
        ],
      },
    ],
  },
};

// Generate default scores for cities without custom data
const DEFAULT_SCORES = (city) => [
  { id: "coste", label: "Coste de vida", icon: "💶", score: 7.0, summary: `Coste medio para Europa. Planifica un presupuesto de ${city?.costDetail || "800–1.200€"}/mes.`, color: "#0EA5E9", subcategories: [], reviews: [] },
  { id: "fiesta", label: "Fiesta & vida social", icon: "🎉", score: 7.5, summary: "Buena vida social estudiantil. ESN activo con eventos semanales.", color: "#8B5CF6", subcategories: [], reviews: [] },
  { id: "extranjeros", label: "Amabilidad con extranjeros", icon: "🤝", score: 7.8, summary: "Ciudad abierta a estudiantes internacionales. El inglés funciona bien.", color: "#14B8A6", subcategories: [], reviews: [] },
  { id: "transporte", label: "Movilidad & transporte", icon: "🚌", score: 7.5, summary: "Buen transporte público. Tarjeta mensual entre 30–60€.", color: "#F59E0B", subcategories: [], reviews: [] },
  { id: "piso", label: "Encontrar piso", icon: "🏠", score: 6.0, summary: "Busca con 2–3 meses de antelación. Grupos locales y plataformas especializadas.", color: "#EF4444", subcategories: [], reviews: [] },
  { id: "erasmus_community", label: "Comunidad Erasmus", icon: "🌍", score: 8.0, summary: "Comunidad activa con eventos regulares y red internacional fuerte.", color: "#0EA5E9", subcategories: [], reviews: [] },
  { id: "seguridad", label: "Seguridad", icon: "🛡️", score: 8.0, summary: "Ciudad segura para estándares europeos. Precaución normal.", color: "#22C55E", subcategories: [], reviews: [] },
  { id: "clima", label: "Clima", icon: "☀️", score: 7.0, summary: "Clima europeo con las cuatro estaciones bien diferenciadas.", color: "#F59E0B", subcategories: [], reviews: [] },
  { id: "calidad_vida", label: "Calidad de vida", icon: "⭐", score: 7.8, summary: "Buena calidad de vida general. Mezcla equilibrada de cultura, ocio y comodidad.", color: "#14B8A6", subcategories: [], reviews: [] },
  { id: "internships", label: "Oportunidades laborales", icon: "💼", score: 7.0, summary: "Oportunidades en sectores clave. Prácticas Erasmus+ disponibles.", color: "#8B5CF6", subcategories: [], reviews: [] },
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
