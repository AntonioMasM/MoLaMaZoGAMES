import React from "react";
import "../styles/Login.css";

const Login = ({ onClose }) => {
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
        <input type="email" id="email" placeholder="ejemplo@email.com" />

        {/* Campo Contraseña */}
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="••••••••" />

        <a href="/recuperar" className="forgot-password">¿Se te ha olvidado la contraseña?</a>

        {/* Botón de Iniciar Sesión */}
        <button className="login-button">Iniciar Sesión</button>

        {/* Enlace para Registrarse */}
        <p className="register-text">
          ¿No tienes cuenta? <a href="/register" className="register-link">Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
