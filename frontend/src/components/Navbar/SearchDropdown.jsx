import { Link } from "react-router-dom";
import styles from "./SearchDropdown.module.css";
import { useSearch } from "../../hooks/useSearch";
import React from "react";

const getValidImage = (asset) => {
  if (!asset?.imagenPrincipal?.url) return null;

  const ext = asset.imagenPrincipal.url.split(".").pop().toLowerCase();
  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];

  if (formatosImagen.includes(ext)) return asset.imagenPrincipal.url;

  return asset.galeriaMultimedia?.find((item) => item.tipo === "image")?.url || null;
};

const SearchDropdown = ({ query, visible = false, onClose }) => {
  const trimmedQuery = query.trim();
  const showDropdown = visible && trimmedQuery.length > 0;

  const { assets, usuarios, categorias, loading, error } = useSearch(trimmedQuery);

  const hasResults = assets.length > 0 || usuarios.length > 0 || categorias.length > 0;

  if (!showDropdown) return null;

  return (
    <div
      className={styles.dropdown}
      role="listbox"
      aria-label="Resultados de búsqueda"
      aria-live="polite"
    >
      {loading && <div className={styles.loading}>Buscando...</div>}

      {!loading && hasResults && (
        <>
          {assets.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Assets</div>
              {assets.slice(0, 5).map((asset) => {
                const image = getValidImage(asset);
                return (
                  <Link
                    key={asset._id}
                    to={`/asset/${asset._id}`}
                    className={styles.item}
                    onClick={onClose}
                    role="option"
                  >
                    {image && (
                      <img
                        src={image}
                        alt={asset.titulo}
                        className={styles.thumbnail}
                        loading="lazy"
                      />
                    )}
                    <span>{asset.titulo}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {usuarios.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Usuarios</div>
              {usuarios.slice(0, 5).map((user) => (
                <Link
                  key={user._id}
                  to={`/user/${user.email}`}
                  className={styles.item}
                  onClick={onClose}
                  role="option"
                >
                  <img
                    src={user.fotoPerfil?.secure_url || "/assets/users/default-avatar.png"}
                    alt={user.nickname}
                    className={styles.thumbnail}
                    loading="lazy"
                  />
                  <span>{user.nickname}</span>
                </Link>
              ))}
            </div>
          )}

          {categorias.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Categorías</div>
              {categorias.slice(0, 5).map((cat) => (
                <Link
                  key={cat._id}
                  to={`/categories/${encodeURIComponent(cat.nombre)}`}
                  className={styles.item}
                  onClick={onClose}
                  role="option"
                >
                  <span>{cat.nombre}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {!loading && !hasResults && !error && (
        <div className={styles.noResults}>No se encontraron resultados</div>
      )}

      {error && (
        <div className={styles.noResults}>❌ Error al buscar resultados</div>
      )}
    </div>
  );
};

export default React.memo(SearchDropdown);
