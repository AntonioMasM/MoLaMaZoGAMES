const Usuario = require('../../models/Usuario');
const bcrypt = require('bcryptjs');

// Crear un usuario
const crearUsuario = async (req, res) => {
    try {
        const { nombreCompleto, nickname, email, password, ubicacion, formacion, cargo, fotoPerfil, bio, redesSociales, modo, software, skills, intereses } = req.body;

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
            fotoPerfil: fotoPerfil || "assets/default-user.webp",
            bio: bio || "",
            redesSociales: redesSociales || {
                linkedin: "", artstation: "", twitter: "", instagram: ""
            },
            modo: modo || "oscuro",
            ultimoInicioSesion: null,
            software: software || [],
            skills: skills || [],
            intereses: intereses || [],
            
        });

        // Cifrar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Verificar el valor del hash antes de guardar
        console.log("Password Hashed:", hashedPassword);  // Aquí verás el hash generado

        nuevoUsuario.password = hashedPassword; // Asigna el hash generado al campo de la contraseña
        await nuevoUsuario.save(); // Guarda el usuario con el hash de la contraseña


        res.status(201).json({ mensaje: "Usuario creado con éxito", usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear usuario", error: error.message });
    }
};

// Obtener todos los usuarios (sin contraseña)
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, '-password'); // Excluimos la contraseña
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios", error: error.message });
    }
};

// Obtener un usuario por email (sin contraseña)
const obtenerUsuarioPorEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const usuario = await Usuario.findOne({ email }, '-password'); // Excluimos la contraseña

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuario", error: error.message });
    }
};

// Actualizar un usuario por email
const actualizarUsuario = async (req, res) => {
    try {
        const { email } = req.params;
        const { nombreCompleto, nickname, password, ubicacion, formacion, cargo, fotoPerfil, bio, redesSociales, modo, software, skills, intereses } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Verificar si el nickname está siendo modificado
        if (nickname && nickname !== usuario.nickname) {
            const nicknameExistente = await Usuario.findOne({ nickname });
            if (nicknameExistente) {
                return res.status(400).json({ mensaje: "El nickname ya está en uso" });
            }
        }

        // Si la contraseña se actualiza, cifrarla
        if (password) {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(password, salt);
        }

        // Actualizar usuario con los nuevos valores
        usuario.nombreCompleto = nombreCompleto || usuario.nombreCompleto;
        usuario.nickname = nickname || usuario.nickname;
        usuario.ubicacion = ubicacion || usuario.ubicacion;
        usuario.formacion = formacion || usuario.formacion;
        usuario.cargo = cargo || usuario.cargo;
        usuario.fotoPerfil = fotoPerfil || usuario.fotoPerfil;
        usuario.bio = bio || usuario.bio;
        usuario.redesSociales = redesSociales || usuario.redesSociales;
        usuario.modo = modo || usuario.modo;
        usuario.software = software || usuario.software;
        usuario.skills = skills || usuario.skills;
        usuario.intereses = intereses || usuario.intereses;
        
        await usuario.save();
        res.status(200).json({ mensaje: "Usuario actualizado con éxito", usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar usuario", error: error.message });
    }
};

// Eliminar un usuario por email
const eliminarUsuario = async (req, res) => {
    try {
        const { email } = req.params;
        const usuarioEliminado = await Usuario.findOneAndDelete({ email });

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: "Usuario eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar usuario", error: error.message });
    }
};

// Seguir a un usuario
const seguirUsuario = async (req, res) => {
    try {
        const { email } = req.params;  // Usuario al que se quiere seguir
        const { seguidorEmail } = req.body;  // Usuario que está siguiendo

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
        if (usuarioSeguido.seguidores.includes(usuarioSeguidor._id)) {
            return res.status(400).json({ mensaje: "Ya sigues a este usuario" });
        }

        // Agregar los IDs de usuario a las listas de seguidores y seguidos
        usuarioSeguido.seguidores.push(usuarioSeguidor._id);
        usuarioSeguidor.siguiendo.push(usuarioSeguido._id);

        // Guardar los cambios
        await usuarioSeguido.save();
        await usuarioSeguidor.save();

        res.status(200).json({ mensaje: `Ahora sigues a ${email}` });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al seguir usuario", error: error.message });
    }
};


// Dejar de seguir a un usuario
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

        // Verificar si el seguidor está en la lista de seguidores del usuario seguido
        if (!usuarioSeguido.seguidores.includes(usuarioSeguidor._id)) {
            return res.status(400).json({ mensaje: "No sigues a este usuario" });
        }

        // Eliminar de las listas de seguidores y seguidos usando los ObjectId
        usuarioSeguido.seguidores = usuarioSeguido.seguidores.filter(userId => userId.toString() !== usuarioSeguidor._id.toString());
        usuarioSeguidor.siguiendo = usuarioSeguidor.siguiendo.filter(userId => userId.toString() !== usuarioSeguido._id.toString());

        // Guardar los cambios
        await usuarioSeguido.save();
        await usuarioSeguidor.save();

        res.status(200).json({ mensaje: `Has dejado de seguir a ${email}` });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al dejar de seguir usuario", error: error.message });
    }
};


// Obtener seguidores de un usuario
const obtenerSeguidores = async (req, res) => {
    try {
        const { email } = req.params;
        const usuario = await Usuario.findOne({ email }, 'seguidores');
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ seguidores: usuario.seguidores });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener seguidores", error: error.message });
    }
};

// Obtener a quién sigue un usuario
const obtenerSiguiendo = async (req, res) => {
    try {
        const { email } = req.params;
        const usuario = await Usuario.findOne({ email }, 'siguiendo');
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ siguiendo: usuario.siguiendo });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuarios seguidos", error: error.message });
    }
};

// Buscar usuarios
const buscarUsuarios = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ mensaje: "El parámetro de búsqueda es obligatorio" });
        }

        const usuarios = await Usuario.find({
            $or: [
                { nombreCompleto: { $regex: q, $options: "i" } },
                { nickname: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } }
            ]
        })
        .select("nombreCompleto nickname email cargo fotoPerfil")
        .lean();

        if (usuarios.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron usuarios con ese criterio de búsqueda" });
        }

        res.status(200).json({ resultados: usuarios });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar usuarios", error: error.message });
    }
};

// Obtener usuario por nickname
const obtenerUsuarioPorNickname = async (req, res) => {
    try {
        const { nickname } = req.params;
        const usuario = await Usuario.findOne({ nickname }).select("-password"); // Excluir la contraseña

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener usuario", error: error.message });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorEmail,
    actualizarUsuario,
    eliminarUsuario,
    seguirUsuario,
    dejarDeSeguirUsuario,
    obtenerSeguidores,
    obtenerSiguiendo,
    buscarUsuarios,
    obtenerUsuarioPorNickname
};
