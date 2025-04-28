import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../features/auth/useAuth";
import { useAlertQueue } from "../../context/AlertQueueContext";
import styles from "./Navbar.module.css";

const UserSection = ({ isSmallScreen }) => {
  const { user, logout: userLogout } = useUser();
  const { logout: authLogout } = useAuth();
  const { showAlert } = useAlertQueue();
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const handleLogout = () => {
    userLogout();  // ✅ Borrar user + token
    authLogout();  // ✅ Borrar isAuthenticated
    showAlert("Sesión cerrada correctamente 👋🏻", "info"); // ✅ Mensaje de salida
    navigate("/"); // ✅ Volver a Home o Login
  };

  if (isAuthenticated) {
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
            src={user.fotoPerfil}
            alt={`Foto de perfil de ${user.nickname}`}
            className={styles.profilePic}
          />
        </Link>

        <button
          onClick={handleLogout}
          className={styles.navButton}
          aria-label="Cerrar sesión"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
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
