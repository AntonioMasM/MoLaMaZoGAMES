const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true,
        trim: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    ubicacion: {
        pais: { type: String, trim: true, default: "" },
        municipio: { type: String, trim: true, default: "" }
    },
    formacion: {
        universidad: { type: String, trim: true, default: "" },
        carrera: { type: String, trim: true, default: "" }
    },
    cargo: {
        type: String,
        required: true,
        trim: true
    },
    fotoPerfil: {
        type: String, // URL de la imagen
        default: "" // Se puede dejar vacío hasta que el usuario suba una imagen
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 300, // Limitamos la bio a 300 caracteres
        default: ""
    },
    redesSociales: {
        linkedin: { type: String, trim: true, default: "" },
        artstation: { type: String, trim: true, default: "" },
        twitter: { type: String, trim: true, default: "" },
        instagram: { type: String, trim: true, default: "" }
    },
    modo: {
        type: String,
        enum: ["claro", "oscuro", "texto grande"],
        default: "oscuro"
    },
    ultimoInicioSesion: {
        type: Date,
        default: null // Se actualizará cada vez que inicie sesión
    },
    seguidores: [{ type: String }], // Lista de emails de seguidores
    siguiendo: [{ type: String }], // Lista de emails de usuarios seguidos
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
