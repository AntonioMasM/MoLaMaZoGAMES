const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Importamos la conexión a MongoDB
require('dotenv').config();

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando con MongoDB');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
