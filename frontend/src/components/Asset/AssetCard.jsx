import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./AssetCard.module.css";
import { getUsuarioPorNickname } from "@/services/userService";
import { ROUTES } from "@/routes/paths";

const AssetCard = ({ id, image, title, author, formats = [], category }) => {
  const [emailAutor, setEmailAutor] = useState(null);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const datos = await getUsuarioPorNickname(author);
        setEmailAutor(datos?.email);
      } catch (err) {
        console.error("Error al obtener email del autor:", err);
      }
    };

    fetchEmail();
  }, [author]);

  const formattedCategory = category
    ? category.toLowerCase().replace(/\s+/g, "")
    : "general";
  const categoryClass = styles[`category-${formattedCategory}`] || "";

  return (
    <article className={styles.card} role="article">
      <Link
        to={ROUTES.ASSET_VIEW(id)}
        className={styles.imageWrapper}
        aria-label={`Ver asset ${title}`}
      >
        <img
          src={image}
          alt={`Vista previa del asset ${title}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/assets/placeholder.png";
          }}
        />
      </Link>

      <div className={styles.info}>
        <header className={styles.header}>
          <h3 className={styles.title} title={title}>
            <Link to={ROUTES.ASSET_VIEW(id)}>{title}</Link>
          </h3>

          {emailAutor ? (
            <Link
              to={ROUTES.USER_EXTERNAL(encodeURIComponent(emailAutor))}
              className={styles.author}
              title={`Ver perfil de ${author}`}
              aria-label={`Ir al perfil de ${author}`}
            >
              @{author}
            </Link>
          ) : (
            <span className={styles.author}>@{author}</span>
          )}
        </header>

        <div className={styles.meta}>
          <div className={styles.formats} aria-label="Formatos disponibles">
            {formats.slice(0, 3).map((format, i) => (
              <Link
                key={i}
                to={`/search?formato=${encodeURIComponent(format)}`}
                className={styles.badge}
                title={`Filtrar por formato: ${format}`}
                aria-label={`Formato ${format}`}
              >
                {format}
              </Link>
            ))}
            {formats.length > 3 && (
              <span
                className={styles.badge}
                title={`+${formats.length - 3} formatos adicionales`}
              >
                +{formats.length - 3}
              </span>
            )}
          </div>

          {category && (
            <Link
              to={ROUTES.CATEGORY(category)}
              className={`${styles.category} ${categoryClass}`}
              title={`Categoría: ${category}`}
              aria-label={`Ir a la categoría ${category}`}
            >
              {category}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default AssetCard;
