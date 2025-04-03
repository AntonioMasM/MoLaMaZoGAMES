import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HeroCategorySection.css";  // Crea o ajusta este archivo para los estilos de las categorías

function dropboxToDirectLink(url) {
  return url
    .replace("www.dropbox.com", "dl.dropboxusercontent.com")
    .replace("dl=0", "raw=1");
}

const HeroCategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categorias");
        setCategories(res.data);
        setLoading(false);  // Cuando las categorías se carguen, cambiar el estado de carga
      } catch (err) {
        console.error("Error al obtener categorías:", err);
        setLoading(false);  // Si hay un error, también cambiar el estado
      }
    };
    fetchCategorias();
  }, []);

  return (
    <section className="hero-category-section">
      {/* Indicador de carga */}
      {loading ? (
        <div className="loading-spinner" aria-live="polite">
          Cargando categorías...
        </div>
      ) : (
        <div className="categorias-tipo">
          {categories.map((cat, index) => (
            <div key={index} className="category">
              <img
                src={dropboxToDirectLink(cat.imagen)}
                alt={`Categoría: ${cat.nombre}`}
                className="category-image"
                onError={(e) => {
                  e.target.src = "/assets/categories/2d.webp";
                  e.target.alt = "Imagen de respaldo para categoría 2D";  // Descripción de la imagen de respaldo
                }}
                onLoad={(e) => e.target.classList.add("loaded")}  // Añadir clase de carga
              />
              <p className="category-name">{cat.nombre}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroCategorySection;
