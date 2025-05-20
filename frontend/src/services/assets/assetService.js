import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/assets`;

/* 🎯 Crear un nuevo asset */
export const createAsset = async (assetData) => {
  const { data } = await axios.post(API_URL, assetData, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

/* 📥 Obtener todos los assets */
export const getAllAssets = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

/* 📥 Obtener assets subidos por un usuario concreto */
export const getAssetsByUser = async (userId) => {
  const { data } = await axios.get(`${API_URL}/usuario/${userId}`);
  return data;
};

/* 📥 Obtener un asset por ID */
export const getAssetById = async (assetId) => {
  const { data } = await axios.get(`${API_URL}/${assetId}`);
  return data;
};

/* 📥 Obtener assets por categoría */
export const getAssetsByCategoryId = async (categoryId) => {
  const { data } = await axios.get(`${API_URL}/categoria/${categoryId}`);
  return data;
};

export const getAssetsByCategoryName = async (categoryName) => {
  const { data } = await axios.get(`${API_URL}/categoria/nombre/${encodeURIComponent(categoryName)}`);
  return data;
};

/* 🔍 Buscar assets */
export const searchAssets = async (query) => {
    try {
      const { data } = await axios.get(`${API_URL}/buscar?q=${encodeURIComponent(query)}`);
      return data.resultados;
    } catch (error) {
      console.error("Error al buscar assets:", error);
      throw error.response?.data || error.message || "Error desconocido al buscar assets";
    }
  };
  
/* 🔄 Actualizar vistas */
export const incrementViews = async (assetId) => {
  const { data } = await axios.put(`${API_URL}/${assetId}/vistas`);
  return data;
};

/* ✏️ Actualizar asset */
export const updateAsset = async (assetId, updatedData) => {
  const { data } = await axios.put(`http://localhost:5000/api/assets/${assetId}`, updatedData, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

/* ❌ Eliminar asset */
export const deleteAsset = async (assetId) => {
  const { data } = await axios.delete(`${API_URL}/${assetId}`);
  return data;
};
