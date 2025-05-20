import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("⚠️ VITE_API_URL no está definido en el entorno.");
}

const API_URL = `${BASE_URL}/cloudinary/eliminar`;

const deleteImageFromCloudinary = async (publicId) => {
  try {
    const response = await axios.delete(API_URL, {
      data: { public_id: publicId },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar imagen de Cloudinary:", error);
    throw error;
  }
};

export default deleteImageFromCloudinary;
