import axios from "axios";

const API_URL = "http://localhost:5000/api/usuarios";

// Actualizar foto de perfil
export const actualizarFotoPerfil = async (email, fotoPerfil) => {
  const response = await axios.put(`${API_URL}/${email}/foto`, { fotoPerfil });
  return response.data;
};

// Actualizar redes sociales
export const actualizarRedesSociales = async (email, redesSociales) => {
  const response = await axios.put(`${API_URL}/${email}/redes`, { redesSociales });
  return response.data;
};

// Seguir a un usuario
export const seguirUsuario = async (emailObjetivo, emailSeguidor) => {
  const response = await axios.post(`${API_URL}/${emailObjetivo}/seguir`, { seguidorEmail: emailSeguidor });
  return response.data;
};

// Dejar de seguir a un usuario
export const dejarDeSeguirUsuario = async (emailObjetivo, emailSeguidor) => {
  const response = await axios.delete(`${API_URL}/${emailObjetivo}/dejar-seguir`, { data: { seguidorEmail: emailSeguidor } });
  return response.data;
};

// Obtener seguidores de un usuario
export const obtenerSeguidores = async (email) => {
  const response = await axios.get(`${API_URL}/${email}/seguidores`);
  return response.data.seguidores || [];
};

// Obtener usuarios que sigue un usuario
export const obtenerSiguiendo = async (email) => {
    const response = await axios.get(`${API_URL}/${email}/siguiendo`);
    return response.data.siguiendo || [];
  };
  
