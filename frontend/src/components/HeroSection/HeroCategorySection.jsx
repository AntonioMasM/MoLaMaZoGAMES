import { useEffect, useState } from "react";
import { getCategorias } from "../../services/categoryService";
import styles from "./HeroCategorySection.module.css";

function dropboxToDirectLink(url) {
  return url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("dl=0", "raw=1");
}

const HeroCategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategories(data);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  return (
    <section className={styles.heroCategorySection} aria-labelledby="categorias-destacadas">
      {loading ? (
        <div className={styles.loadingSpinner} aria-live="polite">
          Cargando categorías...
        </div>
      ) : (
        <>
          <h2 id="categorias-destacadas" className="sr-only">Categorías destacadas</h2>
          <div className={styles.categoriasTipo}>
            {categories.map((cat, index) => (
              <div key={index} className={styles.category}>
                <img
                  src={dropboxToDirectLink(cat.imagen)}
                  alt={`Imagen de la categoría ${cat.nombre}`}
                  className={styles.categoryImage}
                  onError={(e) => {
                    e.currentTarget.src = "/assets/categories/2d.webp";
                    e.currentTarget.alt = "Imagen alternativa para categoría";
                  }}
                />
                <p className={styles.categoryName}>{cat.nombre}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroCategorySection;
