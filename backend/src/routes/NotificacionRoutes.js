const express = require('express');
const router = express.Router();

const notificacionesController = require('../controllers/Mensaje/NotificacionesController');

// Crear una nueva notificación manualmente (opcional)
router.post('/', notificacionesController.crearNotificacion);

// Obtener todas las notificaciones de un usuario
router.get('/:usuarioId', notificacionesController.obtenerNotificacionesUsuario);

// Obtener una notificación específica por ID
router.get('/detalle/:id', notificacionesController.obtenerNotificacionPorId);

// Marcar una notificación como leída
router.patch('/:id/leido', notificacionesController.marcarNotificacionLeida);

// Marcar todas las notificaciones de un usuario como leídas
router.patch('/:usuarioId/marcar-todas', notificacionesController.marcarTodasNotificacionesLeidas);

// Eliminar una notificación
router.delete('/:id', notificacionesController.eliminarNotificacion);

module.exports = router;
