const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Conectar a MongoDB
require('dotenv').config();

const app = express();

// Conectar a la BD
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/usuarios', require('./routes/UsuarioRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
