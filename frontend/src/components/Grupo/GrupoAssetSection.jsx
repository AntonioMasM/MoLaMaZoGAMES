import { FaLayerGroup } from "react-icons/fa";
import GrupoAssetCarousel from "./GrupoAssetCarousel";
import styles from "../Asset/AssetSection.module.css";

// Utilidad para asegurar imagen válida
const getValidImage = (asset) => {
  if (!asset || !asset.imagenPrincipal?.url) return null;

  const extensionesValidas = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const ext = asset.imagenPrincipal.url.split(".").pop().toLowerCase();

  if (extensionesValidas.includes(ext)) return asset.imagenPrincipal.url;

  const primeraGaleria = asset.galeriaMultimedia?.find((item) => item.tipo === "image");
  return primeraGaleria?.url || null;
};

const GrupoAssetSection = ({ grupos = [] }) => {
  if (!grupos.length) return null;

  return (
    <section className={styles.assetSection} aria-label="Assets por Grupo de Trabajo">
      {grupos.map((grupo) => (
        <GrupoAssetCarousel
          key={grupo._id}
          title={grupo.titulo}
          icon={<FaLayerGroup />}
          assets={(grupo.assets || []).map((asset) => ({
            id: asset._id,
            title: asset.titulo,
            image: getValidImage(asset),
            formats: asset.formatos?.map((f) => f.tipo) || [],
            author: asset.autor,
            category: asset.categorias?.[0] || "General",
          }))}
          className={styles.carouselBlock}
        />
      ))}
    </section>
  );
};

export default GrupoAssetSection;
