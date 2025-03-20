import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";

const Login = ({ onClose }) => {
  // Estado para almacenar los datos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  // Expresión regular para validar un email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Expresión regular para validar una contraseña segura
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setServerError("");

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

    if (!isValid) return; // No enviar si hay errores

    try {
      // Crear objeto con los datos del formulario
      const userCredentials = { email, password };

      // Hacer la solicitud POST a la API de backend
      const response = await axios.post("http://localhost:5000/api/usuarios/login", userCredentials);

      // Si la respuesta es exitosa, guardar el token y el nickname en localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify({ nickname: response.data.nickname }));

      // Mostrar mensaje de éxito y redirigir si es necesario
      alert(`Bienvenido, ${response.data.nickname}!`);

      // Limpiar el formulario
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setServerError(error.response ? error.response.data.mensaje : "Error al iniciar sesión");
    }
  };

  return (
    <div className="contenedor-principal"> 
    <div className="login-container">
      {/* Sección de Imagen */}
      <div className="login-image">
        <h1 className="login-title">MoLaMaZoGAMES</h1>
        <p className="login-subtitle">DESCUBRE LA MAYOR GALERÍA DE ASSETS DEL MUNDO</p>
        <p className="login-description">
          Acceso a miles de assets de todo tipo completamente gratis.
        </p>
      </div>

      {/* Sección del Formulario */}
      <div className="login-form">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2 className="form-title">Únete a <span className="bold">MoLaMaZoGAMES</span></h2>

        {/* Campo Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="ejemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error-message">{emailError}</p>} {/* Error bajo email */}

        {/* Campo Contraseña */}
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="error-message">{passwordError}</p>} {/* Error bajo contraseña */}

        <a href="/recuperar" className="forgot-password">¿Se te ha olvidado la contraseña?</a>

        {/* Botón de Iniciar Sesión */}
        <button className="login-button" onClick={handleSubmit}>Iniciar Sesión</button>

        {/* Mensaje de error general (Servidor) */}
        {serverError && <p className="error-message server-error">{serverError}</p>}

        {/* Enlace para Registrarse */}
        <p className="register-text">
          ¿No tienes cuenta? <a href="/register" className="register-link">Regístrate</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
