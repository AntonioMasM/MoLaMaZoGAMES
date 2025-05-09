import React, { useEffect, useState } from "react";
import { useSocial } from "@/hooks/useSocial";
import { useUser } from "@/context/UserContext";
import UserCard from "../User/UserCard";
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

  // === Loading ===
  if (loading) {
    return (
      <div className={styles.loading} role="status" aria-live="polite">
        <p>Cargando usuarios seguidos...</p>
      </div>
    );
  }

  // === Error ===
  if (error) {
    return (
      <div className={styles.error} role="alert">
        <p>{error}</p>
      </div>
    );
  }

  // === Vacío ===
  if (siguiendo.length === 0) {
    return (
      <div className={styles.emptyState} role="region" aria-label="Sin usuarios seguidos">
        <p>No estás siguiendo a ningún usuario todavía.</p>
      </div>
    );
  }

  // === Resultado ===
  return (
    <section className={styles.followingSection} aria-labelledby="siguiendo-heading">
      <header className={styles.header}>
        <p className={styles.subtitle}>
          Estás siguiendo a {siguiendo.length} {siguiendo.length === 1 ? "usuario" : "usuarios"}.
        </p>
      </header>

      <ul className={styles.followingGrid} role="list" aria-label="Lista de usuarios seguidos">
        {siguiendo.map((usuario, i) => (
          <li key={usuario.email} style={{ animationDelay: `${i * 0.05}s` }} className={styles.item}>
            <UserCard
              email={usuario.email}
              id={usuario._id}
              nickname={usuario.nickname}
              fotoPerfil={usuario.fotoPerfil || { secure_url: "/assets/main.webp" }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UserFollowing;
