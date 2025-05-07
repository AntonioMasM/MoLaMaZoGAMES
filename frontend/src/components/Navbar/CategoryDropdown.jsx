import { useState, useEffect } from "react";
import styles from "./CategoryDropdown.module.css";
import { useNavigate } from "react-router-dom";
import { getCategorias } from "../../services/categorias";

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategorias();
        setCategories(data);
      } catch (err) {
        setError("Error al obtener categorías");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (cat) => {
    navigate(`/categories/${encodeURIComponent(cat.nombre)}`);
  };

  const handleKeyDown = (e, cat) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCategoryClick(cat);
    }
  };

  return (
    <div className={styles.dropdownPanel} aria-label="Selector de categorías">
      <span className={styles.dropdownTitle}>Categorías disponibles</span>

      <div aria-live="polite">
        {loading && <div className={styles.dropdownLoading}>Cargando categorías...</div>}
        {error && <div className={styles.dropdownError}>{error}</div>}
        {!loading && !error && categories.length === 0 && (
          <div className={styles.dropdownEmpty}>No hay categorías disponibles.</div>
        )}
      </div>

      {!loading && !error && categories.length > 0 && (
        <ul className={styles.dropdownList} role="listbox">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className={styles.dropdownItem}
              tabIndex="0"
              role="option"
              aria-label={`Ir a la categoría ${cat.nombre}`}
              onClick={() => handleCategoryClick(cat)}
              onKeyDown={(e) => handleKeyDown(e, cat)}
            >
              {cat.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;
