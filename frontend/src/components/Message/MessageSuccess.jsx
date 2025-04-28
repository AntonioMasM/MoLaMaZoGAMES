import React from "react";
import styles from "./MessageSuccess.module.css";

const MessageSuccess = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.icon}>✅</div>
        <h2 className={styles.title}>¡Mensaje enviado!</h2>
        <p className={styles.text}>Tu mensaje se ha enviado correctamente.</p>

        <button className={styles.button} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default React.memo(MessageSuccess);
