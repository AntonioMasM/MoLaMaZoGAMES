import axios from "axios";

const API_URL = "http://localhost:5000/api/assets"; // Ajusta si tienes variable de entorno

/* 🎯 Crear un nuevo asset */
export const createAssetInDB = async (assetData) => {
  try {
    const { data } = await axios.post(API_URL, assetData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error("Error creando el Asset:", error);
    throw error.response?.data || error.message || "Error desconocido al crear asset";
  }
};

export const obtenerTodosLosAssets = async () => {
  try {
    const { data } = await axios.get(API_URL); // 🔥 Aquí SIN parámetros
    return data; // Devuelve directamente todos los assets
  } catch (error) {
    console.error("Error al obtener todos los assets:", error);
    throw error.response?.data || error.message || "Error desconocido al obtener assets";
  }
};

/* 🎯 Obtener assets subidos por un usuario concreto */
export const obtenerAssetsPorUsuario = async (usuarioId) => {
  try {
    const { data } = await axios.get(`${API_URL}/usuario/${usuarioId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener los assets del usuario:", error);
    throw error.response?.data || error.message || "Error desconocido al obtener assets";
  }
};

/* 🎯 Eliminar un asset por su ID (y sus archivos de Cloudinary) */
export const eliminarAssetPorId = async (assetId) => {
  try {
    const { data } = await axios.delete(`${API_URL}/${assetId}`);
    return data; // Devolvemos el mensaje de éxito por si quieres mostrarlo
  } catch (error) {
    console.error("Error al eliminar el asset:", error);
    throw error.response?.data || error.message || "Error desconocido al eliminar asset";
  }
};

/* 🎯 Obtener un asset por ID */
export const obtenerAssetPorId = async (assetId) => {
  try {
    const { data } = await axios.get(`${API_URL}/${assetId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener asset por ID:", error);
    throw error.response?.data || error.message || "Error desconocido al obtener asset";
  }
};

/* 🎯 Buscar assets */
export const buscarAssets = async (query) => {
  try {
    const { data } = await axios.get(`${API_URL}/buscar?q=${encodeURIComponent(query)}`);
    return data.resultados; // 🔥 Según tu controller, los resultados vienen así
  } catch (error) {
    console.error("Error al buscar assets:", error);
    throw error.response?.data || error.message || "Error desconocido al buscar assets";
  }
};

/* 🎯 Actualizar vistas de un asset */
export const actualizarVistasAsset = async (assetId) => {
  try {
    const { data } = await axios.put(`${API_URL}/${assetId}/vistas`);
    return data;
  } catch (error) {
    console.error("Error al actualizar vistas del asset:", error);
    throw error.response?.data || error.message || "Error desconocido al actualizar vistas";
  }
};

/* 🧩 (Opcional) Actualizar un asset completo */
export const actualizarAssetPorId = async (assetId, assetDataActualizado) => {
  try {
    const { data } = await axios.put(`${API_URL}/${assetId}`, assetDataActualizado, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error("Error al actualizar el asset:", error);
    throw error.response?.data || error.message || "Error desconocido al actualizar asset";
  }
};

export const obtenerAssetsPorCategoria = async (categoriaId) => {
  try {
    const { data } = await axios.get(`${API_URL}/categoria/${categoriaId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener assets por categoría:", error);
    throw error.response?.data || error.message || "Error desconocido al obtener assets por categoría";
  }
};

/* 🎯 Obtener assets por nombre de categoría */
export const obtenerAssetsPorNombreCategoria = async (nombreCategoria) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/assets/categoria/nombre/${encodeURIComponent(nombreCategoria)}`);
    return data;
  } catch (error) {
    console.error("Error al obtener assets por nombre de categoría:", error);
    throw error.response?.data || error.message || "Error desconocido al obtener assets por categoría";
  }
};
