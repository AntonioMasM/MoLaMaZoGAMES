import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import UserCarousel from "./UserCarousel";
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
    <UserCarousel
      title="Creadores Destacados"
      icon={<FaUser />}
      users={usuarios}
    />
  );
};

export default UserSection;
