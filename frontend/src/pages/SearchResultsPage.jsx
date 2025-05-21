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
  const ordenInicial = searchParams.get("orden") || "relevancia";

  const [query, setQuery] = useState(queryInicial);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(tipoInicial);
  const [filtrosAvanzados, setFiltrosAvanzados] = useState(filtrosIniciales);
  const [ordenGlobal, setOrdenGlobal] = useState(ordenInicial);

  const { assets, usuarios, categorias, loading, error } = useSearch(
    query,
    tipoSeleccionado,
    filtrosAvanzados,
    ordenGlobal 
  );

  // ✅ Sincroniza estado con URL al cambiar filtros o tipo
  useEffect(() => {
    const newParams = buildQueryParamsFromFiltros(
      query,
      tipoSeleccionado,
      filtrosAvanzados,
      ordenGlobal
    );
    navigate(`/search?${newParams.toString()}`, { replace: true });
  }, [query, tipoSeleccionado, filtrosAvanzados, ordenGlobal, navigate]);

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

  const tiposMostrados =
    tipoSeleccionado === "Todos"
      ? Object.keys(resultados)
      : [tipoSeleccionado];

  // 🔀 Función de ordenación
  const ordenarResultados = (items) => {
    return [...items].sort((a, b) => {
      const getNombre = (item) =>
        item.titulo || item.nombre || item.nickname || "";

      if (ordenGlobal === "az") {
        return getNombre(a).localeCompare(getNombre(b));
      } else if (ordenGlobal === "za") {
        return getNombre(b).localeCompare(getNombre(a));
      } else if (ordenGlobal === "fecha_nueva") {
        return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
      } else if (ordenGlobal === "fecha_antigua") {
        return new Date(a.fechaCreacion) - new Date(b.fechaCreacion);
      }
      return 0; // "relevancia" o desconocido
    });
  };

  return (
    <div className={styles.searchPage}>
      <aside className={styles.sidebar} aria-label="Filtros de búsqueda">
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

      <main className={styles.results} role="main">
        <h1 className={styles.pageTitle}>Resultados de búsqueda</h1>

        <div className={styles.orderControls}>
          <label htmlFor="orden-select" className={styles.orderLabel}>
            Ordenar por:
          </label>
          <select
            id="orden-select"
            className={styles.orderSelect}
            value={ordenGlobal}
            onChange={(e) => setOrdenGlobal(e.target.value)}
            aria-label="Seleccionar orden de resultados"
          >
            <option value="relevancia">Relevancia</option>
            <option value="az">Nombre A–Z</option>
            <option value="za">Nombre Z–A</option>
            <option value="fecha_nueva">Más recientes</option>
            <option value="fecha_antigua">Más antiguos</option>
          </select>
        </div>

        {loading && (
          <div className={styles.loading} role="status" aria-live="polite">
            Buscando...
          </div>
        )}

        {error && (
          <div className={styles.error} role="alert">
            Error en la búsqueda
          </div>
        )}

        {!loading &&
          !error &&
          tiposMostrados.map((tipo) =>
            resultados[tipo]?.length > 0 ? (
              <section
                key={tipo}
                className={styles.section}
                aria-labelledby={`resultados-${tipo.toLowerCase()}`}
              >
                <h2
                  className={styles.sectionTitle}
                  id={`resultados-${tipo.toLowerCase()}`}
                >
                  {tipo}
                </h2>
                <div className={styles.grid} role="list">
                  {ordenarResultados(resultados[tipo]).map((item) => (
                    <SearchResultItem
                      key={item._id}
                      item={item}
                      role="listitem"
                    />
                  ))}
                </div>
              </section>
            ) : null
          )}

        {!loading &&
          !error &&
          tiposMostrados.every((tipo) => resultados[tipo]?.length === 0) && (
            <div className={styles.noResults} role="alert">
              No se encontraron resultados
            </div>
          )}
      </main>
    </div>
  );
};

export default SearchPage;
