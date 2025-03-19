import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ handleLogout, user }) => {
  const navigate = useNavigate();

  console.log("Usuario autenticado en Header:", user); // Verificar que `user` tiene datos

  return (
    <header className="header">
      {/* Contenedor izquierdo: Logo + Título (redirige a Home) */}
      <div className="logo-container" onClick={() => navigate("/")}>
        <img src="/dit-logo.png" alt="Logo" className="logo" />
        <h1 className="title">SecureHub</h1>
      </div>

      {/* Contenedor derecho: Botón de Logout + Perfil de usuario */}
      <div className="logout-container">
        {/* Botón de información de usuario con redirección a su página */}
        {user?.preferred_username && (
          <button
            className="user-butt"
            onClick={() => navigate(`/freeipa/user/${user.preferred_username}`)}
          >
            <img src="user-icon.png" alt="Perfil" className="user-icon" />
          </button>
        )}

        {/* Botón de Cerrar sesión */}
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
};

export default Header;
