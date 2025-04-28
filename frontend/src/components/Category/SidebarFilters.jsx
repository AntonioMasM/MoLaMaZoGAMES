// src/components/Category/SidebarFilters.jsx
import styles from "./SidebarFilters.module.css";

const SidebarFilters = ({
  formatoFiltro,
  setFormatoFiltro,
  ordenFiltro,
  setOrdenFiltro,
  busqueda,
  setBusqueda,
}) => {
  return (
    <aside className={styles.sidebar} aria-label="Filtros de búsqueda">
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Buscar</h2>
        <input
          type="text"
          placeholder="Buscar assets..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.input}
          aria-label="Buscar assets"
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Formato</h2>
        <select
          value={formatoFiltro}
          onChange={(e) => setFormatoFiltro(e.target.value)}
          className={styles.select}
          aria-label="Filtrar por formato"
        >
          <option value="">Todos</option>
          <option value="obj">OBJ</option>
          <option value="fbx">FBX</option>
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="glb">GLB</option>
        </select>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Ordenar por</h2>
        <select
          value={ordenFiltro}
          onChange={(e) => setOrdenFiltro(e.target.value)}
          className={styles.select}
          aria-label="Ordenar resultados"
        >
          <option value="reciente">Más reciente</option>
          <option value="descargados">Más descargado</option>
        </select>
      </div>
    </aside>
  );
};

export default SidebarFilters;
