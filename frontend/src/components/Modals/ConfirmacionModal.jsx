// src/components/Modals/ConfirmacionModal.jsx
import BaseModal from "../ui/BaseModal";
import styles from "./ConfirmacionModal.module.css";

const ConfirmacionModal = ({ visible, onClose, email, grupo }) => {
  return (
    <BaseModal visible={visible} onClose={onClose} title="Invitación Enviada">
      <p className={styles.text}>
        Se ha enviado una invitación a <strong>{email}</strong> para unirse al grupo <strong>{grupo.titulo}</strong>.
      </p>
      <button className={styles.closeButton} onClick={onClose}>
        Cerrar
      </button>
    </BaseModal>
  );
};

export default ConfirmacionModal;
