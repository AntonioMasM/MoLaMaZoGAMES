const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/Usuario/UsuarioController');
const SocialController = require('../controllers/Usuario/SocialController');
const AuthController = require('../controllers/Usuario/AuthController');
const { proteger } = require('../middlewares/authMiddleware'); // Middleware de autenticación


// ---------------------------
// 🔥 Rutas de Favoritos
// ---------------------------
router.post('/favoritos', proteger, SocialController.agregarFavorito);        // Añadir asset a favoritos
router.delete('/favoritos/:id', proteger, SocialController.eliminarFavorito);  // Eliminar favorito
router.get('/favoritos', proteger, SocialController.obtenerFavoritos);         // Obtener favoritos del usuario

// ---------------------------
// Ruta de búsqueda de usuarios
// ---------------------------
router.get('/buscar', UsuarioController.buscarUsuarios);

// ---------------------------
// Rutas de usuarios
// ---------------------------
router.post('/', UsuarioController.crearUsuario);
router.get('/', UsuarioController.obtenerUsuarios);
router.get('/:email', UsuarioController.obtenerUsuarioPorEmail);
router.put('/:email', UsuarioController.actualizarUsuario);
router.delete('/:email', UsuarioController.eliminarUsuario);

// ---------------------------
// Rutas de redes sociales y foto de perfil
// ---------------------------
router.put('/:email/foto', SocialController.actualizarFotoPerfil);
router.put('/:email/redes', SocialController.actualizarRedesSociales);

// ---------------------------
// Rutas de autenticación
// ---------------------------
router.post('/login', AuthController.iniciarSesion);
router.post('/logout', AuthController.cerrarSesion);
router.post('/recuperar', AuthController.solicitarRecuperacion);
router.put('/restablecer', AuthController.restablecerContrasena);
router.put('/cambiar-clave/:email', AuthController.cambiarContrasena);

// ---------------------------
// Rutas de seguimiento de usuarios
// ---------------------------
router.post('/:email/seguir', UsuarioController.seguirUsuario);
router.delete('/:email/dejar-seguir', UsuarioController.dejarDeSeguirUsuario);

// ---------------------------
// Rutas para obtener seguidores y seguidos
// ---------------------------
router.get('/:email/seguidores', UsuarioController.obtenerSeguidores);
router.get('/:email/siguiendo', UsuarioController.obtenerSiguiendo);

// ---------------------------
// Ruta para obtener usuario por nickname e ID
// ---------------------------
router.get('/perfil/:nickname', UsuarioController.obtenerUsuarioPorNickname);
router.get('/id/:id', UsuarioController.obtenerUsuarioPorId);


module.exports = router;
