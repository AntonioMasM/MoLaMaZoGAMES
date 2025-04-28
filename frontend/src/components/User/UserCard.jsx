import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAssets } from "../../hooks/useAssets";
import styles from "./UserCard.module.css";

const UserCard = ({ id, email, nickname, fotoPerfil }) => {
  const profileImage = fotoPerfil.secure_url || "/assets/main.webp";

  const { cargarAssetsDeUsuario } = useAssets();
  const [totalAssets, setTotalAssets] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      if (!id) return;

      try {
        const assets = await cargarAssetsDeUsuario(id);
        setTotalAssets(assets.length);
      } catch (err) {
        console.error("Error al cargar assets del usuario:", err);
        setTotalAssets(0);
      }
    };

    fetchAssets();
  }, [id, cargarAssetsDeUsuario]);

  return (
    <Link 
      to={`/user/${encodeURIComponent(email)}`} 
      className={styles.userCardLink}
      aria-label={`Perfil de ${nickname}`}
    >
      <article className={styles.userCard}>
        <div className={styles.imageWrapper}>
          <img
            src={profileImage}
            alt={`Foto de perfil de ${nickname}`}
            loading="lazy"
          />
        </div>

        <div className={styles.info}>
          <h3 className={styles.nickname}>@{nickname}</h3>
          <p className={styles.assets}>
            {totalAssets === null
              ? "Cargando assets..."
              : `${totalAssets} Asset${totalAssets === 1 ? "" : "s"} Publicado${totalAssets === 1 ? "" : "s"}`}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
