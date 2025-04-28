const Mensaje = require('../../models/Mensaje');

// Marcar mensaje como leído
exports.marcarMensajeComoLeido = async (req, res) => {
  const { id } = req.params;

  try {
    const mensaje = await Mensaje.findById(id);
    if (!mensaje) return res.status(404).json({ message: 'Mensaje no encontrado' });

    mensaje.leido = true;
    await mensaje.save();

    return res.status(200).json(mensaje);
  } catch (error) {
    return res.status(500).json({ message: 'Error al marcar el mensaje como leído', error: error.message || 'Error desconocido' });
  }
};

// Búsqueda de mensajes por contenido
exports.buscarMensajes = async (req, res) => {
  const { query } = req.query; // 🔎 Buscamos solo por contenido, porque IDs no son texto

  try {
    const mensajes = await Mensaje.find({
      contenido: { $regex: query, $options: 'i' }
    })
    .populate('remitente destinatario replyTo')
    .sort({ fechaEnvio: 1 });

    return res.status(200).json(mensajes);
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar mensajes', error: error.message || 'Error desconocido' });
  }
};

// Obtener mensajes por remitente
exports.obtenerMensajesPorRemitente = async (req, res) => {
  const { remitenteId } = req.params;

  try {
    const mensajes = await Mensaje.find({ remitente: remitenteId })
      .populate('remitente destinatario replyTo')
      .sort({ fechaEnvio: 1 });

    return res.status(200).json(mensajes);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los mensajes del remitente', error: error.message || 'Error desconocido' });
  }
};

// Obtener mensajes por destinatario
exports.obtenerMensajesPorDestinatario = async (req, res) => {
  const { destinatarioId } = req.params;

  try {
    const mensajes = await Mensaje.find({ destinatario: destinatarioId })
      .populate('remitente destinatario replyTo')
      .sort({ fechaEnvio: 1 });

    return res.status(200).json(mensajes);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los mensajes del destinatario', error: error.message || 'Error desconocido' });
  }
};
