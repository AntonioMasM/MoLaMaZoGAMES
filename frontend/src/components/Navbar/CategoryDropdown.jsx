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
    navigate(`/categorias/${cat._id}`);
  };

  return (
    <div className={styles.dropdownPanel} aria-label="Seleccionar categoría">
      <span className={styles.dropdownTitle}>Seleccionar categoría:</span>

      {loading && <div className={styles.dropdownLoading}>Cargando categorías...</div>}
      {error && <div className={styles.dropdownError}>{error}</div>}
      {!loading && !error && categories.length === 0 && (
        <div className={styles.dropdownEmpty}>No hay categorías disponibles.</div>
      )}

      <ul>
        {categories.map((cat) => (
          <li
            key={cat._id}
            onClick={() => handleCategoryClick(cat)}
            tabIndex="0"
            role="button"
            aria-label={`Ir a la categoría ${cat.nombre}`}
            className={styles.dropdownItem}
          >
            {cat.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
