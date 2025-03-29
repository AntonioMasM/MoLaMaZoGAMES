const Comentario = require('../../models/Comentario');
const Asset = require('../../models/Asset');

// Crear un nuevo comentario sobre un asset
exports.crearComentario = async (req, res) => {
    try {
        const { assetId, contenido } = req.body;
        const usuarioId = req.user._id; // Asumimos que el ID del usuario está en el token JWT

        // Verificar que el asset existe
        const asset = await Asset.findById(assetId);
        if (!asset) {
            return res.status(404).json({ mensaje: 'Asset no encontrado' });
        }

        // Crear el comentario
        const nuevoComentario = new Comentario({
            usuario: usuarioId,
            asset: assetId,
            contenido
        });

        await nuevoComentario.save();

        // Responder con el comentario creado
        return res.status(201).json({ mensaje: 'Comentario creado', comentario: nuevoComentario });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Obtener todos los comentarios de un asset
exports.obtenerComentariosPorAsset = async (req, res) => {
    try {
        const { assetId } = req.params;

        // Verificar si el asset existe
        const asset = await Asset.findById(assetId);
        if (!asset) {
            return res.status(404).json({ mensaje: 'Asset no encontrado' });
        }

        // Obtener los comentarios del asset
        const comentarios = await Comentario.find({ asset: assetId }).populate('usuario', 'nombreCompleto nickname');
        
        return res.status(200).json({ comentarios });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Obtener un comentario específico por ID
exports.obtenerComentarioPorId = async (req, res) => {
    try {
        const { comentarioId } = req.params;

        const comentario = await Comentario.findById(comentarioId).populate('usuario', 'nombreCompleto nickname');
        
        if (!comentario) {
            return res.status(404).json({ mensaje: 'Comentario no encontrado' });
        }

        return res.status(200).json({ comentario });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Actualizar un comentario por ID
exports.actualizarComentario = async (req, res) => {
    try {
        const { comentarioId } = req.params;
        const { contenido } = req.body;

        const comentario = await Comentario.findById(comentarioId);

        if (!comentario) {
            return res.status(404).json({ mensaje: 'Comentario no encontrado' });
        }

        // Verificar que el usuario es el dueño del comentario
        if (comentario.usuario.toString() !== req.user._id.toString()) {
            return res.status(403).json({ mensaje: 'No autorizado a editar este comentario' });
        }

        comentario.contenido = contenido;
        await comentario.save();

        return res.status(200).json({ mensaje: 'Comentario actualizado', comentario });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Eliminar un comentario por ID
exports.eliminarComentario = async (req, res) => {
    try {
        const { comentarioId } = req.params;

        const comentario = await Comentario.findById(comentarioId);

        if (!comentario) {
            return res.status(404).json({ mensaje: 'Comentario no encontrado' });
        }

        // Verificar que el usuario es el dueño del comentario
        if (comentario.usuario.toString() !== req.user._id.toString()) {
            return res.status(403).json({ mensaje: 'No autorizado a eliminar este comentario' });
        }

        await comentario.remove();

        return res.status(200).json({ mensaje: 'Comentario eliminado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
