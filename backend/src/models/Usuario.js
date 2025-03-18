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
        lowercase: true, // Aseguramos que el email esté en minúsculas
        match: [/.+@.+\..+/, 'Por favor ingresa un correo electrónico válido'] // Validación del correo
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'] // Validación de longitud mínima
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
        default: null // Se actualizará cada vez que inicie sesión
    },
    seguidores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }], // Lista de referencias a usuarios seguidos
    siguiendo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }], // Lista de referencias a usuarios seguidores
});

// Eliminar el middleware pre('save') para evitar el doble cifrado
// usuarioSchema.pre('save', async function(next) {
//     if (this.isModified('password') || this.isNew) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// Método para comparar contraseñas durante el inicio de sesión
usuarioSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password); // Comparar la contraseña proporcionada con la almacenada
};


const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
