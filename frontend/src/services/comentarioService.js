import axios from "axios";

// Base URL del backend para comentarios
const API_URL = "http://localhost:5000/api/comentarios";

// 🎯 Obtener todos los comentarios de un asset específico
export const obtenerComentariosPorAsset = async (assetId) => {
  try {
    const { data } = await axios.get(`${API_URL}/asset/${assetId}`);
    return data.comentarios;
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    throw error.response?.data || error.message || "Error desconocido al obtener comentarios";
  }
};

// 🎯 Crear un nuevo comentario para un asset
export const crearComentario = async (usuarioId, assetId, contenido) => {
    try {
      const { data } = await axios.post(
        API_URL,
        { usuario: usuarioId, assetId, contenido }, // 🔥 Ahora mandamos también usuario
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return data; // Retorna la respuesta del backend (mensaje, comentario creado)
    } catch (error) {
      console.error("Error al crear el comentario:", error);
      throw error.response?.data || error.message || "Error desconocido al crear comentario";
    }
  };
