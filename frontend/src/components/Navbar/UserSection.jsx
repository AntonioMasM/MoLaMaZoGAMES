import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import styles from "./Navbar.module.css";

const UserSection = ({ isSmallScreen, onLogout }) => {
  const { user } = useUser();
  const isAuthenticated = !!user;

  if (isAuthenticated) {
    return (
      <>
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
      </>
    );
  }

  return (
    <Link
      to="/login"
      className={styles.navButton}
      aria-label="Ir a inicio de sesión"
      onClick={onLogout}
    >
      {isSmallScreen ? <FaUser /> : "Inicio Sesión / Registro"}
    </Link>
  );
};

export default UserSection;
