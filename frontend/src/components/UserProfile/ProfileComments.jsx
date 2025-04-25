import React, { useState } from "react";
import styles from "./ProfileComments.module.css";
import { FaThumbsUp } from "react-icons/fa";

const ProfileComments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Antonio123",
      text: "Me parece una opción muy interesante para descargar",
      time: "Hace 22h",
      likes: 1
    },
    {
      id: 2,
      user: "Antonio123",
      text: "Me parece una opción muy interesante para descargar",
      time: "Hace 22h",
      likes: 1
    }
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newEntry = {
      id: Date.now(),
      user: "Tú",
      text: newComment,
      time: "Ahora mismo",
      likes: 0
    };
    setComments([newEntry, ...comments]);
    setNewComment("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  const handleLike = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <section className={styles.profileComments} aria-label="Comentarios del perfil" role="region">
      <h3 className={styles.title}>Comentarios del Perfil</h3>

      <label htmlFor="commentBox" className={styles.srOnly}>Añadir nuevo comentario</label>
      <textarea
        id="commentBox"
        className={styles.textarea}
        placeholder="Añadir comentario... (Pulsa Enter para enviar)"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-describedby="submitInfo"
      />
      <span id="submitInfo" className={styles.instructions}>Pulsa Enter para enviar, Shift + Enter para nueva línea</span>

      <div className={styles.commentsList}>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <p className={styles.commentText}>{comment.text}</p>
            <div className={styles.meta}>
              <span className={styles.metaText}>{comment.user} — {comment.time}</span>
              <button
                onClick={() => handleLike(comment.id)}
                className={styles.likeBtn}
                aria-label={`Dar like al comentario de ${comment.user}`}
              >
                <FaThumbsUp aria-hidden="true" /> {comment.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileComments;
