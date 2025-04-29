import { useEffect, useState } from "react";
import { useSocial } from "@/hooks/useSocial";
import { useUser } from "@/context/UserContext";
import UserCard from "../User/UserCard";
import styles from "./UserFollowing.module.css";
import { FaUserPlus, FaExclamationTriangle, FaSpinner } from "react-icons/fa";

const UserFollowing = () => {
  const { obtenerSiguiendo, loading, error } = useSocial();
  const { user } = useUser();
  const [usuariosSeguidos, setUsuariosSeguidos] = useState([]);

  useEffect(() => {
    const fetchUsuariosSeguidos = async () => {
      if (!user?.email) return;
      try {
        const usuarios = await obtenerSiguiendo(user.email);
        setUsuariosSeguidos(usuarios || []);
      } catch (err) {
        console.error("Error al cargar usuarios seguidos:", err);
      }
    };

    fetchUsuariosSeguidos();
  }, [user?.email, obtenerSiguiendo]);

  return (
    <section className={styles.container} aria-labelledby="seguidores-title" role="region">
      <h3 id="seguidores-title" className="sr-only">Usuarios que sigues</h3>

      {loading ? (
        <div className={styles.status} role="status" aria-live="polite">
          <FaSpinner className={styles.icon} aria-hidden="true" />
          <p className={styles.loading}>Cargando usuarios que sigues...</p>
        </div>
      ) : error ? (
        <div className={styles.status} role="alert">
          <FaExclamationTriangle className={styles.icon} aria-hidden="true" />
          <p className={styles.error}>{error}</p>
        </div>
      ) : usuariosSeguidos.length === 0 ? (
        <p className={styles.empty}>
          <FaUserPlus className={styles.icon} aria-hidden="true" />
          Aún no sigues a ningún usuario.
        </p>
      ) : (
        <div className={styles.list} role="list">
          {usuariosSeguidos.map((usuario) => (
            <UserCard
              key={usuario._id}
              id={usuario._id}
              email={usuario.email}
              nickname={usuario.nickname}
              fotoPerfil={usuario.fotoPerfil || { secure_url: "/assets/main.webp" }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default UserFollowing;
