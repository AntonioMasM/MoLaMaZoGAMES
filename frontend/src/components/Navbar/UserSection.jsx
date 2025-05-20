import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useAlertQueue } from "../../context/AlertQueueContext";
import { getUsuarioPorEmail } from "../../services/userService";
import { FaSignOutAlt, FaCompass, FaUpload } from "react-icons/fa";

import styles from "./UserSection.module.css";

const UserSection = ({ isCompactScreen, isHamburgerScreen, menuOpen }) => {
  const { user: contextUser, logout: userLogout } = useUser();
  const { logout: authLogout } = useAuth();
  const { showAlert } = useAlertQueue();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const email = contextUser?.email;
  const isAuthenticated = !!email;

  useEffect(() => {
    if (!email || userData) return;
    const fetchUser = async () => {
      try {
        const usuario = await getUsuarioPorEmail(email);
        setUserData(usuario);
      } catch (err) {
        console.error("Error al obtener datos del usuario:", err);
      }
    };
    fetchUser();
  }, [email, userData]);

  const handleLogout = () => {
    userLogout();
    authLogout();
    showAlert("Sesión cerrada correctamente 👋🏻", "info");
    navigate("/");
  };

  if (!isAuthenticated || !userData) return null;

  const avatarUrl = userData.fotoPerfil?.secure_url || "/users/defaultProfile.webp";
  const wrapperClass = `${styles.userSectionWrapper} ${isHamburgerScreen && menuOpen ? styles.userSectionHamburger : ""}`;

  return (
    <div className={wrapperClass}>
      <Link
        to="/categories"
        className={styles.navButton}
        aria-label="Explorar todas las categorías"
        title="Explorar"
      >
        {isCompactScreen ? <FaCompass /> : "Explorar"}
      </Link>

      <Link
        to="/upload-asset"
        className={styles.navButton}
        aria-label="Subir un nuevo asset"
        title="Subir Asset"
      >
        {isCompactScreen ? <FaUpload /> : "Subir Asset"}
      </Link>

      <Link
        to="/profile"
        className={styles.navButton}
        aria-label={`Ir al perfil de ${userData.nickname || "usuario"}`}
        title="Perfil"
      >
        <img
          src={avatarUrl}
          alt={`Foto de perfil de ${userData.nickname || "usuario"}`}
          className={styles.profilePic}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/users/defaultProfile.webp";
          }}
        />
      </Link>

      <button
        onClick={handleLogout}
        className={styles.logoutButton}
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
      >
        {isCompactScreen ? <FaSignOutAlt /> : "Cerrar Sesión"}
      </button>
    </div>
  );
};

export default UserSection;
