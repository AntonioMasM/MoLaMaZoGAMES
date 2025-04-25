import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./Carousel.module.css";

const Carousel = ({
  title,
  icon,
  items = [],
  itemsPerPage = 6,
  renderItem,
  className = "",
  gridClassName = styles.carouselGrid,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const sectionId = `carousel-title-${title.replace(/\s+/g, "-").toLowerCase()}`;

  const getVisibleItems = () => {
    return items.slice(currentIndex, currentIndex + itemsPerPage);
  };

  const handlePageChange = (next) => {
    const grid = carouselRef.current;
    if (!grid) return;

    const directionClass = next ? styles.fadeLeft : styles.fadeRight;
    grid.classList.add(styles.fadeOut);

    setTimeout(() => {
      setCurrentIndex((prev) =>
        next ? prev + itemsPerPage : prev - itemsPerPage
      );
      grid.classList.remove(styles.fadeOut);
      grid.classList.add(directionClass);

      setTimeout(() => {
        grid.classList.remove(directionClass);
      }, 300);
    }, 300);
  };

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex + itemsPerPage < items.length;

  return (
    <section
      className={`${styles.carouselSection} ${className}`}
      aria-labelledby={sectionId}
      role="region"
    >
      <h2 id={sectionId} className={styles.sectionTitle}>
        <span className={styles.sectionIcon} aria-hidden="true">{icon}</span> {title}
      </h2>

      <div className={gridClassName} ref={carouselRef}>
        {getVisibleItems().map((item, index) =>
          renderItem(item, index)
        )}
      </div>

      <div className={styles.carouselControls}>
        <button
          type="button"
          className={styles.carouselButton}
          onClick={() => handlePageChange(false)}
          disabled={!canGoBack}
          aria-label="Mostrar elementos anteriores"
        >
          <FaChevronLeft />
        </button>
        <button
          type="button"
          className={styles.carouselButton}
          onClick={() => handlePageChange(true)}
          disabled={!canGoForward}
          aria-label="Mostrar siguientes elementos"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
