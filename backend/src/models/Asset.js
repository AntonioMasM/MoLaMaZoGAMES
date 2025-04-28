const mongoose = require('mongoose');

// Definir el esquema de Asset
const assetSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },

  descripcion: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true
  },

  autor: {
    type: String,
    required: true,
    trim: true
  },

  // Imagen principal (Cloudinary)
  imagenPrincipal: {
    url: { type: String, required: true },       // secure_url de Cloudinary
    public_id: { type: String, required: true },  // ID para borrar en Cloudinary
  },

  // Galería multimedia (Cloudinary)
  galeriaMultimedia: [{
    tipo: { type: String, enum: ['image', 'video', 'audio'], required: true },
    url: { type: String, required: true },        // secure_url
    public_id: { type: String, required: true },  // public_id
  }],

  // Formatos descargables (Cloudinary)
  formatos: [{
    tipo: { type: String, required: true },       // Por ejemplo: 'OBJ', 'FBX', 'ZIP'
    tamaño: { type: Number, required: true },     // Tamaño en bytes
    url: { type: String, required: true },         // secure_url
    public_id: { type: String, required: true },   // public_id
  }],

  categorias: [{
    type: String,
    trim: true
  }],

  fechaCreacion: {
    type: Date,
    default: Date.now
  },

  disponible: {
    type: Boolean,
    default: true
  },

  vistas: {
    type: Number,
    default: 0
  },

  usuarioCreador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});

// Crear el modelo de Asset
const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
