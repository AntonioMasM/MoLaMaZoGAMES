import React from "react";
import { useEditAsset } from "@/hooks/useEditAsset";
import LoadingScreen from "@/components/ui/LoadingScreen";
import AssetForm from "@/components/UploadAsset/AssetForm";
import GalleryUploader from "@/components/UploadAsset/GalleryUploader";
import FormatUploader from "@/components/UploadAsset/FormatUploader";
import GroupSelector from "@/components/UploadAsset/GroupSelector";
import UploadZone from "@/components/UploadAsset/UploadZone";

import styles from "@/styles/AssetEdit.module.css";




const AssetEdit = () => {
  const {
    loading,
    saving,
    error,
    formData,
    status,
    refs,
    media,
    userGroups,
    handleFormChange,
    handleToggleOption,
    handleGroupChange,
    handleAddFormato,
    handleFormatoFileChange,
    handleFormatoRemove,
    handleGalleryChange,
    handleSave,
    handleAddFormatoDesdeZone,
    handleMainImageChange,
  } = useEditAsset();

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <main className={styles.container}>
        <h1 className={styles.errorTitle}>Error</h1>
        <p className={styles.errorMessage}>{error}</p>
      </main>
    );
  }

  return (
    <form
      className={styles.assetEditor}
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      role="form"
      aria-label="Formulario de edición de asset"
      noValidate
    >
      <div className={styles.leftColumn}>
        <AssetForm
          formData={formData}
          errors={status.errors || {}}
          refs={refs}
          onChange={handleFormChange}
          onToggleOption={handleToggleOption}
        />

        <GalleryUploader
          galeriaMultimedia={media}
          onGalleryChange={handleGalleryChange}
        />
      </div>

      <div className={styles.rightColumn}>

<UploadZone
  key={formData.imagenPrincipal?.name || formData.imagenPrincipal?.url || "placeholder"}
  onFileSelect={(file) => {
    handleMainImageChange(file);
    handleAddFormatoDesdeZone(file);
  }}
  preview={
    typeof formData.imagenPrincipal === "string"
      ? formData.imagenPrincipal
      : formData.imagenPrincipal?.url || ""
  }
  inputRef={refs.imagenRef}
/>



        <FormatUploader
          formatos={formData.formatos || []}
          error={status.errors?.formatos || ""}
          inputRef={refs.formatosRef}
          onAddFormato={handleAddFormato}
          onFormatoFileChange={handleFormatoFileChange}
          onFormatoRemove={handleFormatoRemove}
        />

        <GroupSelector
          grupos={userGroups}
          selectedGroup={formData.grupo || ""}
          onChange={handleGroupChange}
          inputRef={refs.grupoRef}
          error={status.errors?.grupo || ""}
        />

        <button
          type="submit"
          className={styles.saveButton}
          disabled={saving}
          aria-busy={saving}
        >
          {saving ? "Guardando..." : "Guardar Cambios"}
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
      </div>
    </form>
  );
};

export default AssetEdit;
