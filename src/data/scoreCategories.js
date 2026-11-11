// Las 8 categorías de puntuación de cada ciudad, en el orden en que se
// enseñan. Etiqueta, icono y color son iguales en todas las ciudades (lo
// comprueba scripts/city-data.mjs al generar el índice), así que el índice
// ligero solo guarda la nota de cada una y esto pone el resto.
export const SCORE_CATEGORIES = [
  { id: "coste", label: "Coste de vida", icon: "💰", color: "#B45309" },
  { id: "alojamiento", label: "Alojamiento", icon: "🏠", color: "#EF4444" },
  { id: "vida_social", label: "Vida social y ambiente", icon: "🎉", color: "#8B5CF6" },
  { id: "integracion", label: "Integración internacional", icon: "🌍", color: "#3F7A7D" },
  { id: "movilidad", label: "Ubicación y movilidad", icon: "🚆", color: "#F59E0B" },
  { id: "estilo_vida", label: "Estilo de vida y entorno", icon: "🏔️", color: "#3F7A7D" },
  { id: "empleo", label: "Empleo y oportunidades", icon: "💼", color: "#8B5CF6" },
  { id: "seguridad", label: "Seguridad", icon: "🛡️", color: "#22C55E" },
];
