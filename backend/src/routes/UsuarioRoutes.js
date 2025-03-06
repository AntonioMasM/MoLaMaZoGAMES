const express = require('express');
const router = express.Router();
const {
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
    actualizarFotoPerfil,
    actualizarBio,
    actualizarRedesSociales,
    actualizarModoVisual,
    iniciarSesion,
    cerrarSesion,
    solicitarRecuperacion,
    restablecerContrasena,
    cambiarContrasena,
} = require('../controllers/UsuarioController');

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreCompleto
 *               - nickname
 *               - email
 *               - password
 *               - cargo
 *             properties:
 *               nombreCompleto:
 *                 type: string
 *                 example: "Juan Pérez"
 *               nickname:
 *                 type: string
 *                 example: "juanperez"
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               cargo:
 *                 type: string
 *                 example: "Diseñador Senior"
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       400:
 *         description: El usuario ya existe
 *       500:
 *         description: Error en el servidor
 */
router.post('/', crearUsuario);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       500:
 *         description: Error en el servidor
 */
router.get('/', obtenerUsuarios);

/**
 * @swagger
 * /api/usuarios/{email}:
 *   get:
 *     summary: Obtener un usuario por email
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "juan@example.com"
 *     responses:
 *       200:
 *         description: Usuario encontrado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:email', obtenerUsuarioPorEmail);

/**
 * @swagger
 * /api/usuarios/{email}:
 *   put:
 *     summary: Actualizar información de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "juan@example.com"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCompleto:
 *                 type: string
 *                 example: "Juan Pérez Modificado"
 *               nickname:
 *                 type: string
 *                 example: "juanperez2"
 *               cargo:
 *                 type: string
 *                 example: "Director de Arte"
 *               modo:
 *                 type: string
 *                 enum: ["claro", "oscuro", "texto grande"]
 *                 example: "claro"
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:email', actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{email}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "juan@example.com"
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:email', eliminarUsuario);


/**
 * @swagger
 * /api/usuarios/{email}/seguir:
 *   post:
 *     summary: Seguir a otro usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "usuarioSeguido@example.com"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seguidorEmail
 *             properties:
 *               seguidorEmail:
 *                 type: string
 *                 example: "usuarioSeguidor@example.com"
 *     responses:
 *       200:
 *         description: Ahora sigues a este usuario
 *       400:
 *         description: Ya sigues a este usuario
 *       404:
 *         description: Uno o ambos usuarios no existen
 */
router.post('/:email/seguir', seguirUsuario);

/**
 * @swagger
 * /api/usuarios/{email}/dejar-seguir:
 *   delete:
 *     summary: Dejar de seguir a un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "usuarioSeguido@example.com"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seguidorEmail
 *             properties:
 *               seguidorEmail:
 *                 type: string
 *                 example: "usuarioSeguidor@example.com"
 *     responses:
 *       200:
 *         description: Has dejado de seguir a este usuario
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:email/dejar-seguir', dejarDeSeguirUsuario);

/**
 * @swagger
 * /api/usuarios/{email}/seguidores:
 *   get:
 *     summary: Obtener lista de seguidores de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "usuario@example.com"
 *     responses:
 *       200:
 *         description: Lista de seguidores obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 seguidores:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["seguidor1@example.com", "seguidor2@example.com"]
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:email/seguidores', obtenerSeguidores);
/**
 * @swagger
 * /api/usuarios/{email}/siguiendo:
 *   get:
 *     summary: Obtener lista de usuarios que sigue un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "usuario@example.com"
 *     responses:
 *       200:
 *         description: Lista de usuarios seguidos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 siguiendo:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["usuario1@example.com", "usuario2@example.com"]
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:email/siguiendo', obtenerSiguiendo);


/**
 * @swagger
 * /api/usuarios/buscar:
 *   get:
 *     summary: Buscar usuarios por nombre, nickname o email
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         example: "juan"
 *     responses:
 *       200:
 *         description: Lista de usuarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombreCompleto:
 *                         type: string
 *                         example: "Juan Pérez"
 *                       nickname:
 *                         type: string
 *                         example: "juanperez"
 *                       email:
 *                         type: string
 *                         example: "juan@example.com"
 *       400:
 *         description: El parámetro de búsqueda es obligatorio
 *       500:
 *         description: Error en el servidor
 */
router.get('/buscar', buscarUsuarios);

