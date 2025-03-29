const Notificacion = require('../../models/Notificacion');
const Comentario = require('../../models/Comentario');
const Usuario = require('../../models/Usuario');

// Enviar una notificación por nuevo comentario en un asset
exports.notificarNuevoComentario = async (comentario) => {
    try {
        const usuarioCreador = await Usuario.findById(comentario.asset.usuarioCreador);

        const notificacion = new Notificacion({
            usuario: usuarioCreador._id,
            tipo: 'comentario',
            mensaje: `Nuevo comentario en tu asset: "${comentario.contenido}"`,
            leido: false,
            entidadId: comentario._id, // Relacionar con el comentario
            entidadTipo: 'Comentario',
            fechaCreacion: Date.now()
        });

        await notificacion.save();
    } catch (error) {
        console.error(error);
    }
};

// Enviar una notificación por like a un comentario
exports.notificarLikeComentario = async (comentario, usuarioQueDioLike) => {
    try {
        const notificacion = new Notificacion({
            usuario: comentario.usuario, // El autor del comentario
            tipo: 'likeComentario',
            mensaje: `${usuarioQueDioLike.nombreCompleto} le ha dado like a tu comentario`,
            leido: false,
            entidadId: comentario._id, // Relacionar con el comentario
            entidadTipo: 'Comentario',
            fechaCreacion: Date.now()
        });

        await notificacion.save();
    } catch (error) {
        console.error(error);
    }
};
