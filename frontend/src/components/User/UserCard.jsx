import { Link } from "react-router-dom";
import styles from "./UserCard.module.css";

const UserCard = ({ nickname, fotoPerfil }) => {
  const profileImage = fotoPerfil || "/assets/main.webp";

  return (
    <Link 
      to={`/usuario/${encodeURIComponent(nickname)}`} 
      className={styles.userCardLink}
      aria-label={`Perfil de ${nickname}`}
    >
      <article className={styles.userCard}>
        <div className={styles.imageWrapper}>
          <img
            src={profileImage}
            alt={`Foto de perfil de ${nickname}`}
            loading="lazy"
          />
        </div>

        <div className={styles.info}>
          <h3 className={styles.nickname}>@{nickname}</h3>
          <p className={styles.assets}>10 Assets Publicados</p> {/* ⚡ Aquí luego puedes hacerlo dinámico */}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
