import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FaSearch, FaCog, FaBars, FaTimes, FaLayerGroup, FaCompass, FaEnvelope, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1270);

  // Detecta cambios en el tamaño de pantalla y actualiza el estado
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1270);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="navbar">
      {/* Logo de la empresa */}
      <Link to="/" className="navbar-logo">MoLaMaZoGAMES</Link>

      {/* Barra de búsqueda con icono */}
      <div className="navbar-search">
        <input type="text" placeholder="Buscar assets, categorías..." />
        <FaSearch className="navbar-search-icon" />
      </div>

      {/* Menú de navegación */}
      <div className={`navbar-buttons ${menuOpen ? "open" : ""}`}>
        <button className="navbar-button">
          <FaLayerGroup /> {!isSmallScreen && " Categorías"}
        </button>
        <button className="navbar-button">
          <FaCompass /> {!isSmallScreen && " Explorar"}
        </button>
        <button className="navbar-button">
          <FaEnvelope /> {!isSmallScreen && " Contacto"}
        </button>
        <Link to="/login" className="navbar-button">
          <FaUser /> {!isSmallScreen && " Inicio Sesión / Registro"}
        </Link>
        <FaCog className="navbar-icon" />
      </div>

      {/* Menú hamburguesa (sólo visible en móviles) */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menú desplegable con texto completo */}
      {menuOpen && (
        <nav className="dropdown-menu">
          <button className="dropdown-item">Categorías</button>
          <button className="dropdown-item">Explorar</button>
          <button className="dropdown-item">Contacto</button>
          <Link to="/login" className="dropdown-item">Inicio Sesión / Registro</Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
