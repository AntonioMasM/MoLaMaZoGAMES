import { useEffect, useState } from "react";
import { getCategorias } from "../services/categorias";
import { obtenerTodosLosAssets } from "../services/assetService";
import AssetCard from "../components/Asset/AssetCard";
import styles from "../styles/CategoriesPage.module.css"; // ⚡ CSS ya creado

// 🎯 Función para validar qué imagen usar
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

const CategoriesPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriasYAssets = async () => {
      try {
        const [categoriasData, assetsData] = await Promise.all([
          getCategorias(),
          obtenerTodosLosAssets(),
        ]);
        setCategorias(categoriasData);
        setAssets(assetsData);
      } catch (err) {
        console.error("Error cargando categorías o assets:", err);
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriasYAssets();
  }, []);

  const getAssetsByCategoria = (categoriaNombre) => {
    return assets.filter((asset) => asset.categorias?.includes(categoriaNombre));
  };

  if (loading) {
    return <div className={styles.loading}>Cargando categorías...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.categoriesPage}>
      <h1 className={styles.pageTitle}>Explora por Categorías</h1>

      {categorias.map((categoria) => {
        const assetsDeCategoria = getAssetsByCategoria(categoria.nombre);

        if (assetsDeCategoria.length === 0) {
          return null; // No mostrar categorías vacías
        }

        return (
          <section key={categoria._id} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{categoria.nombre}</h2>

            <div className={styles.assetsGrid}>
              {assetsDeCategoria.map((asset) => (
                <AssetCard
                  key={asset._id}
                  image={getValidImage(asset) || "/assets/main.webp"} // ✅ Ahora correctamente
                  title={asset.titulo}
                  id={asset._id}
                  author={asset.autor}
                  formats={asset.formatos?.map((f) => f.tipo) || []}
                  category={asset.categorias?.[0] || "General"}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CategoriesPage;
