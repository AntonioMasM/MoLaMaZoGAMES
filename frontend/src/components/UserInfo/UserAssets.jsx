import AssetCard from "../Asset/AssetCard";
import styles from "./UserAssets.module.css";

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
            image={asset.imagenPrincipal}
            title={asset.titulo}
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
