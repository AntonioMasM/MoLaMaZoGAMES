import React, { useState, useRef, useEffect } from "react";
import PreviewItem from "./PreviewItem";
import styles from "./GalleryUploader.module.css";

const GalleryUploader = ({ galeriaMultimedia = [], onGalleryChange = () => {} }) => {
  const [localGallery, setLocalGallery] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_FILES = 20;
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

  // Inicializar galería al montar
  useEffect(() => {
    const initializedGallery = galeriaMultimedia.map((item) => {
      if (typeof item === "string") {
        return { file: null, preview: item, tipo: "image", isNew: false };
      }

      if (item && typeof item === "object" && "preview" in item && "tipo" in item) {
        return {
          file: item.file || null,
          preview: item.preview,
          tipo: item.tipo,
          public_id: item.public_id,
          isNew: item.isNew || false,
        };
      }

      if (item instanceof File) {
        return {
          file: item,
          preview: URL.createObjectURL(item),
          tipo: item.type.startsWith("image/")
            ? "image"
            : item.type.startsWith("video/")
            ? "video"
            : "otro",
          isNew: true,
        };
      }

      console.warn("Elemento no reconocido en galeriaMultimedia:", item);
      return { file: null, preview: "", tipo: "otro", isNew: false };
    });

    setLocalGallery(initializedGallery);

    return () => {
      initializedGallery.forEach((item) => {
        if (item.isNew && item.file) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, [galeriaMultimedia]);

  const handleFiles = (files) => {
    const incomingFiles = Array.from(files);
    const validFiles = incomingFiles.filter((file) => {
      const validType = file.type.startsWith("image/") || file.type.startsWith("video/");
      const validSize = file.size <= MAX_FILE_SIZE;
      return validType && validSize;
    });

    if (validFiles.length < incomingFiles.length) {
      setErrorMessage("Algunos archivos fueron rechazados por tipo o tamaño.");
    }

    const formatted = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      tipo: file.type.startsWith("image/")
        ? "image"
        : file.type.startsWith("video/")
        ? "video"
        : "otro",
      isNew: true,
    }));

    const updatedGallery = [...localGallery, ...formatted].slice(0, MAX_FILES);

    setLocalGallery(updatedGallery);
    onGalleryChange(updatedGallery);

    if (updatedGallery.length >= MAX_FILES) {
      setErrorMessage(`Máximo ${MAX_FILES} archivos permitidos.`);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleGalleryInput = (e) => {
    handleFiles(e.target.files);
  };

  const handleRemove = (idx) => {
    const updatedGallery = [...localGallery];
    const item = updatedGallery[idx];
    if (item.file) URL.revokeObjectURL(item.preview);
    updatedGallery.splice(idx, 1);
    setLocalGallery(updatedGallery);
    onGalleryChange(updatedGallery);
  };

  const clearGallery = () => {
    localGallery.forEach((item) => {
      if (item.isNew && item.file) {
        URL.revokeObjectURL(item.preview);
      }
    });
    setLocalGallery([]);
    onGalleryChange([]);
  };

  return (
    <section className={styles.gallerySection}>
      <h2 className={styles.sectionTitle}>Galería Multimedia</h2>

      <div
        className={`${styles.dropArea} ${isDragging ? styles.dragging : ""} ${errorMessage ? styles.errorBorder : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onClick={() => fileInputRef.current.click()}
        aria-label="Haz clic o arrastra archivos aquí"
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? "error-gallery" : undefined}
      >
        <p>Haz clic o arrastra archivos aquí</p>
        <small>(Máximo 20 archivos / 20MB por archivo)</small>
      </div>

      <input
        id="galeriaMultimedia"
        type="file"
        multiple
        accept="image/*,video/*"
        ref={fileInputRef}
        onChange={handleGalleryInput}
        className={styles.hiddenInput}
      />

      {errorMessage && (
        <p id="error-gallery" className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}

      {localGallery.length > 0 ? (
        <div className={styles.galleryPreview}>
          {localGallery.map((item, idx) => (
            <PreviewItem
              key={idx}
              src={item.preview}
              type={item.tipo || "image"}
              name={item.file?.name || `Archivo ${idx + 1}`}
              onRemove={() => handleRemove(idx)}
            />
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>
          No hay archivos aún. ¡Añade tu primera imagen o vídeo!
        </p>
      )}

      {localGallery.length > 0 && (
        <>
          <p className={styles.fileCounter}>
            {localGallery.length} / {MAX_FILES} archivos seleccionados
          </p>
          <button
            type="button"
            className={styles.clearGalleryButton}
            onClick={clearGallery}
          >
            Limpiar Galería
          </button>
        </>
      )}
    </section>
  );
};

export default GalleryUploader;
