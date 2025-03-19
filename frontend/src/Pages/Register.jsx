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
  const [errorMessage, setErrorMessage] = useState(""); // Para mostrar errores

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear objeto con los datos del formulario
      const newUser = {
        nombreCompleto,
        nickname,
        email,
        password,
        cargo
      };

      // Hacer la solicitud POST a la API de backend para registrar el usuario
      const response = await axios.post("http://localhost:5000/api/usuarios/", newUser);

      // Si el registro es exitoso, proceder al inicio de sesión automático
      console.log(response.data.mensaje);
      alert("Usuario creado con éxito!");

      // Intentar iniciar sesión automáticamente con el mismo email y contraseña
      const loginResponse = await axios.post("http://localhost:5000/api/usuarios/login", { email, password });

      // Si la respuesta es exitosa, almacenar el token JWT en localStorage
      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("user", JSON.stringify({ nickname: nickname }));
      
      alert("Usuario registrado e iniciado sesión!");
      window.location.href = "/"; // Redirigir a la página principal

      // Limpiar el formulario si es necesario
      setNombreCompleto("");
      setNickname("");
      setEmail("");
      setPassword("");
      setCargo("");

      // Redirigir a otra página si lo deseas, por ejemplo, a la página principal
      // window.location.href = "/home"; // O usar React Router para redirigir
    } catch (error) {
      // Manejar errores si los hay
      console.error(error);
      setErrorMessage(error.response ? error.response.data.mensaje : "Error al crear usuario");
    }
  };

  return (
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
        <input
          type="text"
          id="nombreCompleto"
          placeholder="Tu nombre completo"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
        />

        {/* Campo Nickname */}
        <label htmlFor="nickname">Nickname</label>
        <input
          type="text"
          id="nickname"
          placeholder="Tu nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

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

        {/* Campo Cargo */}
        <label htmlFor="cargo">Cargo</label>
        <input
          type="text"
          id="cargo"
          placeholder="Tu cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        />

        {/* Mensaje de error */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Botón de Registro */}
        <button className="register-button" onClick={handleSubmit}>Registrarse</button>

        {/* Enlace para Iniciar Sesión */}
        <p className="login-text">
          ¿Ya tienes cuenta? <a href="/login" className="login-link">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
