import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ handleLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <img src="/dit-logo.png" alt="Logo" className="logo" />
        <h1>SecureHub</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/freeipa/allusers">Users</Link>
          <Link to="/freeipa/groups">Groups</Link>
          <button className="logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
