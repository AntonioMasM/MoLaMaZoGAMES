import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerAssetPorId, actualizarVistasAsset } from "@/services/assetService";
import LoadingScreen from "@/components/ui/LoadingScreen";
import AssetHeader from "@/components/asset/AssetHeader";
import AssetGallery from "@/components/asset/AssetGallery";
import AssetDetails from "@/components/asset/AssetDetails";
import AssetComments from "@/components/asset/AssetComments";
import styles from "@/styles/AssetView.module.css";

const AssetView = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const assetData = await obtenerAssetPorId(id);
        setAsset(assetData);

        // 🔥 Actualizar vistas del asset
        await actualizarVistasAsset(id);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el asset.");
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <main className={styles.container} role="main">
        <h1 className={styles.errorTitle}>Error</h1>
        <p className={styles.errorMessage}>{error}</p>
      </main>
    );
  }

  if (!asset) return null;

  return (
    <main className={styles.container} role="main">
      {/* 🔥 Cabecera del Asset */}
      <AssetHeader asset={asset} />

      <section className={styles.content}>
        {/* 📚 Columna Izquierda: Galería + Detalles */}
        <div className={styles.leftColumn}>
          {/* 🎨 Galería */}
          <section className={`${styles.section} ${styles.fadeIn}`} aria-labelledby="gallery-title" role="region">
            <h2 id="gallery-title" className={styles.sectionTitle}>Galería</h2>
            <AssetGallery galeria={asset.galeriaMultimedia} />
          </section>

          {/* 📜 Detalles del Asset */}
          <section className={`${styles.section} ${styles.fadeIn}`} aria-labelledby="details-title" role="region">
            <h2 id="details-title" className={styles.sectionTitle}>Detalles</h2>
            <AssetDetails asset={asset} />
          </section>
        </div>

        {/* 💬 Columna Derecha: Comentarios */}
        <div className={styles.rightColumn}>
          <section className={`${styles.section} ${styles.fadeIn}`} aria-labelledby="comments-title" role="region">
            <h2 id="comments-title" className={styles.sectionTitle}>Comentarios</h2>
            <AssetComments assetId={asset._id} />
          </section>
        </div>
      </section>
    </main>
  );
};

export default AssetView;
