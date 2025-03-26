const Mensaje = require('../../models/Mensaje'); // Ruta al modelo de Mensaje

// Crear un nuevo mensaje
exports.crearMensaje = async (req, res) => {
    const { remitente, destinatario, contenido, conversacion } = req.body;

    try {
        const nuevoMensaje = new Mensaje({
            remitente,
            destinatario,
            contenido,
            conversacion
        });

        await nuevoMensaje.save();
        return res.status(201).json(nuevoMensaje);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el mensaje', error });
    }
};

// Obtener todos los mensajes
exports.obtenerMensajes = async (req, res) => {
    try {
        const mensajes = await Mensaje.find().populate('remitente destinatario');
        return res.status(200).json(mensajes);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los mensajes', error });
    }
};

// Obtener un mensaje por ID
exports.obtenerMensajePorId = async (req, res) => {
    const { id } = req.params;

    try {
        const mensaje = await Mensaje.findById(id).populate('remitente destinatario');
        if (!mensaje) return res.status(404).json({ message: 'Mensaje no encontrado' });
        return res.status(200).json(mensaje);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el mensaje', error });
    }
};

// Actualizar un mensaje
exports.actualizarMensaje = async (req, res) => {
    const { id } = req.params;
    const { contenido } = req.body;

    try {
        const mensaje = await Mensaje.findByIdAndUpdate(id, { contenido }, { new: true });
        if (!mensaje) return res.status(404).json({ message: 'Mensaje no encontrado' });
        return res.status(200).json(mensaje);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el mensaje', error });
    }
};

// Eliminar un mensaje
exports.eliminarMensaje = async (req, res) => {
    const { id } = req.params;

    try {
        const mensaje = await Mensaje.findByIdAndDelete(id);
        if (!mensaje) return res.status(404).json({ message: 'Mensaje no encontrado' });
        return res.status(200).json({ message: 'Mensaje eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el mensaje', error });
    }
};
