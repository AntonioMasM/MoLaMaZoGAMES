import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.css";

function dropboxToDirectLink(url) {
  return url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("dl=0", "raw=1");
}

const CategoryCard = ({ nombre, imagen }) => {
  return (
    <Link to={`/categories/${encodeURIComponent(nombre)}`} className={styles.card}>
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
  );
};

export default CategoryCard;
