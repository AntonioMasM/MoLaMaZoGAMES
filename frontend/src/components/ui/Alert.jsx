import { useEffect } from "react";
import styles from "./Alert.module.css";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

const icons = {
  info: <FaInfoCircle aria-hidden="true" />,
  success: <FaCheckCircle aria-hidden="true" />,
  warning: <FaExclamationTriangle aria-hidden="true" />,
  error: <FaTimesCircle aria-hidden="true" />,
};

const Alert = ({ type = "info", message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.(); // Llama a la función si existe
    }, 3000);

    return () => clearTimeout(timer); // Limpieza
  }, [onClose]);

  return (
    <div className={`${styles.alert} ${styles[type]}`} role="alert" tabIndex="0">
      <span className={styles.icon}>{icons[type]}</span>
      <span className={styles.message}>{message}</span>
    </div>
  );
};

export default Alert;
