import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa"; // Importa los íconos de estrella y usuario
import axios from "axios";
import UserCard from "./UserCard"; // Importar el componente UserCard
import "../styles/UserSection.css"; // Asegúrate de tener los estilos adecuados

const UserSection = () => {
  const [usuarios, setUsuarios] = useState([]);

  // Llamada a la API para obtener todos los usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/usuarios/");
        setUsuarios(response.data); // Guardamos los usuarios obtenidos en el estado
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="user-section">
      <h2>
        <span className="user-icon"><FaUser /></span> Creadores Destacados
      </h2>
      <div className="user-section-cards">
        {usuarios.map((usuario) => (
          <UserCard
            key={usuario._id}
            nickname={usuario.nickname}
            fotoPerfil={usuario.fotoPerfil}
          />
        ))}
      </div>
    </div>
  );
};

export default UserSection;
