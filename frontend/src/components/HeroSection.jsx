import React from "react";
import "../styles/HeroSection.css";

const categories = [
  { name: "2D", image: "/assets/categories/2d.webp" },
  { name: "3D", image: "/assets/categories/2d.webp" },
  { name: "Audio", image: "/assets/categories/2d.webp" },
  { name: "Video", image: "/assets/categories/2d.webp" },
  { name: "Scripts", image: "/assets/categories/2d.webp" },
  { name: "Animales", image: "/assets/categories/2d.webp" },
  { name: "Entorno", image: "/assets/categories/2d.webp" },
  { name: "Mobiliario", image: "/assets/categories/2d.webp" },
];

const HeroSection = () => {
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
          Descubre y comparte assets digitales para llevar tu proyecto al siguiente nivel.  
          <strong> <a href="/login" className="hero-link">Inicia Sesión</a> </strong> o  
          <strong> <a href="/register" className="hero-link"> Regístrate Ahora</a> </strong> para acceder a todo el contenido.
        </p>

        {/* Línea divisoria */}
        <hr className="hero-divider" />

        {/* Categorías destacadas */}
        <h2 className="hero-categories-title">Categorías Destacadas</h2>
        <div className="hero-categories">
          {categories.map((category, index) => (
            <div key={index} className="category">
              <img src={category.image} alt={category.name} className="category-image" />
              <p className="category-name">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
