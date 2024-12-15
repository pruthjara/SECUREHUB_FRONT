import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Home</Link>
    <Link to="/users">Users</Link>
    <Link to="/groups">Groups</Link>
  </nav>
);

export default Navbar;
