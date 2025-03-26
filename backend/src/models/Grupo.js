const mongoose = require('mongoose');

const GrupoSchema = new mongoose.Schema({
    // Título del grupo
    titulo: {
        type: String,
        required: true,
        trim: true
    },

    // Descripción del grupo
    descripcion: {
        type: String,
        required: true,
        maxlength: [500, 'La descripción no puede superar los 500 caracteres']
    },

    // Lista de usuarios que pertenecen al grupo
    usuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Relacionado con el modelo de Usuario
        required: true
    }],

    // Lista de assets relacionados al grupo
    assets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset' // Relacionado con el modelo de Asset
    }],

    // Usuario que creó el grupo
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    // Fecha de creación del grupo
    fechaCreacion: {
        type: Date,
        default: Date.now
    },

    // Fecha de la última actualización del grupo
    fechaActualizacion: {
        type: Date,
        default: Date.now
    },

    // Usuarios invitados que aún no han aceptado
    invitacionesPendientes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }]
});

// Crear el modelo de Grupo de Trabajo
const Grupo = mongoose.model('Grupo', GrupoSchema);

module.exports = Grupo;
