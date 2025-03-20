import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import UserInfo from "../components/UserInfo2";
import ProfileComments from "../components/ProfileComments";
import UploadAsset from "../components/UploadAsset";
import "../styles/UserProfile.css"; // Se añadirá después

const UserProfile = () => {
  const [user, setUser] = useState({
    nickname: "Joan99",
    registeredDate: "14 abril",
    country: "España",
    university: "Universidad de Alicante",
    profilePic: "", // Ruta a la imagen del perfil si tuviera una
    views: 0,
    shared: 0,
    pageViews: 2,
  });

  return (
    <div className="user-profile">
      {/* Barra lateral */}
      <Sidebar />

      <div className="profile-content">
        {/* Información del usuario */}
        <UserInfo user={user} />

        {/* Sección de Comentarios */}
        <ProfileComments />

        {/* Sección de subir assets */}
        <UploadAsset />
      </div>
    </div>
  );
};

export default UserProfile;
