const cloudinary = require('cloudinary').v2;

// Configura tu cuenta de Cloudinary
cloudinary.config({
  cloud_name: "dqh9ubdgg",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/* 🎯 Eliminar recurso de Cloudinary por public_id */
const eliminarArchivoCloudinary = async (publicId, resourceType = "image") => {
  try {
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });

    return response;
  } catch (error) {
    console.error("Error eliminando archivo de Cloudinary:", error);
    throw error;
  }
};

module.exports = {
  eliminarArchivoCloudinary
};
