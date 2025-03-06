const express = require('express');
const router = express.Router();
const {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorEmail,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/UsuarioController');

router.post('/', crearUsuario);
router.get('/', obtenerUsuarios);
router.get('/:email', obtenerUsuarioPorEmail);
router.put('/:email', actualizarUsuario);
router.delete('/:email', eliminarUsuario);

module.exports = router;
