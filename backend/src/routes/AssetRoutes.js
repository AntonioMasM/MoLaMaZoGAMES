const express = require('express');
const router = express.Router();
const AssetController = require('../controllers/Asset/AssetController');


// Buscar assets por título, descripción, autor o categoría (IMPORTANTE: antes de /:id)
router.get('/buscar', AssetController.buscarAssets);

router.get('/categoria/:categoriaId', AssetController.obtenerAssetsPorCategoria);

router.get('/categoria/nombre/:nombreCategoria', AssetController.obtenerAssetsPorNombreCategoria);

// Crear un nuevo asset
router.post('/', AssetController.crearAsset);

// Obtener todos los assets
router.get('/', AssetController.obtenerAssets);



// Obtener assets por usuario
router.get('/usuario/:usuarioId', AssetController.obtenerAssetsPorUsuario);


// Obtener un asset por su ID
router.get('/:id', AssetController.obtenerAssetPorId);

// Actualizar un asset por su ID
router.put('/:id', AssetController.actualizarAsset);

// Actualizar las vistas de un asset (cuando se ve un asset)
router.put('/:id/vistas', AssetController.actualizarVistas);

// Eliminar un asset por su ID
router.delete('/:id', AssetController.eliminarAsset);

module.exports = router;
