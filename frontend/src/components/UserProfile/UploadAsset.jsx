import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import styles from "./UploadAsset.module.css";

const UploadAsset = () => {
  const handleUploadClick = () => {
    alert("Funcionalidad de subida en desarrollo.");
    // Aquí podrías disparar un input[type=file] real
  };

  return (
    <section
      className={styles.uploadAsset}
      aria-label="Subida de assets"
      role="region"
    >
      <h3 className={styles.title}>Subir Asset</h3>

      <div
        className={styles.uploadBox}
        onClick={handleUploadClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleUploadClick()}
        aria-label="Haz clic o pulsa Enter para subir un archivo"
        aria-describedby="upload-desc"
      >
        <FaCloudUploadAlt className={styles.icon} aria-hidden="true" />
        <p className={styles.text}>Haz clic o pulsa Enter</p>
      </div>

      <p id="upload-desc" className={styles.instructions}>
        Funcionalidad aún en desarrollo. Muy pronto podrás subir archivos aquí.
      </p>
    </section>
  );
};

export default UploadAsset;
