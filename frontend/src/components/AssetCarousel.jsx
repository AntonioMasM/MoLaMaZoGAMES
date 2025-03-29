import React, { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AssetCard from "./AssetCard";

const AssetCarousel = ({ title, icon, assets, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const assetsPerPage = 6;
  const carouselRef = useRef(null);

  const getVisibleAssets = () => {
    return assets.slice(currentIndex, currentIndex + assetsPerPage);
  };

  const handlePageChange = (next) => {
    const grid = carouselRef.current;
    if (!grid) return;
  
    // Determinar la dirección de la animación
    const directionClass = next ? "fade-left" : "fade-right";
  
    // Animación de salida (simplemente ocultamos)
    grid.classList.add("fade-out");
  
    setTimeout(() => {
      setCurrentIndex((prev) =>
        next ? prev + assetsPerPage : prev - assetsPerPage
      );
      grid.classList.remove("fade-out");
  
      // Aplicar animación de entrada con dirección
      grid.classList.add(directionClass);
  
      setTimeout(() => {
        grid.classList.remove(directionClass);
      }, 300);
    }, 300);
  };
  

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex + assetsPerPage < assets.length;

  return (
    <section className={`asset-section ${className}`}>
      <h2 className="section-title">
        <span className="section-icon">{icon}</span> {title}
      </h2>

      <div className="asset-grid" ref={carouselRef}>
        {getVisibleAssets().map((asset, index) => (
          <AssetCard key={index} {...asset} />
        ))}
      </div>

      <div className="carousel-controls">
        <button
          className="carousel-button"
          onClick={() => handlePageChange(false)}
          disabled={!canGoBack}
          aria-label="Anterior"
        >
          <FaChevronLeft />
        </button>
        <button
          className="carousel-button"
          onClick={() => handlePageChange(true)}
          disabled={!canGoForward}
          aria-label="Siguiente"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default AssetCarousel;
