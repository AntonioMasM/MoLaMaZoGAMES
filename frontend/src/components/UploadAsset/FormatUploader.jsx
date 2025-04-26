import React, { useState } from "react";
import styles from "./FormatUploader.module.css";
import { getFileIcon, formatFileSize, truncateFileName } from "../../utils/fileUtils";
import Toast from "../ui/Toast";

const FORMATOS_PERMITIDOS = [
    "PDF", "ZIP", "MP4", "MP3", "JPG", "PNG",
    "FBX", "OBJ", "WAV", "GLB", "GLTF"
  ];

  
const MAX_FILE_SIZE_MB = 50; // 🚫 No permitir archivos > 50MB

const FormatUploader = ({
  formatos = [],
  onAddFormato = () => {},
  onFormatoFileChange = () => {},
  onFormatoRemove = () => {},
  error = "", // 🚨 Soporte de error externo si quieres
  inputRef = null,
}) => {
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleRemove = (idx) => {
    setDeletingIndex(idx);
    setTimeout(() => {
      onFormatoRemove(idx);
      setDeletingIndex(null);
      setToastMessage("Archivo eliminado correctamente ✅");
    }, 300);
  };

  const handleFileSelect = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;

    const sizeInMB = file.size / 1024 / 1024;
    if (sizeInMB > MAX_FILE_SIZE_MB) {
      setToastMessage(`El archivo supera los ${MAX_FILE_SIZE_MB}MB ❌`);
      return;
    }
    const extension = file.name.split('.').pop().toUpperCase();
    if (!FORMATOS_PERMITIDOS.includes(extension)) {
      alert("Formato no permitido: " + extension);
      return;
    }
    onFormatoFileChange(e, idx);
    setToastMessage("Archivo subido correctamente 📂");
  };

  return (
    <section className={styles.formatUploader}>
      <h2 className={styles.sectionTitle}>Formatos de Archivo</h2>

      {formatos.length > 0 && (
        <div className={styles.formatList}>
          {formatos
            .slice()
            .sort((a, b) => (a.file?.name || "").localeCompare(b.file?.name || ""))
            .map((formato, idx) => {
              const hasError = formato.file && (formato.file.size / 1024 / 1024) > MAX_FILE_SIZE_MB;

              return (
                <div
                  key={idx}
                  className={`${styles.formatoItem} ${deletingIndex === idx ? styles.fadeOut : styles.bounceIn} ${hasError ? styles.errorFormato : ""}`}
                  >
                  <div className={styles.fileIcon}>
                    {getFileIcon(formato.file?.name)}
                  </div>

                  <div className={styles.fileName}>
                    {formato.file ? truncateFileName(formato.file.name) : "Sin archivo"}
                  </div>

                  <div className={styles.fileSize}>
                    {formato.file ? formatFileSize(formato.file.size) : "-"}
                  </div>

                  <div className={styles.fileActions}>
                    <label
                      className={styles.selectFileButton}
                      role="button"
                      tabIndex={0}
                      aria-label={`Seleccionar archivo para formato ${idx + 1}`}
                    >
                      {formato.file ? "Cambiar" : "Seleccionar"}
                      <input
                        type="file"
                        accept="*/*"
                        onChange={(e) => handleFileSelect(e, idx)}
                        className={styles.hiddenInput}
                        aria-invalid={hasError ? "true" : "false"}
                        aria-describedby={hasError ? `error-formato-${idx}` : undefined}
                      />
                    </label>

                    {formato.file && (
                      <button
                        type="button"
                        className={styles.deleteFileButton}
                        aria-label={`Eliminar archivo ${formato.file.name}`}
                        onClick={() => handleRemove(idx)}
                      >
                        ✖
                      </button>
                    )}
                  </div>

                  {/* Error asociado al archivo */}
                  {hasError && (
                    <p id={`error-formato-${idx}`} className={styles.errorMessage}>
                      Archivo supera los {MAX_FILE_SIZE_MB}MB
                    </p>
                  )}
                </div>
              );
            })}
        </div>
      )}

      <button
        type="button"
        onClick={onAddFormato}
        className={styles.addFormatButton}
        aria-label="Añadir nuevo formato de archivo"
      >
        + Añadir nuevo Formato
      </button>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </section>
  );
};

export default FormatUploader;
