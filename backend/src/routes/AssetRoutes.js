const express = require('express');
const router = express.Router();
const AssetController = require('../controllers/Asset/AssetController');

// Rutas CRUD para los assets

// Crear un nuevo asset
router.post('/', AssetController.crearAsset);

// Obtener todos los assets
router.get('/', AssetController.obtenerAssets);

// Obtener un asset por su ID
router.get('/:id', AssetController.obtenerAssetPorId);

// Actualizar un asset por su ID
router.put('/:id', AssetController.actualizarAsset);

// Eliminar un asset por su ID
router.delete('/:id', AssetController.eliminarAsset);

// Buscar assets por título, descripción, autor o categoría
router.get('/buscar', AssetController.buscarAssets);

// Actualizar las vistas de un asset (cuando se ve un asset)
router.put('/:id/vistas', AssetController.actualizarVistas);

module.exports = router;
