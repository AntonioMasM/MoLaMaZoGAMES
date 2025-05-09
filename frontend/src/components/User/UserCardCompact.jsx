import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserCardCompact.module.css";

const UserCardCompact = ({ email, nickname, fotoPerfil, onClick }) => {
  return (
    <Link
      to={`/user/${encodeURIComponent(email)}`}
      className={styles.link}
      aria-label={`Ver perfil de ${nickname || email}`}
      onClick={onClick}
    >
      <div className={styles.card} role="article">
        <img
          src={fotoPerfil?.secure_url || "/assets/main.webp"}
          alt={nickname || email}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <span className={styles.nickname}>{nickname || "Sin nombre"}</span>
          <span className={styles.email}>{email}</span>
        </div>
      </div>
    </Link>
  );
};

export default UserCardCompact;
