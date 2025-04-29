// src/components/ui/BaseModal.jsx
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BaseModal.module.css";

const BaseModal = ({ visible, onClose, title, children, maxWidth = "480px", autoFocus = true }) => {
  const containerRef = useRef(null);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (visible) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [visible, onClose]);

  // Foco inicial
  useEffect(() => {
    if (visible && autoFocus && containerRef.current) {
      const input = containerRef.current.querySelector("input, textarea, select, button");
      if (input) input.focus();
    }
  }, [visible, autoFocus]);

  return (
    <AnimatePresence>
      {visible && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <motion.div
            className={styles.modal}
            style={{ maxWidth }}
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {title && <h2 id="modal-title" className={styles.title}>{title}</h2>}
            <div className={styles.content}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BaseModal;
