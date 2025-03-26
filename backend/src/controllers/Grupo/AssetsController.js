const Grupo = require('../../models/Grupo');

// Agregar un asset al grupo
exports.agregarAssetAlGrupo = async (req, res) => {
    const { grupoId, assetId } = req.body;

    try {
        const grupo = await Grupo.findById(grupoId);
        if (!grupo) return res.status(404).json({ message: 'Grupo no encontrado' });

        grupo.assets.push(assetId);
        await grupo.save();

        return res.status(200).json({ message: 'Asset agregado al grupo con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al agregar el asset al grupo', error });
    }
};

// Eliminar un asset del grupo
exports.eliminarAssetDelGrupo = async (req, res) => {
    const { grupoId, assetId } = req.body;

    try {
        const grupo = await Grupo.findById(grupoId);
        if (!grupo) return res.status(404).json({ message: 'Grupo no encontrado' });

        grupo.assets.pull(assetId);
        await grupo.save();

        return res.status(200).json({ message: 'Asset eliminado del grupo con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el asset del grupo', error });
    }
};
