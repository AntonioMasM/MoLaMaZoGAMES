const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para la encriptación de contraseñas

const usuarioSchema = new mongoose.Schema({
  nombreCompleto: {
    type: String,
    required: true,
    trim: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Por favor ingresa un correo electrónico válido'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
  ubicacion: {
    pais: { type: String, trim: true, default: '' },
    municipio: { type: String, trim: true, default: '' },
  },
  formacion: {
    universidad: { type: String, trim: true, default: '' },
    carrera: { type: String, trim: true, default: '' },
  },
  cargo: {
    type: String,
    required: true,
    trim: true,
  },
  fotoPerfil: {
    public_id: { type: String, default: '' },
    secure_url: { type: String, default: 'assets/default-user.webp' },
  },
  
  bio: {
    type: String,
    trim: true,
    maxlength: [300, 'La bio no puede tener más de 300 caracteres'],
    default: '',
  },
  redesSociales: {
    linkedin: { type: String, trim: true, default: '' },
    artstation: { type: String, trim: true, default: '' },
    twitter: { type: String, trim: true, default: '' },
    instagram: { type: String, trim: true, default: '' },
  },
  modo: {
    type: String,
    enum: ['dark', 'white', 'high-contrast'],
    default: 'dark',
  },
  ultimoInicioSesion: {
    type: Date,
    default: null,
  },
  seguidores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  siguiendo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
  categoriasSeguidas: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Categoria',
    default: [] // ✅ Muy recomendable
  },
    software: {
    type: [String],
    default: [],
    validate: [arrayLimit, 'Máximo 10 softwares permitidos'],
  },
  skills: {
    type: [String],
    default: [],
    validate: [arrayLimit, 'Máximo 10 skills permitidos'],
  },
  intereses: {
    type: [String],
    default: [],
    validate: [arrayLimit, 'Máximo 10 intereses permitidos'],
  },
  // Campos de recuperación de contraseña
  tokenRecuperacion: { type: String },
  expiracionToken: { type: Date },
});

// Limitar arrays a 10 elementos (prevención de abuso)
function arrayLimit(val) {
  return val.length <= 10;
}

// 🔥 Middleware pre-save para hashear contraseñas automáticamente
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Solo si la contraseña cambió
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para comparar contraseñas durante el inicio de sesión
usuarioSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
