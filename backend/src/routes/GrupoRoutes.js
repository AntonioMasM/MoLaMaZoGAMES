const express = require('express');
const router = express.Router();
const GrupoController = require('../controllers/Grupo/GrupoController');
const InvitacionesController = require('../controllers/Grupo/InvitacionesController');
const AssetsController = require('../controllers/Grupo/AssetsController');

// Rutas para el Grupo de Trabajo
router.post('/', GrupoController.crearGrupo); // Crear un grupo
router.get('/:id', GrupoController.verGrupo); // Ver un grupo
router.put('/:id', GrupoController.actualizarGrupo); // Actualizar grupo
router.delete('/:id', GrupoController.eliminarGrupo); // Eliminar un grupo

// Rutas para Invitaciones
router.post('/invitar', InvitacionesController.invitarUsuarioAlGrupo); // Invitar un usuario
router.put('/aceptar', InvitacionesController.aceptarInvitacion); // Aceptar invitación
router.put('/rechazar', InvitacionesController.rechazarInvitacion); // Rechazar invitación

// Rutas para Assets
router.post('/assets', AssetsController.agregarAssetAlGrupo); // Agregar asset al grupo
router.delete('/assets', AssetsController.eliminarAssetDelGrupo); // Eliminar asset del grupo

module.exports = router;
