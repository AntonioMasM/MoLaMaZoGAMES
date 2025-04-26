import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import styles from "./PreviewItem.module.css";

const PreviewItem = ({ src, name = "Archivo", type = "image", onRemove = () => {} }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isVideo = type.startsWith("video");

  const handleOpenPreview = () => {
    if (src) {
      setIsPreviewOpen(true);
    }
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleOpenPreview();
    }
    if (e.key === "Escape" && isPreviewOpen) {
      handleClosePreview();
    }
  };

  useEffect(() => {
    if (!isPreviewOpen) return;
    const escListener = (e) => {
      if (e.key === "Escape") {
        handleClosePreview();
      }
    };
    document.addEventListener("keydown", escListener);
    return () => {
      document.removeEventListener("keydown", escListener);
    };
  }, [isPreviewOpen]);

  return (
    <>
      <div
        className={styles.previewItem}
        aria-label={`Vista previa de: ${name}`}
      >
        <div
          className={styles.mediaWrapper}
          role="button"
          tabIndex={0}
          onClick={handleOpenPreview}
          onKeyDown={handleKeyDown}
          aria-label={`Abrir vista previa de ${name}`}
        >
          {src ? (
            isVideo ? (
              <video
                src={src}
                className={styles.previewMedia}
                preload="metadata"
                muted
                aria-label={`Video: ${name}`}
              />
            ) : (
              <img
                src={src}
                alt={`Imagen: ${name}`}
                className={styles.previewMedia}
              />
            )
          ) : (
            <div className={styles.placeholder}>Sin archivo</div>
          )}

          {/* 🌑 Overlay hover */}
          <div className={styles.overlayHover}></div>

          {/* ❌ Botón eliminar */}
          <button
            type="button"
            className={styles.deleteButton}
            aria-label={`Eliminar ${name}`}
            title={`Eliminar ${name}`}
            onClick={onRemove}
          >
            <FaTrashAlt />
          </button>
        </div>

        {/* 📄 Nombre truncado */}
        <div className={styles.fileName}>
          {name.length > 28 ? name.slice(0, 25) + "..." : name}
        </div>
      </div>

      {/* 🎯 Modal de vista previa */}
      {isPreviewOpen && (
        <div
          className={`${styles.modalBackdrop} ${styles.fadeIn}`}
          onClick={handleClosePreview}
          role="dialog"
          aria-modal="true"
          aria-label={`Vista previa de ${name}`}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo ? (
              <video src={src} className={styles.modalMedia} controls autoPlay muted />
            ) : (
              <img src={src} alt={`Vista previa de ${name}`} className={styles.modalMedia} />
            )}
            <button
              type="button"
              className={styles.closeModalButton}
              aria-label="Cerrar vista previa"
              onClick={handleClosePreview}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PreviewItem;
