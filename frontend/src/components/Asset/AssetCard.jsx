import { Link } from "react-router-dom";
import styles from "./AssetCard.module.css";

const AssetCard = ({ id, image, title, author, formats = [], category }) => {
  const formattedCategory = category
    ? category.toLowerCase().replace(/\s+/g, "")
    : "general";

  const categoryClass = styles[`category-${formattedCategory}`] || "";

  return (
    <Link
      to={`/asset/${id}`}
      className={styles.linkWrapper}
      aria-label={`Ver asset ${title}`}
    >
      <article className={styles.card} role="article">
        <div className={styles.imageWrapper}>
          <img
            src={image}
            alt={`Vista previa del asset ${title}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/assets/placeholder.png";
            }}
          />
        </div>

        <div className={styles.info}>
          <header className={styles.header}>
            <h3 className={styles.title} title={title}>{title}</h3>
            <span className={styles.author} title={`Autor: ${author}`}>@{author}</span>
          </header>

          <div className={styles.meta}>
            <div className={styles.formats} aria-label="Formatos disponibles">
              {formats.slice(0, 3).map((format, i) => (
                <span key={i} className={styles.badge} title={`Formato: ${format}`}>
                  {format}
                </span>
              ))}
              {formats.length > 3 && (
                <span className={styles.badge} title={`+${formats.length - 3} formatos adicionales`}>
                  +{formats.length - 3}
                </span>
              )}
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
