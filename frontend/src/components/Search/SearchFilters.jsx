import styles from "./SearchFilters.module.css";

const SearchFilters = ({ tipoSeleccionado, onFiltroChange }) => {
  const filtros = ["Todos", "Assets", "Usuarios", "Categorías"];

  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>Filtrar por</h2>
      <ul className={styles.filterList}>
        {filtros.map((filtro) => {
          const isActive = tipoSeleccionado === filtro;
          return (
            <li key={filtro}>
              <button
                type="button"
                className={`${styles.filterButton} ${isActive ? styles.active : ""}`}
                onClick={() => onFiltroChange(filtro)}
                aria-pressed={isActive} // 🎯 Accesibilidad extra
              >
                {filtro}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchFilters;
