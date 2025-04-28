const Notificacion = require('../../models/Notificacion');

// Crear una nueva notificación (por si alguna vez la quieres crear manualmente)
exports.crearNotificacion = async (req, res) => {
  const { usuario, tipo, contenido, referencia, tipoReferencia } = req.body;

  try {
    const nuevaNotificacion = new Notificacion({
      usuario,
      tipo,
      contenido,
      referencia,
      tipoReferencia
    });

    await nuevaNotificacion.save();
    return res.status(201).json(nuevaNotificacion);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear la notificación',
      error: error.message || 'Error desconocido'
    });
  }
};

// Obtener todas las notificaciones de un usuario (ordenadas por fecha descendente)
exports.obtenerNotificacionesUsuario = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const notificaciones = await Notificacion.find({ usuario: usuarioId })
      .sort({ fechaCreacion: -1 });

    return res.status(200).json(notificaciones);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener las notificaciones',
      error: error.message || 'Error desconocido'
    });
  }
};

// Obtener una notificación por ID
exports.obtenerNotificacionPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const notificacion = await Notificacion.findById(id);

    if (!notificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    return res.status(200).json(notificacion);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener la notificación',
      error: error.message || 'Error desconocido'
    });
  }
};

// Marcar una notificación como leída
exports.marcarNotificacionLeida = async (req, res) => {
  const { id } = req.params;

  try {
    const notificacion = await Notificacion.findById(id);
    if (!notificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    notificacion.leido = true;
    await notificacion.save();

    return res.status(200).json(notificacion);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al marcar la notificación como leída',
      error: error.message || 'Error desconocido'
    });
  }
};

// Marcar todas las notificaciones de un usuario como leídas
exports.marcarTodasNotificacionesLeidas = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const result = await Notificacion.updateMany(
      { usuario: usuarioId, leido: false },
      { $set: { leido: true } }
    );

    return res.status(200).json({
      message: `${result.modifiedCount} notificaciones marcadas como leídas`
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al marcar las notificaciones como leídas',
      error: error.message || 'Error desconocido'
    });
  }
};

// Eliminar una notificación
exports.eliminarNotificacion = async (req, res) => {
  const { id } = req.params;

  try {
    const notificacion = await Notificacion.findByIdAndDelete(id);
    if (!notificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    return res.status(200).json({ message: 'Notificación eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar la notificación',
      error: error.message || 'Error desconocido'
    });
  }
};
