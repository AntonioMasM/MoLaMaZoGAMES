import { Link } from "react-router-dom";
import styles from "./AssetCard.module.css";

const AssetCard = ({ id, image, title, author, formats = [], category }) => {
  // Normaliza clase de categoría
  const categoryClass = category
    ? styles[`category-${category.toLowerCase().replace(/\s+/g, "")}`]
    : "";

  return (
    <Link to={`/asset/${id}`} className={styles.linkWrapper} aria-label={`Ver asset ${title}`}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt={`Vista previa del asset ${title}`}
            loading="lazy"
          />
        </div>

        <div className={styles.info}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.author}>@{author}</span>
          </div>

          <div className={styles.meta}>
            <div className={styles.formats}>
              {formats.map((format, i) => (
                <span
                  key={i}
                  className={styles.badge}
                  title={`Formato: ${format}`}
                >
                  {format}
                </span>
              ))}
            </div>
            <span
              className={`${styles.category} ${categoryClass}`}
              title={`Categoría: ${category}`}
            >
              {category}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default AssetCard;
