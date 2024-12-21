import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Keycloak from "keycloak-js";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import { Button } from "primereact/button";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import User from "./pages/User";

// Configuración de Keycloak
const keycloakOptions = {
  url: "http://192.168.100.3:8080", // Cambia por tu URL de Keycloak
  realm: "securehub", // Reemplaza con tu realm
  clientId: "securehub-frontend", // Reemplaza con tu clientId
};

// Inicializar Keycloak
const keycloak = new Keycloak(keycloakOptions);

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    keycloak
      .init({
        onLoad: "login-required", // Redirige automáticamente al login si no está autenticado
        checkLoginIframe: true, // Verifica sesión sin recargar
        pkceMethod: "S256", // Usa PKCE para mayor seguridad
      })
      .then((auth) => {
        if (auth) {
          setAuthenticated(true);
          console.log("Autenticado:", auth);
          console.log("Token de acceso:", keycloak.token);

          // Manejo de expiración del token
          keycloak.onTokenExpired = () => {
            console.log("Token expirado. Intentando refrescar...");
            keycloak
              .updateToken(30) // Refrescar token con 30 segundos restantes
              .then((refreshed) => {
                if (refreshed) {
                  console.log("Token actualizado:", keycloak.token);
                } else {
                  console.warn("Token no pudo ser refrescado.");
                }
              })
              .catch((error) => {
                console.error("Error al refrescar el token:", error);
                keycloak.logout(); // Redirigir al logout si falla
              });
          };
        } else {
          keycloak.login();
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fallo en la inicialización de Keycloak:", err);
        setLoading(false);
      });
  }, []);

  // Manejar cierre de sesión
  const handleLogout = () => {
    keycloak.logout({ redirectUri: "http://138.4.11.247:3000/" });
  };

  if (loading) {
    return <div>Cargando...</div>; // Spinner mientras se inicializa Keycloak
  }

  return (
    <div className="App">
      <div className="grid">
        <div className="col-12">
          <h1>Mi Aplicación Segura con Keycloak</h1>
        </div>
      </div>
      <div className="grid">
        <div className="col-2">
          <Button
            onClick={() => setInfoMessage(authenticated ? "Autenticado: TRUE" : "Autenticado: FALSE")}
            label="¿Está autenticado?"
            className="m-1 custom-btn-style"
          />
          <Button
            onClick={() => setInfoMessage(keycloak.token)}
            label="Mostrar Token"
            className="m-1 custom-btn-style"
            severity="info"
          />
          <Button
            onClick={handleLogout}
            label="Cerrar Sesión"
            className="m-1 custom-btn-style"
            severity="danger"
          />
        </div>
      </div>

      {/* Rutas protegidas */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/freeipa/allusers"
            element={authenticated ? <Users /> : <Navigate to="/" />}
          />
          <Route
            path="/freeipa/groups"
            element={authenticated ? <Groups /> : <Navigate to="/" />}
          />
          <Route
            path="/freeipa/user/:username"
            element={authenticated ? <User /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>

      {/* Mensajes de información */}
      <div className="info-panel">
        <p>{infoMessage}</p>
      </div>
    </div>
  );
}

export default App;
