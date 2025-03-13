import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ handleLogout }) => {
  return (
    <header className="header">
      {/* Contenedor izquierdo: Logo + Título */}
      <div className="logo-container">
        <img src="/dit-logo.png" alt="Logo" className="logo" />
        <h1 className="title">SecureHub</h1>
      </div>

      {/* Contenedor central: Links */}
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/freeipa/allusers">Users</Link>
        <Link to="/freeipa/groups">Groups</Link>
      </nav>

      {/* Contenedor derecho: Botón de Logout */}
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
};

export default Header;

