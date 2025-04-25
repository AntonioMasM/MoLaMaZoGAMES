import styles from "./UserFavorites.module.css";

const UserFavorites = ({ categorias = [] }) => (
  <section className={styles.favoritesBox} aria-labelledby="titulo-favoritas">
    <h3 id="titulo-favoritas" className={styles.sectionTitle}>
      Categorías Favoritas
    </h3>

    {categorias.length > 0 ? (
      <div className={styles.categoriesList}>
        {categorias.map((cat, idx) => (
          <div className={styles.categoryItem} key={idx}>
            <img
              src={`/assets/categories/2d.webp`}
              alt={`Categoría: ${cat}`}
              className={styles.categoryIcon}
              loading="lazy"
            />
            <p className={styles.categoryName}>{cat}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className={styles.emptyText}>No tienes categorías favoritas configuradas aún.</p>
    )}
  </section>
);

export default UserFavorites;
