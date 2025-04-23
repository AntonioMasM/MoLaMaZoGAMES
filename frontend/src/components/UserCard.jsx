import React from "react";
import { Link } from "react-router-dom";
import "../styles/UserCard.css";

const UserCard = ({ nickname, fotoPerfil }) => {
  // Usa nickname en la ruta en lugar de _id
  const profileImage = fotoPerfil || "/assets/main.webp";

  return (
    <Link to={`/usuario/${encodeURIComponent(nickname)}`} className="user-card-link">
      <div className="user-card">
        <img
          src={profileImage}
          alt={nickname}
          className="user-card-image"
        />
        <div className="user-card-info">
          <h3 className="user-card-nickname">@{nickname}</h3>
          <p className="user-card-assets">10 Assets Publicados</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
