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
    try {
      console.log("Body recibido en aceptarInvitacion:", req.body);
  
      const { grupoId, usuarioId } = req.body;
  
      if (!grupoId || !usuarioId) {
        return res.status(400).json({ mensaje: "Faltan datos (grupoId o usuarioId)." });
      }
  
      // Buscar el grupo
      const grupo = await Grupo.findById(grupoId);
      if (!grupo) {
        return res.status(404).json({ mensaje: "Grupo no encontrado." });
      }
  
      // Agregar el usuario si no estaba ya
      if (!grupo.usuarios.includes(usuarioId)) {
        grupo.usuarios.push(usuarioId);
        await grupo.save();
      }
  
      res.status(200).json({ mensaje: "Te has unido al grupo exitosamente." });
    } catch (error) {
      console.error("Error en aceptarInvitacion:", error);
      res.status(500).json({ mensaje: "Error interno al aceptar invitación." });
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
