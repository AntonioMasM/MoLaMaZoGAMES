import React, { useEffect, useState } from "react";
import { useSocial } from "@/hooks/useSocial";
import { useUser } from "@/context/UserContext";
import UserCard from "../User/UserCard";
import styles from "./UserFollowing.module.css";

const UserFollowing = () => {
  const { obtenerSiguiendo, loading, error } = useSocial();
  const { user } = useUser();
  const [usuariosSeguidos, setUsuariosSeguidos] = useState([]);

  useEffect(() => {
    const fetchUsuariosSeguidos = async () => {
      try {
        if (user?.email) {
          const usuarios = await obtenerSiguiendo(user.email);
          setUsuariosSeguidos(usuarios || []);
        }
      } catch (err) {
        console.error("Error al cargar usuarios seguidos:", err);
      }
    };

    fetchUsuariosSeguidos();
  }, [user?.email, obtenerSiguiendo]);

  if (loading) {
    return (
      <div className={styles.loading} role="status" aria-live="polite">
        <p>Cargando usuarios que sigues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error} role="alert">
        <p>{error}</p>
      </div>
    );
  }

  if (usuariosSeguidos.length === 0) {
    return (
      <div className={styles.emptyText} role="region" aria-label="No sigues a nadie">
        <p>Aún no sigues a ningún usuario.</p>
      </div>
    );
  }

  return (
    <section className={styles.followingBox} aria-labelledby="titulo-seguidores">
      <h3 id="titulo-seguidores" className={styles.sectionTitle}>
        Siguiendo
      </h3>

      <div className={styles.followingList}>
        {usuariosSeguidos.map((usuario) => (
          <UserCard
            key={usuario._id} // ✅ clave única garantizada
            email={usuario.email}
            id={usuario._id}
            nickname={usuario.nickname}
            fotoPerfil={usuario.fotoPerfil || { secure_url: "/assets/main.webp" }}
          />
        ))}
      </div>
    </section>
  );
};

export default UserFollowing;
