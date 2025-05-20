import { useEffect, useState } from "react";
import styles from "./EditableGallery.module.css";

const SUPPORTED_TYPES = ["image/", "video/", "audio/"];

const ICONS = {
  image: "📷",
  video: "🎥",
  audio: "🎵",
};

const EditableGallery = ({ initialItems = [], onChange }) => {
  const [items, setItems] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

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
    setNewFiles([]);
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
      <div className={styles.galleryGrid} role="list">
        {items.map((item, index) => (
          <div
            key={`${item.url}-${item.tipo}-${index}`}
            role="listitem"
            className={styles.imageContainer}
            data-new={item.isNew ? "true" : "false"}
          >
            <div className={styles.typeBadge} title={item.tipo}>
              {ICONS[item.tipo] || "📁"}
            </div>

            {item.tipo === "image" && (
              <img
                src={item.url}
                alt={`Imagen ${index + 1}`}
                className={styles.image}
              />
            )}
            {item.tipo === "video" && (
              <video
                src={item.url}
                controls
                className={styles.image}
              />
            )}
            {item.tipo === "audio" && (
              <audio
                src={item.url}
                controls
                className={styles.audio}
              />
            )}

            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => handleRemove(index)}
              aria-label={`Eliminar archivo ${index + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <label htmlFor="media-upload" className={styles.uploadLabel}>
        + Añadir archivos
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
