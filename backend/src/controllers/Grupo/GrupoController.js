const Grupo = require('../../models/Grupo');

// Crear un nuevo grupo de trabajo
exports.crearGrupo = async (req, res) => {
    const { titulo, descripcion, usuarios, creador } = req.body;

    try {
        const nuevoGrupo = new Grupo({
            titulo,
            descripcion,
            usuarios,
            creador
        });

        await nuevoGrupo.save();
        return res.status(201).json(nuevoGrupo);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el grupo', error });
    }
};

// Ver la información de un grupo
exports.verGrupo = async (req, res) => {
    const { id } = req.params;

    try {
        const grupo = await Grupo.findById(id)
            .populate('usuarios assets creador')
            .exec();

        if (!grupo) {
            return res.status(404).json({ message: 'Grupo no encontrado' });
        }

        return res.status(200).json(grupo);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el grupo', error });
    }
};

// Actualizar la información de un grupo (título, descripción)
exports.actualizarGrupo = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    try {
        const grupo = await Grupo.findByIdAndUpdate(id, { titulo, descripcion }, { new: true });
        if (!grupo) return res.status(404).json({ message: 'Grupo no encontrado' });

        return res.status(200).json(grupo);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el grupo', error });
    }
};

// Eliminar un grupo de trabajo
exports.eliminarGrupo = async (req, res) => {
    const { id } = req.params;

    try {
        const grupo = await Grupo.findByIdAndDelete(id);
        if (!grupo) return res.status(404).json({ message: 'Grupo no encontrado' });

        return res.status(200).json({ message: 'Grupo eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el grupo', error });
    }
};

exports.obtenerGruposPorUsuario = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const grupos = await Grupo.find({ usuarios: userId })
        .populate('usuarios creador assets')
        .exec();
  
      return res.status(200).json(grupos);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener grupos del usuario', error });
    }
  };
  