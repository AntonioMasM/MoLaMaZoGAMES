import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("⚠️ VITE_API_URL no está definido en el entorno.");
}

const API_URL = `${BASE_URL}/usuarios`;

export const login = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/login`, { email, password });

  const {
    token,
    nickname,
    fotoPerfil,
    email: userEmail,
    id,
    ultimoInicioSesion,
    theme, // ✅ Añadido
  } = data;

  return {
    token,
    nickname,
    fotoPerfil,
    email: userEmail,
    id,
    ultimoInicioSesion,
    theme, // ✅ Incluido en la respuesta al frontend
  };
};

export const register = async (userData) => {
  const { data } = await axios.post(`${API_URL}/`, userData);
  return data;
};

export const logout = async () => {
  const { data } = await axios.post(`${API_URL}/logout`);
  return data;
};

export const solicitarRecuperacion = async (email) => {
  const { data } = await axios.post(`${API_URL}/recuperar`, { email });
  return data;
};

export const restablecerContrasena = async (token, nuevaPassword) => {
  const { data } = await axios.put(`${API_URL}/restablecer`, { token, nuevaPassword });
  return data;
};

export const cambiarContrasena = async (email, passwordActual, nuevaPassword) => {
  const { data } = await axios.put(`${API_URL}/cambiar-clave/${email}`, { passwordActual, nuevaPassword });
  return data;
};
