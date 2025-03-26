const Mensaje = require('../../models/Mensaje');

// Marcar mensaje como leído
exports.marcarMensajeComoLeido = async (req, res) => {
    const { id } = req.params;

    try {
        const mensaje = await Mensaje.findByIdAndUpdate(id, { leido: true }, { new: true });
        if (!mensaje) return res.status(404).json({ message: 'Mensaje no encontrado' });
        return res.status(200).json(mensaje);
    } catch (error) {
        return res.status(500).json({ message: 'Error al marcar el mensaje como leído', error });
    }
};

// Búsqueda de mensajes por contenido o usuario
exports.buscarMensajes = async (req, res) => {
    const { query } = req.query; // Parámetro de búsqueda

    try {
        const mensajes = await Mensaje.find({
            $or: [
                { contenido: { $regex: query, $options: 'i' } }, // Búsqueda por contenido
                { remitente: { $regex: query, $options: 'i' } }, // Búsqueda por remitente
                { destinatario: { $regex: query, $options: 'i' } } // Búsqueda por destinatario
            ]
        }).populate('remitente destinatario');
        
        return res.status(200).json(mensajes);
    } catch (error) {
        return res.status(500).json({ message: 'Error al buscar mensajes', error });
    }
};

// Obtener mensajes por remitente
exports.obtenerMensajesPorRemitente = async (req, res) => {
    const { remitenteId } = req.params;

    try {
        const mensajes = await Mensaje.find({ remitente: remitenteId })
            .populate('remitente destinatario')  // Popula los datos del remitente y destinatario
            .exec();
        
        if (!mensajes || mensajes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron mensajes para este remitente' });
        }
        
        return res.status(200).json(mensajes);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los mensajes del remitente', error });
    }
};

// Obtener mensajes por destinatario
exports.obtenerMensajesPorDestinatario = async (req, res) => {
    const { destinatarioId } = req.params;

    try {
        const mensajes = await Mensaje.find({ destinatario: destinatarioId })
            .populate('remitente destinatario')  // Popula los datos del remitente y destinatario
            .exec();
        
        if (!mensajes || mensajes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron mensajes para este destinatario' });
        }
        
        return res.status(200).json(mensajes);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los mensajes del destinatario', error });
    }
};