const Usuario = require('../../models/Usuario');
const generarTokenJWT = require('../../utils/generarTokenJWT');
const crypto = require('crypto');
// Iniciar sesión
const iniciarSesion = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
  
      const passwordValida = await usuario.comparePassword(password);
      if (!passwordValida) {
        return res.status(401).json({ mensaje: "Contraseña incorrecta" });
      }
  
      const token = generarTokenJWT(usuario);
  
      // Actualizar último inicio de sesión
      usuario.ultimoInicioSesion = new Date();
      await usuario.save();
  
      res.status(200).json({
        mensaje: "Inicio de sesión exitoso",
        token,
        nickname: usuario.nickname,
        fotoPerfil: usuario.fotoPerfil,
        email: usuario.email,
        id: usuario._id,
        ultimoInicioSesion: usuario.ultimoInicioSesion,
      });
    } catch (error) {
      console.error("🔥 Error en iniciarSesion:", error);
      res.status(500).json({ mensaje: "Error en el inicio de sesión", error: error.message });
    }
  };
  
  
// Cerrar sesión (cliente gestiona el token)
const cerrarSesion = (req, res) => {
  try {
    res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cerrar sesión', error: error.message || 'Error desconocido' });
  }
};

// Solicitar recuperación de contraseña
const solicitarRecuperacion = async (req, res) => {
  try {
    const { email } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const tokenRecuperacion = crypto.randomBytes(32).toString('hex');
    usuario.tokenRecuperacion = tokenRecuperacion;
    usuario.expiracionToken = Date.now() + 3600000; // 1 hora

    await usuario.save();

    // Aquí deberías enviar email real en producción
    res.status(200).json({ mensaje: 'Token de recuperación generado', tokenRecuperacion });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al solicitar recuperación de contraseña', error: error.message || 'Error desconocido' });
  }
};

// Restablecer contraseña usando token
const restablecerContrasena = async (req, res) => {
  try {
    const { token, nuevaPassword } = req.body;

    const usuario = await Usuario.findOne({
      tokenRecuperacion: token,
      expiracionToken: { $gt: Date.now() }
    });

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Token inválido o expirado' });
    }

    usuario.password = nuevaPassword; // hash automático por pre('save')
    usuario.tokenRecuperacion = undefined;
    usuario.expiracionToken = undefined;

    await usuario.save();

    res.status(200).json({ mensaje: 'Contraseña restablecida con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al restablecer contraseña', error: error.message || 'Error desconocido' });
  }
};

// Cambiar contraseña autenticado
const cambiarContrasena = async (req, res) => {
  try {
    const { email } = req.params;
    const { passwordActual, nuevaPassword } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const passwordValida = await usuario.comparePassword(passwordActual);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Contraseña actual incorrecta' });
    }

    usuario.password = nuevaPassword; // hash automático
    await usuario.save();

    res.status(200).json({ mensaje: 'Contraseña cambiada con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cambiar contraseña', error: error.message || 'Error desconocido' });
  }
};

module.exports = {
  iniciarSesion,
  cerrarSesion,
  solicitarRecuperacion,
  restablecerContrasena,
  cambiarContrasena
};
