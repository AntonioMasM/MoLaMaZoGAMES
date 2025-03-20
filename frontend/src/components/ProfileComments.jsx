import React, { useState } from "react";
import "../styles/ProfileComments.css"; // Se añadirá después

const ProfileComments = () => {
  const [comments, setComments] = useState([
    { id: 1, user: "Antonio123", text: "Me parece una opción muy interesante para descargar", time: "Hace 22h", likes: 1 },
    { id: 2, user: "Antonio123", text: "Me parece una opción muy interesante para descargar", time: "Hace 22h", likes: 1 },
  ]);

  return (
    <div className="profile-comments">
      <h3>Comentarios del Perfil</h3>
      <textarea placeholder="Añadir comentario..." />

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.text}</p>
            <span>{comment.user} - {comment.time}</span>
            <span>{comment.likes} Like</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileComments;
