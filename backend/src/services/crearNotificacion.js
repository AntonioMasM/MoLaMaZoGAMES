// services/notificacionesService.js
const Notificacion = require('../models/Notificacion');

// Función genérica para crear notificaciones
async function crearNotificacion({
  usuarioId,
  tipo,
  contenido,
  referenciaId = null,
  tipoReferencia = null
}) {
  try {
    const nuevaNotificacion = new Notificacion({
      usuario: usuarioId,
      tipo,
      contenido,
      referencia: referenciaId,
      tipoReferencia
    });

    await nuevaNotificacion.save();

    return nuevaNotificacion;
  } catch (error) {
    console.error('Error creando notificación:', error);
    throw new Error('Error al crear la notificación.');
  }
}

module.exports = {
  crearNotificacion
};
