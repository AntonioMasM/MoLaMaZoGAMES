import { useState } from "react";
import {
  obtenerFavoritos,
  agregarAFavoritos,
  eliminarFavorito
} from "../services/favoritosService";

export const useFavoritos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔵 Obtener todos los favoritos
  const obtenerTodosFavoritos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await obtenerFavoritos();
      return response;
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al obtener favoritos");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Agregar asset a favoritos
  const agregarAssetAFavoritos = async (assetId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await agregarAFavoritos(assetId);
      return response;
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al agregar a favoritos");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Eliminar favorito
  const eliminarFavoritoPorId = async (favoritoId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await eliminarFavorito(favoritoId);
      return response;
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al eliminar favorito");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    obtenerTodosFavoritos,
    agregarAssetAFavoritos,
    eliminarFavoritoPorId,
    loading,
    error,
  };
};
