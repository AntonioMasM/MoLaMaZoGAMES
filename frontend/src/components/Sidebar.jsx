import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaImages, FaHeart, FaCog, FaUserFriends, FaEnvelope } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Obtener la ruta actual

  return (
    <nav className="sidebar">
      <ul>
        <li className={location.pathname === "/profile" ? "active" : ""}>
          <Link to="/profile">
            <FaHome /> Inicio
          </Link>
        </li>
        <li className={location.pathname === "/gallery" ? "active" : ""}>
          <Link to="/gallery">
            <FaImages /> Galería
          </Link>
        </li>
        <li className={location.pathname === "/favoritos" ? "active" : ""}>
          <Link to="/favoritos">
            <FaHeart /> Favoritos
          </Link>
        </li>
        <li className={location.pathname === "/configuracion" ? "active" : ""}>
          <Link to="/configuracion">
            <FaCog /> Configuración
          </Link>
        </li>
        <li className={location.pathname === "/siguiendo" ? "active" : ""}>
          <Link to="/siguiendo">
            <FaUserFriends /> Siguiendo
          </Link>
        </li>
        <li className={location.pathname === "/mensajes" ? "active" : ""}>
          <Link to="/mensajes">
            <FaEnvelope /> Mensajes
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