/**
 * @swagger
 * /api/usuarios/perfil/{nickname}:
 *   get:
 *     summary: Obtener un usuario por su nickname
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: nickname
 *         required: true
 *         schema:
 *           type: string
 *         example: "juanperez"
 *     responses:
 *       200:
 *         description: Información del usuario obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombreCompleto:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 nickname:
 *                   type: string
 *                   example: "juanperez"
 *                 email:
 *                   type: string
 *                   example: "juan@example.com"
 *                 cargo:
 *                   type: string
 *                   example: "Diseñador Senior"
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/perfil/:nickname', obtenerUsuarioPorNickname);

/**
 * @swagger
 * /api/usuarios/{email}/foto:
 *   put:
 *     summary: Actualizar la foto de perfil de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "usuario@example.com"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fotoPerfil:
 *                 type: string
 *                 example: "https://ejemplo.com/foto.jpg"
 *     responses:
 *       200:
 *         description: Foto de perfil actualizada con éxito
 *       400:
 *         description: La URL de la foto de perfil es obligatoria
 *       404:
 *         description: Usuario no encontrado
 */

router.put('/:email/foto', actualizarFotoPerfil);
/**
 * @swagger
 * /api/usuarios/{email}/bio:
 *   put:
 *     summary: Actualizar la bio de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "usuario@example.com"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 example: "Soy un diseñador con 10 años de experiencia en la industria"
 *     responses:
 *       200:
 *         description: Bio actualizada con éxito
 *       400:
 *         description: La bio no puede estar vacía o exceder 300 caracteres
 *       404:
 *         description: Usuario no encontrado
 */

router.put('/:email/bio', actualizarBio);

/**
 * @swagger
 * /api/usuarios/{email}/redes:
 *   put:
 *     summary: Actualizar las redes sociales de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "usuario@example.com"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               redesSociales:
 *                 type: object
 *                 properties:
 *                   linkedin:
 *                     type: string
 *                     example: "https://www.linkedin.com/in/usuario"
 *                   artstation:
 *                     type: string
 *                     example: "https://www.artstation.com/usuario"
 *                   twitter:
 *                     type: string
 *                     example: "https://twitter.com/usuario"
 *                   instagram:
 *                     type: string
 *                     example: "https://instagram.com/usuario"
 *     responses:
 *       200:
 *         description: Redes sociales actualizadas con éxito
 *       400:
 *         description: Las redes sociales son obligatorias
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:email/redes', actualizarRedesSociales);


/**
 * @swagger
 * /api/usuarios/{email}/modo:
 *   put:
 *     summary: Actualizar el modo visual de la aplicación
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "usuario@example.com"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modo:
 *                 type: string
 *                 enum: ["claro", "oscuro", "texto grande"]
 *                 example: "oscuro"
 *     responses:
 *       200:
 *         description: Modo visual actualizado con éxito
 *       400:
 *         description: Modo visual no válido (claro, oscuro o texto grande). 
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:email/modo', actualizarModoVisual);


/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 example: "contraseña123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve un token JWT
 *       401:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post('/login', iniciarSesion);



/**
 * @swagger
 * /api/usuarios/logout:
 *   post:
 *     summary: Cerrar sesión de usuario
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 *       500:
 *         description: Error al cerrar sesión
 */
router.post('/logout', cerrarSesion);


/**
 * @swagger
 * /api/usuarios/recuperar:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *     responses:
 *       200:
 *         description: Token de recuperación generado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post('/recuperar', solicitarRecuperacion);

/**
 * @swagger
 * /api/usuarios/restablecer:
 *   put:
 *     summary: Restablecer contraseña con un token de recuperación
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - nuevaPassword
 *             properties:
 *               token:
 *                 type: string
 *                 example: "abc123xyz456"
 *               nuevaPassword:
 *                 type: string
 *                 example: "nuevaContraseña123"
 *     responses:
 *       200:
 *         description: Contraseña restablecida con éxito
 *       400:
 *         description: Token inválido o expirado
 *       500:
 *         description: Error en el servidor
 */
router.put('/restablecer', restablecerContrasena);


/**
 * @swagger
 * /api/usuarios/cambiar-clave/{email}:
 *   put:
 *     summary: Cambiar contraseña desde la cuenta (requiere contraseña actual)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "usuario@example.com"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - passwordActual
 *               - nuevaPassword
 *             properties:
 *               passwordActual:
 *                 type: string
 *                 example: "contraseñaAntigua123"
 *               nuevaPassword:
 *                 type: string
 *                 example: "nuevaContraseña456"
 *     responses:
 *       200:
 *         description: Contraseña cambiada con éxito
 *       401:
 *         description: Contraseña actual incorrecta
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/cambiar-clave/:email', cambiarContrasena);

module.exports = router;
