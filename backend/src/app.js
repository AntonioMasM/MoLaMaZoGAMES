const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Conexión a MongoDB
const swaggerDocs = require('./config/swagger'); // Documentación Swagger
require('dotenv').config(); // ✅ Cargar variables de entorno primero

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Documentación Swagger
swaggerDocs(app);

// Rutas organizadas
app.use('/api/usuarios', require('./routes/UsuarioRoutes'));
app.use('/api/assets', require('./routes/AssetRoutes'));
app.use('/api/mensajes', require('./routes/MensajeRoutes'));
app.use('/api/grupos', require('./routes/GrupoRoutes'));
app.use('/api/comentarios', require('./routes/ComentarioRoutes'));
app.use('/api/notificaciones', require('./routes/NotificacionRoutes'));

app.use('/api/categorias', require('./routes/CategoriaRoutes'));
app.use('/api/dropbox', require('./routes/DropboxRoutes'));
app.use('/api/cloudinary', require('./routes/CloudinaryRoutes'));
// Puerto y lanzamiento del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  
  // ⚠️ Solo muestra el JWT_SECRET si es entorno de desarrollo
  if (process.env.NODE_ENV !== 'production') {
    console.log("🔑 JWT_SECRET cargado:", process.env.JWT_SECRET ? "✅ OK" : "❌ No definido");
  }
});
