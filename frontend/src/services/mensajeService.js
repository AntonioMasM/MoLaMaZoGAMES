import axios from "axios";

const API_URL = "http://localhost:5000/api/mensajes";

// Crear un nuevo mensaje
export const crearMensaje = async (mensajeData) => {
  const response = await axios.post(`${API_URL}`, mensajeData);
  return response.data;
};

// Obtener todos los mensajes
export const obtenerMensajes = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Obtener un mensaje por ID
export const obtenerMensajePorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Actualizar un mensaje (por ejemplo, editar contenido)
export const actualizarMensaje = async (id, contenido) => {
  const response = await axios.put(`${API_URL}/${id}`, { contenido });
  return response.data;
};

// Eliminar un mensaje
export const eliminarMensaje = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Marcar mensaje como leído
export const marcarMensajeComoLeido = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/leido`);
  return response.data;
};

// Buscar mensajes por contenido (query string)
export const buscarMensajes = async (query) => {
  const response = await axios.get(`${API_URL}/buscar/contenido`, {
    params: { query }
  });
  return response.data;
};

// Obtener mensajes enviados por un usuario
export const obtenerMensajesPorRemitente = async (remitenteId) => {
  const response = await axios.get(`${API_URL}/remitente/${remitenteId}`);
  return response.data;
};

// Obtener mensajes recibidos por un usuario
export const obtenerMensajesPorDestinatario = async (destinatarioId) => {
  const response = await axios.get(`${API_URL}/destinatario/${destinatarioId}`);
  return response.data;
};
