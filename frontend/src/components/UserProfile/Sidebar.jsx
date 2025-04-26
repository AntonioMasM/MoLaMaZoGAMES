import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome, FaImages, FaHeart, FaCog, FaUserFriends, FaEnvelope
} from "react-icons/fa";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/profile", icon: <FaHome />, label: "Inicio" },
    { to: "/gallery", icon: <FaImages />, label: "Galería" },
    { to: "/favoritos", icon: <FaHeart />, label: "Favoritos" },
    { to: "/settings", icon: <FaCog />, label: "Configuración" },
    { to: "/siguiendo", icon: <FaUserFriends />, label: "Siguiendo" },
    { to: "/mensajes", icon: <FaEnvelope />, label: "Mensajes" }
  ];

  return (
    <aside className={styles.sidebar} aria-label="Menú de navegación del perfil">
      <ul className={styles.navList}>
        {links.map((link) => (
          <li
            key={link.to}
            className={`${styles.navItem} ${
              location.pathname === link.to ? styles.active : ""
            }`}
          >
            <Link to={link.to} className={styles.navLink}>
              {link.icon}
              <span className={styles.label}>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
