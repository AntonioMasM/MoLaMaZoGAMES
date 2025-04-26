import React, { useState, useRef, useEffect } from "react";
import PreviewItem from "./PreviewItem";
import styles from "./GalleryUploader.module.css";

const GalleryUploader = ({ galeriaMultimedia = [], onGalleryChange = () => {} }) => {
  const [localGallery, setLocalGallery] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_FILES = 20;
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB por archivo

  // Al montar, inicializar galería si ya había
  useEffect(() => {
    const initializedGallery = galeriaMultimedia.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setLocalGallery(initializedGallery);
    return () => {
      initializedGallery.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, [galeriaMultimedia]);

  // ✅ Añadir archivos desde input o drop
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
    }));

    const updatedGallery = [...localGallery, ...formatted].slice(0, MAX_FILES);

    setLocalGallery(updatedGallery);
    onGalleryChange(updatedGallery.map((f) => f.file));

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
    URL.revokeObjectURL(updatedGallery[idx].preview);
    updatedGallery.splice(idx, 1);
    setLocalGallery(updatedGallery);
    onGalleryChange(updatedGallery.map((f) => f.file));
  };

  const clearGallery = () => {
    localGallery.forEach((item) => URL.revokeObjectURL(item.preview));
    setLocalGallery([]);
    onGalleryChange([]);
  };

  return (
    <section className={styles.gallerySection}>
      <h2 className={styles.sectionTitle}>Galería Multimedia</h2>

      {/* Área Drag and Drop */}
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
        aria-invalid={errorMessage ? "true" : "false"}
        aria-describedby={errorMessage ? "error-gallery" : undefined}
      >
        <p>Haz clic o arrastra archivos aquí</p>
        <small>(Máximo 20 archivos / 20MB por archivo)</small>
      </div>

      {/* Input oculto */}
      <input
        id="galeriaMultimedia"
        type="file"
        multiple
        accept="image/*,video/*"
        ref={fileInputRef}
        onChange={handleGalleryInput}
        className={styles.hiddenInput}
      />

      {/* Error mensaje */}
      {errorMessage && (
        <p id="error-gallery" className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}

      {/* Galería Preview */}
      {localGallery.length > 0 ? (
        <div className={styles.galleryPreview}>
          {localGallery.map((item, idx) => (
            <PreviewItem
              key={idx}
              src={item.preview}
              type={item.file.type}
              name={item.file.name}
              onRemove={() => handleRemove(idx)}
            />
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>
          No hay archivos aún. ¡Añade tu primera imagen o vídeo!
        </p>
      )}

      {/* Contador de archivos */}
      {localGallery.length > 0 && (
        <p className={styles.fileCounter}>
          {localGallery.length} / {MAX_FILES} archivos seleccionados
        </p>
      )}

      {/* Botón limpiar galería */}
      {localGallery.length > 0 && (
        <button
          type="button"
          className={styles.clearGalleryButton}
          onClick={clearGallery}
        >
          Limpiar Galería
        </button>
      )}
    </section>
  );
};

export default GalleryUploader;
