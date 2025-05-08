import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./InviteModal.module.css";
import { buscarUsuarios } from "@/services/userService";

const InviteModal = ({ visible, onClose, onInvite }) => {
  const [email, setEmail] = useState("");
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const debounceTimeout = useRef(null);
  const inputRef = useRef(null);

  // Enfocar input al abrir
  useEffect(() => {
    if (visible && inputRef.current) inputRef.current.focus();
  }, [visible]);

  // Buscar usuarios mientras se escribe
  useEffect(() => {
    if (!email || email.length < 2) {
      setResultados([]);
      return;
    }

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      setCargando(true);
      try {
        const data = await buscarUsuarios(email);
        setResultados(data.slice(0, 5)); // Máx. 5 sugerencias
      } catch (err) {
        console.error("Error al buscar usuarios:", err);
        setResultados([]);
      } finally {
        setCargando(false);
      }
    }, 300);
  }, [email]);

  const handleSelectUser = (usuario) => {
    setEmail(usuario.email);
    setResultados([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    onInvite(email.trim());
    setEmail("");
    setResultados([]);
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
              <label htmlFor="email" className={styles.label}>Buscar por nombre o email</label>
              <input
                id="email"
                type="text"
                required
                className={styles.input}
                ref={inputRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
                autoComplete="off"
              />

              {resultados.length > 0 && (
                <ul className={styles.suggestions}>
                  {resultados.map((user) => (
                    <li
                      key={user._id}
                      className={styles.suggestionItem}
                      onClick={() => handleSelectUser(user)}
                    >
                      <img
                        src={user.fotoPerfil?.secure_url || "/assets/main.webp"}
                        alt=""
                        className={styles.avatar}
                      />
                      <div className={styles.userInfo}>
                        <strong>{user.nickname}</strong><br />
                        <span className={styles.email}>{user.email}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className={styles.buttons}>
                <button type="submit" className={styles.inviteButton}>Enviar Invitación</button>
                <button type="button" className={styles.cancelButton} onClick={onClose}>Cancelar</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InviteModal;
