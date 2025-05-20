import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaFolderOpen,
  FaSignInAlt,
  FaUserPlus,
  FaCog,
} from "react-icons/fa";

import styles from "./Navbar.module.css";
import useIsSmallScreen from "../../hooks/useIsSmallScreen";
import { useUser } from "../../context/UserContext";
import CategoryDropdown from "./CategoryDropdown";
import UserSection from "./UserSection";
import SettingsDropdown from "./SettingsDropdown";
import NotificationBell from "./NotificationBell";
import SearchDropdown from "./SearchDropdown";
import { useDebounce } from 'use-debounce';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [debouncedQuery] = useDebounce(query, 300);

  const isCompactScreen = windowWidth <= 1220;
  const isHamburgerScreen = windowWidth <= 1000;
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
      setQuery("");
    }
  };

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      const encoded = encodeURIComponent(trimmed);
      navigate(`/search?q=${encoded}`);
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
  {/* IZQUIERDA */}
  <div className={styles.left}>
    <Link to="/" className={styles.logo} aria-label="Página principal MoLaMaZoGAMES">
      <span className={styles.logoText}>MoLaMaZoGAMES</span>
      <img src="/assets/logo.png" alt="Logo MoLaMaZoGAMES" className={styles.logoImage} />
    </Link>

    {/* Buscador visible solo > 400px */}
{windowWidth > 400 && (
  <div className={styles.search}>
    <input
      type="text"
      placeholder="Buscar assets, categorías..."
      aria-label="Buscar contenido"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    />
    <button className={styles.searchButton} onClick={handleSearch} aria-label="Buscar">
      <FaSearch />
    </button>

    {/* 🔧 Siempre montado, visibilidad controlada */}
      <SearchDropdown
        query={debouncedQuery}
        visible={debouncedQuery.trim().length > 0}
        onClose={() => setQuery("")}
      />


    {windowWidth > 560 && (
      <Link
        to="/search"
        className={styles.advancedSearchLink}
        aria-label="Ir a búsqueda avanzada"
      >
        Búsqueda Avanzada
      </Link>
    )}
  </div>
)}
  </div>

  {/* DERECHA */}
  <div className={styles.right}>
    {/* BOTÓN HAMBURGUESA */}
    {isHamburgerScreen && (
      <button
        className={styles.menuToggle}
        onClick={() => setMenuOpen(!menuOpen)}
        title="Abrir menú"
        aria-label="Abrir o cerrar menú"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    )}

    {/* NAVEGACIÓN RESPONSIVE */}
    <nav
      className={`${styles.navButtons} ${
        isHamburgerScreen ? styles.mobileNav : styles.desktopNav
      } ${menuOpen ? styles.open : ""}`}
    >
      {/* CATEGORÍAS */}
      {isAuthenticated && (
        isHamburgerScreen ? (
          <Link to="/categories" className={styles.navButton} onClick={() => setMenuOpen(false)}>
            <FaFolderOpen />
          </Link>
        ) : (
          <div
            className={styles.navButtonWrapper}
            onMouseEnter={() => setCategoryDropdownOpen(true)}
            onMouseLeave={() => setCategoryDropdownOpen(false)}
          >
            <div className={styles.navButton}>
              {isCompactScreen ? <FaFolderOpen /> : "Categorías"}
            </div>
            {isCategoryDropdownOpen && <CategoryDropdown />}
          </div>
        )
      )}

      {/* BÚSQUEDA XS (solo hamburguesa) */}
{windowWidth <= 400 && (
  <div className={styles.dropdownSearch}>
    <input
      type="text"
      placeholder="Buscar..."
      className={styles.dropdownSearchInput}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      aria-label="Buscar contenido"
    />
    <FaSearch className={styles.dropdownSearchIcon} onClick={handleSearch} />

    {/* 🔧 Siempre montado */}
    <SearchDropdown
      query={debouncedQuery}
      visible={debouncedQuery.trim().length > 0}
      onClose={() => setQuery("")}
    />

  </div>
)}

      {/* BÚSQUEDA AVANZADA en XS */}
      {windowWidth <= 560 && (
        <Link to="/search" className={styles.navButton} onClick={() => setMenuOpen(false)}>
          Búsqueda Avanzada
        </Link>
      )}

      {/* USUARIO NO AUTENTICADO */}
      {!isAuthenticated && (
        isSmallScreen ? (
          <>
            <Link to="/login" className={styles.navButton}><FaSignInAlt /></Link>
            <Link to="/register" className={styles.navButton}><FaUserPlus /></Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.authButton}>Iniciar Sesión</Link>
            <Link to="/register" className={styles.authButton}>Registrarse</Link>
          </>
        )
      )}

      {/* USUARIO AUTENTICADO */}
      {isAuthenticated && (
        <>
          <UserSection
            isCompactScreen={isCompactScreen}
            isHamburgerScreen={isHamburgerScreen}
            menuOpen={menuOpen}
          />
          <NotificationBell />
        </>
      )}

      {/* CONFIGURACIÓN */}
      <button
        className={styles.navButton}
        onClick={() => setShowSettings(!showSettings)}
        title="Configuración"
        aria-label="Abrir configuración"
      >
        <FaCog />
      </button>
      {showSettings && <SettingsDropdown onClose={() => setShowSettings(false)} />}
    </nav>
  </div>
</header>

  );
};

export default Navbar;
