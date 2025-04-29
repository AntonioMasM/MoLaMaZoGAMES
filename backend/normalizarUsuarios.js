// scripts/normalizarUsuarios.js
require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('./src/models/Usuario'); // Asegúrate de que la ruta es correcta
const connectDB = require('./src/config/db');   // Tu función de conexión a MongoDB

(async () => {
  try {
    await connectDB();

    const result = await Usuario.updateMany(
      { categoriasSeguidas: { $exists: false } },
      { $set: { categoriasSeguidas: [] } }
    );

    console.log(`✅ Usuarios actualizados: ${result.modifiedCount}`);
    console.log('🎉 Normalización de usuarios completada.');
  } catch (error) {
    console.error('❌ Error al normalizar usuarios:', error);
  } finally {
    mongoose.connection.close();
  }
})();
