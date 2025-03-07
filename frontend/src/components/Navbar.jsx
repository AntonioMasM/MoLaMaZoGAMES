import React from "react";
import "../styles/Navbar.css";
import { FaSearch, FaCog } from "react-icons/fa"; // Importamos los iconos

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo de la empresa */}
      <a href="/" className="navbar-logo">MoLaMaZoGAMES</a>

      {/* Barra de búsqueda con icono */}
      <div className="navbar-search">
        <input type="text" placeholder="Buscar..." />
        <FaSearch className="navbar-search-icon" /> {/* Icono de lupa */}
      </div>

      {/* Botones de navegación */}
      <div className="navbar-buttons">
        <button className="navbar-button">Categorías</button>
        <button className="navbar-button">Explorar</button>
        <button className="navbar-button">Contacto</button>
        <button className="navbar-button">Inicio Sesión / Registro</button>
        <FaCog className="navbar-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
