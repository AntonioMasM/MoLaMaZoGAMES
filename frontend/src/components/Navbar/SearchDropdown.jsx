// components/Navbar/SearchDropdown.jsx
import { Link } from "react-router-dom";
import styles from "./SearchDropdown.module.css"; 
import { useSearch } from "../../hooks/useSearch";

// Utilidad para validar imagen
const getValidImage = (asset) => {
  if (!asset || !asset.imagenPrincipal || !asset.imagenPrincipal.url) return null;

  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const urlPrincipal = asset.imagenPrincipal.url;

  const extension = urlPrincipal.split(".").pop().toLowerCase();

  if (formatosImagen.includes(extension)) {
    return urlPrincipal;
  }

  const primeraImagenGaleria = asset.galeriaMultimedia?.find(
    (item) => item.tipo === "image"
  );

  return primeraImagenGaleria ? primeraImagenGaleria.url : null;
};

const SearchDropdown = ({ query, onClose }) => {
  const { assets, usuarios, categorias, loading, error } = useSearch(query);

  if (!query.trim()) return null;
  if (loading) return <div className={styles.dropdown}>Buscando...</div>;
  

  const hasResults = assets.length > 0 || usuarios.length > 0 || categorias.length > 0;

  return (
    <div className={styles.dropdown}>
      {hasResults ? (
        <>
          {assets.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Assets</div>
              {assets.map((asset) => {
                const validImage = getValidImage(asset);
                return (
                  <Link
                    key={asset._id}
                    to={`/asset/${asset._id}`}
                    className={styles.item}
                    onClick={onClose}
                  >
                    {validImage && (
                      <img
                        src={validImage}
                        alt={asset.titulo}
                        className={styles.thumbnail}
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
              {usuarios.map((user) => (
                <Link
                  key={user._id}
                  to={`/user/${user.email}`}
                  className={styles.item}
                  onClick={onClose}
                >
                  <img
                    src={user.fotoPerfil?.secure_url || "/assets/users/default-avatar.png"}
                    alt={user.nickname}
                    className={styles.thumbnail}
                  />
                  <span>{user.nickname}</span>
                </Link>
              ))}
            </div>
          )}

          {categorias.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Categorías</div>
              {categorias.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/categories/${encodeURIComponent(cat.nombre)}`} 
                  className={styles.item}
                  onClick={onClose}
                >
                  <span>{cat.nombre}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className={styles.noResults}>No se encontraron resultados</div>
      )}
    </div>
  );
};

export default SearchDropdown;
