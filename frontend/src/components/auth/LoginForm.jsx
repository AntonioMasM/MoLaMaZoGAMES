import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useAuth as useAuthAPI } from "../../hooks/useAuth"; // 🚀 Llamadas a la API
import { useAuth as useAuthContext } from "../../features/auth/useAuth"; // 🚀 Acceso al contexto

import { useAlertQueue } from "../../context/AlertQueueContext";

import FormInput from "../ui/FormInput";
import styles from "../../styles/Login.module.css";

const LoginForm = () => {
  const { login: userLogin } = useUser();
  
  const { iniciarSesion, loading } = useAuthAPI();
  const { login: authLogin } = useAuthContext();
  const { showAlert } = useAlertQueue();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [serverError, setServerError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);

  useEffect(() => {
    setNotFound(false);
    setIncorrectPassword(false);
    setServerError("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setNotFound(false);
    setIncorrectPassword(false);

    try {
      const data = await iniciarSesion(email, password);

      // ✅ Validar que data exista antes de continuar
      if (data && data.token) {
        const { token, nickname, fotoPerfil, id, email: userEmail, ultimoInicioSesion } = data;
        const fotoPerfilUrl = typeof fotoPerfil === "object" ? fotoPerfil.secure_url : fotoPerfil;
        userLogin({ userData: { _id: id, email: userEmail, nickname, fotoPerfil: fotoPerfilUrl, ultimoInicioSesion }, token });
        authLogin(token);;
        showAlert(`¡Bienvenido, ${nickname}! 👋🏻`, "success");

        navigate("/");
      } else {
        setServerError("No se pudieron obtener los datos de inicio de sesión.");
      }
    } catch (err) {
      console.error("🔥 Error al hacer login:", err);
      const msg = err.response?.data?.mensaje?.toLowerCase().trim() || "Error al iniciar sesión.";
      if (msg.includes("no encontrado")) setNotFound(true);
      else if (msg.includes("contraseña")) setIncorrectPassword(true);
      else setServerError(msg);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.header}>
        <h2 className={styles.formTitle}>Iniciar Sesión</h2>
      </div>

      <FormInput
        label="Email"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ejemplo@email.com"
        required
        error={
          !isEmailValid && email
            ? "Introduce un correo electrónico válido"
            : notFound
            ? "No se ha encontrado ningún usuario con ese correo"
            : ""
        }
        isValid={isEmailValid}
      />

      <FormInput
        label="Contraseña"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        error={
          !isPasswordValid && password
            ? "Debe tener 8 caracteres, mayúscula, número y símbolo"
            : incorrectPassword
            ? "Correo o contraseña incorrectos"
            : ""
        }
        isValid={isPasswordValid}
      />

      <a href="/recuperar" className={styles.link}>¿Se te ha olvidado la contraseña?</a>

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? "Entrando..." : "Iniciar Sesión"}
      </button>

      {serverError && (
        <p className={`${styles.errorMessage} ${styles.serverError}`}>
          {serverError}
        </p>
      )}

      <p className={styles.registerText}>
        ¿No tienes cuenta?{" "}
        <a href="/register" className={styles.link}>
          Regístrate
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
