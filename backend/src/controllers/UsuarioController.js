const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// CRUD BÁSICOS -------------------------------------------------------------------

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


// SEGUIMIENTO DE USUARIOS --------------------------------------------------------------------------------------------
const seguirUsuario = async (req, res) => {
    try {
        const { email } = req.params; // Usuario al que se quiere seguir
        const { seguidorEmail } = req.body; // Usuario que está siguiendo

        // Verificar que ambos usuarios existen
        const usuarioSeguido = await Usuario.findOne({ email });
        const usuarioSeguidor = await Usuario.findOne({ email: seguidorEmail });

        if (!usuarioSeguido || !usuarioSeguidor) {
            return res.status(404).json({ mensaje: "Uno o ambos usuarios no existen" });
        }

        // Evitar que un usuario se siga a sí mismo
        if (email === seguidorEmail) {
            return res.status(400).json({ mensaje: "No puedes seguirte a ti mismo" });
        }

        // Verificar si ya lo sigue
        if (usuarioSeguido.seguidores.includes(seguidorEmail)) {
            return res.status(400).json({ mensaje: "Ya sigues a este usuario" });
        }

        // Agregar a las listas de seguidores y seguidos
        usuarioSeguido.seguidores.push(seguidorEmail);
        usuarioSeguidor.siguiendo.push(email);

        // Guardar cambios
        await usuarioSeguido.save();
        await usuarioSeguidor.save();

        res.status(200).json({ mensaje: `Ahora sigues a ${email}` });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al seguir usuario", error });
    }
};


const dejarDeSeguirUsuario = async (req, res) => {
    try {
        const { email } = req.params; // Usuario al que se dejará de seguir
        const { seguidorEmail } = req.body; // Usuario que deja de seguir

        // Verificar que ambos usuarios existen
        const usuarioSeguido = await Usuario.findOne({ email });
        const usuarioSeguidor = await Usuario.findOne({ email: seguidorEmail });

        if (!usuarioSeguido || !usuarioSeguidor) {
            return res.status(404).json({ mensaje: "Uno o ambos usuarios no existen" });
        }

        // Verificar si realmente lo sigue
        if (!usuarioSeguido.seguidores.includes(seguidorEmail)) {
            return res.status(400).json({ mensaje: "No sigues a este usuario" });
        }

        // Eliminar de las listas de seguidores y seguidos
        usuarioSeguido.seguidores = usuarioSeguido.seguidores.filter(user => user !== seguidorEmail);
        usuarioSeguidor.siguiendo = usuarioSeguidor.siguiendo.filter(user => user !== email);

        // Guardar cambios
        await usuarioSeguido.save();
        await usuarioSeguidor.save();

        res.status(200).json({ mensaje: `Has dejado de seguir a ${email}` });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al dejar de seguir usuario", error });
    }
};


const obtenerSeguidores = async (req, res) => {
    try {
        const { email } = req.params;

        const usuario = await Usuario.findOne({ email }, 'seguidores');
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ seguidores: usuario.seguidores });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener seguidores", error });
    }
};


const obtenerSiguiendo = async (req, res) => {
    try {
        const { email } = req.params;

        const usuario = await Usuario.findOne({ email }, 'siguiendo');
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ siguiendo: usuario.siguiendo });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios seguidos", error });
    }
};


// BÚSQUEDA DE USUARIOS ---------------------------------------------------------------------------------------


// CORREGIR
const buscarUsuarios = async (req, res) => {
    try {
        const { q } = req.query; // Texto de búsqueda

        if (!q) {
            return res.status(400).json({ mensaje: "El parámetro de búsqueda es obligatorio" });
        }

        // Búsqueda por nombre, nickname o email (insensible a mayúsculas y minúsculas)
        const usuarios = await Usuario.find({
            $or: [
                { nombreCompleto: { $regex: q, $options: "i" } },
                { nickname: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } }
            ]
        })
        .select("nombreCompleto nickname email cargo fotoPerfil") // Devuelve solo los campos necesarios
        .lean(); // Optimiza la consulta

        if (usuarios.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron usuarios con ese criterio de búsqueda" });
        }

        res.status(200).json({ resultados: usuarios });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar usuarios", error });
    }
};


const obtenerUsuarioPorNickname = async (req, res) => {
    try {
        const { nickname } = req.params;

        const usuario = await Usuario.findOne({ nickname }).select("-password"); // Excluimos la contraseña

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuario", error });
    }
};


// ACTUALIZACIÓN DE CAMPOS -----------------------------------------------------------------------------------------------------

const actualizarFotoPerfil = async (req, res) => {
    try {
        const { email } = req.params;
        const { fotoPerfil } = req.body;

        if (!fotoPerfil) {
            return res.status(400).json({ mensaje: "La URL de la foto de perfil es obligatoria" });
        }

        const usuario = await Usuario.findOneAndUpdate(
            { email },
            { fotoPerfil },
            { new: true }
        ).select("nombreCompleto nickname email fotoPerfil");

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: "Foto de perfil actualizada con éxito", usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar foto de perfil", error });
    }
};


