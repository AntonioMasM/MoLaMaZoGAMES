import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAssetById,
  updateAsset,
} from "@/services/assets/assetService";
import LoadingScreen from "@/components/ui/LoadingScreen";
import AssetEditForm from "@/components/Asset/AssetEditForm";
import EditableGallery from "@/components/Asset/EditableGallery";
import styles from "@/styles/AssetEdit.module.css";
import uploadImageToCloudinary from "@/services/uploadImageToCloudinary";

const AssetEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Estado del formulario y galería
  const [formData, setFormData] = useState(null);
  const [media, setMedia] = useState([]); // [{ url, tipo, isNew }]
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const assetData = await getAssetById(id);
        setAsset(assetData);
  
        const categorias = assetData.categorias || [];
        const principal = categorias[0] || "";
  
        setFormData({
          titulo: assetData.titulo,
          descripcion: assetData.descripcion,
          categoriaPrincipal: principal,
          licencia: assetData.licencia || "",
          otrasCategorias: categorias.filter((cat) => cat !== principal),
          opciones: assetData.opciones || {},
        });
  
        setMedia(assetData.galeriaMultimedia || []);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el asset.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAsset();
  }, [id]);
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleOption = (key) => {
    setFormData((prev) => ({
      ...prev,
      opciones: {
        ...prev.opciones,
        [key]: !prev.opciones[key],
      },
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
  
      // 1. Subir nuevos archivos
      const nuevasImagenesSubidas = await Promise.all(
        newFiles.map(async (file) => {
          const subida = await uploadImageToCloudinary(file); // asegúrate que devuelve { secure_url }
          return {
            url: subida.secure_url,
            tipo: file.type.startsWith("image/") ? "image"
                 : file.type.startsWith("video/") ? "video"
                 : "otro"
          };
        })
      );
  
      // 2. Combinar con galería anterior
      const galeriaFinal = [
        ...media.filter((item) => !item.isNew).map(({ url, tipo }) => ({ url, tipo })),
        ...nuevasImagenesSubidas
      ];
  
      // 3. Construir y enviar datos
      const updatedData = {
        ...formData,
        galeriaMultimedia: galeriaFinal,
      };
  
      await updateAsset(id, updatedData);
      navigate(`/asset/${id}`);
    } catch (err) {
      console.error("Error al guardar:", err);
      setError("No se pudo guardar el asset.");
    } finally {
      setSaving(false);
    }
  };
  

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
    <main className={styles.container} role="main">
      <h1 className={styles.pageTitle}>Editar Asset</h1>
      <section className={styles.content}>
        {/* 📝 Formulario de edición */}
        <div className={styles.leftColumn}>
          <AssetEditForm
            formData={formData}
            onChange={handleFormChange}
            onToggleOption={handleToggleOption}
            onSubmit={handleSave}
            saving={saving}
          />
        </div>

        {/* 🖼️ Galería editable */}
        <div className={styles.rightColumn}>
          <section
            className={styles.section}
            aria-labelledby="gallery-title"
            role="region"
          >
            <h2 id="gallery-title" className={styles.sectionTitle}>Galería multimedia</h2>
            <EditableGallery
              initialItems={media}
              onChange={({ updatedItems, newFiles }) => {
                setMedia(updatedItems);
                setNewFiles(newFiles);
              }}
            />
          </section>
        </div>
      </section>
    </main>
  );
};

export default AssetEdit;
