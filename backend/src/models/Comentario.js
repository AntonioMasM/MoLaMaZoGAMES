const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
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
  likes: {
    type: [mongoose.Schema.Types.ObjectId], // 🔥 Forma más limpia
    ref: 'Usuario',
    default: [] // 🔥 Obligatorio: array vacío por defecto
  }
});

// Índice compuesto para optimizar búsquedas de comentarios por asset
comentarioSchema.index({ asset: 1, fechaCreacion: -1 });

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
