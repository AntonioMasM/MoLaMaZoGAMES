import { useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./AssetDetails.module.css";

// 🎨 Icono genérico para archivos descargables
const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    width="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M5 20h14v-2H5v2zm7-18L5.33 9h3.34v6h4.66V9h3.34L12 2z" />
  </svg>
);

const AssetDetails = ({ asset }) => {
  if (!asset) return null;

  const { descripcion, categorias, formatos } = asset;

  const formatSize = (sizeInBytes) => {
    if (sizeInBytes >= 1000000) {
      return `${(sizeInBytes / 1000000).toFixed(1)} MB`;
    } else if (sizeInBytes >= 1000) {
      return `${(sizeInBytes / 1000).toFixed(1)} KB`;
    } else {
      return `${sizeInBytes} B`;
    }
  };

  // 🔥 Ordenamos formatos de menor a mayor tamaño
  const formatosOrdenados = useMemo(() => {
    if (!formatos) return [];
    return [...formatos].sort((a, b) => a.tamaño - b.tamaño);
  }, [formatos]);

  // 🚫 Eliminar categorías duplicadas (case-insensitive)
  const categoriasUnicas = useMemo(() => {
    if (!categorias) return [];
    const seen = new Set();
    return categorias.filter((cat) => {
      const normalized = cat.trim().toLowerCase();
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    });
  }, [categorias]);

  return (
    <section className={styles.detailsSection} aria-labelledby="asset-details">
      {/* 📜 Descripción */}
      <article className={styles.detailsBlock}>
        <h2 id="asset-details" className={styles.sectionTitle}>Descripción</h2>
        <p className={styles.description}>{descripcion}</p>
      </article>

      {/* 🏷️ Categorías */}
      {categoriasUnicas.length > 0 && (
        <article className={styles.detailsBlock}>
          <h3 className={styles.subTitle}>Categorías</h3>
          <ul className={styles.categoryList}>
            {categoriasUnicas.map((categoria, index) => (
              <li key={index} className={styles.categoryItem}>
                <Link
                  to={`/categories/${encodeURIComponent(categoria)}`}
                  className={styles.categoryBadge}
                  title={`Ver categoría ${categoria}`}
                  aria-label={`Ir a categoría ${categoria}`}
                >
                  #{categoria}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      )}

      {/* 📥 Formatos de descarga */}
      {formatosOrdenados.length > 0 && (
        <article className={styles.detailsBlock}>
          <h3 className={styles.subTitle}>Formatos disponibles</h3>
          <ul className={styles.formatList}>
            {formatosOrdenados.map((formato, index) => (
              <li key={index} className={styles.formatItem}>
                <a
                  href={formato.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className={styles.downloadLink}
                >
                  <DownloadIcon />
                  <span>{formato.tipo}</span>
                  <span className={styles.sizeBadge}>({formatSize(formato.tamaño)})</span>
                </a>
              </li>
            ))}
          </ul>
        </article>
      )}
    </section>
  );
};

export default AssetDetails;
