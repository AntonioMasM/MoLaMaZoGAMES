import axios from "axios";

const API_URL = "http://localhost:5000/api/notificaciones";

// Helper para manejar errores de Axios de manera limpia
const handleError = (error) => {
  console.error("Error en notificationsService:", error);
  return { data: null, error: error.response?.data?.message || error.message || "Error desconocido" };
};

// Obtener todas las notificaciones de un usuario
export const getNotificacionesUsuario = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/${usuarioId}`);
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error);
  }
};

// Obtener detalle de una notificación
export const getNotificacionPorId = async (notificacionId) => {
  try {
    const response = await axios.get(`${API_URL}/detalle/${notificacionId}`);
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error);
  }
};

// Marcar una notificación como leída
export const marcarNotificacionLeida = async (notificacionId) => {
  try {
    const response = await axios.patch(`${API_URL}/${notificacionId}/leido`);
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error);
  }
};

// Marcar todas las notificaciones de un usuario como leídas
export const marcarTodasNotificacionesLeidas = async (usuarioId) => {
  try {
    const response = await axios.patch(`${API_URL}/${usuarioId}/marcar-todas`);
    return { data: response.data, error: null };
  } catch (error) {
    return handleError(error);
  }
};
