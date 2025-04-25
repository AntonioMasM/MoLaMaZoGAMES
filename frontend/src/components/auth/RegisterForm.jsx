import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUsuario } from "../../services/auth";
import { useUser } from "../../context/UserContext";
import FormInput from "../ui/FormInput";
import ErrorMessage from "../ui/ErrorMessage";
import styles from "../../styles/Register.module.css";

const RegisterForm = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  // Campos del formulario
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargo, setCargo] = useState("");

  // Estado de errores
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validaciones
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  const cargoRegex = /^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

  // Validación en tiempo real
  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      email: email && !emailRegex.test(email) ? "Introduce un correo electrónico válido" : "",
      password: password && !passwordRegex.test(password)
        ? "Debe tener 8 caracteres, mayúscula, número y símbolo"
        : "",
      cargo: cargo && !cargoRegex.test(cargo)
        ? "El cargo solo puede contener letras y espacios"
        : "",
    }));
  }, [email, password, cargo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);

    const newErrors = {
      nombreCompleto: !nombreCompleto.trim() ? "El nombre completo es obligatorio" : "",
      nickname: !nickname.trim() ? "El nickname es obligatorio" : "",
      email: !emailRegex.test(email) ? "Introduce un correo electrónico válido" : "",
      password: !passwordRegex.test(password)
        ? "Debe tener 8 caracteres, mayúscula, número y símbolo"
        : "",
      cargo: !cargoRegex.test(cargo) ? "El cargo solo puede contener letras y espacios" : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      setLoading(false);
      return;
    }

    try {
      await registerUser({ nombreCompleto, nickname, email, password, cargo });

      const { token, nickname: nick, fotoPerfil } = await loginUsuario(email, password);
      login({ userData: { email, nickname: nick, fotoPerfil }, token });
      navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.mensaje || "Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.formTitle}>Crea tu cuenta</h2>

      <FormInput
        id="nombreCompleto"
        label="Nombre Completo"
        value={nombreCompleto}
        onChange={(e) => setNombreCompleto(e.target.value)}
        placeholder="Tu nombre completo"
        error={errors.nombreCompleto}
      />

      <FormInput
        id="nickname"
        label="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Tu nickname"
        error={errors.nickname}
      />

      <FormInput
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ejemplo@email.com"
        error={errors.email}
      />

      <FormInput
        id="password"
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        error={errors.password}
      />

      <FormInput
        id="cargo"
        label="Cargo"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
        placeholder="Tu cargo"
        error={errors.cargo}
      />

      {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </button>

      <p className={styles.registerText}>
        ¿Ya tienes cuenta? <a href="/login" className={styles.link}>Inicia sesión</a>
      </p>
    </form>
  );
};

export default RegisterForm;
