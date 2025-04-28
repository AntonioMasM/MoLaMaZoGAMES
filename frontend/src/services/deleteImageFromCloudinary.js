import axios from "axios";

const deleteImageFromCloudinary = async (publicId) => {
  try {
    const response = await axios.delete("http://localhost:5000/api/cloudinary/eliminar", {
      data: { public_id: publicId },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar imagen de Cloudinary:", error);
    throw error;
  }
};

export default deleteImageFromCloudinary;
