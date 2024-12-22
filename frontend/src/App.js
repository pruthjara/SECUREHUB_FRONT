import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import keycloak from "./keycloak"; // Configuración de Keycloak
import Home from "./pages/Home";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import User from "./pages/User";

const App = () => {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // Inicialización de Keycloak
  useEffect(() => {
    keycloak
      .init({ onLoad: "login-required" }) // Cambiar a "check-sso" si necesitas depuración
      .then((auth) => {
        console.log("¿Usuario autenticado?:", auth);
        setAuthenticated(auth);
        setKeycloakInitialized(true);
      })
      .catch((error) => {
        console.error("Error al inicializar Keycloak:", error);
        setKeycloakInitialized(true); // Incluso si falla, marcamos como inicializado
      });
  }, []);

  if (!keycloakInitialized) {
    return <div>Cargando Keycloak...</div>;
  }

  return (
    <Router>
      <Navbar />
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
  );
};

// Navbar con links y logout
const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/freeipa/allusers">Users</Link></li>
      <li><Link to="/freeipa/groups">Groups</Link></li>
      <li><Link to="/freeipa/user/testuser">User</Link></li>
      <li>
        <button onClick={() => keycloak.logout({ redirectUri: "http://138.4.11.247:3000" })}>
          Logout
        </button>
      </li>
    </ul>
  </nav>
);

// Componente para rutas protegidas
const ProtectedRoute = ({ authenticated, children }) => {
  if (!authenticated) {
    console.log("Usuario no autenticado, redirigiendo al inicio de sesión...");
    keycloak.login(); // Forzar inicio de sesión si no está autenticado
    return <div>Redirigiendo al inicio de sesión...</div>;
  }
  return children;
};

export default App;
