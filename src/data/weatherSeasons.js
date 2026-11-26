// Datos de clima por ciudad — Las cuatro estaciones
// Clave: slug de la ciudad (igual que en cities.js)
// temp: media de las mínimas y de las máximas de la estación (normales climatológicas
// 1991–2020 del servicio meteorológico nacional / OMM). Ciudades ya cotejadas: ver VERIFICACION.md.

export const CITY_SEASONS = {
  // Bolonia: Bologna idrografico (ARPAE, estación 14101, normales 1991–2020).
  bolonia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "11–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Época perfecta. Ciudad en flor, terrazas abiertas y clima ideal para explorar.", tags: ["Ideal para llegar", "Terrazas", "Lluvias puntuales"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "20–31°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor intenso y húmedo. La ciudad se vacía de universitarios, llega el turismo.", tags: ["Calor extremo", "Festivales", "Ciudad tranquila"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "12–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor temporada. Los Erasmus llegan y la ciudad vuelve a la vida con colores épicos.", tags: ["Mejor época", "Inicio Erasmus", "Colores únicos"], highlight: true },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "3–9°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío y niebla. Los pórticos son refugio. La vida universitaria lo compensa todo.", tags: ["Niebla frecuente", "Muy social", "Ambiente acogedor"] },
  ],
  milan: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "9–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Milano florece. Semana de la Moda en febrero-marzo. Terrazas de los Navigli a tope.", tags: ["Semana de la Moda", "Terrazas", "Agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "18–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor húmedo y sofocante. La ciudad se vacía en agosto. Buenas ofertas en alojamiento.", tags: ["Calor húmedo", "Ciudad semi-vacía", "Agosto tranquilo"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "10–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época. Vuelta a la actividad, festivales y aperitivos al aire libre.", tags: ["Mejor época", "Festivales", "Aperitivo"], highlight: true },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "0–8°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío y niebla característica. Mercados de Navidad únicos y ambiente muy acogedor.", tags: ["Niebla planura", "Navidad mágica", "Frío seco"] },
  ],
  roma: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "9–19°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La mejor época del año. Clima perfecto para visitar monumentos y comer en terraza.", tags: ["Clima ideal", "Turismo moderado", "Flores en el Foro"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "19–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor intenso. Los romanos huyen en agosto. Ciudad llena de turistas.", tags: ["Calor extremo", "Turismo masivo", "Agosto vacío"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "12–22°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Excelente. Temperaturas suaves, menos turistas y vida universitaria muy activa.", tags: ["Muy agradable", "Inicio Erasmus", "Menos turistas"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "4–13°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Suave para ser invierno. Lluvia frecuente pero raramente nieva. Navidad espectacular.", tags: ["Invierno suave", "Lluvia ocasional", "Navidad única"] },
  ],
  cracovia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–14°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La ciudad renace. El casco histórico florece y las terrazas se llenan de estudiantes.", tags: ["Ciudad en flor", "Terrazas", "Muy animado"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "13–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "El mejor verano de Europa Central. Calor agradable, festivales y noches largas.", tags: ["Temperatura perfecta", "Festivales", "Noches largas"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "5–14°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Magnífico. Los Erasmus llegan en septiembre con colores de otoño espectaculares.", tags: ["Inicio Erasmus", "Colores únicos", "Agradable"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-4–3°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío intenso con nieve. El mercado navideño de Cracovia es de los más bonitos de Europa.", tags: ["Nieve frecuente", "Navidad top", "Muy frío"] },
  ],
  varsovia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–14°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Bienvenida al calor. La ciudad despierta con fuerza y los parques se llenan de gente.", tags: ["Parques increíbles", "Terrazas", "Ambiente animado"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "14–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano corto pero intenso. Festivales de música y noches que no acaban.", tags: ["Festivales", "Noches largas", "Temperatura ideal"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "5–13°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño vibrante. Arranque del año universitario con energía. Precios muy asequibles.", tags: ["Inicio Erasmus", "Muy barato", "Energético"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-3–2°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Duro pero la ciudad no para. Vodka, sopa caliente y mucha vida interior.", tags: ["Frío extremo", "Vida interior", "Navidad"] },
  ],
  budapest: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–17°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Espectacular. Los baños termales al aire libre y el Danubio en primavera son únicos.", tags: ["Baños termales", "Danubio", "Muy agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "16–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Festival Sziget en agosto. Calor con terrazas de ruin bars a reventar.", tags: ["Festival Sziget", "Ruin bars", "Calor agradable"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–16°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Ideal para llegar de Erasmus. Clima suave, precios bajos y ambiente de locura.", tags: ["Inicio Erasmus", "Precios bajos", "Muy social"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-2–4°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío pero los baños termales en invierno son una experiencia alucinante.", tags: ["Baños termales", "Nieve posible", "Navidad"] },
  ],
  praga: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–14°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Praga en primavera es irreal. El casco histórico sin masas de turistas, clima perfecto.", tags: ["Poco turismo", "Ciudad en flor", "Perfecto"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "12–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor agradable con turismo máximo. Cerveza en terrazas del río Moldava.", tags: ["Turismo alto", "Cerveza y terrazas", "Noches largas"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "5–13°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Arranque Erasmus con colores de cuento. Mercadillos y ambiente universitario excelente.", tags: ["Inicio Erasmus", "Colores únicos", "Asequible"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-3–3°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío pero el mercado navideño de Praga es uno de los mejores de Europa.", tags: ["Navidad top", "Nieve posible", "Ambiente mágico"] },
  ],
  "la-haya": [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–14°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Playa cercana y tulipanes en flor. La ciudad se activa con energía después del gris invernal.", tags: ["Playa cerca", "Tulipanes", "Ciudad activa"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "13–21°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "El mejor momento. Playas de Scheveningen, festivales y días luminosos muy largos.", tags: ["Playa Scheveningen", "Días largos", "Festivales"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño húmedo. Los Erasmus llegan con impermeables. La ciudad internacional sigue activa.", tags: ["Lluvia frecuente", "Inicio Erasmus", "Muy internacional"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "2–7°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Gris y ventoso. Pero el ambiente interior de bares y cafés compensa enormemente.", tags: ["Viento marino", "Ambiente acogedor", "Poca nieve"] },
  ],
  rotterdam: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–14°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El puerto y la arquitectura moderna brillan con el sol. Festivales al aire libre.", tags: ["Arquitectura", "Festivales", "Ciudad activa"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "13–22°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano fresco pero los días son eternos. Terrazas junto al Maas y eventos continuos.", tags: ["Días largos", "Terrazas", "Eventos"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Lluvia y viento marino pero la ciudad no para. Buen inicio de curso universitario.", tags: ["Lluvia frecuente", "Inicio Erasmus", "Muy dinámica"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "1–7°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío húmedo. Los mercados de Navidad y la vida interior holandesa lo hacen llevadero.", tags: ["Frío húmedo", "Navidad", "Vida interior"] },
  ],
  munich: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–15°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Despertar espectacular con los Alpes de fondo. Jardines ingleses y terrazas de cervecería.", tags: ["Alpes cerca", "Jardín inglés", "Biergärten"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "14–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Temporada dorada: Biergärten a reventar, baños en el Isar y días largos.", tags: ["Biergärten", "Río Isar", "Días largos"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "6–14°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Oktoberfest arranca en septiembre. Otoño bávaro con colores impresionantes.", tags: ["Oktoberfest", "Inicio Erasmus", "Colores bávaros"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-1–5°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío con mucha nieve. Mercado navideño Christkindlmarkt top en Alemania. Ski cerca.", tags: ["Nieve frecuente", "Navidad top", "Ski en los Alpes"] },
  ],
  berlin: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–15°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Berlín vuelve a la vida. Parques abarrotados, terrazas y energía creativa por todas partes.", tags: ["Parques llenos", "Terrazas", "Energía creativa"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "14–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "La temporada de los clubs al aire libre. Días eternos y vida nocturna sin fin.", tags: ["Clubs al aire libre", "Días eternos", "Techno"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "7–14°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Gran época para llegar. Menos turistas, los clubs siguen y la vida cultural explota.", tags: ["Inicio Erasmus", "Clubs", "Cultura"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-1–4°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío y oscuro pero la vida nocturna de Berlín nunca duerme. Clubs más míticos.", tags: ["Clubs nocturnos", "Frío intenso", "Navidad"] },
  ],
  lisboa: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "13–21°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Lisboa explota. Clima perfecto, los miradores llenos y festas populares empezando.", tags: ["Clima perfecto", "Miradores", "Festas populares"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "18–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor seco y playa a 30 minutos. El Tejo lleno de vida. Noches infinitas.", tags: ["Playa cerca", "Calor seco", "Noches mágicas"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "15–23°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Excelente para el Erasmus. Aún hace calor en septiembre y la ciudad está a pleno rendimiento.", tags: ["Inicio Erasmus", "Aún caluroso", "Muy social"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "9–16°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Inviernos suaves y lluviosos, con máximas en torno a 15°C. Ideal para quien huye del frío.", tags: ["Invierno suave", "Sin nieve", "Lluvia moderada"] },
  ],
  // Oporto: Porto/Pedras Rubras (IPMA, estación 545, aeropuerto, normales 1991–2020); misma serie que el mes más frío y el más cálido.
  oporto: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "10–18°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La ciudad más fotogénica de Europa brilla con el sol de primavera. Azulejos y vida.", tags: ["Muy fotogénico", "Azulejos", "Agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "15–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor moderado con brisa atlántica. Playas a 10 minutos y vino del Duero.", tags: ["Brisa atlántica", "Playas", "Vino Porto"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "12–20°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Magnífico arranque de curso. Aún cálido en septiembre y la comunidad Erasmus es muy activa.", tags: ["Inicio Erasmus", "Cálido", "Muy social"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "7–15°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Lluvia atlántica frecuente pero temperaturas muy suaves.", tags: ["Lluvia atlántica", "Invierno suave", "Sin nieve"] },
  ],
  paris: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–17°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "París en primavera es exactamente como en las películas. Los jardines florecen y las terrazas se llenan.", tags: ["París en flor", "Terrazas", "Turismo moderado"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "15–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor agradable. Las orillas del Sena se convierten en playa y el ambiente es excepcional.", tags: ["Orillas del Sena", "Paris Plages", "Muy animado"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "10–16°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Arranque de curso muy intenso. Museos, gastronomía y vida universitaria al máximo.", tags: ["Inicio Erasmus", "Cultura", "Gastronomía"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "3–8°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío pero con las luces de Navidad París es otro mundo. Museos perfectos para el invierno.", tags: ["Navidad mágica", "Museos", "Frío moderado"] },
  ],
  // Londres: London St James's Park (OMM 03770), normales 1991–2020 de la OMM publicadas por NOAA/NCEI (16-11-2026).
  londres: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–15°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La ciudad florece literalmente. Hyde Park lleno y el ambiente es increíblemente optimista.", tags: ["Hyde Park", "Mercados", "Energía única"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "14–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "El verano londinense es mágico cuando aparece el sol. Festivales, parques y rooftops.", tags: ["Festivales", "Rooftops", "Sol inesperado"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "9–16°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Gran época de inicio. La ciudad está en su máximo esplendor cultural con teatros y eventos.", tags: ["Inicio Erasmus", "Teatro", "Cultura top"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "4–9°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Lluvioso y gris pero con las luces navideñas Oxford Street es espectacular.", tags: ["Navidad Oxford St", "Lluvia", "Raramente nieva"] },
  ],
  amsterdam: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–14°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Los canales y los tulipanes en flor. La mejor postal de Amsterdam. Keukenhof cerca.", tags: ["Tulipanes", "Canales", "Keukenhof"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "13–22°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano fresco y con días eternos. Fiestas en los canales y terrazas a tope.", tags: ["Días largos", "Terrazas", "Canales llenos"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Gran época Erasmus. La ciudad vuelve a su ritmo local con menos turistas y más vida real.", tags: ["Inicio Erasmus", "Menos turistas", "Lluvia frecuente"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "1–7°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío y húmedo; los años en que se hielan los canales son mágicos. Luces de invierno y ambiente muy acogedor.", tags: ["Frío húmedo", "Luces invierno", "Muy acogedor"] },
  ],
  // Viena: Wien Hohe Warte (GeoSphere Austria, estación 105 / OMM 11035), normal oficial 1991–2020.
  // Klimanormalperiode, hoja Temperatur: mtmin FJ145:FJ156 y mtmax FJ214:FJ225; ver docs/fuentes-clima.md.
  viena: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–16°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Viena despierta con conciertos al aire libre y el Prater en flor. Ambiente cultural único.", tags: ["Conciertos", "Prater", "Cultura"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "15–26°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Caluroso y lleno de festivales. El Danubio se convierte en zona de baño y playa urbana.", tags: ["Playa Danubio", "Festivales", "Calor agradable"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La temporada de la ópera y los conciertos. Arranque Erasmus con agenda cultural brutal.", tags: ["Ópera", "Inicio Erasmus", "Cultura clásica"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-1–5°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Los mercados navideños de Viena son de los más bonitos de Europa. Frío pero mágico.", tags: ["Mercados navideños", "Frío seco", "Ambiente mágico"] },
  ],
  // Rosenheim: DWD Rosenheim (4261), 1991–2020.
  rosenheim: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–15°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Los Alpes bávaros se llenan de color. Excursiones de senderismo y rutas en bici entre lagos.", tags: ["Senderismo", "Lagos", "Alpes"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "13–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano alpino ideal. Lagos cristalinos, actividades outdoor sin fin y, a finales de agosto, el Herbstfest de Rosenheim.", tags: ["Lagos alpinos", "Outdoor", "Herbstfest"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "5–14°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño bávaro espectacular. Colores únicos en los Alpes y el Oktoberfest de Múnich a un trayecto en tren.", tags: ["Oktoberfest", "Colores únicos", "Inicio Erasmus"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-3–5°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Nieve asegurada. Esquí a pocos kilómetros y ambiente bávaro navideño incomparable.", tags: ["Esquí", "Nieve frecuente", "Navidad bávara"] },
  ],
  bruselas: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–15°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La Grand Place más bonita que nunca. Cerveza belga en terraza y chocolate en cada esquina.", tags: ["Grand Place", "Cerveza", "Agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "13–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano europeo con eventos y festivales. La ciudad institucional se relaja un poco.", tags: ["Festivales", "Terrazas", "Clima suave"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Buen inicio de curso. Bruselas cosmopolita y muy internacional activa su vida cultural.", tags: ["Inicio Erasmus", "Multicultural", "Lluvia frecuente"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "2–7°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío y gris pero el mercado navideño de la Grand Place compensa todo.", tags: ["Navidad Grand Place", "Chocolate caliente", "Frío húmedo"] },
  ],
  estocolmo: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "3–11°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La nieve se derrite y la ciudad revive. Las terrazas abren en cuanto asoma el sol.", tags: ["Deshielo", "Luz creciente", "Terrazas al sol"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "14–22°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Días interminables (hasta 18-19h de luz) y archipiélago en pleno esplendor. La mejor época sin duda.", tags: ["Días eternos", "Archipiélago", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "6–11°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Arranque de curso con colores nórdicos espectaculares antes de que llegue la oscuridad.", tags: ["Inicio Erasmus", "Colores nórdicos", "Días acortándose"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-2–2°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Apenas 6 horas de luz y mucho frío, pero mercados navideños, saunas y el fenómeno 'mys' (hygge sueco) lo compensan.", tags: ["Días muy cortos", "Nieve posible", "Mys nórdico"] },
  ],
  helsinki: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "1–8°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Deshielo lento y luz que vuelve rápido. Vappu (1 de mayo) es la fiesta estudiantil más importante del año.", tags: ["Vappu", "Deshielo", "Luz creciente"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "13–20°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Días casi eternos (hasta 19h de luz), archipiélago en pleno esplendor y toda la vida se traslada al aire libre.", tags: ["Días eternos", "Archipiélago", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "5–10°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Ruska (el otoño finlandés) tiñe los bosques de rojo antes de que lleguen la oscuridad y el frío.", tags: ["Ruska", "Inicio Erasmus", "Días acortándose"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-5–0°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Apenas 6 horas de luz y nieve frecuente, aunque varía de un invierno a otro. La sauna deja de ser un lujo y se convierte en necesidad semanal.", tags: ["Días muy cortos", "Nieve frecuente", "Sauna semanal"] },
  ],
  // Oslo: Oslo-Blindern (OMM 01492), normales 1991–2020 de la OMM publicadas por NOAA/NCEI (16-11-2026).
  oslo: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "2–11°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El deshielo llega a Nordmarka y la ciudad recupera la vida al aire libre casi de golpe.", tags: ["Deshielo", "Luz creciente", "Bosques reabren"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "12–21°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Días larguísimos, baño en el fiordo y senderismo constante en Nordmarka. La mejor época para descubrir la naturaleza a las puertas de la ciudad.", tags: ["Días larguísimos", "Baño en el fiordo", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "4–10°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Los bosques que rodean la ciudad se tiñen de colores intensos antes de la llegada del frío.", tags: ["Inicio Erasmus", "Bosques de colores", "Días acortándose"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-4–1°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Nieve frecuente y esquí de fondo dentro de los límites de la ciudad — Oslo se convierte en una estación de invierno urbana.", tags: ["Esquí urbano", "Nieve segura", "Días muy cortos"] },
  ],
  // Reikiavik: Reykjavík (OMM 04030), normales 1991–2020 de la OMM publicadas por NOAA/NCEI (16-11-2026).
  reikiavik: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "1–7°C",   emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El hielo se retira y empiezan las primeras excursiones al Círculo Dorado con menos turistas que en verano.", tags: ["Menos turismo", "Luz creciente", "Círculo Dorado"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "8–14°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Sol de medianoche real — casi 24 horas de luz. La mejor época para explorar tierras altas y carreteras que en invierno están cerradas.", tags: ["Sol de medianoche", "Tierras altas abiertas", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "3–8°C",   emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Empiezan a verse las primeras auroras boreales con la vuelta de la oscuridad. Inicio de curso con la ciudad ya menos turística.", tags: ["Primeras auroras", "Inicio Erasmus", "Días acortándose"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-2–3°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Apenas 4-5 horas de luz, pero temporada alta de auroras boreales y piscinas geotermales humeantes bajo la nieve.", tags: ["Auroras boreales", "Días extremos", "Piscinas termales"] },
  ],
  dublin: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–12°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Los famosos 40 tonos de verde irlandés en pleno esplendor. Clima suave e impredecible, como siempre.", tags: ["Verde intenso", "Clima variable", "Agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "11–19°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos suaves y luminosos, con festivales al aire libre y escapadas a la costa. Lluvia siempre posible, sin excepción.", tags: ["Festivales", "Días largos", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "7–14°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con los pubs llenándose de estudiantes internacionales. Lluvia frecuente, como en cualquier época del año.", tags: ["Inicio Erasmus", "Lluvia frecuente", "Ambiente social"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "2–8°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Suave para ser invierno (rara vez nieva) pero gris y lluvioso, con la vida social trasladándose por completo a los pubs.", tags: ["Invierno suave", "Lluvia constante", "Vida de pub"] },
  ],
  // Edimburgo: Edinburgh Royal Botanic Garden (Met Office, normales 1991–2020).
  edimburgo: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–12°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La ciudad de piedra gris se llena de verde. Clima fresco pero agradable para explorar el casco antiguo a pie.", tags: ["Clima fresco", "Casco antiguo", "Agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "11–19°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Días larguísimos y el Fringe Festival convierte la ciudad entera en un escenario durante todo agosto.", tags: ["Fringe Festival", "Días largos", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "7–13°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con la ciudad recuperando su ritmo académico tras el bullicio festivalero del verano.", tags: ["Inicio Erasmus", "Ritmo académico", "Lluvia frecuente"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "2–8°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío, gris y con días muy cortos, pero el mercado navideño de Princes Street Gardens compensa el ánimo.", tags: ["Mercado navideño", "Días cortos", "Frío húmedo"] },
  ],
  // Atenas: Elliniko (Servicio Meteorológico Nacional de Grecia, EMY, normales 1991–2020; estación en la costa).
  atenas: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "12–21°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Época perfecta para explorar la Acrópolis y el centro histórico sin el calor sofocante del verano.", tags: ["Clima ideal", "Menos turismo", "Terrazas al aire libre"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "23–32°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor intenso pero las playas del Egeo están a un tranvía. La ciudad se vacía en agosto y el turismo se dispara.", tags: ["Calor extremo", "Playas cerca", "Ciudad de turistas"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "16–24°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Excelente para el inicio de curso: temperaturas suaves, menos turistas y el mar todavía templado.", tags: ["Inicio Erasmus", "Mar templado", "Muy agradable"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "8–14°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Suave para ser invierno, con lluvia ocasional pero sin nieve. De los inviernos más templados de esta guía.", tags: ["Invierno suave", "Lluvia ocasional", "Sin nieve"] },
  ],
  // Zagreb: Zagreb-Maksimir (OMM 14240), normales 1991–2020 de la OMM publicadas por NOAA/NCEI (16-11-2026).
  zagreb: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–18°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La Ciudad Alta florece y las terrazas de café reabren en cuanto sale el sol. Época ideal para explorar a pie.", tags: ["Terrazas reabren", "Ciudad Alta", "Muy agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "16–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor seco y agradable. Muchos zagrebienses (y estudiantes) escapan a la costa adriática en pleno agosto.", tags: ["Escapadas a la costa", "Calor seco", "Ciudad más tranquila"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–17°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con clima suave y la vida de café en su máximo esplendor antes del frío.", tags: ["Inicio Erasmus", "Café en terraza", "Colores otoñales"], highlight: true },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-1–6°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío centroeuropeo con mercado navideño galardonado como uno de los mejores de Europa varios años seguidos.", tags: ["Mercado navideño", "Frío seco", "Ambiente festivo"] },
  ],
  // Liubliana: Ljubljana-Bežigrad (OMM 14015), normales 1991–2020 de la OMM publicadas por NOAA/NCEI (16-11-2026).
  liubliana: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–17°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La ciudad más verde de Europa Central florece literalmente. Terrazas junto al río Ljubljanica en pleno esplendor.", tags: ["Ciudad verde", "Terrazas junto al río", "Muy agradable"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "15–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor agradable y excursiones constantes al lago Bled y los Alpes Julianos, a menos de una hora.", tags: ["Lago Bled", "Alpes Julianos", "Escapadas cercanas"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–16°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con los parques de la ciudad tiñéndose de colores otoñales espectaculares.", tags: ["Inicio Erasmus", "Colores otoñales", "Ciudad tranquila"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-1–5°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío centroeuropeo con nieve ocasional; el castillo iluminado sobre la ciudad crea un ambiente muy navideño.", tags: ["Castillo iluminado", "Frío seco", "Nieve ocasional"] },
  ],
  // Tallin: Tallinn-Harku (OMM 26038), normales 1991–2020 de la OMM publicadas por NOAA/NCEI (16-11-2026).
  tallin: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "1–9°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Deshielo báltico y el casco medieval recuperando vida tras el invierno.", tags: ["Deshielo báltico", "Luz creciente", "Casco medieval"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "12–21°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Días larguísimos junto al Báltico y el casco antiguo en su mejor momento del año.", tags: ["Días largos", "Báltico", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "4–10°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con colores otoñales antes de que llegue el frío báltico.", tags: ["Inicio Erasmus", "Colores otoñales", "Días acortándose"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-5–0°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío báltico intenso con nieve casi siempre; el mercado navideño de la plaza medieval es de los más bonitos de Europa.", tags: ["Mercado navideño", "Nieve segura", "Frío báltico"] },
  ],
  // Vilna: Vilnius (LHMT). La normal oficial 1991–2020 solo da la media: mínimas y máximas calculadas con sus datos diarios 1991–2020.
  vilna: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "2–12°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Deshielo y el casco barroco recobrando vida tras el invierno. Užupis se llena de terrazas.", tags: ["Deshielo", "Terrazas en Užupis", "Luz creciente"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "12–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Días largos y agradables, perfectos para explorar el casco barroco y hacer excursiones a Trakai.", tags: ["Días largos", "Trakai cerca", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "4–11°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con colores otoñales espectaculares en los parques de la ciudad.", tags: ["Inicio Erasmus", "Colores otoñales", "Días acortándose"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-5–-1°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío báltico con nieve frecuente; el casco antiguo iluminado por Navidad es de un encanto especial.", tags: ["Nieve frecuente", "Navidad especial", "Frío báltico"] },
  ],
  // Riga: Riga LU (OMM 26422), normales 1991–2020 de la OMM publicadas por NOAA/NCEI (16-11-2026).
  riga: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "3–12°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Deshielo báltico con las fachadas Art Nouveau de Alberta iela recuperando protagonismo bajo el sol.", tags: ["Deshielo báltico", "Art Nouveau", "Luz creciente"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "14–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Días largos y la playa de Jurmala a 30 minutos en tren — la mejor época para descubrir la costa báltica.", tags: ["Jurmala cerca", "Días largos", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "5–11°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con colores otoñales espectaculares en los parques que rodean el casco antiguo.", tags: ["Inicio Erasmus", "Colores otoñales", "Días acortándose"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-4–1°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío báltico intenso con nieve casi siempre; el Mercado Central y sus luces navideñas compensan el frío.", tags: ["Mercado Central", "Nieve segura", "Frío báltico"] },
  ],
  // Bratislava: Bratislava, aeropuerto (OMM 11816), normales 1991–2020 de la OMM publicadas por NOAA/NCEI (16-11-2026).
  bratislava: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–17°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El Danubio y el casco antiguo recobran vida. Época ideal para explorar la ciudad y sus alrededores a pie.", tags: ["Clima agradable", "Danubio en flor", "Terrazas"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "15–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor agradable y escapadas constantes a Viena o Budapest, ambas a menos de 3 horas.", tags: ["Escapadas cercanas", "Calor seco", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "7–16°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con el casco antiguo tiñéndose de colores otoñales junto al Danubio.", tags: ["Inicio Erasmus", "Colores otoñales", "Danubio"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-2–4°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío centroeuropeo con mercado navideño en la plaza principal, uno de los más entrañables de la región.", tags: ["Mercado navideño", "Frío seco", "Ambiente festivo"] },
  ],
  // Bucarest: București-Băneasa (OMM 15420), normales 1991–2020 de la OMM publicadas por NOAA/NCEI (16-11-2026).
  bucarest: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–18°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El parque Herăstrău y las terrazas del centro recobran vida con un clima muy agradable.", tags: ["Clima ideal", "Parques en flor", "Terrazas"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "15–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor intenso, típico de un clima continental extremo. La vida nocturna se traslada a terrazas y rooftops.", tags: ["Calor intenso", "Vida nocturna", "Rooftops"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "6–18°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con temperaturas suaves y los parques de la ciudad en pleno esplendor de color.", tags: ["Inicio Erasmus", "Colores otoñales", "Muy agradable"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-4–5°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío continental con nieve frecuente; los mercados navideños compensan las bajas temperaturas.", tags: ["Nieve frecuente", "Mercados navideños", "Frío intenso"] },
  ],
  // Sofia: Sofia (OMM 15614), normales 1991–2020 de la OMM publicadas por NOAA/NCEI (16-11-2026).
  sofia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–17°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El monte Vitosha reverdece y la ciudad recobra vida con clima muy agradable.", tags: ["Vitosha en flor", "Clima ideal", "Terrazas"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "15–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor seco y senderismo constante en Vitosha, con la montaña como refugio del calor de la ciudad.", tags: ["Senderismo", "Calor seco", "Montaña cerca"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "6–17°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con colores otoñales espectaculares en las laderas de Vitosha.", tags: ["Inicio Erasmus", "Colores otoñales", "Vitosha en colores"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-3–5°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Nieve habitual en Vitosha — de las pocas capitales del mundo donde se puede esquiar a 30 minutos del centro.", tags: ["Esquí urbano", "Nieve segura", "Vitosha nevado"] },
  ],
  // Ginebra: Genève-Cointrin (OMM 06700), normales 1991–2020 de la OMM publicadas por NOAA/NCEI (16-11-2026).
  ginebra: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–16°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El lago Lemán despierta y las terrazas junto al Jet d'Eau reabren con los primeros días templados.", tags: ["Lago en flor", "Terrazas junto al lago", "Clima variable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "14–26°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "La mejor época: baños en el lago, Fêtes de Genève en agosto y los Alpes nevados de fondo todavía en junio.", tags: ["Baño en el lago", "Fêtes de Genève", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "7–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con clima suave; las viñas del cantón se tiñen de colores antes de la vendimia.", tags: ["Inicio Erasmus", "Viñedos otoñales", "Clima suave"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-1–6°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío húmedo con niebla ocasional sobre el lago (la 'bise'), pero ski en los Alpes a menos de una hora.", tags: ["Ski cerca", "Niebla sobre el lago", "Frío húmedo"] },
  ],
  // Florencia: Firenze Peretola (OMM 16170, normales 1991–2020 publicadas por NOAA/NCEI; la que usa el ISPRA).
  florencia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–20°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Época perfecta para pasear el centro histórico sin las aglomeraciones ni el calor del verano.", tags: ["Clima ideal", "Menos turismo", "Muy agradable"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "18–31°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor sofocante en el valle del Arno y turismo al máximo. Muchos florentinos escapan a la costa.", tags: ["Calor extremo", "Turismo masivo", "Escapadas a la costa"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "11–21°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Vendimia en la Toscana, menos turistas y arranque de curso con clima todavía cálido.", tags: ["Inicio Erasmus", "Vendimia toscana", "Menos turismo"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "2–12°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío húmedo pero suave, raramente nieva. Mercados navideños y museos sin colas.", tags: ["Invierno suave", "Museos sin colas", "Lluvia ocasional"] },
  ],
  hamburgo: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–14°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El Alster y los parques reviven; clima todavía fresco pero con más horas de luz cada semana.", tags: ["Alster en flor", "Días más largos", "Aún fresco"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "12–22°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos suaves con terrazas junto al puerto y festivales al aire libre. La mejor época para descubrir la ciudad.", tags: ["Terrazas del puerto", "Festivales", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "6–14°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con lluvia frecuente del norte de Alemania, pero la vida en Sternschanze no para.", tags: ["Inicio Erasmus", "Lluvia frecuente", "Muy social"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "0–5°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío húmedo con viento del Mar del Norte; los mercados navideños junto al Rathaus compensan el gris.", tags: ["Mercados navideños", "Viento marino", "Raramente nieva"] },
  ],
  gante: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–15°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Los canales de Graslei y Korenlei recuperan las terrazas en cuanto asoma el sol.", tags: ["Terrazas junto al canal", "Clima variable", "Ciudad en flor"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "13–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Los Gentse Feesten (10 días de festival callejero gratuito) convierten julio en la mejor época del año.", tags: ["Gentse Feesten", "Días largos", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "7–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Arranca el curso en una de las mayores universidades de Bélgica y Overpoort recupera su ritmo habitual.", tags: ["Inicio Erasmus", "Vida estudiantil", "Lluvia frecuente"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "1–7°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío húmedo típico belga, pero el mercado navideño junto al Gravensteen tiene mucho encanto.", tags: ["Mercado navideño", "Frío húmedo", "Raramente nieva"] },
  ],
  lyon: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–18°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave y cada vez más soleada. Terrazas en la Presqu'île y paseos por los muelles del Ródano.", tags: ["Terrazas", "Muelles del Ródano", "Agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "16–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos, con olas de calor. La ciudad vive en los muelles y en el Parc de la Tête d'Or.", tags: ["Calor", "Muelles", "Tête d'Or"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "9–17°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso, temperaturas suaves y el Beaujolais nouveau en noviembre.", tags: ["Inicio Erasmus", "Temperaturas suaves", "Beaujolais"], highlight: true },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "2–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío y gris, con niebla junto a los ríos. En diciembre, la Fête des Lumières ilumina la ciudad.", tags: ["Fête des Lumières", "Niebla", "Frío"] },
  ],
  coimbra: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "10–21°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave y soleada. En mayo, la Queima das Fitas llena la ciudad de estudiantes.", tags: ["Queima das Fitas", "Terrazas", "Agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "15–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos y secos. La ciudad se vacía de estudiantes y las playas de Figueira da Foz quedan cerca.", tags: ["Calor seco", "Ciudad tranquila", "Playas cercanas"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "11–23°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: temperaturas suaves, arranque de curso y la recepción a los nuevos estudiantes.", tags: ["Inicio Erasmus", "Temperaturas suaves", "Vida universitaria"], highlight: true },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "6–16°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Inviernos suaves pero lluviosos, y fríos dentro de casa: las viviendas antiguas apenas tienen calefacción.", tags: ["Lluvia", "Suave", "Casas frías"] },
  ],
  lovaina: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–16°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave y cambiante; las terrazas del Oude Markt vuelven a llenarse.", tags: ["Terrazas","Oude Markt","Lluvias"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos templados. Muchos estudiantes se van, pero la ciudad sigue viva con festivales.", tags: ["Templado","Festivales","Ciudad tranquila"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–16°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso, kots llenos y el Oude Markt a tope.", tags: ["Inicio Erasmus","Oude Markt","Lluvia frecuente"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Gris, húmedo y frío sin extremos. Los bares y la vida universitaria lo compensan.", tags: ["Gris","Húmedo","Vida en los bares"] },
  ],
  utrecht: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave y ventosa; los werven y sus terrazas junto al agua vuelven a abrir.", tags: ["Werven","Terrazas","Viento"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–22°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos templados, ideales para la bici y los canales.", tags: ["Templado","Canales","Bici"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y la ciudad llena de estudiantes.", tags: ["Inicio Erasmus","Lluvia frecuente","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Gris, húmedo y ventoso, con heladas puntuales. Vida social en cafés y asociaciones.", tags: ["Gris","Viento","Cafés"] },
  ],
  groningen: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–14°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca y ventosa; la Grote Markt recupera sus terrazas.", tags: ["Fresca","Viento","Terrazas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "11–22°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos templados y días largos, perfectos para la bici y el campo frisón.", tags: ["Templado","Días largos","Bici"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y una ciudad llena de estudiantes.", tags: ["Inicio Erasmus","Lluvia frecuente","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío, húmedo y con mucho viento; heladas habituales. La vida estudiantil no para.", tags: ["Frío húmedo","Viento","Vida estudiantil"] },
  ],
  maastricht: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada; las terrazas del Vrijthof se llenan y las colinas de Limburgo invitan a pedalear.", tags: ["Terrazas","Bici","Templada"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos agradables, algo más cálidos que en la costa neerlandesa, para salir en bici hacia Bélgica.", tags: ["Días largos","Bici","Agradable"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso, Mosa otoñal y lluvia frecuente.", tags: ["Inicio Erasmus","Lluvia frecuente","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío húmedo y días cortos; el centro se ilumina con el mercado navideño.", tags: ["Frío húmedo","Mercado navideño","Días cortos"] },
  ],
  colonia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–16°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave; las orillas del Rin y los Biergärten recuperan el ambiente.", tags: ["Rin","Biergarten","Suave"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos cálidos para Alemania, con tardes largas junto al Rin.", tags: ["Cálido","Días largos","Junto al Rin"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y, el 11 de noviembre, el inicio oficial del Carnaval.", tags: ["Inicio Erasmus","11.11","Lluvia frecuente"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Gris pero suave para Alemania; mercados navideños y, en febrero o marzo, el Carnaval.", tags: ["Mercados navideños","Carnaval","Gris"] },
  ],
  // Heidelberg: normales 1991–2020 de la estación DWD de Mannheim (a unos 18 km, misma llanura del Rin).
  heidelberg: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–17°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera temprana y templada; el Philosophenweg y el Neckar se llenan de gente.", tags: ["Templada","Neckar","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–26°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos, de los más cálidos de Alemania; iluminación del castillo con fuegos artificiales en verano.", tags: ["Calor","Castillo iluminado","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–16°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y colinas del Odenwald con colores de otoño.", tags: ["Inicio Erasmus","Colores de otoño","Senderismo"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Fresco y gris, con heladas algunas noches; mercados navideños en la Altstadt.", tags: ["Fresco","Mercados navideños","Heladas"] },
  ],
  friburgo: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–17°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera temprana y soleada; las terrazas de la Altstadt se llenan pronto.", tags: ["Soleada","Terrazas","Senderismo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–26°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos cálidos, de los más soleados de Alemania, con la Selva Negra para refrescarse.", tags: ["Calor","Selva Negra","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–16°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y vendimia en los viñedos cercanos.", tags: ["Inicio Erasmus","Vendimia","Colores de otoño"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Fresco en la ciudad y nieve en las cumbres de la Selva Negra para esquiar.", tags: ["Fresco","Esquí cerca","Mercados navideños"] },
  ],
  leipzig: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca que se templa en mayo; los parques y canales recuperan vida.", tags: ["Fresca","Parques","Canales"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos cálidos para bañarse en los lagos de la antigua zona minera, como el Cospudener See.", tags: ["Lagos","Cálido","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y una agenda cultural a tope.", tags: ["Inicio Erasmus","Cultura","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-1–5°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío continental, con heladas frecuentes; mercado navideño en el centro.", tags: ["Frío","Heladas","Mercado navideño"] },
  ],
  dresde: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–14°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca; las orillas del Elba se llenan de gente en cuanto sale el sol.", tags: ["Fresca","Elba","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos cálidos, ideales para escalar y hacer senderismo en la Suiza Sajona.", tags: ["Cálido","Suiza Sajona","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–13°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y la Äußere Neustadt a pleno rendimiento.", tags: ["Inicio Erasmus","Neustadt","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-1–4°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío continental, con heladas; el Striezelmarkt, uno de los mercados navideños más antiguos de Alemania.", tags: ["Frío","Heladas","Striezelmarkt"] },
  ],
  // Tubinga: normales 1991–2020 de la estación de Stuttgart-Echterdingen (a unos 20 km), la más cercana con serie completa.
  tubinga: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada; el Neckar y el Jardín Botánico vuelven a llenarse de estudiantes.", tags: ["Templada","Neckar","Al aire libre"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos agradables, la temporada de las Stocherkähne sobre el Neckar.", tags: ["Stocherkahn","Agradable","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y colinas del valle del Neckar con colores de otoño.", tags: ["Inicio Erasmus","Colores de otoño","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-2–5°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío, con heladas frecuentes; la Altstadt se vuelve muy acogedora.", tags: ["Frío","Heladas","Ambiente acogedor"] },
  ],
  // Toulouse: Toulouse-Blagnac.
  toulouse: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–18°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada; las terrazas de la Place Saint-Pierre se llenan junto al Garona.", tags: ["Templada","Terrazas","Garona"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "16–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos; muchos estudiantes se escapan a los Pirineos o a la costa.", tags: ["Calor","Pirineos","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "10–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y otoño suave.", tags: ["Inicio Erasmus","Suave","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–10°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave, con algunas heladas; la ciudad rosa sigue llena de estudiantes.", tags: ["Suave","Heladas puntuales","Vida estudiantil"] },
  ],
  // Burdeos: Bordeaux-Mérignac.
  burdeos: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–18°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave; los muelles del Garona y el Miroir d'eau se llenan de gente.", tags: ["Suave","Muelles","Terrazas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "16–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos cálidos, con posibles olas de calor; escapadas a Arcachon y a la Dune du Pilat.", tags: ["Cálido","Playa","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "10–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y vendimia en los viñedos cercanos.", tags: ["Inicio Erasmus","Vendimia","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "4–11°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y húmedo, con lluvia frecuente.", tags: ["Suave","Lluvia","Ambiente acogedor"] },
  ],
  // Nantes: Nantes-Bouguenais.
  nantes: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–16°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca y cambiante; las orillas del Loira recuperan vida.", tags: ["Fresca","Loira","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos agradables, con olas de calor puntuales; Le Voyage à Nantes llena la ciudad de arte.", tags: ["Agradable","Voyage à Nantes","Costa cerca"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "9–18°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y una ciudad llena de estudiantes.", tags: ["Inicio Erasmus","Lluvia frecuente","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–10°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y lluvioso, aunque con heladas algunas noches.", tags: ["Suave","Lluvia","Heladas"] },
  ],
  // Montpellier: Montpellier-Aéroport.
  montpellier: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "10–19°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera soleada y templada; la Place de la Comédie vive en la calle.", tags: ["Soleada","Terrazas","Templada"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "18–29°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos y secos, con las playas de Palavas y La Grande-Motte a mano.", tags: ["Calor","Playa","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "12–21°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso con días todavía cálidos; ojo a los episodios de lluvia intensa.", tags: ["Inicio Erasmus","Cálido","Lluvias intensas"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "4–13°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y soleado, aunque con algún día de tramontana fría.", tags: ["Suave","Soleado","Viento"] },
  ],
  // Marsella: Marignane, aeropuerto Marseille-Provence (a unos 20 km del centro).
  marsella: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "10–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera soleada, buena época para recorrer las Calanques a pie.", tags: ["Soleada","Calanques","Senderismo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "19–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos y secos; en las Calanques hay restricciones por riesgo de incendio.", tags: ["Calor","Playa","Riesgo de incendio"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "12–21°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso con el mar todavía templado.", tags: ["Inicio Erasmus","Mar templado","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "4–12°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y luminoso, con días de mistral fuerte y frío.", tags: ["Suave","Mistral","Luminoso"] },
  ],
  // Lille: Lille-Lesquin (Météo-France).
  lille: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca y cambiante; la Grand Place y las terrazas recuperan vida.", tags: ["Fresca","Terrazas","Lluvia"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos templados y días largos, buenos para escapadas a Bruselas o la costa.", tags: ["Templado","Días largos","Escapadas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "8–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y, a principios de septiembre, la Braderie.", tags: ["Inicio Erasmus","Braderie","Lluvia frecuente"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "2–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno gris y húmedo, con algunas heladas; mercado navideño en el centro.", tags: ["Gris","Húmedo","Mercado navideño"] },
  ],
  // Estrasburgo: Strasbourg-Entzheim (Météo-France).
  estrasburgo: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–17°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada; las orillas del Ill y la Petite France se llenan de gente.", tags: ["Templada","Petite France","Paseos en bici"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–26°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos cálidos, ideales para pedalear junto al Rin hasta Kehl.", tags: ["Cálido","Bici","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–16°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y vendimia en la ruta del vino de Alsacia.", tags: ["Inicio Erasmus","Vendimia","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas frecuentes; el mercado navideño llena la ciudad.", tags: ["Frío","Heladas","Mercado navideño"] },
  ],
  // Grenoble: Grenoble-Le Versoud (Météo-France), en el valle junto a la ciudad; temperaturas 1999–2020.
  grenoble: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–19°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada en el valle y todavía nieve en las cumbres.", tags: ["Templada","Nieve arriba","Senderismo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "15–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos en el valle; las montañas cercanas sirven de refugio.", tags: ["Calor","Montaña","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "8–18°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y montañas con colores de otoño.", tags: ["Inicio Erasmus","Colores de otoño","Senderismo"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-1–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Inviernos fríos con heladas en la ciudad y temporada de esquí en las estaciones cercanas.", tags: ["Frío","Heladas","Esquí"] },
  ],
  // Rennes: Rennes-Saint-Jacques (Météo-France).
  rennes: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–16°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave y cambiante; el Thabor y las terrazas recuperan vida.", tags: ["Suave","Parques","Lluvia"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos templados, buenos para escapadas a la costa bretona.", tags: ["Templado","Costa cerca","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "9–17°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y una ciudad llena de estudiantes.", tags: ["Inicio Erasmus","Lluvia frecuente","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–10°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y lluvioso; en diciembre, Les Trans Musicales.", tags: ["Suave","Lluvia","Trans Musicales"] },
  ],
  // Venecia: Venezia-Tessera (OMM 1991–2020). La máxima de marzo falta en la serie: la de primavera (18°C)
  // es una estimación a partir de la media mensual, pendiente de fuente (ver VERIFICACION.md).
  venecia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "9–18°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada, la mejor época para recorrer la laguna antes del calor.", tags: ["Templada","Laguna","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "19–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos y húmedos; el Lido y sus playas a un vaporetto.", tags: ["Calor","Humedad","Lido"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "10–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso; en otoño puede haber acqua alta en las zonas bajas.", tags: ["Inicio Erasmus","Acqua alta","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y húmedo, con niebla; al final del invierno, el Carnaval.", tags: ["Frío húmedo","Niebla","Carnaval"] },
  ],
  // Pisa: Pisa-San Giusto (OMM, normales 1991–2020).
  pisa: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–19°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada, buena para pedalear junto al Arno y escaparse a la costa.", tags: ["Templada","Bici","Costa cerca"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "17–29°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos; a finales de junio, el Gioco del Ponte sobre el Arno.", tags: ["Calor","Gioco del Ponte","Playa"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "11–21°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y temperaturas todavía suaves.", tags: ["Inicio Erasmus","Suave","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–12°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y lluvioso, con alguna helada de madrugada.", tags: ["Suave","Lluvia","Fresco"] },
  ],
  // Siena: estación de Siena (Consorzio LaMMA, normales 1991–2020).
  siena: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–18°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada, perfecta para recorrer las colinas toscanas.", tags: ["Templada","Colinas","Senderismo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "17–29°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos con los dos Palios: el 2 de julio y el 16 de agosto.", tags: ["Calor","Palio","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "11–20°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y vendimia en el Chianti.", tags: ["Inicio Erasmus","Vendimia","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–10°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno fresco, con algunas heladas y una ciudad muy tranquila.", tags: ["Fresco","Heladas","Tranquilo"] },
  ],
  // Bari: Bari-Palese (OMM, normales 1991–2020).
  bari: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "9–19°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada; en mayo, la Festa di San Nicola llena la ciudad.", tags: ["Templada","San Nicola","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "19–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos largos y calurosos, con las playas a un paseo del centro.", tags: ["Calor","Playa","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "13–22°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y el mar todavía templado.", tags: ["Inicio Erasmus","Mar templado","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "5–13°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave junto al Adriático, con días de viento.", tags: ["Suave","Viento","Tranquilo"] },
  ],
  // Trieste: Trieste (OMM 16110, normales 1991–2020).
  trieste: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "11–18°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada junto al mar; la bora todavía puede soplar con fuerza.", tags: ["Templada","Mar","Bora"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "20–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos cálidos; los triestinos se bañan en el paseo de Barcola.", tags: ["Calor","Baños en Barcola","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "13–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y, en octubre, la Barcolana.", tags: ["Inicio Erasmus","Barcolana","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "5–10°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave junto al Adriático, con días de bora muy fría.", tags: ["Suave","Bora","Viento"] },
  ],
  // Bérgamo: Bergamo-Orio al Serio (OMM 16076, normales 1991–2020).
  bergamo: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–18°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada, buena para los lagos y los Prealpes.", tags: ["Templada","Lagos","Senderismo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "18–29°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos en la llanura; los lagos y la montaña refrescan.", tags: ["Calor","Lagos","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "10–18°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y colores de otoño en los Prealpes.", tags: ["Inicio Erasmus","Colores de otoño","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas y niebla en la llanura.", tags: ["Frío","Heladas","Niebla"] },
  ],
  // Parma: Parma urbana (ARPAE, estación 6031, normales 1991–2020).
  parma: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "9–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada, buena para salir en bici y recorrer la Emilia.", tags: ["Templada","Bici","Escapadas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "18–31°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos y húmedos en plena llanura del Po.", tags: ["Calor","Humedad","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "10–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y, en otoño, el Festival Verdi.", tags: ["Inicio Erasmus","Festival Verdi","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas y niebla en la llanura.", tags: ["Frío","Heladas","Niebla"] },
  ],
  // Ferrara: Malborghetto di Boara, municipio de Ferrara (ARPAE, estación 3, normales 1991–2020).
  ferrara: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada, ideal para recorrer las murallas en bici.", tags: ["Templada","Bici","Murallas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "17–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos y húmedos, cerca del delta del Po.", tags: ["Calor","Humedad","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "10–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y temperaturas suaves.", tags: ["Inicio Erasmus","Suave","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas y niebla en la llanura.", tags: ["Frío","Heladas","Niebla"] },
  ],
  // Lecce: Lecce (OMM 16332, normales 1991–2020).
  lecce: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "9–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada, ideal para recorrer el barroco y estrenar la costa.", tags: ["Templada","Barroco","Costa"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "18–32°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos y secos: el Salento vive en la playa.", tags: ["Calor","Playas","Notte della Taranta"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "13–23°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y el mar todavía templado.", tags: ["Inicio Erasmus","Mar templado","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "4–14°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave, con días frescos y algo de lluvia.", tags: ["Suave","Lluvia","Tranquilo"] },
  ],
  // Cagliari: Cagliari-Elmas (OMM 16560, normales 1991–2020).
  cagliari: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "10–21°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave, con Sant'Efisio el 1 de mayo.", tags: ["Suave","Sant'Efisio","Aire libre"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "19–31°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos: el Poetto se convierte en el centro de la ciudad.", tags: ["Calor","Poetto","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "14–24°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y todavía tiempo de playa.", tags: ["Inicio Erasmus","Playa","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "6–15°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave junto al mar, con viento algunos días.", tags: ["Suave","Viento","Tranquilo"] },
  ],
  // Verona: Verona-Villafranca (OMM 16090, normales 1991–2020).
  verona: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–19°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada, buena para el lago de Garda y las colinas.", tags: ["Templada","Lago de Garda","Colinas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "18–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos, con la temporada de ópera en la Arena.", tags: ["Calor","Ópera en la Arena","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "9–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y vendimia en los alrededores.", tags: ["Inicio Erasmus","Vendimia","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas y niebla en la llanura.", tags: ["Frío","Heladas","Niebla"] },
  ],
  // Palermo: Osservatorio Astronomico di Palermo «G.S. Vaiana», Palazzo Reale (INAF, normales 1991–2020).
  palermo: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "13–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada, buena para recorrer el centro histórico y los mercados.", tags: ["Templada","Mercados","Aire libre"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "22–29°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos calurosos: la ciudad se va a Mondello y en julio celebra el Festino de Santa Rosalía.", tags: ["Calor","Mondello","Santa Rosalía"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "18–24°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época para llegar: arranque de curso y todavía tiempo de playa.", tags: ["Inicio Erasmus","Playa","Muy animada"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "10–16°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave junto al mar, aunque es la época de más lluvia.", tags: ["Suave","Lluvia","Tranquilo"] },
  ],
  // Caserta: Grazzanise (OMM 16253, a unos 22 km, normales 1991–2020 de la OMM).
  caserta: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave, perfecta para el parque de la Reggia.", tags: ["Suave","Reggia","Aire libre"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "18–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano caluroso y seco.", tags: ["Calor","Costa","Nápoles"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "12–23°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Nápoles"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "4–14°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave, con algo de lluvia.", tags: ["Suave","Lluvia","Tranquilo"] },
  ],
  // Covilhã: Fundão (IPMA, estación 698, a unos 16 km, normales 1991–2020). La parte alta de Covilhã es algo más fría.
  covilha: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–19°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca en la sierra.", tags: ["Fresca","Sierra","Senderismo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "15–31°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano caluroso y seco en el valle.", tags: ["Calor","Seco","Serra da Estrela"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "10–21°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Excursiones"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–13°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas; nieve en la sierra.", tags: ["Frío","Heladas","Nieve en la Torre"] },
  ],
  // Módena: Osservatorio Geofisico de UNIMORE (normales 1991–2020, estación urbana).
  modena: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "11–19°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera agradable para recorrer el centro en bici.", tags: ["Templada","Bici","Aire libre"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "21–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano caluroso y húmedo.", tags: ["Calor","Húmedo","Fiestas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "12–18°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado: arranque de curso y Welcome Week de ESN.", tags: ["Inicio Erasmus","Templado","ESN"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y con niebla.", tags: ["Frío","Niebla","Tortellini"] },
  ],
  // Pavía: Milano Linate (OMM 16080, a unos 31 km, normales 1991–2020 de la OMM).
  pavia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "9–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada para el Tesino y los colegios.", tags: ["Templada","Tesino","Aire libre"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "18–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano caluroso y húmedo en la llanura.", tags: ["Calor","Húmedo","Lagos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "10–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Niebla"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con niebla en la llanura.", tags: ["Frío","Niebla","Milán cerca"] },
  ],
  // Braganza: Bragança (IPMA, estación 575, normales 1991–2020).
  braganza: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–18°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca en la sierra.", tags: ["Fresca","Montesinho","Senderismo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–29°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano caluroso y seco.", tags: ["Calor","Seco","Montesinho"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "8–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Castañas"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–10°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con muchas heladas.", tags: ["Frío","Heladas","Tranquilo"] },
  ],
  // Newcastle: Tynemouth (Met Office, en la costa, a unos 12 km, normales 1991–2020).
  newcastle: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–11°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca y con días cada vez más largos.", tags: ["Fresca","Días largos","Costa"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–18°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado, sin calor.", tags: ["Templado","Quayside","Costa"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "8–13°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco: arranque de curso y freshers.", tags: ["Inicio Erasmus","Fresco","Freshers"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y gris, con pocas horas de luz.", tags: ["Frío","Gris","Pubs"] },
  ],
  // Geel: Antwerpen-Deurne (OMM 06450, a unos 37 km; normales OMM 1991–2020 publicadas por NOAA/NCEI). Es la estación con mínimas y máximas más cercana; Uccle (Bruselas) queda a 60 km.
  geel: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave en la Campine.", tags: ["Suave","Bici","Brezales"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Bici","Festivales"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco y lluvioso para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Lluvia"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y húmedo.", tags: ["Frío","Húmedo","Tranquilo"] },
  ],
  // Campobasso: Campobasso (OMM 16252, en la ciudad, normales OMM 1991–2020 publicadas por NOAA/NCEI).
  campobasso: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca en los Apeninos.", tags: ["Fresca","Montaña","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "17–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido, con noches más frescas que en la costa.", tags: ["Cálido","Noches frescas","Fiestas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "11–17°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "2–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío.", tags: ["Frío","Montaña","Tranquilo"] },
  ],
  // Angers: Angers-Beaucouzé (Météo-France, ficha 49020001, normales 1991–2020).
  angers: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–17°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave en el valle del Loira.", tags: ["Suave","Loira","Terrazas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Río Maine","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "9–17°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño suave para empezar el curso.", tags: ["Inicio Erasmus","Suave","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–9°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y húmedo.", tags: ["Suave","Húmedo","Pocas heladas"] },
  ],
  // Enschede: Twenthe (OMM 06290, KNMI; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  enschede: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca, buena para la bici.", tags: ["Fresca","Bici","Días largos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "11–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Terrazas","Bici"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco y lluvioso para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y húmedo, con heladas.", tags: ["Frío","Húmedo","Heladas"] },
  ],
  // Gotinga: Göttingen (OMM 10444; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  gotinga: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–14°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca.", tags: ["Fresca","Terrazas","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "11–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Terrazas","Excursiones"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-1–5°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas frecuentes.", tags: ["Frío","Heladas","Días cortos"] },
  ],
  // Santarém: Santarém/Fonte Boa (IPMA, estación 734, a unos 6 km; normales 1991–2020, serie híbrida del IPMA).
  santarem: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "10–22°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada y soleada.", tags: ["Templada","Soleada","Tajo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "16–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano caluroso y seco.", tags: ["Calor","Seco","Noches suaves"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "13–24°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño cálido para empezar el curso.", tags: ["Inicio Erasmus","Cálido","Primeras lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "6–16°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y lluvioso.", tags: ["Suave","Lluvias","Sin nieve"] },
  ],
  // Luneburgo: Boizenburg (OMM 10249, a unos 24 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  luneburgo: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–14°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca.", tags: ["Fresca","Terrazas","Bici"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Río Ilmenau","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–13°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-1–4°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y gris.", tags: ["Frío","Gris","Heladas"] },
  ],
  // Erfurt: Erfurt-Weimar (OMM 10554, en el aeropuerto, a unos 5 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  erfurt: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–13°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca.", tags: ["Fresca","Parques","Terrazas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Terrazas","Festivales"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "5–13°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-2–3°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas frecuentes.", tags: ["Frío","Heladas","Mercado navideño"] },
  ],
  // Castellanza: Novara/Cameri (OMM 16064, a unos 20 km al oeste; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  castellanza: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–18°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada en la llanura lombarda.", tags: ["Templada","Llanura","Milán cerca"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "17–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano caluroso y húmedo.", tags: ["Calor","Húmedo","Lagos cerca"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "8–18°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Niebla"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-1–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con niebla y heladas.", tags: ["Frío","Niebla","Heladas"] },
  ],
  // Bergen: Bergen-Florida (OMM 01317, en la ciudad; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  bergen: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–11°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca y lluviosa.", tags: ["Fresca","Lluvia","Días largos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–19°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano fresco, con días muy largos.", tags: ["Fresco","Fiordos","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–12°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco y muy lluvioso para empezar el curso.", tags: ["Inicio Erasmus","Lluvia","Fresco"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–5°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave para Noruega, pero oscuro y lluvioso.", tags: ["Oscuro","Lluvia","Suave"] },
  ],
  // Arnhem: Deelen (OMM 06275, a unos 8 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  arnhem: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca, buena para la bici.", tags: ["Fresca","Bici","Parques"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Rin","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco y lluvioso para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y húmedo, con heladas.", tags: ["Frío","Húmedo","Heladas"] },
  ],
  // Flesinga: Vlissingen (OMM 06310, en la ciudad; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  flesinga: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–13°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca junto al mar.", tags: ["Fresca","Viento","Playa"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "15–21°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado, con playa.", tags: ["Templado","Playa","Brisa"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "10–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado por el mar para empezar el curso.", tags: ["Inicio Erasmus","Templado","Viento"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave para los Países Bajos, con viento.", tags: ["Suave","Viento","Húmedo"] },
  ],
  // Ratisbona: Regensburg (OMM 10776, a unos 3 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  ratisbona: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–16°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca, la ciudad sale al Danubio.", tags: ["Fresca","Danubio","Terrazas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Biergarten","Danubio"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "5–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-2–3°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Mercado navideño"] },
  ],
  // Wurzburgo: Würzburg (OMM 10655, a unos 3 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  wurzburgo: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada junto al Main.", tags: ["Templada","Río Main","Terrazas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Viñedos","Río Main"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado, época de vendimia, para empezar el curso.", tags: ["Inicio Erasmus","Templado","Vendimia"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-1–5°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Días cortos"] },
  ],
  // Malinas: Brussels National, Zaventem (OMM 06451, a unos 15 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  malinas: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave.", tags: ["Suave","Bici","Terrazas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Terrazas","Festivales"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco y lluvioso para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y húmedo.", tags: ["Frío","Húmedo","Gris"] },
  ],
  // Belfort: Luxeuil (OMM 07292, a unos 41 km; normales OMM 1991–2020 publicadas por NOAA/NCEI). Es la estación con normal completa más cercana: la de Dorans (Météo-France) solo cubre 2009–2020.
  belfort: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–16°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca.", tags: ["Fresca","Vosgos","Senderismo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Festivales","Lagos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–16°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Bosques"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-1–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Nieve cerca"] },
  ],
  // Debrecen: Debrecen (OMM 12882, en el aeropuerto, a unos 5 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  debrecen: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–17°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada.", tags: ["Templada","Parques","Terrazas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "15–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano caluroso y seco.", tags: ["Calor","Festivales","Balnearios"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–16°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-3–4°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Nieve"] },
  ],
  // Aveiro: Aveiro/Universidade (IPMA, estación 702, en la ciudad; normales 1991–2020).
  aveiro: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "11–19°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave junto a la ría.", tags: ["Suave","Ría","Bici"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "16–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado por el mar.", tags: ["Templado","Playas","Brisa"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "13–21°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Primeras lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "7–15°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y lluvioso.", tags: ["Suave","Lluvias","Heladas muy raras"] },
  ],
  // Vila Real: Vila Real (IPMA, estación 567, en la ciudad; normales 1991–2020).
  "vila-real": [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–18°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada.", tags: ["Templada","Douro","Senderismo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano caluroso y seco.", tags: ["Calor","Seco","Viñedos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "10–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado, época de vendimia, para empezar el curso.", tags: ["Inicio Erasmus","Vendimia","Templado"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–11°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío.", tags: ["Frío","Heladas","Tranquilo"] },
  ],
  // Nottingham: Watnall (OMM 03354, a unos 9 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  nottingham: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–13°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca.", tags: ["Fresca","Parques","Días largos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–21°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Terrazas","Festivales"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco: arranque de curso y freshers.", tags: ["Inicio Erasmus","Fresco","Freshers"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "2–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y gris.", tags: ["Frío","Gris","Pubs"] },
  ],
  // Ostrava: Ostrava/Mošnov (OMM 11782, en el aeropuerto, a unos 21 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  ostrava: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–14°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca.", tags: ["Fresca","Parques","Terrazas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido, con festivales.", tags: ["Cálido","Festivales","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-3–3°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Nieve"] },
  ],
  // Zlín: Holešov (OMM 11774, a unos 13 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  zlin: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca.", tags: ["Fresca","Colinas","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Terrazas","Excursiones"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "5–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Bosques"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-4–3°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Nieve"] },
  ],
  // Umeå: Umeå Flygplats (OMM 02286, a unos 4 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  umea: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "-3–7°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fría, con mucha luz.", tags: ["Fría","Días largos","Deshielo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "9–19°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano suave, con noches casi sin oscuridad.", tags: ["Suave","Días larguísimos","Lagos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "0–8°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño frío para empezar el curso.", tags: ["Inicio Erasmus","Frío","Días cortos"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-10–-2°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno muy frío, oscuro y nevado.", tags: ["Muy frío","Nieve","Pocas horas de luz"] },
  ],
  // Brugg: Buchs/Aarau (OMM 06633, a unos 15 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  brugg: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada junto al Aar.", tags: ["Templada","Río Aar","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Baños en el río","Alpes"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Niebla"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-1–5°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con niebla y heladas.", tags: ["Frío","Niebla","Esquí cerca"] },
  ],
  // Aquisgrán: Maastricht-Aachen Airport (OMM 06380, a unos 27 km; normales OMM 1991–2020 publicadas por NOAA/NCEI). La estación de Aachen (10501) solo tiene 20–21 años de datos.
  aquisgran: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave.", tags: ["Suave","Terrazas","Bici"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Terrazas","Festivales"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco y lluvioso para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y húmedo.", tags: ["Frío","Húmedo","Mercado navideño"] },
  ],
  // Bamberg: Bamberg (OMM 10675, a unos 3 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  bamberg: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "3–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca, la ciudad sale al río.", tags: ["Fresca","Río Regnitz","Terrazas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Biergarten","Río"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "5–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-2–5°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Mercado navideño"] },
  ],
  // Bonn: Köln-Bonn (OMM 10513, en el aeropuerto, a unos 15 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  bonn: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–16°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave junto al Rin.", tags: ["Suave","Rin","Parques"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Rin","Biergarten"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y húmedo.", tags: ["Suave","Húmedo","Mercado navideño"] },
  ],
  // Bremen: Bremen (OMM 10224, en el aeropuerto, a unos 4 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  bremen: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–14°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca junto al Weser.", tags: ["Fresca","Weser","Parques"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado, sin grandes calores.", tags: ["Templado","Weser","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–5°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y húmedo.", tags: ["Frío","Húmedo","Mercado navideño"] },
  ],
  // Fráncfort: Frankfurt/Main (OMM 10637, en el aeropuerto, a unos 15 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  francfort: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–16°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave junto al Meno.", tags: ["Suave","Meno","Parques"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Meno","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Mercado navideño"] },
  ],
  // Jena: Gera-Leumnitz (OMM 10567, a unos 38 km; Weimar, más cerca, no publica máximas ni mínimas). Normales OMM 1991–2020 publicadas por NOAA/NCEI.
  jena: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–14°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca en el valle del Saale.", tags: ["Fresca","Saale","Senderismo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Saale","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–13°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-2–4°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Nieve"] },
  ],
  // Mannheim: Mannheim (OMM 10729, a unos 7 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  mannheim: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–17°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave entre el Rin y el Neckar.", tags: ["Suave","Rin","Parques"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–26°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Rin","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y gris.", tags: ["Frío","Heladas","Mercado navideño"] },
  ],
  // Osnabrück: Münster/Osnabrück (OMM 10315, en el aeropuerto, a unos 29 km): la estación de Osnabrück (10317) solo tiene 17–20 años de datos. Normales OMM 1991–2020 publicadas por NOAA/NCEI.
  osnabruck: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave.", tags: ["Suave","Parques","Bici"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Terrazas","Bici"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y húmedo.", tags: ["Frío","Húmedo","Mercado navideño"] },
  ],
  // Passau: Fürstenzell (OMM 10895, a unos 8 km). Normales OMM 1991–2020 publicadas por NOAA/NCEI, con 24 años de datos (23 en enero).
  passau: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–14°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca junto a los tres ríos.", tags: ["Fresca","Ríos","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Danubio","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "5–13°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-3–2°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Nieve"] },
  ],
  // Stuttgart: Stuttgart-Schnarrenberg (OMM 10739, en la ciudad; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  stuttgart: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave entre colinas y viñedos.", tags: ["Suave","Viñedos","Parques"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Viñedos","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "0–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Mercado navideño"] },
  ],
  // Graz: Graz-Flughafen (OMM 11240, a unos 10 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  graz: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–16°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera que se templa rápido.", tags: ["Suave","Mur","Parques"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Mur","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "5–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-5–4°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Nieve"] },
  ],
  // Wiener Neustadt: Wien Hohe Warte (OMM 11035, a unos 50 km; es la estación OMM con normales publicadas más cercana). Normales OMM 1991–2020 publicadas por NOAA/NCEI.
  "wiener-neustadt": [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–16°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave.", tags: ["Suave","Parques","Viena cerca"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "15–26°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Terrazas","Excursiones"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "8–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-1–5°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Mercado navideño"] },
  ],
  // Cortrique: Semmerzake (OMM 06428, a unos 31 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  cortrique: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave junto al Lys.", tags: ["Suave","Lys","Bici"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Lys","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "8–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "2–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y húmedo.", tags: ["Suave","Húmedo","Lluvias"] },
  ],
  // Diepenbeek: Kleine-Brogel (OMM 06479, a unos 29 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  diepenbeek: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–16°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave en Limburgo.", tags: ["Suave","Bici","Parques"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Terrazas","Bici"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–16°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y húmedo.", tags: ["Frío","Húmedo","Lluvias"] },
  ],
  // Namur: Charleroi-Gosselies (OMM 06449, a unos 30 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  namur: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–14°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave junto al Mosa.", tags: ["Suave","Mosa","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Mosa","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y húmedo.", tags: ["Frío","Húmedo","Lluvias"] },
  ],
  // Limasol: aeropuerto de Pafos (OMM 17600, a unos 50 km por la costa; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  limasol: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "12–22°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera cálida junto al mar.", tags: ["Cálida","Mar","Paseo marítimo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "20–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano caluroso y seco.", tags: ["Caluroso","Seco","Playa"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "17–27°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño cálido para empezar el curso.", tags: ["Inicio Erasmus","Cálido","Playa"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "9–18°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave, con las lluvias del año.", tags: ["Suave","Lluvias","Sol"] },
  ],
  // Nitra: Nitra-Veľké Janíkovce (OMM 11855, a unos 5 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  nitra: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–17°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera templada bajo el castillo.", tags: ["Templada","Castillo","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano caluroso.", tags: ["Caluroso","Terrazas","Río Nitra"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "6–16°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-3–4°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Nieve"] },
  ],
  // Prešov: Prešov-Vojsko (OMM 11955, a unos 6 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  presov: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "3–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca que se templa en mayo.", tags: ["Fresca","Casco antiguo","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Terrazas","Montaña"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "4–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-5–1°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas y nieve.", tags: ["Frío","Heladas","Nieve"] },
  ],
  // Kuopio: aeropuerto de Kuopio (OMM 02917, en Siilinjärvi, a unos 14 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  kuopio: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "-2–7°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fría que se templa en mayo.", tags: ["Fría","Lagos","Días largos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–20°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano suave y de días largos.", tags: ["Suave","Lagos","Sauna"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "2–7°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Lagos"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-10–-4°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno muy frío, oscuro y nevado.", tags: ["Muy frío","Nieve","Esquí de fondo"] },
  ],
  // Rovaniemi: aeropuerto de Rovaniemi (OMM 02845, a unos 8 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  rovaniemi: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "-3–4°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fría, con nieve.", tags: ["Fría","Nieve","Días largos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "10–18°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano suave, con sol de medianoche.", tags: ["Suave","Sol de medianoche","Ríos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "-1–4°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño frío para empezar el curso.", tags: ["Inicio Erasmus","Frío","Auroras"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-12–-7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno muy frío, oscuro y nevado.", tags: ["Muy frío","Nieve","Auroras"] },
  ],
  // Clermont-Ferrand: Clermont-Ferrand (OMM 07460, en el aeropuerto, a unos 5 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  "clermont-ferrand": [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–17°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave a los pies de los volcanes.", tags: ["Suave","Volcanes","Senderismo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–26°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Volcanes","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "8–17°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Senderismo"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–9°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno fresco, con heladas.", tags: ["Fresco","Heladas","Montaña"] },
  ],
  // El Havre: Cap de la Hève (OMM 07028, a unos 4 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  "el-havre": [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–13°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca junto al mar.", tags: ["Fresca","Mar","Viento"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "15–20°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano suave junto al canal de la Mancha.", tags: ["Suave","Playa","Mar"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "11–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "4–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y húmedo.", tags: ["Suave","Húmedo","Viento"] },
  ],
  // Ruan: Rouen-Boos (OMM 07037, a unos 8 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  ruan: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave y algo lluviosa.", tags: ["Suave","Sena","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Terrazas","Sena"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "8–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño suave para empezar el curso.", tags: ["Inicio Erasmus","Suave","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "2–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno fresco y húmedo.", tags: ["Fresco","Húmedo","Lluvias"] },
  ],
  // Limerick: aeropuerto de Shannon (OMM 03962, a unos 20 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  limerick: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–13°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca y verde.", tags: ["Fresca","Verde","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–19°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano suave, sin calor.", tags: ["Suave","Shannon","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "8–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño suave y lluvioso para empezar el curso.", tags: ["Inicio Erasmus","Suave","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–9°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y lluvioso, sin apenas heladas.", tags: ["Suave","Lluvias","Viento"] },
  ],
  // Waterford: aeropuerto de Cork (OMM 03955, a unos 100 km: no hay estación OMM más cercana con normales 1991–2020 en NOAA/NCEI).
  waterford: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–12°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca y verde.", tags: ["Fresca","Verde","Costa"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "11–18°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano suave, sin calor.", tags: ["Suave","Costa","Días largos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "8–13°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño suave y lluvioso para empezar el curso.", tags: ["Inicio Erasmus","Suave","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "3–8°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno suave y lluvioso.", tags: ["Suave","Lluvias","Viento"] },
  ],
  // Eindhoven: aeropuerto de Eindhoven (OMM 06370, a unos 7 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  eindhoven: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave, buena para ir en bici.", tags: ["Suave","Bici","Parques"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Terrazas","Festivales"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–15°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño suave para empezar el curso.", tags: ["Inicio Erasmus","Suave","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–7°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno fresco y gris.", tags: ["Fresco","Gris","Lluvias"] },
  ],
  // Zwolle: Marknesse (OMM 06273, a unos 25 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  zwolle: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–14°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave, buena para ir en bici.", tags: ["Suave","Bici","Canales"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "12–22°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano templado.", tags: ["Templado","Terrazas","Bici"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "7–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño suave para empezar el curso.", tags: ["Inicio Erasmus","Suave","Lluvias"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "1–6°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno fresco y húmedo.", tags: ["Fresco","Húmedo","Viento"] },
  ],
  // Rzeszów: Rzeszów-Jasionka (OMM 12580; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  rzeszow: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–14°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca que se templa en mayo.", tags: ["Fresca","Parques","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Terrazas","Rynek"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "5–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-4–2°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas y nieve.", tags: ["Frío","Heladas","Nieve"] },
  ],
  // Viseu: Viseu (IPMA 560; normal climatológica 1991–2020 del IPMA).
  viseu: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–17°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera suave en el interior.", tags: ["Suave","Casco antiguo","Paseos"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "14–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano caluroso y seco.", tags: ["Caluroso","Seco","Terrazas"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "10–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño templado para empezar el curso.", tags: ["Inicio Erasmus","Templado","Vendimia"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "4–11°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno fresco, con alguna helada.", tags: ["Fresco","Heladas","Lluvias"] },
  ],
  // Olomouc: Holešov (OMM 11774, a unos 40 km, en la llanura de Haná; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  olomouc: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–15°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fresca que se templa en mayo.", tags: ["Fresca","Parques","Casco antiguo"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "13–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano cálido.", tags: ["Cálido","Terrazas","Festivales"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "5–14°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Ambiente universitario"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-4–3°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, con heladas.", tags: ["Frío","Heladas","Mercados navideños"] },
  ],
  // Örebro: aeropuerto de Örebro (OMM 02432, a unos 10 km; normales OMM 1991–2020 publicadas por NOAA/NCEI).
  orebro: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "1–11°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fría que se templa en mayo.", tags: ["Fría","Días largos","Parques"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "11–22°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano suave y de días largos.", tags: ["Suave","Días largos","Lagos"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "3–11°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Bosques"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-5–1°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío, oscuro y con nieve.", tags: ["Frío","Nieve","Días cortos"] },
  ],
  // Trollhättan: Sätenäs (OMM 02520, a unos 30 km; la estación del aeropuerto de Trollhättan no trae temperaturas en NOAA/NCEI; normales OMM 1991–2020).
  trollhattan: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "2–11°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Primavera fría que se templa en mayo.", tags: ["Fría","Días largos","Cascadas"] },
    { id: "summer", label: "Verano", months: "Jun–Ago", temp: "11–21°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano suave y de días largos.", tags: ["Suave","Días largos","Göta älv"] },
    { id: "autumn", label: "Otoño", months: "Sep–Nov", temp: "5–11°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño fresco para empezar el curso.", tags: ["Inicio Erasmus","Fresco","Bosques"], highlight: true },
    { id: "winter", label: "Invierno", months: "Dic–Feb", temp: "-3–2°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Invierno frío y oscuro.", tags: ["Frío","Días cortos","Nieve"] },
  ],
};

