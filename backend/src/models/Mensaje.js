const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
    remitente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Relacionado con el modelo de Usuario
        required: true
    },
    destinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Relacionado con el modelo de Usuario
        required: true
    },
    contenido: {
        type: String,
        required: true,
        maxlength: [1000, 'El contenido del mensaje no puede superar los 1000 caracteres']
    },
    fechaEnvio: {
        type: Date,
        default: Date.now
    },
    leido: {
        type: Boolean,
        default: false
    },
    // Opcional: Un campo para asociar mensajes a una conversación específica
    conversacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversacion'
    }
});

// Crear el modelo de Mensaje
const Mensaje = mongoose.model('Mensaje', mensajeSchema);

module.exports = Mensaje;
