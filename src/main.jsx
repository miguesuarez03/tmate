import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Tipografías servidas desde el propio dominio (Fontsource, licencia OFL), en
// vez de Google Fonts: mismo aspecto y la IP del visitante no sale a Google.
// Bricolage Grotesque variable con ejes opsz + wght (200–800); Fraunces solo
// en los pesos que usan los titulares editoriales.
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/fraunces/800.css";
import "@fontsource/fraunces/900.css";
import "@fontsource/fraunces/700-italic.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
