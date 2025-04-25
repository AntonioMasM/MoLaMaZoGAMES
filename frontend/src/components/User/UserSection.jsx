import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { getAllUsuarios } from "../../services/usuarios"; // 👈 Modularizado
import UserCarousel from "./UserCarousel"; // 👈 Nuevo carrusel para usuarios
import UserCard from "./UserCard";
import styles from "./UserSection.module.css";

const UserSection = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getAllUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <section className={styles.userSection}>
      <UserCarousel
        title="Creadores Destacados"
        icon={<FaUser />}
        users={usuarios}
      />
    </section>
  );
};

export default UserSection;
