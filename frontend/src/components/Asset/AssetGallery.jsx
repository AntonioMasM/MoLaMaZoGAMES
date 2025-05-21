import { useState, useEffect, useRef } from "react";
import SkeletonGallery from "@/components/ui/SkeletonGallery";
import ZoomImage from "./ZoomImage";
import styles from "./AssetGallery.module.css";

const AssetGallery = ({ galeria = [] }) => {
  const [loading, setLoading] = useState(true);
  const [seleccionado, setSeleccionado] = useState(0);
  const [fade, setFade] = useState(false);
  const autoplayRef = useRef(null);

  useEffect(() => {
    if (galeria.length > 0) setLoading(false);
  }, [galeria]);

  // ⏱️ Autoplay carrusel
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setSeleccionado((prev) => (prev + 1) % galeria.length);
        setFade(false);
      }, 300);
    }, 5000);

    return () => clearInterval(autoplayRef.current);
  }, [galeria]);

  const handleUserSelect = (index) => {
    clearInterval(autoplayRef.current);
    setFade(true);
    setTimeout(() => {
      setSeleccionado(index);
      setFade(false);
    }, 300);
  };

  if (!galeria || galeria.length === 0) {
    return (
      <div className={styles.emptyGallery}>
        <p>No hay recursos multimedia disponibles para este asset.</p>
      </div>
    );
  }

  const recurso = galeria[seleccionado];

  return (
    <section
      className={styles.gallerySection}
      aria-label="Galería multimedia del asset"
      aria-live="polite"
    >
      {loading ? (
        <SkeletonGallery />
      ) : (
        <>
          {/* 🎯 Vista principal con efecto fade */}
          <div
            className={`${styles.previewContainer} ${fade ? styles.fadeOut : styles.fadeIn}`}
          >
            {recurso.tipo === "image" && (
              <ZoomImage
                src={recurso.url}
                alt={`Vista previa imagen ${seleccionado + 1}`}
              />
            )}
            {recurso.tipo === "video" && (
              <video
                controls
                className={styles.previewMedia}
                aria-label={`Vista previa video ${seleccionado + 1}`}
              >
                <source src={recurso.url} type="video/mp4" />
              </video>
            )}
            {recurso.tipo === "audio" && (
              <div className={styles.previewAudio}>
                <audio controls>
                  <source src={recurso.url} type="audio/mpeg" />
                </audio>
              </div>
            )}
          </div>

          {/* 🖼️ Miniaturas */}
          <div className={styles.thumbnailRow}>
            {galeria.map((item, index) => (
              <button
                key={index}
                onClick={() => handleUserSelect(index)}
                className={`${styles.thumbnailButton} ${
                  index === seleccionado ? styles.activeThumbnail : ""
                }`}
                aria-label={`Seleccionar ${item.tipo} ${index + 1}`}
              >
                {item.tipo === "image" && (
                  <img src={item.url} alt={`Miniatura ${index + 1}`} className={styles.thumbnailImage} />
                )}
                {item.tipo === "video" && (
                  <div className={styles.videoThumb}>
                    <video muted>
                      <source src={item.url} type="video/mp4" />
                    </video>
                  </div>
                )}
                {item.tipo === "audio" && (
                  <div className={styles.audioThumb}>🎵</div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default AssetGallery;
