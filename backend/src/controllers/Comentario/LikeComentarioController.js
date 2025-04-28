const Comentario = require('../../models/Comentario');

// Dar like a un comentario
exports.darLike = async (req, res) => {
    try {
      const { comentarioId } = req.params;
      const { usuarioId } = req.body; // 🔥 ahora usuarioId viene del body
  
      const comentario = await Comentario.findById(comentarioId);
  
      if (!comentario) {
        return res.status(404).json({ mensaje: 'Comentario no encontrado' });
      }
  
      if (comentario.likes.includes(usuarioId)) {
        return res.status(400).json({ mensaje: 'Ya has dado like a este comentario' });
      }
  
      comentario.likes.push(usuarioId);
      await comentario.save();
  
      return res.status(200).json({ mensaje: 'Like añadido', comentario });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
  
  // Eliminar like de un comentario
  exports.eliminarLike = async (req, res) => {
    try {
      const { comentarioId } = req.params;
      const { usuarioId } = req.body; // 🔥 también aquí viene del body
  
      const comentario = await Comentario.findById(comentarioId);
  
      if (!comentario) {
        return res.status(404).json({ mensaje: 'Comentario no encontrado' });
      }
  
      if (!comentario.likes.includes(usuarioId)) {
        return res.status(400).json({ mensaje: 'No has dado like a este comentario' });
      }
  
      comentario.likes = comentario.likes.filter(
        like => like.toString() !== usuarioId.toString()
      );
      await comentario.save();
  
      return res.status(200).json({ mensaje: 'Like eliminado', comentario });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
  