const express = require('express');
const router = express.Router();
const ComentarioController = require('../controllers/Comentario/ComentarioController');
const LikeController = require('../controllers/Comentario/LikeComentarioController');


// Crear un nuevo comentario
router.post('/', ComentarioController.crearComentario);

// Obtener todos los comentarios de un asset específico
router.get('/asset/:assetId', ComentarioController.obtenerComentariosPorAsset);

// Obtener un comentario por su ID
router.get('/:comentarioId', ComentarioController.obtenerComentarioPorId);

// Actualizar un comentario por su ID
router.put('/:comentarioId', ComentarioController.actualizarComentario);

// Eliminar un comentario por su ID
router.delete('/:comentarioId', ComentarioController.eliminarComentario);

// Agregar un like a un comentario
router.put('/:comentarioId/like', LikeController.darLike);

// Quitar un like a un comentario
router.put('/:comentarioId/unlike', LikeController.eliminarLike);

module.exports = router;
