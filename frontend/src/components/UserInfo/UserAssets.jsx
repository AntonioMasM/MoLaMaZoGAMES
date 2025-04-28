import AssetCard from "../Asset/AssetCard";
import styles from "./UserAssets.module.css";

// 🎯 Función para decidir qué imagen mostrar
const getValidImage = (asset) => {
  if (!asset || !asset.imagenPrincipal || !asset.imagenPrincipal.url) return null;

  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const urlPrincipal = asset.imagenPrincipal.url;

  const extension = urlPrincipal.split(".").pop().toLowerCase();

  if (formatosImagen.includes(extension)) {
    return urlPrincipal; // ✅ Imagen principal válida
  }

  const primeraImagenGaleria = asset.galeriaMultimedia?.find(
    (item) => item.tipo === "image"
  );

  return primeraImagenGaleria ? primeraImagenGaleria.url : null;
};

const UserAssets = ({ assets = [] }) => (
  <section className={styles.assetsBox} aria-labelledby="titulo-assets">
    <header className={styles.assetsHeader}>
      <h3 id="titulo-assets" className={styles.sectionTitle}>
        Tus últimos Assets
      </h3>
      <button
        className={styles.viewAll}
        onClick={() => alert("Redirigir a sección de todos los assets")}
      >
        Ver Todos
      </button>
    </header>

    {assets.length > 0 ? (
      <div className={styles.assetsList}>
        {assets.slice(0, 3).map((asset) => (
          <AssetCard
            key={asset._id}
            image={getValidImage(asset)}
            title={asset.titulo}
            id={asset._id}
            author={asset.autor}
            formats={asset.formatos.map((f) => f.tipo)}
            category={asset.categorias[0] || "General"}
          />
        ))}
      </div>
    ) : (
      <p className={styles.emptyText}>No has subido ningún asset aún.</p>
    )}
  </section>
);

export default UserAssets;
