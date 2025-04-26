import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";

const Toast = ({ message, onClose }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timerShow = setTimeout(() => setFadeOut(true), 1600); // Empezar fadeout después de 1.6s
    const timerClose = setTimeout(onClose, 2000); // Cerrar totalmente en 2s
    return () => {
      clearTimeout(timerShow);
      clearTimeout(timerClose);
    };
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${fadeOut ? styles.fadeOut : styles.fadeIn}`}>
      {message}
    </div>
  );
};

export default Toast;
