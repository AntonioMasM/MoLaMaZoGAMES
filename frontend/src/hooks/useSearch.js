// src/hooks/useSearch.js
import { useState, useEffect } from "react";
import { searchAssets } from "@/services/assets"; // ✅ Actualizado
import { buscarUsuarios } from "@/services/userService";
import { getCategorias } from "@/services/categorias";
import debounce from "lodash/debounce";

export const useSearch = (query) => {
  const [assets, setAssets] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [allCategorias, setAllCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todas las categorías solo una vez
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
    if (!query || query.trim() === "") {
      setAssets([]);
      setUsuarios([]);
      setCategorias([]);
      return;
    }

    const fetchResults = debounce(async () => {
      setLoading(true);
      setError(null);
      try {
        const [assetsResults, usuariosResults] = await Promise.all([
          searchAssets(query),
          buscarUsuarios(query),
        ]);

        const categoriasResults = allCategorias.filter((categoria) =>
          categoria.nombre.toLowerCase().includes(query.toLowerCase())
        );

        setAssets(assetsResults);
        setUsuarios(usuariosResults);
        setCategorias(categoriasResults);
      } catch (err) {
        console.error(err);
        setError("Error en búsqueda");
      } finally {
        setLoading(false);
      }
    }, 300);

    fetchResults();
    return () => fetchResults.cancel();
  }, [query, allCategorias]);

  return {
    assets,
    usuarios,
    categorias,
    loading,
    error,
  };
};
