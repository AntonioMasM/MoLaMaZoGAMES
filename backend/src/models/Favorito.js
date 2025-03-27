const mongoose = require('mongoose');

const favoritoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Usuario que marcó el asset como favorito
        required: true
    },
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset', // Asset marcado como favorito
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

// Evita que un usuario agregue el mismo asset más de una vez a favoritos
favoritoSchema.index({ usuario: 1, asset: 1 }, { unique: true });

const Favorito = mongoose.model('Favorito', favoritoSchema);

module.exports = Favorito;
