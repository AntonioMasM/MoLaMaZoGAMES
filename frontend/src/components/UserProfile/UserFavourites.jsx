import React, { useEffect, useState } from "react";
import { useFavoritos } from "@/hooks/useFavoritos";
import AssetCard from "../Asset/AssetCard";
import styles from "./UserFavourites.module.css";

// Función para obtener una imagen válida del asset
const getValidImage = (asset) => {
  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  if (!asset?.imagenPrincipal) return null;

  const extension = asset.imagenPrincipal.url.split(".").pop().toLowerCase();
  if (formatosImagen.includes(extension)) return asset.imagenPrincipal.url;

  const primeraImagen = asset.galeriaMultimedia?.find((item) => item.tipo === "image");
  return primeraImagen?.url || null;
};

const UserFavourites = () => {
  const { obtenerTodosFavoritos, loading, error } = useFavoritos();
  const [favoritos, setFavoritos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const favoritosData = await obtenerTodosFavoritos();
        setFavoritos(favoritosData.favoritos || []);
      } catch (err) {
        console.error("Error al cargar favoritos:", err);
      }
    };

    fetchFavoritos();
  }, []);

  // 🔍 Filtros aplicados
  const favoritosFiltrados = favoritos
    .filter((fav) =>
      fav.asset.titulo.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter((fav) =>
      categoriaFiltro === "Todas" || fav.asset.categorias?.includes(categoriaFiltro)
    );

  if (loading) {
    return (
      <div className={styles.loading} role="status" aria-live="polite">
        <p>Cargando favoritos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error} role="alert">
        <p>{error}</p>
      </div>
    );
  }

  if (favoritos.length === 0) {
    return (
      <div className={styles.emptyState} role="region" aria-label="No hay favoritos">
        <p>No tienes assets marcados como favoritos todavía.</p>
      </div>
    );
  }

  return (
    <div className={styles.favouritesWrapper}>
      
      {/* 🎯 Barra de filtros */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar asset favorito..."
          className={styles.searchInput}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar asset favorito"
        />

        <select
          className={styles.selectControl}
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          aria-label="Filtrar por categoría"
        >
          <option value="Todas">Todas las categorías</option>
          <option value="Entorno">Entorno</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
          <option value="Personaje">Personaje</option>
          {/* Puedes mapear dinámicamente si quieres más adelante */}
        </select>
      </div>

      {/* 🎨 Grid de favoritos */}
      <div className={styles.favouritesGrid} role="list" aria-label="Lista de favoritos">
        {favoritosFiltrados.length > 0 ? (
          favoritosFiltrados.map((fav, index) => (
            <div
              key={fav.asset._id}
              className={styles.fadeIn}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <AssetCard
                id={fav.asset._id}
                image={getValidImage(fav.asset)}
                title={fav.asset.titulo}
                author={fav.asset.autor}
                formats={fav.asset.formatos?.map(f => f.tipo)}
                category={fav.asset.categorias?.[0] || "General"}
              />
            </div>
          ))
        ) : (
          <p className={styles.emptyText}>No se encontraron favoritos con esos filtros.</p>
        )}
      </div>
    </div>
  );
};

export default UserFavourites;
