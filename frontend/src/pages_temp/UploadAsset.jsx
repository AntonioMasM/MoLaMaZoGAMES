import React, { useEffect, useState } from "react";
import { useUploadAsset } from "../hooks/useUploadAsset";
import { getGruposPorUsuario } from "../services/grupoService"; // 👈 importar
import { useUser } from "../context/UserContext"; // 👈 importar

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
    handleSubmitAsset,
  } = useUploadAsset();

  const { user: sessionUser } = useUser(); // 👈 coger el usuario logueado
  const [userGroups, setUserGroups] = useState([]); // 👈 nuevo estado

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        if (!sessionUser?._id) return;

        const grupos = await getGruposPorUsuario(sessionUser._id);
        setUserGroups(grupos);
      } catch (error) {
        console.error("Error al cargar grupos del usuario:", error);
      }
    };

    fetchGrupos();
  }, [sessionUser?._id]);

  return (
    <form
      className={styles.assetUploader}
      onSubmit={handleSubmitAsset}
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
          grupos={userGroups} // 👈 ahora sí pasamos grupos REALES
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
