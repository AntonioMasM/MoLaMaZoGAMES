import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useAlertQueue } from "../../context/AlertQueueContext";
import { getUsuarioPorEmail } from "../../services/userService";
import styles from "./UserSection.module.css";

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
      if (!email || userData) return;
      try {
        const usuario = await getUsuarioPorEmail(email);
        setUserData(usuario);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchFullUserData();
  }, [email, userData]);

  const handleLogout = () => {
    userLogout();
    authLogout();
    showAlert("Sesión cerrada correctamente 👋🏻", "info");
    navigate("/");
  };

  if (isAuthenticated && userData) {
    const avatarUrl =
      userData.fotoPerfil?.secure_url || "/assets/users/default-avatar.png";

    return (
      <>
        <Link
          to="/categories"
          className={styles.navButton}
          aria-label="Explorar todas las categorías"
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
          aria-label={`Ir al perfil de ${userData.nickname || "usuario"}`}
        >
          <img
            src={avatarUrl}
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
          <FaSignOutAlt />
          {!isSmallScreen && "Cerrar Sesión"}
        </button>
      </>
    );
  }

  // No autenticado
  return (
    <Link
      to="/login"
      className={styles.navButton}
      aria-label="Acceder a inicio de sesión o registro"
    >
      {isSmallScreen ? <FaUser /> : "Inicio Sesión / Registro"}
    </Link>
  );
};

export default UserSection;
