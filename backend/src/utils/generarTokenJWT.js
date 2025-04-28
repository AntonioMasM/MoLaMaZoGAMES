const jwt = require('jsonwebtoken');

const generarTokenJWT = (datosUsuario) => {
  return jwt.sign(
    { email: datosUsuario.email, id: datosUsuario._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = generarTokenJWT;
