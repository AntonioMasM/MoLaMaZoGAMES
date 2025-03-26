import React from "react";
import { FaEdit, FaCalendarAlt, FaMapMarkerAlt, FaUniversity } from "react-icons/fa";
import "../styles/UserInfo2.css"; // Asegúrate de tener el CSS correspondiente

const UserInfo = ({ user }) => {
  if (!user) {
    return <div>No se han encontrado datos del usuario.</div>; // Muestra un mensaje si `user` es undefined
  }
  else console.log(user);

  return (
    <div className="user-info">
      <div className="user-header">
        <div className="user-avatar">
          <img
            src={user.fotoPerfil || "/path/to/default-avatar.png"} // Si no hay foto de perfil, se muestra una por defecto
            alt="Foto de perfil"
            className="avatar-img"
          />
          <FaEdit className="edit-icon" />
        </div>
        <h1>{user.nickname}</h1>
        <p>{user.vistas} vistas | {user.compartidos} compartidos | {user.pageViews} páginas vistas</p>
      </div>

      <div className="user-details">
        <h3>Sobre {user.nickname}</h3>
        <div className="user-detail-card">
          <p><FaCalendarAlt /> Registrado el {new Date(user.fechaRegistro).toLocaleDateString()}</p>
          <p><FaMapMarkerAlt /> {user.pais || "No especificado"}</p>
          <p><FaUniversity /> {user.universidad || "No especificado"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
