// src/components/Modals/LoginRequiredModal.jsx
import { useNavigate } from "react-router-dom";
import BaseModal from "../ui/BaseModal";
import styles from "./LoginRequiredModal.module.css";

const LoginRequiredModal = ({ visible, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose(); // opcional: cerrar el modal antes de redirigir
    navigate("/login");
  };

  const handleRegister = () => {
    onClose();
    navigate("/register");
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Acceso restringido"
    >
      <p className={styles.message}>
        Debes haber iniciado sesión para acceder a esta sección.
      </p>
      <div className={styles.actions}>
        <button className={styles.loginButton} onClick={handleLogin}>
          Iniciar sesión
        </button>
        <button className={styles.registerButton} onClick={handleRegister}>
          Registrarse
        </button>
      </div>
    </BaseModal>
  );
};

export default LoginRequiredModal;
