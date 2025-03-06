const express = require('express');
const router = express.Router();
const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorEmail,
    actualizarUsuario,
    eliminarUsuario
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

module.exports = router;
