import { useState } from "react";
import {
  seguirCategoria,
  dejarCategoria,
  getCategoriasSeguidas,
} from "../services/userService";

export const useCategoriasSeguidas = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener categorías seguidas por un usuario (por ID)
  const cargarCategoriasSeguidas = async (idUsuario) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategoriasSeguidas(idUsuario);
      setCategorias(data);
    } catch (err) {
      setError(
        err.response?.data?.mensaje || "Error al cargar categorías seguidas"
      );
    } finally {
      setLoading(false);
    }
  };

  // Seguir una categoría
  const seguir = async (idUsuario, idCategoria) => {
    setLoading(true);
    setError(null);
    try {
      const data = await seguirCategoria(idUsuario, idCategoria);
      setCategorias((prev) => [...prev, { _id: idCategoria }]);
      return data;
    } catch (err) {
      setError(
        err.response?.data?.mensaje || "Error al seguir la categoría"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Dejar de seguir una categoría
  const dejar = async (idUsuario, idCategoria) => {
    setLoading(true);
    setError(null);
    try {
      const data = await dejarCategoria(idUsuario, idCategoria);
      setCategorias((prev) => prev.filter((cat) => cat._id !== idCategoria));
      return data;
    } catch (err) {
      setError(
        err.response?.data?.mensaje || "Error al dejar de seguir la categoría"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Verificar si una categoría ya está seguida
  const estaSiguiendo = (idCategoria) =>
    categorias.some((cat) => cat._id === idCategoria);

  return {
    categorias,
    loading,
    error,
    cargarCategoriasSeguidas,
    seguir,
    dejar,
    estaSiguiendo,
  };
};
