const Usuario = require('../models/Usuario');

// Crear un usuario
const crearUsuario = async (req, res) => {
    try {
        const { 
            nombreCompleto, 
            nickname, 
            email, 
            password, 
            ubicacion, 
            formacion, 
            cargo, 
            fotoPerfil, 
            bio, 
            redesSociales, 
            modo 
        } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: "El usuario ya existe" });
        }

        const usuarioExistenteNickname = await Usuario.findOne({ nickname });
        if (usuarioExistenteNickname) {
            return res.status(400).json({ mensaje: "El nickname ya está en uso" });
        }

        // Crear usuario con los datos proporcionados o valores por defecto
        const nuevoUsuario = new Usuario({
            nombreCompleto,
            nickname,
            email,
            password, // ⚠️ Luego se cifrará
            ubicacion: ubicacion || { pais: "", municipio: "" },
            formacion: formacion || { universidad: "", carrera: "" },
            cargo,
            fotoPerfil: fotoPerfil || "",
            bio: bio || "",
            redesSociales: redesSociales || {
                linkedin: "", artstation: "", twitter: "", instagram: ""
            },
            modo: modo || "oscuro",
            ultimoInicioSesion: null
        });

        // Guardar en la base de datos
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
        const { 
            nombreCompleto, 
            nickname, 
            password, 
            ubicacion, 
            formacion, 
            cargo, 
            fotoPerfil, 
            bio, 
            redesSociales, 
            modo 
        } = req.body;

        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Si el nickname cambia, verificar que no esté en uso
        if (nickname && nickname !== usuario.nickname) {
            const nicknameExistente = await Usuario.findOne({ nickname });
            if (nicknameExistente) {
                return res.status(400).json({ mensaje: "El nickname ya está en uso" });
            }
        }

        // Actualizar usuario con los nuevos valores
        usuario.nombreCompleto = nombreCompleto || usuario.nombreCompleto;
        usuario.nickname = nickname || usuario.nickname;
        usuario.password = password || usuario.password; // ⚠️ Luego se cifrará
        usuario.ubicacion = ubicacion || usuario.ubicacion;
        usuario.formacion = formacion || usuario.formacion;
        usuario.cargo = cargo || usuario.cargo;
        usuario.fotoPerfil = fotoPerfil || usuario.fotoPerfil;
        usuario.bio = bio || usuario.bio;
        usuario.redesSociales = redesSociales || usuario.redesSociales;
        usuario.modo = modo || usuario.modo;

        // Guardar cambios en la base de datos
        await usuario.save();

        res.json({ mensaje: "Usuario actualizado con éxito", usuario });
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
