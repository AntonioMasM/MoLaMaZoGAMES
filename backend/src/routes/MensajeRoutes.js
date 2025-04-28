const express = require('express');
const router = express.Router();

// Importar controladores
const MensajeController = require('../controllers/Mensaje/MensajeController');
const MensajeUtilsController = require('../controllers/Mensaje/MensajeUtilsController');

// 📦 Rutas CRUD principales
router.post('/', MensajeController.crearMensaje);                    // Crear un nuevo mensaje
router.get('/', MensajeController.obtenerMensajes);                  // Obtener todos los mensajes
router.get('/:id', MensajeController.obtenerMensajePorId);           // Obtener un mensaje por ID
router.put('/:id', MensajeController.actualizarMensaje);             // Actualizar un mensaje
router.delete('/:id', MensajeController.eliminarMensaje);            // Eliminar un mensaje

// 📦 Rutas auxiliares (marcar leído, buscar, etc.)
router.patch('/:id/leido', MensajeUtilsController.marcarMensajeComoLeido); // Marcar mensaje como leído
router.get('/buscar/contenido', MensajeUtilsController.buscarMensajes);   // Buscar mensajes por contenido

// 📦 Rutas de mensajes por usuario
router.get('/remitente/:remitenteId', MensajeUtilsController.obtenerMensajesPorRemitente);      // Obtener mensajes enviados
router.get('/destinatario/:destinatarioId', MensajeUtilsController.obtenerMensajesPorDestinatario); // Obtener mensajes recibidos

module.exports = router;
