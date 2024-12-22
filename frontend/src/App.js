import React, { useState, useEffect } from "react";
import Keycloak from "keycloak-js";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import User from "./pages/User";
import "./styles/Global.css";

// Configuración de Keycloak
const keycloakOptions = {
  url: "http://138.4.11.247:8080",
  realm: "master",
  clientId: "frontend-client",
};

function App() {
  const [keycloakInstance, setKeycloakInstance] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const initKeycloak = async () => {
      const keycloak = new Keycloak(keycloakOptions);
      console.log("Inicializando Keycloak...");
      try {
        const auth = await keycloak.init({
          onLoad: "login-required",
          checkLoginIframe: false,
        });
        console.log("Estado de autenticación:", auth);
        setKeycloakInstance(keycloak);
        setAuthenticated(auth);
      } catch (error) {
        console.error("Error al inicializar Keycloak:", error);
      }
    };
    initKeycloak();
  }, []);

  const handleLogout = () => {
    if (keycloakInstance) {
      keycloakInstance.logout({ redirectUri: "http://192.168.100.108:3000" });
    }
  };

  const ProtectedRoute = ({ authenticated, children }) => {
    return authenticated ? children : <Navigate to="/" />;
  };

  if (!keycloakInstance) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">SecureHub</a>
          <ul className="navbar-nav ms-auto">
            {authenticated && (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/freeipa/allusers"
            element={
              <ProtectedRoute authenticated={authenticated}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/freeipa/groups"
            element={
              <ProtectedRoute authenticated={authenticated}>
                <Groups />
              </ProtectedRoute>
            }
          />
          <Route
            path="/freeipa/user/:username"
            element={
              <ProtectedRoute authenticated={authenticated}>
                <User />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
