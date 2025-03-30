const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/Categoria/CategoriaController');

// Crear nueva categoría
router.post('/', categoriaController.crearCategoria);

// Obtener todas las categorías
router.get('/', categoriaController.obtenerCategorias);

// Obtener una categoría por ID
router.get('/:id', categoriaController.obtenerCategoriaPorId);

// Actualizar una categoría
router.put('/:id', categoriaController.actualizarCategoria);

// Eliminar una categoría
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
