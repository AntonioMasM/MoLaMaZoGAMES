import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // 👈 Importa el contexto

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const { login } = useUser(); // 👈 Usamos la función login del contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  useEffect(() => {
    setEmailError(email && !emailRegex.test(email) ? "Introduce un correo válido." : "");
    setPasswordError(
      password && !passwordRegex.test(password)
        ? "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
        : ""
    );

    setFormValid(emailRegex.test(email) && passwordRegex.test(password));
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/usuarios/login", {
        email,
        password,
      });

      const { token, nickname, fotoPerfil } = response.data;

      // 👇 Usamos la función login del contexto
      login({
        userData: { nickname, fotoPerfil, email },
        token,
      });

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      console.error(error);
      setServerError(error.response?.data?.mensaje || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contenedor-principal">
      <div className="login-container">
        <div className="login-image">
          <h1 className="login-title">MoLaMaZoGAMES</h1>
          <p className="login-subtitle">DESCUBRE LA MAYOR GALERÍA DE ASSETS DEL MUNDO</p>
          <p className="login-description">
            Acceso a miles de assets de todo tipo completamente gratis.
          </p>
        </div>

        <div className="login-form">
          <button className="close-button" onClick={onClose} title="Cerrar">✖</button>

          <h2 className="form-title">
            Únete a <span className="bold">MoLaMaZoGAMES</span>
          </h2>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            aria-label="Correo electrónico"
            placeholder="ejemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error-message">{emailError}</p>}

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            aria-label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}

          <a href="/recuperar" className="forgot-password">
            ¿Se te ha olvidado la contraseña?
          </a>

          <button
            className="login-button"
            onClick={handleSubmit}
            disabled={!formValid || loading}
          >
            {loading ? "Entrando..." : "Iniciar Sesión"}
          </button>

          {serverError && <p className="error-message server-error">{serverError}</p>}

          <p className="register-text">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="register-link">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
