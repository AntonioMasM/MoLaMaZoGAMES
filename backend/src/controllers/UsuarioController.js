const Usuario = require('../models/Usuario');

// Crear un usuario
const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: "El usuario ya existe" });
        }

        // Crear usuario
        const nuevoUsuario = new Usuario({ nombre, email, password });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: "Usuario creado con éxito", usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear usuario", error });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, '-password'); // Excluimos la contraseña
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios", error });
    }
};

const obtenerUsuarioPorEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const usuario = await Usuario.findOne({ email }, '-password'); // Excluimos la contraseña

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuario", error });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { email } = req.params;
        const { nombre, password } = req.body;

        const usuarioActualizado = await Usuario.findOneAndUpdate(
            { email },
            { nombre, password },
            { new: true, runValidators: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario actualizado con éxito", usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar usuario", error });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { email } = req.params;

        const usuarioEliminado = await Usuario.findOneAndDelete({ email });

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar usuario", error });
    }
};


module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorEmail,
    actualizarUsuario,
    eliminarUsuario
};
