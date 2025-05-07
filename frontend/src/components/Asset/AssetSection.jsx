import { useEffect, useState } from "react";
import { FaStar, FaRegClock } from "react-icons/fa";
import { getAllAssets } from "@/services/assets";
import AssetCarousel from "./AssetCarousel";
import styles from "./AssetSection.module.css";

// 🎯 Utilidad para obtener imagen válida
const getValidImage = (asset) => {
  if (!asset || !asset.imagenPrincipal || !asset.imagenPrincipal.url) return null;

  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const extension = asset.imagenPrincipal.url.split(".").pop().toLowerCase();

  if (formatosImagen.includes(extension)) {
    return asset.imagenPrincipal.url;
  }

  const primeraImagenGaleria = asset.galeriaMultimedia?.find(
    (item) => item.tipo === "image"
  );

  return primeraImagenGaleria ? primeraImagenGaleria.url : null;
};

const AssetSection = () => {
  const [assetsPopulares, setAssetsPopulares] = useState([]);
  const [assetsRecientes, setAssetsRecientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        // 🎯 Buscar todos los assets (puedes usar otra llamada si quieres más control)
        const allAssets = await getAllAssets(); // Vacío para traer todos
        // Separar por lógica: más vistos vs más recientes
        const recientes = [...allAssets].sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
        const populares = [...allAssets].sort((a, b) => (b.vistas || 0) - (a.vistas || 0));

        setAssetsRecientes(recientes.slice(0, 12)); // ✅ Limitar a 12 si quieres
        setAssetsPopulares(populares.slice(0, 12));
      } catch (error) {
        console.error("Error al cargar assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Cargando assets...</p>;
  }

  return (
    <section className={styles.assetSection} aria-label="Secciones destacadas de assets">
      <AssetCarousel
        title="Lo Más Popular"
        icon={<FaStar />}
        assets={assetsPopulares.map((asset) => ({
          image: getValidImage(asset),
          title: asset.titulo,
          id: asset._id,
          author: asset.autor,
          formats: asset.formatos?.map((f) => f.tipo) || [],
          category: asset.categorias?.[0] || "General",
        }))}
        className={styles.carouselBlock}
      />

      <AssetCarousel
        title="Lo Más Reciente"
        icon={<FaRegClock />}
        assets={assetsRecientes.map((asset) => ({
          image: getValidImage(asset),
          title: asset.titulo,
          id: asset._id,
          author: asset.autor,
          formats: asset.formatos?.map((f) => f.tipo) || [],
          category: asset.categorias?.[0] || "General",
        }))}
        className={styles.carouselBlock}
      />
    </section>
  );
};

export default AssetSection;