const actualizarBio = async (req, res) => {
    try {
        const { email } = req.params;
        const { bio } = req.body;

        if (!bio) {
            return res.status(400).json({ mensaje: "La bio no puede estar vacía" });
        }

        if (bio.length > 300) {
            return res.status(400).json({ mensaje: "La bio no puede exceder los 300 caracteres" });
        }

        const usuario = await Usuario.findOneAndUpdate(
            { email },
            { bio },
            { new: true }
        ).select("nombreCompleto nickname email bio");

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: "Bio actualizada con éxito", usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar bio", error });
    }
};


const actualizarRedesSociales = async (req, res) => {
    try {
        const { email } = req.params;
        const { redesSociales } = req.body;

        if (!redesSociales) {
            return res.status(400).json({ mensaje: "Las redes sociales son obligatorias" });
        }

        const usuario = await Usuario.findOneAndUpdate(
            { email },
            { redesSociales },
            { new: true }
        ).select("nombreCompleto nickname email redesSociales");

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: "Redes sociales actualizadas con éxito", usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar redes sociales", error });
    }
};


const actualizarModoVisual = async (req, res) => {
    try {
        const { email } = req.params;
        const { modo } = req.body;

        const modosValidos = ["claro", "oscuro", "texto grande"];
        if (!modosValidos.includes(modo)) {
            return res.status(400).json({ mensaje: "Modo visual no válido. Opciones: claro, oscuro, texto grande" });
        }

        const usuario = await Usuario.findOneAndUpdate(
            { email },
            { modo },
            { new: true }
        ).select("nombreCompleto nickname email modo");

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: "Modo visual actualizado con éxito", usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar modo visual", error });
    }
};



// ASPECTOS DEL USUARIO --------------------------------------------------------------------------------------------------------------------------


const iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Comparar la contraseña con la almacenada en la BD
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // Generar el token JWT
        const token = jwt.sign({ email: usuario.email, id: usuario._id }, process.env.JWT_SECRET, {
            expiresIn: "7d" // El token expira en 7 días
        });

        res.status(200).json({ mensaje: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el inicio de sesión", error });
    }
};


const cerrarSesion = (req, res) => {
    try {
        res.status(200).json({ mensaje: "Sesión cerrada correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al cerrar sesión", error });
    }
};

const crypto = require('crypto');

const solicitarRecuperacion = async (req, res) => {
    try {
        const { email } = req.body;

        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Generar un token de recuperación
        const tokenRecuperacion = crypto.randomBytes(32).toString("hex");
        usuario.tokenRecuperacion = tokenRecuperacion;
        usuario.expiracionToken = Date.now() + 3600000; // 1 hora de validez

        await usuario.save();

        // Enviar el token al usuario (ej. por correo, pero aquí solo lo devolvemos como prueba)
        res.status(200).json({ mensaje: "Token de recuperación generado", tokenRecuperacion });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al solicitar recuperación de contraseña", error });
    }
};

const restablecerContrasena = async (req, res) => {
    try {
        const { token, nuevaPassword } = req.body;

        // Buscar usuario con el token válido y dentro del tiempo de expiración
        const usuario = await Usuario.findOne({
            tokenRecuperacion: token,
            expiracionToken: { $gt: Date.now() }
        });

        if (!usuario) {
            return res.status(400).json({ mensaje: "Token inválido o expirado" });
        }

        // Cifrar la nueva contraseña y guardarla
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(nuevaPassword, salt);
        usuario.tokenRecuperacion = undefined;
        usuario.expiracionToken = undefined;

        await usuario.save();
        res.status(200).json({ mensaje: "Contraseña restablecida con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al restablecer contraseña", error });
    }
};

const cambiarContrasena = async (req, res) => {
    try {
        const { email } = req.params;
        const { passwordActual, nuevaPassword } = req.body;

        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Verificar la contraseña actual
        const passwordValida = await bcrypt.compare(passwordActual, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: "Contraseña actual incorrecta" });
        }

        // Cifrar la nueva contraseña y guardarla
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(nuevaPassword, salt);

        await usuario.save();
        res.status(200).json({ mensaje: "Contraseña cambiada con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al cambiar contraseña", error });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorEmail,
    actualizarUsuario,
    eliminarUsuario,
    obtenerSeguidores,
    obtenerSiguiendo,
    seguirUsuario,
    dejarDeSeguirUsuario,
    buscarUsuarios,
    obtenerUsuarioPorNickname,
    actualizarFotoPerfil,
    actualizarBio,
    actualizarRedesSociales,
    actualizarModoVisual,
    iniciarSesion,
    cerrarSesion,
    solicitarRecuperacion,
    restablecerContrasena,
    cambiarContrasena,
};
