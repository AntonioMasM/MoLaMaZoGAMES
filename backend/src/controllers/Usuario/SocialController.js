const Usuario = require('../../models/Usuario');

// Actualizar las redes sociales de un usuario
const actualizarRedesSociales = async (req, res) => {
    try {
        const { email } = req.params;
        const { redesSociales } = req.body;

        // Verificar si las redes sociales están presentes en la solicitud
        if (!redesSociales) {
            return res.status(400).json({ mensaje: "Las redes sociales son obligatorias" });
        }

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Actualizar las redes sociales
        usuario.redesSociales = {
            ...usuario.redesSociales,
            ...redesSociales // Solo se actualizarán los campos que se proporcionen
        };

        await usuario.save();
        res.status(200).json({ mensaje: "Redes sociales actualizadas con éxito", usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar redes sociales", error: error.message });
    }
};

// Actualizar la foto de perfil de un usuario
const actualizarFotoPerfil = async (req, res) => {
    try {
        const { email } = req.params;
        const { fotoPerfil } = req.body;

        // Verificar si la foto de perfil está presente en la solicitud
        if (!fotoPerfil) {
            return res.status(400).json({ mensaje: "La URL de la foto de perfil es obligatoria" });
        }

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Actualizar la foto de perfil
        usuario.fotoPerfil = fotoPerfil;

        await usuario.save();
        res.status(200).json({ mensaje: "Foto de perfil actualizada con éxito", usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar foto de perfil", error: error.message });
    }
};

module.exports = {
    actualizarRedesSociales,
    actualizarFotoPerfil
};
