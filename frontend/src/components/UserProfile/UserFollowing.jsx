// src/components/UserProfile/UserFollowing.jsx
import React, { useEffect, useState } from "react";
import { useSocial } from "@/hooks/useSocial";
import { useUser } from "@/context/UserContext";
import UserCard from "../User/UserCard"; // ✅ Import correcto
import styles from "./UserFollowing.module.css";

const UserFollowing = () => {
  const { obtenerSiguiendo, loading, error } = useSocial();
  const { user } = useUser();
  const [siguiendo, setSiguiendo] = useState([]);

  useEffect(() => {
    const fetchSiguiendo = async () => {
      try {
        if (!user?.email) return;
        const data = await obtenerSiguiendo(user.email);
        setSiguiendo(data || []);
      } catch (err) {
        console.error("Error al cargar usuarios seguidos:", err);
      }
    };

    fetchSiguiendo();
  }, [user?.email]);

  if (loading) {
    return (
      <div className={styles.loading} role="status" aria-live="polite">
        <p>Cargando usuarios seguidos...</p>
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

  if (siguiendo.length === 0) {
    return (
      <div className={styles.emptyState} role="region" aria-label="No sigues a nadie">
        <p>No estás siguiendo a ningún usuario todavía.</p>
      </div>
    );
  }

  return (
    <section aria-labelledby="siguiendo-heading" className={styles.followingSection}>
      <h2 id="siguiendo-heading" className={styles.sectionTitle}>
        Usuarios que sigues
      </h2>

      <div className={styles.followingGrid} role="list" aria-label="Lista de usuarios seguidos">
        {siguiendo.map((usuario) => (
          <UserCard
            key={usuario.email} // ✅ Usamos email como key, 100% seguro
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
