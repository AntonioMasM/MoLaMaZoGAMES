import React from "react";
import "../styles/Navbar.css";
import { FaCog } from "react-icons/fa"; // Importar el icono de configuración

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Logo de la empresa */}
      <a href="/" className="navbar-logo">MoLaMaZoGAMES</a>

      {/* Barra de búsqueda */}
      <div className="navbar-search">
        <input type="text" placeholder="Buscar..." />
      </div>

      {/* Botones de navegación */}
      <div className="navbar-buttons">
        <button className="navbar-button">Categorías</button>
        <button className="navbar-button">Explorar</button>
        <button className="navbar-button">Contacto</button>
        <button className="navbar-button">Inicio Sesión / Registro</button>
        <FaCog className="navbar-icon" />
      </div>
    </div>
  );
};

export default Navbar;
