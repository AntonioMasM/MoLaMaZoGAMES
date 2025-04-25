import axios from "axios";

const API_URL = "http://localhost:5000/api/assets";

// Obtener todos los assets
export const getAllAssets = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
