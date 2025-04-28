// fixLikesComentarios.js
const mongoose = require('mongoose');
const Comentario = require('./src/models/Comentario'); // Ajusta la ruta si necesario
require('dotenv').config(); // Para cargar tu MONGO_URI

// 🔥 Conexión a tu base de datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("✅ Conectado a MongoDB");

  try {
    // Encuentra todos los comentarios que tengan likes nulos
    const comentariosConLikesInvalidos = await Comentario.find({ likes: { $in: [null] } });

    console.log(`Encontrados ${comentariosConLikesInvalidos.length} comentarios con likes inválidos`);

    for (const comentario of comentariosConLikesInvalidos) {
      // Filtra los likes quitando los nulls
      comentario.likes = comentario.likes.filter(like => like !== null);

      await comentario.save();
      console.log(`🛠 Limpiado comentario ${comentario._id}`);
    }

    console.log("🎉 Todos los comentarios fueron corregidos.");
  } catch (error) {
    console.error("❌ Error durante la limpieza:", error.message);
  } finally {
    mongoose.disconnect();
  }
}).catch((error) => {
  console.error("❌ Error conectando a MongoDB:", error.message);
});
