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
      // 2D
      "image/png", "image/jpeg", "image/jpg", "image/svg+xml",
  
      // 3D
      "model/fbx", "model/obj", "model/stl", "model/gltf+json", "model/gltf-binary",
      "application/octet-stream", // usado por .blend, .fbx y otros binarios
  
      // Audio
      "audio/*",
  
      // Video
      "video/*",
  
      // Código fuente y texto
      "text/plain", "application/json", "text/html", "text/css", "application/javascript",
    "text/x-c",                    // .c
  "text/x-c++",                  // .cpp
  "text/x-python",               // .py
  "text/x-java-source",          // .java
  "text/x-sh",                   // .sh
  "text/x-typescript",           // .ts
  "application/x-httpd-php",    // .php
      // Otros posibles
      "application/zip", "application/x-rar-compressed", "application/x-7z-compressed"
    ];
  
    const maxSizeMB = 100;
  
    const isValidType = allowedTypes.some((type) =>
      file.type === type || file.type.startsWith(type.replace("*", ""))
    );
  
    if (!isValidType) {
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
        <span>{selectedFile ? "Archivo seleccionado. Sube más archivos aquí" : "Subir archivo o arrastrar aquí. Puedes añadir varios archivos"}</span>

        <input
          type="file"
          accept=".png,.jpg,.jpeg,.svg,.fbx,.obj,.stl,.blend,.gltf,.glb,.wrml,.mp3,.wav,.aac,.ogg,.mp4,.webm,.avi,.mov,.txt,.html,.css,.js,.json,.zip,.rar,.7z"
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
        <li><FaFileImage /> 2D: PNG, JPG, JPEG, SVG</li>
        <li><FaFileAlt /> 3D: FBX, OBJ, STL, BLEND, GLTF, WRML</li>
        <li><FaFileAudio /> Audio: MP3, WAV, AAC, OGG...</li>
        <li><FaFileVideo /> Video: MP4, WEBM, AVI, MOV...</li>
        <li><FaFileAlt /> Código: TXT, HTML, CSS, JS, JSON...</li>
        <li><FaFileAlt /> Otros: ZIP, RAR, 7Z, BIN...</li>
      </ul>


      {showError && <p id="error-file" className={styles.errorMessage}>{showError}</p>}

      <div className={styles.previewBox}>
        {renderPreview()}
      </div>
    </section>
  );
};

export default UploadZone;
