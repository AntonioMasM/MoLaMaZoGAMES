const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/Usuario/UsuarioController');
const SocialController = require('../controllers/Usuario/SocialController');
const AuthController = require('../controllers/Usuario/AuthController');

// Rutas de usuarios
router.post('/', UsuarioController.crearUsuario); // Crear un nuevo usuario
router.get('/', UsuarioController.obtenerUsuarios); // Obtener todos los usuarios
router.get('/:email', UsuarioController.obtenerUsuarioPorEmail); // Obtener un usuario por email
router.put('/:email', UsuarioController.actualizarUsuario); // Actualizar información de un usuario
router.delete('/:email', UsuarioController.eliminarUsuario); // Eliminar un usuario

// Rutas de redes sociales y foto de perfil
router.put('/:email/foto', SocialController.actualizarFotoPerfil); // Actualizar foto de perfil
router.put('/:email/redes', SocialController.actualizarRedesSociales); // Actualizar redes sociales

// Rutas de autenticación
router.post('/login', AuthController.iniciarSesion); // Iniciar sesión de usuario
router.post('/logout', AuthController.cerrarSesion); // Cerrar sesión
router.post('/recuperar', AuthController.solicitarRecuperacion); // Solicitar recuperación de contraseña
router.put('/restablecer', AuthController.restablecerContrasena); // Restablecer contraseña con un token de recuperación
router.put('/cambiar-clave/:email', AuthController.cambiarContrasena); // Cambiar contraseña desde la cuenta

// Rutas de seguimiento de usuarios
router.post('/:email/seguir', UsuarioController.seguirUsuario); // Seguir a un usuario
router.delete('/:email/dejar-seguir', UsuarioController.dejarDeSeguirUsuario); // Dejar de seguir a un usuario

// Rutas para obtener seguidores y seguidos
router.get('/:email/seguidores', UsuarioController.obtenerSeguidores); // Obtener lista de seguidores
router.get('/:email/siguiendo', UsuarioController.obtenerSiguiendo); // Obtener lista de usuarios seguidos

// Ruta de búsqueda de usuarios
router.get('/buscar', UsuarioController.buscarUsuarios); // Buscar usuarios por nombre, nickname o email

// Ruta para obtener usuario por su nickname
router.get('/perfil/:nickname', UsuarioController.obtenerUsuarioPorNickname); // Obtener usuario por su nickname

module.exports = router;
