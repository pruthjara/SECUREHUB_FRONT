import React, { useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import User from "./pages/User";
import Databases from "./pages/Databases";
import DefaultHome from "./pages/DefaultHome";
import Roles from "./pages/Roles";
import VpnRequest from "./pages/VpnRequest";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
  const [user, setUser] = useState(null);

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

        if (auth) {
          const userInfo = keycloakInstance.tokenParsed; // Obtener datos del usuario
          console.log("Usuario autenticado:", userInfo);
          setUser(userInfo); // Guardar el usuario en el estado
        }
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


  return (
    <Router>
      {authenticated && <Header handleLogout={handleLogout} user={user} />}


      <main className="main-content">
        <Routes>
        <Route path="/" element={user?.preferred_username === "pruth" ? <Home user={user} /> : <DefaultHome user={user} />} />
          <Route path="/databases" element={<Databases />}/>
          <Route path="/freeipa/allusers" element={<Users />} />
          <Route path="/freeipa/groups" element={<Groups />} />
          <Route path="/freeipa/user/:username" element={<User />} />
          <Route path="/freeipa/group/:groupName" element={<GroupDetails />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/vpn-request" element={<VpnRequest />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;