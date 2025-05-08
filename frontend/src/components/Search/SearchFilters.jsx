import styles from "./SearchFilters.module.css";

const FILTROS = ["Todos", "Assets", "Usuarios", "Categorías"];

const SearchFilters = ({ tipoSeleccionado, onFiltroChange }) => {
  return (
    <div className={styles.filters} role="radiogroup" aria-label="Filtrar por tipo de resultado">
      <h2 className={styles.title}>Filtrar por</h2>
      <div className={styles.filterList}>
        {FILTROS.map((filtro) => {
          const isActive = tipoSeleccionado === filtro;
          return (
            <button
              key={filtro}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={`${styles.filterButton} ${isActive ? styles.active : ""}`}
              onClick={() => onFiltroChange(filtro)}
            >
              {filtro}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchFilters;
