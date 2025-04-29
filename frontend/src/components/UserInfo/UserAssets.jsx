import AssetCard from "../Asset/AssetCard";
import styles from "./UserAssets.module.css";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";

const getValidImage = (asset) => {
  if (!asset || !asset.imagenPrincipal?.url) return null;

  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const url = asset.imagenPrincipal.url.toLowerCase();
  const extension = url.split(".").pop();

  if (formatosImagen.includes(extension)) return url;

  const galeria = asset.galeriaMultimedia || [];
  const alternativa = galeria.find((item) => item.tipo === "image");

  return alternativa?.url || null;
};

const UserAssets = ({ assets = [] }) => {
  const assetsRecientes = assets.slice(0, 3);
  const navigate = useNavigate();

  return (
    <section
      className={styles.container}
      aria-labelledby="user-assets-title"
      role="region"
    >
      <header className={styles.header}>
        <h3 id="user-assets-title" className="sr-only">Assets subidos</h3>

        <button
          type="button"
          className={styles.viewAll}
          onClick={() => navigate("/gallery")}
          aria-label="Ver todos los assets subidos"
        >
          Ver todos
        </button>
      </header>

      {assetsRecientes.length > 0 ? (
        <div className={styles.list} role="list">
          {assetsRecientes.map((asset) => (
            <AssetCard
              key={asset._id}
              image={getValidImage(asset)}
              title={asset.titulo}
              id={asset._id}
              author={asset.autor}
              formats={asset.formatos?.map((f) => f.tipo)}
              category={asset.categorias?.[0] || "General"}
            />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>
          <FaBoxOpen className={styles.emptyIcon} aria-hidden="true" />
          No has subido ningún asset aún.
        </p>
      )}
    </section>
  );
};

export default UserAssets;
