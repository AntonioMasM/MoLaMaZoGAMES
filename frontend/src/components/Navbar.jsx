import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { FaSearch, FaCog, FaBars, FaTimes, FaLayerGroup, FaCompass, FaEnvelope, FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1270);
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const navigate = useNavigate(); // Para redireccionar al usuario después de cerrar sesión

  // Detecta cambios en el tamaño de pantalla y actualiza el estado
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1270);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Verificar si hay un usuario autenticado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Convertir de string a objeto

    }
  }, []);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token
    localStorage.removeItem("user"); // Eliminar los datos del usuario
    setUser(null); // Limpiar el estado del usuario
    navigate("/"); // Redirigir a la página de inicio
  };

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
          {isSmallScreen && <FaLayerGroup />} {!isSmallScreen && " Categorías"}
        </button>
        <button className="navbar-button">
        {isSmallScreen && <FaCompass />} {!isSmallScreen && " Explorar"}
        </button>
        <button className="navbar-button">
        {isSmallScreen && <FaEnvelope />} {!isSmallScreen && " Contacto"}
        </button>

        {/* Mostrar el usuario autenticado o la opción de inicio de sesión */}
        {user ? (
          <div className="user-menu">
            <button className="navbar-button user-dropdown">
              <img
                src={user.fotoPerfil}
                alt="Foto de perfil"
                className="user-profile-pic"
              />
            </button>


          </div>
        ) : (
          <Link to="/login" className="navbar-button">
            {isSmallScreen && <FaUser />} {!isSmallScreen && " Inicio Sesión / Registro"}
          </Link>
        )}

        <button className="navbar-icon settings-icon" onClick={() => setShowSettings(!showSettings)}>
          <FaCog />
        </button>
        {showSettings && user &&(
          <div className="settings-dropdown">
            <button className="dropdown-item" onClick={handleLogout}>
              <FaSignOutAlt /> Cerrar Sesión
            </button>
          </div>
        )}

      </div>

      {/* Menú hamburguesa (sólo visible en móviles) */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menú desplegable en móvil */}
      {menuOpen && (
        <nav className="dropdown-menu">
          <button className="dropdown-item">Categorías</button>
          <button className="dropdown-item">Explorar</button>
          <button className="dropdown-item">Contacto</button>
          {user ? (
            <>
              <button className="dropdown-item" onClick={handleLogout}>
                <FaSignOutAlt /> Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="dropdown-item">Inicio Sesión / Registro</Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
