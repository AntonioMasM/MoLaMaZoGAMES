import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import {
  FaPalette,
  FaUniversalAccess,
  FaQuestionCircle,
  FaMoon,
  FaSun,
  FaAdjust,
} from "react-icons/fa";

import styles from "./SettingsDropdown.module.css";

const SettingsDropdown = ({ onClose }) => {
  const { theme, setDark, setLight, setContrast } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={styles.dropdown} aria-label="Configuración">
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

      <div className={styles.dropdownTitle}>Preferencias:</div>
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
