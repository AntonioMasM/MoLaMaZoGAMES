// src/services/users/index.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/usuarios";
const CATEGORIA_API_URL = import.meta.env.VITE_API_URL + "/categorias";

// 🧾 Autenticación de usuario
export const getUsuarioPorEmail = async (email) => {
  const { data } = await axios.get(`${API_URL}/${encodeURIComponent(email)}`);
  return data;
};

export const getUsuarioPorId = async (id) => {
  const { data } = await axios.get(`${API_URL}/id/${encodeURIComponent(id)}`);
  return data;
};

export const getUsuarioPorNickname = async (nickname) => {
  const { data } = await axios.get(`${API_URL}/perfil/${encodeURIComponent(nickname)}`);
  return data;
};

// 👥 Relación entre usuarios
export const getUsuariosSeguidos = async (email) => {
  const { data } = await axios.get(`${API_URL}/${email}/siguiendo`);
  return data.siguiendo || [];
};

export const getUsuariosPorIds = async (ids) => {
  const requests = ids.map((id) => axios.get(`${API_URL}/id/${id}`));
  const responses = await Promise.all(requests);
  return responses.map((res) => res.data);
};

export const followUser = async (currentUserId, targetUserId) => {
  await axios.post(`${API_URL}/${currentUserId}/seguir/${targetUserId}`);
};

export const unfollowUser = async (currentUserId, targetUserId) => {
  await axios.post(`${API_URL}/${currentUserId}/dejar-seguir/${targetUserId}`);
};

export const checkIfFollowing = async (currentUserId, targetUserId) => {
  const { data } = await axios.get(`${API_URL}/${currentUserId}/sigue/${targetUserId}`);
  return data.isFollowing;
};

// 🧑 Gestión de usuarios
export const getAllUsuarios = async () => {
  const { data } = await axios.get(`${API_URL}/`);
  return data;
};

export const crearUsuario = async (datosUsuario) => {
  const { data } = await axios.post(API_URL, datosUsuario);
  return data;
};

export const actualizarUsuario = async (email, datosActualizados) => {
  const { data } = await axios.put(`${API_URL}/${encodeURIComponent(email)}`, datosActualizados);
  return data;
};

export const eliminarUsuario = async (email) => {
  const { data } = await axios.delete(`${API_URL}/${encodeURIComponent(email)}`);
  return data;
};

export const buscarUsuarios = async (query) => {
  const { data } = await axios.get(`${API_URL}/buscar?q=${encodeURIComponent(query)}`);
  return data.resultados || [];
};

// ⭐ Categorías favoritas
export const seguirCategoria = async (idUsuario, idCategoria) => {
  const { data } = await axios.post(`${CATEGORIA_API_URL}/${idCategoria}/seguir/${idUsuario}`);
  return data;
};

export const dejarCategoria = async (idUsuario, idCategoria) => {
  const { data } = await axios.delete(`${CATEGORIA_API_URL}/${idCategoria}/dejar/${idUsuario}`);
  return data;
};

export const getCategoriasSeguidas = async (idUsuario) => {
  const { data } = await axios.get(`${CATEGORIA_API_URL}/seguidas/${idUsuario}`);
  return data.categoriasSeguidas || [];
};
