const express = require('express');
const router = express.Router();
const MensajeController = require('../controllers/Mensaje/MensajeController');
const MensajeUtilsController = require('../controllers/Mensaje/MensajeUtilsController');

// Rutas CRUD para los mensajes
router.post('/', MensajeController.crearMensaje); // Crear un nuevo mensaje
router.get('/', MensajeController.obtenerMensajes); // Obtener todos los mensajes
router.get('/:id', MensajeController.obtenerMensajePorId); // Obtener un mensaje por ID
router.put('/:id', MensajeController.actualizarMensaje); // Actualizar un mensaje por ID
router.delete('/:id', MensajeController.eliminarMensaje); // Eliminar un mensaje por ID

// Rutas auxiliares para los mensajes
router.put('/:id/leido', MensajeUtilsController.marcarMensajeComoLeido); // Marcar mensaje como leído
router.get('/buscar', MensajeUtilsController.buscarMensajes); // Búsqueda de mensajes por contenido o usuario

// Obtener mensajes por remitente
router.get('/remitente/:remitenteId', MensajeUtilsController.obtenerMensajesPorRemitente);

// Obtener mensajes por destinatario
router.get('/destinatario/:destinatarioId', MensajeUtilsController.obtenerMensajesPorDestinatario);

module.exports = router;
