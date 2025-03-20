import React from "react";
import { FaEdit, FaCalendarAlt, FaMapMarkerAlt, FaUniversity } from "react-icons/fa";
import "../styles/UserInfo2.css"; // Se añadirá después

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      <div className="user-header">
        <div className="user-avatar">
          <FaEdit className="edit-icon" />
        </div>
        <h1>{user.nickname}</h1>
        <p>0 vistas | 0 compartidos | 2 páginas vistas</p>
      </div>

      <div className="user-details">
        <h3>Sobre {user.nickname}</h3>
        <div className="user-detail-card">
          <p><FaCalendarAlt /> Registrado 14 abril</p>
          <p><FaMapMarkerAlt /> España</p>
          <p><FaUniversity /> Universidad de Alicante</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
