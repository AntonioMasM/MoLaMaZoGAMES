import React, { useState } from "react";
import styles from "./FormatUploader.module.css";
import { getFileIcon, formatFileSize, truncateFileName } from "../../utils/fileUtils";
import Toast from "../ui/Toast";
import { v4 as uuidv4 } from "uuid";

const FORMATOS_PERMITIDOS = [
  "PDF", "ZIP", "MP4", "MP3", "JPG", "PNG",
  "FBX", "OBJ", "WAV", "GLB", "GLTF"
];

const MAX_FILE_SIZE_MB = 50;

const FormatUploader = ({
  formatos = [],
  onAddFormato = () => {},
  onFormatoFileChange = () => {},
  onFormatoRemove = () => {},
  error = "",
  inputRef = null,
}) => {
  const [deletingId, setDeletingId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleRemove = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      onFormatoRemove(id);
      setDeletingId(null);
      setToastMessage("Archivo eliminado correctamente ✅");
    }, 300);
  };

  const handleFileSelect = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    // reset input for duplicate file selection
    e.target.value = "";

    const sizeInMB = file.size / 1024 / 1024;
    if (sizeInMB > MAX_FILE_SIZE_MB) {
      setToastMessage(`El archivo supera los ${MAX_FILE_SIZE_MB}MB ❌`);
      return;
    }

    const extension = file.name.split(".").pop()?.toUpperCase();
    if (!FORMATOS_PERMITIDOS.includes(extension)) {
      alert("Formato no permitido: " + extension);
      return;
    }

    onFormatoFileChange(e, id);
    setToastMessage("Archivo subido correctamente 📂");
  };

  const handleAdd = () => {
    onAddFormato({
      id: uuidv4(),
      file: null
    });
  };

  return (
    <section className={styles.formatUploader}>
      <h2 className={styles.sectionTitle}>Formatos de Archivo</h2>

      {formatos.length > 0 && (
        <div className={styles.formatList}>
          {formatos
            .slice()
            .sort((a, b) => (a.file?.name || "").localeCompare(b.file?.name || ""))
            .map((formato) => {
              const { id, file } = formato;
              const hasError = file && (file.size / 1024 / 1024) > MAX_FILE_SIZE_MB;

              return (
                <div
                  key={id}
                  className={`${styles.formatoItem} ${deletingId === id ? styles.fadeOut : styles.bounceIn} ${hasError ? styles.errorFormato : ""}`}
                >
                  <div className={styles.fileIcon}>
                    {getFileIcon(file?.name)}
                  </div>

                  <div className={styles.fileName}>
                    {file ? truncateFileName(file.name) : "Sin archivo"}
                  </div>

                  <div className={styles.fileSize}>
                    {file ? formatFileSize(file.size) : "-"}
                  </div>

                  <div className={styles.fileActions}>
                    <label
                      className={styles.selectFileButton}
                      role="button"
                      tabIndex={0}
                      aria-label={`Seleccionar archivo para formato`}
                    >
                      {file ? "Cambiar" : "Seleccionar"}
                      <input
                        key={id}
                        type="file"
                        accept="*/*"
                        onChange={(e) => handleFileSelect(e, id)}
                        className={styles.hiddenInput}
                        aria-invalid={hasError ? "true" : "false"}
                        aria-describedby={hasError ? `error-formato-${id}` : undefined}
                      />
                    </label>

                    {file && (
                      <button
                        type="button"
                        className={styles.deleteFileButton}
                        aria-label={`Eliminar archivo ${file.name}`}
                        onClick={() => handleRemove(id)}
                      >
                        ✖
                      </button>
                    )}
                  </div>

                  {hasError && (
                    <p id={`error-formato-${id}`} className={styles.errorMessage}>
                      Archivo supera los {MAX_FILE_SIZE_MB}MB
                    </p>
                  )}
                </div>
              );
            })}
        </div>
      )}



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
