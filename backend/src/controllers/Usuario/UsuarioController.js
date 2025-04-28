const Usuario = require('../../models/Usuario');
const { crearNotificacion } = require('../../services/crearNotificacion'); 
const mongoose = require('mongoose');

// Crear un usuario
const crearUsuario = async (req, res) => {
    try {
      const {
        nombreCompleto,
        nickname,
        email,
        password,
        ubicacion,
        formacion,
        cargo,
        fotoPerfil, // Espera { url, public_id }
        bio,
        redesSociales,
        modo,
        software,
        skills,
        intereses
      } = req.body;
  
      if (await Usuario.findOne({ email })) {
        return res.status(400).json({ mensaje: 'El usuario ya existe' });
      }
  
      if (await Usuario.findOne({ nickname })) {
        return res.status(400).json({ mensaje: 'El nickname ya está en uso' });
      }
  
      const nuevoUsuario = new Usuario({
        nombreCompleto,
        nickname,
        email,
        password,
        ubicacion: ubicacion || { pais: '', municipio: '' },
        formacion: formacion || { universidad: '', carrera: '' },
        cargo,
        fotoPerfil: fotoPerfil || { secure_url: '/assets/users/default-avatar.png', public_id: '' }, // 👈
        bio: bio || '',
        redesSociales: redesSociales || { linkedin: '', artstation: '', twitter: '', instagram: '' },
        modo: modo || 'dark',
        software: software || [],
        skills: skills || [],
        intereses: intereses || []
      });
  
      await nuevoUsuario.save();
  
      res.status(201).json({ mensaje: 'Usuario creado con éxito', id: nuevoUsuario._id });
    } catch (error) {
      console.error("🔥 Error en crearUsuario:", error);
      res.status(500).json({ mensaje: 'Error al crear usuario', error: error.message || 'Error desconocido' });
    }
  };

// Obtener todos los usuarios (sin contraseñas)
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-password').lean();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message || 'Error desconocido' });
  }
};

// Obtener un usuario por email
const obtenerUsuarioPorEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const usuario = await Usuario.findOne({ email }, '-password').lean();
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error: error.message || 'Error desconocido' });
  }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
    try {
      const { email } = req.params;
      const {
        nombreCompleto,
        nickname,
        password,
        ubicacion,
        formacion,
        cargo,
        fotoPerfil, // { url, public_id }
        bio,
        redesSociales,
        modo,
        software,
        skills,
        intereses
      } = req.body;
  
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      if (nickname && nickname !== usuario.nickname) {
        const nicknameExistente = await Usuario.findOne({ nickname });
        if (nicknameExistente) {
          return res.status(400).json({ mensaje: 'El nickname ya está en uso' });
        }
      }
  
      if (password) usuario.password = password; // Hasheado automático
      if (nombreCompleto) usuario.nombreCompleto = nombreCompleto;
      if (nickname) usuario.nickname = nickname;
      if (ubicacion) usuario.ubicacion = ubicacion;
      if (formacion) usuario.formacion = formacion;
      if (cargo) usuario.cargo = cargo;
      if (fotoPerfil) usuario.fotoPerfil = {
           public_id: fotoPerfil.public_id || usuario.fotoPerfil.public_id || '',
           secure_url: fotoPerfil.secure_url || usuario.fotoPerfil.secure_url || '/assets/users/default-avatar.png',
         };
      if (bio) usuario.bio = bio;
      if (redesSociales) usuario.redesSociales = redesSociales;
      if (modo) usuario.modo = modo;
      if (software) usuario.software = software;
      if (skills) usuario.skills = skills;
      if (intereses) usuario.intereses = intereses;
  
      await usuario.save();
  
      res.status(200).json({ mensaje: 'Usuario actualizado con éxito' });
    } catch (error) {
      console.error("🔥 Error en actualizarUsuario:", error);
      res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message || 'Error desconocido' });
    }
  };

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  try {
    const { email } = req.params;
    const usuarioEliminado = await Usuario.findOneAndDelete({ email });
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message || 'Error desconocido' });
  }
};

