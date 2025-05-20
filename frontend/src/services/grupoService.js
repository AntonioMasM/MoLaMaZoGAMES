import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("⚠️ VITE_API_URL no está definido en el entorno.");
}

const API_URL = `${BASE_URL}/grupos`;
// Crear un nuevo grupo
export const crearGrupo = async (grupoData) => {
  const response = await axios.post(`${API_URL}`, grupoData);
  return response.data;
};

// Obtener un grupo por ID
export const obtenerGrupoPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Actualizar un grupo
export const actualizarGrupo = async (id, grupoData) => {
  const response = await axios.put(`${API_URL}/${id}`, grupoData);
  return response.data;
};

// Eliminar un grupo
export const eliminarGrupo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Invitar usuario al grupo
export const invitarUsuarioAlGrupo = async (grupoId, usuarioId) => {
  const response = await axios.post(`${API_URL}/invitar`, { grupoId, usuarioId });
  return response.data;
};

// Aceptar invitación
export const aceptarInvitacion = async (grupoId, usuarioId) => {
  const response = await axios.put(`${API_URL}/aceptar`, { grupoId, usuarioId });
  return response.data;
};

// Rechazar invitación
export const rechazarInvitacion = async (grupoId, usuarioId) => {
  const response = await axios.put(`${API_URL}/rechazar`, { grupoId, usuarioId });
  return response.data;
};

// Agregar un asset a un grupo
export const agregarAssetAlGrupo = async (grupoId, assetId) => {
  const response = await axios.post(`${API_URL}/assets`, { grupoId, assetId });
  return response.data;
};

// Eliminar un asset de un grupo
export const eliminarAssetDelGrupo = async (grupoId, assetId) => {
  const response = await axios.delete(`${API_URL}/assets`, {
    data: { grupoId, assetId }
  });
  return response.data;
};

export const getGruposPorUsuario = async (userId) => {
    const response = await axios.get(`${API_URL}/usuario/${userId}`);
    return response.data;
  };