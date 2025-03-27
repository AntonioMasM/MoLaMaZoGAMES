const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Usuario que dio like
        required: true
    },
    comentario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comentario', // Comentario al que se le dio like
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

// Evita que un usuario de like más de una vez a un mismo comentario
LikeSchema.index({ usuario: 1, comentario: 1 }, { unique: true });

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
