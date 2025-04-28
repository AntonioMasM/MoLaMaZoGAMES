const express = require('express');
const router = express.Router();
const { eliminarImagen } = require('../controllers/Cloudinary/CloudinaryController');

// Ruta: Eliminar imagen
router.delete('/eliminar', eliminarImagen);

module.exports = router;
