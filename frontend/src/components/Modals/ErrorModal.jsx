// src/components/Modals/ErrorModal.jsx
import BaseModal from "../ui/BaseModal";
import styles from "./ErrorModal.module.css";

const ErrorModal = ({ visible, onClose, mensaje = "Ha ocurrido un error." }) => {
  return (
    <BaseModal visible={visible} onClose={onClose} title="Error">
      <p className={styles.text}>{mensaje}</p>
      <button className={styles.closeButton} onClick={onClose}>
        Cerrar
      </button>
    </BaseModal>
  );
};

export default ErrorModal;
