import React, { useEffect, useState } from 'react';
import '../styles/Category.css';
import CategorySection from '../components/CategorySection';
import HeroCategorySection from '../components/HeroCategorySection';

const Category = () => {
  const [categories, setCategories] = useState([]);

  // Función para obtener las categorías desde la API
  useEffect(() => {
    fetch('/api/categorias')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error al obtener categorías:", error));
  }, []);

  return (
    <div className="categoria-container">
      <div className="header">
        <h1>Categorías</h1>
      </div>

      {/* HeroCategorySection debajo del título */}
      <HeroCategorySection />

      {/* Barra horizontal */}
      <hr />

      {/* Botones de filtro debajo de la barra horizontal */}
      <div className="filter">
        <h4>Filtrar Por:</h4>
        <button>Más Vista</button>
        <button>Más Descargada</button>
        <button>Más Reciente</button>
      </div>

      {/* Muestra la lista de categorías */}
      <CategorySection />

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
