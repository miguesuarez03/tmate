import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { writeCityData } from "./scripts/city-data.mjs";

// Genera src/data/generated/ (índice ligero + una ficha por ciudad, ver
// scripts/city-data.mjs) antes de que Vite resuelva ningún import. Los datos
// de src/data/ entran en este config como dependencias: si cambian en
// `vite dev`, Vite reinicia el servidor y se vuelven a generar.
function cityDataPlugin() {
  return {
    name: "mabroad-city-data",
    buildStart() {
      writeCityData();
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [cityDataPlugin(), react()],
  build: {
    // dist/.vite/manifest.json: el prerender lo usa para saber qué chunks y
    // CSS precargar en cada página (y después lo borra de dist/).
    manifest: !isSsrBuild,
  },
}));