// Funciones de social (seguir, dejar de seguir, etc.) igual pero actualizadas a mejor claridad:
const seguirUsuario = async (req, res) => {
    try {
      const { email } = req.params; // usuario que quiero seguir
      const { seguidorEmail } = req.body; // yo que sigo
  
      const usuarioSeguido = await Usuario.findOne({ email });
      const usuarioSeguidor = await Usuario.findOne({ email: seguidorEmail });
  
      if (!usuarioSeguido || !usuarioSeguidor) {
        return res.status(404).json({ mensaje: 'Uno o ambos usuarios no existen' });
      }
  
      if (usuarioSeguido._id.equals(usuarioSeguidor._id)) {
        return res.status(400).json({ mensaje: 'No puedes seguirte a ti mismo' });
      }
  
      if (usuarioSeguido.seguidores.includes(usuarioSeguidor._id)) {
        return res.status(400).json({ mensaje: 'Ya sigues a este usuario' });
      }
  
      usuarioSeguido.seguidores.push(usuarioSeguidor._id);
      usuarioSeguidor.siguiendo.push(usuarioSeguido._id);
  
      await usuarioSeguido.save();
      await usuarioSeguidor.save();
  
      // 🔥 Crear notificación automática de seguimiento
      await crearNotificacion({
        usuarioId: usuarioSeguido._id,
        tipo: "seguimiento",
        contenido: `${usuarioSeguidor.nickname} ha comenzado a seguirte.`,
        referencia: usuarioSeguidor.email,  // ✅ PASAMOS EMAIL, no ID
        tipoReferencia: "Usuario"
      });
  
      res.status(200).json({ mensaje: `Ahora sigues a ${email}` });
  
    } catch (error) {
      console.error("🔥 Error en seguirUsuario:", error);
      res.status(500).json({ mensaje: 'Error al seguir usuario', error: error.message || 'Error desconocido' });
    }
  };

const dejarDeSeguirUsuario = async (req, res) => {
  try {
    const { email } = req.params;
    const { seguidorEmail } = req.body;

    const usuarioSeguido = await Usuario.findOne({ email });
    const usuarioSeguidor = await Usuario.findOne({ email: seguidorEmail });

    if (!usuarioSeguido || !usuarioSeguidor) {
      return res.status(404).json({ mensaje: 'Uno o ambos usuarios no existen' });
    }

    usuarioSeguido.seguidores = usuarioSeguido.seguidores.filter(id => !id.equals(usuarioSeguidor._id));
    usuarioSeguidor.siguiendo = usuarioSeguidor.siguiendo.filter(id => !id.equals(usuarioSeguido._id));

    await usuarioSeguido.save();
    await usuarioSeguidor.save();

    res.status(200).json({ mensaje: `Has dejado de seguir a ${email}` });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al dejar de seguir usuario', error: error.message || 'Error desconocido' });
  }
};

const obtenerSeguidores = async (req, res) => {
  try {
    const { email } = req.params;
    const usuario = await Usuario.findOne({ email }, 'seguidores').lean();
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({ seguidores: usuario.seguidores });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener seguidores', error: error.message || 'Error desconocido' });
  }
};

// Controlador en el backend (UsuarioController.js)
const obtenerSiguiendo = async (req, res) => {
    try {
      const { email } = req.params;
  
      const usuario = await Usuario.findOne({ email })
        .populate('siguiendo', '_id email nickname fotoPerfil');
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      res.status(200).json({ siguiendo: usuario.siguiendo });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener usuarios seguidos', error: error.message });
    }
  };
  

const buscarUsuarios = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ mensaje: 'El parámetro de búsqueda es obligatorio' });
    }

    const usuarios = await Usuario.find({
      $or: [
        { nombreCompleto: { $regex: q, $options: 'i' } },
        { nickname: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    })
    .select('nombreCompleto nickname email cargo fotoPerfil')
    .lean();

    if (usuarios.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron usuarios con ese criterio de búsqueda' });
    }

    res.status(200).json({ resultados: usuarios });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar usuarios', error: error.message || 'Error desconocido' });
  }
};

const obtenerUsuarioPorNickname = async (req, res) => {
  try {
    const { nickname } = req.params;
    const usuario = await Usuario.findOne({ nickname }).select('-password').lean();
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error: error.message || 'Error desconocido' });
  }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
      const { id } = req.params;
  
      // 🔥 Validar que sea un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ mensaje: "ID de usuario inválido" });
      }
  
      const usuario = await Usuario.findById(id).select('-password').lean();
  
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
  
      res.status(200).json(usuario);
  
    } catch (error) {
      console.error("🔥 Error en obtenerUsuarioPorId:", error);
      res.status(500).json({ mensaje: 'Error al obtener usuario por ID', error: error.message || 'Error desconocido' });
    }
  };
  
module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorEmail,
  actualizarUsuario,
  eliminarUsuario,
  seguirUsuario,
  dejarDeSeguirUsuario,
  obtenerSeguidores,
  obtenerSiguiendo,
  buscarUsuarios,
  obtenerUsuarioPorNickname,
  obtenerUsuarioPorId,
};
