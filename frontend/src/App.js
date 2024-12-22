import React, { useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import User from "./pages/User";
import "./styles/Global.css";

// Fallback solo para randomUUID
if (!window.crypto?.randomUUID) {
  console.warn("Web Crypto API no está disponible. Usando fallback temporal para randomUUID.");
  window.crypto.randomUUID = () => Math.random().toString(36).substring(2, 15);
}

// Configuración de Keycloak
const keycloakConfig = {
  url: "http://138.4.11.247:8080",
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
      keycloak.logout({ redirectUri: "http://138.4.11.247:3000" });
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
      <div>
        {/* Barra de navegación */}
        {authenticated && (
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">SecureHub</a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/freeipa/allusers">Usuarios</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/freeipa/groups">Grupos</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/freeipa/user/testuser">Detalles Usuario</Link>
                  </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}

        {/* Contenido de la aplicación */}
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;

