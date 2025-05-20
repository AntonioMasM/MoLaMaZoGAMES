// src/services/comentarioLikeService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("⚠️ VITE_API_URL no está definido en el entorno.");
}

const API_URL = `${BASE_URL}/comentarios`;
// 🎯 Dar like a un comentario
export const darLikeComentario = async (comentarioId, usuarioId) => {
  try {
    const { data } = await axios.put(`${API_URL}/${comentarioId}/like`, {
      usuarioId, // 🔥 Aquí enviamos usuarioId en el body
    });
    return data;
  } catch (error) {
    console.error("Error al dar like al comentario:", error);
    throw error.response?.data || error.message || "Error desconocido al dar like";
  }
};

// 🎯 Quitar like de un comentario
export const quitarLikeComentario = async (comentarioId, usuarioId) => {
  try {
    const { data } = await axios.put(`${API_URL}/${comentarioId}/unlike`, {
      usuarioId, // 🔥 También aquí
    });
    return data;
  } catch (error) {
    console.error("Error al quitar like del comentario:", error);
    throw error.response?.data || error.message || "Error desconocido al quitar like";
  }
};
