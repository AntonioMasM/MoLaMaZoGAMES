const cloudinary = require('cloudinary').v2;

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // 🔒 Usa variables de entorno
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🚀 Borrar imagen de Cloudinary
const eliminarImagen = async (req, res) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ mensaje: "Falta el public_id de la imagen." });
  }

  try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ mensaje: "Imagen eliminada correctamente ✅" });
  } catch (error) {
    console.error("🔥 Error al eliminar imagen de Cloudinary:", error);
    res.status(500).json({ mensaje: "Error al eliminar imagen.", error: error.message });
  }
};

module.exports = { eliminarImagen };
