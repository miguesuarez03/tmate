// Datos de clima por ciudad — Las cuatro estaciones
// Clave: slug de la ciudad (igual que en cities.js)

export const CITY_SEASONS = {
  bolonia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "14–22°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Época perfecta. Ciudad en flor, terrazas abiertas y clima ideal para explorar.", tags: ["Ideal para llegar", "Terrazas", "Lluvias puntuales"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "28–36°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor intenso y húmedo. La ciudad se vacía de universitarios, llega el turismo.", tags: ["Calor extremo", "Festivales", "Ciudad tranquila"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "12–24°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor temporada. Los Erasmus llegan y la ciudad vuelve a la vida con colores épicos.", tags: ["Mejor época", "Inicio Erasmus", "Colores únicos"], highlight: true },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "2–10°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío y niebla. Los pórticos son refugio. La vida universitaria lo compensa todo.", tags: ["Niebla frecuente", "Muy social", "Ambiente acogedor"] },
  ],
  milan: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "13–22°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Milano florece. Semana de la Moda en febrero-marzo. Terrazas de los Navigli a tope.", tags: ["Semana de la Moda", "Terrazas", "Agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "26–34°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor húmedo y sofocante. La ciudad se vacía en agosto. Buenas ofertas en alojamiento.", tags: ["Calor húmedo", "Ciudad semi-vacía", "Agosto tranquilo"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "10–22°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La mejor época. Vuelta a la actividad, festivales y aperitivos al aire libre.", tags: ["Mejor época", "Festivales", "Aperitivo"], highlight: true },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "1–8°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío y niebla característica. Mercados de Navidad únicos y ambiente muy acogedor.", tags: ["Niebla planura", "Navidad mágica", "Frío seco"] },
  ],
  roma: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "14–24°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La mejor época del año. Clima perfecto para visitar monumentos y comer en terraza.", tags: ["Clima ideal", "Turismo moderado", "Flores en el Foro"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "28–38°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor intenso. Los romanos huyen en agosto. Ciudad llena de turistas.", tags: ["Calor extremo", "Turismo masivo", "Agosto vacío"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "14–26°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Excelente. Temperaturas suaves, menos turistas y vida universitaria muy activa.", tags: ["Muy agradable", "Inicio Erasmus", "Menos turistas"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "5–13°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Suave para ser invierno. Lluvia frecuente pero raramente nieva. Navidad espectacular.", tags: ["Invierno suave", "Lluvia ocasional", "Navidad única"] },
  ],
  turin: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "12–21°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Despertar con los Alpes nevados de fondo. Ideal para salidas en bici y terrazas.", tags: ["Alpes nevados", "Bici por la ciudad", "Muy agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "24–33°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Caluroso pero menos húmedo que Milán. Escapadas fáciles a los Alpes.", tags: ["Calor seco", "Escapadas montaña", "Ciudad tranquila"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "10–20°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño intenso y colorido. Arranque universitario muy activo. Mercados gastronómicos.", tags: ["Inicio Erasmus", "Gastronomía", "Colores épicos"], highlight: true },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "0–7°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío de verdad pero con ski en los Alpes a 1 hora. Chocolate caliente en cafés históricos.", tags: ["Ski en los Alpes", "Muy frío", "Cafés históricos"] },
  ],
  cracovia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–19°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La ciudad renace. El casco histórico florece y las terrazas se llenan de estudiantes.", tags: ["Ciudad en flor", "Terrazas", "Muy animado"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "20–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "El mejor verano de Europa Central. Calor agradable, festivales y noches largas.", tags: ["Temperatura perfecta", "Festivales", "Noches largas"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–18°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Magnífico. Los Erasmus llegan en septiembre con colores de otoño espectaculares.", tags: ["Inicio Erasmus", "Colores únicos", "Agradable"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-5–3°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío intenso con nieve. El mercado navideño de Cracovia es de los más bonitos de Europa.", tags: ["Nieve garantizada", "Navidad top", "Muy frío"] },
  ],
  varsovia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–18°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Bienvenida al calor. La ciudad despierta con fuerza y los parques se llenan de gente.", tags: ["Parques increíbles", "Terrazas", "Ambiente animado"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "20–29°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano corto pero intenso. Festivales de música y noches que no acaban.", tags: ["Festivales", "Noches largas", "Temperatura ideal"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "6–16°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño vibrante. Arranque del año universitario con energía. Precios muy asequibles.", tags: ["Inicio Erasmus", "Muy barato", "Energético"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-6–2°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Duro pero la ciudad no para. Vodka, sopa caliente y mucha vida interior.", tags: ["Frío extremo", "Vida interior", "Navidad"] },
  ],
  budapest: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "11–22°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Espectacular. Los baños termales al aire libre y el Danubio en primavera son únicos.", tags: ["Baños termales", "Danubio", "Muy agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "24–34°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Festival Sziget en agosto. Calor con terrazas de ruin bars a reventar.", tags: ["Festival Sziget", "Ruin bars", "Calor agradable"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "9–20°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Ideal para llegar de Erasmus. Clima suave, precios bajos y ambiente de locura.", tags: ["Inicio Erasmus", "Precios bajos", "Muy social"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-2–5°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío pero los baños termales en invierno son una experiencia alucinante.", tags: ["Baños termales", "Nieve posible", "Navidad"] },
  ],
  praga: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–19°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Praga en primavera es irreal. El casco histórico sin masas de turistas, clima perfecto.", tags: ["Poco turismo", "Ciudad en flor", "Perfecto"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "20–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor agradable con turismo máximo. Cerveza en terrazas del río Moldava.", tags: ["Turismo alto", "Cerveza y terrazas", "Noches largas"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "7–17°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Arranque Erasmus con colores de cuento. Mercadillos y ambiente universitario excelente.", tags: ["Inicio Erasmus", "Colores únicos", "Asequible"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-3–4°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío pero el mercado navideño de Praga es uno de los mejores de Europa.", tags: ["Navidad top", "Nieve posible", "Ambiente mágico"] },
  ],
  "la-haya": [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "9–17°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Playa cercana y tulipanes en flor. La ciudad se activa con energía después del gris invernal.", tags: ["Playa cerca", "Tulipanes", "Ciudad activa"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "17–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "El mejor momento. Playas de Scheveningen, festivales y días luminosos muy largos.", tags: ["Playa Scheveningen", "Días largos", "Festivales"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "9–16°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño húmedo. Los Erasmus llegan con impermeables. La ciudad internacional sigue activa.", tags: ["Lluvia frecuente", "Inicio Erasmus", "Muy internacional"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "2–7°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Gris y ventoso. Pero el ambiente interior de bares y cafés compensa enormemente.", tags: ["Viento marino", "Ambiente acogedor", "Poca nieve"] },
  ],
  rotterdam: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–16°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El puerto y la arquitectura moderna brillan con el sol. Festivales al aire libre.", tags: ["Arquitectura", "Festivales", "Ciudad activa"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "17–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano fresco pero los días son eternos. Terrazas junto al Maas y eventos continuos.", tags: ["Días largos", "Terrazas", "Eventos"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "9–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Lluvia y viento marino pero la ciudad no para. Buen inicio de curso universitario.", tags: ["Lluvia frecuente", "Inicio Erasmus", "Muy dinámica"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "1–6°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío húmedo. Los mercados de Navidad y la vida interior holandesa lo hacen llevadero.", tags: ["Frío húmedo", "Navidad", "Vida interior"] },
  ],
  munich: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–18°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Despertar espectacular con los Alpes de fondo. Jardines ingleses y terrazas de cervecería.", tags: ["Alpes cerca", "Jardín inglés", "Biergärten"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "20–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Temporada dorada. Oktoberfest en septiembre-octubre, Biergärten a reventar y el Isar.", tags: ["Oktoberfest", "Biergärten", "Río Isar"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–17°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Oktoberfest arranca en septiembre. Otoño bávaro con colores impresionantes.", tags: ["Oktoberfest", "Inicio Erasmus", "Colores bávaros"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-4–3°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío con mucha nieve. Mercado navideño Christkindlmarkt top en Alemania. Ski cerca.", tags: ["Nieve garantizada", "Navidad top", "Ski en los Alpes"] },
  ],
  berlin: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–18°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Berlín vuelve a la vida. Parques abarrotados, terrazas y energía creativa por todas partes.", tags: ["Parques llenos", "Terrazas", "Energía creativa"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "20–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "La temporada de los clubs al aire libre. Días eternos y vida nocturna sin fin.", tags: ["Clubs al aire libre", "Días eternos", "Techno"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "7–16°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Gran época para llegar. Menos turistas, los clubs siguen y la vida cultural explota.", tags: ["Inicio Erasmus", "Clubs", "Cultura"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-3–4°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío y oscuro pero la vida nocturna de Berlín nunca duerme. Clubs más míticos.", tags: ["Clubs nocturnos", "Frío intenso", "Navidad"] },
  ],
  lisboa: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "14–22°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Lisboa explota. Clima perfecto, los miradores llenos y festas populares empezando.", tags: ["Clima perfecto", "Miradores", "Festas populares"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "24–32°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor seco y playa a 30 minutos. El Tejo lleno de vida. Noches infinitas.", tags: ["Playa cerca", "Calor seco", "Noches mágicas"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "14–24°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Excelente para el Erasmus. Aún hace calor en septiembre y la ciudad está a pleno rendimiento.", tags: ["Inicio Erasmus", "Aún caluroso", "Muy social"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "8–15°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "El invierno más suave de Europa. Raramente baja de 10°C. Ideal para quien huye del frío.", tags: ["Invierno suave", "Sin nieve", "Lluvia moderada"] },
  ],
  oporto: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "12–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La ciudad más fotogénica de Europa brilla con el sol de primavera. Azulejos y vida.", tags: ["Muy fotogénico", "Azulejos", "Agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "20–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor moderado con brisa atlántica. Playas a 10 minutos y vino del Duero.", tags: ["Brisa atlántica", "Playas", "Vino Porto"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "12–22°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Magnífico arranque de curso. Aún cálido en septiembre y la comunidad Erasmus es muy activa.", tags: ["Inicio Erasmus", "Cálido", "Muy social"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "6–13°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Lluvia atlántica frecuente pero temperaturas muy suaves. El mejor invierno del norte.", tags: ["Lluvia atlántica", "Invierno suave", "Sin nieve"] },
  ],
  paris: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "10–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "París en primavera es exactamente como en las películas. Los jardines florecen y las terrazas se llenan.", tags: ["París en flor", "Terrazas", "Turismo moderado"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "20–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor agradable. Las orillas del Sena se convierten en playa y el ambiente es excepcional.", tags: ["Orillas del Sena", "Paris Plages", "Muy animado"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "10–19°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Arranque de curso muy intenso. Museos, gastronomía y vida universitaria al máximo.", tags: ["Inicio Erasmus", "Cultura", "Gastronomía"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "3–8°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío pero con las luces de Navidad París es otro mundo. Museos perfectos para el invierno.", tags: ["Navidad mágica", "Museos", "Frío moderado"] },
  ],
  londres: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "9–17°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La ciudad florece literalmente. Hyde Park lleno y el ambiente es increíblemente optimista.", tags: ["Hyde Park", "Mercados", "Energía única"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "17–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "El verano londinense es mágico cuando aparece el sol. Festivales, parques y rooftops.", tags: ["Festivales", "Rooftops", "Sol inesperado"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "9–16°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Gran época de inicio. La ciudad está en su máximo esplendor cultural con teatros y eventos.", tags: ["Inicio Erasmus", "Teatro", "Cultura top"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "3–9°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Lluvioso y gris pero con las luces navideñas Oxford Street es espectacular.", tags: ["Navidad Oxford St", "Lluvia", "Raramente nieva"] },
  ],
  amsterdam: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–16°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Los canales y los tulipanes en flor. La mejor postal de Amsterdam. Keukenhof cerca.", tags: ["Tulipanes", "Canales", "Keukenhof"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "17–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano fresco y con días eternos. Fiestas en los canales y terrazas a tope.", tags: ["Días largos", "Terrazas", "Canales llenos"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "9–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Gran época Erasmus. La ciudad vuelve a su ritmo local con menos turistas y más vida real.", tags: ["Inicio Erasmus", "Menos turistas", "Lluvia frecuente"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "1–6°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío pero los canales helados son mágicos. Luces de invierno y ambiente muy acogedor.", tags: ["Canales helados", "Luces invierno", "Muy acogedor"] },
  ],
  viena: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "9–20°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Viena despierta con conciertos al aire libre y el Prater en flor. Ambiente cultural único.", tags: ["Conciertos", "Prater", "Cultura"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "22–30°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Caluroso y lleno de festivales. El Danubio se convierte en zona de baño y playa urbana.", tags: ["Playa Danubio", "Festivales", "Calor agradable"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "9–18°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La temporada de la ópera y los conciertos. Arranque Erasmus con agenda cultural brutal.", tags: ["Ópera", "Inicio Erasmus", "Cultura clásica"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-2–4°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "El mercado navideño de Viena es el más famoso del mundo. Frío pero mágico.", tags: ["Navidad top mundial", "Frío seco", "Ambiente mágico"] },
  ],
  rosenheim: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–17°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Los Alpes bávaros se llenan de color. Excursiones de senderismo y rutas en bici entre lagos.", tags: ["Senderismo", "Lagos", "Alpes"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "18–26°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano alpino ideal. Lagos cristalinos, Oktoberfest cercano y actividades outdoor sin fin.", tags: ["Lagos alpinos", "Outdoor", "Oktoberfest cerca"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "6–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Otoño bávaro espectacular. Colores únicos en los Alpes y Oktoberfest a 45 minutos.", tags: ["Oktoberfest", "Colores únicos", "Inicio Erasmus"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-5–2°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Nieve asegurada. Esquí a pocos kilómetros y ambiente bávaro navideño incomparable.", tags: ["Esquí", "Nieve garantizada", "Navidad bávara"] },
  ],
  bruselas: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–17°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La Grand Place más bonita que nunca. Cerveza belga en terraza y chocolate en cada esquina.", tags: ["Grand Place", "Cerveza", "Agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "17–24°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano europeo con eventos y festivales. La ciudad institucional se relaja un poco.", tags: ["Festivales", "Terrazas", "Clima suave"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Buen inicio de curso. Bruselas cosmopolita y muy internacional activa su vida cultural.", tags: ["Inicio Erasmus", "Multicultural", "Lluvia frecuente"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "1–6°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío y gris pero el mercado navideño de la Grand Place compensa todo.", tags: ["Navidad Grand Place", "Chocolate caliente", "Frío húmedo"] },
  ],
};
