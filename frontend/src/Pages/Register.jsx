import React, { useState } from "react";
import "../styles/Register.css";
import axios from "axios";

const Register = ({ onClose }) => {
  // Estado para almacenar los datos del formulario
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargo, setCargo] = useState("");

  // Estados de error
  const [nombreError, setNombreError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cargoError, setCargoError] = useState("");
  const [serverError, setServerError] = useState("");

  // Expresiones regulares para validación
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  const cargoRegex = /^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    setNombreError("");
    setNicknameError("");
    setEmailError("");
    setPasswordError("");
    setCargoError("");
    setServerError("");

    // Validar Nombre Completo
    if (!nombreCompleto.trim()) {
      setNombreError("El nombre completo es obligatorio.");
      isValid = false;
    }

    // Validar Nickname
    if (!nickname.trim()) {
      setNicknameError("El nickname es obligatorio.");
      isValid = false;
    }

    // Validar Email
    if (!emailRegex.test(email)) {
      setEmailError("Introduce un correo válido.");
      isValid = false;
    }

    // Validar Contraseña
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
      isValid = false;
    }

    // Validar Cargo
    if (!cargoRegex.test(cargo)) {
      setCargoError("El cargo solo puede contener letras y espacios.");
      isValid = false;
    }

    if (!isValid) return; // No enviar si hay errores

    try {
      // Crear objeto con los datos del formulario
      const newUser = { nombreCompleto, nickname, email, password, cargo };

      // Hacer la solicitud POST a la API de backend para registrar el usuario
      await axios.post("http://localhost:5000/api/usuarios/", newUser);

      alert("Usuario creado con éxito!");

      // Intentar iniciar sesión automáticamente con el mismo email y contraseña
      const loginResponse = await axios.post("http://localhost:5000/api/usuarios/login", { email, password });

      // Si la respuesta es exitosa, almacenar el token JWT en localStorage
      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("user", JSON.stringify({ nickname }));

      alert("Usuario registrado e iniciado sesión!");
      window.location.href = "/";

      // Limpiar el formulario
      setNombreCompleto("");
      setNickname("");
      setEmail("");
      setPassword("");
      setCargo("");
    } catch (error) {
      console.error(error);
      setServerError(error.response ? error.response.data.mensaje : "Error al crear usuario");
    }
  };

  return (
    <div className="contenedor-principal">
      <div className="register-container">
        {/* Sección de Imagen */}
        <div className="register-image">
          <h1 className="register-title">MoLaMaZoGAMES</h1>
          <p className="register-subtitle">REGÍSTRATE Y ACCEDE A LOS MEJORES ASSETS DEL MUNDO</p>
          <p className="register-description">
            Únete a nuestra comunidad para tener acceso gratuito a miles de assets.
          </p>
        </div>

        {/* Sección del Formulario */}
        <div className="register-form">
          <button className="close-button" onClick={onClose}>✖</button>
          <h2 className="form-title">Crea tu cuenta en <span className="bold">MoLaMaZoGAMES</span></h2>

          {/* Campo Nombre Completo */}
          <label htmlFor="nombreCompleto">Nombre Completo</label>
          <input type="text" id="nombreCompleto" placeholder="Tu nombre completo" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} />
          {nombreError && <p className="error-message">{nombreError}</p>}

          {/* Campo Nickname */}
          <label htmlFor="nickname">Nickname</label>
          <input type="text" id="nickname" placeholder="Tu nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          {nicknameError && <p className="error-message">{nicknameError}</p>}

          {/* Campo Email */}
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="ejemplo@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <p className="error-message">{emailError}</p>}

          {/* Campo Contraseña */}
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          {passwordError && <p className="error-message">{passwordError}</p>}

          {/* Campo Cargo */}
          <label htmlFor="cargo">Cargo</label>
          <input type="text" id="cargo" placeholder="Tu cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
          {cargoError && <p className="error-message">{cargoError}</p>}

          {/* Mensaje de error del servidor */}
          {serverError && <p className="error-message server-error">{serverError}</p>}

          {/* Botón de Registro */}
          <button className="register-button" onClick={handleSubmit}>Registrarse</button>

          {/* Enlace para Iniciar Sesión */}
          <p className="login-text">
            ¿Ya tienes cuenta? <a href="/login" className="login-link">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

