import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({
  title,
  icon,
  items = [],
  itemsPerPage = 6,
  renderItem, // Función para renderizar cada ítem
  className = "",
  gridClassName = "carousel-grid", // Por defecto usa esta clase
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const getVisibleItems = () => {
    return items.slice(currentIndex, currentIndex + itemsPerPage);
  };

  const handlePageChange = (next) => {
    const grid = carouselRef.current;
    if (!grid) return;

    const directionClass = next ? "fade-left" : "fade-right";
    grid.classList.add("fade-out");

    setTimeout(() => {
      setCurrentIndex((prev) =>
        next ? prev + itemsPerPage : prev - itemsPerPage
      );
      grid.classList.remove("fade-out");
      grid.classList.add(directionClass);

      setTimeout(() => {
        grid.classList.remove(directionClass);
      }, 300);
    }, 300);
  };

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex + itemsPerPage < items.length;

  return (
    <section className={`carousel-section ${className}`}>
      <h2 className="section-title">
        <span className="section-icon">{icon}</span> {title}
      </h2>

      <div className={gridClassName} ref={carouselRef}>
        {getVisibleItems().map((item, index) => renderItem(item, index))}
      </div>

      <div className="carousel-controls">
        <button
          className="carousel-button"
          onClick={() => handlePageChange(false)}
          disabled={!canGoBack}
        >
          <FaChevronLeft />
        </button>
        <button
          className="carousel-button"
          onClick={() => handlePageChange(true)}
          disabled={!canGoForward}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
