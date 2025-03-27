const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',  // Referencia al usuario que hizo el comentario
        required: true
    },
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',  // Referencia al asset sobre el que se comenta
        required: true
    },
    contenido: {
        type: String,
        required: true,
        trim: true,
        maxlength: [500, 'El comentario no puede superar los 500 caracteres']
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'  // Lista de usuarios que han dado like
    }]
});

// Índice compuesto para optimizar búsquedas de comentarios por asset
comentarioSchema.index({ asset: 1, fechaCreacion: -1 });

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
