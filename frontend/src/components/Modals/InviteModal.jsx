import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./InviteModal.module.css";

const InviteModal = ({ visible, onClose, onInvite }) => {
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (visible) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [visible, onClose]);

  // Enfocar el input al abrir
  useEffect(() => {
    if (visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [visible]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    onInvite(email.trim());
    setEmail("");
    onClose();
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="inviteTitle">
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <h2 id="inviteTitle" className={styles.title}>Invitar Usuario al Grupo</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className={styles.label}>Email del usuario</label>
              <input
                id="email"
                type="email"
                required
                className={styles.input}
                ref={inputRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
              />
              <div className={styles.buttons}>
                <button
                  type="submit"
                  className={styles.inviteButton}
                >
                  Enviar Invitación
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={onClose}
                  ref={closeButtonRef}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InviteModal;
