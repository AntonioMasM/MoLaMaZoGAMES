import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useUser as useUserService } from "../../hooks/useUser"; // Hook para registro
import { useAuth } from "../../hooks/useAuth"; // Hook para login tras registro
import FormInput from "../ui/FormInput";
import ErrorMessage from "../ui/ErrorMessage";
import styles from "../../styles/Register.module.css";

const RegisterForm = () => {
  const { login } = useUser(); // Context global de usuario
  const { registrarUsuario, loading: loadingRegister, error: errorRegister } = useUserService();
  const { iniciarSesion, loading: loadingLogin, error: errorLogin } = useAuth();
  const navigate = useNavigate();

  // Campos del formulario
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargo, setCargo] = useState("");

  // Estado de errores de validación
  const [errors, setErrors] = useState({});

  // Validaciones
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  const cargoRegex = /^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

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

    // Validaciones manuales
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
      return;
    }

    try {
      // 1. Crear el usuario
      await registrarUsuario({ nombreCompleto, nickname, email, password, cargo });

      // 2. Loguear automáticamente tras el registro
      const data = await iniciarSesion(email, password);
      const { token, nickname: nick, fotoPerfil, id, ultimoInicioSesion } = data;

      login({ userData: { _id: id, email, nickname: nick, fotoPerfil, ultimoInicioSesion }, token });

      navigate("/");
    } catch (err) {
      console.error("Error en registro o login:", err);
    }
  };

  const globalLoading = loadingRegister || loadingLogin;
  const globalError = errorRegister || errorLogin;

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

      {globalError && <ErrorMessage>{globalError}</ErrorMessage>}

      <button className={styles.button} type="submit" disabled={globalLoading}>
        {globalLoading ? "Registrando..." : "Registrarse"}
      </button>

      <p className={styles.registerText}>
        ¿Ya tienes cuenta? <a href="/login" className={styles.link}>Inicia sesión</a>
      </p>
    </form>
  );
};

export default RegisterForm;
