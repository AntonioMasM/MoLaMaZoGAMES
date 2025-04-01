import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HeroSection.css";

function dropboxToDirectLink(url) {
  return url
    .replace("www.dropbox.com", "dl.dropboxusercontent.com")
    .replace("dl=0", "raw=1");
}

const heroImages = [
  "/assets/main.webp",
  "/assets/main2.webp",
  "/assets/main3.webp",
  "/assets/main4.webp"
];

const HeroSection = () => {
  const [categories, setCategories] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Intervalo de cambio de imagen
  useEffect(() => {
    if (isPaused) return;  // Pausar el carrusel si el estado está pausado
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Función para pausar/reproducir el carrusel
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

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
    <section className="hero">
      {/* Indicador de carga */}
      {loading ? (
        <div className="loading-spinner" aria-live="polite">
          Cargando categorías...
        </div>
      ) : (
        <>
          {/* Carrusel de imágenes destacadas */}
          <div className="hero-image" onClick={togglePause}>
            {heroImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Imagen destacada ${index + 1}`}
                className={`hero-carousel-image ${index === currentImageIndex ? "active" : ""}`}
              />
            ))}

            {/* Indicadores de progreso */}
            <div className="carousel-indicators">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`indicator-dot ${index === currentImageIndex ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Imagen destacada ${index + 1}`}  // Agregar texto descriptivo
                />
              ))}
            </div>
          </div>

          {/* Contenido principal */}
          <div className="hero-content">
            <h1 className="hero-title">La Mejor Compañía de gestión de Assets Digitales</h1>
            <p className="hero-description">
              Descubre y comparte assets digitales para llevar tu proyecto al siguiente nivel.{" "}
              <strong>
                <a href="/login" className="hero-link" aria-label="Ir a la página de inicio de sesión">Inicia Sesión</a>
              </strong> o{" "}
              <strong>
                <a href="/register" className="hero-link" aria-label="Ir a la página de registro">Regístrate Ahora</a>
              </strong> para acceder a todo el contenido.
            </p>

            <hr className="hero-divider" />

            <h2 className="hero-categories-title" id="categorias">Categorías Destacadas</h2>
            <div className="hero-categories">
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
                    onLoad={() => e.target.classList.add("loaded")}  // Añadir clase de carga
                  />
                  <p className="category-name">{cat.nombre}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;
