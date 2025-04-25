import axios from "axios";

const API_URL = "http://localhost:5000/api/usuarios";

// ✅ Obtener todos los usuarios
export const getAllUsuarios = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

// ✅ Obtener usuario por email
export const getUsuarioPorEmail = async (email) => {
  const response = await axios.get(`${API_URL}/${email}`);
  return response.data;
};

// ✅ Obtener IDs de usuarios que sigue un usuario
export const getUsuariosSeguidos = async (email) => {
  const response = await axios.get(`${API_URL}/${email}/siguiendo`);
  return response.data.siguiendo || [];
};

// ✅ Obtener usuarios por array de IDs
export const getUsuariosPorIds = async (ids) => {
  const requests = ids.map((id) => axios.get(`${API_URL}/id/${id}`));
  const responses = await Promise.all(requests);
  return responses.map((res) => res.data);
};
