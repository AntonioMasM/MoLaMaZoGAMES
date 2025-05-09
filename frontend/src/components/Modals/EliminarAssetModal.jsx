import React from "react";
import styles from "./EliminarAssetModal.module.css";

const EliminarAssetModal = ({ visible, onCancel, onConfirm }) => {
  if (!visible) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <h3>¿Eliminar este asset?</h3>
        <p>Esta acción no se puede deshacer.</p>
        <div className={styles.modalActions}>
          <button onClick={onCancel} className={styles.cancelBtn}>Cancelar</button>
          <button onClick={onConfirm} className={styles.confirmBtn}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default EliminarAssetModal;
