const express = require('express');
const router = express.Router();
const {
    crearComentario,
    obtenerComentariosPorAsset,
    obtenerComentarioPorId,
    actualizarComentario,
    eliminarComentario,
    agregarLikeComentario,
    quitarLikeComentario
} = require('../controllers/Comentario/ComentarioController');

// Crear un nuevo comentario
router.post('/comentarios', verificarToken, crearComentario);

// Obtener todos los comentarios de un asset específico
router.get('/comentarios/asset/:assetId', verificarToken, obtenerComentariosPorAsset);

// Obtener un comentario por su ID
router.get('/comentarios/:comentarioId', verificarToken, obtenerComentarioPorId);

// Actualizar un comentario por su ID
router.put('/comentarios/:comentarioId', verificarToken, actualizarComentario);

// Eliminar un comentario por su ID
router.delete('/comentarios/:comentarioId', verificarToken, eliminarComentario);

// Agregar un like a un comentario
router.put('/comentarios/:comentarioId/like', verificarToken, agregarLikeComentario);

// Quitar un like a un comentario
router.put('/comentarios/:comentarioId/unlike', verificarToken, quitarLikeComentario);

module.exports = router;
