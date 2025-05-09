import { useState, useEffect, useRef } from "react";
import { searchAssets, getAllAssets } from "@/services/assets";
import { buscarUsuarios, getAllUsuarios } from "@/services/userService";
import { getCategorias } from "@/services/categorias";
import debounce from "lodash/debounce";

export const useSearch = (query, tipoSeleccionado = "Todos", filtros = {}) => {
  const [assets, setAssets] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [allCategorias, setAllCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceRef = useRef();

  // Cargar todas las categorías una sola vez
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

  useEffect(() => {
    const [doAssets, doUsuarios, doCategorias] = [
      tipoSeleccionado === "Todos" || tipoSeleccionado === "Assets",
      tipoSeleccionado === "Todos" || tipoSeleccionado === "Usuarios",
      tipoSeleccionado === "Todos" || tipoSeleccionado === "Categorías",
    ];

    // === BÚSQUEDA VACÍA ===
    if (!query.trim()) {
      const fetchAll = async () => {
        setLoading(true);
        setError(null);
        try {
          if (doAssets) {
            let results = await getAllAssets();

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

            setAssets(results);
          }

          if (doUsuarios) {
            let users = await getAllUsuarios();

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

            setUsuarios(users);
          }

          if (doCategorias) {
            let cats = allCategorias;

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

            setCategorias(cats);
          }
        } catch (err) {
          console.error("Error al obtener todo:", err);
          setError("Error en búsqueda");
        } finally {
          setLoading(false);
        }
      };

      fetchAll();
      return;
    }

    // === BÚSQUEDA CON QUERY ===
    if (!debounceRef.current) {
      debounceRef.current = debounce(async (queryValue) => {
        setLoading(true);
        setError(null);
        try {
          if (doAssets) {
            let results = await searchAssets(queryValue);

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

            setAssets(results);
          }

          if (doUsuarios) {
            let users = await buscarUsuarios(queryValue);

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

            setUsuarios(users);
          }

          if (doCategorias) {
            let cats = allCategorias.filter(cat =>
              cat.nombre.toLowerCase().includes(queryValue.toLowerCase())
            );

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

            setCategorias(cats);
          }
        } catch (err) {
          console.error("Error en búsqueda:", err);
          setError("Error en búsqueda");
        } finally {
          setLoading(false);
        }
      }, 300);
    }

    debounceRef.current(query);

    return () => {
      debounceRef.current.cancel();
    };
  }, [query, tipoSeleccionado, filtros, allCategorias]);

  return {
    assets,
    usuarios,
    categorias,
    loading,
    error,
  };
};
