import { useState, useEffect } from "react";
import SkeletonGallery from "@/components/ui/SkeletonGallery";
import styles from "./AssetGallery.module.css";

const AssetGallery = ({ galeria = [] }) => {
  const [loading, setLoading] = useState(true);
  const [verTodas, setVerTodas] = useState(false);

  useEffect(() => {
    if (galeria && galeria.length > 0) {
      setLoading(false);
    }
  }, [galeria]);

  if (!galeria || galeria.length === 0) {
    return (
      <div className={styles.emptyGallery}>
        <p>No hay recursos multimedia disponibles para este asset.</p>
      </div>
    );
  }

  // 🔥 Mostrar 6 primero, o todos si el usuario pulsa "Ver más"
  const galeriaVisible = verTodas ? galeria : galeria.slice(0, 6);

  return (
    <section className={styles.gallerySection} aria-label="Galería multimedia">
      {loading ? (
        <SkeletonGallery />
      ) : (
        <>
          <div className={styles.galleryGrid}>
            {galeriaVisible.map((item, index) => (
              <figure key={index} className={`${styles.galleryItem} ${styles.fadeInItem}`}>
                {item.tipo === "image" && (
                  <img
                    src={item.url}
                    alt={`Imagen ${index + 1} del asset`}
                    className={styles.media}
                    loading="lazy"
                  />
                )}
                {item.tipo === "video" && (
                  <video controls className={styles.media}>
                    <source src={item.url} type="video/mp4" />
                    Tu navegador no soporta el video.
                  </video>
                )}
                {item.tipo === "audio" && (
                  <audio controls className={styles.audio}>
                    <source src={item.url} type="audio/mpeg" />
                    Tu navegador no soporta el audio.
                  </audio>
                )}
                {/* Opcional: Caption para identificar tipo de recurso */}
                <figcaption className={styles.caption}>
                  {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* 🖱️ Botón Ver Más */}
          {!verTodas && galeria.length > 6 && (
            <button
              onClick={() => setVerTodas(true)}
              className={styles.viewAllButton}
              aria-label="Mostrar toda la galería"
            >
              Ver toda la galería
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default AssetGallery;
