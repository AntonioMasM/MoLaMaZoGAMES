import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import { getCategorias } from "../../services/categorias";
import { useUser } from "../../context/UserContext";

function dropboxToDirectLink(url) {
  return url
    .replace("www.dropbox.com", "dl.dropboxusercontent.com")
    .replace("dl=0", "raw=1");
}

const heroImages = [
  "/assets/main.webp",
  "/assets/main2.webp",
  "/assets/main3.webp",
  "/assets/main4.webp",
];

const HeroSection = () => {
  const { user } = useUser();
  const isAuthenticated = !!user;

  const [categories, setCategories] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const togglePause = () => setIsPaused(!isPaused);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategorias();
        setCategories(data);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.hero}>
      {loading ? (
        <div className={styles.loadingSpinner} aria-live="polite">
          Cargando categorías...
        </div>
      ) : (
        <>
          {/* Carrusel de imágenes destacadas */}
          <div
            className={styles.heroImage}
            onClick={togglePause}
            style={{ cursor: "pointer" }}
            title={isPaused ? "Reanudar carrusel" : "Pausar carrusel"}
            aria-label={isPaused ? "Carrusel pausado" : "Carrusel en reproducción"}
            role="region"
            aria-roledescription="Carrusel de imágenes destacadas"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                setCurrentImageIndex(
                  (prev) => (prev - 1 + heroImages.length) % heroImages.length
                );
              } else if (e.key === "ArrowRight") {
                setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
              }
            }}
          >
            {heroImages.map((src, index) => (
              <img
                key={index}
                id={`hero-image-${index}`}
                src={src}
                alt={`Imagen destacada ${index + 1}`}
                className={`${styles.heroCarouselImage} ${
                  index === currentImageIndex ? styles.active : ""
                }`}
                role="tabpanel"
                aria-hidden={index !== currentImageIndex}
              />
            ))}

            <div
              className={styles.carouselIndicators}
              role="tablist"
              aria-label="Selector de imagen destacada"
            >
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-label={`Imagen destacada ${index + 1}`}
                  aria-controls={`hero-image-${index}`}
                  aria-selected={index === currentImageIndex}
                  aria-current={index === currentImageIndex ? "true" : undefined}
                  className={`${styles.indicatorDot} ${
                    index === currentImageIndex ? styles.active : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>

            <div className={styles.imageCounter} aria-hidden="true">
              {currentImageIndex + 1}/{heroImages.length}
            </div>
          </div>

          {/* Contenido textual y categorías */}
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              La Mejor Compañía de gestión de Assets Digitales
            </h1>

            <p className={styles.heroDescription}>
              {isAuthenticated ? (
                <>
                  ¡Bienvenido, <strong>{user.nickname}</strong>! Empieza a explorar tus assets favoritos.
                </>
              ) : (
                <>
                  Descubre y comparte assets digitales para llevar tu proyecto al siguiente nivel.{" "}
                  <strong>
                    <a href="/login" className={styles.heroLink}>Inicia Sesión</a>
                  </strong>{" "}
                  o{" "}
                  <strong>
                    <a href="/register" className={styles.heroLink}>Regístrate Ahora</a>
                  </strong>{" "}
                  para acceder a todo el contenido.
                </>
              )}
            </p>

            <hr className={styles.heroDivider} />

            <h2 className={styles.heroCategoriesTitle} id="categorias">
              Categorías Destacadas
            </h2>

            <div className={styles.heroCategories}>
              {categories.map((cat, index) => (
                <div key={index} className={styles.category}>
                  <img
                    src={dropboxToDirectLink(cat.imagen)}
                    alt={`Categoría: ${cat.nombre}`}
                    className={styles.categoryImage}
                    onError={(e) => {
                      e.target.src = "/assets/categories/2d.webp";
                      e.target.alt = "Imagen de respaldo para categoría 2D";
                    }}
                  />
                  <p className={styles.categoryName}>{cat.nombre}</p>
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
