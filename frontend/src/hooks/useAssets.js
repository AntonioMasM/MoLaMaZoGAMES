// hooks/useAssets.js
import { useState } from "react";
import {
  createAsset,
  getAssetsByUser,
  deleteAsset,
  getAssetById,
  searchAssets,
  incrementViews,
  updateAsset
} from "@/services/assets";

export const useAssets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (assetData) => {
    setLoading(true);
    setError(null);
    try {
      const nuevoAsset = await createAsset(assetData);
      setAssets((prev) => [nuevoAsset.asset, ...prev]);
      return nuevoAsset;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loadByUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAssetsByUser(userId);
      setAssets(data);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (assetId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAsset(assetId);
      setAssets((prev) => prev.filter((asset) => asset._id !== assetId));
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const search = async (query) => {
    setLoading(true);
    setError(null);
    try {
      return await searchAssets(query);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const increaseViews = async (assetId) => {
    try {
      await incrementViews(assetId);
    } catch (err) {
      console.error("Error actualizando vistas:", err);
    }
  };

  const update = async (assetId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      return await updateAsset(assetId, updatedData);
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
    create,
    loadByUser,
    remove,
    search,
    increaseViews,
    update,
  };
};
