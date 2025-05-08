import { Link } from "react-router-dom";
import styles from "./UserFavorites.module.css";

function dropboxToDirectLink(url) {
  return url
    .replace("www.dropbox.com", "dl.dropboxusercontent.com")
    .replace("dl=0", "raw=1");
}

const UserFavorites = ({ categorias = [] }) => (
  <section className={styles.container} aria-labelledby="titulo-favoritas">
    

    {categorias.length > 0 ? (
      <div className={styles.grid} role="list">
        {categorias.map((cat) => (
          <Link
            to={`/categories/${encodeURIComponent(cat.nombre)}`}
            key={cat._id}
            className={styles.item}
            role="listitem"
          >
            <img
              src={dropboxToDirectLink(cat.imagen)}
              alt={`Categoría: ${cat.nombre}`}
              className={styles.icon}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/assets/categories/2d.webp";
              }}
            />
            <p className={styles.name}>{cat.nombre}</p>
          </Link>
        ))}
      </div>
    ) : (
      <p className={styles.empty}>No tienes categorías favoritas configuradas aún.</p>
    )}
  </section>
);

export default UserFavorites;
