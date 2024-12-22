import React from "react";
import ReactDOM from "react-dom/client"; // React 18 utiliza createRoot
import App from "./App";
import "./index.css"; // Importa estilos globales si tienes

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
