import React from "react";
import { Link } from "react-router-dom";
import styles from "./MessageItem.module.css";

const MessageItem = ({ mensaje }) => {
  const { remitente, contenido = "", fechaEnvio, leido, _id } = mensaje;

  const fechaFormateada = new Date(fechaEnvio).toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link
      to={`/messages/${_id}`}
      className={`${styles.messageItem} ${leido ? styles.read : styles.unread}`}
      aria-label={`Ver mensaje de ${remitente?.nickname || "Usuario eliminado"}`}
    >
      <img
        src={remitente?.fotoPerfil?.secure_url || "/assets/defaultProfile.webp"}
        alt={`Foto de ${remitente?.nickname || "Usuario"}`}
        className={styles.avatar}
        loading="lazy"
        decoding="async"
        width="48"
        height="48"
      />

      <div className={styles.messageInfo}>
        <div className={styles.topRow}>
          <span className={styles.nickname}>
            {remitente?.nickname || "Usuario eliminado"}
          </span>
          <span className={styles.date}>{fechaFormateada}</span>
        </div>

        <div className={styles.preview}>
          {contenido.length > 50 ? contenido.slice(0, 50) + "..." : contenido}
        </div>
      </div>

      {!leido && <span className={styles.unreadBadge}>Nuevo</span>}
    </Link>
  );
};

export default React.memo(MessageItem);
