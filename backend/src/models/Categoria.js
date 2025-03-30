const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [300, 'La descripción no puede superar los 300 caracteres']
  },
  imagen: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function (v) {
        return /^https:\/\/www\.dropbox\.com\/.*\?dl=0$/.test(v);
      },
      message: props => `${props.value} no es una URL válida de Dropbox con el formato esperado (?dl=0)`
    }
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

const Categoria = mongoose.model('Categoria', categoriaSchema);
module.exports = Categoria;
