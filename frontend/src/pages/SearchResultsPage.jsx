import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import SearchFilters from "../components/Search/SearchFilters";
import FiltrosAvanzados from "../components/Search/FiltrosAvanzados";
import SearchResultItem from "../components/Search/SearchResultItem";
import styles from "../styles/SearchResultsPage.module.css";
import {
  buildQueryParamsFromFiltros,
  parseFiltrosFromQueryParams,
} from "@/utils/filtroUtils";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryInicial = searchParams.get("q") || "";
  const tipoInicial = searchParams.get("tipo") || "Todos";
  const filtrosIniciales = parseFiltrosFromQueryParams(searchParams);

  const [query, setQuery] = useState(queryInicial);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(tipoInicial);
  const [filtrosAvanzados, setFiltrosAvanzados] = useState(filtrosIniciales);

  const { assets, usuarios, categorias, loading, error } = useSearch(query, tipoSeleccionado, filtrosAvanzados);

  // ✅ Sincroniza estado con URL al cambiar filtros o tipo
  useEffect(() => {
    const newParams = buildQueryParamsFromFiltros(query, tipoSeleccionado, filtrosAvanzados);
    navigate(`/search?${newParams.toString()}`, { replace: true });
  }, [query, tipoSeleccionado, filtrosAvanzados, navigate]);

  const handleFiltroChange = (nuevoTipo) => {
    setTipoSeleccionado(nuevoTipo);
    setFiltrosAvanzados({}); // reset filtros al cambiar de tipo
  };

  const handleFiltrosAvanzadosChange = (nuevosFiltros) => {
    setFiltrosAvanzados(nuevosFiltros);
  };

  const resultados = {
    Assets: assets,
    Usuarios: usuarios,
    Categorías: categorias,
  };

  const tiposMostrados = tipoSeleccionado === "Todos"
    ? Object.keys(resultados)
    : [tipoSeleccionado];

  return (
    <div className={styles.searchPage}>
      <aside className={styles.sidebar}>
        <SearchFilters
          tipoSeleccionado={tipoSeleccionado}
          onFiltroChange={handleFiltroChange}
        />
        {tipoSeleccionado !== "Todos" && (
          <FiltrosAvanzados
            tipo={tipoSeleccionado}
            filtros={filtrosAvanzados}
            onChange={handleFiltrosAvanzadosChange}
          />
        )}
      </aside>

      <main className={styles.results}>
        {loading && <div className={styles.loading}>Buscando...</div>}
        {error && <div className={styles.error}>Error en la búsqueda</div>}

        {!loading && !error &&
          tiposMostrados.map((tipo) =>
            resultados[tipo]?.length > 0 ? (
              <section key={tipo} className={styles.section}>
                <h2 className={styles.sectionTitle}>{tipo}</h2>
                <div className={styles.grid}>
                  {resultados[tipo].map((item) => (
                    <SearchResultItem key={item._id} item={item} />
                  ))}
                </div>
              </section>
            ) : null
          )}

        {!loading && !error &&
          tiposMostrados.every((tipo) => resultados[tipo]?.length === 0) && (
            <div className={styles.noResults}>No se encontraron resultados</div>
          )}
      </main>
    </div>
  );
};

export default SearchPage;
