import { Link } from "react-router-dom";
import AssetCard from "../Asset/AssetCard";
import styles from "./UserGallery.module.css";

// 🎯 Función utilitaria para obtener una imagen válida
const getValidImage = (asset) => {
  const imageUrl = asset?.imagenPrincipal?.url;
  if (!imageUrl) return null;

  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const extension = imageUrl.split(".").pop()?.toLowerCase();

  if (formatosImagen.includes(extension)) {
    return imageUrl;
  }

  return asset.galeriaMultimedia?.find((item) => item.tipo === "image")?.url || null;
};

const UserGallery = ({ assets = [] }) => {
  if (!assets.length) {
    return (
      <section className={styles.emptyGallery} role="region" aria-label="Galería vacía">
        <p>No se han encontrado assets.</p>
      </section>
    );
  }

  return (
    <section className={styles.gallery} role="region" aria-label="Galería de assets del usuario">
      {assets.map((asset) => {
        const { _id, titulo = "Sin título", autor, formatos = [], categorias = [] } = asset;
        const image = getValidImage(asset);
        const category = categorias[0] || "General";

        return (
          <Link
            to={`/asset/${_id}`}
            key={_id}
            className={styles.assetLink}
            aria-label={`Ver asset: ${titulo}`}
          >
            <AssetCard
              image={image}
              title={titulo}
              id={_id}
              author={autor}
              formats={formatos.map(f => f.tipo)}
              category={category}
            />
          </Link>
        );
      })}
    </section>
  );
};

export default UserGallery;
