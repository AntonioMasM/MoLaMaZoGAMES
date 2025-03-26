import React, { useState, useEffect } from "react";
import axios from "axios"; // Asegúrate de instalar axios si no lo has hecho
import Sidebar from "../components/Sidebar";
import UserInfo from "../components/UserInfo2";
import ProfileComments from "../components/ProfileComments";
import UploadAsset from "../components/UploadAsset";
import "../styles/UserProfile.css"; // Se añadirá después

const UserProfile = () => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [loading, setLoading] = useState(true); // Para controlar el estado de carga

  const email = localStorage.getItem("email"); // Obtener el email desde localStorage

  // Función para obtener los datos del usuario desde la API
  const obtenerUsuario = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/usuarios/${email}`); // Asegúrate de que esta URL sea la correcta
      setUser(response.data); // Actualiza el estado con los datos del usuario
      setLoading(false); // Termina la carga
      console.log(response);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      setLoading(false); // Termina la carga incluso si hay error
    }
  };

  useEffect(() => {
    obtenerUsuario();
  }, [email]);

  // Si está cargando, muestra un mensaje de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si no hay datos del usuario, mostramos un mensaje de error o vacío
  if (!user) {
    return <div>No se encontró el perfil del usuario</div>;
  }

  return (
    <div className="user-profile">
      {/* Barra lateral */}
      <Sidebar />

      <div className="profile-content">
        {/* Pasar los datos del usuario al componente UserInfo */}
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
