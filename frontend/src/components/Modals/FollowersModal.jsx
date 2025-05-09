import React, { useEffect, useState } from "react";
import styles from "./FollowersModal.module.css";
import { FaSpinner, FaUserFriends, FaExclamationTriangle } from "react-icons/fa";
import { useSocial } from "@/hooks/useSocial";
import UserCardCompact from "../User/UserCardCompact";

const FollowersModal = ({ visible, onClose, email }) => {
  const { obtenerSeguidores } = useSocial();
  const [seguidores, setSeguidores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!visible || !email) return;
  
    console.log("Buscando seguidores del email:", email); // 👈 LOG de depuración
  
    setLoading(true);
    setError(null);
  
    obtenerSeguidores(email)
      .then((resultado) => setSeguidores(resultado || []))
      .catch((err) => {
        console.error("Error al cargar seguidores:", err);
        setError("No se pudieron cargar los seguidores.");
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
          <FaUserFriends /> Seguidores
        </h2>

        {loading ? (
          <div className={styles.status} role="status" aria-live="polite">
            <FaSpinner className={styles.iconSpin} aria-hidden="true" />
            <p>Cargando seguidores...</p>
          </div>
        ) : error ? (
          <div className={styles.status} role="alert">
            <FaExclamationTriangle className={styles.iconError} />
            <p>{error}</p>
          </div>
        ) : seguidores.length === 0 ? (
          <p className={styles.empty}>
            Este usuario aún no tiene seguidores.
          </p>
        ) : (
          <div className={styles.list} role="list">
            {seguidores.map((usuario, index) => (
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

export default FollowersModal;
