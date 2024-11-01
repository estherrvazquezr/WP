import React from 'react';
import './Navbar.css';

function Navbar({ navigateTo }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Wedding Planner</h1>
      <ul className="navbar-links">
        <li onClick={() => navigateTo('home')}>Inicio</li>
        <li onClick={() => navigateTo('dashboard')}>Dashboard</li>
        <li>Ayuda</li> {/* Puedes agregar más enlaces aquí */}
      </ul>
    </nav>
  );
}

export default Navbar;
