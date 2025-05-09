import React, { useEffect, useState } from "react";
import styles from "./FollowersModal.module.css"; // Reutilizamos los mismos estilos
import { FaSpinner, FaUserCheck, FaExclamationTriangle } from "react-icons/fa";
import { useSocial } from "@/hooks/useSocial";
import UserCardCompact from "../User/UserCardCompact";

const FollowingModal = ({ visible, onClose, email }) => {
  const { obtenerSiguiendo } = useSocial();
  const [siguiendo, setSiguiendo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!visible || !email) return;

    console.log("Buscando usuarios seguidos por:", email); // 👈 LOG de depuración

    setLoading(true);
    setError(null);

    obtenerSiguiendo(email)
      .then((resultado) => setSiguiendo(resultado || []))
      .catch((err) => {
        console.error("Error al cargar usuarios seguidos:", err);
        setError("No se pudieron cargar los usuarios que sigue.");
      })
      .finally(() => setLoading(false));
  }, [email, visible]);

  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h2 className={styles.title}>
          <FaUserCheck /> Siguiendo
        </h2>

        {loading ? (
          <div className={styles.status} role="status" aria-live="polite">
            <FaSpinner className={styles.iconSpin} aria-hidden="true" />
            <p>Cargando usuarios...</p>
          </div>
        ) : error ? (
          <div className={styles.status} role="alert">
            <FaExclamationTriangle className={styles.iconError} />
            <p>{error}</p>
          </div>
        ) : siguiendo.length === 0 ? (
          <p className={styles.empty}>Este usuario aún no sigue a nadie.</p>
        ) : (
          <div className={styles.list} role="list">
            {siguiendo.map((usuario, index) => (
              <UserCardCompact
              key={usuario._id || usuario.email}
              email={usuario.email}
              nickname={usuario.nickname}
              fotoPerfil={usuario.fotoPerfil}
              onClick={onClose}
            />
            
            ))}
          </div>
        )}

        <button onClick={onClose} className={styles.closeBtn}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default FollowingModal;
