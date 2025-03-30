import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HeroSection.css";


function dropboxToDirectLink(url) {
  console.log(url);
  return url
    .replace("www.dropbox.com", "dl.dropboxusercontent.com")
    .replace("dl=0", "raw=1");
    
}

const HeroSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categorias");
        setCategories(res.data);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <section className="hero">
      {/* Imagen destacada */}
      <div className="hero-image">
        <img src="/assets/main.webp" alt="Imagen destacada" />
      </div>

      {/* Contenido principal */}
      <div className="hero-content">
        <h1 className="hero-title">La Mejor Compañía de gestión de Assets Digitales</h1>
        <p className="hero-description">
          Descubre y comparte assets digitales para llevar tu proyecto al siguiente nivel.{" "}
          <strong><a href="/login" className="hero-link">Inicia Sesión</a></strong> o{" "}
          <strong><a href="/register" className="hero-link">Regístrate Ahora</a></strong> para acceder a todo el contenido.
        </p>

        {/* Línea divisoria */}
        <hr className="hero-divider" />

        {/* Categorías destacadas */}
        <h2 className="hero-categories-title">Categorías Destacadas</h2>
        <div className="hero-categories">
          {categories.map((cat, index) => (
            <div key={index} className="category">
              <img
                src={dropboxToDirectLink(cat.imagen)}
                alt={cat.nombre}
                className="category-image"
                onError={(e) => {
                  e.target.src = "/assets/categories/2d.webp"; // Por si falla la carga
                }}
              />
              <p className="category-name">{cat.nombre}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
