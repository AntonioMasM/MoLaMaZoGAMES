import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("⚠️ VITE_API_URL no está definido en el entorno.");
}

const API_URL = `${BASE_URL}/categorias`;

export const getCategorias = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
