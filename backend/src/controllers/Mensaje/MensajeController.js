const Mensaje = require('../../models/Mensaje');

// Crear un nuevo mensaje
exports.crearMensaje = async (req, res) => {
  const { remitente, destinatario, contenido, conversacion, tipoMensaje, replyTo } = req.body;

  try {
    const nuevoMensaje = new Mensaje({
      remitente,
      destinatario,
      contenido,
      conversacion,
      tipoMensaje: tipoMensaje || 'texto', // 🔥 Por si no lo envían, defaults
      replyTo
    });

    await nuevoMensaje.save();
    return res.status(201).json(nuevoMensaje);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el mensaje', error: error.message || 'Error desconocido' });
  }
};

// Obtener todos los mensajes (ordenados por fecha)
exports.obtenerMensajes = async (req, res) => {
  try {
    const mensajes = await Mensaje.find()
      .populate('remitente destinatario replyTo')
      .sort({ fechaEnvio: 1 });

    return res.status(200).json(mensajes);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los mensajes', error: error.message || 'Error desconocido' });
  }
};

// Obtener un mensaje por ID
exports.obtenerMensajePorId = async (req, res) => {
  const { id } = req.params;

  try {
    const mensaje = await Mensaje.findById(id)
      .populate('remitente destinatario replyTo');

    if (!mensaje) return res.status(404).json({ message: 'Mensaje no encontrado' });
    return res.status(200).json(mensaje);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el mensaje', error: error.message || 'Error desconocido' });
  }
};

// Actualizar contenido de un mensaje (⚡ normalmente solo admins o mensajes recientes)
exports.actualizarMensaje = async (req, res) => {
  const { id } = req.params;
  const { contenido } = req.body;

  try {
    const mensaje = await Mensaje.findById(id);
    if (!mensaje) return res.status(404).json({ message: 'Mensaje no encontrado' });

    // ⚡ Opcional: podrías bloquear edición de mensajes antiguos
    mensaje.contenido = contenido;
    await mensaje.save();

    return res.status(200).json(mensaje);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el mensaje', error: error.message || 'Error desconocido' });
  }
};

// Eliminar mensaje
exports.eliminarMensaje = async (req, res) => {
  const { id } = req.params;

  try {
    const mensaje = await Mensaje.findByIdAndDelete(id);
    if (!mensaje) return res.status(404).json({ message: 'Mensaje no encontrado' });

    return res.status(200).json({ message: 'Mensaje eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el mensaje', error: error.message || 'Error desconocido' });
  }
};
