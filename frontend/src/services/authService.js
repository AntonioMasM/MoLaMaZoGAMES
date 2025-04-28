import axios from "axios";

const API_URL = "http://localhost:5000/api/usuarios";

// Iniciar sesión
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  
  // 🔥 Ahora el backend devuelve: { mensaje, token, nickname, fotoPerfil, email, id, ultimoInicioSesion }
  const { token, nickname, fotoPerfil, email: userEmail, id, ultimoInicioSesion } = response.data;
  
  return {
    token,
    nickname,
    fotoPerfil,
    email: userEmail,
    id,
    ultimoInicioSesion,
  };
};

// Cerrar sesión
export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`);
  return response.data;
};

// Solicitar recuperación de contraseña
export const solicitarRecuperacion = async (email) => {
  const response = await axios.post(`${API_URL}/recuperar`, { email });
  return response.data;
};

// Restablecer contraseña usando token
export const restablecerContrasena = async (token, nuevaPassword) => {
  const response = await axios.put(`${API_URL}/restablecer`, { token, nuevaPassword });
  return response.data;
};

// Cambiar contraseña autenticado
export const cambiarContrasena = async (email, passwordActual, nuevaPassword) => {
  const response = await axios.put(`${API_URL}/cambiar-clave/${email}`, { passwordActual, nuevaPassword });
  return response.data;
};
