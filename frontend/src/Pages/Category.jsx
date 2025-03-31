import React, { useEffect, useState } from 'react';
import '../styles/Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);

  // Función para obtener las categorías desde la API
  useEffect(() => {
    // Llamada a la API para obtener todas las categorías
    fetch('/api/categorias')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error al obtener categorías:", error));
  }, []);

  return (
    <div className="categoria-container">
      <div className="header">
        <h1>Categorías</h1>
        <div className="filter">
          <button>Filtrar Por</button>
          <button>Más Vista</button>
          <button>Más Descargada</button>
          <button>Más Reciente</button>
        </div>
      </div>
      {categories.map(category => (
        <div className="category-section" key={category._id}>
          <div className="category-header">
            <h2>{category.nombre}</h2>
            <button className="follow-btn">Seguir</button>
          </div>
          <div className="asset-cards">
            {category.assets && category.assets.length > 0 ? category.assets.map(asset => (
              <div className="asset-card" key={asset.id}>
                <img src={asset.imagen} alt={asset.nombre} className="asset-image" />
                <div className="asset-info">
                  <p>{asset.nombre}</p>
                  <p>{asset.creador}</p>
                  <p>Vistas: {asset.vistas}</p>
                  <p>Descargas: {asset.descargas}</p>
                </div>
              </div>
            )) : <p>No hay assets disponibles para esta categoría.</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
