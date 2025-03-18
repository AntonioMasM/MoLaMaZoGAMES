const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    // Título del asset
    titulo: {
        type: String,
        required: true,
        trim: true
    },

    // Descripción del asset
    descripcion: {
        type: String,
        required: true,
        maxlength: 500,  // Puedes ajustar el límite según lo necesites
    },

    // El autor o creador del asset
    autor: {
        type: String,
        required: true,
        trim: true
    },

    // Imagen principal del asset (URL o referencia a archivo almacenado)
    imagenPrincipal: {
        type: String, // Aquí puedes almacenar la URL o referencia a la imagen
        required: true
    },

    // Galería multimedia que puede contener fotos y vídeos del asset
    galeriaMultimedia: [{
        tipo: { type: String, enum: ['foto', 'video'], required: true },
        url: { type: String, required: true }
    }],

    // Formatos de descarga disponibles para el asset
    formatos: [{
        tipo: {
            type: String,
            enum: ['pdf', 'zip', 'mp4', 'jpg', 'png', 'other'], // Puedes agregar más formatos según necesites
            required: true
        },
        tamaño: {  // Tamaño del archivo en MB o KB
            type: Number,
            required: true
        },
        url: {  // URL de descarga del formato
            type: String,
            required: true
        }
    }],

    // Etiquetas o categorías del asset
    categorias: [{
        type: String,
        trim: true
    }],

    // Fecha de creación del asset
    fechaCreacion: {
        type: Date,
        default: Date.now
    },

    // Indicador de si el asset está disponible para descarga
    disponible: {
        type: Boolean,
        default: true
    },

    // Vistas o popularidad del asset
    vistas: {
        type: Number,
        default: 0
    },

    // Usuario que subió el asset
    usuarioCreador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Relacionado con el modelo de usuario
        required: true
    }
});

// Crear el modelo de Asset
const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
