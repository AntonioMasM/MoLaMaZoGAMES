const Usuario = require('../../models/Usuario');
const Favorito = require('../../models/Favorito');

// ---------------------------
// Actualizar Redes Sociales
// ---------------------------
const actualizarRedesSociales = async (req, res) => {
  try {
    const { email } = req.params;
    const { redesSociales } = req.body;

    if (!redesSociales) {
      return res.status(400).json({ mensaje: 'Las redes sociales son obligatorias' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.redesSociales = {
      ...usuario.redesSociales,
      ...redesSociales,
    };

    await usuario.save();

    res.status(200).json({
      mensaje: 'Redes sociales actualizadas con éxito',
      redesSociales: usuario.redesSociales,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar redes sociales', error: error.message || 'Error desconocido' });
  }
};

// ---------------------------
// Actualizar Foto de Perfil
// ---------------------------
const actualizarFotoPerfil = async (req, res) => {
  try {
    const { email } = req.params;
    const { fotoPerfil } = req.body;

    if (!fotoPerfil) {
      return res.status(400).json({ mensaje: 'La URL de la foto de perfil es obligatoria' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.fotoPerfil = fotoPerfil;
    await usuario.save();

    res.status(200).json({
      mensaje: 'Foto de perfil actualizada con éxito',
      fotoPerfil: usuario.fotoPerfil,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar foto de perfil', error: error.message || 'Error desconocido' });
  }
};

// ---------------------------
// Añadir Asset a Favoritos
// ---------------------------
const agregarFavorito = async (req, res) => {
  try {
    const { assetId } = req.body;
    const usuarioId = req.usuario.id; // Deberías tener un middleware de auth que añade req.usuario

    const favorito = await Favorito.create({ usuario: usuarioId, asset: assetId });

    res.status(201).json({
      mensaje: 'Asset añadido a favoritos',
      favorito,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ mensaje: 'Este asset ya está en favoritos' });
    }
    res.status(500).json({ mensaje: 'Error al agregar favorito', error: error.message || 'Error desconocido' });
  }
};

// ---------------------------
// Eliminar Asset de Favoritos
// ---------------------------
const eliminarFavorito = async (req, res) => {
  try {
    const favoritoId = req.params.id;
    const usuarioId = req.usuario.id;

    const favorito = await Favorito.findOneAndDelete({ _id: favoritoId, usuario: usuarioId });

    if (!favorito) {
      return res.status(404).json({ mensaje: 'Favorito no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Favorito eliminado correctamente',
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar favorito', error: error.message || 'Error desconocido' });
  }
};

// ---------------------------
// Obtener Favoritos del Usuario
// ---------------------------
const obtenerFavoritos = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const favoritos = await Favorito.find({ usuario: usuarioId }).populate('asset');

    res.status(200).json({
      mensaje: 'Favoritos obtenidos correctamente',
      favoritos,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener favoritos', error: error.message || 'Error desconocido' });
  }
};

module.exports = {
  actualizarRedesSociales,
  actualizarFotoPerfil,
  agregarFavorito,
  eliminarFavorito,
  obtenerFavoritos,
};
