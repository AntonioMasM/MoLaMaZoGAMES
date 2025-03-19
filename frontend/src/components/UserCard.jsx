import React from "react";
import "../styles/UserCard.css"; // Asegúrate de tener los estilos para el componente

const UserCard = ({ nickname, fotoPerfil }) => {
  // Si no hay foto de perfil, usar una imagen por defecto
  const profileImage = fotoPerfil ? fotoPerfil : "/assets/main.webp";

  return (
    <div className="user-card">
      <img src={profileImage} alt={nickname} className="user-card-image" />
      <div className="user-card-info">
        <h3 className="user-card-nickname">@{nickname}</h3>
        <p className="user-card-assets">10 Assets Publicados</p> {/* Puedes agregar este dato dinámicamente */}
      </div>
    </div>
  );
};

export default UserCard;
