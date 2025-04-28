// hooks/useAssets.js
import { useState } from "react";
import {
  createAssetInDB,
  obtenerAssetsPorUsuario,
  eliminarAssetPorId,
  obtenerAssetPorId,
  buscarAssets,
  actualizarVistasAsset,
  actualizarAssetPorId,
} from "../services/assetService";

export const useAssets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* 🎯 Crear un asset */
  const crearAsset = async (assetData) => {
    setLoading(true);
    setError(null);
    try {
      const nuevoAsset = await createAssetInDB(assetData);
      setAssets((prev) => [nuevoAsset.asset, ...prev]); // Insertar al principio
      return nuevoAsset;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* 🎯 Cargar assets de un usuario */
  const cargarAssetsDeUsuario = async (usuarioId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await obtenerAssetsPorUsuario(usuarioId);
      setAssets(data);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /* 🎯 Eliminar un asset */
  const eliminarAsset = async (assetId) => {
    setLoading(true);
    setError(null);
    try {
      await eliminarAssetPorId(assetId);
      setAssets((prev) => prev.filter((asset) => asset._id !== assetId));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* 🎯 Buscar assets */
  const buscar = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const resultados = await buscarAssets(query);
      return resultados;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* 🎯 Actualizar vistas */
  const incrementarVistas = async (assetId) => {
    try {
      await actualizarVistasAsset(assetId);
    } catch (err) {
      console.error("Error actualizando vistas:", err);
    }
  };

  /* 🎯 Actualizar asset */
  const actualizarAsset = async (assetId, assetDataActualizado) => {
    setLoading(true);
    setError(null);
    try {
      const data = await actualizarAssetPorId(assetId, assetDataActualizado);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    assets,
    loading,
    error,
    crearAsset,
    cargarAssetsDeUsuario,
    eliminarAsset,
    buscar,
    incrementarVistas,
    actualizarAsset,
  };
};