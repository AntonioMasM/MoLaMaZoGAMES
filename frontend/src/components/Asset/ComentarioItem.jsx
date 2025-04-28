import { useLikeComentario } from "@/hooks/useLikeComentario";
import styles from "./AssetComments.module.css";

const ComentarioItem = ({ comentario, refProp }) => {
  const { hasLiked, likesCount, toggleLike, loading } = useLikeComentario(comentario);

  const usuario = comentario.usuario;
  const avatarUrl = usuario?.fotoPerfil?.secure_url || "/default-avatar.png";
  const nombreMostrado = usuario?.nickname || usuario?.nombreCompleto || "Usuario";

  return (
    <div
      ref={refProp}
      className={`${styles.comment} ${styles.fadeInComment}`}
      role="listitem"
    >
      <div className={styles.commentAvatar}>
        <img
          src={avatarUrl}
          alt={`Avatar de ${nombreMostrado}`}
          className={styles.avatarImage}
        />
      </div>

      <div className={styles.commentContent}>
        <p className={styles.commentAuthor}>{nombreMostrado}</p>
        <p className={styles.commentText}>{comentario.contenido}</p>

        <div className={styles.commentFooter}>
          <span className={styles.commentDate}>
            {new Date(comentario.fechaCreacion).toLocaleString()}
          </span>

          <button
            onClick={toggleLike}
            disabled={loading}
            className={`${styles.likeButton} ${hasLiked ? styles.liked : ""}`}
            aria-label={hasLiked ? "Quitar like" : "Dar like"}
          >
            {hasLiked ? "❤️" : "🤍"} {likesCount}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComentarioItem;
