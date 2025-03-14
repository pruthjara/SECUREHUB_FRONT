import React, { useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import User from "./pages/User";
import Header from "./components/Header";
import "./styles/Global.css";
import GroupDetails from "./pages/GroupDetails";

// Fallback solo para randomUUID
if (!window.crypto?.randomUUID) {
  console.warn("Web Crypto API no está disponible. Usando fallback temporal para randomUUID.");
  window.crypto.randomUUID = () => Math.random().toString(36).substring(2, 15);
}

// Configuración de Keycloak
const keycloakConfig = {
  url: "http://138.4.11.249:8080",
  realm: "securehub",
  clientId: "securehub-frontend",
};

const App = () => {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const keycloakInstance = new Keycloak(keycloakConfig);
    console.log("Iniciando Keycloak...");

    keycloakInstance
      .init({
        onLoad: "login-required",
        checkLoginIframe: false,
        pkceMethod: false,
      })
      .then((auth) => {
        console.log("Autenticación exitosa:", auth);
        setKeycloak(keycloakInstance);
        setAuthenticated(auth);
      })
      .catch((error) => {
        console.error("Error inicializando Keycloak:", error);
      });
  }, []);

  const handleLogout = () => {
    if (keycloak) {
      keycloak.logout({ redirectUri: "http://138.4.11.249:3030" })
    }
  };

  const ProtectedRoute = ({ children }) => {
    if (!authenticated) {
      console.log("Usuario no autenticado. Redirigiendo al login...");
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      {/*  Header fijo arriba solo si el usuario está autenticado */}
      {authenticated && <Header handleLogout={handleLogout} />}

      {/*  Contenedor de la app con padding para que no lo tape el header */}
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/freeipa/allusers"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/freeipa/groups"
            element={
              <ProtectedRoute>
                <Groups />
              </ProtectedRoute>
            }
          />
          <Route
            path="/freeipa/user/:username"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/freeipa/group/:groupName"
            element={
              <ProtectedRoute>
                <GroupDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;