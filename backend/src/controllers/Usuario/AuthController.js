const Usuario = require('../../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Iniciar sesión
const iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        console.log("Contraseña proporcionada:", password);  // Verifica lo que se pasa

        // Comparar la contraseña proporcionada con el hash almacenado en la base de datos
        console.log("Hash en la base de datos:", usuario.password);  // Ver el hash almacenado

        // Comparar la contraseña proporcionada con el hash almacenado en la base de datos
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // Generar el token JWT
        const token = jwt.sign({ email: usuario.email, id: usuario._id }, process.env.JWT_SECRET, {
            expiresIn: "7d" // El token expira en 7 días
        });

        // Responder con el token generado
        res.status(200).json({ mensaje: "Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el inicio de sesión", error: error.message });
    }
};

// Cerrar sesión
const cerrarSesion = (req, res) => {
    try {
        // Aquí no es necesario hacer nada en el servidor, ya que la sesión del lado cliente debe ser eliminada
        res.status(200).json({ mensaje: "Sesión cerrada correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al cerrar sesión", error: error.message });
    }
};

// Solicitar recuperación de contraseña (envío de token)
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
        res.status(500).json({ mensaje: "Error al solicitar recuperación de contraseña", error: error.message });
    }
};

// Restablecer la contraseña usando el token de recuperación
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
        res.status(500).json({ mensaje: "Error al restablecer contraseña", error: error.message });
    }
};

// Cambiar la contraseña del usuario actual
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
        res.status(500).json({ mensaje: "Error al cambiar contraseña", error: error.message });
    }
};

module.exports = {
    iniciarSesion,
    cerrarSesion,
    solicitarRecuperacion,
    restablecerContrasena,
    cambiarContrasena
};