// Mes más frío y mes más cálido de cada ciudad (normales 1991–2020 de la misma fuente oficial que
// los rangos por estación, o de la estación OMM indicada en `source`). month: 0 = enero.
// cold.min: media de las mínimas diarias del mes más frío; hot.max: media de las máximas del más
// cálido. low/high (opcionales): media de la temperatura más baja/alta de ese mes, solo si la fuente
// la publica (los récords absolutos de 30 años no sirven). period: si no es 1991–2020; daysBy: servicio cuyos datos diarios dan «días de hasta». Sin dato oficial, la ciudad no aparece
// aquí y queda pendiente en VERIFICACION.md.
export const CITY_CLIMATE_EXTREMES = {
  bolonia: { cold: { month: 0, min: 2.1 }, hot: { month: 6, max: 31.5 }, source: "ARPAE, Bologna idrografico (14101)" },
  milan: { cold: { month: 0, min: -0.38 }, hot: { month: 6, max: 30.71 }, source: "OMM, Milano Linate (16080)" },
  roma: { cold: { month: 1, min: 3.37 }, hot: { month: 7, max: 31.55 }, source: "OMM, Roma Ciampino (16239)" },
  cracovia: { cold: { month: 0, min: -4.7 }, hot: { month: 6, max: 25.3 }, source: "OMM, Kraków-Balice (12566)" },
  varsovia: { cold: { month: 0, min: -4 }, hot: { month: 6, max: 25.2 }, source: "OMM, Varsovia-Okęcie (12375)" },
  budapest: { cold: { month: 0, min: -2.5 }, hot: { month: 6, max: 28.1 }, source: "OMM, Budapest-Pestszentlőrinc (12843)" },
  praga: { cold: { month: 0, min: -3.5 }, hot: { month: 6, max: 24.5 }, source: "OMM, Praga-Ruzyně (11518)" },
  "la-haya": { cold: { month: 1, min: 1.2 }, hot: { month: 7, max: 21.8 }, source: "OMM, Voorschoten (06215)" },
  rotterdam: { cold: { month: 1, min: 1.1, low: -5.84 }, hot: { month: 6, max: 22.7, high: 30.73 }, source: "OMM, Rotterdam The Hague Airport (06344)", daysBy: "KNMI" },
  munich: { cold: { month: 0, min: -1.8, low: -9.52 }, hot: { month: 6, max: 24.9, high: 32.99 }, source: "OMM, München-Stadt (10865)", daysBy: "DWD" },
  berlin: { cold: { month: 0, min: -1.4, low: -10.5 }, hot: { month: 6, max: 25.2, high: 33.04 }, source: "OMM, Berlin-Tempelhof (10384)", daysBy: "DWD" },
  lisboa: { cold: { month: 0, min: 8.6 }, hot: { month: 7, max: 28.8 }, source: "IPMA, Lisboa/Instituto Geofísico (535)" },
  oporto: { cold: { month: 0, min: 6.4 }, hot: { month: 7, max: 24.8 }, source: "IPMA, Porto/Pedras Rubras (545)" },
  paris: { cold: { month: 0, min: 3.2, low: -3.79 }, hot: { month: 6, max: 25.7, high: 34.33 }, source: "OMM, Paris-Montsouris (07156)", daysBy: "Météo-France" },
  londres: { cold: { month: 0, min: 3.5 }, hot: { month: 6, max: 23.6 }, source: "OMM, London St James's Park (03770)" },
  amsterdam: { cold: { month: 1, min: 1, low: -5.64 }, hot: { month: 6, max: 22.5, high: 30.32 }, source: "OMM, Amsterdam-Schiphol (06240)", daysBy: "KNMI" },
  viena: { cold: { month: 0, min: -1.3, low: -9.32 }, hot: { month: 6, max: 26.4, high: 33.96 }, source: "GeoSphere Austria, Wien Hohe Warte (105 / OMM 11035)", daysBy: "GeoSphere Austria" },
  rosenheim: { cold: { month: 0, min: -3.4, low: -12.2 }, hot: { month: 6, max: 24.9, high: 32.3 }, source: "DWD, Rosenheim (4261): medias calculadas con sus datos mensuales oficiales", daysBy: "DWD" },
  bruselas: { cold: { month: 0, min: 1.4 }, hot: { month: 6, max: 23.2 }, source: "OMM, Uccle (06447)" },
  estocolmo: { cold: { month: 1, min: -3.2, low: -10.94 }, hot: { month: 6, max: 23.6, high: 29.65 }, source: "OMM, Stockholm-Observatoriekullen (02485)", daysBy: "SMHI" },
  helsinki: { cold: { month: 1, min: -6.3, low: -16.91 }, hot: { month: 6, max: 21.9, high: 27.08 }, source: "OMM, Helsinki-Kaisaniemi (02978)", daysBy: "FMI" },
  oslo: { cold: { month: 0, min: -4.7 }, hot: { month: 6, max: 22.7 }, source: "OMM, Oslo-Blindern (01492)" },
  reikiavik: { cold: { month: 1, min: -1.9 }, hot: { month: 6, max: 14.9 }, source: "OMM, Reykjavík (04030)" },
  dublin: { cold: { month: 1, min: 2.2 }, hot: { month: 6, max: 19.5 }, source: "OMM, Dublin Airport (03969)" },
  edimburgo: { cold: { month: 11, min: 1.6 }, hot: { month: 6, max: 19.3 }, source: "Met Office, Edinburgh Royal Botanic Garden" },
  atenas: { cold: { month: 0, min: 6.9 }, hot: { month: 7, max: 33.4 }, source: "Servicio Meteorológico Nacional de Grecia (EMY), Elliniko" },
  zagreb: { cold: { month: 0, min: -2 }, hot: { month: 6, max: 28.1 }, source: "OMM, Zagreb-Maksimir (14240)" },
  liubliana: { cold: { month: 0, min: -1.7 }, hot: { month: 6, max: 27.9 }, source: "OMM, Ljubljana-Bežigrad (14015)" },
  tallin: { cold: { month: 1, min: -6.2 }, hot: { month: 6, max: 22.2 }, source: "OMM, Tallinn-Harku (26038)" },
  vilna: { cold: { month: 0, min: -6, low: -19.4 }, hot: { month: 6, max: 23.9, high: 30.8 }, source: "LHMT, Vilnius: medias calculadas con sus datos diarios oficiales", daysBy: "LHMT" },
  riga: { cold: { month: 1, min: -4.6 }, hot: { month: 6, max: 23.8 }, source: "OMM, Riga LU (26422)" },
  bratislava: { cold: { month: 0, min: -2.8 }, hot: { month: 6, max: 28 }, source: "OMM, Bratislava-Letisko (aeropuerto) (11816)" },
  bucarest: { cold: { month: 0, min: -5 }, hot: { month: 7, max: 30.6 }, source: "OMM, București-Băneasa (15420)" },
  sofia: { cold: { month: 0, min: -3.9 }, hot: { month: 7, max: 28.3 }, source: "OMM, Sofia (15614)" },
  ginebra: { cold: { month: 0, min: -1.1, low: -6.85 }, hot: { month: 6, max: 26.7, high: 33.47 }, source: "OMM, Genève-Cointrin (06700)", daysBy: "MeteoSwiss" },
  florencia: { cold: { month: 0, min: 2.1 }, hot: { month: 7, max: 32.4 }, source: "OMM, Firenze Peretola (16170)" },
  hamburgo: { cold: { month: 0, min: -0.5, low: -9.52 }, hot: { month: 6, max: 23.2, high: 31.14 }, source: "OMM, Hamburg-Fuhlsbüttel (10147)", daysBy: "DWD" },
  gante: { cold: { month: 1, min: 1.3 }, hot: { month: 6, max: 23.6 }, source: "OMM, Semmerzake (a unos 15 km) (06428)" },
  lyon: { cold: { month: 0, min: 1.1, low: -6.31 }, hot: { month: 6, max: 28.2, high: 34.92 }, source: "OMM, Lyon-Bron (07480)", daysBy: "Météo-France" },
  coimbra: { cold: { month: 0, min: 5.2 }, hot: { month: 7, max: 29.1 }, source: "IPMA, Coimbra/Bencanta (707)" },
  lovaina: { cold: { month: 1, min: 1 }, hot: { month: 6, max: 23.7 }, source: "OMM, Brussels Airport (a unos 15 km) (06451)" },
  utrecht: { cold: { month: 1, min: 0.7, low: -6.44 }, hot: { month: 6, max: 23.1, high: 31.05 }, source: "OMM, De Bilt (06260)", daysBy: "KNMI" },
  groningen: { cold: { month: 1, min: -0.1, low: -7.39 }, hot: { month: 6, max: 22.7, high: 30.7 }, source: "OMM, Groningen-Eelde (06280)", daysBy: "KNMI" },
  maastricht: { cold: { month: 0, min: 0.5, low: -7.46 }, hot: { month: 6, max: 23.8, high: 32.53 }, source: "OMM, Maastricht Aachen Airport (06380)", daysBy: "KNMI" },
  colonia: { cold: { month: 0, min: 0, low: -9.12 }, hot: { month: 6, max: 24.9, high: 33.19 }, source: "OMM, Köln/Bonn (10513)", daysBy: "DWD" },
  heidelberg: { cold: { month: 0, min: -0.7, low: -9.12 }, hot: { month: 6, max: 26.7, high: 34.64 }, source: "OMM, Mannheim (10729)", daysBy: "DWD" },
  friburgo: { cold: { month: 0, min: -0.2, low: -8.66 }, hot: { month: 6, max: 26.5, high: 34.33 }, source: "OMM, Freiburg (10803)", daysBy: "DWD" },
  leipzig: { cold: { month: 0, min: -1.4, low: -11.24 }, hot: { month: 6, max: 25.3, high: 33.34 }, source: "OMM, Leipzig-Holzhausen (10471)", daysBy: "DWD" },
  dresde: { cold: { month: 0, min: -2, low: -11.89 }, hot: { month: 6, max: 24.5, high: 32.45 }, source: "OMM, Dresden-Klotzsche (10488)", daysBy: "DWD" },
  tubinga: { cold: { month: 0, min: -2.1, low: -10.38 }, hot: { month: 6, max: 24.7, high: 32.84 }, source: "OMM, Stuttgart-Echterdingen (10738)", daysBy: "DWD" },
  toulouse: { cold: { month: 0, min: 2.9, low: -4 }, hot: { month: 7, max: 28.5, high: 35.66 }, source: "OMM, Toulouse-Blagnac (07630)", daysBy: "Météo-France" },
  burdeos: { cold: { month: 1, min: 3.6, low: -3.14 }, hot: { month: 7, max: 27.6, high: 35.53 }, source: "OMM, Bordeaux-Mérignac (07510)", daysBy: "Météo-France" },
  nantes: { cold: { month: 1, min: 3, low: -3.62 }, hot: { month: 7, max: 25.4, high: 33.04 }, source: "OMM, Nantes-Bouguenais (07222)", daysBy: "Météo-France" },
  montpellier: { cold: { month: 0, min: 3.3, low: -3.32 }, hot: { month: 6, max: 29.5, high: 34.69 }, source: "OMM, Montpellier-Aéroport (07643)", daysBy: "Météo-France" },
  marsella: { cold: { month: 0, min: 3.6, low: -3.13 }, hot: { month: 6, max: 30.7, high: 35.23 }, source: "OMM, Marignane (07650)", daysBy: "Météo-France" },
  lille: { cold: { month: 0, min: 1.7, low: -5.75 }, hot: { month: 6, max: 23.7, high: 32.15 }, source: "OMM, Lille-Lesquin (07015)", daysBy: "Météo-France" },
  estrasburgo: { cold: { month: 0, min: -0.2, low: -8.89 }, hot: { month: 6, max: 26.4, high: 33.89 }, source: "OMM, Strasbourg-Entzheim (07190)", daysBy: "Météo-France" },
  grenoble: { cold: { month: 0, min: -1.3, low: -7.45 }, hot: { month: 6, max: 28.6, high: 34.99 }, source: "Météo-France, Grenoble-Le Versoud", period: "1999–2020", daysBy: "Météo-France" },
  rennes: { cold: { month: 1, min: 2.9, low: -3.71 }, hot: { month: 6, max: 24.8, high: 32.43 }, source: "OMM, Rennes-Saint-Jacques (07130)", daysBy: "Météo-France" },
  venecia: { cold: { month: 0, min: 0.2 }, hot: { month: 6, max: 29 }, source: "OMM, Venezia-Tessera (16105)" },
  pisa: { cold: { month: 0, min: 2.75 }, hot: { month: 7, max: 30.29 }, source: "OMM, Pisa San Giusto (16158)" },
  siena: { cold: { month: 1, min: 3 }, hot: { month: 7, max: 30.7 }, source: "Consorzio LaMMA, Siena" },
  bari: { cold: { month: 0, min: 4.12 }, hot: { month: 6, max: 30.58 }, source: "OMM, Bari-Palese (16270)" },
  trieste: { cold: { month: 0, min: 4.15 }, hot: { month: 6, max: 29.06 }, source: "OMM, Trieste (16110)" },
  bergamo: { cold: { month: 0, min: -0.21 }, hot: { month: 6, max: 29.65 }, source: "OMM, Bergamo-Orio al Serio (16076)" },
  parma: { cold: { month: 0, min: -0.4 }, hot: { month: 6, max: 31.6 }, source: "ARPAE, Parma urbana (6031)" },
  ferrara: { cold: { month: 0, min: -0.3 }, hot: { month: 7, max: 31.1 }, source: "ARPAE, Malborghetto di Boara (3)" },
  lecce: { cold: { month: 0, min: 3.7 }, hot: { month: 7, max: 32.67 }, source: "OMM, Lecce (16332)" },
  cagliari: { cold: { month: 1, min: 5.08 }, hot: { month: 7, max: 32.1 }, source: "OMM, Cagliari-Elmas (16560)" },
  verona: { cold: { month: 0, min: -0.53 }, hot: { month: 6, max: 30.4 }, source: "OMM, Verona-Villafranca (16090)" },
  palermo: { cold: { month: 1, min: 9.1 }, hot: { month: 7, max: 30.6 }, source: "INAF, Osservatorio Astronomico di Palermo (Palazzo Reale)" },
  caserta: { cold: { month: 1, min: 3.22 }, hot: { month: 7, max: 31.46 }, source: "OMM, Grazzanise (16253)" },
  covilha: { cold: { month: 0, min: 2.7 }, hot: { month: 6, max: 31.9 }, source: "IPMA, Fundão (698), a unos 16 km y más bajo que Covilhã" },
  modena: { cold: { month: 0, min: 2 }, hot: { month: 6, max: 30.5 }, source: "Osservatorio Geofisico UNIMORE" },
  pavia: { cold: { month: 0, min: -0.38 }, hot: { month: 6, max: 30.71 }, source: "OMM, Milano Linate (16080)" },
  braganza: { cold: { month: 0, min: 0.4 }, hot: { month: 6, max: 29.8 }, source: "IPMA, Bragança (575)" },
  newcastle: { cold: { month: 0, min: 2.5 }, hot: { month: 6, max: 18.4 }, source: "Met Office, Tynemouth" },
  geel: { cold: { month: 1, min: 1 }, hot: { month: 6, max: 23.6 }, source: "OMM, Antwerpen-Deurne (06450)" },
  campobasso: { cold: { month: 1, min: 1.73 }, hot: { month: 7, max: 28.11 }, source: "OMM, Campobasso (16252)" },
  angers: { cold: { month: 1, min: 2.9 }, hot: { month: 7, max: 25.9 }, source: "Météo-France, Angers-Beaucouzé (49020001)" },
  enschede: { cold: { month: 1, min: -0.2 }, hot: { month: 6, max: 23.6 }, source: "OMM, Twenthe (06290)" },
  gotinga: { cold: { month: 0, min: -1.4 }, hot: { month: 7, max: 24.1 }, source: "OMM, Göttingen (10444)" },
  santarem: { cold: { month: 0, min: 5.8 }, hot: { month: 7, max: 31.5 }, source: "IPMA, Santarém/Fonte Boa (734)" },
  luneburgo: { cold: { month: 0, min: -1 }, hot: { month: 6, max: 23.9 }, source: "OMM, Boizenburg (10249)" },
  erfurt: { cold: { month: 0, min: -2.5 }, hot: { month: 6, max: 23.6 }, source: "OMM, Erfurt-Weimar (10554)" },
  castellanza: { cold: { month: 0, min: -1.88 }, hot: { month: 6, max: 29.12 }, source: "OMM, Novara/Cameri (16064)" },
  bergen: { cold: { month: 1, min: 0.1 }, hot: { month: 6, max: 19.6 }, source: "OMM, Bergen-Florida (01317)" },
  arnhem: { cold: { month: 0, min: 0 }, hot: { month: 6, max: 23.4 }, source: "OMM, Deelen (06275)" },
  flesinga: { cold: { month: 0, min: 2.6 }, hot: { month: 7, max: 22 }, source: "OMM, Vlissingen (06310)" },
  ratisbona: { cold: { month: 0, min: -2.9 }, hot: { month: 6, max: 26.1 }, source: "OMM, Regensburg (10776)" },
  wurzburgo: { cold: { month: 0, min: -1.4 }, hot: { month: 6, max: 25.5 }, source: "OMM, Würzburg (10655)" },
  malinas: { cold: { month: 1, min: 1 }, hot: { month: 6, max: 23.7 }, source: "OMM, Brussels National (06451)" },
  belfort: { cold: { month: 0, min: -1.2 }, hot: { month: 6, max: 26 }, source: "OMM, Luxeuil (07292), a unos 41 km" },
  debrecen: { cold: { month: 0, min: -3.6 }, hot: { month: 7, max: 28.1 }, source: "OMM, Debrecen (12882)" },
  aveiro: { cold: { month: 0, min: 6.8 }, hot: { month: 7, max: 24.5 }, source: "IPMA, Aveiro/Universidade (702)" },
  "vila-real": { cold: { month: 0, min: 2.8 }, hot: { month: 7, max: 29 }, source: "IPMA, Vila Real (567)" },
  nottingham: { cold: { month: 0, min: 1.6 }, hot: { month: 6, max: 21.5 }, source: "OMM, Nottingham Watnall (03354)" },
  ostrava: { cold: { month: 0, min: -3.7 }, hot: { month: 6, max: 25.4 }, source: "OMM, Ostrava/Mošnov (11782)" },
  zlin: { cold: { month: 0, min: -4.5 }, hot: { month: 6, max: 26.1 }, source: "OMM, Holešov (11774)" },
  umea: { cold: { month: 1, min: -11 }, hot: { month: 6, max: 20.9 }, source: "OMM, Umeå Flygplats (02286)" },
  brugg: { cold: { month: 1, min: -1.7 }, hot: { month: 6, max: 25.6 }, source: "OMM, Buchs/Aarau (06633)" },
  aquisgran: { cold: { month: 0, min: 0.5 }, hot: { month: 6, max: 23.8 }, source: "OMM, Maastricht-Aachen Airport (06380), a unos 27 km" },
  bamberg: { cold: { month: 0, min: -2.6 }, hot: { month: 6, max: 25.5 }, source: "OMM, Bamberg (10675)" },
  bonn: { cold: { month: 0, min: 0 }, hot: { month: 6, max: 24.9 }, source: "OMM, Köln-Bonn (10513)" },
  bremen: { cold: { month: 0, min: -0.5 }, hot: { month: 6, max: 23.6 }, source: "OMM, Bremen (10224)" },
  francfort: { cold: { month: 0, min: -0.5 }, hot: { month: 6, max: 26.1 }, source: "OMM, Frankfurt/Main (10637)" },
  jena: { cold: { month: 0, min: -2.4 }, hot: { month: 6, max: 24.2 }, source: "OMM, datos de la estación de Gera-Leumnitz (10567), a unos 38 km" },
  mannheim: { cold: { month: 0, min: -0.7 }, hot: { month: 6, max: 26.7 }, source: "OMM, Mannheim (10729)" },
  osnabruck: { cold: { month: 0, min: 0 }, hot: { month: 6, max: 24.2 }, source: "OMM, Münster/Osnabrück (10315), a unos 29 km" },
  passau: { cold: { month: 0, min: -3.7 }, hot: { month: 6, max: 24 }, source: "OMM, datos de la estación de Fürstenzell (10895), a unos 8 km, con 24 de 30 años de datos" },
  stuttgart: { cold: { month: 0, min: -0.6 }, hot: { month: 6, max: 25.2 }, source: "OMM, Stuttgart-Schnarrenberg (10739)" },
  graz: { cold: { month: 0, min: -5.6 }, hot: { month: 6, max: 25.6 }, source: "OMM, Graz-Flughafen (11240)" },
  "wiener-neustadt": { cold: { month: 0, min: -1.3 }, hot: { month: 6, max: 26.4 }, source: "OMM, datos de la estación de Viena (Hohe Warte, 11035), a unos 50 km" },
  cortrique: { cold: { month: 1, min: 1.3 }, hot: { month: 6, max: 23.6 }, source: "OMM, Semmerzake (06428), a unos 31 km" },
  diepenbeek: { cold: { month: 1, min: 0.1 }, hot: { month: 6, max: 24.9 }, source: "OMM, Kleine-Brogel (06479), a unos 29 km" },
  namur: { cold: { month: 0, min: 0.6 }, hot: { month: 6, max: 23.4 }, source: "OMM, Charleroi-Gosselies (06449), a unos 30 km" },
  limasol: { cold: { month: 1, min: 8.5 }, hot: { month: 7, max: 31 }, source: "OMM, aeropuerto de Pafos (17600), a unos 50 km" },
  nitra: { cold: { month: 0, min: -3.8 }, hot: { month: 6, max: 28 }, source: "OMM, Nitra-Veľké Janíkovce (11855)" },
  presov: { cold: { month: 0, min: -5.5 }, hot: { month: 7, max: 25.8 }, source: "OMM, Prešov-Vojsko (11955)" },
  kuopio: { cold: { month: 1, min: -11.8 }, hot: { month: 6, max: 21.8 }, source: "OMM, aeropuerto de Kuopio (02917), a unos 14 km" },
  rovaniemi: { cold: { month: 0, min: -13.5 }, hot: { month: 6, max: 20.1 }, source: "OMM, aeropuerto de Rovaniemi (02845)" },
  "clermont-ferrand": { cold: { month: 0, min: 0.6 }, hot: { month: 6, max: 26.8 }, source: "OMM, Clermont-Ferrand (07460)" },
  "el-havre": { cold: { month: 0, min: 3.9 }, hot: { month: 7, max: 21.2 }, source: "OMM, Cap de la Hève (07028)" },
  ruan: { cold: { month: 0, min: 1.6 }, hot: { month: 6, max: 23.4 }, source: "OMM, Rouen-Boos (07037), a unos 8 km" },
  limerick: { cold: { month: 0, min: 3.3 }, hot: { month: 6, max: 19.5 }, source: "OMM, aeropuerto de Shannon (03962), a unos 20 km" },
  waterford: { cold: { month: 0, min: 3.2 }, hot: { month: 6, max: 18.6 }, source: "OMM, aeropuerto de Cork (03955), a unos 100 km" },
  eindhoven: { cold: { month: 1, min: 0.3 }, hot: { month: 6, max: 24 }, source: "OMM, aeropuerto de Eindhoven (06370), a unos 7 km" },
  zwolle: { cold: { month: 1, min: 0.7 }, hot: { month: 6, max: 22.4 }, source: "OMM, Marknesse (06273), a unos 25 km" },
  rzeszow: { cold: { month: 0, min: -4.7 }, hot: { month: 6, max: 25.6 }, source: "OMM, Rzeszów-Jasionka (12580)" },
  viseu: { cold: { month: 0, min: 3.9 }, hot: { month: 7, max: 28.3 }, source: "IPMA, Viseu (560)" },
  olomouc: { cold: { month: 0, min: -4.5 }, hot: { month: 6, max: 26.1 }, source: "OMM, Holešov (11774), a unos 40 km" },
  orebro: { cold: { month: 1, min: -5.1 }, hot: { month: 6, max: 23.1 }, source: "OMM, aeropuerto de Örebro (02432), a unos 10 km" },
  trollhattan: { cold: { month: 1, min: -3.6 }, hot: { month: 6, max: 21.7 }, source: "OMM, Sätenäs (02520), a unos 30 km" },
};
