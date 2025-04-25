import axios from "axios";

const API_URL = "http://localhost:5000/api/usuarios";

export const loginUsuario = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error; // El componente que llama manejará el error
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/`, userData);
    return response.data;
  } catch (error) {
    throw error; // Igual, se maneja fuera
  }
};
