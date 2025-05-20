// src/services/userService.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("⚠️ VITE_API_URL no está definido en el entorno.");
}

const API_URL = `${BASE_URL}/usuarios`;

// Crear nuevo usuario
export const crearUsuario = async (datosUsuario) => {
  const response = await axios.post(API_URL, datosUsuario);
  return response.data;
};

// Obtener todos los usuarios
export const getAllUsuarios = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener un usuario por email
export const getUsuarioPorEmail = async (email) => {
  const response = await axios.get(`${API_URL}/${encodeURIComponent(email)}`);
  return response.data;
};

// Obtener un usuario por nickname
export const getUsuarioPorNickname = async (nickname) => {
  const response = await axios.get(`${API_URL}/perfil/${encodeURIComponent(nickname)}`);
  return response.data;
};

// Actualizar usuario (información general)
export const actualizarUsuario = async (email, datosActualizados) => {
  const response = await axios.put(`${API_URL}/${encodeURIComponent(email)}`, datosActualizados);
  return response.data;
};

// Eliminar usuario
export const eliminarUsuario = async (email) => {
  const response = await axios.delete(`${API_URL}/${encodeURIComponent(email)}`);
  return response.data;
};

// Buscar usuarios por nombre, nickname o email
export const buscarUsuarios = async (query) => {
  const response = await axios.get(`${API_URL}/buscar?q=${encodeURIComponent(query)}`);
  return response.data.resultados || [];
};

// Obtener un usuario por ID
export const getUsuarioPorId = async (id) => {
    const response = await axios.get(`${API_URL}/id/${encodeURIComponent(id)}`);
    return response.data;
  };



  const CATEGORIA_API_URL = `${BASE_URL}/categorias`;

  // Seguir una categoría
  export const seguirCategoria = async (idUsuario, idCategoria) => {
    const response = await axios.post(`${CATEGORIA_API_URL}/${idCategoria}/seguir/${idUsuario}`);
    return response.data;
  };
  
  export const dejarCategoria = async (idUsuario, idCategoria) => {
    const response = await axios.delete(`${CATEGORIA_API_URL}/${idCategoria}/dejar/${idUsuario}`);
    return response.data;
  };
  
  export const getCategoriasSeguidas = async (idUsuario) => {
    const response = await axios.get(`${CATEGORIA_API_URL}/seguidas/${idUsuario}`);
    return response.data.categoriasSeguidas || [];
  };
  