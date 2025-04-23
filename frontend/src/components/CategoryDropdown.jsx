import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CategoryDropdown.css"; // Estilo para el dropdown

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categorias");
        //console.log("Respuesta de la API:", res); // Verifica qué datos estás recibiendo
        setCategories(res.data);
      } catch (err) {
        setError("Error al obtener categorías");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    console.log(`Categoría seleccionada: ${category}`);
    // Aquí puedes navegar a una página relacionada con esa categoría, por ejemplo
    // navigate(`/categorias/${category}`);
  };

  if (loading) return <div className="dropdown-loading">Cargando categorías...</div>;
  if (error) return <div className="dropdown-error">{error}</div>;

  return (
    <div className="dropdown-panel" aria-label="Seleccionar categoría">
      <span className="dropdown-title">Seleccionar categoría:</span>
      {categories.length === 0 ? (
        <div className="dropdown-empty">No hay categorías disponibles.</div>
      ) : (
        <ul>
          {categories.map((cat) => (
            <li
              key={cat._id}
              onClick={() => handleCategoryClick(cat)}
              tabIndex="0"
              role="button"
              aria-label={`Ir a la categoría ${cat.nombre}`}
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
