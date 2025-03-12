import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <img src="/dit-logo.png" alt="Logo" className="logo" />
          <h1>SecureHub</h1>
        </div>

        {/* Botón de menú hamburguesa para móviles */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/freeipa/allusers" onClick={() => setMenuOpen(false)}>Users</Link>
          <Link to="/freeipa/groups" onClick={() => setMenuOpen(false)}>Groups</Link>
          <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
