const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const proteger = async (req, res, next) => {
  let token;

  // El token debe venir en Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar al usuario por ID decodificado, pero excluyendo el password
      const usuario = await Usuario.findById(decoded.id).select('-password');

      if (!usuario) {
        return res.status(401).json({ mensaje: 'Usuario no encontrado' });
      }

      req.usuario = usuario; // Inyectamos el usuario en la request
      next();
    } catch (error) {
      console.error('Error en proteger middleware:', error);
      return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
  }

  if (!token) {
    return res.status(401).json({ mensaje: 'No autorizado, falta token' });
  }
};

module.exports = { proteger };
