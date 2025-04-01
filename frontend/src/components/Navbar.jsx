import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import {
  FaSearch, FaCog, FaBars, FaTimes, FaSignOutAlt,
  FaCompass, FaEnvelope, FaUser,
  FaPalette, FaUniversalAccess, FaQuestionCircle
} from "react-icons/fa";

import { useUser } from "../context/UserContext";
import useIsSmallScreen from "../hooks/useIsSmallScreen";
import CategoryDropdown from "./CategoryDropdown"; // Asegúrate de que este componente exista

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false); // Controlar el estado del dropdown
  const isSmallScreen = useIsSmallScreen();
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { label: "Explorar", icon: <FaCompass />, to: "/" },
    { label: "Contacto", icon: <FaEnvelope />, to: "/contact" },
  ];

  const handleCategoryClick = () => {
    navigate("/categorias");
  };

  // Manejo del foco para el menú
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSettings(false);
      setMenuOpen(false); // Cierra el menú hamburguesa al presionar "Escape"
    }
  };

  useEffect(() => {
    if (showSettings || menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSettings, menuOpen]);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">MoLaMaZoGAMES</span>
          <img src="/assets/logo.png" alt="Logo MoLaMaZoGAMES" className="logo-image" />
        </Link>
      </div>

      <div className="navbar-center">
        <div className="navbar-search">
          <input type="text" placeholder="Buscar assets, categorías..." />
          <FaSearch className="navbar-search-icon" />
        </div>
      </div>

      <div className="navbar-right">
        <div className={`navbar-buttons ${menuOpen ? "open" : ""}`}>
          {/* Botón de Categorías con dropdown */}
          <div
            className="navbar-button"
            onClick={handleCategoryClick}
            onMouseEnter={() => setCategoryDropdownOpen(true)} // Abre el dropdown al pasar el ratón
            onMouseLeave={() => setCategoryDropdownOpen(false)} // Cierra el dropdown al salir el ratón
            onFocus={() => setCategoryDropdownOpen(true)} // Abre al hacer foco
            onBlur={() => setCategoryDropdownOpen(false)} // Cierra al perder el foco
            title="Categorías"
            aria-label="Categorías"
          >
            {!isSmallScreen && "Categorías"}
          </div>

          {/* Dropdown de Categorías */}
          {isCategoryDropdownOpen && <CategoryDropdown />}

          {/* Otros ítems de navegación */}
          {navItems.map(({ label, icon, to }) => (
            <Link key={label} to={to} className="navbar-button" title={label} aria-label={label}>
              {isSmallScreen ? icon : label}
            </Link>
          ))}

          {user ? (
            <Link to="/profile" className="navbar-button user-dropdown" title="Perfil" aria-label="Ver perfil">
              <img src={user.fotoPerfil} alt="Foto de perfil" className="user-profile-pic" />
            </Link>
          ) : (
            <Link to="/login" className="navbar-button" title="Inicio de sesión" aria-label="Ir a inicio de sesión">
              {isSmallScreen ? <FaUser /> : "Inicio Sesión / Registro"}
            </Link>
          )}

          <button
            className="navbar-icon settings-icon"
            onClick={() => setShowSettings(!showSettings)}
            title="Configuración"
            aria-label="Abrir configuración"
          >
            <FaCog />
          </button>

          {showSettings && (
            <div className="settings-dropdown">
              {user && (
                <button className="dropdown-item" onClick={handleLogout}>
                  <FaSignOutAlt style={{ marginRight: 8 }} /> Cerrar Sesión
                </button>
              )}
              <button className="dropdown-item" onClick={() => alert("Próximamente: cambiar tema")}>
                <FaPalette style={{ marginRight: 8 }} /> Cambiar Tema
              </button>
              <button className="dropdown-item" onClick={() => alert("Opciones de accesibilidad próximamente")}>
                <FaUniversalAccess style={{ marginRight: 8 }} /> Accesibilidad
              </button>
              <button className="dropdown-item" onClick={() => navigate("/ayuda")}>
                <FaQuestionCircle style={{ marginRight: 8 }} /> Ayuda / Soporte
              </button>
            </div>
          )}
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} title="Abrir menú" aria-label="Abrir menú">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <nav className="dropdown-menu">
          {navItems.map(({ label, to }) => (
            <Link key={label} to={to} className="dropdown-item" aria-label={label}>
              {label}
            </Link>
          ))}
          {user ? (
            <button className="dropdown-item" onClick={handleLogout} aria-label="Cerrar sesión">
              <FaSignOutAlt /> Cerrar Sesión
            </button>
          ) : (
            <Link to="/login" className="dropdown-item" aria-label="Ir a inicio de sesión">
              <FaUser /> Inicio Sesión / Registro
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
