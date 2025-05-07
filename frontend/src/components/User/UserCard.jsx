import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAssets } from "@/hooks/useAssets"; // ✅ Import limpio con alias
import styles from "./UserCard.module.css";

const UserCard = ({ id, email, nickname, fotoPerfil, badge }) => {
  const profileImage = fotoPerfil?.secure_url || "/assets/main.webp";

  const { loadByUser } = useAssets(); // ✅ Nombre actualizado según hook refactorizado
  const [totalAssets, setTotalAssets] = useState(null);

  useEffect(() => {
    if (!id) return;

    loadByUser(id)
      .then((assets) => setTotalAssets(assets.length))
      .catch((err) => {
        console.error("Error al cargar assets del usuario:", err);
        setTotalAssets(0);
      });
  }, [id]);

  return (
    <Link
      to={`/user/${encodeURIComponent(email)}`}
      className={styles.userCardLink}
      aria-label={`Perfil de ${nickname}`}
    >
      <article className={styles.userCard} role="article">
        <div className={styles.imageWrapper}>
          <img
            src={profileImage}
            alt={`Foto de perfil de ${nickname}`}
            loading="lazy"
          />
        </div>

        <div className={styles.info}>
          <h3 className={styles.nickname}>
            @{nickname}
            {badge && <span className={styles.badge}>{badge}</span>}
          </h3>

          <p className={styles.assets} aria-live="polite">
            {totalAssets === null
              ? "⏳ Cargando assets..."
              : `${totalAssets} asset${totalAssets === 1 ? "" : "s"} publicado${totalAssets === 1 ? "" : "s"}`}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
