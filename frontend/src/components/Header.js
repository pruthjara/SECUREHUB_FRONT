import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <img src="/dit-logo.png" alt="Logo" />
      <h1>SecureHub</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/freeipa/allusers">Users</Link>
        <Link to="/freeipa/groups">Groups</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;