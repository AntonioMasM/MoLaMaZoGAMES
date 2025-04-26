import React, { useState, useEffect } from "react";
import styles from "./UploadZone.module.css";
import {
  FaCloudUploadAlt,
  FaFileImage,
  FaFileVideo,
  FaFileAudio,
  FaFileAlt,
} from "react-icons/fa";

const UploadZone = ({
  onFileSelect,
  preview,
  errorExternal = "", // opcional: error que venga del padre
  inputRef = null,    // opcional: ref para accesibilidad
}) => {
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dynamicPreview, setDynamicPreview] = useState("");

  const handleFile = (file) => {
    const allowedTypes = [
      "image/png", "image/jpeg", "image/jpg", "image/svg+xml",
      "video/mp4", "video/webm",
      "audio/mpeg", "audio/wav",
      "application/json", "text/plain", "application/octet-stream"
    ];
    const maxSizeMB = 100;

    if (!allowedTypes.includes(file.type)) {
      setLocalError("Tipo de archivo no permitido.");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setLocalError("Archivo demasiado grande (máximo 100MB).");
      return;
    }

    setLocalError("");
    setSelectedFile(file);
    onFileSelect(file);
    const tempUrl = URL.createObjectURL(file);
    setDynamicPreview(tempUrl);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const renderPreview = () => {
    const src = dynamicPreview || preview;
    if (!src) return null;

    const extension = src.split(".").pop().toLowerCase();
    if (["png", "jpg", "jpeg", "svg"].includes(extension)) {
      return <img src={src} alt="Vista previa" className={styles.previewImage} />;
    } else if (["mp4", "webm"].includes(extension)) {
      return <video src={src} controls className={styles.previewMedia} />;
    } else if (["mp3", "wav"].includes(extension)) {
      return <audio src={src} controls className={styles.previewMedia} />;
    } else {
      return (
        <div className={styles.previewFile}>
          <FaFileAlt /> Archivo subido
        </div>
      );
    }
  };

  useEffect(() => {
    // Limpieza de objetos temporales
    return () => {
      if (dynamicPreview) {
        URL.revokeObjectURL(dynamicPreview);
      }
    };
  }, [dynamicPreview]);

  const showError = localError || errorExternal;

  return (
    <section
      className={`${styles.uploadSection} ${dragging ? styles.dragActive : ""} ${showError ? styles.errorBorder : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
      onDrop={handleDrop}
    >
      <label
        className={styles.dropArea}
        role="button"
        tabIndex={0}
        aria-label="Área para subir archivo"
        aria-invalid={showError ? "true" : "false"}
        aria-describedby={showError ? "error-file" : undefined}
      >
        {/* 🔀 Icono dinámico */}
        {selectedFile || preview ? (
          <FaFileAlt className={styles.iconUploaded} />
        ) : (
          <FaCloudUploadAlt className={styles.icon} />
        )}
        <span>{selectedFile ? "Archivo seleccionado" : "Subir archivo o arrastrar aquí"}</span>

        <input
          type="file"
          accept="*/*"
          onChange={handleChange}
          hidden
          ref={inputRef}
        />
      </label>

      {/* 📋 Mostrar nombre y tamaño si hay archivo */}
      {selectedFile && (
        <p className={styles.fileInfo}>
          {selectedFile.name} - {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
        </p>
      )}

      <ul className={styles.formatList}>
        <li><FaFileImage /> Imágenes: PNG, JPG, SVG</li>
        <li><FaFileVideo /> Videos: MP4, WEBM</li>
        <li><FaFileAudio /> Audio: MP3, WAV</li>
        <li><FaFileAlt /> Otros: TXT, JSON</li>
      </ul>

      {showError && <p id="error-file" className={styles.errorMessage}>{showError}</p>}

      <div className={styles.previewBox}>
        {renderPreview()}
      </div>
    </section>
  );
};

export default UploadZone;
