import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";
import { useCategoriasSeguidas } from "../../hooks/useCategoriasSeguidas";
import { useUser } from "../../context/UserContext";
import { useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa"; // ✅ Icono para "siguiendo"

function dropboxToDirectLink(url) {
  return url
    .replace("www.dropbox.com", "dl.dropboxusercontent.com")
    .replace("dl=0", "raw=1");
}

const CategoryCard = ({ nombre, imagen, _id }) => {
  const { user } = useUser();
  const {
    estaSiguiendo,
    seguir,
    dejar,
    cargarCategoriasSeguidas,
    loading,
  } = useCategoriasSeguidas();

  const alreadyLoaded = useRef(false);

  useEffect(() => {
    if (user?._id && !alreadyLoaded.current) {
      cargarCategoriasSeguidas(user._id);
      alreadyLoaded.current = true;
    }
  }, [user?._id]);

  const handleToggleSeguir = async () => {
    if (!user?._id || !_id) return;

    try {
      if (estaSiguiendo(_id)) {
        await dejar(user._id, _id);
      } else {
        await seguir(user._id, _id);
      }
    } catch (error) {
      console.error("❌ Error al seguir/dejar de seguir categoría:", error);
    }
  };

  const siguiendo = estaSiguiendo(_id);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <Link
          to={`/categories/${encodeURIComponent(nombre)}`}
          className={styles.link}
          aria-label={`Categoría ${nombre}`}
        >
          <div className={styles.imageWrapper}>
            <img
              src={dropboxToDirectLink(imagen)}
              alt={`Imagen de la categoría ${nombre}`}
              onError={(e) => {
                e.currentTarget.src = "/assets/categories/2d.webp";
                e.currentTarget.alt = "Imagen alternativa para categoría";
              }}
            />
          </div>
          <div className={styles.info}>
            <h3 className={styles.title}>{nombre}</h3>
          </div>
        </Link>

        {user && (
          <button
            onClick={handleToggleSeguir}
            className={`${styles.followButton} ${siguiendo ? styles.siguiendo : ""}`}
            disabled={loading}
            aria-pressed={siguiendo}
          >
            {loading ? (
              "..."
            ) : siguiendo ? (
              <>
                <FaCheck style={{ marginRight: "6px" }} />
                Siguiendo
              </>
            ) : (
              "Seguir"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
