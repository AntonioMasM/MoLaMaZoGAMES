const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/Categoria/CategoriaController');
const UsuarioController = require('../controllers/Usuario/UsuarioController');

// ---------------------------
// CRUD de categorías
// ---------------------------
router.post('/', categoriaController.crearCategoria);
router.get('/', categoriaController.obtenerCategorias);
router.get('/:id', categoriaController.obtenerCategoriaPorId);
router.put('/:id', categoriaController.actualizarCategoria);
router.delete('/:id', categoriaController.eliminarCategoria);

// ---------------------------
// Seguimiento de categorías
// ---------------------------
router.post('/:idCategoria/seguir/:idUsuario', UsuarioController.seguirCategoria);
router.delete('/:idCategoria/dejar/:idUsuario', UsuarioController.dejarCategoria);
router.get('/seguidas/:idUsuario', UsuarioController.obtenerCategoriasSeguidas);

module.exports = router;
