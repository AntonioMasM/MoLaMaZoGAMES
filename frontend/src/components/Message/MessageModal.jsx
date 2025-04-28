import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useMensajes } from "@/hooks/useMensajes";
import styles from "./MessageModal.module.css";
import MessageSuccess from "./MessageSuccess";

const MessageModal = ({ destinatario, onClose }) => {
  const { user: currentUser } = useUser();
  const { enviarMensaje, loading } = useMensajes();
  const [contenido, setContenido] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const textareaRef = useRef(null);

  // 🚀 Autofocus al abrir
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // 🚀 Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSend = async () => {
    setError(null);

    if (!contenido.trim()) {
      setError("El mensaje no puede estar vacío.");
      return;
    }
    if (contenido.length > 1000) {
      setError("El mensaje no puede superar los 1000 caracteres.");
      return;
    }

    try {
      await enviarMensaje({
        remitente: currentUser._id,
        destinatario: destinatario._id,
        contenido,
      });
      setSuccess(true); // ✅ Mostrar pantalla de éxito
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.mensaje || "Error al enviar el mensaje.");
    }
  };

  if (success) {
    return <MessageSuccess onClose={onClose} />;
  }

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`${styles.modal} ${styles.fadeIn}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className={styles.title}>
          Enviar mensaje a {destinatario.nickname}
        </h2>

        <textarea
          ref={textareaRef}
          className={styles.textarea}
          placeholder="Escribe tu mensaje..."
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          maxLength={1000}
          aria-label="Escribe tu mensaje"
        />

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttons}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            aria-label="Cancelar envío"
          >
            Cancelar
          </button>

          <button
            className={styles.sendButton}
            onClick={handleSend}
            disabled={loading}
            aria-label="Enviar mensaje"
          >
            {loading ? (
              <div className={styles.spinner}></div> // Sutil spinner
            ) : (
              "Enviar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MessageModal);
