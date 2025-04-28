const express = require('express');
const router = express.Router();
const GrupoController = require('../controllers/Grupo/GrupoController');
const InvitacionesController = require('../controllers/Grupo/InvitacionesController');
const AssetsController = require('../controllers/Grupo/AssetsController');

// Rutas para Invitaciones
router.post('/invitar', InvitacionesController.invitarUsuarioAlGrupo);
router.put('/aceptar', InvitacionesController.aceptarInvitacion);
router.put('/rechazar', InvitacionesController.rechazarInvitacion);


// Rutas para el Grupo de Trabajo
router.post('/', GrupoController.crearGrupo); // Crear un grupo
router.get('/usuario/:userId', GrupoController.obtenerGruposPorUsuario); // ✅ primero específica
router.get('/:id', GrupoController.verGrupo); // luego general
router.put('/:id', GrupoController.actualizarGrupo);
router.delete('/:id', GrupoController.eliminarGrupo);


// Rutas para Assets
router.post('/assets', AssetsController.agregarAssetAlGrupo);
router.delete('/assets', AssetsController.eliminarAssetDelGrupo);

module.exports = router;
