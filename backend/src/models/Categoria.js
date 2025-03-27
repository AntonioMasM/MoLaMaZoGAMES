const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true, // Evita categorías duplicadas
        trim: true
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: [300, 'La descripción no puede superar los 300 caracteres']
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

// Índice en el nombre para mejorar búsquedas
categoriaSchema.index({ nombre: 1 });

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
