import { useEffect, useState } from "react";
import CategoriaAssetCarousel from "./CategoriaAssetCarousel";
import { getAllAssets } from "@/services/assets";
import { FaTag } from "react-icons/fa";
import styles from "../Asset/AssetSection.module.css";

// Utilidad para obtener imagen válida
const getValidImage = (asset) => {
  if (!asset || !asset.imagenPrincipal?.url) return null;

  const extensiones = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const ext = asset.imagenPrincipal.url.split(".").pop().toLowerCase();

  if (extensiones.includes(ext)) return asset.imagenPrincipal.url;

  const primeraImagenGaleria = asset.galeriaMultimedia?.find((item) => item.tipo === "image");
  return primeraImagenGaleria?.url || null;
};

const CategoriaAssetSection = ({ categoriasSeguidas = [] }) => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const allAssets = await getAllAssets();
        setAssets(allAssets);
      } catch (error) {
        console.error("Error al obtener assets:", error);
      }
    };

    fetchAssets();
  }, []);

  if (!categoriasSeguidas.length) return null;

  return (
    <section className={styles.assetSection} aria-label="Assets por Categorías Seguidas">
      {categoriasSeguidas.map((categoria) => {
        const assetsCategoria = assets.filter((asset) =>
          asset.categorias?.includes(categoria.nombre)
        );

        if (!assetsCategoria.length) return null;

        return (
          <CategoriaAssetCarousel
            key={categoria._id}
            title={categoria.nombre}
            icon={<FaTag />}
            assets={assetsCategoria.map((asset) => ({
              id: asset._id,
              title: asset.titulo,
              image: getValidImage(asset),
              formats: asset.formatos?.map((f) => f.tipo) || [],
              author: asset.autor,
              category: categoria.nombre,
            }))}
            className={styles.carouselBlock}
          />
        );
      })}
    </section>
  );
};

export default CategoriaAssetSection;
