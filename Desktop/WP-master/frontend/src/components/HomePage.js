import React from 'react';
import './HomePage.css';

function HomePage({ navigateTo }) {
  return (
    <div className="homepage">
      <h2>Bienvenido a tu Wedding Planner Digital</h2>
      <p>Organiza tu boda fácilmente con nuestro planificador digital. Desde tareas mensuales hasta recordatorios importantes, tendrás todo bajo control.</p>
      <button onClick={() => navigateTo('dashboard')}>Ir al Dashboard</button>
    </div>
  );
}

export default HomePage;
