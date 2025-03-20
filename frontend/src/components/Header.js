import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ handleLogout, user }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* Contenedor izquierdo: Logo + Título (redirige a Home) */}
      <div className="logo-container" onClick={() => navigate("/")}>
        <img src="/dit-logo.png" alt="Logo" className="logo" />
        <h1 className="title">SecureHub</h1>
      </div>

      {/* Contenedor derecho: Flechas de navegación + Botón de usuario + Logout */}
      <div className="logout-container">
        {/* Botones de navegación */}
        <button className="nav-button" onClick={() => window.history.back()}>
          {"<"}
        </button>
        <button className="nav-button" onClick={() => window.history.forward()}>
          {">"}
        </button>

        {/* Botón de información de usuario con redirección a su página */}
        {user && (
          <button
            className="user-button2"
            onClick={() => navigate(`/freeipa/user/${user.preferred_username}`)}
          >
            <img src="/user-icon.png" alt="Perfil" className="user-icon" />
          </button>
        )}

        {/* Botón de Cerrar sesión */}
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
