// src/pages/CategoryPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerAssetsPorNombreCategoria } from "../services/assetService"; 
import SidebarFilters from "../components/Category/SidebarFilters"; 
import AssetCard from "../components/Asset/AssetCard"; 
import styles from "../styles/CategoryPage.module.css";

// 🎯 Función para decidir qué imagen mostrar
const getValidImage = (asset) => {
  if (!asset || !asset.imagenPrincipal || !asset.imagenPrincipal.url) return null;

  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"]; // ✅ Solo imágenes válidas
  const extension = asset.imagenPrincipal.url.split(".").pop().toLowerCase();

  if (formatosImagen.includes(extension)) {
    return asset.imagenPrincipal.url;
  }

  const primeraImagenGaleria = asset.galeriaMultimedia?.find(
    (item) => item.tipo === "image"
  );

  return primeraImagenGaleria ? primeraImagenGaleria.url : null;
};


const CategoryPage = () => {
  const { nombreCategoria } = useParams();
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [formatoFiltro, setFormatoFiltro] = useState("");
  const [ordenFiltro, setOrdenFiltro] = useState("reciente");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      setError(null);
      try {
        const assetsData = await obtenerAssetsPorNombreCategoria(nombreCategoria);
        setAssets(assetsData);
        setFilteredAssets(assetsData);
      } catch (err) {
        console.error("Error al cargar assets de la categoría:", err);
        setError("Error al cargar assets.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [nombreCategoria]);

  useEffect(() => {
    let resultado = [...assets];

    if (formatoFiltro) {
      resultado = resultado.filter((asset) =>
        asset.formatos?.some(f => f.tipo === formatoFiltro)
      );
    }

    if (busqueda.trim()) {
      resultado = resultado.filter((asset) =>
        asset.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        asset.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (ordenFiltro === "descargados") {
      resultado.sort((a, b) => b.numeroDescargas - a.numeroDescargas);
    } else if (ordenFiltro === "reciente") {
      resultado.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredAssets(resultado);
  }, [formatoFiltro, ordenFiltro, busqueda, assets]);

  return (
    <div className={styles.container}>
      {/* Sidebar con filtros */}
      <SidebarFilters
        formatoFiltro={formatoFiltro}
        setFormatoFiltro={setFormatoFiltro}
        ordenFiltro={ordenFiltro}
        setOrdenFiltro={setOrdenFiltro}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      {/* Contenido principal */}
      <div className={styles.content}>
        {/* Título de la categoría */}
        <h1 className={styles.categoryTitle}>
          {decodeURIComponent(nombreCategoria)}
        </h1>

        {/* Subtítulo con número de resultados */}
        {!loading && !error && (
          <p className={styles.resultCount}>
            {filteredAssets.length} {filteredAssets.length === 1 ? "asset encontrado" : "assets encontrados"}
          </p>
        )}

        {/* Sección de assets */}
        {error ? (
          <p className={styles.errorText}>{error}</p>
        ) : loading ? (
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
            <p>Cargando assets...</p>
          </div>
        ) : filteredAssets.length > 0 ? (
          <div className={styles.assetsGrid}>
            {filteredAssets.map((asset) => (
              <AssetCard
                key={asset._id}
                id={asset._id}
                image={getValidImage(asset)}
                title={asset.titulo}
                author={asset.autor}
                formats={asset.formatos?.map(f => f.tipo)}
                category={asset.categorias?.[0] || "General"}
              />
            ))}
          </div>
        ) : (
          <p className={styles.noResults}>No se encontraron assets para esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
