import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak from "./keycloak"; // Configuración de Keycloak
import Home from "./pages/Home";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import User from "./pages/User";

// Componente para manejar rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { keycloak } = useKeycloak();
  
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
        <li><a href="/">Home</a></li>
        <li><a href="/freeipa/allusers">Users</a></li>
        <li><a href="/freeipa/groups">Groups</a></li>
        <li><a href="/freeipa/user/testuser">User</a></li>
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
