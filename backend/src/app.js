const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Conectar a MongoDB
const swaggerDocs = require('./config/swagger'); // Importar Swagger

require('dotenv').config();

const app = express();

// Conectar a la BD
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Documentación de Swagger
swaggerDocs(app);

// Rutas
app.use('/api/usuarios', require('./routes/UsuarioRoutes'));
app.use('/api/assets', require('./routes/AssetRoutes'));
app.use('/api/mensajes', require('./routes/MensajeRoutes'));
app.use('/api/grupos', require('./routes/GrupoRoutes'));
app.use('/api/usuarios', require('./routes/UsuarioRoutes'));
app.use('/api/comentarios', require('./routes/ComentarioRoutes'));
app.use('/api/categorias', require('./routes/CategoriaRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

});
