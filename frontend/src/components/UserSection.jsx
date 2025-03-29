import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import Carousel from "./Carousel";
import UserCard from "./UserCard";
import "../styles/UserSection.css";

const UserSection = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/usuarios/");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <Carousel
      title="Creadores Destacados"
      icon={<FaUser />}
      items={usuarios}
      renderItem={(usuario, index) => (
        <UserCard key={usuario._id || index} {...usuario} />
      )}
      gridClassName="user-grid"
    />
  );
};

export default UserSection;
