import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { obtenerAssetsPorUsuario, eliminarAssetPorId } from "../../services/assetService";
import { getCategorias } from "../../services/categorias";
import AssetCard from "../Asset/AssetCard";
import styles from "./UserGallery.module.css";

const getValidImage = (asset) => {
  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  if (!asset?.imagenPrincipal) return null;

  const extension = asset.imagenPrincipal.url.split(".").pop().toLowerCase();
  if (formatosImagen.includes(extension)) return asset.imagenPrincipal.url;

  const primeraImagen = asset.galeriaMultimedia?.find((item) => item.tipo === "image");
  return primeraImagen?.url || null;
};

const UserGallery = () => {
  const { user } = useUser();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [orden, setOrden] = useState("recientes");
  const [paginaActual, setPaginaActual] = useState(1);
  const [categorias, setCategorias] = useState([]);
  const assetsPorPagina = 9;

  // Cargar categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Cargar assets del usuario
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        if (!user?._id) return;
        const data = await obtenerAssetsPorUsuario(user._id);
        setAssets(data);
      } catch (error) {
        console.error("Error al cargar los assets del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [user?._id]);

  const eliminarAsset = async (assetId) => {
    if (!window.confirm("¿Seguro que deseas eliminar este asset?")) return;
    try {
      setLoading(true);
      await eliminarAssetPorId(assetId);
      setAssets((prev) => prev.filter((asset) => asset._id !== assetId));
      alert("✅ Asset eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar asset:", error);
      alert("❌ Error al eliminar el asset.");
    } finally {
      setLoading(false);
    }
  };

  const assetsFiltrados = assets
    .filter((asset) =>
      asset.titulo.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter((asset) =>
      categoriaFiltro === "Todas" || asset.categorias?.includes(categoriaFiltro)
    )
    .sort((a, b) => {
      if (orden === "recientes") return new Date(b.createdAt) - new Date(a.createdAt);
      if (orden === "antiguos") return new Date(a.createdAt) - new Date(b.createdAt);
      if (orden === "a-z") return a.titulo.localeCompare(b.titulo);
      if (orden === "z-a") return b.titulo.localeCompare(a.titulo);
      return 0;
    });

  const totalPaginas = Math.ceil(assetsFiltrados.length / assetsPorPagina);
  const indiceInicio = (paginaActual - 1) * assetsPorPagina;
  const assetsPagina = assetsFiltrados.slice(indiceInicio, indiceInicio + assetsPorPagina);

  if (loading) {
    return <p className={styles.loading}>Cargando galería...</p>;
  }

  return (
    <div className={styles.galleryContainer}>
      <h2 className={styles.title}>Galería</h2>

      {/* Controles de filtrado */}
      <div className={styles.galleryControls}>
        <input
          type="text"
          placeholder="Buscar Asset..."
          className={styles.searchInput}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar asset"
        />

        <select
          className={styles.selectControl}
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        >
          <option value="Todas">Todas las Categorías</option>
          {categorias.map((cat) => (
            <option key={cat._id} value={cat.nombre}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <select
          className={styles.selectControl}
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
        >
          <option value="recientes">Más recientes</option>
          <option value="antiguos">Más antiguos</option>
          <option value="a-z">Nombre (A-Z)</option>
          <option value="z-a">Nombre (Z-A)</option>
        </select>
      </div>

      {/* Grid de assets */}
      {assetsPagina.length > 0 ? (
        <div className={styles.galleryGrid}>
          {assetsPagina.map((asset) => (
            <div key={asset._id} className={styles.assetWrapper}>
              <div className={styles.assetActions}>
                <button
                  className={styles.actionButton}
                  onClick={() => window.location.href = `/asset/${asset._id}`}
                  title="Ver"
                >
                  🔍
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => window.location.href = `/asset/${asset._id}/edit`}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  className={styles.actionButton}
                  onClick={() => eliminarAsset(asset._id)}
                  title="Eliminar"
                >
                  🗑️
                </button>
              </div>

              <AssetCard
                image={getValidImage(asset)}
                title={asset.titulo}
                id={asset._id}
                author={asset.autor}
                formats={asset.formatos.map((f) => f.tipo)}
                category={asset.categorias?.[0] || "General"}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.emptyText}>No se encontraron assets.</p>
      )}

      {/* Controles de paginación */}
      {totalPaginas > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
            className={styles.paginationButton}
          >
            Anterior
          </button>
          <span className={styles.paginationInfo}>
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
            className={styles.paginationButton}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default UserGallery;
