import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useUser } from "../../context/UserContext";

import {
  FaSignOutAlt,
  FaPalette,
  FaUniversalAccess,
  FaQuestionCircle,
  FaMoon,
  FaSun,
  FaAdjust,
} from "react-icons/fa";

import styles from "./Navbar.module.css";

const SettingsDropdown = ({ onClose }) => {
  const { user, logout } = useUser();
  const isAuthenticated = !!user;

  const { theme, setDark, setLight, setContrast } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={styles.dropdown}>
      {isAuthenticated && (
        <button
          className={styles.dropdownItem}
          onClick={() => {
            logout();
            onClose();
            navigate("/login");
          }}
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      )}

      <div className={styles.dropdownTitle}>Tema:</div>
      <button className={styles.dropdownItem} onClick={setDark}>
        <FaMoon /> Oscuro {theme === "dark" && "✓"}
      </button>
      <button className={styles.dropdownItem} onClick={setLight}>
        <FaSun /> Claro {theme === "light" && "✓"}
      </button>
      <button className={styles.dropdownItem} onClick={setContrast}>
        <FaAdjust /> Alto Contraste {theme === "high-contrast" && "✓"}
      </button>

      <button
        className={styles.dropdownItem}
        onClick={() => {
          navigate("/accesibility");
          onClose();
        }}
      >
        <FaUniversalAccess /> Accesibilidad
      </button>
      <button
        className={styles.dropdownItem}
        onClick={() => {
          navigate("/help");
          onClose();
        }}
      >
        <FaQuestionCircle /> Ayuda / Soporte
      </button>
    </div>
  );
};

export default SettingsDropdown;
