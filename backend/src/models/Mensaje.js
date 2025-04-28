const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
  remitente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  destinatario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
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
  conversacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversacion'
  },
  tipoMensaje: {
    type: String,
    enum: ['texto', 'sistema', 'grupo', 'archivo'], // 🔥
    default: 'texto'
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mensaje' // 🔥 Auto referencia
  }
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);
module.exports = Mensaje;
