import axios from "axios";

const API_URL = "http://localhost:5000/api/usuarios/favoritos"; // ⚡ Va contra las rutas de SocialController que montamos

// Añadir un asset a favoritos
export const agregarAFavoritos = async (assetId) => {
  const response = await axios.post(
    `${API_URL}`,
    { assetId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // o donde guardes tu token de sesión
      },
    }
  );
  return response.data;
};

// Eliminar un asset de favoritos
export const eliminarFavorito = async (favoritoId) => {
  const response = await axios.delete(
    `${API_URL}/${favoritoId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
};

// Obtener todos los favoritos del usuario
export const obtenerFavoritos = async () => {
  const response = await axios.get(
    `${API_URL}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
};
