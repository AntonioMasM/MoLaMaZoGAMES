import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaFolderOpen,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

import styles from "./Navbar.module.css";
import useIsSmallScreen from "../../hooks/useIsSmallScreen";
import { useUser } from "../../context/UserContext";
import CategoryDropdown from "./CategoryDropdown";
import UserSection from "./UserSection";
import SettingsDropdown from "./SettingsDropdown";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isSmallScreen = useIsSmallScreen();
  const { user } = useUser();
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSettings(false);
      setMenuOpen(false);
      setCategoryDropdownOpen(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/buscar?q=${query}`);
      setMenuOpen(false);
      setQuery("");
    }
  };

  useEffect(() => {
    if (showSettings || menuOpen || isCategoryDropdownOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSettings, menuOpen, isCategoryDropdownOpen]);

  return (
    <header className={styles.navbar}>
      {/* Izquierda */}
      <div className={styles.left}>
        <Link to="/" className={styles.logo} aria-label="Página principal MoLaMaZoGAMES">
          <span className={styles.logoText}>MoLaMaZoGAMES</span>
          <img
            src="/assets/logo.png"
            alt="Logo MoLaMaZoGAMES"
            className={styles.logoImage}
          />
        </Link>

        {windowWidth > 400 && (
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Buscar assets, categorías..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <FaSearch className={styles.searchIcon} onClick={handleSearch} />
          </div>
        )}
      </div>

      {/* Derecha */}
      <div className={styles.right}>
        <div className={`${styles.navButtons} ${menuOpen ? styles.open : ""}`}>
          {/* Categorías */}
          <div
            className={styles.navButtonWrapper}
            onMouseEnter={() => setCategoryDropdownOpen(true)}
            onMouseLeave={() => setCategoryDropdownOpen(false)}
          >
            <div className={styles.navButton} title="Categorías">
              {isSmallScreen ? <FaFolderOpen /> : "Categorías"}
            </div>
            {isCategoryDropdownOpen && <CategoryDropdown />}
          </div>

          {/* Búsqueda en móvil */}
          {windowWidth <= 400 && (
            <div className={styles.dropdownSearch}>
              <input
                type="text"
                placeholder="Buscar..."
                className={styles.dropdownSearchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <FaSearch className={styles.dropdownSearchIcon} onClick={handleSearch} />
            </div>
          )}

          {/* Usuario no autenticado */}
          {!isAuthenticated && (
            <>
              {isSmallScreen ? (
                <>
                  <Link
                    to="/login"
                    className={styles.navButton}
                    title="Iniciar sesión"
                    aria-label="Iniciar sesión"
                  >
                    <FaSignInAlt />
                  </Link>
                  <Link
                    to="/register"
                    className={styles.navButton}
                    title="Registrarse"
                    aria-label="Registrarse"
                  >
                    <FaUserPlus />
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className={styles.authButton} aria-label="Iniciar sesión">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" className={styles.authButton} aria-label="Registrarse">
                    Registrarse
                  </Link>
                </>
              )}
            </>
          )}

          {/* Usuario autenticado */}
          {isAuthenticated && (
            <UserSection isSmallScreen={isSmallScreen} onLogout={() => setShowSettings(false)} />
          )}

          {/* Configuración */}
          <button
            className={styles.iconButton}
            onClick={() => setShowSettings(!showSettings)}
            title="Configuración"
          >
            ⚙️
          </button>

          {showSettings && <SettingsDropdown onClose={() => setShowSettings(false)} />}
        </div>

        {/* Menú hamburguesa */}
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          title="Abrir menú"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
