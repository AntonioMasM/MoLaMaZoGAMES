import React from "react";
import { useUploadAsset } from "../hooks/useUploadAsset";
import AssetForm from "../components/UploadAsset/AssetForm";
import UploadZone from "../components/UploadAsset/UploadZone";
import GalleryUploader from "../components/UploadAsset/GalleryUploader";
import FormatUploader from "../components/UploadAsset/FormatUploader";
import GroupSelector from "../components/UploadAsset/GroupSelector";

import styles from "../styles/UploadAsset.module.css";

const UploadAsset = () => {
  const {
    formData,
    status,
    errors,
    refs,
    handleInputChange,
    handleToggleOption,
    handleAddFormato,
    handleFormatoFileChange,
    handleFormatoRemove,
    handleFileDrop,
    handleGalleryChange,
    handleGroupChange,
    handleSubmitAsset, // 🎯 Nuevo
  } = useUploadAsset();

  return (
    <form
      className={styles.assetUploader}
      onSubmit={handleSubmitAsset} // 🎯 Cambio aquí
      role="form"
      aria-label="Formulario de subida de asset"
      noValidate
    >
      <div className={styles.leftColumn}>
        <AssetForm
          formData={formData}
          errors={errors}
          refs={refs}
          onChange={handleInputChange}
          onToggleOption={handleToggleOption}
        />

        <GalleryUploader
          galeriaMultimedia={formData.galeriaMultimedia}
          onGalleryChange={handleGalleryChange}
        />
      </div>

      <div className={styles.rightColumn}>
        <UploadZone
          preview={formData.imagenPrincipal}
          error={errors.imagenPrincipal}
          inputRef={refs.imagenRef}
          onFileSelect={handleFileDrop}
        />

        <FormatUploader
          formatos={formData.formatos}
          error={errors.formatos}
          inputRef={refs.formatosRef}
          onAddFormato={handleAddFormato}
          onFormatoFileChange={handleFormatoFileChange}
          onFormatoRemove={handleFormatoRemove}
        />

        <GroupSelector
          grupos={[]} // ⚡ (todavía pendiente conectar grupos reales)
          selectedGroup={formData.grupo}
          onChange={handleGroupChange}
        />
      </div>

      <button
        type="submit"
        className={styles.publishButton}
        disabled={status.loading}
        aria-busy={status.loading}
      >
        {status.loading ? "Subiendo..." : "Publicar Asset"}
      </button>

      {status.mensaje && (
        <p className={`${styles.message} ${styles.success}`} role="status">
          ✅ {status.mensaje}
        </p>
      )}

      {status.error && (
        <p className={`${styles.message} ${styles.error}`} role="alert">
          ❌ {status.error}
        </p>
      )}
    </form>
  );
};

export default UploadAsset;
