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
      file: null,
      tipo: "",
      tamaño: 0,
      url: "",
      public_id: ""
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
              const { id, file, url } = formato;
              const hasError = file && (file.size / 1024 / 1024) > MAX_FILE_SIZE_MB;
              const fileName = file?.name || url?.split("/").pop() || "Sin archivo";
              const fileSize = file?.size
                ? formatFileSize(file.size)
                : formato.tamaño
                ? formatFileSize(formato.tamaño * 1024 * 1024)
                : "-";

              return (
                <div
                  key={id}
                  className={`${styles.formatoItem} ${deletingId === id ? styles.fadeOut : styles.bounceIn} ${hasError ? styles.errorFormato : ""}`}
                >
                  <div className={styles.fileIcon}>
                    {getFileIcon(file?.name || url)}
                  </div>

                  <div className={styles.fileName}>
                    {truncateFileName(fileName)}
                  </div>

                  <div className={styles.fileSize}>
                    {fileSize}
                  </div>

                  <div className={styles.fileActions}>
                    {(file || url) && (
                      <button
                        type="button"
                        className={styles.deleteFileButton}
                        aria-label={`Eliminar archivo ${fileName}`}
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
