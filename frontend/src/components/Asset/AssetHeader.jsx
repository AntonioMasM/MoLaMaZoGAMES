import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./AssetHeader.module.css";
import FavoritoButton from "./FavoritoButton";
import { getUsuarioPorNickname } from "@/services/userService";

const AssetHeader = ({ asset }) => {
  if (!asset) return null;

  const [emailAutor, setEmailAutor] = useState(null);

  const { titulo, autor, fechaCreacion, vistas, disponible, _id } = asset;

  useEffect(() => {
    const fetchEmailAutor = async () => {
      try {
        const datosAutor = await getUsuarioPorNickname(autor);
        setEmailAutor(datosAutor.email);
      } catch (error) {
        console.error("Error obteniendo el email del autor:", error);
      }
    };

    fetchEmailAutor();
  }, [autor]);
  const fechaFormateada = new Date(fechaCreacion).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 className={styles.title}>{titulo}</h1>
        <FavoritoButton assetId={_id} />
      </div>

      <div className={styles.metaInfo}>
        <span className={styles.author}>
          Creado por{" "}
          <Link to={`/user/${encodeURIComponent(emailAutor)}`} className={styles.authorLink}>
          {autor}
          </Link>
        </span>

        <span className={styles.date}>Publicado el {fechaFormateada}</span>

        <span className={styles.views}>{vistas} vistas</span>

        <span
          className={`${styles.status} ${
            disponible ? styles.available : styles.unavailable
          }`}
        >
          {disponible ? "Disponible" : "No disponible"}
        </span>
      </div>
    </header>
  );
};

export default AssetHeader;
