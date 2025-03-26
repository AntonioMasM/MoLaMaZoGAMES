const Grupo = require('../../models/Grupo');

// Invitar un usuario a un grupo
exports.invitarUsuarioAlGrupo = async (req, res) => {
    const { grupoId, usuarioId } = req.body;

    try {
        const grupo = await Grupo.findById(grupoId);
        if (!grupo) return res.status(404).json({ message: 'Grupo no encontrado' });

        // Agregar el usuario a las invitaciones pendientes
        grupo.invitacionesPendientes.push(usuarioId);
        await grupo.save();

        return res.status(200).json({ message: 'Invitación enviada con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al invitar al usuario', error });
    }
};

// Aceptar invitación de un usuario
exports.aceptarInvitacion = async (req, res) => {
    const { grupoId, usuarioId } = req.body;

    try {
        const grupo = await Grupo.findById(grupoId);
        if (!grupo) return res.status(404).json({ message: 'Grupo no encontrado' });

        // Eliminar el usuario de invitacionesPendientes y agregarlo a usuarios
        grupo.invitacionesPendientes.pull(usuarioId);
        grupo.usuarios.push(usuarioId);
        await grupo.save();

        return res.status(200).json({ message: 'Invitación aceptada con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al aceptar la invitación', error });
    }
};

// Rechazar invitación de un usuario
exports.rechazarInvitacion = async (req, res) => {
    const { grupoId, usuarioId } = req.body;

    try {
        const grupo = await Grupo.findById(grupoId);
        if (!grupo) return res.status(404).json({ message: 'Grupo no encontrado' });

        // Eliminar el usuario de invitacionesPendientes
        grupo.invitacionesPendientes.pull(usuarioId);
        await grupo.save();

        return res.status(200).json({ message: 'Invitación rechazada con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al rechazar la invitación', error });
    }
};
