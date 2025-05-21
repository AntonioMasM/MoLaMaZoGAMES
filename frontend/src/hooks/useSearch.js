import { useState, useEffect, useRef } from "react";
import { searchAssets, getAllAssets } from "@/services/assets";
import { buscarUsuarios, getAllUsuarios } from "@/services/userService";
import { getCategorias } from "@/services/categorias";

export const useSearch = (query = "", tipoSeleccionado = "Todos", filtros = {}) => {
  const [assets, setAssets] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [allCategorias, setAllCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lastQueryRef = useRef("");
  const hasFetchedInitially = useRef(false);

  // ✅ Cargar categorías una vez
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await getCategorias();
        setAllCategorias(categoriasData);
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      }
    };
    fetchCategorias();
  }, []);

  // 🔍 Buscar
  useEffect(() => {
    const [doAssets, doUsuarios, doCategorias] = [
      tipoSeleccionado === "Todos" || tipoSeleccionado === "Assets",
      tipoSeleccionado === "Todos" || tipoSeleccionado === "Usuarios",
      tipoSeleccionado === "Todos" || tipoSeleccionado === "Categorías",
    ];

    if (!allCategorias.length && tipoSeleccionado === "Categorías") return;

    const queryTrimmed = query.trim();

    // ❌ Si el query no cambió, no volver a buscar
if (lastQueryRef.current === queryTrimmed && tipoSeleccionado === "Todos") {
  const filtrosVacios = Object.keys(filtros).length === 0;
  const yaHayDatos = assets.length || usuarios.length || categorias.length;
  if (filtrosVacios && yaHayDatos) return;
}

lastQueryRef.current = queryTrimmed;


    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!queryTrimmed) {
          // 🔄 Buscar todo si no hay query
          if (doAssets) {
            let results = await getAllAssets();
            results = applyAssetFilters(results, filtros);
            setAssets(results);
          }

          if (doUsuarios) {
            let users = await getAllUsuarios();
            users = applyUserFilters(users, filtros);
            setUsuarios(users);
          }

          if (doCategorias) {
            let cats = applyCategoryFilters(allCategorias, filtros);
            setCategorias(cats);
          }
        } else {
          // 🔍 Buscar por query
          if (doAssets) {
            let results = await searchAssets(queryTrimmed);
            results = applyAssetFilters(results, filtros);
            setAssets(results);
          }

          if (doUsuarios) {
            let users = await buscarUsuarios(queryTrimmed);
            users = applyUserFilters(users, filtros);
            setUsuarios(users);
          }

          if (doCategorias) {
            let cats = allCategorias.filter(cat =>
              cat.nombre.toLowerCase().includes(queryTrimmed.toLowerCase())
            );
            cats = applyCategoryFilters(cats, filtros);
            setCategorias(cats);
          }
        }
      } catch (err) {
        console.error("Error en búsqueda:", err);
        setError("Error en búsqueda");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, tipoSeleccionado, filtros, allCategorias]);

  return {
    assets,
    usuarios,
    categorias,
    loading,
    error,
  };
};

// ✅ Funciones auxiliares limpias y reutilizables
function applyAssetFilters(results, filtros) {
  if (filtros.categorias?.length) {
    results = results.filter(asset =>
      asset.categorias?.some(cat => filtros.categorias.includes(cat))
    );
  }

  if (filtros.formatos?.length) {
    results = results.filter(asset =>
      asset.formatos?.some(f => filtros.formatos.includes(f.tipo))
    );
  }

  if (filtros.disponible) {
    results = results.filter(asset => asset.disponible);
  }

  if (filtros.orden === "vistas_desc") {
    results.sort((a, b) => b.vistas - a.vistas);
  } else if (filtros.orden === "vistas_asc") {
    results.sort((a, b) => a.vistas - b.vistas);
  } else if (filtros.orden === "fecha_desc") {
    results.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
  } else if (filtros.orden === "fecha_asc") {
    results.sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion));
  }

  return results;
}

function applyUserFilters(users, filtros) {
  if (filtros.pais) {
    users = users.filter(u =>
      u.ubicacion?.pais?.toLowerCase().includes(filtros.pais.toLowerCase())
    );
  }

  if (filtros.software?.length) {
    users = users.filter(u =>
      u.software?.some(sw => filtros.software.includes(sw))
    );
  }

  if (filtros.cargo) {
    users = users.filter(u =>
      u.cargo?.toLowerCase() === filtros.cargo.toLowerCase()
    );
  }

  return users;
}

function applyCategoryFilters(cats, filtros) {
  if (filtros.nombre) {
    cats = cats.filter(cat =>
      cat.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
    );
  }

  if (filtros.fechaDesde) {
    cats = cats.filter(cat =>
      new Date(cat.fechaCreacion) >= new Date(filtros.fechaDesde)
    );
  }

  if (filtros.fechaHasta) {
    cats = cats.filter(cat =>
      new Date(cat.fechaCreacion) <= new Date(filtros.fechaHasta)
    );
  }

  return cats;
}
