import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../features/auth/useAuth";
import { useAlertQueue } from "../../context/AlertQueueContext";
import { getUsuarioPorEmail } from "../../services/userService";
import styles from "./Navbar.module.css";

const UserSection = ({ isSmallScreen }) => {
  const { user: contextUser, logout: userLogout } = useUser();
  const { logout: authLogout } = useAuth();
  const { showAlert } = useAlertQueue();
  const navigate = useNavigate();

  const email = contextUser?.email;
  const isAuthenticated = !!email;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchFullUserData = async () => {
      if (!email) return;
      try {
        const usuario = await getUsuarioPorEmail(email);
        setUserData(usuario);
      } catch (error) {
        console.error("Error al obtener datos completos del usuario:", error);
      }
    };

    fetchFullUserData();
  }, [email]);

  const handleLogout = () => {
    userLogout();       // Borra user del contexto
    authLogout();       // Borra token / isAuthenticated
    showAlert("Sesión cerrada correctamente 👋🏻", "info");
    navigate("/");
  };

  if (isAuthenticated && userData) {
    return (
      <>
        <Link
          to="/categories"
          className={styles.navButton}
          aria-label="Explorar Categorías"
        >
          Explorar
        </Link>

        <Link
          to="/upload-asset"
          className={styles.navButton}
          aria-label="Subir un nuevo asset"
        >
          Subir Asset
        </Link>

        <Link
          to="/profile"
          className={styles.navButton}
          aria-label="Ir a tu perfil"
        >
          <img
            src={userData.fotoPerfil?.secure_url || "/assets/users/default-avatar.png"}
            alt={`Foto de perfil de ${userData.nickname || "usuario"}`}
            className={styles.profilePic}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/assets/users/default-avatar.png";
            }}
          />
        </Link>

        <button
        onClick={handleLogout}
        className={styles.logoutButton}
        aria-label="Cerrar sesión"
      >
        <FaSignOutAlt /> {isSmallScreen ? null : "Cerrar Sesión"}
      </button>

      </>
    );
  }

  return (
    <Link
      to="/login"
      className={styles.navButton}
      aria-label="Ir a inicio de sesión"
    >
      {isSmallScreen ? <FaUser /> : "Inicio Sesión / Registro"}
    </Link>
  );
};

export default UserSection;
