import React, { useState } from "react";
import "../styles/Login.css";
import axios from "axios";

const Login = ({ onClose }) => {
  // Estado para almacenar los datos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear objeto con los datos del formulario
      const userCredentials = {
        email,
        password,
      };

      // Hacer la solicitud POST a la API de backend
      const response = await axios.post("http://localhost:5000/api/usuarios/login", userCredentials);

      // Si la respuesta es exitosa, guardar el token en localStorage (o sessionStorage)
      localStorage.setItem("token", response.data.token);

      // Mostrar mensaje de éxito y redirigir si es necesario
      alert("Inicio de sesión exitoso!");

      // Limpiar el formulario
      setEmail("");
      setPassword("");
      setErrorMessage("");
    } catch (error) {
      // Manejar errores si los hay
      console.error(error);
      setErrorMessage(error.response ? error.response.data.mensaje : "Error al iniciar sesión");
    }
  };

  return (
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

        {/* Campo Contraseña */}
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Mensaje de error */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <a href="/recuperar" className="forgot-password">¿Se te ha olvidado la contraseña?</a>

        {/* Botón de Iniciar Sesión */}
        <button className="login-button" onClick={handleSubmit}>Iniciar Sesión</button>

        {/* Enlace para Registrarse */}
        <p className="register-text">
          ¿No tienes cuenta? <a href="/register" className="register-link">Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
