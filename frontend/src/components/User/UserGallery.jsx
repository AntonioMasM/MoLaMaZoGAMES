import { Link } from "react-router-dom";
import AssetCard from "../Asset/AssetCard"; // ✅ Import correcto
import styles from "./UserGallery.module.css";

// 🎯 Función utilitaria para obtener una imagen válida
const getValidImage = (asset) => {
  if (!asset || !asset.imagenPrincipal || !asset.imagenPrincipal.url) return null;

  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const extension = asset.imagenPrincipal.url.split(".").pop().toLowerCase();

  if (formatosImagen.includes(extension)) {
    return asset.imagenPrincipal.url;
  }

  const primeraImagen = asset.galeriaMultimedia?.find((item) => item.tipo === "image");
  return primeraImagen?.url || null;
};

const UserGallery = ({ assets }) => {
  if (!assets.length) {
    return (
      <section className={styles.emptyGallery}>
        <p>No se han encontrado assets.</p>
      </section>
    );
  }

  return (
    <section className={styles.gallery}>
      {assets.map((asset) => (
        <Link
          to={`/asset/${asset._id}`} // 🔥 URL de navegación correcta
          key={asset._id}
          className={styles.assetLink}
        >
          <AssetCard
            image={getValidImage(asset)}
            title={asset.titulo}
            id={asset._id}
            author={asset.autor}
            formats={asset.formatos?.map((f) => f.tipo) || []}
            category={asset.categorias?.[0] || "General"}
          />
        </Link>
      ))}
    </section>
  );
};

export default UserGallery;
