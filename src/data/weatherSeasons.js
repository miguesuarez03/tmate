// Datos de clima por ciudad — Las cuatro estaciones
// Clave: slug de la ciudad (igual que en cities.js)
// temp: media de las mínimas y de las máximas de la estación (normales climatológicas
// 1991–2020 del servicio meteorológico nacional / OMM). Ciudades ya cotejadas: ver VERIFICACION.md.

export const CITY_SEASONS = {
  bolonia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "11–20°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Época perfecta. Ciudad en flor, terrazas abiertas y clima ideal para explorar.", tags: ["Ideal para llegar", "Terrazas", "Lluvias puntuales"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "21–31°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor intenso y húmedo. La ciudad se vacía de universitarios, llega el turismo.", tags: ["Calor extremo", "Festivales", "Ciudad tranquila"] },
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
  oporto: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "10–19°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La ciudad más fotogénica de Europa brilla con el sol de primavera. Azulejos y vida.", tags: ["Muy fotogénico", "Azulejos", "Agradable"] },
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
  londres: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "9–17°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La ciudad florece literalmente. Hyde Park lleno y el ambiente es increíblemente optimista.", tags: ["Hyde Park", "Mercados", "Energía única"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "17–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "El verano londinense es mágico cuando aparece el sol. Festivales, parques y rooftops.", tags: ["Festivales", "Rooftops", "Sol inesperado"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "9–16°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Gran época de inicio. La ciudad está en su máximo esplendor cultural con teatros y eventos.", tags: ["Inicio Erasmus", "Teatro", "Cultura top"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "3–9°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Lluvioso y gris pero con las luces navideñas Oxford Street es espectacular.", tags: ["Navidad Oxford St", "Lluvia", "Raramente nieva"] },
  ],
  amsterdam: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–14°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Los canales y los tulipanes en flor. La mejor postal de Amsterdam. Keukenhof cerca.", tags: ["Tulipanes", "Canales", "Keukenhof"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "13–22°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Verano fresco y con días eternos. Fiestas en los canales y terrazas a tope.", tags: ["Días largos", "Terrazas", "Canales llenos"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Gran época Erasmus. La ciudad vuelve a su ritmo local con menos turistas y más vida real.", tags: ["Inicio Erasmus", "Menos turistas", "Lluvia frecuente"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "1–7°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío y húmedo; los años en que se hielan los canales son mágicos. Luces de invierno y ambiente muy acogedor.", tags: ["Frío húmedo", "Luces invierno", "Muy acogedor"] },
  ],
  viena: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "7–16°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Viena despierta con conciertos al aire libre y el Prater en flor. Ambiente cultural único.", tags: ["Conciertos", "Prater", "Cultura"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "15–26°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Caluroso y lleno de festivales. El Danubio se convierte en zona de baño y playa urbana.", tags: ["Playa Danubio", "Festivales", "Calor agradable"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–15°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "La temporada de la ópera y los conciertos. Arranque Erasmus con agenda cultural brutal.", tags: ["Ópera", "Inicio Erasmus", "Cultura clásica"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-1–5°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Los mercados navideños de Viena son de los más bonitos de Europa. Frío pero mágico.", tags: ["Mercados navideños", "Frío seco", "Ambiente mágico"] },
  ],
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
  oslo: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "1–14°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El deshielo llega a Nordmarka y la ciudad recupera la vida al aire libre casi de golpe.", tags: ["Deshielo", "Luz creciente", "Bosques reabren"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "16–22°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Días larguísimos, baño en el fiordo y senderismo constante en Nordmarka. La mejor época para descubrir la naturaleza a las puertas de la ciudad.", tags: ["Días larguísimos", "Baño en el fiordo", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "2–12°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Los bosques que rodean la ciudad se tiñen de colores intensos antes de la llegada del frío.", tags: ["Inicio Erasmus", "Bosques de colores", "Días acortándose"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-7–-1°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Nieve frecuente y esquí de fondo dentro de los límites de la ciudad — Oslo se convierte en una estación de invierno urbana.", tags: ["Esquí urbano", "Nieve segura", "Días muy cortos"] },
  ],
  reikiavik: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "1–8°C",   emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El hielo se retira y empiezan las primeras excursiones al Círculo Dorado con menos turistas que en verano.", tags: ["Menos turismo", "Luz creciente", "Círculo Dorado"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "10–14°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Sol de medianoche real — casi 24 horas de luz. La mejor época para explorar tierras altas y carreteras que en invierno están cerradas.", tags: ["Sol de medianoche", "Tierras altas abiertas", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "3–9°C",   emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Empiezan a verse las primeras auroras boreales con la vuelta de la oscuridad. Inicio de curso con la ciudad ya menos turística.", tags: ["Primeras auroras", "Inicio Erasmus", "Días acortándose"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-2–3°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Apenas 4-5 horas de luz, pero temporada alta de auroras boreales y piscinas geotermales humeantes bajo la nieve.", tags: ["Auroras boreales", "Días extremos", "Piscinas termales"] },
  ],
  dublin: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–12°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Los famosos 40 tonos de verde irlandés en pleno esplendor. Clima suave e impredecible, como siempre.", tags: ["Verde intenso", "Clima variable", "Agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "11–19°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Veranos suaves y luminosos, con festivales al aire libre y escapadas a la costa. Lluvia siempre posible, sin excepción.", tags: ["Festivales", "Días largos", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "7–14°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con los pubs llenándose de estudiantes internacionales. Lluvia frecuente, como en cualquier época del año.", tags: ["Inicio Erasmus", "Lluvia frecuente", "Ambiente social"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "2–8°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Suave para ser invierno (rara vez nieva) pero gris y lluvioso, con la vida social trasladándose por completo a los pubs.", tags: ["Invierno suave", "Lluvia constante", "Vida de pub"] },
  ],
  edimburgo: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "4–12°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La ciudad de piedra gris se llena de verde. Clima fresco pero agradable para explorar el casco antiguo a pie.", tags: ["Clima fresco", "Casco antiguo", "Agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "12–19°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Días larguísimos y el Fringe Festival convierte la ciudad entera en un escenario durante todo agosto.", tags: ["Fringe Festival", "Días largos", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "6–13°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con la ciudad recuperando su ritmo académico tras el bullicio festivalero del verano.", tags: ["Inicio Erasmus", "Ritmo académico", "Lluvia frecuente"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "1–7°C",   emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío, gris y con días muy cortos, pero el mercado navideño de Princes Street Gardens compensa el ánimo.", tags: ["Mercado navideño", "Días cortos", "Frío húmedo"] },
  ],
  atenas: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "12–22°C", emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Época perfecta para explorar la Acrópolis y el centro histórico sin el calor sofocante del verano.", tags: ["Clima ideal", "Menos turismo", "Terrazas al aire libre"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "25–34°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor intenso pero las playas del Egeo están a un tranvía. La ciudad se vacía en agosto y el turismo se dispara.", tags: ["Calor extremo", "Playas cerca", "Ciudad de turistas"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "14–25°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Excelente para el inicio de curso: temperaturas suaves, menos turistas y el mar todavía templado.", tags: ["Inicio Erasmus", "Mar templado", "Muy agradable"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "6–13°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Suave para ser invierno, con lluvia ocasional pero sin nieve. De los inviernos más templados de esta guía.", tags: ["Invierno suave", "Lluvia ocasional", "Sin nieve"] },
  ],
  zagreb: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–17°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La Ciudad Alta florece y las terrazas de café reabren en cuanto sale el sol. Época ideal para explorar a pie.", tags: ["Terrazas reabren", "Ciudad Alta", "Muy agradable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "18–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor seco y agradable. Muchos zagrebienses (y estudiantes) escapan a la costa adriática en pleno agosto.", tags: ["Escapadas a la costa", "Calor seco", "Ciudad más tranquila"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–17°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con clima suave y la vida de café en su máximo esplendor antes del frío.", tags: ["Inicio Erasmus", "Café en terraza", "Colores otoñales"], highlight: true },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-1–5°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío centroeuropeo con mercado navideño galardonado como uno de los mejores de Europa varios años seguidos.", tags: ["Mercado navideño", "Frío seco", "Ambiente festivo"] },
  ],
  liubliana: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–17°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "La ciudad más verde de Europa Central florece literalmente. Terrazas junto al río Ljubljanica en pleno esplendor.", tags: ["Ciudad verde", "Terrazas junto al río", "Muy agradable"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "17–27°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor agradable y excursiones constantes al lago Bled y los Alpes Julianos, a menos de una hora.", tags: ["Lago Bled", "Alpes Julianos", "Escapadas cercanas"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "6–16°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con los parques de la ciudad tiñéndose de colores otoñales espectaculares.", tags: ["Inicio Erasmus", "Colores otoñales", "Ciudad tranquila"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-2–4°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío centroeuropeo con nieve ocasional; el castillo iluminado sobre la ciudad crea un ambiente muy navideño.", tags: ["Castillo iluminado", "Frío seco", "Nieve ocasional"] },
  ],
  tallin: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "1–13°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Deshielo báltico y el casco medieval recuperando vida tras el invierno.", tags: ["Deshielo báltico", "Luz creciente", "Casco medieval"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "15–21°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Días larguísimos junto al Báltico y el casco antiguo en su mejor momento del año.", tags: ["Días largos", "Báltico", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "3–11°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con colores otoñales antes de que llegue el frío báltico.", tags: ["Inicio Erasmus", "Colores otoñales", "Días acortándose"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-6–-1°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío báltico intenso con nieve casi siempre; el mercado navideño de la plaza medieval es de los más bonitos de Europa.", tags: ["Mercado navideño", "Nieve segura", "Frío báltico"] },
  ],
  vilna: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "2–15°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Deshielo y el casco barroco recobrando vida tras el invierno. Užupis se llena de terrazas.", tags: ["Deshielo", "Terrazas en Užupis", "Luz creciente"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "16–23°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Días largos y agradables, perfectos para explorar el casco barroco y hacer excursiones a Trakai.", tags: ["Días largos", "Trakai cerca", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "4–13°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con colores otoñales espectaculares en los parques de la ciudad.", tags: ["Inicio Erasmus", "Colores otoñales", "Días acortándose"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-6–-1°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío báltico con nieve frecuente; el casco antiguo iluminado por Navidad es de un encanto especial.", tags: ["Nieve frecuente", "Navidad especial", "Frío báltico"] },
  ],
  riga: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "1–14°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Deshielo báltico con las fachadas Art Nouveau de Alberta iela recuperando protagonismo bajo el sol.", tags: ["Deshielo báltico", "Art Nouveau", "Luz creciente"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "16–22°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Días largos y la playa de Jurmala a 30 minutos en tren — la mejor época para descubrir la costa báltica.", tags: ["Jurmala cerca", "Días largos", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "3–12°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con colores otoñales espectaculares en los parques que rodean el casco antiguo.", tags: ["Inicio Erasmus", "Colores otoñales", "Días acortándose"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-6–-1°C", emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío báltico intenso con nieve casi siempre; el Mercado Central y sus luces navideñas compensan el frío.", tags: ["Mercado Central", "Nieve segura", "Frío báltico"] },
  ],
  bratislava: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "6–17°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El Danubio y el casco antiguo recobran vida. Época ideal para explorar la ciudad y sus alrededores a pie.", tags: ["Clima agradable", "Danubio en flor", "Terrazas"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "17–28°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor agradable y escapadas constantes a Viena o Budapest, ambas a menos de 3 horas.", tags: ["Escapadas cercanas", "Calor seco", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "8–17°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con el casco antiguo tiñéndose de colores otoñales junto al Danubio.", tags: ["Inicio Erasmus", "Colores otoñales", "Danubio"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-2–4°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío centroeuropeo con mercado navideño en la plaza principal, uno de los más entrañables de la región.", tags: ["Mercado navideño", "Frío seco", "Ambiente festivo"] },
  ],
  bucarest: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "8–20°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El parque Herăstrău y las terrazas del centro recobran vida con un clima muy agradable.", tags: ["Clima ideal", "Parques en flor", "Terrazas"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "20–33°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor intenso, típico de un clima continental extremo. La vida nocturna se traslada a terrazas y rooftops.", tags: ["Calor intenso", "Vida nocturna", "Rooftops"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "9–19°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con temperaturas suaves y los parques de la ciudad en pleno esplendor de color.", tags: ["Inicio Erasmus", "Colores otoñales", "Muy agradable"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-5–2°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío continental con nieve frecuente; los mercados navideños compensan las bajas temperaturas.", tags: ["Nieve frecuente", "Mercados navideños", "Frío intenso"] },
  ],
  sofia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "5–17°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El monte Vitosha reverdece y la ciudad recobra vida con clima muy agradable.", tags: ["Vitosha en flor", "Clima ideal", "Terrazas"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "17–29°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor seco y senderismo constante en Vitosha, con la montaña como refugio del calor de la ciudad.", tags: ["Senderismo", "Calor seco", "Montaña cerca"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "6–16°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con colores otoñales espectaculares en las laderas de Vitosha.", tags: ["Inicio Erasmus", "Colores otoñales", "Vitosha en colores"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-4–3°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Nieve habitual en Vitosha — de las pocas capitales del mundo donde se puede esquiar a 30 minutos del centro.", tags: ["Esquí urbano", "Nieve segura", "Vitosha nevado"] },
  ],
  ginebra: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "3–15°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "El lago Lemán despierta y las terrazas junto al Jet d'Eau reabren con los primeros días templados.", tags: ["Lago en flor", "Terrazas junto al lago", "Clima variable"] },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "15–25°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "La mejor época: baños en el lago, Fêtes de Genève en agosto y los Alpes nevados de fondo todavía en junio.", tags: ["Baño en el lago", "Fêtes de Genève", "Mejor época"], highlight: true },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "5–16°C",  emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Inicio de curso con clima suave; las viñas del cantón se tiñen de colores antes de la vendimia.", tags: ["Inicio Erasmus", "Viñedos otoñales", "Clima suave"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "-1–5°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío húmedo con niebla ocasional sobre el lago (la 'bise'), pero ski en los Alpes a menos de una hora.", tags: ["Ski cerca", "Niebla sobre el lago", "Frío húmedo"] },
  ],
  florencia: [
    { id: "spring", label: "Primavera", months: "Mar–May", temp: "9–20°C",  emoji: "🌸", bg: "#F0FDF4", accent: "#16A34A", light: "#BBF7D0", summary: "Época perfecta para pasear el centro histórico sin las aglomeraciones ni el calor del verano.", tags: ["Clima ideal", "Menos turismo", "Muy agradable"], highlight: true },
    { id: "summer", label: "Verano",    months: "Jun–Ago", temp: "18–31°C", emoji: "☀️", bg: "#FFFBEB", accent: "#D97706", light: "#FDE68A", summary: "Calor sofocante en el valle del Arno y turismo al máximo. Muchos florentinos escapan a la costa.", tags: ["Calor extremo", "Turismo masivo", "Escapadas a la costa"] },
    { id: "autumn", label: "Otoño",     months: "Sep–Nov", temp: "11–22°C", emoji: "🍂", bg: "#FFF7ED", accent: "#C2410C", light: "#FED7AA", summary: "Vendimia en la Toscana, menos turistas y arranque de curso con clima todavía cálido.", tags: ["Inicio Erasmus", "Vendimia toscana", "Menos turismo"] },
    { id: "winter", label: "Invierno",  months: "Dic–Feb", temp: "3–12°C",  emoji: "❄️", bg: "#EFF6FF", accent: "#1D4ED8", light: "#BFDBFE", summary: "Frío húmedo pero suave, raramente nieva. Mercados navideños y museos sin colas.", tags: ["Invierno suave", "Museos sin colas", "Lluvia ocasional"] },
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
};
