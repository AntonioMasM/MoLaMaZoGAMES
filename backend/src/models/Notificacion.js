const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Usuario que recibe la notificación
        required: true
    },
    tipo: {
        type: String,
        enum: ['mensaje', 'seguimiento', 'grupo', 'asset', 'general'], // Tipos de notificación
        required: true
    },
    contenido: {
        type: String,
        required: true,
        trim: true
    },
    referencia: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'tipoReferencia' // Referencia dinámica según el tipo de notificación
    },
    tipoReferencia: {
        type: String,
        enum: ['Mensaje', 'Usuario', 'Grupo', 'Asset'], // Modelos referenciados
        default: null
    },
    leido: {
        type: Boolean,
        default: false // Indica si el usuario ha visto la notificación
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

// Índice para mejorar la consulta de notificaciones por usuario
notificacionSchema.index({ usuario: 1, leido: 1 });

const Notificacion = mongoose.model('Notificacion', notificacionSchema);

module.exports = Notificacion;
