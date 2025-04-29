import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AssetCard from "../Asset/AssetCard";
import styles from "../Asset/AssetCarousel.module.css";

const GrupoAssetCarousel = ({ title, icon, assets, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [assetsPerPage, setAssetsPerPage] = useState(5);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) setAssetsPerPage(5);
      else if (width >= 768) setAssetsPerPage(4);
      else setAssetsPerPage(2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleAssets = () => assets.slice(currentIndex, currentIndex + assetsPerPage);

  const handlePageChange = (next) => {
    const grid = carouselRef.current;
    if (!grid) return;

    const directionClass = next ? styles.slideLeft : styles.slideRight;
    grid.classList.add(styles.fadeOut);

    setTimeout(() => {
      setCurrentIndex((prev) => (next ? prev + assetsPerPage : prev - assetsPerPage));
      grid.classList.remove(styles.fadeOut);
      grid.classList.add(directionClass);

      setTimeout(() => {
        grid.classList.remove(directionClass);
      }, 500);
    }, 400);
  };

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex + assetsPerPage < assets.length;

  return (
    <section
      className={`${styles.assetCarousel} ${className}`}
      aria-label={`Assets del grupo ${title}`}
    >
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>{icon}</span> {title}
      </h2>

      <div className={styles.assetGrid} ref={carouselRef}>
        {getVisibleAssets().map((asset, index) => (
          <AssetCard key={index} {...asset} />
        ))}
      </div>

      <div className={styles.carouselControls}>
        <button
          className={styles.carouselButton}
          onClick={() => handlePageChange(false)}
          disabled={!canGoBack}
          aria-label="Anterior"
        >
          <FaChevronLeft />
        </button>
        <button
          className={styles.carouselButton}
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

export default GrupoAssetCarousel;
