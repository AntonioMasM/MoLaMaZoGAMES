const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Para la encriptación de contraseñas

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
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Por favor ingresa un correo electrónico válido']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
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
        type: String,
        default: "assets/default-user.webp"
    },
    bio: {
        type: String,
        trim: true,
        maxlength: [300, 'La bio no puede tener más de 300 caracteres'],
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
        default: null
    },
    seguidores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    siguiendo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],

    /* 🔥 Campos nuevos */
    software: {
        type: [String],
        default: []
    },
    skills: {
        type: [String],
        default: []
    },
    intereses: {
        type: [String],
        default: []
    }
});

// Método para comparar contraseñas durante el inicio de sesión
usuarioSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
