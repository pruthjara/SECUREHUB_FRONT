import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak from "./keycloak"; // Configuración de Keycloak
import Home from "./pages/Home";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import User from "./pages/User";

// Componente para manejar rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();

  // Mientras Keycloak se inicializa
  if (!initialized) {
    return <div>Cargando autenticación...</div>;
  }

  // Si no está autenticado, redirige al home
  if (!keycloak.authenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

// Componente de navegación
const Navbar = () => {
  const { keycloak } = useKeycloak();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/freeipa/allusers" activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/freeipa/groups" activeClassName="active">
            Groups
          </NavLink>
        </li>
        <li>
          <NavLink to="/freeipa/user/testuser" activeClassName="active">
            User
          </NavLink>
        </li>
        {keycloak.authenticated && (
          <li>
            <button onClick={() => keycloak.logout({ redirectUri: "http://192.168.100.108:3000" })}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

// Aplicación principal
const App = () => {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: "login-required" }}
      LoadingComponent={<div>Cargando Keycloak...</div>}
      onEvent={(event, error) => {
        console.log("Keycloak Event:", event);
        if (error) console.error("Keycloak Error:", error);
      }}
      onTokens={(tokens) => {
        console.log("Keycloak Tokens:", tokens);
      }}
    >
      <Router>
        <Navbar />
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
      </Router>
    </ReactKeycloakProvider>
  );
};

export default App;
