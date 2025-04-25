import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { loginUsuario } from "../../services/auth";
import FormInput from "../ui/FormInput";
import styles from "../../styles/Login.module.css";

const LoginForm = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [serverError, setServerError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setServerError("");
    setNotFound(false);
    setIncorrectPassword(false);

    try {
      const data = await loginUsuario(email, password);
      const { token, nickname, fotoPerfil } = data;
      login({ userData: { email, nickname, fotoPerfil }, token });
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.mensaje?.toLowerCase().trim() || "Error al iniciar sesión.";
      if (msg.includes("no encontrado")) setNotFound(true);
      else if (msg.includes("contraseña")) setIncorrectPassword(true);
      else setServerError(msg);
    } finally {
      setLoading(false);
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
