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
      onClose?.();
    }, 4000); // ⏳ Subimos a 4s para que dé tiempo de leerse

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null; // 🛡️ Protección extra

  return (
    <div className={`${styles.alert} ${styles[type]}`} role="alert" tabIndex="0">
      <span className={styles.icon}>{icons[type]}</span>
      <span className={styles.message}>{message}</span>
    </div>
  );
};

export default Alert;
