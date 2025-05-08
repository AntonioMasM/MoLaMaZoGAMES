import { useEffect, useState } from "react";
import styles from "./EditableGallery.module.css";

const SUPPORTED_TYPES = ["image/", "video/", "audio/"];

const EditableGallery = ({ initialItems = [], onChange }) => {
  const [items, setItems] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  // 🎯 Inicializa galería con elementos existentes (URL + tipo)
  useEffect(() => {
    const parsed = initialItems.map((item) =>
      typeof item === "string"
        ? { url: item, tipo: "image", isNew: false }
        : {
            url: item.url,
            tipo: item.tipo || "image",
            isNew: false,
          }
    );
    setItems(parsed);
    setNewFiles([]); // solo añadiremos archivos nuevos desde input
  }, [initialItems]);

  const getTipo = (file) => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    return "unknown";
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) =>
      SUPPORTED_TYPES.some((type) => file.type.startsWith(type))
    );

    const previews = validFiles.map((file) => ({
      url: URL.createObjectURL(file),
      file,
      tipo: getTipo(file),
      isNew: true,
    }));

    const updatedItems = [...items, ...previews];
    const updatedNewFiles = [...newFiles, ...validFiles];

    setItems(updatedItems);
    setNewFiles(updatedNewFiles);
    onChange && onChange({ updatedItems, newFiles: updatedNewFiles });
  };

  const handleRemove = (index) => {
    const removed = items[index];
    const updatedItems = items.filter((_, i) => i !== index);
    const updatedNewFiles = removed.isNew
      ? newFiles.filter((f) => f !== removed.file)
      : newFiles;

    if (removed.isNew) URL.revokeObjectURL(removed.url);

    setItems(updatedItems);
    setNewFiles(updatedNewFiles);
    onChange && onChange({ updatedItems, newFiles: updatedNewFiles });
  };

  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.galleryGrid}>
        {items.map((item, i) => (
          <div key={i} className={styles.imageContainer}>
            {item.tipo === "image" && (
              <img src={item.url} alt={`Imagen ${i + 1}`} className={styles.image} />
            )}
            {item.tipo === "video" && (
              <video src={item.url} controls className={styles.image}></video>
            )}
            {item.tipo === "audio" && (
              <audio src={item.url} controls className={styles.audio}></audio>
            )}

            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => handleRemove(i)}
              aria-label={`Eliminar archivo ${i + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <label htmlFor="media-upload" className={styles.uploadLabel}>
        Añadir archivos
        <input
          type="file"
          id="media-upload"
          accept="image/*,video/*,audio/*"
          multiple
          className={styles.fileInput}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default EditableGallery;
