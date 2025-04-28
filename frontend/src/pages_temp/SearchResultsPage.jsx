import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import SearchFilters from "../components/Search/SearchFilters";
import SearchResultItem from "../components/Search/SearchResultItem";
import styles from "../styles/SearchResultsPage.module.css"; // Estilos separados

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { assets, usuarios, categorias, loading, error } = useSearch(query);

  const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos");

  const handleFiltroChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  const shouldShow = (tipo) => tipoSeleccionado === "Todos" || tipoSeleccionado === tipo;

  return (
    <div className={styles.searchPage}>
      <aside className={styles.sidebar}>
        <SearchFilters
          tipoSeleccionado={tipoSeleccionado}
          onFiltroChange={handleFiltroChange}
        />
      </aside>

      <main className={styles.results}>
        {loading && <div className={styles.loading}>Buscando...</div>}
        {error && <div className={styles.error}>Ocurrió un error: {error}</div>}

        {!loading && !error && (
          <>
            {shouldShow("Assets") && assets.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Assets</h2>
                <div className={styles.grid}>
                  {assets.map((asset) => (
                    <SearchResultItem key={asset._id} item={asset} />
                  ))}
                </div>
              </section>
            )}

            {shouldShow("Usuarios") && usuarios.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Usuarios</h2>
                <div className={styles.grid}>
                  {usuarios.map((user) => (
                    <SearchResultItem key={user._id} item={user} />
                  ))}
                </div>
              </section>
            )}

            {shouldShow("Categorías") && categorias.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Categorías</h2>
                <div className={styles.grid}>
                  {categorias.map((cat) => (
                    <SearchResultItem key={cat._id} item={cat} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {!loading && !error && assets.length === 0 && usuarios.length === 0 && categorias.length === 0 && (
          <div className={styles.noResults}>No se encontraron resultados</div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
