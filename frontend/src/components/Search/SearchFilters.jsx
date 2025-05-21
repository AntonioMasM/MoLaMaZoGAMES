import styles from "./SearchFilters.module.css";

const FILTROS = ["Todos", "Assets", "Usuarios", "Categorías"];

const SearchFilters = ({ tipoSeleccionado, onFiltroChange }) => {
  return (
    <fieldset
      className={styles.filters}
      role="radiogroup"
      aria-labelledby="filtro-tipo-label"
    >
      <legend id="filtro-tipo-label" className={styles.title}>
        Filtrar por
      </legend>
      <div className={styles.filterList}>
        {FILTROS.map((filtro) => {
          const isActive = tipoSeleccionado === filtro;

          return (
            <button
              key={filtro}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-pressed={isActive}
              className={`${styles.filterButton} ${isActive ? styles.active : ""}`}
              onClick={() => onFiltroChange(filtro)}
              tabIndex={0}
            >
              {filtro}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default SearchFilters;
