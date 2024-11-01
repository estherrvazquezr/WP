import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Estado para controlar la página actual

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Navbar navigateTo={navigateTo} /> {/* Menú de navegación */}
      {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
      {currentPage === 'dashboard' && <Dashboard />}
    </div>
  );
}

export default App;
