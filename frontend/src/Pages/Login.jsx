import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const [formValid, setFormValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  // Validación en tiempo real
  useEffect(() => {
    setEmailError(email && !emailRegex.test(email) ? "Introduce un correo válido." : "");
    setPasswordError(
      password && !passwordRegex.test(password)
        ? "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
        : ""
    );

    // Validación general del formulario
    setFormValid(
      emailRegex.test(email) &&
      passwordRegex.test(password)
    );
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    try {
      const userCredentials = { email, password };
      const response = await axios.post("http://localhost:5000/api/usuarios/login", userCredentials);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify({ nickname: response.data.nickname, fotoPerfil: response.data.fotoPerfil }));
      console.log(response.data);
      alert(`Bienvenido, ${response.data.nickname}!`);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setServerError(error.response?.data?.mensaje || "Error al iniciar sesión");
    }
  };

  return (
    <div className="contenedor-principal">
      <div className="login-container">
        {/* Sección de imagen / promo */}
        <div className="login-image">
          <h1 className="login-title">MoLaMaZoGAMES</h1>
          <p className="login-subtitle">DESCUBRE LA MAYOR GALERÍA DE ASSETS DEL MUNDO</p>
          <p className="login-description">
            Acceso a miles de assets de todo tipo completamente gratis.
          </p>
        </div>

        {/* Sección del formulario */}
        <div className="login-form">
          <button className="close-button" onClick={onClose}>✖</button>
          <h2 className="form-title">Únete a <span className="bold">MoLaMaZoGAMES</span></h2>

          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="ejemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error-message">{emailError}</p>}

          {/* Contraseña */}
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}

          <a href="/recuperar" className="forgot-password">¿Se te ha olvidado la contraseña?</a>

          <button
            className="login-button"
            onClick={handleSubmit}
            disabled={!formValid}
          >
            Iniciar Sesión
          </button>

          {serverError && <p className="error-message server-error">{serverError}</p>}

          <p className="register-text">
            ¿No tienes cuenta? <a href="/register" className="register-link">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
