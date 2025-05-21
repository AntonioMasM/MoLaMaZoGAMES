import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome, FaImages, FaHeart, FaCog, FaUserFriends, FaEnvelope, FaTrash, FaUser
} from "react-icons/fa";
import BaseModal from "../ui/BaseModal";
import styles from "./Sidebar.module.css";

// Renombrado para evitar conflictos
import { useUser as useUserActions } from "@/hooks/useUser";         // Para eliminarPerfil()
import { useUser as useUserContext } from "@/context/UserContext";   // Para user + logout
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAlertQueue } from "@/context/AlertQueueContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { eliminarPerfil } = useUserActions();
  const { user, logout: userLogout } = useUserContext();
  const { logout: authLogout } = useAuth();
  const { showAlert } = useAlertQueue();

  const links = [
    { to: "/", icon: <FaHome />, label: "Inicio" },
    { to: "/profile", icon: <FaUser />, label: "Perfil" },
    { to: "/gallery", icon: <FaImages />, label: "Galería" },
    { to: "/favourites", icon: <FaHeart />, label: "Favoritos" },
    { to: "/settings", icon: <FaCog />, label: "Configuración" },
    { to: "/following", icon: <FaUserFriends />, label: "Siguiendo" },
    { to: "/messages", icon: <FaEnvelope />, label: "Mensajes" }
  ];

  const handleDelete = async () => {
    if (!user?.email) {
      console.error("No hay usuario logueado para eliminar.");
      return;
    }

    try {
      await eliminarPerfil(user.email);
      userLogout();      // Cierra sesión en contexto
      authLogout();      // Cierra sesión en capa auth
      showAlert("Hasta siempre 👋🏻", "info");
      navigate("/");
    } catch (err) {
      console.error("Error al eliminar cuenta:", err.message);
      showAlert("Error al eliminar cuenta", "error");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <aside className={styles.sidebar} aria-label="Menú de navegación del perfil">
      <ul className={styles.navList}>
        {links.map((link) => (
          <li
            key={link.to}
            className={`${styles.navItem} ${location.pathname === link.to ? styles.active : ""}`}
          >
            <Link to={link.to} className={styles.navLink}>
              {link.icon}
              <span className={styles.label}>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.deleteContainer}>
        <button
          className={styles.deleteButton}
          onClick={() => setShowModal(true)}
        >
          <FaTrash />
          <span className={styles.label}>Eliminar Cuenta</span>
        </button>
      </div>

      <BaseModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="¿Eliminar cuenta?"
      >
        <p>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
        <div className={styles.modalActions}>
          <button onClick={handleDelete} className={styles.confirmBtn}>Sí, eliminar</button>
          <button onClick={() => setShowModal(false)} className={styles.cancelBtn}>Cancelar</button>
        </div>
      </BaseModal>
    </aside>
  );
};

export default Sidebar;
